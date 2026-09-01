import React, { useState } from 'react';
import { MaterialItem, ClassSubject } from '../../types';
import {
  BookOpen,
  FileText,
  Video,
  ShieldAlert,
  HelpCircle,
  Download,
  CheckCircle2,
  ExternalLink,
  ChevronDown,
  Sparkles,
  Search,
  Filter,
  Bookmark,
  Layers,
} from 'lucide-react';

interface LearningMaterialsViewProps {
  materials: MaterialItem[];
  classes: ClassSubject[];
  selectedMaterialId?: string | null;
}

export const LearningMaterialsView: React.FC<LearningMaterialsViewProps> = ({
  materials,
  classes,
  selectedMaterialId,
}) => {
  const [selectedMat, setSelectedMat] = useState<MaterialItem | null>(
    materials.find((m) => m.id === selectedMaterialId) || materials[0] || null
  );
  const [selectedSubjectFilter, setSelectedSubjectFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [completedModules, setCompletedModules] = useState<Record<string, boolean>>({
    'mat-01': true,
  });

  const filteredMaterials = materials.filter((m) => {
    const matchSubject = selectedSubjectFilter === 'all' || m.subjectId === selectedSubjectFilter;
    const matchQuery =
      m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.subjectName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchSubject && matchQuery;
  });

  const toggleComplete = (id: string) => {
    setCompletedModules((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="inline-flex items-center space-x-1 text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
            <BookOpen className="w-3.5 h-3.5 mr-1" />
            <span>Menu 4: Materi Pembelajaran Berbasis 12 Elemen</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1">
            Modul Ajar, Jobsheet & LKPD Kejuruan
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Materi terstruktur lengkap dengan Standar Industri (DUDI), SOP, K3 & Evaluasi Mandiri.
          </p>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 shadow-xs flex flex-col md:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari materi ajar, jobsheet, SOP, atau kata kunci..."
            className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
          />
        </div>

        <div className="flex items-center space-x-2 w-full md:w-auto">
          <Filter className="w-4 h-4 text-slate-400" />
          <select
            value={selectedSubjectFilter}
            onChange={(e) => setSelectedSubjectFilter(e.target.value)}
            className="px-3 py-2 bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
          >
            <option value="all">Semua Mata Pelajaran</option>
            {classes.map((cls) => (
              <option key={cls.id} value={cls.id}>
                {cls.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 2-Column Layout: Materials List on Left, 12-Element Interactive Reader on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Modules List */}
        <div className="lg:col-span-4 space-y-3">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Daftar Modul ({filteredMaterials.length})
          </div>

          <div className="space-y-2.5 max-h-[750px] overflow-y-auto pr-1">
            {filteredMaterials.map((mat) => {
              const isSelected = selectedMat?.id === mat.id;
              const isCompleted = completedModules[mat.id];

              return (
                <div
                  key={mat.id}
                  onClick={() => setSelectedMat(mat)}
                  className={`p-4 rounded-xl border transition cursor-pointer text-xs space-y-2 ${
                    isSelected
                      ? 'bg-emerald-50/80 dark:bg-emerald-950/40 border-emerald-500 shadow-sm'
                      : 'bg-white dark:bg-slate-800/90 border-slate-200 dark:border-slate-700 hover:border-emerald-300'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="font-bold text-slate-900 dark:text-white line-clamp-2">
                      {mat.title}
                    </span>
                    {isCompleted && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    )}
                  </div>

                  <div className="text-[11px] text-slate-500">
                    Mapel: <strong>{mat.subjectName}</strong>
                  </div>

                  <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1">
                    <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 font-semibold">
                      {mat.typeLabel}
                    </span>
                    <span>{mat.fileSize}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: 12-Element Structural Material Reader */}
        <div className="lg:col-span-8 space-y-6">
          {selectedMat ? (
            <div className="bg-white dark:bg-slate-800/90 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 space-y-6 shadow-xs">
              
              {/* Header Info */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-700">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="px-2.5 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 font-bold text-[11px]">
                      {selectedMat.typeLabel}
                    </span>
                    <span className="text-xs text-slate-500 font-medium">
                      {selectedMat.subjectName}
                    </span>
                  </div>
                  <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
                    {selectedMat.title}
                  </h2>
                  <p className="text-xs text-slate-600 dark:text-slate-300">
                    {selectedMat.description}
                  </p>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => toggleComplete(selectedMat.id)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition ${
                      completedModules[selectedMat.id]
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-emerald-100'
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{completedModules[selectedMat.id] ? 'Tuntas Dipelajari' : 'Tandai Selesai'}</span>
                  </button>
                  <button
                    onClick={() => alert(`Mengunduh berkas ${selectedMat.title}...`)}
                    className="p-2 rounded-xl bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 text-slate-700 dark:text-slate-200 transition"
                    title="Unduh PDF / Jobsheet"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* 1. Kurikulum (CP & TP) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 text-xs space-y-1.5">
                  <div className="font-bold text-emerald-700 dark:text-emerald-400 flex items-center">
                    <Sparkles className="w-3.5 h-3.5 mr-1" />
                    Capaian Pembelajaran (CP)
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-[11px]">
                    {selectedMat.capaianPembelajaran}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 text-xs space-y-1.5">
                  <div className="font-bold text-blue-700 dark:text-blue-400 flex items-center">
                    <BookOpen className="w-3.5 h-3.5 mr-1" />
                    Tujuan Pembelajaran (TP)
                  </div>
                  <ul className="text-slate-600 dark:text-slate-300 space-y-1 text-[11px] list-disc list-inside">
                    {selectedMat.tujuanPembelajaran.map((tp, idx) => (
                      <li key={idx}>{tp}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* 2. Video Pembelajaran / Media Interaktif */}
              {selectedMat.videoUrl && (
                <div className="p-4 rounded-xl bg-slate-900 text-white space-y-2">
                  <div className="flex items-center space-x-2 text-xs font-bold text-rose-400">
                    <Video className="w-4 h-4" />
                    <span>Video Tutorial Interaktif DUDI / Industri</span>
                  </div>
                  <div className="aspect-video bg-slate-800 rounded-lg flex items-center justify-center border border-slate-700">
                    <div className="text-center space-y-2">
                      <div className="w-12 h-12 rounded-full bg-rose-600 mx-auto flex items-center justify-center shadow-lg hover:scale-110 transition cursor-pointer">
                        <Video className="w-6 h-6 text-white ml-0.5" />
                      </div>
                      <p className="text-xs text-slate-300">
                        {selectedMat.title} - Video Panduan Praktik
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* 3. Uraian Materi Utama */}
              <div className="space-y-3 text-xs">
                <h3 className="font-bold text-slate-900 dark:text-white text-sm">
                  Uraian Materi & Teori Terapan
                </h3>
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 whitespace-pre-line leading-relaxed font-sans">
                  {selectedMat.content}
                </div>
              </div>

              {/* 4. Jobsheet / LKPD & SOP & K3 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {selectedMat.jobsheetSteps && (
                  <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/80 text-xs space-y-2">
                    <div className="font-bold text-emerald-900 dark:text-emerald-200 flex items-center">
                      <FileText className="w-3.5 h-3.5 mr-1 text-emerald-600" />
                      Langkah Kerja / Jobsheet Praktik
                    </div>
                    <ol className="space-y-1 text-slate-700 dark:text-slate-300 text-[11px] list-decimal list-inside">
                      {selectedMat.jobsheetSteps.map((step, idx) => (
                        <li key={idx}>{step}</li>
                      ))}
                    </ol>
                  </div>
                )}

                {selectedMat.sopAndK3 && (
                  <div className="p-4 rounded-xl bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/80 text-xs space-y-2">
                    <div className="font-bold text-amber-900 dark:text-amber-200 flex items-center">
                      <ShieldAlert className="w-3.5 h-3.5 mr-1 text-amber-600" />
                      SOP & Keselamatan Kerja (K3)
                    </div>
                    <ul className="space-y-1 text-slate-700 dark:text-slate-300 text-[11px] list-disc list-inside">
                      {selectedMat.sopAndK3.map((k3, idx) => (
                        <li key={idx}>{k3}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* 5. Glosarium Istilah Kejuruan & Referensi DUDI */}
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 text-xs space-y-3">
                {selectedMat.glossary && (
                  <div className="space-y-1">
                    <span className="font-bold text-slate-900 dark:text-white">Glosarium: </span>
                    <div className="flex flex-wrap gap-1.5 mt-1">
                      {selectedMat.glossary.map((g, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-[10px]"
                        >
                          <strong>{g.term}:</strong> {g.def}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {selectedMat.industryReference && (
                  <div className="pt-2 border-t border-slate-200 dark:border-slate-700 text-[11px] text-slate-500">
                    <strong>Referensi Industri:</strong> {selectedMat.industryReference}
                  </div>
                )}
              </div>

            </div>
          ) : (
            <div className="p-12 text-center text-slate-400 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700">
              Pilih modul pembelajaran di sebelah kiri untuk membaca materi.
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
