'use client';

import React from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { storage } from '@/lib/storage';
import { Trophy, Award } from 'lucide-react';
import { cn } from '@/lib/utils';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { AdminProgressBar } from '@/components/admin/AdminProgressBar';

export default function AdminAchievementsPage() {
  const allStudents = storage.getStudents();
  const allAchievements = storage.getAchievements();

  const achievementDefinitions = [
    { id: 'first-project', name: 'First Project', color: 'text-primary-500', bg: 'bg-primary-50 dark:bg-primary-900/30' },
    { id: 'first-task', name: 'First Task', color: 'text-emerald-500', bg: 'bg-emerald-50 dark:bg-emerald-900/30' },
    { id: 'task-master', name: 'Task Master', color: 'text-amber-500', bg: 'bg-amber-50 dark:bg-amber-900/30' },
    { id: 'project-builder', name: 'Project Builder', color: 'text-orange-500', bg: 'bg-orange-50 dark:bg-orange-900/30' },
    { id: 'learning-starter', name: 'Learning Starter', color: 'text-teal-500', bg: 'bg-teal-50 dark:bg-teal-900/30' },
    { id: 'course-explorer', name: 'Course Explorer', color: 'text-teal-500', bg: 'bg-teal-50 dark:bg-teal-900/30' },
    { id: 'course-finisher', name: 'Course Finisher', color: 'text-orange-500', bg: 'bg-orange-50 dark:bg-orange-900/30' },
    { id: 'productive-student', name: 'Productive Student', color: 'text-amber-500', bg: 'bg-amber-50 dark:bg-amber-900/30' },
    { id: 'consistent-learner', name: 'Consistent Learner', color: 'text-emerald-500', bg: 'bg-emerald-50 dark:bg-emerald-900/30' },
  ];

  const getRarity = (percentage: number) => {
    if (percentage < 10) return { label: 'Legendary', color: 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400' };
    if (percentage < 30) return { label: 'Rare', color: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400' };
    if (percentage < 60) return { label: 'Uncommon', color: 'bg-teal-100 text-teal-600 dark:bg-teal-900/30 dark:text-teal-400' };
    return { label: 'Common', color: 'bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400' };
  };

  return (
    <PageContainer>
      <div className="space-y-10">
        <AdminPageHeader
          title="Achievement Metrics"
          subtitle="Global distribution and rarity analysis of student milestones."
          icon={<Award className="h-6 w-6" />}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {achievementDefinitions.map(def => {
            const unlockedCount = Object.values(allAchievements).flatMap(list => list).filter(a => a.id === def.id && a.isUnlocked).length;
            const unlockPercentage = allStudents.length > 0 ? Math.round((unlockedCount / allStudents.length) * 100) : 0;
            const rarity = getRarity(unlockPercentage);

            return (
              <Card key={def.id} variant="elevated" className="p-8 space-y-6 border-neutral-200 dark:border-neutral-800 surface-layered transition-all hover:shadow-xl hover:-translate-y-1 group">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className={cn('p-3 rounded-2xl shadow-sm transition-transform group-hover:scale-110', def.bg)}>
                      <Trophy className={cn('h-6 w-6', def.color)} />
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-black text-neutral-900 dark:text-white tracking-tight">{def.name}</h3>
                      <Badge className={cn('text-[9px] px-2 py-0.5 rounded-md font-black uppercase tracking-wider', rarity.color)}>
                        {rarity.label}
                      </Badge>
                    </div>
                  </div>
                  <span className="text-xl font-black text-neutral-900 dark:text-white">{unlockPercentage}%</span>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between text-xs font-black uppercase tracking-widest">
                    <span className="text-neutral-400">Students Unlocked</span>
                    <span className="text-neutral-900 dark:text-white">{unlockedCount}</span>
                  </div>
                  <AdminProgressBar
                    progress={unlockPercentage}
                    variant="primary"
                    showPercentage
                  />
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </PageContainer>
  );
}
