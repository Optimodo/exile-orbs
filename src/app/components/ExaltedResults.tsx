'use client';

import React from 'react';
import { ExaltedResult } from '../types/calculator';

interface ExaltedResultsProps {
  result: ExaltedResult | null;
}

export const ExaltedResults: React.FC<ExaltedResultsProps> = ({ result }) => {
  if (!result) {
    return (
      <div className="text-center text-slate-400 p-4 bg-slate-800 rounded">
        Select stats and calculate to see predictions
      </div>
    );
  }

  // Format probability with appropriate decimal places
  const probabilityPercentage = result.probability * 100;
  const formattedProbability = probabilityPercentage < 0.01 ? '0.01' : probabilityPercentage.toFixed(2);

  return (
    <div className="space-y-4">
      <div className="bg-slate-800 p-4 rounded">
        <h3 className="text-lg font-bold text-white mb-2">Probability</h3>
        <p className="text-2xl text-amber-500">{formattedProbability}%</p>
        <p className="text-sm text-slate-400">Chance of getting desired rolls</p>
      </div>

      <div className="bg-slate-800 p-4 rounded">
        <h3 className="text-lg font-bold text-white mb-2">Average Attempts</h3>
        <p className="text-2xl text-amber-500">{result.averageAttempts.toFixed(1)}</p>
        <p className="text-sm text-slate-400">Expected number of Exalted Orbs needed</p>
      </div>

      <div className="bg-slate-800 p-4 rounded">
        <h3 className="text-lg font-bold text-white mb-2">Cost Estimate</h3>
        <p className="text-2xl text-amber-500">{result.costEstimate.toFixed(1)} Exalted Orbs</p>
        <p className="text-sm text-slate-400">Estimated cost based on average attempts</p>
      </div>

      <div className="bg-slate-800 p-4 rounded">
        <h3 className="text-lg font-bold text-white mb-2">Standard Deviation</h3>
        <p className="text-2xl text-amber-500">{result.standardDeviation.toFixed(1)}</p>
        <p className="text-sm text-slate-400">Measure of variance in attempts needed</p>
      </div>

      <div className="bg-slate-800 p-4 rounded">
        <h3 className="text-lg font-bold text-white mb-2">95% Confidence Interval</h3>
        <p className="text-2xl text-amber-500">
          {result.confidenceInterval.min.toFixed(1)} - {result.confidenceInterval.max.toFixed(1)}
        </p>
        <p className="text-sm text-slate-400">Range of attempts needed with 95% confidence</p>
      </div>
    </div>
  );
}; 