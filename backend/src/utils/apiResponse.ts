//  Lớp chuẩn hóa Res trả về cho client 
import { Response } from 'express';


export class ApiResponse<T = any> {
    public success: boolean;
    public message: string;
    public data: T | null;
    public statusCode: number;
    //  Chứa thông tin phân trang (page, limit, total...)
    public meta?: any;
    // Chứa chi tiết lỗi (vd: validate fail)
    public errors?: any;

    constructor(statusCode: number, message: string, data: T | null = null, meta?: any, errors?: any){
        this.statusCode = statusCode;
        this.message = message;
        this.data = data;
        this.meta = meta;
        this.errors = errors;
        // Logic xác định success dựa trên statusCode
        this.success = statusCode >= 200 && statusCode < 300; 
    }

    //  Tạo 1 STATIC METHOD để dùng nhanh 
    static success<T>(res: Response, message: string, data: T, statusCode = 200, meta?: any){
        return res.status(statusCode).json(
            new ApiResponse(statusCode, message, data, meta)
        );
    }

    // Response lỗi 
    static error(res: Response, message: string, statusCode = 500, errors?: any){
        return res.status(statusCode).json(new ApiResponse(statusCode, message, null, undefined, errors));
    }
}