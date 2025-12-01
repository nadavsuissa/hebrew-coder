import { getAdminDb } from './firebase-admin';
import { FieldValue } from 'firebase-admin/firestore';

const RATES = {
  chat: { limit: 10, window: 60 * 1000 }, // 10 messages per minute
  auth: { limit: 5, window: 60 * 1000 },  // 5 auth attempts per minute
};

export async function rateLimit(userId: string, type: keyof typeof RATES) {
  const db = getAdminDb();
  if (!db) return { success: true }; // Fail open if DB is down

  const { limit, window } = RATES[type];
  const now = Date.now();
  const windowStart = now - window;

  const rateLimitRef = db.collection('rate_limits').doc(`${type}_${userId}`);

  try {
    const doc = await rateLimitRef.get();
    
    if (!doc.exists) {
      await rateLimitRef.set({
        timestamps: [now]
      });
      return { success: true };
    }

    const data = doc.data();
    const timestamps = (data?.timestamps || []).filter((t: number) => t > windowStart);

    if (timestamps.length >= limit) {
      return { success: false, limit, remaining: 0, reset: timestamps[0] + window };
    }

    timestamps.push(now);
    
    // Cleanup old timestamps asynchronously
    await rateLimitRef.update({
      timestamps
    });

    return { success: true, limit, remaining: limit - timestamps.length };

  } catch (error) {
    console.error("Rate limit error:", error);
    return { success: true }; // Fail open
  }
}

