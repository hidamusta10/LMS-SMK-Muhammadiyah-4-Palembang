import React, { useState } from 'react';
import { UserProfile } from '../../types';
import {
  Award,
  CheckCircle2,
  FileCheck,
  ExternalLink,
  ShieldCheck,
  UserCheck,
  Sparkles,
  Download,
  PlusCircle,
} from 'lucide-react';

interface UKKPortfolioViewProps {
  user: UserProfile;
}

export const UKKPortfolioView: React.FC<UKKPortfolioViewProps> = ({ user }) => {
  const [activeTab, setActiveTab] = useState<'ukk' | 'portofolio'>('ukk');

  const mockPortfolios = [
    {
      id: 'port-1',
      title: 'Aplikasi Kasir POS & Inventory Swalayan',
      techStack: ['React', 'TypeScript', 'Node.js', 'PostgreSQL'],
      description: 'Sistem Point of Sales terintegrasi barcode scanner dan cetak struk bluetooth untuk UMKM binaan Muhammadiyah.',
      demoUrl: 'https://demo-pos.smk4plg.sch.id',
      score: 96,
    },
    {
      id: 'port-2',
      title: 'Portal Presensi Digital Berbasis Geofencing',
      techStack: ['Express.js', 'Tailwind CSS', 'Leaflet Map'],
      description: 'Aplikasi absensi real-time karyawan berbasis radius GPS dan validasi selfie kamera.',
      demoUrl: 'https://presensi.smk4plg.sch.id',
      score: 94,
    },
  ];

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="inline-flex items-center space-x-1 text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            <Award className="w-3.5 h-3.5 mr-1" />
            <span>Menu 12: Kegiatan Khas SMK</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1">
            Uji Kompetensi Keahlian (UKK) & e-Portofolio
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Sertifikasi Profesi BNSP/LSP-P1 SMK, verifikasi asesor industri DUDI, dan etalase karya siswa.
          </p>
        </div>
      </div>

      {/* Hero UKK Certification Status */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white shadow-md space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 rounded-2xl bg-blue-500/20 border border-blue-400/40 flex items-center justify-center">
              <ShieldCheck className="w-7 h-7 text-blue-300" />
            </div>
            <div>
              <span className="text-[11px] font-mono font-bold text-blue-300 px-2 py-0.5 bg-blue-900/60 rounded">
                LSP-P1 SMK Muhammadiyah 4 Palembang / BNSP
              </span>
              <h2 className="text-xl font-extrabold text-white mt-1">
                Skema: Pemrograman Web & Aplikasi Bergerak
              </h2>
              <p className="text-xs text-blue-100/80 mt-0.5">
                Kualifikasi Level II KKNI Bidang Teknologi Informasi
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <div className="px-4 py-2 rounded-xl bg-emerald-700/80 border border-emerald-400 text-right">
              <div className="text-[10px] text-emerald-200">Hasil Asesmen UKK</div>
              <div className="text-lg font-extrabold text-white">KOMPETEN (K)</div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex overflow-x-auto space-x-2 border-b border-slate-200 dark:border-slate-800 pb-2">
        <button
          onClick={() => setActiveTab('ukk')}
          className={`px-3.5 py-1.5 text-xs font-bold rounded-xl whitespace-nowrap transition ${
            activeTab === 'ukk'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          Lembar Penilaian UKK BNSP
        </button>
        <button
          onClick={() => setActiveTab('portofolio')}
          className={`px-3.5 py-1.5 text-xs font-bold rounded-xl whitespace-nowrap transition ${
            activeTab === 'portofolio'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          e-Portofolio Karya & Sertifikasi Siswa ({mockPortfolios.length})
        </button>
      </div>

      {/* Content: UKK Sheet */}
      {activeTab === 'ukk' && (
        <div className="space-y-6">
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 space-y-4 shadow-xs">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-900 dark:text-white text-sm flex items-center">
                <UserCheck className="w-4 h-4 mr-2 text-blue-600" />
                Asesor Uji Kompetensi Keahlian
              </h3>
              <span className="text-xs text-emerald-600 font-bold bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded">
                Terverifikasi DUDI
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3.5 bg-slate-50 dark:bg-slate-900/60 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1">
                <div className="text-slate-400">Asesor Internal Sekolah:</div>
                <div className="font-bold text-slate-900 dark:text-white">Ustazah Siti Rahmawati, S.Kom., M.T.</div>
                <div className="text-[11px] text-blue-600">No. Reg Asesor BNSP: MET.000.01234</div>
              </div>

              <div className="p-3.5 bg-slate-50 dark:bg-slate-900/60 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1">
                <div className="text-slate-400">Asesor Eksternal (Industri Mitra):</div>
                <div className="font-bold text-slate-900 dark:text-white">Ir. Hendra Wijaya (PT Telkom Indonesia)</div>
                <div className="text-[11px] text-blue-600">Lead Technical Assessor DUDI</div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-700 space-y-3">
              <h4 className="font-bold text-slate-900 dark:text-white text-xs">
                Rincian Unit Kompetensi yang Diujikan:
              </h4>

              <div className="space-y-2 text-xs">
                {[
                  { code: 'J.620100.004.01', name: 'Mengimplementasikan Algoritma Pemrograman', score: 95, status: 'Kompeten' },
                  { code: 'J.620100.017.01', name: 'Mengimplementasikan Pemrograman Berorientasi Objek', score: 94, status: 'Kompeten' },
                  { code: 'J.620100.025.02', name: 'Melakukan Pengujian Perangkat Lunak (Software Testing)', score: 92, status: 'Kompeten' },
                  { code: 'J.620100.033.02', name: 'Menerapkan Akses Basis Data Relasional & NoSQL', score: 96, status: 'Kompeten' },
                ].map((unit, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 flex items-center justify-between"
                  >
                    <div>
                      <span className="font-mono text-[10px] text-slate-400 font-bold">{unit.code}</span>
                      <div className="font-bold text-slate-900 dark:text-white">{unit.name}</div>
                    </div>
                    <div className="text-right">
                      <span className="font-extrabold text-emerald-600">{unit.score}</span>
                      <div className="text-[10px] text-emerald-600 font-semibold">{unit.status}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Content: Portofolio */}
      {activeTab === 'portofolio' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {mockPortfolios.map((port) => (
              <div
                key={port.id}
                className="p-5 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 space-y-3 shadow-xs"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded">
                    Skor Mutu: {port.score}/100
                  </span>
                  <a
                    href={port.demoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs text-blue-600 hover:underline flex items-center"
                  >
                    <span>Demo Aplikasi</span>
                    <ExternalLink className="w-3 h-3 ml-1" />
                  </a>
                </div>

                <h3 className="font-bold text-slate-900 dark:text-white text-base">
                  {port.title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  {port.description}
                </p>

                <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-100 dark:border-slate-700">
                  {port.techStack.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 text-[10px] font-semibold"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
