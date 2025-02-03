import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./MenuItem.css";
import { Link } from "react-router-dom";

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

  const toggleSubMenu = (label: string) => {
    setOpenSubMenus((prev: string[]) =>
      prev.includes(label)
        ? prev.filter((item) => item !== label)
        : [...prev, label]
    );
  };

  const IconComponent = icon;
  const hasSubItems = subItems && subItems.length > 0;

  const convertStringToLink = (label: string) => {
    return label.replace(/\s+/g, "-").toLowerCase();
  };

  const renderMenuItemWithSubItems = (
    label: string,
    subItems: MenuItemProps[],
    depth: number = 0
  ) => {
    const isSubMenuOpen = openSubMenus.includes(label);
    const paddingLeft = `${depth * 1}rem`;

    return (
      <>
        {subItems.length > 0 ? (
          <>
          <div
            key={uuidv4()}
            className="menu-item"
            onClick={() => {
              toggleSubMenu(label);
            }}
            style={{ paddingLeft }}
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
          <div className={`submenu ${isSubMenuOpen ? 'open' : ''}`}>
          {subItems?.map(subItem => renderMenuItemWithSubItems(subItem.label, subItem.subItems|| [], depth + 1))}
        </div></>):( 
          <Link
          to={
            convertStringToLink(label) === "home"
              ? "/"
              : `Recipe/${convertStringToLink(label)}`
          }
           className="menu-item"
        >
           {IconComponent && <IconComponent className="menu-item-icon" />}
           <span className="menu-item-label">{label}</span>
        </Link>
        )
       }
      </>)};

  return (
    <div key={uuidv4()}>
      {hasSubItems ? (
        renderMenuItemWithSubItems(label, subItems, 0)
      ) : (
        <Link
          to={
            convertStringToLink(label) === "home"
              ? "/"
              : `recipe/${convertStringToLink(label)}`
          }
        >
          <div className="menu-item">
            {IconComponent && <IconComponent className="menu-item-icon" />}
            <span className="menu-item-label">{label}</span>
          </div>
        </Link>
      )}
    </div>
  );
};
