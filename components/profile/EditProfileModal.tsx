'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { storage } from '@/lib/storage';
import { X, Save } from 'lucide-react';
import { cn } from '@/lib/utils';

interface EditProfileModalProps {
  student: any;
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
}

export function EditProfileModal({ student, isOpen, onClose, onSave }: EditProfileModalProps) {
  const [formData, setFormData] = useState({
    fullName: student.fullName,
    collegeName: student.collegeName,
    branch: student.branch,
    semester: student.semester,
    bio: student.bio || '',
  });

  if (!isOpen) return null;

  const handleSave = () => {
    storage.updateStudent(student.id, formData);
    onSave();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <Card variant="elevated" className="w-full max-w-md p-6 space-y-6 border-neutral-200 dark:border-neutral-800 animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-neutral-900 dark:text-white">Edit Profile</h3>
          <Button variant="ghost" size="sm" className="p-1 h-8 w-8" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase text-neutral-400">Full Name</label>
            <Input
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              placeholder="John Doe"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase text-neutral-400">College/University</label>
            <Input
              value={formData.collegeName}
              onChange={(e) => setFormData({ ...formData, collegeName: e.target.value })}
              placeholder="University of Technology"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase text-neutral-400">Branch</label>
              <Input
                value={formData.branch}
                onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                placeholder="Computer Science"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase text-neutral-400">Semester</label>
              <Input
                value={formData.semester}
                onChange={(e) => setFormData({ ...formData, semester: e.target.value })}
                placeholder="4th"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase text-neutral-400">Bio</label>
            <textarea
              className="w-full p-3 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 text-sm outline-none focus:ring-2 focus:ring-primary-500 transition-all min-h-[100px]"
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              placeholder="Tell us about yourself..."
            />
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-4">
          <Button variant="ghost" size="sm" onClick={onClose}>Cancel</Button>
          <Button className="gap-2" onClick={handleSave}>
            <Save className="h-4 w-4" /> Save Changes
          </Button>
        </div>
      </Card>
    </div>
  );
}
