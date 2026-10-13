import React, { useState } from "react";
import { Award, X, ChevronRight, ArrowRight } from "lucide-react";
import { TEMPLATES } from "../data/templates";
import { useTheme } from "../context/ThemeContext";

const LandingPage = ({ onSelectTemplate }) => {
  const { theme } = useTheme();
  const [activeSubEventModal, setActiveSubEventModal] = useState(null);

  const handleCardClick = (tmpl) => {
    if (tmpl.hasSubEvents) {
      setActiveSubEventModal(tmpl);
    } else {
      onSelectTemplate(tmpl);
    }
  };

  const handleSelectSubEvent = (subEvent) => {
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
    <div className="w-full space-y-8 animate-fadeIn">
      {/* Hero / Header Section */}
      <div className="relative overflow-hidden text-center py-10 px-6 sm:px-10 rounded-2xl bg-slate-800/90 dark:bg-slate-900 border border-slate-700/80 shadow-xl">
        <div className="inline-flex items-center justify-center p-3 mb-4 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
          <Award className="w-10 h-10 stroke-[1.75]" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          E-Sertifikat Senkom Cianjur
        </h1>
        <p className="mt-3 text-sm sm:text-base text-slate-300 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
          Platform Digitalisasi E-Sertifikat Senkom Mitra Polri Kabupaten Cianjur. 
          Memudahkan pembuatan, validasi QR Code, dan pengelolaan sertifikat secara terpusat dan efisien.
        </p>
      </div>

      {/* Galeri Pilihan Template */}
      <div className="space-y-4">
        <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-slate-100 flex items-center gap-2">
          Pilih Template Halaman E-Sertifikat:
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {TEMPLATES.map((tmpl) => (
            <div
              key={tmpl.id}
              onClick={() => handleCardClick(tmpl)}
              className="group relative flex flex-col justify-between p-6 rounded-xl bg-slate-800/80 dark:bg-slate-800 border border-slate-700/80 hover:border-slate-500 transition-all duration-200 shadow-md hover:shadow-xl cursor-pointer"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-2.5">
                  <span
                    className="w-3 h-3 rounded-full shrink-0"
                    style={{ backgroundColor: tmpl.color }}
                  />
                  <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-blue-400 transition-colors">
                    {tmpl.title}
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed min-h-[48px]">
                  {tmpl.description}
                </p>
              </div>

              <div className="pt-6">
                <button
                  style={{ backgroundColor: tmpl.color }}
                  className="w-full py-2.5 px-4 rounded-lg text-white font-semibold text-xs sm:text-sm inline-flex items-center justify-center gap-2 hover:opacity-90 active:scale-[0.98] transition-all shadow-sm"
                >
                  <span>
                    {tmpl.hasSubEvents ? "Lihat Pilihan Event" : "Pilih Template Ini"}
                  </span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal / Popup Sub-Event */}
      {activeSubEventModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-md p-6 rounded-2xl bg-slate-800 border border-slate-700 text-slate-100 shadow-2xl space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-700">
              <h3 className="text-lg font-bold text-white">
                Pilih Kategori Event
              </h3>
              <button
                onClick={() => setActiveSubEventModal(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <p className="text-xs sm:text-sm text-slate-400">
              Silakan pilih salah satu sub-event untuk{" "}
              <span className="font-semibold text-white">
                {activeSubEventModal.title}
              </span>
              :
            </p>

            <div className="space-y-2.5">
              {activeSubEventModal.subEvents?.map((sub) => (
                <button
                  key={sub.id}
                  onClick={() => handleSelectSubEvent(sub)}
                  className="w-full flex items-center justify-between p-3.5 rounded-xl bg-slate-700/60 border border-slate-600/60 text-slate-100 text-xs sm:text-sm font-medium hover:bg-blue-600 hover:border-blue-500 hover:text-white transition-all group"
                >
                  <span>{sub.name}</span>
                  <ChevronRight
                    size={16}
                    className="text-slate-400 group-hover:text-white transition-transform group-hover:translate-x-0.5"
                  />
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