import React from 'react';
import { Achievement } from '@/types';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Trophy, Lock, Unlock, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AchievementCardProps {
  achievement: Achievement;
  onClick?: () => void;
  className?: string;
}

export const AchievementCard = ({ achievement, onClick, className }: AchievementCardProps) => {
  const isUnlocked = achievement.isUnlocked;

  return (
    <Card
      variant={isUnlocked ? 'elevated' : 'default'}
      onClick={onClick}
      className={cn(
        'group relative p-6 transition-all cursor-pointer overflow-hidden h-full',
        isUnlocked
          ? 'bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 hover:shadow-xl hover:-translate-y-2'
          : 'bg-neutral-50 dark:bg-neutral-800/50 border-neutral-200 dark:border-neutral-800 opacity-60 grayscale-[0.5] hover:opacity-80 transition-all',
        className
      )}
    >
      {isUnlocked && (
        <div className="absolute -top-10 -right-10 h-32 w-32 bg-primary-500/10 rounded-full blur-3xl group-hover:bg-primary-500/20 transition-colors" />
      )}

      <div className="flex items-start justify-between mb-6">
        <div className={cn(
          'h-14 w-14 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 shadow-sm',
          isUnlocked
            ? 'bg-gradient-to-br from-primary-500 to-primary-700 text-white shadow-primary-500/20'
            : 'bg-neutral-200 dark:bg-neutral-700 text-neutral-400'
        )}>
          {isUnlocked ? <Trophy className="h-7 w-7" /> : <Lock className="h-6 w-6" />}
        </div>
        <Badge variant="project" className={cn(
          'text-[10px] px-3 py-1 rounded-full font-bold uppercase tracking-wider',
          isUnlocked ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400' : 'bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400'
        )}>
          {isUnlocked ? 'Unlocked' : 'Locked'}
        </Badge>
      </div>

      <div className="space-y-2 mb-8">
        <h3 className={cn(
          'text-lg font-bold leading-tight transition-colors',
          isUnlocked ? 'text-neutral-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400' : 'text-neutral-500 dark:text-neutral-400'
        )}>
          {achievement.name}
        </h3>
        <p className={cn(
          'text-sm line-clamp-2 transition-colors',
          isUnlocked ? 'text-secondary' : 'text-neutral-400 dark:text-neutral-500'
        )}>
          {achievement.description}
        </p>
      </div>

      {/* Progress Section */}
      <div className="space-y-3">
        <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
          <span className="text-neutral-400">Progress</span>
          <span className={cn(
            'transition-colors',
            isUnlocked ? 'text-primary-600 dark:text-primary-400' : 'text-neutral-500'
          )}>{achievement.progress}%</span>
        </div>
        <div className="h-2 w-full bg-neutral-100 dark:bg-neutral-800 rounded-full overflow-hidden border border-neutral-200 dark:border-neutral-700">
          <div
            className={cn(
              'h-full transition-all duration-700 ease-out rounded-full',
              isUnlocked ? 'bg-gradient-to-r from-primary-500 to-teal-500' : 'bg-neutral-400'
            )}
            style={{ width: `${achievement.progress}%` }}
          />
        </div>
      </div>
    </Card>
  );
};
