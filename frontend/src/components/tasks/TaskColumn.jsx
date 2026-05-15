import React from 'react';
import TaskCard from './TaskCard';

export default function TaskColumn({ title, status, tasks, onTaskClick, selectedTaskId }) {
  return (
    <div className="flex-shrink-0 w-[320px] bg-[#fcf8ff] flex flex-col h-full rounded-2xl">
      <div className="flex items-center justify-between mb-4 px-2 py-1 relative">
        {/* Empty div for spacing balance */}
        <div className="w-8"></div>
        <div className="absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 flex items-center gap-2">
          <h3 className="text-[15px] font-bold text-[#1b1b23]">{title}</h3>
          <span className="px-2 py-0.5 rounded-full bg-[#e4e1ed] text-[#464554] text-xs font-bold">
            {tasks.length}
          </span>
        </div>
        <button className="text-[#767586] hover:text-[#1b1b23] transition-colors p-1 relative z-10">
          <span className="material-symbols-rounded text-[20px]">more_horiz</span>
        </button>
      </div>

      <div className="flex flex-col gap-3 overflow-y-auto pb-4 px-2 custom-scrollbar flex-1">
        {tasks.map(task => (
          <TaskCard 
            key={task.id} 
            task={task} 
            onClick={onTaskClick} 
            isSelected={selectedTaskId === task.id}
          />
        ))}
        <button className="w-full py-3 border-2 border-dashed border-[#e4e1ed] rounded-xl text-[#767586] font-semibold text-sm hover:border-[#4648d4] hover:text-[#4648d4] hover:bg-white transition-all flex items-center justify-center gap-1 mt-1">
          <span className="material-symbols-rounded text-[18px]">add</span>
          Thêm nhiệm vụ
        </button>
      </div>
    </div>
  );
}
