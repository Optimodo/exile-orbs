'use client';

import React, { useState } from 'react';
import { DivineCalculator } from '@/components/divine-calculator/DivineCalculator';
import { DivineResults } from '@/components//divine-calculator/DivineResults';
import { DivineResult } from '@/app/types/divine';

export default function CalculatorPage() {
  const [result, setResult] = useState<DivineResult | null>(null);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-white mb-8">Divine Orb Calculator</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-slate-900 p-6 rounded-lg">
          <DivineCalculator onResult={setResult} />
        </div>
        <div className="bg-slate-900 p-6 rounded-lg">
          <DivineResults result={result} />
        </div>
      </div>
    </div>
  );
} 