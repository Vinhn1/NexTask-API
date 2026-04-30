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
}