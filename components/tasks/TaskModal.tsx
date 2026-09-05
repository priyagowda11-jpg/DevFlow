import React, { useState, useEffect } from 'react';
import { Modal } from '@/components/ui/Modal';
import { TaskForm } from './TaskForm';
import { ProjectTask, Project } from '@/types/project';
import { Badge } from '@/components/ui/Badge';
import { Calendar, Clock, Tag, Layout, Edit3, Trash2, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  task?: ProjectTask | null;
  projects: Project[];
  onSubmit: (data: Partial<ProjectTask>) => void;
  onDelete: (taskId: string) => void;
}

export const TaskModal = ({ isOpen, onClose, task, projects, onSubmit, onDelete }: TaskModalProps) => {
  const [mode, setMode] = useState<'view' | 'edit'>('view');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setMode('view');
      setShowDeleteConfirm(false);
    }
  }, [isOpen]);

  if (!task && mode === 'view') {
    // This is "Create" mode
    return (
      <Modal isOpen={isOpen} onClose={onClose} title="Create New Task">
        <div className="max-w-2xl mx-auto">
          <TaskForm
            projects={projects}
            onSubmit={onSubmit}
            onCancel={onClose}
          />
        </div>
      </Modal>
    );
  }

  if (mode === 'edit') {
    return (
      <Modal isOpen={isOpen} onClose={onClose} title={task ? 'Edit Task' : 'Create Task'}>
        <div className="max-w-2xl mx-auto">
          <TaskForm
            initialData={task || undefined}
            projects={projects}
            onSubmit={onSubmit}
            onCancel={() => setMode('view')}
          />
        </div>
      </Modal>
    );
  }

  // View Mode
  const project = projects.find(p => p.id === task?.projectId);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Task Details">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Badge variant="project">{project?.name || 'Unknown Project'}</Badge>
              <Badge variant="project">{task?.priority}</Badge>
            </div>
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">{task?.title}</h2>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => setMode('edit')} className="gap-2">
              <Edit3 className="h-4 w-4" />
              Edit
            </Button>
            <Button variant="outline" size="sm" onClick={() => setShowDeleteConfirm(true)} className="gap-2 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20">
              <Trash2 className="h-4 w-4" />
              Delete
            </Button>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700">
          <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
            {task?.description || 'No description provided.'}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-sm text-neutral-600 dark:text-neutral-400">
              <Calendar className="h-4 w-4" />
              <div>
                <span className="block text-[10px] font-bold uppercase text-neutral-400">Due Date</span>
                <span className="font-medium">{task?.dueDate || 'No date set'}</span>
              </div>
            </div>
            <div className="flex items-center gap-3 text-sm text-neutral-600 dark:text-neutral-400">
              <Clock className="h-4 w-4" />
              <div>
                <span className="block text-[10px] font-bold uppercase text-neutral-400">Last Updated</span>
                <span className="font-medium">{new Date(task?.updatedAt || '').toLocaleDateString()}</span>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-sm text-neutral-600 dark:text-neutral-400">
              <Layout className="h-4 w-4" />
              <div>
                <span className="block text-[10px] font-bold uppercase text-neutral-400">Status</span>
                <span className={cn(
                  'font-bold px-2 py-0.5 rounded-full text-xs',
                  task?.status === 'Done' ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400' :
                  task?.status === 'In Progress' ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400' :
                  'bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400'
                )}>
                  {task?.status}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-3 text-sm text-neutral-600 dark:text-neutral-400">
              <Tag className="h-4 w-4" />
              <div>
                <span className="block text-[10px] font-bold uppercase text-neutral-400">Tags</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {task?.tags.map(tag => (
                    <span key={tag} className="text-[10px] px-1.5 py-0 rounded-md bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {showDeleteConfirm && (
          <div className="p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 flex items-center gap-4 animate-in fade-in slide-in-from-bottom-2">
            <AlertTriangle className="h-5 w-5 text-red-500 shrink-0" />
            <div className="flex-1">
              <p className="text-sm font-bold text-red-600 dark:text-red-400">Delete Task?</p>
              <p className="text-xs text-red-500 dark:text-red-300">This action cannot be undone.</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => setShowDeleteConfirm(false)}>Cancel</Button>
              <Button variant="primary" size="sm" className="bg-red-500 hover:bg-red-600 text-white" onClick={() => task && onDelete(task.id)}>Delete</Button>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};
