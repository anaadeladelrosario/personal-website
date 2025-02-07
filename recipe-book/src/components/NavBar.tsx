import Menu from "./Menu";
import { Add01Icon } from "hugeicons-react";
import { Home01Icon, Settings01Icon, ShoppingBag01Icon } from "hugeicons-react";
import { MenuItemProps } from "./MenuItem";
import styled from "styled-components";

const menuItems: MenuItemProps[] = [
  { label: 'Home', icon: Home01Icon },
  { label: 'Add Recipe', icon: Add01Icon },
  { label: 'Shopping List', icon: ShoppingBag01Icon },
  { label: 'Settings', icon: Settings01Icon },
];

const NavBar = () => {
  return (
    <NavbarContainer>
      <Menu items={menuItems} />
    </NavbarContainer>
  );
};

export default NavBar;

const NavbarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: var(--space-sm);
  
  @media (min-width: 1024px) {
    flex-direction: row;
    align-items: center;
  }
`;