'use client';

import React, { useState, useEffect } from 'react';
import { ExaltedResult } from '../types/calculator';
import { ItemDisplay } from './ItemDisplay';

interface Stat {
  name: string;
  currentValue: number;
  minValue: number;
  maxValue: number;
  selected: boolean;
  desiredValue: number;
}

interface ExaltedCalculatorProps {
  onResult: (result: ExaltedResult) => void;
}

export const ExaltedCalculator: React.FC<ExaltedCalculatorProps> = ({ onResult }) => {
  console.log('ExaltedCalculator component rendering');
  
  useEffect(() => {
    console.log('ExaltedCalculator component mounted');
  }, []);

  const [itemData, setItemData] = useState('');
  const [stats, setStats] = useState<Stat[]>([]);
  const [itemName, setItemName] = useState('');

  const handleParseClick = () => {
    console.log('Parse button clicked');
    parseItemData();
  };

  const parseItemData = () => {
    console.log('Parsing item data:', itemData);
    const lines = itemData.split('\n');
    console.log('Split lines:', lines);
    const newStats: Stat[] = [];
    let currentItemName = '';

    // Find item name from the first line
    let lineCount = 0;
    for (const line of lines) {
      if (line.trim() && !line.includes('--------') && !line.includes('Item Level:')) {
        lineCount++;
        if (lineCount === 4) {  // Get the fourth line which is the base item name
          currentItemName = line.trim();
          console.log('Found item name:', currentItemName);
          break;
        }
      }
    }

    setItemName(currentItemName);

    // Parse stats
    for (const line of lines) {
      if (line.includes('--------')) continue;
      
      console.log('Processing line:', line);
      // Match both formats: +X(Y-Z) to stat and X(Y-Z)% increased stat
      const statMatch = line.match(/(?:\+)?(\d+)\((\d+)-(\d+)\)(?:\s*to\s*|\s*%\s*increased\s*)(.*)/);
      console.log('Stat match result:', statMatch);
      if (statMatch) {
        const [, currentValue, minValue, maxValue, name] = statMatch;
        newStats.push({
          name: name.trim(),
          currentValue: parseInt(currentValue),
          minValue: parseInt(minValue),
          maxValue: parseInt(maxValue),
          selected: false,
          desiredValue: parseInt(currentValue)
        });
      }
    }

    console.log('Parsed stats:', newStats);
    setStats(newStats);
  };

  const calculateProbability = () => {
    const selectedStats = stats.filter(stat => stat.selected);
    if (selectedStats.length === 0) {
      onResult({
        probability: 0,
        averageAttempts: 0,
        costEstimate: 0,
        standardDeviation: 0,
        confidenceInterval: { min: 0, max: 0 }
      });
      return;
    }

    let totalProbability = 1;
    for (const stat of selectedStats) {
      const favorableOutcomes = stat.maxValue - stat.desiredValue + 1;
      const totalRange = stat.maxValue - stat.minValue + 1;
      const probability = favorableOutcomes / totalRange;
      totalProbability *= probability;
    }

    const averageAttempts = 1 / totalProbability;
    const costEstimate = averageAttempts * 1; // Assuming 1 Exalted Orb per attempt
    const standardDeviation = Math.sqrt((1 - totalProbability) / (totalProbability * totalProbability));
    const confidenceInterval = {
      min: Math.max(0, averageAttempts - 2 * standardDeviation),
      max: averageAttempts + 2 * standardDeviation
    };

    onResult({
      probability: totalProbability,
      averageAttempts,
      costEstimate,
      standardDeviation,
      confidenceInterval
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col space-y-4">
        <textarea
          value={itemData}
          onChange={(e) => {
            console.log('Textarea changed:', e.target.value);
            setItemData(e.target.value);
          }}
          placeholder="Paste item data here..."
          className="w-full h-32 p-2 border rounded"
        />
        <button
          onClick={handleParseClick}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 cursor-pointer transition-colors"
        >
          Parse Item Data
        </button>
      </div>

      {stats.length > 0 && (
        <div className="space-y-4">
          <ItemDisplay
            itemName={itemName}
            stats={stats}
            onStatChange={(index, selected) => {
              const newStats = [...stats];
              newStats[index].selected = selected;
              setStats(newStats);
            }}
            onDesiredValueChange={(index, value) => {
              const newStats = [...stats];
              newStats[index].desiredValue = value;
              setStats(newStats);
            }}
          />
          <button
            onClick={calculateProbability}
            className="w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Calculate Probability
          </button>
        </div>
      )}
    </div>
  );
}; 