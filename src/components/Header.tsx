'use client';

import Link from 'next/link';

export default function Header() {
  return (
    <nav className="bg-slate-900/80 border-b border-slate-800/50">
      <div className="container mx-auto px-2 sm:px-4">
        <div className="flex items-center justify-between h-14">
          <Link href="/" className="text-lg font-bold text-amber-500 font-cinzel tracking-wider">
            Exile Orbs
          </Link>
          <div className="flex space-x-4">
            <Link href="/divine-calculator" className="text-slate-400 hover:text-amber-500 transition-colors font-cinzel text-sm">
              Divine Orb Calculator
            </Link>
            <Link href="/currency" className="text-slate-400 hover:text-amber-500 transition-colors font-cinzel text-sm">
              Currency
            </Link>
            <Link href="/strategy" className="text-slate-400 hover:text-amber-500 transition-colors font-cinzel text-sm">
              Strategy
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
} 