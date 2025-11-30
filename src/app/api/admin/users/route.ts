import { NextRequest, NextResponse } from 'next/server';
import * as admin from 'firebase-admin';

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

    // Verify admin authentication
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.split('Bearer ')[1];
    const decodedToken = await admin.auth().verifyIdToken(token);

    // Check if user is admin
    const db = admin.firestore();
    const userDoc = await db.collection('users').doc(decodedToken.uid).get();
    const userData = userDoc.data();

    if (!userData || userData.role !== 'admin') {
      return NextResponse.json({ error: 'Insufficient permissions' }, { status: 403 });
    }

    // Get all users
    const usersSnapshot = await db.collection('users').orderBy('createdAt', 'desc').get();
    const users = usersSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    return NextResponse.json({ users });

  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
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

    // Verify admin authentication
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.split('Bearer ')[1];
    const decodedToken = await admin.auth().verifyIdToken(token);

    // Check if user is admin
    const db = admin.firestore();
    const adminDoc = await db.collection('users').doc(decodedToken.uid).get();
    const adminData = adminDoc.data();

    if (!adminData || adminData.role !== 'admin') {
      return NextResponse.json({ error: 'Insufficient permissions' }, { status: 403 });
    }

    const { userId, role } = await request.json();

    if (!userId || !role || !['user', 'moderator', 'admin'].includes(role)) {
      return NextResponse.json({ error: 'Invalid request data' }, { status: 400 });
    }

    // Update user role
    await db.collection('users').doc(userId).update({ role });

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('Error updating user role:', error);
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

    // Verify admin authentication
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.split('Bearer ')[1];
    const decodedToken = await admin.auth().verifyIdToken(token);

    // Check if user is admin
    const db = admin.firestore();
    const adminDoc = await db.collection('users').doc(decodedToken.uid).get();
    const adminData = adminDoc.data();

    if (!adminData || adminData.role !== 'admin') {
      return NextResponse.json({ error: 'Insufficient permissions' }, { status: 403 });
    }

    const { userId } = await request.json();

    if (!userId) {
      return NextResponse.json({ error: 'User ID required' }, { status: 400 });
    }

    // Don't allow deleting the admin user
    if (userId === decodedToken.uid) {
      return NextResponse.json({ error: 'Cannot delete admin user' }, { status: 400 });
    }

    // Delete user document
    await db.collection('users').doc(userId).delete();

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('Error deleting user:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
