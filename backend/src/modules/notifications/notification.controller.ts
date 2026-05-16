import { Request, Response, NextFunction } from "express";
import { NotificationService } from "./notification.service";

export const getNotifications = async (req: any, res: Response, next: NextFunction) => {
    try {
        const userId = req.user.id;
        const notifications = await NotificationService.getNotifications(userId);
        res.json(notifications);
    } catch (error) {
        next(error);
    }
};

export const markAsRead = async (req: any, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;
        await NotificationService.markAsRead(id, userId);
        res.json({ message: "Notification marked as read" });
    } catch (error) {
        next(error);
    }
};

export const markAllAsRead = async (req: any, res: Response, next: NextFunction) => {
    try {
        const userId = req.user.id;
        await NotificationService.markAllAsRead(userId);
        res.json({ message: "All notifications marked as read" });
    } catch (error) {
        next(error);
    }
};
