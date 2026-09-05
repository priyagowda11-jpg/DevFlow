'use client';

import { PageContainer } from '@/components/layout/PageContainer';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { storage } from '@/lib/storage';
import { useAuth } from '@/context/AuthContext';
import { Award, Lock, FileBadge } from 'lucide-react';
import { CertificateCard } from '@/components/certificates/CertificateCard';
import { COURSES } from '@/data/course-data';

export default function CertificatesPage() {
  const { user } = useAuth();

  if (!user) return null;

  const certificates = storage.getStudentCertificates(user.id);
  const enrolledProgress = storage.getStudentCourseProgress(user.id);

  const lockedCertificates = enrolledProgress.map(p => {
    const course = COURSES.find((c: any) => c.id === p.courseId);
    const totalLessons = course?.modules.reduce((acc: number, m: any) => acc + m.lessons.length, 0) || 0;
    const progressPercent = totalLessons > 0 ? Math.round((p.completedLessons.length / totalLessons) * 100) : 0;

    return {
      courseName: course?.title || 'Unknown Course',
      progress: progressPercent,
      courseId: p.courseId
    };
  }).filter(lc => lc.progress < 100);

  return (
    <PageContainer>
      <div className="space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-primary-600 dark:text-primary-400 mb-2">
              <FileBadge className="h-6 w-6" />
              <span className="text-xs font-black uppercase tracking-widest">Credential Vault</span>
            </div >
            <h1 className="text-4xl font-black text-neutral-900 dark:text-white tracking-tight">Certificates</h1>
            <p className="text-secondary text-lg font-medium max-w-2xl">
              Your earned professional certifications and verified academic milestones.
            </p>
          </div >

          <Card variant="elevated" className="p-6 w-full md:w-80 border-neutral-200 dark:border-neutral-800 surface-layered">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-black text-neutral-400 uppercase tracking-widest">Total Earned</span>
              <span className="text-sm font-black text-neutral-900 dark:text-white">{certificates.length} Certifications</span>
            </div >
            <div className="flex items-center gap-3 p-4 rounded-2xl bg-primary-50 dark:bg-primary-900/20 border border-primary-100 dark:border-primary-800 shadow-sm">
              <Award className="h-6 w-6 text-primary-600 dark:text-primary-400" />
              <span className="text-xs font-bold text-primary-700 dark:text-primary-300">Verified Credentials</span>
            </div >
          </Card>
        </div >

        {certificates.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {certificates.map(cert => (
              <CertificateCard key={cert.id} certificate={cert} />
            ))}
          </div >
        ) : (
          <div className="flex flex-col items-center justify-center p-20 text-center space-y-8 bg-neutral-50 dark:bg-neutral-900/30 rounded-[3rem] border-2 border-dashed border-neutral-200 dark:border-neutral-800">
            <div className="p-8 bg-white dark:bg-neutral-800 rounded-full text-neutral-300 shadow-xl ring-8 ring-neutral-100 dark:ring-neutral-800">
              <Award className="h-20 w-20" />
            </div >
            <div className="space-y-3">
              <h3 className="text-3xl font-black text-neutral-900 dark:text-white">No certifications yet</h3>
              <p className="text-secondary text-lg max-w-md mx-auto font-medium">
                Complete all lessons in a course to earn your professional certification and add it to your vault.
              </p>
            </div >
            <Button variant="primary" className="rounded-2xl px-10 h-14 font-bold text-lg shadow-xl shadow-primary-500/20 transition-transform hover:scale-105" onClick={() => window.location.href='/learning'}>
              Start Learning
            </Button>
          </div >
        )}

        {lockedCertificates.length > 0 && (
          <div className="space-y-8 pt-10">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-400">
                <Lock className="h-5 w-5" />
              </div>
              <h2 className="text-2xl font-black text-neutral-900 dark:text-white tracking-tight">Pending Credentials</h2>
            </div >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {lockedCertificates.map((lc, idx) => (
                <Card key={idx} variant="elevated" className="p-6 space-y-6 opacity-70 grayscale-[0.3] border-neutral-200 dark:border-neutral-800 surface-layered transition-all hover:grayscale-0 hover:opacity-100">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-400">
                        <Award className="h-6 w-6" />
                      </div>
                      <h3 className="font-black text-neutral-700 dark:text-neutral-300">{lc.courseName}</h3>
                    </div >
                    <Badge variant="todo" className="font-black text-[10px] uppercase tracking-wider bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400 border-none">
                      {lc.progress}%
                    </Badge>
                  </div >
                  <div className="space-y-3">
                    <div className="flex justify-between text-xs font-black text-neutral-400 uppercase tracking-widest">
                      <span className="text-neutral-500">Course Completion</span>
                      <span className="text-primary-600 dark:text-primary-400">{lc.progress}%</span>
                    </div >
                    <ProgressBar value={lc.progress} className="h-2 rounded-full bg-neutral-100 dark:bg-neutral-800" />
                  </div >
                  <p className="text-xs text-secondary italic text-center font-medium opacity-80">
                    Complete all lessons to unlock this professional certificate.
                  </p>
                </Card>
              ))}
            </div >
          </div >
        )}
      </div >
    </PageContainer>
  );
}
