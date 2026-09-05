'use client';

import React, { useState, useMemo } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Button } from '@/components/ui/Button';
import { EmptyState } from '@/components/ui/EmptyState';
import { Modal } from '@/components/ui/Modal';
import { Plus, LayoutList } from 'lucide-react';
import { useProjects } from '@/context/ProjectContext';
import { TaskBoard } from '@/components/tasks/TaskBoard';
import { TaskFilters } from '@/components/tasks/TaskFilters';
import { TaskModal } from '@/components/tasks/TaskModal';
import { TaskStats } from '@/components/tasks/TaskStats';
import { taskState } from '@/lib/task-state';
import { ProjectTask } from '@/types/project';

export default function TasksPage() {
  const { projects, allTasks, refreshProjects, addTask, updateTask, deleteTask, updateTaskStatus } = useProjects();
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<ProjectTask | null>(null);

  // Simulate loading state for skeletons
  React.useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedPriority, setSelectedPriority] = useState('All');
  const [selectedProject, setSelectedProject] = useState('All');
  const [selectedDueDate, setSelectedDueDate] = useState('All');

  const filteredTasks = useMemo(() => {
    return allTasks.filter(task => {
      const project = projects.find(p => p.id === task.projectId);
      const projectName = project?.name || '';

      const matchesSearch =
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        projectName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesStatus = selectedStatus === 'All' || task.status === selectedStatus;
      const matchesPriority = selectedPriority === 'All' || task.priority === selectedPriority;
      const matchesProject = selectedProject === 'All' || task.projectId === selectedProject;

      let matchesDate = true;
      if (selectedDueDate !== 'All' && task.dueDate) {
        const today = new Date().toISOString().split('T')[0];
        const taskDate = task.dueDate;
        const isOverdue = taskDate < today && task.status !== 'Done';
        const isToday = taskDate === today;

        const nextWeek = new Date();
        nextWeek.setDate(nextWeek.getDate() + 7);
        const nextWeekIso = nextWeek.toISOString().split('T')[0];
        const isThisWeek = taskDate >= today && taskDate <= nextWeekIso;
        const isUpcoming = taskDate > nextWeekIso;

        if (selectedDueDate === 'Overdue') matchesDate = isOverdue;
        else if (selectedDueDate === 'Today') matchesDate = isToday;
        else if (selectedDueDate === 'This Week') matchesDate = isThisWeek;
        else if (selectedDueDate === 'Upcoming') matchesDate = isUpcoming;
      } else if (selectedDueDate !== 'All' && !task.dueDate) {
        matchesDate = false;
      }

      return matchesSearch && matchesStatus && matchesPriority && matchesProject && matchesDate;
    });
  }, [allTasks, projects, searchQuery, selectedStatus, selectedPriority, selectedProject, selectedDueDate]);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedStatus('All');
    setSelectedPriority('All');
    setSelectedProject('All');
    setSelectedDueDate('All');
  };

  const handleTaskSelect = (task: ProjectTask) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const handleCreateNewTask = () => {
    setSelectedTask(null);
    setIsModalOpen(true);
  };

  const handleTaskSubmit = (data: Partial<ProjectTask>) => {
    if (selectedTask) {
      updateTask(selectedTask.projectId, selectedTask.id, data);
    } else {
      if (data.projectId) {
        addTask(data.projectId, data as any);
      }
    }
    setIsModalOpen(false);
  };

  const handleTaskDelete = (taskId: string) => {
    if (selectedTask) {
      deleteTask(selectedTask.projectId, taskId);
      setIsModalOpen(false);
    }
  };

  if (isLoading) {
    return (
      <PageContainer>
        <div className="space-y-8 animate-pulse">
          <div className="flex justify-between items-center">
            <div className="space-y-2">
              <div className="h-8 bg-neutral-200 dark:bg-neutral-800 rounded-md w-48" />
              <div className="h-4 bg-neutral-200 dark:bg-neutral-800 rounded-md w-64" />
            </div>
            <div className="h-12 bg-neutral-200 dark:bg-neutral-800 rounded-xl w-32" />
          </div>
          <div className="h-24 bg-neutral-200 dark:bg-neutral-800 rounded-2xl w-full" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="space-y-4">
                <div className="h-6 bg-neutral-200 dark:bg-neutral-800 rounded-md w-24 mx-auto" />
                <div className="space-y-4">
                  {[1, 2, 3].map(j => (
                    <div key={j} className="h-24 bg-neutral-200 dark:bg-neutral-800 rounded-xl w-full" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <div className="space-y-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 ring-4 ring-primary-500/10">
                <LayoutList className="h-6 w-6" />
              </div>
              <h1 className="text-4xl font-black text-neutral-900 dark:text-white tracking-tight">Task Workspace</h1>
            </div>
            <p className="text-secondary text-lg font-medium max-w-2xl">
              Plan, prioritize, and track your development work across all your active projects.
            </p>
          </div>
          <Button
            onClick={handleCreateNewTask}
            variant="primary"
            className="gap-2 py-6 px-8 rounded-2xl shadow-xl shadow-primary-500/20 h-14 font-bold transition-all hover:scale-105 active:scale-95"
          >
            <Plus className="h-5 w-5" />
            New Task
          </Button>
        </div>

        {/* Stats Section */}
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-primary-500 to-teal-500 rounded-[2rem] blur opacity-10 group-hover:opacity-20 transition duration-1000"></div>
          <div className="relative">
            <TaskStats stats={taskState.getTaskStats('user-1')} />
          </div>
        </div>

        {/* Filters Section */}
        <div className="p-8 rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm surface-layered">
          <TaskFilters
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedStatus={selectedStatus}
            setSelectedStatus={setSelectedStatus}
            selectedPriority={selectedPriority}
            setSelectedPriority={setSelectedPriority}
            selectedProject={selectedProject}
            setSelectedProject={setSelectedProject}
            selectedDueDate={selectedDueDate}
            setSelectedDueDate={setSelectedDueDate}
            projects={projects}
            clearFilters={clearFilters}
          />
        </div>

        {/* Content */}
        <div className="mt-4">
          {filteredTasks.length > 0 ? (
            <TaskBoard
              tasks={filteredTasks}
              projects={projects}
              onTaskSelect={handleTaskSelect}
            />
          ) : (
            <EmptyState
              icon={<LayoutList className="h-16 w-16 text-neutral-300" />}
              title={searchQuery || selectedStatus !== 'All' || selectedPriority !== 'All' || selectedProject !== 'All' || selectedDueDate !== 'All' ? "No matching tasks" : "Your board is empty"}
              description={
                searchQuery || selectedStatus !== 'All' || selectedPriority !== 'All' || selectedProject !== 'All' || selectedDueDate !== 'All'
                  ? "We couldn't find any tasks that match your current filters. Try adjusting them to expand your search."
                  : "Ready to start building? Create your first task to begin organizing your development workflow."
              }
              action={
                !searchQuery && selectedStatus === 'All' && selectedPriority === 'All' && selectedProject === 'All' && selectedDueDate === 'All' && (
                  <Button onClick={handleCreateNewTask} variant="primary" className="rounded-xl px-8 font-bold h-12">Create First Task</Button>
                )
              }
            />
          )}
        </div>

        <TaskModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          task={selectedTask}
          projects={projects}
          onSubmit={handleTaskSubmit}
          onDelete={handleTaskDelete}
        />
      </div>
    </PageContainer>
  );
}
