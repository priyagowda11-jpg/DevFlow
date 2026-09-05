import { LeaderboardEntry } from '@/types';

export const MOCK_LEADERBOARD: LeaderboardEntry[] = [
  { rank: 1, userName: 'Aarav', userId: 'user-ext-1', projectIdCount: 12, taskCount: 148, productivityScore: 94, points: 1840 },
  { rank: 2, userName: 'Priya G', userId: 'user-1', projectIdCount: 5, taskCount: 22, productivityScore: 87, points: 1620 },
  { rank: 3, userName: 'Meera', userId: 'user-ext-2', projectIdCount: 8, taskCount: 119, productivityScore: 84, points: 1540 },
  { rank: 4, userName: 'Rahul', userId: 'user-ext-3', projectIdCount: 6, taskCount: 95, productivityScore: 81, points: 1320 },
  { rank: 5, userName: 'Sanya', userId: 'user-ext-4', projectIdCount: 4, taskCount: 72, productivityScore: 78, points: 1100 },
];

export const MOCK_LEADERBOARD_MONTH: LeaderboardEntry[] = [
  { rank: 1, userName: 'Meera', userId: 'user-ext-2', projectIdCount: 2, taskCount: 45, productivityScore: 91, points: 620 },
  { rank: 2, userName: 'Priya G', userId: 'user-1', projectIdCount: 1, taskCount: 12, productivityScore: 88, points: 540 },
  { rank: 3, userName: 'Aarav', userId: 'user-ext-1', projectIdCount: 3, taskCount: 38, productivityScore: 85, points: 480 },
  { rank: 4, userName: 'Sanya', userId: 'user-ext-4', projectIdCount: 1, taskCount: 15, productivityScore: 80, points: 320 },
  { rank: 5, userName: 'Rahul', userId: 'user-ext-3', projectIdCount: 1, taskCount: 10, productivityScore: 75, points: 210 },
];

export const MOCK_LEADERBOARD_WEEK: LeaderboardEntry[] = [
  { rank: 1, userName: 'Priya G', userId: 'user-1', projectIdCount: 1, taskCount: 8, productivityScore: 95, points: 180 },
  { rank: 2, userName: 'Rahul', userId: 'user-ext-3', projectIdCount: 1, taskCount: 7, productivityScore: 89, points: 150 },
  { rank: 3, userName: 'Sanya', userId: 'user-ext-4', projectIdCount: 1, taskCount: 6, productivityScore: 82, points: 120 },
  { rank: 4, userName: 'Meera', userId: 'user-ext-2', projectIdCount: 1, taskCount: 5, productivityScore: 80, points: 100 },
  { rank: 5, userName: 'Aarav', userId: 'user-ext-1', projectIdCount: 1, taskCount: 4, productivityScore: 78, points: 80 },
];
