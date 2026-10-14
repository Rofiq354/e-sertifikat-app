import React from "react";
import { Share2, CheckCircle } from "lucide-react";

const KetuaSenkomView = () => {
  // Gunakan BASE_URL dari Vite agar path gambar menyesuaikan domain deploy di GitHub Pages
  const LOGO_URL = `${import.meta.env.BASE_URL}logo_senkom.png`;
  const FOTO_KETUA_URL = `${import.meta.env.BASE_URL}ketua-senkom-cianjur.png`;

  const ketuaInfo = {
    nama: "H. Suparman",
    jabatan: "Ketua Senkom Mitra Polri Kabupaten Cianjur",
    motto: "Menembus Jarak Tanpa Batas",
    deskripsi:
      "Memimpin Senkom Mitra Polri Kabupaten Cianjur dalam menjalin sinergi dengan Badan Kesatuan Bangsa Dan Politik serta pemanfaatan Senkom Digital Communication (SDC) untuk menggelorakan semangat juang Pancasila dan menjaga keutuhan Negara Kesatuan Republic Indonesia",
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `Profil Ketua Senkom Mitra Polri Cianjur - ${ketuaInfo.nama}`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link profil Ketua Senkom berhasil disalin!");
    }
  };

  const handleClose = () => {
    // Coba tutup tab jika dibuka via link/QR scanner
    window.close();
    // Jika browser memblokir window.close(), arahkan balik ke base URL aplikasi
    setTimeout(() => {
      window.location.href = import.meta.env.BASE_URL;
    }, 300);
  };

  return (
    <div className="w-full max-w-md sm:max-w-xl mx-auto my-6 px-3 sm:px-4 font-sans box-border">
      {/* CONTAINER CARD UTAMA */}
      <div className="bg-white dark:bg-slate-900 rounded-xl shadow-lg border border-gray-200 dark:border-slate-800 overflow-hidden w-full">
        {/* Accent Bar Atas */}
        <div className="h-2.5 bg-[#d35400] w-full" />

        <div className="p-5 sm:p-7 text-center">
          {/* Logo Senkom */}
          <div className="mb-4 flex justify-center items-center">
            <img
              src={LOGO_URL}
              alt="Logo SENKOM MITRA POLRI"
              className="w-16 sm:w-20 h-auto object-contain"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          </div>

          {/* Header Brand */}
          <h2 className="text-base sm:text-lg text-gray-900 dark:text-gray-100 font-extrabold tracking-wide leading-snug uppercase">
            SENKOM MITRA POLRI
          </h2>
          <h3 className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 font-bold mb-4 uppercase">
            KABUPATEN CIANJUR
          </h3>

          {/* FOTO PROFIL KETUA (FOTO TRANSPARAN) */}
          <div className="relative w-28 h-28 sm:w-36 sm:h-36 mx-auto mb-4 rounded-full p-1 bg-linear-to-tr from-[#d35400] to-blue-600 shadow-md">
            <div className="w-full h-full rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center overflow-hidden">
              <img
                src={FOTO_KETUA_URL}
                alt={ketuaInfo.nama}
                className="w-full h-full object-cover object-top"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            </div>
            {/* Lencana / Badge Terverifikasi */}
            <div className="absolute bottom-1 right-1 bg-emerald-600 text-white p-1.5 rounded-full border-2 border-white dark:border-slate-900 z-10">
              <CheckCircle size={14} />
            </div>
          </div>

          {/* Nama & Jabatan */}
          <h1 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white mb-1">
            {ketuaInfo.nama}
          </h1>
          <div className="text-xs sm:text-sm text-[#d35400] font-bold uppercase tracking-wide mb-4">
            {ketuaInfo.jabatan}
          </div>

          {/* Status Badge */}
          <div className="inline-flex items-center gap-1.5 bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 px-3 py-1 rounded-full text-emerald-700 dark:text-emerald-400 text-xs font-bold mb-6">
            <CheckCircle size={14} /> AKTIF &amp; TERVERIFIKASI
          </div>

          {/* Group Data Detail */}
          <div className="bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 rounded-lg p-4 sm:p-5 text-left mb-6 space-y-3">
            <div className="grid grid-cols-[110px_1fr] sm:grid-cols-[140px_1fr] items-baseline text-xs sm:text-sm gap-2">
              <span className="font-semibold text-slate-500 dark:text-slate-400">
                Jabatan :
              </span>
              <span className="font-bold text-slate-900 dark:text-slate-100">
                {ketuaInfo.jabatan}
              </span>
            </div>

            <div className="grid grid-cols-[110px_1fr] sm:grid-cols-[140px_1fr] items-baseline text-xs sm:text-sm gap-2">
              <span className="font-semibold text-slate-500 dark:text-slate-400">
                Wilayah :
              </span>
              <span className="font-bold text-slate-900 dark:text-slate-100">
                Kabupaten Cianjur, Jawa Barat
              </span>
            </div>

            <div className="mt-3 pt-3 border-t border-dashed border-slate-300 dark:border-slate-700">
              <span className="font-semibold text-slate-500 dark:text-slate-400 text-xs block mb-1">
                Sesanti Senkom Mitra Polri:
              </span>
              <p className="text-xs sm:text-sm italic font-medium text-slate-700 dark:text-slate-300">
                "{ketuaInfo.motto}" <br />
                "Siaga Saat Aman Ada Saat Dibutuhkan" <br />
                "NKRI Harga Mati"
              </p>
            </div>
          </div>

          {/* Deskripsi */}
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
            {ketuaInfo.deskripsi}
          </p>

          {/* Tombol Tutup File Digital */}
          <button
            onClick={handleClose}
            className="w-full py-2.5 sm:py-3 px-4 bg-red-600 hover:bg-red-700 text-white rounded-md text-xs sm:text-sm font-bold tracking-wider transition-colors cursor-pointer uppercase shadow-sm"
          >
            TUTUP FILE DIGITAL
          </button>
        </div>
      </div>

      {/* Tombol Bagikan Link */}
      <div className="flex justify-center mt-4">
        <button
          onClick={handleShare}
          className="inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold rounded-md border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-800 dark:text-gray-200 shadow-sm hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors cursor-pointer"
        >
          <Share2 size={16} /> Bagikan Link Profil
        </button>
      </div>
    </div>
  );
};

export default KetuaSenkomView;
