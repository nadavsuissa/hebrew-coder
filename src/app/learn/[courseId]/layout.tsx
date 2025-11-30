'use client';

import { useAuthStore } from '@/store/authStore';
import { useRouter, useParams } from 'next/navigation';
import { useEffect } from 'react';

export default function CourseLayout({ children }: { children: React.ReactNode }) {
  const { purchasedCourses, loading, user } = useAuthStore();
  const params = useParams();
  const courseId = params.courseId as string;
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        // Redirect to login if not logged in
        router.push(`/login?redirect=/learn/${courseId}`);
      } else if (purchasedCourses && !purchasedCourses.includes(courseId)) {
        // Redirect to courses page if not purchased
        // Note: We check purchasedCourses existence just in case
        router.push('/courses');
      }
    }
  }, [loading, user, purchasedCourses, courseId, router]);

  if (loading) {
    return <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">טוען...</div>;
  }

  // If user is not logged in or hasn't purchased, we return null (or loading) while redirect happens
  if (!user || !purchasedCourses.includes(courseId)) {
      return <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">אין גישה לקורס זה</div>;
  }

  return <>{children}</>;
}

