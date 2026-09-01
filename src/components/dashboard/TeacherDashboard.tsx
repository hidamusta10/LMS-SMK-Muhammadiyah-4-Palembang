import React from 'react';
import {
  UserProfile,
  ClassSubject,
  AssignmentItem,
  TeachingJournal,
} from '../../types';
import {
  Calendar,
  BookOpen,
  CheckSquare,
  Users,
  PlusCircle,
  Clock,
  TrendingUp,
  FileSpreadsheet,
  AlertTriangle,
  Award,
  ArrowRight,
  MessageSquare,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';

interface TeacherDashboardProps {
  user: UserProfile;
  classes: ClassSubject[];
  assignments: AssignmentItem[];
  journals: TeachingJournal[];
  onNavigate: (viewId: string) => void;
  onOpenCreateModal: (type: 'materi' | 'tugas' | 'ujian' | 'jurnal') => void;
}

export const TeacherDashboard: React.FC<TeacherDashboardProps> = ({
  user,
  classes,
  assignments,
  journals,
  onNavigate,
  onOpenCreateModal,
}) => {
  return (
    <div className="space-y-6">
      {/* School Portal Identity Title Bar */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 sm:p-5 shadow-xs flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center space-x-3.5">
          <div className="w-10 h-10 rounded-xl bg-emerald-700 text-yellow-300 flex items-center justify-center font-black text-sm shadow-xs shrink-0 border border-yellow-400/50">
            M4
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white tracking-tight">
                SMK Muhammadiyah 4 Palembang
              </h2>
              <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-extrabold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 uppercase tracking-wider">
                Portal Guru
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">
              Learning Management System & Portal Terintegrasi
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2 text-xs text-slate-500 dark:text-slate-400 font-medium">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Semester Genap TP 2025/2026</span>
        </div>
      </div>

      {/* Teacher Hero Bento Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-emerald-800 border-2 border-emerald-700 p-6 sm:p-8 text-white shadow-md">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center space-x-4 sm:space-x-5">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-yellow-400 shadow-md shrink-0"
            />
            <div className="space-y-1">
              <div className="inline-flex items-center px-3 py-0.5 rounded-full text-[11px] font-extrabold bg-yellow-400 text-emerald-950 uppercase tracking-wider">
                <Sparkles className="w-3 h-3 mr-1 text-emerald-950" />
                NIP/NBM: {user.nisOrNip} / {user.nbm}
              </div>
              <h1 className="text-xl sm:text-2xl font-black tracking-tight">
                Assalamu’alaikum, {user.name}
              </h1>
              <p className="text-xs text-emerald-100/90 flex flex-wrap items-center gap-x-3 gap-y-1">
                <span><strong>Jabatan:</strong> {user.classOrPosition}</span>
                <span>•</span>
                <span>Tahun Ajaran: <strong>2025/2026 Genap</strong></span>
              </p>
            </div>
          </div>

          {/* Quick Actions for Teacher in Bento Header */}
          <div className="flex flex-wrap gap-2.5">
            <button
              onClick={() => onOpenCreateModal('materi')}
              className="px-3.5 py-2.5 bg-yellow-400 hover:bg-yellow-300 text-emerald-950 font-bold text-xs rounded-xl shadow-xs flex items-center space-x-1.5 transition"
            >
              <PlusCircle className="w-4 h-4" />
              <span>+ Buat Modul Ajar</span>
            </button>
            <button
              onClick={() => onOpenCreateModal('tugas')}
              className="px-3.5 py-2.5 bg-white/10 hover:bg-white/20 text-white font-bold text-xs rounded-xl border border-white/20 flex items-center space-x-1.5 transition backdrop-blur-xs"
            >
              <PlusCircle className="w-4 h-4 text-yellow-300" />
              <span>+ Tugas / Jobsheet</span>
            </button>
            <button
              onClick={() => onOpenCreateModal('ujian')}
              className="px-3.5 py-2.5 bg-white/10 hover:bg-white/20 text-white font-bold text-xs rounded-xl border border-white/20 flex items-center space-x-1.5 transition backdrop-blur-xs"
            >
              <PlusCircle className="w-4 h-4 text-yellow-300" />
              <span>+ Asesmen CBT</span>
            </button>
          </div>
        </div>
      </div>

      {/* Metrics Row Bento Tiles */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div
          onClick={() => onNavigate('tugas')}
          className="p-5 rounded-3xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 shadow-sm hover:border-rose-500 transition cursor-pointer"
        >
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span className="font-extrabold uppercase text-[10px] tracking-wider">Tugas Perlu Dinilai</span>
            <CheckSquare className="w-4 h-4 text-rose-500" />
          </div>
          <div className="text-3xl font-black text-slate-900 dark:text-white mt-2">
            12 Berkas
          </div>
          <div className="text-[11px] text-rose-600 font-bold mt-1">
            4 kelas menunggu penilaian
          </div>
        </div>

        <div
          onClick={() => onNavigate('kelas_saya')}
          className="p-5 rounded-3xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 shadow-sm hover:border-blue-500 transition cursor-pointer"
        >
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span className="font-extrabold uppercase text-[10px] tracking-wider">Total Siswa Diampu</span>
            <Users className="w-4 h-4 text-blue-500" />
          </div>
          <div className="text-3xl font-black text-slate-900 dark:text-white mt-2">
            96 Siswa
          </div>
          <div className="text-[11px] text-blue-600 font-bold mt-1">
            3 Rombel (XII RPL 1, 2, XI RPL)
          </div>
        </div>

        <div
          onClick={() => onNavigate('jurnal_mengajar')}
          className="p-5 rounded-3xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 shadow-sm hover:border-emerald-500 transition cursor-pointer"
        >
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span className="font-extrabold uppercase text-[10px] tracking-wider">Jurnal Mengajar</span>
            <FileSpreadsheet className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-3xl font-black text-emerald-700 dark:text-emerald-400 mt-2">
            100%
          </div>
          <div className="text-[11px] text-emerald-600 font-bold mt-1 flex items-center">
            <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
            Tervalidasi Waka Kurikulum
          </div>
        </div>

        <div
          onClick={() => onNavigate('penilaian_remedial')}
          className="p-5 rounded-3xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 shadow-sm hover:border-amber-500 transition cursor-pointer"
        >
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span className="font-extrabold uppercase text-[10px] tracking-wider">Ketuntasan KKTP</span>
            <TrendingUp className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-3xl font-black text-amber-600 dark:text-amber-400 mt-2">
            92.4%
          </div>
          <div className="text-[11px] text-amber-600 font-bold mt-1">
            3 Siswa Perlu Remedial
          </div>
        </div>

      </div>

      {/* Main Grid: Jadwal Mengajar Hari Ini & Kelas yang Diampu */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        
        {/* Left Column: Jadwal Mengajar & Jurnal Hari Ini */}
        <div className="lg:col-span-7 space-y-5">
          
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-emerald-700" />
                Jadwal Mengajar Hari Ini (Senin)
              </h2>
              <button
                onClick={() => onNavigate('jadwal')}
                className="text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:underline"
              >
                Lihat Semua Jadwal
              </button>
            </div>

            <div className="space-y-3">
              <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 flex items-start justify-between text-xs">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-mono font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-200 dark:bg-emerald-900 px-2 py-0.5 rounded text-[11px]">
                      07.30 - 11.45 WIB
                    </span>
                    <span className="font-bold text-slate-900 dark:text-white text-sm">
                      Pemrograman Web & Perangkat Bergerak
                    </span>
                  </div>
                  <div className="text-slate-600 dark:text-slate-300 text-xs">
                    Kelas: <strong>XII RPL 1</strong> (32 Siswa) • Lab Komputer RPL 1
                  </div>
                  <div className="text-xs text-emerald-700 dark:text-emerald-400 font-bold">
                    Topik: Implementasi REST API & Autentikasi JWT
                  </div>
                </div>

                <button
                  onClick={() => onNavigate('jurnal_mengajar')}
                  className="px-3.5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl text-xs transition shrink-0 ml-2"
                >
                  Isi Jurnal
                </button>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-start justify-between text-xs">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-mono font-bold text-slate-700 dark:text-slate-300 bg-slate-200 dark:bg-slate-700 px-2 py-0.5 rounded text-[11px]">
                      13.00 - 15.15 WIB
                    </span>
                    <span className="font-bold text-slate-900 dark:text-white text-sm">
                      Bimbingan Proyek Teaching Factory (TEFA)
                    </span>
                  </div>
                  <div className="text-slate-600 dark:text-slate-300 text-xs">
                    Unit: <strong>Muhammadiyah Software House</strong> • Inkubator TEFA
                  </div>
                </div>

                <button
                  onClick={() => onNavigate('tefa')}
                  className="px-3.5 py-2 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 text-slate-800 dark:text-slate-200 font-bold rounded-xl text-xs transition shrink-0 ml-2"
                >
                  Pantau
                </button>
              </div>
            </div>
          </div>

          {/* Kelas yang Diampu */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center">
              <BookOpen className="w-5 h-5 mr-2 text-blue-600" />
              Daftar Rombel & Mata Pelajaran Diampu
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {classes.map((cls) => (
                <div
                  key={cls.id}
                  onClick={() => onNavigate('kelas_saya')}
                  className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 hover:border-emerald-500 transition cursor-pointer text-xs space-y-2"
                >
                  <div className="font-bold text-slate-900 dark:text-white truncate text-sm">
                    {cls.name}
                  </div>
                  <div className="text-[11px] text-slate-500 flex justify-between">
                    <span>Tingkat: <strong>{cls.gradeLevel} {cls.major}</strong></span>
                    <span>{cls.totalStudents} Siswa</span>
                  </div>
                  <div className="text-xs text-emerald-700 dark:text-emerald-400 font-bold">
                    {cls.materialsCount} Modul Ajar • {cls.assignmentsCount} Tugas
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column: Antrian Pemeriksaan & Remedial */}
        <div className="lg:col-span-5 space-y-5">
          
          {/* Antrian Pemeriksaan Tugas */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center">
                <CheckSquare className="w-4 h-4 mr-2 text-rose-500" />
                Antrian Pemeriksaan Tugas
              </h2>
              <button
                onClick={() => onNavigate('tugas')}
                className="text-xs font-bold text-rose-600 hover:underline"
              >
                Buka Penilaian
              </button>
            </div>

            <div className="space-y-3">
              <div className="p-3.5 rounded-2xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/50 text-xs space-y-1">
                <div className="flex justify-between font-bold text-slate-900 dark:text-white">
                  <span>Tugas Praktik 4: RBAC Auth</span>
                  <span className="text-rose-600 font-black">8 Masuk</span>
                </div>
                <div className="text-[11px] text-slate-500">Kelas: XII RPL 1</div>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs space-y-1">
                <div className="flex justify-between font-bold text-slate-900 dark:text-white">
                  <span>Laporan Proyek TEFA UMKM</span>
                  <span className="text-slate-500 font-black">4 Masuk</span>
                </div>
                <div className="text-[11px] text-slate-500">Kelas: XII RPL 2</div>
              </div>
            </div>
          </div>

          {/* Siswa Perlu Remedial / Pendampingan */}
          <div className="p-6 rounded-3xl bg-amber-50 dark:bg-amber-950/30 border-2 border-amber-200 dark:border-amber-900/60 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-amber-900 dark:text-amber-200 flex items-center">
                <AlertTriangle className="w-4 h-4 mr-2 text-amber-600" />
                Siswa Remedial (Di bawah KKTP)
              </h2>
              <span className="text-[10px] font-black px-2.5 py-0.5 rounded-full bg-amber-200 dark:bg-amber-900 text-amber-900 dark:text-amber-200">
                3 Siswa
              </span>
            </div>

            <div className="text-xs text-slate-700 dark:text-slate-300 space-y-2">
              <div className="p-3 bg-white dark:bg-slate-800 rounded-2xl border border-amber-200 dark:border-amber-800 flex justify-between items-center">
                <div>
                  <div className="font-bold">Bagas Pratama (XII RPL 1)</div>
                  <div className="text-[11px] text-slate-500">Skor Kuis: 68 (KKTP: 75)</div>
                </div>
                <button
                  onClick={() => onNavigate('penilaian_remedial')}
                  className="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-xl text-[11px]"
                >
                  Beri Remedial
                </button>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
