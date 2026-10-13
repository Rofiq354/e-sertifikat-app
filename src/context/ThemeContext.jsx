import React, { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // Cek mode bawaan sistem/localstorage, default ke 'dark'
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme ? savedTheme === "dark" : true;
  });

  useEffect(() => {
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
    // Set warna background body secara global
    document.body.style.backgroundColor = isDarkMode ? "#0f172a" : "#f8fafc";
    document.body.style.color = isDarkMode ? "#f8fafc" : "#0f172a";
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode((prev) => !prev);

  // Palet Warna Adaptif
  const theme = {
    isDarkMode,
    bgMain: isDarkMode ? "#0f172a" : "#f8fafc",
    bgCard: isDarkMode ? "#1e293b" : "#ffffff",
    bgHeader: isDarkMode ? "#1e293b" : "#ffffff",
    bgInput: isDarkMode ? "#334155" : "#f1f5f9",
    textPrimary: isDarkMode ? "#f8fafc" : "#0f172a",
    textSecondary: isDarkMode ? "#94a3b8" : "#64748b",
    border: isDarkMode ? "#334155" : "#e2e8f0",
    cardBorder: isDarkMode ? "#334155" : "#cbd5e1",
    infoBg: isDarkMode ? "#1e3a8a" : "#eff6ff",
    infoText: isDarkMode ? "#93c5fd" : "#2563eb",
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme, theme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
