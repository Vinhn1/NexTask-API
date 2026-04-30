import 'dotenv/config';
import express, { Request, Response } from 'express';
import authRoutes from './modules/auth/auth.routes';
import projectRoutes from './modules/projects/project.routes';
import cors from 'cors';
import helmet from 'helmet';
import globalErrorHandler from './middlewares/errorMiddleware';


// Khởi tạo cấu hình biến môi trường 

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware cơ bản 
// Để server hiểu được dữ liệu JSON từ request body
app.use(express.json());
// Cho phép các domain khác gọi API (Frontend)
app.use(cors());
// Tăng cường bảo mật bằng cách thiết lập HTTP headers 
app.use(helmet());

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/projects', projectRoutes);

// Route mặc định
app.get('/', (req: Request, res: Response) => {
    res.json({
        message: 'NexTask API is running with TypeScript!'
    });
});





// Gắn Error Middleware 
app.use(globalErrorHandler);

// Lắng nghe cổng
app.listen(PORT, () => {
    console.log(`Server is flying on http://localhost:${PORT}`);
})
