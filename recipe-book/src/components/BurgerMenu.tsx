import React from "react";
import "./BurgerMenu.css";

export interface BurgerMenuProps {
  onMenuToggle?: (isOpen: boolean) => void;
  onClick?: () => void;
  style?: React.CSSProperties;
  isOpen?: boolean;
}

export const BurgerMenu: React.FC<BurgerMenuProps> = ({
  onClick,
  style,
  isOpen,
}) => {
  return (
    <div className={isOpen ? "burger-menu open" : "burger-menu"} style={style}>
      <button
        title="burger-button"
        type="button"
        className="burger-button"
        onClick={() => {
          onClick?.();
        }}
      >
        <span className="burger-line"></span>
        <span className="burger-line"></span>
        <span className="burger-line"></span>
      </button>
    </div>
  );
};
