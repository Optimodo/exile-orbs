'use client';

import React, { useState, useEffect } from 'react';
import { DivineResult } from '@/app/types/divine';
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

interface DivineCalculatorProps {
  onResult: (result: DivineResult) => void;
}

export const DivineCalculator: React.FC<DivineCalculatorProps> = ({ onResult }) => {
  console.log('DivineCalculator component rendering');
  
  useEffect(() => {
    console.log('DivineCalculator component mounted');
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
          const min = parseInt(minValue);
          const max = parseInt(maxValue);
          
          newStats.push({
            name: name,
            currentValue: parseInt(currentValue),
            minValue: min,
            maxValue: max,
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
        costEstimate: 0
      });
      return;
    }

    let totalProbability = 1;
    for (const stat of selectedStats) {
      // For reversed ranges (where higher is worse), we need to count outcomes differently
      const isReversed = stat.maxValue < stat.minValue;
      const favorableOutcomes = isReversed 
        ? Math.abs(stat.maxValue - stat.desiredValue) + 1  // Count from desired value up to max
        : stat.maxValue - stat.desiredValue + 1; // Count from desired value up to max
      const totalRange = Math.abs(stat.maxValue - stat.minValue) + 1;
      const probability = favorableOutcomes / totalRange;
      totalProbability *= probability;
    }

    const averageAttempts = 1 / totalProbability;
    const costEstimate = averageAttempts * 1; // Assuming 1 Divine Orb per attempt

    onResult({
      probability: totalProbability,
      averageAttempts,
      costEstimate
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
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleParseClick();
            }
          }}
          placeholder="Paste item data here... (Press Enter to parse)"
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
            onCalculate={calculateProbability}
          />
          <button
            onClick={calculateProbability}
            className="w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 cursor-pointer transition-colors"
          >
            Calculate Probability
          </button>
        </div>
      )}
    </div>
  );
}; 