import React, { useState } from 'react';
import { AttendanceRecord, UserProfile } from '../../types';
import {
  Clock,
  CheckCircle2,
  AlertCircle,
  FileText,
  Calendar,
  UploadCloud,
  MapPin,
  Sparkles,
} from 'lucide-react';

interface AttendanceViewProps {
  attendance: AttendanceRecord[];
  user: UserProfile;
}

export const AttendanceView: React.FC<AttendanceViewProps> = ({
  attendance,
  user,
}) => {
  const [permissionType, setPermissionType] = useState<'Izin' | 'Sakit'>('Izin');
  const [permissionReason, setPermissionReason] = useState<string>('');
  const [permissionSuccess, setPermissionSuccess] = useState<boolean>(false);
  const [checkInDone, setCheckInDone] = useState<boolean>(false);

  const handleSelfPresensi = () => {
    setCheckInDone(true);
    alert('Presensi Berhasil! Terverifikasi pada koordinat Kampus SMK Muhammadiyah 4 Palembang.');
  };

  const handlePermissionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPermissionSuccess(true);
    setTimeout(() => {
      setPermissionSuccess(false);
      setPermissionReason('');
      alert('Pengajuan izin berhasil dikirim ke Wali Kelas dan Guru Piket.');
    }, 1500);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="inline-flex items-center space-x-1 text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
            <Clock className="w-3.5 h-3.5 mr-1" />
            <span>Menu 8: Kehadiran & Presensi Terpadu</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1">
            Presensi Digital Siswa & Pengajuan Izin
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Presensi real-time berbasis geofencing sekolah, rekapitulasi kehadiran, dan surat izin resmi.
          </p>
        </div>
      </div>

      {/* Check-In Action Card & Summary Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Real-time Check-In Box */}
        <div className="lg:col-span-5 p-6 rounded-2xl bg-gradient-to-br from-emerald-900 via-teal-900 to-slate-900 text-white space-y-4 shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-emerald-300 font-bold uppercase">
              Presensi Hari Ini: Senin, 01 Sep 2026
            </span>
            <span className="flex items-center text-[11px] text-emerald-300 bg-emerald-800/60 px-2 py-0.5 rounded-full">
              <MapPin className="w-3 h-3 mr-1" />
              Radius Sekolah: 15m
            </span>
          </div>

          <div>
            <div className="text-3xl font-extrabold font-mono tracking-tight text-white">
              06:58:24 WIB
            </div>
            <p className="text-xs text-emerald-100/80 mt-1">
              Batas waktu hadir tepat waktu: <strong>07.15 WIB</strong>
            </p>
          </div>

          <button
            disabled={checkInDone}
            onClick={handleSelfPresensi}
            className="w-full py-3 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-xs rounded-xl shadow-md transition disabled:opacity-80 flex items-center justify-center space-x-2"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>{checkInDone ? 'Presensi Masuk Berhasil (06:55 WIB)' : 'Klik Presensi Masuk Sekarang'}</span>
          </button>
        </div>

        {/* 3 Metric Summary Boxes */}
        <div className="lg:col-span-7 grid grid-cols-3 gap-3">
          
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 shadow-xs flex flex-col justify-center">
            <span className="text-xs text-slate-500">Hadir Tepat Waktu</span>
            <div className="text-2xl font-extrabold text-emerald-600 mt-1">48 Hari</div>
            <span className="text-[10px] text-slate-400 mt-0.5">Semester ini</span>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 shadow-xs flex flex-col justify-center">
            <span className="text-xs text-slate-500">Izin / Sakit</span>
            <div className="text-2xl font-extrabold text-amber-500 mt-1">1 Hari</div>
            <span className="text-[10px] text-slate-400 mt-0.5">Surat terverifikasi</span>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 shadow-xs flex flex-col justify-center">
            <span className="text-xs text-slate-500">Tanpa Keterangan (A)</span>
            <div className="text-2xl font-extrabold text-slate-400 mt-1">0 Hari</div>
            <span className="text-[10px] text-emerald-600 mt-0.5 font-semibold">Tertib 100%</span>
          </div>

        </div>

      </div>

      {/* Main Grid: Riwayat Presensi & Form Izin */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Riwayat Presensi */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-800/90 rounded-2xl border border-slate-200 dark:border-slate-700 p-5 space-y-4 shadow-xs">
          <h2 className="text-sm font-bold text-slate-900 dark:text-white flex items-center">
            <Calendar className="w-4 h-4 mr-2 text-emerald-600" />
            Riwayat Presensi 5 Hari Terakhir
          </h2>

          <div className="space-y-2.5">
            {attendance.map((att) => (
              <div
                key={att.id}
                className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 flex items-center justify-between text-xs"
              >
                <div className="space-y-0.5">
                  <div className="font-bold text-slate-900 dark:text-white">{att.date}</div>
                  <div className="text-slate-500 text-[11px]">
                    Masuk: {att.timeIn} • Pulang: {att.timeOut} • Lokasi: {att.location}
                  </div>
                </div>

                <span
                  className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                    att.status === 'Hadir'
                      ? 'bg-emerald-100 text-emerald-800'
                      : att.status === 'Sakit'
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-blue-100 text-blue-800'
                  }`}
                >
                  {att.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Form Pengajuan Izin / Sakit */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-800/90 rounded-2xl border border-slate-200 dark:border-slate-700 p-5 space-y-4 shadow-xs">
          <h2 className="text-sm font-bold text-slate-900 dark:text-white flex items-center">
            <FileText className="w-4 h-4 mr-2 text-amber-600" />
            Formulir Izin / Sakit Online
          </h2>

          <form onSubmit={handlePermissionSubmit} className="space-y-3 text-xs">
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                Kategori Permohonan:
              </label>
              <div className="flex space-x-3">
                <label className="flex items-center space-x-1.5 cursor-pointer">
                  <input
                    type="radio"
                    name="type"
                    checked={permissionType === 'Izin'}
                    onChange={() => setPermissionType('Izin')}
                  />
                  <span>Izin (Keperluan Keluarga/Penting)</span>
                </label>
                <label className="flex items-center space-x-1.5 cursor-pointer">
                  <input
                    type="radio"
                    name="type"
                    checked={permissionType === 'Sakit'}
                    onChange={() => setPermissionType('Sakit')}
                  />
                  <span>Sakit</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                Alasan / Keterangan:
              </label>
              <textarea
                required
                rows={2}
                value={permissionReason}
                onChange={(e) => setPermissionReason(e.target.value)}
                placeholder="Contoh: Mengalami demam dan disarankan istirahat oleh dokter..."
                className="w-full p-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl focus:outline-none focus:border-emerald-500 text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                Unggah Bukti Surat Dokter / Surat Wali:
              </label>
              <input
                type="file"
                className="w-full text-slate-500 file:mr-3 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:bg-slate-100 file:text-slate-800 hover:file:bg-slate-200"
              />
            </div>

            <button
              type="submit"
              disabled={permissionSuccess}
              className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-xs transition disabled:opacity-50"
            >
              {permissionSuccess ? 'Mengirim Surat Izin...' : 'Kirim Permohonan Izin'}
            </button>
          </form>
        </div>

      </div>

    </div>
  );
};
