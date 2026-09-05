"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import { Student, UserRole } from '@/types';
import { authService } from '@/lib/auth-service';
import { storage } from '@/lib/storage';
import { useRouter } from 'next/navigation';

interface AuthContextType {
  user: Student | null;
  role: UserRole | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (studentData: any) => Promise<void>;
  signOut: () => Promise<void>;
  updateUser: (updates: Partial<Student>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<Student | null>(null);
  const [role, setRole] = useState<UserRole | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const currentUser = await authService.getCurrentUser();
        const session = storage.getSession();

        if (currentUser && session) {
          setUser(currentUser);
          setRole(session.role);
        } else {
          setUser(null);
          setRole(null);
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
      } finally {
        setIsLoading(false);
      }
    };
    initializeAuth();
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const { student, session } = await authService.login(email, password);
      setUser(student);
      setRole(session.role);
      router.push('/dashboard');
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'An unexpected error occurred');
    }
  };

  const signUp = async (studentData: any) => {
    try {
      const student = await authService.register(studentData);
      const { session } = await authService.login(student.email, student.password!);
      setUser(student);
      setRole(session.role);
      router.push('/dashboard');
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'An unexpected error occurred');
    }
  };

  const signOut = async () => {
    try {
      await authService.logout();
      await authService.logoutAdmin();
      setUser(null);
      setRole(null);
      router.push('/login');
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'An unexpected error occurred');
    }
  };

  const updateUser = async (updates: Partial<Student>) => {
    if (!user) return;
    try {
      const updatedUser = await authService.updateProfile(user.id, updates);
      setUser(updatedUser);
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'An unexpected error occurred');
    }
  };

  return (
    <AuthContext.Provider value={{ user, role, isLoading, signIn, signUp, signOut, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
