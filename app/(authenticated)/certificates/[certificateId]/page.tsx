'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { PageContainer } from '@/components/layout/PageContainer';
import { Button } from '@/components/ui/Button';
import { ArrowLeft, ShieldCheck } from 'lucide-react';
import { CertificatePreview } from '@/components/certificates/CertificatePreview';
import { MOCK_CERTIFICATES } from '@/data/certificate-data';
import { ErrorState } from '@/components/ui/ErrorState';
import { useAuth } from '@/context/AuthContext';

export default function CertificateDetailPage() {
  const { certificateId } = useParams();
  const router = useRouter();

  const { user } = useAuth();
  const certificate = MOCK_CERTIFICATES.find(c => c.id === certificateId);
  const studentName = user?.fullName || 'Student';

  if (!certificate) {
    return (
      <PageContainer>
        <ErrorState
          title="Certificate not found"
          description="The certificate you're looking for doesn't exist or has been revoked."
          action={<Button onClick={() => router.push('/certificates')}>Return to Certificates</Button>}
        />
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <Button variant="ghost" className="gap-2" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4" />
            Back to Gallery
          </Button>
          <Button variant="primary" className="gap-2" onClick={() => window.print()}>
            Download as PDF
          </Button>
        </div>

        <div className="py-8">
          <CertificatePreview
            certificate={certificate}
            studentName={studentName}
          />
        </div>
      </div>
    </PageContainer>
  );
}
