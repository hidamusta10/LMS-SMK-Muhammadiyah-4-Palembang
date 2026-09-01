import React from 'react';
import {
  UserProfile,
  TeachingFactoryUnit,
} from '../../types';
import {
  School,
  Users,
  Clock,
  TrendingUp,
  Briefcase,
  Factory,
  Award,
  CheckCircle2,
  AlertTriangle,
  BarChart3,
  Sparkles,
  FileSpreadsheet,
} from 'lucide-react';
import { MAJORS_DATA } from '../../data/initialData';

interface PrincipalDashboardProps {
  user: UserProfile;
  tefaUnits: TeachingFactoryUnit[];
  onNavigate: (viewId: string) => void;
}

export const PrincipalDashboard: React.FC<PrincipalDashboardProps> = ({
  user,
  tefaUnits,
  onNavigate,
}) => {
  return (
    <div className="space-y-6">
      
      {/* Principal Hero Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-amber-900 via-slate-900 to-emerald-950 p-6 sm:p-8 text-white shadow-md">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center space-x-4">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-amber-400/80 shadow-md"
            />
            <div className="space-y-1">
              <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-500/20 text-amber-200 border border-amber-400/30">
                <Sparkles className="w-3 h-3 mr-1 text-amber-300" />
                Panel Pengawasan Mutu & Eksekutif
              </div>
              <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight">
                {user.name}
              </h1>
              <p className="text-xs text-amber-100/90 flex items-center gap-2">
                <span>Kepala Sekolah SMK Muhammadiyah 4 Palembang</span>
                <span>•</span>
                <span>Tahun Ajaran: 2025/2026 Genap</span>
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => onNavigate('laporan_admin')}
              className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs rounded-xl shadow-sm flex items-center space-x-1.5 transition"
            >
              <FileSpreadsheet className="w-3.5 h-3.5" />
              <span>Ekspor Laporan Mutu</span>
            </button>
          </div>
        </div>
      </div>

      {/* Strategic Executive Indicators */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700/80 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Kehadiran Siswa Hari Ini</span>
            <Clock className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1">97.8%</div>
          <div className="text-[11px] text-emerald-600 font-semibold mt-1">Guru: 100% Hadir Mengajar</div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700/80 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Penyelesaian Kurikulum</span>
            <TrendingUp className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1">84.2%</div>
          <div className="text-[11px] text-blue-600 font-semibold mt-1">Sesuai Target RPP/Modul</div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700/80 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Siswa Sedang PKL</span>
            <Briefcase className="w-4 h-4 text-teal-600" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1">240 Siswa</div>
          <div className="text-[11px] text-teal-600 font-semibold mt-1">Di 45 DUDI Bintang 5</div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700/80 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Omset TEFA Bulan Ini</span>
            <Factory className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1">Rp 55,5 Jt</div>
          <div className="text-[11px] text-amber-600 font-semibold mt-1">Dari 5 Unit Produksi TEFA</div>
        </div>

      </div>

      {/* Program Keahlian Breakdown */}
      <div className="bg-white dark:bg-slate-800/90 rounded-2xl border border-slate-200 dark:border-slate-700/80 p-5 space-y-4 shadow-xs">
        <h2 className="text-sm font-bold text-slate-900 dark:text-white flex items-center">
          <School className="w-4 h-4 mr-2 text-emerald-600" />
          Rekap Ketercapaian per Program Keahlian
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {MAJORS_DATA.map((major) => (
            <div
              key={major.code}
              className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 space-y-2 text-xs"
            >
              <div className="font-bold text-slate-900 dark:text-white text-sm">
                {major.code}
              </div>
              <div className="text-slate-500 text-[11px] line-clamp-1">{major.name}</div>
              <div className="pt-2 border-t border-slate-200 dark:border-slate-700 space-y-1">
                <div className="flex justify-between">
                  <span className="text-slate-400">Ketuntasan:</span>
                  <span className="font-bold text-emerald-600">94.5%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">UKK Siap:</span>
                  <span className="font-bold text-blue-600">100%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
