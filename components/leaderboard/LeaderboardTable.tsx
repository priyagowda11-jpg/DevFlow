import React from 'react';
import { LeaderboardEntry } from '@/types';
import { cn } from '@/lib/utils';
import { Trophy, Medal, Crown } from 'lucide-react';
import { EmptyState } from '@/components/ui/EmptyState';
import { Avatar } from '@/components/ui/Avatar';

interface LeaderboardRowProps {
  entry: LeaderboardEntry;
  isCurrentUser: boolean;
}

export const LeaderboardRow = ({ entry, isCurrentUser }: LeaderboardRowProps) => {
  return (
    <div className={cn(
      'grid grid-cols-6 items-center p-4 rounded-2xl transition-all',
      isCurrentUser
        ? 'bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800 shadow-sm ring-1 ring-primary-500/20'
        : 'hover:bg-neutral-50 dark:hover:bg-neutral-800/50 border border-transparent'
    )}>
      <div className="flex items-center justify-center w-10">
        <span className={cn(
          'text-xs font-black',
          isCurrentUser ? 'text-primary-600 dark:text-primary-400' : 'text-neutral-400'
        )}>{entry.rank}</span>
      </div>
      <div className="flex items-center gap-3">
        <Avatar src="" fallback={entry.userName} size="sm" />
        <span className={cn(
          'text-sm font-bold text-neutral-900 dark:text-white truncate',
          isCurrentUser && 'text-primary-600 dark:text-primary-400'
        )}>
          {entry.userName}
        </span>
        {isCurrentUser && (
          <span className="text-[9px] font-black uppercase px-1.5 py-0.5 rounded-full bg-primary-500 text-white">
            You
          </span>
        )}
      </div>
      <div className="text-center text-sm text-neutral-600 dark:text-neutral-400 font-medium">
        {entry.projectIdCount} <span className="hidden md:inline">Proj</span>
      </div>
      <div className="text-center text-sm text-neutral-600 dark:text-neutral-400 font-medium">
        {entry.taskCount} <span className="hidden md:inline">Tasks</span>
      </div>
      <div className="text-center text-sm font-black text-neutral-900 dark:text-white">
        {entry.productivityScore}%
      </div>
      <div className="text-right text-sm font-black text-primary-600 dark:text-primary-400">
        {entry.points.toLocaleString()} <span className="hidden md:inline">pts</span>
      </div>
    </div>
  );
};

export const LeaderboardTable = ({ entries, currentUserId }: { entries: LeaderboardEntry[], currentUserId: string }) => {
  if (entries.length === 0) {
    return (
      <EmptyState
        icon={<Trophy className="h-12 w-12" />}
        title="Leaderboard is empty"
        description="Start completing tasks and projects to climb the ranks!"
      />
    );
  }

  const topThree = entries.slice(0, 3);
  const rest = entries.slice(3);

  return (
    <div className="space-y-12">
      {/* Podium Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end px-4 pb-8">
        {/* 2nd Place */}
        {topThree[1] && (
          <div className="flex flex-col items-center space-y-4 order-2 md:order-1">
            <div className="relative p-1 rounded-3xl bg-neutral-200 dark:bg-neutral-800">
              <div className="h-32 w-32 rounded-2xl bg-white dark:bg-neutral-900 flex flex-col items-center justify-center p-4 shadow-sm border border-neutral-100 dark:border-neutral-800">
                <Avatar src="" fallback={topThree[1].userName} size="lg" className="mb-3" />
                <span className="text-sm font-bold text-neutral-900 dark:text-white truncate w-full text-center">{topThree[1].userName}</span>
                <span className="text-lg font-black text-neutral-400">{topThree[1].points.toLocaleString()}</span>
              </div>
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 p-1.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-400 border border-neutral-200 dark:border-neutral-700 shadow-sm">
                <Medal className="h-4 w-4" />
              </div>
            </div>
            <div className="text-center">
              <span className="text-xs font-black uppercase tracking-widest text-neutral-400">2nd Place</span>
            </div>
          </div>
        )}

        {/* 1st Place */}
        {topThree[0] && (
          <div className="flex flex-col items-center space-y-4 order-1 md:order-2 relative">
            <div className="relative p-2 rounded-3xl bg-gradient-to-b from-amber-400 to-amber-600 shadow-lg shadow-amber-500/20">
              <div className="h-40 w-40 rounded-2xl bg-white dark:bg-neutral-900 flex flex-col items-center justify-center p-6 shadow-inner border border-amber-100 dark:border-amber-900/30">
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 p-2 rounded-full bg-amber-400 text-white shadow-md">
                  <Crown className="h-6 w-6" />
                </div>
                <Avatar src="" fallback={topThree[0].userName} size="lg" className="mb-4 ring-4 ring-amber-100 dark:ring-amber-900/30" />
                <span className="text-lg font-black text-neutral-900 dark:text-white truncate w-full text-center">{topThree[0].userName}</span>
                <span className="text-xl font-black text-amber-600 dark:text-amber-400">{topThree[0].points.toLocaleString()}</span>
              </div>
            </div>
            <div className="text-center">
              <span className="text-xs font-black uppercase tracking-widest text-amber-600 dark:text-amber-400">Grand Champion</span>
            </div>
          </div>
        )}

        {/* 3rd Place */}
        {topThree[2] && (
          <div className="flex flex-col items-center space-y-4 order-3 md:order-3">
            <div className="relative p-1 rounded-3xl bg-neutral-200 dark:bg-neutral-800">
              <div className="h-32 w-32 rounded-2xl bg-white dark:bg-neutral-900 flex flex-col items-center justify-center p-4 shadow-sm border border-neutral-100 dark:border-neutral-800">
                <Avatar src="" fallback={topThree[2].userName} size="lg" className="mb-3" />
                <span className="text-sm font-bold text-neutral-900 dark:text-white truncate w-full text-center">{topThree[2].userName}</span>
                <span className="text-lg font-black text-neutral-400">{topThree[2].points.toLocaleString()}</span>
              </div>
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 p-1.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-orange-400 border border-neutral-200 dark:border-neutral-700 shadow-sm">
                <Medal className="h-4 w-4" />
              </div>
            </div>
            <div className="text-center">
              <span className="text-xs font-black uppercase tracking-widest text-neutral-400">3rd Place</span>
            </div>
          </div>
        )}
      </div>

      {/* Table for others */}
      <div className="space-y-4">
        <div className="hidden md:grid grid-cols-6 px-6 py-3 text-[10px] font-black uppercase tracking-widest text-neutral-400">
          <div className="text-center w-10">Rank</div>
          <div className="text-left">Developer</div>
          <div className="text-center">Projects</div>
          <div className="text-center">Tasks</div>
          <div className="text-center">Productivity</div>
          <div className="text-right">Points</div>
        </div>
        <div className="space-y-2">
          {rest.map((entry) => (
            <LeaderboardRow
              key={entry.userId}
              entry={entry}
              isCurrentUser={entry.userId === currentUserId}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
