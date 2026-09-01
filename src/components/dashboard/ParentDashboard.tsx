import React from 'react';
import {
  UserProfile,
  AssignmentItem,
  GradeRecord,
  AttendanceRecord,
  PKLRecord,
} from '../../types';
import {
  User,
  Clock,
  CheckCircle2,
  Calendar,
  BookOpen,
  Award,
  AlertCircle,
  Briefcase,
  MessageSquare,
  Sparkles,
  Phone,
} from 'lucide-react';

interface ParentDashboardProps {
  user: UserProfile;
  assignments: AssignmentItem[];
  grades: GradeRecord[];
  attendance: AttendanceRecord[];
  pklRecord: PKLRecord;
  onNavigate: (viewId: string) => void;
}

export const ParentDashboard: React.FC<ParentDashboardProps> = ({
  user,
  assignments,
  grades,
  attendance,
  pklRecord,
  onNavigate,
}) => {
  return (
    <div className="space-y-6">
      
      {/* Hero Banner for Parent */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-rose-900 via-pink-900 to-slate-900 p-6 sm:p-8 text-white shadow-md">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center space-x-4">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-rose-400/80 shadow-md"
            />
            <div className="space-y-1">
              <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-rose-500/20 text-rose-200 border border-rose-400/30">
                <Sparkles className="w-3 h-3 mr-1 text-amber-300" />
                Portal Pantauan Orang Tua / Wali
              </div>
              <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight">
                Assalamu’alaikum, Bapak {user.name}
              </h1>
              <p className="text-xs text-rose-100/90 flex items-center gap-2">
                <span>Memantau Ananda: <strong>Muhammad Farhan Al-Ghifari (XII RPL 1)</strong></span>
                <span>•</span>
                <span>NIS: 23241042</span>
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => onNavigate('pesan_forum')}
              className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl shadow-sm flex items-center space-x-1.5 transition"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Hubungi Wali Kelas</span>
            </button>
          </div>
        </div>
      </div>

      {/* Child Vital Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700/80 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Kehadiran Ananda</span>
            <Clock className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1">98.2%</div>
          <div className="text-[11px] text-emerald-600 font-semibold mt-1">
            Tertib (1x Izin Sakit)
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700/80 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Rata-Rata Nilai</span>
            <Award className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1">89.7</div>
          <div className="text-[11px] text-blue-600 font-semibold mt-1">
            Predikat: A (Sangat Baik)
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700/80 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Tugas Selesai</span>
            <CheckCircle2 className="w-4 h-4 text-teal-600" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1">100%</div>
          <div className="text-[11px] text-teal-600 font-semibold mt-1">
            Semua tugas dikumpulkan tepat waktu
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700/80 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Hasil PKL Industri</span>
            <Briefcase className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1">93.8</div>
          <div className="text-[11px] text-amber-600 font-semibold mt-1">
            PT Telkom Witel Sumsel (Lulus)
          </div>
        </div>

      </div>

      {/* Detail Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Tugas & Catatan Guru */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700/80 space-y-3 shadow-xs">
          <h2 className="text-sm font-bold text-slate-900 dark:text-white flex items-center">
            <BookOpen className="w-4 h-4 mr-2 text-rose-500" />
            Catatan Guru Pengampu Terhadap Ananda
          </h2>

          <div className="space-y-3 text-xs">
            {grades.slice(0, 2).map((gr) => (
              <div key={gr.id} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 space-y-1">
                <div className="flex justify-between font-bold text-slate-900 dark:text-white">
                  <span>{gr.subjectName}</span>
                  <span className="text-emerald-600 font-extrabold">Nilai: {gr.finalScore}</span>
                </div>
                <p className="text-slate-600 dark:text-slate-300 italic">
                  "{gr.teacherNote}"
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Informasi Kontak Wali Kelas & Konsultasi */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700/80 space-y-3 shadow-xs">
          <h2 className="text-sm font-bold text-slate-900 dark:text-white flex items-center">
            <User className="w-4 h-4 mr-2 text-purple-600" />
            Wali Kelas & Layanan Konsultasi
          </h2>

          <div className="p-4 rounded-xl bg-purple-50/60 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800/70 text-xs space-y-2">
            <div className="font-bold text-slate-900 dark:text-white text-sm">
              Bustamam Arifin, S.Pd., M.Si.
            </div>
            <div className="text-slate-600 dark:text-slate-300">
              Wali Kelas XII RPL 1 & Guru Matematika
            </div>
            <div className="flex items-center space-x-2 text-emerald-700 dark:text-emerald-400 font-semibold pt-1">
              <Phone className="w-3.5 h-3.5" />
              <span>0813-8899-1122 (Layanan Konsultasi Sekolah)</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
