import React from 'react';
import { Project } from '@/types';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { storage } from '@/lib/storage';
import {
  CheckCircle2,
  Clock,
  Zap,
  Calendar,
  Layers,
  FileText,
  TrendingUp
} from 'lucide-react';

export const ProjectOverview = ({ project }: { project: Project }) => {
  const progress = storage.calculateProjectProgress(project.id);
  const tasks = storage.getProjectTasks(project.id);
  const completedTasks = tasks.filter(t => t.status === 'Done').length;
  const totalTasks = tasks.length;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Main Overview Content */}
      <div className="lg:col-span-2 space-y-8">
        <Card variant="elevated" className="p-8 space-y-6 border-neutral-200 dark:border-neutral-800 surface-layered">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 ring-4 ring-primary-500/10">
              <FileText className="h-5 w-5" />
            </div>
            <h2 className="text-2xl font-black text-neutral-900 dark:text-white tracking-tight">Project Summary</h2>
          </div>
          <p className="text-secondary text-lg leading-relaxed max-w-3xl font-medium">
            {project.description}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4">
            <div className="p-5 rounded-2xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-100 dark:border-neutral-800 transition-all hover:border-primary-200 dark:hover:border-primary-800 group">
              <div className="text-xs font-black text-neutral-400 uppercase tracking-widest mb-2 group-hover:text-primary-500 transition-colors">Progress</div>
              <div className="text-3xl font-black text-neutral-900 dark:text-white">{progress}%</div>
            </div>
            <div className="p-5 rounded-2xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-100 dark:border-neutral-800 transition-all hover:border-primary-200 dark:hover:border-primary-800 group">
              <div className="text-xs font-black text-neutral-400 uppercase tracking-widest mb-2 group-hover:text-primary-500 transition-colors">Tasks</div>
              <div className="text-3xl font-black text-neutral-900 dark:text-white">{completedTasks} <span className="text-lg font-medium text-neutral-400">/ {totalTasks}</span></div>
            </div>
            <div className="p-5 rounded-2xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-100 dark:border-neutral-800 transition-all hover:border-primary-200 dark:hover:border-primary-800 group">
              <div className="text-xs font-black text-neutral-400 uppercase tracking-widest mb-2 group-hover:text-primary-500 transition-colors">Priority</div>
              <div className="text-3xl font-black text-neutral-900 dark:text-white">{project.priority}</div>
            </div>
          </div>
        </Card>

        <Card variant="elevated" className="p-8 space-y-6 border-neutral-200 dark:border-neutral-800 surface-layered">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 ring-4 ring-primary-500/10">
              <Zap className="h-5 w-5" />
            </div>
            <h2 className="text-2xl font-black text-neutral-900 dark:text-white tracking-tight">Overall Progress</h2>
          </div>
          <div className="space-y-6">
            <div className="space-y-3">
              <div className="flex justify-between items-end">
                <span className="text-sm font-bold text-secondary">Completion Rate</span>
                <span className="text-2xl font-black text-neutral-900 dark:text-white">{progress}%</span>
              </div>
              <ProgressBar value={progress} className="h-3 rounded-full bg-neutral-100 dark:bg-neutral-800" />
            </div>
            <div className="flex items-center gap-3 p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-900/30 text-emerald-700 dark:text-emerald-400">
              <CheckCircle2 className="h-5 w-5 flex-shrink-0" />
              <span className="text-sm font-bold">You've successfully completed {completedTasks} tasks out of {totalTasks} total requirements.</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Sidebar Metadata */}
      <div className="space-y-8">
        <Card variant="elevated" className="p-8 space-y-6 border-neutral-200 dark:border-neutral-800 surface-layered">
          <h3 className="text-sm font-black text-neutral-900 dark:text-white uppercase tracking-widest border-b border-neutral-100 dark:border-neutral-800 pb-4">Project Info</h3>
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="p-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-500">
                <Calendar className="h-4 w-4" />
              </div>
              <div className="space-y-1">
                <div className="text-[10px] font-black text-neutral-400 uppercase tracking-widest">Deadline</div>
                <div className="text-sm text-neutral-900 dark:text-white font-bold">{new Date(project.deadline).toLocaleDateString()}</div>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="p-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-500">
                <Clock className="h-4 w-4" />
              </div>
              <div className="space-y-1">
                <div className="text-[10px] font-black text-neutral-400 uppercase tracking-widest">Created At</div>
                <div className="text-sm text-neutral-900 dark:text-white font-bold">{new Date(project.createdAt).toLocaleDateString()}</div>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="p-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-500">
                <Layers className="h-4 w-4" />
              </div>
              <div className="space-y-2">
                <div className="text-[10px] font-black text-neutral-400 uppercase tracking-widest">Technologies</div>
                <div className="flex flex-wrap gap-2">
                  {project.stack?.map(tech => (
                    <Badge key={tech} variant="project" className="text-[10px] px-2 py-0.5">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Card>

        <div className="relative p-8 rounded-3xl bg-gradient-to-br from-primary-600 to-primary-800 text-white shadow-xl overflow-hidden group">
          <TrendingUp className="absolute -right-4 -bottom-4 h-32 w-32 text-white/10 rotate-12 group-hover:scale-110 transition-transform duration-500" />
          <div className="relative z-10 space-y-3">
            <div className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-amber-400" />
              <h3 className="text-lg font-black">Premium Insight</h3>
            </div>
            <p className="text-sm text-primary-100 leading-relaxed font-medium">
              Break your larger goals into smaller, manageable tasks to maintain momentum and track your progress more accurately.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
