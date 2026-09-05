'use client';

import React, { useState } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { storage } from '@/lib/storage';
import { CheckSquare, Search, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { AdminTable } from '@/components/admin/AdminTable';
import { AdminSearchInput } from '@/components/admin/AdminSearchInput';

export default function AdminTasksPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const tasks = storage.getTasks();

  const filteredTasks = tasks.filter(t =>
    t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.ownerId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const columns = [
    {
      key: 'task',
      label: 'Task',
      render: (val: any) => (
        <div className="flex items-center gap-3">
          <div className="h-2 w-2 rounded-full bg-neutral-300 dark:bg-neutral-600 group-hover:bg-primary-500 transition-colors" />
          <span className="font-black text-neutral-900 dark:text-white">{val}</span>
        </div>
      ),
    },
    {
      key: 'student',
      label: 'Student Lead',
      render: (_: any, task: any) => {
        const student = storage.getStudentById(task.ownerId);
        return <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">{student?.fullName || 'Unknown'}</span>;
      },
    },
    {
      key: 'project',
      label: 'Project Context',
      render: (_: any, task: any) => {
        const project = storage.getProjects().find(p => p.id === task.projectId);
        return <span className="text-xs font-bold text-secondary">{project?.name || 'Unassigned'}</span>;
      },
    },
    {
      key: 'status',
      label: 'Lifecycle Status',
      render: (val: any) => (
        <Badge
          variant="project"
          className={cn(
            "text-[9px] px-2 py-0.5 rounded-md font-black uppercase tracking-wider",
            val === 'Done' ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400' :
            val === 'In Progress' ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400' :
            'bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400'
          )}
        >
          {val}
        </Badge>
      ),
    },
    {
      key: 'dueDate',
      label: 'Due Date',
      align: 'right' as const,
      render: (val: any) => (
        <span className="text-xs font-bold text-neutral-500 dark:text-neutral-400">{val}</span>
      ),
    },
    {
      key: 'actions',
      label: 'Actions',
      align: 'right' as const,
      render: (_: any, task: any) => (
        <Button variant="ghost" size="sm" className="gap-2 h-9 rounded-lg font-bold text-xs hover:bg-primary-50 dark:hover:bg-primary-900/20 hover:text-primary-600 dark:hover:text-primary-400 transition-all">
          Edit Task
        </Button>
      ),
    },
  ];

  return (
    <PageContainer>
      <div className="space-y-10">
        <AdminPageHeader
          title="Task Oversight"
          subtitle="Real-time monitoring of all task activity across the student ecosystem."
          icon={<CheckSquare className="h-6 w-6" />}
          actions={
            <Button variant="primary" className="gap-2 h-12 rounded-xl font-bold shadow-lg shadow-primary-500/20" leftIcon={<Plus className="h-4 w-4" />}>
              Assign Task
            </Button>
          }
        />

        <div className="space-y-6">
          <AdminSearchInput
            placeholder="Search tasks or students..."
            onSearch={setSearchQuery}
            value={searchQuery}
          />

          <AdminTable
            columns={columns}
            data={filteredTasks}
            emptyState={
              <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
                <div className="p-4 bg-neutral-100 dark:bg-neutral-800 rounded-full text-neutral-400">
                  <Search className="h-8 w-8" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-lg font-black text-neutral-900 dark:text-white">No tasks found</h3>
                  <p className="text-secondary text-sm">Try adjusting your search keywords or filters.</p>
                </div>
              </div>
            }
          />
        </div>
      </div>
    </PageContainer>
  );
}
