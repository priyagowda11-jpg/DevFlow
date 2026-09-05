'use client';

import React, { useState } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { storage } from '@/lib/storage';
import { FolderKanban, Search, Eye, LayoutGrid, Plus } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { AdminTable } from '@/components/admin/AdminTable';
import { AdminSearchInput } from '@/components/admin/AdminSearchInput';

export default function AdminProjectsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const projects = storage.getProjects();

  const filteredProjects = projects.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.ownerId.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (p.stack || []).some(s => s.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const columns = [
    {
      key: 'project',
      label: 'Project',
      render: (val: any, project: any) => (
        <div className="flex flex-col gap-2">
          <span className="font-black text-neutral-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">{project.name}</span>
          <div className="flex flex-wrap gap-1.5">
            {(project.stack || []).slice(0, 3).map((s: string) => (
              <span key={s} className="text-[9px] px-1.5 py-0.5 rounded-md bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-700 font-bold">
                {s}
              </span>
            ))}
          </div>
        </div>
      ),
    },
    {
      key: 'student',
      label: 'Lead Student',
      render: (_: any, project: any) => {
        const student = storage.getStudentById(project.ownerId);
        return (
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-full bg-neutral-200 dark:bg-neutral-700 flex items-center justify-center text-[10px] font-black text-neutral-600 dark:text-neutral-400">
              {student?.fullName.charAt(0)}
            </div>
            <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">{student?.fullName || 'Unknown'}</span>
          </div>
        );
      },
    },
    {
      key: 'status',
      label: 'Lifecycle Status',
      render: (val: any) => (
        <Badge variant="project" className="text-[9px] px-2 py-0.5 rounded-md font-black uppercase tracking-wider">
          {val}
        </Badge>
      ),
    },
    {
      key: 'completion',
      label: 'Completion',
      align: 'center' as const,
      render: (_: any, project: any) => {
        const progress = storage.calculateProjectProgress(project.id);
        return (
          <div className="flex items-center justify-center gap-3">
            <div className="w-24 h-2 bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden p-0.5">
              <div className="h-full bg-gradient-to-r from-primary-400 to-primary-600 rounded-full shadow-[0_0_4px_rgba(16,185,129,0.3)]" style={{ width: `${progress}%` }} />
            </div>
            <span className="text-xs font-black text-neutral-900 dark:text-white">{progress}%</span>
          </div>
        );
      },
    },
    {
      key: 'actions',
      label: 'Actions',
      align: 'right' as const,
      render: (_: any, project: any) => (
        <Link href={`/admin/projects/${project.id}`}>
          <Button variant="ghost" size="sm" className="gap-2 h-9 rounded-lg font-bold text-xs hover:bg-primary-50 dark:hover:bg-primary-900/20 hover:text-primary-600 dark:hover:text-primary-400 transition-all">
            <Eye className="h-3.5 w-3.5" /> Inspect
          </Button>
        </Link>
      ),
    },
  ];

  return (
    <PageContainer>
      <div className="space-y-10">
        <AdminPageHeader
          title="Project Oversight"
          subtitle="Inspect and audit student portfolios across the entire platform."
          icon={<LayoutGrid className="h-6 w-6" />}
          actions={
            <Button variant="primary" className="gap-2 h-12 rounded-xl font-bold shadow-lg shadow-primary-500/20" leftIcon={<Plus className="h-4 w-4" />}>
              Create Project
            </Button>
          }
        />

        <div className="space-y-6">
          <AdminSearchInput
            placeholder="Search by project, student, or tech stack..."
            onSearch={setSearchQuery}
            value={searchQuery}
          />

          <AdminTable
            columns={columns}
            data={filteredProjects}
            emptyState={
              <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
                <div className="p-4 bg-neutral-100 dark:bg-neutral-800 rounded-full text-neutral-400">
                  <FolderKanban className="h-8 w-8" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-lg font-black text-neutral-900 dark:text-white">No projects found</h3>
                  <p className="text-secondary text-sm">Try adjusting your search criteria or check your filters.</p>
                </div>
              </div>
            }
          />
        </div>
      </div>
    </PageContainer>
  );
}
