import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { UserProgress } from '@/types/course';
import { auth, db } from '@/lib/firebase';
import { doc, updateDoc, arrayUnion, increment, setDoc, getDoc } from 'firebase/firestore';

interface UserStore extends UserProgress {
  completeLesson: (lessonId: string, xp: number) => Promise<void>;
  saveQuizScore: (lessonId: string, score: number) => Promise<void>;
  addXp: (amount: number) => Promise<void>;
  checkStreak: () => Promise<void>;
  resetProgress: () => void;
}

// Helper to sync with Firestore
const syncToFirestore = async (data: Partial<any>) => {
  const user = auth.currentUser;
  if (!user) return;

  try {
    const userRef = doc(db, 'users', user.uid);
    const userDoc = await getDoc(userRef);
    
    if (userDoc.exists()) {
      await updateDoc(userRef, data);
    } else {
      await setDoc(userRef, { ...data, email: user.email, createdAt: new Date() }, { merge: true });
    }
  } catch (error) {
    console.error('Error syncing to Firestore:', error);
    throw error; // Re-throw to allow rollback
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

      completeLesson: async (lessonId, xp) => {
        const state = get();
        if (state.completedLessons.includes(lessonId)) return;

        const prevState = { ...state };

        // Optimistic Update
        set({
          completedLessons: [...state.completedLessons, lessonId],
          xp: state.xp + xp
        });

        try {
            await syncToFirestore({
                completedLessons: arrayUnion(lessonId),
                xp: increment(xp)
            });
        } catch (err) {
            // Rollback
            set(prevState);
            console.error("Failed to save progress, rolling back.");
            // Ideally trigger a toast here
        }
      },

      saveQuizScore: async (lessonId, score) => {
        const state = get();
        const prevState = { ...state };

        set((state) => ({
          quizScores: { ...state.quizScores, [lessonId]: score }
        }));

        try {
            await syncToFirestore({
                [`quizScores.${lessonId}`]: score
            });
        } catch (err) {
             set(prevState);
             console.error("Failed to save quiz score, rolling back.");
        }
      },

      addXp: async (amount) => {
        const state = get();
        const prevState = { ...state };

        set((state) => ({ xp: state.xp + amount }));
        
        try {
            await syncToFirestore({
                xp: increment(amount)
            });
        } catch (err) {
            set(prevState);
        }
      },

      checkStreak: async () => {
        const today = new Date().toISOString().split('T')[0];
        const state = get();
        const { lastLoginDate, streakDays } = state;
        
        if (today === lastLoginDate) return;

        const prevState = { ...state };

        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toISOString().split('T')[0];

        let newStreakDays = 1;
        if (lastLoginDate === yesterdayStr) {
            newStreakDays = streakDays + 1;
        }

        set({ streakDays: newStreakDays, lastLoginDate: today });

        try {
            await syncToFirestore({
                streakDays: newStreakDays,
                lastLoginDate: today
            });
        } catch (err) {
            // For streak, maybe we don't rollback UI immediately to avoid jarring experience, 
            // but technically we should.
            set(prevState);
        }
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
