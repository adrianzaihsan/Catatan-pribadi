import React, { useContext } from "react";
import { LanguageContext } from "../contexts/LanguageContext";

function LoadingIndicator() {
  const { language } = useContext(LanguageContext);

  return (
    <div className="loading-indicator">
      <div className="spinner"></div>
      <p>{language === "id" ? "Memuat..." : "Loading..."}</p>
    </div>
  );
}

LoadingIndicator.propTypes = {};

export default LoadingIndicator;
