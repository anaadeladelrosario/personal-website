import { FC, useState } from "react";
import "./AppHeader.css";
import "../styles/design-system.css";
import NavBar from "./NavBar";
import { Search01Icon } from "hugeicons-react";
import logo from "../assets/logo.png";

export const AppHeader: FC = () => {
  const [isBarSearchOpen, setIsBarSearchOpen] = useState(false);
  const toogleBarSearch = () => {
    setIsBarSearchOpen(!isBarSearchOpen);
  };
  const IconComponent = Search01Icon;
  return (
    <header className="header">
      <div className="header-left">
        <NavBar />
      </div>
      <div className="header-center">
        <div className="search-container">
          <input
            style={{
              marginBottom: "0",
              display: isBarSearchOpen ? "block" : "none",
            }}
            type="text"
            className="search-input"
            placeholder="Search..."
          />
          <IconComponent onClick={toogleBarSearch} className="search-icon" />
        </div>
      </div>

      <div className="header-right">
        <div className="user-info">
          <img src={logo} alt="Recipe Book" className="logo" />
        </div>
      </div>
    </header>
  );
};
