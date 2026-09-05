'use client';

import React from 'react';
import { Certificate } from '@/types';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Award, ExternalLink, Download, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

interface CertificateCardProps {
  certificate: Certificate;
  className?: string;
}

export const CertificateCard = ({ certificate, className }: CertificateCardProps) => {
  return (
    <Card
      variant="elevated"
      className={cn(
        'group relative p-8 space-y-6 transition-all hover:shadow-2xl hover:-translate-y-2 border-t-4 border-t-primary-500 surface-layered',
        className
      )}
    >
      {/* Golden Glow Effect on Hover */}
      <div className="absolute inset-0 rounded-[inherit] pointer-events-none transition-opacity opacity-0 group-hover:opacity-100 blur-2xl -z-10 bg-gradient-to-br from-amber-200/20 to-primary-500/10" />

      <div className="flex items-start justify-between">
        <div className="relative">
          <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/40 dark:to-primary-900/20 text-primary-600 dark:text-primary-400 flex items-center justify-center shadow-inner ring-4 ring-primary-500/10">
            <Award className="h-8 w-8" />
          </div>
          <div className="absolute -bottom-1 -right-1 h-6 w-6 rounded-full bg-emerald-500 text-white flex items-center justify-center border-2 border-white dark:border-neutral-900 shadow-sm">
            <CheckCircle2 className="h-3.5 w-3.5" />
          </div>
        </div>
        <Badge variant="project" className="text-[10px] px-3 py-1 rounded-full uppercase tracking-wider font-black">
          {certificate.status}
        </Badge>
      </div>

      <div className="space-y-3">
        <h3 className="text-2xl font-black text-neutral-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors leading-tight">
          {certificate.title}
        </h3>
        <p className="text-sm text-secondary leading-relaxed line-clamp-2 font-medium">
          {certificate.description}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 py-5 border-y border-neutral-100 dark:border-neutral-800">
        <div className="space-y-1">
          <span className="text-[10px] font-black text-neutral-400 uppercase tracking-widest block">Issued</span>
          <div className="text-xs font-bold text-neutral-900 dark:text-white">
            {certificate.issueDate}
          </div>
        </div>
        <div className="space-y-1">
          <span className="text-[10px] font-black text-neutral-400 uppercase tracking-widest block">Credential ID</span>
          <div className="text-xs font-mono font-bold text-neutral-900 dark:text-white truncate">
            {certificate.certificateId}
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {certificate.skills.map(skill => (
          <span key={skill} className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-700">
            {skill}
          </span>
        ))}
      </div>

      <div className="flex gap-3 pt-2">
        <Link href={`/certificates/${certificate.id}`} className="flex-1">
          <Button variant="primary" className="w-full py-3 text-sm font-bold gap-2 rounded-xl shadow-lg shadow-primary-500/20">
            View Certificate
            <ExternalLink className="h-3.5 w-3.5" />
          </Button>
        </Link>
        <Button variant="outline" className="gap-2 rounded-xl px-4 h-11 font-bold" onClick={() => window.print()}>
          <Download className="h-3.5 w-3.5" />
          Save
        </Button>
      </div>
    </Card>
  );
};
