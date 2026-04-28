import { Request, Response, NextFunction } from 'express';

const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    //  Lấy statusCode và status từ err, nếu không có thì mặc định (500 và 'error')
    const statusCode = err.statusCode || 500;
    const status = err.status || 'error';

    // Xác định môi trường hiện tại
    const isDevelopment = process.env.NODE_ENV === 'development';

    if(isDevelopment){
        // Môi trường phát triển: trả về đầy đủ thông tin để debug
        res.status(statusCode).json({
            status,
            message: err.message,
            stack: err.stack,
            error: err, // Gửi toàn bộ obj lỗi để đễ xem chi tiết 
        });
    }else{
        // Môi trường production
        // Ghi log chi tiết lỗi (thay thể console.error bằng Wintons sau )
        console.error('ERROR: ', err);

        if(err.isOperational){
            // lỗi vận hành (do ta chủ động tạo bằng AppError): an toàn để gửi cho client 
            res.status(statusCode).json({
                status,
                message: err.message,
            });
        }else{
            // Lỗi lập trình hoặc lỗi không xác định: ẩn chi tiết khỏi client
            res.status(statusCode).json({
                status: 'error',
                message: 'Something went wrong!'
            });
        }
    }
};

export default globalErrorHandler;