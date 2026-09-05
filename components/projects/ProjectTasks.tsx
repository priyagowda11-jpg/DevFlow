'use client';

import React, { useState } from 'react';
import { Project, ProjectTask } from '@/types/project';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { useProjects } from '@/context/ProjectContext';
import { Plus, CheckCircle2, Circle, Clock, Calendar, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export const ProjectTasks = ({ project }: { project: Project }) => {
  const { addTask, updateTaskStatus } = useProjects();
  const [isAdding, setIsAdding] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    priority: 'Medium' as ProjectTask['priority'],
    dueDate: '',
  });

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.title.trim()) return;
    addTask(project.id, { ...newTask, status: 'Todo' });
    setNewTask({ title: '', priority: 'Medium', dueDate: '' });
    setIsAdding(false);
  };

  const handleUpdateStatus = (taskId: string, status: ProjectTask['status']) => {
    updateTaskStatus(project.id, taskId, status);
  };

  const tasksByStatus: Record<string, ProjectTask[]> = {
    'Todo': project.tasks.filter(t => t.status === 'Todo'),
    'In Progress': project.tasks.filter(t => t.status === 'In Progress'),
    'Done': project.tasks.filter(t => t.status === 'Done'),
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div className="space-y-1">
          <h2 className="text-2xl font-black text-neutral-900 dark:text-white tracking-tight">Task Board</h2>
          <p className="text-sm text-secondary">Manage and track the implementation of your project goals.</p>
        </div>
        <Button onClick={() => setIsAdding(true)} className="gap-2 rounded-xl px-5 h-11 font-bold shadow-lg shadow-primary-500/20 transition-transform hover:scale-105">
          <Plus className="h-4 w-4" />
          Add Task
        </Button>
      </div>

      {isAdding && (
        <div className="relative">
          <form onSubmit={handleAddTask} className="p-8 rounded-3xl bg-white dark:bg-neutral-900 border-2 border-primary-500/30 shadow-2xl space-y-6 animate-in fade-in slide-in-from-top-4 surface-layered">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold">New Project Task</h3>
              <button type="button" onClick={() => setIsAdding(false)} className="p-1 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-400 transition-colors">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-1 space-y-2">
                <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Task Title</label>
                <input
                  type="text"
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-sm outline-none focus:ring-2 focus:ring-primary-500 transition-all"
                  placeholder="What needs to be done?"
                  autoFocus
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Priority</label>
                <select
                  value={newTask.priority}
                  onChange={(e) => setNewTask({ ...newTask, priority: e.target.value as any })}
                  className="w-full px-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-sm outline-none focus:ring-2 focus:ring-primary-500 transition-all"
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                  <option value="Critical">Critical</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Due Date</label>
                <input
                  type="date"
                  value={newTask.dueDate}
                  onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-sm outline-none focus:ring-2 focus:ring-primary-500 transition-all"
                />
              </div>
            </div>
            <div className="flex justify-end gap-3 pt-4">
              <Button variant="outline" onClick={() => setIsAdding(false)} type="button" className="rounded-xl px-6 font-bold">Cancel</Button>
              <Button variant="primary" type="submit" className="rounded-xl px-6 font-bold shadow-lg shadow-primary-500/20">Create Task</Button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {Object.entries(tasksByStatus).map(([status, tasks]) => (
          <div key={status} className="space-y-6">
            <div className="flex items-center justify-between px-2">
              <div className="flex items-center gap-2">
                <div className={cn(
                  'p-1.5 rounded-lg transition-colors',
                  status === 'Todo' ? 'bg-neutral-100 dark:bg-neutral-800 text-neutral-500' :
                  status === 'In Progress' ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-600' :
                  'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600'
                )}>
                  {status === 'Todo' && <Circle className="h-4 w-4" />}
                  {status === 'In Progress' && <Clock className="h-4 w-4" />}
                  {status === 'Done' && <CheckCircle2 className="h-4 w-4" />}
                </div>
                <h3 className="text-sm font-bold text-neutral-600 dark:text-neutral-400 uppercase tracking-widest">{status}</h3>
              </div>
              <span className="text-xs font-bold bg-neutral-200 dark:bg-neutral-800 px-2 py-0.5 rounded-full text-neutral-500">{tasks.length}</span>
            </div>

            <div className="space-y-4">
              {tasks.length === 0 ? (
                <div className="p-10 rounded-3xl border-2 border-dashed border-neutral-200 dark:border-neutral-800 text-center space-y-2">
                  <p className="text-xs text-secondary italic">No tasks in this stage</p>
                </div>
              ) : (
                tasks.map(task => (
                  <Card key={task.id} variant="elevated" className="p-5 space-y-4 group hover:ring-2 hover:ring-primary-500/20 transition-all duration-300 border-neutral-200 dark:border-neutral-800">
                    <div className="flex justify-between items-start gap-3">
                      <h4 className="text-sm font-bold text-neutral-900 dark:text-white leading-snug line-clamp-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">{task.title}</h4>
                      <Badge variant="project" className="text-[10px] px-2 py-0.5">{task.priority}</Badge>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-neutral-100 dark:border-neutral-800">
                      <div className="flex items-center gap-1.5 text-[11px] text-secondary font-medium">
                        <Calendar className="h-3 w-3" />
                        <span>{task.dueDate || 'No date'}</span>
                      </div>
                      <div className="flex gap-1">
                        {status !== 'Todo' && (
                          <button
                            onClick={() => handleUpdateStatus(task.id, 'Todo')}
                            className="p-1.5 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-400 transition-colors"
                            title="Move to Todo"
                          >
                            <Circle className="h-3.5 w-3.5" />
                          </button>
                        )}
                        {status !== 'In Progress' && (
                          <button
                            onClick={() => handleUpdateStatus(task.id, 'In Progress')}
                            className="p-1.5 rounded-lg hover:bg-amber-50 dark:hover:bg-amber-900/20 text-amber-500 transition-colors"
                            title="Move to In Progress"
                          >
                            <Clock className="h-3.5 w-3.5" />
                          </button>
                        )}
                        {status !== 'Done' && (
                          <button
                            onClick={() => handleUpdateStatus(task.id, 'Done')}
                            className="p-1.5 rounded-lg hover:bg-emerald-50 dark:hover:bg-emerald-900/20 text-emerald-500 transition-colors"
                            title="Mark as Done"
                          >
                            <CheckCircle2 className="h-3.5 w-3.5" />
                          </button>
                        )}
                      </div>
                    </div>
                  </Card>
                ))
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
