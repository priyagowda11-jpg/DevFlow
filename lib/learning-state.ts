import { Course, UserCourseProgress } from '@/types';

const STORAGE_KEY = 'devflow_learning_progress';

export const learningState = {
  /**
   * Get all user progress records
   */
  getProgress(): UserCourseProgress[] {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  },

  /**
   * Get progress for a specific course
   */
  getCourseProgress(courseId: string): UserCourseProgress | null {
    const progress = this.getProgress();
    return progress.find(p => p.courseId === courseId) || null;
  },

  /**
   * Enroll the user in a course
   */
  enrollInCourse(courseId: string): void {
    const progress = this.getProgress();
    if (!progress.some(p => p.courseId === courseId)) {
      const newProgress: UserCourseProgress = {
        courseId,
        completedLessons: [],
        lastAccessedLessonId: null,
        enrolledDate: new Date().toISOString(),
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify([...progress, newProgress]));
    }
  },

  /**
   * Mark a lesson as complete
   */
  markLessonComplete(courseId: string, lessonId: string): void {
    const progress = this.getProgress();
    const index = progress.findIndex(p => p.courseId === courseId);

    if (index === -1) {
      this.enrollInCourse(courseId);
    }

    const courseProgress = progress[index] || {
      courseId,
      completedLessons: [],
      lastAccessedLessonId: null,
      enrolledDate: new Date().toISOString(),
    };

    if (!courseProgress.completedLessons.includes(lessonId)) {
      const updatedCompleted = [...courseProgress.completedLessons, lessonId];
      const updatedProgress = { ...courseProgress, completedLessons: updatedCompleted };

      const newProgressList = index === -1
        ? [...progress, updatedProgress]
        : progress.map((p, i) => i === index ? updatedProgress : p);

      localStorage.setItem(STORAGE_KEY, JSON.stringify(newProgressList));
    }
  },

  /**
   * Set the last accessed lesson
   */
  setLastAccessedLesson(courseId: string, lessonId: string): void {
    const progress = this.getProgress();
    const index = progress.findIndex(p => p.courseId === courseId);

    if (index === -1) {
      this.enrollInCourse(courseId);
    }

    const courseProgress = progress[index] || {
      courseId,
      completedLessons: [],
      lastAccessedLessonId: null,
      enrolledDate: new Date().toISOString(),
    };

    const updatedProgress = { ...courseProgress, lastAccessedLessonId: lessonId };
    const newProgressList = index === -1
      ? [...progress, updatedProgress]
      : progress.map((p, i) => i === index ? updatedProgress : p);

    localStorage.setItem(STORAGE_KEY, JSON.stringify(newProgressList));
  },

  /**
   * Calculate progress percentage for a course
   */
  calculateCourseProgress(courseId: string, totalLessons: number): number {
    const progress = this.getCourseProgress(courseId);
    if (!progress) return 0;
    return Math.round((progress.completedLessons.length / totalLessons) * 100);
  },

  /**
   * Get the next incomplete lesson ID for a course
   */
  getCurrentLesson(courseId: string, course: any): string | null {
    const progress = this.getCourseProgress(courseId);
    if (!progress) return course.modules[0]?.lessons[0]?.id || null;

    // Search all modules for first incomplete lesson
    for (const module of course.modules) {
      for (const lesson of module.lessons) {
        if (!progress.completedLessons.includes(lesson.id)) {
          return lesson.id;
        }
      }
    }
    return null; // All completed
  },
};
