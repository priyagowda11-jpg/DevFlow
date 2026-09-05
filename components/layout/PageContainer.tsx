import React from 'react';
import { cn } from '@/lib/utils';

interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
}

export const PageContainer = ({ children, className }: PageContainerProps) => {
  return (
    <div className={cn(
      'w-full max-w-7xl mx-auto px-6 py-8 space-y-8',
      className
    )}>
      {children}
    </div>
  );
};
