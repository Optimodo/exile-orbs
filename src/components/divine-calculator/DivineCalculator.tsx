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
  onResult: (result: DivineResult | null) => void;
}

// Example items from the data file
const exampleItems = [
  { name: 'Agony Shelter', data: `Item Class: Body Armours
Rarity: Rare
Agony Shelter
Expert Keth Raiment
--------
Energy Shield: 232 (augmented)
--------
Requires: Level 70, 157 Int
--------
Sockets: S 
--------
Item Level: 81
--------
{ Implicit Modifier — Mana }
41(40-50)% increased Mana Regeneration Rate (implicit)
--------
{ Prefix Modifier "Glittering" (Tier: 3) — Defences }
+28(25-30) to maximum Energy Shield
{ Prefix Modifier "Sanguine" (Tier: 3) — Life }
+39(30-39) to maximum Life
{ Prefix Modifier "Bishop's" (Tier: 4) — Life, Defences }
28(27-32)% increased Energy Shield
+26(26-32) to maximum Life
{ Suffix Modifier "of the Walrus" (Tier: 5) — Elemental, Cold, Resistance }
+28(26-30)% to Cold Resistance
{ Suffix Modifier "of the Philosopher" (Tier: 5) — Attribute }
+23(21-24) to Intelligence
{ Suffix Modifier "of Assuaging" (Tier: 4) — Physical, Ailment }
53(55-51)% reduced Bleeding Duration on you` },
  { name: 'Mask of the Stitched Demon', data: `Item Class: Helmets
Rarity: Unique
Mask of the Stitched Demon
Feathered Tiara
--------
Energy Shield: 118 (augmented)
--------
Requires: Level 33, 61 Int
--------
Item Level: 81
--------
{ Unique Modifier — Defences }
131(120-160)% increased Energy Shield
{ Unique Modifier — Defences }
Cannot have Energy Shield — Unscalable Value
{ Unique Modifier }
Regenerate 0.05 Life per second per Maximum Energy Shield
{ Unique Modifier — Chaos, Resistance }
+19(17-23)% to Chaos Resistance
--------
From the flesh of the gods, Xibaqua was born.
From the carnage of Xibaqua, we were born.
It is our duty to return to the gods what was once theirs.` },
  { name: 'Havoc Call', data: `Item Class: Wands
Rarity: Rare
Havoc Call
Siphoning Wand
--------
Requires: Level 78, 178 Int
--------
Item Level: 82
--------
{ Prefix Modifier "Aqua" (Tier: 6) — Mana }
+79(65-79) to maximum Mana
{ Prefix Modifier "Warlock's" (Tier: 4) — Mana, Damage, Caster }
30(30-34)% increased Spell Damage
+32(29-33) to maximum Mana
{ Prefix Modifier "Clouded" (Tier: 3) — Damage, Chaos }
49(45-54)% increased Chaos Damage
{ Suffix Modifier "of Legerdemain" (Tier: 5) — Caster, Speed }
26(25-28)% increased Cast Speed
{ Suffix Modifier "of Ruin" (Tier: 3) — Chaos, Caster, Gem }
+3 to Level of all Chaos Spell Skills
{ Suffix Modifier "of Disaster" (Tier: 3) — Caster, Critical }
44(40-59)% increased Critical Hit Chance for Spells` }
];

export const DivineCalculator: React.FC<DivineCalculatorProps> = ({ onResult }) => {
  console.log('DivineCalculator component rendering');
  
  useEffect(() => {
    console.log('DivineCalculator component mounted');
  }, []);

  const [itemData, setItemData] = useState('');
  const [stats, setStats] = useState<Stat[]>([]);
  const [itemName, setItemName] = useState('');
  const [itemImage, setItemImage] = useState<string | null>(null);
  const [rarity, setRarity] = useState<'Normal' | 'Magic' | 'Rare' | 'Unique'>('Normal');
  const [isInputVisible, setIsInputVisible] = useState(true);

  const handleParseClick = () => {
    console.log('Parse button clicked');
    parseItemData();
    setIsInputVisible(false);
  };

  const handleExampleClick = (exampleData: string) => {
    setItemData(exampleData);
    // Automatically parse the example data
    setTimeout(() => {
      parseItemData();
      setIsInputVisible(false);
    }, 0);
  };

  const parseItemData = () => {
    console.log('Parsing item data:', itemData);
    const lines = itemData.split('\n');
    console.log('Split lines:', lines);
    const newStats: Stat[] = [];
    let currentItemName = '';
    let currentRarity: 'Normal' | 'Magic' | 'Rare' | 'Unique' = 'Normal';

    // Find rarity and item name
    for (const line of lines) {
      if (line.trim()) {
        if (line.includes('Rarity: Rare')) {
          currentRarity = 'Rare';
          // For Rare items, base item is on line 4 (index 3)
          const baseItemLine = lines[3];
          if (baseItemLine && baseItemLine.trim()) {
            currentItemName = baseItemLine.trim();
            console.log('Found Rare item name:', currentItemName);
            break;
          }
        } else if (line.includes('Rarity: Unique')) {
          currentRarity = 'Unique';
          // For Unique items, base item is on line 3 (index 2)
          const baseItemLine = lines[2];
          if (baseItemLine && baseItemLine.trim()) {
            currentItemName = baseItemLine.trim();
            console.log('Found Unique item name:', currentItemName);
            break;
          }
        } else if (line.includes('Rarity: Magic')) {
          currentRarity = 'Magic';
          // For Magic items, base item is on line 3 (index 2)
          const baseItemLine = lines[2];
          if (baseItemLine && baseItemLine.trim()) {
            currentItemName = baseItemLine.trim();
            console.log('Found Magic item name:', currentItemName);
            break;
          }
        }
      }
    }

    setItemName(currentItemName);
    setRarity(currentRarity);

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
    const statsToCalculate = selectedStats.length > 0 ? selectedStats : stats;

    let totalProbability = 1;
    for (const stat of statsToCalculate) {
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

  const handleReset = () => {
    setItemData('');
    setStats([]);
    setItemName('');
    setItemImage(null);
    setRarity('Normal');
    setIsInputVisible(true);
    onResult(null);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col space-y-4">
        <div className="flex flex-wrap gap-2">
          {exampleItems.map((item, index) => (
            <button
              key={index}
              onClick={() => handleExampleClick(item.data)}
              className="px-3 py-1 text-sm bg-slate-800 text-slate-300 rounded hover:bg-slate-700 transition-colors"
            >
              {item.name}
            </button>
          ))}
        </div>

        {isInputVisible ? (
          <>
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
              className="w-full h-20 p-2 border rounded bg-slate-800 text-white border-slate-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none text-sm"
            />
            <button
              onClick={handleParseClick}
              className="px-3 py-1.5 bg-blue-700 text-white font-semibold rounded hover:bg-blue-800 cursor-pointer transition-colors shadow-md hover:shadow-lg text-sm"
            >
              Parse Item Data
            </button>
          </>
        ) : (
          <div className="flex justify-between items-center">
            <button
              onClick={() => setIsInputVisible(true)}
              className="flex items-center space-x-2 px-3 py-1.5 bg-slate-800 text-white rounded hover:bg-slate-700 transition-colors text-sm"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              <span>Show Input</span>
            </button>
            <button
              onClick={handleReset}
              className="flex items-center space-x-2 px-3 py-1.5 bg-red-700 text-white rounded hover:bg-red-800 transition-colors text-sm"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
              </svg>
              <span>Reset</span>
            </button>
          </div>
        )}
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
            rarity={rarity}
          />
          <button
            onClick={calculateProbability}
            className="w-full px-4 py-2 bg-green-700 text-white font-semibold rounded hover:bg-green-800 cursor-pointer transition-colors shadow-md hover:shadow-lg"
          >
            Calculate Probability
          </button>
        </div>
      )}
    </div>
  );
}; 