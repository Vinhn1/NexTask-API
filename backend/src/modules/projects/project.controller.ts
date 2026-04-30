import { Request, Response, NextFunction } from 'express';
import { projectService } from './project.service'
import { dto } from "./project.dto";

export class ProjectController {
    async create(req: Request, res: Response, next: NextFunction) {
        try{

            // Lấy title và desc từ body 
            const { title, description } = req.body;

            //  Lấy id an toàn từ token 
            const ownerId = req.user.id;

            //  Gom lại thành 1 obj DTO hoàn chỉnh gửi cho service 
            const project = await projectService.createProject({ title, description, ownerId });

            res.status(201).json({
                status: 'success',
                data: { project }
            });

        }catch(error){
            next(error);
        }
    }

    async getAll(req: Request, res: Response, next: NextFunction) {
        try{
            // Lấy userId
            // Vì chúng ta khai báo user? là optional trong file .d.ts, nên bạn cần dùng dấu ! (nếu chắc chắn có user) hoặc kiểm tra if.
            const userId = req.user!.id;

            // Gọi Service
            const projects = await projectService.getUserProjects(userId);

            // Trả về res 
            res.status(200).json({
                status: 'success',
                result: projects.length, // Trả về số lượng để frontend dễ làm việc 
                data: { projects }
            })
        }catch(error){
            next(error);
        }
    }

    // Update


    // Delete 
}