'use client';

import React, { useState, useEffect } from 'react';
import { Modal } from '@/components/ui/Modal';
import { ProjectForm } from './ProjectForm';
import { storage } from '@/lib/storage';
import { Project } from '@/types';

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId?: string;
  projectId?: string;
}

export const ProjectModal = ({ isOpen, onClose, userId, projectId }: ProjectModalProps) => {
  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (projectId) {
      const p = storage.getProjects().find(proj => proj.id === projectId);
      setProject(p || null);
    } else {
      setProject(null);
    }
  }, [projectId]);

  const handleSubmit = (data: Partial<Project>) => {
    setIsLoading(true);
    try {
      if (projectId) {
        storage.updateProject(projectId, data);
      } else if (userId) {
        const newProject: Project = {
          id: crypto.randomUUID(),
          ownerId: userId,
          name: data.name || 'Untitled Project',
          description: data.description || '',
          stack: data.stack || [],
          technologies: data.stack || [],
          deadline: data.deadline || new Date().toISOString(),
          priority: (data.priority as any) || 'Medium',
          status: (data.status as any) || 'Active',
          githubUrl: data.githubUrl,
          liveUrl: data.liveUrl,
          tags: data.tags || [],
          tasks: [],
          activity: [],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        storage.addProject(newProject);
      }
      onClose();
    } catch (error) {
      console.error('Failed to save project:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={projectId ? 'Edit Project' : 'Create New Project'}
    >
      <div className="max-w-2xl mx-auto">
        <ProjectForm
          initialData={project || undefined}
          onSubmit={handleSubmit}
          onCancel={onClose}
        />
      </div>
    </Modal>
  );
};
