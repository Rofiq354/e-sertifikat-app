import React, { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import { ArrowLeft, CheckCircle } from "lucide-react";

import { ThemeProvider, useTheme } from "./context/ThemeContext";
import ThemeToggle from "./components/ThemeToggle";
import LandingPage from "./components/LandingPage";
import PrintModeSelector from "./components/PrintModeSelector";
import CertificateEditor from "./components/CertificateEditor";
import HariPancasilaCertificateView from "./components/HariPancasilaCertificateView";
import HariBhayangkaraCertificateView from "./components/HariBhayangkaraCertificateView";
import HariKesaktianPancasilaCertificateView from "./components/HariKesaktianPancasilaCertificateView";
import { parseCustomInput } from "./utils/parseCustomInput";

function MainApp() {
  const { theme } = useTheme();
  const [excelData, setExcelData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State Halaman: 'landing', 'pancasila-view', atau 'editor'
  const [currentStep, setCurrentStep] = useState("landing");
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  // State Mode Cetak Data
  const [mode, setMode] = useState("default");
  const [defaultCount, setDefaultCount] = useState(5);
  const [customInput, setCustomInput] = useState("1-5");

  const LOCAL_CSV_PATH = "/data-peserta.csv";

  // 1. Cek URL Browser saat pertama kali aplikasi dimuat secara dinamis
  useEffect(() => {
    const pathname = window.location.pathname;
    const searchParams = new URLSearchParams(window.location.search);

    if (pathname.includes("/hari-kesaktian-pancasila")) {
      setCurrentStep("kesaktian-pancasila-view");
    } else if (pathname.includes("/hari-bhayangkara")) {
      setCurrentStep("bhayangkara-view");
    } else if (
      pathname.includes("/hari-lahir-pancasila") ||
      searchParams.get("callsign") ||
      searchParams.get("nama")
    ) {
      setCurrentStep("pancasila-view");
    }
  }, []);

  // 2. Load Data Peserta dari File CSV Lokal
  useEffect(() => {
    const fetchLocalCSV = async () => {
      try {
        setLoading(true);
        const response = await fetch(LOCAL_CSV_PATH);
        if (!response.ok)
          throw new Error(
            'File "data-peserta.csv" tidak ditemukan di folder public.',
          );

        const arrayBuffer = await response.arrayBuffer();
        const workbook = XLSX.read(arrayBuffer, { type: "array" });
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);

        if (jsonData.length > 0) {
          setExcelData(jsonData);
          setDefaultCount(Math.min(5, jsonData.length));
        } else {
          setError("Data CSV kosong.");
        }
      } catch (err) {
        console.error("Error CSV:", err);
        setError("Gagal membaca data CSV di folder public.");
      } finally {
        setLoading(false);
      }
    };

    fetchLocalCSV();
  }, []);

  const totalData = excelData.length;

  // 3. Filter Data Peserta Terpilih Berdasarkan Mode
  let selectedParticipants = [];
  if (mode === "default") {
    const effectiveCount = Math.min(Math.max(1, defaultCount || 1), totalData);
    selectedParticipants = excelData.slice(0, effectiveCount);
  } else {
    selectedParticipants = parseCustomInput(customInput, excelData);
  }

  // 4. Handler Memilih Template secara Dinamis
  const handleSelectTemplate = (template) => {
    setSelectedTemplate(template);

    // Dorong path URL dinamis dari templates.js ke browser history jika ada
    if (template.url) {
      window.history.pushState({}, "", template.url);
    }

    if (
      template.subEventId === "kesaktian-pancasila" ||
      (template.url && template.url.includes("/hari-kesaktian-pancasila"))
    ) {
      setCurrentStep("kesaktian-pancasila-view");
    } else if (
      template.subEventId === "bhayangkara" ||
      (template.url && template.url.includes("/hari-bhayangkara"))
    ) {
      setCurrentStep("bhayangkara-view");
    } else if (
      template.subEventId === "pancasila" ||
      (template.url && template.url.includes("/hari-lahir-pancasila"))
    ) {
      setCurrentStep("pancasila-view");
    } else {
      setCurrentStep("editor");
    }
  };

  // 5. Handler Kembali ke Landing Page & Reset URL ke Root '/'
  const handleGoBack = () => {
    window.history.pushState({}, "", "/");
    setCurrentStep("landing");
  };

  return (
    <div
      style={{
        maxWidth: "1100px",
        margin: "0 auto",
        padding: "24px",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      {/* Header Bar dengan Tombol Mode Tema (Light/Dark) */}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: "16px",
        }}
      >
        <ThemeToggle />
      </div>

      {/* HALAMAN LANDING PAGE (PILIH TEMPLATE) */}
      {currentStep === "landing" && (
        <LandingPage onSelectTemplate={handleSelectTemplate} />
      )}

      {/* HALAMAN TAMPILAN PREVIEW HARI KESAKTIAN PANCASILA */}
      {currentStep === "kesaktian-pancasila-view" && (
        <HariKesaktianPancasilaCertificateView
          participantData={selectedParticipants[0]}
          onBack={handleGoBack}
          onUseTemplate={() => setCurrentStep("editor")}
        />
      )}

      {/* HALAMAN TAMPILAN PREVIEW HARI LAHIR PANCASILA */}
      {currentStep === "pancasila-view" && (
        <HariPancasilaCertificateView
          participantData={selectedParticipants[0]}
          onBack={handleGoBack}
          onUseTemplate={() => setCurrentStep("editor")}
        />
      )}

      {/* HALAMAN TAMPILAN PREVIEW HARI BHAYANGKARA */}
      {currentStep === "bhayangkara-view" && (
        <HariBhayangkaraCertificateView
          participantData={selectedParticipants[0]}
          onBack={handleGoBack}
          onUseTemplate={() => setCurrentStep("editor")}
        />
      )}

      {/* HALAMAN EDITOR CANVAS & PENGATURAN CETAK */}
      {currentStep === "editor" && (
        <div>
          {/* Top Bar Navigation Editor */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "20px",
              borderBottom: `1px solid ${theme.border}`,
              paddingBottom: "16px",
            }}
          >
            <button
              onClick={handleGoBack}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "8px 14px",
                backgroundColor: theme.bgCard,
                color: theme.textPrimary,
                border: `1px solid ${theme.border}`,
                borderRadius: "6px",
                cursor: "pointer",
                fontWeight: "500",
                fontSize: "14px",
              }}
            >
              <ArrowLeft size={16} /> Kembali Pilih Template
            </button>

            {selectedTemplate && (
              <span
                style={{
                  fontSize: "14px",
                  backgroundColor: theme.infoBg,
                  color: theme.infoText,
                  padding: "6px 12px",
                  borderRadius: "20px",
                  fontWeight: "600",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <CheckCircle size={14} /> Template Aktif:{" "}
                {selectedTemplate.title}
              </span>
            )}
          </div>

          <header style={{ marginBottom: "20px" }}>
            <h1
              style={{
                fontSize: "24px",
                fontWeight: "bold",
                color: theme.textPrimary,
                margin: 0,
              }}
            >
              Atur & Generator E-Sertifikat
            </h1>
            <p
              style={{
                color: theme.textSecondary,
                marginTop: "4px",
                fontSize: "14px",
              }}
            >
              Tentukan rentang data peserta, unggah gambar desain, posisikan QR
              Code di canvas, dan unduh file .ZIP.
            </p>
          </header>

          {loading && (
            <p style={{ color: theme.textSecondary }}>Memuat data peserta...</p>
          )}
          {error && <p style={{ color: "#ef4444" }}>{error}</p>}

          {!loading && !error && totalData > 0 && (
            <div>
              <PrintModeSelector
                mode={mode}
                setMode={setMode}
                defaultCount={defaultCount}
                setDefaultCount={setDefaultCount}
                customInput={customInput}
                setCustomInput={setCustomInput}
                totalData={totalData}
                selectedCount={selectedParticipants.length}
              />

              <CertificateEditor
                selectedParticipants={selectedParticipants}
                selectedTemplate={selectedTemplate}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <MainApp />
    </ThemeProvider>
  );
}
