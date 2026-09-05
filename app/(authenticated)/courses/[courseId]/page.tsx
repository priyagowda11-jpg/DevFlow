'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { PageContainer } from '@/components/layout/PageContainer';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ErrorState } from '@/components/ui/ErrorState';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Badge } from '@/components/ui/Badge';
import {
  BookOpen,
  Clock,
  GraduationCap,
  ChevronLeft,
  PlayCircle,
  CheckCircle2,
  FileText
} from 'lucide-react';
import { COURSES } from '@/data/course-data';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';
import { storage } from '@/lib/storage';

export default function CourseDetailPage() {
  const { courseId } = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const course = COURSES.find(c => c.id === courseId);

  const enrolledProgress = user ? storage.getStudentCourseProgress(user.id).find(p => p.courseId === courseId) : null;
  const isEnrolled = !!enrolledProgress;

  const totalLessons = course?.modules.reduce((acc, m) => acc + m.lessons.length, 0) || 0;
  const completedLessonsCount = enrolledProgress?.completedLessons.length || 0;
  const progressPercent = totalLessons > 0 ? Math.round((completedLessonsCount / totalLessons) * 100) : 0;

  const handleEnroll = () => {
    if (user) {
      storage.enrollInCourse(user.id, courseId as string);
      router.refresh();
    }
  };

  const startLearning = () => {
    if (!course) return;
    const allLessons = course.modules.flatMap(m => m.lessons);
    const firstIncomplete = allLessons.find(l => !enrolledProgress?.completedLessons.includes(l.id));
    const targetLesson = firstIncomplete || allLessons[0];
    router.push(`/courses/${courseId}/lessons/${targetLesson.id}`);
  };

  if (!course) {
    return (
      <PageContainer>
        <ErrorState
          title="Course not found"
          description="The learning module you're looking for doesn't exist or has been moved."
          action={<Link href="/learning"><Button>Back to Learning Hub</Button></Link>}
        />
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <div className="max-w-6xl mx-auto px-4 py-8 space-y-12">
        {/* Navigation */}
        <Link href="/learning" className="inline-flex items-center gap-2 text-secondary hover:text-primary-600 transition-colors group">
          <ChevronLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-bold uppercase tracking-wider">Back to Learning Hub</span>
        </Link>

        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-8">
            <div className="space-y-6">
              <div className="flex flex-wrap items-center gap-3">
                <Badge variant="project" className="text-[10px] px-3 py-1 rounded-full bg-primary-100 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400">
                  {course.category}
                </Badge>
                <Badge variant="project" className="text-[10px] px-3 py-1 rounded-full bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400">
                  {course.difficulty}
                </Badge>
              </div >
              <h1 className="text-display text-neutral-900 dark:text-white tracking-tight">
                {course.title}
              </h1>
              <p className="text-lg text-secondary leading-relaxed max-w-3xl">
                {course.description}
              </p>
            </div >

            {/* Quick Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 flex items-center gap-4 shadow-sm">
                <div className="p-3 rounded-xl bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400">
                  <Clock className="h-6 w-6" />
                </div >
                <div>
                  <div className="text-[10px] font-black text-neutral-400 uppercase tracking-widest">Duration</div>
                  <div className="text-sm font-bold text-neutral-900 dark:text-white">{course.duration}</div>
                </div >
              </div >
              <div className="p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 flex items-center gap-4 shadow-sm">
                <div className="p-3 rounded-xl bg-secondary-50 dark:bg-secondary-900/30 text-secondary-600 dark:text-secondary-400">
                  <GraduationCap className="h-6 w-6" />
                </div >
                <div>
                  <div className="text-[10px] font-black text-neutral-400 uppercase tracking-widest">Instructor</div>
                  <div className="text-sm font-bold text-neutral-900 dark:text-white">{course.instructor}</div>
                </div >
              </div >
              <div className="p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 flex items-center gap-4 shadow-sm">
                <div className="p-3 rounded-xl bg-accent-50 dark:bg-accent-900/30 text-accent-600 dark:text-accent-400">
                  <BookOpen className="h-6 w-6" />
                </div >
                <div>
                  <div className="text-[10px] font-black text-neutral-400 uppercase tracking-widest">Curriculum</div>
                  <div className="text-sm font-bold text-neutral-900 dark:text-white">{course.modules.length} Modules</div>
                </div >
              </div >
            </div >
          </div >

          {/* Enrollment Action Card */}
          <Card variant="elevated" className="p-8 space-y-8 bg-primary-600 text-white border-none shadow-2xl relative overflow-hidden">
            <div className="absolute -top-10 -right-10 h-32 w-32 bg-white/10 rounded-full blur-2xl" />
            <div className="relative z-10 space-y-6">
              <div className="space-y-2">
                <h3 className="text-2xl font-bold">{isEnrolled ? 'Your Progress' : 'Get Started'}</h3>
                <p className="text-sm text-primary-100 opacity-90">
                  {isEnrolled ? 'You are currently enrolled in this course. Keep pushing forward!' : `Unlock professional skills in ${course.skills.join(', ')}.`}
                </p>
              </div >

              <div className="space-y-3">
                <div className="flex justify-between text-xs font-bold text-primary-100 uppercase tracking-wider">
                  <span>Course Completion</span>
                  <span>{progressPercent}%</span>
                </div >
                <ProgressBar value={progressPercent} className="h-3 bg-primary-700 rounded-full" />
              </div >

              <Button
                variant="primary"
                className="w-full py-6 rounded-2xl bg-white text-primary-700 hover:bg-neutral-100 font-black text-lg gap-3 shadow-lg transition-transform hover:scale-[1.02]"
                onClick={isEnrolled ? startLearning : handleEnroll}
              >
                <PlayCircle className="h-6 w-6" />
                {isEnrolled ? 'Continue Learning' : 'Enroll Now'}
              </Button>
            </div >
          </Card>
        </div >

        {/* Curriculum Section */}
        <div className="space-y-8">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400">
              <FileText className="h-5 w-5" />
            </div >
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-white tracking-tight">Course Curriculum</h2>
          </div >

          <div className="grid grid-cols-1 gap-6">
            {course.modules.map((module, modIdx) => (
              <Card key={module.id} variant="elevated" className="overflow-hidden border-neutral-200 dark:border-neutral-800 transition-all duration-300 hover:border-primary-500/30">
                <div className="p-6 bg-neutral-50 dark:bg-neutral-800/50 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="h-8 w-8 rounded-full bg-primary-500 text-white flex items-center justify-center font-black text-sm shadow-sm">
                      {modIdx + 1}
                    </div >
                    <h3 className="font-bold text-neutral-900 dark:text-white">{module.title}</h3>
                  </div >
                  <Badge variant="project" className="text-[10px] px-3 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 border-none">
                    {module.lessons.length} Lessons
                  </Badge>
                </div >
                <div className="divide-y divide-neutral-100 dark:divide-neutral-800">
                  {module.lessons.map((lesson, lesIdx) => {
                    const isCompleted = enrolledProgress?.completedLessons.includes(lesson.id);
                    return (
                      <div key={lesson.id} className="p-6 flex items-center justify-between hover:bg-neutral-50 dark:hover:bg-neutral-800/30 transition-colors group">
                        <div className="flex items-center gap-4">
                          <div className={cn(
                            "h-6 w-6 rounded-full border-2 flex items-center justify-center transition-all",
                            isCompleted
                              ? "bg-emerald-500 border-emerald-500 text-white"
                              : "border-neutral-200 dark:border-neutral-700 text-neutral-400 group-hover:border-primary-500 group-hover:text-primary-500"
                          )}>
                            <CheckCircle2 className="h-3 w-3" />
                          </div >
                          <div className="space-y-1">
                            <h4 className={cn("text-sm font-bold transition-colors", isCompleted ? "text-neutral-500 dark:text-neutral-400" : "text-neutral-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400")}>
                              {lesson.title}
                            </h4>
                            <div className="flex items-center gap-3">
                              <span className="text-xs text-secondary flex items-center gap-1">
                                <Clock className="h-3 w-3" /> {lesson.duration}
                              </span >
                              <span className="text-xs text-neutral-400">•</span>
                              <span className="text-xs text-secondary font-medium">{lesson.keyPoints.length} key points</span>
                            </div >
                          </div >
                        </div >
                        <Link href={`/courses/${courseId}/lessons/${lesson.id}`}>
                          <Button variant="ghost" size="sm" className="rounded-lg h-9 px-4 text-xs font-bold text-primary-600 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all">
                            {isCompleted ? 'Review' : 'Start'}
                          </Button>
                        </Link>
                      </div >
                    );
                  })}
                </div >
              </Card>
            ))}
          </div >
        </div >
      </div >
    </PageContainer>
  );
}
