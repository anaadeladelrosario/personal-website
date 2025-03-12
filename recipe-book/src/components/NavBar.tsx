import Menu from "./Menu";
import "../styles/design-system.css";
import { Add01Icon } from "hugeicons-react";
import {
  Home01Icon,
  Settings01Icon,
  ShoppingBag01Icon,
  UserAccountIcon,
} from "hugeicons-react";
import { MenuItemProps } from "./MenuItem";
import { BurgerMenu } from "./BurgerMenu";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { RecipeProps } from "../components/interfaces/Recipe";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const fetchRecipes = async () => {
    try {
      const response = await axios.get("https://localhost:44369/api/Recipe");
      return response.data.$values;
    } catch (error) {
      console.error("Error fetching recipes:", error);
      throw error;
    }
  };

  const { data: recipesData } = useQuery({
    queryKey: ["recipesKey"],
    queryFn: fetchRecipes,
    refetchOnWindowFocus: true,
  });

  const menuItems: MenuItemProps[] = [
    { label: "Home", icon: Home01Icon },
    {
      label: "Recipes",
      icon: ShoppingBag01Icon,
      subItems: recipesData?.map((recipe: RecipeProps) => ({
        label: recipe.title,
        id: recipe.id?.toString(),
      })),
    },
    { label: "Add Recipe", icon: Add01Icon },
    { label: "Profile", icon: UserAccountIcon },
    { label: "Settings", icon: Settings01Icon },
  ];

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
    <NavbarContainer className="navbar-container" ref={menuRef}>
      <BurgerMenu open={isOpen} onClick={toggleMenu} />
      <Menu items={menuItems} open={isOpen} />
    </NavbarContainer>
  );
};

export default NavBar;

const NavbarContainer = styled.div`
  // display: flex;
  // flex-direction: column;
  // align-items: flex-start;

  // padding-top: var(--space-sm);

  @media (min-width: 1024px) {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;
