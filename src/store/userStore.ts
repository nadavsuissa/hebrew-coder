import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { UserProgress } from '@/types/course';
import { auth, db } from '@/lib/firebase';
import { doc, updateDoc, arrayUnion, increment, setDoc, getDoc } from 'firebase/firestore';

interface UserStore extends UserProgress {
  completeLesson: (lessonId: string, xp: number) => void;
  saveQuizScore: (lessonId: string, score: number) => void;
  addXp: (amount: number) => void;
  checkStreak: () => void;
  resetProgress: () => void;
}

// Helper to sync with Firestore
const syncToFirestore = async (data: Partial<any>) => {
  const user = auth.currentUser;
  if (!user) return;

  try {
    const userRef = doc(db, 'users', user.uid);
    // Check if document exists first (it should, but just in case)
    const userDoc = await getDoc(userRef);
    
    if (userDoc.exists()) {
      await updateDoc(userRef, data);
    } else {
      // If document doesn't exist, we should probably create it or handle it, 
      // but updateDoc will fail if it doesn't exist. 
      // Since we create user doc on register, this should be fine.
      await setDoc(userRef, { ...data, email: user.email, createdAt: new Date() }, { merge: true });
    }
  } catch (error) {
    console.error('Error syncing to Firestore:', error);
  }
};

export const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      completedLessons: [],
      quizScores: {},
      xp: 0,
      streakDays: 1,
      lastLoginDate: new Date().toISOString().split('T')[0],
      unlockedBadges: [],

      completeLesson: (lessonId, xp) => {
        const state = get();
        if (state.completedLessons.includes(lessonId)) return;

        const newCompletedLessons = [...state.completedLessons, lessonId];
        const newXp = state.xp + xp;

        set({
          completedLessons: newCompletedLessons,
          xp: newXp
        });

        // Sync to Firestore
        syncToFirestore({
          completedLessons: arrayUnion(lessonId),
          xp: increment(xp)
        });
      },

      saveQuizScore: (lessonId, score) => {
        set((state) => ({
          quizScores: { ...state.quizScores, [lessonId]: score }
        }));

        // Sync to Firestore - using dot notation for nested field update if possible, 
        // or we might need to update the whole map. Firestore map updates can be tricky with dot notation
        // if the field name is dynamic.
        // Here we'll update the specific field in the map using `quizScores.${lessonId}` syntax
        syncToFirestore({
          [`quizScores.${lessonId}`]: score
        });
      },

      addXp: (amount) => {
        set((state) => ({ xp: state.xp + amount }));
        
        syncToFirestore({
          xp: increment(amount)
        });
      },

      checkStreak: () => {
        const today = new Date().toISOString().split('T')[0];
        const { lastLoginDate, streakDays } = get();
        
        if (today === lastLoginDate) return;

        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toISOString().split('T')[0];

        let newStreakDays = 1;
        
        if (lastLoginDate === yesterdayStr) {
            newStreakDays = streakDays + 1;
        }

        set({ streakDays: newStreakDays, lastLoginDate: today });

        syncToFirestore({
          streakDays: newStreakDays,
          lastLoginDate: today
        });
      },
      
      resetProgress: () => set({
          completedLessons: [],
          quizScores: {},
          xp: 0,
          streakDays: 1,
          lastLoginDate: new Date().toISOString().split('T')[0],
          unlockedBadges: []
      })
    }),
    {
      name: 'hebrew-coder-user-storage',
    }
  )
);
