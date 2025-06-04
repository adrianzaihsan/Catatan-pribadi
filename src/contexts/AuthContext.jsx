import React, { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { getUserLogged, putAccessToken } from "../utils/api";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      const { error, data } = await getUserLogged();
      if (!error && data) {
        setUser(data);
      } else {
        putAccessToken("");
        setUser(null);
      }
      setInitializing(false);
    }

    fetchUser();
  }, []);

  const login = async (token) => {
    putAccessToken(token);
    const { error, data } = await getUserLogged();
    if (!error && data) {
      setUser(data);
    } else {
      putAccessToken("");
      setUser(null);
    }
  };

  const logout = () => {
    putAccessToken("");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {!initializing && children}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthProvider;
