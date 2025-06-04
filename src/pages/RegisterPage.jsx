import React, { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { register } from "../utils/api";
import useInput from "../utils/useInput";
import { LanguageContext } from "../contexts/LanguageContext";

function RegisterPage() {
  const { language } = useContext(LanguageContext);
  const [name, onNameChange] = useInput("");
  const [email, onEmailChange] = useInput("");
  const [password, onPasswordChange] = useInput("");
  const [confirmPassword, onConfirmPasswordChange] = useInput("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      alert(
        language === "id"
          ? "Nama, email, dan password harus diisi"
          : "Name, email, and password are required"
      );
      return;
    }

    if (password !== confirmPassword) {
      alert(
        language === "id"
          ? "Password dan konfirmasi password tidak cocok"
          : "Password and confirm password do not match"
      );
      return;
    }

    setLoading(true);
    try {
      await register({ name, email, password });
      alert(
        language === "id"
          ? "Registrasi berhasil, silakan login"
          : "Registration successful, please login"
      );
      navigate("/login");
    } catch {
      alert(
        language === "id"
          ? "Gagal registrasi, coba lagi"
          : "Registration failed, try again"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="auth-page">
      <h2>{language === "id" ? "Daftar" : "Register"}</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        <label htmlFor="name">{language === "id" ? "Nama" : "Name"}</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={onNameChange}
          placeholder={language === "id" ? "Masukkan nama" : "Enter name"}
          required
        />

        <label htmlFor="email">{language === "id" ? "Email" : "Email"}</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={onEmailChange}
          placeholder="email@example.com"
          required
        />

        <label htmlFor="password">
          {language === "id" ? "Password" : "Password"}
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={onPasswordChange}
          placeholder={
            language === "id" ? "Masukkan password" : "Enter password"
          }
          required
        />

        <label htmlFor="confirmPassword">
          {language === "id" ? "Konfirmasi Password" : "Confirm Password"}
        </label>
        <input
          type="password"
          id="confirmPassword"
          value={confirmPassword}
          onChange={onConfirmPasswordChange}
          placeholder={
            language === "id" ? "Konfirmasi password" : "Confirm password"
          }
          required
        />

        <button type="submit" className="auth-button" disabled={loading}>
          {loading
            ? language === "id"
              ? "Memproses..."
              : "Processing..."
            : language === "id"
            ? "Daftar"
            : "Register"}
        </button>
      </form>
      <p className="switch-auth">
        {language === "id" ? "Sudah punya akun?" : "Already have an account?"}{" "}
        <Link to="/login">
          {language === "id" ? "Masuk di sini" : "Login here"}
        </Link>
      </p>
    </section>
  );
}

export default RegisterPage;
