import { ProjectTask, Project } from '@/types/project';
import { TaskCard } from './TaskCard';
import { cn } from '@/lib/utils';
import { LayoutList } from 'lucide-react';

interface KanbanColumnProps {
  status: ProjectTask['status'];
  tasks: ProjectTask[];
  projects: Project[];
  onTaskClick: (task: ProjectTask) => void;
  className?: string;
}

export const KanbanColumn = ({ status, tasks, projects, onTaskClick, className }: KanbanColumnProps) => {
  const getProjectForTask = (projectId: string) => projects.find(p => p.id === projectId);

  const statusConfig = {
    Todo: {
      color: 'bg-neutral-400',
      bg: 'bg-neutral-100/50 dark:bg-neutral-900/40',
      border: 'border-neutral-200 dark:border-neutral-800',
    },
    'In Progress': {
      color: 'bg-amber-500',
      bg: 'bg-amber-50/50 dark:bg-amber-900/20',
      border: 'border-amber-200 dark:border-amber-900/30',
    },
    Done: {
      color: 'bg-emerald-500',
      bg: 'bg-emerald-50/50 dark:bg-emerald-900/20',
      border: 'border-emerald-200 dark:border-emerald-900/30',
    },
  };

  const config = statusConfig[status];

  return (
    <div className={cn('flex flex-col w-full min-w-[340px] max-w-[480px] h-full', className)}>
      <div className="flex items-center justify-between mb-6 px-2">
        <div className="flex items-center gap-3">
          <div className={cn(
            'h-3 w-3 rounded-full shadow-sm ring-4 ring-opacity-20',
            config.color,
            status === 'Todo' ? 'ring-neutral-400' :
            status === 'In Progress' ? 'ring-amber-500' :
            'ring-emerald-500'
          )} />
          <h3 className="text-sm font-black text-neutral-500 dark:text-neutral-400 uppercase tracking-widest">
            {status}
          </h3>
          <span className="text-xs font-bold bg-neutral-200 dark:bg-neutral-800 px-2 py-0.5 rounded-full text-neutral-600 dark:text-neutral-400">
            {tasks.length}
          </span>
        </div >
      </div >

      <div className={cn(
        'flex-1 space-y-4 overflow-y-auto px-2 pb-8 rounded-3xl transition-colors duration-300 border',
        config.bg,
        config.border
      )}>
        {tasks.length === 0 ? (
          <div className="p-12 rounded-2xl border-2 border-dashed border-neutral-200 dark:border-neutral-800 text-center space-y-4 bg-white/50 dark:bg-neutral-900/50">
            <div className="mx-auto h-12 w-12 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-neutral-300">
              <LayoutList className="h-6 w-6" />
            </div >
            <p className="text-xs text-secondary italic font-medium">No tasks in this stage</p>
          </div >
        ) : (
          tasks.map(task => (
            <TaskCard
              key={task.id}
              task={task}
              project={getProjectForTask(task.projectId)!}
              onClick={() => onTaskClick(task)}
            />
          ))
        )}
      </div >
    </div>
  );
};
