import React, { useState, useEffect } from 'react';
import { ExamItem, UserProfile } from '../../types';
import {
  Award,
  Clock,
  KeyRound,
  CheckCircle2,
  AlertTriangle,
  Play,
  HelpCircle,
  BarChart3,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from 'lucide-react';

interface ExamsAssessmentsViewProps {
  exams: ExamItem[];
  user: UserProfile;
}

export const ExamsAssessmentsView: React.FC<ExamsAssessmentsViewProps> = ({
  exams,
  user,
}) => {
  const [activeExam, setActiveExam] = useState<ExamItem | null>(null);
  const [inputToken, setInputToken] = useState<string>('');
  const [isExamStarted, setIsExamStarted] = useState<boolean>(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [studentAnswers, setStudentAnswers] = useState<Record<number, string>>({});
  const [flaggedQuestions, setFlaggedQuestions] = useState<Record<number, boolean>>({});
  const [timeLeft, setTimeLeft] = useState<number>(5400); // 90 min in seconds
  const [isFinished, setIsFinished] = useState<boolean>(false);

  // Mock Exam Questions
  const mockQuestions = [
    {
      id: 1,
      type: 'multiple_choice',
      text: 'Manakah di bawah ini metode HTTP yang tepat digunakan untuk memperbarui (update) sebagian data sumber daya pada RESTful API?',
      options: [
        { key: 'A', text: 'GET' },
        { key: 'B', text: 'POST' },
        { key: 'C', text: 'PATCH' },
        { key: 'D', text: 'DELETE' },
      ],
      correctKey: 'C',
    },
    {
      id: 2,
      type: 'multiple_choice',
      text: 'Dalam standar industri keamanan web, token autentikasi JWT (JSON Web Token) biasanya dikirimkan melalui HTTP Header pada format...',
      options: [
        { key: 'A', text: 'Authorization: Bearer <token>' },
        { key: 'B', text: 'Content-Type: application/jwt' },
        { key: 'C', text: 'X-Auth-Token: <token>' },
        { key: 'D', text: 'Cookie: session_id=<token>' },
      ],
      correctKey: 'A',
    },
    {
      id: 3,
      type: 'essay',
      text: 'Jelaskan perbedaan mendasar antara status code HTTP 401 (Unauthorized) dan 403 (Forbidden) dalam konteks sistem Role-Based Access Control (RBAC)!',
      sampleAnswer: '401 berarti klien belum terautentikasi (belum login), sedangkan 403 berarti klien terautentikasi namun tidak memiliki izin akses (role tidak sesuai).',
    },
  ];

  // Timer simulation
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isExamStarted && !isFinished && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isExamStarted, isFinished, timeLeft]);

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStartExam = () => {
    if (!activeExam) return;
    if (inputToken.trim().toUpperCase() !== activeExam.token) {
      alert(`Token salah! Gunakan token yang tertera: ${activeExam.token}`);
      return;
    }
    setIsExamStarted(true);
    setIsFinished(false);
  };

  const handleSelectOption = (key: string) => {
    setStudentAnswers((prev) => ({
      ...prev,
      [currentQuestionIndex]: key,
    }));
  };

  const toggleFlag = () => {
    setFlaggedQuestions((prev) => ({
      ...prev,
      [currentQuestionIndex]: !prev[currentQuestionIndex],
    }));
  };

  const handleFinishExam = () => {
    if (window.confirm('Apakah Anda yakin ingin menyelesaikan ujian CBT ini?')) {
      setIsFinished(true);
      setIsExamStarted(false);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      {!isExamStarted && !isFinished && (
        <div>
          <div className="inline-flex items-center space-x-1 text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
            <Award className="w-3.5 h-3.5 mr-1" />
            <span>Menu 6: Ujian & Asesmen CBT Online</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1">
            Computer-Based Test (CBT) & Uji Kompetensi
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Sistem asesmen terintegrasi, acak soal otomatis, anti-kecurangan, dan analisis capaian KKTP.
          </p>
        </div>
      )}

      {/* Main Mode: Exam List & Token Confirmation */}
      {!isExamStarted && !isFinished && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {exams.map((ex) => (
            <div
              key={ex.id}
              className="p-5 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 space-y-4 shadow-xs"
            >
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 font-bold text-[10px]">
                  {ex.typeLabel}
                </span>
                <span className="text-xs font-semibold text-slate-500 flex items-center">
                  <Clock className="w-3.5 h-3.5 mr-1" />
                  {ex.durationMinutes} Menit
                </span>
              </div>

              <div>
                <h3 className="font-extrabold text-slate-900 dark:text-white text-base">
                  {ex.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Mata Pelajaran: <strong>{ex.subjectName}</strong>
                </p>
              </div>

              <div className="p-3 bg-slate-50 dark:bg-slate-900/60 rounded-xl border border-slate-200 dark:border-slate-700 text-xs space-y-1">
                <div className="flex justify-between">
                  <span className="text-slate-400">Total Soal:</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">{ex.totalQuestions} Butir</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Passing Grade (KKTP):</span>
                  <span className="font-bold text-emerald-600">{ex.passingGrade}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Token CBT Ujian:</span>
                  <span className="font-mono font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950 px-2 rounded">
                    {ex.token}
                  </span>
                </div>
              </div>

              <button
                onClick={() => {
                  setActiveExam(ex);
                  setInputToken(ex.token);
                }}
                className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-sm transition flex items-center justify-center space-x-2"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Buka Ruang Ujian CBT</span>
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Token Modal / Confirmation Area */}
      {activeExam && !isExamStarted && !isFinished && (
        <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-4">
            <div className="flex items-center space-x-3 text-emerald-600">
              <KeyRound className="w-6 h-6" />
              <h2 className="text-lg font-extrabold text-slate-900 dark:text-white">
                Konfirmasi Token CBT
              </h2>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300">
              Anda akan memulai <strong>{activeExam.title}</strong>. Pastikan koneksi stabil dan dilarang berpindah tab selama ujian berlangsung.
            </p>

            <div className="space-y-1 text-xs">
              <label className="font-bold text-slate-700 dark:text-slate-300">
                Masukkan Token Ujian:
              </label>
              <input
                type="text"
                value={inputToken}
                onChange={(e) => setInputToken(e.target.value.toUpperCase())}
                placeholder="Contoh: STS-RPL2026"
                className="w-full px-4 py-2.5 uppercase font-mono font-bold text-center tracking-widest text-base bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl focus:outline-none focus:border-emerald-500 text-slate-900 dark:text-white"
              />
            </div>

            <div className="flex space-x-3 pt-2">
              <button
                onClick={() => setActiveExam(null)}
                className="flex-1 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              >
                Batal
              </button>
              <button
                onClick={handleStartExam}
                className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition shadow-sm"
              >
                Mulai Kerjakan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Active CBT Test Screen */}
      {isExamStarted && activeExam && (
        <div className="space-y-4">
          
          {/* Top CBT Status Bar */}
          <div className="p-4 rounded-2xl bg-slate-900 text-white flex flex-wrap items-center justify-between gap-4 shadow-md">
            <div>
              <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase">
                {activeExam.title}
              </span>
              <div className="text-sm font-bold text-white">
                Peserta: {user.name} ({user.nisOrNip})
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-slate-800 border border-slate-700">
                <Clock className="w-4 h-4 text-amber-400" />
                <span className="font-mono text-sm font-extrabold text-amber-300">
                  {formatTimer(timeLeft)}
                </span>
              </div>
              <button
                onClick={handleFinishExam}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs transition"
              >
                Selesai Ujian
              </button>
            </div>
          </div>

          {/* Question & Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Left Column: Question Content */}
            <div className="lg:col-span-8 bg-white dark:bg-slate-800/90 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 space-y-6 shadow-xs">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-700">
                <span className="font-bold text-slate-900 dark:text-white text-sm">
                  Soal Nomor {currentQuestionIndex + 1} dari {mockQuestions.length}
                </span>
                <button
                  onClick={toggleFlag}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center space-x-1 transition ${
                    flaggedQuestions[currentQuestionIndex]
                      ? 'bg-amber-100 text-amber-800 border border-amber-300'
                      : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                  }`}
                >
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>{flaggedQuestions[currentQuestionIndex] ? 'Ragu-Ragu (Tandai)' : 'Ragu-Ragu'}</span>
                </button>
              </div>

              {/* Question Text */}
              <div className="text-sm font-medium text-slate-800 dark:text-slate-200 leading-relaxed">
                {mockQuestions[currentQuestionIndex]?.text}
              </div>

              {/* Options */}
              {mockQuestions[currentQuestionIndex]?.options ? (
                <div className="space-y-3">
                  {mockQuestions[currentQuestionIndex].options.map((opt) => {
                    const isSelected = studentAnswers[currentQuestionIndex] === opt.key;
                    return (
                      <div
                        key={opt.key}
                        onClick={() => handleSelectOption(opt.key)}
                        className={`p-3.5 rounded-xl border transition cursor-pointer flex items-center space-x-3 text-xs ${
                          isSelected
                            ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 font-bold text-slate-900 dark:text-white'
                            : 'bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-700 hover:border-slate-400'
                        }`}
                      >
                        <span
                          className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs ${
                            isSelected
                              ? 'bg-emerald-600 text-white'
                              : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                          }`}
                        >
                          {opt.key}
                        </span>
                        <span className="flex-1">{opt.text}</span>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                    Jawaban Esai Kejuruan:
                  </label>
                  <textarea
                    rows={4}
                    value={studentAnswers[currentQuestionIndex] || ''}
                    onChange={(e) => handleSelectOption(e.target.value)}
                    placeholder="Tuliskan analisis teknis Anda secara mendalam..."
                    className="w-full p-3 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
              )}

              {/* Question Navigation Prev/Next */}
              <div className="flex justify-between pt-4 border-t border-slate-100 dark:border-slate-700">
                <button
                  disabled={currentQuestionIndex === 0}
                  onClick={() => setCurrentQuestionIndex((prev) => prev - 1)}
                  className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold hover:bg-slate-200 transition disabled:opacity-40 flex items-center space-x-1"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Sebelumnya</span>
                </button>
                <button
                  disabled={currentQuestionIndex === mockQuestions.length - 1}
                  onClick={() => setCurrentQuestionIndex((prev) => prev + 1)}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition disabled:opacity-40 flex items-center space-x-1"
                >
                  <span>Berikutnya</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Right Column: Question Number Grid */}
            <div className="lg:col-span-4 bg-white dark:bg-slate-800/90 rounded-2xl border border-slate-200 dark:border-slate-700 p-5 space-y-4 shadow-xs">
              <div className="text-xs font-bold text-slate-900 dark:text-white">
                Navigasi Nomor Soal
              </div>

              <div className="grid grid-cols-4 gap-2.5">
                {mockQuestions.map((q, idx) => {
                  const isAnswered = !!studentAnswers[idx];
                  const isFlagged = !!flaggedQuestions[idx];
                  const isCurrent = currentQuestionIndex === idx;

                  let bgColor = 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300';
                  if (isFlagged) {
                    bgColor = 'bg-amber-400 text-slate-950 font-bold';
                  } else if (isAnswered) {
                    bgColor = 'bg-emerald-600 text-white font-bold';
                  }

                  return (
                    <button
                      key={q.id}
                      onClick={() => setCurrentQuestionIndex(idx)}
                      className={`h-10 rounded-xl text-xs font-semibold flex items-center justify-center transition border ${
                        isCurrent ? 'ring-2 ring-emerald-500 border-emerald-500' : 'border-transparent'
                      } ${bgColor}`}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-700 space-y-1.5 text-[11px] text-slate-500">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded bg-emerald-600" />
                  <span>Sudah Dijawab</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded bg-amber-400" />
                  <span>Ragu-Ragu</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded bg-slate-200 dark:bg-slate-700" />
                  <span>Belum Dijawab</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      )}

      {/* Post-Exam Result Screen */}
      {isFinished && (
        <div className="p-8 rounded-3xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 text-center space-y-5 max-w-xl mx-auto shadow-md">
          <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 mx-auto flex items-center justify-center">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div className="space-y-1">
            <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
              Ujian CBT Telah Selesai!
            </h2>
            <p className="text-xs text-slate-500">
              Jawaban Anda telah tersimpan secara aman di database server sekolah.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 flex justify-around items-center">
            <div>
              <div className="text-[11px] text-slate-500">Skor Sementara</div>
              <div className="text-3xl font-extrabold text-emerald-600">92.5</div>
            </div>
            <div className="h-8 w-px bg-slate-300 dark:bg-slate-700" />
            <div>
              <div className="text-[11px] text-slate-500">Status Kelulusan</div>
              <div className="text-sm font-extrabold text-emerald-700 dark:text-emerald-300">
                Tuntas Di Atas KKTP
              </div>
            </div>
          </div>

          <button
            onClick={() => {
              setIsFinished(false);
              setActiveExam(null);
            }}
            className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition"
          >
            Kembali ke Daftar Ujian
          </button>
        </div>
      )}

    </div>
  );
};
