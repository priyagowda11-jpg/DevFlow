"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Search, X, FileText, Folder, Award, Trophy, ExternalLink, BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';
import { storage } from '@/lib/storage';
import { COURSES } from '@/data/course-data';
import { useRouter } from 'next/navigation';
import { EmptyState } from '@/components/ui/EmptyState';
import { Button } from '@/components/ui/Button';

interface SearchResult {
  id: string;
  title: string;
  type: 'PROJECT' | 'TASK' | 'CERTIFICATE' | 'ACHIEVEMENT' | 'COURSE' | 'LESSON';
  href: string;
  description?: string;
}

export const GlobalSearch = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/') {
        e.preventDefault();
        setIsOpen(true);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (!searchRef.current) return;
    const clickOutside = (e: MouseEvent) => {
      if (!searchRef.current?.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    window.addEventListener('mousedown', clickOutside);
    return () => window.removeEventListener('mousedown', clickOutside);
  }, []);

  useEffect(() => {
    if (!user) return;

    if (!query.trim()) {
      setResults([]);
      return;
    }

    const q = query.toLowerCase();
    const foundResults: SearchResult[] = [];

    // Search Courses
    COURSES.forEach(course => {
      if (course.title.toLowerCase().includes(q) || course.description.toLowerCase().includes(q)) {
        foundResults.push({
          id: course.id,
          title: course.title,
          type: 'COURSE',
          href: `/courses/${course.id}`,
          description: course.description
        });
      }

      // Search Lessons within this course
      course.modules.forEach(module => {
        module.lessons.forEach(lesson => {
          if (lesson.title.toLowerCase().includes(q)) {
            foundResults.push({
              id: lesson.id,
              title: lesson.title,
              type: 'LESSON',
              href: `/courses/${course.id}/lessons/${lesson.id}`,
              description: `In course: ${course.title}`
            });
          }
        });
      });
    });

    // Search Projects (Isolated)
    const projects = storage.getStudentProjects(user.id);
    projects.forEach(p => {
      if (p.name.toLowerCase().includes(q)) {
        foundResults.push({
          id: p.id,
          title: p.name,
          type: 'PROJECT',
          href: `/projects/${p.id}`,
          description: p.description
        });
      }
    });

    // Search Tasks (Isolated)
    const tasks = storage.getStudentTasks(user.id);
    tasks.forEach(t => {
      if (t.title.toLowerCase().includes(q)) {
        foundResults.push({
          id: t.id,
          title: t.title,
          type: 'TASK',
          href: `/projects/${t.projectId}`,
          description: `In project: ${storage.getProjects().find(p => p.id === t.projectId)?.name}`
        });
      }
    });

    // Search Certificates (Isolated)
    const certificates = storage.getStudentCertificates(user.id);
    certificates.forEach(c => {
      if (c.title.toLowerCase().includes(q) || c.certificateId.toLowerCase().includes(q)) {
        foundResults.push({
          id: c.id,
          title: c.title,
          type: 'CERTIFICATE',
          href: `/certificates/${c.id}`,
          description: `ID: ${c.certificateId}`
        });
      }
    });

    // Search Achievements (Isolated)
    const achievements = storage.getStudentAchievements(user.id);
    achievements.filter(a => a.isUnlocked).forEach(a => {
      if (a.name.toLowerCase().includes(q)) {
        foundResults.push({
          id: a.id,
          title: a.name,
          type: 'ACHIEVEMENT',
          href: `/achievements`,
          description: a.description
        });
      }
    });

    setResults(foundResults);
  }, [query, user]);

  const handleSelect = (result: SearchResult) => {
    router.push(result.href);
    setIsOpen(false);
    setQuery('');
  };

  return (
    <div ref={searchRef} className="relative">
      <div
        onClick={() => setIsOpen(true)}
        className={cn(
          'hidden md:flex items-center relative cursor-pointer transition-all duration-200 rounded-full',
          isOpen ? 'ring-2 ring-primary-500 bg-white dark:bg-neutral-800' : 'bg-neutral-200 dark:bg-neutral-800'
        )}
      >
        <Search className="absolute left-3 h-4 w-4 text-text-muted" />
        <input
          type="text"
          readOnly
          placeholder="Search... (Press /)"
          className="pl-9 pr-4 py-1.5 rounded-full border-transparent focus:ring-0 text-sm w-64 outline-none bg-transparent cursor-pointer"
        />
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-full max-w-lg bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-2xl z-50 overflow-hidden">
          <div className="p-4 border-b border-neutral-200 dark:border-neutral-800 flex items-center gap-3">
            <Search className="h-5 w-5 text-neutral-400" />
            <input
              autoFocus
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search projects, tasks, certificates..."
              className="flex-1 bg-transparent outline-none text-sm"
            />
            <Button variant="ghost" size="sm" className="p-1 h-7 w-7" onClick={() => setIsOpen(false)}>
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="max-h-[400px] overflow-y-auto p-2">
            {query.trim() === '' ? (
              <div className="p-8 text-center">
                <p className="text-xs text-secondary">Start typing to search across your workspace.</p>
              </div>
            ) : results.length === 0 ? (
              <div className="p-8 text-center">
                <EmptyState
                  icon={<Search className="h-8 w-8" />}
                  title="No results found"
                  description="Try a different search term."
                />
              </div>
            ) : (
              <div className="space-y-1">
                {results.map(result => (
                  <div
                    key={result.id}
                    onClick={() => handleSelect(result)}
                    className="p-3 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer transition-colors flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        'p-2 rounded-lg',
                        result.type === 'PROJECT' && 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400',
                        result.type === 'TASK' && 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400',
                        result.type === 'CERTIFICATE' && 'bg-amber-50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400',
                        result.type === 'ACHIEVEMENT' && 'bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400',
                        result.type === 'COURSE' && 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900/20 dark:text-indigo-400',
                        result.type === 'LESSON' && 'bg-orange-50 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400',
                      )}>
                        {result.type === 'PROJECT' && <Folder className="h-4 w-4" />}
                        {result.type === 'TASK' && <FileText className="h-4 w-4" />}
                        {result.type === 'CERTIFICATE' && <Award className="h-4 w-4" />}
                        {result.type === 'ACHIEVEMENT' && <Trophy className="h-4 w-4" />}
                        {result.type === 'COURSE' && <BookOpen className="h-4 w-4" />}
                        {result.type === 'LESSON' && <FileText className="h-4 w-4" />}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-neutral-900 dark:text-white">{result.title}</span>
                          <span className="text-[10px] font-bold uppercase px-1.5 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-500">
                            {result.type}
                          </span>
                        </div>
                        {result.description && (
                          <p className="text-xs text-secondary line-clamp-1">{result.description}</p>
                        )}
                      </div>
                    </div>
                    <ExternalLink className="h-4 w-4 text-neutral-300 group-hover:text-neutral-500 transition-colors" />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
