import React from 'react';
import {
  LayoutDashboard,
  BookOpen,
  FileText,
  CheckSquare,
  Award,
  Calendar,
  Clock,
  Briefcase,
  Factory,
  GraduationCap,
  Sparkles,
  User,
  Library,
  Megaphone,
  MessageSquare,
  HelpCircle,
  Settings,
  ShieldAlert,
  Users,
  Compass,
  FolderGit2,
  HeartHandshake,
  Database,
  BarChart3,
  FileSpreadsheet,
  Layers,
  Flame,
  UserCheck,
  Building2,
  Lock,
  History,
  Archive,
  Share2,
  Code2,
  Github,
  Terminal,
} from 'lucide-react';
import { UserRole } from '../../types';

interface SidebarProps {
  activeRole: UserRole;
  currentView: string;
  onSelectView: (viewId: string) => void;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
}

interface MenuItem {
  id: string;
  label: string;
  icon: React.ElementType;
  badge?: string | number;
  badgeColor?: string;
  subItems?: { id: string; label: string; icon: React.ElementType }[];
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeRole,
  currentView,
  onSelectView,
  isOpenMobile,
  onCloseMobile,
}) => {
  const [expandedGroups, setExpandedGroups] = React.useState<Record<string, boolean>>({
    'kegiatan_smk': true,
    'akademik_guru': true,
    'master_admin': true,
  });

  const toggleGroup = (groupId: string) => {
    setExpandedGroups((prev) => ({ ...prev, [groupId]: !prev[groupId] }));
  };

  // Build menu list based on the active role as per PDF Section K & full schema
  const getMenuItems = (): { section: string; items: MenuItem[] }[] => {
    if (activeRole === 'siswa') {
      return [
        {
          section: 'Pembelajaran Utama',
          items: [
            { id: 'dashboard', label: '1. Dashboard', icon: LayoutDashboard },
            { id: 'coding_lab', label: 'Lab Coding & GitHub', icon: Code2, badge: '8 Stack', badgeColor: 'bg-emerald-600 text-white' },
            { id: 'kelas_saya', label: '2. Kelas Saya', icon: BookOpen, badge: '4 Mapel' },
            { id: 'materi', label: '3. Materi Pembelajaran', icon: FileText },
            { id: 'tugas', label: '4. Tugas & Proyek', icon: CheckSquare, badge: '2 Baru', badgeColor: 'bg-amber-500 text-white' },
            { id: 'ujian', label: '5. Ujian & Asesmen CBT', icon: Award, badge: '1 Aktif', badgeColor: 'bg-emerald-500 text-white' },
            { id: 'nilai', label: '6. Nilai & Rapor', icon: BarChart3 },
            { id: 'kehadiran', label: '7. Kehadiran & Presensi', icon: Clock },
            { id: 'jadwal', label: '8. Jadwal Pelajaran & Lab', icon: Calendar },
          ],
        },
        {
          section: 'Khas SMK & Karier',
          items: [
            {
              id: 'kegiatan_smk',
              label: '9. Kegiatan Kejuruan SMK',
              icon: Briefcase,
              subItems: [
                { id: 'pkl', label: 'Praktik Kerja Lapangan (PKL)', icon: Briefcase },
                { id: 'tefa', label: 'Teaching Factory (TEFA)', icon: Factory },
                { id: 'ukk', label: 'Uji Kompetensi Keahlian (UKK)', icon: Award },
                { id: 'sertifikasi', label: 'Sertifikasi & BNSP', icon: ShieldAlert },
                { id: 'bkk', label: 'Bursa Kerja Khusus (BKK)', icon: Building2 },
              ],
            },
            { id: 'portofolio', label: '10. Portofolio Siswa', icon: Sparkles },
            { id: 'ismuba', label: '21. ISMUBA & Ibadah', icon: Flame, badge: 'Harian' },
            { id: 'kokurikuler', label: '16. Kokurikuler (P5)', icon: Layers },
            { id: 'ekstrakurikuler', label: '17. Ekstrakurikuler & HW/TS', icon: Compass },
            { id: 'prestasi', label: '18. Prestasi Siswa', icon: Award },
          ],
        },
        {
          section: 'Layanan & Komunikasi',
          items: [
            { id: 'perpustakaan', label: '11. Perpustakaan Digital', icon: Library },
            { id: 'pengumuman', label: '12. Pengumuman Sekolah', icon: Megaphone, badge: '3' },
            { id: 'pesan_forum', label: '13. Pesan & Forum Diskusi', icon: MessageSquare },
            { id: 'bk', label: '14. Bimbingan Konseling (BK)', icon: HeartHandshake },
            { id: 'kedisiplinan', label: '20. Tata Tertib & Poin', icon: ShieldAlert },
            { id: 'profil', label: '15. Profil & Pengaturan', icon: User },
            { id: 'bantuan', label: '16. Helpdesk & Bantuan', icon: HelpCircle },
          ],
        },
      ];
    }

    if (activeRole === 'guru') {
      return [
        {
          section: 'Aktivitas Mengajar',
          items: [
            { id: 'dashboard', label: '1. Dashboard Guru', icon: LayoutDashboard },
            { id: 'coding_lab', label: 'Lab Coding & Repositori', icon: Code2, badge: 'IDE', badgeColor: 'bg-emerald-600 text-white' },
            { id: 'jadwal', label: '2. Jadwal Mengajar Hari Ini', icon: Calendar },
            { id: 'kelas_saya', label: '3. Kelas yang Diampu', icon: BookOpen, badge: '3 Kelas' },
            { id: 'perangkat_ajar', label: '4. Perangkat Pembelajaran', icon: FolderGit2, badge: 'Approval' },
            { id: 'materi', label: '5. Materi & Modul Ajar', icon: FileText },
            { id: 'tugas', label: '6. Kelola Tugas & Proyek', icon: CheckSquare, badge: '12 Perlu Nilai', badgeColor: 'bg-rose-500 text-white' },
            { id: 'bank_soal', label: '7. Bank Soal & Paket Ujian', icon: Database },
            { id: 'ujian', label: '8. Ujian & Asesmen CBT', icon: Award },
            { id: 'kehadiran', label: '9. Presensi Siswa', icon: Clock },
            { id: 'penilaian_remedial', label: '10. Penilaian & Remedial', icon: BarChart3 },
            { id: 'jurnal_mengajar', label: '12. Jurnal Mengajar Harian', icon: FileSpreadsheet, badge: 'Wajib' },
          ],
        },
        {
          section: 'Kejuruan & Analitik',
          items: [
            { id: 'tefa', label: '13. Pembimbing TEFA & PKL', icon: Factory },
            { id: 'analitik', label: '14. Analitik Pembelajaran', icon: BarChart3 },
            { id: 'pengumuman', label: '15. Pengumuman & Broadcast', icon: Megaphone },
            { id: 'pesan_forum', label: '15b. Pesan & Forum Mapel', icon: MessageSquare },
            { id: 'laporan_guru', label: '16. Rekap Laporan & Leger', icon: FileSpreadsheet },
            { id: 'profil', label: '17. Profil & NBM Guru', icon: User },
            { id: 'bantuan', label: '18. Helpdesk & Bantuan', icon: HelpCircle },
          ],
        },
      ];
    }

    if (activeRole === 'wali_kelas') {
      return [
        {
          section: 'Manajemen Rombel',
          items: [
            { id: 'dashboard', label: '33. Dashboard Wali Kelas', icon: LayoutDashboard },
            { id: 'data_siswa_kelas', label: 'Data & Profil Siswa Kelas', icon: Users, badge: '32 Siswa' },
            { id: 'kehadiran', label: 'Rekap Presensi & Izin Sakit', icon: Clock, badge: '1 Izin' },
            { id: 'nilai', label: 'Leger Nilai & Ketuntasan', icon: BarChart3 },
            { id: 'kedisiplinan', label: 'Catatan Pembinaan & Poin', icon: ShieldAlert },
            { id: 'komunikasi_ortu', label: 'Komunikasi Orang Tua / Wali', icon: MessageSquare },
            { id: 'laporan_wali', label: 'Cetak Rapor & Laporan Bulanan', icon: FileSpreadsheet },
            { id: 'profil', label: 'Profil Wali Kelas', icon: User },
          ],
        },
      ];
    }

    if (activeRole === 'kepala_sekolah') {
      return [
        {
          section: 'Pengawasan Eksekutif',
          items: [
            { id: 'dashboard', label: 'Dashboard Eksekutif Kepsek', icon: LayoutDashboard },
            { id: 'monitoring_guru', label: 'Monitoring KBM & Jurnal Guru', icon: UserCheck, badge: 'Live' },
            { id: 'analitik', label: 'Analitik Mutu & Ketuntasan Siswa', icon: BarChart3 },
            { id: 'tefa', label: 'Monitoring PKL & Teaching Factory', icon: Factory },
            { id: 'perangkat_ajar', label: 'Pengesahan Dokumen Kurikulum', icon: FolderGit2, badge: '3 Menunggu' },
            { id: 'laporan_sekolah', label: 'Laporan Semester & Pengawas', icon: FileSpreadsheet },
            { id: 'pengumuman', label: 'Instruksi Pimpinan & SK', icon: Megaphone },
            { id: 'profil', label: 'Profil Pimpinan', icon: User },
          ],
        },
      ];
    }

    if (activeRole === 'orang_tua') {
      return [
        {
          section: 'Pantauan Siswa',
          items: [
            { id: 'dashboard', label: '34. Pantauan Akademik Anak', icon: LayoutDashboard },
            { id: 'kehadiran', label: 'Kehadiran & Keterlambatan', icon: Clock },
            { id: 'tugas', label: 'Daftar Tugas & Status Pengumpulan', icon: CheckSquare },
            { id: 'nilai', label: 'Nilai Ulangan & Rapor', icon: BarChart3 },
            { id: 'jadwal', label: 'Jadwal Pelajaran & Ujian', icon: Calendar },
            { id: 'pkl', label: 'Informasi PKL & Magang', icon: Briefcase },
            { id: 'kedisiplinan', label: 'Catatan Karakter & Prestasi', icon: Sparkles },
            { id: 'pesan_forum', label: 'Konsultasi Wali Kelas / Guru BK', icon: MessageSquare },
            { id: 'bantuan', label: 'Layanan Bantuan Sekolah', icon: HelpCircle },
          ],
        },
      ];
    }

    // Default: Administrator
    return [
      {
        section: 'Administrasi Sistem',
        items: [
          { id: 'dashboard', label: '1. Dashboard Sistem', icon: LayoutDashboard },
          { id: 'master_data', label: '2. Master Data Sekolah', icon: Database },
          { id: 'manajemen_user', label: '3. Pengguna & Hak Akses (12 Peran)', icon: Users, badge: '960 Akun' },
          { id: 'kalender_akademik', label: '37. Kalender Akademik', icon: Calendar },
          { id: 'kelas_saya', label: '5. Kelas, Rombel & Mapel', icon: BookOpen },
          { id: 'bank_soal', label: '7. Bank Soal & CBT', icon: Award },
          { id: 'tefa', label: '8. PKL, TEFA & UKK', icon: Factory },
          { id: 'perpustakaan', label: '10. Perpustakaan Digital', icon: Library },
          { id: 'pengumuman', label: '11. Pengumuman & Broadcast', icon: Megaphone },
          { id: 'laporan_admin', label: '12. Laporan & Ekspor Data', icon: FileSpreadsheet },
          { id: 'pusat_dokumen', label: '13. Pusat Dokumen & SOP', icon: FolderGit2 },
          { id: 'integrasi', label: '14. Integrasi (Dapodik, WA, BKK)', icon: Share2 },
          { id: 'pengaturan_sistem', label: '17. Pengaturan Sistem LMS', icon: Settings },
          { id: 'bantuan', label: '18. Helpdesk & Tiket Pengguna', icon: HelpCircle, badge: '2 Baru', badgeColor: 'bg-rose-500 text-white' },
        ],
      },
    ];
  };

  const menuSections = getMenuItems();

  const handleNavClick = (viewId: string) => {
    onSelectView(viewId);
    onCloseMobile();
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpenMobile && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 lg:hidden"
        />
      )}

      {/* Sidebar Container in Bento Layout */}
      <aside
        className={`fixed lg:sticky top-20 left-0 z-40 h-[calc(100vh-5rem)] w-72 bg-white dark:bg-slate-900 border-r-2 border-slate-200 dark:border-slate-800 flex flex-col justify-between overflow-y-auto transition-transform duration-200 ease-in-out shadow-xs ${
          isOpenMobile ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="p-4 space-y-6">
          
          {/* Active Role Quick Bento Card */}
          <div className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border-2 border-emerald-100 dark:border-emerald-900/50 flex items-center justify-between shadow-xs">
            <div>
              <div className="text-[10px] font-extrabold text-emerald-800 dark:text-emerald-300 uppercase tracking-wider">
                Mode Akses Aktif
              </div>
              <div className="text-xs font-black text-slate-900 dark:text-white capitalize mt-0.5">
                {activeRole.replace('_', ' ')}
              </div>
            </div>
            <div className="w-3 h-3 rounded-full bg-emerald-500 ring-4 ring-emerald-200 dark:ring-emerald-900 animate-pulse" />
          </div>

          {/* Menu Sections */}
          {menuSections.map((section, sIdx) => (
            <div key={sIdx} className="space-y-1.5">
              <div className="px-3 text-[10px] font-extrabold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                {section.section}
              </div>
              <nav className="space-y-1 mt-1.5">
                {section.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = currentView === item.id;
                  const hasSub = item.subItems && item.subItems.length > 0;
                  const isExpanded = expandedGroups[item.id] ?? false;

                  if (hasSub) {
                    return (
                      <div key={item.id} className="space-y-1">
                        <button
                          onClick={() => toggleGroup(item.id)}
                          className={`w-full flex items-center justify-between px-3.5 py-2.5 text-xs font-bold rounded-xl transition ${
                            isActive
                              ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                              : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                          }`}
                        >
                          <div className="flex items-center space-x-2.5 truncate">
                            <Icon className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                            <span className="truncate">{item.label}</span>
                          </div>
                          <span className="text-[10px] text-slate-400 font-mono">
                            {isExpanded ? '▼' : '▶'}
                          </span>
                        </button>

                        {isExpanded && (
                          <div className="pl-6 space-y-1 border-l-2 border-slate-200 dark:border-slate-800 ml-4 mt-1">
                            {item.subItems?.map((sub) => {
                              const SubIcon = sub.icon;
                              const isSubActive = currentView === sub.id;
                              return (
                                <button
                                  key={sub.id}
                                  onClick={() => handleNavClick(sub.id)}
                                  className={`w-full flex items-center space-x-2 px-3 py-2 text-xs rounded-xl transition ${
                                    isSubActive
                                      ? 'bg-emerald-700 text-white font-bold shadow-xs'
                                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 font-medium'
                                  }`}
                                >
                                  <SubIcon className="w-3.5 h-3.5 shrink-0" />
                                  <span className="truncate">{sub.label}</span>
                                </button>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  }

                  return (
                    <button
                      key={item.id}
                      onClick={() => handleNavClick(item.id)}
                      className={`w-full flex items-center justify-between px-3.5 py-2.5 text-xs font-semibold rounded-xl transition ${
                        isActive
                          ? 'bg-emerald-700 text-white font-bold shadow-sm'
                          : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      <div className="flex items-center space-x-2.5 truncate">
                        <Icon
                          className={`w-4 h-4 shrink-0 ${
                            isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-600 dark:text-slate-500'
                          }`}
                        />
                        <span className="truncate">{item.label}</span>
                      </div>
                      {item.badge && (
                        <span
                          className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                            item.badgeColor || (isActive ? 'bg-white/20 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700')
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </nav>
            </div>
          ))}

        </div>

        {/* Footer info in sidebar */}
        <div className="p-4 border-t-2 border-slate-200 dark:border-slate-800 text-[11px] text-slate-400 space-y-1 bg-slate-50/50 dark:bg-slate-900/50">
          <div className="flex items-center justify-between">
            <span className="font-bold text-slate-700 dark:text-slate-300">Versi LMS</span>
            <span className="font-mono font-bold text-emerald-700 dark:text-emerald-400">v4.8 SMART</span>
          </div>
          <div>Tahun Ajaran: 2025/2026 Genap</div>
        </div>
      </aside>
    </>
  );
};
