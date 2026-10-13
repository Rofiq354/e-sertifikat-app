import React from "react";
import { Share2, ArrowLeft, LayoutTemplate } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const SimpleCertificateView = ({ participantData, onBack, onUseTemplate }) => {
  const { theme } = useTheme();

  // 1. Ambil Query Parameters dari URL
  const searchParams = new URLSearchParams(window.location.search);
  const urlTahun = searchParams.get("tahun") || "2026";
  const urlCallsign =
    searchParams.get("callsign") || searchParams.get("info-tambahan");
  const urlNama = searchParams.get("nama");
  const urlKota = searchParams.get("kota");
  const urlProvinsi = searchParams.get("provinsi");
  const urlLabelInfo = searchParams.get("label-info") || "Callsign :";
  const urlEventTitle = searchParams.get("event") || "SPECIAL EVENT S12ZAF";
  const urlEventSubtitle =
    searchParams.get("subtitle") ||
    `HARI BHAYANGKARA KE 80 \nTAHUN ${urlTahun}`;

  // Deteksi apakah URL memuat parameter khusus peserta
  const isParticipantUrl = Boolean(urlCallsign || urlNama);

  // 2. Penentuan Data Peserta
  const participant = isParticipantUrl
    ? {
        CALLSIGN: urlCallsign || "",
        NAMA: urlNama || "Titok Tosan Batoro",
        KOTA: urlKota || "Kota Cimahi",
        PROVINSI: urlProvinsi || "Jawa Barat",
      }
    : participantData || {
        CALLSIGN: "S12TTB",
        NAMA: "Titok Tosan Batoro",
        KOTA: "Kota Cimahi",
        PROVINSI: "Jawa Barat",
      };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `E-Sertifikat - ${participant.NAMA}`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link verifikasi e-sertifikat berhasil disalin!");
    }
  };

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "520px",
        margin: "1rem auto",
        padding: "0 0.75rem",
        fontFamily:
          'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        boxSizing: "border-box",
      }}
    >
      {/* Navigasi Atas (Hanya tampil jika mode editor/default) */}
      {!isParticipantUrl && (
        <div
          style={{
            display: "flex",
            gap: "0.5rem",
            marginBottom: "1.25rem",
            flexWrap: "wrap",
          }}
        >
          {onBack && (
            <button
              onClick={onBack}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.5rem 1rem",
                backgroundColor: theme.bgCard,
                color: theme.textPrimary,
                border: `1px solid ${theme.border}`,
                borderRadius: "0.375rem",
                cursor: "pointer",
                fontWeight: "600",
                fontSize: "0.875rem",
              }}
            >
              <ArrowLeft size={16} /> Kembali
            </button>
          )}

          {onUseTemplate && (
            <button
              onClick={onUseTemplate}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.5rem 1rem",
                backgroundColor: "#2563eb",
                color: "#ffffff",
                border: "none",
                borderRadius: "0.375rem",
                cursor: "pointer",
                fontWeight: "600",
                fontSize: "0.875rem",
              }}
            >
              <LayoutTemplate size={16} /> Gunakan Template Ini
            </button>
          )}
        </div>
      )}

      {/* CONTAINER CARD UTAMA */}
      <div
        style={{
          backgroundColor: "#ffffff",
          borderRadius: "0.75rem",
          boxShadow:
            "0 10px 25px -5px rgba(0, 0, 0, 0.08), 0 8px 10px -6px rgba(0, 0, 0, 0.01)",
          border: "1px solid #e2e8f0",
          overflow: "hidden",
          width: "100%",
        }}
      >
        {/* Accent Bar Atas */}
        <div
          style={{
            height: "0.5rem",
            backgroundColor: "#d35400",
            width: "100%",
          }}
        ></div>

        <div
          style={{
            padding: "clamp(1.25rem, 4vw, 2rem) clamp(1rem, 3.5vw, 1.75rem)",
            textAlign: "center",
          }}
        >
          {/* Area Logo */}
          <div
            style={{
              marginBottom: "1rem",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <img
              src="/logo_senkom.png"
              alt="Logo SENKOM MITRA POLRI"
              style={{
                width: "clamp(90px, 20vw, 120px)",
                height: "auto",
                objectFit: "contain",
              }}
              onError={(e) => {
                e.target.style.display = "none";
              }}
            />
          </div>

          {/* Title Header Brand */}
          <div
            style={{
              fontSize: "clamp(1rem, 3.5vw, 1.125rem)",
              color: "#111827",
              fontWeight: "800",
              marginBottom: "0.25rem",
              letterSpacing: "0.025em",
              lineHeight: "1.2",
            }}
          >
            SENKOM MITRA POLRI
          </div>
          <div
            style={{
              fontSize: "clamp(0.875rem, 3vw, 1rem)",
              color: "#1f2937",
              fontWeight: "700",
              marginBottom: "0.5rem",
              lineHeight: "1.2",
            }}
          >
            KABUPATEN CIANJUR
          </div>

          {/* Subtitle Event */}
          <div
            style={{
              color: "#d35400",
              fontWeight: "700",
              fontSize: "clamp(1.125rem, 4.5vw, 1.375rem)",
              marginBottom: "1.5rem",
              lineHeight: "1.35",
            }}
          >
            {urlEventTitle} <br />
            {urlEventSubtitle.split("\n").map((line, idx) => (
              <React.Fragment key={idx}>
                {line}
                <br />
              </React.Fragment>
            ))}
          </div>

          {/* Main Status Label */}
          <div
            style={{
              fontSize: "clamp(0.8125rem, 2.8vw, 0.875rem)",
              color: "#2c3e50",
              fontWeight: "700",
              marginBottom: "1.25rem",
              letterSpacing: "0.02em",
              textTransform: "uppercase",
            }}
          >
            POLRES &amp; SENKOM MITRA POLRI KABUPATEN CIANJUR
          </div>

          {/* Statement */}
          <div
            style={{
              fontSize: "clamp(0.8125rem, 2.5vw, 0.875rem)",
              color: "#64748b",
              marginBottom: "1.25rem",
              lineHeight: "1.4",
            }}
          >
            E-Sertifikat / Piagam ini sah menyatakan data berikut :
          </div>

          {/* Data Group List */}
          <div
            style={{
              backgroundColor: "#f8fafc",
              border: "1px solid #f1f5f9",
              borderRadius: "0.5rem",
              padding: "clamp(0.875rem, 3vw, 1.25rem)",
              textAlign: "left",
              marginBottom: "1.5rem",
              display: "flex",
              flexDirection: "column",
              gap: "0.625rem",
            }}
          >
            {/* Rows Callsign */}
            {participant.CALLSIGN && (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "minmax(110px, 130px) 1fr",
                  alignItems: "baseline",
                  fontSize: "clamp(0.8125rem, 2.6vw, 0.9375rem)",
                  gap: "0.5rem",
                }}
              >
                <span style={{ fontWeight: "600", color: "#475569" }}>
                  {urlLabelInfo}
                </span>
                <span
                  style={{
                    fontWeight: "700",
                    color: "#0f172a",
                    wordBreak: "break-word",
                  }}
                >
                  {participant.CALLSIGN}
                </span>
              </div>
            )}

            {/* Row Nama */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "minmax(110px, 130px) 1fr",
                alignItems: "baseline",
                fontSize: "clamp(0.8125rem, 2.6vw, 0.9375rem)",
                gap: "0.5rem",
              }}
            >
              <span style={{ fontWeight: "600", color: "#475569" }}>
                Nama :
              </span>
              <span
                style={{
                  fontWeight: "700",
                  color: "#0f172a",
                  wordBreak: "break-word",
                }}
              >
                {participant.NAMA}
              </span>
            </div>

            {/* Row Kota */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "minmax(110px, 130px) 1fr",
                alignItems: "baseline",
                fontSize: "clamp(0.8125rem, 2.6vw, 0.9375rem)",
                gap: "0.5rem",
              }}
            >
              <span style={{ fontWeight: "600", color: "#475569" }}>
                Kota / Kabupaten :
              </span>
              <span
                style={{
                  fontWeight: "700",
                  color: "#0f172a",
                  wordBreak: "break-word",
                }}
              >
                {participant.KOTA || participant["KOTA/ KABUPATEN"]}
              </span>
            </div>

            {/* Row Provinsi */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "minmax(110px, 130px) 1fr",
                alignItems: "baseline",
                fontSize: "clamp(0.8125rem, 2.6vw, 0.9375rem)",
                gap: "0.5rem",
              }}
            >
              <span style={{ fontWeight: "600", color: "#475569" }}>
                Provinsi :
              </span>
              <span
                style={{
                  fontWeight: "700",
                  color: "#0f172a",
                  wordBreak: "break-word",
                }}
              >
                {participant.PROVINSI}
              </span>
            </div>

            {/* Status Dokumen */}
            <div
              style={{
                marginTop: "0.5rem",
                borderTop: "1px dashed #cbd5e1",
                paddingTop: "0.75rem",
                display: "grid",
                gridTemplateColumns: "minmax(110px, 130px) 1fr",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <span
                style={{
                  fontWeight: "600",
                  color: "#475569",
                  fontSize: "clamp(0.75rem, 2.4vw, 0.875rem)",
                }}
              >
                Status Dokumen :
              </span>
              <span
                style={{
                  fontWeight: "700",
                  color: "#27ae60",
                  fontSize: "clamp(0.75rem, 2.4vw, 0.875rem)",
                  display: "inline-flex",
                  alignItems: "center",
                }}
              >
                ✓ VALID &amp; TERVERIFIKASI
              </span>
            </div>
          </div>

          {/* Tombol Tutup File Digital */}
          <button
            onClick={() => {
              if (window.history.length > 1) {
                window.close();
              } else {
                alert("Tampilan digital sertifikat aktif.");
              }
            }}
            style={{
              width: "100%",
              padding: "0.75rem 1rem",
              backgroundColor: "#e74c3c",
              color: "#ffffff",
              border: "none",
              borderRadius: "0.375rem",
              fontSize: "clamp(0.8125rem, 2.5vw, 0.875rem)",
              fontWeight: "700",
              cursor: "pointer",
              letterSpacing: "0.03em",
              transition: "background-color 0.2s ease",
            }}
          >
            TUTUP FILE DIGITAL
          </button>
        </div>
      </div>

      {/* Tombol Bagikan Link */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "1.25rem",
        }}
      >
        <button
          onClick={handleShare}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            padding: "0.625rem 1.25rem",
            backgroundColor: theme.bgCard,
            color: theme.textPrimary,
            border: `1px solid ${theme.border}`,
            borderRadius: "0.375rem",
            fontWeight: "600",
            fontSize: "0.875rem",
            cursor: "pointer",
            boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
          }}
        >
          <Share2 size={16} /> Bagikan Link Sertifikat
        </button>
      </div>
    </div>
  );
};

export default SimpleCertificateView;
