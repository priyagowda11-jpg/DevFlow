"use client";

import React, { useState } from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter
} from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';
import { Dropdown } from '@/components/ui/Dropdown';
import { Tooltip } from '@/components/ui/Tooltip';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Avatar } from '@/components/ui/Avatar';
import { Skeleton } from '@/components/ui/Skeleton';
import { Divider } from '@/components/ui/Divider';
import {
  Settings,
  User,
  Bell,
  Search,
  CheckCircle,
  AlertTriangle,
  Clock,
  Lock,
  ChevronDown,
  MoreVertical
} from 'lucide-react';
import { Button as UIButton } from '@/components/ui/Button';

export default function DesignSystemPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen p-8 space-y-12 bg-background text-foreground">
      <header className="space-y-2">
        <h1 className="text-display">DevFlow Design System</h1>
        <p className="text-secondary">Professional Visual Foundation v1.0</p>
      </header>

      {/* 1. Color Palette */}
      <section className="space-y-6">
        <h2 className="text-page-title">Color Palette</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Primary */}
          <div className="space-y-3">
            <h3 className="text-section-title">Primary (Emerald)</h3>
            <div className="grid grid-cols-5 gap-2">
              {['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'].map(step => (
                <div key={step} className="group relative aspect-square rounded-md bg-primary-500" style={{ backgroundColor: `var(--color-primary-${step})` }}>
                  <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 text-[8px] font-bold">{step}</span>
                </div>
              ))}
            </div>
          </div>
          {/* Secondary */}
          <div className="space-y-3">
            <h3 className="text-section-title">Secondary (Teal)</h3>
            <div className="grid grid-cols-5 gap-2">
              {['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'].map(step => (
                <div key={step} className="group relative aspect-square rounded-md bg-secondary-500" style={{ backgroundColor: `var(--color-secondary-${step})` }}>
                  <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 text-[8px] font-bold">{step}</span>
                </div>
              ))}
            </div>
          </div>
          {/* Accent */}
          <div className="space-y-3">
            <h3 className="text-section-title">Accent (Orange)</h3>
            <div className="grid grid-cols-5 gap-2">
              {['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'].map(step => (
                <div key={step} className="group relative aspect-square rounded-md bg-accent-500" style={{ backgroundColor: `var(--color-accent-${step})` }}>
                  <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 text-[8px] font-bold">{step}</span>
                </div>
              ))}
            </div>
          </div>
          {/* Neutrals */}
          <div className="space-y-3">
            <h3 className="text-section-title">Neutrals (Cream/Charcoal)</h3>
            <div className="grid grid-cols-5 gap-2">
              {['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'].map(step => (
                <div key={step} className="group relative aspect-square rounded-md bg-neutral-500" style={{ backgroundColor: `var(--color-neutral-${step})` }}>
                  <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 text-[8px] font-bold">{step}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Divider variant="strong" />

      {/* 2. Typography */}
      <section className="space-y-6">
        <h2 className="text-page-title">Typography</h2>
        <div className="grid grid-cols-1 gap-6">
          <div className="space-y-2">
            <span className="text-secondary">Display</span>
            <p className="text-display">The future of learning is flow.</p>
          </div>
          <div className="space-y-2">
            <span className="text-secondary">Page Title</span>
            <p className="text-page-title">Your Learning Dashboard</p>
          </div>
          <div className="space-y-2">
            <span className="text-secondary">Section Title</span>
            <p className="text-section-title">Active Courses</p>
          </div>
          <div className="space-y-2">
            <span className="text-secondary">Card Title</span>
            <p className="text-card-title">Introduction to React 19</p>
          </div>
          <div className="space-y-2">
            <span className="text-secondary">Body</span>
            <p className="text-body">
              DevFlow provides a professional environment for student developers to plan, build, and ship real-world projects.
            </p>
          </div>
          <div className="space-y-2">
            <span className="text-secondary">Secondary</span>
            <p className="text-secondary">Last updated 2 hours ago • 12 modules remaining</p>
          </div>
        </div>
      </section>

      <Divider variant="strong" />

      {/* 3. Components Playground */}
      <section className="space-y-12">
        <h2 className="text-page-title">Component Playground</h2>

        {/* Buttons */}
        <div className="space-y-6">
          <h3 className="text-section-title">Buttons</h3>
          <div className="flex flex-wrap gap-4">
            <UIButton variant="primary">Primary Button</UIButton>
            <UIButton variant="secondary">Secondary Button</UIButton>
            <UIButton variant="outline">Outline Button</UIButton>
            <UIButton variant="ghost">Ghost Button</UIButton>
            <UIButton variant="destructive">Destructive</UIButton>
            <UIButton variant="success">Success</UIButton>
            <UIButton variant="primary" isLoading>Loading State</UIButton>
            <UIButton variant="primary" leftIcon={<Search className="h-4 w-4" />}>Search</UIButton>
            <UIButton variant="primary" rightIcon={<ChevronDown className="h-4 w-4" />}>Actions</UIButton>
          </div>
        </div>

        {/* Inputs */}
        <div className="space-y-6">
          <h3 className="text-section-title">Inputs</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input label="Full Name" placeholder="Enter your name..." />
            <Input label="Email Address" type="email" placeholder="email@example.com" />
            <Input label="Password" type="password" placeholder="••••••••" />
            <Input label="Search" typeVariant="search" leftIcon={<Search className="h-4 w-4" />} placeholder="Search courses..." />
            <Input label="Username" error="This username is already taken" />
            <Input label="Valid Field" success />
          </div>
        </div>

        {/* Badges */}
        <div className="space-y-6">
          <h3 className="text-section-title">Badges</h3>
          <div className="flex flex-wrap gap-3">
            <Badge variant="todo">To Do</Badge>
            <Badge variant="in-progress">In Progress</Badge>
            <Badge variant="completed">Completed</Badge>
            <Badge variant="on-hold">On Hold</Badge>
            <Badge variant="low">Low Priority</Badge>
            <Badge variant="medium">Medium Priority</Badge>
            <Badge variant="high">High Priority</Badge>
            <Badge variant="critical">Critical</Badge>
            <Badge variant="course">Course</Badge>
            <Badge variant="project">Project</Badge>
            <Badge variant="achievement">Achievement</Badge>
            <Badge variant="certificate">Certificate</Badge>
          </div>
        </div>

        {/* Cards & Layout */}
        <div className="space-y-6">
          <h3 className="text-section-title">Cards & Depth</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card variant="default">
              <CardHeader>
                <CardTitle>Default Card</CardTitle>
                <CardDescription>A standard surface for content.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-body">This is a standard card using neutral-100 surface.</p>
              </CardContent>
            </Card>

            <Card variant="elevated">
              <CardHeader>
                <CardTitle>Elevated Card</CardTitle>
                <CardDescription>More depth and a softer background.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-body">This card feels lifted from the page.</p>
              </CardContent>
            </Card>

            <Card variant="interactive">
              <CardHeader>
                <CardTitle>Interactive Card</CardTitle>
                <CardDescription>Hover over me to see the lift effect.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-body">Interactive cards are great for navigation items.</p>
              </CardContent>
            </Card>

            <Card variant="highlighted">
              <CardHeader>
                <CardTitle>Highlighted Card</CardTitle>
                <CardDescription>Used for warnings or special attention.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-body">This card has a primary-colored accent border.</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Overlays & Feedback */}
        <div className="space-y-6">
          <h3 className="text-section-title">Overlays & Feedback</h3>
          <div className="flex flex-wrap gap-6 items-start">
            <div className="space-y-4">
              <UIButton onClick={() => setIsModalOpen(true)}>Open Modal</UIButton>
              <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="System Confirmation">
                <div className="space-y-4">
                  <p className="text-body">Are you sure you want to submit this project for review? This action cannot be undone.</p>
                  <div className="flex justify-end gap-3">
                    <UIButton variant="ghost" onClick={() => setIsModalOpen(false)}>Cancel</UIButton>
                    <UIButton variant="primary" onClick={() => setIsModalOpen(false)}>Confirm Submission</UIButton>
                  </div>
                </div>
              </Modal>
            </div>

            <Dropdown
              trigger={<UIButton variant="outline" leftIcon={<Settings className="h-4 w-4" />}>Account Settings</UIButton>}
              align="right"
            >
              <Dropdown.Item leftIcon={<User className="h-4 w-4" />}>Profile</Dropdown.Item>
              <Dropdown.Item leftIcon={<Bell className="h-4 w-4" />}>Notifications</Dropdown.Item>
              <Divider variant="subtle" />
              <Dropdown.Item leftIcon={<Lock className="h-4 w-4" />} onClick={() => alert('Logging out...')}>Logout</Dropdown.Item>
            </Dropdown>

            <Tooltip text="Click to see more options" position="top">
              <UIButton variant="ghost"><MoreVertical className="h-5 w-5" /></UIButton>
            </Tooltip>
          </div>
        </div>

        {/* Utilities */}
        <div className="space-y-6">
          <h3 className="text-section-title">Utilities</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Avatar src="" fallback="JD" size="md" status="online" />
                <div className="space-y-1">
                  <p className="text-card-title">John Doe</p>
                  <p className="text-secondary text-xs">Available now</p>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-secondary text-xs">Course Progress: 65%</p>
                <ProgressBar value={65} showValue />
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-secondary text-xs">Skeleton Loading State</p>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Skeleton variant="circle" width={40} height={40} />
                  <div className="space-y-2">
                    <Skeleton variant="text" className="w-32" />
                    <Skeleton variant="text" className="w-20" />
                  </div>
                </div>
                <Skeleton variant="rect" height={100} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="pt-12 pb-24 text-center text-secondary text-sm">
        DevFlow Visual Design System &bull; Step 1 Foundation
      </footer>
    </div>
  );
}
