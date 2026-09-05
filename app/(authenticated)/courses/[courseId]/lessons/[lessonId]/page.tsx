'use client';

import React, { useState, useEffect } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { storage } from '@/lib/storage';
import { useAuth } from '@/context/AuthContext';
import { useParams, useRouter } from 'next/navigation';
import {
  ChevronLeft,
  ChevronRight,
  FileText,
  CheckCircle,
  ArrowLeft,
  BookOpen,
  Lock,
  Code,
  Zap
} from 'lucide-react';
import { pdfService } from '@/lib/pdf-service';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { ProgressBar } from '@/components/ui/ProgressBar';

export default function LessonPage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();

  const courseId = params.courseId as string;
  const lessonId = params.lessonId as string;

  const [course, setCourse] = useState<any>(null);
  const [lesson, setLesson] = useState<any>(null);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    const allCourses = require('@/data/course-data').COURSES;
    const foundCourse = allCourses.find((c: any) => c.id === courseId);
    if (foundCourse) {
      setCourse(foundCourse);

      let foundLesson: any = null;
      foundCourse.modules.forEach((module: any) => {
        const l = module.lessons.find((lesson: any) => lesson.id === lessonId);
        if (l) foundLesson = l;
      });

      setLesson(foundLesson);

      if (user) {
        const progress = storage.getStudentCourseProgress(user.id).find(p => p.courseId === courseId);
        setIsCompleted(progress?.completedLessons.includes(lessonId) || false);
      }
    }
  }, [courseId, lessonId, user]);

  const handleMarkAsRead = () => {
    if (!user || !course || !lesson) return;

    const progress = storage.getStudentCourseProgress(user.id).find(p => p.courseId === courseId);
    const updatedLessons = progress
      ? [...progress.completedLessons, lessonId]
      : [lessonId];

    storage.updateStudentCourseProgress(user.id, {
      courseId,
      completedLessons: [...new Set(updatedLessons)],
      lastAccessedLessonId: lessonId,
      enrolledDate: progress?.enrolledDate || new Date().toISOString(),
    });

    setIsCompleted(true);
  };

  const navigateLesson = (direction: 'prev' | 'next') => {
    if (!course || !lesson) return;

    const allLessons = course.modules.flatMap((m: any) => m.lessons);
    const currentIndex = allLessons.findIndex((l: any) => l.id === lessonId);

    if (direction === 'prev' && currentIndex > 0) {
      router.push(`/courses/${courseId}/lessons/${allLessons[currentIndex - 1].id}`);
    } else if (direction === 'next' && currentIndex < allLessons.length - 1) {
      router.push(`/courses/${courseId}/lessons/${allLessons[currentIndex + 1].id}`);
    }
  };

  if (!course || !lesson) {
    return (
      <PageContainer>
        <div className="flex flex-col items-center justify-center h-[60vh] text-center space-y-4">
          <div className="p-4 bg-red-50 dark:bg-red-900/20 text-red-500 rounded-full">
            <BookOpen className="h-12 w-12" />
          </div >
          <h1 className="text-2xl font-bold">Lesson Not Found</h1>
          <Button variant="primary" onClick={() => router.push(`/courses/${courseId}`)}>
            Back to Course
          </Button>
        </div >
      </PageContainer>
    );
  }

  const totalLessons = course.modules.reduce((acc: number, m: any) => acc + m.lessons.length, 0);
  const progress = user ? storage.getStudentCourseProgress(user.id).find(p => p.courseId === courseId)?.completedLessons.length || 0 : 0;
  const progressPercent = Math.round((progress / totalLessons) * 100);

  return (
    <PageContainer>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => router.push(`/courses/${courseId}`)} className="p-2 rounded-xl">
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-bold text-primary-600 dark:text-primary-400 uppercase tracking-widest">
                <span className="opacity-80">{course.title}</span>
                <span className="text-neutral-300 dark:text-neutral-700">/</span>
                <span className="text-neutral-900 dark:text-white">{course.modules.find((m: any) => m.lessons.some((l: any) => l.id === lessonId))?.title}</span>
              </div >
              <h1 className="text-3xl font-black tracking-tight text-neutral-900 dark:text-white">{lesson.title}</h1>
            </div >
          </div >
          <Button
            variant={isCompleted ? "outline" : "primary"}
            leftIcon={<CheckCircle className="h-4 w-4" />}
            onClick={handleMarkAsRead}
            disabled={isCompleted}
            className={cn(
              "h-12 rounded-xl font-bold px-6 shadow-sm transition-all",
              isCompleted ? "text-emerald-600 border-emerald-200 bg-emerald-50 dark:bg-emerald-900/20 dark:border-emerald-800" : ""
            )}
          >
            {isCompleted ? 'Completed' : 'Mark as Read'}
          </Button>
        </div >

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1 space-y-6">
            <Card variant="elevated" className="p-4 space-y-6 border-neutral-200 dark:border-neutral-800">
              <div className="px-2 py-1">
                <h3 className="text-sm font-black uppercase tracking-widest text-neutral-400">Course Content</h3>
              </div >
              <div className="space-y-6">
                {course.modules.map((module: any, mIdx: number) => (
                  <div key={module.id} className="space-y-3">
                    <div className="flex items-center gap-2 px-2">
                      <span className="text-[10px] font-bold text-primary-600 dark:text-primary-400 uppercase tracking-tighter">Module {mIdx + 1}</span>
                      <div className="h-px flex-1 bg-neutral-100 dark:bg-neutral-800" />
                    </div >
                    <div className="space-y-1">
                      {module.lessons.map((lessonItem: any) => {
                        const isLessonCompleted = user && storage.getStudentCourseProgress(user.id).find(p => p.courseId === courseId)?.completedLessons.includes(lessonItem.id);
                        const isCurrent = lessonItem.id === lessonId;
                        return (
                          <Link
                            key={lessonItem.id}
                            href={`/courses/${courseId}/lessons/${lessonItem.id}`}
                            className={cn(
                              "flex items-center gap-3 p-2 rounded-lg text-xs font-medium transition-all group",
                              isCurrent ? "bg-primary-100 text-primary-700 dark:bg-primary-900/40 dark:text-primary-300 shadow-sm" : "text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                            )}
                          >
                            <div className={cn(
                              "h-4 w-4 rounded-full border flex items-center justify-center transition-colors shrink-0",
                              isLessonCompleted ? "bg-emerald-500 border-emerald-500 text-white" : "border-neutral-300 dark:border-neutral-700 group-hover:border-primary-500"
                            )}>
                              {isLessonCompleted && <CheckCircle className="h-2 w-2" />}
                            </div >
                            <span className="truncate">{lessonItem.title}</span>
                          </Link>
                        );
                      })}
                    </div >
                  </div >
                ))}
              </div >
            </Card>
          </div >

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <Card variant="elevated" className="p-8 space-y-8 border-neutral-200 dark:border-neutral-800 surface-layered">
              <div className="space-y-6">
                <div className="flex items-center gap-3 text-neutral-900 dark:text-white">
                  <BookOpen className="h-6 w-6 text-primary-500" />
                  <h2 className="text-2xl font-bold">Lesson Content</h2>
                </div >
                <div className="prose dark:prose-invert max-w-none text-secondary leading-relaxed space-y-6 text-lg">
                  {lesson.content.split('\\n').map((para: string, i: number) => (
                    <p key={i}>{para}</p>
                  ))}
                </div >
              </div >

              {lesson.codeExamples && lesson.codeExamples.length > 0 && (
                <div className="space-y-6">
                  <div className="flex items-center gap-3 text-neutral-900 dark:text-white">
                    <Code className="h-6 w-6 text-primary-500" />
                    <h3 className="text-xl font-bold">Code Example</h3>
                  </div >
                  {lesson.codeExamples.map((example: any, i: number) => (
                    <div key={i} className="space-y-3">
                      <div className="flex items-center justify-between px-4 py-2 bg-neutral-100 dark:bg-neutral-800 rounded-t-2xl border-x border-t border-neutral-200 dark:border-neutral-700">
                        <span className="text-xs font-mono font-bold text-neutral-600 dark:text-neutral-400">{example.title} <span className="text-neutral-400 opacity-60 ml-2">({example.language})</span></span>
                        <div className="flex gap-1.5">
                          <div className="h-2 w-2 rounded-full bg-red-400" />
                          <div className="h-2 w-2 rounded-full bg-amber-400" />
                          <div className="h-2 w-2 rounded-full bg-emerald-400" />
                        </div >
                      </div >
                      <pre className="p-6 bg-neutral-900 text-neutral-100 rounded-b-2xl overflow-x-auto font-mono text-sm leading-relaxed shadow-inner">
                        <code className="block">{example.code}</code>
                      </pre>
                    </div >
                  ))}
                </div >
              )}

              <div className="space-y-6 pt-6 border-t border-neutral-200 dark:border-neutral-800">
                <div className="flex items-center gap-3 text-neutral-900 dark:text-white">
                  <Zap className="h-6 w-6 text-amber-500" />
                  <h3 className="text-xl font-bold">Key Concepts</h3>
                </div >
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {lesson.keyPoints.map((point: string, i: number) => (
                    <li key={i} className="flex items-start gap-3 p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700 hover:border-primary-200 dark:hover:border-primary-800 transition-colors">
                      <div className="h-5 w-5 rounded-full bg-primary-100 dark:bg-primary-900/40 text-primary-600 dark:text-primary-400 flex items-center justify-center shrink-0 mt-0.5">
                        <CheckCircle className="h-3 w-3" />
                      </div >
                      <span className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">{point}</span>
                    </li>
                  ))}
                </ul >
              </div >
            </Card>

            <div className="flex items-center justify-between gap-4">
              <Button
                variant="outline"
                className="flex-1 gap-2 h-12 rounded-xl font-bold"
                leftIcon={<ChevronLeft className="h-4 w-4" />}
                onClick={() => navigateLesson('prev')}
                disabled={!course || !lesson || course.modules.flatMap((m: any) => m.lessons).findIndex((l: any) => l.id === lessonId) === 0}
              >
                Previous Lesson
              </Button>
              <Button
                variant="outline"
                className="flex-1 gap-2 h-12 rounded-xl font-bold"
                rightIcon={<ChevronRight className="h-4 w-4" />}
                onClick={() => navigateLesson('next')}
                disabled={!course || !lesson || course.modules.flatMap((m: any) => m.lessons).findIndex((l: any) => l.id === lessonId) === course.modules.flatMap((m: any) => m.lessons).length - 1}
              >
                Next Lesson
              </Button>
            </div >
          </div >

          {/* Resources Sidebar */}
          <div className="space-y-6">
            <Card variant="elevated" className="p-6 space-y-6 border-neutral-200 dark:border-neutral-800">
              <div className="space-y-2">
                <h3 className="font-bold text-lg">Resources</h3>
                <p className="text-xs text-secondary">Get detailed documentation and notes for this lesson.</p>
              </div >
              <Button
                variant="primary"
                className="w-full gap-2 h-12 rounded-xl font-bold shadow-lg shadow-primary-500/20"
                leftIcon={<FileText className="h-4 w-4" />}
                onClick={() => pdfService.generateLessonNotes(course.title, lesson.title, lesson.content)}
              >
                Download PDF Notes
              </Button>
            </Card>

            <Card variant="elevated" className="p-6 space-y-4 border-neutral-200 dark:border-neutral-800">
              <div className="flex items-center gap-2 text-sm font-bold text-neutral-400 uppercase tracking-widest">
                <BookOpen className="h-4 w-4" />
                Course Overview
              </div >
              <div className="space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-secondary">Overall Progress</span>
                  <span className="font-bold">{progressPercent}%</span>
                </div >
                <ProgressBar value={progressPercent} className="h-2 rounded-full bg-neutral-200 dark:bg-neutral-800" />
              </div >
            </Card>
          </div >
        </div >
      </div >
    </PageContainer>
  );
}
