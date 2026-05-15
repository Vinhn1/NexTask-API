import React from 'react';

export default function TaskCard({ task, onClick, isSelected }) {
  const getPriorityStyles = (prio) => {
    switch (prio) {
      case 'HIGH': return { border: 'border-l-[#ba1a1a]', badgeBg: 'bg-[#ffdad6]', badgeText: 'text-[#93000a]', label: 'CAO' };
      case 'MEDIUM': return { border: 'border-l-[#b55d00]', badgeBg: 'bg-[#ffdcc5]', badgeText: 'text-[#703700]', label: 'TRUNG BÌNH' };
      default: return { border: 'border-l-[#767586]', badgeBg: 'bg-[#e4e1ed]', badgeText: 'text-[#464554]', label: 'THẤP' };
    }
  };

  const prio = getPriorityStyles(task.priority);

  return (
    <div 
      onClick={() => onClick(task)}
      className={`bg-white rounded-xl cursor-pointer transition-all border-l-[4px] flex-shrink-0 ${prio.border} 
      ${isSelected ? 'ring-2 ring-[#4648d4] shadow-md shadow-indigo-100' : 'border-t border-r border-b border-[#e4e1ed] shadow-sm hover:shadow-md'}`}
    >
      <div className="p-4">
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          <span className={`px-2 py-0.5 rounded text-[10px] font-bold tracking-wider ${prio.badgeBg} ${prio.badgeText}`}>
            {prio.label}
          </span>
          {task.status === 'IN_PROGRESS' && (
            <span className="px-2 py-0.5 rounded text-[10px] font-bold tracking-wider bg-[#e1e0ff] text-[#2f2ebe]">
              ĐANG LÀM
            </span>
          )}
        </div>
        <h4 className="text-[15px] font-bold text-[#1b1b23] mb-4 leading-tight">{task.title}</h4>
        
        {task.status === 'IN_PROGRESS' && (
          <div className="mb-4">
            <div className="flex justify-between text-[11px] font-bold mb-1.5 text-[#767586] uppercase tracking-wider">
              <span>Tiến độ</span>
              <span className="text-[#4648d4]">65%</span>
            </div>
            <div className="h-1.5 w-full bg-[#efecf8] rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-[#4648d4] to-[#57dffe] rounded-full" style={{ width: '65%' }}></div>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between mt-auto pt-2">
          <div className="flex -space-x-2">
            {task.assignee ? (
              <div className="w-7 h-7 rounded-full bg-[#c0c1ff] border-2 border-white flex items-center justify-center text-[10px] font-bold text-[#07006c] shadow-sm">
                {task.assignee.charAt(0).toUpperCase()}
              </div>
            ) : (
              <div className="w-7 h-7 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-[10px] font-bold text-gray-500 shadow-sm">
                ?
              </div>
            )}
          </div>
          <div className="flex items-center gap-3 text-[#767586]">
            {task.dueDate && (
              <div className="flex items-center gap-1.5 text-xs font-semibold">
                <span className="material-symbols-rounded text-[14px]">calendar_today</span>
                {new Date(task.dueDate).toLocaleDateString('vi-VN', { month: 'short', day: 'numeric' })}
              </div>
            )}
            <div className="flex items-center gap-1 text-xs font-semibold">
              <span className="material-symbols-rounded text-[14px]">chat_bubble</span>
              {Math.floor(Math.random() * 5)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
