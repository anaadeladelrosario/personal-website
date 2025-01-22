import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./MenuItem.css";
import { Link } from "react-router-dom";

export interface MenuItemProps {
  label: string;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>> | null;
  subItems?: MenuItemProps[];
  onItemClick?: () => void;
}

export const MenuItem: React.FC<MenuItemProps> = ({
  label = "Text",
  icon,
  subItems = [],
  onItemClick,
}) => {
  const [openSubMenus, setOpenSubMenus] = useState<string[]>([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth >= 1024) {
        setOpenSubMenus((prev: string[]) =>
          prev.includes(label)
            ? prev.filter((item) => item !== label)
            : [...prev, label]
        );
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initial check

    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
    console.log(label, label.replace(/\s+/g, "-").toLowerCase());
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
          <div
            key={uuidv4()}
            className="menu-item"
            onClick={() => {
              isMobile ? toggleSubMenu(label) : onItemClick;
            }}
            style={{ paddingLeft, backgroundColor: "#9AC1AE" }}
          >
            {IconComponent && <IconComponent className="menu-item-icon" />}
            <span className="menu-item-label">{label}</span>
            {subItems.length > 0 &&
              (isMobile ? (
                <span
                  className={`menu-item-arrow ${isSubMenuOpen ? "open" : ""}`}
                >
                  ▶
                </span>
              ) : (
                <></>
              ))}
          </div>
        ) : (
          <Link
            to={
              convertStringToLink(label) === "home"
                ? "/"
                : `/${convertStringToLink(label)}`
            }
            onClick={() => toggleSubMenu(label)}
            key={uuidv4()}
            className="menu-item"
          >
            {IconComponent && <IconComponent className="menu-item-icon" />}
            <span className="menu-item-label">{label}</span>
          </Link>
        )}
        <div
          className={
            isMobile ? `submenu ${isSubMenuOpen ? "open" : ""}` : "desktop"
          }
        >
          <Link
            className="submenu-item"
            style={!isMobile ? { display: "flex", flexDirection: "row" } : {}}
            to={
              convertStringToLink(label) === "home"
                ? "/"
                : `/${convertStringToLink(label)}`
            }
            onClick={() => toggleSubMenu(label)}
          >
            {subItems?.map((subItem) =>
              renderMenuItemWithSubItems(
                subItem.label,
                subItem.subItems || [],
                depth + 1
              )
            )}
          </Link>
        </div>
      </>
    );
  };

  return (
    <div key={uuidv4()} onClick={onItemClick}>
      {hasSubItems ? (
        renderMenuItemWithSubItems(label, subItems, 0)
      ) : (
        <Link
          to={
            convertStringToLink(label) === "home"
              ? "/"
              : `/${convertStringToLink(label)}`
          }
          onClick={onItemClick}
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
