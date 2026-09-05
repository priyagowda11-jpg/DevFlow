import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { cn } from '@/lib/utils';
import { Avatar } from '@/components/ui/Avatar';
import Link from 'next/link';
import {
  LayoutDashboard,
  BookOpen,
  GraduationCap,
  FolderKanban,
  CheckSquare,
  Award,
  Trophy,
  TrendingUp,
  BarChart3,
  Settings,
  HelpCircle
} from 'lucide-react';
import { NavigationItem } from '@/components/navigation/NavigationItem';

const NAV_CONFIG = [
  {
    section: 'WORKSPACE',
    items: [
      { label: 'Dashboard', href: '/dashboard', icon: <LayoutDashboard className="h-5 w-5" /> },
      { label: 'Projects', href: '/projects', icon: <FolderKanban className="h-5 w-5" /> },
      { label: 'Tasks', href: '/tasks', icon: <CheckSquare className="h-5 w-5" /> },
      { label: 'Analytics', href: '/analytics', icon: <BarChart3 className="h-5 w-5" /> },
    ]
  },
  {
    section: 'LEARNING',
    items: [
      { label: 'Learning', href: '/learning', icon: <BookOpen className="h-5 w-5" /> },
      { label: 'Courses', href: '/courses', icon: <GraduationCap className="h-5 w-5" /> },
      { label: 'Certificates', href: '/certificates', icon: <Award className="h-5 w-5" /> },
      { label: 'Achievements', href: '/achievements', icon: <Trophy className="h-5 w-5" /> },
      { label: 'Leaderboard', href: '/leaderboard', icon: <TrendingUp className="h-5 w-5" /> },
    ]
  },
  {
    section: 'SUPPORT',
    items: [
      { label: 'Settings', href: '/settings', icon: <Settings className="h-5 w-5" /> },
      { label: 'Help', href: '/help', icon: <HelpCircle className="h-5 w-5" /> },
    ]
  }
];

export const Sidebar = ({
  isOpen,
  toggleSidebar,
  onItemClick
}: {
  isOpen: boolean;
  toggleSidebar: () => void;
  onItemClick?: () => void;
}) => {
  const { user } = useAuth();

  return (
    <aside
      className={cn(
        'fixed left-0 top-0 h-screen z-40 transition-all duration-300 border-r border-neutral-200 dark:border-neutral-800',
        'flex flex-col bg-neutral-100 dark:bg-neutral-900',
        isOpen ? 'w-64' : 'w-20',
        'surface-layered'
      )}
    >
      {/* Brand */}
      <div className="p-6 flex items-center gap-3 overflow-hidden">
        <div className="h-8 w-8 bg-primary-500 rounded-lg flex-shrink-0 flex items-center justify-center text-white font-bold">D</div>
        {isOpen && (
          <div className="flex flex-col leading-tight">
            <span className="text-lg font-bold tracking-tight">DevFlow</span>
            <span className="text-[10px] text-secondary uppercase font-semibold">Plan. Build. Ship.</span>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 space-y-8 py-6">
        {NAV_CONFIG.map((section, idx) => (
          <div key={idx} className="space-y-2">
            {isOpen && (
              <span className="px-3 text-[10px] font-bold text-neutral-400 uppercase tracking-wider">
                {section.section}
              </span>
            )}
            <div className="space-y-1">
              {section.items.map((item) => (
                <NavigationItem
                  key={item.href}
                  href={item.href}
                  label={isOpen ? item.label : ''}
                  icon={item.icon}
                  onClick={onItemClick}
                />
              ))}
            </div>
          </div>
        ))}
      </nav>

      {/* User Section */}
      <div className={cn(
        'p-4 border-t border-neutral-200 dark:border-neutral-800 bg-neutral-200/30 dark:bg-neutral-800/30',
        'flex items-center gap-3 overflow-hidden'
      )}>
        <Link href="/profile" className="flex items-center gap-3 p-2 rounded-xl hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-all group">
          <Avatar src="" fallback={user?.fullName || 'User'} size="sm" status="online" className="ring-2 ring-transparent group-hover:ring-primary-500/20 transition-all" />
          {isOpen && (
            <div className="flex flex-col leading-tight truncate">
              <span className="text-sm font-bold truncate text-neutral-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">{user?.fullName || 'Student'}</span>
              <span className="text-[10px] text-secondary truncate font-medium">{user?.branch} • Sem {user?.semester}</span>
            </div>
          )}
        </Link>
      </div>
    </aside>
  );
};
