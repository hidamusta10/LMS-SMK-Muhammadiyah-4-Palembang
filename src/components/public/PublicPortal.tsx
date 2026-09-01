import React, { useState } from 'react';
import {
  School,
  BookOpen,
  Users,
  Award,
  Calendar,
  Briefcase,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  LogIn,
  Layers,
  Sparkles,
  Phone,
  Mail,
  MapPin,
  Globe,
  Instagram,
  Facebook,
  Youtube,
  Send,
  HelpCircle,
  Clock,
  Laptop,
  GraduationCap,
  Megaphone,
  ExternalLink,
  ArrowRight,
  UserCheck,
} from 'lucide-react';
import { SCHOOL_INFO, MAJORS_DATA, INITIAL_ANNOUNCEMENTS } from '../../data/initialData';
import { UserRole } from '../../types';
import { ThemeToggle } from '../layout/ThemeToggle';

interface PublicPortalProps {
  onLoginAsRole: (role: UserRole) => void;
}

export const PublicPortal: React.FC<PublicPortalProps> = ({ onLoginAsRole }) => {
  const [activeTab, setActiveTab] = useState<'beranda' | 'profil' | 'jurusan' | 'panduan' | 'akademik' | 'pengumuman' | 'galeri' | 'kontak'>('beranda');
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [selectedMajorModal, setSelectedMajorModal] = useState<typeof MAJORS_DATA[0] | null>(null);
  const [helpFormSubmitted, setHelpFormSubmitted] = useState(false);

  const galleryItems = [
    {
      title: 'Praktik Pemrograman & Coding Lab RPL',
      category: 'Pembelajaran Kejuruan',
      image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&auto=format&fit=crop&q=80',
    },
    {
      title: 'Servis Sepeda Motor Berstandar Bengkel Resmi AHASS',
      category: 'Teaching Factory TSM',
      image: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?w=600&auto=format&fit=crop&q=80',
    },
    {
      title: 'Praktik Layanan Nasabah & Pembukuan Bank Mini Syariah',
      category: 'Teaching Factory AKL',
      image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&auto=format&fit=crop&q=80',
    },
    {
      title: 'Pelepasan Kontingen Siswa PKL ke Industri Bintang 5',
      category: 'Praktik Kerja Lapangan',
      image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&auto=format&fit=crop&q=80',
    },
    {
      title: 'Latihan Bersama Seni Bela Diri Tapak Suci Putera Muhammadiyah',
      category: 'Ekstrakurikuler & Karakter',
      image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=600&auto=format&fit=crop&q=80',
    },
    {
      title: 'Pameran Produk Inovasi & Gelar Karya P5 Siswa',
      category: 'Kokurikuler & Kreativitas',
      image: 'https://images.unsplash.com/photo-1511556532299-8f662fc26c06?w=600&auto=format&fit=crop&q=80',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col">
      
      {/* Top Header Bar */}
      <div className="bg-emerald-800 text-emerald-50 text-xs py-2 px-4 border-b border-emerald-900">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center space-x-4">
            <span className="font-semibold flex items-center">
              <School className="w-3.5 h-3.5 mr-1" />
              NPSN: {SCHOOL_INFO.npsn} | Akreditasi: {SCHOOL_INFO.accreditation}
            </span>
            <span className="hidden md:inline text-emerald-200">|</span>
            <span className="hidden md:inline text-emerald-200">{SCHOOL_INFO.slogan}</span>
          </div>
          <div className="flex items-center space-x-3 text-xs">
            <a href={`https://instagram.com/${SCHOOL_INFO.instagram}`} target="_blank" rel="noreferrer" className="hover:text-amber-300 transition flex items-center">
              <Instagram className="w-3 h-3 mr-1" /> {SCHOOL_INFO.instagram}
            </a>
            <span className="text-emerald-400">•</span>
            <span className="text-emerald-200 flex items-center">
              <Phone className="w-3 h-3 mr-1" /> {(SCHOOL_INFO.phone || '').split('/')[0]}
            </span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="sticky top-0 z-30 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Logo */}
            <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('beranda')}>
              <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-emerald-600 via-teal-600 to-blue-700 flex items-center justify-center text-white shadow-md shadow-emerald-600/30">
                <School className="w-6 h-6" />
              </div>
              <div>
                <span className="font-extrabold text-slate-900 dark:text-white text-base sm:text-lg tracking-tight block">
                  {SCHOOL_INFO.name}
                </span>
                <span className="text-xs text-emerald-700 dark:text-emerald-400 font-semibold">
                  Learning Management System & Portal Terintegrasi
                </span>
              </div>
            </div>

            {/* Nav Links */}
            <div className="hidden lg:flex items-center space-x-1">
              {[
                { id: 'beranda', label: 'Beranda' },
                { id: 'profil', label: 'Profil Sekolah' },
                { id: 'jurusan', label: 'Program Keahlian' },
                { id: 'panduan', label: 'Panduan LMS' },
                { id: 'akademik', label: 'Info Akademik' },
                { id: 'pengumuman', label: 'Pengumuman' },
                { id: 'galeri', label: 'Galeri' },
                { id: 'kontak', label: 'Hubungi Kami' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-3 py-2 text-xs font-semibold rounded-lg transition ${
                    activeTab === tab.id
                      ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300'
                      : 'text-slate-600 hover:text-emerald-700 dark:text-slate-300 dark:hover:text-emerald-300'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Theme Toggle & Login CTA Button */}
            <div className="flex items-center space-x-2 sm:space-x-3">
              <ThemeToggle variant="portal" />
              <button
                id="portal-login-cta-btn"
                onClick={() => setShowLoginModal(true)}
                className="flex items-center space-x-2 px-4 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-md shadow-emerald-600/20 transition transform active:scale-95"
              >
                <LogIn className="w-4 h-4" />
                <span>Masuk Portal LMS</span>
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Navigation bar */}
        <div className="lg:hidden flex overflow-x-auto py-2 px-4 space-x-2 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
          {[
            { id: 'beranda', label: 'Beranda' },
            { id: 'profil', label: 'Profil' },
            { id: 'jurusan', label: 'Jurusan' },
            { id: 'panduan', label: 'Panduan' },
            { id: 'akademik', label: 'Akademik' },
            { id: 'pengumuman', label: 'Pengumuman' },
            { id: 'galeri', label: 'Galeri' },
            { id: 'kontak', label: 'Kontak' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3 py-1 text-xs font-medium whitespace-nowrap rounded-full ${
                activeTab === tab.id
                  ? 'bg-emerald-600 text-white'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </nav>

      {/* Main Content Area based on active Tab */}
      <main className="flex-1">
        {activeTab === 'beranda' && (
          <div>
            {/* Hero Banner Section */}
            <section className="relative overflow-hidden bg-gradient-to-b from-emerald-900 via-slate-900 to-slate-950 text-white py-16 lg:py-24 px-4 sm:px-6 lg:px-8">
              <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                <div className="lg:col-span-7 space-y-6">
                  <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-semibold">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>LMS Terpadu & Terintegrasi Kurikulum Merdeka SMK</span>
                  </div>

                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
                    Pusat Pembelajaran Digital & Kejuruan <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-300">
                      SMK Muhammadiyah 4 Palembang
                    </span>
                  </h1>

                  <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl">
                    Mewujudkan generasi unggul dengan slogan <strong>SMART</strong> (Siap Kerja, Mandiri, Religius, Terampil) melalui ekosistem pembelajaran interaktif, asesmen digital CBT, pengelolaan PKL, unit Teaching Factory, serta penguatan karakter ISMUBA.
                  </p>

                  <div className="flex flex-wrap gap-3 pt-2">
                    <button
                      onClick={() => setShowLoginModal(true)}
                      className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-sm rounded-xl shadow-lg shadow-emerald-500/30 flex items-center space-x-2 transition"
                    >
                      <LogIn className="w-4 h-4" />
                      <span>Masuk ke Dashboard LMS</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setActiveTab('jurusan')}
                      className="px-5 py-3 bg-slate-800/80 hover:bg-slate-800 text-white font-semibold text-sm rounded-xl border border-slate-700 flex items-center space-x-2 transition"
                    >
                      <span>Jelajahi 5 Program Keahlian</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>

                  {/* SMART Value Pills */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-6 border-t border-slate-800">
                    <div className="p-2.5 rounded-lg bg-white/5 border border-white/10 text-center">
                      <div className="text-xs font-bold text-emerald-400">SIAP KERJA</div>
                      <div className="text-[11px] text-slate-400">Kompetensi DUDI</div>
                    </div>
                    <div className="p-2.5 rounded-lg bg-white/5 border border-white/10 text-center">
                      <div className="text-xs font-bold text-teal-400">MANDIRI</div>
                      <div className="text-[11px] text-slate-400">Jiwa Wirausaha & TEFA</div>
                    </div>
                    <div className="p-2.5 rounded-lg bg-white/5 border border-white/10 text-center">
                      <div className="text-xs font-bold text-amber-400">RELIGIUS</div>
                      <div className="text-[11px] text-slate-400">Karakter ISMUBA</div>
                    </div>
                    <div className="p-2.5 rounded-lg bg-white/5 border border-white/10 text-center">
                      <div className="text-xs font-bold text-blue-400">TERAMPIL</div>
                      <div className="text-[11px] text-slate-400">Sertifikasi BNSP & LSP</div>
                    </div>
                  </div>

                </div>

                <div className="lg:col-span-5 relative">
                  <div className="p-5 rounded-2xl bg-gradient-to-b from-slate-800/90 to-slate-900/90 border border-slate-700 shadow-2xl backdrop-blur-sm space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-700 pb-3">
                      <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center">
                        <ShieldCheck className="w-4 h-4 mr-1.5" />
                        Pintu Masuk Terpadu Sivitas
                      </span>
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                    </div>

                    <p className="text-xs text-slate-300">
                      Pilih peran Anda untuk langsung melihat antarmuka responsif pembelajaran & manajemen:
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <button
                        onClick={() => onLoginAsRole('siswa')}
                        className="p-3 rounded-xl bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/40 text-left transition group"
                      >
                        <div className="text-xs font-bold text-blue-300 flex items-center justify-between">
                          <span>Siswa / Murid</span>
                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
                        </div>
                        <div className="text-[11px] text-slate-400 mt-0.5">Kelas, Tugas, Ujian, PKL</div>
                      </button>

                      <button
                        onClick={() => onLoginAsRole('guru')}
                        className="p-3 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/40 text-left transition group"
                      >
                        <div className="text-xs font-bold text-emerald-300 flex items-center justify-between">
                          <span>Guru Pengampu</span>
                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
                        </div>
                        <div className="text-[11px] text-slate-400 mt-0.5">Materi, Penilaian, Jurnal</div>
                      </button>

                      <button
                        onClick={() => onLoginAsRole('wali_kelas')}
                        className="p-3 rounded-xl bg-purple-600/20 hover:bg-purple-600/30 border border-purple-500/40 text-left transition group"
                      >
                        <div className="text-xs font-bold text-purple-300 flex items-center justify-between">
                          <span>Wali Kelas</span>
                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
                        </div>
                        <div className="text-[11px] text-slate-400 mt-0.5">Leger & Presensi Rombel</div>
                      </button>

                      <button
                        onClick={() => onLoginAsRole('kepala_sekolah')}
                        className="p-3 rounded-xl bg-amber-600/20 hover:bg-amber-600/30 border border-amber-500/40 text-left transition group"
                      >
                        <div className="text-xs font-bold text-amber-300 flex items-center justify-between">
                          <span>Kepala Sekolah</span>
                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
                        </div>
                        <div className="text-[11px] text-slate-400 mt-0.5">Analitik Eksekutif Sekolah</div>
                      </button>

                      <button
                        onClick={() => onLoginAsRole('orang_tua')}
                        className="p-3 rounded-xl bg-rose-600/20 hover:bg-rose-600/30 border border-rose-500/40 text-left transition group"
                      >
                        <div className="text-xs font-bold text-rose-300 flex items-center justify-between">
                          <span>Orang Tua / Wali</span>
                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
                        </div>
                        <div className="text-[11px] text-slate-400 mt-0.5">Pantauan Nilai & Absensi</div>
                      </button>

                      <button
                        onClick={() => onLoginAsRole('admin')}
                        className="p-3 rounded-xl bg-slate-700/50 hover:bg-slate-700 border border-slate-600 text-left transition group"
                      >
                        <div className="text-xs font-bold text-slate-200 flex items-center justify-between">
                          <span>Administrator</span>
                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
                        </div>
                        <div className="text-[11px] text-slate-400 mt-0.5">Master Data & 12 Peran</div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Quick Stat Badges */}
            <section className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 py-6">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-3">
                    <div className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400">5</div>
                    <div className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">Program Keahlian Unggulan</div>
                  </div>
                  <div className="text-center p-3">
                    <div className="text-2xl font-extrabold text-blue-600 dark:text-blue-400">820+</div>
                    <div className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">Siswa Aktif Terdaftar</div>
                  </div>
                  <div className="text-center p-3">
                    <div className="text-2xl font-extrabold text-amber-600 dark:text-amber-400">45+</div>
                    <div className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">Mitra Industri (DUDI)</div>
                  </div>
                  <div className="text-center p-3">
                    <div className="text-2xl font-extrabold text-teal-600 dark:text-teal-400">100%</div>
                    <div className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">Asesmen CBT Terintegrasi</div>
                  </div>
                </div>
              </div>
            </section>

            {/* 5 Program Keahlian Spotlight */}
            <section className="py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
                <div>
                  <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                    Kompetensi Masa Depan
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
                    5 Program Keahlian SMK Muhammadiyah 4
                  </h2>
                </div>
                <button
                  onClick={() => setActiveTab('jurusan')}
                  className="mt-3 md:mt-0 text-xs font-bold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 flex items-center"
                >
                  Lihat Detail Fasilitas & Unit TEFA <ChevronRight className="w-4 h-4 ml-1" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {MAJORS_DATA.map((major) => (
                  <div
                    key={major.code}
                    onClick={() => {
                      setSelectedMajorModal(major);
                      setActiveTab('jurusan');
                    }}
                    className="group bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition cursor-pointer hover:border-emerald-500 flex flex-col justify-between"
                  >
                    <div>
                      <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 font-bold flex items-center justify-center text-sm border border-emerald-200 dark:border-emerald-800">
                        {major.code}
                      </div>
                      <h3 className="font-bold text-slate-900 dark:text-white text-sm mt-3 group-hover:text-emerald-600 transition">
                        {major.name}
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                        {major.tagline}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] text-emerald-600 font-semibold flex items-center justify-between">
                      <span>{major.studentsCount} Siswa</span>
                      <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Latest Announcements & School Agenda */}
            <section className="bg-slate-100/70 dark:bg-slate-900/40 py-14 px-4 sm:px-6 lg:px-8 border-y border-slate-200 dark:border-slate-800">
              <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Announcements column */}
                <div className="lg:col-span-2 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center">
                      <Megaphone className="w-5 h-5 mr-2 text-emerald-600" />
                      Pengumuman & Pemberitahuan Terbaru
                    </h3>
                    <button
                      onClick={() => setActiveTab('pengumuman')}
                      className="text-xs font-semibold text-emerald-600 hover:underline"
                    >
                      Lihat Semua
                    </button>
                  </div>

                  <div className="space-y-3">
                    {INITIAL_ANNOUNCEMENTS.slice(0, 3).map((ann) => (
                      <div
                        key={ann.id}
                        className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm hover:border-emerald-500 transition"
                      >
                        <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                          <span className="px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 font-semibold text-[10px]">
                            {ann.categoryLabel}
                          </span>
                          <span>{ann.date}</span>
                        </div>
                        <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                          {ann.title}
                        </h4>
                        <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 line-clamp-2">
                          {ann.content}
                        </p>
                        <div className="mt-2 text-[11px] text-slate-400">
                          Oleh: {ann.author}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Agenda & Quick Schedule */}
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center">
                    <Calendar className="w-5 h-5 mr-2 text-blue-600" />
                    Agenda & Jadwal Penting
                  </h3>

                  <div className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700 shadow-sm space-y-3">
                    <div className="flex items-start space-x-3 pb-3 border-b border-slate-100 dark:border-slate-700">
                      <div className="p-2 bg-emerald-100 dark:bg-emerald-900/50 text-emerald-800 dark:text-emerald-200 rounded-lg text-center font-bold text-xs">
                        10<br/><span className="text-[10px]">MAR</span>
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-900 dark:text-white">
                          Sumatif Akhir Semester (SAS) CBT Genap
                        </div>
                        <div className="text-[11px] text-slate-500">Serentak seluruh kelas X, XI, XII</div>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3 pb-3 border-b border-slate-100 dark:border-slate-700">
                      <div className="p-2 bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 rounded-lg text-center font-bold text-xs">
                        18<br/><span className="text-[10px]">MAR</span>
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-900 dark:text-white">
                          Uji Kompetensi Keahlian (UKK) Nasional
                        </div>
                        <div className="text-[11px] text-slate-500">Penguji Eksternal dari DUDI Mitra</div>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <div className="p-2 bg-amber-100 dark:bg-amber-900/50 text-amber-800 dark:text-amber-200 rounded-lg text-center font-bold text-xs">
                        25<br/><span className="text-[10px]">MAR</span>
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-900 dark:text-white">
                          Gelar Karya P5 & Bazar Produk TEFA
                        </div>
                        <div className="text-[11px] text-slate-500">Auditorium KH. Ahmad Dahlan</div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </section>
          </div>
        )}

        {/* Tab Profil Sekolah */}
        {activeTab === 'profil' && (
          <div className="max-w-5xl mx-auto py-12 px-4 sm:px-6 lg:px-8 space-y-8">
            <div>
              <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">Identitas & Kelembagaan</span>
              <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
                Profil SMK Muhammadiyah 4 Palembang
              </h1>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
                Lembaga pendidikan kejuruan berakreditasi A (Unggul) di bawah naungan Majelis Pendidikan Dasar dan Menengah Pimpinan Wilayah Muhammadiyah Sumatera Selatan.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
                <h3 className="font-bold text-emerald-700 dark:text-emerald-400 text-base">Visi Sekolah</h3>
                <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed italic">
                  "Menjadi Sekolah Menengah Kejuruan Pusat Keunggulan yang menghasilkan lulusan berakhlak mulia, kompeten, mandiri, dan berdaya saing global berlandaskan nilai-nilai Islam."
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
                <h3 className="font-bold text-emerald-700 dark:text-emerald-400 text-base">Misi Utama</h3>
                <ul className="text-xs text-slate-700 dark:text-slate-300 space-y-2 list-disc list-inside">
                  <li>Menyelenggarakan pendidikan kejuruan berbasis kompetensi industri dan standar BNSP.</li>
                  <li>Mengembangkan unit Teaching Factory (TEFA) sebagai sarana pembelajaran berbasis produksi nyata.</li>
                  <li>Menanamkan nilai-nilai Al-Islam dan Kemuhammadiyahan (ISMUBA) dalam pembentukan akhlak karimah.</li>
                  <li>Memperluas kemitraan strategis dengan Dunia Usaha dan Dunia Industri (DUDI).</li>
                </ul>
              </div>
            </div>

            {/* Slogan SMART Breakdown */}
            <div className="p-6 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 space-y-4">
              <h3 className="font-extrabold text-slate-900 dark:text-white text-base">
                Nilai Karakter Budaya Sekolah: SMART
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div className="p-3 bg-white dark:bg-slate-800 rounded-xl shadow-xs">
                  <div className="text-sm font-bold text-emerald-600">S — Siap Kerja</div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">Lulusan memiliki skill praktis teruji dan bersertifikat BNSP.</p>
                </div>
                <div className="p-3 bg-white dark:bg-slate-800 rounded-xl shadow-xs">
                  <div className="text-sm font-bold text-teal-600">M — Mandiri</div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">Mampu berwirausaha mandiri melalui pengalaman Teaching Factory.</p>
                </div>
                <div className="p-3 bg-white dark:bg-slate-800 rounded-xl shadow-xs">
                  <div className="text-sm font-bold text-amber-600">R — Religius</div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">Disiplin ibadah, tartil Al-Qur’an, dan berakhlakul karimah.</p>
                </div>
                <div className="p-3 bg-white dark:bg-slate-800 rounded-xl shadow-xs">
                  <div className="text-sm font-bold text-blue-600">T — Terampil</div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">Cakap teknologi, adaptif terhadap inovasi digital masa depan.</p>
                </div>
              </div>
            </div>

            {/* Struktur Organisasi */}
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <h3 className="font-bold text-slate-900 dark:text-white text-base">Struktur Pimpinan Sekolah</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700">
                  <div className="font-bold text-slate-900 dark:text-white">Kepala Sekolah</div>
                  <div className="text-emerald-600 font-semibold">{SCHOOL_INFO.principal}</div>
                </div>
                <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700">
                  <div className="font-bold text-slate-900 dark:text-white">Waka Kurikulum</div>
                  <div className="text-slate-600 dark:text-slate-300">H. Supriyadi, M.Pd.</div>
                </div>
                <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700">
                  <div className="font-bold text-slate-900 dark:text-white">Waka Kesiswaan & ISMUBA</div>
                  <div className="text-slate-600 dark:text-slate-300">Ust. H. Syarif Hidayatullah, Lc.</div>
                </div>
                <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700">
                  <div className="font-bold text-slate-900 dark:text-white">Waka Hubungan Industri (Humas/PKL)</div>
                  <div className="text-slate-600 dark:text-slate-300">M. Ridwan, S.T.</div>
                </div>
                <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700">
                  <div className="font-bold text-slate-900 dark:text-white">Waka Sarana & Prasarana</div>
                  <div className="text-slate-600 dark:text-slate-300">Bustamam Arifin, S.Pd., M.Si.</div>
                </div>
                <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700">
                  <div className="font-bold text-slate-900 dark:text-white">Kepala Tata Usaha</div>
                  <div className="text-slate-600 dark:text-slate-300">Hj. Rusmini, S.E.</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab Program Keahlian */}
        {activeTab === 'jurusan' && (
          <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 space-y-8">
            <div>
              <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">Konsentrasi Keahlian</span>
              <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
                Program Keahlian & Unit Teaching Factory (TEFA)
              </h1>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
                Setiap program keahlian terintegrasi dengan laboratorium modern, sertifikasi industri, dan unit produksi nyata.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {MAJORS_DATA.map((major) => (
                <div
                  key={major.code}
                  className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="px-3 py-1 bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-xs font-bold rounded-lg">
                        {major.code}
                      </span>
                      <span className="text-xs text-slate-500 font-semibold">{major.studentsCount} Siswa</span>
                    </div>

                    <h3 className="font-bold text-slate-900 dark:text-white text-lg">
                      {major.name}
                    </h3>

                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      {major.description}
                    </p>

                    <div className="p-3 bg-slate-50 dark:bg-slate-800/70 rounded-xl space-y-1.5 border border-slate-100 dark:border-slate-700">
                      <div className="text-[11px] font-bold text-emerald-700 dark:text-emerald-400">
                        Unit Teaching Factory:
                      </div>
                      <div className="text-xs text-slate-800 dark:text-slate-200 font-medium">
                        {major.tefaUnit}
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="text-[11px] font-bold text-slate-500 uppercase">Mitra Industri (DUDI):</div>
                      <div className="flex flex-wrap gap-1">
                        {major.dudiPartners.map((partner, idx) => (
                          <span key={idx} className="text-[10px] px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded font-medium">
                            {partner}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                    <span className="text-slate-500">Kaprog:</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200 truncate max-w-[180px]">{major.head}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab Panduan LMS */}
        {activeTab === 'panduan' && (
          <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8 space-y-8">
            <div>
              <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">Pusat Bantuan Pengguna</span>
              <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
                Panduan Penggunaan LMS SMART
              </h1>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
                Petunjuk ringkas dan panduan interaktif bagi Siswa, Guru, Orang Tua, dan Administrator.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
                <div className="flex items-center space-x-2 text-blue-600 font-bold text-sm">
                  <Users className="w-5 h-5" />
                  <span>Panduan untuk Siswa</span>
                </div>
                <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-2 list-disc list-inside">
                  <li>Login menggunakan NIS/NISN dan password yang diberikan wali kelas.</li>
                  <li>Buka menu <strong>Kelas Saya</strong> untuk mengunduh modul ajar dan jobsheet.</li>
                  <li>Kumpulkan tugas sebelum batas deadline berakhir.</li>
                  <li>Masukkan token pada menu <strong>Ujian CBT</strong> saat asesmen dimulai.</li>
                  <li>Isi jurnal harian PKL dan catat log ibadah ISMUBA secara berkala.</li>
                </ul>
              </div>

              <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
                <div className="flex items-center space-x-2 text-emerald-600 font-bold text-sm">
                  <GraduationCap className="w-5 h-5" />
                  <span>Panduan untuk Guru</span>
                </div>
                <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-2 list-disc list-inside">
                  <li>Unggah perangkat ajar (Modul Ajar, ATP, KKTP) untuk verifikasi Kaprog.</li>
                  <li>Buat materi pembelajaran dengan 12 struktur lengkap.</li>
                  <li>Buat bank soal dan susun paket ujian otomatis.</li>
                  <li>Periksa tugas siswa dan berikan umpan balik konstruktif.</li>
                  <li>Isi Jurnal Mengajar harian setiap selesai tatap muka/praktik di lab.</li>
                </ul>
              </div>

              <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
                <div className="flex items-center space-x-2 text-rose-600 font-bold text-sm">
                  <UserCheck className="w-5 h-5" />
                  <span>Panduan untuk Orang Tua</span>
                </div>
                <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-2 list-disc list-inside">
                  <li>Pantau kehadiran harian dan keterlambatan ananda secara real-time.</li>
                  <li>Lihat daftar tugas yang belum dikumpulkan ananda.</li>
                  <li>Cek perkembangan nilai dan rapor hasil belajar.</li>
                  <li>Gunakan fitur pesan untuk berkonsultasi langsung dengan Wali Kelas/Guru BK.</li>
                </ul>
              </div>

              <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
                <div className="flex items-center space-x-2 text-purple-600 font-bold text-sm">
                  <ShieldCheck className="w-5 h-5" />
                  <span>Panduan untuk Administrator</span>
                </div>
                <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-2 list-disc list-inside">
                  <li>Kelola Master Data (Rombel, Guru, Siswa, Kalender Akademik).</li>
                  <li>Atur hak akses 12 peran pengguna dan reset password akun.</li>
                  <li>Pantau log aktivitas sistem dan jadwal backup database berkala.</li>
                  <li>Tanggapi tiket bantuan helpdesk yang masuk dari pengguna.</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Tab Akademik */}
        {activeTab === 'akademik' && (
          <div className="max-w-5xl mx-auto py-12 px-4 sm:px-6 lg:px-8 space-y-8">
            <div>
              <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">Informasi Pendidikan</span>
              <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
                Kalender Pendidikan & Kurikulum Merdeka SMK
              </h1>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
                Tahun Pelajaran 2025/2026 Semester Genap SMK Muhammadiyah 4 Palembang.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
              <h3 className="font-bold text-slate-900 dark:text-white text-base">
                Jadwal Kalender Semester Genap
              </h3>

              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead className="bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 uppercase tracking-wider">
                    <tr>
                      <th className="p-3">Rentang Tanggal</th>
                      <th className="p-3">Kegiatan / Agenda</th>
                      <th className="p-3">Peserta Target</th>
                      <th className="p-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    <tr>
                      <td className="p-3 font-semibold text-slate-800 dark:text-slate-200">05 - 08 Jan 2026</td>
                      <td className="p-3">Awal Semester Genap & Sosialisasi Pembelajaran</td>
                      <td className="p-3">Semua Siswa</td>
                      <td className="p-3"><span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-semibold">Selesai</span></td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-slate-800 dark:text-slate-200">15 Jan - 15 Mei 2026</td>
                      <td className="p-3">Pelaksanaan Praktik Kerja Lapangan (PKL) Gelombang 2</td>
                      <td className="p-3">Kelas XI (RPL, AKL, TSM)</td>
                      <td className="p-3"><span className="px-2 py-0.5 rounded bg-blue-100 text-blue-800 font-semibold">Sedang Berjalan</span></td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-slate-800 dark:text-slate-200">10 - 16 Maret 2026</td>
                      <td className="p-3">Sumatif Tengah Semester (STS) CBT Online</td>
                      <td className="p-3">Kelas X, XI, XII</td>
                      <td className="p-3"><span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 font-semibold">Mendatang</span></td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-slate-800 dark:text-slate-200">18 - 25 Maret 2026</td>
                      <td className="p-3">Uji Kompetensi Keahlian (UKK) & Sertifikasi LSP</td>
                      <td className="p-3">Kelas XII (Semua Jurusan)</td>
                      <td className="p-3"><span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-semibold">Mendatang</span></td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-slate-800 dark:text-slate-200">20 Juni 2026</td>
                      <td className="p-3">Pembagian Rapor Semester Genap & Pengumuman Kelulusan</td>
                      <td className="p-3">Semua Siswa & Orang Tua</td>
                      <td className="p-3"><span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-semibold">Terjadwal</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Tab Pengumuman */}
        {activeTab === 'pengumuman' && (
          <div className="max-w-5xl mx-auto py-12 px-4 sm:px-6 lg:px-8 space-y-6">
            <div>
              <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">Portal Informasi</span>
              <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
                Pengumuman Resmi Sekolah
              </h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {INITIAL_ANNOUNCEMENTS.map((ann) => (
                <div
                  key={ann.id}
                  className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 font-semibold">
                      {ann.categoryLabel}
                    </span>
                    <span className="text-slate-400">{ann.date}</span>
                  </div>

                  <h3 className="font-bold text-slate-900 dark:text-white text-base">
                    {ann.title}
                  </h3>

                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {ann.content}
                  </p>

                  {ann.attachmentName && (
                    <div className="p-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl flex items-center justify-between text-xs border border-slate-200 dark:border-slate-700">
                      <span className="text-slate-700 dark:text-slate-300 truncate">{ann.attachmentName}</span>
                      <span className="text-slate-400 text-[10px]">{ann.attachmentSize}</span>
                    </div>
                  )}

                  <div className="pt-2 text-[11px] text-slate-400 border-t border-slate-100 dark:border-slate-800">
                    Diterbitkan oleh: {ann.author}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab Galeri */}
        {activeTab === 'galeri' && (
          <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 space-y-6">
            <div>
              <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">Dokumentasi Sekolah</span>
              <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
                Galeri Pembelajaran, Proyek & Kegiatan Siswa
              </h1>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {galleryItems.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm group hover:shadow-md transition"
                >
                  <div className="h-48 overflow-hidden relative">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                    />
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-slate-900/80 backdrop-blur-sm text-white text-[10px] font-semibold">
                      {item.category}
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-slate-900 dark:text-white text-sm">
                      {item.title}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab Kontak & Helpdesk */}
        {activeTab === 'kontak' && (
          <div className="max-w-5xl mx-auto py-12 px-4 sm:px-6 lg:px-8 space-y-8">
            <div>
              <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">Layanan Pengguna</span>
              <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
                Hubungi Kami & Layanan Bantuan
              </h1>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
                Pusat layanan informasi akademik, kemitraan industri, dan dukungan teknis LMS SMK Muhammadiyah 4 Palembang.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-5 space-y-4">
                <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 text-xs">
                  <h3 className="font-bold text-slate-900 dark:text-white text-sm">Identitas Sekolah</h3>
                  
                  <div className="flex items-start space-x-3 text-slate-600 dark:text-slate-300">
                    <MapPin className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{SCHOOL_INFO.address}</span>
                  </div>

                  <div className="flex items-center space-x-3 text-slate-600 dark:text-slate-300">
                    <Phone className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{SCHOOL_INFO.phone}</span>
                  </div>

                  <div className="flex items-center space-x-3 text-slate-600 dark:text-slate-300">
                    <Mail className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{SCHOOL_INFO.email}</span>
                  </div>

                  <div className="flex items-center space-x-3 text-slate-600 dark:text-slate-300">
                    <Globe className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{SCHOOL_INFO.website}</span>
                  </div>
                </div>

                {/* Social Channels */}
                <div className="p-6 bg-emerald-50 dark:bg-emerald-950/40 rounded-2xl border border-emerald-200 dark:border-emerald-800 space-y-3 text-xs">
                  <h3 className="font-bold text-slate-900 dark:text-white text-sm">Media Sosial Resmi</h3>
                  <div className="space-y-2 text-slate-700 dark:text-slate-300">
                    <div className="flex items-center space-x-2">
                      <Instagram className="w-4 h-4 text-pink-600" />
                      <span>Instagram: {SCHOOL_INFO.instagram}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Facebook className="w-4 h-4 text-blue-600" />
                      <span>Facebook: {SCHOOL_INFO.facebook}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Youtube className="w-4 h-4 text-rose-600" />
                      <span>YouTube: {SCHOOL_INFO.youtube}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Help Request Form */}
              <div className="lg:col-span-7">
                <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
                  <h3 className="font-bold text-slate-900 dark:text-white text-sm">
                    Kirim Pesan / Formulir Permintaan Bantuan LMS
                  </h3>

                  {helpFormSubmitted ? (
                    <div className="p-5 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-center space-y-2">
                      <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                      <div className="text-sm font-bold text-emerald-900 dark:text-emerald-200">
                        Pesan Berhasil Terkirim!
                      </div>
                      <p className="text-xs text-emerald-700 dark:text-emerald-300">
                        Tim Helpdesk & Administrator SMK Muhammadiyah 4 Palembang akan segera merespons melalui email/WhatsApp Anda.
                      </p>
                      <button
                        onClick={() => setHelpFormSubmitted(false)}
                        className="text-xs font-semibold text-emerald-800 underline mt-2"
                      >
                        Kirim Pesan Lain
                      </button>
                    </div>
                  ) : (
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        setHelpFormSubmitted(true);
                      }}
                      className="space-y-3 text-xs"
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Nama Lengkap</label>
                          <input required type="text" placeholder="Nama Anda" className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-emerald-500" />
                        </div>
                        <div>
                          <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Email / No WhatsApp</label>
                          <input required type="text" placeholder="email@domain.com / 08..." className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-emerald-500" />
                        </div>
                      </div>

                      <div>
                        <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Kategori Bantuan</label>
                        <select className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-emerald-500">
                          <option>Kendala Login Akun / Lupa Kata Sandi</option>
                          <option>Informasi Pendaftaran Siswa Baru (PPDB)</option>
                          <option>Kemitraan PKL & Teaching Factory (DUDI)</option>
                          <option>Informasi BKK & Lowongan Kerja</option>
                          <option>Lainnya</option>
                        </select>
                      </div>

                      <div>
                        <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Pesan / Pertanyaan</label>
                        <textarea required rows={4} placeholder="Tuliskan kendala atau pertanyaan Anda secara rinci..." className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-emerald-500" />
                      </div>

                      <button
                        type="submit"
                        className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center space-x-2 transition"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>Kirim Tiket Bantuan</span>
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 text-xs py-10 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold">
                <School className="w-5 h-5" />
              </div>
              <div>
                <span className="font-bold text-white text-sm block">{SCHOOL_INFO.name}</span>
                <span className="text-[11px] text-emerald-400">{SCHOOL_INFO.slogan}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 text-xs">
              <button onClick={() => setActiveTab('profil')} className="hover:text-white transition">Profil</button>
              <button onClick={() => setActiveTab('jurusan')} className="hover:text-white transition">Jurusan</button>
              <button onClick={() => setActiveTab('panduan')} className="hover:text-white transition">Panduan</button>
              <button onClick={() => setActiveTab('akademik')} className="hover:text-white transition">Akademik</button>
              <button onClick={() => setActiveTab('kontak')} className="hover:text-white transition">Kontak</button>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center text-[11px] text-slate-500 gap-2">
            <div>© {new Date().getFullYear()} LMS SMK Muhammadiyah 4 Palembang. All rights reserved.</div>
            <div>Terintegrasi & Responsif untuk Siswa, Guru, dan Staf Sekolah</div>
          </div>
        </div>
      </footer>

      {/* Login Modal with One-Click Multi-Role Selector */}
      {showLoginModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-lg w-full p-6 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-5 relative">
            
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center">
                  <LogIn className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-base">
                    Masuk ke LMS SMART
                  </h3>
                  <p className="text-xs text-slate-500">Pilih akses sesuai peran Anda</p>
                </div>
              </div>

              <button
                onClick={() => setShowLoginModal(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Demo Akses Sekali Klik:
              </div>

              <div className="space-y-2">
                {[
                  { role: 'siswa', title: 'Siswa / Murid', desc: 'M. Farhan Al-Ghifari (XII RPL 1) - Pembelajaran, Tugas, Nilai, PKL', color: 'border-blue-500/50 bg-blue-50/50 dark:bg-blue-950/30' },
                  { role: 'guru', title: 'Guru Pengampu', desc: 'Ustazah Siti Rahmawati, S.Kom., M.T. - Kelola Materi, Penilaian, Jurnal', color: 'border-emerald-500/50 bg-emerald-50/50 dark:bg-emerald-950/30' },
                  { role: 'wali_kelas', title: 'Wali Kelas', desc: 'Bustamam Arifin, S.Pd., M.Si. - Leger Nilai, Presensi Kelas XII RPL 1', color: 'border-purple-500/50 bg-purple-50/50 dark:bg-purple-950/30' },
                  { role: 'kepala_sekolah', title: 'Kepala Sekolah / Pimpinan', desc: 'Drs. H. Ahmad Fauzi, M.Pd. - Monitoring Mutu & Analitik Sekolah', color: 'border-amber-500/50 bg-amber-50/50 dark:bg-amber-950/30' },
                  { role: 'orang_tua', title: 'Orang Tua / Wali Siswa', desc: 'H. Bambang Irawan - Pantauan Kehadiran, Nilai & Tugas Anak', color: 'border-rose-500/50 bg-rose-50/50 dark:bg-rose-950/30' },
                  { role: 'admin', title: 'Administrator LMS', desc: 'Rian Syahputra, S.Kom. - Master Data, 12 Peran, Pengaturan Sistem', color: 'border-slate-500/50 bg-slate-100 dark:bg-slate-800/60' },
                ].map((item) => (
                  <button
                    key={item.role}
                    onClick={() => {
                      setShowLoginModal(false);
                      onLoginAsRole(item.role as UserRole);
                    }}
                    className={`w-full p-3 rounded-xl border text-left flex items-center justify-between transition hover:shadow-md ${item.color}`}
                  >
                    <div>
                      <div className="text-xs font-bold text-slate-900 dark:text-white">
                        {item.title}
                      </div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-1">
                        {item.desc}
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 shrink-0 ml-2" />
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-2 text-center text-[11px] text-slate-400">
              Butuh bantuan login? Hubungi Helpdesk di <strong>(0711) 512345</strong>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
