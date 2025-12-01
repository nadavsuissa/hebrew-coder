export interface ForumThread {
  id: string;
  courseId: string;
  title: string;
  content: string; // Initial post content
  authorId: string;
  authorName: string;
  authorPhotoURL?: string;
  createdAt: string;
  updatedAt: string;
  replyCount: number;
  viewCount: number;
  isLocked: boolean;
  isPinned: boolean;
  lastReplyAt?: string;
  lastReplyAuthorName?: string;
  lastReplyAuthorPhotoURL?: string;
  tags?: string[];
}

export interface ForumPost {
  id: string;
  threadId: string;
  content: string;
  authorId: string;
  authorName: string;
  authorPhotoURL?: string;
  createdAt: string;
  updatedAt: string;
  isEdited: boolean;
  likes: number;
}

