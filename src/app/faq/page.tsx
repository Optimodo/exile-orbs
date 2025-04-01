'use client';

import React, { useState } from 'react';
import Link from 'next/link';

interface FAQItem {
  question: string;
  answer: string;
}

const faqItems: FAQItem[] = [
  {
    question: "What is a Divine Orb?",
    answer: "A Divine Orb is a currency item in Path of Exile that re-rolls all numeric values of modifiers on an item while keeping their types and tiers. It's one of the most valuable currency items in the game."
  },
  {
    question: "How do I use the calculator?",
    answer: "1. Copy your item data from Path of Exile\n2. Paste it into the calculator\n3. Select the stats you want to keep\n4. Set your desired values\n5. Enter the current Divine Orb price\n6. Click Calculate to see your probability and cost estimate"
  },
  {
    question: "How accurate are the calculations?",
    answer: "The calculations are based on Path of Exile's official mod ranges and statistical probability theory. The accuracy depends on the item data you provide and the current Divine Orb prices in your league."
  },
  {
    question: "What types of items are supported?",
    answer: "The calculator currently supports Rare and Unique items with numeric modifiers. We're working on adding support for Magic items and other item types."
  },
  {
    question: "How do I get my item data?",
    answer: "In Path of Exile, press Ctrl+C while hovering over an item to copy its data. Then paste it into our calculator."
  },
  {
    question: "What's the best way to use Divine Orbs?",
    answer: "1. Focus on the most important stats first\n2. Consider the cost of Divine Orbs in your league\n3. Some stats may be better crafted with other methods\n4. Remember that Divine Orbs re-roll all numeric values"
  },
  {
    question: "Can I save my calculations?",
    answer: "Currently, you cannot save calculations, but this feature is planned for future updates. For now, you can bookmark the page or take screenshots of your results."
  },
  {
    question: "Is this tool affiliated with Grinding Gear Games?",
    answer: "No, this tool is not affiliated with Grinding Gear Games. It's a community-created tool to help players make informed decisions about their crafting investments."
  }
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-6">Frequently Asked Questions</h1>

        <div className="bg-slate-900 p-6 rounded-lg mb-8">
          <p className="text-slate-300 mb-4">
            Find answers to common questions about the Divine Orb Calculator and Divine Orbs in Path of Exile.
          </p>
        </div>

        <div className="space-y-4">
          {faqItems.map((item, index) => (
            <div key={index} className="bg-slate-900 rounded-lg overflow-hidden">
              <button
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-slate-800 transition-colors"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="text-lg font-semibold text-white">{item.question}</span>
                <svg
                  className={`w-6 h-6 text-slate-400 transform transition-transform ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {openIndex === index && (
                <div className="px-6 py-4 bg-slate-800">
                  <p className="text-slate-300 whitespace-pre-line">{item.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <p className="text-slate-300 mb-4">
            Still have questions? Check out our About page or start using the calculator.
          </p>
          <div className="flex justify-center space-x-4">
            <Link
              href="/about"
              className="px-6 py-3 bg-slate-800 text-white font-semibold rounded hover:bg-slate-700 transition-colors"
            >
              About Page
            </Link>
            <Link
              href="/divine-calculator"
              className="px-6 py-3 bg-blue-700 text-white font-semibold rounded hover:bg-blue-800 transition-colors"
            >
              Start Calculating
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 