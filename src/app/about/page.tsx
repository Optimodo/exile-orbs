'use client';

import React from 'react';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-6">About the Divine Orb Calculator</h1>

        <div className="bg-slate-900 p-6 rounded-lg mb-8">
          <h2 className="text-2xl font-semibold text-white mb-4">Our Mission</h2>
          <p className="text-slate-300 mb-4">
            The Divine Orb Calculator was created to help Path of Exile players make informed decisions about their crafting investments. We understand that Divine Orbs are valuable currency items, and we want to help you understand the probability and cost of achieving your desired item rolls.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-slate-900 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-white mb-3">How It Works</h3>
            <p className="text-slate-300 mb-4">
              Our calculator analyzes your item's current stats and calculates the probability of getting your desired rolls. It takes into account:
            </p>
            <ul className="space-y-2 text-slate-300">
              <li>• Current stat values</li>
              <li>• Minimum and maximum possible values</li>
              <li>• Your desired values</li>
              <li>• Current Divine Orb prices</li>
            </ul>
          </div>

          <div className="bg-slate-900 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-white mb-3">Methodology</h3>
            <p className="text-slate-300 mb-4">
              The probability calculation is based on:
            </p>
            <ul className="space-y-2 text-slate-300">
              <li>• Path of Exile's official mod ranges</li>
              <li>• Statistical probability theory</li>
              <li>• Real-world Divine Orb prices</li>
              <li>• Community feedback and testing</li>
            </ul>
          </div>
        </div>

        <div className="bg-slate-900 p-6 rounded-lg mb-8">
          <h2 className="text-2xl font-semibold text-white mb-4">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">Core Features</h3>
              <ul className="space-y-2 text-slate-300">
                <li>• Real-time probability calculations</li>
                <li>• Cost estimates in Divine Orbs</li>
                <li>• Support for all item types</li>
                <li>• Easy-to-use interface</li>
                <li>• Example items included</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">Planned Features</h3>
              <ul className="space-y-2 text-slate-300">
                <li>• Save and load configurations</li>
                <li>• Compare different items</li>
                <li>• Alternative crafting methods</li>
                <li>• League-specific prices</li>
                <li>• Mobile app version</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-slate-900 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold text-white mb-4">Get Started</h2>
          <p className="text-slate-300 mb-4">
            Ready to calculate your Divine Orb probabilities? Head over to our calculator and start crafting smarter.
          </p>
          <Link 
            href="/divine-calculator"
            className="inline-block px-6 py-3 bg-blue-700 text-white font-semibold rounded hover:bg-blue-800 transition-colors"
          >
            Start Calculating
          </Link>
        </div>
      </div>
    </div>
  );
} 