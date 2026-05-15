import { Request, Response, NextFunction } from 'express';
import { projectService } from './project.service'


export class ProjectController {
    async create(req: Request, res: Response, next: NextFunction) {
        try{

            // Lấy title và desc từ body 
            const { title, description } = req.body;

            //  Lấy id an toàn từ token 
            const ownerId = req.user!.id;

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
            const userId = req.user!.id as string;

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
    async update(req: Request, res: Response, next: NextFunction){
        try{

            // Lấy project ID
            const { id } = req.params;

            // Lấy dữ liệu
            const data = req.body;

            // Lấy User ID
            const userId = req.user!.id as string;

            // Gọi service 
            const project = await projectService.updateProject(id as string, userId, data);

            // Trả về res
            res.status(200).json({
                status: 'success',
                data: { project }
            })
        }catch(error){
            next(error);
        }
    }


    // Delete 
    async delete(req: Request, res: Response, next: NextFunction){
        try{
            // Lấy id từ params 
            const { id } = req.params;

            // Lấy userId 
            const userId = req.user!.id as string;

            // Gọi service 
            const result = await projectService.deleteProject(id as string, userId);

            res.status(200).json({
                status: 'success',
                ...result
            })
        }catch(error){
            next(error);
        }
    }

    async addMember(req: Request, res: Response, next: NextFunction) {
        try {
            const { projectId } = req.params;
            const { email } = req.body;
            const ownerId = req.user!.id;

            const project = await projectService.addMember(projectId, ownerId, email);

            res.status(200).json({
                status: 'success',
                data: { project }
            });
        } catch (error) {
            next(error);
        }
    }

    async getMembers(req: Request, res: Response, next: NextFunction) {
        try {
            const { projectId } = req.params;
            const userId = req.user!.id;

            const members = await projectService.getProjectMembers(projectId, userId);

            res.status(200).json({
                status: 'success',
                data: { ...members }
            });
        } catch (error) {
            next(error);
        }
    }
}