'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { AdminSidebar } from '@/components/layout/AdminSidebar';
import { AdminSearchInput } from '@/components/admin/AdminSearchInput';
import { storage } from '@/lib/storage';
import { Bell, LogOut, User } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Dropdown } from '@/components/ui/Dropdown';
import { Avatar } from '@/components/ui/Avatar';
import { authService } from '@/lib/auth-service';
import { cn } from '@/lib/utils';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [searchResults, setSearchResults] = useState<any[]>([]);

  useEffect(() => {
    const session = storage.getAdminSession();
    if (!session) {
      router.push('/admin/login');
    }
  }, [router]);

  useEffect(() => {
    if (searchResults.length > 0) {
      // Reset search results when navigating
      setSearchResults([]);
    }
  }, [pathname]);

  const handleSearch = (query: string) => {
    if (query.trim().length < 2) {
      setSearchResults([]);
      return;
    }

    const q = query.toLowerCase();
    const groups: any[] = [];

    const students = storage.getStudents().filter(s =>
      s.fullName.toLowerCase().includes(q) || s.email.toLowerCase().includes(q)
    ).map(s => ({ id: s.id, name: s.fullName, href: `/admin/students/${s.id}` }));

    if (students.length > 0) {
      groups.push({ type: 'Students', items: students });
    }

    const projects = storage.getProjects().filter(p =>
      p.name.toLowerCase().includes(q) || (p.stack || []).some(s => s.toLowerCase().includes(q))
    ).map(p => ({ id: p.id, name: p.name, href: `/admin/projects/${p.id}` }));

    if (projects.length > 0) {
      groups.push({ type: 'Projects', items: projects });
    }

    const courses = require('@/data/course-data').COURSES.filter((c: any) =>
      c.title.toLowerCase().includes(q)
    ).map((c: any) => ({ id: c.id, name: c.title, href: `/admin/courses` }));

    if (courses.length > 0) {
      groups.push({ type: 'Courses', items: courses });
    }

    const certs = storage.getCertificates().filter(cert =>
      cert.title.toLowerCase().includes(q) || cert.certificateId.toLowerCase().includes(q)
    ).map(cert => ({ id: cert.id, name: cert.title, href: `/admin/certificates` }));

    if (certs.length > 0) {
      groups.push({ type: 'Certificates', items: certs });
    }

    setSearchResults(groups);
  };

  const handleLogout = async () => {
    await authService.logoutAdmin();
    router.push('/admin/login');
  };

  const session = storage.getAdminSession();
  if (!session) return null;

  return (
    <div className="flex h-screen bg-neutral-100 dark:bg-neutral-950">
      <AdminSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 border-b border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 px-6 flex items-center justify-between sticky top-0 z-30 surface-layered">
          <div className="flex items-center gap-4 flex-1">
            <AdminSearchInput
              placeholder="Quick search students, projects, courses..."
              onSearch={handleSearch}
              results={searchResults}
            />
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" className="relative p-2 rounded-xl">
              <Bell className="h-5 w-5 text-neutral-500" />
              <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-accent-500 rounded-full border-2 border-white dark:border-neutral-900" />
            </Button>
            <Dropdown
              trigger={
                <div className="flex items-center gap-3 p-1.5 pl-1 pr-3 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all cursor-pointer border border-transparent hover:border-neutral-200 dark:hover:border-neutral-700">
                  <Avatar src="" fallback="AD" size="sm" className="ring-2 ring-white dark:ring-neutral-800" />
                  <div className="flex flex-col leading-none">
                    <span className="text-sm font-black text-neutral-900 dark:text-white">Admin</span>
                    <span className="text-[10px] font-bold text-neutral-400 uppercase">Superuser</span>
                  </div>
                </div>
              }
              align="right"
            >
              <Dropdown.Item leftIcon={<User className="h-4 w-4" />}>Admin Profile</Dropdown.Item>
              <div className="h-px bg-neutral-200 dark:bg-neutral-800 my-1" />
              <Dropdown.Item leftIcon={<LogOut className="h-4 w-4" />} onClick={handleLogout} className="text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20">Logout</Dropdown.Item>
            </Dropdown>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-8 bg-neutral-50 dark:bg-neutral-950">
          {children}
        </main>
      </div>
    </div>
  );
}
