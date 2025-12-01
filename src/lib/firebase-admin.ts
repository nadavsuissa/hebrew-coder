import * as admin from 'firebase-admin';

if (!admin.apps.length) {
  const serviceAccountKey = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;

  if (serviceAccountKey) {
    try {
        const serviceAccount = JSON.parse(serviceAccountKey);
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
        });
    } catch (e) {
        console.error("Error parsing FIREBASE_SERVICE_ACCOUNT_KEY", e);
    }
  }
}

// Export a function to get db to ensure it's initialized or throw error if not
export const getAdminDb = () => {
    if (!admin.apps.length) {
        // Try to initialize if not already done
        const serviceAccountKey = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
        if (serviceAccountKey) {
            try {
                const serviceAccount = JSON.parse(serviceAccountKey);
                admin.initializeApp({
                    credential: admin.credential.cert(serviceAccount),
                });
            } catch (e) {
                console.error("Error parsing FIREBASE_SERVICE_ACCOUNT_KEY", e);
                return null;
            }
        } else {
            console.warn("Firebase Admin not initialized - missing FIREBASE_SERVICE_ACCOUNT_KEY");
            return null;
        }
    }
    return admin.firestore();
};

