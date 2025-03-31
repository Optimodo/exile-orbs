'use client';

import ExaltedCalculator from '../components/ExaltedCalculator';
import ExaltedResults from '../components/ExaltedResults';
import { useState } from 'react';

export default function CalculatorPage() {
  const [result, setResult] = useState<{
    probability: number;
    averageAttempts: number;
    costEstimate: number;
    standardDeviation: number;
    confidenceInterval: {
      lower: number;
      upper: number;
    };
  } | null>(null);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white font-cinzel tracking-wider mb-2">
            Exalted Orb Prediction Calculator
          </h1>
          <p className="text-slate-400">
            Calculate the probability of getting your desired rolls with an Exalted Orb
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-slate-900/80 border border-slate-800/50 rounded-lg p-6">
              <ExaltedCalculator onResult={setResult} />
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-slate-900/80 border border-slate-800/50 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-white font-cinzel tracking-wide mb-6">
                Results
              </h2>
              <ExaltedResults result={result} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 