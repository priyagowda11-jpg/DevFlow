'use client';

import React, { useState } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { storage } from '@/lib/storage';
import { Project, ProjectTask } from '@/types';
import { useParams, useRouter } from 'next/navigation';
import {
  ArrowLeft as ArrowLeftIcon,
  Edit3 as EditIcon,
  Trash2 as TrashIcon,
  Info as InfoIcon,
  Calendar,
  Rocket,
  Plus,
  CheckSquare,
  Activity,
  ExternalLink
} from 'lucide-react';
import { ProjectModal } from '@/components/projects/ProjectModal';
import { TaskModal } from '@/components/tasks/TaskModal';
import { Badge } from '@/components/ui/Badge';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { ProjectOverview } from '@/components/projects/ProjectOverview';
import { ProjectTasks } from '@/components/projects/ProjectTasks';
import { cn } from '@/lib/utils';

type Tab = 'overview' | 'tasks' | 'activity' | 'details';

export default function ProjectWorkspace() {
  const params = useParams();
  const router = useRouter();
  const projectId = params.projectId as string;

  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<ProjectTask | null>(null);

  const project = storage.getProjects().find(p => p.id === projectId);

  const handleAddTask = (data: Partial<ProjectTask>) => {
    const newTask: ProjectTask = {
      id: crypto.randomUUID(),
      projectId,
      ownerId: project?.ownerId || 'user-1',
      title: data.title || 'New Task',
      description: data.description || '',
      status: 'Todo',
      priority: data.priority || 'Medium',
      dueDate: data.dueDate || '',
      tags: data.tags || [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ...data,
    };
    storage.addTask(newTask);
    setIsTaskModalOpen(false);
    router.refresh();
  };

  const handleDeleteTask = (taskId: string) => {
    const tasks = storage.getTasks().filter(t => t.id !== taskId);
    storage.saveTasks(tasks);
    setIsTaskModalOpen(false);
    router.refresh();
  };

  const handleUpdateTask = (data: Partial<ProjectTask>) => {
    if (selectedTask) {
      storage.updateTask(selectedTask.id, data);
    }
    setIsTaskModalOpen(false);
    router.refresh();
  };

  if (!project) {
    return (
      <PageContainer>
        <div className="flex flex-col items-center justify-center h-[60vh] text-center space-y-4">
          <div className="p-4 bg-red-50 dark:bg-red-900/20 text-red-500 rounded-full">
            <InfoIcon className="h-12 w-12" />
          </div>
          <h1 className="text-2xl font-bold">Project Not Found</h1>
          <p className="text-secondary">The project you're looking for doesn't exist or has been deleted.</p>
          <Button variant="primary" onClick={() => router.push('/projects')}>
            Back to Projects
          </Button>
        </div>
      </PageContainer>
    );
  }

  const tasks = storage.getProjectTasks(projectId);
  const progress = storage.calculateProjectProgress(projectId);

  const handleDeleteProject = () => {
    if (confirm('Are you sure you want to delete this project and all its tasks? This action cannot be undone.')) {
      storage.deleteProject(projectId);
      router.push('/projects');
    }
  };

  return (
    <PageContainer>
      <div className="space-y-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.push('/projects')}
              className="p-2 rounded-xl hover:bg-neutral-200 dark:hover:bg-neutral-800"
            >
              <ArrowLeftIcon className="h-4 w-4" />
            </Button>
            <div className="space-y-2">
              <h1 className="text-3xl font-black tracking-tight text-neutral-900 dark:text-white">{project.name}</h1>
              <div className="flex flex-wrap items-center gap-3 text-sm">
                <Badge variant="project" className="text-[10px] px-3 py-0.5 rounded-full bg-primary-100 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400">
                  {project.status}
                </Badge>
                <Badge variant="project" className={cn(
                  "text-[10px] px-3 py-0.5 rounded-full",
                  project.priority === 'High' || project.priority === 'Critical'
                    ? 'bg-accent-100 text-accent-700 dark:bg-accent-900/30 dark:text-accent-300'
                    : 'bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-400'
                )}>
                  {project.priority} Priority
                </Badge>
                <span className="text-secondary flex items-center gap-1.5 font-medium">
                  <Calendar className="h-3 w-3" />
                  Deadline: {new Date(project.deadline).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              leftIcon={<EditIcon className="h-4 w-4" />}
              onClick={() => setIsEditModalOpen(true)}
              className="rounded-xl font-bold h-11"
            >
              Edit Project
            </Button>
          </div>
        </div>

        {/* Progress Overview */}
        <Card variant="elevated" className="p-6 space-y-4 border-neutral-200 dark:border-neutral-800 transition-all surface-layered">
          <div className="flex items-center justify-between text-sm font-bold uppercase tracking-widest text-neutral-400">
            <span>Overall Completion</span>
            <span className="text-neutral-900 dark:text-white">{progress}%</span>
          </div>
          <div className="h-3 w-full bg-neutral-100 dark:bg-neutral-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-primary-500 transition-all duration-700 ease-out shadow-[0_0_10px_rgba(16,185,129,0.4)]"
              style={{ width: `${progress}%` }}
            />
          </div>
        </Card>

        {/* Tabs Navigation */}
        <div className="flex border-b border-neutral-200 dark:border-neutral-800">
          {( ['overview', 'tasks', 'activity', 'details'] as Tab[] ).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                'px-6 py-4 text-sm font-bold capitalize transition-all relative',
                activeTab === tab
                  ? 'text-primary-600 dark:text-primary-400'
                  : 'text-secondary hover:text-text-main dark:hover:text-neutral-200'
              )}
            >
              {tab}
              {activeTab === tab && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
              )}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="min-h-[400px]">
          {activeTab === 'overview' && <ProjectOverview project={project} />}
          {activeTab === 'tasks' && <ProjectTasks project={project} />}
          {activeTab === 'activity' && (
            <div className="space-y-8">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-secondary-100 dark:bg-secondary-900/30 text-secondary-600 dark:text-secondary-400">
                  <Activity className="h-5 w-5" />
                </div>
                <h3 className="text-2xl font-bold text-neutral-900 dark:text-white">Project Activity</h3>
              </div>
              <div className="space-y-4">
                <Card variant="elevated" className="p-6 border-neutral-200 dark:border-neutral-800 flex items-start gap-4 transition-all hover:border-primary-500/30">
                  <div className="p-2 bg-primary-100 dark:bg-primary-900/30 rounded-lg">
                    <Rocket className="h-5 w-5 text-primary-600 dark:text-primary-400" />
                  </div>
                  <div className="space-y-1">
                    <p className="font-bold text-neutral-900 dark:text-white">Project Initialized</p>
                    <p className="text-xs text-secondary">{new Date(project.createdAt).toLocaleString()}</p>
                  </div>
                </Card>
                {tasks.map(task => (
                  <Card key={task.id} variant="elevated" className="p-6 border-neutral-200 dark:border-neutral-800 flex items-start gap-4 transition-all hover:border-primary-500/30">
                    <div className="p-2 bg-neutral-100 dark:bg-neutral-800 rounded-lg">
                      <CheckSquare className="h-5 w-5 text-neutral-500" />
                    </div>
                    <div className="space-y-1">
                      <p className="font-bold text-neutral-900 dark:text-white">Task added: {task.title}</p>
                      <p className="text-xs text-secondary">{new Date(task.createdAt).toLocaleString()}</p>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}
          {activeTab === 'details' && (
            <div className="space-y-8">
              <Card variant="elevated" className="p-8 space-y-8 border-neutral-200 dark:border-neutral-800 surface-layered">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400">
                    <InfoIcon className="h-6 w-6" />
                  </div>
                  <h3 className="text-2xl font-bold text-neutral-900 dark:text-white">Project Metadata</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-1">
                    <span className="text-xs font-black text-neutral-400 uppercase tracking-widest">Creation Date</span>
                    <p className="text-lg font-bold text-neutral-900 dark:text-white">{new Date(project.createdAt).toLocaleDateString()}</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-xs font-black text-neutral-400 uppercase tracking-widest">Project Identifier</span>
                    <p className="font-mono text-sm text-secondary bg-neutral-100 dark:bg-neutral-800 p-2 rounded-lg border border-neutral-200 dark:border-neutral-700">{project.id}</p>
                  </div>
                </div>
                <div className="pt-8 border-t border-neutral-200 dark:border-neutral-800 flex justify-end">
                  <Button
                    variant="outline"
                    className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 gap-3 rounded-xl h-11 font-bold"
                    leftIcon={<TrashIcon className="h-4 w-4" />}
                    onClick={handleDeleteProject}
                  >
                    Delete Project
                  </Button>
                </div>
              </Card>
            </div>
          )}
        </div>
        <ProjectModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          userId={project.ownerId}
          projectId={projectId}
        />
        <TaskModal
          isOpen={isTaskModalOpen}
          onClose={() => setIsTaskModalOpen(false)}
          task={selectedTask}
          projects={storage.getProjects()}
          onSubmit={handleAddTask}
          onDelete={handleDeleteTask}
        />
      </div>
    </PageContainer>
  );
}
