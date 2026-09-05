'use client';

import React from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { storage } from '@/lib/storage';
import {
  Users,
  BookOpen,
  FolderKanban,
  CheckCircle,
  Award,
  Activity,
  BarChart3,
  Plus,
  FileDown,
  ShieldCheck
} from 'lucide-react';
import { AdminKpiCard } from '@/components/admin/AdminKpiCard';
import { AdminProgressBar } from '@/components/admin/AdminProgressBar';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';

export default function AdminDashboard() {
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

  const globalCompletionRate = students.length > 0
    ? Math.round((certificates.length / (students.length * courses.length)) * 100)
    : 0;

  const totalProductivityPoints = students.reduce((acc, s) => acc + s.points, 0);

  const stats = [
    {
      label: 'Total Students',
      value: students.length,
      icon: <Users className="h-5 w-5" />,
      colorClass: 'bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400',
      trend: { label: 'Growth', value: 'Stable', type: 'stable' as const }
    },
    {
      label: 'Active Students',
      value: activeStudents,
      icon: <Activity className="h-5 w-5" />,
      colorClass: 'bg-orange-50 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400',
      trend: { label: 'Activity', value: 'Growing', type: 'up' as const }
    },
    {
      label: 'Global Completion',
      value: `${globalCompletionRate}%`,
      icon: <Award className="h-5 w-5" />,
      colorClass: 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400',
      trend: { label: 'Certs', value: 'Increasing', type: 'up' as const }
    },
    {
      label: 'Total Projects',
      value: projects.length,
      icon: <FolderKanban className="h-5 w-5" />,
      colorClass: 'bg-teal-50 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400',
      trend: { label: 'Output', value: 'High', type: 'stable' as const }
    },
    {
      label: 'Total Tasks',
      value: tasks.length,
      icon: <CheckCircle className="h-5 w-5" />,
      colorClass: 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400',
      trend: { label: 'Velocity', value: 'Active', type: 'stable' as const }
    },
    {
      label: 'Productivity Pts',
      value: totalProductivityPoints.toLocaleString(),
      icon: <Award className="h-5 w-5" />,
      colorClass: 'bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400',
      trend: { label: 'Engagement', value: 'Peak', type: 'up' as const }
    },
  ];

  return (
    <PageContainer>
      <div className="space-y-12">
        <AdminPageHeader
          title="Admin Console"
          subtitle="Platform-wide intelligence and student ecosystem management."
          icon={<ShieldCheck className="h-6 w-6" />}
          actions={
            <>
              <Button variant="outline" className="gap-2 h-12 rounded-xl font-bold" leftIcon={<FileDown className="h-4 w-4" />}>
                Export Report
              </Button>
              <Button variant="primary" className="gap-2 h-12 rounded-xl font-bold shadow-lg shadow-primary-500/20" leftIcon={<Plus className="h-4 w-4" />}>
                New Student
              </Button>
            </>
          }
        />

        {/* High-Impact Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
          {stats.map((stat, idx) => (
            <AdminKpiCard
              key={idx}
              label={stat.label}
              value={stat.value}
              icon={stat.icon}
              colorClass={stat.colorClass}
              trend={stat.trend}
            />
          ))}
        </div>

        {/* Intelligence Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card variant="elevated" className="p-8 space-y-8 border-neutral-200 dark:border-neutral-800 surface-layered">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-black text-neutral-900 dark:text-white flex items-center gap-3">
                <BarChart3 className="h-6 w-6 text-primary-500" />
                Course Completion Velocity
              </h3>
            </div>
            <div className="space-y-6">
              {courses.map((course: any) => {
                const completions = storage.getCertificates().filter(c =>
                  c.title.includes(course.title)
                ).length;
                const maxCompletions = Math.max(...courses.map((c: any) =>
                  storage.getCertificates().filter(cert => cert.title.includes(c.title)).length
                ), 1);
                const percentage = (completions / maxCompletions) * 100;

                return (
                  <div key={course.id} className="space-y-3">
                    <div className="flex justify-between text-xs font-black uppercase tracking-wider">
                      <span className="text-neutral-600 dark:text-neutral-400">{course.title}</span>
                      <span className="text-neutral-900 dark:text-white">{completions} Certified</span>
                    </div>
                    <AdminProgressBar
                      progress={percentage}
                      variant="primary"
                      showPercentage
                    />
                  </div>
                );
              })}
            </div>
          </Card>

          <Card variant="elevated" className="p-8 space-y-8 border-neutral-200 dark:border-neutral-800 surface-layered">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-black text-neutral-900 dark:text-white flex items-center gap-3">
                <Activity className="h-6 w-6 text-primary-500" />
                Top Contributors
              </h3>
            </div>
            <div className="space-y-5">
              {students.sort((a, b) => b.points - a.points).slice(0, 5).map((student) => {
                const maxPoints = Math.max(...students.map(s => s.points), 1);
                const percentage = (student.points / maxPoints) * 100;

                return (
                  <div key={student.id} className="space-y-2">
                    <div className="flex justify-between text-xs font-black uppercase tracking-widest">
                      <span className="text-neutral-600 dark:text-neutral-400">{student.fullName}</span>
                      <span className="text-neutral-900 dark:text-white">{student.points} pts</span>
                    </div>
                    <AdminProgressBar
                      progress={percentage}
                      variant="warning"
                      showPercentage
                    />
                  </div>
                );
              })}
              {students.length === 0 && (
                <div className="text-center py-12 text-secondary text-sm font-medium">
                  No student data available for ranking.
                </div>
              )}
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Registrations Ledger */}
          <Card variant="elevated" className="p-8 space-y-6 border-neutral-200 dark:border-neutral-800 surface-layered">
            <h3 className="text-xl font-black text-neutral-900 dark:text-white flex items-center gap-3">
              <Users className="h-6 w-6 text-primary-500" />
              Recent Registrations
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="text-neutral-400 uppercase text-[10px] font-black tracking-widest border-b border-neutral-100 dark:border-neutral-800">
                  <tr className="border-b border-neutral-100 dark:border-neutral-800">
                    <th className="pb-4 font-medium">Student</th>
                    <th className="pb-4 font-medium">Email</th>
                    <th className="pb-4 font-medium">Projects</th>
                    <th className="pb-4 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800">
                  {students.slice(0, 5).map((student) => (
                    <tr key={student.id} className="group hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-all">
                      <td className="py-4 font-black text-neutral-900 dark:text-white">{student.fullName}</td>
                      <td className="py-4 text-secondary font-medium">{student.email}</td>
                      <td className="py-4 font-bold">{storage.getStudentProjects(student.id).length}</td>
                      <td className="py-4">
                        <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400 text-[9px] font-black uppercase tracking-wider">Active</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {students.length === 0 && (
                <div className="text-center py-12 text-secondary font-medium">
                  No students registered yet.
                </div>
              )}
            </div>
          </Card>

          {/* Platform Health Report */}
          <Card variant="elevated" className="p-8 space-y-8 border-neutral-200 dark:border-neutral-800 surface-layered">
            <h3 className="text-xl font-black text-neutral-900 dark:text-white flex items-center gap-3">
              <Activity className="h-6 w-6 text-primary-500" />
              Platform Health Report
            </h3>
            <div className="grid grid-cols-1 gap-4">
              <div className="p-5 rounded-2xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-100 dark:border-neutral-800 flex items-center justify-between group transition-all hover:border-primary-200 dark:hover:border-primary-800">
                <div className="space-y-1">
                  <span className="text-sm font-black text-neutral-900 dark:text-white">Total Points Ecosystem</span>
                  <p className="text-xs text-secondary font-medium">Sum of all awarded productivity points.</p>
                </div>
                <div className="text-2xl font-black text-primary-600 dark:text-primary-400 group-hover:scale-110 transition-transform">
                  {totalProductivityPoints.toLocaleString()}
                </div>
              </div>
              <div className="p-5 rounded-2xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-100 dark:border-neutral-800 flex items-center justify-between group transition-all hover:border-emerald-200 dark:hover:border-emerald-800">
                <div className="space-y-1">
                  <span className="text-sm font-black text-neutral-900 dark:text-white">Global Completion Rate</span>
                  <p className="text-xs text-secondary font-medium">Avg. certification rate across the cohort.</p>
                </div>
                <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform">
                  {globalCompletionRate}%
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </PageContainer>
  );
}
