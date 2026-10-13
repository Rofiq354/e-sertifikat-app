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

  // Properti judul & sub-judul event disesuaikan ke Hari Kesaktian Pancasila
  const urlEventTitle = searchParams.get("event") || "SPECIAL EVENT S12ZAF";
  const urlEventSubtitle =
    searchParams.get("subtitle") ||
    `HARI KESAKTIAN PANCASILA \nTAHUN ${urlTahun}`;

  // Deteksi apakah URL memuat parameter khusus peserta (URL Panjang)
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
        title: `E-Sertifikat Hari Kesaktian Pancasila - ${participant.NAMA}`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link verifikasi e-sertifikat berhasil disalin!");
    }
  };

  return (
    <div className="w-full max-w-md sm:max-w-lg mx-auto my-4 px-3 sm:px-4 font-sans box-border">
      {/* Tombol Navigasi Atas (Hanya tampil di mode editor / preview internal) */}
      {!isParticipantUrl && (
        <div className="flex gap-2 mb-4 flex-wrap">
          {onBack && (
            <button
              onClick={onBack}
              className="inline-flex items-center gap-2 px-3 py-1.5 text-xs sm:text-sm font-semibold rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-slate-800 text-gray-800 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors cursor-pointer"
            >
              <ArrowLeft size={16} /> Kembali
            </button>
          )}

          {onUseTemplate && (
            <button
              onClick={onUseTemplate}
              className="inline-flex items-center gap-2 px-3 py-1.5 text-xs sm:text-sm font-semibold rounded-md bg-amber-700 hover:bg-amber-800 text-white transition-colors cursor-pointer"
            >
              <LayoutTemplate size={16} /> Gunakan Template Ini
            </button>
          )}
        </div>
      )}

      {/* CONTAINER CARD UTAMA (BINGKAI WARNA COKELAT / MERAH MARUN BERSAHAJA) */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden w-full">
        {/* Accent Bar Atas (Emas Kebangsaan) */}
        <div className="h-2 bg-amber-600 w-full" />

        <div className="p-4 sm:p-7 text-center">
          {/* Area Logo */}
          <div className="mb-3 flex justify-center">
            <img
              src="/logo_senkom.png"
              alt="Logo SENKOM MITRA POLRI"
              className="w-20 sm:w-28 h-auto object-contain"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          </div>

          {/* Header Brand Title */}
          <h2 className="text-base sm:text-lg text-gray-900 font-extrabold tracking-wide leading-snug uppercase">
            SENKOM MITRA POLRI
          </h2>
          <h3 className="text-xs sm:text-base text-gray-800 font-bold mb-2 sm:mb-3 uppercase">
            KABUPATEN CIANJUR
          </h3>

          {/* Subtitle Special Event Hari Kesaktian Pancasila */}
          <div className="text-amber-800 dark:text-amber-700 font-bold text-base sm:text-xl mb-4 sm:mb-6 leading-tight">
            {urlEventTitle} <br />
            {urlEventSubtitle.split("\n").map((line, idx) => (
              <React.Fragment key={idx}>
                {line}
                <br />
              </React.Fragment>
            ))}
          </div>

          {/* Main Status Label */}
          <div className="text-[11px] sm:text-xs md:text-sm text-slate-800 font-bold mb-3 sm:mb-4 tracking-normal sm:tracking-wider uppercase">
            POLRES &amp; SENKOM MITRA POLRI KABUPATEN CIANJUR
          </div>

          {/* Statement */}
          <p className="text-xs sm:text-sm text-slate-500 mb-3 sm:mb-5">
            E-Piagam ini sah menyatakan data berikut :
          </p>

          {/* Group Data Peserta */}
          <div className="bg-slate-50 border border-slate-200/80 rounded-lg p-3 sm:p-5 text-left mb-5 space-y-2 sm:space-y-3">
            {/* Baris Callsign (Disembunyikan jika kosong) */}
            {participant.CALLSIGN && (
              <div className="grid grid-cols-[100px_1fr] sm:grid-cols-[130px_1fr] items-baseline text-xs sm:text-sm gap-2">
                <span className="font-semibold text-slate-600">
                  {urlLabelInfo}
                </span>
                <span className="font-bold text-slate-900 wrap-break-words">
                  {participant.CALLSIGN}
                </span>
              </div>
            )}

            {/* Baris Nama */}
            <div className="grid grid-cols-[100px_1fr] sm:grid-cols-[130px_1fr] items-baseline text-xs sm:text-sm gap-2">
              <span className="font-semibold text-slate-600">Nama :</span>
              <span className="font-bold text-slate-900 wrap-break-words">
                {participant.NAMA}
              </span>
            </div>

            {/* Baris Kota / Kabupaten */}
            <div className="grid grid-cols-[100px_1fr] sm:grid-cols-[130px_1fr] items-baseline text-xs sm:text-sm gap-2">
              <span className="font-semibold text-slate-600">
                Kota / Kabupaten :
              </span>
              <span className="font-bold text-slate-900 wrap-break-words">
                {participant.KOTA || participant["KOTA/ KABUPATEN"]}
              </span>
            </div>

            {/* Baris Provinsi */}
            <div className="grid grid-cols-[100px_1fr] sm:grid-cols-[130px_1fr] items-baseline text-xs sm:text-sm gap-2">
              <span className="font-semibold text-slate-600">Provinsi :</span>
              <span className="font-bold text-slate-900 wrap-break-words">
                {participant.PROVINSI}
              </span>
            </div>

            {/* Status Dokumen Valid */}
            <div className="mt-3 pt-3 border-t border-dashed border-slate-300 grid grid-cols-[100px_1fr] sm:grid-cols-[130px_1fr] items-center gap-2">
              <span className="font-semibold text-slate-600 text-[11px] sm:text-xs">
                Status Dokumen :
              </span>
              <span className="font-bold text-emerald-600 text-[11px] sm:text-xs flex items-center gap-1">
                ✓ VALID &amp; TERVERIFIKASI
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Tombol Bagikan Link */}
      <div className="flex justify-center mt-4">
        <button
          onClick={handleShare}
          className="inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-slate-800 text-gray-800 dark:text-gray-200 shadow-sm hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors cursor-pointer"
        >
          <Share2 size={16} /> Bagikan Link Sertifikat
        </button>
      </div>
    </div>
  );
};

export default SimpleCertificateView;
