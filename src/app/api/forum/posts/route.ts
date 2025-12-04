import { NextRequest, NextResponse } from 'next/server';
import * as admin from 'firebase-admin';
import { filterContent } from '@/lib/moderation';
import { createNotification } from '@/lib/server-notifications';

// Initialize Firebase Admin if not already done
if (!admin.apps.length) {
  try {
    const serviceAccountKey = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
    if (serviceAccountKey) {
      const serviceAccount = JSON.parse(serviceAccountKey);
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
      });
    }
  } catch (error) {
    console.error('Firebase admin init error:', error);
  }
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const threadId = searchParams.get('threadId');

    if (!threadId) {
      return NextResponse.json({ error: 'Thread ID is required' }, { status: 400 });
    }

    // Authenticate user
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.split('Bearer ')[1];
    await admin.auth().verifyIdToken(token);

    const db = admin.firestore();
    const postsSnapshot = await db.collection('forum_posts')
      .where('threadId', '==', threadId)
      .orderBy('createdAt', 'asc')
      .get();

    const posts = postsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    // Increment view count async
    db.collection('forum_threads').doc(threadId).update({
      viewCount: admin.firestore.FieldValue.increment(1)
    }).catch(console.error);

    return NextResponse.json({ posts });
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.split('Bearer ')[1];
    const decodedToken = await admin.auth().verifyIdToken(token);
    const userId = decodedToken.uid;

    const db = admin.firestore();
    const userDoc = await db.collection('users').doc(userId).get();
    const userData = userDoc.data();

    if (!userData) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const body = await request.json();
    const { threadId, content } = body;

    if (!threadId || !content) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Check if thread exists and is not locked
    const threadRef = db.collection('forum_threads').doc(threadId);
    const threadDoc = await threadRef.get();
    
    if (!threadDoc.exists) {
      return NextResponse.json({ error: 'Thread not found' }, { status: 404 });
    }

    if (threadDoc.data()?.isLocked) {
      return NextResponse.json({ error: 'Thread is locked' }, { status: 403 });
    }

    // Check if user has purchased the course or is admin/moderator
    const courseId = threadDoc.data()?.courseId;
    const isEnrolled = userData.purchasedCourses?.includes(courseId);
    const isStaff = userData.role === 'admin' || userData.role === 'moderator';

    if (!isEnrolled && !isStaff) {
      return NextResponse.json({ error: 'You must be enrolled in this course to post' }, { status: 403 });
    }

    // Content moderation
    const { cleanText, hasBadWords } = filterContent(content);
    if (hasBadWords) {
      return NextResponse.json({ error: 'התוכן מכיל מילים לא ראויות' }, { status: 400 });
    }

    const postData = {
      threadId,
      content: cleanText,
      authorId: userId,
      authorName: userData.displayName || userData.email?.split('@')[0] || 'Anonymous',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isEdited: false,
      likes: 0
    };

    const postRef = await db.collection('forum_posts').add(postData);

    // Update thread stats
    await threadRef.update({
      replyCount: admin.firestore.FieldValue.increment(1),
      lastReplyAt: new Date().toISOString(),
      lastReplyAuthorName: userData.displayName || userData.email?.split('@')[0] || 'Anonymous'
    });

    // Send notification to thread author (if not self)
    const threadAuthorId = threadDoc.data()?.authorId;
    if (threadAuthorId && threadAuthorId !== userId) {
        const threadTitle = threadDoc.data()?.title;
        await createNotification({
            userId: threadAuthorId,
            type: 'system_update', // Reusing this or we could add 'forum_reply' type
            title: 'תגובה חדשה בדיון שלך',
            message: `נוספה תגובה חדשה בדיון: ${threadTitle}`,
            link: `/learn/${courseId}/forum/thread/${threadId}`,
            metadata: {
                threadId,
                replyAuthorId: userId,
                replyAuthorName: userData.displayName || 'Anonymous'
            }
        });
    }

    return NextResponse.json({ 
      success: true, 
      post: { id: postRef.id, ...postData } 
    });

  } catch (error) {
    console.error('Error creating post:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

