import React, { useState } from 'react';
import { TeachingJournal, ClassSubject, UserProfile } from '../../types';
import {
  FileSpreadsheet,
  PlusCircle,
  Calendar,
  Clock,
  CheckCircle2,
  Users,
  Printer,
  Sparkles,
  BookOpen,
} from 'lucide-react';

interface TeachingJournalViewProps {
  journals: TeachingJournal[];
  classes: ClassSubject[];
  user: UserProfile;
}

export const TeachingJournalView: React.FC<TeachingJournalViewProps> = ({
  journals,
  classes,
  user,
}) => {
  const [activeTab, setActiveTab] = useState<'jurnal' | 'remedial' | 'perangkat'>('jurnal');
  const [journalList, setJournalList] = useState<TeachingJournal[]>(journals);
  const [selectedClass, setSelectedClass] = useState<string>(classes[0]?.id || 'cls-01');
  const [topic, setTopic] = useState<string>('');
  const [activity, setActivity] = useState<string>('');
  const [notes, setNotes] = useState<string>('');

  const handleCreateJournal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic || !activity) return;

    const newJ: TeachingJournal = {
      id: `jour-${Date.now()}`,
      date: '2026-09-01',
      timeSlot: '07.30 - 11.45 WIB (5 JP)',
      className: 'XII RPL 1',
      subjectName: 'Pemrograman Web & Perangkat Bergerak',
      topic,
      learningObjective: 'Siswa memahami materi dan menyelesaikan jobsheet praktik.',
      method: 'Problem Based Learning & Praktik Lab',
      studentActivities: activity,
      presentStudents: 31,
      totalStudents: 32,
      issuesFaced: notes || 'Tidak ada kendala',
      reflectionAndFollowUp: 'Pembelajaran tuntas sesuai target capaian pembelajaran.',
      signedStatus: 'Tervalidasi',
    };

    setJournalList([newJ, ...journalList]);
    setTopic('');
    setActivity('');
    setNotes('');
    alert('Jurnal Mengajar harian berhasil disimpan dan otomatis terkirim ke Waka Kurikulum!');
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="inline-flex items-center space-x-1 text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
            <FileSpreadsheet className="w-3.5 h-3.5 mr-1" />
            <span>Menu 18: Administrasi Guru & Jurnal Mengajar</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1">
            Jurnal Pembelajaran & Administrasi Guru
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Pencatatan materi harian, bukti mengajar real-time, pengelolaan remedial & pengayaan.
          </p>
        </div>

        <button
          onClick={() => window.print()}
          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-sm flex items-center space-x-1.5 transition self-start"
        >
          <Printer className="w-3.5 h-3.5" />
          <span>Cetak Rekap Jurnal Mengajar</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex overflow-x-auto space-x-2 border-b border-slate-200 dark:border-slate-800 pb-2">
        <button
          onClick={() => setActiveTab('jurnal')}
          className={`px-3.5 py-1.5 text-xs font-bold rounded-xl whitespace-nowrap transition ${
            activeTab === 'jurnal'
              ? 'bg-emerald-600 text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          e-Jurnal Mengajar Harian ({journalList.length})
        </button>
        <button
          onClick={() => setActiveTab('remedial')}
          className={`px-3.5 py-1.5 text-xs font-bold rounded-xl whitespace-nowrap transition ${
            activeTab === 'remedial'
              ? 'bg-emerald-600 text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          Program Remedial & Pengayaan
        </button>
        <button
          onClick={() => setActiveTab('perangkat')}
          className={`px-3.5 py-1.5 text-xs font-bold rounded-xl whitespace-nowrap transition ${
            activeTab === 'perangkat'
              ? 'bg-emerald-600 text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          Perangkat Ajar (RPP / Modul / ATP)
        </button>
      </div>

      {/* Tab: Jurnal Mengajar */}
      {activeTab === 'jurnal' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Form Input Jurnal */}
          <div className="lg:col-span-5 p-5 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 space-y-4 shadow-xs">
            <h3 className="font-bold text-slate-900 dark:text-white text-sm flex items-center">
              <PlusCircle className="w-4 h-4 mr-2 text-emerald-600" />
              Isi Jurnal Pembelajaran Hari Ini
            </h3>

            <form onSubmit={handleCreateJournal} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                  Pilih Kelas & Mata Pelajaran:
                </label>
                <select
                  value={selectedClass}
                  onChange={(e) => setSelectedClass(e.target.value)}
                  className="w-full p-2 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl focus:outline-none focus:border-emerald-500 text-slate-900 dark:text-white font-semibold"
                >
                  {classes.map((cls) => (
                    <option key={cls.id} value={cls.id}>
                      {cls.name} ({cls.room})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                  Materi Pokok / Topik Pembelajaran:
                </label>
                <input
                  type="text"
                  required
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="Contoh: Implementasi Middleware Autentikasi JWT & Role Verification"
                  className="w-full p-2 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl focus:outline-none focus:border-emerald-500 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                  Ringkasan Aktivitas / Langkah Pembelajaran:
                </label>
                <textarea
                  required
                  rows={3}
                  value={activity}
                  onChange={(e) => setActivity(e.target.value)}
                  placeholder="Contoh: Penjelasan teori token JWT, demonstrasi live-coding di lab komputer, dan pengerjaan jobsheet praktik nomor 4..."
                  className="w-full p-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl focus:outline-none focus:border-emerald-500 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                  Catatan Kelas / Tindak Lanjut:
                </label>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Contoh: 3 siswa membutuhkan bimbingan tambahan pada debugging headers"
                  className="w-full p-2 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl focus:outline-none focus:border-emerald-500 text-slate-900 dark:text-white"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-xs transition"
              >
                Simpan & Validasi Jurnal Mengajar
              </button>
            </form>
          </div>

          {/* List of Previous Teaching Journals */}
          <div className="lg:col-span-7 space-y-3">
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Rekapitulasi Jurnal Terbit
            </div>

            <div className="space-y-3">
              {journalList.map((j) => (
                <div
                  key={j.id}
                  className="p-4 rounded-xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 space-y-2 text-xs shadow-xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 dark:text-white flex items-center">
                      <Calendar className="w-3.5 h-3.5 mr-1 text-emerald-600" />
                      {j.date} • {j.timeSlot}
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
                      {j.className}
                    </span>
                  </div>

                  <div className="font-semibold text-emerald-700 dark:text-emerald-400">
                    Topik: {j.topic}
                  </div>

                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-[11px]">
                    {j.studentActivities}
                  </p>

                  <div className="pt-2 border-t border-slate-100 dark:border-slate-700 text-[11px] text-slate-500 flex justify-between">
                    <span>Presensi: <strong>{j.presentStudents} / {j.totalStudents} Hadir</strong></span>
                    <span className="text-slate-400">Catatan: {j.issuesFaced}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* Tab: Remedial & Pengayaan */}
      {activeTab === 'remedial' && (
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 space-y-4 shadow-xs">
          <h3 className="font-bold text-slate-900 dark:text-white text-sm">
            Daftar Tindak Lanjut Pembelajaran (Remedial & Pengayaan Siswa)
          </h3>

          <div className="space-y-3 text-xs">
            <div className="p-4 rounded-xl bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 flex items-center justify-between">
              <div>
                <div className="font-bold text-amber-900 dark:text-amber-200">
                  Bagas Pratama (XII RPL 1)
                </div>
                <div className="text-[11px] text-slate-600 dark:text-slate-300">
                  Remedial Kuis 2 (Skor Awal: 68 • Target KKTP: 75)
                </div>
              </div>
              <button
                onClick={() => alert('Memberikan soal remedial kuis khusus ke akun Bagas Pratama...')}
                className="px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-lg text-xs transition"
              >
                Beri Soal Remedial
              </button>
            </div>

            <div className="p-4 rounded-xl bg-blue-50/60 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 flex items-center justify-between">
              <div>
                <div className="font-bold text-blue-900 dark:text-blue-200">
                  Muhammad Farhan (XII RPL 1)
                </div>
                <div className="text-[11px] text-slate-600 dark:text-slate-300">
                  Pengayaan Lanjutan (Skor Awal: 96 • Proyek Arsitektur Microservices)
                </div>
              </div>
              <span className="text-xs font-bold text-blue-600">
                Proyek Pengayaan Aktif
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Tab: Perangkat Ajar */}
      {activeTab === 'perangkat' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 space-y-2 shadow-xs">
            <h4 className="font-bold text-slate-900 dark:text-white text-sm">Modul Ajar & RPP Kurikulum Merdeka</h4>
            <p className="text-slate-500">18 Modul pembelajaran terstandar industri DUDI.</p>
            <div className="text-emerald-600 font-bold pt-1">Lengkap 100% (Tervalidasi)</div>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 space-y-2 shadow-xs">
            <h4 className="font-bold text-slate-900 dark:text-white text-sm">Alur Tujuan Pembelajaran (ATP)</h4>
            <p className="text-slate-500">Struktur alur kompetensi fase F SMK tingkat XII.</p>
            <div className="text-emerald-600 font-bold pt-1">Tersinkronisasi Dapodik</div>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 space-y-2 shadow-xs">
            <h4 className="font-bold text-slate-900 dark:text-white text-sm">Bank Soal & Asesmen CBT</h4>
            <p className="text-slate-500">120 Butir soal terstandarisasi HOTS & SKKNI.</p>
            <div className="text-emerald-600 font-bold pt-1">Siap CBT STS/SAS</div>
          </div>
        </div>
      )}

    </div>
  );
};
