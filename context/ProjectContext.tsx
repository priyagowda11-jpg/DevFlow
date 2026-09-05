'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Project, ProjectTask } from '@/types/project';
import { projectState } from '@/lib/project-state';
import { taskState } from '@/lib/task-state';
import { useAuth } from '@/context/AuthContext';

interface ProjectContextType {
  projects: Project[];
  project: Project | null;
  allTasks: ProjectTask[];
  setProject: (project: Project | null) => void;
  refreshProjects: () => void;
  refreshTasks: () => void;
  updateProject: (projectId: string, updates: Partial<Project>) => Project | null;
  createProject: (data: any) => Project;
  deleteProject: (projectId: string) => void;
  addTask: (projectId: string, taskData: any) => ProjectTask;
  updateTask: (projectId: string, taskId: string, updates: Partial<ProjectTask>) => ProjectTask | null;
  updateTaskStatus: (projectId: string, taskId: string, status: ProjectTask['status']) => void;
  deleteTask: (projectId: string, taskId: string) => void;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export const ProjectProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [project, setProject] = useState<Project | null>(null);
  const [allTasks, setAllTasks] = useState<ProjectTask[]>([]);

  const refreshTasks = useCallback(() => {
    if (user) {
      setAllTasks(taskState.getTasks(user.id));
    }
  }, [user]);

  const refreshProjects = useCallback(() => {
    if (user) {
      setProjects(projectState.getProjects(user.id));
      refreshTasks();
    }
  }, [user, refreshTasks]);

  useEffect(() => {
    refreshProjects();
  }, [refreshProjects]);

  const updateProject = (projectId: string, updates: Partial<Project>) => {
    const updated = projectState.updateProject(projectId, updates);
    refreshProjects();
    if (project?.id === projectId) {
      setProject(projectState.getProject(projectId));
    }
    return updated;
  };

  const createProject = (data: any) => {
    const newProject = projectState.createProject(data);
    refreshProjects();
    return newProject;
  };

  const deleteProject = (projectId: string) => {
    projectState.deleteProject(projectId);
    refreshProjects();
    if (project?.id === projectId) {
      setProject(null);
    }
  };

  const addTask = (projectId: string, taskData: any) => {
    const task = projectState.addTask(projectId, {
      ...taskData,
      description: taskData.description || '',
      tags: taskData.tags || [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    refreshProjects();
    if (project?.id === projectId) {
      setProject(projectState.getProject(projectId));
    }
    return task;
  };

  const updateTask = (projectId: string, taskId: string, updates: Partial<ProjectTask>) => {
    const task = taskState.updateTask(projectId, taskId, updates);
    refreshProjects();
    if (project?.id === projectId) {
      setProject(projectState.getProject(projectId));
    }
    return task;
  };

  const updateTaskStatus = (projectId: string, taskId: string, status: ProjectTask['status']) => {
    projectState.updateTaskStatus(projectId, taskId, status);
    refreshProjects();
    if (project?.id === projectId) {
      setProject(projectState.getProject(projectId));
    }
  };

  const deleteTask = (projectId: string, taskId: string) => {
    taskState.deleteTask(projectId, taskId);
    refreshProjects();
    if (project?.id === projectId) {
      setProject(projectState.getProject(projectId));
    }
  };

  return (
    <ProjectContext.Provider
      value={{
        projects,
        project,
        allTasks,
        setProject,
        refreshProjects,
        refreshTasks,
        updateProject,
        createProject,
        deleteProject,
        addTask,
        updateTask,
        updateTaskStatus,
        deleteTask,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export const useProjects = () => {
  const context = useContext(ProjectContext);
  if (context === undefined) {
    throw new Error('useProjects must be used within a ProjectProvider');
  }
  return context;
};
