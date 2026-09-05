'use client';

import React, { useState } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { storage } from '@/lib/storage';
import { Trophy, Search, Crown, Download } from 'lucide-react';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { AdminTable } from '@/components/admin/AdminTable';
import { AdminSearchInput } from '@/components/admin/AdminSearchInput';
import { Button } from '@/components/ui/Button';

export default function AdminLeaderboardPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const students = storage.getStudents().sort((a, b) => b.points - a.points);

  const filteredStudents = students.filter(s =>
    s.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const columns = [
    {
      key: 'rank',
      label: 'Rank',
      render: (_: any, student: any) => {
        const rank = students.indexOf(student) + 1;
        if (rank === 1) return <span className="flex items-center gap-1 font-black text-amber-500"><Crown className="h-3 w-3" /> 1</span>;
        if (rank === 2) return <span className="font-black text-neutral-400">2</span>;
        if (rank === 3) return <span className="font-black text-orange-400">3</span>;
        return <span className="font-medium text-neutral-500">{rank}</span>;
      },
    },
    {
      key: 'profile',
      label: 'Student',
      render: (val: any, student: any) => (
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-xs font-black">
            {student.fullName.charAt(0)}
          </div>
          <span className="font-black text-neutral-900 dark:text-white">{student.fullName}</span>
        </div>
      ),
    },
    {
      key: 'points',
      label: 'Productivity Points',
      align: 'center' as const,
      render: (val: any) => (
        <span className="font-black text-primary-600 dark:text-primary-400">{val?.toLocaleString()} pts</span>
      ),
    },
    {
      key: 'metrics',
      label: 'Performance',
      render: (_: any, student: any) => {
        const projects = storage.getStudentProjects(student.id).length;
        const certs = storage.getStudentCertificates(student.id).length;
        return (
          <div className="flex items-center gap-4 text-xs font-bold text-neutral-500">
            <span>{projects} Proj</span>
            <span className="text-neutral-300 dark:text-neutral-700">|</span>
            <span>{certs} Certs</span>
          </div>
        );
      },
    },
    {
      key: 'actions',
      label: 'Actions',
      align: 'right' as const,
      render: (_: any, student: any) => (
        <Button variant="ghost" size="sm" className="gap-2 h-9 rounded-lg font-bold text-xs hover:bg-primary-50 dark:hover:bg-primary-900/20 hover:text-primary-600 dark:hover:text-primary-400 transition-all">
          Audit Profile
        </Button>
      ),
    },
  ];

  return (
    <PageContainer>
      <div className="space-y-10">
        <AdminPageHeader
          title="Global Leaderboard"
          subtitle="Competitive ranking of students based on productivity points and achievement milestones."
          icon={<Trophy className="h-6 w-6" />}
          actions={
            <Button variant="outline" className="gap-2 h-12 rounded-xl font-bold" leftIcon={<Download className="h-4 w-4" />}>
              Export Rankings
            </Button>
          }
        />

        <div className="space-y-6">
          <AdminSearchInput
            placeholder="Search for a student..."
            onSearch={setSearchQuery}
            value={searchQuery}
          />

          <AdminTable
            columns={columns}
            data={filteredStudents}
            emptyState={
              <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
                <div className="p-4 bg-neutral-100 dark:bg-neutral-800 rounded-full text-neutral-400">
                  <Trophy className="h-8 w-8" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-lg font-black text-neutral-900 dark:text-white">No students ranked yet</h3>
                  <p className="text-secondary text-sm">Student rankings will appear as they earn productivity points.</p>
                </div>
              </div>
            }
          />
        </div>
      </div>
    </PageContainer>
  );
}
