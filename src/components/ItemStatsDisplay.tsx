import { useMemo } from 'react';
import itemsData from '@/data/items_data.json';

interface ItemStat {
  text: string;
  value: string;
  type: 'base' | 'requirement' | 'implicit' | 'explicit';
}

interface ItemData {
  name: string;
  baseItem: string;
  stats: ItemStat[];
  flavourText?: string;
  imageFilename?: string;
}

interface ItemStatsDisplayProps {
  itemName: string;
  showImage?: boolean;
  className?: string;
}

function buildBaseStatsSection(item: any): ItemStat[] {
  const stats: ItemStat[] = [];
  
  // First line is just the category
  if (item.category) {
    stats.push({
      text: item.category,
      value: '',
      type: 'base'
    });
  }

  // Add each base stat on a new line
  if (item.base_stats) {
    item.base_stats.forEach((stat: string) => {
      stats.push({
        text: stat,
        value: '',
        type: 'base'
      });
    });
  }

  return stats;
}

function buildRequirementsSection(requirements: any): ItemStat | null {
  if (!requirements) return null;

  const parts: string[] = [];
  
  if (requirements.level) {
    parts.push(`Level ${requirements.level}`);
  }

  // Check for attributes using both camelCase and lowercase keys
  const str = requirements.str || requirements.strength;
  const dex = requirements.dex || requirements.dexterity;
  const int = requirements.int || requirements.intelligence;

  if (str) {
    parts.push(`${str} Str`);
  }

  if (dex) {
    parts.push(`${dex} Dex`);
  }

  if (int) {
    parts.push(`${int} Int`);
  }

  if (parts.length === 0) return null;

  return {
    text: 'Requires ' + parts.join(', '),
    value: '',
    type: 'requirement'
  };
}

export default function ItemStatsDisplay({ itemName, showImage = true, className = '' }: ItemStatsDisplayProps) {
  const itemData = useMemo(() => {
    const item = itemsData.items.find((item: any) => item.name === itemName);
    if (!item) return null;

    const stats: ItemStat[] = [];
    
    // Add base stats
    stats.push(...buildBaseStatsSection(item));

    // Add requirements if they exist
    const requirements = buildRequirementsSection(item.requirements);
    if (requirements) {
      stats.push(requirements);
    }

    return {
      name: item.name,
      baseItem: item.base_type,
      stats,
      flavourText: item.flavor_text,
      imageFilename: item.images?.large
    };
  }, [itemName]);

  if (!itemData) return null;

  return (
    <div className={`tooltip-content ${className}`}>
      <div className="banner">
        <div className="name">{itemData.name}</div>
        <div className="baseItem">{itemData.baseItem}</div>
      </div>
      {showImage && itemData.imageFilename && (
        <img 
          src={`/images/items/${itemData.imageFilename}`}
          alt={itemData.name}
          className="item-image"
        />
      )}
      <div className="detail">
        {itemData.stats.map((stat, index) => {
          switch (stat.type) {
            case 'requirement':
              return (
                <div key={index} className="prop">
                  <span className="req">{stat.text}</span>
                </div>
              );
            case 'base':
              return (
                <div key={index} className="prop">
                  <span className="impl">{stat.text}{stat.value ? `: ${stat.value}` : ''}</span>
                </div>
              );
            case 'implicit':
              return (
                <div key={index} className="mod">
                  <span className="impl">{stat.text}</span>
                </div>
              );
            case 'explicit':
              return (
                <div key={index} className="mod">
                  <span className="impl">{stat.text}</span>
                </div>
              );
            default:
              return null;
          }
        })}
        {itemData.flavourText && (
          <div className="flav">
            <span className="impl">{itemData.flavourText}</span>
          </div>
        )}
      </div>
    </div>
  );
} 