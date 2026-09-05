import * as React from 'react';
import { cn } from '@/lib/utils';

export interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circle' | 'rect';
  width?: string | number;
  height?: string | number;
}

export const Skeleton = ({ className, variant = 'text', width, height }: SkeletonProps) => {
  const baseStyles = 'animate-pulse rounded-lg bg-neutral-200 dark:bg-neutral-800';

  const variantStyles = {
    text: 'h-4 w-full',
    circle: 'rounded-full aspect-square',
    rect: 'w-full',
  };

  return (
    <div
      className={cn(
        baseStyles,
        variantStyles[variant],
        className
      )}
      style={{
        width: width ? (typeof width === 'number' ? `${width}px` : width) : undefined,
        height: height ? (typeof height === 'number' ? `${height}px` : height) : undefined,
      }}
    />
  );
};
