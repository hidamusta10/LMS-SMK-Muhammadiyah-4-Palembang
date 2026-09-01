import React, { useState } from 'react';
import { AnnouncementItem } from '../../types';
import {
  Bell,
  Calendar,
  User,
  Tag,
  Search,
  Sparkles,
  ExternalLink,
} from 'lucide-react';

interface AnnouncementsViewProps {
  announcements: AnnouncementItem[];
}

export const AnnouncementsView: React.FC<AnnouncementsViewProps> = ({ announcements }) => {
  const [filterCat, setFilterCat] = useState<string>('all');
  const [search, setSearch] = useState<string>('');

  const filtered = announcements.filter((a) => {
    const matchCat = filterCat === 'all' || a.category === filterCat;
    const matchSearch =
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.content.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="inline-flex items-center space-x-1 text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
            <Bell className="w-3.5 h-3.5 mr-1" />
            <span>Menu 16: Komunikasi & Informasi</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1">
            Papan Pengumuman & Berita Sekolah
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Surat edaran resmi, agenda akademik, informasi PKL, beasiswa, dan kegiatan Persyarikatan.
          </p>
        </div>
      </div>

      {/* Filter & Search */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 flex flex-col md:flex-row items-center gap-3 shadow-xs">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari pengumuman atau berita sekolah..."
            className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs focus:outline-none focus:border-emerald-500 text-slate-900 dark:text-white"
          />
        </div>

        <div className="flex items-center space-x-1.5 overflow-x-auto w-full md:w-auto">
          {['all', 'Ujian CBT', 'PKL & DUDI', 'Akademik', 'Kesiswaan'].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCat(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
                filterCat === cat
                  ? 'bg-emerald-600 text-white font-bold'
                  : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              {cat === 'all' ? 'Semua Kategori' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Announcements List */}
      <div className="space-y-4">
        {filtered.map((item) => (
          <div
            key={item.id}
            className={`p-6 rounded-2xl border transition space-y-3 shadow-xs ${
              item.isImportant
                ? 'bg-amber-50/50 dark:bg-amber-950/20 border-amber-300 dark:border-amber-800/80'
                : 'bg-white dark:bg-slate-800/90 border-slate-200 dark:border-slate-700'
            }`}
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center space-x-2">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
                  {item.category}
                </span>
                {item.isImportant && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-500 text-white">
                    PENTING
                  </span>
                )}
              </div>

              <span className="text-xs text-slate-400 flex items-center">
                <Calendar className="w-3.5 h-3.5 mr-1" />
                {item.date}
              </span>
            </div>

            <div>
              <h2 className="text-base font-extrabold text-slate-900 dark:text-white">
                {item.title}
              </h2>
              <p className="text-xs text-slate-700 dark:text-slate-300 mt-2 leading-relaxed whitespace-pre-line">
                {item.content}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between text-[11px] text-slate-400">
              <span className="flex items-center">
                <User className="w-3.5 h-3.5 mr-1 text-slate-400" />
                Diterbitkan oleh: <strong>{item.author}</strong>
              </span>
              <span className="text-emerald-600 font-semibold">
                Target: {item.targetRole}
              </span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
