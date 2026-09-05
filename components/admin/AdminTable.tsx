'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface Column<T> {
  key: string;
  label: string;
  render?: (value: any, row: T) => React.ReactNode;
  align?: 'left' | 'center' | 'right';
}

interface AdminTableProps<T> {
  columns: Column<T>[];
  data: T[];
  isLoading?: boolean;
  emptyState?: React.ReactNode;
  onRowClick?: (row: T) => void;
  className?: string;
}

export const AdminTable = <T extends { id: string }>({
  columns,
  data,
  isLoading = false,
  emptyState,
  onRowClick,
  className,
}: AdminTableProps<T>) => {
  return (
    <div className={cn('overflow-x-auto', className)}>
      <table className="w-full text-left text-sm">
        <thead className="bg-neutral-50 dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800 text-neutral-400 uppercase text-[10px] font-black tracking-widest">
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                className={cn(
                  'px-6 py-4 font-medium',
                  col.align === 'center' && 'text-center',
                  col.align === 'right' && 'text-right'
                )}
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800">
          {isLoading ? (
            Array.from({ length: 5 }).map((_, i) => (
              <tr key={i} className="animate-pulse">
                {columns.map((col) => (
                  <td key={col.key} className="px-6 py-4">
                    <div className="h-4 bg-neutral-100 dark:bg-neutral-800 rounded w-3/4" />
                  </td>
                ))}
              </tr>
            ))
          ) : data.length > 0 ? (
            data.map((row) => (
              <tr
                key={row.id}
                onClick={() => onRowClick?.(row)}
                className={cn(
                  'group transition-all cursor-pointer',
                  onRowClick ? 'hover:bg-neutral-50 dark:hover:bg-neutral-800/50' : ''
                )}
              >
                {columns.map((col) => {
                  const value = (row as any)[col.key];
                  return (
                    <td
                      key={col.key}
                      className={cn(
                        'px-6 py-4',
                        col.align === 'center' && 'text-center',
                        col.align === 'right' && 'text-right'
                      )}
                    >
                      {col.render ? col.render(value, row) : (
                        <span className="text-neutral-700 dark:text-neutral-300">
                          {value}
                        </span>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} className="px-6 py-20">
                {emptyState || (
                  <div className="flex flex-col items-center justify-center text-center space-y-3">
                    <div className="p-4 bg-neutral-100 dark:bg-neutral-800 rounded-full text-neutral-400">
                      <Search className="h-8 w-8" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-lg font-black text-neutral-900 dark:text-white">No records found</h3>
                      <p className="text-secondary text-sm">Try adjusting your search or filters.</p>
                    </div>
                  </div>
                )}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

// Internal helper to avoid circular dependency on Search icon in the empty state
function Search(props: any) {
  return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>;
}
