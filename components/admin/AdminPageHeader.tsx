'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface AdminPageHeaderProps {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  actions?: React.ReactNode;
  breadcrumbs?: BreadcrumbItem[];
  className?: string;
}

export const AdminPageHeader = ({
  title,
  subtitle,
  icon,
  actions,
  breadcrumbs,
  className,
}: AdminPageHeaderProps) => {
  return (
    <div className={cn('space-y-6', className)}>
      {/* Breadcrumbs */}
      {breadcrumbs && breadcrumbs.length > 0 && (
        <nav className="flex items-center gap-2 text-xs font-medium text-neutral-400">
          {breadcrumbs.map((crumb, idx) => (
            <React.Fragment key={crumb.label}>
              {idx > 0 && <span className="text-neutral-300 dark:text-neutral-600">/</span>}
              {crumb.href ? (
                <a
                  href={crumb.href}
                  className="hover:text-primary-500 transition-colors"
                >
                  {crumb.label}
                </a>
              ) : (
                <span className="text-neutral-600 dark:text-neutral-300 font-bold">
                  {crumb.label}
                </span>
              )}
            </React.Fragment>
          ))}
        </nav>
      )}

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-3 text-primary-600 dark:text-primary-400">
            {icon && (
              <div className="p-2 rounded-xl bg-primary-50 dark:bg-primary-900/30 shadow-sm">
                {icon}
              </div>
            )}
            {icon && <span className="text-xs font-black uppercase tracking-widest">{title.split(' ').pop()} Manager</span>}
          </div>
          <div className="space-y-1">
            <h1 className="text-3xl font-black tracking-tight text-neutral-900 dark:text-white">
              {title}
            </h1>
            {subtitle && (
              <p className="text-secondary text-lg font-medium">
                {subtitle}
              </p>
            )}
          </div>
        </div>
        {actions && <div className="flex items-center gap-3">{actions}</div>}
      </div>
    </div>
  );
};
