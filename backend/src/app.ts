import express, { Request, Response } from 'express';
import AppError from './utils/appError';
import dotenv from 'dotenv'; 
import cors from 'cors';
import helmet from 'helmet';
import globalErrorHandler from './middlewares/errorMiddleware';

// Khởi tạo cấu hình biến môi trường 
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware cơ bản 
// Để server hiểu được dữ liệu JSON từ request body
app.use(express.json());
// Cho phép các domain khác gọi API (Frontend)
app.use(cors());
// Tăng cường bảo mật bằng cách thiết lập HTTP headers 
app.use(helmet());

// Route mặc định
app.get('/', (req: Request, res: Response) => {
    res.json({
        message: 'NexTask API is running with TypeScript!'
    });
});

app.get('/test-error', (req, res, next) => {
    // Ném lỗi vào vòng tay của Error Middleware bằng cách gọi next(err)
    next(new AppError('Đang có lỗi xảy ra!', 400));
});

// Gắn Error Middleware 
app.use(globalErrorHandler);

// Lắng nghe cổng
app.listen(PORT, () => {
    console.log(`Server is flying on http://localhost:${PORT}`);
})
