/**
 * MathContent Component - Automatically renders mathematical expressions
 * Applies proper formatting to fractions, equations, and mathematical notation
 */

'use client';

import { formatMathContent } from '@/lib/math-rendering';

interface MathContentProps {
  content: string;
  className?: string;
}

export function MathContent({ content, className = '' }: MathContentProps) {
  // Process the content with math formatting
  const formattedContent = formatMathContent(content);

  return (
    <div
      className={`math-content prose prose-slate max-w-none ${className}`}
      dangerouslySetInnerHTML={{ __html: formattedContent }}
    />
  );
}

// Hook for processing math content in React components
export function useMathContent(content: string): string {
  return formatMathContent(content);
}

// Utility function to render math content inline
export function renderMath(content: string): { __html: string } {
  return { __html: formatMathContent(content) };
}


