import { Router } from "express";
import { protect } from "../../middlewares/authMiddleware";
import * as notificationController from "./notification.controller";

const router = Router();

router.use(protect);

router.get("/", notificationController.getNotifications);
router.patch("/read-all", notificationController.markAllAsRead);
router.patch("/:id/read", notificationController.markAsRead);

export default router;
