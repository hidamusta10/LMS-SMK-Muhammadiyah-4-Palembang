export type UserRole =
  | 'siswa'
  | 'guru'
  | 'wali_kelas'
  | 'guru_bk'
  | 'kepala_sekolah'
  | 'orang_tua'
  | 'admin'
  | 'ketua_jurusan'
  | 'pembimbing_pkl'
  | 'pembina_ekskul'
  | 'staf_tu'
  | 'operator';

export interface UserProfile {
  id: string;
  name: string;
  role: UserRole;
  roleLabel: string;
  email: string;
  avatar: string;
  nisOrNip: string;
  nisn?: string;
  nbm?: string;
  classOrPosition?: string;
  major?: 'RPL' | 'AKL' | 'TSM' | 'HTL' | 'LK';
  majorFullName?: string;
  birthPlaceDate?: string;
  gender?: 'Laki-laki' | 'Perempuan';
  address?: string;
  phone?: string;
  parentName?: string;
  parentPhone?: string;
  emergencyContact?: string;
  lastLogin?: string;
}

export interface AnnouncementItem {
  id: string;
  title: string;
  category: 'sekolah' | 'kelas' | 'mapel' | 'ujian' | 'pkl' | 'organisasi' | 'kegiatan' | 'guru' | 'orang_tua';
  categoryLabel: string;
  content: string;
  date: string;
  author: string;
  targetRole: string[];
  attachmentName?: string;
  attachmentSize?: string;
  isImportant?: boolean;
  readStatus?: boolean;
}

export interface ClassSubject {
  id: string;
  code: string;
  name: string;
  teacher: string;
  teacherAvatar?: string;
  gradeLevel: 'X' | 'XI' | 'XII';
  semester: 'Ganjil' | 'Genap';
  academicYear: string;
  major: string;
  description: string;
  capaianPembelajaran: string;
  tujuanPembelajaran: string[];
  alurTujuan: string;
  schedule: string;
  room: string;
  materialsCount: number;
  assignmentsCount: number;
  progressPercent: number;
  currentScore?: number;
  totalStudents: number;
}

export interface MaterialItem {
  id: string;
  subjectId: string;
  subjectName: string;
  title: string;
  type: 'modul_ajar' | 'buku_digital' | 'handout' | 'lkpd' | 'slide' | 'video' | 'jobsheet' | 'sop' | 'k3';
  typeLabel: string;
  dateAdded: string;
  fileSize?: string;
  author: string;
  duration?: string;
  learningOutcomes: string;
  coreContent: string;
  triggerQuestion: string;
  exampleNotes: string;
  studentActivity: string;
  reflectionPrompt: string;
  downloadUrl?: string;
}

export interface AssignmentItem {
  id: string;
  subjectId: string;
  subjectName: string;
  title: string;
  type: 'individu' | 'kelompok' | 'praktikum' | 'laporan' | 'proyek_produk' | 'studi_kasus' | 'portofolio' | 'remedial' | 'kokurikuler';
  typeLabel: string;
  teacherName: string;
  instructions: string;
  rubricSummary: string;
  dateGiven: string;
  dueDate: string;
  maxScore: number;
  status: 'belum_dibuka' | 'belum_dikerjakan' | 'sedang_dikerjakan' | 'sudah_dikumpulkan' | 'terlambat' | 'perlu_diperbaiki' | 'sudah_dinilai' | 'remedial' | 'selesai';
  studentScore?: number;
  teacherFeedback?: string;
  submissionDate?: string;
  submittedFileName?: string;
  revisionHistory?: { date: string; note: string; score?: number }[];
}

export interface ExamQuestion {
  id: string;
  type: 'pilihan_ganda' | 'pilihan_ganda_kompleks' | 'benar_salah' | 'menjodohkan' | 'isian_singkat' | 'uraian' | 'praktik';
  question: string;
  imageUrl?: string;
  options?: string[];
  correctAnswers?: number[] | string | boolean | number;
  matchingPairs?: { left: string; right: string }[];
  explanation?: string;
  points: number;
}

export interface ExamItem {
  id: string;
  title: string;
  subjectId: string;
  subjectName: string;
  category: 'diagnostik' | 'kuis' | 'formatif' | 'sumatif_harian' | 'sts' | 'sas' | 'praktik' | 'ukk';
  categoryLabel: string;
  durationMinutes: number;
  token: string;
  startDate: string;
  endDate: string;
  totalQuestions: number;
  totalScore: number;
  status: 'upcoming' | 'active' | 'completed' | 'graded';
  userScore?: number;
  questions: ExamQuestion[];
}

export interface GradeRecord {
  id: string;
  subjectId: string;
  subjectName: string;
  category: string;
  assignmentAvg: number;
  quizAvg: number;
  formatifScore: number;
  sumatifScore: number;
  practiceScore: number;
  projectScore: number;
  finalScore: number;
  predicate: 'A (Sangat Baik)' | 'B (Baik)' | 'C (Cukup)' | 'D (Perlu Bimbingan)';
  isPassed: boolean;
  kktp: number;
  competencyDesc: string;
  teacherNote: string;
}

export interface AttendanceRecord {
  id: string;
  date: string;
  day: string;
  time: string;
  subjectName?: string;
  type: 'harian' | 'mapel' | 'praktik' | 'pkl' | 'ekskul';
  status: 'hadir' | 'terlambat' | 'sakit' | 'izin' | 'alpa' | 'dispensasi';
  notes?: string;
  attachmentUrl?: string;
}

export interface ScheduleEvent {
  id: string;
  day: 'Senin' | 'Selasa' | 'Rabu' | 'Kamis' | 'Jumat' | 'Sabtu';
  timeStart: string;
  timeEnd: string;
  subjectOrActivity: string;
  type: 'pelajaran' | 'praktik' | 'ujian' | 'remedial' | 'piket' | 'lab' | 'ekskul' | 'ismuba';
  teacherOrSupervisor: string;
  roomOrVenue: string;
  classTarget: string;
}

export interface PKLRecord {
  id: string;
  studentId: string;
  studentName: string;
  studentClass: string;
  major: string;
  companyName: string;
  companyAddress: string;
  industryMentor: string;
  schoolSupervisor: string;
  startDate: string;
  endDate: string;
  status: 'belum_daftar' | 'menunggu_verifikasi' | 'tertempatkan' | 'sedang_berjalan' | 'monitoring' | 'penyusunan_laporan' | 'selesai';
  attendancePercent: number;
  journalEntriesCount: number;
  industryScore?: number;
  schoolScore?: number;
  finalScore?: number;
  certificateNumber?: string;
  dailyLogs: {
    id: string;
    date: string;
    activity: string;
    toolsUsed: string;
    learningTakeaway: string;
    status: 'pending' | 'approved';
    verifiedBy: string;
  }[];
}

export interface TeachingFactoryUnit {
  id: string;
  name: string;
  major: 'RPL' | 'AKL' | 'TSM' | 'HTL' | 'LK';
  majorName: string;
  tagline: string;
  manager: string;
  productsAndServices: string[];
  activeOrdersCount: number;
  monthlyRevenue: string;
  completedOrdersCount: number;
  sopList: string[];
  recentOrders: {
    id: string;
    customerName: string;
    serviceName: string;
    date: string;
    assignedStudents: string[];
    status: 'Antrian' | 'Proses Pengerjaan' | 'QC Check' | 'Selesai & Diserahkan';
    price: string;
  }[];
}

export interface UKKPackage {
  id: string;
  major: string;
  packageNumber: string;
  title: string;
  competencyElements: string[];
  toolsAndMaterials: string[];
  externalAssessor: string;
  internalAssessor: string;
  roomNumber: string;
  examDate: string;
  criteriaRubric: { aspect: string; weight: number; standardScore: number }[];
  studentStatus?: {
    studentName: string;
    nis: string;
    score: number;
    status: 'Kompeten' | 'Belum Kompeten';
    certificateIssued: boolean;
  }[];
}

export interface CertificateItem {
  id: string;
  title: string;
  category: 'kompetensi' | 'pelatihan' | 'seminar' | 'pkl' | 'lomba' | 'organisasi' | 'keagamaan';
  categoryLabel: string;
  issuedBy: string;
  issueDate: string;
  validUntil?: string;
  credentialCode: string;
  status: 'Valid' | 'Terverifikasi';
  skillsCovered: string[];
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  description: string;
  dateCreated: string;
  projectUrl?: string;
  technologies: string[];
  isPublic: boolean;
  teacherEndorsement?: {
    teacherName: string;
    comment: string;
    date: string;
  };
  metrics?: { views: number; likes: number };
}

export interface JobVacancy {
  id: string;
  title: string;
  companyName: string;
  companyLogoText: string;
  location: string;
  type: 'Full-time' | 'Magang' | 'Part-time' | 'Kemitraan DUDI';
  salaryRange: string;
  requiredMajor: string[];
  deadline: string;
  openings: number;
  description: string;
  requirements: string[];
  isVerifiedDUDI: boolean;
}

export interface CoCurricularProject {
  id: string;
  theme: string;
  title: string;
  targetClass: string;
  duration: string;
  mentorTeachers: string[];
  objectives: string[];
  phase: 'Perencanaan' | 'Eksplorasi' | 'Aksi Nyata' | 'Gelar Karya & Evaluasi';
  rubricDimension: string[];
  progressPercent: number;
}

export interface ExtracurricularClub {
  id: string;
  name: string;
  category: 'Muhammadiyah' | 'Olahraga' | 'Seni & Jurnalistik' | 'Kepemimpinan & Kemanusiaan';
  coach: string;
  schedule: string;
  location: string;
  membersCount: number;
  description: string;
  achievements: string[];
  isJoined?: boolean;
}

export interface StudentAchievement {
  id: string;
  title: string;
  competitionName: string;
  category: 'Akademik' | 'LKS SMK' | 'Olahraga' | 'Seni' | 'Keagamaan' | 'Organisasi';
  rank: string;
  level: 'Sekolah' | 'Kecamatan' | 'Kota Palembang' | 'Sumatera Selatan' | 'Nasional' | 'Internasional';
  studentName: string;
  studentClass: string;
  mentorName: string;
  year: string;
  certificateVerified: boolean;
}

export interface CounselingSession {
  id: string;
  studentName: string;
  studentClass: string;
  counselorName: string;
  topic: 'Akademik' | 'Karier / Lanjutan Studi' | 'Pribadi / Sosial' | 'Kedisiplinan';
  date: string;
  status: 'Menunggu Jadwal' | 'Terjadwal' | 'Selesai' | 'Tindak Lanjut';
  isConfidential: boolean;
  notes?: string;
}

export interface DisciplineRecord {
  id: string;
  studentName: string;
  studentClass: string;
  date: string;
  type: 'Pelanggaran' | 'Penghargaan / Prestasi';
  description: string;
  points: number;
  reportedBy: string;
  actionTaken: string;
  followUpStatus: 'Selesai' | 'Pemanggilan Orang Tua' | 'Bimbingan Wali Kelas' | 'Tuntas';
}

export interface IsmubaRecord {
  id: string;
  title: string;
  type: 'Al-Islam' | 'Kemuhammadiyahan' | 'Bahasa Arab' | 'Ibadah Harian' | 'Tahfidz & Doa' | 'Kultum';
  description: string;
  prayerTimes: { name: string; time: string; status: 'Belum' | 'Sudah' | 'Berjamaah di Masjid' }[];
  memorizationGoals: { surahName: string; verses: string; status: 'Murojaah' | 'Lulus Uji' | 'Proses' }[];
  dailyWorshipLogs: {
    date: string;
    subuh: boolean;
    dzuhur: boolean;
    ashar: boolean;
    maghrib: boolean;
    isya: boolean;
    dhuha: boolean;
    tadarus: boolean;
  }[];
}

export interface LibraryBook {
  id: string;
  title: string;
  author: string;
  publisher: string;
  category: 'Kejuruan SMK' | 'Al-Islam & Kemuhammadiyahan' | 'Umum & Sains' | 'Sastra & Fiksi' | 'Modul Praktik';
  year: number;
  coverColor: string;
  totalCopies: number;
  availableCopies: number;
  isEbookAvailable: boolean;
  rating: number;
  readCount: number;
}

export interface TeachingDocument {
  id: string;
  title: string;
  subjectName: string;
  gradeLevel: string;
  academicYear: string;
  type: 'CP' | 'TP' | 'ATP' | 'Prota' | 'Promes' | 'Modul Ajar' | 'KKTP' | 'LKPD' | 'Jobsheet';
  submittedBy: string;
  submitDate: string;
  status: 'draft' | 'menunggu_kaprog' | 'diverifikasi_wakakur' | 'disahkan_kepsek' | 'perlu_revisi';
  approvedDate?: string;
  notes?: string;
}

export interface TeachingJournal {
  id: string;
  date: string;
  timeSlot: string;
  className: string;
  subjectName: string;
  topic: string;
  learningObjective: string;
  method: string;
  studentActivities: string;
  presentStudents: number;
  totalStudents: number;
  issuesFaced: string;
  reflectionAndFollowUp: string;
  signedStatus: 'Tervalidasi' | 'Menunggu';
}

export interface HelpdeskTicket {
  id: string;
  ticketNumber: string;
  userEmail: string;
  role: string;
  category: 'Akun & Login' | 'Materi & Tugas' | 'Ujian CBT' | 'Presensi' | 'Saran Sistem';
  subject: string;
  message: string;
  dateCreated: string;
  status: 'Open' | 'In Progress' | 'Resolved' | 'Closed';
  priority: 'Rendah' | 'Sedang' | 'Tinggi';
}
