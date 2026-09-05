import { Project, ProjectTask, ProjectActivity } from '@/types/project';
import { MOCK_PROJECTS } from '@/data/project-data';

const STORAGE_KEY = 'devflow_projects';

export const projectState = {
  /**
   * Get all projects owned by a specific user
   */
  getProjects(userId: string): Project[] {
    const data = localStorage.getItem(STORAGE_KEY);
    const projects: Project[] = data ? JSON.parse(data) : MOCK_PROJECTS;

    // Filter by ownerId to ensure student-specific projects
    return projects.filter(p => p.ownerId === userId);
  },

  /**
   * Get a specific project by ID
   */
  getProject(projectId: string): Project | null {
    const data = localStorage.getItem(STORAGE_KEY);
    const projects: Project[] = data ? JSON.parse(data) : MOCK_PROJECTS;
    return projects.find(p => p.id === projectId) || null;
  },

  /**
   * Create a new project
   */
  createProject(projectData: any): Project {
    const data = localStorage.getItem(STORAGE_KEY);
    const projects: Project[] = data ? JSON.parse(data) : MOCK_PROJECTS;

    const newProject: Project = {
      ...projectData,
      id: `proj-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      tasks: projectData.tasks || [],
      activity: projectData.activity || [],
    };

    const updatedProjects = [...projects, newProject];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedProjects));
    return newProject;
  },

  /**
   * Update an existing project
   */
  updateProject(projectId: string, updates: Partial<Project>): Project | null {
    const data = localStorage.getItem(STORAGE_KEY);
    const projects: Project[] = data ? JSON.parse(data) : MOCK_PROJECTS;

    const index = projects.findIndex(p => p.id === projectId);
    if (index === -1) return null;

    const updatedProject = {
      ...projects[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };

    projects[index] = updatedProject;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
    return updatedProject;
  },

  /**
   * Delete a project
   */
  deleteProject(projectId: string): void {
    const data = localStorage.getItem(STORAGE_KEY);
    const projects: Project[] = data ? JSON.parse(data) : MOCK_PROJECTS;
    const updatedProjects = projects.filter(p => p.id !== projectId);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedProjects));
  },

  /**
   * Calculate project progress based on completed tasks
   */
  calculateProjectProgress(projectId: string): number {
    const project = this.getProject(projectId);
    if (!project || project.tasks.length === 0) return 0;

    const completedTasks = project.tasks.filter(t => t.status === 'Done').length;
    return Math.round((completedTasks / project.tasks.length) * 100);
  },

  /**
   * Add a task to a project
   */
  addTask(projectId: string, taskData: Omit<ProjectTask, 'id' | 'projectId'>): ProjectTask {
    const project = this.getProject(projectId);
    if (!project) throw new Error('Project not found');

    const newTask: ProjectTask = {
      ...taskData,
      id: `task-${Date.now()}`,
      projectId,
    };

    const updatedTasks = [...project.tasks, newTask];
    this.updateProject(projectId, { tasks: updatedTasks });

    // Also add to activity
    this.addActivity(projectId, `Created task "${newTask.title}"`);

    return newTask;
  },

  /**
   * Update task status
   */
  updateTaskStatus(projectId: string, taskId: string, status: ProjectTask['status']): void {
    const project = this.getProject(projectId);
    if (!project) throw new Error('Project not found');

    const updatedTasks = project.tasks.map(t =>
      t.id === taskId ? { ...t, status, completedAt: status === 'Done' ? new Date().toISOString() : undefined } : t
    );

    this.updateProject(projectId, { tasks: updatedTasks });
    this.addActivity(projectId, `Updated task status to ${status}`);
  },

  /**
   * Add activity log to project
   */
  addActivity(projectId: string, action: string): void {
    const project = this.getProject(projectId);
    if (!project) throw new Error('Project not found');

    const newActivity: ProjectActivity = {
      id: `act-${Date.now()}`,
      projectId,
      action,
      timestamp: new Date().toISOString(),
      user: 'Student', // Simplified for local state
    };

    const updatedActivity = [newActivity, ...project.activity];
    this.updateProject(projectId, { activity: updatedActivity });
  }
};
