import { NextRequest, NextResponse } from 'next/server';
import * as admin from 'firebase-admin';

export async function GET() {
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

    const db = admin.firestore();

    // Try to get a count of users
    const usersSnapshot = await db.collection('users').get();
    const userCount = usersSnapshot.size;

    return NextResponse.json({
      status: 'Firebase Admin working',
      userCount,
      collections: ['users', 'other collections...']
    });
  } catch (error) {
    console.error('Firebase Admin test error:', error);
    return NextResponse.json({
      error: 'Firebase Admin test failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
