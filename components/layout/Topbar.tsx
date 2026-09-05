"use client";

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Search, Bell, Menu, X, User, Settings, LogOut, Sun, Moon, Laptop } from 'lucide-react';
import { Dropdown } from '@/components/ui/Dropdown';
import { Button } from '@/components/ui/Button';
import { Avatar } from '@/components/ui/Avatar';
import { useAuth } from '@/context/AuthContext';
import { useNotifications } from '@/context/NotificationContext';
import { useTheme } from '@/context/ThemeContext';
import { NotificationPanel } from '@/components/notifications/NotificationPanel';
import { GlobalSearch } from '@/components/search/GlobalSearch';
import Link from 'next/link';
import { Breadcrumbs } from '@/components/navigation/Breadcrumbs';

export const Topbar = ({
  toggleSidebar,
  title,
  breadcrumbs
}: {
  toggleSidebar: () => void;
  title: string;
  breadcrumbs?: { label: string; href: string }[];
}) => {
  const { user, signOut } = useAuth();
  const { unreadCount } = useNotifications();
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    const themes: ('light' | 'dark' | 'system')[] = ['light', 'dark', 'system'];
    const currentIndex = themes.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themes.length;
    setTheme(themes[nextIndex]);
  };

  return (
    <header className="h-16 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50/80 dark:bg-neutral-950/80 backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-30 transition-all duration-300">
      <div className="flex items-center gap-6">
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleSidebar}
          className="lg:hidden p-2 rounded-xl hover:bg-neutral-200 dark:hover:bg-neutral-800"
          aria-label="Toggle Menu"
        >
          <Menu className="h-5 w-5" />
        </Button>

        <div className="flex flex-col">
          <h1 className="text-lg font-bold text-neutral-900 dark:text-neutral-50 tracking-tight">{title}</h1>
          {breadcrumbs && (
            <Breadcrumbs items={breadcrumbs} className="hidden sm:block" />
          )}
        </div>
      </div>

      <div className="flex items-center gap-4">
        <GlobalSearch />
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleTheme}
          className="p-2 rounded-xl hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-all"
          title={`Switch Theme: ${theme}`}
        >
          {theme === 'light' && <Sun className="h-5 w-5" />}
          {theme === 'dark' && <Moon className="h-5 w-5" />}
          {theme === 'system' && <Laptop className="h-5 w-5" />}
        </Button>
        <Dropdown
          trigger={
            <Button variant="ghost" size="sm" className="relative p-2 rounded-xl hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-all">
              <Bell className="h-5 w-5" />
              {unreadCount > 0 && (
                <span className="absolute top-2 right-2 h-2 w-2 bg-accent-500 rounded-full border-2 border-background" />
              )}
            </Button>
          }
          align="right"
        >
          <NotificationPanel />
        </Dropdown>

        <Dropdown
          trigger={
            <div className="flex items-center gap-3 p-1.5 pl-2 rounded-full hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-all cursor-pointer group">
              <Avatar src="" fallback={user?.fullName || 'User'} size="sm" className="ring-2 ring-transparent group-hover:ring-primary-500/20 transition-all" />
              <span className="text-sm font-bold text-neutral-900 dark:text-neutral-100 hidden sm:inline">{user?.fullName?.split(' ')[0]}</span>
            </div>
          }
          align="right"
        >
          <Link href="/profile" className="block">
            <Dropdown.Item leftIcon={<User className="h-4 w-4" />}>Profile</Dropdown.Item>
          </Link>
          <Link href="/settings" className="block">
            <Dropdown.Item leftIcon={<Settings className="h-4 w-4" />}>Settings</Dropdown.Item>
          </Link>
          <Divider variant="subtle" />
          <Dropdown.Item leftIcon={<LogOut className="h-4 w-4" />} onClick={() => signOut()}>Logout</Dropdown.Item>
        </Dropdown>
      </div>
    </header>
  );
};

// Internal helper to avoid circular deps or missing imports in this draft
function Divider({ variant }: { variant: string }) { return <div className="h-px bg-neutral-200 dark:bg-neutral-800 my-1" />; }
