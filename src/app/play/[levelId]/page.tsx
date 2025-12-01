/**
 * Legacy Play Page - Redirect Only
 * 
 * This page exists only for backward compatibility.
 * It redirects to the lesson page which now handles all games via GameRenderer.
 */

'use client';

import { useEffect } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { getLessonByGameLevelId } from '@/lib/curriculum';

export default function PlayPageRedirect() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { levelId } = params;

  useEffect(() => {
    if (levelId) {
      const id = Number(levelId);
      
      // Try to find the lesson associated with this game level
      const lessonData = getLessonByGameLevelId(id);
      
      if (lessonData) {
        const { course, module, lesson } = lessonData;
        // Redirect to the lesson page (which now handles games)
        router.replace(`/learn/${course.id}/${module.id}/${lesson.id}`);
      } else {
        // No lesson found, redirect to learn page
        const returnTo = searchParams.get('returnTo');
        router.replace(returnTo || '/learn');
      }
    }
  }, [levelId, router, searchParams]);

  return (
    <div className="min-h-screen bg-[#0B1120] flex items-center justify-center">
      <div className="text-blue-400 font-mono font-bold text-xl animate-pulse">
        מעביר למשחק...
      </div>
    </div>
  );
}

