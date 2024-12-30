import React, {  useState } from 'react';
import './BurgerMenu.css'
import { Menu } from './Menu';
import { MenuItemProps } from './MenuItem';

export interface BurgerMenuProps {
  title?: string;
  onMenuToggle?: (isOpen: boolean) => void;
  menuItems: MenuItemProps[];
  onClick?: () => void;
  style?: React.CSSProperties;
}

export const BurgerMenu: React.FC<BurgerMenuProps> = ({
  title,
  onMenuToggle,
  menuItems,
  style,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    const newState = !isOpen;
    setIsOpen(newState);
    onMenuToggle?.(newState);
  };

  return (
      <div className="burger-menu" style={style}>
        <button className="burger-button" onClick={toggleMenu}>
          <span className="burger-line"></span>
          <span className="burger-line"></span>
          <span className="burger-line"></span>
        </button>
        {isOpen && <Menu title={title} items={menuItems} />}
      </div>
  );
};
