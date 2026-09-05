import { Certificate } from '@/types';

export const MOCK_CERTIFICATES: Certificate[] = [
  {
    id: 'cert-1',
    title: 'Frontend Development',
    description: 'Comprehensive mastery of modern frontend technologies including React, Next.js, and Tailwind CSS.',
    studentId: 'user-1',
    issueDate: '2026-09-01',
    certificateId: 'DF-FE-2026-001',
    skills: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS'],
    status: 'Issued',
  },
  {
    id: 'cert-2',
    title: 'Full Stack Foundations',
    description: 'Proficiency in building end-to-end applications with Node.js, Express, and MongoDB.',
    studentId: 'user-1',
    issueDate: '2026-08-15',
    certificateId: 'DF-FS-2026-042',
    skills: ['Node.js', 'Express', 'MongoDB', 'REST API'],
    status: 'Issued',
  },
  {
    id: 'cert-3',
    title: 'React & TypeScript',
    description: 'Advanced implementation of type-safe components and state management in React.',
    studentId: 'user-1',
    issueDate: '2026-07-20',
    certificateId: 'DF-RT-2026-015',
    skills: ['React', 'TypeScript', 'Zustand', 'Context API'],
    status: 'Issued',
  },
];
