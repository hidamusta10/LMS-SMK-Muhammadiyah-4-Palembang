import React, { useState } from 'react';
import { TeachingFactoryUnit } from '../../types';
import {
  Factory,
  ShoppingBag,
  TrendingUp,
  Users,
  CheckCircle2,
  Clock,
  Sparkles,
  DollarSign,
  PlusCircle,
} from 'lucide-react';

interface TEFAViewProps {
  tefaUnits: TeachingFactoryUnit[];
}

export const TEFAView: React.FC<TEFAViewProps> = ({ tefaUnits }) => {
  const [selectedUnit, setSelectedUnit] = useState<TeachingFactoryUnit>(tefaUnits[0]);
  const [activeTab, setActiveTab] = useState<'proyek' | 'keuangan' | 'pesanan'>('proyek');

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="inline-flex items-center space-x-1 text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
            <Factory className="w-3.5 h-3.5 mr-1" />
            <span>Menu 11: Kegiatan Khas SMK</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1">
            Teaching Factory (TEFA) & Unit Produksi
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Model pembelajaran berbasis produksi riil, pesanan klien komersial, dan inkubator wirausaha siswa.
          </p>
        </div>
      </div>

      {/* TEFA Unit Selection Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {tefaUnits.map((unit) => {
          const isSelected = selectedUnit.id === unit.id;
          return (
            <div
              key={unit.id}
              onClick={() => setSelectedUnit(unit)}
              className={`p-5 rounded-2xl border transition cursor-pointer space-y-3 ${
                isSelected
                  ? 'bg-amber-50/80 dark:bg-amber-950/40 border-amber-500 shadow-sm'
                  : 'bg-white dark:bg-slate-800/90 border-slate-200 dark:border-slate-700 hover:border-amber-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-[10px] px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-200">
                  {unit.majorCode}
                </span>
                <span className="text-xs font-bold text-emerald-600">{unit.monthlyRevenue}</span>
              </div>

              <div>
                <h3 className="font-extrabold text-slate-900 dark:text-white text-sm">
                  {unit.name}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-2">
                  {unit.description}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-100 dark:border-slate-700 text-[11px] text-slate-500 flex justify-between">
                <span>Supervisor: {unit.supervisor}</span>
                <span><strong>{unit.activeProjects.length}</strong> Proyek</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Detail of Selected TEFA Unit */}
      <div className="bg-white dark:bg-slate-800/90 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 space-y-6 shadow-xs">
        
        {/* Selected Unit Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-700">
          <div>
            <span className="text-xs font-mono font-bold text-amber-600 uppercase">
              Unit Bisnis: {selectedUnit.majorCode}
            </span>
            <h2 className="text-xl font-extrabold text-slate-900 dark:text-white mt-0.5">
              {selectedUnit.name}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Kepala Unit / Guru Pembimbing: <strong>{selectedUnit.supervisor}</strong>
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 text-right text-xs">
              <div className="text-slate-400">Total Omset Periode Ini</div>
              <div className="text-base font-extrabold text-emerald-600">{selectedUnit.monthlyRevenue}</div>
            </div>
          </div>
        </div>

        {/* Active Projects in TEFA */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center">
              <ShoppingBag className="w-4 h-4 mr-2 text-amber-600" />
              Daftar Pesanan & Proyek Komersial Aktif
            </h3>
          </div>

          <div className="space-y-3">
            {selectedUnit.activeProjects.map((proj) => (
              <div
                key={proj.id}
                className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 space-y-3 text-xs"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                      {proj.title}
                    </h4>
                    <span className="text-[11px] text-slate-500">
                      Klien: <strong>{proj.client}</strong>
                    </span>
                  </div>

                  <span
                    className={`px-2.5 py-1 rounded-full font-bold text-[10px] self-start sm:self-auto ${
                      proj.status === 'Completed'
                        ? 'bg-emerald-100 text-emerald-800'
                        : proj.status === 'In Progress'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {proj.status}
                  </span>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-[11px]">
                    <span className="text-slate-500">Progres Pengerjaan</span>
                    <span className="font-bold text-emerald-600">{proj.progressPercent}%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-amber-500 rounded-full transition-all"
                      style={{ width: `${proj.progressPercent}%` }}
                    />
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-200/80 dark:border-slate-700/80 text-[11px]">
                  <div className="flex items-center space-x-1.5 text-slate-600 dark:text-slate-300">
                    <Users className="w-3.5 h-3.5 text-amber-600" />
                    <span>Tim Siswa: <strong>{proj.assignedStudents.join(', ')}</strong></span>
                  </div>
                  <span className="text-rose-600 font-semibold">Deadline: {proj.deadline}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
