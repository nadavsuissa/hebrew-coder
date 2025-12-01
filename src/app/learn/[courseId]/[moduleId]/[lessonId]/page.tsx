'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getLesson, getNextLessonInModule, getCourse } from '@/lib/curriculum';
import { useUserStore } from '@/store/userStore';
import { ChevronRight, CheckCircle, XCircle, Play, ArrowLeft, Trophy, ChevronLeft, Code2 } from 'lucide-react';
import Link from 'next/link';
import clsx from 'clsx';

export default function LessonPage() {
  const params = useParams();
  const router = useRouter();
  const { courseId, moduleId, lessonId } = params;
  
  const { completeLesson, saveQuizScore, completedLessons } = useUserStore();
  const [lesson, setLesson] = useState<any>(null);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [cards, setCards] = useState<Array<{ type: 'content' | 'code' | 'heading', content: string, title?: string }>>([]);
  const [quizState, setQuizState] = useState<{
      currentQuestionIndex: number;
      answers: number[]; // indices
      showResult: boolean;
      score: number;
  } | null>(null);

  // Handle Text Lesson Completion
  const handleCompleteText = useCallback(() => {
      if (lesson && lesson.type === 'text' && courseId && moduleId) {
          completeLesson(lesson.id, lesson.xpReward);
          router.push(`/learn/${courseId}/${moduleId}`);
      }
  }, [lesson, completeLesson, router, courseId, moduleId]);

  useEffect(() => {
      if (courseId && moduleId && lessonId) {
          const l = getLesson(courseId as string, moduleId as string, lessonId as string);
          if (l) {
              setLesson(l);
              if (l.type === 'quiz' && l.quizQuestions) {
                  setQuizState({
                      currentQuestionIndex: 0,
                      answers: new Array(l.quizQuestions.length).fill(-1),
                      showResult: false,
                      score: 0
                  });
              } else if (l.type === 'text' && l.content) {
                  // Parse content into cards
                  parseContentToCards(l.content);
              }
          }
      }
  }, [courseId, moduleId, lessonId]);

  // Handle Game Lesson Logic
  useEffect(() => {
      if (lesson && lesson.type === 'game' && lesson.gameLevelId && courseId && moduleId && lessonId) {
          // If not completed, redirect to game
          if (!completedLessons.includes(lesson.id)) {
              router.replace(`/play/${lesson.gameLevelId}?returnTo=/learn/${courseId}/${moduleId}/${lessonId}`);
          }
      }
  }, [lesson, completedLessons, router, courseId, moduleId, lessonId]);

  // Keyboard navigation
  useEffect(() => {
      if (!lesson) return;
      
      const handleKeyPress = (e: KeyboardEvent) => {
          if (e.key === 'ArrowRight' && currentCardIndex > 0) {
              setCurrentCardIndex(currentCardIndex - 1);
          } else if (e.key === 'ArrowLeft') {
              if (currentCardIndex < cards.length - 1) {
                  setCurrentCardIndex(currentCardIndex + 1);
              } else if (currentCardIndex === cards.length - 1 && lesson.type === 'text') {
                  // On last card, complete the lesson
                  handleCompleteText();
              }
          }
      };

      window.addEventListener('keydown', handleKeyPress);
      return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentCardIndex, cards.length, lesson, handleCompleteText]);

  const parseContentToCards = (content: string) => {
      const lines = content.split('\n');
      const newCards: Array<{ type: 'content' | 'code', content: string, title?: string }> = [];
      let currentSection: string[] = [];
      let currentCodeBlock: string[] = [];
      let inCodeBlock = false;
      let currentSectionTitle = '';
      let hasContentInSection = false;

      const saveCurrentSection = () => {
          const sectionText = currentSection.join('\n').trim();
          // Only save if there's actual content (not just whitespace)
          if (sectionText.length > 0 && hasContentInSection) {
              newCards.push({
                  type: 'content',
                  content: sectionText,
                  title: currentSectionTitle || undefined
              });
          }
          currentSection = [];
          currentSectionTitle = '';
          hasContentInSection = false;
      };

      for (let i = 0; i < lines.length; i++) {
          const line = lines[i];
          const trimmedLine = line.trim();
          
          // Check for code block markers
          if (trimmedLine.startsWith('```')) {
              if (inCodeBlock) {
                  // End code block
                  if (currentCodeBlock.length > 0) {
                      // Save any pending text section first
                      saveCurrentSection();
                      // Add code block as separate card
                      newCards.push({
                          type: 'code',
                          content: currentCodeBlock.join('\n').trim()
                      });
                  }
                  currentCodeBlock = [];
                  inCodeBlock = false;
              } else {
                  // Start code block - save current section first
                  saveCurrentSection();
                  inCodeBlock = true;
              }
              continue;
          }

          if (inCodeBlock) {
              currentCodeBlock.push(line);
              continue;
          }

          // Check for headings - these create new cards
          if (trimmedLine.startsWith('## ') || trimmedLine.startsWith('### ')) {
              // Save previous section before starting new one
              saveCurrentSection();
              // Start new section with this heading as title
              currentSectionTitle = trimmedLine.replace(/^#+\s/, '');
              hasContentInSection = false;
          } else if (trimmedLine.startsWith('# ')) {
              // Main heading - save previous and start new
              saveCurrentSection();
              currentSectionTitle = trimmedLine.replace('# ', '');
              hasContentInSection = false;
          } else {
              // Regular content line
              if (trimmedLine.length > 0) {
                  hasContentInSection = true;
              }
              currentSection.push(line);
          }
      }

      // Save remaining content
      saveCurrentSection();

      // Handle remaining code block
      if (inCodeBlock && currentCodeBlock.length > 0) {
          newCards.push({
              type: 'code',
              content: currentCodeBlock.join('\n').trim()
          });
      }

      // Filter out empty cards and ensure we have content
      const validCards = newCards.filter(card => {
          if (card.type === 'code') {
              return card.content.trim().length > 0;
          }
          return card.content.trim().length > 0;
      });

      if (validCards.length > 0) {
          setCards(validCards);
          setCurrentCardIndex(0);
      } else {
          // Fallback: if no cards created, create one with all content
          setCards([{
              type: 'content',
              content: content.trim(),
              title: lesson?.title
          }]);
          setCurrentCardIndex(0);
      }
  };

  const renderContent = (content: string) => {
      const lines = content.split('\n');
      const elements: React.JSX.Element[] = [];
      let lineIndex = 0;

      // Helper function to detect math expressions
      const isMathExpression = (text: string): boolean => {
          // Match patterns like: 3 + 2 = 5, 47 + 28, 7 × 5, etc.
          const mathPattern = /(\d+\s*[+\-×÷=<>≤≥]\s*\d+|\d+\s*[+\-×÷]\s*\d+\s*=\s*\d+)/;
          return mathPattern.test(text);
      };

      // Helper function to parse inline markdown (bold, code, math, etc.)
      const parseInlineMarkdown = (text: string): (string | React.JSX.Element)[] => {
          const parts: (string | React.JSX.Element)[] = [];
          
          // Match bold text **text**, inline code `code`, or math expressions
          const boldRegex = /\*\*([^*]+)\*\*/g;
          const codeRegex = /`([^`]+)`/g;
          // Match math expressions: numbers with operators and equals signs
          // Pattern matches: 3 + 2 = 5, 47 + 28, 7 × 5, 10 ÷ 2 = 5, etc.
          const mathRegex = /(\d+\s*[+\-×÷=<>≤≥]\s*\d+(?:\s*[+\-×÷=<>≤≥]\s*\d+)*)/g;
          
          // Find all matches
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
              // Only add if not already inside bold or code
              const isInsideOther = matches.some(m => 
                  m.start < match!.index && m.end > match!.index + match![0].length
              );
              if (!isInsideOther) {
                  matches.push({ type: 'math', start: match.index, end: match.index + match[0].length, content: match[1] });
              }
          }
          
          // Sort matches by position
          matches.sort((a, b) => a.start - b.start);
          
          // Build parts array
          let lastIndex = 0;
          matches.forEach((m) => {
              // Add text before match
              if (m.start > lastIndex) {
                  const beforeText = text.substring(lastIndex, m.start);
                  parts.push(beforeText);
              }
              
              // Add match
              if (m.type === 'bold') {
                  // If bold contains math, wrap math in LTR span
                  if (m.isMath) {
                      parts.push(
                          <strong key={`bold-${lineIndex}-${m.start}`} className="font-bold text-blue-300">
                              <span dir="ltr" style={{ unicodeBidi: 'embed', display: 'inline-block' }}>{m.content}</span>
                          </strong>
                      );
                  } else {
                      parts.push(<strong key={`bold-${lineIndex}-${m.start}`} className="font-bold text-blue-300">{m.content}</strong>);
                  }
              } else if (m.type === 'code') {
                  // Inline code should always be LTR
                  parts.push(<code key={`code-${lineIndex}-${m.start}`} className="bg-slate-700/50 px-1.5 py-0.5 rounded text-green-400 font-mono text-sm" dir="ltr" style={{ unicodeBidi: 'embed' }}>{m.content}</code>);
              } else if (m.type === 'math') {
                  // Math expressions should always be LTR
                  parts.push(<span key={`math-${lineIndex}-${m.start}`} className="font-mono text-blue-300" dir="ltr" style={{ unicodeBidi: 'embed', display: 'inline-block' }}>{m.content}</span>);
              }
              
              lastIndex = m.end;
          });
          
          // Add remaining text
          if (lastIndex < text.length) {
              parts.push(text.substring(lastIndex));
          }
          
          return parts.length > 0 ? parts : [text];
      };

      for (let i = 0; i < lines.length; i++) {
          const line = lines[i];
          
          if (line.startsWith('## ')) {
              const headingText = line.replace('## ', '');
              elements.push(<h2 key={lineIndex++} className="text-xl font-bold mt-5 mb-3 text-blue-300">{headingText}</h2>);
          } else if (line.startsWith('### ')) {
              const headingText = line.replace('### ', '');
              elements.push(<h3 key={lineIndex++} className="text-lg font-bold mt-4 mb-2 text-purple-300">{headingText}</h3>);
          } else if (line.startsWith('**') && line.endsWith('**') && line.match(/^\*\*.*\*\*$/)) {
              const text = line.replace(/\*\*/g, '');
              elements.push(<p key={lineIndex++} className="text-slate-200 font-bold text-lg mb-3">{text}</p>);
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
              // Check if line contains math expressions - if so, use mixed direction
              const hasMath = isMathExpression(line);
              // Regular paragraphs - RTL for Hebrew content, but math and code will override with LTR
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
  const isGameLesson = lesson.type === 'game' && lesson.gameLevelId;
  const course = courseId ? getCourse(courseId as string) : null;
  const nextLesson = courseId && moduleId ? getNextLessonInModule(courseId as string, moduleId as string, lessonId as string) : null;

  // Show completion message for completed game lessons
  if (isGameLesson && isCompleted) {
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
                      השיעור "{lesson.title}" הושלם בהצלחה!
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

  // Handle Quiz
  const handleQuizAnswer = (optionIndex: number) => {
      if (!quizState || !lesson.quizQuestions) return;
      
      const newAnswers = [...quizState.answers];
      newAnswers[quizState.currentQuestionIndex] = optionIndex;
      
      setQuizState({
          ...quizState,
          answers: newAnswers
      });
  };

  const handleNextQuestion = () => {
      if (!quizState || !lesson.quizQuestions) return;
      if (quizState.currentQuestionIndex < lesson.quizQuestions.length - 1) {
          setQuizState({
              ...quizState,
              currentQuestionIndex: quizState.currentQuestionIndex + 1
          });
      } else {
          // Finish
          let correctCount = 0;
          quizState.answers.forEach((ans, idx) => {
              if (ans === lesson.quizQuestions![idx].correctAnswer) correctCount++;
          });
          const score = Math.round((correctCount / lesson.quizQuestions.length) * 100);
          setQuizState({ ...quizState, showResult: true, score });
          
          // Save quiz score regardless of pass/fail to track progress
          saveQuizScore(lesson.id, score);

          if (score >= 70) {
              completeLesson(lesson.id, lesson.xpReward);
          }
      }
  };

  if (lesson.type === 'quiz' && quizState) {
      const question = lesson.quizQuestions![quizState.currentQuestionIndex];
      
      if (quizState.showResult) {
          return (
              <div className="min-h-screen bg-[#0B1120] text-white p-8 flex flex-col items-center">
                  <div className="max-w-3xl w-full bg-slate-800 p-8 rounded-2xl shadow-2xl">
                      <div className="text-center mb-12 border-b border-slate-700 pb-8">
                          <h2 className="text-3xl font-bold mb-4">תוצאות הבוחן</h2>
                          <div className={clsx("text-6xl font-black mb-6", quizState.score >= 70 ? "text-green-400" : "text-red-400")}>
                              {quizState.score}%
                          </div>
                          <p className="text-slate-400 mb-8 text-lg">
                              {quizState.score >= 70 ? 'כל הכבוד! עברת את הבוחן.' : 'לא נורא, נסה שוב כדי להתקדם.'}
                          </p>
                          <div className="flex gap-4 justify-center">
                              {courseId && moduleId && (
                                <Link href={`/learn/${courseId}/${moduleId}`} className="px-6 py-3 bg-slate-700 hover:bg-slate-600 rounded-xl font-bold transition-colors">
                                    חזרה למודול
                                </Link>
                              )}
                              <button onClick={() => window.location.reload()} className="px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-xl font-bold transition-colors shadow-lg shadow-blue-900/20">
                                  {quizState.score >= 70 ? 'בצע שוב' : 'נסה שוב'}
                              </button>
                          </div>
                      </div>

                      <div className="space-y-8">
                          <h3 className="text-2xl font-bold text-slate-200 mb-6 pr-2 border-r-4 border-blue-500">סיכום תשובות</h3>
                          {lesson.quizQuestions.map((q: any, qIdx: number) => {
                              const userAnswer = quizState.answers[qIdx];
                              const isCorrect = userAnswer === q.correctAnswer;
                              
                              return (
                                  <div key={qIdx} className={clsx("p-6 rounded-xl border-2 transition-all", isCorrect ? "border-green-500/30 bg-green-500/5" : "border-red-500/30 bg-red-500/5")}>
                                      <div className="flex items-start gap-4">
                                          <div className={clsx("w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-1 shadow-lg", isCorrect ? "bg-green-500 text-white" : "bg-red-500 text-white")}>
                                              {isCorrect ? <CheckCircle size={18} strokeWidth={3} /> : <XCircle size={18} strokeWidth={3} />}
                                          </div>
                                          <div className="flex-1">
                                              <h4 className="text-xl font-bold mb-4 text-slate-100">{q.question}</h4>
                                              <div className="space-y-3">
                                                  {q.options.map((opt: string, optIdx: number) => {
                                                      const isSelected = userAnswer === optIdx;
                                                      const isTheCorrectAnswer = q.correctAnswer === optIdx;
                                                      
                                                      let styleClass = "bg-slate-800/50 border-slate-700 text-slate-400"; // Default
                                                      
                                                      if (isTheCorrectAnswer) {
                                                          styleClass = "bg-green-500/20 border-green-500 text-green-300 font-bold shadow-[0_0_15px_rgba(34,197,94,0.2)]";
                                                      } else if (isSelected && !isCorrect) {
                                                          styleClass = "bg-red-500/20 border-red-500 text-red-300";
                                                      }
                                                      
                                                      return (
                                                          <div key={optIdx} className={clsx("p-4 rounded-lg border text-right flex justify-between items-center transition-all", styleClass)}>
                                                              <span className={clsx(isSelected && !isCorrect && "line-through opacity-70")}>{opt}</span>
                                                              {isTheCorrectAnswer && <div className="flex items-center gap-2 text-green-400 font-bold text-sm"><CheckCircle size={16} /> תשובה נכונה</div>}
                                                              {isSelected && !isCorrect && <div className="flex items-center gap-2 text-red-400 font-bold text-sm"><XCircle size={16} /> הטעות שלך</div>}
                                                          </div>
                                                      );
                                                  })}
                                              </div>
                                              {q.explanation && (
                                                  <div className="mt-6 bg-blue-900/20 p-5 rounded-xl text-blue-100 text-base border border-blue-500/30 flex gap-3 items-start">
                                                      <div className="mt-1 bg-blue-500/20 p-1 rounded">💡</div>
                                                      <div>
                                                          <span className="font-bold block mb-1 text-blue-300">הסבר:</span>
                                                          {q.explanation}
                                                      </div>
                                                  </div>
                                              )}
                                          </div>
                                      </div>
                                  </div>
                              );
                          })}
                      </div>
                  </div>
              </div>
          );
      }

      return (
        <div className="min-h-screen bg-[#0B1120] text-white p-8 flex flex-col items-center">
             <div className="max-w-2xl w-full">
                <div className="mb-8 flex justify-between items-center">
                    <span className="text-slate-400">שאלה {quizState.currentQuestionIndex + 1} מתוך {lesson.quizQuestions!.length}</span>
                    {courseId && moduleId && (
                      <Link href={`/learn/${courseId}/${moduleId}`} className="text-slate-500 hover:text-white"><XCircle /></Link>
                    )}
                </div>
                
                <h2 className="text-2xl font-bold mb-8" dir="rtl">
                  {question.question.split(/(\d+\s*[+\-×÷=<>≤≥]\s*\d+(?:\s*[+\-×÷=<>≤≥]\s*\d+)*)/g).map((part: string, idx: number) => {
                    const isMath = /^\d+\s*[+\-×÷=<>≤≥]\s*\d+(?:\s*[+\-×÷=<>≤≥]\s*\d+)*$/.test(part);
                    if (isMath) {
                      return <span key={idx} dir="ltr" style={{ unicodeBidi: 'embed', display: 'inline-block' }}>{part}</span>;
                    }
                    return <span key={idx}>{part}</span>;
                  })}
                </h2>
                
                <div className="space-y-4 mb-8">
                    {question.options.map((opt: string, idx: number) => (
                        <button
                            key={idx}
                            onClick={() => handleQuizAnswer(idx)}
                            className={clsx(
                                "w-full p-4 text-right rounded-xl border transition-all text-lg",
                                quizState.answers[quizState.currentQuestionIndex] === idx 
                                    ? "bg-blue-600/20 border-blue-500 text-blue-300" 
                                    : "bg-slate-800/50 border-slate-700 hover:bg-slate-800"
                            )}
                            dir="rtl"
                        >
                            <span dir={/^\d+$/.test(opt) || /^\d+\.\d+$/.test(opt) || /^\d+\s*[+\-×÷=<>≤≥]/.test(opt) ? "ltr" : "auto"} 
                                  style={/^\d+$/.test(opt) || /^\d+\.\d+$/.test(opt) || /^\d+\s*[+\-×÷=<>≤≥]/.test(opt) ? { unicodeBidi: 'embed', display: 'inline-block' } : {}}>
                              {opt}
                            </span>
                        </button>
                    ))}
                </div>

                <button
                    onClick={handleNextQuestion}
                    disabled={quizState.answers[quizState.currentQuestionIndex] === -1}
                    className="w-full py-4 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl font-bold text-lg transition-colors"
                >
                    {quizState.currentQuestionIndex === lesson.quizQuestions!.length - 1 ? 'סיום בוחן' : 'השאלה הבאה'}
                </button>
             </div>
        </div>
      );
  }

  return (
    <div className="min-h-screen bg-[#0B1120] text-white p-8">
      <div className="max-w-3xl mx-auto bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 min-h-[80vh] flex flex-col">
        {/* Header */}
        <div className="p-8 border-b border-slate-800 bg-slate-900/50">
            {courseId && moduleId && (
              <Link href={`/learn/${courseId}/${moduleId}`} className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-4 transition-colors">
                  <ChevronRight size={16} />
                  חזרה למודול
              </Link>
            )}
            <h1 className="text-3xl font-bold text-blue-300">{lesson.title}</h1>
        </div>

        {/* Card-based Content */}
        {cards.length > 0 ? (
          <div className="flex-1 flex flex-col">
            {/* Card Display */}
            <div className="flex-1 flex items-center justify-center p-8 min-h-0">
              <div className="w-full max-w-4xl">
                {cards[currentCardIndex] && (
                  <div className="bg-slate-800/50 rounded-2xl p-8 border border-slate-700/50 shadow-xl min-h-[400px] flex flex-col">
                    {/* Card Title if exists */}
                    {cards[currentCardIndex].title && (
                      <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                        {cards[currentCardIndex].title}
                      </h2>
                    )}
                    
                    {cards[currentCardIndex].type === 'code' && (
                      <div className="flex-1 flex flex-col">
                        <div className="mb-4 text-sm text-slate-400 flex items-center gap-2">
                          <Code2 size={16} />
                          <span>דוגמת קוד</span>
                        </div>
                        <div className="flex-1 bg-[#1e1e1e] p-6 rounded-xl font-mono text-sm border border-slate-700 overflow-x-auto">
                          <pre className="text-green-400 whitespace-pre-wrap" dir="ltr" style={{ textAlign: 'left', unicodeBidi: 'embed' }}>
                            {cards[currentCardIndex].content}
                          </pre>
                        </div>
                      </div>
                    )}
                    {cards[currentCardIndex].type === 'content' && (
                      <div className="flex-1 prose prose-invert prose-lg max-w-none overflow-y-auto">
                        {renderContent(cards[currentCardIndex].content)}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Navigation */}
            <div className="p-6 border-t border-slate-800 bg-slate-900/50 flex items-center justify-between">
              <button
                onClick={() => setCurrentCardIndex(Math.max(0, currentCardIndex - 1))}
                disabled={currentCardIndex === 0}
                className={clsx(
                  "px-6 py-3 rounded-xl font-bold transition-all flex items-center gap-2",
                  currentCardIndex === 0
                    ? "bg-slate-800 text-slate-600 cursor-not-allowed"
                    : "bg-slate-700 hover:bg-slate-600 text-white"
                )}
              >
                <ChevronRight size={20} />
                הקודם
              </button>
              
              <div className="text-slate-400 text-sm">
                {currentCardIndex + 1} / {cards.length}
              </div>

              <button
                onClick={() => {
                  if (currentCardIndex === cards.length - 1) {
                    // On last card, complete the lesson
                    handleCompleteText();
                  } else {
                    // Move to next card
                    setCurrentCardIndex(Math.min(cards.length - 1, currentCardIndex + 1));
                  }
                }}
                className={clsx(
                  "px-6 py-3 rounded-xl font-bold transition-all flex items-center gap-2",
                  currentCardIndex === cards.length - 1
                    ? "bg-green-600 hover:bg-green-500 text-white"
                    : "bg-blue-600 hover:bg-blue-500 text-white"
                )}
              >
                {currentCardIndex === cards.length - 1 ? (
                  <>
                    השלם שיעור
                    <CheckCircle size={20} />
                  </>
                ) : (
                  <>
                    הבא
                    <ChevronLeft size={20} />
                  </>
                )}
              </button>
            </div>
          </div>
        ) : (
          <div className="p-8 flex-1 flex items-center justify-center text-slate-400">
            אין תוכן להצגה
          </div>
        )}

        {/* Footer Action - Only show on last card */}
        {cards.length > 0 && currentCardIndex === cards.length - 1 && (
          <div className="p-8 border-t border-slate-800 bg-slate-900/50 flex justify-end">
              <button 
                  onClick={handleCompleteText}
                  className="px-8 py-3 bg-green-600 hover:bg-green-500 text-white font-bold rounded-xl shadow-lg shadow-green-900/20 transition-all hover:scale-105 flex items-center gap-2"
              >
                  <span>השלם שיעור</span>
                  <CheckCircle size={20} />
              </button>
          </div>
        )}
      </div>
    </div>
  );
}

