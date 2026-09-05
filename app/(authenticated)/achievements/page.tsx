'use client';

import React from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { storage } from '@/lib/storage';
import { useAuth } from '@/context/AuthContext';
import {
  Trophy,
  Lock,
  Star,
  Zap,
  FolderKanban,
  CheckSquare,
  Layers,
  BookOpen,
  FileText,
  TrendingUp,
  Clock,
  Award
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function AchievementsPage() {
  const { user } = useAuth();

  if (!user) return null;

  const studentAchievements = storage.getStudentAchievements(user.id);
  const unlockedCount = studentAchievements.filter(a => a.isUnlocked).length;

  const achievementDefinitions = [
    {
      id: 'first-project',
      name: 'First Project',
      description: 'Created your first professional project',
      icon: FolderKanban,
      color: 'text-primary-500',
      glow: 'group-hover:shadow-primary-500/20',
      bg: 'bg-primary-50 dark:bg-primary-900/30'
    },
    {
      id: 'first-task',
      name: 'First Task',
      description: 'Completed your first project task',
      icon: CheckSquare,
      color: 'text-emerald-500',
      glow: 'group-hover:shadow-emerald-500/20',
      bg: 'bg-emerald-50 dark:bg-emerald-900/30'
    },
    {
      id: 'task-master',
      name: 'Task Master',
      description: 'Complete 10 project tasks',
      icon: Zap,
      color: 'text-amber-500',
      glow: 'group-hover:shadow-amber-500/20',
      bg: 'bg-amber-50 dark:bg-amber-900/30'
    },
    {
      id: 'project-builder',
      name: 'Project Builder',
      description: 'Create 3 professional projects',
      icon: Layers,
      color: 'text-orange-500',
      glow: 'group-hover:shadow-orange-500/20',
      bg: 'bg-orange-50 dark:bg-orange-900/30'
    },
    {
      id: 'learning-starter',
      name: 'Learning Starter',
      description: 'Enrolled in your first professional course',
      icon: BookOpen,
      color: 'text-teal-500',
      glow: 'group-hover:shadow-teal-500/20',
      bg: 'bg-teal-50 dark:bg-teal-900/30'
    },
    {
      id: 'course-explorer',
      name: 'Course Explorer',
      description: 'Complete your first lesson',
      icon: FileText,
      color: 'text-teal-500',
      glow: 'group-hover:shadow-teal-500/20',
      bg: 'bg-teal-50 dark:bg-teal-900/30'
    },
    {
      id: 'course-finisher',
      name: 'Course Finisher',
      description: 'Complete an entire course',
      icon: Trophy,
      color: 'text-orange-500',
      glow: 'group-hover:shadow-orange-500/20',
      bg: 'bg-orange-50 dark:bg-orange-900/30'
    },
    {
      id: 'productive-student',
      name: 'Productive Student',
      description: 'Complete 25 project tasks',
      icon: TrendingUp,
      color: 'text-amber-500',
      glow: 'group-hover:shadow-amber-500/20',
      bg: 'bg-amber-50 dark:bg-amber-900/30'
    },
    {
      id: 'consistent-learner',
      name: 'Consistent Learner',
      description: 'Complete 10 lessons',
      icon: Clock,
      color: 'text-emerald-500',
      glow: 'group-hover:shadow-emerald-500/20',
      bg: 'bg-emerald-50 dark:bg-emerald-900/30'
    }
  ];

  const progressPercent = Math.round((unlockedCount / achievementDefinitions.length) * 100);

  return (
    <PageContainer>
      <div className="space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-3 text-primary-600 dark:text-primary-400 mb-2">
              <Award className="h-6 w-6" />
              <span className="text-xs font-black uppercase tracking-widest">Trophy Room</span>
            </div >
            <h1 className="text-page-title">Achievements</h1>
            <p className="text-secondary text-lg">Unlock milestones as you learn, build, and grow.</p>
          </div >

          <Card variant="elevated" className="p-6 w-full md:w-80 border-neutral-200 dark:border-neutral-800 surface-layered">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-black text-neutral-400 uppercase tracking-widest">Collection Progress</span>
              <span className="text-sm font-black text-neutral-900 dark:text-white">{unlockedCount} / {achievementDefinitions.length}</span>
            </div >
            <ProgressBar value={progressPercent} className="h-2 rounded-full bg-neutral-100 dark:bg-neutral-800" />
          </Card>
        </div >

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {achievementDefinitions.map(def => {
            const studentAch = studentAchievements.find(a => a.id === def.id);
            const isUnlocked = studentAch?.isUnlocked || false;
            const Icon = def.icon;

            return (
              <Card
                key={def.id}
                variant="elevated"
                className={cn(
                  'group relative p-6 transition-all duration-300 border-neutral-200 dark:border-neutral-800 cursor-default',
                  isUnlocked
                    ? 'surface-layered hover:shadow-2xl hover:-translate-y-1'
                    : 'opacity-50 grayscale-[0.7] bg-neutral-50 dark:bg-neutral-900/30 border-dashed'
                )}
              >
                <div className="flex items-start justify-between mb-6">
                  <div className={cn(
                    'p-4 rounded-2xl transition-all duration-300',
                    isUnlocked
                      ? `${def.bg} shadow-sm group-hover:scale-110`
                      : 'bg-neutral-200 dark:bg-neutral-800'
                  )}>
                    <Icon className={cn('h-8 w-8', isUnlocked ? def.color : 'text-neutral-400')} />
                  </div >
                  {isUnlocked ? (
                    <Badge variant="in-progress" className="bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400 border-none font-black text-[9px] uppercase tracking-wider">
                      Unlocked
                    </Badge>
                  ) : (
                    <Badge variant="todo" className="bg-neutral-100 text-neutral-400 dark:bg-neutral-800 dark:text-neutral-500 border-none font-black text-[9px] uppercase tracking-wider">
                      Locked
                    </Badge>
                  )}
                </div >
                <div className="space-y-2">
                  <h3 className={cn(
                    'font-black text-lg transition-colors',
                    isUnlocked ? 'text-neutral-900 dark:text-white' : 'text-neutral-500 dark:text-neutral-600'
                  )}>{def.name}</h3>
                  <p className={cn(
                    'text-sm leading-relaxed transition-colors',
                    isUnlocked ? 'text-secondary' : 'text-neutral-400 dark:text-neutral-600'
                  )}>{def.description}</p>
                </div >
                {isUnlocked && (
                  <div className="mt-6 pt-4 border-t border-neutral-100 dark:border-neutral-800 flex items-center gap-2 text-[10px] font-black text-neutral-400 uppercase tracking-widest">
                    <Star className="h-3 w-3 text-amber-500" />
                    Earned {new Date(studentAch?.unlockedAt || '').toLocaleDateString()}
                  </div >
                )}

                {/* Visual Glow for Unlocked */}
                {isUnlocked && (
                  <div className={cn(
                    "absolute inset-0 rounded-[inherit] pointer-events-none transition-opacity opacity-0 group-hover:opacity-100 blur-xl -z-10",
                    def.glow
                  )} />
                )}
              </Card>
            );
          })}
        </div >
      </div >
    </PageContainer>
  );
}
