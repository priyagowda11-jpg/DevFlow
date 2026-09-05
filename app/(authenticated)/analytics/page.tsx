'use client';

import { useState, useEffect } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Card } from '@/components/ui/Card';
import { storage } from '@/lib/storage';
import { useAuth } from '@/context/AuthContext';
import {
  TrendingUp,
  CheckCircle,
  BookOpen,
  Trophy,
  Zap,
  Activity,
  BarChart3,
  Target,
  Sparkles,
  Rocket
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function AnalyticsPage() {
  const { user } = useAuth();
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    if (!user) return;

    const calculateAnalytics = () => {
      const tasks = storage.getStudentTasks(user.id);
      const completedTasks = tasks.filter(t => t.status === 'Done');
      const projects = storage.getStudentProjects(user.id);
      const completedProjects = projects.filter(p => p.status === 'Completed');
      const courseProgress = storage.getStudentCourseProgress(user.id);

      const totalLessonsEnrolled = courseProgress.reduce((acc, p) => {
        const course = require('@/data/course-data').COURSES.find((c: any) => c.id === p.courseId);
        return acc + (course?.modules.reduce((a: number, m: any) => a + m.lessons.length, 0) || 0);
      }, 0);
      const totalLessonsCompleted = courseProgress.reduce((acc, p) => acc + p.completedLessons.length, 0);

      return {
        tasksTotal: tasks.length,
        tasksCompleted: completedTasks.length,
        tasksCompletionRate: tasks.length > 0 ? Math.round((completedTasks.length / tasks.length) * 100) : 0,
        projectsTotal: projects.length,
        projectsCompleted: completedProjects.length,
        lessonsTotal: totalLessonsEnrolled,
        lessonsCompleted: totalLessonsCompleted,
        learningProgress: totalLessonsEnrolled > 0 ? Math.round((totalLessonsCompleted / totalLessonsEnrolled) * 100) : 0,
        productivityScore: Math.round((completedTasks.length * 10 + (completedProjects.length * 50)) / (tasks.length || 1)),
        points: user.points
      };
    };

    setData(calculateAnalytics());
  }, [user]);

  if (!user) return null;

  if (!data || (data.tasksTotal === 0 && data.lessonsTotal === 0)) {
    return (
      <PageContainer>
        <div className="flex flex-col items-center justify-center h-[60vh] text-center space-y-8">
          <div className="p-10 bg-neutral-100 dark:bg-neutral-800 rounded-full text-neutral-400 shadow-inner ring-8 ring-neutral-50 dark:ring-neutral-900">
            <Activity className="h-20 w-20" />
          </div>
          <div className="space-y-3">
            <h3 className="text-3xl font-black text-neutral-900 dark:text-white">No intelligence data yet</h3>
            <p className="text-secondary text-lg max-w-md mx-auto font-medium">
              Complete your first task or lesson to start generating professional productivity analytics.
            </p>
          </div >
        </div>
      </PageContainer>
    );
  }

  const getInsight = () => {
    if (data.learningProgress > 80) return { title: 'Learning Machine', desc: 'Your course completion rate is in the top 5% of students.', icon: <Sparkles className="h-5 w-5 text-amber-500" />, color: 'text-amber-600 bg-amber-50 dark:bg-amber-900/30' };
    if (data.tasksCompletionRate > 80) return { title: 'Execution Expert', desc: 'You have an incredible habit of closing tasks efficiently.', icon: <Rocket className="h-5 w-5 text-emerald-500" />, color: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-900/30' };
    return { title: 'Rising Star', desc: 'You are building a steady foundation of skills. Keep pushing!', icon: <TrendingUp className="h-5 w-5 text-primary-500" />, color: 'text-primary-600 bg-primary-50 dark:bg-primary-900/30' };
  };

  const insight = getInsight();

  return (
    <PageContainer>
      <div className="space-y-12">
        <div className="space-y-3">
          <div className="flex items-center gap-3 text-primary-600 dark:text-primary-400 mb-2">
            <BarChart3 className="h-6 w-6" />
            <span className="text-xs font-black uppercase tracking-widest">Intelligence Hub</span>
          </div >
          <h1 className="text-4xl font-black text-neutral-900 dark:text-white tracking-tight">Learning Analytics</h1>
          <p className="text-secondary text-lg font-medium max-w-2xl">
            Deep dive into your productivity patterns and learning velocity.
          </p>
        </div >

        {/* High-Impact KPI Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <AnalyticsCard
            title="Productivity Score"
            value={data.productivityScore}
            icon={<Zap className="h-5 w-5 text-amber-500" />}
            subtitle="Efficiency index"
            color="bg-amber-50 dark:bg-amber-900/30"
            trend="+12% vs last week"
          />
          <AnalyticsCard
            title="Tasks Completed"
            value={`${data.tasksCompleted}/${data.tasksTotal}`}
            icon={<CheckCircle className="h-5 w-5 text-emerald-500" />}
            subtitle={`${data.tasksCompletionRate}% Completion rate`}
            color="bg-emerald-50 dark:bg-emerald-900/30"
            trend="+5% trend"
          />
          <AnalyticsCard
            title="Lessons Finished"
            value={`${data.lessonsCompleted}/${data.lessonsTotal}`}
            icon={<BookOpen className="h-5 w-5 text-teal-500" />}
            subtitle={`${data.learningProgress || 0}% of total syllabus`}
            color="bg-teal-50 dark:bg-teal-900/30"
            trend="On track"
          />
          <AnalyticsCard
            title="Total Points"
            value={data.points}
            icon={<Trophy className="h-5 w-5 text-primary-500" />}
            subtitle="Global ranking weight"
            color="bg-primary-50 dark:bg-primary-900/30"
            trend="Top 15%"
          />
        </div >

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Performance Trends */}
          <Card className="lg:col-span-2 p-8 space-y-10 border-neutral-200 dark:border-neutral-800 surface-layered">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-black flex items-center gap-3 text-neutral-900 dark:text-white tracking-tight">
                <TrendingUp className="h-7 w-7 text-primary-500" />
                Completion Trends
              </h3>
              <div className="px-3 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800 text-xs font-bold text-neutral-500">Live Data</div>
            </div >
            <div className="space-y-12">
              <div className="space-y-4">
                <div className="flex justify-between items-end">
                  <div className="space-y-1">
                    <span className="text-xs font-black text-neutral-400 uppercase tracking-widest block">Task Velocity</span>
                    <span className="text-2xl font-black text-neutral-900 dark:text-white">{data.tasksCompletionRate}%</span>
                  </div >
                  <span className="text-xs font-black text-emerald-500 uppercase tracking-widest">Optimized</span>
                </div >
                <div className="h-5 w-full bg-neutral-100 dark:bg-neutral-800 rounded-full overflow-hidden p-1">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-full transition-all duration-1000 shadow-[0_0_10px_rgba(16,185,129,0.4)]"
                    style={{ width: `${data.tasksCompletionRate}%` }}
                  />
                </div >
              </div >
              <div className="space-y-4">
                <div className="flex justify-between items-end">
                  <div className="space-y-1">
                    <span className="text-xs font-black text-neutral-400 uppercase tracking-widest block">Learning Velocity</span>
                    <span className="text-2xl font-black text-neutral-900 dark:text-white">{data.learningProgress || 0}%</span>
                  </div >
                  <span className="text-xs font-black text-teal-500 uppercase tracking-widest">Accelerating</span>
                </div >
                <div className="h-5 w-full bg-neutral-100 dark:bg-neutral-800 rounded-full overflow-hidden p-1">
                  <div
                    className="h-full bg-gradient-to-r from-teal-400 to-teal-600 rounded-full transition-all duration-1000 shadow-[0_0_10px_rgba(20,184,166,0.4)]"
                    style={{ width: `${data.learningProgress || 0}%` }}
                  />
                </div >
              </div >
            </div >
          </Card>

          <div className="space-y-8">
            {/* Intelligence Insight Card */}
            <Card className="p-8 space-y-6 border-neutral-200 dark:border-neutral-800 surface-layered bg-gradient-to-br from-white to-neutral-50 dark:from-neutral-900 dark:to-neutral-950">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary-100 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400">
                  <Target className="h-5 w-5" />
                </div >
                <h3 className="font-black text-lg uppercase tracking-tight text-neutral-900 dark:text-white">Persona Insight</h3>
              </div >
              <div className="p-6 rounded-3xl bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 shadow-sm space-y-4 relative overflow-hidden group">
                <div className="absolute -right-4 -top-4 h-20 w-20 bg-primary-500/10 rounded-full blur-2xl group-hover:bg-primary-500/20 transition-all" />
                <div className="flex items-center gap-3">
                  {insight.icon}
                  <span className="font-black text-xl text-neutral-900 dark:text-white">{insight.title}</span>
                </div >
                <p className="text-sm text-secondary leading-relaxed font-medium">
                  {insight.desc}
                </p>
              </div >
            </Card>

            <Card className="p-8 space-y-6 border-neutral-200 dark:border-neutral-800 surface-layered">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400">
                  <Activity className="h-5 w-5" />
                </div >
                <h3 className="font-black text-lg uppercase tracking-tight text-neutral-900 dark:text-white">Snapshot</h3>
              </div >
              <div className="grid grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-100 dark:border-neutral-800 transition-all hover:border-primary-200 dark:hover:border-primary-800">
                  <div className="text-[10px] text-neutral-400 uppercase font-black tracking-widest mb-2">Active Projects</div >
                  <div className="text-3xl font-black text-neutral-900 dark:text-white">{data.projectsTotal}</div>
                </div >
                <div className="p-5 rounded-2xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-100 dark:border-neutral-800 transition-all hover:border-emerald-200 dark:hover:border-emerald-800">
                  <div className="text-[10px] text-neutral-400 uppercase font-black tracking-widest mb-2">Projects Done</div >
                  <div className="text-3xl font-black text-emerald-500">{data.projectsCompleted}</div>
                </div >
                <div className="p-5 rounded-2xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-100 dark:border-neutral-800 transition-all hover:border-primary-200 dark:hover:border-primary-800">
                  <div className="text-[10px] text-neutral-400 uppercase font-black tracking-widest mb-2">Study Hours</div >
                  <div className="text-3xl font-black text-neutral-900 dark:text-white">{Math.round(data.lessonsCompleted * 1.5)}h</div>
                </div >
                <div className="p-5 rounded-2xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-100 dark:border-neutral-800 transition-all hover:border-primary-200 dark:hover:border-primary-800">
                  <div className="text-[10px] text-neutral-400 uppercase font-black tracking-widest mb-2">Rank Velocity</div >
                  <div className="text-3xl font-black text-primary-500">+2%</div>
                </div >
              </div >
            </Card>
          </div >
        </div >
      </div >
    </PageContainer>
  );
}

function AnalyticsCard({ title, value, icon, subtitle, color, trend }: any) {
  return (
    <Card className="p-6 space-y-4 border-neutral-200 dark:border-neutral-800 surface-layered group transition-all hover:shadow-xl hover:-translate-y-1">
      <div className="flex items-center justify-between">
        <div className={cn('p-3 rounded-2xl transition-transform group-hover:scale-110', color)}>
          {icon}
        </div >
        {trend && (
          <span className="text-[10px] font-black text-emerald-500 uppercase tracking-tighter bg-emerald-50 dark:bg-emerald-900/20 px-2 py-0.5 rounded-full">
            {trend}
          </span>
        )}
      </div >
      <div className="space-y-1">
        <span className="text-xs font-black text-neutral-400 uppercase tracking-widest block">{title}</span>
        <div className="text-3xl font-black text-neutral-900 dark:text-white tracking-tight">{value}</div>
        <p className="text-xs text-secondary font-medium">{subtitle}</p>
      </div >
    </Card>
  );
}
