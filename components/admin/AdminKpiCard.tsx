'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';
import { cn } from '@/lib/utils';

interface AdminKpiCardProps {
  label: string;
  value: string | number;
  trend?: {
    label: string;
    value: string;
    type: 'up' | 'down' | 'stable';
  };
  icon: React.ReactNode;
  colorClass?: string; // e.g., 'bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400'
}

export const AdminKpiCard = ({
  label,
  value,
  trend,
  icon,
  colorClass = 'bg-neutral-50 dark:bg-neutral-900/30 text-neutral-600 dark:text-neutral-400',
}: AdminKpiCardProps) => {
  return (
    <Card
      variant="elevated"
      className="p-6 space-y-4 border-neutral-200 dark:border-neutral-800 surface-layered group transition-all hover:shadow-xl hover:-translate-y-1"
    >
      <div className={cn(
        'flex items-center justify-center h-12 w-12 rounded-2xl shadow-sm transition-transform group-hover:scale-110',
        colorClass
      )}>
        {icon}
      </div>
      <div className="space-y-1">
        <span className="text-[10px] font-black uppercase tracking-widest text-neutral-400 block">
          {label}
        </span>
        <div className="text-3xl font-black text-neutral-900 dark:text-white tracking-tighter">
          {value}
        </div>
        {trend && (
          <div className={cn(
            'text-[10px] font-bold uppercase tracking-tighter',
            trend.type === 'up' ? 'text-emerald-500' : trend.type === 'down' ? 'text-red-500' : 'text-neutral-400'
          )}>
            {trend.value} {trend.label}
          </div>
        )}
      </div>
    </Card>
  );
};
