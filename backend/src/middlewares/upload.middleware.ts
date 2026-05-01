import multer from 'multer';
import path from 'path';
import { AppError } from '../utils/appError';

// Cấu hình Storage (Nơi lưu và Tên file)
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images');
    },
    filename: (req, file, cb) => {
        // Lấy đuôi file 
        const ext = path.extname(file.originalname);
        const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueName + ext);
    }
})

// Cấu hình Filter (Lọc loại file)
const fileFilter = (req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    if(file.mimetype.startsWith('image')){
        cb(null, true);
    }else{
        cb(new AppError('Không phải file ảnh! Vui lòng upload lại.', 400) as any, false);
    }
};

export const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 2 * 1024 * 1024
    }
})