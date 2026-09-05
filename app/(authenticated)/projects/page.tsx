'use client';

import React, { useState } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { FolderKanban, Plus, Rocket, Layout } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { storage } from '@/lib/storage';
import { ProjectModal } from '@/components/projects/ProjectModal';
import { ProjectCard } from '@/components/projects/ProjectCard';

export default function ProjectsPage() {
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!user) return null;

  const projects = storage.getStudentProjects(user.id);

  return (
    <PageContainer>
      <div className="space-y-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400">
                <FolderKanban className="h-6 w-6" />
              </div >
              <h1 className="text-3xl font-black text-neutral-900 dark:text-white tracking-tight">Project Workspace</h1>
            </div >
            <p className="text-secondary text-lg">Plan, build, and track your professional development portfolio.</p>
          </div >
          <Button
            variant="primary"
            leftIcon={<Plus className="h-5 w-5" />}
            onClick={() => setIsModalOpen(true)}
            className="gap-2 py-6 px-6 rounded-2xl shadow-lg shadow-primary-500/20 h-14 font-bold text-lg transition-transform hover:scale-105"
          >
            New Project
          </Button>
        </div >

        {projects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map(project => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div >
        ) : (
          <Card variant="elevated" className="col-span-full p-16 text-center space-y-8 border-dashed border-2 border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/30">
            <div className="mx-auto h-24 w-24 bg-neutral-100 dark:bg-neutral-800 rounded-full flex items-center justify-center text-neutral-400 shadow-inner">
              <FolderKanban className="h-12 w-12" />
            </div >
            <div className="space-y-3 max-w-md mx-auto">
              <h3 className="text-2xl font-bold text-neutral-900 dark:text-white">Your workspace is empty</h3>
              <p className="text-secondary text-lg leading-relaxed">
                Start building something amazing! Create your first project to begin tracking your progress and organizing your tasks.
              </p>
            </div >
            <Button
              variant="primary"
              className="mx-auto rounded-2xl px-8 h-14 font-bold text-lg shadow-lg shadow-primary-500/20 transition-transform hover:scale-105"
              onClick={() => setIsModalOpen(true)}
            >
              Create First Project
            </Button>
          </Card>
        )}

        <ProjectModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          userId={user.id}
        />
      </div >
    </PageContainer>
  );
}
