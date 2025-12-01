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

    // Verify authentication
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.split('Bearer ')[1];
    const decodedToken = await admin.auth().verifyIdToken(token);
    const userId = decodedToken.uid;

    const db = admin.firestore();

    // Get friends list
    const friendshipsSnapshot = await db.collection('friendships')
      .where('users', 'array-contains', userId)
      .where('status', '==', 'accepted')
      .get();

    const friendsIds = friendshipsSnapshot.docs.map(doc => {
      const data = doc.data();
      return data.users.find((id: string) => id !== userId);
    });

    // Get friends details
    const friendsPromises = friendsIds.map(async (friendId: string) => {
      const userDoc = await db.collection('users').doc(friendId).get();
      const userData = userDoc.data();
      return {
        id: friendId,
        displayName: userData?.displayName || userData?.email?.split('@')[0] || 'Unknown',
        email: userData?.email,
        photoURL: userData?.photoURL || '🐵',
        xp: userData?.xp || 0,
        lastLoginAt: userData?.lastLoginAt,
        isOnline: false // We'll implement this later with presence
      };
    });

    const friends = await Promise.all(friendsPromises);

    // Get pending friend requests (sent and received)
    const sentRequestsSnapshot = await db.collection('friend_requests')
      .where('fromUserId', '==', userId)
      .where('status', '==', 'pending')
      .get();

    const receivedRequestsSnapshot = await db.collection('friend_requests')
      .where('toUserId', '==', userId)
      .where('status', '==', 'pending')
      .get();

    const sentRequests = sentRequestsSnapshot.docs.map(async (doc) => {
      const data = doc.data();
      const userDoc = await db.collection('users').doc(data.toUserId).get();
      const userData = userDoc.data();
      return {
        id: doc.id,
        toUser: {
          id: data.toUserId,
          displayName: userData?.displayName || userData?.email?.split('@')[0] || 'Unknown',
          email: userData?.email,
          photoURL: userData?.photoURL || '🐵'
        },
        createdAt: data.createdAt
      };
    });

    const receivedRequests = receivedRequestsSnapshot.docs.map(async (doc) => {
      const data = doc.data();
      const userDoc = await db.collection('users').doc(data.fromUserId).get();
      const userData = userDoc.data();
      return {
        id: doc.id,
        fromUser: {
          id: data.fromUserId,
          displayName: userData?.displayName || userData?.email?.split('@')[0] || 'Unknown',
          email: userData?.email,
          photoURL: userData?.photoURL || '🐵'
        },
        createdAt: data.createdAt
      };
    });

    const [sent, received] = await Promise.all([
      Promise.all(sentRequests),
      Promise.all(receivedRequests)
    ]);

    return NextResponse.json({
      friends,
      sentRequests: sent,
      receivedRequests: received
    });

  } catch (error) {
    console.error('Error fetching friends:', error);
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
    const { action, targetUserId, requestId } = await request.json();

    if (action === 'send_request') {
      // Check if request already exists
      const existingRequest = await db.collection('friend_requests')
        .where('fromUserId', '==', userId)
        .where('toUserId', '==', targetUserId)
        .where('status', '==', 'pending')
        .get();

      if (!existingRequest.empty) {
        return NextResponse.json({ error: 'Friend request already sent' }, { status: 400 });
      }

      // Check if already friends
      const existingFriendship = await db.collection('friendships')
        .where('users', 'array-contains', userId)
        .get();

      const isAlreadyFriend = existingFriendship.docs.some(doc => {
        const data = doc.data();
        return data.users.includes(targetUserId) && data.status === 'accepted';
      });

      if (isAlreadyFriend) {
        return NextResponse.json({ error: 'Already friends' }, { status: 400 });
      }

      // Create friend request
      await db.collection('friend_requests').add({
        fromUserId: userId,
        toUserId: targetUserId,
        status: 'pending',
        createdAt: new Date().toISOString()
      });

      return NextResponse.json({ success: true });

    } else if (action === 'accept_request') {
      if (!requestId) {
        return NextResponse.json({ error: 'Request ID required' }, { status: 400 });
      }

      // Get the request
      const requestDoc = await db.collection('friend_requests').doc(requestId).get();
      if (!requestDoc.exists) {
        return NextResponse.json({ error: 'Request not found' }, { status: 404 });
      }

      const requestData = requestDoc.data();
      if (requestData?.toUserId !== userId || requestData?.status !== 'pending') {
        return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
      }

      // Update request status
      await db.collection('friend_requests').doc(requestId).update({
        status: 'accepted'
      });

      // Create friendship
      await db.collection('friendships').add({
        users: [requestData.fromUserId, requestData.toUserId],
        status: 'accepted',
        createdAt: new Date().toISOString()
      });

      return NextResponse.json({ success: true });

    } else if (action === 'decline_request') {
      if (!requestId) {
        return NextResponse.json({ error: 'Request ID required' }, { status: 400 });
      }

      const requestDoc = await db.collection('friend_requests').doc(requestId).get();
      if (!requestDoc.exists) {
        return NextResponse.json({ error: 'Request not found' }, { status: 404 });
      }

      const requestData = requestDoc.data();
      if (requestData?.toUserId !== userId || requestData?.status !== 'pending') {
        return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
      }

      // Update request status
      await db.collection('friend_requests').doc(requestId).update({
        status: 'declined'
      });

      return NextResponse.json({ success: true });

    } else if (action === 'remove_friend') {
      if (!targetUserId) {
        return NextResponse.json({ error: 'Target user ID required' }, { status: 400 });
      }

      // Find and remove friendship
      const friendshipSnapshot = await db.collection('friendships')
        .where('users', 'array-contains', userId)
        .where('status', '==', 'accepted')
        .get();

      const friendshipDoc = friendshipSnapshot.docs.find(doc => {
        const data = doc.data();
        return data.users.includes(targetUserId);
      });

      if (friendshipDoc) {
        await db.collection('friendships').doc(friendshipDoc.id).delete();
      }

      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });

  } catch (error) {
    console.error('Error with friends action:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
