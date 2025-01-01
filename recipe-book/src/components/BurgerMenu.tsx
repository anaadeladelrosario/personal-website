import React from 'react';
import './BurgerMenu.css';

export interface BurgerMenuProps {
  onMenuToggle?: (isOpen: boolean) => void;
  onClick?: () => void;
  style?: React.CSSProperties;
}

export const BurgerMenu: React.FC<BurgerMenuProps> = ({
  onClick,
  style,
}) => {


  return (
      <div className="burger-menu" style={style}>
        <button className="burger-button" onClick={onClick}>
          <span className="burger-line"></span>
          <span className="burger-line"></span>
          <span className="burger-line"></span>
        </button>
      </div>
  );
};
