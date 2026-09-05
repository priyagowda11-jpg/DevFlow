import React from 'react';
import { useNotifications } from '@/context/NotificationContext';
import { NotificationItem } from './NotificationItem';
import { Button } from '@/components/ui/Button';
import { BellOff } from 'lucide-react';
import { cn } from '@/lib/utils';

export const NotificationPanel = () => {
  const { notifications, filter, setFilter, markAsRead, markAllAsRead, clearNotifications, unreadCount } = useNotifications();

  const filteredNotifications = filter === 'All'
    ? notifications
    : notifications.filter(n => !n.isRead);

  return (
    <div className="w-80 max-h-[500px] flex flex-col bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-xl overflow-hidden">
      <div className="p-4 border-b border-neutral-200 dark:border-neutral-800 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-sm">Notifications</h3>
            <Badge variant="project" className="text-[10px]">{unreadCount}</Badge>
          </div>
          <Button variant="ghost" size="sm" className="text-[10px] h-7 px-2" onClick={markAllAsRead}>
            Mark all as read
          </Button>
        </div>
        <div className="flex gap-2">
          {(['All', 'Unread'] as const).map(f => (
            <Button
              key={f}
              variant={filter === f ? 'primary' : 'outline'}
              size="sm"
              className="text-[10px] py-1 px-3 flex-1"
              onClick={() => setFilter(f)}
            >
              {f}
            </Button>
          ))}
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-2 space-y-1">
        {filteredNotifications.length === 0 ? (
          <div className="p-8 text-center space-y-3">
            <BellOff className="h-8 w-8 text-neutral-300 mx-auto" />
            <p className="text-xs text-secondary">{filter === 'Unread' ? "You're all caught up!" : 'No notifications yet.'}</p>
          </div>
        ) : (
          filteredNotifications.map(n => (
            <NotificationItem key={n.id} notification={n} onMarkRead={markAsRead} />
          ))
        )}
      </div>
      {notifications.length > 0 && (
        <div className="p-3 border-t border-neutral-200 dark:border-neutral-800 text-center">
          <Button variant="ghost" size="sm" className="w-full text-xs text-secondary" onClick={clearNotifications}>
            Clear All
          </Button>
        </div>
      )}
    </div>
  );
};

// Added Badge helper to avoid import issues if not available
function Badge({ children, variant = 'default', className = '' }: { children: React.ReactNode, variant?: string, className?: string }) {
  return (
    <span className={cn(
      'text-[10px] font-bold uppercase px-2 py-0.5 rounded-full',
      variant === 'project' ? 'bg-primary-100 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400' : 'bg-neutral-100 text-neutral-600',
      className
    )}>
      {children}
    </span>
  );
}
