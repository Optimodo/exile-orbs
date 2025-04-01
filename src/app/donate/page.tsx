'use client';

import React from 'react';
import Link from 'next/link';

export default function DonatePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-white font-cinzel tracking-wide mb-8">
          Support the Project
        </h1>

        <div className="space-y-8">
          {/* Introduction Section */}
          <section className="bg-slate-900/80 border border-slate-800/50 rounded-lg p-6">
            <p className="text-slate-400 mb-6">
              Your support helps us maintain and improve the Divine Orb Calculator. We're committed to providing free, high-quality tools for the Path of Exile community.
            </p>
          </section>

          {/* Support Options */}
          <section className="bg-slate-900/80 border border-slate-800/50 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-amber-500 font-cinzel tracking-wide mb-6">
              Support Options
            </h2>

            <div className="space-y-6">
              {/* Ko-fi Support */}
              <div className="flex flex-col gap-4">
                <h3 className="text-xl font-bold text-white">Support via Ko-fi</h3>
                <p className="text-slate-400">
                  Buy us a coffee to help keep the project running.
                </p>
                <Link 
                  href="https://ko-fi.com/exileorbs" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#FF5E5B] hover:bg-[#E54D4A] text-white px-4 py-2 rounded-lg transition-colors"
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.881 8.948c-.773-4.085-4.859-4.593-4.859-4.593H.723c-.604 0-.679.798-.679.798s-.082 7.324-.022 11.822c.164 2.424 2.586 2.672 2.586 2.672s8.267-.023 11.966-.049c3.438-.426 3.683-2.566 3.658-3.734 4.352.24 7.422-2.831 6.649-6.916zm-11.062 9.511c-1.246 1.453-4.011 2.243-4.011 2.243s-.121.119-.31.023c-.076-.057-.108-.09-.108-.09-.443-.441-3.368-3.891-3.506-4.033-.569-.645.755-.944.755-.944s4.977-1.984 5.588-2.033c.609-.05 2.966 1.314 1.59 8.824z"/>
                  </svg>
                  Buy us a Coffee
                </Link>
              </div>

              {/* GitHub Sponsors */}
              <div className="flex flex-col gap-4">
                <h3 className="text-xl font-bold text-white">Support via GitHub Sponsors</h3>
                <p className="text-slate-400">
                  Become a GitHub Sponsor to support the open-source project.
                </p>
                <Link 
                  href="https://github.com/sponsors/exileorbs" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#238636] hover:bg-[#2EA043] text-white px-4 py-2 rounded-lg transition-colors"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  Become a Sponsor
                </Link>
              </div>
            </div>
          </section>

          {/* Other Ways to Support */}
          <section className="bg-slate-900/80 border border-slate-800/50 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-amber-500 font-cinzel tracking-wide mb-4">
              Other Ways to Support
            </h2>
            <ul className="space-y-3 text-slate-400">
              <li className="flex items-center gap-2">
                <svg className="h-5 w-5 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.363 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.363-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                </svg>
                Star the project on GitHub
              </li>
              <li className="flex items-center gap-2">
                <svg className="h-5 w-5 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z"/>
                </svg>
                Share the calculator with other players
              </li>
              <li className="flex items-center gap-2">
                <svg className="h-5 w-5 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"/>
                </svg>
                Report bugs and suggest improvements
              </li>
              <li className="flex items-center gap-2">
                <svg className="h-5 w-5 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd"/>
                </svg>
                Contribute to the codebase
              </li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
} 