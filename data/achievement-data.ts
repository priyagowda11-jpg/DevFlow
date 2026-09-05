import { Achievement } from '@/types';

export const MOCK_ACHIEVEMENTS: Achievement[] = [
  {
    id: 'ach-1',
    name: '🚀 First Project',
    description: 'Created your first project.',
    requirement: 'Create at least 1 project',
    isUnlocked: true,
    unlockedAt: '2026-01-15T10:00:00Z',
    progress: 100,
  },
  {
    id: 'ach-2',
    name: '✅ Task Master',
    description: 'Completed 25 tasks.',
    requirement: 'Complete 25 tasks across any projects',
    isUnlocked: false,
    progress: 18, // 18/25 = 72%
  },
  {
    id: 'ach-3',
    name: '🔥 Consistent Builder',
    description: 'Worked on projects for 7 consecutive days.',
    requirement: 'Update projects for 7 days in a row',
    isUnlocked: false,
    progress: 3, // 3/7 days
  },
  {
    id: 'ach-4',
    name: '🏆 Project Finisher',
    description: 'Completed your first project.',
    requirement: 'Mark a project as "Completed"',
    isUnlocked: true,
    unlockedAt: '2026-04-11T09:00:00Z',
    progress: 100,
  },
  {
    id: 'ach-5',
    name: '⚡ Productivity Pro',
    description: 'Reached a productivity score of 85+.',
    requirement: 'Maintain an average completion rate of 85% across projects',
    isUnlocked: false,
    progress: 70,
  },
  {
    id: 'ach-6',
    name: '📚 Learning Streak',
    description: 'Completed 5 learning activities.',
    requirement: 'Complete 5 courses or modules',
    isUnlocked: false,
    progress: 2, // 2/5
  },
];
