import 'dotenv/config';
import express, { Request, Response } from 'express';
import path from 'path';
import cors from 'cors';
import helmet from 'helmet';
import passport from './lib/passport';
import { rateLimiter } from './middlewares/rateLimiter';
import globalErrorHandler from './middlewares/errorMiddleware';

import authRoutes from './modules/auth/auth.routes';
import projectRoutes from './modules/projects/project.routes';
import taskRoutes from './modules/tasks/task.routes';
import userRouter from './modules/users/user.routes';
import commentRouter from './modules/comments/comment.routes';
import notificationRoutes from './modules/notifications/notification.routes';
import attachmentRoutes from './modules/attachments/attachment.routes';

const app = express();
app.set('trust proxy', 1);

// Core middleware
app.use(express.json());
app.use('/public', express.static(path.join(__dirname, '../public')));
app.use('/images', express.static(path.join(__dirname, '../public/images')));
app.use(cors());
app.use(helmet());
app.use(rateLimiter);
app.use(passport.initialize());

// Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/projects', projectRoutes);
app.use('/api/v1/tasks', taskRoutes);
app.use('/api/v1/tasks/:taskId/attachments', attachmentRoutes);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/comments', commentRouter);
app.use('/api/v1/notifications', notificationRoutes);

app.get('/', (_req: Request, res: Response) => {
    res.json({ message: 'NexTask API is running!' });
});

app.use(globalErrorHandler);

export default app;
