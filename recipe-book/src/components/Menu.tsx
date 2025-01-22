import { MenuItem, MenuItemProps } from "./MenuItem";
import "./Menu.css";
import { v4 as uuidv4 } from "uuid";
import { Link } from "react-router-dom";
import styled from "styled-components";

export interface MenuProps {
  items?: MenuItemProps[];
  style?: React.CSSProperties;
  isOpen: boolean;
}

const handleItemClick = (item: MenuItemProps[], index: number) => {
  console.log(`Item clicked: ${item[index].label}`);
};

export const Menu = ({ items, style, isOpen }: MenuProps) => {
  return (
    <MenuDiv isOpen={isOpen} className="menu-content" style={style}>
      <ul className="menu-list">
        {items ? (
          items.map((item) => (
            <li key={uuidv4()}>
              <Link to={item.label}>
                <MenuItem
                  {...item}
                  onItemClick={() => handleItemClick(items, 0)}
                />
              </Link>
            </li>
          ))
        ) : (
          <></>
        )}
      </ul>
    </MenuDiv>
  );
};

export default Menu;

const MenuDiv = styled.div<{ isOpen: boolean }>`
  display: ${(props) => (props.isOpen ? "block" : "none")};
  flex-direction: column;

  @media (min-width: 1024px) {
    display: block; // Always show on desktop
  }
`;
