'use client';

import React, { useState, useEffect } from 'react';
import { NextStudio } from 'next-sanity/studio';
import config from '@/sanity.config';
import { ExternalLink, Copy, Check, RefreshCw, AlertTriangle, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

function CorsErrorHelper({ error }) {
  const [currentOrigin, setCurrentOrigin] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentOrigin(window.location.origin);
    }
  }, []);

  const handleCopy = () => {
    if (navigator?.clipboard && currentOrigin) {
      navigator.clipboard.writeText(currentOrigin);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const sanityManageUrl = 'https://www.sanity.io/manage/project/a3wpvljs/api';

  return (
    <div className="min-h-screen bg-[#0F172A] text-slate-100 flex items-center justify-center p-4 sm:p-6 select-none font-sans">
      <div className="max-w-2xl w-full bg-[#1E293B] border border-slate-700/80 rounded-2xl p-6 sm:p-8 shadow-2xl">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              One-Time Setup: Add Domain to Sanity CORS
            </h1>
            <p className="text-xs sm:text-sm text-slate-400">
              Sanity requires your website domain to be authorized before Studio can load.
            </p>
          </div>
        </div>

        <div className="bg-slate-900/80 border border-slate-700/60 rounded-xl p-4 my-5">
          <p className="text-xs uppercase font-semibold text-slate-400 tracking-wider mb-2">
            Domain to authorize:
          </p>
          <div className="flex items-center justify-between gap-2 bg-slate-950 px-3.5 py-2.5 rounded-lg border border-slate-800">
            <code className="text-sm text-amber-300 font-mono break-all">
              {currentOrigin || 'Loading origin...'}
            </code>
            <button
              onClick={handleCopy}
              className="px-3 py-1.5 rounded-md bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 transition-colors flex items-center gap-1.5 shrink-0 cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
        </div>

        <div className="space-y-3 my-5 text-sm text-slate-300">
          <p className="font-semibold text-white">How to fix in 30 seconds:</p>
          <ol className="list-decimal list-inside space-y-2 text-slate-300 text-sm leading-relaxed pl-1">
            <li>
              Open your Sanity project settings:{' '}
              <a
                href={sanityManageUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-400 hover:text-amber-300 underline font-medium inline-flex items-center gap-1"
              >
                sanity.io/manage/project/a3wpvljs/api
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </li>
            <li>
              Scroll to <strong>CORS Origins</strong> and click <strong>&quot;+ Add CORS origin&quot;</strong>.
            </li>
            <li>
              Paste the domain copied above (<code>{currentOrigin}</code>).
            </li>
            <li>
              Ensure <strong>&quot;Allow credentials&quot;</strong> is checked <span className="text-emerald-400 font-medium">✓</span>, then click <strong>Save</strong>.
            </li>
          </ol>
        </div>

        <div className="pt-4 mt-6 border-t border-slate-700/80 flex flex-col sm:flex-row items-center justify-between gap-3">
          <Link
            href="/"
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-slate-700 hover:bg-slate-800 text-slate-300 text-xs font-semibold uppercase tracking-wider text-center flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Website
          </Link>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <a
              href={sanityManageUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-initial px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold uppercase tracking-wider text-center flex items-center justify-center gap-1.5 transition-colors shadow-lg cursor-pointer"
            >
              <span>Open Sanity Settings</span>
              <ExternalLink className="w-4 h-4" />
            </a>

            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Reload after saving CORS origin"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reload</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

class StudioErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.warn('[Studio Error]', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <CorsErrorHelper error={this.state.error} />;
    }
    return this.props.children;
  }
}

export default function StudioPage() {
  const [hasCorsError, setHasCorsError] = useState(false);

  useEffect(() => {
    const handleRejection = (event) => {
      const reason = event?.reason;
      const message = String(reason?.message || reason || '');
      if (message.includes('CorsOriginError') || message.includes('CORS') || message.includes('Cors')) {
        event.preventDefault();
        setHasCorsError(true);
      }
    };

    window.addEventListener('unhandledrejection', handleRejection);
    return () => window.removeEventListener('unhandledrejection', handleRejection);
  }, []);

  if (hasCorsError) {
    return <CorsErrorHelper />;
  }

  return (
    <StudioErrorBoundary>
      <div className="fixed inset-0 z-[99999] w-screen h-screen overflow-hidden bg-white">
        <NextStudio config={config} />
      </div>
    </StudioErrorBoundary>
  );
}
