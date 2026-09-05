import React from 'react';
import { cn } from '@/lib/utils';
import { Project } from '@/types/project';
import { Search, X } from 'lucide-react';

interface TaskFiltersProps {
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  selectedStatus: string;
  setSelectedStatus: (val: string) => void;
  selectedPriority: string;
  setSelectedPriority: (val: string) => void;
  selectedProject: string;
  setSelectedProject: (val: string) => void;
  selectedDueDate: string;
  setSelectedDueDate: (val: string) => void;
  projects: Project[];
  clearFilters: () => void;
}

export const TaskFilters = ({
  searchQuery,
  setSearchQuery,
  selectedStatus,
  setSelectedStatus,
  selectedPriority,
  setSelectedPriority,
  selectedProject,
  setSelectedProject,
  selectedDueDate,
  setSelectedDueDate,
  projects,
  clearFilters,
}: TaskFiltersProps) => {
  const statuses = ['All', 'Todo', 'In Progress', 'Done'];
  const priorities = ['All', 'Low', 'Medium', 'High', 'Critical'];
  const dueDates = ['All', 'Overdue', 'Today', 'This Week', 'Upcoming'];

  return (
    <div className="flex flex-col lg:flex-row gap-4 items-center justify-between p-4 rounded-2xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
      <div className="relative w-full lg:w-96">
        <input
          type="text"
          placeholder="Search tasks, projects or tags..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2 rounded-xl bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-sm focus:ring-2 focus:ring-primary-500 outline-none transition-all"
        />
        <Search className="absolute left-3 top-2.5 h-4 w-4 text-neutral-400" />
      </div>

      <div className="flex flex-wrap gap-3 justify-center">
        {/* Status Filter */}
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

        {/* Priority Filter */}
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

        {/* Project Filter */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700">
          <span className="text-[10px] font-bold uppercase text-neutral-400">Project:</span>
          <select
            value={selectedProject}
            onChange={(e) => setSelectedProject(e.target.value)}
            className="text-xs bg-transparent outline-none text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer"
          >
            <option value="All">All Projects</option>
            {projects.map(p => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>
        </div>

        {/* Due Date Filter */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700">
          <span className="text-[10px] font-bold uppercase text-neutral-400">Due:</span>
          <select
            value={selectedDueDate}
            onChange={(e) => setSelectedDueDate(e.target.value)}
            className="text-xs bg-transparent outline-none text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer"
          >
            {dueDates.map(d => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </div>

        {(searchQuery || selectedStatus !== 'All' || selectedPriority !== 'All' || selectedProject !== 'All' || selectedDueDate !== 'All') && (
          <button
            onClick={clearFilters}
            className="flex items-center gap-1 text-xs text-primary-500 hover:text-primary-600 font-medium px-2 py-1 rounded-md hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all"
          >
            <X className="h-3 w-3" />
            Clear All
          </button>
        )}
      </div>
    </div>
  );
};
