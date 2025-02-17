import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./MenuItem.css";
import "../styles/design-system.css";
import { Link, useLocation } from "react-router-dom";
import {
  convertStringToLink,
  handleClickOutside,
  toggleSubMenu,
} from "../utils/MenuItemUtils";

export interface MenuItemProps {
  label: string;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>> | null;
  subItems?: MenuItemProps[];
}

export const MenuItem: React.FC<MenuItemProps> = ({
  label = "Text",
  icon,
  subItems = [],
}) => {
  const [openSubMenus, setOpenSubMenus] = useState<string[]>([]);
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const location = useLocation();
  const menuRef = React.useRef<HTMLDivElement>(null);
  const IconComponent = icon;
  const hasSubItems = subItems && subItems.length > 0;

  useEffect(() => {
    const currentPath = location.pathname.substring(1) || "home"; // Update active item based on current path
    const itemPath = convertStringToLink(label);
    const isDirectMatch =
      currentPath === itemPath ||
      subItems.some(
        (subItem) => convertStringToLink(subItem.label) === currentPath
      ); // Check if the current path exactly matches this item or its direct subitems

    setActiveItem(isDirectMatch ? label : null);
  }, [location.pathname, label, subItems]);

  useEffect(() => {
    if (window.innerWidth > 1024 && menuRef.current) {
      document.addEventListener("mousedown", (event) =>
        handleClickOutside(event, menuRef, setOpenSubMenus)
      );
    }
    return () => {
      document.removeEventListener("mousedown", (event) =>
        handleClickOutside(event, menuRef, setOpenSubMenus)
      ); // Cleanup
    };
  }, [menuRef]);

  const renderMenuItemWithSubItems = (
    label: string,
    subItems: MenuItemProps[],
    depth: number = 0
  ) => {
    const isSubMenuOpen = openSubMenus.includes(label);
    const paddingLeft = `${depth * 0.5}rem`;
    return (
      <div className="menu-item-container" ref={menuRef}>
        {subItems.length > 0 ? (
          <>
            <div
              key={uuidv4()}
              className={`menu-item ${activeItem === label ? "active" : ""}`}
              onClick={() => {
                toggleSubMenu(label, setOpenSubMenus);
              }}
            >
              {IconComponent && <IconComponent className="menu-item-icon" />}
              <span className="menu-item-label">{label}</span>
              {subItems.length > 0 && (
                <span
                  className={`menu-item-arrow ${isSubMenuOpen ? "open" : ""}`}
                >
                  ▶
                </span>
              )}
            </div>
            <div className={`submenu ${isSubMenuOpen ? "open" : ""}`}>
              {subItems?.map((subItem) =>
                renderMenuItemWithSubItems(
                  subItem.label,
                  subItem.subItems || [],
                  depth + 1
                )
              )}
            </div>
          </>
        ) : (
          <Link
            to={
              convertStringToLink(label) === "home"
                ? "/"
                : `/${convertStringToLink(label)}`
            }
            className={`menu-item ${activeItem === label ? "active" : ""}`}
            style={{ paddingLeft }}
          >
            <span className="menu-item-label">{label}</span>
          </Link>
        )}
      </div>
    );
  };

  return (
    <div key={uuidv4()}>
      {hasSubItems ? (
        renderMenuItemWithSubItems(label, subItems, 0)
      ) : (
        <Link
          to={
            convertStringToLink(label) === "home"
              ? "/"
              : `/${convertStringToLink(label)}`
          }
        >
          <div className={`menu-item ${activeItem === label ? "active" : ""}`}>
            {IconComponent && <IconComponent className="menu-item-icon" />}
            <span className="menu-item-label">{label}</span>
          </div>
        </Link>
      )}
    </div>
  );
};
