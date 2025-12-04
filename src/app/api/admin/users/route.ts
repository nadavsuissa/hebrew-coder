import { NextRequest, NextResponse } from 'next/server';
import { getAdminDb } from '@/lib/firebase-admin';

export async function GET() {
  const db = getAdminDb();
  if (!db) {
    return NextResponse.json({ error: 'Database not initialized' }, { status: 500 });
  }

  try {
    // In a real app, we would check for Admin role claims here
    // const token = req.headers.get('Authorization')?.split('Bearer ')[1];
    // const decodedToken = await admin.auth().verifyIdToken(token);
    // if (!decodedToken.admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });

    const snapshot = await db.collection('users').limit(50).get();
    const users = snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        createdAt: data.createdAt?.toDate?.() ? data.createdAt.toDate().toISOString() : data.createdAt || new Date().toISOString(),
        lastLoginAt: data.lastLoginAt?.toDate?.() ? data.lastLoginAt.toDate().toISOString() : data.lastLoginAt
      };
    });

    return NextResponse.json({ users });
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
    const db = getAdminDb();
    if (!db) return NextResponse.json({ error: 'Database error' }, { status: 500 });

    try {
        const body = await req.json();
        const { userId, action } = body;

        if (!userId || !action) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const userRef = db.collection('users').doc(userId);

        if (action === 'ban') {
            await userRef.update({ isBanned: true });
            // Optional: Disable auth
            // await admin.auth().updateUser(userId, { disabled: true });
        } else if (action === 'unban') {
            await userRef.update({ isBanned: false });
        } else if (action === 'promote_admin') {
             await userRef.update({ role: 'admin' });
        }

        return NextResponse.json({ success: true });

    } catch (error) {
        console.error('Error updating user:', error);
        return NextResponse.json({ error: 'Failed to update user' }, { status: 500 });
    }
}
