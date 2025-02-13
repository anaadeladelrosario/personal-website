import React from 'react';

export const convertStringToLink = (label: string): string => {
  return label.replace(/\s+/g, "-").toLowerCase();
};

export const toggleSubMenu = (
  label: string,
  setOpenSubMenus: React.Dispatch<React.SetStateAction<string[]>>
) => {
  setOpenSubMenus((openSubMenus) =>
    openSubMenus.includes(label)
      ? openSubMenus.filter((item) => item !== label)
      : [...openSubMenus, label]
  );
};

export const isMenuItemActive = (
  label: string, 
  currentPath: string, 
  subItems: { label: string }[]
): boolean => {
  const itemPath = convertStringToLink(label);
  return (
    currentPath === itemPath || 
    subItems.some(subItem => convertStringToLink(subItem.label) === currentPath)
  );
};

 // Outside click handler for closing submenus
export const handleClickOutside = (event: MouseEvent, menuRef: React.RefObject<HTMLDivElement>, setOpenSubMenus: React.Dispatch<React.SetStateAction<string[]>>) => {
    if (
      menuRef.current && 
      !menuRef.current.contains(event.target as Node)
    ) {
      setOpenSubMenus([]);  // Close all submenus when outside is clicked
    }
  };