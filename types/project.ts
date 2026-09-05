export type ProjectStatus = 'Active' | 'Completed' | 'On Hold';
export type ProjectPriority = 'Low' | 'Medium' | 'High' | 'Critical';

export interface ProjectTask {
  id: string;
  projectId: string;
  title: string;
  description: string;
  status: 'Todo' | 'In Progress' | 'Done';
  priority: ProjectPriority;
  dueDate?: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  completedAt?: string;
}

export interface ProjectActivity {
  id: string;
  projectId: string;
  action: string;
  timestamp: string;
  user: string;
}

export interface Project {
  id: string;
  ownerId: string;
  name: string;
  description: string;
  status: ProjectStatus;
  priority: ProjectPriority;
  deadline: string;
  technologies: string[];
  repositoryUrl?: string;
  demoUrl?: string;
  tasks: ProjectTask[];
  activity: ProjectActivity[];
  createdAt: string;
  updatedAt: string;
}

export interface ProjectFormData {
  name: string;
  description: string;
  status: ProjectStatus;
  priority: ProjectPriority;
  deadline: string;
  technologies: string;
  repositoryUrl?: string;
  demoUrl?: string;
}
