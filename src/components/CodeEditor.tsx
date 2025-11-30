'use client';

import React, { useState, useEffect } from 'react';
import { useGameStore } from '@/store/gameStore';
import { FileCode, Play, RotateCcw } from 'lucide-react';
import { usePyodide } from '@/hooks/usePyodide';
import { Console } from '@/components/Console';
import clsx from 'clsx';

// Dynamically import Monaco to avoid SSR issues
import dynamic from 'next/dynamic';
import { loader } from '@monaco-editor/react';

// Configure Monaco loader to use CDN and handle dependencies properly
loader.config({
  paths: {
    vs: 'https://cdn.jsdelivr.net/npm/monaco-editor@0.54.0/min/vs',
    'stackframe': 'https://cdn.jsdelivr.net/npm/stackframe@1.3.4/dist/stackframe.min',
    'error-stack-parser': 'https://cdn.jsdelivr.net/npm/error-stack-parser@2.1.4/dist/error-stack-parser.min',
  },
});

const MonacoEditor = dynamic(() => import('@monaco-editor/react'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-full text-slate-500 font-mono text-sm animate-pulse">
      LOADING EDITOR...
    </div>
  ),
});

export const CodeEditor: React.FC = () => {
  const { code, setCode, resetPlayback, isGenerating } = useGameStore();
  const { runCode, isLoading } = usePyodide();
  const [isEditorReady, setIsEditorReady] = useState(false);

  // Pre-configure Monaco loader before component mounts
  useEffect(() => {
    // Only run on client side
    if (typeof window !== 'undefined' && !(window as any).MonacoEnvironment) {
      // Configure Monaco Environment for workers
      // @ts-ignore
      window.MonacoEnvironment = {
        getWorkerUrl: function (_moduleId: string, label: string) {
          // Use jsDelivr CDN - match the Monaco version from @monaco-editor/react
          const baseUrl = 'https://cdn.jsdelivr.net/npm/monaco-editor@0.54.0/min/vs';
          switch (label) {
            case 'json':
              return `${baseUrl}/language/json/json.worker.js`;
            case 'css':
            case 'scss':
            case 'less':
              return `${baseUrl}/language/css/css.worker.js`;
            case 'html':
            case 'handlebars':
            case 'razor':
              return `${baseUrl}/language/html/html.worker.js`;
            case 'typescript':
            case 'javascript':
              return `${baseUrl}/language/typescript/ts.worker.js`;
            default:
              // For Python, use editor worker (minimal, will fallback if CORS fails)
              return `${baseUrl}/editor/editor.worker.js`;
          }
        },
      };
    }
  }, []);

  const handleEditorDidMount = (editor: any, monaco: any) => {
      editorRef.current = editor;
      setIsEditorReady(true);
      
      // Define custom theme
      monaco.editor.defineTheme('space-theme', {
          base: 'vs-dark',
          inherit: true,
          rules: [],
          colors: {
              'editor.background': '#0F172A00', // Transparent
          }
      });
      monaco.editor.setTheme('space-theme');
  };

  return (
    <div className="flex flex-col h-full rounded-2xl overflow-hidden bg-slate-900/60 backdrop-blur-xl border border-slate-700/50 shadow-2xl relative group transition-colors duration-300">
      {/* Editor Header / Toolbar */}
      <div className="flex items-center justify-between px-4 py-3 bg-slate-900/50 border-b border-slate-700/50 transition-colors duration-300">
        <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-500/10 rounded-lg border border-blue-500/20 text-blue-400 text-xs font-mono">
                <FileCode size={14} />
                <span>MISSION_SCRIPT.PY</span>
            </div>
            <div className="h-4 w-[1px] bg-slate-300 dark:bg-slate-700" />
            <span className="text-xs text-slate-500 font-mono">PYTHON 3.11</span>
        </div>

        <div className="flex items-center gap-2">
            <button
                onClick={resetPlayback}
                disabled={isGenerating || !isEditorReady}
                className="p-2 rounded-lg hover:bg-slate-700 text-slate-400 hover:text-white transition-colors disabled:opacity-50"
                title="Reset"
            >
                <RotateCcw size={16} />
            </button>
            
            <button 
                onClick={() => runCode(code)}
                disabled={isLoading || isGenerating || !isEditorReady}
                className={clsx(
                    "flex items-center gap-2 px-4 py-1.5 rounded-lg font-bold text-sm transition-all",
                    isLoading || isGenerating || !isEditorReady
                        ? "bg-slate-700 text-slate-400 cursor-not-allowed"
                        : "bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40"
                )}
            >
                {isLoading || isGenerating ? (
                    <span className="animate-pulse">PROCESSING...</span>
                ) : (
                    <>
                        <Play size={14} fill="currentColor" />
                        <span>EXECUTE</span>
                    </>
                )}
            </button>
        </div>
      </div>
      
      {/* Editor Area */}
      <div className="flex-1 relative" dir="ltr">
        <MonacoEditor
          height="100%"
          defaultLanguage="python"
          theme="space-theme"
          value={code}
          onChange={(value) => setCode(value || '')}
          onMount={handleEditorDidMount}
          options={{
            minimap: { enabled: false },
            fontSize: 16,
            lineNumbers: 'on',
            scrollBeyondLastLine: false,
            automaticLayout: true,
            padding: { top: 20, bottom: 20 },
            fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
            cursorBlinking: 'smooth',
            cursorSmoothCaretAnimation: 'on',
            renderLineHighlight: 'none',
            contextmenu: false,
            // Disable workers for Python to avoid CORS issues
            // Python doesn't need language features from Monaco
            quickSuggestions: false,
            suggestOnTriggerCharacters: false,
            acceptSuggestionOnEnter: 'off',
            tabCompletion: 'off',
          }}
          beforeMount={(monaco) => {
            // Additional safety configuration
            monaco.languages.typescript.javascriptDefaults.setEagerModelSync(true);
          }}
          loading={
            <div className="flex items-center justify-center h-full text-slate-500 font-mono text-sm animate-pulse">
              INITIALIZING EDITOR...
            </div>
          }
        />
      </div>

      {/* Integrated Console Drawer */}
      <div className="h-1/3 min-h-[150px] border-t border-slate-700/50 bg-black/20 backdrop-blur-sm transition-colors duration-300">
        <Console />
      </div>
    </div>
  );
};
