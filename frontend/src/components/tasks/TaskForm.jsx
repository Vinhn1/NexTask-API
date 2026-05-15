import { useState } from "react";
import taskService from "../../services/taskService";

export default function TaskForm({ isOpen, onClose, projectId, onTaskCreated, projectMembers = [] }) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "MEDIUM",
    status: "TODO",
    dueDate: "",
    assigneeId: "",
  });


  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title) return;

    setLoading(true);
    try {
      // Format dueDate to ISO string if it exists
      const submissionData = {
        ...formData,
        projectId: projectId || formData.projectId, // Fallback if passed via props or state
      };

      // Zod backend validate assigneeId là UUID — không được gửi chuỗi rỗng
      if (!submissionData.assigneeId || submissionData.assigneeId.trim() === "") {
        delete submissionData.assigneeId;
      }

      if (submissionData.dueDate) {
        // Input type="date" returns YYYY-MM-DD. Convert to ISO format expected by backend.
        submissionData.dueDate = new Date(submissionData.dueDate).toISOString();
      } else {
        delete submissionData.dueDate;
      }

      if (!submissionData.projectId) {
        alert("Vui lòng chọn dự án để thêm nhiệm vụ.");
        setLoading(false);
        return;
      }

      const res = await taskService.createTask(submissionData);
      onTaskCreated(res.data);
      onClose();
      setFormData({
        title: "",
        description: "",
        priority: "MEDIUM",
        status: "TODO",
        dueDate: "",
        assigneeId: "",
      });
    } catch (error) {
      console.error("Create task error:", error);
      alert("Lỗi khi tạo nhiệm vụ. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-[#1b1b23]/40 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="relative bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden animate-zoom-in">
        <div className="p-6 border-b border-[#e4e1ed] flex items-center justify-between">
          <h2 className="text-xl font-extrabold text-[#1b1b23]">Thêm nhiệm vụ mới</h2>
          <button 
            onClick={onClose}
            className="w-9 h-9 flex items-center justify-center text-[#767586] hover:bg-[#ffdad6] hover:text-[#93000a] rounded-xl transition-all"
          >
            <span className="material-symbols-rounded">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-5">
            {/* Title */}
            <div>
              <label className="block text-xs font-bold text-[#767586] uppercase tracking-wider mb-2 ml-1">Tiêu đề nhiệm vụ</label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Vd: Thiết kế Landing Page cho dự án..."
                className="w-full px-4 py-3 bg-[#fcf8ff] border border-[#e4e1ed] rounded-2xl text-[15px] font-medium text-[#1b1b23] focus:outline-none focus:border-[#4648d4] focus:ring-4 focus:ring-[#e1e0ff] transition-all placeholder:text-[#767586]/60"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-bold text-[#767586] uppercase tracking-wider mb-2 ml-1">Mô tả công việc</label>
              <textarea
                rows="4"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Mô tả chi tiết về các bước thực hiện, mục tiêu..."
                className="w-full px-4 py-3 bg-[#fcf8ff] border border-[#e4e1ed] rounded-2xl text-[15px] font-medium text-[#1b1b23] focus:outline-none focus:border-[#4648d4] focus:ring-4 focus:ring-[#e1e0ff] transition-all placeholder:text-[#767586]/60 resize-none"
              ></textarea>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* Priority */}
              <div>
                <label className="block text-xs font-bold text-[#767586] uppercase tracking-wider mb-2 ml-1">Mức độ ưu tiên</label>
                <div className="relative">
                  <select
                    value={formData.priority}
                    onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                    className="w-full appearance-none px-4 py-3 bg-[#fcf8ff] border border-[#e4e1ed] rounded-2xl text-[15px] font-medium text-[#1b1b23] focus:outline-none focus:border-[#4648d4] focus:ring-4 focus:ring-[#e1e0ff] transition-all"
                  >
                    <option value="LOW">Thấp (Low)</option>
                    <option value="MEDIUM">Trung bình (Medium)</option>
                    <option value="HIGH">Cao (High)</option>
                    <option value="URGENT">Khẩn cấp (Urgent)</option>
                  </select>
                  <span className="material-symbols-rounded absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[#767586]">expand_more</span>
                </div>
              </div>

              {/* Due Date */}
              <div>
                <label className="block text-xs font-bold text-[#767586] uppercase tracking-wider mb-2 ml-1">Hạn chót</label>
                <input
                  type="date"
                  value={formData.dueDate}
                  onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                  className="w-full px-4 py-3 bg-[#fcf8ff] border border-[#e4e1ed] rounded-2xl text-[15px] font-medium text-[#1b1b23] focus:outline-none focus:border-[#4648d4] focus:ring-4 focus:ring-[#e1e0ff] transition-all"
                />
              </div>
            </div>

            {/* Assignee */}
            <div>
              <label className="block text-xs font-bold text-[#767586] uppercase tracking-wider mb-2 ml-1">Người thực hiện</label>
              <div className="relative">
                <select
                  value={formData.assigneeId || ""}
                  onChange={(e) => setFormData({ ...formData, assigneeId: e.target.value })}
                  className="w-full appearance-none px-4 py-3 bg-[#fcf8ff] border border-[#e4e1ed] rounded-2xl text-[15px] font-medium text-[#1b1b23] focus:outline-none focus:border-[#4648d4] focus:ring-4 focus:ring-[#e1e0ff] transition-all"
                >
                  <option value="">Chưa giao cho ai</option>
                  {projectMembers.map(member => (
                    <option key={member.id} value={member.id}>
                      {member.fullname} ({member.email})
                    </option>
                  ))}
                </select>
                <span className="material-symbols-rounded absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[#767586]">person</span>
              </div>
            </div>


            {/* Status */}
            <div>
              <label className="block text-xs font-bold text-[#767586] uppercase tracking-wider mb-2 ml-1">Trạng thái ban đầu</label>
              <div className="flex flex-wrap gap-2">
                {['TODO', 'IN_PROGRESS', 'REVIEW', 'DONE'].map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setFormData({ ...formData, status: s })}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                      formData.status === s 
                        ? "bg-[#4648d4] border-[#4648d4] text-white shadow-md shadow-indigo-100" 
                        : "bg-white border-[#e4e1ed] text-[#767586] hover:bg-[#fcf8ff]"
                    }`}
                  >
                    {s.replace('_', ' ')}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3.5 px-4 border border-[#e4e1ed] text-[#767586] font-bold rounded-2xl hover:bg-[#fcf8ff] transition-all"
            >
              Hủy bỏ
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-[2] py-3.5 px-4 bg-[#4648d4] text-white font-bold rounded-2xl hover:bg-[#3537c0] transition-all shadow-lg shadow-indigo-100 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <span className="material-symbols-rounded animate-spin">refresh</span>
              ) : (
                <span className="material-symbols-rounded">check_circle</span>
              )}
              {loading ? "Đang xử lý..." : "Tạo nhiệm vụ ngay"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
