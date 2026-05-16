import prisma from "../../lib/prisma";
import { getIO as getSocketIO } from "../../lib/io";

export class NotificationService {
    /**
     * Create a notification and emit it to the user via Socket.IO
     */
    static async createNotification(data: {
        userId: string;
        type: string;
        title: string;
        content: string;
        link?: string;
    }) {
        // 1. Save to database
        const notification = await prisma.notification.create({
            data: {
                userId: data.userId,
                type: data.type,
                title: data.title,
                content: data.content,
                link: data.link,
            }
        });

        // 2. Emit to user room via Socket.IO
        try {
            const io = getSocketIO();
            io.to(`user:${data.userId}`).emit("notification:new", notification);
        } catch (error) {
            console.error("Socket.IO not initialized, couldn't emit notification:", error);
        }

        return notification;
    }

    static async getNotifications(userId: string, limit = 20) {
        return prisma.notification.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' },
            take: limit
        });
    }

    static async markAsRead(id: string, userId: string) {
        return prisma.notification.updateMany({
            where: { id, userId },
            data: { isRead: true }
        });
    }

    static async markAllAsRead(userId: string) {
        return prisma.notification.updateMany({
            where: { userId },
            data: { isRead: true }
        });
    }
}
