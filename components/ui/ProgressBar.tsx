import * as React from 'react';
import { cn } from '@/lib/utils';

export interface ProgressBarProps {
  value: number; // 0 to 100
  max?: number;
  className?: string;
  showValue?: boolean;
  color?: 'primary' | 'secondary' | 'accent' | 'support';
}

const colorMap = {
  primary: 'bg-primary-500',
  secondary: 'bg-secondary-500',
  accent: 'bg-accent-500',
  support: 'bg-support-500',
};

export const ProgressBar = ({
  value,
  max = 100,
  className,
  showValue,
  color = 'primary',
}: ProgressBarProps) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  return (
    <div className={cn('w-full space-y-1.5', className)}>
      <div className="h-2 w-full overflow-hidden rounded-full bg-neutral-200 dark:bg-neutral-800">
        <div
          className={cn(
            'h-full transition-all duration-500 ease-out',
            colorMap[color]
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
      {showValue && (
        <div className="flex justify-end text-xs font-medium text-text-muted">
          {Math.round(percentage)}%
        </div>
      )}
    </div>
  );
};
