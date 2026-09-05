export interface Notification {
  id: string;
  type: 'achievement' | 'certificate' | 'leaderboard' | 'system';
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  actionUrl?: string;
}
