'use client';

import React, { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { cn } from '@/lib/utils';
import Link from 'next/link';

interface SearchResultItem {
  id: string;
  name: string;
  href: string;
}

interface SearchResultGroup {
  type: string;
  items: SearchResultItem[];
}

interface AdminSearchInputProps {
  placeholder?: string;
  value?: string;
  onSearch?: (query: string) => void;
  results?: SearchResultGroup[];
}

// Helper components declared before they are used in TYPE_CONFIG
const UserIcon = ({ className }: { className?: string }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>;
const BookOpenIcon = ({ className }: { className?: string }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>;
const FolderKanbanIcon = ({ className }: { className?: string }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18"/><path d="M9 9v12"/><path d="M15 9v12"/></svg>;
const AwardIcon = ({ className }: { className?: string }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 12 20 15.79 13.89"/><line x1="8" y1="12" x2="16" y2="12"/></svg>;

const TYPE_CONFIG: Record<string, { icon: React.ReactNode; color: string }> = {
  Students: { icon: <UserIcon className="h-3.5 w-3.5" />, color: 'text-primary-500' },
  Courses: { icon: <BookOpenIcon className="h-3.5 w-3.5" />, color: 'text-teal-500' },
  Projects: { icon: <FolderKanbanIcon className="h-3.5 w-3.5" />, color: 'text-orange-500' },
  Certificates: { icon: <AwardIcon className="h-3.5 w-3.5" />, color: 'text-amber-500' },
  Default: { icon: <Search className="h-3.5 w-3.5" />, color: 'text-neutral-400' },
};

export const AdminSearchInput = ({
  placeholder = 'Search platform...',
  value = '',
  onSearch,
  results = [],
}: AdminSearchInputProps) => {
  const [query, setQuery] = useState(value);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setQuery(value);
  }, [value]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleInputChange = (val: string) => {
    setQuery(val);
    onSearch?.(val);
    setIsOpen(val.length > 0);
  };

  const clearSearch = () => {
    setQuery('');
    onSearch?.('');
    setIsOpen(false);
  };

  return (
    <div className="relative w-full max-w-md">
      <div className="relative group">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400 group-focus-within:text-primary-500 transition-colors" />
        <Input
          placeholder={placeholder}
          className="pl-10 pr-10 h-12 rounded-xl border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 focus:ring-primary-500 transition-all"
          value={query}
          onChange={(e) => handleInputChange(e.target.value)}
          onFocus={() => query.length > 0 && setIsOpen(true)}
        />
        {query.length > 0 && (
          <button
            onClick={clearSearch}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-400 transition-colors"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
      </div>

      {isOpen && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 p-2 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-2xl z-50 max-h-[400px] overflow-y-auto ring-1 ring-black/5">
          <div className="space-y-4">
            {results.map((group) => {
              const config = TYPE_CONFIG[group.type] || TYPE_CONFIG.Default;
              return (
                <div key={group.type} className="space-y-2">
                  <div className="flex items-center gap-2 px-2 text-[10px] font-black uppercase tracking-widest text-neutral-400">
                    <span className={cn('h-3 w-3', config.color)}>
                      {config.icon}
                    </span>
                    {group.type}
                  </div>
                  <div className="space-y-1">
                    {group.items.map((item) => (
                      <Link
                        key={item.id}
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className="flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-all group/item"
                      >
                        <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300 group-hover/item:text-primary-600 dark:group-hover/item:text-primary-400">
                          {item.name}
                        </span>
                        <span className="text-[10px] font-bold text-neutral-400 opacity-0 group-hover/item:opacity-100 transition-opacity">
                          View Profile &rarr;
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
