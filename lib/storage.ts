import { Student, Project, ProjectTask, UserCourseProgress, Certificate, Achievement, Notification, AuthSession } from '@/types';

const KEYS = {
  STUDENTS: 'devflow_students',
  PROJECTS: 'devflow_projects',
  TASKS: 'devflow_tasks',
  COURSE_PROGRESS: 'devflow_course_progress',
  CERTIFICATES: 'devflow_certificates',
  ACHIEVEMENTS: 'devflow_achievements',
  NOTIFICATIONS: 'devflow_notifications',
  SESSION: 'devflow_session',
  ADMIN_SESSION: 'devflow_admin_session',
  SETTINGS: 'devflow_settings',
};


export const storage = {
  // --- Generic Helpers ---
  getItem: <T>(key: string): T | null => {
    if (typeof window === 'undefined') return null;
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  },

  setItem: <T>(key: string, value: T): void => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(key, JSON.stringify(value));
  },

  removeItem: (key: string): void => {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(key);
  },

  // --- Students ---
  getStudents(): Student[] {
    return this.getItem<Student[]>(KEYS.STUDENTS) || [];
  },

  saveStudents(students: Student[]): void {
    this.setItem(KEYS.STUDENTS, students);
  },

  getStudentById(id: string): Student | null {
    return this.getStudents().find(s => s.id === id) || null;
  },

  updateStudent(id: string, updates: Partial<Student>): Student | null {
    const students = this.getStudents();
    const index = students.findIndex(s => s.id === id);
    if (index === -1) return null;

    const updated = { ...students[index], ...updates };
    students[index] = updated;
    this.saveStudents(students);
    return updated;
  },

  // --- Projects ---
  getProjects(): Project[] {
    return this.getItem<Project[]>(KEYS.PROJECTS) || [];
  },

  saveProjects(projects: Project[]): void {
    this.setItem(KEYS.PROJECTS, projects);
  },

  getStudentProjects(studentId: string): Project[] {
    return this.getProjects().filter(p => p.ownerId === studentId);
  },

  addProject(project: Project): void {
    const projects = this.getProjects();
    this.saveProjects([...projects, project]);

    const { GameService } = require('@/lib/game-service');
    GameService.awardPoints(project.ownerId, 20, 'Creating a new project');
  },

  updateProject(id: string, updates: Partial<Project>): void {
    const projects = this.getProjects();
    const index = projects.findIndex(p => p.id === id);
    if (index !== -1) {
      projects[index] = { ...projects[index], ...updates };
      this.saveProjects(projects);
    }
  },

  deleteProject(id: string): void {
    const projects = this.getProjects();
    this.saveProjects(projects.filter(p => p.id !== id));
    // Also delete associated tasks
    const tasks = this.getTasks();
    this.saveTasks(tasks.filter(t => t.projectId !== id));
  },

  calculateProjectProgress(projectId: string): number {
    const tasks = this.getProjectTasks(projectId);
    if (tasks.length === 0) return 0;
    const completed = tasks.filter(t => t.status === 'Done').length;
    return Math.round((completed / tasks.length) * 100);
  },

  // --- Tasks ---
  getTasks(): ProjectTask[] {
    return this.getItem<ProjectTask[]>(KEYS.TASKS) || [];
  },

  saveTasks(tasks: ProjectTask[]): void {
    this.setItem(KEYS.TASKS, tasks);
  },

  getStudentTasks(studentId: string): ProjectTask[] {
    return this.getTasks().filter(t => t.ownerId === studentId);
  },

  getProjectTasks(projectId: string): ProjectTask[] {
    return this.getTasks().filter(t => t.projectId === projectId);
  },

  addTask(task: ProjectTask): void {
    const tasks = this.getTasks();
    this.saveTasks([...tasks, task]);
  },

  updateTask(id: string, updates: Partial<ProjectTask>): void {
    const tasks = this.getTasks();
    const index = tasks.findIndex(t => t.id === id);
    if (index !== -1) {
      tasks[index] = { ...tasks[index], ...updates };
      this.saveTasks(tasks);
    }
  },

  completeTask(taskId: string): void {
    const tasks = this.getTasks();
    const index = tasks.findIndex(t => t.id === taskId);
    if (index !== -1) {
      const task = tasks[index];
      if (task.status !== 'Done') {
        tasks[index] = {
          ...task,
          status: 'Done',
          completedAt: new Date().toISOString()
        };
        this.saveTasks(tasks);

        // Use GameService for points and achievements
        const { GameService } = require('@/lib/game-service');
        GameService.awardPoints(task.ownerId, 10, 'Completing a task');
      }
    }
  },

  // --- Learning & Course Progress ---
  getCourseProgress(): Record<string, UserCourseProgress[]> {
    return this.getItem<Record<string, UserCourseProgress[]>>(KEYS.COURSE_PROGRESS) || {};
  },

  saveCourseProgress(progress: Record<string, UserCourseProgress[]>): void {
    this.setItem(KEYS.COURSE_PROGRESS, progress);
  },

  getStudentCourseProgress(studentId: string): UserCourseProgress[] {
    const allProgress = this.getCourseProgress();
    return allProgress[studentId] || [];
  },

  updateStudentCourseProgress(studentId: string, progress: UserCourseProgress): void {
    const allProgress = this.getCourseProgress();
    const studentProgress = allProgress[studentId] || [];
    const index = studentProgress.findIndex(p => p.courseId === progress.courseId);

    if (index !== -1) {
      studentProgress[index] = progress;
    } else {
      studentProgress.push(progress);
    }

    allProgress[studentId] = studentProgress;
    this.saveCourseProgress(allProgress);

    // Check for course completion and issue certificate
    const course = require('@/data/course-data').COURSES.find((c: any) => c.id === progress.courseId);
    if (course) {
      const totalLessons = course.modules.reduce((acc: number, m: any) => acc + m.lessons.length, 0);
      if (progress.completedLessons.length === totalLessons) {
        this.addCertificate({
          id: crypto.randomUUID(),
          title: `Certification of Completion: ${course.title}`,
          description: `Successfully completed all modules of the ${course.title} course.`,
          studentId,
          issueDate: new Date().toISOString(),
          certificateId: `CERT-${crypto.randomUUID().slice(0, 8).toUpperCase()}`,
          skills: course.skills,
          status: 'Issued'
        });

        const { GameService } = require('@/lib/game-service');
        GameService.awardPoints(studentId, 100, 'Completing a course');
      }
    }
  },

  enrollInCourse(studentId: string, courseId: string): void {
    const allProgress = this.getCourseProgress();
    const studentProgress = allProgress[studentId] || [];

    if (!studentProgress.some(p => p.courseId === courseId)) {
      const newProgress: UserCourseProgress = {
        courseId,
        completedLessons: [],
        lastAccessedLessonId: null,
        enrolledDate: new Date().toISOString(),
      };
      studentProgress.push(newProgress);
      allProgress[studentId] = studentProgress;
      this.saveCourseProgress(allProgress);

      const { GameService } = require('@/lib/game-service');
      GameService.awardPoints(studentId, 10, 'Enrolling in a course');
    }
  },

  // --- Certificates ---
  getCertificates(): Certificate[] {
    return this.getItem<Certificate[]>(KEYS.CERTIFICATES) || [];
  },

  saveCertificates(certs: Certificate[]): void {
    this.setItem(KEYS.CERTIFICATES, certs);
  },

  getStudentCertificates(studentId: string): Certificate[] {
    return this.getCertificates().filter(c => c.studentId === studentId);
  },

  addCertificate(cert: Certificate): void {
    const certs = this.getCertificates();
    this.saveCertificates([...certs, cert]);
  },

  // --- Achievements ---
  getAchievements(): Record<string, Achievement[]> {
    return this.getItem<Record<string, Achievement[]>>(KEYS.ACHIEVEMENTS) || {};
  },

  saveAchievements(achievements: Record<string, Achievement[]>): void {
    this.setItem(KEYS.ACHIEVEMENTS, achievements);
  },

  getStudentAchievements(studentId: string): Achievement[] {
    const all = this.getAchievements();
    return all[studentId] || [];
  },

  updateStudentAchievement(studentId: string, achievementId: string, updates: Partial<Achievement>): void {
    const all = this.getAchievements();
    const studentAch = all[studentId] || [];
    const index = studentAch.findIndex(a => a.id === achievementId);
    if (index !== -1) {
      studentAch[index] = { ...studentAch[index], ...updates };
      all[studentId] = studentAch;
      this.saveAchievements(all);
    }
  },

  // --- Notifications ---
  getNotifications(): Notification[] {
    return this.getItem<Notification[]>(KEYS.NOTIFICATIONS) || [];
  },

  saveNotifications(notifications: Notification[]): void {
    this.setItem(KEYS.NOTIFICATIONS, notifications);
  },

  getStudentNotifications(studentId: string): Notification[] {
    return this.getNotifications().filter(n => n.studentId === studentId);
  },

  addNotification(notification: Notification): void {
    const notifications = this.getNotifications();
    this.saveNotifications([...notifications, notification]);
  },

  markNotificationAsRead(id: string): void {
    const notifications = this.getNotifications();
    const index = notifications.findIndex(n => n.id === id);
    if (index !== -1) {
      notifications[index] = { ...notifications[index], isRead: true };
      this.saveNotifications(notifications);
    }
  },

  markAllNotificationsAsRead(studentId: string): void {
    const notifications = this.getNotifications();
    const updated = notifications.map(n =>
      n.studentId === studentId ? { ...n, isRead: true } : n
    );
    this.saveNotifications(updated);
  },

  // --- Session Management ---
  getSession(): AuthSession | null {
    return this.getItem<AuthSession>(KEYS.SESSION);
  },

  setSession(session: AuthSession): void {
    this.setItem(KEYS.SESSION, session);
  },

  clearSession(): void {
    this.removeItem(KEYS.SESSION);
  },

  getAdminSession(): AuthSession | null {
    return this.getItem<AuthSession>(KEYS.ADMIN_SESSION);
  },

  setAdminSession(session: AuthSession): void {
    this.setItem(KEYS.ADMIN_SESSION, session);
  },

  clearAdminSession(): void {
    this.removeItem(KEYS.ADMIN_SESSION);
  },

  // --- Platform Settings ---
  getSettings(): any {
    return this.getItem('devflow_settings') || {
      platformName: 'DevFlow',
      maintenanceMode: false,
      registrationOpen: true,
      pointsMultiplier: 1,
      defaultCourseId: null,
    };
  },

  saveSettings(settings: any): void {
    this.setItem('devflow_settings', settings);
  },
};
