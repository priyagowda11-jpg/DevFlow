import { Student, AuthSession, UserRole } from '@/types';
import { storage } from '@/lib/storage';
import { MOCK_USERS } from '@/data/user-data';

export const authService = {
  /**
   * Register a new student
   */
  async register(studentData: Omit<Student, 'id' | 'createdAt'>): Promise<Student> {
    await new Promise((resolve) => setTimeout(resolve, 800));

    const students = storage.getStudents();
    if (students.some((s) => s.email === studentData.email)) {
      throw new Error('A student with this email already exists.');
    }

    const newStudent: Student = {
      ...studentData,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      points: 0,
      rank: students.length + 1,
    };

    storage.saveStudents([...students, newStudent]);
    return newStudent;
  },

  /**
   * Authenticate a student
   */
  async login(email: string, password: string): Promise<{ student: Student; session: AuthSession }> {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const students = storage.getStudents();
    const student = students.find((s) => s.email === email && s.password === password);

    if (!student) {
      throw new Error('Invalid email or password.');
    }

    const session: AuthSession = {
      userId: student.id,
      role: 'STUDENT',
      token: crypto.randomUUID(),
      expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7).toISOString(),
    };

    storage.setSession(session);
    return { student, session };
  },

  /**
   * Authenticate an admin
   */
  async loginAdmin(email: string, password: string): Promise<{ session: AuthSession }> {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Demo Admin Account
    if (email === 'admin@devflow.com' && password === 'admin123') {
      const session: AuthSession = {
        userId: 'admin-id',
        role: 'ADMIN',
        token: crypto.randomUUID(),
        expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7).toISOString(),
      };
      storage.setAdminSession(session);
      return { session };
    }

    throw new Error('Invalid admin credentials.');
  },

  /**
   * Clear student session
   */
  async logout(): Promise<void> {
    storage.clearSession();
  },

  /**
   * Clear admin session
   */
  async logoutAdmin(): Promise<void> {
    storage.clearAdminSession();
  },

  /**
   * Check if a session is still valid
   */
  async isSessionValid(session: AuthSession): Promise<boolean> {
    if (!session) return false;
    return new Date(session.expiresAt) > new Date();
  },

  async getCurrentUser(): Promise<Student | null> {
    const session = storage.getSession();
    if (!session) return null;

    const student = storage.getStudentById(session.userId);
    if (!student) {
      this.logout();
      return null;
    }

    return student;
  },

  /**
   * Update student profile
   */
  async updateProfile(id: string, updates: Partial<Student>): Promise<Student> {
    await new Promise((resolve) => setTimeout(resolve, 600));
    const updated = storage.updateStudent(id, updates);
    if (!updated) throw new Error('Student not found.');
    return updated;
  },
};
