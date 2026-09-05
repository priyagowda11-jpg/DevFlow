import * as React from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export const Modal = ({ isOpen, onClose, title, children, className }: ModalProps) => {
  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-neutral-950/40 backdrop-blur-sm transition-opacity" />

      {/* Modal Content */}
      <div
        className={cn(
          'relative w-full max-w-lg overflow-hidden rounded-xl bg-neutral-50 shadow-elevated transition-all animate-in fade-in zoom-in-95 duration-200',
          'dark:bg-neutral-900 dark:border dark:border-neutral-800',
          className
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-neutral-200 p-4 dark:border-neutral-800">
          <h3 className="text-lg font-semibold text-text-main dark:text-neutral-50">
            {title}
          </h3>
          <button
            onClick={onClose}
            className="rounded-md p-1 text-text-muted hover:bg-neutral-200 dark:text-neutral-400 dark:hover:bg-neutral-800 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
};
