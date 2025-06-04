import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link, useNavigate, useLocation } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import { ThemeContext } from "../contexts/ThemeContext";
import { LanguageContext } from "../contexts/LanguageContext";
import { AuthContext } from "../contexts/AuthContext";
import { FaSearch } from "react-icons/fa";

function Header({ keyword, onKeywordChange, showSearch = false }) {
  const { theme } = useContext(ThemeContext);
  const { language, toggleLanguage } = useContext(LanguageContext);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const [inputValue, setInputValue] = useState(keyword || "");

  useEffect(() => {
    setInputValue(keyword || "");
  }, [keyword]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (onKeywordChange) {
        onKeywordChange(inputValue);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [inputValue, onKeywordChange]);

  const shouldShowSearch =
    showSearch &&
    (location.pathname === "/" || location.pathname === "/archives");

  return (
    <header className="app-header">
      <h1 className="app-title">
        <Link to="/">
          {language === "id" ? "Aplikasi Catatan" : "Notes App"}
        </Link>
      </h1>

      {shouldShowSearch && (
        <div className="search-container">
          <div className="search-input-wrapper">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder={
                language === "id"
                  ? "Cari berdasarkan judul atau keyword..."
                  : "Search by title or keyword..."
              }
              value={keyword || ""}
              onChange={(e) =>
                onKeywordChange && onKeywordChange(e.target.value)
              }
              className="search-input"
            />
          </div>
        </div>
      )}

      <div className="header-controls">
        <ThemeToggle />
        <button onClick={toggleLanguage} className="lang-toggle">
          {language === "id" ? "EN" : "ID"}
        </button>
        {user && (
          <>
            <nav className="nav-links">
              <Link to="/" className="nav-link">
                {language === "id" ? "Beranda" : "Home"}
              </Link>
              <Link to="/archives" className="nav-link">
                {language === "id" ? "Arsip" : "Archived"}
              </Link>
            </nav>
            <span className="user-greeting">
              {language === "id" ? `Halo, ${user.name}` : `Hello, ${user.name}`}
            </span>
            <button onClick={handleLogout} className="logout-button">
              {language === "id" ? "Keluar" : "Logout"}
            </button>
          </>
        )}
      </div>
    </header>
  );
}

Header.propTypes = {
  keyword: PropTypes.string,
  onKeywordChange: PropTypes.func,
  showSearch: PropTypes.bool,
};

export default Header;
