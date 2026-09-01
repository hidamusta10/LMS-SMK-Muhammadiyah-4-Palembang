import React, { useState } from 'react';
import {
  Briefcase,
  Building,
  GraduationCap,
  TrendingUp,
  MapPin,
  Calendar,
  DollarSign,
  Send,
  Sparkles,
  Users,
  CheckCircle2,
} from 'lucide-react';

export const BKKView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'lowongan' | 'tracer'>('lowongan');
  const [appliedJobs, setAppliedJobs] = useState<Record<string, boolean>>({});

  const jobVacancies = [
    {
      id: 'job-1',
      company: 'PT Telkom Indonesia (Persero) Tbk',
      position: 'Junior Fullstack Web Developer',
      location: 'Palembang & Hybrid',
      salary: 'Rp 4.500.000 - Rp 6.500.000',
      deadline: '15 September 2026',
      targetMajors: ['RPL'],
      requirements: ['Lulusan SMK RPL', 'Menguasai React / Express', 'Memiliki Portofolio & Sertifikat UKK'],
    },
    {
      id: 'job-2',
      company: 'PT Yamaha Thamrin Brothers Palembang',
      position: 'Mekanik Sepeda Motor & Service Advisor',
      location: 'Palembang',
      salary: 'UMR + Insentif Bonus',
      deadline: '20 September 2026',
      targetMajors: ['TBSM'],
      requirements: ['Lulusan SMK TBSM', 'Memiliki sertifikat uji injeksi Yamaha', 'Disiplin tinggi'],
    },
    {
      id: 'job-3',
      company: 'Kantor Akuntan Publik (KAP) Sudirman & Rekan',
      position: 'Junior Accounting Staff & Tax Assistant',
      location: 'Palembang',
      salary: 'Rp 3.800.000 - Rp 5.000.000',
      deadline: '10 September 2026',
      targetMajors: ['AKL'],
      requirements: ['Lulusan SMK AKL', 'Menguasai MYOB & Accurate', 'Sertifikat Brevet A/B diutamakan'],
    },
    {
      id: 'job-4',
      company: 'The Arista Hotel Palembang (Bintang 5)',
      position: 'Front Desk Agent & Housekeeping Staff',
      location: 'Palembang',
      salary: 'UMR + Service Charge',
      deadline: '25 September 2026',
      targetMajors: ['Perhotelan'],
      requirements: ['Lulusan SMK Perhotelan', 'Bahasa Inggris aktif', 'Penampilan rapi & ramah'],
    },
    {
      id: 'job-5',
      company: 'Rumah Sakit Muhammadiyah Palembang',
      position: 'Asisten Tenaga Kesehatan & Rekam Medis',
      location: 'Palembang',
      salary: 'Standar RS Muhammadiyah',
      deadline: '30 September 2026',
      targetMajors: ['Layanan Kesehatan'],
      requirements: ['Lulusan SMK Layanan Kesehatan', 'STRTTK bila ada', 'Etos kerja Islami'],
    },
  ];

  const handleApply = (jobId: string) => {
    setAppliedJobs((prev) => ({ ...prev, [jobId]: true }));
    alert('Lamaran kerja BKK berhasil dikirim beserta Portofolio LMS Anda ke DUDI mitra!');
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="inline-flex items-center space-x-1 text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
            <Briefcase className="w-3.5 h-3.5 mr-1" />
            <span>Menu 13: Kegiatan Khas SMK</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1">
            Bursa Kerja Khusus (BKK) & Tracer Study
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Penyaluran kerja alumni ke DUDI nasional, tracer study BMW (Bekerja, Melanjutkan, Wirausaha).
          </p>
        </div>
      </div>

      {/* BMW Serapan Lulusan Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 space-y-1 shadow-xs">
          <div className="text-xs text-slate-500 font-bold flex items-center">
            <Briefcase className="w-4 h-4 mr-1.5 text-emerald-600" />
            Bekerja di Industri (B)
          </div>
          <div className="text-2xl font-extrabold text-emerald-600">72.4%</div>
          <p className="text-[11px] text-slate-400">Terserap di DUDI mitra & BUMN</p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 space-y-1 shadow-xs">
          <div className="text-xs text-slate-500 font-bold flex items-center">
            <GraduationCap className="w-4 h-4 mr-1.5 text-blue-600" />
            Melanjutkan Kuliah (M)
          </div>
          <div className="text-2xl font-extrabold text-blue-600">18.6%</div>
          <p className="text-[11px] text-slate-400">Di PTN & PTMA (UM Palembang, dll)</p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 space-y-1 shadow-xs">
          <div className="text-xs text-slate-500 font-bold flex items-center">
            <TrendingUp className="w-4 h-4 mr-1.5 text-amber-600" />
            Wirausaha Mandiri (W)
          </div>
          <div className="text-2xl font-extrabold text-amber-600">9.0%</div>
          <p className="text-[11px] text-slate-400">Inkubator TEFA & Bisnis Digital</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex overflow-x-auto space-x-2 border-b border-slate-200 dark:border-slate-800 pb-2">
        <button
          onClick={() => setActiveTab('lowongan')}
          className={`px-3.5 py-1.5 text-xs font-bold rounded-xl whitespace-nowrap transition ${
            activeTab === 'lowongan'
              ? 'bg-emerald-600 text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          Lowongan Kerja DUDI Mitra ({jobVacancies.length})
        </button>
        <button
          onClick={() => setActiveTab('tracer')}
          className={`px-3.5 py-1.5 text-xs font-bold rounded-xl whitespace-nowrap transition ${
            activeTab === 'tracer'
              ? 'bg-emerald-600 text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          Tracer Study Alumni & Testimoni
        </button>
      </div>

      {/* Lowongan Tab */}
      {activeTab === 'lowongan' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {jobVacancies.map((job) => (
            <div
              key={job.id}
              className="p-5 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 space-y-4 shadow-xs flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
                    Jurusan: {job.targetMajors.join(', ')}
                  </span>
                  <span className="text-[11px] text-slate-400 flex items-center">
                    <Calendar className="w-3.5 h-3.5 mr-1" />
                    Batas: {job.deadline}
                  </span>
                </div>

                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-base">
                    {job.position}
                  </h3>
                  <div className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 mt-0.5">
                    {job.company}
                  </div>
                  <div className="text-[11px] text-slate-500 flex items-center gap-2 mt-1">
                    <span className="flex items-center"><MapPin className="w-3 h-3 mr-1 text-rose-500" />{job.location}</span>
                    <span>•</span>
                    <span className="text-slate-700 dark:text-slate-300 font-semibold">{job.salary}</span>
                  </div>
                </div>

                <div className="space-y-1 text-xs pt-2 border-t border-slate-100 dark:border-slate-700">
                  <span className="font-bold text-slate-700 dark:text-slate-300 text-[11px]">Kualifikasi:</span>
                  <ul className="text-slate-600 dark:text-slate-400 text-[11px] space-y-0.5 list-disc list-inside">
                    {job.requirements.map((r, idx) => (
                      <li key={idx}>{r}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <button
                disabled={appliedJobs[job.id]}
                onClick={() => handleApply(job.id)}
                className={`w-full py-2.5 rounded-xl font-bold text-xs shadow-xs transition flex items-center justify-center space-x-2 ${
                  appliedJobs[job.id]
                    ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                    : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                }`}
              >
                {appliedJobs[job.id] ? (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Lamaran Terkirim</span>
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>Lamar via BKK SMK</span>
                  </>
                )}
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Tracer Study Tab */}
      {activeTab === 'tracer' && (
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 space-y-4 shadow-xs">
          <h3 className="font-bold text-slate-900 dark:text-white text-sm flex items-center">
            <Users className="w-4 h-4 mr-2 text-emerald-600" />
            Kiprah Alumni SMK Muhammadiyah 4 Palembang
          </h3>

          <div className="space-y-3 text-xs">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 space-y-1.5">
              <div className="flex justify-between font-bold text-slate-900 dark:text-white">
                <span>Rian Hidayat, A.Md. (Alumni RPL 2023)</span>
                <span className="text-emerald-600">Frontend Engineer di PT Telkom</span>
              </div>
              <p className="text-slate-600 dark:text-slate-300 italic">
                "Pembelajaran praktik dan TEFA di SMK Muhammadiyah 4 Palembang membuat saya sangat siap menghadapi dunia kerja nyata tanpa canggung."
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 space-y-1.5">
              <div className="flex justify-between font-bold text-slate-900 dark:text-white">
                <span>Annisa Fitri (Alumni AKL 2024)</span>
                <span className="text-blue-600">Mahasiswi Akuntansi UM Palembang & Staf Keuangan</span>
              </div>
              <p className="text-slate-600 dark:text-slate-300 italic">
                "Bekal sertifikasi MYOB dan pembinaan karakter Islami ISMUBA sangat berharga dalam karier dan perkuliahan saya."
              </p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
