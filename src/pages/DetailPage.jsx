import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getNote, deleteNote, archiveNote, unarchiveNote } from "../utils/api";
import { LanguageContext } from "../contexts/LanguageContext";

function DetailPage() {
  const { language } = useContext(LanguageContext);
  const { id } = useParams();
  const navigate = useNavigate();

  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNote = async () => {
      try {
        setLoading(true);
        const { data } = await getNote(id);
        setNote(data);
        setLoading(false);
      } catch (err) {
        setNote(null);
        setLoading(false);
      }
    };

    fetchNote();
  }, [id]);

  const handleDelete = async () => {
    await deleteNote(id);
    navigate("/");
  };

  const handleToggleArchive = async () => {
    if (note.archived) {
      await unarchiveNote(id);
    } else {
      await archiveNote(id);
    }
    navigate("/");
  };

  if (loading) {
    return <p>{language === "id" ? "Memuat..." : "Loading..."}</p>;
  }

  if (!note) {
    return (
      <p>
        {language === "id" ? "Catatan tidak ditemukan." : "Note not found."}
      </p>
    );
  }

  const formattedDate = new Date(note.createdAt).toLocaleDateString(
    language === "id" ? "id-ID" : "en-US",
    { day: "numeric", month: "long", year: "numeric" }
  );

  return (
    <section className="detail-page">
      <h2 className="detail-title">{note.title}</h2>
      <p className="detail-date">{formattedDate}</p>
      <div className="detail-body">{note.body}</div>
      <div className="detail-actions">
        <button onClick={handleDelete} className="action danger">
          {language === "id" ? "Hapus" : "Delete"}
        </button>
        <button onClick={handleToggleArchive} className="action">
          {note.archived
            ? language === "id"
              ? "Batal Arsip"
              : "Unarchive"
            : language === "id"
            ? "Arsipkan"
            : "Archive"}
        </button>
      </div>
    </section>
  );
}

export default DetailPage;
