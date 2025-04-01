interface ParsedItem {
  name: string;
  stats: Array<{
    name: string;
    currentValue: number;
    minValue: number;
    maxValue: number;
    selected: boolean;
    desiredValue: number;
  }>;
  image: string | null;
  rarity: 'Normal' | 'Magic' | 'Rare' | 'Unique';
}

export function parseItemData(itemData: string): ParsedItem {
  const lines = itemData.split('\n');
  const name = lines[0]?.trim() || 'Unknown Item';
  
  // Extract rarity from the item data
  let rarity: 'Normal' | 'Magic' | 'Rare' | 'Unique' = 'Normal';
  if (lines.some(line => line.includes('Rarity: Magic'))) rarity = 'Magic';
  else if (lines.some(line => line.includes('Rarity: Rare'))) rarity = 'Rare';
  else if (lines.some(line => line.includes('Rarity: Unique'))) rarity = 'Unique';

  // Extract image name from the item data
  const imageLine = lines.find(line => line.includes('Art/2DItems/'));
  const image = imageLine ? imageLine.split('/').pop()?.replace('"', '') || null : null;

  // Parse stats
  const stats: ParsedItem['stats'] = [];
  lines.forEach(line => {
    if (line.includes('+') || line.includes('-')) {
      const match = line.match(/([+-]\d+) to (.+)/);
      if (match) {
        const value = parseInt(match[1]);
        const statName = match[2].trim();
        stats.push({
          name: statName,
          currentValue: value,
          minValue: value,
          maxValue: value,
          selected: false,
          desiredValue: value
        });
      }
    }
  });

  return {
    name,
    stats,
    image,
    rarity
  };
} 