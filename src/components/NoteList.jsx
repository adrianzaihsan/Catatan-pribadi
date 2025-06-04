import React, { useContext } from "react";
import PropTypes from "prop-types";
import NoteItem from "./NoteItem";
import { LanguageContext } from "../contexts/LanguageContext";

function NoteList({ notes, onDelete, onArchive }) {
  const { language } = useContext(LanguageContext);

  if (notes.length === 0) {
    return (
      <p className="empty-message">
        {language === "id" ? "Tidak ada catatan" : "No notes found"}
      </p>
    );
  }

  return (
    <div className="note-list">
      {notes.map((note) => (
        <NoteItem
          key={note.id}
          {...note}
          onDelete={onDelete}
          onArchive={onArchive}
        />
      ))}
    </div>
  );
}

NoteList.propTypes = {
  notes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      body: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
    })
  ).isRequired,
  onDelete: PropTypes.func,
  onArchive: PropTypes.func,
};

export default NoteList;
