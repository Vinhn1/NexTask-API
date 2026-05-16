import AppError from "../../utils/appError";
import { CreateProjectDTO } from "./project.dto";
import prisma from '../../lib/prisma';
import { NotificationService } from "../notifications/notification.service";

export class ProjectService {
    async createProject(data: CreateProjectDTO) {
        const existingProject = await prisma.project.findFirst({
            where: {
                title: data.title,
                ownerId: data.ownerId,
                deletedAt: null
            }
        });

        if (existingProject) {
            throw new AppError("Tên dự án đã tồn tại", 400);
        }

        return prisma.project.create({
            data: {
                title: data.title,
                description: data.description,
                ownerId: data.ownerId
            }
        });
    }

    async getUserProjects(userId: string) {
        return prisma.project.findMany({
            where: {
                deletedAt: null,
                OR: [
                    { ownerId: userId },
                    { members: { some: { id: userId } } }
                ]
            },
            include: {
                owner: {
                    select: {
                        id: true,
                        fullname: true,
                        avatar: true
                    }
                },
                members: {
                    select: {
                        id: true,
                        fullname: true,
                        avatar: true
                    }
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        });
    }

    async updateProject(projectId: string, userId: string, data: Partial<CreateProjectDTO>) {
        const existingProject = await prisma.project.findFirst({
            where: { id: projectId, deletedAt: null }
        });

        if (!existingProject) {
            throw new AppError('Không tìm thấy dự án', 404);
        }

        if (existingProject.ownerId !== userId) {
            throw new AppError("Bạn không có quyền sửa dự án này", 403);
        }

        if (data.title) {
            const duplicateProject = await prisma.project.findFirst({
                where: {
                    title: data.title,
                    ownerId: userId,
                    deletedAt: null,
                    NOT: {
                        id: projectId
                    }
                }
            });

            if (duplicateProject) {
                throw new AppError("Tên dự án đã tồn tại", 409);
            }
        }

        return prisma.project.update({
            where: { id: projectId },
            data: {
                title: data.title,
                description: data.description
            }
        });
    }

    async deleteProject(projectId: string, userId: string) {
        const existingProject = await prisma.project.findFirst({
            where: { id: projectId, deletedAt: null }
        });

        if (!existingProject) {
            throw new AppError("Không tìm thấy dự án", 404);
        }

        if (existingProject.ownerId !== userId) {
            throw new AppError("Bạn không có quyền xóa dự án này", 403);
        }

        await prisma.project.update({
            where: { id: projectId },
            data: { deletedAt: new Date() }
        });

        return {
            message: "Xóa dự án thành công"
        };
    }

    async addMember(projectId: string, ownerId: string, memberEmail: string) {
        const project = await prisma.project.findFirst({
            where: { id: projectId, deletedAt: null },
            include: { members: true }
        });

        if (!project) {
            throw new AppError("Dự án không tồn tại", 404);
        }

        if (project.ownerId !== ownerId) {
            throw new AppError("Chỉ chủ sở hữu mới có quyền thêm thành viên", 403);
        }

        const userToAdd = await prisma.user.findUnique({
            where: { email: memberEmail }
        });

        if (!userToAdd) {
            throw new AppError("Không tìm thấy người dùng với email này", 404);
        }

        if (userToAdd.id === ownerId) {
            throw new AppError("Bạn đã là chủ sở hữu dự án này", 400);
        }

        const isAlreadyMember = project.members.some((member: { id: string }) => member.id === userToAdd.id);
        if (isAlreadyMember) {
            throw new AppError("Người dùng này đã là thành viên của dự án", 400);
        }

        const updatedProject = await prisma.project.update({
            where: { id: projectId },
            data: {
                members: {
                    connect: { id: userToAdd.id }
                }
            },
            include: {
                members: {
                    select: {
                        id: true,
                        fullname: true,
                        email: true,
                        avatar: true
                    }
                }
            }
        });

        await NotificationService.createNotification({
            userId: userToAdd.id,
            type: "PROJECT_INVITATION",
            title: "Bạn được thêm vào dự án",
            content: `Bạn đã được thêm vào dự án "${project.title}"`,
            link: `/tasks?projectId=${project.id}`
        });

        return updatedProject;
    }

    async getProjectMembers(projectId: string, userId: string) {
        const project = await prisma.project.findFirst({
            where: { id: projectId, deletedAt: null },
            include: {
                members: {
                    select: {
                        id: true,
                        fullname: true,
                        email: true,
                        avatar: true
                    }
                },
                owner: {
                    select: {
                        id: true,
                        fullname: true,
                        email: true,
                        avatar: true
                    }
                }
            }
        });

        if (!project) {
            throw new AppError("Không tìm thấy dự án", 404);
        }

        const isMember = project.members.some((member: { id: string }) => member.id === userId);
        const isOwner = project.ownerId === userId;

        if (!isMember && !isOwner) {
            throw new AppError("Bạn không có quyền xem thông tin này", 403);
        }

        return {
            owner: project.owner,
            members: project.members
        };
    }
}

export const projectService = new ProjectService();
