class AppError extends Error {
    // Khai báo thuộc tính statusCode (kiểu số 403, 401, 200...)
    public statusCode: number;
    // Khai báo thuộc tính status (kiểu chuỗi - VD: 'fail' hoặc 'error') 
    public status: string;
    // Phân biệt lỗi do ta chủ động và lỗi hệ thống
    public isOperational: boolean;

    constructor(message: string, statusCode: number){
        // Gọi constructor của lớp Error cha 
        super(message);
        this.statusCode = statusCode;
        this.status = statusCode.toString().startsWith('4') ? 'fail' : 'error';
        // Đánh dấu đây là lỗi chủ động do ta ném ra
        this.isOperational = true;

        // Loại bỏ hàm constructor của stack trace để dẽ debug
        (Error as any).captureStackTrace(this, this.constructor);
    }

}

export default AppError;