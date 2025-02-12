import { MenuItem, MenuItemProps } from "./MenuItem";
import "./Menu.css";
import "../styles/design-system.css";
import { v4 as uuidv4 } from "uuid";
import styled from "styled-components";
import { useState } from "react";
import { BurgerMenu } from "./BurgerMenu";

export interface MenuProps {
  items?: MenuItemProps[];
  style?: React.CSSProperties;
}

export const Menu = ({ items, style}: MenuProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
};
  return (
    <>
    <BurgerMenu onClick={toggleMenu} />
    <MenuDiv className={`menu-content${isOpen ? "-open": ""}`} style={style}>
      <ul className="menu-list">
        {items ? (
          items.map((item) => (
            <li key={uuidv4()}>
                <MenuItem
                  {...item}
                />
            </li>
          ))
        ) : (
          <></>
        )}
      </ul>
    </MenuDiv>
    </>
  );
};

export default Menu;

const MenuDiv = styled.div`
  display: ${(props) => (props.className == "menu-content-open" ? "block" : "none")};
  flex-direction: column;


  @media (min-width: 1024px) {
    display: block; // Always show on desktop
  }
  @media (max-width: 1024px) {
   position: absolute; 
   padding: var(--space-md);
   transition: all 0.3s ease-in-out;
   overflow: hidden;
   white-space: nowrap;
   background-color: var(--color-secondary);
  top: 100%;
  left: 0;
  height: 100vh;
  // border: 1px solid var(--color-primary);
  }
`;
