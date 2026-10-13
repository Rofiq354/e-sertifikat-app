import React from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const ThemeToggle = () => {
  const { isDarkMode, toggleTheme, theme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "8px",
        padding: "8px 14px",
        borderRadius: "20px",
        border: `1px solid ${theme.border}`,
        backgroundColor: theme.bgCard,
        color: theme.textPrimary,
        cursor: "pointer",
        fontSize: "14px",
        fontWeight: "600",
        transition: "all 0.2s ease",
        boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
      }}
    >
      {isDarkMode ? (
        <>
          <Sun size={16} color="#f59e0b" /> Light Mode
        </>
      ) : (
        <>
          <Moon size={16} color="#6366f1" /> Dark Mode
        </>
      )}
    </button>
  );
};

export default ThemeToggle;
