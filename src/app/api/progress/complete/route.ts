import { NextRequest, NextResponse } from 'next/server';
import * as admin from 'firebase-admin';
import { createNotification } from '@/lib/server-notifications';
import { lessonCompletionSchema } from '@/lib/validations';

// Initialize Firebase Admin
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

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.split('Bearer ')[1];
    const decodedToken = await admin.auth().verifyIdToken(token);
    const userId = decodedToken.uid;

    const body = await request.json();
    const validation = lessonCompletionSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
    }

    const { lessonId, courseId, xpEarned } = validation.data;
    const db = admin.firestore();
    const userRef = db.collection('users').doc(userId);

    // Run transaction to ensure atomic updates
    const result = await db.runTransaction(async (transaction) => {
      const userDoc = await transaction.get(userRef);
      if (!userDoc.exists) {
        throw new Error('User not found');
      }

      const userData = userDoc.data();
      const currentXp = userData?.xp || 0;
      const completedLessons = userData?.completedLessons || [];
      const streakDays = userData?.streakDays || 0;

      // If already completed, don't add XP again
      if (completedLessons.includes(lessonId)) {
        return { alreadyCompleted: true };
      }

      const newXp = currentXp + xpEarned;
      const newCompletedLessons = [...completedLessons, lessonId];

      transaction.update(userRef, {
        xp: newXp,
        completedLessons: newCompletedLessons,
        lastActiveAt: new Date().toISOString()
      });

      return { 
        newXp, 
        completedCount: newCompletedLessons.length,
        streakDays,
        alreadyCompleted: false 
      };
    });

    if (result.alreadyCompleted) {
        return NextResponse.json({ success: true, message: 'Already completed' });
    }

    // Check for achievements
    const newAchievements: string[] = [];

    // 1. First Lesson
    if (result.completedCount === 1) {
        newAchievements.push('first_lesson');
        await createNotification({
            userId,
            type: 'achievement',
            title: 'הישג חדש: צעד ראשון! 🏆',
            message: 'השלמת את השיעור הראשון שלך. כל הכבוד!',
            link: '/dashboard'
        });
    }

    // 2. 10 Lessons
    if (result.completedCount === 10) {
        newAchievements.push('lessons_10');
        await createNotification({
            userId,
            type: 'achievement',
            title: 'הישג חדש: לומד נחוש! 🎓',
            message: 'השלמת 10 שיעורים. אתה בדרך הנכונה!',
            link: '/dashboard'
        });
    }

    // 3. Level Up (Simple logic: every 1000 XP is a level)
    const oldLevel = Math.floor((result.newXp - xpEarned) / 1000) + 1;
    const newLevel = Math.floor(result.newXp / 1000) + 1;

    if (newLevel > oldLevel) {
        await createNotification({
            userId,
            type: 'achievement',
            title: `עלית לרמה ${newLevel}! 🚀`,
            message: 'המשך כך, השמיים הם הגבול!',
            link: '/dashboard'
        });
        
        if (newLevel === 5) {
             newAchievements.push('level_5');
             await createNotification({
                userId,
                type: 'achievement',
                title: 'הישג חדש: תלמיד מתקדם! 🌟',
                message: 'הגעת לרמה 5. הידע שלך גדל!',
                link: '/dashboard'
            });
        }
    }

    // Save unlocked badges if any
    if (newAchievements.length > 0) {
        await userRef.update({
            unlockedBadges: admin.firestore.FieldValue.arrayUnion(...newAchievements)
        });
    }

    return NextResponse.json({ success: true, newXp: result.newXp });

  } catch (error) {
    console.error('Error completing lesson:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

