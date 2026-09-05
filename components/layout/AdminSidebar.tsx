'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Users,
  BookOpen,
  FolderKanban,
  CheckSquare,
  Award,
  Trophy,
  BarChart3,
  Bell,
  Settings,
  ShieldCheck
} from 'lucide-react';

interface NavGroup {
  groupLabel: string;
  items: { label: string; href: string; icon: React.ElementType }[];
}

export const AdminSidebar = () => {
  const pathname = usePathname();

  const navigation: NavGroup[] = [
    {
      groupLabel: 'Overview',
      items: [
        { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
        { label: 'Analytics', href: '/admin/analytics', icon: BarChart3 },
      ],
    },
    {
      groupLabel: 'Management',
      items: [
        { label: 'Students', href: '/admin/students', icon: Users },
        { label: 'Courses', href: '/admin/courses', icon: BookOpen },
        { label: 'Projects', href: '/admin/projects', icon: FolderKanban },
        { label: 'Tasks', href: '/admin/tasks', icon: CheckSquare },
        { label: 'Certificates', href: '/admin/certificates', icon: Award },
        { label: 'Achievements', href: '/admin/achievements', icon: Trophy },
        { label: 'Leaderboard', href: '/admin/leaderboard', icon: BarChart3 },
      ],
    },
    {
      groupLabel: 'Platform',
      items: [
        { label: 'Notifications', href: '/admin/notifications', icon: Bell },
        { label: 'Settings', href: '/admin/settings', icon: Settings },
      ],
    },
  ];

  return (
    <aside className="w-64 h-screen bg-white dark:bg-neutral-900 border-r border-neutral-200 dark:border-neutral-800 flex flex-col">
      <div className="p-6 border-b border-neutral-200 dark:border-neutral-800">
        <div className="flex items-center gap-3 text-primary-600 dark:text-primary-400">
          <ShieldCheck className="h-6 w-6" />
          <span className="font-black uppercase tracking-tighter text-lg">DevFlow Admin</span>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-8 overflow-y-auto">
        {navigation.map((group) => (
          <div key={group.groupLabel} className="space-y-3">
            <div className="px-3 text-[10px] font-black uppercase tracking-widest text-neutral-400">
              {group.groupLabel}
            </div>
            <div className="space-y-1">
              {group.items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all',
                    pathname === item.href
                      ? 'bg-primary-50 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400'
                      : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </nav>

      <div className="p-4 border-t border-neutral-200 dark:border-neutral-800">
        <div className="flex items-center gap-3 px-3 py-2">
          <div className="h-8 w-8 rounded-full bg-neutral-200 dark:bg-neutral-700 flex items-center justify-center text-xs font-bold">
            AD
          </div>
          <div className="flex flex-col overflow-hidden">
            <span className="text-xs font-bold truncate">Admin User</span>
            <span className="text-[10px] text-secondary truncate">Super Admin</span>
          </div>
        </div>
      </div>
    </aside>
  );
};
