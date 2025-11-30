import { create } from 'zustand';
import { User } from 'firebase/auth';
import { auth, db } from '@/lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { useUserStore } from './userStore';
import { UserRole } from '@/types/course';

interface AuthState {
  user: User | null;
  userRole: UserRole;
  loading: boolean;
  purchasedCourses: string[];
  initialized: boolean;
  initialize: () => void;
  refreshUserData: () => Promise<void>;
  isAdmin: () => boolean;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  userRole: 'user',
  loading: true,
  purchasedCourses: [],
  initialized: false,
  
  initialize: () => {
    if (get().initialized) return;
    set({ initialized: true });

    onAuthStateChanged(auth, async (user) => {
      set({ user, loading: !!user }); // Keep loading true if user exists to fetch data
      
      if (user) {
        await get().refreshUserData();
      } else {
        // User logged out - clear data
        set({ purchasedCourses: [], userRole: 'user' });
        useUserStore.getState().resetProgress();
      }
      
      set({ loading: false });
    });
  },

  refreshUserData: async () => {
    const { user } = get();
    if (!user) {
      set({ purchasedCourses: [], userRole: 'user' });
      return;
    }

    try {
      const userDocRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userDocRef);

      let userData: any = {};
      let userRole: UserRole = 'user';

      if (userDoc.exists()) {
        userData = userDoc.data();

        // Check if this is the admin user
        if (user.email === 'nadavsuissa@gmail.com') {
          userRole = 'admin';
          // Ensure admin role is set in database
          if (userData.role !== 'admin') {
            await setDoc(userDocRef, {
              ...userData,
              role: 'admin'
            }, { merge: true });
          }
        } else {
          userRole = userData.role || 'user';
        }

        // Update Auth Store
        set({
          purchasedCourses: userData.purchasedCourses || [],
          userRole
        });

        // Sync User Store (XP, Progress, etc.)
        useUserStore.setState({
            xp: userData.xp || 0,
            completedLessons: userData.completedLessons || [],
            streakDays: userData.streakDays || 1,
            // We might want to sync other fields if they exist in Firestore
        });

      } else {
        // New user - check if admin
        if (user.email === 'nadavsuissa@gmail.com') {
          userRole = 'admin';
        }

        // Create user document
        const newUserData = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName || '',
          role: userRole,
          createdAt: new Date().toISOString(),
          lastLoginAt: new Date().toISOString(),
          purchasedCourses: [],
          xp: 0,
          completedLessons: [],
          streakDays: 1,
          unlockedBadges: []
        };

        await setDoc(userDocRef, newUserData);

        set({
          purchasedCourses: [],
          userRole
        });
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      set({ purchasedCourses: [], userRole: 'user' });
    }
  },

  isAdmin: () => {
    return get().userRole === 'admin';
  }
}));
