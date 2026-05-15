import React from 'react';

export default function TaskDetailSidebar({ task, onClose, project }) {
  if (!task) return null;

  return (
    <div className="w-[400px] flex-shrink-0 bg-white border-l border-[#e4e1ed] flex flex-col h-full shadow-[-10px_0_20px_rgba(0,0,0,0.02)] relative z-10 animate-fade-in-right rounded-r-2xl overflow-hidden">
      <div className="p-5 border-b border-[#e4e1ed] flex items-center justify-between bg-white sticky top-0">
        <div className="flex items-center gap-3">
          <span className="px-2 py-1 bg-[#e1e0ff] text-[#2f2ebe] text-xs font-bold rounded">
            NT-{task.id.substring(0, 4)}
          </span>
          <span className="flex items-center gap-1.5 text-sm font-semibold text-[#767586]">
            <span className="material-symbols-rounded text-[16px]">folder</span>
            {project?.title || 'Dự án chung'}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <button className="w-8 h-8 flex items-center justify-center text-[#767586] hover:bg-[#f2effb] hover:text-[#4648d4] rounded-lg transition-colors">
            <span className="material-symbols-rounded text-[20px]">open_in_full</span>
          </button>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center text-[#767586] hover:bg-[#ffdad6] hover:text-[#93000a] rounded-lg transition-colors">
            <span className="material-symbols-rounded text-[20px]">close</span>
          </button>
        </div>
      </div>

      <div className="p-6 overflow-y-auto flex-1 custom-scrollbar">
        <h2 className="text-[24px] font-extrabold text-[#1b1b23] leading-tight mb-8">
          {task.title}
        </h2>

        <div className="grid grid-cols-2 gap-6 mb-8">
          <div>
            <label className="block text-[11px] font-bold text-[#767586] uppercase tracking-wider mb-3">Người phụ trách</label>
            <div className="flex items-center gap-3 p-2 -ml-2 rounded-xl hover:bg-[#fcf8ff] cursor-pointer transition-colors border border-transparent hover:border-[#e4e1ed]">
              <div className="w-10 h-10 rounded-full bg-[#c0c1ff] flex items-center justify-center text-[#07006c] font-bold text-lg shadow-sm border-2 border-white">
                {task.assignee ? task.assignee.charAt(0).toUpperCase() : 'U'}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-bold text-[#1b1b23] text-sm leading-tight truncate">{task.assignee || 'Chưa phân công'}</div>
                <div className="text-[11px] text-[#767586] font-medium mt-0.5">Thành viên</div>
              </div>
              <span className="material-symbols-rounded text-[#767586] text-[18px]">expand_more</span>
            </div>
          </div>
          <div>
            <label className="block text-[11px] font-bold text-[#767586] uppercase tracking-wider mb-3">Hạn chót</label>
            <div className="flex items-center gap-3 p-2 -ml-2 rounded-xl hover:bg-[#fcf8ff] cursor-pointer transition-colors border border-transparent hover:border-[#e4e1ed]">
              <div className="w-10 h-10 rounded-xl bg-[#e1e0ff] flex items-center justify-center text-[#4648d4] shadow-sm">
                <span className="material-symbols-rounded text-[20px]">calendar_month</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-bold text-[#1b1b23] text-sm leading-tight truncate">
                  {task.dueDate ? new Date(task.dueDate).toLocaleDateString('vi-VN', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Chưa thiết lập'}
                </div>
                {task.dueDate && <div className="text-[11px] text-[#767586] font-medium mt-0.5">5:00 PM</div>}
              </div>
            </div>
          </div>
        </div>

        <div className="mb-8 p-5 bg-[#fcf8ff] rounded-2xl border border-[#efecf8]">
          <div className="flex justify-between items-end mb-3">
            <span className="text-[13px] font-bold text-[#464554]">Tiến độ công việc</span>
            <span className="text-sm font-bold text-[#4648d4]">
              {task.status === 'DONE' ? '100%' : task.status === 'IN_PROGRESS' ? '65%' : '0%'}
            </span>
          </div>
          <div className="h-2 w-full bg-[#e4e1ed] rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-[#4648d4] to-[#57dffe] rounded-full transition-all duration-500" 
                 style={{ width: task.status === 'DONE' ? '100%' : task.status === 'IN_PROGRESS' ? '65%' : '0%' }}></div>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-bold text-[#1b1b23] mb-3">Mô tả</h3>
          <div className="text-[#464554] text-[15px] leading-relaxed whitespace-pre-wrap bg-[#fcf8ff]/50 p-4 rounded-2xl border border-transparent hover:border-[#e4e1ed] transition-colors">
            {task.description || 'Chưa có mô tả cho nhiệm vụ này. Vui lòng thêm chi tiết công việc, mục tiêu và tài liệu liên quan.'}
          </div>
        </div>
      </div>

      <div className="p-4 border-t border-[#e4e1ed] bg-white">
        <div className="flex items-center gap-3 bg-[#fcf8ff] border border-[#e4e1ed] rounded-xl p-2 focus-within:border-[#4648d4] focus-within:ring-4 focus-within:ring-[#e1e0ff] transition-all shadow-sm">
          <input 
            type="text" 
            placeholder="Viết bình luận..." 
            className="flex-1 bg-transparent border-none outline-none text-sm px-2 text-[#1b1b23] placeholder:text-[#767586]"
          />
          <button className="w-9 h-9 bg-[#4648d4] text-white rounded-lg flex items-center justify-center hover:bg-[#3537c0] transition-colors shadow-sm shadow-indigo-200">
            <span className="material-symbols-rounded text-[18px]">send</span>
          </button>
        </div>
      </div>
    </div>
  );
}
