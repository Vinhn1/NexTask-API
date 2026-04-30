import { PrismaClient } from "../../generated/prisma";
import AppError from "../../utils/appError";
import { CreateProjectDTO } from "./project.dto";

const prisma = new PrismaClient();

// Gọi DB Project, Thực thi "Luật chơi" -> Chỉ chủ dự án mới được quyền sửa dự án...
// Xử lý dữ liệu 
// Tái sử dụng 
export class ProjectService {
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
}