'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function CookieConsent() {
  const [showConsent, setShowConsent] = useState(false);

  useEffect(() => {
    // Check if user has already accepted cookies
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      setShowConsent(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setShowConsent(false);
  };

  if (!showConsent) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-slate-900/95 border-t border-slate-800/50 p-4 z-50">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-slate-400 text-sm">
            We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies.{' '}
            <Link href="/privacy" className="text-blue-400 hover:text-blue-300">
              Learn more
            </Link>
          </div>
          <div className="flex gap-2">
            <button
              onClick={acceptCookies}
              className="bg-blue-900/50 hover:bg-blue-900/70 text-blue-300 px-4 py-2 rounded-lg transition-colors text-sm"
            >
              Accept
            </button>
            <Link
              href="/privacy"
              className="bg-slate-800/50 hover:bg-slate-800/70 text-slate-300 px-4 py-2 rounded-lg transition-colors text-sm"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 