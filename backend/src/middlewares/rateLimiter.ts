import rateLimit, { ipKeyGenerator } from 'express-rate-limit';

// Middleware giới hạn số request từ client
export const rateLimiter = rateLimit({
    // 15 phút
    windowMs: 15 * 60 * 1000,

    // Tối đa 100 request / IP
    max: 100,

    // Response khi vượt quá giới hạn
    message: {
        success: false,
        statusCode: 429,
        message: 'Có quá nhiều yêu cầu từ địa chỉ IP này, vui lòng thử lại sau.',
        data: null,
        errors: null
    },

    // Trả về rate limit trong header
    standardHeaders: true,

    // tắt các header cũ
    legacyHeaders: false    
});


export const authLimiter = rateLimit({
    // 1 giờ
    windowMs: 60 * 60 * 1000,
    max: 5,

    // Mặc định express-rate-limit key theo IP → mọi user cùng IP đều bị block chung.
    // Fix: key theo "IP + email" để mỗi tài khoản bị đếm riêng biệt.
    // ipKeyGenerator: helper chính thức của v8, xử lý chuẩn cả IPv4 lẫn IPv6
    keyGenerator: (req) => {
        const ip = ipKeyGenerator(req);
        const email = (req.body?.email || 'unknown').toLowerCase().trim();
        return `${ip}:${email}`;
    },

    message: {
        success: false,
        statusCode: 429,
        message: 'Bạn đã đăng nhập quá 5 lần, Vui lòng thử lại sau',
        data: null,
        errors: null
    },

    // Trả về rate limit trong header
    standardHeaders: true,

    // Tắt các header cũ
    legacyHeaders: false    
})