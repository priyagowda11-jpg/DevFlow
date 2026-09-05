import * as React from 'react';
import { cn } from '@/lib/utils';

export interface AvatarProps {
  src?: string;
  fallback: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  status?: 'online' | 'offline' | 'away' | 'busy';
}

const sizeMap = {
  sm: 'h-8 w-8 text-xs',
  md: 'h-12 w-12 text-sm',
  lg: 'h-16 w-16 text-base',
  xl: 'h-24 w-24 text-lg',
};

const statusMap = {
  online: 'bg-primary-500',
  offline: 'bg-neutral-400',
  away: 'bg-support-500',
  busy: 'bg-accent-500',
};

export const Avatar = ({ src, fallback, className, size = 'md', status }: AvatarProps) => {
  return (
    <div className={cn('relative inline-block', sizeMap[size], className)}>
      <div className={cn('flex h-full w-full items-center justify-center overflow-hidden rounded-full bg-neutral-200 text-text-muted dark:bg-neutral-800 dark:text-neutral-400', sizeMap[size])}>
        {src ? (
          <img src={src} alt={fallback} className="h-full w-full object-cover" />
        ) : (
          <span className="font-semibold">{fallback.slice(0, 2).toUpperCase()}</span>
        )}
      </div>
      {status && (
        <span className={cn(
          'absolute bottom-0 right-0 block h-1/4 w-1/4 rounded-full border-2 border-background',
          statusMap[status]
        )} />
      )}
    </div>
  );
};
