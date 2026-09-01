import React from 'react';
import {
  Bell,
  Search,
  UserCheck,
  LogOut,
  ChevronDown,
  Sparkles,
  School,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import { UserProfile, UserRole } from '../../types';
import { SCHOOL_INFO, MOCK_USERS } from '../../data/initialData';
import { ThemeToggle } from './ThemeToggle';

interface HeaderProps {
  currentUser: UserProfile;
  onSwitchRole: (role: UserRole) => void;
  onOpenSearch: () => void;
  onOpenNotifications: () => void;
  unreadNotifsCount: number;
  onLogout: () => void;
  onOpenProfile: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentUser,
  onSwitchRole,
  onOpenSearch,
  onOpenNotifications,
  unreadNotifsCount,
  onLogout,
  onOpenProfile,
}) => {
  const [roleDropdownOpen, setRoleDropdownOpen] = React.useState(false);
  const [userMenuOpen, setUserMenuOpen] = React.useState(false);

  const roleOptions: { role: UserRole; label: string; desc: string; badgeColor: string }[] = [
    { role: 'siswa', label: 'Siswa / Murid', desc: 'Akses pembelajaran, tugas, ujian, PKL, TEFA, nilai', badgeColor: 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300' },
    { role: 'guru', label: 'Guru Pengampu', desc: 'Kelola kelas, materi, nilai, bank soal, jurnal mengajar', badgeColor: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300' },
    { role: 'wali_kelas', label: 'Wali Kelas', desc: 'Pantauan presensi kelas, leger nilai, catatan siswa', badgeColor: 'bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300' },
    { role: 'kepala_sekolah', label: 'Kepala Sekolah / Pimpinan', desc: 'Analitik eksekutif sekolah, mutu pembelajaran, PKL', badgeColor: 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300' },
    { role: 'orang_tua', label: 'Orang Tua / Wali', desc: 'Pantauan kehadiran, nilai tugas, dan aktivitas anak', badgeColor: 'bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-300' },
    { role: 'admin', label: 'Administrator LMS', desc: 'Master data, manajemen 12 role, backup, integrasi sistem', badgeColor: 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200' },
  ];

  return (
    <header className="sticky top-0 z-30 bg-emerald-700 text-white shadow-md border-b-4 border-yellow-400 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & School Identity in Bento Style */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-emerald-700 font-black text-xl shadow-sm border-2 border-yellow-400 shrink-0">
              M4
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-base sm:text-xl font-extrabold leading-tight tracking-tight text-white">
                  SMK Muhammadiyah 4 Palembang
                </h1>
                <span className="hidden md:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-yellow-400 text-emerald-950 uppercase tracking-wider">
                  SMART
                </span>
              </div>
              <p className="text-[11px] text-emerald-100 font-semibold tracking-wide hidden sm:block">
                Learning Management System & Portal Terintegrasi
              </p>
            </div>
          </div>

          {/* Quick Search trigger & Role Switcher */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            
            {/* Spotlight Search trigger */}
            <button
              id="global-search-btn"
              onClick={onOpenSearch}
              className="flex items-center space-x-2 px-3.5 py-2 text-xs sm:text-sm text-emerald-100 bg-emerald-800/80 hover:bg-emerald-800 rounded-xl transition-all border border-emerald-600/70 shadow-xs"
              title="Cari Menu, Materi, Tugas, Jadwal (Ctrl+K)"
            >
              <Search className="w-4 h-4 text-emerald-200" />
              <span className="hidden md:inline font-medium">Cari di LMS...</span>
              <kbd className="hidden lg:inline-block px-1.5 py-0.5 text-[10px] font-mono bg-emerald-900/60 border border-emerald-600/60 rounded text-emerald-200">
                Ctrl K
              </kbd>
            </button>

            {/* Global Theme Toggle */}
            <ThemeToggle />

            {/* Quick Role Switcher Button */}
            <div className="relative">
              <button
                id="role-switcher-dropdown-btn"
                onClick={() => {
                  setRoleDropdownOpen(!roleDropdownOpen);
                  setUserMenuOpen(false);
                }}
                className="flex items-center space-x-1.5 px-3 py-2 text-xs font-semibold rounded-xl bg-white/10 text-white hover:bg-white/20 border border-white/20 transition backdrop-blur-xs shadow-xs"
              >
                <UserCheck className="w-4 h-4 text-yellow-300" />
                <span className="hidden sm:inline opacity-80">Peran:</span>
                <span className="max-w-[90px] truncate font-bold text-yellow-300">{(currentUser?.roleLabel || currentUser?.role || '').split('/')[0]}</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-70" />
              </button>

              {roleDropdownOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border-2 border-slate-200 dark:border-slate-800 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-4 py-2.5 border-b border-slate-100 dark:border-slate-800">
                    <p className="text-xs font-extrabold text-slate-900 dark:text-white uppercase tracking-wider">
                      Ganti Tampilan Peran (Role)
                    </p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      Uji coba modul terintegrasi untuk seluruh pemangku kepentingan
                    </p>
                  </div>
                  <div className="p-2 max-h-80 overflow-y-auto space-y-1.5">
                    {roleOptions.map((opt) => {
                      const isActive = currentUser.role === opt.role;
                      return (
                        <button
                          key={opt.role}
                          onClick={() => {
                            onSwitchRole(opt.role);
                            setRoleDropdownOpen(false);
                          }}
                          className={`w-full text-left px-3 py-2.5 rounded-xl text-xs flex items-start space-x-2.5 transition ${
                            isActive
                              ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-900 dark:text-emerald-100 font-semibold border border-emerald-200 dark:border-emerald-800'
                              : 'hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 border border-transparent'
                          }`}
                        >
                          <div className="pt-0.5">
                            {isActive ? (
                              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                            ) : (
                              <div className="w-4 h-4 rounded-full border-2 border-slate-300 dark:border-slate-600" />
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <span className="font-bold">{opt.label}</span>
                              {isActive && (
                                <span className="text-[10px] font-extrabold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">Aktif</span>
                              )}
                            </div>
                            <p className="text-[10px] text-slate-500 dark:text-slate-400 line-clamp-1 font-normal mt-0.5">
                              {opt.desc}
                            </p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Notifications Bell */}
            <button
              id="notifications-btn"
              onClick={onOpenNotifications}
              className="relative p-2.5 text-emerald-100 hover:text-white rounded-xl bg-emerald-800/60 hover:bg-emerald-800 transition border border-emerald-600/50"
              title="Pemberitahuan"
            >
              <Bell className="w-5 h-5" />
              {unreadNotifsCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-yellow-400 text-emerald-950 text-[10px] font-black flex items-center justify-center ring-2 ring-emerald-700">
                  {unreadNotifsCount}
                </span>
              )}
            </button>

            {/* User Profile Avatar & Menu in Bento Header */}
            <div className="relative">
              <button
                id="user-profile-menu-btn"
                onClick={() => {
                  setUserMenuOpen(!userMenuOpen);
                  setRoleDropdownOpen(false);
                }}
                className="flex items-center space-x-3 p-1.5 pr-2.5 rounded-2xl bg-emerald-800/80 hover:bg-emerald-800 border border-emerald-600/60 transition shadow-xs"
              >
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-9 h-9 rounded-xl object-cover border-2 border-yellow-400 shrink-0"
                />
                <div className="hidden xl:block text-left">
                  <div className="text-xs font-bold text-white leading-tight max-w-[130px] truncate">
                    {currentUser.name}
                  </div>
                  <div className="text-[10px] text-emerald-200 font-medium">
                    {currentUser.classOrPosition || currentUser.roleLabel}
                  </div>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-emerald-200 hidden xl:block" />
              </button>

              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border-2 border-slate-200 dark:border-slate-800 py-2 z-50 animate-in fade-in duration-150">
                  <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-800">
                    <p className="text-xs font-bold text-slate-900 dark:text-white">{currentUser.name}</p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">{currentUser.email}</p>
                    <div className="mt-1.5 inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                      <ShieldCheck className="w-3 h-3 mr-1" />
                      {currentUser.roleLabel}
                    </div>
                  </div>

                  <div className="p-2 border-b border-slate-100 dark:border-slate-800">
                    <p className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5 px-1">
                      Pilihan Tema
                    </p>
                    <ThemeToggle variant="segmented" className="w-full justify-between" />
                  </div>

                  <div className="p-1.5 space-y-1">
                    <button
                      onClick={() => {
                        onOpenProfile();
                        setUserMenuOpen(false);
                      }}
                      className="w-full text-left px-3.5 py-2.5 text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition flex items-center justify-between"
                    >
                      <span className="font-semibold">Profil & Pengaturan Akun</span>
                      <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    </button>
                    <button
                      onClick={() => {
                        onLogout();
                        setUserMenuOpen(false);
                      }}
                      className="w-full text-left px-3.5 py-2.5 text-xs text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-xl transition flex items-center space-x-2 font-semibold"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Keluar ke Beranda Publik</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

          </div>

        </div>
      </div>
    </header>
  );
};
