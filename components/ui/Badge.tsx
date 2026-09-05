import * as React from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?:
    | 'todo' | 'in-progress' | 'completed' | 'on-hold' // Status
    | 'low' | 'medium' | 'high' | 'critical'           // Priority
    | 'course' | 'project' | 'achievement' | 'certificate'; // Category
}

const badgeVariants = {
  // Status
  todo: 'bg-neutral-200 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300',
  'in-progress': 'bg-secondary-100 text-secondary-700 dark:bg-secondary-900/40 dark:text-secondary-300',
  completed: 'bg-primary-100 text-primary-700 dark:bg-primary-900/40 dark:text-primary-300',
  'on-hold': 'bg-support-100 text-support-700 dark:bg-support-900/40 dark:text-support-300',

  // Priority
  low: 'bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400',
  medium: 'bg-support-100 text-support-700 dark:bg-support-900/40 dark:text-support-300',
  high: 'bg-accent-100 text-accent-700 dark:bg-accent-900/40 dark:text-accent-300',
  critical: 'bg-accent-600 text-white dark:bg-accent-600 dark:text-white',

  // Categories
  course: 'bg-secondary-100 text-secondary-700 dark:bg-secondary-900/40 dark:text-secondary-300',
  project: 'bg-primary-100 text-primary-700 dark:bg-primary-900/40 dark:text-primary-300',
  achievement: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
  certificate: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
};

export const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant = 'todo', children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium transition-colors',
          badgeVariants[variant],
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Badge.displayName = 'Badge';
