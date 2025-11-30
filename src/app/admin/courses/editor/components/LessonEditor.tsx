import React, { useEffect, useState } from 'react';
import { Lesson, LessonType, QuizQuestion } from '@/types/course';
import { ArrowRight, Plus, Trash2, Video, FileText, HelpCircle, Gamepad2, CheckCircle2 } from 'lucide-react';
import clsx from 'clsx';
import { GAME_TEMPLATES, GameTemplate, getGameTemplate, getTemplatesByCategory } from '@/lib/games/templates';

interface LessonEditorProps {
  lesson: Lesson;
  onUpdate: (updates: Partial<Lesson>) => void;
  onBack: () => void;
}

const LESSON_TYPES: { value: LessonType; label: string; icon: any }[] = [
  { value: 'text', label: 'טקסט', icon: FileText },
  { value: 'video', label: 'וידאו', icon: Video },
  { value: 'quiz', label: 'שאלון', icon: HelpCircle },
  { value: 'game', label: 'משחק', icon: Gamepad2 },
];

export const LessonEditor: React.FC<LessonEditorProps> = ({ lesson, onUpdate, onBack }) => {
  const [selectedGameTemplate, setSelectedGameTemplate] = useState<GameTemplate | undefined>(
    lesson.gameTemplateId ? getGameTemplate(lesson.gameTemplateId) : undefined
  );

  useEffect(() => {
    if (lesson.gameTemplateId) {
      setSelectedGameTemplate(getGameTemplate(lesson.gameTemplateId));
    }
  }, [lesson.gameTemplateId]);

  const addQuestion = () => {
    const newQuestion: QuizQuestion = {
      id: `q_${Date.now()}`,
      question: '',
      options: ['', '', '', ''],
      correctAnswer: 0,
      explanation: ''
    };
    onUpdate({ quizQuestions: [...(lesson.quizQuestions || []), newQuestion] });
  };

  const updateQuestion = (index: number, updates: Partial<QuizQuestion>) => {
    const newQuestions = [...(lesson.quizQuestions || [])];
    newQuestions[index] = { ...newQuestions[index], ...updates };
    onUpdate({ quizQuestions: newQuestions });
  };

  const deleteQuestion = (index: number) => {
    if (!confirm('למחוק את השאלה?')) return;
    const newQuestions = (lesson.quizQuestions || []).filter((_, i) => i !== index);
    onUpdate({ quizQuestions: newQuestions });
  };

  const handleGameConfigChange = (field: string, value: any) => {
    const newConfig = { ...(lesson.gameConfig || selectedGameTemplate?.defaultConfig || {}), [field]: value };
    onUpdate({ gameConfig: newConfig });
  };

  const handleGameTemplateSelect = (templateId: string) => {
    const template = getGameTemplate(templateId);
    if (template) {
      setSelectedGameTemplate(template);
      onUpdate({ 
        gameTemplateId: templateId,
        gameConfig: template.defaultConfig
      });
    }
  };

  const templatesByCategory = getTemplatesByCategory();
  const CATEGORY_LABELS: Record<string, string> = {
    syntax: 'תחביר ובסיס',
    logic: 'לוגיקה ובקרת זרימה',
    data: 'מבני נתונים',
    algorithm: 'אלגוריתמים והבנה'
  };

  return (
    <div className="flex flex-col h-full animate-in slide-in-from-right-4 duration-300">
      {/* Header */}
      <div className="flex items-center gap-4 p-4 border-b border-slate-700/50 bg-slate-800/30">
        <button 
          onClick={onBack}
          className="p-2 hover:bg-slate-700 rounded-lg transition-colors text-slate-400 hover:text-white"
        >
          <ArrowRight size={20} />
        </button>
        <div className="flex-1">
          <h3 className="font-bold text-white">עריכת שיעור</h3>
          <p className="text-xs text-slate-400">{lesson.title}</p>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        
        {/* Basic Info */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">כותרת השיעור</label>
            <input
              type="text"
              value={lesson.title}
              onChange={(e) => onUpdate({ title: e.target.value })}
              className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-blue-500"
              placeholder="שם השיעור"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">תיאור קצר</label>
            <textarea
              value={lesson.description}
              onChange={(e) => onUpdate({ description: e.target.value })}
              className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-blue-500 resize-none"
              placeholder="מה לומדים בשיעור זה?"
              rows={2}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">סוג שיעור</label>
              <div className="grid grid-cols-2 gap-2">
                {LESSON_TYPES.map((type) => (
                  <button
                    key={type.value}
                    onClick={() => onUpdate({ type: type.value })}
                    className={clsx(
                      "flex flex-col items-center justify-center p-3 rounded-xl border transition-all",
                      lesson.type === type.value
                        ? "bg-blue-600/20 border-blue-500/50 text-blue-400"
                        : "bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-700"
                    )}
                  >
                    <type.icon size={20} className="mb-1" />
                    <span className="text-xs">{type.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">פרס XP</label>
              <input
                type="number"
                value={lesson.xpReward}
                onChange={(e) => onUpdate({ xpReward: parseInt(e.target.value) || 0 })}
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-yellow-500"
                min="0"
              />
            </div>
          </div>
        </div>

        <hr className="border-slate-700/50" />

        {/* Dynamic Content Editor */}
        <div className="space-y-4">
          <h4 className="font-bold text-lg flex items-center gap-2">
            {lesson.type === 'text' && <FileText className="text-blue-400" />}
            {lesson.type === 'video' && <Video className="text-red-400" />}
            {lesson.type === 'quiz' && <HelpCircle className="text-yellow-400" />}
            {lesson.type === 'game' && <Gamepad2 className="text-purple-400" />}
            תוכן השיעור
          </h4>

          {lesson.type === 'text' && (
            <textarea
              value={lesson.content || ''}
              onChange={(e) => onUpdate({ content: e.target.value })}
              className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white font-mono text-sm focus:outline-none focus:border-blue-500 min-h-[300px]"
              placeholder="כתוב את תוכן השיעור כאן (תומך Markdown)..."
            />
          )}

          {lesson.type === 'video' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">קישור לוידאו</label>
                <input
                  type="text"
                  value={lesson.videoUrl || ''}
                  onChange={(e) => onUpdate({ videoUrl: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-red-500"
                  placeholder="https://youtube.com/..."
                />
              </div>
              {lesson.videoUrl && (
                <div className="aspect-video bg-black rounded-xl overflow-hidden border border-slate-700 flex items-center justify-center">
                  <p className="text-slate-500">תצוגה מקדימה תופיע כאן</p>
                </div>
              )}
            </div>
          )}

          {lesson.type === 'game' && (
            <div className="space-y-8">
              <div className="space-y-6">
                <label className="block text-lg font-bold text-white mb-4">בחר תבנית משחק</label>
                
                {Object.entries(templatesByCategory).map(([category, templates]) => (
                  <div key={category} className="space-y-3">
                    <h5 className="text-sm font-semibold text-slate-400 border-b border-slate-700 pb-2">
                      {CATEGORY_LABELS[category] || category}
                    </h5>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {templates.map((template) => (
                        <button
                          key={template.id}
                          onClick={() => handleGameTemplateSelect(template.id)}
                          className={clsx(
                            "flex flex-col items-center p-4 rounded-xl border transition-all text-center group relative overflow-hidden",
                            lesson.gameTemplateId === template.id
                              ? "bg-purple-600/20 border-purple-500/50 text-purple-400 ring-1 ring-purple-500/50 shadow-lg shadow-purple-500/10"
                              : "bg-slate-800/50 border-slate-700 text-slate-400 hover:bg-slate-800 hover:border-slate-500 hover:text-slate-200"
                          )}
                        >
                          <div className={clsx(
                            "p-3 rounded-xl mb-3 transition-transform group-hover:scale-110",
                            lesson.gameTemplateId === template.id ? "bg-purple-500 text-white" : "bg-slate-900 text-slate-500 group-hover:text-purple-400"
                          )}>
                            <template.icon size={28} />
                          </div>
                          <div className="font-bold text-sm mb-1">{template.title}</div>
                          <div className="text-xs text-slate-500 line-clamp-2 px-2">{template.description}</div>
                          
                          {lesson.gameTemplateId === template.id && (
                            <div className="absolute top-2 right-2 w-2 h-2 bg-purple-500 rounded-full shadow-lg shadow-purple-500/50 animate-pulse"></div>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {selectedGameTemplate && (
                <div className="bg-slate-800/50 rounded-xl border border-slate-700/50 p-6 animate-in fade-in slide-in-from-bottom-4 duration-300 shadow-2xl shadow-black/50">
                  <div className="flex items-center gap-3 mb-6 border-b border-slate-700/50 pb-4">
                    <div className="p-2 bg-purple-500/20 rounded-lg text-purple-400">
                      <selectedGameTemplate.icon size={24} />
                    </div>
                    <div>
                      <h5 className="font-bold text-white text-lg">
                        הגדרות המשחק: {selectedGameTemplate.title}
                      </h5>
                      <p className="text-xs text-slate-400">הגדר את הפרמטרים למשחק זה</p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    {selectedGameTemplate.fields.map((field) => (
                      <div key={field.name} className="space-y-2">
                        <label className="flex items-center gap-2 text-sm font-medium text-slate-300">
                          {field.label}
                          {field.type === 'code' && <span className="text-xs bg-slate-700 px-2 py-0.5 rounded text-slate-400">Code</span>}
                        </label>
                        
                        {field.type === 'code' && (
                          <div className="relative group">
                            <textarea
                              value={lesson.gameConfig?.[field.name] || ''}
                              onChange={(e) => handleGameConfigChange(field.name, e.target.value)}
                              className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-green-400 font-mono text-sm focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/50 min-h-[150px] leading-relaxed"
                              dir="ltr"
                              spellCheck={false}
                              placeholder={field.placeholder || '# כתוב קוד כאן...'}
                            />
                            <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                              <FileText size={16} className="text-slate-600" />
                            </div>
                          </div>
                        )}

                        {(field.type === 'text' || field.type === 'number') && (
                          <input
                            type={field.type}
                            value={lesson.gameConfig?.[field.name] || ''}
                            onChange={(e) => handleGameConfigChange(field.name, field.type === 'number' ? Number(e.target.value) : e.target.value)}
                            className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/50 transition-all"
                            placeholder={field.placeholder}
                            dir="ltr"
                          />
                        )}

                        {field.type === 'select' && (
                          <div className="relative">
                            <select
                              value={lesson.gameConfig?.[field.name] || ''}
                              onChange={(e) => handleGameConfigChange(field.name, e.target.value)}
                              className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-purple-500 appearance-none"
                            >
                              {field.options?.map(opt => (
                                <option key={opt.value} value={opt.value}>{opt.label}</option>
                              ))}
                            </select>
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                              <ArrowRight size={16} className="rotate-90" />
                            </div>
                          </div>
                        )}

                        {field.type === 'array' && (
                          <div className="bg-slate-900/30 rounded-xl border border-slate-700/30 p-4 space-y-3">
                            {(lesson.gameConfig?.[field.name] || []).map((item: any, index: number) => (
                              <div key={index} className="flex gap-3 items-start bg-slate-800/50 p-3 rounded-lg group hover:border-slate-600 border border-transparent transition-colors">
                                <div className="flex items-center justify-center w-6 h-6 bg-slate-700 rounded-full text-xs font-mono text-slate-400 mt-2">
                                  {index + 1}
                                </div>
                                <div className="grid grid-cols-1 gap-3 flex-1">
                                  {field.itemFields?.map(subField => (
                                    <div key={subField.name}>
                                      <label className="text-xs text-slate-500 mb-1 block">{subField.label}</label>
                                      {subField.type === 'select' ? (
                                        <select
                                          value={item[subField.name] || ''}
                                          onChange={(e) => {
                                            const newArray = [...(lesson.gameConfig?.[field.name] || [])];
                                            newArray[index] = { ...newArray[index], [subField.name]: e.target.value };
                                            handleGameConfigChange(field.name, newArray);
                                          }}
                                          className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:border-purple-500"
                                        >
                                          {subField.options?.map(opt => (
                                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                                          ))}
                                        </select>
                                      ) : (
                                        <input
                                          type={subField.type}
                                          value={item[subField.name] || ''}
                                          onChange={(e) => {
                                            const newArray = [...(lesson.gameConfig?.[field.name] || [])];
                                            newArray[index] = { ...newArray[index], [subField.name]: e.target.value };
                                            handleGameConfigChange(field.name, newArray);
                                          }}
                                          className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:border-purple-500"
                                          placeholder={subField.placeholder}
                                          dir="ltr"
                                        />
                                      )}
                                    </div>
                                  ))}
                                </div>
                                <button
                                  onClick={() => {
                                    const newArray = [...(lesson.gameConfig?.[field.name] || [])];
                                    newArray.splice(index, 1);
                                    handleGameConfigChange(field.name, newArray);
                                  }}
                                  className="p-2 text-slate-600 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors mt-4 opacity-0 group-hover:opacity-100"
                                  title="מחק פריט"
                                >
                                  <Trash2 size={18} />
                                </button>
                              </div>
                            ))}
                            
                            <button
                              onClick={() => {
                                const newItem = field.itemFields?.reduce((acc, f) => ({ ...acc, [f.name]: f.defaultValue || '' }), {});
                                handleGameConfigChange(field.name, [...(lesson.gameConfig?.[field.name] || []), newItem]);
                              }}
                              className="w-full py-3 border-2 border-dashed border-slate-700 hover:border-purple-500/50 rounded-xl text-slate-400 hover:text-purple-400 hover:bg-purple-500/5 transition-all flex items-center justify-center gap-2 text-sm font-medium"
                            >
                              <Plus size={16} />
                              הוסף {field.label} חדש
                            </button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {lesson.type === 'quiz' && (
            <div className="space-y-6">
              {(lesson.quizQuestions || []).map((question, qIndex) => (
                <div key={question.id} className="bg-slate-800/50 p-6 rounded-xl border border-slate-700/50 relative group">
                  <button 
                    onClick={() => deleteQuestion(qIndex)}
                    className="absolute top-4 left-4 text-slate-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 size={18} />
                  </button>
                  
                  <div className="space-y-4">
                    <div>
                      <span className="text-xs font-bold text-slate-500 mb-1 block">שאלה {qIndex + 1}</span>
                      <input
                        type="text"
                        value={question.question}
                        onChange={(e) => updateQuestion(qIndex, { question: e.target.value })}
                        className="w-full bg-transparent border-b border-slate-700 pb-2 text-white focus:outline-none focus:border-yellow-500 transition-colors"
                        placeholder="הקלד את השאלה..."
                      />
                    </div>

                    <div className="space-y-2">
                      {question.options.map((option, oIndex) => (
                        <div key={oIndex} className="flex items-center gap-3">
                          <button
                            onClick={() => updateQuestion(qIndex, { correctAnswer: oIndex })}
                            className={clsx(
                              "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all",
                              question.correctAnswer === oIndex
                                ? "border-green-500 bg-green-500/20 text-green-500"
                                : "border-slate-600 text-transparent hover:border-slate-500"
                            )}
                          >
                            <CheckCircle2 size={14} />
                          </button>
                          <input
                            type="text"
                            value={option}
                            onChange={(e) => {
                              const newOptions = [...question.options];
                              newOptions[oIndex] = e.target.value;
                              updateQuestion(qIndex, { options: newOptions });
                            }}
                            className="flex-1 bg-slate-900/50 px-3 py-2 rounded-lg text-sm text-white border border-transparent focus:border-slate-600 focus:outline-none"
                            placeholder={`אפשרות ${oIndex + 1}`}
                          />
                        </div>
                      ))}
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-500 mb-1 block">הסבר (אופציונלי)</label>
                      <textarea
                        value={question.explanation || ''}
                        onChange={(e) => updateQuestion(qIndex, { explanation: e.target.value })}
                        className="w-full bg-slate-900/30 p-3 rounded-lg text-sm text-slate-300 focus:outline-none focus:ring-1 focus:ring-slate-600 resize-none"
                        placeholder="הסבר שיופיע לאחר מענה..."
                        rows={2}
                      />
                    </div>
                  </div>
                </div>
              ))}

              <button
                onClick={addQuestion}
                className="w-full py-3 border-2 border-dashed border-slate-700 rounded-xl text-slate-400 hover:text-white hover:border-slate-500 transition-all flex items-center justify-center gap-2"
              >
                <Plus size={20} />
                הוסף שאלה
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
