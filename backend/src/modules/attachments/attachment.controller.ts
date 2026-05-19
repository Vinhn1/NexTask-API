import { Request, Response, NextFunction } from 'express';
import https from 'https';
import http from 'http';
import { URL } from 'url';
import prisma from '../../lib/prisma';
import cloudinary from '../../lib/cloudinary';
import AppError from '../../utils/appError';

// GET /api/v1/tasks/:taskId/attachments
export const getAttachments = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { taskId } = req.params;

        const task = await prisma.task.findUnique({ where: { id: taskId } });
        if (!task) return next(new AppError('Task không tồn tại', 404));

        const attachments = await prisma.attachment.findMany({
            where: { taskId },
            include: { uploader: { select: { id: true, fullname: true, avatar: true } } },
            orderBy: { createdAt: 'desc' },
        });

        res.json({ statusCode: 200, success: true, data: attachments });
    } catch (err) {
        next(err);
    }
};

// POST /api/v1/tasks/:taskId/attachments
export const uploadAttachmentHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { taskId } = req.params;
        const userId = (req as any).user?.id;

        if (!req.file) return next(new AppError('Không có file nào được upload', 400));

        const task = await prisma.task.findUnique({ where: { id: taskId } });
        if (!task) return next(new AppError('Task không tồn tại', 404));

        const file = req.file as Express.Multer.File & { path: string; filename: string };

        const attachment = await prisma.attachment.create({
            data: {
                taskId,
                uploadedBy: userId,
                fileName: file.originalname,
                fileUrl: file.path,       // Cloudinary URL
                fileType: file.mimetype,
                fileSize: file.size,
                publicId: file.filename,  // Cloudinary public_id
            },
            include: { uploader: { select: { id: true, fullname: true, avatar: true } } },
        });

        res.status(201).json({ statusCode: 201, success: true, data: attachment, message: 'Upload thành công' });
    } catch (err) {
        next(err);
    }
};

// DELETE /api/v1/tasks/:taskId/attachments/:attachmentId
export const deleteAttachment = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { attachmentId } = req.params;
        const userId = (req as any).user?.id;

        const attachment = await prisma.attachment.findUnique({ where: { id: attachmentId } });
        if (!attachment) return next(new AppError('Tài liệu không tồn tại', 404));

        // Chỉ người upload hoặc admin mới xóa được
        if (attachment.uploadedBy !== userId) {
            return next(new AppError('Bạn không có quyền xóa tài liệu này', 403));
        }

        // Xóa trên Cloudinary
        if (attachment.publicId) {
            const isImage = attachment.fileType.startsWith('image');
            await cloudinary.uploader.destroy(attachment.publicId, {
                resource_type: isImage ? 'image' : 'raw',
            });
        }

        await prisma.attachment.delete({ where: { id: attachmentId } });

        res.json({ statusCode: 200, success: true, message: 'Đã xóa tài liệu' });
    } catch (err) {
        next(err);
    }
};

// GET /api/v1/tasks/:taskId/attachments/:attachmentId/proxy?mode=view|download
export const proxyAttachment = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { attachmentId } = req.params;
        const disposition = req.query.mode === 'view' ? 'inline' : 'attachment';

        const attachment = await prisma.attachment.findUnique({ where: { id: attachmentId } });
        if (!attachment) return next(new AppError('Tài liệu không tồn tại', 404));

        const parsedUrl = new URL(attachment.fileUrl);
        const protocol = parsedUrl.protocol === 'https:' ? https : http;

        const request = protocol.get(attachment.fileUrl, (cloudRes) => {
            if (!cloudRes.statusCode || cloudRes.statusCode >= 400) {
                res.status(502).json({ message: `Cloudinary lỗi: ${cloudRes.statusCode}` });
                return;
            }

            const contentType = attachment.fileType || cloudRes.headers['content-type'] || 'application/octet-stream';
            const encodedName = encodeURIComponent(attachment.fileName);

            res.setHeader('Content-Type', contentType);
            res.setHeader('Content-Disposition',
                `${disposition}; filename="${attachment.fileName}"; filename*=UTF-8''${encodedName}`);
            res.setHeader('Cache-Control', 'private, max-age=3600');

            if (cloudRes.headers['content-length']) {
                res.setHeader('Content-Length', cloudRes.headers['content-length']);
            }

            cloudRes.pipe(res);
        });

        request.on('error', (err) => {
            next(new AppError('Không thể kết nối Cloudinary: ' + err.message, 502));
        });
    } catch (err) {
        next(err);
    }
};
