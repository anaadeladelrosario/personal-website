import { useEffect, useState } from "react";
import Menu from "./Menu";
import { BurgerMenu } from "./BurgerMenu";
import { Add01Icon } from "hugeicons-react";
import { Home01Icon, Settings01Icon, ShoppingBag01Icon } from "hugeicons-react";
import { MenuItemProps } from "./MenuItem";
import styled from "styled-components";

const menuItems: MenuItemProps[] = [
  { label: 'Home', icon: Home01Icon },
  { label: 'Recipes', subItems: [
    { label: 'Aussie Pie' },
    { label: 'Cuban Flan' },
    { label: 'Swedish Meatballs' },
  ] },
  { label: 'Add Recipe', icon: Add01Icon },
  { label: 'Shopping List', icon: ShoppingBag01Icon },
  { label: 'Settings', icon: Settings01Icon },
];

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth >= 1024) {
        setIsOpen(true);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial check

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleMenu = () => {
    if (isMobile) {
      setIsOpen(!isOpen);
    }
  };

  return (
    <NavbarContainer>
      {isMobile && (
        <div>
          <BurgerMenu onClick={toggleMenu} />
        </div>
      )}
      <Menu isOpen={isOpen} items={menuItems} />
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