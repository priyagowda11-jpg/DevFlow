'use client';

import React from 'react';
import { Course } from '@/types';
import { useAuth } from '@/context/AuthContext';
import { storage } from '@/lib/storage';
import { useRouter } from 'next/navigation';
import { BookOpen, CheckCircle, Clock, Zap, Rocket, GraduationCap } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { cn } from '@/lib/utils';

interface CourseCardProps {
  course: Course;
}

export const CourseCard = ({ course }: CourseCardProps) => {
  const { user } = useAuth();
  const router = useRouter();

  const progress = user
    ? storage.getStudentCourseProgress(user.id).find(p => p.courseId === course.id)?.completedLessons.length || 0
    : 0;

  const totalLessons = course.modules.reduce((acc, m) => acc + m.lessons.length, 0);
  const progressPercent = totalLessons > 0 ? Math.round((progress / totalLessons) * 100) : 0;

  const getCategoryDetails = (cat: string) => {
    switch (cat) {
      case 'Full Stack': return { icon: <Zap className="h-5 w-5" />, color: 'text-amber-500', bg: 'bg-amber-50 dark:bg-amber-900/30' };
      case 'Frontend': return { icon: <BookOpen className="h-5 w-5" />, color: 'text-teal-500', bg: 'bg-teal-50 dark:bg-teal-900/30' };
      case 'Backend': return { icon: <Rocket className="h-5 w-5" />, color: 'text-emerald-500', bg: 'bg-emerald-50 dark:bg-emerald-900/30' };
      case 'AI': return { icon: <Zap className="h-5 w-5" />, color: 'text-orange-500', bg: 'bg-orange-50 dark:bg-orange-900/30' };
      default: return { icon: <GraduationCap className="h-5 w-5" />, color: 'text-primary-500', bg: 'bg-primary-50 dark:bg-primary-900/30' };
    }
  };

  const details = getCategoryDetails(course.category);

  return (
    <Card
      variant="elevated"
      className="group p-6 space-y-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 cursor-pointer surface-layered border-neutral-200 dark:border-neutral-800 hover:border-primary-500/30 flex flex-col h-full"
      onClick={() => router.push(`/courses/${course.id}`)}
    >
      <div className="flex items-start justify-between">
        <div className={cn('p-3 rounded-2xl transition-colors group-hover:scale-110 duration-300', details.bg)}>
          <div className={details.color}>{details.icon}</div>
        </div>
        <div className="flex flex-col items-end gap-2">
          <Badge variant="project" className="text-[9px] font-black uppercase tracking-wider bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 border-none">
            {course.category}
          </Badge>
          <div className="flex items-center gap-1 text-[10px] font-bold text-secondary uppercase tracking-wider">
            <Clock className="h-3 w-3" />
            {course.duration}
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-xl font-black text-neutral-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors leading-tight">
          {course.title}
        </h3>
        <p className="text-sm text-secondary line-clamp-2 leading-relaxed font-medium">
          {course.description}
        </p>
      </div>

      <div className="mt-auto pt-6 border-t border-neutral-100 dark:border-neutral-800 space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between items-center text-xs font-black uppercase tracking-widest">
            <span className="text-neutral-400">Your Progress</span>
            <span className="text-neutral-900 dark:text-white">{progressPercent}%</span>
          </div>
          <ProgressBar value={progressPercent} className="h-2 rounded-full bg-neutral-100 dark:bg-neutral-800" />
        </div>

        <div className="flex justify-between items-center pt-2">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 text-xs font-bold text-secondary">
              <BookOpen className="h-3 w-3" />
              {course.modules.length} Modules
            </div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-secondary">
              <CheckCircle className="h-3 w-3" />
              {totalLessons} Lessons
            </div>
          </div>
          <div className="text-primary-600 dark:text-primary-400 opacity-0 group-hover:opacity-100 transition-opacity">
            <ArrowRight className="h-5 w-5" />
          </div>
        </div>
      </div>
    </Card>
  );
};

// Helper for the ArrowRight icon since it might be needed
function ArrowRight(props: any) {
  return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>;
}
