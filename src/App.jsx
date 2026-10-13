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
import KetuaSenkomView from "./components/KetuaSenkomView";
import { parseCustomInput } from "./utils/parseCustomInput";

function MainApp() {
  const { theme } = useTheme();
  const [excelData, setExcelData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State Halaman: 'landing', 'pancasila-view', 'bhayangkara-view', 'kesaktian-pancasila-view', atau 'editor'
  const [currentStep, setCurrentStep] = useState("landing");
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  // State Mode Cetak Data
  const [mode, setMode] = useState("default");
  const [defaultCount, setDefaultCount] = useState(5);
  const [customInput, setCustomInput] = useState("1-5");

  const LOCAL_CSV_PATH = "/data-peserta.csv";

  // 1. Cek URL Browser saat aplikasi dimuat & tangani tombol Back Browser (popstate)
  useEffect(() => {
    const checkRoute = () => {
      const pathname = window.location.pathname;
      const searchParams = new URLSearchParams(window.location.search);
      const hasParticipantParams = Boolean(
        searchParams.get("callsign") || searchParams.get("nama"),
      );

      if (pathname.includes("/ketua-senkom")) {
        setCurrentStep("ketua-senkom-view");
      } else if (pathname.includes("/hari-kesaktian-pancasila")) {
        setCurrentStep("kesaktian-pancasila-view");
      } else if (pathname.includes("/hari-bhayangkara")) {
        setCurrentStep("bhayangkara-view");
      } else if (pathname.includes("/hari-lahir-pancasila")) {
        setCurrentStep("pancasila-view");
      } else if (hasParticipantParams) {
        setCurrentStep("pancasila-view");
      } else {
        setCurrentStep("landing");
      }
    };

    checkRoute();

    window.addEventListener("popstate", checkRoute);
    return () => window.removeEventListener("popstate", checkRoute);
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
    <div className="max-w-275 mx-auto p-4 sm:p-6 font-sans">
      {/* Header Bar dengan Tombol Mode Tema (Light/Dark) */}
      <div className="flex justify-end mb-4">
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

      {currentStep === "ketua-senkom-view" && <KetuaSenkomView />}

      {/* HALAMAN EDITOR CANVAS & PENGATURAN CETAK */}
      {currentStep === "editor" && (
        <div>
          {/* Top Bar Navigation Editor */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-5 pb-4 border-b border-gray-200 dark:border-slate-700">
            <button
              onClick={handleGoBack}
              className="inline-flex items-center gap-2 px-3.5 py-2 text-xs sm:text-sm font-medium rounded-md border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-800 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors cursor-pointer"
            >
              <ArrowLeft size={16} /> Kembali Pilih Template
            </button>

            {selectedTemplate && (
              <span className="text-xs sm:text-sm bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 px-3 py-1.5 rounded-full font-semibold inline-flex items-center gap-1.5">
                <CheckCircle size={14} /> Template Aktif:{" "}
                {selectedTemplate.title}
              </span>
            )}
          </div>

          <header className="mb-5">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100 m-0">
              Atur & Generator E-Sertifikat
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-slate-400 mt-1">
              Tentukan rentang data peserta, unggah gambar desain, posisikan QR
              Code di canvas, dan unduh file .ZIP.
            </p>
          </header>

          {loading && (
            <p className="text-xs sm:text-sm text-gray-500 dark:text-slate-400">
              Memuat data peserta...
            </p>
          )}
          {error && <p className="text-xs sm:text-sm text-red-500">{error}</p>}

          {!loading && !error && totalData > 0 && (
            <div className="space-y-4">
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
