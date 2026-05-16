import { DragDropContext } from '@hello-pangea/dnd';
import TaskColumn from './TaskColumn';
import { TASK_STATUSES } from '../../constants/taskStatus';

export default function TaskBoard({ tasks, onTaskClick, selectedTaskId, onDragEnd }) {
  const getColumnTasks = (status) =>
    tasks
      .filter((task) => task.status === status || (status === 'IN_PROGRESS' && task.status === 'REVIEW'))
      .sort((a, b) => (a.position ?? 0) - (b.position ?? 0));

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex gap-6 overflow-x-auto pb-4 h-full items-start">
        {TASK_STATUSES.map((col) => (
          <TaskColumn
            key={col.id}
            title={col.title}
            status={col.id}
            tasks={getColumnTasks(col.id)}
            onTaskClick={onTaskClick}
            selectedTaskId={selectedTaskId}
          />
        ))}
      </div>
    </DragDropContext>
  );
}
