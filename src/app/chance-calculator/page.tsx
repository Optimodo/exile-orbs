'use client';

import { useState } from 'react';
import chanceData from '@/data/chance_orb_outcomes.json';
import ItemHoverBox from '@/components/ItemHoverBox';
import '@/styles/hover-box.css';

interface ChanceItem {
  baseItem: string;
  chance: string;
  averageOrbs: number;
  name: string;
  poeWikiLink: string;
  baseItemDisambiguation: string;
  tier: number;
  disambiguation: string;
  minILvl: string;
  weight: number;
  destructionChance: string;
}

export default function ChanceCalculator() {
  const [selectedLetter, setSelectedLetter] = useState<string>('A');
  const [hoveredItem, setHoveredItem] = useState<ChanceItem | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [sortConfig, setSortConfig] = useState<{
    key: keyof ChanceItem;
    direction: 'asc' | 'desc';
  }>({ key: 'name', direction: 'asc' });

  // Group items by first letter of unique name
  const groupedItems = chanceData.reduce((acc: { [key: string]: ChanceItem[] }, item) => {
    const firstLetter = item.name[0].toUpperCase();
    if (!acc[firstLetter]) {
      acc[firstLetter] = [];
    }
    acc[firstLetter].push(item);
    return acc;
  }, {});

  // Sort items based on current configuration
  const sortedItems = [...(groupedItems[selectedLetter] || [])].sort((a, b) => {
    if (sortConfig.key === 'name' || sortConfig.key === 'baseItem') {
      return sortConfig.direction === 'asc' 
        ? a[sortConfig.key].localeCompare(b[sortConfig.key])
        : b[sortConfig.key].localeCompare(a[sortConfig.key]);
    }
    return sortConfig.direction === 'asc'
      ? a[sortConfig.key] > b[sortConfig.key] ? 1 : -1
      : a[sortConfig.key] < b[sortConfig.key] ? 1 : -1;
  });

  const handleSort = (key: keyof ChanceItem) => {
    setSortConfig(current => ({
      key,
      direction: current.key === key && current.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-amber-500 mb-8 font-cinzel">Orb of Chance Calculator</h1>
      
      {/* Alphabetical Navigation */}
      <div className="flex flex-wrap gap-2 mb-6">
        {Object.keys(groupedItems)
          .sort()
          .map(letter => (
            <button
              key={letter}
              onClick={() => setSelectedLetter(letter)}
              className={`px-3 py-1 rounded ${
                selectedLetter === letter
                  ? 'bg-amber-500 text-slate-900'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              } transition-colors`}
            >
              {letter}
            </button>
          ))}
      </div>

      {/* Items Table */}
      <div className="mt-8 bg-slate-800 rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-slate-700">
          <thead className="bg-slate-900">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider cursor-pointer hover:text-amber-500"
                onClick={() => handleSort('name')}
              >
                Unique Name {sortConfig.key === 'name' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider cursor-pointer hover:text-amber-500"
                onClick={() => handleSort('baseItem')}
              >
                Base Item {sortConfig.key === 'baseItem' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider cursor-pointer hover:text-amber-500"
                onClick={() => handleSort('chance')}
              >
                Chance {sortConfig.key === 'chance' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider cursor-pointer hover:text-amber-500"
                onClick={() => handleSort('averageOrbs')}
              >
                Avg Orbs {sortConfig.key === 'averageOrbs' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                Wiki
              </th>
            </tr>
          </thead>
          <tbody className="bg-slate-800 divide-y divide-slate-700">
            {sortedItems.map((item, index) => (
              <tr key={index} className="hover:bg-slate-700/50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">
                  <div
                    className="font-medium cursor-pointer hover:text-amber-500 transition-colors"
                    onMouseEnter={(e) => {
                      setHoveredItem(item);
                      setMousePosition({ x: e.clientX, y: e.clientY });
                    }}
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    {item.name}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">
                  {item.baseItem}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">
                  {parseFloat(item.chance).toFixed(2)}%
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">
                  {item.averageOrbs.toFixed(1)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <a
                    href={item.poeWikiLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-amber-500 hover:text-amber-400 transition-colors"
                  >
                    Wiki
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {hoveredItem && (
        <div
          className="uniqueHover"
          style={{
            left: `${mousePosition.x + 10}px`,
            top: `${mousePosition.y + 10}px`,
          }}
        >
          <ItemHoverBox
            name={hoveredItem.name}
            baseItem={hoveredItem.baseItem}
            itemType={hoveredItem.baseItemDisambiguation || ''}
            levelReq={hoveredItem.minILvl || 0}
            attributes={[
              `Chance: ${parseFloat(hoveredItem.chance).toFixed(2)}%`,
              `Average Orbs: ${Number(hoveredItem.averageOrbs).toFixed(1)}`,
              `Destruction Chance: ${parseFloat(hoveredItem.destructionChance).toFixed(2)}%`
            ]}
            mods={[
              {
                text: `Tier: ${hoveredItem.tier}`,
                description: "Item tier in the unique item pool"
              }
            ]}
            flavorText=""
            imagePath={`/images/items/${hoveredItem.name.replace(/['"]/g, '').replace(/[^a-zA-Z0-9]/g, ' ')}_large.png`}
          />
        </div>
      )}
    </div>
  );
} 