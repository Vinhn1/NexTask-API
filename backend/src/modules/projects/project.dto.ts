// DTO là các đối tượng được thiết kế riêng để vận chuyển dữ liệu giữa các tiến trình (ví dụ từ API Client vào Server). Nó không chứa logic nghiệp vụ, chỉ chứa dữ liệu
export interface CreateProjectDTO {
    title: string;
    description?: string;
    ownerId: string;
}