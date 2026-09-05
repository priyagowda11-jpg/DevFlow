export type UserRole = 'STUDENT' | 'ADMIN';

export interface Student {
  id: string;
  fullName: string;
  email: string;
  password?: string;
  avatar?: string;
  collegeName: string;
  branch: string;
  semester: string;
  phone: string;
  bio?: string;
  skills: string[];
  createdAt: string;
  points: number;
  rank: number;
  preferences?: {
    notificationsEnabled: boolean;
    emailNotifications: boolean;
  };
}

export interface AuthSession {
  userId: string;
  role: UserRole;
  token: string;
  expiresAt: string;
}

export interface Project {
  id: string;
  ownerId: string;
  name: string;
  description: string;
  status: 'Active' | 'Completed' | 'On Hold';
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  deadline: string;
  technologies: string[];
  stack?: string[];
  repositoryUrl?: string;
  githubUrl?: string;
  demoUrl?: string;
  liveUrl?: string;
  tags?: string[];
  tasks: ProjectTask[];
  activity: ProjectActivity[];
  createdAt: string;
  updatedAt: string;
}

export interface ProjectTask {
  id: string;
  projectId: string;
  ownerId: string;
  title: string;
  description: string;
  status: 'Todo' | 'In Progress' | 'Done';
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  dueDate?: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  completedAt?: string;
}

export type Task = ProjectTask;

export interface ProjectActivity {
  id: string;
  projectId: string;
  action: string;
  timestamp: string;
  user: string;
}

export interface Notification {
  id: string;
  studentId: string;
  title: string;
  message: string;
  type: 'Task' | 'Project' | 'Course' | 'Achievement' | 'System';
  isRead: boolean;
  createdAt: string;
  timestamp: string;
}

export interface Certificate {
  id: string;
  title: string;
  description: string;
  studentId: string;
  issueDate: string;
  certificateId: string;
  skills: string[];
  status: 'Issued' | 'Pending';
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  requirement: string;
  isUnlocked: boolean;
  unlockedAt?: string;
  progress: number; // Percentage 0-100
}

export interface LeaderboardEntry {
  rank: number;
  userName: string;
  userId: string;
  projectIdCount: number;
  taskCount: number;
  productivityScore: number;
  points: number;
}

export interface Lesson {
  id: string;
  title: string;
  content: string;
  codeExamples: {
    title: string;
    language: string;
    code: string;
  }[];
  keyPoints: string[];
  duration: string;
  notesPdfUrl?: string;
}

export interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
}

export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  category: 'Frontend' | 'Backend' | 'Full Stack' | 'Programming' | 'DevOps' | 'AI';
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  skills: string[];
  modules: Module[];
}

export interface UserCourseProgress {
  courseId: string;
  completedLessons: string[];
  lastAccessedLessonId: string | null;
  enrolledDate: string;
}

export interface LearningState {
  progress: Record<string, UserCourseProgress>;
}
