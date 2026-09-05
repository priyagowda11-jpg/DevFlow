"use client";

import React from 'react';
import { usePathname } from 'next/navigation';
import { Sidebar } from '@/components/layout/Sidebar';
import { Topbar } from '@/components/layout/Topbar';
import { MobileNavigation } from '@/components/layout/MobileNavigation';
import { cn } from '@/lib/utils';

interface AppShellProps {
  children: React.ReactNode;
}

const ROUTE_MAP: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/profile': 'My Profile',
  '/settings': 'Settings',
  '/learning': 'Learning Hub',
  '/courses': 'My Courses',
  '/projects': 'Projects',
  '/tasks': 'Task Board',
  '/certificates': 'Certificates',
  '/achievements': 'Achievements',
  '/leaderboard': 'Leaderboard',
  '/analytics': 'Analytics',
  '/help': 'Help Center',
};

export const AppShell = ({ children }: AppShellProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const pathname = usePathname();

  // Resolve page title and breadcrumbs based on pathname
  const getPageTitle = () => {
    if (ROUTE_MAP[pathname]) return ROUTE_MAP[pathname];

    if (pathname.startsWith('/courses/')) return 'Course Detail';
    if (pathname.startsWith('/courses/[courseId]/lessons/')) return 'Lesson';
    if (pathname.startsWith('/projects/')) return 'Project Workspace';
    if (pathname.startsWith('/certificates/verify/')) return 'Verify Certificate';

    return 'DevFlow';
  };

  const getBreadcrumbs = () => {
    const title = getPageTitle();
    const crumbs = [{ label: 'DevFlow', href: '/dashboard' }];

    // Add parent category if applicable
    if (pathname.startsWith('/courses')) crumbs.push({ label: 'My Courses', href: '/courses' });
    else if (pathname.startsWith('/projects')) crumbs.push({ label: 'Projects', href: '/projects' });
    else if (pathname.startsWith('/learning')) crumbs.push({ label: 'Learning Hub', href: '/learning' });

    // Add current page if it's not just the root dashboard
    if (pathname !== '/dashboard') {
      crumbs.push({ label: title, href: pathname });
    }

    return crumbs;
  };

  const pageTitle = getPageTitle();
  const breadcrumbs = getBreadcrumbs();

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Desktop Sidebar */}
      <div className={cn(
        'hidden lg:block transition-all duration-300',
        isSidebarOpen ? 'w-64' : 'w-20'
      )}>
        <Sidebar
          isOpen={isSidebarOpen}
          toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden relative">
        <Topbar
          title={pageTitle}
          breadcrumbs={breadcrumbs}
          toggleSidebar={() => setIsMobileMenuOpen(true)}
        />
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>

      <MobileNavigation
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </div>
  );
};
