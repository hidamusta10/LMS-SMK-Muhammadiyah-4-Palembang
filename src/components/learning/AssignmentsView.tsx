import React, { useState } from 'react';
import { AssignmentItem, UserProfile } from '../../types';
import {
  CheckSquare,
  Clock,
  UploadCloud,
  FileText,
  CheckCircle2,
  AlertCircle,
  Award,
  Link,
  MessageSquare,
  Sparkles,
  Filter,
} from 'lucide-react';

interface AssignmentsViewProps {
  assignments: AssignmentItem[];
  user: UserProfile;
  selectedAssignmentId?: string | null;
  onUpdateAssignmentStatus?: (id: string, newStatus: any, submissionData: any) => void;
}

export const AssignmentsView: React.FC<AssignmentsViewProps> = ({
  assignments,
  user,
  selectedAssignmentId,
}) => {
  const [selectedAsg, setSelectedAsg] = useState<AssignmentItem | null>(
    assignments.find((a) => a.id === selectedAssignmentId) || assignments[0] || null
  );
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [submissionUrl, setSubmissionUrl] = useState<string>('');
  const [submissionNotes, setSubmissionNotes] = useState<string>('');
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);
  const [isSubmittedSuccess, setIsSubmittedSuccess] = useState<boolean>(false);

  const filteredAssignments = assignments.filter((a) => {
    if (statusFilter === 'all') return true;
    return a.status === statusFilter;
  });

  const handleSimulateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!submissionUrl && !uploadedFile && !submissionNotes) {
      alert('Harap lampirkan tautan tugas atau berkas yang diunggah!');
      return;
    }
    setIsSubmittedSuccess(true);
    setTimeout(() => {
      if (selectedAsg) {
        selectedAsg.status = 'sudah_dikumpulkan';
        selectedAsg.studentSubmissionUrl = submissionUrl || 'https://github.com/smk4plg-project/app';
      }
      setIsSubmittedSuccess(false);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="inline-flex items-center space-x-1 text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
            <CheckSquare className="w-3.5 h-3.5 mr-1" />
            <span>Menu 5: Tugas dan Proyek Kejuruan</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1">
            Penugasan Teori & Praktik Industri
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Pengumpulan jobsheet, laporan proyek TEFA, dan rubrik penilaian berbasis industri.
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex overflow-x-auto space-x-2 border-b border-slate-200 dark:border-slate-800 pb-2">
        {[
          { id: 'all', label: `Semua Tugas (${assignments.length})` },
          { id: 'belum_dikerjakan', label: 'Belum Dikerjakan' },
          { id: 'sudah_dikumpulkan', label: 'Menunggu Penilaian' },
          { id: 'sudah_dinilai', label: 'Sudah Dinilai' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setStatusFilter(tab.id)}
            className={`px-3.5 py-1.5 text-xs font-bold rounded-xl whitespace-nowrap transition ${
              statusFilter === tab.id
                ? 'bg-emerald-600 text-white'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 2-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Assignment List */}
        <div className="lg:col-span-5 space-y-3">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Daftar Penugasan ({filteredAssignments.length})
          </div>

          <div className="space-y-3">
            {filteredAssignments.map((asg) => {
              const isSelected = selectedAsg?.id === asg.id;
              return (
                <div
                  key={asg.id}
                  onClick={() => setSelectedAsg(asg)}
                  className={`p-4 rounded-xl border transition cursor-pointer text-xs space-y-2.5 ${
                    isSelected
                      ? 'bg-emerald-50/90 dark:bg-emerald-950/40 border-emerald-500 shadow-sm'
                      : 'bg-white dark:bg-slate-800/90 border-slate-200 dark:border-slate-700 hover:border-emerald-300'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="font-bold text-slate-900 dark:text-white text-sm">
                      {asg.title}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${
                        asg.status === 'sudah_dinilai'
                          ? 'bg-emerald-100 text-emerald-800'
                          : asg.status === 'sudah_dikumpulkan'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {asg.status.replace('_', ' ')}
                    </span>
                  </div>

                  <div className="text-slate-500 text-[11px]">
                    Mapel: <strong>{asg.subjectName}</strong>
                  </div>

                  <div className="flex items-center justify-between text-[11px] pt-1 text-slate-400">
                    <span className="flex items-center text-rose-600 dark:text-rose-400 font-semibold">
                      <Clock className="w-3 h-3 mr-1" />
                      Batas: {asg.dueDate}
                    </span>
                    {asg.studentScore ? (
                      <span className="text-emerald-600 font-bold text-xs">
                        Nilai: {asg.studentScore}/100
                      </span>
                    ) : (
                      <span className="text-slate-400">Bobot: {asg.maxScore}</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Submission Form & Evaluation Rubric */}
        <div className="lg:col-span-7 space-y-6">
          {selectedAsg ? (
            <div className="bg-white dark:bg-slate-800/90 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 space-y-6 shadow-xs">
              
              {/* Header Details */}
              <div className="space-y-2 pb-4 border-b border-slate-100 dark:border-slate-700">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-md bg-blue-100 dark:bg-blue-950/80 text-blue-800 dark:text-blue-300 font-bold text-[11px]">
                    {selectedAsg.typeLabel}
                  </span>
                  <span className="text-xs text-rose-600 font-bold flex items-center">
                    <Clock className="w-3.5 h-3.5 mr-1" />
                    Batas: {selectedAsg.dueDate}
                  </span>
                </div>

                <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
                  {selectedAsg.title}
                </h2>
                <div className="text-xs text-slate-500">
                  Mata Pelajaran: <strong>{selectedAsg.subjectName}</strong>
                </div>
              </div>

              {/* Deskripsi & Petunjuk Pengerjaan */}
              <div className="space-y-2 text-xs">
                <h3 className="font-bold text-slate-900 dark:text-white">
                  Petunjuk & Instruksi Tugas:
                </h3>
                <p className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 leading-relaxed">
                  {selectedAsg.description}
                </p>
              </div>

              {/* Rubrik Penilaian Berbasis Industri */}
              {selectedAsg.rubric && (
                <div className="space-y-3 text-xs">
                  <h3 className="font-bold text-slate-900 dark:text-white flex items-center">
                    <Award className="w-4 h-4 mr-1.5 text-amber-500" />
                    Rubrik Penilaian Standar Industri
                  </h3>

                  <div className="space-y-2">
                    {selectedAsg.rubric.map((r, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 flex justify-between items-center"
                      >
                        <span className="font-semibold text-slate-800 dark:text-slate-200">
                          {r.criteria}
                        </span>
                        <span className="font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded">
                          Bobot: {r.weight}%
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Form Upload Tugas (Jika Siswa) */}
              <div className="p-5 rounded-2xl bg-emerald-50/40 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/80 space-y-4">
                <h3 className="text-xs font-bold text-emerald-900 dark:text-emerald-200 flex items-center">
                  <UploadCloud className="w-4 h-4 mr-2 text-emerald-600" />
                  Form Pengumpulan Tugas Siswa
                </h3>

                {selectedAsg.studentScore ? (
                  /* Jika sudah dinilai */
                  <div className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-emerald-200 dark:border-emerald-800 space-y-2 text-xs">
                    <div className="flex items-center justify-between font-bold">
                      <span className="text-emerald-600 text-sm">Status: Tugas Sudah Dinilai</span>
                      <span className="text-xl font-extrabold text-emerald-600">
                        {selectedAsg.studentScore} / 100
                      </span>
                    </div>
                    {selectedAsg.teacherFeedback && (
                      <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 rounded-lg text-[11px] text-emerald-900 dark:text-emerald-200">
                        <strong>Catatan Guru:</strong> "{selectedAsg.teacherFeedback}"
                      </div>
                    )}
                  </div>
                ) : (
                  <form onSubmit={handleSimulateSubmit} className="space-y-3 text-xs">
                    <div>
                      <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                        Tautan Repositori GitHub / Google Drive:
                      </label>
                      <input
                        type="url"
                        value={submissionUrl}
                        onChange={(e) => setSubmissionUrl(e.target.value)}
                        placeholder="https://github.com/username/project-lms"
                        className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-xl text-slate-900 dark:text-white text-xs focus:outline-none focus:border-emerald-500"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                        Unggah Berkas PDF / Laporan Jobsheet (Maks 25MB):
                      </label>
                      <input
                        type="file"
                        onChange={(e) => setUploadedFile(e.target.files?.[0]?.name || null)}
                        className="w-full text-xs text-slate-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-emerald-600 file:text-white hover:file:bg-emerald-700 cursor-pointer"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                        Catatan Tambahan untuk Guru:
                      </label>
                      <textarea
                        rows={2}
                        value={submissionNotes}
                        onChange={(e) => setSubmissionNotes(e.target.value)}
                        placeholder="Tulis ringkasan hasil kerja..."
                        className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-xl text-slate-900 dark:text-white text-xs focus:outline-none focus:border-emerald-500"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmittedSuccess}
                      className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-sm transition disabled:opacity-50 flex items-center justify-center space-x-2"
                    >
                      {isSubmittedSuccess ? (
                        <>
                          <Sparkles className="w-4 h-4 animate-spin" />
                          <span>Menyimpan Pengumpulan...</span>
                        </>
                      ) : (
                        <>
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Kumpulkan Tugas Sekarang</span>
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>

            </div>
          ) : (
            <div className="p-12 text-center text-slate-400 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700">
              Pilih tugas dari daftar sebelah kiri.
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
