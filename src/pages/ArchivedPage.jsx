import React, { useEffect, useState, useContext } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { getArchivedNotes, deleteNote, unarchiveNote } from "../utils/api";
import NoteList from "../components/NoteList";
import { LanguageContext } from "../contexts/LanguageContext";
import { FaArrowLeft } from "react-icons/fa";

function ArchivedPage() {
  const { language } = useContext(LanguageContext);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const keyword = searchParams.get("keyword") || "";

  useEffect(() => {
    const fetchNotes = async () => {
      setLoading(true);
      const { data } = await getArchivedNotes();
      setNotes(data);
      setLoading(false);
    };

    fetchNotes();
  }, []);

  const onDelete = async (id) => {
    await deleteNote(id);
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
  };

  const onUnarchive = async (id) => {
    await unarchiveNote(id);
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
  };

  const onSearchChange = (e) => {
    const newKeyword = e.target.value;
    setSearchParams({ keyword: newKeyword });
  };

  // Filter berdasarkan judul DAN konten
  const filteredNotes = notes.filter((note) => {
    const searchKeyword = keyword.toLowerCase();
    return (
      note.title.toLowerCase().includes(searchKeyword) ||
      note.body.toLowerCase().includes(searchKeyword)
    );
  });

  return (
    <section className="homepage">
      <div className="homepage-header">
        <h2>{language === "id" ? "Catatan Arsip" : "Archived Notes"}</h2>
        <Link to="/" className="back-link">
          <FaArrowLeft />
          {language === "id" ? "Kembali" : "Back"}
        </Link>
      </div>

      <input
        type="text"
        placeholder={language === "id" ? "Cari catatan..." : "Search notes..."}
        value={keyword}
        onChange={onSearchChange}
        className="search-input"
      />

      {loading ? (
        <p className="loading-message">
          {language === "id" ? "Memuat..." : "Loading..."}
        </p>
      ) : (
        <NoteList
          notes={filteredNotes}
          onDelete={onDelete}
          onArchive={onUnarchive}
        />
      )}
    </section>
  );
}

export default ArchivedPage;
