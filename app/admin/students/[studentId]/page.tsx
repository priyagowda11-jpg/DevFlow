'use client';

import React, { useState } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { storage } from '@/lib/storage';
import { useParams, useRouter } from 'next/navigation';
import {
  ArrowLeft,
  User,
  BookOpen,
  FolderKanban,
  CheckCircle,
  Award,
  Mail,
  GraduationCap,
  Calendar,
  Edit3,
  RotateCcw,
  Trash2,
  LayoutGrid,
  Trophy
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Badge } from '@/components/ui/Badge';

type Tab = 'profile' | 'activity' | 'learning';

export default function StudentDetailPage() {
  const params = useParams();
  const router = useRouter();
  const studentId = params.studentId as string;

  const [activeTab, setActiveTab] = useState<Tab>('profile');

  const student = storage.getStudentById(studentId);

  if (!student) {
    return (
      <PageContainer>
        <div className="flex flex-col items-center justify-center h-[60vh] text-center space-y-4">
          <div className="p-4 bg-red-50 dark:bg-red-900/20 text-red-500 rounded-full">
            <User className="h-12 w-12" />
          </div>
          <h1 className="text-2xl font-black">Student Not Found</h1>
          <Button variant="primary" onClick={() => router.push('/admin/students')}>
            Back to Students
          </Button>
        </div>
      </PageContainer>
    );
  }

  const projects = storage.getStudentProjects(studentId);
  const tasks = storage.getStudentTasks(studentId);
  const completedTasks = tasks.filter(t => t.status === 'Done').length;
  const courseProgress = storage.getStudentCourseProgress(studentId);
  const certificates = storage.getStudentCertificates(studentId);

  return (
    <PageContainer>
      <div className="space-y-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.push('/admin/students')}
              className="p-2 rounded-xl hover:bg-neutral-200 dark:hover:bg-neutral-800"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div className="flex items-center gap-5">
              <div className="h-20 w-20 rounded-2xl bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 flex items-center justify-center text-3xl font-black shadow-sm ring-1 ring-primary-200 dark:ring-primary-800">
                {student.fullName.charAt(0)}
              </div>
              <div className="space-y-1">
                <h1 className="text-3xl font-black tracking-tight text-neutral-900 dark:text-white">{student.fullName}</h1>
                <div className="flex items-center gap-2 text-secondary font-medium">
                  <Mail className="h-3 w-3" />
                  {student.email}
                </div >
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" className="gap-2 h-11 rounded-xl font-bold" leftIcon={<Edit3 className="h-4 w-4" />}>
              Edit Profile
            </Button>
            <Button variant="outline" className="gap-2 h-11 rounded-xl font-bold text-amber-600 hover:text-amber-700 hover:bg-amber-50 dark:hover:bg-amber-900/20" leftIcon={<RotateCcw className="h-4 w-4" />}>
              Reset Progress
            </Button>
            <Button variant="outline" className="gap-2 h-11 rounded-xl font-bold text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20" leftIcon={<Trash2 className="h-4 w-4" />}>
              Delete
            </Button>
          </div>
        </div>

        {/* Quick Intelligence Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <Card variant="elevated" className="p-6 border-neutral-200 dark:border-neutral-800 surface-layered">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400">
                <FolderKanban className="h-6 w-6" />
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-black text-neutral-400 uppercase tracking-widest block">Active Projects</span>
                <span className="text-2xl font-black text-neutral-900 dark:text-white">{projects.length}</span>
              </div>
            </div>
          </Card>
          <Card variant="elevated" className="p-6 border-neutral-200 dark:border-neutral-800 surface-layered">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400">
                <CheckCircle className="h-6 w-6" />
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-black text-neutral-400 uppercase tracking-widest block">Tasks Completed</span>
                <span className="text-2xl font-black text-neutral-900 dark:text-white">{completedTasks} / {tasks.length}</span>
              </div>
            </div>
          </Card>
          <Card variant="elevated" className="p-6 border-neutral-200 dark:border-neutral-800 surface-layered">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400">
                <Award className="h-6 w-6" />
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-black text-neutral-400 uppercase tracking-widest block">Certs Earned</span>
                <span className="text-2xl font-black text-neutral-900 dark:text-white">{certificates.length}</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Detailed Tabbed Content */}
        <div className="space-y-6">
          <div className="flex border-b border-neutral-200 dark:border-neutral-800">
            {( ['profile', 'activity', 'learning'] as Tab[] ).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  'px-6 py-4 text-sm font-black capitalize transition-all relative',
                  activeTab === tab
                    ? 'text-primary-600 dark:text-primary-400'
                    : 'text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300'
                )}
              >
                {tab}
                {activeTab === tab && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
                )}
              </button>
            ))}
          </div>

          <div className="min-h-[400px]">
            {activeTab === 'profile' && (
              <Card variant="elevated" className="p-8 border-neutral-200 dark:border-neutral-800 surface-layered space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                  <div className="space-y-6">
                    <div className="space-y-1">
                      <span className="text-xs font-black text-neutral-400 uppercase tracking-widest flex items-center gap-2">
                        <GraduationCap className="h-3 w-3" /> Academic Institution
                      </span>
                      <p className="text-lg font-bold text-neutral-900 dark:text-white">{student.collegeName}</p>
                    </div >
                    <div className="space-y-1">
                      <span className="text-xs font-black text-neutral-400 uppercase tracking-widest flex items-center gap-2">
                        <LayoutGrid className="h-3 w-3" /> Specialization
                      </span>
                      <p className="text-lg font-bold text-neutral-900 dark:text-white">{student.branch} • Semester {student.semester}</p>
                    </div >
                  </div>
                  <div className="space-y-6">
                    <div className="space-y-1">
                      <span className="text-xs font-black text-neutral-400 uppercase tracking-widest flex items-center gap-2">
                        <Calendar className="h-3 w-3" /> Enrollment Date
                      </span>
                      <p className="text-lg font-bold text-neutral-900 dark:text-white">{new Date(student.createdAt).toLocaleDateString()}</p>
                    </div >
                    <div className="space-y-1">
                      <span className="text-xs font-black text-neutral-400 uppercase tracking-widest flex items-center gap-2">
                        <Trophy className="h-3 w-3" /> Cumulative Points
                      </span>
                      <p className="text-lg font-black text-primary-600 dark:text-primary-400">{student.points}</p>
                    </div >
                  </div>
                </div>
              </Card>
            )}

            {activeTab === 'activity' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card variant="elevated" className="p-6 border-neutral-200 dark:border-neutral-800 surface-layered space-y-6">
                  <h3 className="text-xl font-black text-neutral-900 dark:text-white flex items-center gap-3">
                    <FolderKanban className="h-6 w-6 text-primary-500" />
                    Project Portfolio
                  </h3>
                  <div className="space-y-4">
                    {projects.length > 0 ? (
                      projects.map(p => (
                        <div key={p.id} className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-100 dark:border-neutral-800 flex items-center justify-between group transition-all hover:border-primary-200 dark:hover:border-primary-800">
                          <div>
                            <p className="font-bold text-neutral-900 dark:text-white">{p.name}</p>
                            <p className="text-xs text-secondary">{p.stack?.join(', ') || 'No stack defined'}</p>
                          </div >
                          <Badge variant="project" className="text-[10px] font-black uppercase">{p.status}</Badge>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-secondary italic">No projects registered.</p>
                    )}
                  </div >
                </Card>
                <Card variant="elevated" className="p-6 border-neutral-200 dark:border-neutral-800 surface-layered space-y-6">
                  <h3 className="text-xl font-black text-neutral-900 dark:text-white flex items-center gap-3">
                    <CheckCircle className="h-6 w-6 text-emerald-500" />
                    Task Performance
                  </h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center text-sm font-black uppercase tracking-widest">
                      <span className="text-neutral-400">Overall Completion</span>
                      <span className="text-neutral-900 dark:text-white">{completedTasks} / {tasks.length}</span>
                    </div >
                    <ProgressBar value={tasks.length > 0 ? Math.round((completedTasks / tasks.length) * 100) : 0} className="h-3 rounded-full bg-neutral-100 dark:bg-neutral-800" />
                    <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-100 dark:border-neutral-800">
                      <p className="text-xs text-secondary leading-relaxed italic">
                        {completedTasks > 10 ? 'This student is highly productive and consistently meets deadlines.' : 'Student is in the early stages of project execution.'}
                      </p>
                    </div >
                  </div >
                </Card>
              </div>
            )}

            {activeTab === 'learning' && (
              <div className="space-y-8">
                <Card variant="elevated" className="p-8 border-neutral-200 dark:border-neutral-800 surface-layered space-y-6">
                  <h3 className="text-xl font-black text-neutral-900 dark:text-white flex items-center gap-3">
                    <BookOpen className="h-6 w-6 text-teal-500" />
                    Course Progress
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {courseProgress.length > 0 ? (
                      courseProgress.map(p => {
                        const course = require('@/data/course-data').COURSES.find((c: any) => c.id === p.courseId);
                        const total = course?.modules.reduce((acc: number, m: any) => acc + m.lessons.length, 0) || 0;
                        const progress = total > 0 ? Math.round((p.completedLessons.length / total) * 100) : 0;
                        return (
                          <div key={p.courseId} className="p-5 rounded-2xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-100 dark:border-neutral-800 space-y-4">
                            <div className="flex justify-between items-center">
                              <span className="font-black text-neutral-900 dark:text-white truncate">{course?.title || 'Unknown Course'}</span>
                              <span className="text-xs font-black text-primary-600 dark:text-primary-400">{progress}%</span>
                            </div >
                            <ProgressBar value={progress} className="h-2 rounded-full bg-neutral-100 dark:bg-neutral-800" />
                          </div>
                        );
                      })
                    ) : (
                      <p className="col-span-full text-sm text-secondary italic">No courses enrolled yet.</p>
                    )}
                  </div >
                </Card>
                <Card variant="elevated" className="p-8 border-neutral-200 dark:border-neutral-800 surface-layered space-y-6">
                  <h3 className="text-xl font-black text-neutral-900 dark:text-white flex items-center gap-3">
                    <Award className="h-6 w-6 text-amber-500" />
                    Issued Credentials
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {certificates.length > 0 ? (
                      certificates.map(cert => (
                        <div key={cert.id} className="p-4 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 flex items-center gap-4 group hover:ring-2 hover:ring-primary-500/20 transition-all">
                          <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400">
                            <Award className="h-5 w-5" />
                          </div>
                          <div className="flex-1 overflow-hidden">
                            <p className="font-black text-sm truncate text-neutral-900 dark:text-white">{cert.title}</p>
                            <p className="text-xs text-secondary font-medium">{new Date(cert.issueDate).toLocaleDateString()}</p>
                          </div >
                        </div>
                      ))
                    ) : (
                      <p className="col-span-full text-sm text-secondary italic">No certificates issued yet.</p>
                    )}
                  </div >
                </Card>
              </div >
            )}
          </div >
        </div >
      </div >
    </PageContainer>
  );
}
