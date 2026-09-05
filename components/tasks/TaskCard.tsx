'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { ProjectTask, ProjectPriority, Project } from '@/types/project';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Calendar, CheckCircle2 } from 'lucide-react';
import { storage } from '@/lib/storage';
import { useRouter } from 'next/navigation';

interface TaskCardProps {
  task: ProjectTask;
  project: Project;
  onClick?: () => void;
  className?: string;
}

export const TaskCard = ({ task, project, onClick, className }: TaskCardProps) => {
  const router = useRouter();
  const isCompleted = task.status === 'Done';

  const handleComplete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isCompleted) {
      storage.completeTask(task.id);
      router.refresh();
    }
  };

  const priorityColors: Record<ProjectPriority, string> = {
    Low: 'bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400',
    Medium: 'bg-secondary-100 text-secondary-600 dark:bg-secondary-900/30 dark:text-secondary-400',
    High: 'bg-accent-100 text-accent-600 dark:bg-accent-900/30 dark:text-accent-400',
    Critical: 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400',
  };

  const statusColors: Record<ProjectTask['status'], string> = {
    Todo: 'bg-neutral-400',
    'In Progress': 'bg-amber-500',
    Done: 'bg-emerald-500',
  };

  return (
    <Card
      variant="elevated"
      onClick={onClick}
      className={cn(
        'group relative flex flex-col p-5 transition-all cursor-pointer surface-layered overflow-hidden',
        'hover:shadow-xl hover:-translate-y-1 active:translate-y-0',
        isCompleted ? 'opacity-70 grayscale-[0.3]' : 'hover:ring-2 hover:ring-primary-500/20',
        className
      )}
    >
      {/* Status Indicator Strip */}
      <div className={cn(
        'absolute left-0 top-0 bottom-0 w-1.5 transition-colors duration-300',
        statusColors[task.status]
      )} />

      <div className="flex items-start justify-between mb-3 gap-2">
        <div className="flex items-center gap-2">
          <Badge
            variant="project"
            className="text-[9px] px-2 py-0.5 rounded-md bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 border border-primary-100 dark:border-primary-800 font-black uppercase tracking-tighter"
          >
            {project.name}
          </Badge>
        </div>
        <span className={cn(
          'text-[9px] font-black uppercase px-2 py-0.5 rounded-md shadow-sm transition-colors',
          priorityColors[task.priority]
        )}>
          {task.priority}
        </span>
      </div>

      <h4 className={cn(
        'text-sm font-black text-neutral-900 dark:text-white mb-4 line-clamp-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors leading-tight',
        isCompleted && 'line-through text-neutral-400 dark:text-neutral-500'
      )}>
        {task.title}
      </h4>

      <div className="flex items-center justify-between mt-auto pt-4 border-t border-neutral-100 dark:border-neutral-800">
        <div className="flex items-center gap-1.5 text-[10px] text-secondary font-bold">
          <Calendar className="h-3 w-3 opacity-70" />
          <span className={cn(
            task.dueDate && new Date(task.dueDate) < new Date() && !isCompleted
              ? 'text-red-500 font-black'
              : ''
          )}>
            {task.dueDate || 'No date'}
          </span>
        </div>
        {!isCompleted ? (
          <button
            onClick={handleComplete}
            className={cn(
              'flex items-center gap-1.5 px-3 py-1 rounded-lg transition-all interactive-sink',
              'text-[10px] text-primary-600 dark:text-primary-400 font-black uppercase tracking-wide',
              'hover:bg-primary-50 dark:hover:bg-primary-900/30 hover:text-primary-700 dark:hover:text-primary-300'
            )}
          >
            <CheckCircle2 className="h-3 w-3" />
            <span className="hidden sm:inline">Complete</span>
          </button>
        ) : (
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 font-black uppercase tracking-wide text-[10px]">
            <CheckCircle2 className="h-3 w-3" />
            <span className="hidden sm:inline">Done</span>
          </div>
        )}
      </div>
    </Card>
  );
};
