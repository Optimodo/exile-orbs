'use client';

import React from 'react';
import Link from 'next/link';

export default function BugReportPage() {
  return (
    <div className="container mx-auto px-2 sm:px-4 py-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold text-white font-cinzel tracking-wide mb-4">
          Report a Bug
        </h1>

        <div className="space-y-4">
          {/* Before Submitting Section */}
          <section className="bg-slate-900/80 border border-slate-800/50 rounded-lg p-4">
            <h2 className="text-xl font-bold text-amber-500 font-cinzel tracking-wide mb-3">
              Before Submitting
            </h2>
            <ul className="space-y-2 text-slate-400">
              <li className="flex items-start gap-2">
                <svg className="h-4 w-4 text-amber-500 mt-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"/>
                </svg>
                <span>Check if your issue has already been reported by searching our issue tracker</span>
              </li>
              <li className="flex items-start gap-2">
                <svg className="h-4 w-4 text-amber-500 mt-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"/>
                </svg>
                <span>Provide as much detail as possible about the issue</span>
              </li>
              <li className="flex items-start gap-2">
                <svg className="h-4 w-4 text-amber-500 mt-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"/>
                </svg>
                <span>Include steps to reproduce the issue</span>
              </li>
            </ul>
          </section>

          {/* Report via Email */}
          <section className="bg-slate-900/80 border border-slate-800/50 rounded-lg p-4">
            <h2 className="text-xl font-bold text-amber-500 font-cinzel tracking-wide mb-3">
              Report via Email
            </h2>
            <p className="text-slate-400 mb-4">
              Send us an email with your bug report. We'll review it and get back to you as soon as possible.
            </p>
            <Link 
              href="mailto:contact@exileorbs.com" 
              className="inline-flex items-center gap-2 bg-blue-900/50 hover:bg-blue-900/70 text-blue-300 px-3 py-1.5 rounded-lg transition-colors text-sm"
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
              </svg>
              Send Email
            </Link>
          </section>

          {/* What to Include */}
          <section className="bg-slate-900/80 border border-slate-800/50 rounded-lg p-4">
            <h2 className="text-xl font-bold text-amber-500 font-cinzel tracking-wide mb-3">
              What to Include
            </h2>
            <ul className="space-y-2 text-slate-400">
              <li className="flex items-start gap-2">
                <svg className="h-4 w-4 text-amber-500 mt-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                </svg>
                <span>Steps to reproduce the issue</span>
              </li>
              <li className="flex items-start gap-2">
                <svg className="h-4 w-4 text-amber-500 mt-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                </svg>
                <span>Expected behavior</span>
              </li>
              <li className="flex items-start gap-2">
                <svg className="h-4 w-4 text-amber-500 mt-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                </svg>
                <span>Actual behavior</span>
              </li>
              <li className="flex items-start gap-2">
                <svg className="h-4 w-4 text-amber-500 mt-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                </svg>
                <span>Browser and operating system information</span>
              </li>
              <li className="flex items-start gap-2">
                <svg className="h-4 w-4 text-amber-500 mt-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                </svg>
                <span>Screenshots or recordings if applicable</span>
              </li>
            </ul>
          </section>

          {/* Alternative Contact */}
          <section className="bg-slate-900/80 border border-slate-800/50 rounded-lg p-4">
            <h2 className="text-xl font-bold text-amber-500 font-cinzel tracking-wide mb-3">
              Alternative Contact
            </h2>
            <p className="text-slate-400 mb-4">
              If you're unable to use email, you can also reach us through Discord.
            </p>
            <Link 
              href="https://discord.gg/exileorbs" 
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#5865F2] hover:bg-[#4752C4] text-white px-3 py-1.5 rounded-lg transition-colors text-sm"
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
              </svg>
              Join Discord
            </Link>
          </section>
        </div>
      </div>
    </div>
  );
} 