import React from 'react';
import { cn } from '@/lib/utils';
import { AlertCircle } from 'lucide-react';

interface ErrorStateProps {
  title: string;
  description: string;
  action?: React.ReactNode;
  className?: string;
}

export const ErrorState = ({ title, description, action, className }: ErrorStateProps) => {
  return (
    <div className={cn(
      'flex flex-col items-center justify-center text-center p-12 space-y-6',
      className
    )}>
      <div className="h-24 w-24 rounded-3xl bg-accent-100 dark:bg-accent-900/30 flex items-center justify-center text-accent-600 mb-2 transition-transform hover:scale-110 duration-300">
        <AlertCircle className="h-12 w-12" />
      </div>
      <div className="space-y-3">
        <h3 className="text-page-title text-accent-600">{title}</h3>
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
