import { Project, ProjectTask } from '@/types/project';
import { KanbanColumn } from './KanbanColumn';
import { cn } from '@/lib/utils';
import { Layout } from 'lucide-react';

interface TaskBoardProps {
  tasks: ProjectTask[];
  projects: Project[];
  onTaskSelect: (task: ProjectTask) => void;
  className?: string;
}

export const TaskBoard = ({ tasks, projects, onTaskSelect, className }: TaskBoardProps) => {
  const columns: ProjectTask['status'][] = ['Todo', 'In Progress', 'Done'];

  return (
    <div className={cn(
      'relative flex gap-8 overflow-x-auto pb-12 p-8 rounded-[2.5rem] bg-neutral-100/40 dark:bg-neutral-900/40 border border-neutral-200 dark:border-neutral-800 snap-x',
      className
    )}>
      <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 shadow-sm mb-4 sticky left-0 z-10">
        <Layout className="h-4 w-4 text-primary-500" />
        <span className="text-xs font-bold uppercase tracking-widest text-neutral-600 dark:text-neutral-400">Kanban Board</span>
      </div >
      {columns.map(status => (
        <KanbanColumn
          key={status}
          status={status}
          tasks={tasks.filter(t => t.status === status)}
          projects={projects}
          onTaskClick={onTaskSelect}
          className="snap-center"
        />
      ))}
    </div>
  );
};
