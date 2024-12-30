import {MenuItem, MenuItemProps }from './MenuItem';
import './Menu.css';
import { v4 as uuidv4 } from 'uuid';
import { Link } from 'react-router-dom';

export interface MenuProps {
  title?: string;
  items?: MenuItemProps[];
  style?: React.CSSProperties;
  styleMenu?: React.CSSProperties;
}

const handleItemClick = (item: MenuItemProps[], index: number) => {
  console.log(`Item clicked: ${item[index].label}`);
};

export const Menu = ({ title, items , style}: MenuProps) => {
  return (
    <div className="menu-content" style={style}>
        <div className="menu-header">
          <h2>{title}</h2>
        </div>
        <nav className="menu-nav">
        <ul className="menu-list">
          {items ? items.map((item) => <li><Link to={item.label === 'Home' ? '/' : "/form"}><MenuItem key={uuidv4()} {...item} onItemClick={()=>handleItemClick( items, 0)} /></Link></li>) : <></>}
        </ul>
        </nav>
      </div>
  );
};

export default Menu;




