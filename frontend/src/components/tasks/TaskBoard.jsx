import React from 'react';
import TaskColumn from './TaskColumn';
import { DragDropContext } from '@hello-pangea/dnd';


export default function TaskBoard({ tasks, onTaskClick, selectedTaskId, onDragEnd }) {
  const columns = [
    { id: 'TODO', title: 'Cần làm', badgeBg: 'bg-[#fcf8ff]', badgeText: 'text-[#767586]' },
    { id: 'IN_PROGRESS', title: 'Đang làm', badgeBg: 'bg-[#e1e0ff]', badgeText: 'text-[#3537c0]' },
    { id: 'DONE', title: 'Hoàn thành', badgeBg: 'bg-[#e2fbe8]', badgeText: 'text-[#128a31]' }
  ];

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex gap-6 overflow-x-auto pb-4 h-full items-start">
        {columns.map(col => (
          <TaskColumn
            key={col.id}
            title={col.title}
            status={col.id}
            tasks={tasks.filter(t => t.status === col.id)}
            onTaskClick={onTaskClick}
            selectedTaskId={selectedTaskId}
          />
        ))}
      </div>
    </DragDropContext>

  );
}
