import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { addNote } from "../utils/api";
import useInput from "../utils/useInput";
import { LanguageContext } from "../contexts/LanguageContext";

function AddNotePage() {
  const { language } = useContext(LanguageContext);
  const [title, onTitleChange] = useInput("");
  const [body, onBodyChange] = useInput("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (title.trim() === "" || body.trim() === "") {
      alert(
        language === "id"
          ? "Judul dan isi catatan harus diisi"
          : "Title and body are required"
      );
      return;
    }

    setLoading(true);
    try {
      await addNote({ title, body });
      navigate("/");
    } catch (error) {
      alert(
        language === "id" ? "Gagal menambahkan catatan" : "Failed to add note"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="add-note-page">
      <h2>{language === "id" ? "Tambah Catatan Baru" : "Add New Note"}</h2>
      <form onSubmit={handleSubmit} className="note-form">
        <label htmlFor="title">{language === "id" ? "Judul" : "Title"}</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={onTitleChange}
          placeholder={
            language === "id" ? "Masukkan judul catatan" : "Enter note title"
          }
          required
        />

        <label htmlFor="body">{language === "id" ? "Isi" : "Body"}</label>
        <textarea
          id="body"
          value={body}
          onChange={onBodyChange}
          placeholder={
            language === "id" ? "Masukkan isi catatan" : "Enter note body"
          }
          rows="8"
          required
        />

        <button type="submit" className="note-button submit" disabled={loading}>
          {loading
            ? language === "id"
              ? "Menyimpan..."
              : "Saving..."
            : language === "id"
            ? "Simpan"
            : "Save"}
        </button>
      </form>
    </section>
  );
}

export default AddNotePage;
