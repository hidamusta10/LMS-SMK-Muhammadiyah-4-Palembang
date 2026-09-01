import React, { useState } from 'react';
import { PKLRecord, UserProfile } from '../../types';
import {
  Briefcase,
  Building2,
  Calendar,
  CheckCircle2,
  Clock,
  FileText,
  MapPin,
  Sparkles,
  User,
  PlusCircle,
  Award,
  UploadCloud,
} from 'lucide-react';

interface PKLViewProps {
  pklRecord: PKLRecord;
  user: UserProfile;
}

export const PKLView: React.FC<PKLViewProps> = ({ pklRecord, user }) => {
  const [activeTab, setActiveTab] = useState<'profil' | 'jurnal' | 'kompetensi' | 'penilaian'>('profil');
  const [journalText, setJournalText] = useState('');
  const [journalDate, setJournalDate] = useState('2026-09-01');
  const [newLogList, setNewLogList] = useState(pklRecord.dailyLogs);

  const handleAddLog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!journalText) return;
    const newLog = {
      id: `log-${Date.now()}`,
      date: journalDate,
      activity: journalText,
      mentorApproved: false,
      hoursCount: 8,
    };
    setNewLogList([newLog, ...newLogList]);
    setJournalText('');
    alert('Jurnal harian PKL berhasil dikirim! Menunggu verifikasi pembimbing industri.');
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="inline-flex items-center space-x-1 text-xs font-bold text-teal-600 dark:text-teal-400 uppercase tracking-wider">
            <Briefcase className="w-3.5 h-3.5 mr-1" />
            <span>Menu 10: Kegiatan Khas SMK</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1">
            Praktik Kerja Lapangan (PKL) & Magang Industri
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Sistem monitoring DUDI terintegrasi, e-Jurnal, presensi geotagging, dan sertifikasi industri.
          </p>
        </div>
      </div>

      {/* Hero Banner for PKL Partner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-teal-900 via-emerald-950 to-slate-900 text-white shadow-md space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 rounded-2xl bg-teal-500/20 border border-teal-400/40 flex items-center justify-center">
              <Building2 className="w-7 h-7 text-teal-300" />
            </div>
            <div>
              <span className="text-[11px] font-mono font-bold text-teal-300 px-2 py-0.5 bg-teal-900/60 rounded">
                DUDI Mitra Industri Resmi
              </span>
              <h2 className="text-xl font-extrabold text-white mt-1">
                {pklRecord.companyName}
              </h2>
              <p className="text-xs text-teal-100/80 flex items-center gap-2 mt-0.5">
                <MapPin className="w-3 h-3 text-rose-400" />
                <span>{pklRecord.companyAddress}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <div className="px-3.5 py-2 rounded-xl bg-teal-800/80 border border-teal-500/50 text-right">
              <div className="text-[10px] text-teal-300">Nilai Akhir Industri</div>
              <div className="text-xl font-extrabold text-white">{pklRecord.finalScore} (Lulus)</div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex overflow-x-auto space-x-2 border-b border-slate-200 dark:border-slate-800 pb-2">
        {[
          { id: 'profil', label: 'Profil & Pembimbing' },
          { id: 'jurnal', label: `e-Jurnal Harian PKL (${newLogList.length})` },
          { id: 'kompetensi', label: 'Daftar Kompetensi Industri' },
          { id: 'penilaian', label: 'Sertifikat & Penilaian DUDI' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-3.5 py-1.5 text-xs font-bold rounded-xl whitespace-nowrap transition ${
              activeTab === tab.id
                ? 'bg-teal-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab 1: Profil & Pembimbing */}
      {activeTab === 'profil' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 space-y-4 shadow-xs">
            <h3 className="font-bold text-slate-900 dark:text-white text-sm flex items-center">
              <User className="w-4 h-4 mr-2 text-teal-600" />
              Informasi Pembimbing
            </h3>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-slate-50 dark:bg-slate-900/60 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1">
                <div className="text-slate-400">Pembimbing Lapangan (DUDI / Industri):</div>
                <div className="font-bold text-slate-900 dark:text-white text-sm">
                  {pklRecord.industryMentor}
                </div>
                <div className="text-[11px] text-teal-600">Senior Software Engineer & Team Lead</div>
              </div>

              <div className="p-3 bg-slate-50 dark:bg-slate-900/60 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1">
                <div className="text-slate-400">Guru Pembimbing Sekolah:</div>
                <div className="font-bold text-slate-900 dark:text-white text-sm">
                  {pklRecord.schoolMentor}
                </div>
                <div className="text-[11px] text-teal-600">Ketua Kompetensi Keahlian RPL</div>
              </div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 space-y-4 shadow-xs">
            <h3 className="font-bold text-slate-900 dark:text-white text-sm flex items-center">
              <Clock className="w-4 h-4 mr-2 text-teal-600" />
              Periode & Kehadiran PKL
            </h3>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between p-3 bg-slate-50 dark:bg-slate-900/60 rounded-xl border border-slate-200 dark:border-slate-700">
                <span className="text-slate-500">Tanggal Mulai:</span>
                <span className="font-bold text-slate-900 dark:text-white">{pklRecord.startDate}</span>
              </div>
              <div className="flex justify-between p-3 bg-slate-50 dark:bg-slate-900/60 rounded-xl border border-slate-200 dark:border-slate-700">
                <span className="text-slate-500">Tanggal Selesai:</span>
                <span className="font-bold text-slate-900 dark:text-white">{pklRecord.endDate}</span>
              </div>
              <div className="flex justify-between p-3 bg-teal-50 dark:bg-teal-950/60 rounded-xl border border-teal-200 dark:border-teal-800">
                <span className="text-teal-800 dark:text-teal-300 font-semibold">Status Pelaksanaan:</span>
                <span className="font-bold text-emerald-600">Selesai & Lulus Terverifikasi</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: e-Jurnal Harian PKL */}
      {activeTab === 'jurnal' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Form Tambah Log */}
          <div className="lg:col-span-5 p-5 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 space-y-4 shadow-xs">
            <h3 className="font-bold text-slate-900 dark:text-white text-sm flex items-center">
              <PlusCircle className="w-4 h-4 mr-2 text-teal-600" />
              Tulis Jurnal Kegiatan Harian
            </h3>

            <form onSubmit={handleAddLog} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                  Tanggal Kegiatan:
                </label>
                <input
                  type="date"
                  value={journalDate}
                  onChange={(e) => setJournalDate(e.target.value)}
                  className="w-full p-2 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl focus:outline-none focus:border-teal-500 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                  Deskripsi Pekerjaan / Aktivitas Teknis:
                </label>
                <textarea
                  required
                  rows={4}
                  value={journalText}
                  onChange={(e) => setJournalText(e.target.value)}
                  placeholder="Contoh: Mengembangkan endpoint API autentikasi menggunakan Express JS dan melakukan code review bersama mentor..."
                  className="w-full p-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl focus:outline-none focus:border-teal-500 text-slate-900 dark:text-white"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl shadow-xs transition"
              >
                Kirim Jurnal Harian
              </button>
            </form>
          </div>

          {/* List Logbook */}
          <div className="lg:col-span-7 space-y-3">
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Riwayat Logbook PKL Terverifikasi
            </div>

            <div className="space-y-3">
              {newLogList.map((log) => (
                <div
                  key={log.id}
                  className="p-4 rounded-xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 space-y-2 text-xs shadow-xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 dark:text-white flex items-center">
                      <Calendar className="w-3.5 h-3.5 mr-1 text-teal-600" />
                      {log.date}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        log.mentorApproved
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {log.mentorApproved ? 'Disetujui Mentor DUDI' : 'Menunggu Approval'}
                    </span>
                  </div>

                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                    {log.activity}
                  </p>

                  <div className="text-[11px] text-slate-400 pt-1 border-t border-slate-100 dark:border-slate-700">
                    Durasi: <strong>{log.hoursCount} Jam Kerja</strong>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* Tab 3: Kompetensi Industri */}
      {activeTab === 'kompetensi' && (
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 space-y-4 shadow-xs">
          <h3 className="font-bold text-slate-900 dark:text-white text-sm flex items-center">
            <Award className="w-4 h-4 mr-2 text-teal-600" />
            Matriks Kompetensi Industri (SKKNI & Standar Telkom)
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 space-y-1">
              <div className="font-bold text-slate-900 dark:text-white">1. Git & Team Collaboration</div>
              <p className="text-slate-500 text-[11px]">Branching, merge request, CI/CD basic pipeline.</p>
              <div className="text-emerald-600 font-bold text-[11px] pt-1">Status: Kompeten (Skor: 95)</div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 space-y-1">
              <div className="font-bold text-slate-900 dark:text-white">2. Backend RESTful API Development</div>
              <p className="text-slate-500 text-[11px]">Database schema indexing, SQL injection defense, JWT auth.</p>
              <div className="text-emerald-600 font-bold text-[11px] pt-1">Status: Kompeten (Skor: 94)</div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 space-y-1">
              <div className="font-bold text-slate-900 dark:text-white">3. Frontend State Management & UI Craft</div>
              <p className="text-slate-500 text-[11px]">React 19, Tailwind CSS, Responsive Web Design.</p>
              <div className="text-emerald-600 font-bold text-[11px] pt-1">Status: Kompeten (Skor: 92)</div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 space-y-1">
              <div className="font-bold text-slate-900 dark:text-white">4. Softskill & Etos Kerja Industri</div>
              <p className="text-slate-500 text-[11px]">Disiplin, komunikasi santun, kerja tim, problem solving.</p>
              <div className="text-emerald-600 font-bold text-[11px] pt-1">Status: Sangat Baik (Skor: 95)</div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Sertifikat & Penilaian DUDI */}
      {activeTab === 'penilaian' && (
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 space-y-5 shadow-xs">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-900 dark:text-white text-sm flex items-center">
              <FileText className="w-4 h-4 mr-2 text-teal-600" />
              Sertifikat Kelulusan PKL Resmi
            </h3>
            <button
              onClick={() => window.print()}
              className="px-4 py-1.5 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl text-xs transition"
            >
              Cetak Sertifikat DUDI
            </button>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border-2 border-dashed border-teal-500/50 text-center space-y-3">
            <Award className="w-12 h-12 text-amber-500 mx-auto" />
            <div className="space-y-1">
              <h4 className="text-base font-extrabold text-slate-900 dark:text-white">
                SERTIFIKAT PRAKTIK KERJA LAPANGAN (PKL)
              </h4>
              <p className="text-xs text-slate-500">
                Nomor: TELKOM-SUMSEL/PKL/2026/042
              </p>
            </div>
            <p className="text-xs text-slate-700 dark:text-slate-300 max-w-lg mx-auto">
              Diberikan kepada <strong>{user.name}</strong> (NIS: {user.nisOrNip}) atas keberhasilan menyelesaikan program PKL selama 6 bulan di <strong>{pklRecord.companyName}</strong> dengan Predikat <strong>Sangat Memuaskan (Nilai 93.8)</strong>.
            </p>
          </div>
        </div>
      )}

    </div>
  );
};
