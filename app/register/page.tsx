'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import { UserPlus, Mail, Lock, School, GitBranch, Calendar, Phone, Camera, User, GraduationCap } from 'lucide-react';

export default function RegisterPage() {
  const { signUp } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    collegeName: '',
    branch: '',
    semester: '',
    phone: '',
    avatar: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      await signUp(formData);
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-neutral-50 dark:bg-neutral-950 p-4 relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-[-10%] right-[-10%] h-1/2 w-1/2 bg-primary-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-[-10%] left-[-10%] h-1/2 w-1/2 bg-secondary-500/10 rounded-full blur-3xl" />

      <Card variant="elevated" className="w-full max-w-2xl p-10 space-y-8 border-neutral-200 dark:border-neutral-800 shadow-2xl relative z-10 animate-in fade-in zoom-in-95 duration-500">
        <div className="text-center space-y-3">
          <div className="inline-flex p-4 rounded-2xl bg-primary-100 dark:bg-primary-900/40 text-primary-600 dark:text-primary-400 mb-2 shadow-sm ring-4 ring-primary-500/10">
            <UserPlus className="h-8 w-8" />
          </div >
          <h1 className="text-3xl font-black text-neutral-900 dark:text-white tracking-tight">Join DevFlow</h1>
          <p className="text-secondary">Create your account to start your development journey.</p>
        </div >

        {error && (
          <div className="p-4 rounded-xl bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm font-medium border border-red-100 dark:border-red-900/30 text-center animate-in fade-in slide-in-from-top-2">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            {/* Personal Information Section */}
            <div className="md:col-span-2 space-y-4">
              <div className="flex items-center gap-2 text-neutral-600 dark:text-neutral-400 font-bold text-sm uppercase tracking-wider">
                <User className="h-4 w-4" />
                <span>Personal Information</span>
              </div >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Input
                    label="Full Name"
                    type="text"
                    placeholder="John Doe"
                    leftIcon={<UserPlus className="h-4 w-4" />}
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  />
                </div >
                <div className="space-y-2">
                  <Input
                    label="Email Address"
                    type="email"
                    placeholder="john@example.com"
                    leftIcon={<Mail className="h-4 w-4" />}
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div >
                <div className="space-y-2">
                  <Input
                    label="Password"
                    type="password"
                    placeholder="••••••••"
                    leftIcon={<Lock className="h-4 w-4" />}
                    required
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  />
                </div >
                <div className="space-y-2">
                  <Input
                    label="Phone Number"
                    type="tel"
                    placeholder="+1 234 567 890"
                    leftIcon={<Phone className="h-4 w-4" />}
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div >
              </div >
            </div >

            {/* Academic Details Section */}
            <div className="md:col-span-2 space-y-4">
              <div className="flex items-center gap-2 text-neutral-600 dark:text-neutral-400 font-bold text-sm uppercase tracking-wider">
                <GraduationCap className="h-4 w-4" />
                <span>Academic Details</span>
              </div >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Input
                    label="College Name"
                    type="text"
                    placeholder="University of Technology"
                    leftIcon={<School className="h-4 w-4" />}
                    required
                    value={formData.collegeName}
                    onChange={(e) => setFormData({ ...formData, collegeName: e.target.value })}
                  />
                </div >
                <div className="space-y-2">
                  <Input
                    label="Branch"
                    type="text"
                    placeholder="Computer Science"
                    leftIcon={<GitBranch className="h-4 w-4" />}
                    required
                    value={formData.branch}
                    onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                  />
                </div >
                <div className="space-y-2">
                  <Input
                    label="Semester"
                    type="text"
                    placeholder="4th Semester"
                    leftIcon={<Calendar className="h-4 w-4" />}
                    required
                    value={formData.semester}
                    onChange={(e) => setFormData({ ...formData, semester: e.target.value })}
                  />
                </div >
                <div className="space-y-2">
                  <Input
                    label="Profile Photo URL (Optional)"
                    type="url"
                    placeholder="https://example.com/photo.jpg"
                    leftIcon={<Camera className="h-4 w-4" />}
                    value={formData.avatar}
                    onChange={(e) => setFormData({ ...formData, avatar: e.target.value })}
                  />
                </div >
              </div >
            </div >
          </div >

          <div className="pt-6">
            <Button
              type="submit"
              variant="primary"
              className="w-full h-12 rounded-xl font-bold text-lg transition-all hover:scale-[1.02] shadow-lg shadow-primary-500/20"
              disabled={isLoading}
            >
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </Button>
            <p className="text-center text-secondary mt-6">
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => router.push('/login')}
                className="text-primary-600 dark:text-primary-400 font-bold hover:underline"
              >
                Login here
              </button>
            </p>
          </div >
        </form>
      </Card>
    </div>
  );
}
