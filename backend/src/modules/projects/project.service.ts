import AppError from "../../utils/appError";
import { CreateProjectDTO } from "./project.dto";
import prisma from '../../lib/prisma';

// Gọi DB Project, Thực thi "Luật chơi" -> Chỉ chủ dự án mới được quyền sửa dự án...
// Xử lý dữ liệu 
// Tái sử dụng 
export class ProjectService {
    // Tạo mới project
    async createProject(data: CreateProjectDTO) {
        try{

            // 1. Kiểm tra logic nghiệp vụ (luật chơi)
            // Ví dụ: không cho phép tên dự án trùng với dự án của cùng một chủ sở hữu
            const existingProject = await prisma.project.findFirst({
                where: {
                    title: data.title, // So sánh title trong DB với title client gửi lên.
                    ownerId: data.ownerId // Đảm bảo kiểm tra theo từng user
                }
            })

            // Kiểm tra sự tồn tại 
            if(existingProject){
                throw new AppError("Tên dự án đã tồn tại", 400);
            }

            // Trả về kết quả Project mới 
            return await prisma.project.create({
                data: {
                    title: data.title,
                    description: data.description,
                    ownerId: data.ownerId
                }
            });

        }catch(error){
            throw error;
        }

    }  

    // Lấy danh sách project (User xem được project họ tạo HOẶC họ là thành viên)
    async getUserProjects(userId: string) {
        try{
            return await prisma.project.findMany({
                where: {
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
            })
        }catch(error){  
            throw error;
        }
    }


    // Update
    async updateProject(projectId: string, userId: string, data: Partial<CreateProjectDTO>) {
        try{

            // Tìm project hiện tại
            const existingProject = await prisma.project.findUnique({
                where: { id: projectId }
            });

            // Kiểm tra project có tồn tại không 
            if(!existingProject){
                throw new AppError('Không tìm thấy dự án', 404);
            }

            // Kiểm tra quyền sở hữu 
            if(existingProject.ownerId !== userId){
                throw new AppError(
                    "Bạn không có quyền sửa dự án này", 403
                );
            }

            // Nếu user muốn sửa title
            if(data.title){
                // Kiểm tra title có bị trùng không 
                const duplicateProject = await prisma.project.findFirst({
                    where: {
                        title: data.title,
                        ownerId: userId,
                        // Không kiểm tra chính project hiện tại
                        NOT: {
                            id: projectId
                        }
                    }
                });

                // Nếu bị trùng
                if(duplicateProject){
                    throw new AppError("Tên dự án đã tồn tại", 409);
                }
            }

            // Update project
            const updateProject = await prisma.project.update({
                where: {
                    id: projectId
                },
                data: {
                    title: data.title,
                    description: data.description
                }
            });

            // Trả về dữ liệu mới
            return updateProject;

        }catch(error){
            throw error;
        }
    }

    // Delete 
    async deleteProject(projectId: string, userId: string){
        try{
             // Tìm Project 
            const existingProject = await prisma.project.findUnique({
                where: {
                    id: projectId
                }
            })

            // Kiểm tra tồn tại 
            if(!existingProject){
                throw new AppError("Không tìm thấy dự án", 404);
            }

            // Kiểm tra quyền sở hữu 
            if(existingProject.ownerId !== userId){
                throw new AppError("Bạn không có quyền xóa dự án này", 403);
            }

            // Delete 
            await prisma.project.delete({
                where: {
                    id: projectId
                }
            })

            // return res 
            return {
                message: "Xóa dự án thành công"
            }
        }catch(error){
            throw error;
        }
       
    }

    // Add Member
    async addMember(projectId: string, ownerId: string, memberEmail: string) {
        try {
            // 1. Kiểm tra project tồn tại và check quyền owner
            const project = await prisma.project.findUnique({
                where: { id: projectId },
                include: { members: true }
            });

            if (!project) {
                throw new AppError("Dự án không tồn tại", 404);
            }

            if (project.ownerId !== ownerId) {
                throw new AppError("Chỉ chủ sở hữu mới có quyền thêm thành viên", 403);
            }

            // 2. Tìm user theo email
            const userToAdd = await prisma.user.findUnique({
                where: { email: memberEmail }
            });

            if (!userToAdd) {
                throw new AppError("Không tìm thấy người dùng với email này", 404);
            }

            // 3. Không cho phép thêm chính mình
            if (userToAdd.id === ownerId) {
                throw new AppError("Bạn đã là chủ sở hữu dự án này", 400);
            }

            // 4. Kiểm tra user đã là thành viên chưa
            const isAlreadyMember = project.members.some(member => member.id === userToAdd.id);
            if (isAlreadyMember) {
                throw new AppError("Người dùng này đã là thành viên của dự án", 400);
            }

            // 5. Thêm thành viên
            return await prisma.project.update({
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
        } catch (error) {
            throw error;
        }
    }

    // Lấy danh sách thành viên của project
    async getProjectMembers(projectId: string, userId: string) {
        try {
            const project = await prisma.project.findUnique({
                where: { id: projectId },
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

            // Kiểm tra user có thuộc project này không (là owner hoặc member)
            const isMember = project.members.some(m => m.id === userId);
            const isOwner = project.ownerId === userId;

            if (!isMember && !isOwner) {
                throw new AppError("Bạn không có quyền xem thông tin này", 403);
            }

            return {
                owner: project.owner,
                members: project.members
            };
        } catch (error) {
            throw error;
        }
    }
}

export const projectService = new ProjectService();