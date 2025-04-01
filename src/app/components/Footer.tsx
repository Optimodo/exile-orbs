'use client';

import React from 'react';
import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-16 bg-blue-900/20 border-t border-blue-800/30 w-full">
      <div className="px-4 py-6">
        <div className="flex flex-wrap justify-center gap-6 text-sm text-blue-300">
          <Link href="/contact" className="hover:text-blue-200 transition-colors">
            Contact
          </Link>
          <Link href="/donate" className="hover:text-blue-200 transition-colors">
            Donate
          </Link>
          <Link href="/bug-report" className="hover:text-blue-200 transition-colors">
            Report a Bug
          </Link>
        </div>
        <div className="text-center mt-4 text-sm text-blue-300">
          © {currentYear} Exile Orbs. Not affiliated with Grinding Gear Games.
        </div>
      </div>
    </footer>
  );
} 