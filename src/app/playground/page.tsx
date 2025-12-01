'use client';

import React from 'react';
import { CodeEditor } from '@/components/CodeEditor';
import { Terminal } from 'lucide-react';

export default function PlaygroundPage() {
  return (
    <div className="min-h-screen bg-[#0B1120] flex flex-col p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white flex items-center gap-3">
          <Terminal className="text-green-400" />
          Python Playground
        </h1>
        <p className="text-slate-400 mt-2">
          Write and run Python code freely. Experiment, learn, and have fun!
        </p>
      </div>

      <div className="flex-1 bg-slate-900/50 rounded-2xl border border-slate-800 overflow-hidden shadow-2xl">
        <CodeEditor />
      </div>
    </div>
  );
}

