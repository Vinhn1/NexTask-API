import { Router } from 'express';
import { protect } from '../../middlewares/authMiddleware';
import { uploadAttachment } from '../../middlewares/upload.cloudinary.middleware';
import { getAttachments, uploadAttachmentHandler, deleteAttachment, proxyAttachment } from './attachment.controller';

const router = Router({ mergeParams: true }); // mergeParams để nhận :taskId từ parent router

router.use(protect);

router.get('/', getAttachments);
router.post('/', uploadAttachment.single('file'), uploadAttachmentHandler);
router.get('/:attachmentId/proxy', proxyAttachment);
router.delete('/:attachmentId', deleteAttachment);

export default router;
