import { getAdminDb } from '@/lib/firebase-admin';
import { FieldValue } from 'firebase-admin/firestore';
import { NextResponse } from 'next/server';
import { courses } from '@/lib/curriculum';

export async function POST(req: Request) {
  try {
    const { courseId, userId } = await req.json();

    if (!courseId || !userId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const course = courses.find(c => c.id === courseId);
    if (!course) {
      return NextResponse.json({ error: 'Course not found' }, { status: 404 });
    }

    const db = getAdminDb();
    if (!db) {
      return NextResponse.json({ error: 'Database connection failed' }, { status: 500 });
    }

    await db.collection('users').doc(userId).update({
      purchasedCourses: FieldValue.arrayUnion(courseId)
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Enrollment error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

