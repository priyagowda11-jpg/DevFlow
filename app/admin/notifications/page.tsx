'use client';

import React, { useState, useEffect } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { storage } from '@/lib/storage';
import { Notification } from '@/types';
import { Bell, CheckCircle, Trash2, Send, Megaphone } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/Badge';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { AdminTable } from '@/components/admin/AdminTable';

export default function AdminNotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [broadcastMsg, setBroadcastMsg] = useState('');
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = () => {
    setNotifications(storage.getNotifications());
  };

  const handleMarkAllRead = () => {
    const all = storage.getNotifications();
    const updated = all.map(n => ({ ...n, isRead: true }));
    storage.saveNotifications(updated);
    loadNotifications();
  };

  const handleClearAll = () => {
    if (confirm('Are you sure you want to clear all platform notifications? This action cannot be undone.')) {
      storage.saveNotifications([]);
      loadNotifications();
    }
  };

  const handleMarkRead = (id: string) => {
    storage.markNotificationAsRead(id);
    loadNotifications();
  };

  const handleSendBroadcast = async () => {
    if (!broadcastMsg.trim()) return;
    setIsSending(true);

    const students = storage.getStudents();
    const timestamp = new Date().toISOString();
    const newNotifications = students.map(s => ({
      id: crypto.randomUUID(),
      studentId: s.id,
      title: 'Platform Announcement',
      message: broadcastMsg,
      type: 'System' as const,
      createdAt: timestamp,
      timestamp: timestamp,
      isRead: false
    }));

    const current = storage.getNotifications();
    storage.saveNotifications([...current, ...newNotifications]);

    setBroadcastMsg('');
    setIsSending(false);
    loadNotifications();
  };

  const columns = [
    {
      key: 'recipient',
      label: 'Recipient',
      render: (_: any, n: any) => {
        const student = storage.getStudentById(n.studentId);
        return (
          <div className="flex items-center gap-3">
            <div className="h-7 w-7 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-[10px] font-black text-neutral-500">
              {student?.fullName.charAt(0).toUpperCase()}
            </div>
            <span className="font-black text-neutral-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
              {student?.fullName || 'Unknown'}
            </span>
          </div>
        );
      },
    },
    {
      key: 'message',
      label: 'Message',
      render: (val: any, n: any) => (
        <span className={cn('text-sm text-neutral-600 dark:text-neutral-400 line-clamp-1', !n.isRead && 'font-bold text-neutral-900 dark:text-white')}>
          {val}
        </span>
      ),
    },
    {
      key: 'category',
      label: 'Category',
      render: (val: any) => (
        <Badge
          variant="project"
          className={cn(
            'text-[9px] px-2 py-0.5 rounded-md font-black uppercase tracking-wider',
            val === 'Achievement' ? 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400' :
            val === 'Course' ? 'bg-primary-100 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400' :
            'bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400'
          )}
        >
          {val}
        </Badge>
      ),
    },
    {
      key: 'date',
      label: 'Date',
      render: (_: any, n: any) => (
        <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400">
          {new Date(n.timestamp).toLocaleDateString()}
        </span>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      align: 'right' as const,
      render: (_: any, n: any) => (
        <span className={cn('text-[10px] font-black uppercase tracking-wider', n.isRead ? 'text-emerald-500' : 'text-primary-500')}>
          {n.isRead ? 'Read' : 'Unread'}
        </span>
      ),
    },
    {
      key: 'actions',
      label: 'Action',
      align: 'right' as const,
      render: (_: any, n: any) => (
        !n.isRead && (
          <Button variant="ghost" size="sm" className="gap-2 h-9 rounded-lg font-bold text-xs hover:bg-primary-50 dark:hover:bg-primary-900/20" onClick={() => handleMarkRead(n.id)}>
            Mark Read
          </Button>
        )
      ),
    },
  ];

  return (
    <PageContainer>
      <div className="space-y-10">
        <AdminPageHeader
          title="Platform Notifications"
          subtitle="Manage system-wide alerts and broadcast communications to students."
          icon={<Bell className="h-6 w-6" />}
          actions={
            <div className="flex gap-3">
              <Button variant="outline" size="sm" className="gap-2 h-11 rounded-xl font-bold" onClick={handleMarkAllRead}>
                <CheckCircle className="h-4 w-4" /> Mark All Read
              </Button>
              <Button variant="outline" size="sm" className="gap-2 h-11 rounded-xl font-bold text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20" onClick={handleClearAll}>
                <Trash2 className="h-4 w-4" /> Clear All
              </Button>
            </div>
          }
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Broadcast Panel */}
          <Card variant="elevated" className="p-8 space-y-6 border-neutral-200 dark:border-neutral-800 surface-layered h-fit">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary-100 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400">
                <Megaphone className="h-5 w-5" />
              </div>
              <h3 className="text-xl font-black text-neutral-900 dark:text-white">Global Broadcast</h3>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-black text-neutral-400 uppercase tracking-widest">Message Content</label>
                <textarea
                  className="w-full p-4 rounded-2xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-sm outline-none focus:ring-2 focus:ring-primary-500 transition-all min-h-[120px] resize-none"
                  placeholder="Type a platform-wide announcement..."
                  value={broadcastMsg}
                  onChange={(e) => setBroadcastMsg(e.target.value)}
                />
              </div>
              <Button
                variant="primary"
                className="w-full gap-2 h-12 rounded-xl font-bold shadow-lg shadow-primary-500/20 transition-transform active:scale-95"
                onClick={handleSendBroadcast}
                disabled={isSending || !broadcastMsg.trim()}
              >
                <Send className="h-4 w-4" /> {isSending ? 'Sending...' : 'Broadcast to All'}
              </Button>
              <p className="text-center text-[10px] text-neutral-400 font-medium italic">
                This will send a notification to every registered student.
              </p>
            </div>
          </Card>

          {/* Notification Ledger */}
          <div className="lg:col-span-2 space-y-6">
            <AdminTable
              columns={columns}
              data={notifications}
              emptyState={
                <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
                  <div className="p-4 bg-neutral-100 dark:bg-neutral-800 rounded-full text-neutral-400">
                    <Bell className="h-8 w-8" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-lg font-black text-neutral-900 dark:text-white">No notifications available</h3>
                    <p className="text-secondary text-sm">System-wide alerts will appear here once broadcast.</p>
                  </div>
                </div>
              }
            />
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
