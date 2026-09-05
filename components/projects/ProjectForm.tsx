import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Project } from '@/types';
import { cn } from '@/lib/utils';

interface ProjectFormProps {
  initialData?: Project;
  onSubmit: (data: Partial<Project>) => void;
  onCancel: () => void;
}

export const ProjectForm = ({ initialData, onSubmit, onCancel }: ProjectFormProps) => {
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    description: initialData?.description || '',
    status: initialData?.status || 'Active',
    priority: initialData?.priority || 'Medium',
    deadline: initialData?.deadline || '',
    stack: initialData?.stack?.join(', ') || '',
    githubUrl: initialData?.githubUrl || '',
    liveUrl: initialData?.liveUrl || '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Project name is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.deadline) newErrors.deadline = 'Deadline is required';
    if (formData.githubUrl && !formData.githubUrl.startsWith('http')) {
      newErrors.githubUrl = 'Invalid URL';
    }
    if (formData.liveUrl && !formData.liveUrl.startsWith('http')) {
      newErrors.liveUrl = 'Invalid URL';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit({
        ...formData,
        stack: formData.stack.split(',').map((t: string) => t.trim()).filter(t => t !== ''),
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-2">
        <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Project Name *</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className={cn(
            'w-full px-3 py-2 rounded-lg border bg-white dark:bg-neutral-800 dark:border-neutral-700 text-sm outline-none focus:ring-2 focus:ring-primary-500 transition-all',
            errors.name ? 'border-red-500' : 'border-neutral-200 dark:border-neutral-700'
          )}
          placeholder="e.g. AI Study Assistant"
        />
        {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Description *</label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          rows={3}
          className={cn(
            'w-full px-3 py-2 rounded-lg border bg-white dark:bg-neutral-800 dark:border-neutral-700 text-sm outline-none focus:ring-2 focus:ring-primary-500 transition-all',
            errors.description ? 'border-red-500' : 'border-neutral-200 dark:border-neutral-700'
          )}
          placeholder="Describe the goals and scope of the project..."
        />
        {errors.description && <p className="text-xs text-red-500">{errors.description}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Status</label>
          <select
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
            className="w-full px-3 py-2 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-sm outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="Active">Active</option>
            <option value="Completed">Completed</option>
            <option value="On Hold">On Hold</option>
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Priority</label>
          <select
            value={formData.priority}
            onChange={(e) => setFormData({ ...formData, priority: e.target.value as any })}
            className="w-full px-3 py-2 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-sm outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
            <option value="Critical">Critical</option>
          </select>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Deadline *</label>
        <input
          type="date"
          value={formData.deadline}
          onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
          className={cn(
            'w-full px-3 py-2 rounded-lg border bg-white dark:bg-neutral-800 dark:border-neutral-700 text-sm outline-none focus:ring-2 focus:ring-primary-500 transition-all',
            errors.deadline ? 'border-red-500' : 'border-neutral-200 dark:border-neutral-700'
          )}
        />
        {errors.deadline && <p className="text-xs text-red-500">{errors.deadline}</p>}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Technologies (comma separated)</label>
        <input
          type="text"
          value={formData.stack}
          onChange={(e) => setFormData({ ...formData, stack: e.target.value })}
          className="w-full px-3 py-2 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-sm outline-none focus:ring-2 focus:ring-primary-500"
          placeholder="React, TypeScript, Node.js..."
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Repository URL</label>
          <input
            type="url"
            value={formData.githubUrl}
            onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
            className={cn(
              'w-full px-3 py-2 rounded-lg border bg-white dark:bg-neutral-800 dark:border-neutral-700 text-sm outline-none focus:ring-2 focus:ring-primary-500 transition-all',
              errors.githubUrl ? 'border-red-500' : 'border-neutral-200 dark:border-neutral-700'
            )}
            placeholder="https://github.com/..."
          />
          {errors.githubUrl && <p className="text-xs text-red-500">{errors.githubUrl}</p>}
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Demo URL</label>
          <input
            type="url"
            value={formData.liveUrl}
            onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
            className={cn(
              'w-full px-3 py-2 rounded-lg border bg-white dark:bg-neutral-800 dark:border-neutral-700 text-sm outline-none focus:ring-2 focus:ring-primary-500 transition-all',
              errors.liveUrl ? 'border-red-500' : 'border-neutral-200 dark:border-neutral-700'
            )}
            placeholder="https://demo.example.com"
          />
          {errors.liveUrl && <p className="text-xs text-red-500">{errors.liveUrl}</p>}
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <Button variant="outline" onClick={onCancel} type="button">Cancel</Button>
        <Button variant="primary" type="submit">
          {initialData ? 'Save Changes' : 'Create Project'}
        </Button>
      </div>
    </form>
  );
};
