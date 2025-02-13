import { MenuItem, MenuItemProps } from "./MenuItem";
import "./Menu.css";
import "../styles/design-system.css";
import { v4 as uuidv4 } from "uuid";
import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import { BurgerMenu } from "./BurgerMenu";

export interface MenuProps {
  items?: MenuItemProps[];
  style?: React.CSSProperties;
}

export const Menu = ({ items, style }: MenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setIsOpen((prevState) => !prevState);
  };

  // Close menu when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (window.innerWidth <= 1024 && isOpen && menuRef.current) {
        const isClickOutsideMenu =
          menuRef.current && !menuRef.current.contains(event.target as Node);
        if (isClickOutsideMenu) {
          toggleMenu();
        }
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div ref={menuRef}>
      <BurgerMenu isOpen={isOpen} onClick={toggleMenu} />
      <MenuDiv className={`menu-content${isOpen ? "-open" : ""}`} style={style}>
        <ul className="menu-list">
          {items ? (
            items.map((item) => (
              <li key={uuidv4()}>
                <MenuItem {...item} />
              </li>
            ))
          ) : (
            <></>
          )}
        </ul>
      </MenuDiv>
    </div>
  );
};

export default Menu;

const MenuDiv = styled.div`
  display: ${(props) =>
    props.className == "menu-content-open" ? "block" : "none"};
  flex-direction: column;

  @media (min-width: 1024px) {
    display: block; // Always show on desktop
  }
  @media (max-width: 1024px) {
    position: absolute;
    padding: var(--space-md);
    transition: all var(--transition-slow) ease-in-out;
    overflow: hidden;
    white-space: nowrap;
    background-color: var(--color-secondary);
    top: 0;
    padding-top: var(--space-3xl);
    left: 0;
    height: 100vh;
    z-index: var(--z-popup);
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  }
`;
