/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/**/*.test.ts'], // Chỉ chạy các file có đuôi .test.ts
  verbose: true,
  forceExit: true,
  clearMocks: true,
  resetMocks: true,
  restoreMocks: true,
  // Load .env trước khi bất kỳ test nào chạy
  // Đây là lý do Prisma bị lỗi: DATABASE_URL = undefined khi Jest chạy
  setupFiles: ['dotenv/config'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1', // Support alias nếu bạn có dùng
  },
};
