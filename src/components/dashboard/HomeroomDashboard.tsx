import React from 'react';
import {
  UserProfile,
  DisciplineRecord,
  AttendanceRecord,
} from '../../types';
import {
  Users,
  Clock,
  BarChart3,
  ShieldAlert,
  MessageSquare,
  FileSpreadsheet,
  CheckCircle2,
  AlertCircle,
  Printer,
  Sparkles,
} from 'lucide-react';

interface HomeroomDashboardProps {
  user: UserProfile;
  disciplineRecords: DisciplineRecord[];
  onNavigate: (viewId: string) => void;
}

export const HomeroomDashboard: React.FC<HomeroomDashboardProps> = ({
  user,
  disciplineRecords,
  onNavigate,
}) => {
  const studentsList = [
    { nis: '23241042', name: 'Muhammad Farhan Al-Ghifari', attendance: '98%', avgScore: 89.7, status: 'Sangat Baik', merits: 25, violations: 2 },
    { nis: '23241005', name: 'Ahmad Rizky Pratama', attendance: '96%', avgScore: 86.4, status: 'Baik', merits: 10, violations: 0 },
    { nis: '23241012', name: 'Bagas Pratama', attendance: '91%', avgScore: 72.5, status: 'Perlu Pendampingan', merits: 0, violations: 5 },
    { nis: '23241028', name: 'Nabila Putri Cahyani', attendance: '100%', avgScore: 92.1, status: 'Sangat Baik', merits: 15, violations: 0 },
    { nis: '23241033', name: 'Zahra Amelia', attendance: '97%', avgScore: 88.0, status: 'Baik', merits: 5, violations: 0 },
  ];

  return (
    <div className="space-y-6">
      
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 p-6 sm:p-8 text-white shadow-md">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center space-x-4">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-purple-400/80 shadow-md"
            />
            <div className="space-y-1">
              <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-purple-500/20 text-purple-200 border border-purple-400/30">
                <Sparkles className="w-3 h-3 mr-1 text-amber-300" />
                Wali Kelas Binaan
              </div>
              <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight">
                {user.name}
              </h1>
              <p className="text-xs text-purple-100/90 flex items-center gap-2">
                <span>Rombongan Belajar: <strong>XII RPL 1 (32 Siswa)</strong></span>
                <span>•</span>
                <span>Tahun Ajaran: 2025/2026 Genap</span>
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => window.print()}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs rounded-xl shadow-sm flex items-center space-x-2 transition"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Cetak Laporan Wali Kelas</span>
            </button>
          </div>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700/80 shadow-xs">
          <div className="text-xs text-slate-500">Jumlah Siswa Binaan</div>
          <div className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1">32 Orang</div>
          <div className="text-[11px] text-purple-600 font-semibold mt-1">18 Laki-laki / 14 Perempuan</div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700/80 shadow-xs">
          <div className="text-xs text-slate-500">Kehadiran Kelas Hari Ini</div>
          <div className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1">96.8%</div>
          <div className="text-[11px] text-emerald-600 font-semibold mt-1">31 Hadir / 1 Izin Sakit</div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700/80 shadow-xs">
          <div className="text-xs text-slate-500">Rata-Rata Nilai Rombel</div>
          <div className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1">87.4</div>
          <div className="text-[11px] text-blue-600 font-semibold mt-1">Ketuntasan: 96.8%</div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700/80 shadow-xs">
          <div className="text-xs text-slate-500">Siswa Butuh Pendampingan</div>
          <div className="text-2xl font-extrabold text-rose-600 mt-1">1 Siswa</div>
          <div className="text-[11px] text-rose-500 font-semibold mt-1">Koordinasi Guru BK & Ortu</div>
        </div>
      </div>

      {/* Roster & Progress Table */}
      <div className="bg-white dark:bg-slate-800/90 rounded-2xl border border-slate-200 dark:border-slate-700/80 p-5 space-y-4 shadow-xs">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-slate-900 dark:text-white flex items-center">
            <Users className="w-4 h-4 mr-2 text-purple-600" />
            Leger Ringkas & Pantauan Siswa Kelas XII RPL 1
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 dark:bg-slate-900/60 text-slate-500 uppercase">
              <tr>
                <th className="p-3">NIS</th>
                <th className="p-3">Nama Lengkap Siswa</th>
                <th className="p-3">Kehadiran</th>
                <th className="p-3">Rata-Rata Nilai</th>
                <th className="p-3">Poin Prestasi/Pelanggaran</th>
                <th className="p-3">Status Karakter</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700/60">
              {studentsList.map((st) => (
                <tr key={st.nis} className="hover:bg-slate-50/50 dark:hover:bg-slate-700/30">
                  <td className="p-3 font-mono font-semibold">{st.nis}</td>
                  <td className="p-3 font-bold text-slate-900 dark:text-white">{st.name}</td>
                  <td className="p-3">{st.attendance}</td>
                  <td className="p-3 font-bold text-emerald-600">{st.avgScore}</td>
                  <td className="p-3">
                    <span className="text-emerald-600 font-bold">+{st.merits}</span> / <span className="text-rose-500 font-bold">-{st.violations}</span>
                  </td>
                  <td className="p-3">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      st.status === 'Sangat Baik'
                        ? 'bg-emerald-100 text-emerald-800'
                        : st.status === 'Baik'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-rose-100 text-rose-800'
                    }`}>
                      {st.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
