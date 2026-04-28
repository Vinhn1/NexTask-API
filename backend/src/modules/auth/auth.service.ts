// Xử lý logic nghiệp vụ: hash pass, gọi DB, 
import prisma from '../../lib/prisma';
import bcrypt from 'bcrypt';
import AppError from "../../utils/appError";


export class AuthService {
    async register(data: any) {
        
      
        const { email, password, fullname } = data;
        // TODO B1: Tìm user theo email sử dụng prisma.user.findUnique
        const existingUser = await prisma.user.findUnique({ where: { email }});
        
        // TODO B2: Nếu user đã tồn tại -> Quăng lỗi AppError(409, "Email đã tồn tại")
        if(existingUser) {
            throw new AppError("Email đã tồn tại!", 409);
        }

        // TODO B3: Hash mật khẩu (dùng bcrypt.hash với salt rounds là 10)
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds); 

        // TODO B4: Tạo user mới trong DB sử dụng prisma.user.create
        const newUser = await prisma.user.create({
            data: {
                email: email,
                // Tên trường phải khớp với schema.prisma
                passwordHash: hashedPassword,
                fullname: fullname,
            }
        });

        // TODO B5: Trả về dữ liệu sạch (xóa passwordHash trước khi return)
        // Lấy giá trị của trường passwordHash ra, ất cả những trường còn lại (id, email, fullname, createdAt,...) sẽ được "gom" lại và đóng gói vào một biến mới tên là userWithoutPassword
        const { passwordHash, ...userWithoutPassword } = newUser;
        return userWithoutPassword;
    }
}

export const authService = new AuthService();
