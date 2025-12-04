export type NotificationType = 'friend_request' | 'friend_accept' | 'chat_message' | 'system_update' | 'achievement';

export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  read: boolean;
  createdAt: string; // ISO string
  link?: string;
  metadata?: {
    fromUserId?: string;
    fromUserName?: string;
    fromUserPhoto?: string;
    [key: string]: any;
  };
}

