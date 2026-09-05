'use client';

import React from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Search, Book, LifeBuoy, MessageCircle, ShieldCheck, HelpCircle } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const helpCategories = [
    {
      title: 'Getting Started',
      icon: <Rocket className="h-5 w-5 text-primary-600" />,
      items: [
        { title: 'Quick Start Guide', description: 'Learn the basics of DevFlow in 5 minutes.', link: '#' },
        { title: 'Platform Overview', description: 'Understanding the dashboard and workspace.', link: '#' },
        { title: 'Setting Up Your Profile', description: 'Customize your developer persona.', link: '#' },
      ]
    },
    {
      title: 'Projects & Tasks',
      icon: <FolderKanban className="h-5 w-5 text-secondary-600" />,
      items: [
        { title: 'Managing Workspaces', description: 'How to organize projects and teams.', link: '#' },
        { title: 'Kanban Board Guide', description: 'Optimizing your task flow.', link: '#' },
        { title: 'Tracking Progress', description: 'Using analytics to monitor growth.', link: '#' },
      ]
    },
    {
      title: 'Learning & Growth',
      icon: <BookOpen className="h-5 w-5 text-accent-600" />,
      items: [
        { title: 'Course Curriculum', description: 'How learning paths are structured.', link: '#' },
        { title: 'Earning Certificates', description: 'Requirements for professional validation.', link: '#' },
        { title: 'Achievement System', description: 'Unlocking milestones and badges.', link: '#' },
      ]
    },
    {
      title: 'Account & Security',
      icon: <ShieldCheck className="h-5 w-5 text-red-600" />,
      items: [
        { title: 'Privacy Policy', description: 'How we handle your development data.', link: '#' },
        { title: 'Password Security', description: 'Keeping your account safe.', link: '#' },
        { title: 'Terms of Service', description: 'Platform usage guidelines.', link: '#' },
      ]
    }
  ];

  return (
    <PageContainer>
      <div className="max-w-5xl mx-auto px-4 py-8 space-y-12">
        <div className="text-center space-y-4 mb-12">
          <div className="inline-flex p-3 rounded-2xl bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 mb-4">
            <HelpCircle className="h-8 w-8" />
          </div>
          <h1 className="text-4xl font-bold text-neutral-900 dark:text-white tracking-tight">Help Center</h1>
          <p className="text-secondary text-lg max-w-2xl mx-auto">
            Everything you need to master DevFlow and accelerate your developer journey.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-2xl mx-auto">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-neutral-400">
            <Search className="h-5 w-5" />
          </div>
          <input
            type="text"
            placeholder="Search for articles, guides, or keywords..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-4 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-sm outline-none focus:ring-2 focus:ring-primary-500 shadow-sm transition-all"
          />
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {helpCategories.map((category, idx) => (
            <Card key={idx} variant="elevated" className="p-8 space-y-6 transition-all hover:shadow-md border-neutral-200 dark:border-neutral-800">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-neutral-50 dark:bg-neutral-800">
                  {category.icon}
                </div>
                <h2 className="text-xl font-bold text-neutral-900 dark:text-white">{category.title}</h2>
              </div>
              <div className="space-y-3">
                {category.items.map((item, itemIdx) => (
                  <a
                    key={itemIdx}
                    href={item.link}
                    className="group flex items-center justify-between p-3 rounded-xl hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
                  >
                    <div className="space-y-1">
                      <span className="text-sm font-bold text-neutral-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                        {item.title}
                      </span>
                      <p className="text-xs text-secondary line-clamp-1">{item.description}</p>
                    </div>
                    <div className="p-1 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-400 group-hover:text-primary-500 transition-colors">
                      <ChevronRight className="h-4 w-4" />
                    </div>
                  </a>
                ))}
              </div>
            </Card>
          ))}
        </div>

        {/* Support Section */}
        <div className="relative p-8 rounded-[2rem] bg-neutral-900 dark:bg-primary-900 text-white overflow-hidden text-center space-y-6">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <LifeBuoy className="h-32 w-32 rotate-12" />
          </div>
          <div className="relative z-10 space-y-4">
            <h3 className="text-2xl font-bold">Still need help?</h3>
            <p className="text-neutral-400 dark:text-primary-200 max-w-md mx-auto text-sm leading-relaxed">
              Our support team is available 24/7 to help you resolve any technical issues or answer platform questions.
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <Button variant="primary" className="gap-2 rounded-xl h-12 px-8 font-bold bg-white text-neutral-900 hover:bg-neutral-100 transition-all">
                <MessageCircle className="h-5 w-5" />
                Contact Support
              </Button>
              <Button variant="outline" className="gap-2 rounded-xl h-12 px-8 font-bold border-white/20 text-white hover:bg-white/10 transition-all">
                <Book className="h-5 w-5" />
                Read Community Forum
              </Button>
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}

// Mock imports for missing icons in this file
function Rocket(props: any) { return <div {...props}>🚀</div>; }
function FolderKanban(props: any) { return <div {...props}>📁</div>; }
function BookOpen(props: any) { return <div {...props}>📖</div>; }
function ChevronRight(props: any) { return <div {...props}>→</div>; }
