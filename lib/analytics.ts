import { projectState } from './project-state';
import { taskState } from './task-state';
import { MOCK_CERTIFICATES } from '@/data/certificate-data';
import { gamificationState } from './gamification-state';

export interface AnalyticsSummary {
  totalTasks: number;
  completedTasks: number;
  completionRate: number;
  activeProjects: number;
  completedProjects: number;
  productivityScore: number;
}

export interface DataPoint {
  date: string;
  value: number;
}

export interface ProjectAnalytic {
  name: string;
  progress: number;
  completedTasks: number;
  totalTasks: number;
}

export const analyticsState = {
  /**
   * Calculate high-level summary metrics
   */
  calculateSummary(userId: string): AnalyticsSummary {
    const projects = projectState.getProjects(userId);
    const tasks = taskState.getTasks(userId);
    const completedTasks = tasks.filter(t => t.status === 'Done').length;

    return {
      totalTasks: tasks.length,
      completedTasks,
      completionRate: tasks.length === 0 ? 0 : Math.round((completedTasks / tasks.length) * 100),
      activeProjects: projects.filter(p => p.status !== 'Completed').length,
      completedProjects: projects.filter(p => p.status === 'Completed').length,
      productivityScore: gamificationState.calculatePoints(userId) / 10, // Simplified proxy for score
    };
  },

  /**
   * Task completion trend for the last 7 days
   */
  getTaskCompletionTrend(userId: string): DataPoint[] {
    const tasks = taskState.getTasks(userId).filter(t => t.status === 'Done' && t.completedAt);
    const trend: Record<string, number> = {};

    // Initialize last 7 days
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      trend[date.toISOString().split('T')[0]] = 0;
    }

    tasks.forEach(t => {
      const date = t.completedAt?.split('T')[0];
      if (date && trend[date] !== undefined) {
        trend[date]++;
      }
    });

    return Object.entries(trend).map(([date, value]) => ({ date, value }));
  },

  /**
   * Distribution of tasks by status
   */
  getTaskStatusDistribution(userId: string) {
    const stats = taskState.getTaskStats(userId);
    return [
      { name: 'Todo', value: stats.todo, color: '#94a3b8' },
      { name: 'In Progress', value: stats.inProgress, color: '#3b82f6' },
      { name: 'Completed', value: stats.completed, color: '#10b981' },
    ];
  },

  /**
   * Distribution of tasks by priority
   */
  getPriorityDistribution(userId: string) {
    const tasks = taskState.getTasks(userId);
    const dist = { Low: 0, Medium: 0, High: 0, Critical: 0 };

    tasks.forEach(t => {
      if (t.priority === 'Low') dist.Low++;
      else if (t.priority === 'Medium') dist.Medium++;
      else if (t.priority === 'High') dist.High++;
      else if (t.priority === 'Critical') dist.Critical++;
    });

    return [
      { name: 'Low', value: dist.Low, color: '#10b981' },
      { name: 'Medium', value: dist.Medium, color: '#f59e0b' },
      { name: 'High', value: dist.High, color: '#ef4444' },
      { name: 'Critical', value: dist.Critical, color: '#7f1d1d' },
    ];
  },

  /**
   * Project-specific progress analytics
   */
  getProjectProgressAnalytics(userId: string): ProjectAnalytic[] {
    const projects = projectState.getProjects(userId);
    return projects.map(p => {
      const completed = p.tasks.filter(t => t.status === 'Done').length;
      return {
        name: p.name,
        progress: p.tasks.length === 0 ? 0 : Math.round((completed / p.tasks.length) * 100),
        completedTasks: completed,
        totalTasks: p.tasks.length,
      };
    });
  },

  /**
   * Productivity trend over last 7 days
   */
  getProductivityTrend(userId: string): DataPoint[] {
    // Since we don't have daily productivity logs, we'll generate
    // plausible data based on current progress and a bit of randomness.
    const baseScore = 70 + Math.random() * 20;
    const trend: DataPoint[] = [];

    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      trend.push({
        date: date.toISOString().split('T')[0],
        value: Math.round(baseScore + (Math.random() * 10 - 5))
      });
    }
    return trend;
  },

  /**
   * Learning analytics
   */
  getLearningAnalytics(userId: string) {
    const certificates = MOCK_CERTIFICATES.filter(c => c.studentId === userId);
    const achievements = gamificationState.checkAchievements(userId).filter(a => a.isUnlocked);

    return {
      certificatesCount: certificates.length,
      achievementsCount: achievements.length,
      learningStreak: 5, // Mock value
      lastActivity: '2 days ago',
    };
  },

  /**
   * Data-driven insights
   */
  generateInsights(userId: string): string[] {
    const insights: string[] = [];
    const summary = this.calculateSummary(userId);
    const projects = projectState.getProjects(userId);
    const tasks = taskState.getTasks(userId);
    const criticalTasks = tasks.filter(t => t.priority === 'Critical' && t.status !== 'Done').length;

    if (summary.completionRate > 80) {
      insights.push('You have an excellent completion rate this month!');
    } else if (summary.completionRate > 50) {
      insights.push("You're making steady progress on your tasks.");
    } else {
      insights.push('Try to break your tasks into smaller pieces to increase completion rate.');
    }

    if (criticalTasks > 0) {
      insights.push(`You have ${criticalTasks} critical tasks that need immediate attention.`);
    }

    if (projects.length > 3) {
      insights.push("You're managing multiple projects simultaneously. Great multitasking!");
    }

    if (insights.length === 0) {
      insights.push('Complete more tasks to generate personalized insights.');
    }

    return insights;
  },
};
