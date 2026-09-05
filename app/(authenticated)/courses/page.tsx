'use client';

import React from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { GraduationCap, Search } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { storage } from '@/lib/storage';
import { CourseCard } from '@/components/learning/CourseCard';
import Link from 'next/link';

export default function CoursesPage() {
  const { user } = useAuth();
  const enrolledProgress = user ? storage.getStudentCourseProgress(user.id) : [];
  const enrolledCourseIds = enrolledProgress.map(p => p.courseId);

  // Get actual course data from storage or data file
  const allCourses = require('@/data/course-data').COURSES;
  const myCourses = allCourses.filter((course: any) => enrolledCourseIds.includes(course.id));

  return (
    <PageContainer>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <h1 className="text-page-title">My Courses</h1>
            <p className="text-secondary">Manage your active and completed learning modules.</p>
          </div>
          <Link href="/learning">
            <Button variant="primary" leftIcon={<Search className="h-4 w-4" />}>
              Find Courses
            </Button>
          </Link>
        </div>

        {myCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {myCourses.map((course: any) => (
              <CourseCard
                key={course.id}
                course={course}
              />
            ))}
          </div>
        ) : (
          <Card variant="default" className="col-span-full p-12 text-center space-y-4">
            <div className="mx-auto h-16 w-16 bg-neutral-100 dark:bg-neutral-800 rounded-full flex items-center justify-center text-neutral-400">
              <GraduationCap className="h-8 w-8" />
            </div>
            <div className="space-y-2">
              <h3 className="text-card-title">No courses enrolled yet</h3>
              <p className="text-secondary text-sm max-w-md mx-auto">
                Start your learning journey by exploring available courses and adding them to your profile.
              </p>
            </div>
            <Link href="/learning" className="block w-fit mx-auto">
              <Button variant="primary">Explore Course Catalog</Button>
            </Link>
          </Card>
        )}
      </div>
    </PageContainer>
  );
}
