import React from 'react';
import {
  UserProfile,
  ClassSubject,
  AssignmentItem,
  ExamItem,
  ScheduleEvent,
  AnnouncementItem,
  PKLRecord,
} from '../../types';
import {
  Clock,
  CheckCircle2,
  CheckSquare,
  Calendar,
  BookOpen,
  Award,
  AlertCircle,
  Briefcase,
  ArrowRight,
  TrendingUp,
  Flame,
  FileText,
  MessageSquare,
  Sparkles,
  Play,
} from 'lucide-react';

interface StudentDashboardProps {
  user: UserProfile;
  classes: ClassSubject[];
  assignments: AssignmentItem[];
  exams: ExamItem[];
  schedule: ScheduleEvent[];
  announcements: AnnouncementItem[];
  pklRecord: PKLRecord;
  onNavigate: (viewId: string) => void;
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({
  user,
  classes,
  assignments,
  exams,
  schedule,
  announcements,
  pklRecord,
  onNavigate,
}) => {
  const pendingAssignments = assignments.filter(
    (a) => a.status !== 'sudah_dinilai' && a.status !== 'selesai'
  );
  const activeExams = exams.filter((e) => e.status === 'active' || e.status === 'upcoming');
  const todaySchedule = schedule.filter((s) => s.day === 'Senin' || s.day === 'Selasa');

  return (
    <div className="space-y-6">
      
      {/* 1. Student Identity Hero Bento Banner */}
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
                Siswa Aktif TP 2025/2026 Genap
              </div>
              <h1 className="text-xl sm:text-2xl font-black tracking-tight">
                Assalamu’alaikum, {user.name}
              </h1>
              <p className="text-xs text-emerald-100/90 flex flex-wrap items-center gap-x-3 gap-y-1">
                <span><strong>NIS:</strong> {user.nisOrNip}</span>
                <span>•</span>
                <span><strong>NISN:</strong> {user.nisn}</span>
                <span>•</span>
                <span><strong>Kelas:</strong> {user.classOrPosition}</span>
                <span>•</span>
                <span className="text-yellow-300 font-bold">{user.majorFullName}</span>
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2.5">
            <button
              onClick={() => onNavigate('kelas_saya')}
              className="px-4 py-2.5 bg-yellow-400 hover:bg-yellow-300 text-emerald-950 font-bold text-xs rounded-xl shadow-xs flex items-center space-x-2 transition"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Buka Kelas Aktif</span>
            </button>
            <button
              onClick={() => onNavigate('ujian')}
              className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white font-semibold text-xs rounded-xl border border-white/20 flex items-center space-x-1.5 transition backdrop-blur-xs"
            >
              <Award className="w-3.5 h-3.5 text-yellow-300" />
              <span>Portal CBT Online</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Main Bento Grid Tiles */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
        
        {/* Tile 1: Pusat Pembelajaran (Col 4) */}
        <div className="md:col-span-12 lg:col-span-4 bg-white dark:bg-slate-900 rounded-3xl border-2 border-slate-200 dark:border-slate-800 p-6 flex flex-col justify-between shadow-sm">
          <div>
            <div className="bg-emerald-100 dark:bg-emerald-950/60 w-12 h-12 rounded-2xl flex items-center justify-center mb-4 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
              <BookOpen className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-1">
              Pusat Pembelajaran
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-xs mb-5">
              Akses modul ajar digital, jobsheet bengkel/lab, dan video pembelajaran kejuruan.
            </p>

            <div className="space-y-2.5">
              {classes.slice(0, 3).map((cls) => (
                <div
                  key={cls.id}
                  onClick={() => onNavigate('materi')}
                  className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-100 dark:border-slate-700 flex justify-between items-center cursor-pointer hover:border-emerald-300 dark:hover:border-emerald-700 transition"
                >
                  <div className="truncate mr-2">
                    <div className="text-xs font-bold text-slate-800 dark:text-slate-100 truncate">
                      {cls.name}
                    </div>
                    <div className="text-[10px] text-slate-400">
                      {(cls.teacher || (cls as any).teacherName || 'Guru Pengampu').split(',')[0]}
                    </div>
                  </div>
                  <span className="bg-emerald-700 text-white text-[10px] font-bold px-2.5 py-1 rounded-full shrink-0">
                    {cls.progressPercent}%
                  </span>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => onNavigate('kelas_saya')}
            className="mt-5 w-full py-3 bg-emerald-700 text-white rounded-xl font-bold hover:bg-emerald-800 transition-colors text-xs flex items-center justify-center space-x-1.5 shadow-xs"
          >
            <span>Buka Seluruh Ruang Kelas</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Tile 2: Asesmen & Ujian Sesi Berlangsung (Col 5) */}
        <div className="md:col-span-12 lg:col-span-5 bg-white dark:bg-slate-900 rounded-3xl border-2 border-slate-200 dark:border-slate-800 p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start mb-4">
              <div className="bg-blue-100 dark:bg-blue-950/60 w-12 h-12 rounded-2xl flex items-center justify-center text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                <FileText className="w-6 h-6" />
              </div>
              <div className="text-right">
                <p className="text-[10px] text-slate-400 uppercase font-extrabold tracking-wider">
                  Asesmen & CBT
                </p>
                <p className="text-sm font-black text-slate-800 dark:text-slate-100">
                  Sesi Terjadwal
                </p>
              </div>
            </div>

            <div className="bg-slate-50 dark:bg-slate-800/60 rounded-2xl p-4 mb-4 border border-slate-100 dark:border-slate-700">
              <div className="flex justify-between items-center">
                <p className="text-[11px] font-extrabold text-blue-600 dark:text-blue-400 uppercase tracking-wide">
                  UJIAN TENGAH SEMESTER (STS)
                </p>
                <span className="text-[10px] font-mono bg-blue-100 dark:bg-blue-900/60 text-blue-800 dark:text-blue-200 px-2 py-0.5 rounded font-bold">
                  TOKEN: SMART4
                </span>
              </div>
              <p className="text-xs font-bold text-slate-800 dark:text-slate-100 mt-1">
                Praktikum Dasar Sistem Jaringan & Pemrograman Web
              </p>
              <div className="w-full bg-slate-200 dark:bg-slate-700 h-2.5 rounded-full mt-3 overflow-hidden">
                <div className="bg-blue-600 h-full w-[75%] rounded-full"></div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3.5 border border-slate-100 dark:border-slate-700 rounded-2xl bg-slate-50 dark:bg-slate-800/60">
                <p className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-bold">Presensi Kelas</p>
                <p className="text-xl font-black text-slate-800 dark:text-white mt-0.5">34/36 Hadir</p>
              </div>
              <div className="p-3.5 border border-slate-100 dark:border-slate-700 rounded-2xl bg-slate-50 dark:bg-slate-800/60">
                <p className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-bold">Waktu Ujian</p>
                <p className="text-xl font-black text-blue-600 dark:text-blue-400 mt-0.5 font-mono">90 Menit</p>
              </div>
            </div>
          </div>

          <button
            onClick={() => onNavigate('ujian')}
            className="mt-4 w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-xs transition"
          >
            Masuk ke Ruang Ujian CBT
          </button>
        </div>

        {/* Tile 3: Kegiatan Khas SMK (Col 3) */}
        <div className="md:col-span-12 lg:col-span-3 bg-white dark:bg-slate-900 rounded-3xl border-2 border-slate-200 dark:border-slate-800 p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="bg-yellow-100 dark:bg-yellow-950/60 w-12 h-12 rounded-2xl flex items-center justify-center mb-4 text-yellow-800 dark:text-yellow-300 border border-yellow-200 dark:border-yellow-800">
              <Briefcase className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-1">
              Kegiatan Khas SMK
            </h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mb-4">
              Monitoring PKL Industri & Unit TEFA.
            </p>

            <div className="space-y-1.5">
              <div
                onClick={() => onNavigate('pkl')}
                className="flex items-center gap-2.5 p-2.5 hover:bg-slate-50 dark:hover:bg-slate-800/80 rounded-xl cursor-pointer border border-transparent hover:border-slate-200 dark:hover:border-slate-700 transition"
              >
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500 shrink-0"></div>
                <span className="text-xs font-bold text-slate-700 dark:text-slate-200">Jurnal Harian PKL</span>
              </div>
              <div
                onClick={() => onNavigate('tefa')}
                className="flex items-center gap-2.5 p-2.5 hover:bg-slate-50 dark:hover:bg-slate-800/80 rounded-xl cursor-pointer border border-transparent hover:border-slate-200 dark:hover:border-slate-700 transition"
              >
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0"></div>
                <span className="text-xs font-bold text-slate-700 dark:text-slate-200">Teaching Factory (TEFA)</span>
              </div>
              <div
                onClick={() => onNavigate('ukk')}
                className="flex items-center gap-2.5 p-2.5 hover:bg-slate-50 dark:hover:bg-slate-800/80 rounded-xl cursor-pointer border border-transparent hover:border-slate-200 dark:hover:border-slate-700 transition"
              >
                <div className="w-2.5 h-2.5 rounded-full bg-blue-500 shrink-0"></div>
                <span className="text-xs font-bold text-slate-700 dark:text-slate-200">Sertifikasi & UKK LSP</span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-500 flex items-center justify-between">
            <span>Mitra: <strong>PT Telkom</strong></span>
            <span className="text-emerald-600 font-bold">Aktif</span>
          </div>
        </div>

        {/* Tile 4: Komunikasi Dark Bento Block (Col 4) */}
        <div className="md:col-span-12 lg:col-span-4 bg-slate-800 text-white rounded-3xl p-6 shadow-lg border border-slate-700 flex flex-col justify-between">
          <div>
            <div className="bg-emerald-500 w-11 h-11 rounded-2xl flex items-center justify-center mb-4 text-slate-950 font-bold">
              <MessageSquare className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-lg font-bold mb-1">Pesan & Forum</h3>
            <p className="text-xs text-slate-300 mb-4">Pemberitahuan guru dan forum diskusi mapel.</p>

            <div className="space-y-3">
              <div className="flex items-start gap-3 p-2.5 rounded-xl bg-slate-700/50 border border-slate-600/50">
                <div className="w-8 h-8 rounded-full bg-emerald-700 flex items-center justify-center font-bold text-xs shrink-0">
                  SR
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] text-emerald-400 font-extrabold uppercase">GURU PEMROGRAMAN</p>
                  <p className="text-xs truncate font-medium">Pengumpulan jobsheet Praktikum 4 ditunggu...</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-2.5 rounded-xl bg-slate-700/50 border border-slate-600/50">
                <div className="w-8 h-8 rounded-full bg-blue-700 flex items-center justify-center font-bold text-xs shrink-0">
                  BK
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] text-blue-400 font-extrabold uppercase">GURU BK / KONSELOR</p>
                  <p className="text-xs truncate font-medium">Bimbingan karier DUDI gelombang 2 dibuka...</p>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={() => onNavigate('pesan_forum')}
            className="mt-4 w-full py-2.5 bg-slate-700 hover:bg-slate-600 text-white rounded-xl font-bold text-xs transition"
          >
            Buka Forum Diskusi
          </button>
        </div>

        {/* Tile 5: Administrasi Akademik & Capaian (Col 5) */}
        <div className="md:col-span-12 lg:col-span-5 bg-white dark:bg-slate-900 rounded-3xl border-2 border-slate-200 dark:border-slate-800 p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-slate-800 dark:text-white">Administrasi Akademik Siswa</h3>
              <span className="text-[10px] bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full font-bold text-slate-600 dark:text-slate-300 uppercase tracking-tight">
                Data Terintegrasi
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 my-2">
              <div className="flex flex-col justify-center border-r border-slate-100 dark:border-slate-800 pr-4">
                <p className="text-[10px] text-slate-400 uppercase font-extrabold">Rata-Rata Capaian (IP)</p>
                <p className="text-3xl font-black text-emerald-700 dark:text-emerald-400">89.7</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Predikat: A (Sangat Baik)</p>
              </div>
              <div className="flex flex-col justify-center pl-4">
                <p className="text-[10px] text-slate-400 uppercase font-extrabold">Tingkat Kehadiran</p>
                <p className="text-3xl font-black text-blue-600 dark:text-blue-400">98.2%</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Target: Min 95.0%</p>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-wrap gap-4 text-xs">
            <span onClick={() => onNavigate('nilai')} className="text-emerald-700 dark:text-emerald-400 font-bold hover:underline cursor-pointer">
              Lihat Rapor Lengkap
            </span>
            <span onClick={() => onNavigate('kehadiran')} className="text-slate-500 dark:text-slate-400 hover:underline cursor-pointer">
              Rekap Presensi
            </span>
            <span onClick={() => onNavigate('tugas')} className="text-slate-500 dark:text-slate-400 hover:underline cursor-pointer">
              Tugas & Portofolio
            </span>
          </div>
        </div>

        {/* Tile 6: Bantuan & ISMUBA Support Block (Col 3) */}
        <div className="md:col-span-12 lg:col-span-3 bg-emerald-50 dark:bg-emerald-950/40 rounded-3xl border-2 border-emerald-100 dark:border-emerald-900/50 p-6 flex flex-col justify-between shadow-sm">
          <div>
            <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-200 dark:bg-emerald-900 text-emerald-900 dark:text-emerald-100 uppercase tracking-wider mb-2">
              Karakter & Bantuan
            </div>
            <h3 className="font-extrabold text-emerald-900 dark:text-emerald-200 text-base">
              Ibadah & Helpdesk
            </h3>
            <p className="text-xs text-emerald-700 dark:text-emerald-400 mt-1">
              Catat ibadah harian ISMUBA atau hubungi tim bantuan jika kendala teknis.
            </p>
          </div>

          <div className="mt-4 flex gap-2">
            <button
              onClick={() => onNavigate('ismuba')}
              className="flex-1 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl font-bold text-xs transition"
            >
              Catat Ibadah
            </button>
            <button
              onClick={() => onNavigate('bantuan')}
              className="px-3 py-2.5 bg-white dark:bg-slate-800 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 rounded-xl font-bold text-xs transition"
              title="Helpdesk IT"
            >
              IT Help
            </button>
          </div>
        </div>

      </div>

      {/* 3. Detailed Schedule & Tasks Bento Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        
        {/* Jadwal Pembelajaran Hari Ini */}
        <div className="lg:col-span-7 p-6 rounded-3xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center">
              <Calendar className="w-5 h-5 mr-2 text-emerald-700" />
              Jadwal Pembelajaran Hari Ini
            </h3>
            <button
              onClick={() => onNavigate('jadwal')}
              className="text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:underline"
            >
              Lihat Kalender Lengkap
            </button>
          </div>

          <div className="space-y-3">
            {todaySchedule.slice(0, 3).map((item) => (
              <div
                key={item.id}
                className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/80 flex items-start justify-between text-xs"
              >
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-mono font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950/80 px-2 py-0.5 rounded-md text-[11px]">
                      {item.timeStart} - {item.timeEnd}
                    </span>
                    <span className="font-bold text-slate-900 dark:text-white">
                      {item.subjectOrActivity}
                    </span>
                  </div>
                  <div className="text-slate-500 dark:text-slate-400 text-[11px]">
                    Pengampu: {item.teacherOrSupervisor} • Ruang: <strong>{item.roomOrVenue}</strong>
                  </div>
                </div>
                <button
                  onClick={() => onNavigate('kelas_saya')}
                  className="px-3 py-1.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-[11px] transition shrink-0 ml-2"
                >
                  Masuk
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Tugas Menunggu Pengumpulan */}
        <div className="lg:col-span-5 p-6 rounded-3xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center">
              <CheckSquare className="w-5 h-5 mr-2 text-amber-600" />
              Tugas & Proyek Menunggu
            </h3>
            <button
              onClick={() => onNavigate('tugas')}
              className="text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline"
            >
              Semua ({pendingAssignments.length})
            </button>
          </div>

          <div className="space-y-3">
            {assignments.slice(0, 3).map((asg) => (
              <div
                key={asg.id}
                className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/80 text-xs space-y-2"
              >
                <div className="flex items-start justify-between gap-2">
                  <h4 className="font-bold text-slate-900 dark:text-white leading-snug">
                    {asg.title}
                  </h4>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${
                      asg.status === 'sudah_dinilai'
                        ? 'bg-emerald-100 text-emerald-800'
                        : asg.status === 'sudah_dikumpulkan'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {asg.status.replace('_', ' ')}
                  </span>
                </div>

                <div className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center justify-between">
                  <span>Batas: <strong>{asg.dueDate}</strong></span>
                  {asg.studentScore ? (
                    <span className="text-emerald-600 font-bold">Skor: {asg.studentScore}</span>
                  ) : (
                    <button
                      onClick={() => onNavigate('tugas')}
                      className="text-emerald-700 dark:text-emerald-400 font-bold hover:underline"
                    >
                      Kirim Tugas
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
