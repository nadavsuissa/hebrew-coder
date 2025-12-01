import { NextRequest, NextResponse } from 'next/server';
import * as admin from 'firebase-admin';
import { filterContent } from '@/lib/moderation';

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
    const courseId = searchParams.get('courseId');
    const threadId = searchParams.get('threadId');

    // Authenticate user
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.split('Bearer ')[1];
    await admin.auth().verifyIdToken(token);
    const db = admin.firestore();

    if (threadId) {
      const doc = await db.collection('forum_threads').doc(threadId).get();
      if (!doc.exists) {
        return NextResponse.json({ error: 'Thread not found' }, { status: 404 });
      }
      return NextResponse.json({ thread: { id: doc.id, ...doc.data() } });
    }

    if (!courseId) {
      return NextResponse.json({ error: 'Course ID is required' }, { status: 400 });
    }

    const threadsSnapshot = await db.collection('forum_threads')
      .where('courseId', '==', courseId)
      .orderBy('isPinned', 'desc')
      .orderBy('lastReplyAt', 'desc')
      .limit(50)
      .get();

    const threads = threadsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    return NextResponse.json({ threads });
  } catch (error) {
    console.error('Error fetching threads:', error);
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
    const { courseId, title, content, tags } = body;

    if (!courseId || !title || !content) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Check if user has purchased the course or is admin/moderator
    const isEnrolled = userData.purchasedCourses?.includes(courseId);
    const isStaff = userData.role === 'admin' || userData.role === 'moderator';

    if (!isEnrolled && !isStaff) {
      return NextResponse.json({ error: 'You must be enrolled in this course to post' }, { status: 403 });
    }

    // Content moderation
    const { cleanText: cleanTitle, hasBadWords: titleBad } = filterContent(title);
    const { cleanText: cleanContent, hasBadWords: contentBad } = filterContent(content);

    if (titleBad || contentBad) {
      return NextResponse.json({ error: 'התוכן מכיל מילים לא ראויות' }, { status: 400 });
    }

    const authorName = userData.displayName || userData.email?.split('@')[0] || 'Anonymous';
    // Use photo from DB, or fall back to token picture (Google profile), or empty
    const authorPhotoURL = userData.photoURL || decodedToken.picture || '';

    const threadData = {
      courseId,
      title: cleanTitle,
      content: cleanContent,
      authorId: userId,
      authorName,
      authorPhotoURL,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      lastReplyAt: new Date().toISOString(),
      lastReplyAuthorName: authorName,
      lastReplyAuthorPhotoURL: authorPhotoURL,
      replyCount: 0,
      viewCount: 0,
      isLocked: false,
      isPinned: false,
      tags: tags || []
    };

    const threadRef = await db.collection('forum_threads').add(threadData);

    return NextResponse.json({ 
      success: true, 
      thread: { id: threadRef.id, ...threadData } 
    });

  } catch (error) {
    console.error('Error creating thread:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

