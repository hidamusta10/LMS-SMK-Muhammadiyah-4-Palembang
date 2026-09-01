import React, { useState } from 'react';
import { ClassSubject } from '../../types';
import { X, Sparkles, PlusCircle } from 'lucide-react';

interface CreateItemModalProps {
  isOpen: boolean;
  type: 'materi' | 'tugas' | 'ujian' | 'jurnal' | null;
  classes: ClassSubject[];
  onClose: () => void;
  onSuccess: (newItem: any) => void;
}

export const CreateItemModal: React.FC<CreateItemModalProps> = ({
  isOpen,
  type,
  classes,
  onClose,
  onSuccess,
}) => {
  if (!isOpen || !type) return null;

  const [title, setTitle] = useState('');
  const [selectedClass, setSelectedClass] = useState(classes[0]?.id || '');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('2026-09-10');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;

    alert(`Berhasil membuat ${type.toUpperCase()} baru: "${title}" untuk kelas terpilih!`);
    onSuccess({ title, classId: selectedClass, description, dueDate });
    onClose();
  };

  const getTitleByType = () => {
    switch (type) {
      case 'materi':
        return 'Tambah Modul Ajar / Jobsheet Baru';
      case 'tugas':
        return 'Buat Tugas / Proyek Praktik Baru';
      case 'ujian':
        return 'Buat Paket Soal Asesmen CBT Baru';
      case 'jurnal':
        return 'Entri Jurnal Mengajar Harian';
      default:
        return 'Buat Item Baru';
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 z-50">
      <div className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-4">
        
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center space-x-2 text-emerald-600">
            <PlusCircle className="w-5 h-5" />
            <h2 className="font-extrabold text-slate-900 dark:text-white text-base">
              {getTitleByType()}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
          <div>
            <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">
              Pilih Rombongan Belajar / Kelas:
            </label>
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl focus:outline-none focus:border-emerald-500 text-slate-900 dark:text-white font-semibold"
            >
              {classes.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name} ({c.room})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">
              Judul {type === 'materi' ? 'Materi / Modul' : type === 'tugas' ? 'Tugas' : 'Ujian'}:
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Contoh: Implementasi Keamanan REST API dengan JWT"
              className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl focus:outline-none focus:border-emerald-500 text-slate-900 dark:text-white"
            />
          </div>

          {type === 'tugas' && (
            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">
                Batas Waktu Pengumpulan (Deadline):
              </label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl focus:outline-none focus:border-emerald-500 text-slate-900 dark:text-white"
              />
            </div>
          )}

          <div>
            <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">
              Deskripsi / Petunjuk / SOP:
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Tuliskan petunjuk pengerjaan atau ringkasan kompetensi..."
              className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl focus:outline-none focus:border-emerald-500 text-slate-900 dark:text-white"
            />
          </div>

          <div className="flex space-x-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            >
              Batal
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition shadow-sm"
            >
              Simpan & Terbitkan
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
