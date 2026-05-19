import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../lib/cloudinary';
import AppError from '../utils/appError';

const ALLOWED_DOC_MIMETYPES = [
    'image/jpeg', 'image/png', 'image/webp', 'image/gif',
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'text/plain',
];

// --- Avatar Storage ---
const avatarStorage = new CloudinaryStorage({
    cloudinary,
    params: async (_req, file) => {
        if (!file.mimetype.startsWith('image')) {
            throw new AppError('Không phải file ảnh!', 400);
        }
        return {
            folder: 'nextask/avatars',
            allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
            transformation: [
                { width: 400, height: 400, crop: 'fill', gravity: 'face' },
                { quality: 'auto', fetch_format: 'auto' },
            ],
            public_id: `avatar-${Date.now()}-${Math.round(Math.random() * 1e9)}`,
        };
    },
});

const imageFilter = (_req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    if (file.mimetype.startsWith('image')) {
        cb(null, true);
    } else {
        cb(new AppError('Không phải file ảnh! Vui lòng upload lại.', 400) as any, false);
    }
};

export const uploadCloud = multer({
    storage: avatarStorage,
    fileFilter: imageFilter,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});

// --- Attachment Storage ---
const attachmentStorage = new CloudinaryStorage({
    cloudinary,
    params: async (_req, file) => {
        if (!ALLOWED_DOC_MIMETYPES.includes(file.mimetype)) {
            throw new AppError('Loại file không được hỗ trợ!', 400);
        }
        return {
            folder: 'nextask/attachments',
            resource_type: 'auto',
            public_id: `attachment-${Date.now()}-${Math.round(Math.random() * 1e9)}`,
            use_filename: false,
        };
    },
});

const docFilter = (_req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    if (ALLOWED_DOC_MIMETYPES.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new AppError('Loại file không được hỗ trợ! Chấp nhận: ảnh, PDF, Word, Excel, TXT.', 400) as any, false);
    }
};

export const uploadAttachment = multer({
    storage: attachmentStorage,
    fileFilter: docFilter,
    limits: { fileSize: 20 * 1024 * 1024 }, // 20MB
});
