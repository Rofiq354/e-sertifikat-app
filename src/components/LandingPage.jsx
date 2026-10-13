import React, { useState } from "react";
import { Award, X, ChevronRight } from "lucide-react";
import { TEMPLATES } from "../data/templates";
import { useTheme } from "../context/ThemeContext";

const LandingPage = ({ onSelectTemplate }) => {
  const { theme } = useTheme();
  // State untuk menyimpan template yang punya sub-event saat diklik
  const [activeSubEventModal, setActiveSubEventModal] = useState(null);

  const handleCardClick = (tmpl) => {
    if (tmpl.hasSubEvents) {
      // Jika template punya sub-event, tampilkan pilihan sub-event
      setActiveSubEventModal(tmpl);
    } else {
      // Jika biasa, langsung ke editor
      onSelectTemplate(tmpl);
    }
  };

  const handleSelectSubEvent = (subEvent) => {
    // Gabungkan data template utama dengan sub-event yang dipilih
    const finalTemplateData = {
      ...activeSubEventModal,
      title: `${activeSubEventModal.title} - ${subEvent.name}`,
      subEventId: subEvent.id,
      url: subEvent.url,
    };
    setActiveSubEventModal(null);
    onSelectTemplate(finalTemplateData);
  };

  return (
    <div>
      {/* Header & Hero Section */}
      <div
        style={{
          textAlign: "center",
          padding: "40px 20px",
          backgroundColor: theme.bgCard,
          borderRadius: "12px",
          border: `1px solid ${theme.border}`,
          marginBottom: "32px",
        }}
      >
        <Award size={48} color="#3b82f6" style={{ marginBottom: "12px" }} />
        <h1
          style={{
            fontSize: "32px",
            fontWeight: "bold",
            margin: "0 0 12px 0",
            color: theme.textPrimary,
          }}
        >
          E-Sertifikat Senkom Cianjur
        </h1>
        <p
          style={{
            fontSize: "16px",
            color: theme.textSecondary,
            maxWidth: "600px",
            margin: "0 auto",
            lineHeight: "1.5",
          }}
        >
          Platform Digitalisasi E-Sertifikat Senkom Mitra Polri Kabupaten
          Cianjur. Memudahkan pembuatan, validasi QR Code, dan pengelolaan
          sertifikat secara terpusat dan efisien.
        </p>
      </div>

      {/* Section Pilihan Template */}
      <h2
        style={{
          fontSize: "20px",
          fontWeight: "bold",
          color: theme.textPrimary,
          marginBottom: "16px",
        }}
      >
        Pilih Template Halaman E-Sertifikat:
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "20px",
          marginBottom: "40px",
        }}
      >
        {TEMPLATES.map((tmpl) => (
          <div
            key={tmpl.id}
            onClick={() => handleCardClick(tmpl)}
            style={{
              border: `2px solid ${theme.cardBorder}`,
              borderRadius: "10px",
              padding: "20px",
              cursor: "pointer",
              backgroundColor: theme.bgCard,
              transition: "all 0.2s ease-in-out",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = tmpl.color;
              e.currentTarget.style.transform = "translateY(-4px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = theme.cardBorder;
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  marginBottom: "12px",
                }}
              >
                <div
                  style={{
                    width: "12px",
                    height: "12px",
                    borderRadius: "50%",
                    backgroundColor: tmpl.color,
                  }}
                />
                <h3
                  style={{
                    fontSize: "18px",
                    fontWeight: "bold",
                    margin: 0,
                    color: theme.textPrimary,
                  }}
                >
                  {tmpl.title}
                </h3>
              </div>
              <p
                style={{
                  fontSize: "14px",
                  color: theme.textSecondary,
                  lineHeight: "1.4",
                  margin: "0 0 20px 0",
                }}
              >
                {tmpl.description}
              </p>
            </div>

            <button
              style={{
                width: "100%",
                padding: "10px",
                backgroundColor: tmpl.color,
                color: "#fff",
                border: "none",
                borderRadius: "6px",
                fontWeight: "600",
                cursor: "pointer",
              }}
            >
              {tmpl.hasSubEvents
                ? "Lihat Pilihan Event →"
                : "Pilih Template Ini →"}
            </button>
          </div>
        ))}
      </div>

      {/* POPUP / MODAL PILIHAN SUB EVENT */}
      {activeSubEventModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.6)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
            padding: "20px",
          }}
        >
          <div
            style={{
              backgroundColor: theme.bgCard,
              borderRadius: "12px",
              padding: "24px",
              maxWidth: "450px",
              width: "100%",
              border: `1px solid ${theme.border}`,
              boxShadow: "0 20px 25px -5px rgba(0,0,0,0.2)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "16px",
              }}
            >
              <h3
                style={{
                  margin: 0,
                  fontSize: "18px",
                  fontWeight: "bold",
                  color: theme.textPrimary,
                }}
              >
                Pilih Kategori Event:
              </h3>
              <button
                onClick={() => setActiveSubEventModal(null)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: theme.textSecondary,
                }}
              >
                <X size={20} />
              </button>
            </div>

            <p
              style={{
                fontSize: "14px",
                color: theme.textSecondary,
                marginBottom: "16px",
              }}
            >
              Silakan pilih salah satu sub-event untuk{" "}
              {activeSubEventModal.title}:
            </p>

            <div
              style={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >
              {activeSubEventModal.subEvents?.map((sub) => (
                <button
                  key={sub.id}
                  onClick={() => handleSelectSubEvent(sub)}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "12px 16px",
                    borderRadius: "8px",
                    border: `1px solid ${theme.border}`,
                    backgroundColor: theme.bgInput,
                    color: theme.textPrimary,
                    cursor: "pointer",
                    fontWeight: "500",
                    fontSize: "14px",
                    textAlign: "left",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor =
                      activeSubEventModal.color;
                    e.currentTarget.style.color = "#fff";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = theme.bgInput;
                    e.currentTarget.style.color = theme.textPrimary;
                  }}
                >
                  <span>{sub.name}</span>
                  <ChevronRight size={16} />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LandingPage;
