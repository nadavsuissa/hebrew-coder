import { getAdminDb } from './firebase-admin';
import { NotificationType } from '@/types/notification';
import * as admin from 'firebase-admin';

interface CreateNotificationParams {
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  link?: string;
  metadata?: Record<string, any>;
}

export async function createNotification(params: CreateNotificationParams) {
  const db = getAdminDb();
  if (!db) {
    console.error('Failed to initialize Admin DB for notification');
    return null;
  }

  try {
    const notificationData = {
      userId: params.userId,
      type: params.type,
      title: params.title,
      message: params.message,
      read: false,
      createdAt: new Date().toISOString(),
      link: params.link || null,
      metadata: params.metadata || {}
    };

    const ref = await db.collection('notifications').add(notificationData);
    return ref.id;
  } catch (error) {
    console.error('Error creating notification:', error);
    return null;
  }
}

