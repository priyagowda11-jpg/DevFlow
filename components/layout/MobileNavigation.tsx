"use client";

import React from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Sidebar } from '@/components/layout/Sidebar';
import { cn } from '@/lib/utils';

export const MobileNavigation = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  return (
    <>
      <div
        className={cn(
          'fixed inset-0 z-40 bg-neutral-950/50 backdrop-blur-sm transition-opacity duration-300',
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        )}
        onClick={onClose}
      />
      <div
        className={cn(
          'fixed top-0 left-0 h-full z-50 w-72 bg-neutral-50 dark:bg-neutral-950 transition-transform duration-300 ease-in-out border-r border-neutral-200 dark:border-neutral-800',
          isOpen ? 'translate-x-0' : '-translate-x-full',
          'surface-layered'
        )}
      >
        <div className="p-6 flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 mb-4">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 bg-primary-500 rounded-lg flex-shrink-0 flex items-center justify-center text-white font-bold shadow-sm">D</div>
            <span className="text-lg font-bold tracking-tight text-neutral-900 dark:text-white">DevFlow</span>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose} className="p-1 rounded-xl hover:bg-neutral-200 dark:hover:bg-neutral-800">
            <X className="h-5 w-5" />
          </Button>
        </div>
        <div className="h-[calc(100vh-80px)] overflow-y-auto">
          <Sidebar isOpen={true} toggleSidebar={() => {}} onItemClick={onClose} />
        </div>
      </div>
    </>
  );
};
