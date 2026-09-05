import React from 'react';
import { Project } from '@/types/project';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { ExternalLink, GitBranch, Globe, Calendar, Clock, Folder } from 'lucide-react';
import { cn } from '@/lib/utils';

export const ProjectDetails = ({ project }: { project: Project }) => {
  return (
    <div className="space-y-8">
      <Card variant="elevated" className="p-8 space-y-8">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400">
            <Folder className="h-5 w-5" />
          </div>
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">Project Specifications</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
          {/* Basic Info */}
          <div className="space-y-8">
            <div className="space-y-3">
              <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest">Full Description</label>
              <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
                {project.description}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest">Status</label>
                <Badge variant="project" className="w-full justify-start py-1.5 px-3 rounded-lg">{project.status}</Badge>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest">Priority</label>
                <Badge variant="project" className="w-full justify-start py-1.5 px-3 rounded-lg">{project.priority}</Badge>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest">Deadline</label>
              <div className="flex items-center gap-3 text-sm text-neutral-900 dark:text-white font-semibold bg-neutral-50 dark:bg-neutral-800/50 p-3 rounded-xl border border-neutral-100 dark:border-neutral-800">
                <Calendar className="h-4 w-4 text-primary-500" />
                {new Date(project.deadline).toLocaleDateString()}
              </div>
            </div>
          </div>

          {/* Links and Tech */}
          <div className="space-y-8">
            <div className="space-y-4">
              <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest">Resources</label>
              <div className="space-y-3">
                {project.repositoryUrl ? (
                  <a
                    href={project.repositoryUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-4 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:border-primary-500 dark:hover:border-primary-500 hover:shadow-md transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-500 group-hover:text-primary-500 transition-colors">
                        <GitBranch className="h-4 w-4" />
                      </div>
                      <span className="text-sm text-neutral-900 dark:text-white font-bold">GitHub Repository</span>
                    </div>
                    <ExternalLink className="h-4 w-4 text-neutral-400 group-hover:text-primary-500 transition-colors" />
                  </a>
                ) : (
                  <div className="flex items-center gap-3 p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-800/50 border border-dashed border-neutral-200 dark:border-neutral-800">
                    <GitBranch className="h-4 w-4 text-neutral-300" />
                    <span className="text-xs text-neutral-400 italic">No repository linked</span>
                  </div>
                )}

                {project.demoUrl ? (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-4 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:border-primary-500 dark:hover:border-primary-500 hover:shadow-md transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-500 group-hover:text-primary-500 transition-colors">
                        <Globe className="h-4 w-4" />
                      </div>
                      <span className="text-sm text-neutral-900 dark:text-white font-bold">Live Demo</span>
                    </div>
                    <ExternalLink className="h-4 w-4 text-neutral-400 group-hover:text-primary-500 transition-colors" />
                  </a>
                ) : (
                  <div className="flex items-center gap-3 p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-800/50 border border-dashed border-neutral-200 dark:border-neutral-800">
                    <Globe className="h-4 w-4 text-neutral-300" />
                    <span className="text-xs text-neutral-400 italic">No demo linked</span>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest">Tech Stack</label>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map(tech => (
                  <Badge key={tech} variant="project" className="text-[11px] px-3 py-1 rounded-lg">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-neutral-100 dark:border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-secondary uppercase font-bold tracking-widest">
          <div className="flex items-center gap-2">
            <Calendar className="h-3 w-3" />
            <span>Created {new Date(project.createdAt).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-3 w-3" />
            <span>Last Updated {new Date(project.updatedAt).toLocaleDateString()}</span>
          </div>
        </div>
      </Card>
    </div>
  );
};
