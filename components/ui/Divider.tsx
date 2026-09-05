import * as React from 'react';
import { cn } from '@/lib/utils';

export interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'subtle' | 'strong';
}

export const Divider = ({ className, variant = 'subtle', ...props }: DividerProps) => {
  const variants = {
    subtle: 'border-neutral-200 dark:border-neutral-800',
    strong: 'border-neutral-300 dark:border-neutral-700',
  };

  return (
    <div
      className={cn('border-t w-full', variants[variant], className)}
      {...props}
    />
  );
};
