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

    // Lấy danh sách project (User chỉ xem được project của chính họ)
    async getUserProjects(userId: string) {
        // Lấy toàn bộ list project của user đã đăng nhập 
        try{
            // findMany -> Lấy nhiều record 
            return await prisma.project.findMany({
                // CHỈ lấy project thuộc về user hiện tại
                where:  { ownerId: userId }
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
}

export const projectService = new ProjectService();