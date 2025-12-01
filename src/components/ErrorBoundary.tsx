'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
    // Here you would log to Sentry
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#0B1120] flex items-center justify-center p-4">
          <div className="bg-slate-900 p-8 rounded-2xl border border-red-500/30 max-w-md w-full text-center shadow-2xl">
            <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertTriangle className="text-red-500" size={32} />
            </div>
            
            <h1 className="text-2xl font-bold text-white mb-2">
              אופס! משהו השתבש
            </h1>
            <p className="text-slate-400 mb-6">
              נתקלנו בבעיה לא צפויה. הצוות שלנו קיבל דיווח על כך.
            </p>

            <div className="bg-slate-950 p-4 rounded-lg mb-6 text-left overflow-auto max-h-32 border border-slate-800">
               <code className="text-red-400 text-xs font-mono">
                 {this.state.error?.message}
               </code>
            </div>

            <button
              onClick={() => window.location.reload()}
              className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold transition-all flex items-center justify-center gap-2"
            >
              <RefreshCw size={18} />
              נסה שוב
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

