'use client';

import { useState } from 'react';

interface Stat {
  name: string;
  currentValue: number;
  minValue: number;
  maxValue: number;
  selected: boolean;
  desiredValue: number;
}

interface ExaltedCalculatorProps {
  onResult: (result: {
    probability: number;
    averageAttempts: number;
    costEstimate: number;
    standardDeviation: number;
    confidenceInterval: {
      lower: number;
      upper: number;
    };
  } | null) => void;
}

export default function ExaltedCalculator({ onResult }: ExaltedCalculatorProps) {
  const [itemData, setItemData] = useState('');
  const [stats, setStats] = useState<Stat[]>([]);

  const parseItemData = () => {
    const lines = itemData.split('\n');
    const parsedStats: Stat[] = [];
    
    for (const line of lines) {
      const match = line.match(/(\d+)\((\d+)-(\d+)\)\s*(.*)/);
      if (match) {
        const [, currentValue, minValue, maxValue, name] = match;
        parsedStats.push({
          name: name.trim(),
          currentValue: parseInt(currentValue),
          minValue: parseInt(minValue),
          maxValue: parseInt(maxValue),
          selected: false,
          desiredValue: parseInt(currentValue)
        });
      }
    }
    
    setStats(parsedStats);
    onResult(null);
  };

  const calculateProbability = () => {
    const selectedStats = stats.filter(stat => stat.selected);
    if (selectedStats.length === 0) return;

    // Calculate probability for each selected stat
    const probabilities = selectedStats.map(stat => {
      const totalRange = stat.maxValue - stat.minValue;
      const desiredRange = stat.maxValue - stat.desiredValue;
      return desiredRange / totalRange;
    });

    // Combined probability (assuming independent events)
    const combinedProbability = probabilities.reduce((acc, prob) => acc * prob, 1) * 100;

    // Calculate average attempts needed
    const averageAttempts = 1 / (combinedProbability / 100);

    // Calculate standard deviation (geometric distribution)
    const standardDeviation = Math.sqrt((1 - combinedProbability / 100) / Math.pow(combinedProbability / 100, 2));

    // Calculate 95% confidence interval
    const confidenceInterval = {
      lower: averageAttempts - 1.96 * standardDeviation,
      upper: averageAttempts + 1.96 * standardDeviation
    };

    // Estimate cost (assuming 1 Exalted = 100 chaos)
    const costEstimate = averageAttempts * 100;

    onResult({
      probability: combinedProbability,
      averageAttempts,
      costEstimate,
      standardDeviation,
      confidenceInterval
    });
  };

  return (
    <div className="space-y-4">
      <div className="space-y-4">
        <textarea
          value={itemData}
          onChange={(e) => setItemData(e.target.value)}
          placeholder="Paste item data here..."
          className="w-full h-32 p-4 bg-slate-900 text-white rounded-lg border border-slate-700 focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
        />
        <button
          onClick={parseItemData}
          className="w-full py-2 px-4 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
        >
          Parse Item Data
        </button>
      </div>

      {stats.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white">Select Stats to Calculate</h3>
          {stats.map((stat, index) => (
            <div key={index} className="flex items-center space-x-4 p-4 bg-slate-800/50 rounded-lg">
              <input
                type="checkbox"
                checked={stat.selected}
                onChange={(e) => {
                  const newStats = [...stats];
                  newStats[index].selected = e.target.checked;
                  setStats(newStats);
                }}
                className="w-4 h-4 text-amber-500 rounded border-slate-700 focus:ring-amber-500"
              />
              <div className="flex-1">
                <div className="text-white">{stat.name}</div>
                <div className="text-sm text-slate-400">
                  Current: {stat.currentValue} | Range: {stat.minValue}-{stat.maxValue}
                </div>
              </div>
              <input
                type="number"
                value={stat.desiredValue}
                onChange={(e) => {
                  const newStats = [...stats];
                  newStats[index].desiredValue = parseInt(e.target.value);
                  setStats(newStats);
                }}
                min={stat.minValue}
                max={stat.maxValue}
                className="w-20 p-1 bg-slate-900 text-white rounded border border-slate-700 focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
              />
            </div>
          ))}
          <button
            onClick={calculateProbability}
            className="w-full py-2 px-4 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
          >
            Calculate Probability
          </button>
        </div>
      )}
    </div>
  );
} 