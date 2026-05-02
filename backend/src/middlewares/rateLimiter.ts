import rateLimit from 'express-rate-limit';

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
    message: {
        success: false,
        statusCode: 429,
        message: 'Bạn đã đăng nhập quá 5 lần, Vui lòng thử lại sau',
        data: null,
        errors: null
    },

        // Trả về rate limit trong header
    standardHeaders: true,

    // tắt các header cũ
    legacyHeaders: false    
})