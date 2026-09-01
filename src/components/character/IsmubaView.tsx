import React, { useState } from 'react';
import {
  Sparkles,
  Flame,
  BookOpen,
  CheckCircle2,
  Calendar,
  Award,
  Heart,
  Sun,
  Moon,
} from 'lucide-react';

export const IsmubaView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'jurnal' | 'materi' | 'ortom'>('jurnal');
  const [salatStatus, setSalatStatus] = useState<Record<string, boolean>>({
    Subuh: true,
    Dzuhur: true,
    Ashar: true,
    Maghrib: false,
    Isya: false,
    Dhuha: true,
    Tahajjud: false,
    Tadarus: true,
  });

  const toggleSalat = (key: string) => {
    setSalatStatus((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="inline-flex items-center space-x-1 text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
            <Flame className="w-3.5 h-3.5 mr-1" />
            <span>Menu 14: Karakter Islami & Ke-Muhammadiyahan</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1">
            Portal ISMUBA & Penguatan Karakter
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Al-Islam, Kemuhammadiyahan, Bahasa Arab, Hizbul Wathan (HW), dan Tapak Suci Putera Muhammadiyah.
          </p>
        </div>
      </div>

      {/* Hero Banner ISMUBA */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-amber-900 via-emerald-950 to-slate-900 text-white shadow-md space-y-3">
        <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-500/20 text-amber-200 border border-amber-400/30">
          <Sparkles className="w-3 h-3 mr-1 text-amber-300" />
          Membangun Generasi Berkemajuan & Berakhlak Mulia
        </div>
        <h2 className="text-xl font-extrabold text-white">
          "Menegakkan dan menjunjung tinggi Agama Islam sehingga terwujud masyarakat Islam yang sebenar-benarnya."
        </h2>
        <p className="text-xs text-amber-100/80">
          SMK Muhammadiyah 4 Palembang memadukan keahlian teknologi industri mutakhir dengan keteguhan iman dan taqwa.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex overflow-x-auto space-x-2 border-b border-slate-200 dark:border-slate-800 pb-2">
        <button
          onClick={() => setActiveTab('jurnal')}
          className={`px-3.5 py-1.5 text-xs font-bold rounded-xl whitespace-nowrap transition ${
            activeTab === 'jurnal'
              ? 'bg-amber-600 text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          Jurnal Ibadah Harian Siswa
        </button>
        <button
          onClick={() => setActiveTab('materi')}
          className={`px-3.5 py-1.5 text-xs font-bold rounded-xl whitespace-nowrap transition ${
            activeTab === 'materi'
              ? 'bg-amber-600 text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          Kurikulum ISMUBA (Fikih, Akhlak, Tarikh)
        </button>
        <button
          onClick={() => setActiveTab('ortom')}
          className={`px-3.5 py-1.5 text-xs font-bold rounded-xl whitespace-nowrap transition ${
            activeTab === 'ortom'
              ? 'bg-amber-600 text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          Ortom: IPM, Hizbul Wathan & Tapak Suci
        </button>
      </div>

      {/* Tab: Jurnal Ibadah Harian */}
      {activeTab === 'jurnal' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          <div className="lg:col-span-6 bg-white dark:bg-slate-800/90 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 space-y-4 shadow-xs">
            <h3 className="font-bold text-slate-900 dark:text-white text-sm flex items-center">
              <Sun className="w-4 h-4 mr-2 text-amber-500" />
              Checklist Ibadah Fardhu & Sunnah Hari Ini
            </h3>

            <div className="grid grid-cols-2 gap-3 text-xs">
              {Object.entries(salatStatus).map(([name, done]) => (
                <div
                  key={name}
                  onClick={() => toggleSalat(name)}
                  className={`p-3 rounded-xl border transition cursor-pointer flex items-center justify-between ${
                    done
                      ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 font-bold text-slate-900 dark:text-white'
                      : 'bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-700 text-slate-500'
                  }`}
                >
                  <span>Salat {name}</span>
                  <CheckCircle2
                    className={`w-4 h-4 ${done ? 'text-emerald-600' : 'text-slate-300'}`}
                  />
                </div>
              ))}
            </div>

            <button
              onClick={() => alert('Jurnal ibadah hari ini berhasil disimpan ke profil siswa!')}
              className="w-full py-2.5 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl text-xs transition mt-2"
            >
              Simpan Catatan Ibadah Hari Ini
            </button>
          </div>

          <div className="lg:col-span-6 bg-white dark:bg-slate-800/90 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 space-y-4 shadow-xs">
            <h3 className="font-bold text-slate-900 dark:text-white text-sm flex items-center">
              <BookOpen className="w-4 h-4 mr-2 text-emerald-600" />
              Target Hafalan & Tadarus Al-Qur'an
            </h3>

            <div className="p-4 bg-emerald-50/60 dark:bg-emerald-950/30 rounded-xl border border-emerald-200 dark:border-emerald-800 text-xs space-y-2">
              <div className="font-bold text-emerald-900 dark:text-emerald-200">
                Target Semester Genap: Juz 30 (Juz 'Amma)
              </div>
              <div className="flex justify-between text-[11px] text-slate-600 dark:text-slate-300">
                <span>Capaian Terkini: An-Naba' s.d. Al-Insyiqaq</span>
                <span className="font-bold text-emerald-600">85% Tuntas</span>
              </div>
              <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: '85%' }} />
              </div>
            </div>
          </div>

        </div>
      )}

      {/* Tab: Ortom */}
      {activeTab === 'ortom' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 space-y-3 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-600 flex items-center justify-center font-bold">
              IPM
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white text-sm">
              Ikatan Pelajar Muhammadiyah (PR IPM)
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              Wadah kepemimpinan, dakwah kader pelajar kreatif, dan gerakan literasi berkemajuan.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 space-y-3 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-600 flex items-center justify-center font-bold">
              HW
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white text-sm">
              Gerakan Kepanduan Hizbul Wathan (HW)
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              Menempa kedisiplinan, kemandirian kepanduan Islami, dan kecintaan pada tanah air.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 space-y-3 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-rose-500/20 text-rose-600 flex items-center justify-center font-bold">
              TS
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white text-sm">
              Tapak Suci Putera Muhammadiyah
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              Seni bela diri raga dan mental berlandaskan tauhid: <em>"Dengan Iman dan Akhlak Saya Menjadi Kuat"</em>.
            </p>
          </div>
        </div>
      )}

    </div>
  );
};
