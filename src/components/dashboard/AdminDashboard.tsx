import React from 'react';
import {
  UserProfile,
  HelpdeskTicket,
} from '../../types';
import {
  ShieldCheck,
  Database,
  Users,
  Server,
  Activity,
  HardDrive,
  Share2,
  HelpCircle,
  Sparkles,
  CheckCircle2,
  RefreshCw,
  Clock,
} from 'lucide-react';

interface AdminDashboardProps {
  user: UserProfile;
  tickets: HelpdeskTicket[];
  onNavigate: (viewId: string) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  user,
  tickets,
  onNavigate,
}) => {
  const [backupTriggered, setBackupTriggered] = React.useState(false);

  const handleBackup = () => {
    setBackupTriggered(true);
    setTimeout(() => setBackupTriggered(false), 2500);
  };

  return (
    <div className="space-y-6">
      
      {/* Admin Hero Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 p-6 sm:p-8 text-white shadow-md">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center space-x-4">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-emerald-400/80 shadow-md"
            />
            <div className="space-y-1">
              <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-500/20 text-emerald-200 border border-emerald-400/30">
                <ShieldCheck className="w-3 h-3 mr-1 text-emerald-300" />
                Super Administrator System & DB
              </div>
              <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight">
                {user.name}
              </h1>
              <p className="text-xs text-slate-300 flex items-center gap-2">
                <span>LMS SMK Muhammadiyah 4 Palembang</span>
                <span>•</span>
                <span>Uptime Server: 99.98% (Cloud Run Host)</span>
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={handleBackup}
              disabled={backupTriggered}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-sm flex items-center space-x-2 transition disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${backupTriggered ? 'animate-spin' : ''}`} />
              <span>{backupTriggered ? 'Membuat Cadangan DB...' : 'Backup Data Sekarang'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Infrastructure & System Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div
          onClick={() => onNavigate('manajemen_user')}
          className="p-4 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700/80 shadow-xs hover:border-emerald-500 transition cursor-pointer"
        >
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Total Akun Pengguna</span>
            <Users className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1">960 Akun</div>
          <div className="text-[11px] text-emerald-600 font-semibold mt-1">12 Peran Terkonfigurasi</div>
        </div>

        <div
          onClick={() => onNavigate('kelas_saya')}
          className="p-4 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700/80 shadow-xs hover:border-blue-500 transition cursor-pointer"
        >
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Rombongan Belajar (Rombel)</span>
            <Database className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1">26 Kelas</div>
          <div className="text-[11px] text-blue-600 font-semibold mt-1">5 Program Keahlian</div>
        </div>

        <div
          onClick={() => onNavigate('bantuan')}
          className="p-4 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700/80 shadow-xs hover:border-rose-500 transition cursor-pointer"
        >
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Tiket Helpdesk Aktif</span>
            <HelpCircle className="w-4 h-4 text-rose-500" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1">{tickets.length} Tiket</div>
          <div className="text-[11px] text-rose-500 font-semibold mt-1">1 Open / 1 Selesai</div>
        </div>

        <div
          onClick={() => onNavigate('integrasi')}
          className="p-4 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700/80 shadow-xs hover:border-purple-500 transition cursor-pointer"
        >
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Status Integrasi</span>
            <Share2 className="w-4 h-4 text-purple-600" />
          </div>
          <div className="text-2xl font-extrabold text-emerald-600 mt-1">Sinkron</div>
          <div className="text-[11px] text-emerald-600 font-semibold mt-1">Dapodik & WA Gateway Aktif</div>
        </div>

      </div>

      {/* System Status and Activity Log Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Active Sessions & Security Log */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700/80 space-y-3 shadow-xs">
          <h2 className="text-sm font-bold text-slate-900 dark:text-white flex items-center">
            <Activity className="w-4 h-4 mr-2 text-emerald-600" />
            Sesi Pengguna Aktif Real-Time
          </h2>

          <div className="space-y-2 text-xs">
            <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-900/60 flex items-center justify-between border border-slate-200 dark:border-slate-700">
              <span className="font-semibold text-slate-800 dark:text-slate-200">Muhammad Farhan (Siswa - XII RPL 1)</span>
              <span className="text-emerald-600 font-mono text-[11px]">IP: 180.252.xx.xx (Online)</span>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-900/60 flex items-center justify-between border border-slate-200 dark:border-slate-700">
              <span className="font-semibold text-slate-800 dark:text-slate-200">Ustazah Siti Rahmawati (Guru RPL)</span>
              <span className="text-emerald-600 font-mono text-[11px]">IP: 180.252.xx.xx (Online)</span>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-900/60 flex items-center justify-between border border-slate-200 dark:border-slate-700">
              <span className="font-semibold text-slate-800 dark:text-slate-200">Bustamam Arifin (Wali Kelas)</span>
              <span className="text-emerald-600 font-mono text-[11px]">IP: 36.85.xx.xx (Online)</span>
            </div>
          </div>
        </div>

        {/* Recent Helpdesk Tickets */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700/80 space-y-3 shadow-xs">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-900 dark:text-white flex items-center">
              <HelpCircle className="w-4 h-4 mr-2 text-rose-500" />
              Tiket Bantuan Pengguna Masuk
            </h2>
            <button onClick={() => onNavigate('bantuan')} className="text-xs font-semibold text-rose-600 hover:underline">
              Kelola Semua
            </button>
          </div>

          <div className="space-y-2 text-xs">
            {tickets.map((t) => (
              <div key={t.id} className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 space-y-1">
                <div className="flex justify-between font-bold text-slate-900 dark:text-white">
                  <span>{t.ticketNumber} • {t.subject}</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                    t.status === 'Resolved' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {t.status}
                  </span>
                </div>
                <div className="text-[11px] text-slate-500">Dari: {t.userEmail} ({t.role}) • {t.dateCreated}</div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
