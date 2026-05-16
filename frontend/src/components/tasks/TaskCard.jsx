import { Draggable } from "@hello-pangea/dnd";
import { getTaskStatus } from "../../constants/taskStatus";

export default function TaskCard({ task, index, onClick, isSelected }) {
  const getPriorityStyles = (prio) => {
    switch (prio) {
      case 'URGENT': return { border: 'border-l-[#93000a]', badgeBg: 'bg-[#ffdad6]', badgeText: 'text-[#93000a]', label: 'KHAN CAP' };
      case 'HIGH': return { border: 'border-l-[#ba1a1a]', badgeBg: 'bg-[#ffdad6]', badgeText: 'text-[#93000a]', label: 'CAO' };
      case 'MEDIUM': return { border: 'border-l-[#b55d00]', badgeBg: 'bg-[#ffdcc5]', badgeText: 'text-[#703700]', label: 'TRUNG BINH' };
      default: return { border: 'border-l-[#767586]', badgeBg: 'bg-[#e4e1ed]', badgeText: 'text-[#464554]', label: 'THAP' };
    }
  };

  const prio = getPriorityStyles(task.priority);
  const status = getTaskStatus(task.status);

  return (
    <Draggable draggableId={task.id.toString()} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          onClick={() => onClick(task)}
          style={{
            ...provided.draggableProps.style,
            opacity: snapshot.isDragging ? 0.8 : 1,
            transform: snapshot.isDragging ? provided.draggableProps.style?.transform : 'none',
          }}
          className={`bg-white rounded-xl cursor-pointer transition-all border-l-[4px] flex-shrink-0 ${prio.border}
          ${isSelected ? 'ring-2 ring-[#4648d4] shadow-md shadow-indigo-100' : 'border-t border-r border-b border-[#e4e1ed] shadow-sm hover:shadow-md'}
          ${snapshot.isDragging ? 'rotate-2 scale-105 z-50 shadow-2xl' : ''}`}
        >
          <div className="p-4">
            <div className="flex items-center gap-2 mb-3 flex-wrap">
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold tracking-wider ${prio.badgeBg} ${prio.badgeText}`}>
                {prio.label}
              </span>
              {task.status !== 'TODO' && (
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold tracking-wider ${status.badgeBg} ${status.badgeText}`}>
                  {status.shortLabel}
                </span>
              )}
            </div>

            <h4 className="text-[15px] font-bold text-[#1b1b23] mb-4 leading-tight">{task.title}</h4>

            {status.progress > 0 && status.progress < 100 && (
              <div className="mb-4">
                <div className="flex justify-between text-[11px] font-bold mb-1.5 text-[#767586] uppercase tracking-wider">
                  <span>Tien do</span>
                  <span className="text-[#4648d4]">{status.progress}%</span>
                </div>
                <div className="h-1.5 w-full bg-[#efecf8] rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-[#4648d4] to-[#57dffe] rounded-full" style={{ width: `${status.progress}%` }} />
                </div>
              </div>
            )}

            <div className="flex items-center justify-between mt-auto pt-2">
              <div className="flex -space-x-2">
                {task.assignee ? (
                  <div
                    title={task.assignee.fullname || task.assignee.name}
                    className="w-7 h-7 rounded-full bg-[#c0c1ff] border-2 border-white flex items-center justify-center text-[10px] font-bold text-[#07006c] shadow-sm"
                  >
                    {(task.assignee.fullname || task.assignee.name || 'U').charAt(0).toUpperCase()}
                  </div>
                ) : (
                  <div title="Chua phan cong" className="w-7 h-7 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-[10px] font-bold text-gray-500 shadow-sm">
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
                  {task.commentCount ?? task.comments?.length ?? 0}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
}
