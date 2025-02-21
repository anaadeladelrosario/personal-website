import { MenuItem, MenuItemProps } from "./MenuItem";
import "./Menu.css";
import "../styles/design-system.css";
import { v4 as uuidv4 } from "uuid";
import styled from "styled-components";
import { useState } from "react";
import { Button } from "./Button";

export interface MenuProps {
  items?: MenuItemProps[];
  style?: React.CSSProperties;
  open?: boolean;
}

export const Menu = ({ items, style, open }: MenuProps) => {
  const [isLogout, setIsLogout] = useState<boolean>(true);

  return (
    <MenuDiv className={`menu-content${open ? "-open" : ""}`} style={style}>
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
      <Button
        className="login-button"
        size="small"
        primary
        label={isLogout ? "Logout" : "Login"}
        onClick={() => setIsLogout(!isLogout)}
      />
    </MenuDiv>
  );
};

export default Menu;

const MenuDiv = styled.div`
  display: ${(props) =>
    props.className == "menu-content-open" ? "block" : "none"};

  @media (min-width: 1024px) {
    display: flex; // Always show on desktop
    flex-direction: row;
  }
  @media (max-width: 1024px) {
    position: absolute;
    // padding: var(--space-md);
    padding-left: var(--space-2xl);
    transition: all var(--transition-slow) ease-in-out;
    overflow: hidden;
    white-space: nowrap;
    background: var(--wood-tone-background);
    top: 0;
    padding-top: var(--space-3xl);
    left: 0;
    height: 100vh;
    z-index: var(--z-popup);
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  }
`;
