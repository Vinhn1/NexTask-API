import { Request, Response, NextFunction } from 'express';
import  { ApiResponse } from '../utils/apiResponse';
import { AppError } from '../utils/appError';

const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    //  Lấy statusCode và status từ err, nếu không có thì mặc định (500 và 'error')
    err.statusCode = err.statusCode || 500;

    // DEVELOPMENT MODE
    // Hiển thị toàn bộ lỗi để debug
    if(process.env.NODE_ENV === 'development'){
        console.error('DEV ERROR ', err);
        return ApiResponse.error(
            res,
            err.message,
            err.statusCode,
            err.stack
        );
    }else{
        // PRODUCTION MODE
        // Không được leak thông tin hệ thống
        // Lỗi do ta chủ động xử lý 
        if(err.isOperational){
            return ApiResponse.error(
                res,
                err.message,
                err.statusCode
            );
        }

        // Lỗi hệ thống không xác định 
        console.error('PRODUCTION ERROR: ', err);

        return ApiResponse.error(
            res,
            'Something went very wrong!',
            500
        ); 
    }
};

export default globalErrorHandler;