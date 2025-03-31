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
  itemImage?: string | null;
}

export const ItemDisplay: React.FC<ItemDisplayProps> = ({
  itemName,
  stats,
  onStatChange,
  onDesiredValueChange,
  itemImage
}) => {
  return (
    <div className="bg-slate-800 p-4 rounded-lg">
      <div className="flex items-start space-x-4 mb-4">
        <div className="flex-shrink-0">
          {itemImage ? (
            <img
              src={`/images/items/${itemImage}`}
              alt={itemName}
              className="w-16 h-16 object-contain"
              onError={(e) => {
                console.error('Failed to load image:', itemImage);
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
          ) : (
            <div className="w-16 h-16 bg-slate-700 rounded flex items-center justify-center">
              <span className="text-slate-500 text-xs">No Image</span>
            </div>
          )}
        </div>
        <div className="flex-grow">
          <h3 className="text-lg font-bold text-white">{itemName}</h3>
          <p className="text-sm text-slate-400">Select stats to calculate probability</p>
        </div>
      </div>

      <div className="space-y-4">
        {stats.map((stat, index) => (
          <div key={index} className="space-y-2">
            <div className="flex items-center space-x-4">
              <input
                type="checkbox"
                checked={stat.selected}
                onChange={(e) => onStatChange(index, e.target.checked)}
                className="w-4 h-4 text-amber-500 rounded focus:ring-amber-500"
              />
              <span className="text-white">{stat.name}</span>
              <span className="text-slate-400">({stat.minValue} - {stat.maxValue})</span>
            </div>
            
            {stat.selected && (
              <div className="pl-8 space-y-1">
                <input
                  type="range"
                  value={stat.desiredValue}
                  onChange={(e) => onDesiredValueChange(index, parseInt(e.target.value))}
                  min={stat.minValue}
                  max={stat.maxValue}
                  className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
                />
                <div className="flex justify-between text-sm text-slate-400">
                  <span>Min: {stat.minValue}</span>
                  <span>Current: {stat.desiredValue}</span>
                  <span>Max: {stat.maxValue}</span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}; 