import React, { useState, useRef, useEffect } from 'react';

interface Stat {
  name: string;
  currentValue: number;
  minValue: number;
  maxValue: number;
  selected: boolean;
  desiredValue: number;
}

interface ItemDisplayProps {
  itemName: string;
  stats: Stat[];
  onStatChange: (index: number, selected: boolean) => void;
  onDesiredValueChange: (index: number, value: number) => void;
  itemImage?: string | null;
  onCalculate: () => void;
  rarity?: 'Normal' | 'Magic' | 'Rare' | 'Unique';
}

export const ItemDisplay: React.FC<ItemDisplayProps> = ({
  itemName,
  stats,
  onStatChange,
  onDesiredValueChange,
  itemImage,
  onCalculate,
  rarity = 'Normal'
}) => {
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Get indices of selected stats
  const selectedStatIndices = stats
    .map((stat, index) => stat.selected ? index : -1)
    .filter(index => index !== -1);

  useEffect(() => {
    // Focus the input when it becomes visible
    if (focusedIndex !== null && inputRefs.current[focusedIndex]) {
      inputRefs.current[focusedIndex]?.focus();
      inputRefs.current[focusedIndex]?.select(); // Select the text
    }
  }, [focusedIndex]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Enter') {
      const stat = stats[index];
      const clampedValue = Math.min(Math.max(stat.desiredValue, stat.minValue), stat.maxValue);
      onDesiredValueChange(index, clampedValue);
      onCalculate();
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const stat = stats[index];
      const clampedValue = Math.min(Math.max(stat.desiredValue, stat.minValue), stat.maxValue);
      onDesiredValueChange(index, clampedValue);
      
      // Find the next selected stat index
      const currentIndex = selectedStatIndices.indexOf(index);
      const nextIndex = selectedStatIndices[(currentIndex + 1) % selectedStatIndices.length];
      setFocusedIndex(nextIndex);
    }
  };

  const handleInputChange = (index: number, value: string) => {
    const stat = stats[index];
    const numValue = parseInt(value) || 0;
    onDesiredValueChange(index, numValue);
  };

  const handleInputBlur = (index: number) => {
    const stat = stats[index];
    const clampedValue = Math.min(Math.max(stat.desiredValue, stat.minValue), stat.maxValue);
    onDesiredValueChange(index, clampedValue);
    setFocusedIndex(null);
  };

  const handleSetMin = (index: number) => {
    const stat = stats[index];
    onDesiredValueChange(index, stat.minValue);
  };

  const handleSetMax = (index: number) => {
    const stat = stats[index];
    onDesiredValueChange(index, stat.maxValue);
  };

  const handleSelectAll = () => {
    const allSelected = stats.every(stat => stat.selected);
    stats.forEach((_, index) => onStatChange(index, !allSelected));
  };

  const handleSetAllMin = () => {
    stats.forEach((stat, index) => onDesiredValueChange(index, stat.minValue));
  };

  const handleSetAllMax = () => {
    stats.forEach((stat, index) => onDesiredValueChange(index, stat.maxValue));
  };

  const getRarityColor = () => {
    switch (rarity) {
      case 'Magic':
        return 'border-[#6F9DFE]';
      case 'Rare':
        return 'border-[#FFD700]';
      case 'Unique':
        return 'border-[#D67F29]';
      default:
        return 'border-slate-700';
    }
  };

  const handleSliderChange = (index: number, value: string) => {
    const stat = stats[index];
    const numValue = parseInt(value);
    // For reversed ranges, we need to invert the value
    if (stat.minValue > stat.maxValue) {
      const range = stat.minValue - stat.maxValue;
      const invertedValue = stat.minValue - (numValue - stat.maxValue);
      onDesiredValueChange(index, invertedValue);
    } else {
      onDesiredValueChange(index, numValue);
    }
  };

  const isReversedRange = (stat: Stat) => stat.minValue > stat.maxValue;

  return (
    <div className={`bg-slate-900 p-4 rounded-lg border-2 ${getRarityColor()}`}>
      <div className="flex items-start space-x-4 mb-3">
        <div className="flex-shrink-0">
          {itemImage ? (
            <img
              src={`/images/items/${itemImage}`}
              alt={itemName}
              className="w-14 h-14 rounded"
              onError={(e) => {
                console.error('Failed to load image:', itemImage);
                e.currentTarget.style.display = 'none';
              }}
            />
          ) : (
            <div className="w-14 h-14 bg-slate-800 rounded flex items-center justify-center text-slate-600 text-sm">
              No Image
            </div>
          )}
        </div>
        <div className="flex-grow">
          <h2 className="text-lg font-bold text-white mb-1">{itemName}</h2>
          <p className="text-slate-400 text-xs">Select stats to calculate probability</p>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex space-x-2 mb-2">
          <button
            onClick={handleSelectAll}
            className="px-2 py-0.5 bg-slate-800 text-white rounded hover:bg-slate-700 transition-colors text-xs"
          >
            {stats.every(stat => stat.selected) ? 'Deselect All' : 'Select All'}
          </button>
          <button
            onClick={handleSetAllMin}
            className="px-2 py-0.5 bg-slate-800 text-white rounded hover:bg-slate-700 transition-colors text-xs"
          >
            Set All to Min
          </button>
          <button
            onClick={handleSetAllMax}
            className="px-2 py-0.5 bg-slate-800 text-white rounded hover:bg-slate-700 transition-colors text-xs"
          >
            Set All to Max
          </button>
        </div>

        {stats.map((stat, index) => (
          <div key={index} className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={stat.selected}
                  onChange={(e) => onStatChange(index, e.target.checked)}
                  className="rounded border-slate-600 text-blue-500 focus:ring-blue-500"
                />
                <span className="text-white text-sm">{stat.name}</span>
              </label>
              <span className="text-slate-400 text-sm">
                Current: {stat.currentValue} ({stat.minValue}-{stat.maxValue})
              </span>
            </div>
            {stat.selected && (
              <div className="flex items-center space-x-4">
                {focusedIndex === index ? (
                  <input
                    ref={el => {
                      inputRefs.current[index] = el;
                    }}
                    type="number"
                    value={stat.desiredValue}
                    onChange={(e) => handleInputChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    onBlur={() => handleInputBlur(index)}
                    className="w-20 px-2 py-0.5 bg-slate-800 border border-slate-700 rounded text-white text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                    min={Math.min(stat.minValue, stat.maxValue)}
                    max={Math.max(stat.minValue, stat.maxValue)}
                  />
                ) : (
                  <span 
                    className="w-20 px-2 py-0.5 bg-slate-800 border border-slate-700 rounded text-white text-sm cursor-pointer hover:bg-slate-700"
                    onClick={() => setFocusedIndex(index)}
                  >
                    {stat.desiredValue}
                  </span>
                )}
                <div className="flex items-center flex-grow">
                  <button
                    onClick={() => handleSetMin(index)}
                    className="p-0.5 text-slate-400 hover:text-white transition-colors"
                    title="Set to minimum"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </button>
                  <input
                    type="range"
                    value={stat.minValue > stat.maxValue ? stat.maxValue + (stat.minValue - stat.desiredValue) : stat.desiredValue}
                    onChange={(e) => handleSliderChange(index, e.target.value)}
                    min={Math.min(stat.minValue, stat.maxValue)}
                    max={Math.max(stat.minValue, stat.maxValue)}
                    className="flex-grow h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500 mx-2"
                  />
                  <button
                    onClick={() => handleSetMax(index)}
                    className="p-0.5 text-slate-400 hover:text-white transition-colors"
                    title="Set to maximum"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}; 