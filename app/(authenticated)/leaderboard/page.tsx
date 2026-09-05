'use client';

import { useState, useEffect } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { storage } from '@/lib/storage';
import { useAuth } from '@/context/AuthContext';
import {
  Trophy,
  Zap,
  ArrowUpRight,
  Crown,
  Medal,
  Star,
  CheckCircle2,
  BookOpen,
  Rocket
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Avatar } from '@/components/ui/Avatar';

export default function LeaderboardPage() {
  const { user } = useAuth();
  const [students, setStudents] = useState<any[]>([]);

  useEffect(() => {
    const loadLeaderboard = () => {
      const allStudents = storage.getStudents();

      const samples = [
        { id: 's1', fullName: 'Alex Rivera', points: 1200, tasks: 45, courses: 3, achievements: 8, email: 'alex@example.com' },
        { id: 's2', fullName: 'Sarah Chen', points: 2100, tasks: 82, courses: 5, achievements: 12, email: 'sarah@example.com' },
        { id: 's3', fullName: 'Jordan Smith', points: 800, tasks: 20, courses: 1, achievements: 4, email: 'jordan@example.com' },
        { id: 's4', fullName: 'Maya Patel', points: 1500, tasks: 55, courses: 4, achievements: 9, email: 'maya@example.com' },
      ];

      const merged = [...allStudents, ...samples].map(s => {
        if (s.id && (s as any).email) {
          const tasks = storage.getStudentTasks(s.id);
          const completedTasks = tasks.filter((t: any) => t.status === 'Done' || t.status === 'Completed').length;
          const courseProgress = storage.getStudentCourseProgress(s.id);
          const completedCourses = courseProgress.filter(p => {
             const course = require('@/data/course-data').COURSES.find((c: any) => c.id === p.courseId);
             const total = course?.modules.reduce((acc: number, m: any) => acc + m.lessons.length, 0) || 0;
             return p.completedLessons.length === total && total > 0;
          }).length;
          const achievements = storage.getStudentAchievements(s.id).filter(a => a.isUnlocked).length;

          return {
            id: s.id,
            name: s.fullName,
            points: s.points || 0,
            tasks: completedTasks,
            courses: completedCourses,
            achievements: achievements
          };
        }
        return s;
      });

      merged.sort((a, b) => (b.points || 0) - (a.points || 0));
      setStudents(merged);
    };

    loadLeaderboard();
  }, [user]);

  if (!user) return null;

  const topThree = students.slice(0, 3);
  const userRank = students.findIndex(s => s.id === user.id) + 1;

  const getTier = (rank: number) => {
    if (rank === 1) return { name: 'Grandmaster', color: 'text-amber-500 bg-amber-500/10', border: 'border-amber-500/50' };
    if (rank <= 3) return { name: 'Elite', color: 'text-neutral-400 bg-neutral-400/10', border: 'border-neutral-400/50' };
    if (rank <= 10) return { name: 'Diamond', color: 'text-blue-400 bg-blue-400/10', border: 'border-blue-400/50' };
    if (rank <= 25) return { name: 'Platinum', color: 'text-teal-400 bg-teal-400/10', border: 'border-teal-400/50' };
    return { name: 'Gold', color: 'text-yellow-600 bg-yellow-600/10', border: 'border-yellow-600/50' };
  };

  return (
    <PageContainer>
      <div className="space-y-12">
        <div className="space-y-2 text-center max-w-3xl mx-auto">
          <h1 className="text-5xl font-black text-neutral-900 dark:text-white tracking-tight">Global Leaderboard</h1>
          <p className="text-secondary text-lg font-medium">
            Celebrating the most productive developers and lifelong learners in the DevFlow community.
          </p>
        </div >

        {/* Podium Section */}
        <div className="flex justify-center items-end gap-4 md:gap-8 mb-16 px-4">
          {/* 2nd Place */}
          {topThree[1] && (
            <div className="flex flex-col items-center space-y-4 w-32 md:w-40 order-2 md:order-1">
              <div className="relative">
                <div className="h-16 w-16 md:h-20 md:w-20 rounded-full ring-4 ring-neutral-200 dark:ring-neutral-800 overflow-hidden shadow-lg">
                  <Avatar src="" fallback={topThree[1].name} size="lg" className="w-full h-full" />
                </div>
                <div className="absolute -top-2 -right-2 p-1.5 bg-neutral-100 dark:bg-neutral-800 rounded-full border border-neutral-200 dark:border-neutral-700 text-neutral-500 shadow-sm">
                  <Medal className="h-4 w-4" />
                </div>
              </div>
              <div className="text-center space-y-1">
                <p className="font-black text-sm truncate w-full px-2">{topThree[1].name}</p>
                <p className="text-xs font-bold text-primary-600 dark:text-primary-400">{topThree[1].points} pts</p>
              </div>
              <div className="w-full h-20 md:h-28 bg-neutral-100 dark:bg-neutral-800/50 rounded-t-3xl border-t border-x border-neutral-200 dark:border-neutral-700 flex items-center justify-center shadow-inner">
                <span className="text-2xl font-black text-neutral-400">2</span>
              </div>
            </div>
          )}

          {/* 1st Place */}
          {topThree[0] && (
            <div className="flex flex-col items-center space-y-4 w-36 md:w-48 relative">
              <div className="relative">
                <div className="h-20 w-20 md:h-24 md:w-24 rounded-full ring-8 ring-primary-500/20 overflow-hidden shadow-2xl shadow-primary-500/30">
                  <Avatar src="" fallback={topThree[0].name} size="lg" className="w-full h-full" />
                </div>
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 p-2 bg-primary-500 text-white rounded-full shadow-lg animate-bounce">
                  <Crown className="h-6 w-6" />
                </div>
              </div>
              <div className="text-center space-y-1">
                <p className="font-black text-base truncate w-full px-2">{topThree[0].name}</p>
                <p className="text-sm font-black text-primary-600 dark:text-primary-400">{topThree[0].points} pts</p>
              </div>
              <div className="w-full h-32 md:h-44 bg-primary-50 dark:bg-primary-900/20 rounded-t-3xl border-t border-x border-primary-200 dark:border-primary-800 flex items-center justify-center shadow-inner">
                <span className="text-4xl font-black text-primary-500">1</span>
              </div>
            </div>
          )}

          {/* 3rd Place */}
          {topThree[2] && (
            <div className="flex flex-col items-center space-y-4 w-32 md:w-40">
              <div className="relative">
                <div className="h-16 w-16 md:h-20 md:w-20 rounded-full ring-4 ring-neutral-200 dark:ring-neutral-800 overflow-hidden shadow-lg">
                  <Avatar src="" fallback={topThree[2].name} size="lg" className="w-full h-full" />
                </div>
                <div className="absolute -top-2 -right-2 p-1.5 bg-neutral-100 dark:bg-neutral-800 rounded-full border border-neutral-200 dark:border-neutral-700 text-neutral-500 shadow-sm">
                  <Medal className="h-4 w-4" />
                </div>
              </div>
              <div className="text-center space-y-1">
                <p className="font-black text-sm truncate w-full px-2">{topThree[2].name}</p>
                <p className="text-xs font-bold text-primary-600 dark:text-primary-400">{topThree[2].points} pts</p>
              </div>
              <div className="w-full h-16 md:h-24 bg-neutral-100 dark:bg-neutral-800/50 rounded-t-3xl border-t border-x border-neutral-200 dark:border-neutral-700 flex items-center justify-center shadow-inner">
                <span className="text-xl font-black text-neutral-400">3</span>
              </div>
            </div>
          )}
        </div >

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Leaderboard Table */}
          <Card variant="elevated" className="lg:col-span-2 overflow-hidden border-neutral-200 dark:border-neutral-800 surface-layered">
            <div className="p-6 border-b border-neutral-100 dark:border-neutral-800 flex items-center justify-between bg-neutral-50/50 dark:bg-neutral-900/50">
              <div className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-amber-500" />
                <h2 className="font-black text-neutral-900 dark:text-white">Rankings</h2>
              </div>
              <span className="text-xs font-bold text-neutral-400 uppercase tracking-widest">All-Time</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-neutral-50 dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800">
                  <tr className="text-neutral-400 uppercase text-[10px] font-black tracking-widest">
                    <th className="px-6 py-4 w-16 text-center">Rank</th>
                    <th className="px-6 py-4">Student</th>
                    <th className="px-6 py-4 text-center">Tasks</th>
                    <th className="px-6 py-4 text-center">Courses</th>
                    <th className="px-6 py-4 text-right">Points</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800">
                  {students.map((s, idx) => {
                    const isCurrentUser = s.id === user.id;
                    const tier = getTier(idx + 1);
                    return (
                      <tr
                        key={s.id}
                        className={cn(
                          'transition-all group',
                          isCurrentUser
                            ? 'bg-primary-50 dark:bg-primary-900/20 ring-1 ring-inset ring-primary-500/20'
                            : 'hover:bg-neutral-50 dark:hover:bg-neutral-800/50'
                        )}
                      >
                        <td className="px-6 py-4 text-center font-black text-neutral-400 group-hover:text-neutral-600 dark:group-hover:text-neutral-300">
                          #{idx + 1}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <Avatar src="" fallback={s.name} size="sm" className="ring-2 ring-transparent group-hover:ring-primary-500/20 transition-all" />
                            <div className="flex flex-col">
                              <span className={cn(
                                'font-bold transition-colors',
                                isCurrentUser ? 'text-primary-600 dark:text-primary-400' : 'text-neutral-900 dark:text-white'
                              )}>{s.name || s.fullName}</span>
                              <span className={cn(
                                'text-[9px] font-black uppercase tracking-tighter px-1.5 py-0.5 rounded-full w-fit',
                                tier.color
                              )}>{tier.name}</span>
                            </div >
                          </div >
                        </td>
                        <td className="px-6 py-4 text-center font-bold text-neutral-600 dark:text-neutral-400">{s.tasks || 0}</td>
                        <td className="px-6 py-4 text-center font-bold text-neutral-600 dark:text-neutral-400">{s.courses || 0}</td>
                        <td className="px-6 py-4 text-right font-black text-primary-600 dark:text-primary-400">
                          {s.points || 0}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </Card>

          <div className="space-y-8">
            {/* Standing Card */}
            <Card variant="elevated" className="p-8 space-y-6 border-neutral-200 dark:border-neutral-800 surface-layered relative overflow-hidden">
              <div className="absolute -right-8 -bottom-8 h-32 w-32 bg-primary-500/10 rounded-full blur-3xl" />
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400 shadow-sm">
                  <Trophy className="h-5 w-5" />
                </div>
                <h3 className="font-black text-lg uppercase tracking-tight text-neutral-900 dark:text-white">Your Standing</h3>
              </div >
              <div className="p-8 rounded-3xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-100 dark:border-neutral-800 space-y-8 relative z-10">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-black text-neutral-400 uppercase tracking-widest">Current Rank</span>
                  <span className="text-5xl font-black text-neutral-900 dark:text-white">
                    #{userRank}
                  </span>
                </div >
                <div className="flex justify-between items-center">
                  <span className="text-xs font-black text-neutral-400 uppercase tracking-widest">Total Points</span>
                  <span className="text-5xl font-black text-primary-600 dark:text-primary-400">
                    {user.points}
                  </span>
                </div >
              </div >
              <Button variant="outline" className="w-full gap-2 h-14 rounded-2xl font-bold text-lg transition-transform hover:scale-[1.02]" leftIcon={<ArrowUpRight className="h-5 w-5" />}>
                Climb the Ranks
              </Button>
            </Card>

            {/* Points Guide */}
            <Card variant="elevated" className="p-8 space-y-6 border-neutral-200 dark:border-neutral-800 surface-layered">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary-100 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400 shadow-sm">
                  <Zap className="h-5 w-5" />
                </div>
                <h3 className="font-black text-lg uppercase tracking-tight text-neutral-900 dark:text-white">Points Guide</h3>
              </div >
              <div className="space-y-3">
                {[
                  { label: 'Complete Task', pts: '+10 pts', icon: <CheckCircle2 className="h-3 w-3" /> },
                  { label: 'Enroll Course', pts: '+10 pts', icon: <BookOpen className="h-3 w-3" /> },
                  { label: 'Complete Lesson', pts: '+20 pts', icon: <Star className="h-3 w-3" /> },
                  { label: 'Complete Course', pts: '+100 pts', icon: <Trophy className="h-3 w-3" /> },
                  { label: 'Create Project', pts: '+20 pts', icon: <Rocket className="h-3 w-3" /> },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-100 dark:border-neutral-800 transition-all hover:border-primary-200 dark:hover:border-primary-800 group">
                    <div className="flex items-center gap-3 text-sm font-bold text-neutral-600 dark:text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-white transition-colors">
                      <span className="p-2 rounded-lg bg-white dark:bg-neutral-700 shadow-sm text-primary-600 dark:text-primary-400">{item.icon}</span>
                      {item.label}
                    </div >
                    <span className="text-sm font-black text-neutral-900 dark:text-white">{item.pts}</span>
                  </div>
                ))}
              </div >
            </Card>
          </div >
        </div >
      </div >
    </PageContainer>
  );
}
