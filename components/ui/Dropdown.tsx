import * as React from 'react';
import { cn } from '@/lib/utils';

export interface DropdownItemProps {
  onClick?: () => void;
  icon?: React.ReactNode;
  leftIcon?: React.ReactNode;
  children: React.ReactNode;
  disabled?: boolean;
  className?: string;
}

const DropdownItem = ({ onClick, icon, leftIcon, children, disabled, className }: DropdownItemProps) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={cn(
      'flex w-full items-center px-3 py-2 text-sm text-left transition-colors',
      'hover:bg-neutral-100 dark:hover:bg-neutral-800 disabled:opacity-50 disabled:pointer-events-none',
      'text-text-main dark:text-neutral-300',
      className
    )}
  >
    {(icon || leftIcon) && <span className="mr-2">{icon || leftIcon}</span>}
    {children}
  </button>
);

export interface DropdownProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  align?: 'left' | 'right';
}

export const Dropdown = ({ trigger, children, align = 'left' }: DropdownProps) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className="relative inline-block">
      <div onClick={() => setIsOpen(!isOpen)} className="cursor-pointer">
        {trigger}
      </div>
      {isOpen && (
        <div
          className={cn(
            'absolute z-50 mt-2 w-48 rounded-md border border-neutral-200 bg-neutral-50 p-1 shadow-elevated transition-all animate-in fade-in slide-in-0 duration-100',
            'dark:bg-neutral-900 dark:border-neutral-800',
            align === 'right' ? 'right-0' : 'left-0'
          )}
        >
          {children}
        </div>
      )}
    </div>
  );
};

Dropdown.Item = DropdownItem;
