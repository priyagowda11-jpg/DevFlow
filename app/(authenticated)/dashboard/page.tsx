'use client';

import React from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { useProjects } from '@/context/ProjectContext';
import { useAuth } from '@/context/AuthContext';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Card } from '@/components/ui/Card';
import {
  Rocket,
  CheckCircle2,
  ListTodo,
  Layout,
  BarChart3,
  Clock,
  Zap,
  TrendingUp,
  FolderKanban,
  BookOpen,
  GraduationCap,
  ArrowUpRight,
  Plus
} from 'lucide-react';
import { taskState } from '@/lib/task-state';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/Badge';
import { COURSES } from '@/data/course-data';

export default function DashboardPage() {
  const { user } = useAuth();
  const { projects, allTasks } = useProjects();
  const stats = taskState.getTaskStats('user-1');

  const recentTasks = [...allTasks]
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, 5);

  // Mocking current course for the redesign
  const currentCourse = COURSES[0];
  const courseProgress = 64;

  return (
    <PageContainer>
      <div className="space-y-10">
        {/* Welcome Section: Hero */}
        <div className="relative overflow-hidden p-8 md:p-12 rounded-[2.5rem] bg-neutral-900 dark:bg-primary-950 text-white shadow-2xl">
          {/* Background Glows */}
          <div className="absolute -top-24 -right-24 h-80 w-80 bg-primary-500/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -left-24 h-80 w-80 bg-secondary-500/20 rounded-full blur-3xl" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-10">
            <div className="space-y-4 max-w-2xl">
              <h1 className="text-display text-white leading-tight">
                Welcome back, <span className="text-primary-400">{user?.fullName?.split(' ')[0] || 'Developer'}</span> 👋
              </h1>
              <p className="text-lg text-neutral-300 leading-relaxed opacity-90">
                Your workspace is ready. You have <span className="text-white font-bold">{stats.inProgress} active tasks</span> and <span className="text-white font-bold">{projects.length} projects</span> in progress. Keep the momentum going.
              </p>
              <div className="flex flex-wrap gap-3 pt-4">
                <Link href="/tasks">
                  <Button variant="primary" className="bg-primary-500 text-white hover:bg-primary-600 gap-2 rounded-xl px-6 h-12 font-bold shadow-lg shadow-primary-500/20">
                    <Rocket className="h-4 w-4" />
                    Continue Working
                  </Button>
                </Link>
                <Link href="/analytics">
                  <Button variant="outline" className="bg-white/10 text-white border-white/20 hover:bg-white/20 gap-2 rounded-xl px-6 h-12 font-bold">
                    <BarChart3 className="h-4 w-4" />
                    Growth Analytics
                  </Button>
                </Link>
              </div >
            </div >

            {/* Productivity Quick-Stat */}
            <div className="relative z-10 p-8 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 text-center min-w-[240px] shadow-xl">
              <span className="text-[10px] font-black uppercase tracking-widest text-primary-200">Productivity Score</span>
              <div className="text-6xl font-black my-3 text-white tracking-tighter">
                {stats.completed / (stats.total || 1) * 100 | 0}%
              </div >
              <div className="flex items-center justify-center gap-1.5 text-sm text-primary-200 font-bold">
                <TrendingUp className="h-4 w-4" />
                <span>+12% from last week</span>
              </div >
            </div >
          </div >
        </div >

        {/* Key Statistics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            icon={<ListTodo className="h-5 w-5 text-neutral-500" />}
            label="Total Tasks"
            value={stats.total}
            description="Cumulative workload"
          />
          <StatCard
            icon={<Clock className="h-5 w-5 text-secondary-500" />}
            label="In Progress"
            value={stats.inProgress}
            description="Active focus items"
          />
          <StatCard
            icon={<CheckCircle2 className="h-5 w-5 text-primary-500" />}
            label="Completed"
            value={stats.completed}
            description={`${Math.round(stats.completed / (stats.total || 1) * 100)}% of total`}
          />
          <StatCard
            icon={<Zap className="h-5 w-5 text-accent-500" />}
            label="Efficiency"
            value={`${Math.round(stats.completed / (stats.total || 1) * 100)}%`}
            description="Current output rate"
          />
        </div >

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-10">
            {/* Active Projects Section */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400">
                    <Layout className="h-5 w-5" />
                  </div >
                  <h2 className="text-xl font-bold text-neutral-900 dark:text-white tracking-tight">Project Health</h2>
                </div >
                <div className="flex items-center gap-3">
                  <Link href="/projects">
                    <Button variant="ghost" size="sm" className="text-xs font-bold text-primary-600 hover:underline uppercase tracking-wider h-8 px-0">View All</Button>
                  </Link>
                </div >
              </div >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {projects.map(project => {
                  const progress = project.tasks.length === 0
                    ? 0
                    : Math.round((project.tasks.filter(t => t.status === 'Done').length / project.tasks.length) * 100);

                  return (
                    <Card key={project.id} variant="elevated" className="p-6 space-y-5 group transition-all duration-300 hover:border-primary-500/30">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 flex items-center justify-center group-hover:bg-primary-100 dark:group-hover:bg-primary-900/40 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                            <FolderKanban className="h-5 w-5" />
                          </div >
                          <div className="overflow-hidden">
                            <h3 className="font-bold text-neutral-900 dark:text-white truncate group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">{project.name}</h3>
                            <p className="text-xs text-secondary truncate">{project.description}</p>
                          </div >
                        </div >
                        <Badge variant="project" className="text-[10px]">{project.status}</Badge>
                      </div >
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs font-bold">
                          <span className="text-secondary uppercase tracking-wider">Completion</span>
                          <span className="text-neutral-900 dark:text-white">{progress}%</span>
                        </div >
                        <ProgressBar value={progress} className="h-2 rounded-full overflow-hidden bg-neutral-200 dark:bg-neutral-800" />
                      </div >
                      <div className="flex items-center justify-between pt-2">
                        <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">
                          {project.tasks.length} Tasks
                        </span >
                        <Link href={`/projects/${project.id}`}>
                          <Button variant="ghost" size="sm" className="text-xs py-1 px-3 h-8 rounded-lg font-bold group-hover:text-primary-600 transition-colors">View Workspace</Button>
                        </Link>
                      </div >
                    </Card>
                  );
                })}
              </div >
            </div >

            {/* Current Learning Section */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-secondary-100 dark:bg-secondary-900/30 text-secondary-600 dark:text-secondary-400">
                    <BookOpen className="h-5 w-5" />
                  </div >
                  <h2 className="text-xl font-bold text-neutral-900 dark:text-white tracking-tight">Current Learning</h2>
                </div >
                <Link href="/learning">
                  <Button variant="ghost" size="sm" className="text-xs font-bold text-secondary-600 hover:underline uppercase tracking-wider h-8 px-0">Explore Courses</Button>
                </Link>
              </div >
              <Card variant="elevated" className="p-8 space-y-6 group transition-all border-neutral-200 dark:border-neutral-800 hover:border-secondary-500/30">
                <div className="flex flex-col md:flex-row gap-8 items-center">
                  <div className="h-32 w-32 rounded-3xl bg-secondary-100 dark:bg-secondary-900/40 text-secondary-600 dark:text-secondary-400 flex items-center justify-center text-4xl font-black ring-4 ring-secondary-500/10 group-hover:scale-105 transition-transform">
                    <GraduationCap className="h-16 w-16" />
                  </div >
                  <div className="flex-1 space-y-4 text-center md:text-left">
                    <div className="space-y-1">
                      <Badge variant="course" className="mb-2">{currentCourse.category}</Badge>
                      <h3 className="text-2xl font-bold text-neutral-900 dark:text-white group-hover:text-secondary-600 dark:group-hover:text-secondary-400 transition-colors">
                        {currentCourse.title}
                      </h3>
                      <p className="text-secondary line-clamp-2">{currentCourse.description}</p>
                    </div >
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs font-bold">
                        <span className="text-secondary uppercase tracking-wider">Course Progress</span>
                        <span className="text-neutral-900 dark:text-white">{courseProgress}%</span>
                      </div >
                      <ProgressBar value={courseProgress} className="h-3 rounded-full overflow-hidden bg-neutral-200 dark:bg-neutral-800" />
                    </div >
                  </div >
                  <div className="flex flex-col gap-3 w-full md:w-auto">
                    <Link href={`/courses/${currentCourse.id}`}>
                      <Button variant="primary" className="w-full md:w-auto gap-2 rounded-xl font-bold h-12 px-6">
                        Resume Learning
                        <ArrowUpRight className="h-4 w-4" />
                      </Button>
                    </Link>
                  </div >
                </div >
              </Card>
            </div >
          </div >

          {/* Sidebar Column */}
          <div className="space-y-10">
            {/* Quick Actions */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-accent-100 dark:bg-accent-900/30 text-accent-600 dark:text-accent-400">
                  <Zap className="h-5 w-5" />
                </div >
                <h2 className="text-xl font-bold text-neutral-900 dark:text-white tracking-tight">Quick Actions</h2>
              </div >
              <div className="grid grid-cols-1 gap-3">
                <Link href="/projects">
                  <Button variant="outline" className="w-full justify-start gap-3 rounded-2xl h-14 px-4 font-bold hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all group">
                    <div className="h-8 w-8 rounded-lg bg-primary-100 dark:bg-primary-900/40 text-primary-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Plus className="h-4 w-4" />
                    </div >
                    Create New Project
                  </Button>
                </Link>
                <Link href="/tasks">
                  <Button variant="outline" className="w-full justify-start gap-3 rounded-2xl h-14 px-4 font-bold hover:bg-secondary-50 dark:hover:bg-secondary-900/20 transition-all group">
                    <div className="h-8 w-8 rounded-lg bg-secondary-100 dark:bg-secondary-900/40 text-secondary-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <ListTodo className="h-4 w-4" />
                    </div >
                    Add New Task
                  </Button>
                </Link>
                <Link href="/learning">
                  <Button variant="outline" className="w-full justify-start gap-3 rounded-2xl h-14 px-4 font-bold hover:bg-accent-50 dark:hover:bg-accent-900/20 transition-all group">
                    <div className="h-8 w-8 rounded-lg bg-accent-100 dark:bg-accent-900/40 text-accent-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <BookOpen className="h-4 w-4" />
                    </div >
                    Explore Courses
                  </Button>
                </Link>
              </div >
            </div >

            {/* Activity Stream */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400">
                    <CheckCircle2 className="h-5 w-5" />
                  </div >
                  <h2 className="text-xl font-bold text-neutral-900 dark:text-white tracking-tight">Recent Activity</h2>
                </div >
              </div >
              <div className="space-y-4">
                {recentTasks.length === 0 ? (
                  <div className="p-12 rounded-3xl border-2 border-dashed border-neutral-200 dark:border-neutral-800 text-center space-y-3">
                    <p className="text-sm text-secondary italic">No recent activity found</p>
                    <Link href="/tasks">
                      <Button variant="outline" size="sm" className="rounded-xl">Start a Task</Button>
                    </Link>
                  </div >
                ) : (
                  recentTasks.map(task => {
                    const project = projects.find(p => p.id === task.projectId);
                    return (
                      <div key={task.id} className="p-4 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm hover:border-primary-200 dark:hover:border-primary-800 transition-all group relative overflow-hidden">
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-neutral-200 dark:bg-neutral-800 group-hover:bg-primary-500 transition-colors" />
                        <div className="flex justify-between items-start mb-2">
                          <span className="text-sm font-bold text-neutral-900 dark:text-white truncate max-w-[200px] group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">{task.title}</span>
                          <span className={cn(
                            'text-[9px] font-black uppercase px-2 py-0.5 rounded-full',
                            task.status === 'Done' ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400' : 'bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400'
                          )}>
                            {task.status}
                          </span>
                        </div >
                        <div className="flex items-center justify-between text-[10px] font-medium text-secondary">
                          <span className="flex items-center gap-1.5">
                            <FolderKanban className="h-3 w-3" />
                            {project?.name}
                          </span >
                          <span className="opacity-70">{new Date(task.updatedAt).toLocaleDateString()}</span>
                        </div >
                      </div >
                    );
                  })
                )}
              </div >
            </div >
          </div >
        </div >
      </div >
    </PageContainer>
  );
}

function StatCard({ icon, label, value, description }: { icon: React.ReactNode, label: string, value: string | number, description: string }) {
  return (
    <Card variant="elevated" className="p-6 space-y-4 border-neutral-200 dark:border-neutral-800 group transition-all duration-300 hover:shadow-xl">
      <div className="flex items-center justify-between">
        <div className="p-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-800 text-neutral-500 group-hover:bg-primary-50 dark:group-hover:bg-primary-900/20 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
          {icon}
        </div >
        <div className="h-1 w-12 bg-neutral-100 dark:bg-neutral-800 rounded-full overflow-hidden">
          <div className="h-full bg-primary-500 w-1/3" />
        </div >
      </div >
      <div className="space-y-1">
        <span className="text-[10px] font-black uppercase tracking-widest text-neutral-400 block">{label}</span>
        <div className="text-3xl font-black text-neutral-900 dark:text-white tracking-tight">{value}</div>
        <p className="text-xs text-secondary font-medium opacity-80">{description}</p>
      </div >
    </Card>
  );
}
