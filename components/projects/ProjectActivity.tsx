import React from 'react';
import { Project } from '@/types/project';
import { Activity, User, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/Card';

export const ProjectActivity = ({ project }: { project: Project }) => {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400">
            <Activity className="h-5 w-5" />
          </div>
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">Activity Log</h2>
        </div>
      </div>

      <div className="relative pl-8 space-y-8 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-0.5 before:bg-neutral-200 dark:before:bg-neutral-800">
        {project.activity.length === 0 ? (
          <div className="p-12 rounded-3xl border-2 border-dashed border-neutral-200 dark:border-neutral-800 text-center space-y-2">
            <p className="text-sm text-secondary italic">No activity recorded for this project yet.</p>
          </div>
        ) : (
          project.activity.map((activity, index) => (
            <div key={activity.id} className="relative group">
              {/* Timeline Dot */}
              <div className={cn(
                'absolute -left-[21px] top-5 h-4 w-4 rounded-full border-2 border-white dark:border-neutral-900 z-10 transition-all duration-300',
                index === 0 ? 'bg-primary-500 scale-125 shadow-sm shadow-primary-500/50' : 'bg-neutral-300 dark:bg-neutral-700 group-hover:bg-primary-400'
              )} />

              <Card variant="elevated" className="p-5 space-y-3 transition-all group-hover:-translate-x-1">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div className="h-10 w-10 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-neutral-500 border border-neutral-200 dark:border-neutral-700">
                      <User className="h-5 w-5" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-neutral-900 dark:text-white font-bold leading-tight">
                        {activity.action}
                      </p>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-neutral-600 dark:text-neutral-400">{activity.user}</span>
                        <span className="text-neutral-300 dark:text-neutral-600">•</span>
                        <div className="flex items-center gap-1 text-[11px] text-secondary font-medium">
                          <Clock className="h-3 w-3" />
                          <span>{new Date(activity.timestamp).toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
