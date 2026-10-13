import React from "react";
import {
  ListFilter,
  SlidersHorizontal,
  Info,
  AlertTriangle,
  Hash,
} from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const PrintModeSelector = ({
  mode,
  setMode,
  defaultCount,
  setDefaultCount,
  customInput,
  setCustomInput,
  totalData,
  selectedCount,
}) => {
  const { theme } = useTheme();

  return (
    <div
      style={{
        backgroundColor: theme.bgCard,
        borderRadius: "12px",
        padding: "20px",
        border: `1px solid ${theme.border}`,
        marginBottom: "24px",
        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)",
      }}
    >
      {/* Grid Radio Cards Mode */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "12px",
          marginBottom: "20px",
        }}
      >
        {/* Card Mode Default */}
        <div
          onClick={() => setMode("default")}
          style={{
            padding: "14px 16px",
            borderRadius: "10px",
            border: `2px solid ${mode === "default" ? "#2563eb" : theme.border}`,
            backgroundColor: mode === "default" ? theme.infoBg : theme.bgInput,
            cursor: "pointer",
            transition: "all 0.2s ease",
            display: "flex",
            alignItems: "center",
            gap: "20px",
          }}
        >
          <div
            style={{
              padding: "8px",
              borderRadius: "8px",
              backgroundColor: mode === "default" ? "#2563eb" : theme.bgCard,
              color: mode === "default" ? "#ffffff" : theme.textSecondary,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ListFilter size={20} />
          </div>
          <div
            style={{
              fontWeight: "600",
              fontSize: "15px",
              color: theme.textPrimary,
            }}
          >
            Default
          </div>
        </div>

        {/* Card Mode Custom */}
        <div
          onClick={() => setMode("custom")}
          style={{
            padding: "14px 16px",
            borderRadius: "10px",
            border: `2px solid ${mode === "custom" ? "#2563eb" : theme.border}`,
            backgroundColor: mode === "custom" ? theme.infoBg : theme.bgInput,
            cursor: "pointer",
            transition: "all 0.2s ease",
            display: "flex",
            alignItems: "center",
            gap: "20px",
          }}
        >
          <div
            style={{
              padding: "8px",
              borderRadius: "8px",
              backgroundColor: mode === "custom" ? "#2563eb" : theme.bgCard,
              color: mode === "custom" ? "#ffffff" : theme.textSecondary,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <SlidersHorizontal size={20} />
          </div>
          <div
            style={{
              fontWeight: "600",
              fontSize: "15px",
              color: theme.textPrimary,
            }}
          >
            Custom
          </div>
        </div>
      </div>

      {/* Area Form Input Berdasarkan Mode */}
      <div
        style={{
          padding: "16px",
          borderRadius: "8px",
          backgroundColor: theme.bgInput,
          border: `1px solid ${theme.border}`,
          marginBottom: "16px",
        }}
      >
        {mode === "default" ? (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              flexWrap: "wrap",
            }}
          >
            <label
              style={{
                fontSize: "14px",
                fontWeight: "500",
                color: theme.textPrimary,
              }}
            >
              Cetak dari urutan pertama sebanyak:
            </label>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <input
                type="number"
                min="1"
                max={totalData}
                value={defaultCount}
                onChange={(e) => setDefaultCount(parseInt(e.target.value) || 0)}
                style={{
                  padding: "8px 12px",
                  borderRadius: "6px",
                  border: `1px solid ${theme.border}`,
                  backgroundColor: theme.bgCard,
                  color: theme.textPrimary,
                  fontSize: "15px",
                  width: "90px",
                  fontWeight: "700",
                  textAlign: "center",
                }}
              />
              <span
                style={{
                  fontSize: "14px",
                  fontWeight: "500",
                  color: theme.textSecondary,
                }}
              >
                Sertifikat
              </span>
            </div>
            <span
              style={{
                fontSize: "13px",
                color: theme.textSecondary,
                marginLeft: "auto",
              }}
            >
              (Total Database: <strong>{totalData} Data</strong>)
            </span>
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <label
              style={{
                fontSize: "14px",
                fontWeight: "500",
                color: theme.textPrimary,
                display: "block",
                marginBottom: "8px",
              }}
            >
              Masukkan Nomor Data Peserta:
            </label>
            <div style={{ position: "relative", maxWidth: "500px" }}>
              <input
                type="text"
                placeholder="Contoh: 1, 3, 5-8, 12"
                value={customInput}
                onChange={(e) => setCustomInput(e.target.value)}
                style={{
                  width: "100%",
                  padding: "10px 14px",
                  paddingLeft: "36px",
                  borderRadius: "6px",
                  border: `1px solid ${theme.border}`,
                  backgroundColor: theme.bgCard,
                  color: theme.textPrimary,
                  fontSize: "14px",
                  fontFamily: "monospace",
                  boxSizing: "border-box",
                }}
              />
              <Hash
                size={16}
                color={theme.textSecondary}
                style={{ position: "absolute", left: "12px", top: "12px" }}
              />
            </div>
            <p
              style={{
                margin: "6px 0 0 0",
                fontSize: "12px",
                color: theme.textSecondary,
              }}
            >
              💡 Petunjuk: Gunakan koma untuk pemisah angka (<code>1, 3</code>)
              atau tanda minus untuk rentang (<code>5-10</code>).
            </p>
          </div>
        )}
      </div>

      {/* Dynamic Status Bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          padding: "12px 16px",
          borderRadius: "8px",
          backgroundColor: selectedCount > 0 ? theme.infoBg : "#fef2f2",
          border: `1px solid ${selectedCount > 0 ? theme.infoText + "40" : "#fca5a5"}`,
          color: selectedCount > 0 ? theme.infoText : "#dc2626",
          fontSize: "13px",
          fontWeight: "500",
        }}
      >
        {selectedCount > 0 ? (
          <>
            <Info size={18} />
            <span>
              Siap memproses <strong>{selectedCount} Sertifikat</strong> sesuai
              pilihan Anda.
            </span>
          </>
        ) : (
          <>
            <AlertTriangle size={18} />
            <span>
              Input tidak valid atau nomor data yang dimasukkan melebihi total
              ketersediaan data ({totalData}).
            </span>
          </>
        )}
      </div>
    </div>
  );
};

export default PrintModeSelector;
