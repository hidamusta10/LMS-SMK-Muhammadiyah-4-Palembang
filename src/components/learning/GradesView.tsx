import React from 'react';
import { GradeRecord, UserProfile } from '../../types';
import {
  Award,
  TrendingUp,
  FileSpreadsheet,
  Printer,
  CheckCircle2,
  AlertCircle,
  Sparkles,
} from 'lucide-react';

interface GradesViewProps {
  grades: GradeRecord[];
  user: UserProfile;
}

export const GradesView: React.FC<GradesViewProps> = ({ grades, user }) => {
  const averageFinalScore = (
    grades.reduce((acc, curr) => acc + curr.finalScore, 0) / grades.length
  ).toFixed(1);

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="inline-flex items-center space-x-1 text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
            <Award className="w-3.5 h-3.5 mr-1" />
            <span>Menu 7: Nilai & Capaian Hasil Belajar</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1">
            Transkrip Nilai & Ketercapaian TP (KKTP)
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Rekap nilai formatif, sumatif (STS & SAS), portofolio jobsheet, dan predikat ketercapaian.
          </p>
        </div>

        <button
          onClick={() => window.print()}
          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-sm flex items-center space-x-1.5 transition self-start"
        >
          <Printer className="w-3.5 h-3.5" />
          <span>Cetak Leger / Rapor Bayangan</span>
        </button>
      </div>

      {/* Summary Score Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700/80 shadow-xs">
          <div className="text-xs text-slate-500">Rata-Rata Nilai Akhir</div>
          <div className="text-3xl font-extrabold text-emerald-600 mt-1">
            {averageFinalScore}
          </div>
          <div className="text-[11px] text-emerald-600 font-semibold mt-1">
            Predikat: A (Sangat Memuaskan)
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700/80 shadow-xs">
          <div className="text-xs text-slate-500">Mata Pelajaran Tuntas</div>
          <div className="text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
            {grades.length} / {grades.length}
          </div>
          <div className="text-[11px] text-emerald-600 font-semibold mt-1 flex items-center">
            <CheckCircle2 className="w-3 h-3 mr-1" />
            100% Memenuhi KKTP
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700/80 shadow-xs">
          <div className="text-xs text-slate-500">Nilai Tertinggi</div>
          <div className="text-3xl font-extrabold text-blue-600 mt-1">94.0</div>
          <div className="text-[11px] text-blue-600 font-semibold mt-1">
            Basis Data & Cloud Database
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700/80 shadow-xs">
          <div className="text-xs text-slate-500">Status Remedial</div>
          <div className="text-3xl font-extrabold text-emerald-600 mt-1">0 Mapel</div>
          <div className="text-[11px] text-slate-400 font-semibold mt-1">
            Tidak ada remedial tertunda
          </div>
        </div>

      </div>

      {/* Full Grade Ledger Table */}
      <div className="bg-white dark:bg-slate-800/90 rounded-2xl border border-slate-200 dark:border-slate-700 p-5 space-y-4 shadow-xs">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-slate-900 dark:text-white flex items-center">
            <FileSpreadsheet className="w-4 h-4 mr-2 text-emerald-600" />
            Rincian Nilai Semester Genap 2025/2026
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 dark:bg-slate-900/60 text-slate-500 uppercase">
              <tr>
                <th className="p-3">Mata Pelajaran</th>
                <th className="p-3 text-center">KKTP</th>
                <th className="p-3 text-center">Tugas & Jobsheet</th>
                <th className="p-3 text-center">Kuis CBT</th>
                <th className="p-3 text-center">STS (Mid)</th>
                <th className="p-3 text-center">SAS (Akhir)</th>
                <th className="p-3 text-center">Nilai Akhir</th>
                <th className="p-3 text-center">Predikat</th>
                <th className="p-3">Deskripsi Capaian Kompetensi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
              {grades.map((gr) => (
                <tr key={gr.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-700/30">
                  <td className="p-3 font-bold text-slate-900 dark:text-white">
                    {gr.subjectName}
                  </td>
                  <td className="p-3 text-center font-mono text-slate-500">{gr.kktp}</td>
                  <td className="p-3 text-center font-mono">{gr.assignmentsScore}</td>
                  <td className="p-3 text-center font-mono">{gr.quizScore}</td>
                  <td className="p-3 text-center font-mono">{gr.midExamScore}</td>
                  <td className="p-3 text-center font-mono">{gr.finalExamScore}</td>
                  <td className="p-3 text-center font-bold text-emerald-600 text-sm">
                    {gr.finalScore}
                  </td>
                  <td className="p-3 text-center">
                    <span className="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-bold text-[11px]">
                      {gr.letterGrade}
                    </span>
                  </td>
                  <td className="p-3 text-slate-600 dark:text-slate-300 text-[11px] max-w-xs">
                    {gr.teacherNote}
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
