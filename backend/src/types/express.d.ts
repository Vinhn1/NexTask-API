import { User } from "../generated/prisma";

// "Mở rộng phạm vi global của TypeScript"
declare global {
    // đang can thiệp vào namespace của Express
    namespace Express {
        // merge thêm thuộc tính vào Request cũ
        interface Request {
            user?: User; // Gắn thêm user vào Request của Express 
        }
    }
}