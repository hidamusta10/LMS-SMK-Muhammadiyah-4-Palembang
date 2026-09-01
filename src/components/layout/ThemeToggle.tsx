import React, { useState, useRef, useEffect } from 'react';
import { Sun, Moon, Laptop, Check, ChevronDown } from 'lucide-react';
import { useTheme, ThemeMode } from '../../context/ThemeContext';

interface ThemeToggleProps {
  variant?: 'header' | 'portal' | 'dropdown' | 'compact' | 'segmented';
  className?: string;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ variant = 'header', className = '' }) => {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const themeOptions: { mode: ThemeMode; label: string; desc: string; icon: React.ComponentType<{ className?: string }> }[] = [
    {
      mode: 'light',
      label: 'Mode Terang (Light)',
      desc: 'Tampilan cerah dengan kontras tinggi',
      icon: Sun,
    },
    {
      mode: 'dark',
      label: 'Mode Gelap (Dark)',
      desc: 'Tampilan malam hemat energi dan nyaman di mata',
      icon: Moon,
    },
    {
      mode: 'system',
      label: 'Default Sistem',
      desc: `Otomatis sesuai tema OS (${resolvedTheme === 'dark' ? 'Saat ini: Gelap' : 'Saat ini: Terang'})`,
      icon: Laptop,
    },
  ];

  // Active icon based on current choice
  const CurrentIcon = theme === 'light' ? Sun : theme === 'dark' ? Moon : Laptop;

  if (variant === 'segmented') {
    return (
      <div className={`inline-flex p-1 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 ${className}`}>
        {themeOptions.map((opt) => {
          const Icon = opt.icon;
          const isSelected = theme === opt.mode;
          return (
            <button
              key={opt.mode}
              onClick={() => setTheme(opt.mode)}
              title={opt.label}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                isSelected
                  ? 'bg-white dark:bg-slate-700 text-emerald-700 dark:text-emerald-300 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{opt.mode === 'system' ? 'Sistem' : opt.mode === 'dark' ? 'Gelap' : 'Terang'}</span>
            </button>
          );
        })}
      </div>
    );
  }

  const isPortalVariant = variant === 'portal';

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        id="theme-toggle-btn"
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Pilih tema tampilan (Terang, Gelap, Sistem)"
        title={`Tema: ${theme === 'light' ? 'Terang' : theme === 'dark' ? 'Gelap' : 'Sistem'}`}
        className={`flex items-center space-x-1.5 px-2.5 sm:px-3 py-2 text-xs font-semibold rounded-xl transition shadow-xs focus:outline-none focus:ring-2 focus:ring-yellow-400 ${
          isPortalVariant
            ? 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700'
            : 'bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-xs'
        }`}
      >
        <CurrentIcon className={`w-4 h-4 transition-transform duration-200 ${isPortalVariant ? 'text-emerald-600 dark:text-yellow-400' : 'text-yellow-300'}`} />
        <span className="hidden sm:inline">
          {theme === 'light' ? 'Terang' : theme === 'dark' ? 'Gelap' : 'Sistem'}
        </span>
        <ChevronDown className="w-3 h-3 opacity-70" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border-2 border-slate-200 dark:border-slate-800 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-800">
            <p className="text-xs font-extrabold text-slate-900 dark:text-white uppercase tracking-wider">
              Tema Tampilan
            </p>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Pilihan tersimpan otomatis di browser
            </p>
          </div>

          <div className="p-1.5 space-y-1">
            {themeOptions.map((opt) => {
              const Icon = opt.icon;
              const isSelected = theme === opt.mode;
              return (
                <button
                  key={opt.mode}
                  type="button"
                  onClick={() => {
                    setTheme(opt.mode);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2.5 rounded-xl text-xs flex items-center justify-between transition ${
                    isSelected
                      ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-900 dark:text-emerald-200 font-bold border border-emerald-200 dark:border-emerald-800'
                      : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium'
                  }`}
                >
                  <div className="flex items-center space-x-2.5">
                    <div
                      className={`p-1.5 rounded-lg ${
                        isSelected
                          ? 'bg-emerald-600 text-white'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="leading-tight">{opt.label}</div>
                      <div className="text-[10px] text-slate-400 dark:text-slate-500 font-normal mt-0.5">
                        {opt.mode === 'system' ? `Otomatis (${resolvedTheme === 'dark' ? 'Gelap' : 'Terang'})` : opt.mode === 'dark' ? 'Mode malam' : 'Mode siang'}
                      </div>
                    </div>
                  </div>

                  {isSelected && <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 ml-2 shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
