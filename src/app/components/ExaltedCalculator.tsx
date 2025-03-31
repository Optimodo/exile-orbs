'use client';

import React, { useState, useEffect } from 'react';
import { ExaltedResult } from '../types/calculator';
import { ItemDisplay } from './ItemDisplay';
import itemDatabase from '../../data/items_data.json';

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
  const [itemImage, setItemImage] = useState<string | null>(null);

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
    let rarity = '';

    // Find rarity and item name
    for (const line of lines) {
      if (line.trim()) {
        if (line.includes('Rarity: Rare')) {
          rarity = 'Rare';
          // For Rare items, base item is on line 4 (index 3)
          const baseItemLine = lines[3];
          if (baseItemLine && baseItemLine.trim()) {
            currentItemName = baseItemLine.trim();
            console.log('Found Rare item name:', currentItemName);
            break;
          }
        } else if (line.includes('Rarity: Unique')) {
          rarity = 'Unique';
          // For Unique items, base item is on line 3 (index 2)
          const baseItemLine = lines[2];
          if (baseItemLine && baseItemLine.trim()) {
            currentItemName = baseItemLine.trim();
            console.log('Found Unique item name:', currentItemName);
            break;
          }
        }
      }
    }

    setItemName(currentItemName);

    // Find the item in the database
    const foundItem = itemDatabase.find(item => item.name === currentItemName);
    if (foundItem) {
      console.log('Found item in database:', foundItem);
      setItemImage(foundItem.inventory_icon);
    } else {
      console.log('Item not found in database');
      setItemImage(null);
    }

    // Parse stats
    for (const line of lines) {
      if (line.includes('--------')) continue;
      
      console.log('Processing line:', line);
      
      // Look for any line containing a number range in parentheses
      const rangeMatch = line.match(/(\d+)\((\d+)-(\d+)\)/);
      if (rangeMatch) {
        const [, currentValue, minValue, maxValue] = rangeMatch;
        // Get the full line as the stat name, but remove the range part
        const name = line.replace(/\d+\(\d+-\d+\)/, '').trim();
        
        // Skip if the name is empty or contains only special characters
        if (name && !/^[^a-zA-Z0-9]*$/.test(name)) {
          console.log('Found stat:', { name, currentValue, minValue, maxValue });
          newStats.push({
            name: name,
            currentValue: parseInt(currentValue),
            minValue: parseInt(minValue),
            maxValue: parseInt(maxValue),
            selected: false,
            desiredValue: parseInt(currentValue)
          });
        }
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
            itemImage={itemImage}
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