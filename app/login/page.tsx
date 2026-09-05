'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import { Mail, Lock, LogIn } from 'lucide-react';

export default function LoginPage() {
  const { signIn } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      await signIn(formData.email, formData.password);
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
      <div className="absolute top-[-10%] left-[-10%] h-1/2 w-1/2 bg-primary-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-[-10%] right-[-10%] h-1/2 w-1/2 bg-secondary-500/10 rounded-full blur-3xl" />

      <Card variant="elevated" className="w-full max-w-md p-10 space-y-8 border-neutral-200 dark:border-neutral-800 shadow-2xl relative z-10 animate-in fade-in zoom-in-95 duration-500">
        <div className="text-center space-y-3">
          <div className="inline-flex p-4 rounded-2xl bg-primary-100 dark:bg-primary-900/40 text-primary-600 dark:text-primary-400 mb-2 shadow-sm ring-4 ring-primary-500/10">
            <LogIn className="h-8 w-8" />
          </div >
          <h1 className="text-3xl font-black text-neutral-900 dark:text-white tracking-tight">Welcome Back</h1>
          <p className="text-secondary">Login to access your productivity workspace.</p>
        </div >

        {error && (
          <div className="p-4 rounded-xl bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm font-medium border border-red-100 dark:border-red-900/30 text-center animate-in fade-in slide-in-from-top-2">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
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

          <Button
            type="submit"
            variant="primary"
            className="w-full h-12 rounded-xl font-bold text-lg transition-all hover:scale-[1.02] shadow-lg shadow-primary-500/20"
            disabled={isLoading}
          >
            {isLoading ? 'Authenticating...' : 'Login'}
          </Button>

          <p className="text-center text-secondary mt-6">
            Don't have an account?{' '}
            <button
              type="button"
              onClick={() => router.push('/register')}
              className="text-primary-600 dark:text-primary-400 font-bold hover:underline"
            >
              Create account
            </button>
          </p>
        </form>
      </Card>
    </div>
  );
}
