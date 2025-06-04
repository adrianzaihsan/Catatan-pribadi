import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { LanguageContext } from "../contexts/LanguageContext";

function NoteItem({ id, title, body, createdAt, onDelete, onArchive }) {
  const { language } = useContext(LanguageContext);

  function formatDate(dateString) {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString(
      language === "id" ? "id-ID" : "en-US",
      options
    );
  }

  // Truncate body content untuk preview
  const truncateText = (text, maxLength = 100) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  return (
    <article className="note-item-card">
      <Link to={`/notes/${id}`} className="note-item-link">
        <div className="note-content">
          <h3 className="note-title">{title}</h3>
          <p className="note-date">{formatDate(createdAt)}</p>
          <p className="note-preview">{truncateText(body)}</p>
        </div>
      </Link>
    </article>
  );
}

NoteItem.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  onDelete: PropTypes.func,
  onArchive: PropTypes.func,
};

export default NoteItem;
