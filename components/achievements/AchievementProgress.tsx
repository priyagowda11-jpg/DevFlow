import React from 'react';
import { Achievement } from '@/types';
import { Trophy, Lock, Unlock, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AchievementProgressProps {
  achievement: Achievement;
}

export const AchievementProgress = ({ achievement }: AchievementProgressProps) => {
  return (
    <div className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 space-y-6">
      <div className="flex items-center gap-4">
        <div className={cn(
          'h-16 w-16 rounded-2xl flex items-center justify-center text-white shadow-lg transition-transform hover:scale-105',
          achievement.isUnlocked ? 'bg-primary-500' : 'bg-neutral-400 dark:bg-neutral-700'
        )}>
          {achievement.isUnlocked ? <Unlock className="h-8 w-8" /> : <Lock className="h-8 w-8" />}
        </div>
        <div>
          <h3 className="text-xl font-bold text-neutral-900 dark:text-white">{achievement.name}</h3>
          <p className="text-secondary text-sm">{achievement.isUnlocked ? 'Achievement Unlocked!' : 'Keep building to unlock'}</p>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex justify-between items-center text-sm">
          <span className="text-neutral-500 dark:text-neutral-400">Requirement: {achievement.requirement}</span>
          <span className="font-bold text-neutral-900 dark:text-white">{achievement.progress}%</span>
        </div>
        <div className="h-3 w-full bg-neutral-100 dark:bg-neutral-800 rounded-full overflow-hidden border border-neutral-200 dark:border-neutral-700">
          <div
            className={cn(
              'h-full transition-all duration-700 ease-out',
              achievement.isUnlocked ? 'bg-primary-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]' : 'bg-neutral-400'
            )}
            style={{ width: `${achievement.progress}%` }}
          />
        </div>
      </div>

      {achievement.isUnlocked && (
        <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest pt-2">
          <CheckCircle2 className="h-3 w-3" />
          <span>Unlocked on {achievement.unlockedAt}</span>
        </div>
      )}
    </div>
  );
};
