import fs from 'fs';
import path from 'path';

/**
 * Hàm xóa file cũ khi cập nhật ảnh mới
 * @param relativePath - Đường dẫn tương đối lưu trong DB (vd: /uploads/avatars/abc.jpg)
 */

export const deleteFile = (relativePath: string): void => {
    
    if(!relativePath) return;
    // chuyển relative path thành absolute path trên ổ cứng 
    const absolutePath = path.join(
        __dirname,
        '../../public',
        relativePath.replace(/^\/+/, '')
    );

    // Kiểm tra file có tồn tại không 
    if(fs.existsSync(absolutePath)){
        // Xóa file bất đồng bộ
        fs.unlink(absolutePath, (err) => {
            if(err){
                console.error(`Không thể xóa file tại ${absolutePath}:`, err);
            }else{
                console.log(`Đã xóa file cũ: ${absolutePath}`);
            }
        });
    }
};