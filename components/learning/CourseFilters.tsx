import React from 'react';
import { cn } from '@/lib/utils';

interface CourseFiltersProps {
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  selectedDifficulty: string;
  setSelectedDifficulty: (val: string) => void;
  selectedCategory: string;
  setSelectedCategory: (val: string) => void;
  selectedStatus: string;
  setSelectedStatus: (val: string) => void;
}

export const CourseFilters = ({
  searchQuery,
  setSearchQuery,
  selectedDifficulty,
  setSelectedDifficulty,
  selectedCategory,
  setSelectedCategory,
  selectedStatus,
  setSelectedStatus,
}: CourseFiltersProps) => {
  const difficulties = ['All', 'Beginner', 'Intermediate', 'Advanced'];
  const categories = ['All', 'Frontend', 'Backend', 'Full Stack', 'Programming', 'DevOps', 'AI'];
  const statuses = ['All', 'Not Started', 'In Progress', 'Completed'];

  return (
    <div className="flex flex-col gap-6 p-6 rounded-xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
      <div className="space-y-2">
        <label className="text-xs font-bold uppercase text-neutral-400 tracking-wider">Search</label>
        <input
          type="text"
          placeholder="Search courses or skills..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-3 py-2 rounded-md bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-sm focus:ring-2 focus:ring-primary-500 outline-none transition-all"
        />
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase text-neutral-400 tracking-wider">Status</label>
          <div className="flex flex-wrap gap-2">
            {statuses.map(s => (
              <button
                key={s}
                onClick={() => setSelectedStatus(s)}
                className={cn(
                  'px-3 py-1 rounded-full text-xs transition-all',
                  selectedStatus === s
                    ? 'bg-primary-500 text-white'
                    : 'bg-white dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-700 hover:border-primary-500'
                )}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold uppercase text-neutral-400 tracking-wider">Difficulty</label>
          <div className="flex flex-wrap gap-2">
            {difficulties.map(d => (
              <button
                key={d}
                onClick={() => setSelectedDifficulty(d)}
                className={cn(
                  'px-3 py-1 rounded-full text-xs transition-all',
                  selectedDifficulty === d
                    ? 'bg-primary-500 text-white'
                    : 'bg-white dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-700 hover:border-primary-500'
                )}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold uppercase text-neutral-400 tracking-wider">Category</label>
          <div className="flex flex-wrap gap-2">
            {categories.map(c => (
              <button
                key={c}
                onClick={() => setSelectedCategory(c)}
                className={cn(
                  'px-3 py-1 rounded-full text-xs transition-all',
                  selectedCategory === c
                    ? 'bg-primary-500 text-white'
                    : 'bg-white dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-700 hover:border-primary-500'
                )}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
