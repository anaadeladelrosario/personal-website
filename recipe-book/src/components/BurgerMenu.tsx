import React from "react";
import "./BurgerMenu.css";

export interface BurgerMenuProps {
  onMenuToggle?: (isOpen: boolean) => void;
  onClick?: () => void;
  style?: React.CSSProperties;
}

export const BurgerMenu: React.FC<BurgerMenuProps> = ({ onClick, style }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <div className={isOpen ? "burger-menu open" : "burger-menu"} style={style}>
      <button
        title="burger-button"
        type="button"
        className="burger-button"
        onClick={() => { setIsOpen(!isOpen); onClick?.() }}
      >
        <span className="burger-line"></span>
        <span className="burger-line"></span>
        <span className="burger-line"></span>
      </button>
    </div>
  );
};
