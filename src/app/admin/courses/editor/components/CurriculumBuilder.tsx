import React, { useState } from 'react';
import { Module, Lesson, LessonType } from '@/types/course';
import { Plus, Trash2, Edit, GripVertical, ChevronRight, ChevronDown, FileText, Video, HelpCircle, Gamepad2 } from 'lucide-react';
import clsx from 'clsx';
import { LessonEditor } from './LessonEditor';

interface CurriculumBuilderProps {
  modules: Module[];
  onChange: (modules: Module[]) => void;
}

const LESSON_ICONS = {
  text: FileText,
  video: Video,
  quiz: HelpCircle,
  game: Gamepad2
};

export const CurriculumBuilder: React.FC<CurriculumBuilderProps> = ({ modules, onChange }) => {
  const [selectedModuleId, setSelectedModuleId] = useState<string | null>(modules[0]?.id || null);
  const [editingLesson, setEditingLesson] = useState<{ moduleId: string, lessonId: string } | null>(null);

  const addModule = () => {
    const newModule: Module = {
      id: `module_${Date.now()}`,
      title: `מודול חדש ${modules.length + 1}`,
      description: '',
      lessons: []
    };
    const newModules = [...modules, newModule];
    onChange(newModules);
    setSelectedModuleId(newModule.id);
  };

  const updateModule = (moduleId: string, updates: Partial<Module>) => {
    const newModules = modules.map(m => m.id === moduleId ? { ...m, ...updates } : m);
    onChange(newModules);
  };

  const deleteModule = (moduleId: string) => {
    if (!confirm('האם אתה בטוח? המודול וכל השיעורים בו יימחקו.')) return;
    const newModules = modules.filter(m => m.id !== moduleId);
    onChange(newModules);
    if (selectedModuleId === moduleId) {
      setSelectedModuleId(newModules[0]?.id || null);
    }
  };

  const addLesson = (moduleId: string) => {
    const module = modules.find(m => m.id === moduleId);
    if (!module) return;

    const newLesson: Lesson = {
      id: `lesson_${Date.now()}`,
      title: 'שיעור חדש',
      description: '',
      type: 'text',
      content: '',
      xpReward: 10
    };

    const newModules = modules.map(m => 
      m.id === moduleId 
        ? { ...m, lessons: [...m.lessons, newLesson] } 
        : m
    );
    onChange(newModules);
    setEditingLesson({ moduleId, lessonId: newLesson.id });
  };

  const handleLessonUpdate = (moduleId: string, lessonId: string, updates: Partial<Lesson>) => {
    const newModules = modules.map(m => 
      m.id === moduleId 
        ? { 
            ...m, 
            lessons: m.lessons.map(l => l.id === lessonId ? { ...l, ...updates } : l) 
          } 
        : m
    );
    onChange(newModules);
  };

  const deleteLesson = (moduleId: string, lessonId: string) => {
    if (!confirm('למחוק את השיעור?')) return;
    const newModules = modules.map(m => 
      m.id === moduleId 
        ? { ...m, lessons: m.lessons.filter(l => l.id !== lessonId) } 
        : m
    );
    onChange(newModules);
    if (editingLesson?.lessonId === lessonId) {
      setEditingLesson(null);
    }
  };

  const activeModule = modules.find(m => m.id === selectedModuleId);
  const activeLesson = editingLesson 
    ? modules.find(m => m.id === editingLesson.moduleId)?.lessons.find(l => l.id === editingLesson.lessonId)
    : null;

  return (
    <div className="flex h-[600px] bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-slate-700/50 overflow-hidden">
      
      {/* Sidebar - Modules List */}
      <div className="w-1/4 border-l border-slate-700/50 bg-slate-900/30 flex flex-col">
        <div className="p-4 border-b border-slate-700/50 flex justify-between items-center">
          <h3 className="font-bold text-slate-300">מודולים</h3>
          <button 
            onClick={addModule}
            className="p-2 bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 rounded-lg transition-colors"
            title="הוסף מודול"
          >
            <Plus size={18} />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-2 space-y-2">
          {modules.map((module, index) => (
            <div 
              key={module.id}
              onClick={() => {
                setSelectedModuleId(module.id);
                setEditingLesson(null);
              }}
              className={clsx(
                "p-3 rounded-xl cursor-pointer transition-all group relative",
                selectedModuleId === module.id 
                  ? "bg-blue-600/20 border border-blue-500/30" 
                  : "hover:bg-slate-800/50 border border-transparent"
              )}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-medium text-sm truncate max-w-[80%]">
                  {index + 1}. {module.title}
                </span>
                {selectedModuleId === module.id && (
                  <ChevronDown size={16} className="text-blue-400" />
                )}
              </div>
              <div className="text-xs text-slate-500 flex justify-between">
                <span>{module.lessons.length} שיעורים</span>
              </div>
            </div>
          ))}
          
          {modules.length === 0 && (
            <div className="text-center py-8 text-slate-500 text-sm">
              אין מודולים. התחל בהוספת מודול.
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col bg-slate-900/20">
        {editingLesson && activeLesson ? (
          <LessonEditor 
            lesson={activeLesson} 
            onUpdate={(updates) => handleLessonUpdate(editingLesson.moduleId, editingLesson.lessonId, updates)}
            onBack={() => setEditingLesson(null)}
          />
        ) : activeModule ? (
          <div className="flex-1 flex flex-col h-full">
            {/* Module Header */}
            <div className="p-6 border-b border-slate-700/50 bg-slate-800/30">
              <div className="flex items-center justify-between mb-4">
                <input
                  type="text"
                  value={activeModule.title}
                  onChange={(e) => updateModule(activeModule.id, { title: e.target.value })}
                  className="text-2xl font-bold bg-transparent border-none outline-none text-white placeholder-slate-500 w-full focus:ring-0"
                  placeholder="כותרת המודול"
                />
                <button 
                  onClick={() => deleteModule(activeModule.id)}
                  className="text-red-400 hover:bg-red-500/10 p-2 rounded-lg transition-colors"
                >
                  <Trash2 size={20} />
                </button>
              </div>
              <textarea
                value={activeModule.description}
                onChange={(e) => updateModule(activeModule.id, { description: e.target.value })}
                className="w-full bg-transparent border-none outline-none text-slate-400 placeholder-slate-600 resize-none focus:ring-0"
                placeholder="תיאור המודול..."
                rows={2}
              />
            </div>

            {/* Lessons List */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-semibold text-slate-300">שיעורים</h4>
                <button 
                  onClick={() => addLesson(activeModule.id)}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
                >
                  <Plus size={16} />
                  הוסף שיעור
                </button>
              </div>

              <div className="space-y-3">
                {activeModule.lessons.map((lesson, index) => {
                  const Icon = LESSON_ICONS[lesson.type] || FileText;
                  return (
                    <div 
                      key={lesson.id}
                      className="flex items-center gap-4 p-4 bg-slate-800/50 hover:bg-slate-800 border border-slate-700/50 rounded-xl transition-all group"
                    >
                      <div className="text-slate-500 font-mono text-sm w-6">{index + 1}</div>
                      <div className={clsx(
                        "p-2 rounded-lg",
                        lesson.type === 'video' ? 'bg-red-500/10 text-red-400' :
                        lesson.type === 'quiz' ? 'bg-yellow-500/10 text-yellow-400' :
                        lesson.type === 'game' ? 'bg-purple-500/10 text-purple-400' :
                        'bg-blue-500/10 text-blue-400'
                      )}>
                        <Icon size={20} />
                      </div>
                      
                      <div className="flex-1">
                        <div className="font-medium text-white">{lesson.title}</div>
                        <div className="text-xs text-slate-500 truncate max-w-md">
                          {lesson.description || 'ללא תיאור'}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                          onClick={() => setEditingLesson({ moduleId: activeModule.id, lessonId: lesson.id })}
                          className="p-2 text-blue-400 hover:bg-blue-500/10 rounded-lg transition-colors"
                          title="ערוך"
                        >
                          <Edit size={18} />
                        </button>
                        <button 
                          onClick={() => deleteLesson(activeModule.id, lesson.id)}
                          className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                          title="מחק"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  );
                })}
                
                {activeModule.lessons.length === 0 && (
                  <div className="text-center py-12 border-2 border-dashed border-slate-700/50 rounded-xl bg-slate-800/20">
                    <p className="text-slate-500 mb-2">המודול ריק</p>
                    <button 
                      onClick={() => addLesson(activeModule.id)}
                      className="text-blue-400 hover:underline text-sm"
                    >
                      הוסף את השיעור הראשון
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center text-slate-500">
            בחר מודול לעריכה
          </div>
        )}
      </div>
    </div>
  );
};
