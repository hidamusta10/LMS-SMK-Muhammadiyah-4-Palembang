import React, { useState } from 'react';
import { ScheduleEvent } from '../../types';
import {
  Calendar,
  Clock,
  MapPin,
  User,
  Layers,
  Filter,
  Flame,
} from 'lucide-react';

interface ScheduleViewProps {
  schedule: ScheduleEvent[];
}

export const ScheduleView: React.FC<ScheduleViewProps> = ({ schedule }) => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'pelajaran' | 'lab' | 'ekskul' | 'piket'>('all');
  const [selectedDay, setSelectedDay] = useState<string>('all');

  const daysList = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];

  const filteredSchedule = schedule.filter((item) => {
    const matchCat = selectedCategory === 'all' || item.category === selectedCategory;
    const matchDay = selectedDay === 'all' || item.day === selectedDay;
    return matchCat && matchDay;
  });

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="inline-flex items-center space-x-1 text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
            <Calendar className="w-3.5 h-3.5 mr-1" />
            <span>Menu 9: Jadwal & Agenda Pembelajaran</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1">
            Jadwal Pelajaran, Laboratorium & Ekstrakurikuler
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Jadwal kegiatan akademik, alokasi bengkel/lab, piket kelas, dan kegiatan khas Muhammadiyah.
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 shadow-xs flex flex-wrap items-center justify-between gap-4">
        
        {/* Category Filters */}
        <div className="flex overflow-x-auto space-x-1.5">
          {[
            { id: 'all', label: 'Semua Agenda' },
            { id: 'pelajaran', label: 'Pelajaran Kelas' },
            { id: 'lab', label: 'Lab & Bengkel' },
            { id: 'ekskul', label: 'Ekstrakurikuler' },
            { id: 'piket', label: 'Piket Kelas' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id as any)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
                selectedCategory === cat.id
                  ? 'bg-emerald-600 text-white font-bold'
                  : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Day Select */}
        <div className="flex items-center space-x-2 text-xs">
          <span className="text-slate-400">Pilih Hari:</span>
          <select
            value={selectedDay}
            onChange={(e) => setSelectedDay(e.target.value)}
            className="px-3 py-1.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white font-semibold focus:outline-none focus:border-emerald-500"
          >
            <option value="all">Semua Hari</option>
            {daysList.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>

      </div>

      {/* Schedule Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredSchedule.map((item) => (
          <div
            key={item.id}
            className="p-5 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 space-y-3 shadow-xs hover:border-emerald-500 transition"
          >
            <div className="flex items-center justify-between">
              <span className="font-bold text-xs px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300">
                {item.day}
              </span>
              <span className="font-mono text-xs font-bold text-slate-600 dark:text-slate-300 flex items-center">
                <Clock className="w-3.5 h-3.5 mr-1 text-emerald-600" />
                {item.timeStart} - {item.timeEnd}
              </span>
            </div>

            <div>
              <h3 className="font-extrabold text-slate-900 dark:text-white text-sm">
                {item.subjectOrActivity}
              </h3>
              <div className="text-xs text-slate-500 flex items-center mt-1">
                <User className="w-3.5 h-3.5 mr-1 text-slate-400" />
                <span>{item.teacherOrSupervisor}</span>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between text-[11px] text-slate-400">
              <span className="flex items-center text-slate-600 dark:text-slate-300 font-semibold">
                <MapPin className="w-3 h-3 mr-1 text-rose-500" />
                {item.roomOrVenue}
              </span>
              <span className="capitalize px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-[10px]">
                {item.category}
              </span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
