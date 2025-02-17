import { FC } from "react";
import "./AppHeader.css";
import "../styles/design-system.css";
import NavBar from "./NavBar";
import { Button } from "./Button";

interface AppHeaderProps {
  username: string;
  onLogout: () => void;
}

export const AppHeader: FC<AppHeaderProps> = ({ username, onLogout }) => {
  return (
    <header className="header">
      <div className="header-left">
        <NavBar />
      </div>

      <div className="header-center">
        <div className="search-container">
          <input
            style={{ padding: "1%", marginBottom: "0" }}
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
          <Button
            size="small"
            secondary={true}
            label="Logout"
            onClick={onLogout}
          />
        </div>
      </div>
    </header>
  );
};
