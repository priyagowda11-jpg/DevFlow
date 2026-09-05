import {
  Certificate,
  Achievement,
  LeaderboardEntry,
  Student
} from '@/types';
import { MOCK_CERTIFICATES } from '@/data/certificate-data';
import { MOCK_ACHIEVEMENTS } from '@/data/achievement-data';
import { MOCK_LEADERBOARD, MOCK_LEADERBOARD_MONTH, MOCK_LEADERBOARD_WEEK } from '@/data/leaderboard-data';
import { projectState } from '@/lib/project-state';

export const gamificationState = {
  /**
   * Calculate total points for a student
   */
  calculatePoints(userId: string): number {
    const projects = projectState.getProjects(userId);
    const certificates = MOCK_CERTIFICATES.filter(c => c.studentId === userId);

    let points = 0;

    // Project points: 100 per project
    points += projects.length * 100;

    // Task points: 10 per completed task
    projects.forEach(p => {
      const completedTasks = p.tasks.filter(t => t.status === 'Done').length;
      points += completedTasks * 10;
    });

    // Certificate points: 150 per certificate
    points += certificates.length * 150;

    // Achievement points: 50 per unlocked achievement
    const unlockedCount = this.checkAchievements(userId).filter(a => a.isUnlocked).length;
    points += unlockedCount * 50;

    return points;
  },

  /**
   * Evaluate achievement progress and unlock status
   */
  checkAchievements(userId: string): Achievement[] {
    const projects = projectState.getProjects(userId);
    const totalTasks = projects.flatMap(p => p.tasks);
    const completedTasks = totalTasks.filter(t => t.status === 'Done').length;
    const completedProjects = projects.filter(p => p.status === 'Completed').length;

    return MOCK_ACHIEVEMENTS.map(ach => {
      let isUnlocked = false;
      let progress = 0;

      switch (ach.id) {
        case 'ach-1': // First Project
          isUnlocked = projects.length >= 1;
          progress = isUnlocked ? 100 : 0;
          break;
        case 'ach-2': // Task Master (25 tasks)
          progress = Math.min(Math.round((completedTasks / 25) * 100), 100);
          isUnlocked = completedTasks >= 25;
          break;
        case 'ach-3': // Consistent Builder (Mocked for now as we don't have a daily log)
          progress = 42;
          isUnlocked = false;
          break;
        case 'ach-4': // Project Finisher
          isUnlocked = completedProjects >= 1;
          progress = isUnlocked ? 100 : 0;
          break;
        case 'ach-5': // Productivity Pro (85%+)
          const totalProjectTasks = projects.reduce((sum, p) => sum + p.tasks.length, 0);
          const completionRate = totalProjectTasks === 0 ? 0 : (completedTasks / totalProjectTasks) * 100;
          progress = Math.min(Math.round((completionRate / 85) * 100), 100);
          isUnlocked = completionRate >= 85;
          break;
        case 'ach-6': // Learning Streak (Mocked)
          progress = 40;
          isUnlocked = false;
          break;
        default:
          break;
      }

      return {
        ...ach,
        isUnlocked,
        progress,
        unlockedAt: isUnlocked ? '2026-09-01T10:00:00Z' : undefined
      };
    });
  },

  /**
   * Get the leaderboard for the current filter
   */
  getLeaderboard(filter: 'All' | 'Month' | 'Week'): LeaderboardEntry[] {
    const data = filter === 'All' ? MOCK_LEADERBOARD :
                 filter === 'Month' ? MOCK_LEADERBOARD_MONTH :
                 MOCK_LEADERBOARD_WEEK;
    return [...data].sort((a, b) => b.points - a.points);
  },

  /**
   * Get specific rank for a student
   */
  getStudentRank(userId: string): { rank: number; points: number } | null {
    const board = this.getLeaderboard('All');
    const entry = board.find(e => e.userId === userId);
    if (!entry) return null;
    return { rank: entry.rank, points: entry.points };
  },

  /**
   * Get certificates for a student
   */
  getStudentCertificates(userId: string): Certificate[] {
    return MOCK_CERTIFICATES.filter(c => c.studentId === userId);
  }
};
