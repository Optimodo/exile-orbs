'use client';

import React, { useState } from 'react';
import { ExaltedCalculator } from '../components/ExaltedCalculator';
import { ExaltedResults } from '../components/ExaltedResults';
import { ExaltedResult } from '../types/calculator';

export default function CalculatorPage() {
  const [result, setResult] = useState<ExaltedResult | null>(null);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-white mb-8">Exalted Orb Calculator</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-slate-900 p-6 rounded-lg">
          <ExaltedCalculator onResult={setResult} />
        </div>
        <div className="bg-slate-900 p-6 rounded-lg">
          <ExaltedResults result={result} />
        </div>
      </div>
    </div>
  );
} 