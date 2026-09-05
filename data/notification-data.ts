import { Notification } from '@/types/notification';

export const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: 'notif-1',
    type: 'achievement',
    title: 'Achievement Unlocked!',
    message: 'You have earned the "Task Master" achievement for completing 25 tasks.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    isRead: false,
    actionUrl: '/achievements',
  },
  {
    id: 'notif-2',
    type: 'certificate',
    title: 'New Certificate Issued',
    message: 'Your "React & TypeScript" certificate is now available for download.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    isRead: true,
    actionUrl: '/certificates',
  },
  {
    id: 'notif-3',
    type: 'leaderboard',
    title: 'Rank Increased!',
    message: 'You have moved up to rank #2 on the global leaderboard.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
    isRead: false,
    actionUrl: '/leaderboard',
  },
  {
    id: 'notif-4',
    type: 'system',
    title: 'System Update',
    message: 'New productivity tracking features have been added to your dashboard.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(),
    isRead: true,
    actionUrl: '/dashboard',
  },
];
