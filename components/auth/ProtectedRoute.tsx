'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { UserRole } from '@/types';
import { storage } from '@/lib/storage';
import { authService } from '@/lib/auth-service';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: UserRole;
}

export const ProtectedRoute = ({ children, requiredRole }: ProtectedRouteProps) => {
  const { user, role, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      if (!isLoading) {
        const studentSession = storage.getSession();
        const adminSession = storage.getAdminSession();

        const isStudentValid = studentSession ? await authService.isSessionValid(studentSession) : false;
        const isAdminValid = adminSession ? await authService.isSessionValid(adminSession) : false;

        if (!isStudentValid && !isAdminValid) {
          router.push('/login');
          return;
        }

        if (requiredRole === 'STUDENT' && !isStudentValid) {
          router.push('/login');
          return;
        }

        if (requiredRole === 'ADMIN' && !isAdminValid) {
          router.push('/admin/login');
          return;
        }
      }
    };

    checkAuth();
  }, [isLoading, router]);

  if (isLoading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-neutral-50 dark:bg-neutral-950">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return <>{children}</>;
};
