import * as React from 'react';
import { cn } from '@/lib/utils';

export interface TooltipProps {
  text: string;
  children: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
}

export const Tooltip = ({ text, children, position = 'top' }: TooltipProps) => {
  const [isVisible, setIsVisible] = React.useState(false);

  const positionClasses = {
    top: 'bottom-full mb-2 left-1/2 -translate-x-1/2',
    bottom: 'top-full mt-2 left-1/2 -translate-x-1/2',
    left: 'right-full mr-2 top-1/2 -translate-y-1/2',
    right: 'left-full ml-2 top-1/2 -translate-y-1/2',
  };

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div
          className={cn(
            'absolute z-50 px-2 py-1 text-xs font-medium text-white bg-neutral-950 rounded shadow-sm transition-opacity duration-150 pointer-events-none whitespace-nowrap',
            positionClasses[position],
            'animate-in fade-in zoom-in-95'
          )}
        >
          {text}
          <div className={cn(
            'absolute w-2 h-2 rotate-45 bg-neutral-950',
            position === 'top' && '-bottom-1 left-1/2 -translate-x-1/2',
            position === 'bottom' && '-top-1 left-1/2 -translate-x-1/2',
            position === 'left' && '-right-1 top-1/2 -translate-y-1/2',
            position === 'right' && '-left-1 top-1/2 -translate-y-1/2',
          )} />
        </div>
      )}
    </div>
  );
};
