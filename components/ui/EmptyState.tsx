import React from 'react';
import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface EmptyStateProps {
  title: string;
  description: string;
  icon?: ReactNode;
  action?: ReactNode;
  className?: string;
}

export const EmptyState = ({ title, description, icon, action, className }: EmptyStateProps) => {
  return (
    <div className={cn(
      'flex flex-col items-center justify-center text-center p-12 space-y-6',
      className
    )}>
      {icon && (
        <div className="h-24 w-24 rounded-3xl bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-neutral-300 dark:text-neutral-600 transition-transform hover:scale-110 duration-300 mb-2">
          {/* We remove cloneElement to avoid TS errors and just render the icon.
              The calling component should provide an icon with the correct size or we can wrap it. */}
          <div className="h-12 w-12 flex items-center justify-center">
            {icon}
          </div>
        </div>
      )}
      <div className="space-y-3">
        <h3 className="text-page-title text-neutral-900 dark:text-white">{title}</h3>
        <p className="text-secondary text-base max-w-md mx-auto leading-relaxed">{description}</p>
      </div>
      {action && (
        <div className="pt-2">
          {action}
        </div>
      )}
    </div>
  );
};
