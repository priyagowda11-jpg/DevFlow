import { ProjectTask, ProjectPriority } from '@/types/project';
import { projectState } from './project-state';

export type TaskStatus = ProjectTask['status'];
export type TaskPriority = ProjectPriority;

export const taskState = {
  /**
   * Get all tasks across all projects for a specific user
   */
  getTasks(userId: string): ProjectTask[] {
    const projects = projectState.getProjects(userId);
    return projects.flatMap(p => p.tasks);
  },

  /**
   * Find a specific task and the project it belongs to
   */
  getTaskById(taskId: string): { task: ProjectTask; project: any } | null {
    const projects = projectState.getProjects(''); // ownerId not needed for finding by ID if we trust ID uniqueness
    for (const project of projects) {
      const task = project.tasks.find(t => t.id === taskId);
      if (task) return { task, project };
    }
    return null;
  },

  /**
   * Create a new task within a project
   */
  createTask(projectId: string, taskData: Omit<ProjectTask, 'id' | 'projectId'>): ProjectTask {
    return projectState.addTask(projectId, taskData);
  },

  /**
   * Update a task's details
   */
  updateTask(projectId: string, taskId: string, updates: Partial<ProjectTask>): ProjectTask | null {
    const project = projectState.getProject(projectId);
    if (!project) return null;

    const taskIndex = project.tasks.findIndex(t => t.id === taskId);
    if (taskIndex === -1) return null;

    const updatedTask = {
      ...project.tasks[taskIndex],
      ...updates,
      updatedAt: new Date().toISOString()
    };

    const updatedTasks = [...project.tasks];
    updatedTasks[taskIndex] = updatedTask;

    projectState.updateProject(projectId, { tasks: updatedTasks });

    // Add to activity
    projectState.addActivity(projectId, `Updated task "${updatedTask.title}"`);

    return updatedTask;
  },

  /**
   * Delete a task from a project
   */
  deleteTask(projectId: string, taskId: string): void {
    const project = projectState.getProject(projectId);
    if (!project) return;

    const updatedTasks = project.tasks.filter(t => t.id !== taskId);
    projectState.updateProject(projectId, { tasks: updatedTasks });

    // Add to activity
    projectState.addActivity(projectId, `Deleted task`);
  },

  /**
   * Update only the status of a task
   */
  updateTaskStatus(projectId: string, taskId: string, status: TaskStatus): void {
    projectState.updateTaskStatus(projectId, taskId, status);
  },

  /**
   * Calculate aggregate task statistics for a user
   */
  getTaskStats(userId: string) {
    const tasks = this.getTasks(userId);
    return {
      total: tasks.length,
      todo: tasks.filter(t => t.status === 'Todo').length,
      inProgress: tasks.filter(t => t.status === 'In Progress').length,
      completed: tasks.filter(t => t.status === 'Done').length,
    };
  }
};
