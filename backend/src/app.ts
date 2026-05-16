import 'dotenv/config';
import express, { Request, Response } from 'express';
import path from 'path';
import authRoutes from './modules/auth/auth.routes';
import projectRoutes from './modules/projects/project.routes';
import taskRoutes from './modules/tasks/task.routes';
import userRouter from './modules/users/user.routes';
import commentRouter from './modules/comments/comment.routes';
import notificationRoutes from './modules/notifications/notification.routes';
import { rateLimiter } from './middlewares/rateLimiter';
import cors from 'cors';
import helmet from 'helmet';
import globalErrorHandler from './middlewares/errorMiddleware';


// Khởi tạo cấu hình biến môi trường 

const app = express();
app.set('trust proxy', 1);



// Middleware cơ bản 
// Để server hiểu được dữ liệu JSON từ request body
app.use(express.json());
app.use('/public', express.static(path.join(__dirname, '../public')));
app.use('/images', express.static(path.join(__dirname, '../public/images')));
// Cho phép các domain khác gọi API (Frontend)
app.use(cors());
// Tăng cường bảo mật bằng cách thiết lập HTTP headers 
app.use(helmet());

app.use(rateLimiter);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/projects', projectRoutes);
app.use('/api/v1/tasks', taskRoutes);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/comments', commentRouter);
app.use('/api/v1/notifications', notificationRoutes);

// Route mặc định
app.get('/', (req: Request, res: Response) => {
    res.json({
        message: 'NexTask API is running with TypeScript!'
    });
});





// Gắn Error Middleware 
app.use(globalErrorHandler);

export default app;
