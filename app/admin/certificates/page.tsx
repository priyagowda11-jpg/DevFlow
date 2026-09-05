'use client';

import React, { useState } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { storage } from '@/lib/storage';
import { Award, Calendar, Download, FileCheck, Search } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { AdminTable } from '@/components/admin/AdminTable';
import { AdminSearchInput } from '@/components/admin/AdminSearchInput';

export default function AdminCertificatesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const certificates = storage.getCertificates();

  const filteredCerts = certificates.filter(cert =>
    cert.certificateId.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cert.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const columns = [
    {
      key: 'id',
      label: 'Certificate ID',
      render: (val: any) => (
        <span className="font-mono text-[11px] font-bold text-neutral-500 dark:text-neutral-400">
          {val}
        </span>
      ),
    },
    {
      key: 'recipient',
      label: 'Recipient Student',
      render: (_: any, cert: any) => {
        const student = storage.getStudentById(cert.studentId);
        return (
          <span className="font-black text-neutral-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
            {student?.fullName || 'Unknown'}
          </span>
        );
      },
    },
    {
      key: 'course',
      label: 'Course Title',
      render: (_: any, cert: any) => {
        const course = require('@/data/course-data').COURSES.find((c: any) => c.title === cert.title.replace('Certification of Completion: ', ''));
        return <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">{course?.title || cert.title}</span>;
      },
    },
    {
      key: 'date',
      label: 'Issue Date',
      render: (_: any, cert: any) => (
        <div className="flex items-center gap-2 text-xs font-bold text-neutral-500 dark:text-neutral-400">
          <Calendar className="h-3 w-3" />
          {new Date(cert.issueDate).toLocaleDateString()}
        </div>
      ),
    },
    {
      key: 'actions',
      label: 'Actions',
      align: 'right' as const,
      render: (_: any, cert: any) => (
        <Button variant="ghost" size="sm" className="gap-2 h-9 rounded-lg font-bold text-xs hover:bg-primary-50 dark:hover:bg-primary-900/20 hover:text-primary-600 dark:hover:text-primary-400 transition-all" leftIcon={<Download className="h-3.5 w-3.5" />}>
          Export
        </Button>
      ),
    },
  ];

  return (
    <PageContainer>
      <div className="space-y-10">
        <AdminPageHeader
          title="Certification Audit"
          subtitle="Verified record of all professional certifications issued on the platform."
          icon={<FileCheck className="h-6 w-6" />}
          actions={
            <Button variant="outline" className="gap-2 h-12 rounded-xl font-bold" leftIcon={<Download className="h-4 w-4" />}>
              Export All
            </Button>
          }
        />

        <div className="space-y-6">
          <AdminSearchInput
            placeholder="Search by Certificate ID or title..."
            onSearch={setSearchQuery}
            value={searchQuery}
          />

          <AdminTable
            columns={columns}
            data={filteredCerts}
            emptyState={
              <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
                <div className="p-4 bg-neutral-100 dark:bg-neutral-800 rounded-full text-neutral-400">
                  <Award className="h-8 w-8" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-lg font-black text-neutral-900 dark:text-white">No certificates issued yet</h3>
                  <p className="text-secondary text-sm">When students complete courses, their certifications will appear here.</p>
                </div>
              </div>
            }
          />
        </div>
      </div>
    </PageContainer>
  );
}
