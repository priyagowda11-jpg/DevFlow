"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

interface NavigationItemProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  className?: string;
  onClick?: () => void;
}

export const NavigationItem = ({ href, icon, label, className, onClick }: NavigationItemProps) => {
  const pathname = usePathname();
  const isActive = pathname === href || pathname.startsWith(href + '/');

  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        'flex items-center gap-3 px-3 py-2 rounded-lg transition-all group',
        'text-sm font-medium',
        isActive
          ? 'bg-primary-50 text-primary-700 dark:bg-primary-900/20 dark:text-primary-400 font-semibold shadow-sm border-l-4 border-primary-500'
          : 'text-text-muted hover:bg-neutral-100 hover:text-text-main dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-neutral-50',
        className
      )}
    >
      <span className={cn(
        'transition-colors',
        isActive ? 'text-primary-600' : 'text-text-muted group-hover:text-text-main dark:text-neutral-500 dark:group-hover:text-neutral-300'
      )}>
        {icon}
      </span>
      {label}
    </Link>
  );
};
