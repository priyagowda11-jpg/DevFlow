import React from 'react';
import { Certificate } from '@/types';
import { Badge } from '@/components/ui/Badge';
import { CheckCircle2, ShieldCheck, Calendar, Award } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CertificatePreviewProps {
  certificate: Certificate;
  studentName: string;
}

export const CertificatePreview = ({ certificate, studentName }: CertificatePreviewProps) => {
  return (
    <div className="relative p-8 md:p-16 bg-white dark:bg-neutral-900 border-[12px] border-double border-primary-500 rounded-sm shadow-2xl max-w-4xl mx-auto text-center space-y-8">
      {/* Watermark/Background Decoration */}
      <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
        <Award className="h-96 w-96 text-primary-600" />
      </div>

      <div className="relative z-10 space-y-6">
        <div className="flex justify-center mb-8">
          <div className="h-20 w-20 bg-primary-500 rounded-full flex items-center justify-center text-white shadow-lg">
            <Award className="h-10 w-10" />
          </div>
        </div>

        <h1 className="text-4xl md:text-6xl font-serif font-bold text-neutral-900 dark:text-white tracking-tight">
          DEVFLOW
        </h1>
        <div className="h-1 w-32 bg-primary-500 mx-auto" />

        <p className="text-xl text-secondary uppercase tracking-widest font-medium">
          Certificate of Completion
        </p>

        <div className="space-y-2 py-8">
          <p className="text-lg text-neutral-500 dark:text-neutral-400 italic">This certifies that</p>
          <h2 className="text-3xl md:text-5xl font-bold text-neutral-900 dark:text-white font-serif">
            {studentName}
          </h2>
          <p className="text-lg text-neutral-500 dark:text-neutral-400 italic">has successfully completed the program</p>
          <h3 className="text-2xl md:text-3xl font-bold text-primary-600 dark:text-primary-400">
            {certificate.title}
          </h3>
        </div>

        <div className="grid grid-cols-2 gap-8 max-w-md mx-auto pt-8 border-t border-neutral-200 dark:border-neutral-800">
          <div className="text-left space-y-1">
            <p className="text-[10px] font-bold uppercase text-neutral-400">Issue Date</p>
            <p className="text-sm font-medium text-neutral-900 dark:text-white">{certificate.issueDate}</p>
          </div>
          <div className="text-right space-y-1">
            <p className="text-[10px] font-bold uppercase text-neutral-400">Certificate ID</p>
            <p className="text-sm font-mono font-medium text-neutral-900 dark:text-white">{certificate.certificateId}</p>
          </div>
        </div>

        <div className="pt-8 space-y-4">
          <p className="text-xs font-bold uppercase text-neutral-400 tracking-widest">Verified Skills</p>
          <div className="flex flex-wrap justify-center gap-2">
            {certificate.skills.map(skill => (
              <span key={skill} className="px-3 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 text-xs font-medium border border-neutral-200 dark:border-neutral-700">
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-center gap-2 pt-12">
          <ShieldCheck className="h-5 w-5 text-emerald-500" />
          <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">
            Verified by DevFlow Platform
          </span>
        </div>
      </div>
    </div>
  );
};
