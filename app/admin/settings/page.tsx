'use client';

import React, { useState, useEffect } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { storage } from '@/lib/storage';
import { Settings, Save, Globe, ShieldAlert, UserPlus, Zap, BookOpen, Lock } from 'lucide-react';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<any>({});

  useEffect(() => {
    setSettings(storage.getSettings());
  }, []);

  const handleSave = () => {
    storage.saveSettings(settings);
    alert('Platform settings updated successfully!');
  };

  return (
    <PageContainer>
      <div className="space-y-10">
        <AdminPageHeader
          title="Platform Settings"
          subtitle="Configure global behavior, security rules, and gamification logic."
          icon={<Settings className="h-6 w-6" />}
          actions={
            <Button className="gap-2 h-12 rounded-xl font-bold shadow-lg shadow-primary-500/20 px-6" onClick={handleSave}>
              <Save className="h-4 w-4" /> Save Changes
            </Button>
          }
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* General Configuration */}
          <Card variant="elevated" className="p-8 space-y-8 border-neutral-200 dark:border-neutral-800 surface-layered">
            <div className="flex items-center gap-3 pb-4 border-b border-neutral-100 dark:border-neutral-800">
              <Globe className="h-6 w-6 text-primary-500" />
              <h2 className="text-xl font-black text-neutral-900 dark:text-white">Platform Intelligence</h2>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-neutral-400">Platform Identity</label>
                <Input
                  value={settings.platformName || ''}
                  onChange={(e) => setSettings({ ...settings, platformName: e.target.value })}
                  placeholder="DevFlow"
                  className="h-12 rounded-xl border-neutral-200 dark:border-neutral-700"
                />
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 transition-all hover:border-amber-200 dark:hover:border-amber-800">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400">
                      <ShieldAlert className="h-5 w-5" />
                    </div>
                    <div className="space-y-0">
                      <span className="block font-black text-neutral-900 dark:text-white">Maintenance Mode</span>
                      <span className="text-xs text-secondary font-medium">Restricts student access for updates.</span>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    className="h-5 w-5 accent-primary-500"
                    checked={settings.maintenanceMode || false}
                    onChange={(e) => setSettings({ ...settings, maintenanceMode: e.target.checked })}
                  />
                </div>

                <div className="flex items-center justify-between p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 transition-all hover:border-primary-200 dark:hover:border-primary-800">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary-100 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400">
                      <UserPlus className="h-5 w-5" />
                    </div>
                    <div className="space-y-0">
                      <span className="block font-black text-neutral-900 dark:text-white">Open Registration</span>
                      <span className="text-xs text-secondary font-medium">Allow public student account creation.</span>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    className="h-5 w-5 accent-primary-500"
                    checked={settings.registrationOpen || false}
                    onChange={(e) => setSettings({ ...settings, registrationOpen: e.target.checked })}
                  />
                </div>
              </div>
            </div>
          </Card>

          {/* Gamification Logic */}
          <Card variant="elevated" className="p-8 space-y-8 border-neutral-200 dark:border-neutral-800 surface-layered">
            <div className="flex items-center gap-3 pb-4 border-b border-neutral-100 dark:border-neutral-800">
              <Zap className="h-6 w-6 text-amber-500" />
              <h2 className="text-xl font-black text-neutral-900 dark:text-white">Gamification Logic</h2>
            </div>

            <div className="space-y-6">
              <div className="space-y-3">
                <label className="text-xs font-black uppercase tracking-widest text-neutral-400">Points Multiplier</label>
                <div className="flex items-center gap-4">
                  <Input
                    type="number"
                    step="0.1"
                    value={settings.pointsMultiplier || 1}
                    onChange={(e) => setSettings({ ...settings, pointsMultiplier: parseFloat(e.target.value) })}
                    className="w-32 h-12 rounded-xl border-neutral-200 dark:border-neutral-700"
                  />
                  <span className="text-sm font-medium text-secondary">x base points for all activity</span>
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-xs font-black uppercase tracking-widest text-neutral-400">Default Onboarding Course</label>
                <div className="flex items-center gap-3">
                  <Input
                    placeholder="Course ID (e.g. course-1)"
                    value={settings.defaultCourseId || ''}
                    onChange={(e) => setSettings({ ...settings, defaultCourseId: e.target.value })}
                    className="flex-1 h-12 rounded-xl border-neutral-200 dark:border-neutral-700"
                  />
                  <Button variant="outline" className="gap-2 h-12 rounded-xl font-bold" leftIcon={<BookOpen className="h-4 w-4" />}>
                    Browse
                  </Button>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-100 dark:border-neutral-800 flex items-center gap-3">
                <Lock className="h-5 w-5 text-neutral-400" />
                <p className="text-xs text-secondary font-medium">Gamification settings affect all students globally and may impact leaderboard rankings.</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </PageContainer>
  );
}
