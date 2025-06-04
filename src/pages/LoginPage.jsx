import React, { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../utils/api";
import useInput from "../utils/useInput";
import { AuthContext } from "../contexts/AuthContext";
import { LanguageContext } from "../contexts/LanguageContext";

function LoginPage() {
  const { language } = useContext(LanguageContext);
  const { login: loginUser } = useContext(AuthContext);
  const [email, onEmailChange] = useInput("");
  const [password, onPasswordChange] = useInput("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert(
        language === "id"
          ? "Email dan password harus diisi"
          : "Email and password are required"
      );
      return;
    }
    setLoading(true);
    try {
      const { error, data } = await login({ email, password });

      if (error || !data?.accessToken) {
        alert(
          language === "id"
            ? "Login gagal, cek kembali email dan password"
            : "Login failed, check your credentials"
        );
        return;
      }
      await loginUser(data.accessToken);
      navigate("/", { replace: true });
    } catch (e) {
      alert(
        language === "id"
          ? "Gagal login, periksa email dan password"
          : "Login failed, check your credentials"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="auth-page">
      <h2>{language === "id" ? "Masuk" : "Login"}</h2>
      <form onSubmit={handleSubmit} className="auth-form">
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

        <button type="submit" className="auth-button" disabled={loading}>
          {loading
            ? language === "id"
              ? "Memproses..."
              : "Processing..."
            : language === "id"
            ? "Masuk"
            : "Login"}
        </button>
      </form>
      <p className="switch-auth">
        {language === "id" ? "Belum punya akun?" : "Don't have an account?"}{" "}
        <Link to="/register">
          {language === "id" ? "Daftar di sini" : "Register here"}
        </Link>
      </p>
    </section>
  );
}

export default LoginPage;
