import React from 'react';
import ItemStatsDisplay from './ItemStatsDisplay';

interface ItemHoverBoxProps {
  itemName: string;
  chanceData?: {
    chance: number;
    averageOrbs: number;
    destructionChance: number;
    tier: string | number;
  };
}

export default function ItemHoverBox({ itemName, chanceData }: ItemHoverBoxProps) {
  return (
    <div className="uniqueHover">
      <ItemStatsDisplay itemName={itemName} />
      {chanceData && (
        <div className="detail">
          <div className="prop">
            <span className="impl">Chance: {parseFloat(String(chanceData.chance)).toFixed(2)}%</span>
          </div>
          <div className="prop">
            <span className="impl">Average Orbs: {Number(chanceData.averageOrbs).toFixed(1)}</span>
          </div>
          <div className="prop">
            <span className="impl">Destruction Chance: {parseFloat(String(chanceData.destructionChance)).toFixed(2)}%</span>
          </div>
          <div className="mod">
            <span className="impl">Tier: {chanceData.tier}</span>
            <span className="desc">Item tier in the unique item pool</span>
          </div>
        </div>
      )}
    </div>
  );
} 