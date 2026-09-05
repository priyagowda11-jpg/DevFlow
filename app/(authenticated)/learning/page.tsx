'use client';

import { useState, useMemo } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Button } from '@/components/ui/Button';
import { BookOpen, Rocket, Zap, Search, GraduationCap } from 'lucide-react';
import { COURSES } from '@/data/course-data';
import { CourseCard } from '@/components/learning/CourseCard';
import Link from 'next/link';

export default function LearningPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', ...Array.from(new Set(COURSES.map(c => c.category)))];

  const filteredCourses = useMemo(() => {
    return COURSES.filter(course => {
      const matchesCategory = activeCategory === 'All' || course.category === activeCategory;
      const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            course.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <PageContainer>
      <div className="space-y-12">
        {/* Hero Section */}
        <div className="relative p-8 md:p-16 rounded-[3rem] bg-neutral-900 dark:bg-primary-950 text-white overflow-hidden shadow-2xl">
          <div className="absolute -top-24 -right-24 h-96 w-96 bg-primary-500/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -left-24 h-96 w-96 bg-secondary-500/20 rounded-full blur-3xl" />

          <div className="relative z-10 max-w-3xl space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-primary-200 text-xs font-bold uppercase tracking-widest">
              <GraduationCap className="h-3 w-3" />
              Knowledge Hub
            </div>
            <h1 className="text-display leading-[1.1] tracking-tight">
              Master Your Craft, <br />
              <span className="text-primary-400">One Lesson at a Time.</span>
            </h1>
            <p className="text-lg text-neutral-300 max-w-2xl leading-relaxed opacity-90">
              Explore curated professional curricula designed to take you from a student to a production-ready engineer. Build your portfolio while you learn.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-primary-200" />
                <input
                  type="text"
                  placeholder="Search for a course or skill..."
                  className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder:text-primary-200 outline-none focus:ring-2 focus:ring-white/50 transition-all"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button variant="primary" className="bg-white text-neutral-900 hover:bg-neutral-100 rounded-2xl px-8 h-14 font-bold shadow-lg transition-transform hover:scale-105">
                Explore Courses
              </Button>
            </div>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex items-center gap-3 overflow-x-auto pb-4 no-scrollbar">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={cn(
                'px-6 py-2.5 rounded-full text-sm font-bold transition-all whitespace-nowrap border',
                activeCategory === category
                  ? 'bg-primary-600 text-white border-primary-600 shadow-md'
                  : 'bg-white dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400 border-neutral-200 dark:border-neutral-800 hover:border-primary-500'
              )}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map(course => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>

        {filteredCourses.length === 0 && (
          <div className="py-20 text-center space-y-4">
            <div className="h-20 w-20 bg-neutral-100 dark:bg-neutral-800 rounded-full flex items-center justify-center mx-auto text-neutral-400">
              <Search className="h-10 w-10" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-neutral-900 dark:text-white">No courses found</h3>
              <p className="text-secondary">Try adjusting your filters or search terms.</p>
            </div>
          </div>
        )}
      </div>
    </PageContainer>
  );
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}
