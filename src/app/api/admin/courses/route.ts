import { NextRequest, NextResponse } from 'next/server';
import * as admin from 'firebase-admin';
import { Course, Module, Lesson, LessonType, QuizQuestion } from '@/types/course';

export async function GET(request: NextRequest) {
  try {
    // Initialize Firebase Admin if not already done
    if (!admin.apps.length) {
      const serviceAccountKey = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
      if (!serviceAccountKey) {
        return NextResponse.json({ error: 'FIREBASE_SERVICE_ACCOUNT_KEY not found' }, { status: 500 });
      }

      const serviceAccount = JSON.parse(serviceAccountKey);
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
      });
    }

    // Verify authentication
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.split('Bearer ')[1];
    const decodedToken = await admin.auth().verifyIdToken(token);
    const userId = decodedToken.uid;

    const db = admin.firestore();

    // Check user role
    const userDoc = await db.collection('users').doc(userId).get();
    const userData = userDoc.data();

    if (!userData) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const userRole = userData.role || 'user';
    const isAdmin = userRole === 'admin';
    const isModerator = userRole === 'moderator';

    if (!isAdmin && !isModerator) {
      return NextResponse.json({ error: 'Insufficient permissions' }, { status: 403 });
    }

    // Get courses based on permissions
    let coursesQuery: any = db.collection('courses');

    if (isModerator && !isAdmin) {
      // Moderators can only see their own courses
      coursesQuery = coursesQuery.where('createdBy', '==', userId);
    }

    const coursesSnapshot = await coursesQuery.get();
    const courses = coursesSnapshot.docs.map((doc: any) => ({
      id: doc.id,
      ...doc.data()
    }));

    return NextResponse.json({ courses, userRole });

  } catch (error) {
    console.error('Error fetching courses:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    // Initialize Firebase Admin if not already done
    if (!admin.apps.length) {
      const serviceAccountKey = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
      if (!serviceAccountKey) {
        return NextResponse.json({ error: 'FIREBASE_SERVICE_ACCOUNT_KEY not found' }, { status: 500 });
      }

      const serviceAccount = JSON.parse(serviceAccountKey);
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
      });
    }

    // Verify authentication
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.split('Bearer ')[1];
    const decodedToken = await admin.auth().verifyIdToken(token);
    const userId = decodedToken.uid;

    const db = admin.firestore();

    // Check user role
    const userDoc = await db.collection('users').doc(userId).get();
    const userData = userDoc.data();

    if (!userData) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const userRole = userData.role || 'user';
    const isAdmin = userRole === 'admin';
    const isModerator = userRole === 'moderator';

    if (!isAdmin && !isModerator) {
      return NextResponse.json({ error: 'Insufficient permissions' }, { status: 403 });
    }

    const courseData = await request.json();

    // Validate course data
    if (!courseData.title || !courseData.description) {
      return NextResponse.json({ error: 'Course title and description are required' }, { status: 400 });
    }

    // Create course object
    const course: Omit<Course, 'id'> = {
      title: courseData.title,
      description: courseData.description,
      icon: courseData.icon || '📚',
      color: courseData.color || 'from-blue-500 to-purple-500',
      modules: courseData.modules || [],
      createdBy: userId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      published: courseData.published || false,
      tags: courseData.tags || []
    };

    // Add course to database
    const courseRef = await db.collection('courses').add(course);

    return NextResponse.json({
      success: true,
      courseId: courseRef.id,
      course: { id: courseRef.id, ...course }
    });

  } catch (error) {
    console.error('Error creating course:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    // Initialize Firebase Admin if not already done
    if (!admin.apps.length) {
      const serviceAccountKey = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
      if (!serviceAccountKey) {
        return NextResponse.json({ error: 'FIREBASE_SERVICE_ACCOUNT_KEY not found' }, { status: 500 });
      }

      const serviceAccount = JSON.parse(serviceAccountKey);
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
      });
    }

    // Verify authentication
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.split('Bearer ')[1];
    const decodedToken = await admin.auth().verifyIdToken(token);
    const userId = decodedToken.uid;

    const db = admin.firestore();

    // Check user role
    const userDoc = await db.collection('users').doc(userId).get();
    const userData = userDoc.data();

    if (!userData) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const userRole = userData.role || 'user';
    const isAdmin = userRole === 'admin';
    const isModerator = userRole === 'moderator';

    if (!isAdmin && !isModerator) {
      return NextResponse.json({ error: 'Insufficient permissions' }, { status: 403 });
    }

    const { courseId, ...courseData } = await request.json();

    if (!courseId) {
      return NextResponse.json({ error: 'Course ID is required' }, { status: 400 });
    }

    // Check course ownership for moderators
    if (isModerator && !isAdmin) {
      const courseDoc = await db.collection('courses').doc(courseId).get();
      if (!courseDoc.exists) {
        return NextResponse.json({ error: 'Course not found' }, { status: 404 });
      }

      const course = courseDoc.data();
      if (course?.createdBy !== userId) {
        return NextResponse.json({ error: 'You can only edit your own courses' }, { status: 403 });
      }
    }

    // Validate course data
    if (!courseData.title || !courseData.description) {
      return NextResponse.json({ error: 'Course title and description are required' }, { status: 400 });
    }

    // Update course
    const updateData = {
      title: courseData.title,
      description: courseData.description,
      icon: courseData.icon,
      color: courseData.color,
      modules: courseData.modules || [],
      updatedAt: new Date().toISOString(),
      published: courseData.published,
      tags: courseData.tags || []
    };

    await db.collection('courses').doc(courseId).update(updateData);

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('Error updating course:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    // Initialize Firebase Admin if not already done
    if (!admin.apps.length) {
      const serviceAccountKey = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
      if (!serviceAccountKey) {
        return NextResponse.json({ error: 'FIREBASE_SERVICE_ACCOUNT_KEY not found' }, { status: 500 });
      }

      const serviceAccount = JSON.parse(serviceAccountKey);
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
      });
    }

    // Verify authentication
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.split('Bearer ')[1];
    const decodedToken = await admin.auth().verifyIdToken(token);
    const userId = decodedToken.uid;

    const db = admin.firestore();

    // Check user role
    const userDoc = await db.collection('users').doc(userId).get();
    const userData = userDoc.data();

    if (!userData) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const userRole = userData.role || 'user';
    const isAdmin = userRole === 'admin';
    const isModerator = userRole === 'moderator';

    if (!isAdmin && !isModerator) {
      return NextResponse.json({ error: 'Insufficient permissions' }, { status: 403 });
    }

    const { courseId } = await request.json();

    if (!courseId) {
      return NextResponse.json({ error: 'Course ID is required' }, { status: 400 });
    }

    // Check course ownership for moderators
    if (isModerator && !isAdmin) {
      const courseDoc = await db.collection('courses').doc(courseId).get();
      if (!courseDoc.exists) {
        return NextResponse.json({ error: 'Course not found' }, { status: 404 });
      }

      const course = courseDoc.data();
      if (course?.createdBy !== userId) {
        return NextResponse.json({ error: 'You can only delete your own courses' }, { status: 403 });
      }
    }

    // Delete course
    await db.collection('courses').doc(courseId).delete();

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('Error deleting course:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
