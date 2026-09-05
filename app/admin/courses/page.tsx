'use client';

import React, { useState } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { storage } from '@/lib/storage';
import { BookOpen, Layers, Search, Plus } from 'lucide-react';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { AdminTable } from '@/components/admin/AdminTable';
import { AdminSearchInput } from '@/components/admin/AdminSearchInput';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

export default function AdminCoursesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const allCourses = require('@/data/course-data').COURSES;

  const filteredCourses = allCourses.filter((course: any) =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const columns = [
    {
      key: 'title',
      label: 'Course Title',
      render: (val: any, course: any) => (
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400">
            <Layers className="h-4 w-4" />
          </div>
          <span className="font-black text-neutral-900 dark:text-white">{val}</span>
        </div>
      ),
    },
    {
      key: 'category',
      label: 'Category',
      render: (val: any) => (
        <Badge variant="project" className="text-[9px] px-2 py-0.5 rounded-md font-black uppercase tracking-wider bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400">
          {val}
        </Badge>
      ),
    },
    {
      key: 'difficulty',
      label: 'Difficulty',
      render: (val: any) => (
        <Badge variant="project" className={`text-[9px] px-2 py-0.5 rounded-md font-black uppercase tracking-wider ${
          val === 'Advanced' ? 'bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400' : 'bg-teal-100 text-teal-600 dark:bg-teal-900/30 dark:text-teal-400'
        }`}>
          {val}
        </Badge>
      ),
    },
    {
      key: 'stats',
      label: 'Enrollment Metrics',
      align: 'center' as const,
      render: (_: any, course: any) => {
        const allProgressRecords = storage.getCourseProgress();
        const totalEnrolled = Object.values(allProgressRecords).flatMap(list => list).filter(p => p.courseId === course.id).length;
        const totalLessons = course.modules.reduce((acc: number, m: any) => acc + m.lessons.length, 0);
        const totalCompleted = Object.values(allProgressRecords).flatMap(list => list).filter(p => {
          return p.courseId === course.id && p.completedLessons.length === totalLessons;
        }).length;

        return (
          <div className="flex items-center justify-center gap-6">
            <div className="flex flex-col items-center">
              <span className="text-[9px] text-neutral-400 uppercase font-black mb-1">Enrolled</span>
              <span className="font-black text-neutral-900 dark:text-white">{totalEnrolled}</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-[9px] text-neutral-400 uppercase font-black mb-1">Lessons</span>
              <span className="font-black text-neutral-900 dark:text-white">{totalLessons}</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-[9px] text-neutral-400 uppercase font-black mb-1">Certs</span>
              <span className="font-black text-emerald-600 dark:text-emerald-400">{totalCompleted}</span>
            </div>
          </div>
        );
      },
    },
    {
      key: 'actions',
      label: 'Actions',
      align: 'right' as const,
      render: (_: any, course: any) => (
        <Button variant="ghost" size="sm" className="gap-2 h-9 rounded-lg font-bold text-xs hover:bg-primary-50 dark:hover:bg-primary-900/20 hover:text-primary-600 dark:hover:text-primary-400 transition-all">
          Edit Course
        </Button>
      ),
    },
  ];

  return (
    <PageContainer>
      <div className="space-y-10">
        <AdminPageHeader
          title="Course Management"
          subtitle="Oversee the educational roadmap and monitor global enrollment metrics."
          icon={<BookOpen className="h-6 w-6" />}
          actions={
            <Button variant="primary" className="gap-2 h-12 rounded-xl font-bold shadow-lg shadow-primary-500/20" leftIcon={<Plus className="h-4 w-4" />}>
              Create Course
            </Button>
          }
        />

        <div className="space-y-6">
          <AdminSearchInput
            placeholder="Search by course title or category..."
            onSearch={setSearchQuery}
            value={searchQuery}
          />

          <AdminTable
            columns={columns}
            data={filteredCourses}
            emptyState={
              <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
                <div className="p-4 bg-neutral-100 dark:bg-neutral-800 rounded-full text-neutral-400">
                  <Search className="h-8 w-8" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-lg font-black text-neutral-900 dark:text-white">No courses found</h3>
                  <p className="text-secondary text-sm">Try adjusting your search criteria.</p>
                </div>
              </div>
            }
          />
        </div>
      </div>
    </PageContainer>
  );
}
