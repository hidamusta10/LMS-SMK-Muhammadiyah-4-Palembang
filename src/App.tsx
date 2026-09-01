import React, { useState, useEffect } from 'react';
import { UserRole, UserProfile } from './types';
import {
  MOCK_USERS_BY_ROLE,
  MOCK_CLASSES,
  MOCK_MATERIALS,
  MOCK_ASSIGNMENTS,
  MOCK_EXAMS,
  MOCK_GRADES,
  MOCK_SCHEDULE,
  MOCK_PKL_STUDENTS,
  MOCK_TEFA_UNITS,
  MOCK_DISCIPLINE_RECORDS,
  MOCK_ANNOUNCEMENTS,
  MOCK_TEACHING_JOURNALS,
  MOCK_HELPDESK_TICKETS,
  SCHOOL_INFO,
} from './data/initialData';

// Layout Components
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { PublicPortal } from './components/public/PublicPortal';

// Role Dashboards
import { StudentDashboard } from './components/dashboard/StudentDashboard';
import { TeacherDashboard } from './components/dashboard/TeacherDashboard';
import { HomeroomDashboard } from './components/dashboard/HomeroomDashboard';
import { PrincipalDashboard } from './components/dashboard/PrincipalDashboard';
import { ParentDashboard } from './components/dashboard/ParentDashboard';
import { AdminDashboard } from './components/dashboard/AdminDashboard';

// Feature Views
import { MyClassesView } from './components/learning/MyClassesView';
import { LearningMaterialsView } from './components/learning/LearningMaterialsView';
import { AssignmentsView } from './components/learning/AssignmentsView';
import { ExamsAssessmentsView } from './components/learning/ExamsAssessmentsView';
import { GradesView } from './components/learning/GradesView';
import { AttendanceView } from './components/learning/AttendanceView';
import { ScheduleView } from './components/learning/ScheduleView';

// Vocational Views
import { PKLView } from './components/vocational/PKLView';
import { TEFAView } from './components/vocational/TEFAView';
import { UKKPortfolioView } from './components/vocational/UKKPortfolioView';
import { BKKView } from './components/vocational/BKKView';

// Character & Communication Views
import { IsmubaView } from './components/character/IsmubaView';
import { DisciplineView } from './components/character/DisciplineView';
import { AnnouncementsView } from './components/communication/AnnouncementsView';
import { MessagesForumView } from './components/communication/MessagesForumView';

// Teacher & Admin Views
import { TeachingJournalView } from './components/teacher/TeachingJournalView';
import { AdminManagementView } from './components/admin/AdminManagementView';

// Modals
import { CreateItemModal } from './components/modals/CreateItemModal';

// Icons for navigation and spotlight search
import {
  Search,
  X,
  Sparkles,
  School,
  ArrowRight,
  PlusCircle,
  Clock,
  CheckCircle2,
  Calendar,
  AlertCircle,
  Menu,
  ChevronRight,
  Flame,
} from 'lucide-react';

export default function App() {
  const [activeRole, setActiveRole] = useState<UserRole>('siswa');
  const [currentView, setCurrentView] = useState<string>('dashboard');
  const [isPublicMode, setIsPublicMode] = useState<boolean>(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isNotifsOpen, setIsNotifsOpen] = useState<boolean>(false);

  // Quick Action Modal State
  const [createModalType, setCreateModalType] = useState<'materi' | 'tugas' | 'ujian' | 'jurnal' | null>(null);

  // Current active user based on activeRole
  const currentUser: UserProfile = MOCK_USERS_BY_ROLE[activeRole] || MOCK_USERS_BY_ROLE['siswa'];

  // Global Keyboard Shortcuts (Ctrl+K for search)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setIsSearchOpen(false);
        setIsNotifsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSwitchRole = (newRole: UserRole) => {
    setActiveRole(newRole);
    setCurrentView('dashboard');
  };

  const handleLoginFromPortal = (role: UserRole) => {
    setActiveRole(role);
    setIsPublicMode(false);
    setCurrentView('dashboard');
  };

  const handleLogout = () => {
    setIsPublicMode(true);
  };

  // Search Results Definition across all 20 structure menus
  const searchableMenus = [
    { id: 'dashboard', title: 'Dashboard Utama', desc: 'Ringkasan aktivitas, statistik, jadwal, dan tugas harian', category: 'Dasar' },
    { id: 'kelas_saya', title: 'Kelas Saya & Rombel', desc: 'Mata pelajaran, capaian pembelajaran & daftar teman sekelas', category: 'Pembelajaran' },
    { id: 'materi', title: 'Materi & Modul Ajar', desc: 'Jobsheet lab, slide presentasi, video pembelajaran, dan e-book', category: 'Pembelajaran' },
    { id: 'tugas', title: 'Tugas & Proyek Praktik', desc: 'Pengumpulan tugas coding, jobsheet bengkel, dan penilaian rubrik', category: 'Pembelajaran' },
    { id: 'ujian', title: 'Ujian CBT & Asesmen', desc: 'STS, SAS, Kuis Harian, dan Bank Soal CBT interaktif', category: 'Asesmen' },
    { id: 'nilai', title: 'Nilai & Transkrip Rapor', desc: 'Transkrip capaian kompetensi, grafik perkembangan, dan cetak rapor', category: 'Akademik' },
    { id: 'kehadiran', title: 'Presensi & Kehadiran', desc: 'Absensi harian, izin sakit, surat keterangan, dan rekap semester', category: 'Akademik' },
    { id: 'jadwal', title: 'Jadwal Pelajaran & Lab', desc: 'Jadwal kelas teori, jadwal lab komputer, lab bengkel, dan kalender', category: 'Akademik' },
    { id: 'pkl', title: 'Praktik Kerja Lapangan (PKL)', desc: 'Jurnal harian magang industri, presensi GPS DUDI, dan lembar bimbingan', category: 'Khas SMK' },
    { id: 'tefa', title: 'Teaching Factory (TEFA)', desc: 'Unit produksi sekolah, pesanan riil klien, dan keterlibatan siswa', category: 'Khas SMK' },
    { id: 'ukk', title: 'Uji Kompetensi Keahlian (UKK)', desc: 'Sertifikasi BNSP / LSP-P1 SMK dan e-portofolio karya siswa', category: 'Khas SMK' },
    { id: 'bkk', title: 'Bursa Kerja Khusus (BKK)', desc: 'Lowongan kerja industri mitra dan tracer study alumni BMW', category: 'Khas SMK' },
    { id: 'ismuba', title: 'Karakter ISMUBA', desc: 'Al-Islam, Kemuhammadiyahan, Bahasa Arab, Hizbul Wathan, Tapak Suci', category: 'Karakter' },
    { id: 'kedisiplinan', title: 'Kedisiplinan & Bimbingan BK', desc: 'Poin prestasi, catatan pelanggaran, tata tertib, dan konseling privat', category: 'Karakter' },
    { id: 'pengumuman', title: 'Papan Pengumuman Sekolah', desc: 'Surat edaran resmi, agenda kegiatan, informasi beasiswa & PKL', category: 'Komunikasi' },
    { id: 'pesan_forum', title: 'Pesan Masuk & Forum Diskusi', desc: 'Chat langsung guru-siswa-ortu dan forum tanya jawab mapel', category: 'Komunikasi' },
    { id: 'jurnal_mengajar', title: 'Jurnal Mengajar Guru', desc: 'Pencatatan materi harian guru, presensi kelas, dan remedial', category: 'Guru' },
    { id: 'manajemen_user', title: 'Pengelolaan Sistem & User', desc: 'Master data sekolah, 12 peran akses, backup DB, dan helpdesk', category: 'Sistem' },
  ];

  const filteredSearchResults = searchableMenus.filter(
    (m) =>
      m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // If in Public Mode (or user explicitly browses public landing)
  if (isPublicMode) {
    return <PublicPortal onLoginAsRole={handleLoginFromPortal} />;
  }

  // Render dynamic main view based on currentView & activeRole
  const renderCurrentView = () => {
    switch (currentView) {
      case 'dashboard':
        if (activeRole === 'siswa') {
          return (
            <StudentDashboard
              user={currentUser}
              classes={MOCK_CLASSES}
              assignments={MOCK_ASSIGNMENTS}
              exams={MOCK_EXAMS}
              schedule={MOCK_SCHEDULE}
              announcements={MOCK_ANNOUNCEMENTS}
              onNavigate={(view) => setCurrentView(view)}
            />
          );
        }
        if (activeRole === 'guru') {
          return (
            <TeacherDashboard
              user={currentUser}
              classes={MOCK_CLASSES}
              assignments={MOCK_ASSIGNMENTS}
              journals={MOCK_TEACHING_JOURNALS}
              onNavigate={(view) => setCurrentView(view)}
            />
          );
        }
        if (activeRole === 'wali_kelas') {
          return (
            <HomeroomDashboard
              user={currentUser}
              classes={MOCK_CLASSES}
              onNavigate={(view) => setCurrentView(view)}
            />
          );
        }
        if (activeRole === 'kepala_sekolah') {
          return (
            <PrincipalDashboard
              user={currentUser}
              onNavigate={(view) => setCurrentView(view)}
            />
          );
        }
        if (activeRole === 'orang_tua') {
          return (
            <ParentDashboard
              user={currentUser}
              onNavigate={(view) => setCurrentView(view)}
            />
          );
        }
        return (
          <AdminDashboard
            user={currentUser}
            tickets={MOCK_HELPDESK_TICKETS}
            onNavigate={(view) => setCurrentView(view)}
          />
        );

      case 'kelas_saya':
      case 'data_siswa_kelas':
      case 'monitoring_guru':
        return (
          <MyClassesView
            classes={MOCK_CLASSES}
            onSelectClass={(cls) => setCurrentView('materi')}
          />
        );

      case 'materi':
      case 'perangkat_ajar':
        return (
          <LearningMaterialsView
            materials={MOCK_MATERIALS}
            classes={MOCK_CLASSES}
            userRole={activeRole}
            onAddNewMaterial={() => setCreateModalType('materi')}
          />
        );

      case 'tugas':
        return (
          <AssignmentsView
            assignments={MOCK_ASSIGNMENTS}
            classes={MOCK_CLASSES}
            userRole={activeRole}
            onAddNewAssignment={() => setCreateModalType('tugas')}
          />
        );

      case 'ujian':
      case 'bank_soal':
        return (
          <ExamsAssessmentsView
            exams={MOCK_EXAMS}
            classes={MOCK_CLASSES}
            userRole={activeRole}
            onAddNewExam={() => setCreateModalType('ujian')}
          />
        );

      case 'nilai':
      case 'analitik':
      case 'laporan_wali':
      case 'laporan_guru':
      case 'laporan_sekolah':
      case 'penilaian_remedial':
        return <GradesView grades={MOCK_GRADES} user={currentUser} />;

      case 'kehadiran':
        return <AttendanceView user={currentUser} />;

      case 'jadwal':
      case 'kalender_akademik':
        return <ScheduleView schedule={MOCK_SCHEDULE} />;

      case 'pkl':
        return <PKLView pklList={MOCK_PKL_STUDENTS} user={currentUser} />;

      case 'tefa':
        return <TEFAView tefaUnits={MOCK_TEFA_UNITS} />;

      case 'ukk':
      case 'sertifikasi':
      case 'portofolio':
      case 'prestasi':
        return <UKKPortfolioView user={currentUser} />;

      case 'bkk':
        return <BKKView />;

      case 'ismuba':
      case 'kokurikuler':
      case 'ekstrakurikuler':
        return <IsmubaView />;

      case 'kedisiplinan':
      case 'bk':
        return (
          <DisciplineView
            records={MOCK_DISCIPLINE_RECORDS}
            user={currentUser}
          />
        );

      case 'pengumuman':
        return <AnnouncementsView announcements={MOCK_ANNOUNCEMENTS} />;

      case 'pesan_forum':
      case 'komunikasi_ortu':
        return <MessagesForumView user={currentUser} />;

      case 'jurnal_mengajar':
        return (
          <TeachingJournalView
            journals={MOCK_TEACHING_JOURNALS}
            classes={MOCK_CLASSES}
            user={currentUser}
          />
        );

      case 'manajemen_user':
      case 'master_data':
      case 'integrasi':
      case 'pengaturan_sistem':
      case 'bantuan':
      case 'pusat_dokumen':
      case 'laporan_admin':
      case 'perpustakaan':
        return (
          <AdminManagementView
            user={currentUser}
            tickets={MOCK_HELPDESK_TICKETS}
          />
        );

      default:
        return (
          <StudentDashboard
            user={currentUser}
            classes={MOCK_CLASSES}
            assignments={MOCK_ASSIGNMENTS}
            exams={MOCK_EXAMS}
            schedule={MOCK_SCHEDULE}
            announcements={MOCK_ANNOUNCEMENTS}
            onNavigate={(view) => setCurrentView(view)}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100 antialiased flex flex-col selection:bg-emerald-500 selection:text-white">
      
      {/* Top Main Navigation Header */}
      <Header
        currentUser={currentUser}
        onSwitchRole={handleSwitchRole}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenNotifications={() => setIsNotifsOpen(!isNotifsOpen)}
        unreadNotifsCount={3}
        onLogout={handleLogout}
        onOpenProfile={() => setCurrentView('manajemen_user')}
      />

      {/* Breadcrumbs & Mobile Action Bar */}
      <div className="bg-white/80 dark:bg-slate-900/80 border-b border-slate-200 dark:border-slate-800 py-2 px-4 sm:px-8 flex items-center justify-between text-xs backdrop-blur-xs">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsMobileSidebarOpen(true)}
            className="lg:hidden p-1.5 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            title="Buka Menu"
          >
            <Menu className="w-4 h-4" />
          </button>

          <span className="text-slate-400">LMS SMK 4 Palembang</span>
          <ChevronRight className="w-3 h-3 text-slate-400" />
          <span className="font-bold text-emerald-700 dark:text-emerald-400 capitalize">
            {currentView.replace(/_/g, ' ')}
          </span>
        </div>

        <div className="flex items-center space-x-3">
          <span className="hidden sm:inline-flex items-center text-slate-500 font-mono text-[11px]">
            <Calendar className="w-3.5 h-3.5 mr-1 text-emerald-600" />
            Selasa, 1 September 2026
          </span>
          <button
            onClick={() => setIsPublicMode(true)}
            className="text-slate-600 dark:text-slate-300 hover:text-emerald-600 font-semibold transition flex items-center"
          >
            <span>Portal Publik</span>
          </button>
        </div>
      </div>

      {/* App Body: Sidebar + Main Content */}
      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        {/* Responsive Sidebar */}
        <Sidebar
          activeRole={activeRole}
          currentView={currentView}
          onSelectView={(viewId) => setCurrentView(viewId)}
          isOpenMobile={isMobileSidebarOpen}
          onCloseMobile={() => setIsMobileSidebarOpen(false)}
        />

        {/* Dynamic Main Workspace View */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 min-w-0 overflow-y-auto">
          {renderCurrentView()}
        </main>
      </div>

      {/* Notifications Drawer */}
      {isNotifsOpen && (
        <div className="fixed inset-y-0 right-0 w-80 sm:w-96 bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 shadow-2xl z-50 p-5 flex flex-col justify-between animate-in slide-in-from-right duration-200">
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h2 className="font-extrabold text-slate-900 dark:text-white text-base">
                Pemberitahuan Sistem
              </h2>
              <button
                onClick={() => setIsNotifsOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2.5 overflow-y-auto max-h-[calc(100vh-160px)] text-xs">
              <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 space-y-1">
                <div className="font-bold text-emerald-900 dark:text-emerald-200">
                  Nilai Tugas Praktikum 4 Diterbitkan
                </div>
                <p className="text-slate-600 dark:text-slate-300 text-[11px]">
                  Ustazah Siti Rahmawati telah menilai tugas dengan skor 95 (A).
                </p>
                <span className="text-[10px] text-slate-400">10 menit yang lalu</span>
              </div>

              <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 space-y-1">
                <div className="font-bold text-blue-900 dark:text-blue-200">
                  Jadwal Ujian STS CBT Aktif
                </div>
                <p className="text-slate-600 dark:text-slate-300 text-[11px]">
                  Simulasi Ujian Tengah Semester CBT Pemrograman Web dibuka.
                </p>
                <span className="text-[10px] text-slate-400">1 jam yang lalu</span>
              </div>

              <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 space-y-1">
                <div className="font-bold text-amber-900 dark:text-amber-200">
                  Verifikasi Jurnal PKL Disetujui
                </div>
                <p className="text-slate-600 dark:text-slate-300 text-[11px]">
                  Pembimbing DUDI PT Telkom memvalidasi logbook PKL minggu ini.
                </p>
                <span className="text-[10px] text-slate-400">3 jam yang lalu</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => setIsNotifsOpen(false)}
            className="w-full py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold rounded-xl text-xs transition"
          >
            Tutup Panel
          </button>
        </div>
      )}

      {/* Spotlight Global Search Modal (Ctrl + K) */}
      {isSearchOpen && (
        <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs flex items-start justify-center pt-20 p-4 z-50 animate-in fade-in duration-150">
          <div className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden">
            
            {/* Search Input Box */}
            <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center space-x-3">
              <Search className="w-5 h-5 text-emerald-600" />
              <input
                autoFocus
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Ketik nama menu, modul pelajaran, tugas, PKL, atau TEFA..."
                className="flex-1 bg-transparent border-none text-sm text-slate-900 dark:text-white focus:outline-none placeholder:text-slate-400"
              />
              <button
                onClick={() => setIsSearchOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Search Results List */}
            <div className="p-3 max-h-96 overflow-y-auto space-y-1">
              {filteredSearchResults.length > 0 ? (
                filteredSearchResults.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setCurrentView(item.id);
                      setIsSearchOpen(false);
                      setSearchQuery('');
                    }}
                    className="w-full text-left p-3 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800/80 transition flex items-center justify-between text-xs group"
                  >
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-extrabold text-slate-900 dark:text-white text-sm group-hover:text-emerald-600 transition">
                          {item.title}
                        </span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                          {item.category}
                        </span>
                      </div>
                      <p className="text-slate-500 text-[11px] mt-0.5">{item.desc}</p>
                    </div>

                    <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-emerald-600 transition -translate-x-2 group-hover:translate-x-0 opacity-0 group-hover:opacity-100" />
                  </button>
                ))
              ) : (
                <div className="py-12 text-center text-xs text-slate-400">
                  Tidak menemukan menu yang cocok dengan "{searchQuery}"
                </div>
              )}
            </div>

            <div className="px-4 py-2.5 bg-slate-50 dark:bg-slate-800/60 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center text-[10px] text-slate-400">
              <span>Navigasi Cepat Seluruh 20 Struktur Menu LMS</span>
              <span>Tekan <kbd className="px-1 py-0.5 bg-white dark:bg-slate-900 border rounded font-mono">ESC</kbd> untuk menutup</span>
            </div>

          </div>
        </div>
      )}

      {/* Create Item Quick Modal */}
      <CreateItemModal
        isOpen={createModalType !== null}
        type={createModalType}
        classes={MOCK_CLASSES}
        onClose={() => setCreateModalType(null)}
        onSuccess={(newItem) => {
          console.log('New item created:', newItem);
        }}
      />

    </div>
  );
}
