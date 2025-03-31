import React from 'react';

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
}

export const ItemDisplay: React.FC<ItemDisplayProps> = ({
  itemName,
  stats,
  onStatChange,
  onDesiredValueChange
}) => {
  return (
    <div className="bg-slate-800 p-4 rounded-lg">
      <div className="mb-4">
        <h3 className="text-lg font-bold text-white">{itemName}</h3>
        <p className="text-sm text-slate-400">Select stats to calculate probability</p>
      </div>

      <div className="space-y-2">
        {stats.map((stat, index) => (
          <div key={index} className="flex items-center space-x-4">
            <input
              type="checkbox"
              checked={stat.selected}
              onChange={(e) => onStatChange(index, e.target.checked)}
              className="w-4 h-4 text-amber-500 rounded focus:ring-amber-500"
            />
            <span className="text-white">{stat.name}:</span>
            <div className="flex-1">
              <input
                type="range"
                value={stat.desiredValue}
                onChange={(e) => onDesiredValueChange(index, parseInt(e.target.value))}
                min={stat.minValue}
                max={stat.maxValue}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />
              <div className="flex justify-between text-xs text-slate-400 mt-1">
                <span>{stat.minValue}</span>
                <span>{stat.desiredValue}</span>
                <span>{stat.maxValue}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}; 