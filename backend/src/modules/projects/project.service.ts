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


    // Delete 
}

export const projectService = new ProjectService();