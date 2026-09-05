'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface AdminProgressBarProps {
  progress: number;
  variant?: 'primary' | 'success' | 'warning' | 'danger' | 'neutral';
  className?: string;
  showPercentage?: boolean;
}

const variantStyles = {
  primary: 'from-primary-400 to-primary-600 shadow-[0_0_8px_rgba(16,185,129,0.3)]',
  success: 'from-emerald-400 to-emerald-600 shadow-[0_0_8px_rgba(16,185,129,0.3)]',
  warning: 'from-amber-400 to-amber-600 shadow-[0_0_8px_rgba(245,158,11,0.3)]',
  danger: 'from-red-400 to-red-600 shadow-[0_0_8px_rgba(239,68,68,0.3)]',
  neutral: 'from-neutral-400 to-neutral-600 shadow-none',
};

export const AdminProgressBar = ({
  progress = 0,
  variant = 'primary',
  className,
  showPercentage = false,
}: AdminProgressBarProps) => {
  const clampedProgress = Math.min(Math.max(progress, 0), 100);

  return (
    <div className={cn('flex items-center gap-3 w-full', className)}>
      <div className="h-3 w-full bg-neutral-100 dark:bg-neutral-800 rounded-full overflow-hidden p-0.5">
        <div
          className={cn(
            'h-full rounded-full transition-all duration-1000 bg-gradient-to-r',
            variantStyles[variant]
          )}
          style={{ width: `${clampedProgress}%` }}
        />
      </div>
      {showPercentage && (
        <span className="text-xs font-black text-neutral-900 dark:text-white min-w-[3rem] text-right">
          {Math.round(clampedProgress)}%
        </span>
      )}
    </div>
  );
};
