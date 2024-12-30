import { FC } from 'react';
import './AppHeader.css';
import { BurgerMenu } from './BurgerMenu';
import { Add01Icon, Home01Icon } from 'hugeicons-react';
import { ShoppingBag01Icon } from 'hugeicons-react';
import { Settings01Icon } from 'hugeicons-react';
import { MenuItemProps } from './MenuItem';

interface AppHeaderProps {
  username: string;
  onLogout: () => void;
}

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

export const AppHeader: FC<AppHeaderProps> = ({ username, onLogout }) => {
  return (
    <header className="header">
      <div className="header-left">
        <BurgerMenu menuItems={menuItems} />
      </div>
      
      <div className="header-center">
        <div className="search-container">
          <input
            type="text"
            className="search-input"
            placeholder="Search..."
          />
          <span className="search-icon">🔍</span>
        </div>
      </div>
      
      <div className="header-right">
        <div className="user-info">
          <span>Welcome, {username}!</span>
          <button className="logout-button" onClick={onLogout}>
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

