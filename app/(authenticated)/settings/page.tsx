'use client';

import React, { useState, useEffect } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { User, Bell, Shield, Palette } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';
import { storage } from '@/lib/storage';
import { cn } from '@/lib/utils';

export default function SettingsPage() {
  const { user } = useAuth();
  const { theme, setTheme } = useTheme();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
  });
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  useEffect(() => {
    if (user) {
      const student = storage.getStudentById(user.id);
      if (student) {
        setFormData({
          fullName: student.fullName,
          email: student.email,
        });
        setNotificationsEnabled(student.preferences?.notificationsEnabled ?? true);
      }
    }
  }, [user]);

  const handleSaveProfile = () => {
    if (!user) return;
    storage.updateStudent(user.id, {
      fullName: formData.fullName,
      email: formData.email,
    });
    alert('Profile updated successfully!');
  };

  const handleToggleNotifications = () => {
    if (!user) return;
    const newValue = !notificationsEnabled;
    setNotificationsEnabled(newValue);

    const student = storage.getStudentById(user.id);
    storage.updateStudent(user.id, {
      preferences: {
        notificationsEnabled: newValue,
        emailNotifications: student?.preferences?.emailNotifications ?? true,
      }
    });
  };

  const handleThemeChange = () => {
    const themes: ('light' | 'dark' | 'system')[] = ['light', 'dark', 'system'];
    const currentIndex = themes.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themes.length;
    setTheme(themes[nextIndex]);
  };

  return (
    <PageContainer>
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-12">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-neutral-900 dark:text-white tracking-tight">Settings</h1>
          <p className="text-secondary">Manage your account preferences and platform settings.</p>
        </div>

        <div className="grid grid-cols-1 gap-8">
          {/* Account Settings */}
          <Card variant="elevated" className="p-8 space-y-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400">
                <User className="h-5 w-5" />
              </div>
              <h2 className="text-xl font-bold text-neutral-900 dark:text-white">Account Profile</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Full Name</label>
                <Input
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="John Doe"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Email Address</label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="john@example.com"
                />
              </div>
            </div>
            <div className="flex justify-end pt-4 border-t border-neutral-100 dark:border-neutral-800">
              <Button variant="primary" className="rounded-xl px-6 font-bold" onClick={handleSaveProfile}>Save Changes</Button>
            </div>
          </Card>

          {/* Notifications Settings */}
          <Card variant="elevated" className="p-8 space-y-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-secondary-50 dark:bg-secondary-900/30 text-secondary-600 dark:text-secondary-400">
                <Bell className="h-5 w-5" />
              </div>
              <h2 className="text-xl font-bold text-neutral-900 dark:text-white">Notifications</h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-100 dark:border-neutral-800">
                <div className="space-y-1">
                  <span className="text-sm font-bold text-neutral-900 dark:text-white">Push Notifications</span>
                  <p className="text-xs text-secondary">Get notified about task deadlines and achievement unlocks.</p>
                </div>
                <button
                  onClick={handleToggleNotifications}
                  className={cn(
                    'w-12 h-6 rounded-full transition-all relative',
                    notificationsEnabled ? 'bg-primary-500' : 'bg-neutral-300 dark:bg-neutral-700'
                  )}
                >
                  <div className={cn(
                    'absolute top-1 w-4 h-4 bg-white rounded-full transition-all',
                    notificationsEnabled ? 'left-7' : 'left-1'
                  )} />
                </button>
              </div>
            </div>
          </Card>

          {/* Appearance Settings */}
          <Card variant="elevated" className="p-8 space-y-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-accent-50 dark:bg-accent-900/30 text-accent-600 dark:text-accent-400">
                <Palette className="h-5 w-5" />
              </div>
              <h2 className="text-xl font-bold text-neutral-900 dark:text-white">Appearance</h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-100 dark:border-neutral-800">
                <div className="space-y-1">
                  <span className="text-sm font-bold text-neutral-900 dark:text-white">Theme Mode</span>
                  <p className="text-xs text-secondary">Switch between light, dark, and system themes.</p>
                </div>
                <Button variant="outline" size="sm" className="rounded-lg font-bold" onClick={handleThemeChange}>
                  {theme.toUpperCase()}
                </Button>
              </div>
            </div>
          </Card>

          {/* Security Settings */}
          <Card variant="elevated" className="p-8 space-y-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400">
                <Shield className="h-5 w-5" />
              </div>
              <h2 className="text-xl font-bold text-neutral-900 dark:text-white">Security</h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-100 dark:border-neutral-800">
                <div className="space-y-1">
                  <span className="text-sm font-bold text-neutral-900 dark:text-white">Change Password</span>
                  <p className="text-xs text-secondary">Update your account password for better security.</p>
                </div>
                <Button variant="outline" size="sm" className="rounded-lg font-bold">Update</Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </PageContainer>
  );
}
