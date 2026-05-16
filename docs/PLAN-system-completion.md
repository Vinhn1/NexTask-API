# 📋 Kế hoạch hoàn thiện hệ thống NexTask Pro (Pre-Deployment)

> **Mục tiêu:** Hoàn thiện các tính năng cốt lõi, UI/UX đồng bộ và bảo mật trước khi triển khai lên server sản xuất.

---

## 🏗️ Phase 1: Quản lý Dự án & Đồng bộ hóa Dữ liệu (Project Lifecycle)

**Mục tiêu:** Click đổi dự án thì toàn bộ hệ thống (Tasks, Dashboard, Analytics) phải cập nhật theo.

- [ ] **Frontend: Xây dựng `ProjectContext`**
    - Lưu trữ `currentProject` toàn cục.
    - Đồng bộ `projectId` vào URL Search Params để khi refresh trang không bị mất context.
- [ ] **UI: Sidebar Project Switcher**
    - Thiết kế Dropdown chuyên nghiệp ở đầu Sidebar.
    - Hỗ trợ tìm kiếm nhanh dự án trong danh sách.
    - Hiển thị thông tin dự án hiện tại (Icon, tên, vai trò người dùng).
- [ ] **Frontend: Refactor Data Fetching**
    - Cập nhật các trang Dashboard, Tasks, Analytics để lắng nghe sự thay đổi của `projectId`.
    - Tự động fetch lại dữ liệu khi `projectId` thay đổi.

---

## 🔐 Phase 2: Nâng cấp Hệ thống Auth (Social & Security)

**Mục tiêu:** Đa dạng hóa phương thức đăng nhập và bảo mật tài khoản.

- [x] **Social Auth (Google & GitHub)**
    - Backend: Cấu hình Passport.js hoặc thư viện OAuth.
    - Frontend: Thêm nút login với Google/GitHub tại trang `AuthPage`.
- [x] **Forgot Password Flow**
    - Backend: API gửi email chứa Reset Token (thời hạn 15-30p).
    - Frontend: Trang nhập email và trang đặt lại mật khẩu mới từ link email.
    - Tích hợp **Nodemailer** với dịch vụ SMTP (Gmail/SendGrid).

---

## 👥 Phase 3: Quản lý Đội nhóm & Lời mời (Team Management)

**Mục tiêu:** Xây dựng quy trình mời thành viên chuyên nghiệp và bảo mật.

- [ ] **Trang Đội nhóm (Team Page)**
    - Hiển thị danh sách thành viên trong dự án hiện tại.
    - Phân quyền (Owner, Member, Viewer).
- [ ] **Hệ thống Lời mời (Invitation System)**
    - **Logic**: Thay vì thêm trực tiếp, hệ thống sẽ lưu vào bảng `ProjectInvitation` trạng thái `PENDING`.
    - **Email**: Gửi thông báo mời tham gia vào email người dùng.
    - **Accept Flow**: Người dùng click vào link trong email -> Đăng nhập (nếu chưa) -> Chấp nhận/Từ chối lời mời.
    - Chỉ sau khi chấp nhận mới chính thức được thêm vào dự án.

---

## 🖼️ Phase 4: Profile & Cloud Assets

**Mục tiêu:** Lưu trữ tài nguyên tĩnh (Avatar) bền vững.

- [ ] **Cloudinary Integration**
    - Backend: Cấu hình Cloudinary SDK và Multer.
    - Upload avatar người dùng lên cloud thay vì lưu local file.
- [ ] **Profile Completion**
    - Kết nối trang Profile với API cập nhật thông tin.
    - Cho phép đổi Avatar, cập nhật Bio, Fullname.

---

## 🏠 Phase 5: Hoàn thiện Landing Page (Home/Marketing)

**Mục tiêu:** Xây dựng bộ mặt chuyên nghiệp cho ứng dụng.

- [ ] **Xây dựng các Section tại Home Page**
    - **Features**: Giới thiệu các tính năng nổi bật.
    - **Pricing**: Bảng giá các gói dịch vụ.
    - **About Us**: Thông tin về đội ngũ/sản phẩm.
- [ ] **Navbar Navigation**: Kết nối các menu trên Navbar Home đến đúng các section hoặc trang tương ứng.

---

## 🚀 Phase 6: Chuẩn bị Deployment (Final Check)

- [ ] **Environment Variables Audit**: Đảm bảo tất cả secret keys (Cloudinary, OAuth, DB) đều có trong file `.env`.
- [ ] **Build Optimization**: Kiểm tra lại bundle size và performance.
- [ ] **Health Check**: Tạo API endpoint `/health` để server monitoring.

---

## 🛠️ Phân công Agent

- **Backend Specialist**: Xử lý OAuth, Email Service, Invitation Logic, Cloudinary.
- **Frontend Specialist**: Xây dựng UI Team Page, Project Switcher, ProjectContext, Home Sections.
- **Project Planner**: Giám sát tiến độ và kiểm tra tính nhất quán giữa các phase.

---
*Kế hoạch này được thiết kế để đảm bảo tính sẵn sàng cao nhất trước khi NexTask chính thức "go live".*
