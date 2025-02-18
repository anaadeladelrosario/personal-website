import { FC } from "react";
import "./AppHeader.css";
import "../styles/design-system.css";
import NavBar from "./NavBar";
import { Button } from "./Button";

export interface User {
  name: string;
  avatar: string;
}

interface AppHeaderProps {
  user: User;
  onLogout: () => void;
}

export const AppHeader: FC<AppHeaderProps> = ({ user, onLogout }) => {
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
            }}
            type="text"
            className="search-input"
            placeholder="Search..."
          />
          <span className="search-icon">🔍</span>
        </div>
      </div>

      <div className="header-right">
        <div className="user-info">
          <span className="welcome">Welcome, {user.name}!</span>
          <img
            className="avatar"
            style={{
              width: "35px",
              height: "35px",
              padding: "var(--space-xs)",
            }}
            alt="logo"
            src={user.avatar}
          />
          <Button
            style={{ padding: "var(--space-xs)" }}
            size="small"
            primary={true}
            label="Logout"
            onClick={onLogout}
          />
        </div>
      </div>
    </header>
  );
};
