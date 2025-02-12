import Menu from "./Menu";
import "../styles/design-system.css";
import { Add01Icon } from "hugeicons-react";
import { Home01Icon, Settings01Icon, ShoppingBag01Icon } from "hugeicons-react";
import { MenuItemProps } from "./MenuItem";
import styled from "styled-components";

const menuItems: MenuItemProps[] = [
  { label: 'Home', icon: Home01Icon },
  { label: 'Recipes', icon: ShoppingBag01Icon, subItems: [
    { label: 'Aussie Pie' },
    { label: 'Cuban Flan' },
    { label: 'Swedish Meatballs' },
  ] },
  { label: 'Add Recipe', icon: Add01Icon },
  { label: 'Settings', icon: Settings01Icon },
];

const NavBar = () => {
  return (
    <NavbarContainer className="container">
      <Menu items={menuItems} />
    </NavbarContainer>
  );
};

export default NavBar;

const NavbarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: var(--space-xs);
  
  @media (min-width: 1024px) {
    flex-direction: row;
    align-items: center;
  }
`;