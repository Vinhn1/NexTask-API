import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../lib/cloudinary';
import AppError from '../utils/appError';

// Cấu hình Cloudinary Storage cho avatar
const avatarStorage = new CloudinaryStorage({
    cloudinary,
    params: async (_req, file) => {
        // Kiểm tra sơ bộ MIME type trước khi gửi lên cloud
        if (!file.mimetype.startsWith('image')) {
            throw new AppError('Không phải file ảnh!', 400);
        }

        return {
            folder: 'nextask/avatars',        // Thư mục trên Cloudinary
            allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
            transformation: [
                { width: 400, height: 400, crop: 'fill', gravity: 'face' },
                { quality: 'auto', fetch_format: 'auto' }
            ],
            public_id: `avatar-${Date.now()}-${Math.round(Math.random() * 1e9)}`,
        };
    },
});

// File filter fallback cho multer
const fileFilter = (_req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    if (file.mimetype.startsWith('image')) {
        cb(null, true);
    } else {
        cb(new AppError('Không phải file ảnh! Vui lòng upload lại.', 400) as any, false);
    }
};

export const uploadCloud = multer({
    storage: avatarStorage,
    fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB — Cloudinary nên thoáng hơn local
    },
});
