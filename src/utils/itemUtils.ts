import itemDatabase from '../data/itemDatabase.json';

interface ItemInfo {
  image: string;
  category: string;
  subcategory: string;
  baseType: string;
}

interface ItemDatabase {
  items: {
    [key: string]: ItemInfo;
  };
}

const typedDatabase = itemDatabase as ItemDatabase;

export function parseItemName(fullName: string): {
  randomName: string;
  baseType: string;
} {
  // Split the name into parts
  const parts = fullName.split(' ');
  
  // The last two words are typically the base type
  const baseType = parts.slice(-2).join(' ');
  const randomName = parts.slice(0, -2).join(' ');
  
  return {
    randomName,
    baseType
  };
}

export function getItemInfo(itemType: string): ItemInfo | null {
  // Try to find the item in our database
  const itemKey = Object.keys(typedDatabase.items).find(key => 
    typedDatabase.items[key].baseType.toLowerCase().includes(itemType.toLowerCase())
  );
  
  if (itemKey) {
    return typedDatabase.items[itemKey];
  }
  
  return null;
}

export function getItemImage(itemType: string): string {
  const itemInfo = getItemInfo(itemType);
  return itemInfo?.image || '/images/items/default.png';
} 