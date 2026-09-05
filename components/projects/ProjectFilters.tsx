import React from 'react';
import { cn } from '@/lib/utils';

interface ProjectFiltersProps {
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  selectedStatus: string;
  setSelectedStatus: (val: string) => void;
  selectedPriority: string;
  setSelectedPriority: (val: string) => void;
  selectedTech: string;
  setSelectedTech: (val: string) => void;
  allTechnologies: string[];
  clearFilters: () => void;
}

export const ProjectFilters = ({
  searchQuery,
  setSearchQuery,
  selectedStatus,
  setSelectedStatus,
  selectedPriority,
  setSelectedPriority,
  selectedTech,
  setSelectedTech,
  allTechnologies,
  clearFilters,
}: ProjectFiltersProps) => {
  const statuses = ['All', 'Active', 'Completed', 'On Hold'];
  const priorities = ['All', 'Low', 'Medium', 'High', 'Critical'];

  return (
    <div className="flex flex-col lg:flex-row gap-4 items-center justify-between p-4 rounded-2xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
      <div className="relative w-full lg:w-96">
        <input
          type="text"
          placeholder="Search projects or technologies..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2 rounded-xl bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-sm focus:ring-2 focus:ring-primary-500 outline-none transition-all"
        />
        <svg
          className="absolute left-3 top-2.5 h-4 w-4 text-neutral-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>

      <div className="flex flex-wrap gap-3 justify-center">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700">
          <span className="text-[10px] font-bold uppercase text-neutral-400">Status:</span>
          <div className="flex gap-1">
            {statuses.map(s => (
              <button
                key={s}
                onClick={() => setSelectedStatus(s)}
                className={cn(
                  'px-2 py-0.5 rounded-md text-xs transition-all',
                  selectedStatus === s
                    ? 'bg-primary-500 text-white'
                    : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700'
                )}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700">
          <span className="text-[10px] font-bold uppercase text-neutral-400">Priority:</span>
          <div className="flex gap-1">
            {priorities.map(p => (
              <button
                key={p}
                onClick={() => setSelectedPriority(p)}
                className={cn(
                  'px-2 py-0.5 rounded-md text-xs transition-all',
                  selectedPriority === p
                    ? 'bg-primary-500 text-white'
                    : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700'
                )}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700">
          <span className="text-[10px] font-bold uppercase text-neutral-400">Tech:</span>
          <select
            value={selectedTech}
            onChange={(e) => setSelectedTech(e.target.value)}
            className="text-xs bg-transparent outline-none text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer"
          >
            <option value="All">All Technologies</option>
            {allTechnologies.map(tech => (
              <option key={tech} value={tech}>{tech}</option>
            ))}
          </select>
        </div>

        {(searchQuery || selectedStatus !== 'All' || selectedPriority !== 'All' || selectedTech !== 'All') && (
          <button
            onClick={clearFilters}
            className="text-xs text-primary-500 hover:text-primary-600 font-medium px-2 py-1 rounded-md hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all"
          >
            Clear All
          </button>
        )}
      </div>
    </div>
  );
};
