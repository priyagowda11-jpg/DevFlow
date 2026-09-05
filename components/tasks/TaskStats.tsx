import React from 'react';
import { CheckCircle2, Clock, Circle, ListTodo } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TaskStatsProps {
  stats: {
    total: number;
    todo: number;
    inProgress: number;
    completed: number;
  };
  className?: string;
}

export const TaskStats = ({ stats, className }: TaskStatsProps) => {
  const statItems = [
    { label: 'Total Tasks', value: stats.total, icon: ListTodo, color: 'text-neutral-500' },
    { label: 'To Do', value: stats.todo, icon: Circle, color: 'text-neutral-400' },
    { label: 'In Progress', value: stats.inProgress, icon: Clock, color: 'text-blue-500' },
    { label: 'Completed', value: stats.completed, icon: CheckCircle2, color: 'text-emerald-500' },
  ];

  return (
    <div className={cn('grid grid-cols-2 md:grid-cols-4 gap-4', className)}>
      {statItems.map(item => (
        <div key={item.label} className="p-4 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className={cn('p-2 rounded-lg bg-neutral-50 dark:bg-neutral-800', item.color)}>
              <item.icon className="h-4 w-4" />
            </div>
            <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider">{item.label}</span>
          </div>
          <div className="text-2xl font-bold text-neutral-900 dark:text-white">{item.value}</div>
        </div>
      ))}
    </div>
  );
};
