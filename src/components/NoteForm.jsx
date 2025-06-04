import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { addNote } from "../utils/api";
import { LanguageContext } from "../contexts/LanguageContext";

function NoteForm() {
  const { language } = useContext(LanguageContext);
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !body.trim()) return;

    setLoading(true);
    await addNote({ title, body });
    setLoading(false);
    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit} className="note-form">
      <input
        type="text"
        placeholder={language === "id" ? "Judul" : "Title"}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        maxLength={50}
        required
        className="note-form-title"
      />
      <textarea
        placeholder={
          language === "id" ? "Isi catatan..." : "Write your note..."
        }
        value={body}
        onChange={(e) => setBody(e.target.value)}
        required
        className="note-form-body"
      />
      <button type="submit" className="action" disabled={loading}>
        {loading
          ? language === "id"
            ? "Menyimpan..."
            : "Saving..."
          : language === "id"
          ? "Simpan"
          : "Save"}
      </button>
    </form>
  );
}

NoteForm.propTypes = {};

export default NoteForm;
