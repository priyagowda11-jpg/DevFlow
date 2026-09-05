import React from 'react';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { AppShell } from '@/components/layout/AppShell';
import { ProjectProvider } from '@/context/ProjectContext';

export default function AuthenticatedLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute requiredRole="STUDENT">
      <ProjectProvider>
        <AppShell>
          {children}
        </AppShell>
      </ProjectProvider>
    </ProtectedRoute>
  );
}
