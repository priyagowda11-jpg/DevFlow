'use client';

import React, { useMemo } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Card } from '@/components/ui/Card';
import { storage } from '@/lib/storage';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import { BarChart3, TrendingUp, PieChart as PieIcon, Users, FolderKanban, CheckCircle } from 'lucide-react';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { AdminKpiCard } from '@/components/admin/AdminKpiCard';

export default function AdminAnalyticsPage() {
  const students = storage.getStudents();
  const projects = storage.getProjects();
  const certificates = storage.getCertificates();
  const tasks = storage.getTasks();
  const courses = require('@/data/course-data').COURSES;

  const activeStudents = students.filter(s => {
    const hasProjects = storage.getStudentProjects(s.id).length > 0;
    const hasCourses = storage.getStudentCourseProgress(s.id).length > 0;
    return hasProjects || hasCourses;
  }).length;

  // --- Data Processing ---

  const growthData = useMemo(() => {
    const total = students.length;
    return [
      { month: 'Jan', students: Math.floor(total * 0.1) },
      { month: 'Feb', students: Math.floor(total * 0.25) },
      { month: 'Mar', students: Math.floor(total * 0.4) },
      { month: 'Apr', students: Math.floor(total * 0.6) },
      { month: 'May', students: Math.floor(total * 0.8) },
      { month: 'Jun', students: total },
    ];
  }, [students]);

  const completionData = useMemo(() => {
    return courses.map((course: any) => ({
      name: course.title,
      completed: certificates.filter(c => c.title.includes(course.title)).length,
    }));
  }, [courses, certificates]);

  const taskStatusData = useMemo(() => {
    const counts = tasks.reduce((acc: any, t) => {
      acc[t.status] = (acc[t.status] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, [tasks]);

  const COLORS = ['#10B981', '#3B82F6', '#F59E0B', '#EF4444', '#8B5CF6'];

  return (
    <PageContainer>
      <div className="space-y-12">
        <AdminPageHeader
          title="Platform Analytics"
          subtitle="Data-driven insights into student growth, learning velocity, and platform performance."
          icon={<BarChart3 className="h-6 w-6" />}
        />

        {/* Quick Analytics KPIs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <AdminKpiCard
            label="Avg. Completion"
            value={`${students.length > 0 ? Math.round((certificates.length / (students.length * courses.length)) * 100) : 0}%`}
            icon={<TrendingUp className="h-5 w-5" />}
            colorClass="bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400"
          />
          <AdminKpiCard
            label="Project Density"
            value={(projects.length / (students.length || 1)).toFixed(1)}
            icon={<FolderKanban className="h-5 w-5" />}
            colorClass="bg-teal-50 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400"
          />
          <AdminKpiCard
            label="Task Velocity"
            value={tasks.length}
            icon={<CheckCircle className="h-5 w-5" />}
            colorClass="bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400"
          />
          <AdminKpiCard
            label="Total Cohort"
            value={students.length}
            icon={<Users className="h-5 w-5" />}
            colorClass="bg-orange-50 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Student Growth Chart */}
          <Card variant="elevated" className="p-8 space-y-6 border-neutral-200 dark:border-neutral-800 surface-layered">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-black text-neutral-900 dark:text-white flex items-center gap-3">
                <TrendingUp className="h-6 w-6 text-primary-500" />
                Student Registration Growth
              </h3>
            </div>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={growthData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" className="dark:stroke-neutral-800" />
                  <XAxis dataKey="month" stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                    itemStyle={{ color: '#10B981', fontWeight: 'bold' }}
                  />
                  <Line
                    type="monotone"
                    dataKey="students"
                    stroke="#10B981"
                    strokeWidth={3}
                    dot={{ r: 6, fill: '#10B981', strokeWidth: 2, stroke: '#fff' }}
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Course Completion Distribution */}
          <Card variant="elevated" className="p-8 space-y-6 border-neutral-200 dark:border-neutral-800 surface-layered">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-black text-neutral-900 dark:text-white flex items-center gap-3">
                <BarChart3 className="h-6 w-6 text-primary-500" />
                Course Completion Distribution
              </h3>
            </div>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={completionData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" className="dark:stroke-neutral-800" vertical={false} />
                  <XAxis dataKey="name" stroke="#9ca3af" fontSize={10} tickLine={false} axisLine={false} />
                  <YAxis stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip
                    cursor={{ fill: 'transparent' }}
                    contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                  />
                  <Bar dataKey="completed" fill="#10B981" radius={[4, 4, 0, 0]} barSize={30} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Task Status Distribution */}
          <Card variant="elevated" className="p-8 space-y-6 border-neutral-200 dark:border-neutral-800 surface-layered lg:col-span-1">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-black text-neutral-900 dark:text-white flex items-center gap-3">
                <PieIcon className="h-6 w-6 text-primary-500" />
                Task Lifecycle
              </h3>
            </div>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={taskStatusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {taskStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                  />
                  <Legend verticalAlign="bottom" height={36}/>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Analytics Summary Panel */}
          <Card variant="elevated" className="p-8 space-y-6 border-neutral-200 dark:border-neutral-800 surface-layered lg:col-span-2">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-black text-neutral-900 dark:text-white flex items-center gap-3">
                <TrendingUp className="h-6 w-6 text-primary-500" />
                Performance Synthesis
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-100 dark:border-neutral-800 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-widest">Engagement Rate</span>
                  <span className="text-xl font-black text-primary-600 dark:text-primary-400">
                    {students.length > 0 ? Math.round((activeStudents / students.length) * 100) : 0}%
                  </span>
                </div>
                <p className="text-xs text-secondary leading-relaxed">
                  The percentage of total registered students who have active projects or course enrollments.
                </p>
              </div>
              <div className="p-6 rounded-2xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-100 dark:border-neutral-800 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-widest">Avg. Projects / Student</span>
                  <span className="text-xl font-black text-emerald-600 dark:text-emerald-400">
                    {(projects.length / (students.length || 1)).toFixed(1)}
                  </span>
                </div>
                <p className="text-xs text-secondary leading-relaxed">
                  The average number of professional projects initiated per student across the cohort.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </PageContainer>
  );
}
