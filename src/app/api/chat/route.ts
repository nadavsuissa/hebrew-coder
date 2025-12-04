import { NextRequest, NextResponse } from 'next/server';
import * as admin from 'firebase-admin';
import { createNotification } from '@/lib/server-notifications';

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
    const { searchParams } = new URL(request.url);
    const friendId = searchParams.get('friendId');

    if (!friendId) {
      return NextResponse.json({ error: 'Friend ID required' }, { status: 400 });
    }

    // Verify they are friends
    const friendshipSnapshot = await db.collection('friendships')
      .where('users', 'array-contains', userId)
      .where('status', '==', 'accepted')
      .get();

    const isFriend = friendshipSnapshot.docs.some(doc => {
      const data = doc.data();
      return data.users.includes(friendId);
    });

    if (!isFriend) {
      return NextResponse.json({ error: 'Not friends with this user' }, { status: 403 });
    }

    // Generate conversation ID (consistent for both users)
    const conversationId = [userId, friendId].sort().join('_');

    // Get messages
    const messagesSnapshot = await db.collection('messages')
      .where('conversationId', '==', conversationId)
      .orderBy('createdAt', 'asc')
      .limit(50)
      .get();

    const messages = messagesSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    // Get friend details
    const friendDoc = await db.collection('users').doc(friendId).get();
    const friendData = friendDoc.data();

    const friend = {
      id: friendId,
      displayName: friendData?.displayName || friendData?.email?.split('@')[0] || 'Unknown',
      email: friendData?.email,
      photoURL: friendData?.photoURL || '🐵',
      isOnline: false // We'll implement presence later
    };

    return NextResponse.json({
      friend,
      messages
    });

  } catch (error) {
    console.error('Error fetching chat:', error);
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
    const { friendId, content, messageType = 'text' } = await request.json();

    if (!friendId || !content) {
      return NextResponse.json({ error: 'Friend ID and content required' }, { status: 400 });
    }

    // Rate Limiting
    const { rateLimit } = await import('@/lib/rate-limit');
    const rateLimitResult = await rateLimit(userId, 'chat');
    
    if (!rateLimitResult.success) {
        return NextResponse.json({ error: 'Too many messages. Please slow down.' }, { status: 429 });
    }

    // Verify they are friends
    const friendshipSnapshot = await db.collection('friendships')
      .where('users', 'array-contains', userId)
      .where('status', '==', 'accepted')
      .get();

    const isFriend = friendshipSnapshot.docs.some(doc => {
      const data = doc.data();
      return data.users.includes(friendId);
    });

    if (!isFriend) {
      return NextResponse.json({ error: 'Not friends with this user' }, { status: 403 });
    }

    // Generate conversation ID
    const conversationId = [userId, friendId].sort().join('_');

    // Create message
    const messageData = {
      conversationId,
      senderId: userId,
      receiverId: friendId,
      participants: [userId, friendId],
      content,
      messageType,
      createdAt: new Date().toISOString(),
      read: false
    };

    const messageRef = await db.collection('messages').add(messageData);

    // Check for existing chat notification from this sender
    const notificationsSnapshot = await db.collection('notifications')
      .where('userId', '==', friendId)
      .where('type', '==', 'chat_message')
      .where('read', '==', false)
      .where('metadata.fromUserId', '==', userId)
      .get();

    // Get sender name for notification
    const senderDoc = await db.collection('users').doc(userId).get();
    const senderData = senderDoc.data();
    const senderName = senderData?.displayName || 'User';

    if (notificationsSnapshot.empty) {
      // Create new notification
      await createNotification({
        userId: friendId,
        type: 'chat_message',
        title: `הודעה חדשה מ-${senderName}`,
        message: content.length > 50 ? content.substring(0, 50) + '...' : content,
        link: `/chat/${userId}`,
        metadata: {
          fromUserId: userId,
          fromUserName: senderName,
          fromUserPhoto: senderData?.photoURL,
          conversationId
        }
      });
    } else {
      // Update existing notification (optional: could increment a counter or update message snippet)
      // For now, we just update the timestamp to bring it to top and update message
      const notifDoc = notificationsSnapshot.docs[0];
      await notifDoc.ref.update({
        message: content.length > 50 ? content.substring(0, 50) + '...' : content,
        createdAt: new Date().toISOString(),
        // Maybe increment count? not implemented in type yet
      });
    }

    return NextResponse.json({
      success: true,
      messageId: messageRef.id,
      message: {
        id: messageRef.id,
        ...messageData
      }
    });

  } catch (error) {
    console.error('Error sending message:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
