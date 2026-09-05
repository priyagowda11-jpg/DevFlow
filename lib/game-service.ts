import { ProjectTask, UserCourseProgress, Achievement, Course, Module } from '@/types';
import { COURSES } from '@/data/course-data';

export const GameService = {
  /**
   * Awards points to a student and checks for achievement unlocks
   */
  async awardPoints(studentId: string, points: number, reason: string) {
    const storage = require('@/lib/storage').storage;
    const student = storage.getStudentById(studentId);
    if (!student) return;

    const newPoints = student.points + points;
    storage.updateStudent(studentId, { points: newPoints });

    // Trigger notification
    storage.addNotification({
      id: crypto.randomUUID(),
      studentId,
      title: 'Points Earned!',
      message: `You earned ${points} points for ${reason}.`,
      type: 'System',
      isRead: false,
      createdAt: new Date().toISOString(),
      timestamp: new Date().toISOString()
    });

    await this.checkAchievements(studentId);
  },

  /**
   * Checks and unlocks achievements based on student activity
   */
  async checkAchievements(studentId: string) {
    const storage = require('@/lib/storage').storage;
    const student = storage.getStudentById(studentId);
    if (!student) return;

    const projects = storage.getStudentProjects(studentId);
    const tasks = storage.getStudentTasks(studentId);
    const completedTasks = tasks.filter((t: ProjectTask) => t.status === 'Done').length;
    const courseProgress = storage.getStudentCourseProgress(studentId);
    const completedCourses = courseProgress.filter((p: UserCourseProgress) => {
      const course = COURSES.find((c: Course) => c.id === p.courseId);
      const totalLessons = course?.modules.reduce((acc: number, m: Module) => acc + m.lessons.length, 0) || 0;
      return p.completedLessons.length === totalLessons && totalLessons > 0;
    }).length;
    const completedLessons = courseProgress.reduce((acc: number, p: UserCourseProgress) => acc + p.completedLessons.length, 0);

    const achievementDefinitions = [
      {
        id: 'first-project',
        name: 'First Project',
        description: 'Create your first project',
        requirement: () => projects.length >= 1,
        points: 50
      },
      {
        id: 'first-task',
        name: 'First Task',
        description: 'Create your first task',
        requirement: () => tasks.length >= 1,
        points: 20
      },
      {
        id: 'task-master',
        name: 'Task Master',
        description: 'Complete 10 tasks',
        requirement: () => completedTasks >= 10,
        points: 100
      },
      {
        id: 'project-builder',
        name: 'Project Builder',
        description: 'Create 3 projects',
        requirement: () => projects.length >= 3,
        points: 150
      },
      {
        id: 'learning-starter',
        name: 'Learning Starter',
        description: 'Enroll in your first course',
        requirement: () => courseProgress.length >= 1,
        points: 30
      },
      {
        id: 'course-explorer',
        name: 'Course Explorer',
        description: 'Complete your first lesson',
        requirement: () => completedLessons >= 1,
        points: 40
      },
      {
        id: 'course-finisher',
        name: 'Course Finisher',
        description: 'Complete an entire course',
        requirement: () => completedCourses >= 1,
        points: 200
      },
      {
        id: 'productive-student',
        name: 'Productive Student',
        description: 'Complete 25 tasks',
        requirement: () => completedTasks >= 25,
        points: 300
      },
      {
        id: 'consistent-learner',
        name: 'Consistent Learner',
        description: 'Complete 10 lessons',
        requirement: () => completedLessons >= 10,
        points: 150
      }
    ];

    const studentAchievements = storage.getStudentAchievements(studentId);
    const unlockedIds = studentAchievements.filter((a: Achievement) => a.isUnlocked).map((a: Achievement) => a.id);

    for (const def of achievementDefinitions) {
      if (!unlockedIds.includes(def.id) && def.requirement()) {
        storage.updateStudentAchievement(studentId, def.id, {
          id: def.id,
          name: def.name,
          description: def.description,
          requirement: def.description,
          isUnlocked: true,
          unlockedAt: new Date().toISOString(),
          progress: 100
        });

        // Trigger notification
        storage.addNotification({
          id: crypto.randomUUID(),
          studentId,
          title: 'Achievement Unlocked!',
          message: `Congratulations! You've unlocked the ${def.name} achievement.`,
          type: 'Achievement',
          isRead: false,
          createdAt: new Date().toISOString(),
          timestamp: new Date().toISOString()
        });

        // Award bonus points for achievement
        storage.updateStudent(studentId, {
          points: (storage.getStudentById(studentId)?.points || 0) + def.points
        });
      }
    }
  }
};
