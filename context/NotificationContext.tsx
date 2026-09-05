"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Notification } from '@/types';
import { storage } from '@/lib/storage';
import { useAuth } from './AuthContext';

interface NotificationContextType {
  notifications: Notification[];
  filter: 'All' | 'Unread';
  setFilter: (filter: 'All' | 'Unread') => void;
  addNotification: (notification: Omit<Notification, 'id' | 'createdAt' | 'isRead'>) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  clearNotifications: () => void;
  unreadCount: number;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [filter, setFilter] = useState<'All' | 'Unread'>('All');

  useEffect(() => {
    if (user?.id) {
      setNotifications(storage.getStudentNotifications(user.id));
    }
  }, [user?.id]);

  const addNotification = (notif: Omit<Notification, 'id' | 'createdAt' | 'isRead'>) => {
    if (!user?.id) return;

    const newNotif: Notification = {
      ...notif,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      isRead: false,
      studentId: user.id,
    };

    storage.addNotification(newNotif);
    setNotifications(prev => [newNotif, ...prev]);
  };

  const markAsRead = (id: string) => {
    storage.markNotificationAsRead(id);
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
  };

  const markAllAsRead = () => {
    if (!user?.id) return;
    storage.markAllNotificationsAsRead(user.id);
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  const clearNotifications = () => {
    if (!user?.id) return;
    const all = storage.getNotifications();
    const filtered = all.filter(n => n.studentId !== user.id);
    storage.saveNotifications(filtered);
    setNotifications([]);
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <NotificationContext.Provider value={{ notifications, filter, setFilter, addNotification, markAsRead, markAllAsRead, clearNotifications, unreadCount }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};
