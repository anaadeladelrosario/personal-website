import React, { useState } from 'react';
import { v4 as uuidv4 } from "uuid";
import './MenuItem.css';

export interface MenuItemProps {
    label: string;
    icon?: React.ComponentType<React.SVGProps<SVGSVGElement>> | null;
    subItems?: MenuItemProps[];
    onItemClick?: () => void;
  }


export const MenuItem: React.FC<MenuItemProps> = ({ label="Text", icon, subItems=[], onItemClick }) => {
    const [openSubMenus, setOpenSubMenus] = useState<string[]>([]);


const toggleSubMenu = (label: string) => {
    setOpenSubMenus((prev: string[]) => 
      prev.includes(label)
        ? prev.filter(item => item !== label)
        : [...prev, label]
    );
  };

  const IconComponent = icon;
  const hasSubItems = subItems && subItems.length > 0;

  const renderMenuItemWithSubItems = (label:string,subItems:MenuItemProps[], depth: number = 0) => {
    const isSubMenuOpen = openSubMenus.includes(label);
    const paddingLeft = `${depth * 1}rem`;
    
    return(
    <>
        <div key={uuidv4()}
          className="menu-item"
          onClick={() => toggleSubMenu(label)}
          style={{ paddingLeft }}
        >
          {IconComponent && <IconComponent className="menu-item-icon" />}
          <span className="menu-item-label">{label}</span>
          {subItems.length > 0 && (
          <span className={`menu-item-arrow ${isSubMenuOpen ? 'open' : ''}`}>
            ▶
          </span>)}
        </div>
        <div className={`submenu ${isSubMenuOpen ? 'open' : ''}`}>
          {subItems?.map(subItem => renderMenuItemWithSubItems(subItem.label, subItem.subItems|| [], depth + 1))}
        </div>
      </>
      )}

  return (
    <div key={uuidv4()} onClick={onItemClick}>
         {hasSubItems ? (
         renderMenuItemWithSubItems(label, subItems, 0)
         ):(
       <div 
            className="menu-item"
          >
            {IconComponent && <IconComponent className="menu-item-icon" />}
            <span className="menu-item-label">{label}</span>
          </div>
         )}
    </div>
  );
};
