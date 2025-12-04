'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getLesson, getNextLessonInModule } from '@/lib/curriculum';
import { useUserStore } from '@/store/userStore';
import { Lesson } from '@/types/course';
import { convertLegacyLesson } from '@/lib/legacyGameConverter';
import { GameRenderer } from '@/components/games/GameRenderer';
import { GameCompletionData } from '@/types/games';
import { MathContent } from '@/components/MathContent';
import { ChevronRight, ChevronLeft, Code2, Trophy } from 'lucide-react';
import Link from 'next/link';
import clsx from 'clsx';

export default function LessonPage() {
  const params = useParams();
  const router = useRouter();
  const { courseId, moduleId, lessonId } = params;
  
  const { completeLesson, completedLessons } = useUserStore();
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [cards, setCards] = useState<Array<{ type: 'content' | 'code' | 'heading', content: string, title?: string }>>([]);

  // Handle Text Lesson Completion
  const handleCompleteText = useCallback(() => {
      if (lesson && lesson.type === 'text' && courseId && moduleId) {
          completeLesson(lesson.id, lesson.xpReward);
          router.push(`/learn/${courseId}/${moduleId}`);
      }
  }, [lesson, completeLesson, router, courseId, moduleId]);

  // Handle Game Completion
  const handleGameComplete = useCallback((data?: GameCompletionData) => {
    if (lesson && courseId && moduleId) {
      completeLesson(lesson.id, lesson.xpReward);
      
      // Navigate to next lesson or back to module
      const nextLesson = getNextLessonInModule(courseId as string, moduleId as string, lessonId as string);
      if (nextLesson) {
        setTimeout(() => {
          router.push(`/learn/${courseId}/${moduleId}/${nextLesson.id}`);
        }, 2000);
      } else {
        setTimeout(() => {
          router.push(`/learn/${courseId}/${moduleId}`);
        }, 2000);
      }
    }
  }, [lesson, completeLesson, courseId, moduleId, lessonId, router]);

  const parseContentToCards = useCallback((content: string) => {
    const lines = content.split('\n');
    const newCards: Array<{ type: 'content' | 'code', content: string, title?: string }> = [];
    let currentSection: string[] = [];
    let currentCodeBlock: string[] = [];
    let inCodeBlock = false;
    let currentSectionTitle = '';
    let hasContentInSection = false;

    const saveCurrentSection = () => {
        const sectionText = currentSection.join('\n').trim();
        if (sectionText.length > 0 && hasContentInSection) {
            newCards.push({
                type: 'content',
                content: sectionText,
                title: currentSectionTitle
            });
        }
        currentSection = [];
        currentSectionTitle = '';
        hasContentInSection = false;
    };

    for (const line of lines) {
        if (line.trim().startsWith('```')) {
            if (!inCodeBlock) {
                saveCurrentSection();
                inCodeBlock = true;
            } else {
                if (currentCodeBlock.length > 0) {
                    newCards.push({
                        type: 'code',
                        content: currentCodeBlock.join('\n')
                    });
                }
                currentCodeBlock = [];
                inCodeBlock = false;
            }
        } else if (inCodeBlock) {
            currentCodeBlock.push(line);
        } else if (line.startsWith('# ')) {
            saveCurrentSection();
            currentSectionTitle = line.replace('# ', '').trim();
        } else if (line.trim().length > 0) {
            currentSection.push(line);
            hasContentInSection = true;
        } else {
            currentSection.push(line);
        }
    }

    saveCurrentSection();

    if (inCodeBlock && currentCodeBlock.length > 0) {
        newCards.push({
            type: 'code',
            content: currentCodeBlock.join('\n').trim()
        });
    }

    const validCards = newCards.filter(card => card.content.trim().length > 0);

    if (validCards.length > 0) {
        setCards(validCards);
        setCurrentCardIndex(0);
    } else {
        setCards([{
            type: 'content',
            content: content.trim(),
            title: lesson?.title
        }]);
        setCurrentCardIndex(0);
    }
  }, [lesson?.title]);

  // Load lesson and convert legacy format
  useEffect(() => {
      if (courseId && moduleId && lessonId) {
          const l = getLesson(courseId as string, moduleId as string, lessonId as string);
          if (l) {
              // AUTO-CONVERT legacy format to new format
              const converted = convertLegacyLesson(l);
              setLesson(converted);
              if (converted.type === 'text' && converted.content) {
                  parseContentToCards(converted.content);
              }
          }
      }
  }, [courseId, moduleId, lessonId, parseContentToCards]);

  // Keyboard navigation for text lessons
  useEffect(() => {
      if (!lesson || lesson.type !== 'text') return;
      
      const handleKeyPress = (e: KeyboardEvent) => {
          if (e.key === 'ArrowRight' && currentCardIndex > 0) {
              setCurrentCardIndex(currentCardIndex - 1);
          } else if (e.key === 'ArrowLeft') {
              if (currentCardIndex < cards.length - 1) {
                  setCurrentCardIndex(currentCardIndex + 1);
              } else if (currentCardIndex === cards.length - 1) {
                  handleCompleteText();
              }
          }
      };

      window.addEventListener('keydown', handleKeyPress);
      return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentCardIndex, cards.length, lesson, handleCompleteText]);

  const renderContent = (content: string) => {
      const lines = content.split('\n');
      const elements: React.JSX.Element[] = [];
      let lineIndex = 0;

      const isMathExpression = (text: string): boolean => {
          const mathPattern = /(\d+\s*[+\-×÷=<>≤≥]\s*\d+|\d+\s*[+\-×÷]\s*\d+\s*=\s*\d+)/;
          return mathPattern.test(text);
      };

      const parseInlineMarkdown = (text: string): (string | React.JSX.Element)[] => {
          const parts: (string | React.JSX.Element)[] = [];
          const boldRegex = /\*\*([^*]+)\*\*/g;
          const codeRegex = /`([^`]+)`/g;
          const mathRegex = /(\d+\s*[+\-×÷=<>≤≥]\s*\d+(?:\s*[+\-×÷=<>≤≥]\s*\d+)*)/g;
          
          const matches: Array<{ type: 'bold' | 'code' | 'math', start: number, end: number, content: string, isMath?: boolean }> = [];
          
          let match;
          while ((match = boldRegex.exec(text)) !== null) {
              const content = match[1];
              const isMath = isMathExpression(content);
              matches.push({ type: 'bold', start: match.index, end: match.index + match[0].length, content, isMath });
          }
          while ((match = codeRegex.exec(text)) !== null) {
              matches.push({ type: 'code', start: match.index, end: match.index + match[0].length, content: match[1] });
          }
          while ((match = mathRegex.exec(text)) !== null) {
              const isInsideOther = matches.some(m => 
                  m.start < match!.index && m.end > match!.index + match![0].length
              );
              if (!isInsideOther) {
                  matches.push({ type: 'math', start: match.index, end: match.index + match[0].length, content: match[1] });
              }
          }
          
          matches.sort((a, b) => a.start - b.start);
          
          let lastIndex = 0;
          let key = 0;
          
          for (const m of matches) {
              if (m.start > lastIndex) {
                  parts.push(text.substring(lastIndex, m.start));
              }
              
              if (m.type === 'bold') {
                  if (m.isMath) {
                      parts.push(<strong key={key++} className="text-blue-300 font-bold" dir="ltr" style={{ unicodeBidi: 'embed' }}>{m.content}</strong>);
                  } else {
                      parts.push(<strong key={key++} className="text-blue-300 font-bold">{m.content}</strong>);
                  }
              } else if (m.type === 'code') {
                  parts.push(<code key={key++} className="px-2 py-1 bg-slate-800 text-blue-300 rounded font-mono text-sm">{m.content}</code>);
              } else if (m.type === 'math') {
                  parts.push(<span key={key++} dir="ltr" className="inline-block font-mono" style={{ unicodeBidi: 'embed' }}>{m.content}</span>);
              }
              
              lastIndex = m.end;
          }
          
          if (lastIndex < text.length) {
              parts.push(text.substring(lastIndex));
          }
          
          return parts.length > 0 ? parts : [text];
      };

      for (let i = 0; i < lines.length; i++) {
          const line = lines[i];
          
          if (line.startsWith('### ')) {
              const text = line.replace('### ', '');
              elements.push(<h3 key={lineIndex++} className="text-slate-200 font-bold text-lg mb-3">{text}</h3>);
          } else if (line.trim().length === 0) {
              elements.push(<br key={lineIndex++} />);
          } else if (line.match(/^\d+\.\s+\*\*/)) {
              const text = line.replace(/^\d+\.\s+\*\*/, '').replace(/\*\*/, '');
              const parsed = parseInlineMarkdown(text);
              elements.push(
                  <p key={lineIndex++} className="text-slate-300 mb-2 mr-4">
                      {parsed}
                  </p>
              );
          } else if (line.startsWith('- ')) {
              const content = line.replace('- ', '');
              const parsed = parseInlineMarkdown(content);
              elements.push(
                  <p key={lineIndex++} className="text-slate-300 mb-2 mr-4 flex items-start gap-2">
                      <span className="text-blue-400 mt-1">•</span>
                      <span>{parsed}</span>
                  </p>
              );
          } else {
              const parsed = parseInlineMarkdown(line);
              const hasMath = isMathExpression(line);
              elements.push(
                  <p key={lineIndex++} className="text-slate-300 mb-3 leading-relaxed" dir={hasMath ? "auto" : "rtl"}>
                      {parsed}
                  </p>
              );
          }
      }

      return elements;
  };

  if (!lesson) return <div className="min-h-screen bg-[#0B1120] text-white flex items-center justify-center">טוען שיעור...</div>;

  const isCompleted = completedLessons.includes(lesson.id);
  const nextLesson = courseId && moduleId ? getNextLessonInModule(courseId as string, moduleId as string, lessonId as string) : null;

  // ============================================================================
  // GAME LESSON RENDERING (Using New System!)
  // ============================================================================
  if (lesson.type === 'game' && lesson.gameConfig) {
    return (
      <GameRenderer
        config={lesson.gameConfig}
        onComplete={handleGameComplete}
        backUrl={`/learn/${courseId}/${moduleId}`}
      />
    );
  }

  // Show completion message for completed game lessons (if using old system temporarily)
  if (lesson.type === 'game' && isCompleted) {
      return (
          <div className="min-h-screen bg-[#0B1120] text-white flex items-center justify-center p-4">
              <div className="max-w-md w-full bg-slate-800 p-8 rounded-2xl text-center">
                  <div className="mb-6 flex justify-center">
                      <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center">
                          <Trophy size={40} className="text-white" />
                      </div>
                  </div>
                  <h2 className="text-3xl font-bold mb-4 text-green-400">כל הכבוד! 🎉</h2>
                  <p className="text-slate-300 mb-8 text-lg">
                      השיעור &quot;{lesson.title}&quot; הושלם בהצלחה!
                  </p>
                  <div className="flex gap-4 justify-center flex-col sm:flex-row">
                      {courseId && moduleId && (
                        <>
                          <Link 
                              href={`/learn/${courseId}/${moduleId}`}
                              className="px-6 py-3 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors"
                          >
                              חזרה למודול
                          </Link>
                          {nextLesson && (
                              <Link 
                                  href={`/learn/${courseId}/${moduleId}/${nextLesson.id}`}
                                  className="px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors"
                              >
                                  השיעור הבא
                              </Link>
                          )}
                        </>
                      )}
                  </div>
              </div>
          </div>
      );
  }

  // ============================================================================
  // TEXT LESSON RENDERING
  // ============================================================================
  if (lesson.type === 'text') {
    const currentCard = cards[currentCardIndex];
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0B1120] via-[#0F172A] to-[#0B1120] text-white p-6">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <Link href={`/learn/${courseId}/${moduleId}`} className="flex items-center gap-2 text-slate-400 hover:text-blue-400 transition-colors">
              <ChevronRight size={20} />
              <span>חזרה למודול</span>
            </Link>
            <div className="flex items-center gap-2">
              <span className="text-sm text-slate-400">{currentCardIndex + 1} / {cards.length}</span>
            </div>
          </div>

          {/* Content Card */}
          <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-2xl border border-slate-700 p-8 min-h-[500px]">
            {currentCard?.title && (
              <h1 className="text-3xl font-bold mb-6 text-blue-400">{currentCard.title}</h1>
            )}
            
            {currentCard?.type === 'code' ? (
              <div className="relative">
                <div className="absolute top-2 right-2 flex items-center gap-2 text-xs text-slate-500">
                  <Code2 size={14} />
                  <span>Python</span>
                </div>
                <pre className="bg-slate-900 border border-slate-700 rounded-xl p-6 overflow-x-auto">
                  <code className="text-sm text-slate-300 font-mono">{currentCard.content}</code>
                </pre>
              </div>
            ) : (
              <MathContent
                content={currentCard?.content || ''}
                className="prose prose-invert max-w-none"
              />
            )}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-6">
            <button
              onClick={() => setCurrentCardIndex(Math.max(0, currentCardIndex - 1))}
              disabled={currentCardIndex === 0}
              className={clsx(
                "flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all",
                currentCardIndex === 0
                  ? "bg-slate-800 text-slate-600 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-500 text-white"
              )}
            >
              <ChevronRight size={20} />
              קודם
            </button>

            {currentCardIndex === cards.length - 1 ? (
              <button
                onClick={handleCompleteText}
                className="flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-500 text-white rounded-xl font-bold transition-all"
              >
                סיים שיעור
                <Trophy size={20} />
              </button>
            ) : (
              <button
                onClick={() => setCurrentCardIndex(Math.min(cards.length - 1, currentCardIndex + 1))}
                className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold transition-all"
              >
                הבא
                <ChevronLeft size={20} />
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Fallback for video or other types
  return (
    <div className="min-h-screen bg-[#0B1120] text-white flex items-center justify-center">
      <div>סוג שיעור לא נתמך: {lesson.type}</div>
    </div>
  );
}
