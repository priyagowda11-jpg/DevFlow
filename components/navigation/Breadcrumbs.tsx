import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface BreadcrumbsProps {
  items: { label: string; href: string }[];
  className?: string;
}

export const Breadcrumbs = ({ items, className }: BreadcrumbsProps) => {
  return (
    <nav aria-label="Breadcrumb" className={cn('flex items-center gap-2 text-sm text-secondary', className)}>
      {items.map((item, index) => (
        <React.Fragment key={`${item.href}-${index}`}>
          {index > 0 && (
            <span className="text-neutral-400">/</span>
          )}
          <Link
            href={item.href}
            className={cn(
              'hover:text-text-main transition-colors',
              index === items.length - 1 && 'text-text-main font-medium pointer-events-none'
            )}
          >
            {item.label}
          </Link>
        </React.Fragment>
      ))}
    </nav>
  );
};
