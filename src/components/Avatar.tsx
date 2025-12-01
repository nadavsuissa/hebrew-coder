'use client';

import Image from 'next/image';
import { useState } from 'react';

interface AvatarProps {
  photoURL?: string | null;
  displayName?: string | null;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const sizeClasses = {
  xs: 'w-6 h-6 text-xs',
  sm: 'w-8 h-8 text-sm',
  md: 'w-10 h-10 text-base',
  lg: 'w-12 h-12 text-lg',
  xl: 'w-16 h-16 text-2xl',
};

const imageSizes = {
  xs: 24,
  sm: 32,
  md: 40,
  lg: 48,
  xl: 64,
};

/**
 * Checks if a photoURL is a valid image URL (DiceBear, Google, etc.)
 */
function isImageUrl(url: string | null | undefined): boolean {
  if (!url) return false;
  return url.startsWith('http://') || url.startsWith('https://');
}

/**
 * Gets fallback initial from displayName or returns default
 */
function getInitial(displayName?: string | null): string {
  if (!displayName) return '?';
  return displayName.charAt(0).toUpperCase();
}

/**
 * Reusable Avatar component that handles:
 * - DiceBear API URLs (renders as image)
 * - Google profile photos (renders as image)
 * - Other image URLs (renders as image)
 * - Fallback to initial letter on error or no URL
 */
export default function Avatar({ photoURL, displayName, size = 'md', className = '' }: AvatarProps) {
  const [imageError, setImageError] = useState(false);
  const sizeClass = sizeClasses[size];
  const imageSize = imageSizes[size];
  const isImage = isImageUrl(photoURL) && !imageError;

  if (isImage && photoURL) {
    return (
      <div className={`${sizeClass} rounded-full overflow-hidden bg-gradient-to-br from-blue-500 to-purple-600 flex-shrink-0 ${className}`}>
        <Image
          src={photoURL}
          alt={displayName || 'Avatar'}
          width={imageSize}
          height={imageSize}
          className="w-full h-full object-cover"
          unoptimized // External images (DiceBear SVGs, Google photos) don't need optimization
          onError={() => setImageError(true)}
        />
      </div>
    );
  }

  // Fallback to initial letter
  return (
    <div className={`${sizeClass} rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold flex-shrink-0 ${className}`}>
      {getInitial(displayName)}
    </div>
  );
}

