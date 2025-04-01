'use client';

import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white font-cinzel tracking-wider mb-4">
            Exile Orbs
          </h1>
          <p className="text-xl text-slate-400">
            Path of Exile Crafting Tools
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <Link href="/divine-calculator" className="group">
            <div className="bg-slate-900/80 border border-slate-800/50 rounded-lg p-6 transition-all duration-300 hover:border-amber-500/50 hover:bg-slate-900/90">
              <h2 className="text-2xl font-bold text-amber-500 font-cinzel tracking-wide mb-4">
                Divine Calculator
              </h2>
              <p className="text-slate-400">
                Calculate the probability of getting your desired rolls with a Divine Orb
              </p>
            </div>
          </Link>

          <Link href="/currency" className="group">
            <div className="bg-slate-900/80 border border-slate-800/50 rounded-lg p-6 transition-all duration-300 hover:border-amber-500/50 hover:bg-slate-900/90">
              <h2 className="text-2xl font-bold text-amber-500 font-cinzel tracking-wide mb-4">
                Currency Guide
              </h2>
              <p className="text-slate-400">
                Learn the best ways to earn and spend your currency
              </p>
            </div>
          </Link>

          <Link href="/strategy" className="group">
            <div className="bg-slate-900/80 border border-slate-800/50 rounded-lg p-6 transition-all duration-300 hover:border-amber-500/50 hover:bg-slate-900/90">
              <h2 className="text-2xl font-bold text-amber-500 font-cinzel tracking-wide mb-4">
                Strategy Planner
              </h2>
              <p className="text-slate-400">
                Plan your crafting strategy with detailed cost analysis
              </p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
