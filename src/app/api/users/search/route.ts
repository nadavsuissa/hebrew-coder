import { NextRequest, NextResponse } from 'next/server';
import * as admin from 'firebase-admin';
import { getAdminDb } from '@/lib/firebase-admin';

export async function GET(request: NextRequest) {
  try {
    // Initialize Firebase Admin
    const db = getAdminDb();
    if (!db) return NextResponse.json({ error: 'Database error' }, { status: 500 });

    // Verify auth
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get search query
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');

    if (!query || query.length < 3) {
      return NextResponse.json({ users: [] });
    }

    // Simple search implementation
    // Firestore doesn't support full-text search natively without third-party tools (Algolia, etc.)
    // We will implement a basic "starts with" search for displayName and email
    // Note: This is case-sensitive in Firestore usually, but we can try a range query

    // Search by email
    const emailSnapshot = await db.collection('users')
      .where('email', '>=', query)
      .where('email', '<=', query + '\uf8ff')
      .limit(5)
      .get();

    // Search by displayName
    const nameSnapshot = await db.collection('users')
      .where('displayName', '>=', query)
      .where('displayName', '<=', query + '\uf8ff')
      .limit(5)
      .get();

    const usersMap = new Map();

    [...emailSnapshot.docs, ...nameSnapshot.docs].forEach(doc => {
        const data = doc.data();
        // Don't include sensitive info
        usersMap.set(doc.id, {
            id: doc.id,
            displayName: data.displayName || 'Unknown',
            email: data.email,
            photoURL: data.photoURL
        });
    });

    return NextResponse.json({ users: Array.from(usersMap.values()) });

  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json({ error: 'Search failed' }, { status: 500 });
  }
}

