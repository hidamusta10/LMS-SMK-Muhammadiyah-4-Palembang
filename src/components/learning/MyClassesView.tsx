import React, { useState } from 'react';
import {
  ClassSubject,
  MaterialItem,
  AssignmentItem,
  UserProfile,
} from '../../types';
import {
  BookOpen,
  Users,
  Clock,
  FileText,
  CheckSquare,
  Award,
  MessageSquare,
  ChevronRight,
  ArrowLeft,
  Sparkles,
  Download,
  Info,
  Calendar,
  Layers,
} from 'lucide-react';

interface MyClassesViewProps {
  classes: ClassSubject[];
  materials: MaterialItem[];
  assignments: AssignmentItem[];
  user: UserProfile;
  onNavigateToMaterial: (matId: string) => void;
  onNavigateToAssignment: (asgId: string) => void;
}

export const MyClassesView: React.FC<MyClassesViewProps> = ({
  classes,
  materials,
  assignments,
  user,
  onNavigateToMaterial,
  onNavigateToAssignment,
}) => {
  const [selectedClassId, setSelectedClassId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'info' | 'materi' | 'tugas' | 'peserta'>('info');

  const selectedClass = classes.find((c) => c.id === selectedClassId);
  const classMaterials = materials.filter((m) => m.subjectId === selectedClassId);
  const classAssignments = assignments.filter((a) => a.subjectId === selectedClassId);

  const mockStudentsInClass = [
    { name: 'Muhammad Farhan Al-Ghifari', nis: '23241042', role: 'Ketua Kelas' },
    { name: 'Ahmad Rizky Pratama', nis: '23241005', role: 'Sekretaris' },
    { name: 'Nabila Putri Cahyani', nis: '23241028', role: 'Bendahara' },
    { name: 'Bagas Pratama', nis: '23241012', role: 'Anggota' },
    { name: 'Zahra Amelia', nis: '23241033', role: 'Anggota' },
    { name: 'Fikri Ramadhan', nis: '23241019', role: 'Anggota' },
  ];

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="inline-flex items-center space-x-1 text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
            <BookOpen className="w-3.5 h-3.5 mr-1" />
            <span>Menu 3: Kelas Saya</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1">
            {selectedClass ? selectedClass.name : 'Daftar Mata Pelajaran & Kelas'}
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Tahun Ajaran 2025/2026 Genap • Tingkat XII • Program Keahlian RPL
          </p>
        </div>

        {selectedClass && (
          <button
            onClick={() => setSelectedClassId(null)}
            className="px-3.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold text-xs flex items-center space-x-1.5 hover:bg-slate-200 transition self-start"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Kembali ke Semua Kelas</span>
          </button>
        )}
      </div>

      {!selectedClass ? (
        /* Class Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {classes.map((cls) => (
            <div
              key={cls.id}
              onClick={() => {
                setSelectedClassId(cls.id);
                setActiveTab('info');
              }}
              className="bg-white dark:bg-slate-800/90 rounded-2xl p-5 border border-slate-200 dark:border-slate-700/80 shadow-xs hover:border-emerald-500 transition cursor-pointer flex flex-col justify-between space-y-4 group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                    {cls.code}
                  </span>
                  <span className="text-xs text-slate-500 font-semibold">{cls.room}</span>
                </div>

                <div>
                  <h3 className="font-extrabold text-slate-900 dark:text-white text-base group-hover:text-emerald-600 transition">
                    {cls.name}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                    {cls.description}
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-700/60 text-xs space-y-1">
                  <div className="font-semibold text-slate-800 dark:text-slate-200">
                    Pengampu: {cls.teacher}
                  </div>
                  <div className="text-[11px] text-slate-500 flex items-center">
                    <Clock className="w-3 h-3 mr-1 text-emerald-600" />
                    Jadwal: {cls.schedule}
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-500">Kemajuan Pembelajaran</span>
                    <span className="font-bold text-emerald-600">{cls.progressPercent}%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-500 rounded-full transition-all"
                      style={{ width: `${cls.progressPercent}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between text-xs font-semibold text-emerald-600">
                <span>{cls.materialsCount} Modul • {cls.assignmentsCount} Tugas</span>
                <span className="flex items-center group-hover:translate-x-1 transition">
                  Buka Kelas <ChevronRight className="w-4 h-4 ml-0.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Single Class Detail View */
        <div className="space-y-6">
          
          {/* Class Navigation Tabs */}
          <div className="flex overflow-x-auto space-x-2 border-b border-slate-200 dark:border-slate-800 pb-2">
            {[
              { id: 'info', label: 'Capaian & Info Kurikulum (CP/TP/ATP)' },
              { id: 'materi', label: `Materi Ajar (${classMaterials.length})` },
              { id: 'tugas', label: `Tugas & Praktik (${classAssignments.length})` },
              { id: 'peserta', label: `Daftar Siswa (${selectedClass.totalStudents})` },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2 text-xs font-bold rounded-xl whitespace-nowrap transition ${
                  activeTab === tab.id
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content: Info Kurikulum */}
          {activeTab === 'info' && (
            <div className="space-y-6">
              
              <div className="p-6 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700/80 shadow-xs space-y-4">
                <div className="flex items-center space-x-2 text-emerald-600 font-bold text-sm">
                  <Sparkles className="w-4 h-4" />
                  <span>Capaian Pembelajaran (CP) Fase F SMK</span>
                </div>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed bg-emerald-50/50 dark:bg-emerald-950/20 p-4 rounded-xl border border-emerald-200 dark:border-emerald-800">
                  {selectedClass.capaianPembelajaran}
                </p>

                <div className="space-y-2 pt-2">
                  <h4 className="font-bold text-slate-900 dark:text-white text-xs">
                    Tujuan Pembelajaran (TP) & Indikator:
                  </h4>
                  <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300 list-disc list-inside">
                    {selectedClass.tujuanPembelajaran.map((tp, idx) => (
                      <li key={idx}>{tp}</li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-2 pt-2">
                  <h4 className="font-bold text-slate-900 dark:text-white text-xs">
                    Alur Tujuan Pembelajaran (ATP):
                  </h4>
                  <div className="p-3 bg-slate-50 dark:bg-slate-900/60 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-mono text-emerald-700 dark:text-emerald-400">
                    {selectedClass.alurTujuan}
                  </div>
                </div>
              </div>

              {/* Class Info Box */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs space-y-1">
                  <div className="text-slate-400">Guru Pengampu</div>
                  <div className="font-bold text-slate-900 dark:text-white">{selectedClass.teacher}</div>
                </div>
                <div className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs space-y-1">
                  <div className="text-slate-400">Jadwal & Ruang</div>
                  <div className="font-bold text-slate-900 dark:text-white">{selectedClass.schedule} ({selectedClass.room})</div>
                </div>
                <div className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs space-y-1">
                  <div className="text-slate-400">Nilai Sementara</div>
                  <div className="font-bold text-emerald-600">{selectedClass.currentScore} (Predikat A)</div>
                </div>
              </div>

            </div>
          )}

          {/* Tab Content: Materi */}
          {activeTab === 'materi' && (
            <div className="space-y-3">
              {classMaterials.length > 0 ? (
                classMaterials.map((mat) => (
                  <div
                    key={mat.id}
                    onClick={() => onNavigateToMaterial(mat.id)}
                    className="p-4 rounded-xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 hover:border-emerald-500 transition cursor-pointer flex items-center justify-between text-xs shadow-xs"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 font-bold text-[10px]">
                          {mat.typeLabel}
                        </span>
                        <span className="font-bold text-slate-900 dark:text-white text-sm">{mat.title}</span>
                      </div>
                      <div className="text-slate-500 text-[11px]">
                        Ditambahkan: {mat.dateAdded} • Ukuran: {mat.fileSize}
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </div>
                ))
              ) : (
                <div className="p-8 text-center text-xs text-slate-400 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                  Belum ada modul ajar yang diunggah untuk kelas ini.
                </div>
              )}
            </div>
          )}

          {/* Tab Content: Tugas */}
          {activeTab === 'tugas' && (
            <div className="space-y-3">
              {classAssignments.length > 0 ? (
                classAssignments.map((asg) => (
                  <div
                    key={asg.id}
                    onClick={() => onNavigateToAssignment(asg.id)}
                    className="p-4 rounded-xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 hover:border-emerald-500 transition cursor-pointer flex items-center justify-between text-xs shadow-xs"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-950/60 text-blue-800 dark:text-blue-300 font-bold text-[10px]">
                          {asg.typeLabel}
                        </span>
                        <span className="font-bold text-slate-900 dark:text-white text-sm">{asg.title}</span>
                      </div>
                      <div className="text-slate-500 text-[11px]">
                        Batas Pengumpulan: <strong>{asg.dueDate}</strong>
                      </div>
                    </div>
                    <span className="px-2 py-1 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold text-[10px] capitalize">
                      {asg.status.replace('_', ' ')}
                    </span>
                  </div>
                ))
              ) : (
                <div className="p-8 text-center text-xs text-slate-400 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                  Tidak ada tugas aktif saat ini.
                </div>
              )}
            </div>
          )}

          {/* Tab Content: Peserta */}
          {activeTab === 'peserta' && (
            <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-4 space-y-3">
              <div className="text-xs font-bold text-slate-900 dark:text-white">
                Daftar Teman Sekelas (32 Siswa)
              </div>
              <div className="divide-y divide-slate-100 dark:divide-slate-700 text-xs">
                {mockStudentsInClass.map((s, idx) => (
                  <div key={idx} className="py-2.5 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-7 h-7 rounded-full bg-emerald-100 dark:bg-emerald-900/50 text-emerald-800 dark:text-emerald-300 flex items-center justify-center font-bold text-[11px]">
                        {idx + 1}
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 dark:text-white">{s.name}</div>
                        <div className="text-[11px] text-slate-400">NIS: {s.nis}</div>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-[10px] font-semibold">
                      {s.role}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      )}

    </div>
  );
};
