import React, { useEffect, useState, useContext } from "react";
import PropTypes from "prop-types";
import { useSearchParams } from "react-router-dom";
import { getActiveNotes, deleteNote, archiveNote } from "../utils/api";
import NoteList from "../components/NoteList";
import LoadingIndicator from "../components/LoadingIndicator";
import { LanguageContext } from "../contexts/LanguageContext";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const { language } = useContext(LanguageContext);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const searchKeyword = searchParams.get("q") || "";

  const loadNotes = async () => {
    setLoading(true);
    const { data } = await getActiveNotes();
    setNotes(data);
    setLoading(false);
  };

  const handleDelete = async (id) => {
    await deleteNote(id);
    loadNotes();
  };

  const handleArchive = async (id) => {
    await archiveNote(id);
    loadNotes();
  };

  useEffect(() => {
    loadNotes();
  }, []);

  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      note.body.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  const handleAddNote = () => {
    navigate("/notes/add");
  };

  return (
    <section className="homepage">
      <div className="page-header">
        <h2>{language === "id" ? "Catatan Aktif" : "Active Notes"}</h2>

        {searchKeyword && (
          <div className="search-info">
            <p>
              {language === "id"
                ? `Hasil pencarian untuk: "${searchKeyword}`
                : `Search results for: "${searchKeyword}"`}
              <span className="search-count">
                ({filteredNotes.length}{" "}
                {language === "id" ? "hasil" : "results"})
              </span>
            </p>
            {filteredNotes.length === 0 && (
              <p className="no-results">
                {language === "id"
                  ? "Tidak ada catatan yang cocok dengan pencarian anda."
                  : "No notes match your search."}
              </p>
            )}
          </div>
        )}
      </div>

      {loading ? (
        <LoadingIndicator />
      ) : (
        <NoteList
          notes={filteredNotes}
          onDelete={handleDelete}
          onArchive={handleArchive}
        />
      )}

      <button className="fab" onClick={handleAddNote}>
        +
      </button>
    </section>
  );
}

export default HomePage;
