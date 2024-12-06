import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { MainContext } from "../Context/MainContext";
import { Switch } from "antd";
import "./Header.scss";

const Header = () => {
  const { theme, toggleTheme } = useContext(MainContext);

  return (
    <header className="header">
      <div className="header-content">
        <div className="logo-container">
          <h1 className="logo">MovieApp</h1>
        </div>
        <nav className="nav-links">
          <Link to="/" className="nav-link">
            Home
          </Link>
          <Link to="/favourites" className="nav-link">
            Favourites
          </Link>
        </nav>
        <div className="theme-switch">
          <Switch
            checked={theme === "dark"}
            onChange={toggleTheme}
            checkedChildren="Dark"
            unCheckedChildren="Light"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
