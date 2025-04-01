import React from 'react';

interface ItemHoverBoxProps {
  name: string;
  baseItem: string;
  itemType: string;
  levelReq: number | string;
  attributes: string[];
  mods: Array<{
    text: string;
    description?: string;
  }>;
  flavorText: string;
  imagePath?: string;
}

export default function ItemHoverBox({
  name,
  baseItem,
  itemType,
  levelReq,
  attributes,
  mods,
  flavorText,
  imagePath,
}: ItemHoverBoxProps) {
  return (
    <div className="uniqueHover">
      <div className="banner">
        <div className="name">{name}</div>
        <div className="baseItem">{baseItem}</div>
      </div>
      {imagePath && (
        <img 
          src={imagePath} 
          alt={name}
          className="item-image"
        />
      )}
      <div className="detail">
        <div className="prop">
          <span className="req">Item Level: {levelReq}</span>
        </div>
        {itemType && (
          <div className="prop">
            <span className="impl">{itemType}</span>
          </div>
        )}
        {attributes.map((attr, index) => (
          <div key={index} className="prop">
            <span className="impl">{attr}</span>
          </div>
        ))}
        {mods.map((mod, index) => (
          <div key={index} className="mod">
            <span className="impl">{mod.text}</span>
            {mod.description && <span className="desc">{mod.description}</span>}
          </div>
        ))}
        {flavorText && (
          <div className="flav">
            <span className="impl">{flavorText}</span>
          </div>
        )}
      </div>
    </div>
  );
} 