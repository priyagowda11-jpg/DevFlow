import React from 'react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/Badge';
import { Notification } from '@/types';
import { Trophy, Award, TrendingUp, Bell, BookOpen, FolderKanban } from 'lucide-react';
import Link from 'next/link';

interface NotificationItemProps {
  notification: Notification;
  onMarkRead: (id: string) => void;
}

export const NotificationItem = ({ notification, onMarkRead }: NotificationItemProps) => {
  const icons = {
    Achievement: <Trophy className="h-4 w-4 text-amber-500" />,
    Course: <BookOpen className="h-4 w-4 text-teal-500" />,
    Project: <FolderKanban className="h-4 w-4 text-primary-500" />,
    Task: <Award className="h-4 w-4 text-emerald-500" />,
    System: <Bell className="h-4 w-4 text-neutral-500" />,
  };

  return (
    <div
      onClick={() => onMarkRead(notification.id)}
      className={cn(
        'p-3 rounded-xl cursor-pointer transition-all hover:bg-neutral-100 dark:hover:bg-neutral-800 flex gap-3 items-start',
        !notification.isRead && 'bg-primary-50/50 dark:bg-primary-900/10 border-l-2 border-primary-500'
      )}
    >
      <div className="mt-1">{icons[notification.type as keyof typeof icons] || icons.System}</div>
      <div className="flex-1 space-y-1">
        <div className="flex justify-between items-center">
          <span className={cn(
            'text-xs font-bold',
            !notification.isRead ? 'text-neutral-900 dark:text-white' : 'text-neutral-500'
          )}>{notification.title}</span>
          <span className="text-[10px] text-neutral-400">{notification.timestamp.split('T')[0]}</span>
        </div>
        <p className="text-xs text-secondary line-clamp-2">{notification.message}</p>
      </div>
    </div>
  );
};
