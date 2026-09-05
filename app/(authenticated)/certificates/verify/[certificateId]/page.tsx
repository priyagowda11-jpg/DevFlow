'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { PageContainer } from '@/components/layout/PageContainer';
import { Button } from '@/components/ui/Button';
import { ShieldCheck, ExternalLink, Award } from 'lucide-react';
import { MOCK_CERTIFICATES } from '@/data/certificate-data';
import { ErrorState } from '@/components/ui/ErrorState';
import { Badge } from '@/components/ui/Badge';
import { storage } from '@/lib/storage';

export default function CertificateVerifyPage() {
  const { certificateId } = useParams();
  const certificate = MOCK_CERTIFICATES.find((c: any) => c.id === certificateId);
  const students = storage.getStudents();
  const student = students.find((s: any) => s.id === certificate?.studentId);
  const studentName = student?.fullName || 'Unknown Student';

  if (!certificate) {
    return (
      <PageContainer>
        <ErrorState
          title="Invalid Certificate"
          description="The certificate ID provided is not valid or has not been issued by DevFlow."
          action={<Button variant="primary">Explore DevFlow</Button>}
        />
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-emerald-100 text-emerald-600 mx-auto mb-4">
            <ShieldCheck className="h-10 w-10" />
          </div>
          <h1 className="text-3xl font-bold text-neutral-900 dark:text-white">Certificate Verified</h1>
          <p className="text-secondary">This document is a valid certification issued by the DevFlow platform.</p>
        </div>

        <div className="p-8 rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-xl space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase text-neutral-400">Student Name</span>
                <p className="text-lg font-bold text-neutral-900 dark:text-white">{studentName}</p>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase text-neutral-400">Course / Program</span>
                <p className="text-lg font-bold text-primary-600 dark:text-primary-400">{certificate.title}</p>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase text-neutral-400">Issue Date</span>
                <p className="text-sm text-neutral-900 dark:text-white">{certificate.issueDate}</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase text-neutral-400">Certificate ID</span>
                <p className="text-sm font-mono text-neutral-900 dark:text-white">{certificate.certificateId}</p>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase text-neutral-400">Status</span>
                <Badge variant="project" className="bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400">Verified</Badge>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase text-neutral-400">Skills Verified</span>
                <div className="flex flex-wrap gap-1">
                  {certificate.skills.map((skill: string) => (
                    <span key={skill} className="text-[10px] px-2 py-0.5 rounded-md bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-neutral-400">
              <Award className="h-3 w-3" />
              <span>Officially certified by DevFlow</span>
            </div>
            <Button variant="outline" size="sm" className="gap-2">
              <ExternalLink className="h-3 w-3" />
              Visit DevFlow
            </Button>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
