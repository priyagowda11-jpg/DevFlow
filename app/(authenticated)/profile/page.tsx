'use client';

import React, { useState } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { useAuth } from '@/context/AuthContext';
import { storage } from '@/lib/storage';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Avatar } from '@/components/ui/Avatar';
import { Trophy, Award, TrendingUp, Zap, Star, Rocket } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { EditProfileModal } from '@/components/profile/EditProfileModal';

export default function ProfilePage() {
  const { user } = useAuth();
  const [isEditOpen, setIsEditOpen] = useState(false);

  if (!user) return null;

  const student = storage.getStudentById(user.id);
  const points = student?.points || 0;

  // Calculate rank by sorting all students by points
  const allStudents = storage.getStudents().sort((a, b) => b.points - a.points);
  const rank = allStudents.findIndex(s => s.id === user.id) + 1;

  const achievements = storage.getStudentAchievements(user.id);
  const unlockedAchievements = achievements.filter(a => a.isUnlocked);
  const certificates = storage.getStudentCertificates(user.id);
  const projects = storage.getStudentProjects(user.id);

  return (
    <PageContainer>
      <div className="space-y-12">
        {/* Profile Hero Section */}
        <div className="relative p-8 rounded-[2.5rem] bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm flex flex-col md:flex-row gap-8 items-center text-center md:text-left overflow-hidden">
          <div className="relative">
            <div className="absolute -inset-2 bg-gradient-to-tr from-primary-500 to-teal-500 rounded-full blur-lg opacity-30 animate-pulse" />
            <Avatar src={user.avatar} fallback={user.fullName} size="lg" status="online" className="relative ring-4 ring-white dark:ring-neutral-900" />
          </div>
          <div className="space-y-4 flex-1">
            <div className="space-y-1">
              <div className="flex items-center justify-center md:justify-start gap-3">
                <h1 className="text-4xl font-black text-neutral-900 dark:text-white tracking-tight">{user.fullName}</h1>
                <div className="p-1.5 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400">
                  <Star className="h-4 w-4 fill-current" />
                </div>
              </div>
              <p className="text-lg text-secondary font-medium">{student?.branch || 'Not specified'} • Semester {student?.semester || 'N/A'}</p>
            </div>
            <div className="flex flex-wrap gap-2 justify-center md:justify-start">
              {user.skills.map(skill => (
                <Badge key={skill} variant="project" className="text-[11px] px-3 py-1 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-700">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
          <div className="flex flex-col items-center md:items-end gap-2">
            <div className="text-center md:text-right space-y-1">
              <span className="text-xs font-black uppercase tracking-widest text-neutral-400">Current Rank</span>
              <div className="text-3xl font-black text-primary-600 dark:text-primary-400">#{rank}</div>
            </div>
            <Button variant="outline" size="sm" className="rounded-xl px-4 h-10 font-bold border-neutral-200 dark:border-neutral-800" onClick={() => setIsEditOpen(true)}>
              Edit Profile
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Stats Grid */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <StatCard
              icon={<Zap className="h-5 w-5 text-amber-500" />}
              label="DevFlow Points"
              value={points.toLocaleString()}
              description="Your total experience score"
            />
            <StatCard
              icon={<TrendingUp className="h-5 w-5 text-teal-500" />}
              label="Global Standing"
              value={`#${rank}`}
              description="Current community rank"
            />
            <StatCard
              icon={<Award className="h-5 w-5 text-emerald-500" />}
              label="Certificates"
              value={certificates.length}
              description="Professional credentials earned"
            />
            <StatCard
              icon={<Trophy className="h-5 w-5 text-orange-500" />}
              label="Achievements"
              value={`${unlockedAchievements.length}/${achievements.length}`}
              description="Milestones reached"
            />
          </div>

          {/* Growth Dashboard */}
          <div className="space-y-6">
            <Card variant="elevated" className="p-8 bg-gradient-to-br from-primary-600 to-primary-800 text-white shadow-xl border-none relative overflow-hidden group">
              <Rocket className="absolute -right-8 -bottom-8 h-32 w-32 text-white/10 rotate-12 group-hover:scale-110 transition-transform duration-500" />
              <div className="relative z-10 space-y-6">
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Developer Growth</h3>
                  <p className="text-sm text-primary-100 leading-relaxed opacity-90">
                    You've successfully completed <span className="font-bold text-white">{projects.filter(p => p.status === 'Completed').length} projects</span> and earned <span className="font-bold text-white">{certificates.length} certificates</span>.
                  </p>
                </div>
                <div className="flex flex-col gap-3">
                  <Link href="/analytics">
                    <Button variant="outline" className="w-full bg-white text-primary-600 hover:bg-neutral-100 rounded-xl h-11 font-bold transition-all hover:scale-[1.02]">
                      View Analytics
                    </Button>
                  </Link>
                  <Link href="/roadmap">
                    <Button variant="outline" className="w-full bg-white/10 text-white hover:bg-white/20 border-white/20 rounded-xl h-11 font-bold transition-all hover:scale-[1.02]">
                      Explore Roadmap
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          </div>
        </div>

        <EditProfileModal
          student={student || user}
          isOpen={isEditOpen}
          onClose={() => setIsEditOpen(false)}
          onSave={() => setIsEditOpen(false)}
        />
      </div>
    </PageContainer>
  );
}

function StatCard({ icon, label, value, description }: { icon: React.ReactNode, label: string, value: string | number, description: string }) {
  return (
    <Card variant="elevated" className="p-6 space-y-4 transition-all hover:shadow-md border-neutral-200 dark:border-neutral-800">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-neutral-50 dark:bg-neutral-800 text-neutral-500">
          {icon}
        </div>
        <span className="text-xs font-black uppercase tracking-widest text-neutral-400">{label}</span>
      </div>
      <div className="flex items-baseline gap-2">
        <div className="text-4xl font-black text-neutral-900 dark:text-white tracking-tight">{value}</div>
      </div>
      <p className="text-xs text-secondary font-medium">{description}</p>
    </Card>
  );
}
