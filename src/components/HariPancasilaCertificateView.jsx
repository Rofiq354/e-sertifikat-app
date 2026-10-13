import React, { useRef } from "react";
import {
  ShieldCheck,
  Share2,
  Calendar,
  MapPin,
  Award,
  CheckCircle,
  ArrowLeft,
  LayoutTemplate,
} from "lucide-react";
import { PANCASILA_EVENT_INFO } from "../data/pancasilaEventData";
import { useTheme } from "../context/ThemeContext";

const HariPancasilaCertificateView = ({
  participantData,
  onBack,
  onUseTemplate,
}) => {
  const { theme, isDarkMode } = useTheme();
  const certRef = useRef(null);

  // 1. Dapatkan Query Parameters dari URL browser
  const searchParams = new URLSearchParams(window.location.search);
  const urlTahun = searchParams.get("tahun");
  const urlCallsign = searchParams.get("callsign");
  const urlNama = searchParams.get("nama");
  const urlKota = searchParams.get("kota");
  const urlProvinsi = searchParams.get("provinsi");
  const urlKeterangan = searchParams.get("keterangan");

  // Deteksi apakah URL memiliki parameter khusus peserta
  const isParticipantUrl = Boolean(urlCallsign || urlNama);

  // Tentukan Tahun Dinamis (Default ke 2026 jika tidak ada di URL/data)
  const dynamicYear = urlTahun || participantData?.tahun || "2026";

  // 2. Tentukan Data Peserta
  const participant = isParticipantUrl
    ? {
        NAMA: urlNama || "Edi Ermawan",
        CALLSIGN: urlCallsign || "", // Jika tidak ada, kosongkan
        PROVINSI: urlProvinsi || "Jawa Tengah",
        "KOTA/ KABUPATEN": urlKota || "Kabupaten Magelang",
        keterangan:
          urlKeterangan ||
          "Peserta / Partisipan Aktif Upacara & Kirab Kebangsaan Hari Lahir Pancasila",
        certId: `CERT-PANCASILA-${dynamicYear}-${urlCallsign || "USER"}`,
      }
    : participantData || {
        NAMA: "Ahmad Fauzi, S.T.",
        CALLSIGN: "S00AAA",
        PROVINSI: "Jawa Barat",
        "KOTA/ KABUPATEN": "Kabupaten Cianjur",
        keterangan:
          "Peserta / Partisipan Aktif Upacara & Kirab Kebangsaan Hari Lahir Pancasila",
        certId: `CERT-PANCASILA-${dynamicYear}-DUMMY`,
      };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `E-Sertifikat ${participant.NAMA} - Hari Lahir Pancasila ${dynamicYear}`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link verifikasi sertifikat berhasil disalin!");
    }
  };

  return (
    <div
      style={{
        maxWidth: "1000px",
        margin: "0 auto",
        padding: "16px",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      {/* Tombol Navigasi Kiri Atas (Hanya muncul jika BUKAN URL peserta / URL Default) */}
      {!isParticipantUrl && (
        <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
          {onBack && (
            <button
              onClick={onBack}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "8px 16px",
                backgroundColor: theme.bgCard,
                color: theme.textPrimary,
                border: `1px solid ${theme.border}`,
                borderRadius: "6px",
                cursor: "pointer",
                fontWeight: "600",
                fontSize: "14px",
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
                gap: "8px",
                padding: "8px 16px",
                backgroundColor: "#2563eb",
                color: "#ffffff",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                fontWeight: "600",
                fontSize: "14px",
              }}
            >
              <LayoutTemplate size={16} /> Gunakan Template Ini
            </button>
          )}
        </div>
      )}

      {/* Hero Banner Spesial Hari Lahir Pancasila */}
      <div
        style={{
          background:
            "linear-gradient(135deg, #b91c1c 0%, #991b1b 50%, #7f1d1d 100%)",
          borderRadius: "16px",
          padding: "32px 24px",
          color: "#ffffff",
          boxShadow: "0 10px 25px -5px rgba(185, 28, 28, 0.4)",
          marginBottom: "28px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={{ position: "relative", zIndex: 2, maxWidth: "700px" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              backgroundColor: "rgba(255, 255, 255, 0.2)",
              padding: "6px 14px",
              borderRadius: "20px",
              fontSize: "13px",
              fontWeight: "600",
              backdropFilter: "blur(4px)",
              marginBottom: "12px",
            }}
          >
            <Award size={16} color="#fde047" /> Special Event Senkom
          </div>
          <h1
            style={{
              fontSize: "28px",
              fontWeight: "800",
              margin: "0 0 8px 0",
              letterSpacing: "-0.5px",
            }}
          >
            {PANCASILA_EVENT_INFO.title} {dynamicYear}
          </h1>
          <p
            style={{
              fontSize: "15px",
              color: "#fecaca",
              margin: "0 0 16px 0",
              fontStyle: "italic",
            }}
          >
            "{PANCASILA_EVENT_INFO.theme}"
          </p>
          <div
            style={{
              display: "flex",
              gap: "16px",
              flexWrap: "wrap",
              fontSize: "13px",
              color: "#fca5a5",
            }}
          >
            <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <Calendar size={14} /> 1 Juni {dynamicYear}
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <MapPin size={14} /> {PANCASILA_EVENT_INFO.location}
            </span>
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            right: "-40px",
            bottom: "-40px",
            width: "220px",
            height: "220px",
            borderRadius: "50%",
            backgroundColor: "rgba(255,255,255,0.06)",
            zIndex: 1,
          }}
        />
      </div>

      {/* Card Verifikasi Validitas Sertifikat */}
      <div
        style={{
          backgroundColor: isDarkMode ? "#064e3b" : "#ecfdf5",
          border: `1px solid ${isDarkMode ? "#059669" : "#a7f3d0"}`,
          borderRadius: "12px",
          padding: "16px 20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "12px",
          marginBottom: "28px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <ShieldCheck size={32} color={isDarkMode ? "#34d399" : "#059669"} />
          <div style={{ textAlign: "start" }}>
            <div
              style={{
                fontWeight: "700",
                fontSize: "15px",
                color: isDarkMode ? "#a7f3d0" : "#065f46",
                display: "flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              Sertifikat Asli & Terverifikasi{" "}
              <CheckCircle size={16} color="#059669" />
            </div>
            <div
              style={{
                fontSize: "13px",
                color: isDarkMode ? "#6ee7b7" : "#047857",
              }}
            >
              Diterbitkan secara resmi oleh {PANCASILA_EVENT_INFO.organizer}
            </div>
          </div>
        </div>

        <div
          style={{
            fontSize: "12px",
            fontWeight: "600",
            backgroundColor: isDarkMode ? "#047857" : "#d1fae5",
            color: isDarkMode ? "#ecfdf5" : "#065f46",
            padding: "6px 12px",
            borderRadius: "6px",
          }}
        >
          ID: {participant.certId}
        </div>
      </div>

      {/* TAMPILAN FISIK SERTIFIKAT */}
      <div
        ref={certRef}
        style={{
          backgroundColor: "#ffffff",
          borderRadius: "12px",
          padding: "40px 30px",
          color: "#1e293b",
          border: "8px solid #991b1b",
          boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
          position: "relative",
          marginBottom: "28px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            borderBottom: "2px double #cbd5e1",
            paddingBottom: "20px",
            marginBottom: "24px",
          }}
        >
          <div
            style={{
              fontSize: "14px",
              fontWeight: "800",
              color: "#991b1b",
              letterSpacing: "2px",
              textTransform: "uppercase",
            }}
          >
            SENKOM MITRA POLRI KABUPATEN CIANJUR
          </div>
          <h2
            style={{
              fontSize: "32px",
              fontFamily: "serif",
              fontWeight: "bold",
              color: "#0f172a",
              margin: "8px 0 4px 0",
            }}
          >
            E-SERTIFIKAT PENGHARGAAN
          </h2>
          <div
            style={{ fontSize: "13px", color: "#64748b", fontWeight: "500" }}
          >
            Nomor: 06.01/SK-PANCASILA/SENKOM-CJR/VI/{dynamicYear}
          </div>
        </div>

        <div style={{ margin: "30px 0" }}>
          <p
            style={{ fontSize: "15px", color: "#475569", margin: "0 0 12px 0" }}
          >
            Diberikan dengan penuh apresiasi dan rasa bangga kepada:
          </p>
          <h3
            style={{
              fontSize: "30px",
              fontWeight: "bold",
              color: "#b91c1c",
              margin: "0 0 6px 0",
              textDecoration: "underline",
            }}
          >
            {participant.NAMA}
          </h3>

          {/* HANYA TAMPILKAN CALLSIGN JIKA PARAMETER/DATA CALLSIGN TERSEDIA */}
          {participant.CALLSIGN && (
            <p
              style={{
                fontSize: "16px",
                fontWeight: "600",
                color: "#334155",
                margin: "0 0 20px 0",
              }}
            >
              CALLSIGN:{" "}
              <span
                style={{
                  backgroundColor: "#fef2f2",
                  padding: "2px 8px",
                  borderRadius: "4px",
                  border: "1px solid #fca5a5",
                }}
              >
                {participant.CALLSIGN}
              </span>
            </p>
          )}

          <p
            style={{
              fontSize: "15px",
              color: "#334155",
              maxWidth: "650px",
              margin: participant.CALLSIGN ? "0 auto" : "20px auto 0",
              lineHeight: "1.6",
            }}
          >
            Atas partisipasi aktif dan kontribusinya dalam mendukung suksesnya
            agenda kebangsaan <strong>"{PANCASILA_EVENT_INFO.title}"</strong>{" "}
            yang diselenggarakan oleh Senkom Mitra Polri di{" "}
            {participant["KOTA/ KABUPATEN"] || participant.PROVINSI}.
          </p>
        </div>

        <div
          style={{
            backgroundColor: "#f8fafc",
            border: "1px dashed #cbd5e1",
            borderRadius: "8px",
            padding: "12px",
            margin: "24px auto",
            maxWidth: "600px",
            fontSize: "12px",
            color: "#64748b",
          }}
        >
          <strong>Semangat Pancasila:</strong>{" "}
          {PANCASILA_EVENT_INFO.pancasilaSila
            .map((s) => `${s.num}. ${s.text}`)
            .join(" • ")}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            marginTop: "40px",
            paddingTop: "20px",
            borderTop: "1px solid #e2e8f0",
          }}
        >
          <div>
            <div style={{ fontSize: "13px", color: "#64748b" }}>
              Cianjur, 1 Juni {dynamicYear}
            </div>
            <div
              style={{
                fontWeight: "bold",
                fontSize: "14px",
                marginTop: "40px",
                color: "#0f172a",
              }}
            >
              Ketua Senkom Cianjur
            </div>
            <div style={{ fontSize: "12px", color: "#64748b" }}>
              NIP / NIK. 3203.SENKOM.01
            </div>
          </div>
          <div>
            <div style={{ fontSize: "13px", color: "#64748b" }}>
              Panitia Pelaksana
            </div>
            <div
              style={{
                fontWeight: "bold",
                fontSize: "14px",
                marginTop: "40px",
                color: "#0f172a",
              }}
            >
              Sekretaris Kegiatan
            </div>
            <div style={{ fontSize: "12px", color: "#64748b" }}>
              NIP / NIK. 3203.SENKOM.02
            </div>
          </div>
        </div>
      </div>

      {/* Tombol Bagikan Link (Di Bawah Tengah) */}
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
      >
        <button
          onClick={handleShare}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "12px 28px",
            backgroundColor: theme.bgCard,
            color: theme.textPrimary,
            border: `1px solid ${theme.border}`,
            borderRadius: "8px",
            fontWeight: "600",
            fontSize: "15px",
            cursor: "pointer",
            boxShadow: "0 2px 5px rgba(0,0,0,0.05)",
          }}
        >
          <Share2 size={18} /> Bagikan Link Sertifikat
        </button>
      </div>
    </div>
  );
};

export default HariPancasilaCertificateView;
