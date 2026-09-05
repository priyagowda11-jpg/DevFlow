'use client';

import React, { useState } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { storage } from '@/lib/storage';
import { Search, Eye, GraduationCap, Mail, Plus } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { AdminTable } from '@/components/admin/AdminTable';
import { AdminSearchInput } from '@/components/admin/AdminSearchInput';
import { Button } from '@/components/ui/Button';

export default function StudentsPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const students = storage.getStudents();

  const filteredStudents = students.filter(s =>
    s.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.collegeName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const columns = [
    {
      key: 'profile',
      label: 'Student Profile',
      render: (val: any, student: any) => (
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-primary-100 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400 flex items-center justify-center text-sm font-black shadow-sm ring-1 ring-primary-200 dark:ring-primary-800">
            {student.fullName.charAt(0)}
          </div>
          <div className="flex flex-col">
            <span className="font-black text-neutral-900 dark:text-white">{student.fullName}</span>
            <div className="flex items-center gap-1.5 text-xs text-secondary font-medium">
              <Mail className="h-3 w-3 opacity-60" />
              {student.email}
            </div >
          </div>
        </div>
      ),
    },
    {
      key: 'academic',
      label: 'Academic Credentials',
      render: (_: any, student: any) => (
        <div className="flex flex-col text-xs font-medium text-neutral-600 dark:text-neutral-400">
          <span className="font-bold text-neutral-900 dark:text-white">{student.collegeName}</span>
          <span className="text-secondary">{student.branch} • Sem {student.semester}</span>
        </div>
      ),
    },
    {
      key: 'activity',
      label: 'Activity Matrix',
      align: 'center' as const,
      render: (_: any, student: any) => {
        const projects = storage.getStudentProjects(student.id);
        const tasks = storage.getStudentTasks(student.id);
        const completedTasks = tasks.filter(t => t.status === 'Done').length;
        const certs = storage.getStudentCertificates(student.id).length;
        return (
          <div className="flex items-center justify-center gap-6">
            <div className="flex flex-col items-center">
              <span className="text-[9px] text-neutral-400 uppercase font-black mb-1">Proj</span>
              <span className="font-black text-neutral-900 dark:text-white">{projects.length}</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-[9px] text-neutral-400 uppercase font-black mb-1">Tasks</span>
              <span className="font-black text-neutral-900 dark:text-white">{completedTasks}/{tasks.length}</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-[9px] text-neutral-400 uppercase font-black mb-1">Certs</span>
              <span className="font-black text-neutral-900 dark:text-white">{certs}</span>
            </div>
          </div>
        );
      },
    },
    {
      key: 'actions',
      label: 'Actions',
      align: 'right' as const,
      render: (_: any, student: any) => (
        <Link href={`/admin/students/${student.id}`}>
          <Button variant="ghost" size="sm" className="gap-2 h-9 rounded-lg font-bold text-xs hover:bg-primary-50 dark:hover:bg-primary-900/20 hover:text-primary-600 dark:hover:text-primary-400 transition-all">
            <Eye className="h-3.5 w-3.5" /> View Profile
          </Button>
        </Link>
      ),
    },
  ];

  return (
    <PageContainer>
      <div className="space-y-10">
        <AdminPageHeader
          title="Student Management"
          subtitle="Oversee and manage the professional growth of all registered students."
          icon={<GraduationCap className="h-6 w-6" />}
          actions={
            <Button variant="primary" className="gap-2 h-12 rounded-xl font-bold shadow-lg shadow-primary-500/20" leftIcon={<Plus className="h-4 w-4" />}>
              Add Student
            </Button>
          }
        />

        <div className="space-y-6">
          <AdminSearchInput
            placeholder="Quick search by name, email or college..."
            onSearch={setSearchQuery}
            value={searchQuery}
          />

          <AdminTable
            columns={columns}
            data={filteredStudents}
            onRowClick={(student) => router.push(`/admin/students/${student.id}`)}
            emptyState={
              <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
                <div className="p-4 bg-neutral-100 dark:bg-neutral-800 rounded-full text-neutral-400">
                  <Search className="h-8 w-8" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-lg font-black text-neutral-900 dark:text-white">No matching students</h3>
                  <p className="text-secondary text-sm">Try adjusting your search keywords to find the right student.</p>
                </div>
              </div>
            }
          />
        </div>
      </div>
    </PageContainer>
  );
}
