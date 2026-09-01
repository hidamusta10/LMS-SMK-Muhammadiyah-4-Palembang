import React, { useState } from 'react';
import { HelpdeskTicket, UserProfile } from '../../types';
import {
  ShieldCheck,
  Users,
  Database,
  Server,
  HardDrive,
  RefreshCw,
  HelpCircle,
  CheckCircle2,
  Lock,
  Share2,
  Key,
  PlusCircle,
  Search,
} from 'lucide-react';
import { MOCK_USERS_BY_ROLE } from '../../data/initialData';

interface AdminManagementViewProps {
  user: UserProfile;
  tickets: HelpdeskTicket[];
}

export const AdminManagementView: React.FC<AdminManagementViewProps> = ({
  user,
  tickets,
}) => {
  const [activeTab, setActiveTab] = useState<'users' | 'database' | 'helpdesk' | 'integrasi'>('users');
  const [ticketList, setTicketList] = useState<HelpdeskTicket[]>(tickets);
  const [backupStatus, setBackupStatus] = useState<string>('Terkini (Otomatis setiap 24 Jam)');
  const [isBackingUp, setIsBackingUp] = useState<boolean>(false);
  const [searchUser, setSearchUser] = useState<string>('');

  const handleResolveTicket = (ticketId: string) => {
    setTicketList((prev) =>
      prev.map((t) => (t.id === ticketId ? { ...t, status: 'Resolved' } : t))
    );
    alert('Tiket bantuan berhasil diselesaikan dan notifikasi terkirim ke pengguna!');
  };

  const handleManualBackup = () => {
    setIsBackingUp(true);
    setTimeout(() => {
      setIsBackingUp(false);
      setBackupStatus('Baru saja (01 Sep 2026 08:45 WIB)');
      alert('Snapshot basis data LMS SMK Muhammadiyah 4 Palembang berhasil dicadangkan ke Cloud Storage!');
    }, 2000);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="inline-flex items-center space-x-1 text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5 mr-1" />
            <span>Menu 19 & 20: Pengelolaan Sistem & Helpdesk</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1">
            Administrasi Sistem & Dukungan Pengguna
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Manajemen master data, akun 12 hak akses, integrasi Dapodik/WA, backup & tiket helpdesk.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex overflow-x-auto space-x-2 border-b border-slate-200 dark:border-slate-800 pb-2">
        <button
          onClick={() => setActiveTab('users')}
          className={`px-3.5 py-1.5 text-xs font-bold rounded-xl whitespace-nowrap transition ${
            activeTab === 'users'
              ? 'bg-slate-900 text-white dark:bg-emerald-600 shadow-xs'
              : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          Manajemen Pengguna & 12 Peran
        </button>
        <button
          onClick={() => setActiveTab('database')}
          className={`px-3.5 py-1.5 text-xs font-bold rounded-xl whitespace-nowrap transition ${
            activeTab === 'database'
              ? 'bg-slate-900 text-white dark:bg-emerald-600 shadow-xs'
              : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          Cadangan & Pemulihan Database
        </button>
        <button
          onClick={() => setActiveTab('integrasi')}
          className={`px-3.5 py-1.5 text-xs font-bold rounded-xl whitespace-nowrap transition ${
            activeTab === 'integrasi'
              ? 'bg-slate-900 text-white dark:bg-emerald-600 shadow-xs'
              : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          Integrasi (Dapodik & WA Gateway)
        </button>
        <button
          onClick={() => setActiveTab('helpdesk')}
          className={`px-3.5 py-1.5 text-xs font-bold rounded-xl whitespace-nowrap transition ${
            activeTab === 'helpdesk'
              ? 'bg-slate-900 text-white dark:bg-emerald-600 shadow-xs'
              : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          Pusat Bantuan & Tiket Masuk ({ticketList.filter((t) => t.status === 'Open').length} Open)
        </button>
      </div>

      {/* Tab 1: Manajemen Pengguna */}
      {activeTab === 'users' && (
        <div className="space-y-4">
          <div className="p-4 bg-white dark:bg-slate-800/90 rounded-2xl border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row justify-between items-center gap-3 shadow-xs">
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchUser}
                onChange={(e) => setSearchUser(e.target.value)}
                placeholder="Cari akun berdasarkan nama, NIS/NIP, atau peran..."
                className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs focus:outline-none focus:border-emerald-500 text-slate-900 dark:text-white"
              />
            </div>

            <button
              onClick={() => alert('Membuka modal tambah akun pengguna baru...')}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition flex items-center space-x-1.5 whitespace-nowrap self-start sm:self-auto"
            >
              <PlusCircle className="w-4 h-4" />
              <span>+ Tambah Akun Baru</span>
            </button>
          </div>

          <div className="bg-white dark:bg-slate-800/90 rounded-2xl border border-slate-200 dark:border-slate-700 p-5 space-y-3 shadow-xs">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Daftar Akun Pengguna Terkonfigurasi
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-50 dark:bg-slate-900 text-slate-500 uppercase">
                  <tr>
                    <th className="p-3">Pengguna</th>
                    <th className="p-3">Peran / Hak Akses</th>
                    <th className="p-3">NIS/NIP</th>
                    <th className="p-3">Email Akun</th>
                    <th className="p-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                  {Object.values(MOCK_USERS_BY_ROLE).map((u) => (
                    <tr key={u.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-700/30">
                      <td className="p-3 flex items-center space-x-2">
                        <img src={u.avatar} alt={u.name} className="w-7 h-7 rounded-full object-cover" />
                        <span className="font-bold text-slate-900 dark:text-white">{u.name}</span>
                      </td>
                      <td className="p-3">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
                          {u.roleLabel}
                        </span>
                      </td>
                      <td className="p-3 font-mono">{u.nisOrNip}</td>
                      <td className="p-3 text-slate-500">{u.email}</td>
                      <td className="p-3">
                        <span className="text-emerald-600 font-bold flex items-center">
                          <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
                          Aktif
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Database & Backup */}
      {activeTab === 'database' && (
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 space-y-5 shadow-xs max-w-2xl">
          <div className="flex items-center space-x-3 text-emerald-600">
            <HardDrive className="w-7 h-7" />
            <div>
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                Cadangan Data & Pemulihan (Backup & Restore)
              </h3>
              <p className="text-xs text-slate-500">
                Penyimpanan cadangan terenkripsi untuk keamanan data akademik dan nilai siswa.
              </p>
            </div>
          </div>

          <div className="p-4 bg-slate-50 dark:bg-slate-900/60 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-slate-500">Status Backup Terakhir:</span>
              <span className="font-bold text-emerald-600">{backupStatus}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Ukuran Snapshot Database:</span>
              <span className="font-bold text-slate-800 dark:text-slate-200">142.8 MB</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Target Lokasi:</span>
              <span className="font-bold text-slate-800 dark:text-slate-200">Google Cloud Storage (Dual-Region)</span>
            </div>
          </div>

          <button
            disabled={isBackingUp}
            onClick={handleManualBackup}
            className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs transition shadow-sm flex items-center justify-center space-x-2 disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${isBackingUp ? 'animate-spin' : ''}`} />
            <span>{isBackingUp ? 'Sedang Mencadangkan Snapshot DB...' : 'Mulai Pencadangan Manual Sekarang'}</span>
          </button>
        </div>
      )}

      {/* Tab 3: Integrasi */}
      {activeTab === 'integrasi' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 space-y-3 shadow-xs">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-slate-900 dark:text-white text-sm">
                Sinkronisasi Dapodik Kemendikbudristek
              </h3>
              <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                Tersinkron
              </span>
            </div>
            <p className="text-slate-500 leading-relaxed">
              Integrasi otomatis data siswa, GTK, rombel, dan kurikulum Merdeka langsung dari server Dapodik pusat.
            </p>
            <div className="text-[11px] text-slate-400">Sinkronisasi terakhir: 01 Sep 2026 (03:00 WIB)</div>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 space-y-3 shadow-xs">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-slate-900 dark:text-white text-sm">
                WhatsApp Gateway & Notifikasi Orang Tua
              </h3>
              <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                Online & Siaga
              </span>
            </div>
            <p className="text-slate-500 leading-relaxed">
              Pengiriman otomatis rekap absensi harian, nilai ulangan, dan surat edaran resmi langsung ke WhatsApp Wali Murid.
            </p>
            <div className="text-[11px] text-slate-400">Kuota Pesan: 9.850 / 10.000 Pesan Bulan Ini</div>
          </div>
        </div>
      )}

      {/* Tab 4: Helpdesk */}
      {activeTab === 'helpdesk' && (
        <div className="bg-white dark:bg-slate-800/90 rounded-2xl border border-slate-200 dark:border-slate-700 p-5 space-y-4 shadow-xs">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center">
            <HelpCircle className="w-4 h-4 mr-2 text-rose-500" />
            Daftar Tiket Bantuan & Permintaan Pengguna
          </h3>

          <div className="space-y-3">
            {ticketList.map((t) => (
              <div
                key={t.id}
                className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 space-y-2 text-xs"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center space-x-2">
                    <span className="font-mono font-bold text-slate-800 dark:text-slate-200">
                      {t.ticketNumber}
                    </span>
                    <span className="font-bold text-slate-900 dark:text-white text-sm">
                      {t.subject}
                    </span>
                  </div>

                  <span
                    className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] ${
                      t.status === 'Resolved'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {t.status}
                  </span>
                </div>

                <div className="text-slate-500 text-[11px]">
                  Dari: <strong>{t.userEmail}</strong> ({t.role}) • Tanggal: {t.dateCreated}
                </div>

                {t.status === 'Open' && (
                  <div className="pt-2 border-t border-slate-200 dark:border-slate-700 flex justify-end">
                    <button
                      onClick={() => handleResolveTicket(t.id)}
                      className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg text-xs transition"
                    >
                      Tandai Tiket Selesai (Resolve)
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
