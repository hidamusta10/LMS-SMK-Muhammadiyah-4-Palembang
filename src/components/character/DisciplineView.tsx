import React, { useState } from 'react';
import { DisciplineRecord, UserProfile } from '../../types';
import {
  ShieldAlert,
  Award,
  HeartHandshake,
  FileText,
  AlertTriangle,
  CheckCircle2,
  Calendar,
  Sparkles,
} from 'lucide-react';

interface DisciplineViewProps {
  records: DisciplineRecord[];
  user: UserProfile;
}

export const DisciplineView: React.FC<DisciplineViewProps> = ({ records, user }) => {
  const [activeTab, setActiveTab] = useState<'poin' | 'bk'>('poin');
  const [counselingRequest, setCounselingRequest] = useState('');

  const totalMerits = records
    .filter((r) => r.type === 'prestasi')
    .reduce((acc, curr) => acc + curr.points, 0);

  const totalViolations = records
    .filter((r) => r.type === 'pelanggaran')
    .reduce((acc, curr) => acc + curr.points, 0);

  const netPoints = 100 + totalMerits - totalViolations;

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="inline-flex items-center space-x-1 text-xs font-bold text-rose-600 dark:text-rose-400 uppercase tracking-wider">
            <ShieldAlert className="w-3.5 h-3.5 mr-1" />
            <span>Menu 15: Kedisiplinan & Bimbingan Konseling</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1">
            Buku Catatan Karakter & Konseling BK
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Sistem poin kedisiplinan, rekam jejak prestasi, dan layanan pendampingan siswa terpadu.
          </p>
        </div>
      </div>

      {/* Point Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 space-y-1 shadow-xs">
          <div className="text-xs text-slate-500 font-bold">Skor Karakter Siswa (Net)</div>
          <div className="text-3xl font-extrabold text-emerald-600">{netPoints} / 100</div>
          <p className="text-[11px] text-emerald-600 font-semibold">Predikat: Sangat Baik & Berprestasi</p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 space-y-1 shadow-xs">
          <div className="text-xs text-slate-500 font-bold flex items-center text-emerald-600">
            <Award className="w-4 h-4 mr-1" />
            Poin Prestasi & Kebaikan
          </div>
          <div className="text-3xl font-extrabold text-emerald-600">+{totalMerits} Poin</div>
          <p className="text-[11px] text-slate-400">Juara 1 LKS Web Tech & Duta Sekolah</p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 space-y-1 shadow-xs">
          <div className="text-xs text-slate-500 font-bold flex items-center text-rose-500">
            <AlertTriangle className="w-4 h-4 mr-1" />
            Poin Pelanggaran
          </div>
          <div className="text-3xl font-extrabold text-slate-700 dark:text-slate-300">-{totalViolations} Poin</div>
          <p className="text-[11px] text-slate-400">Terlambat masuk sesi 1x</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex overflow-x-auto space-x-2 border-b border-slate-200 dark:border-slate-800 pb-2">
        <button
          onClick={() => setActiveTab('poin')}
          className={`px-3.5 py-1.5 text-xs font-bold rounded-xl whitespace-nowrap transition ${
            activeTab === 'poin'
              ? 'bg-rose-600 text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          Riwayat Poin & Catatan Karakter
        </button>
        <button
          onClick={() => setActiveTab('bk')}
          className={`px-3.5 py-1.5 text-xs font-bold rounded-xl whitespace-nowrap transition ${
            activeTab === 'bk'
              ? 'bg-rose-600 text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          Layanan Konseling BK (Rahasia & Nyaman)
        </button>
      </div>

      {/* Tab: Riwayat Poin */}
      {activeTab === 'poin' && (
        <div className="bg-white dark:bg-slate-800/90 rounded-2xl border border-slate-200 dark:border-slate-700 p-5 space-y-3 shadow-xs">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">
            Log Mutasi Poin Kedisiplinan & Prestasi
          </h3>

          <div className="space-y-2.5">
            {records.map((r) => (
              <div
                key={r.id}
                className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 flex items-center justify-between text-xs"
              >
                <div className="space-y-0.5">
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-slate-900 dark:text-white">{r.category}</span>
                    <span className="text-[11px] text-slate-400">• {r.date}</span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 text-[11px]">{r.description}</p>
                  <div className="text-[10px] text-slate-400">Dicatat oleh: {r.reportedBy}</div>
                </div>

                <span
                  className={`text-sm font-extrabold px-3 py-1 rounded-xl ${
                    r.type === 'prestasi'
                      ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                      : 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                  }`}
                >
                  {r.type === 'prestasi' ? `+${r.points}` : `-${r.points}`}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab: Layanan BK */}
      {activeTab === 'bk' && (
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 space-y-4 shadow-xs max-w-2xl">
          <div className="flex items-center space-x-3 text-rose-600">
            <HeartHandshake className="w-6 h-6" />
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Konsultasi Bimbingan & Konseling Online
              </h3>
              <p className="text-xs text-slate-500">
                Semua pesan dan sesi konsultasi bersifat rahasia dan aman bersama Guru BK Sekolah.
              </p>
            </div>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                Topik Konsultasi / Curahan Hati:
              </label>
              <textarea
                rows={3}
                value={counselingRequest}
                onChange={(e) => setCounselingRequest(e.target.value)}
                placeholder="Ceritakan kendala belajar, pemilihan jurusan, rencana magang PKL, atau masalah pribadi..."
                className="w-full p-3 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl focus:outline-none focus:border-rose-500 text-slate-900 dark:text-white"
              />
            </div>

            <button
              onClick={() => {
                if (!counselingRequest) return;
                alert('Jadwal konsultasi BK telah diajukan. Guru BK akan menghubungi Anda melalui chat privat.');
                setCounselingRequest('');
              }}
              className="w-full py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl shadow-xs transition"
            >
              Ajukan Jadwal Sesi Konseling
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
