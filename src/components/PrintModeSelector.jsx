import React from "react";
import {
  ListFilter,
  SlidersHorizontal,
  Info,
  AlertTriangle,
  Hash,
} from "lucide-react";

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
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl p-4 sm:p-5 border border-gray-200 dark:border-slate-700/80 mb-6 shadow-sm">
      {/* Radio Cards Grid untuk Mode */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
        {/* Card Mode Default */}
        <div
          onClick={() => setMode("default")}
          className={`p-3.5 sm:p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 flex items-center gap-3 sm:gap-4 ${
            mode === "default"
              ? "border-blue-600 bg-blue-50/60 dark:bg-blue-950/30"
              : "border-gray-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 hover:border-gray-300 dark:hover:border-slate-600"
          }`}
        >
          <div
            className={`p-2 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
              mode === "default"
                ? "bg-blue-600 text-white"
                : "bg-white dark:bg-slate-700 text-slate-500 dark:text-slate-400 border border-gray-200 dark:border-slate-600"
            }`}
          >
            <ListFilter size={20} />
          </div>
          <div>
            <div className="font-semibold text-sm sm:text-base text-gray-900 dark:text-gray-100">
              Default
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400">
              Cetak berurutan dari data teratas
            </div>
          </div>
        </div>

        {/* Card Mode Custom */}
        <div
          onClick={() => setMode("custom")}
          className={`p-3.5 sm:p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 flex items-center gap-3 sm:gap-4 ${
            mode === "custom"
              ? "border-blue-600 bg-blue-50/60 dark:bg-blue-950/30"
              : "border-gray-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 hover:border-gray-300 dark:hover:border-slate-600"
          }`}
        >
          <div
            className={`p-2 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
              mode === "custom"
                ? "bg-blue-600 text-white"
                : "bg-white dark:bg-slate-700 text-slate-500 dark:text-slate-400 border border-gray-200 dark:border-slate-600"
            }`}
          >
            <SlidersHorizontal size={20} />
          </div>
          <div>
            <div className="font-semibold text-sm sm:text-base text-gray-900 dark:text-gray-100">
              Custom
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400">
              Pilih nomor acak atau rentang data
            </div>
          </div>
        </div>
      </div>

      {/* Input Area Form Berdasarkan Mode */}
      <div className="p-4 rounded-lg bg-slate-50/80 dark:bg-slate-900/50 border border-gray-200/80 dark:border-slate-700/80 mb-4">
        {mode === "default" ? (
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <label className="text-xs sm:text-sm font-medium text-gray-800 dark:text-gray-200">
              Cetak dari urutan pertama sebanyak:
            </label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min="1"
                max={totalData}
                value={defaultCount}
                onChange={(e) =>
                  setDefaultCount(parseInt(e.target.value) || 0)
                }
                className="p-2 w-24 text-center text-sm font-bold rounded-md border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-400">
                Sertifikat
              </span>
            </div>
            <span className="text-xs text-slate-500 dark:text-slate-400 sm:ml-auto">
              (Total Database: <strong className="text-slate-700 dark:text-slate-300">{totalData} Data</strong>)
            </span>
          </div>
        ) : (
          <div className="flex flex-col items-center text-center">
            <label className="text-xs sm:text-sm font-medium text-gray-800 dark:text-gray-200 mb-2">
              Masukkan Nomor Data Peserta:
            </label>
            <div className="relative w-full max-w-md">
              <input
                type="text"
                placeholder="Contoh: 1, 3, 5-8, 12"
                value={customInput}
                onChange={(e) => setCustomInput(e.target.value)}
                className="w-full py-2 px-3 pl-9 text-xs sm:text-sm font-mono rounded-md border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Hash
                size={16}
                className="absolute left-3 top-2.5 text-slate-400 dark:text-slate-500 pointer-events-none"
              />
            </div>
            <p className="mt-2 text-[11px] sm:text-xs text-slate-500 dark:text-slate-400">
              💡 Petunjuk: Gunakan koma untuk pemisah angka (<code className="px-1 py-0.5 rounded bg-slate-200 dark:bg-slate-800">1, 3</code>)
              atau tanda minus untuk rentang (<code className="px-1 py-0.5 rounded bg-slate-200 dark:bg-slate-800">5-10</code>).
            </p>
          </div>
        )}
      </div>

      {/* Dynamic Status Bar */}
      <div
        className={`flex items-center gap-2.5 p-3 rounded-lg border text-xs sm:text-sm font-medium transition-colors ${
          selectedCount > 0
            ? "bg-blue-50 dark:bg-blue-950/40 border-blue-200 dark:border-blue-900/50 text-blue-700 dark:text-blue-300"
            : "bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-900/50 text-red-600 dark:text-red-400"
        }`}
      >
        {selectedCount > 0 ? (
          <>
            <Info size={18} className="shrink-0" />
            <span>
              Siap memproses <strong className="font-bold">{selectedCount} Sertifikat</strong> sesuai
              pilihan Anda.
            </span>
          </>
        ) : (
          <>
            <AlertTriangle size={18} className="shrink-0" />
            <span>
              Input tidak valid atau nomor data yang dimasukkan melebihi total ketersediaan data ({totalData}).
            </span>
          </>
        )}
      </div>
    </div>
  );
};

export default PrintModeSelector;