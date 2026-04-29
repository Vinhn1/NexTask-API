// Xử lý logic nghiệp vụ: hash pass, gọi DB, 
import prisma from '../../lib/prisma';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
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

    // Login
    async login(data: any){
        // Lấy email, pass từ data 
        const { email, password } = data;

        // Tìm User trong DB bằng email 
        const user = await prisma.user.findUnique({
            where: {email}
        });

        // Nếu tìm thấy user, dùng bcrypt.compare() để so sánh password với user.passwordHash
        if(!user){
            throw new AppError("Thông tin đăng nhập không chính xác", 401);
        }

        // Nếu sai mật khẩu -> Báo lỗi Unauthencational (401)
        const isMatch = await bcrypt.compare(password, user.passwordHash);

        // Nếu mật khẩu đúng -> Tiến hành ký access token và Refresh Token
        if(!isMatch){
            throw new AppError("Email hoặc mật khẩu không chính xác!", 401);
        }

        // Tạo Access Token (Ngắn hạn - 15 phút)
        const accessToken = jwt.sign(
            {userId: user.id},
            process.env.JWT_ACCESS_TOKEN as string,
            { expiresIn: '15m' }
        );

        // Tạo refreshToken (Dài hạn - 7 ngày)
        const refreshToken = jwt.sign(
            {userId: user.id},
            process.env.JWT_REFRESH_TOKEN as string,
            {expiresIn: '7d'}
        )

        // Trả về dữ liệu dùng Destructuring để loại bỏ passwordHash ra khỏi user 
        const { passwordHash, ...userWithoutPassword } = user;

        // Trả về token và thông tin user "sạch" (không kèm password)
        return{
            user: userWithoutPassword,
            accessToken, 
            refreshToken
        }

    }
}

export const authService = new AuthService();
