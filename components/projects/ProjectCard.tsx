import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Project } from '@/types/project';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import {
  Folder,
  Calendar,
  CheckCircle2,
  Clock,
  ExternalLink,
  ArrowRight
} from 'lucide-react';
import { projectState } from '@/lib/project-state';

interface ProjectCardProps {
  project: Project;
  className?: string;
}

export const ProjectCard = ({ project, className }: ProjectCardProps) => {
  const progress = projectState.calculateProjectProgress(project.id);
  const completedTasks = project.tasks.filter(t => t.status === 'Done').length;
  const totalTasks = project.tasks.length;

  return (
    <Card
      variant="interactive"
      className={cn(
        'group p-6 space-y-6 transition-all duration-300 border-neutral-200 dark:border-neutral-800',
        className
      )}
    >
      {/* Top Section: Icon and Status */}
      <div className="flex items-start justify-between">
        <div className="h-12 w-12 rounded-2xl bg-primary-100 dark:bg-primary-900/40 text-primary-600 dark:text-primary-400 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 ring-4 ring-primary-500/10">
          <Folder className="h-6 w-6" />
        </div>
        <div className="flex flex-col items-end gap-2">
          <Badge variant="project" className="text-[10px] font-black uppercase tracking-wider">
            {project.status}
          </Badge>
          <span className={cn(
            'text-[10px] font-bold uppercase px-2 py-0.5 rounded-full transition-colors',
            project.priority === 'High' || project.priority === 'Critical'
              ? 'bg-accent-100 text-accent-600 dark:bg-accent-900/30 dark:text-accent-400'
              : 'bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400'
          )}>
            {project.priority} Priority
          </span>
        </div>
      </div>

      {/* Title and Description */}
      <div className="space-y-2">
        <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-1 line-clamp-1 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
          {project.name}
        </h3>
        <p className="text-secondary text-sm line-clamp-2 font-medium opacity-80">
          {project.description}
        </p>
      </div>

      {/* Tech Stack Tags */}
      <div className="flex flex-wrap gap-2">
        {project.technologies.map(tech => (
          <span key={tech} className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-700 transition-colors group-hover:border-primary-500/50">
            {tech}
          </span>
        ))}
      </div>

      {/* Progress Section */}
      <div className="space-y-3 pt-4 border-t border-neutral-100 dark:border-neutral-800">
        <div className="flex justify-between items-end">
          <div className="flex items-center gap-1.5 text-xs text-secondary font-medium">
            <CheckCircle2 className="h-3.5 w-3.5 text-primary-500" />
            <span>{completedTasks} / {totalTasks} tasks</span>
          </div>
          <span className="text-xs font-bold text-neutral-900 dark:text-white">
            {progress}%
          </span>
        </div>
        <ProgressBar value={progress} className="h-2 rounded-full overflow-hidden bg-neutral-100 dark:bg-neutral-800" />
      </div>

      {/* Metadata Footer */}
      <div className="grid grid-cols-2 gap-y-3 gap-x-2 pt-4 border-t border-neutral-100 dark:border-neutral-800">
        <div className="flex items-center gap-2 text-[11px] text-secondary">
          <Calendar className="h-3 w-3" />
          <span>Due {new Date(project.deadline).toLocaleDateString()}</span>
        </div>
        <div className="flex items-center gap-2 text-[11px] text-secondary text-right">
          <Clock className="h-3 w-3" />
          <span>Updated {new Date(project.updatedAt).toLocaleDateString()}</span>
        </div>
      </div>

      {/* Action Button */}
      <Link href={`/projects/${project.id}`} className="mt-auto">
        <Button
          variant="primary"
          className="w-full py-2.5 text-sm font-semibold gap-2 group-hover:shadow-lg transition-all"
        >
          Open Workspace
          <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
        </Button>
      </Link>
    </Card>
  );
};
