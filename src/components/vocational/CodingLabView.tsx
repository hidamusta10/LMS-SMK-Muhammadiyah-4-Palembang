import React, { useState, useEffect } from 'react';
import {
  Code,
  Terminal,
  Play,
  Copy,
  Check,
  Download,
  Github,
  FolderGit2,
  GitBranch,
  GitCommit,
  GitPullRequest,
  Sparkles,
  ExternalLink,
  Layers,
  Cpu,
  Smartphone,
  Server,
  Palette,
  Globe,
  Apple,
  RefreshCw,
  FileCode2,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Share2,
  ShieldCheck,
  Zap,
  ArrowRight,
  BookOpen,
  Laptop
} from 'lucide-react';
import { CODING_MODULES } from '../../data/codingLabData';
import { TechStackId, CodingModule, CodeFile, GitHubUser, GitHubRepo } from '../../types';
import { GitHubService } from '../../services/githubService';

export const CodingLabView: React.FC = () => {
  // Active Tech Stack State
  const [selectedStackId, setSelectedStackId] = useState<TechStackId>('web_programming');
  const activeModule: CodingModule = CODING_MODULES.find((m) => m.id === selectedStackId) || CODING_MODULES[0];

  // Active Code File State
  const [activeFileIndex, setActiveFileIndex] = useState<number>(0);
  const [editableFiles, setEditableFiles] = useState<CodeFile[]>(activeModule.files);

  // Terminal & Run Simulation State
  const [isCompiling, setIsCompiling] = useState<boolean>(false);
  const [terminalLogs, setTerminalLogs] = useState<string>(activeModule.executionOutput.stdout);
  const [runSuccess, setRunSuccess] = useState<boolean>(true);
  const [copiedCode, setCopiedCode] = useState<boolean>(false);

  // GitHub Integration State
  const [githubTokenInput, setGithubTokenInput] = useState<string>('');
  const [connectedUser, setConnectedUser] = useState<GitHubUser | null>(null);
  const [userRepos, setUserRepos] = useState<GitHubRepo[]>([]);
  const [isConnectingGithub, setIsConnectingGithub] = useState<boolean>(false);
  const [githubError, setGithubError] = useState<string | null>(null);
  const [showGithubModal, setShowGithubModal] = useState<boolean>(false);
  const [showPushModal, setShowPushModal] = useState<boolean>(false);

  // Push to GitHub form state
  const [selectedRepoName, setSelectedRepoName] = useState<string>('');
  const [newRepoName, setNewRepoName] = useState<string>('');
  const [isCreatingNewRepo, setIsCreatingNewRepo] = useState<boolean>(false);
  const [commitMessage, setCommitMessage] = useState<string>('feat: initial code from SMK Muhammadiyah 4 Palembang Lab');
  const [isPushing, setIsPushing] = useState<boolean>(false);
  const [pushResult, setPushResult] = useState<{ success: boolean; url?: string; msg?: string } | null>(null);

  // Sync files when stack changes
  useEffect(() => {
    setEditableFiles(activeModule.files);
    setActiveFileIndex(0);
    setTerminalLogs(activeModule.executionOutput.stdout);
  }, [selectedStackId]);

  // Load cached GitHub user on mount
  useEffect(() => {
    const cachedUser = GitHubService.getCachedUser();
    if (cachedUser && GitHubService.getToken()) {
      setConnectedUser(cachedUser);
      loadUserRepositories();
    }
  }, []);

  const loadUserRepositories = async () => {
    try {
      const repos = await GitHubService.fetchUserRepositories();
      setUserRepos(repos);
      if (repos.length > 0) {
        setSelectedRepoName(repos[0].name);
      }
    } catch (err: any) {
      console.warn('Gagal memuat repositori GitHub:', err.message);
    }
  };

  const handleConnectGithub = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!githubTokenInput.trim()) return;

    setIsConnectingGithub(true);
    setGithubError(null);

    try {
      const user = await GitHubService.fetchUserProfile(githubTokenInput.trim());
      setConnectedUser(user);
      setShowGithubModal(false);
      setGithubTokenInput('');
      await loadUserRepositories();
    } catch (err: any) {
      setGithubError(err.message || 'Gagal menghubungkan ke GitHub.');
    } finally {
      setIsConnectingGithub(false);
    }
  };

  const handleDisconnectGithub = () => {
    GitHubService.disconnect();
    setConnectedUser(null);
    setUserRepos([]);
    setPushResult(null);
  };

  const currentFile = editableFiles[activeFileIndex] || editableFiles[0];

  const handleCodeChange = (newContent: string) => {
    const updated = [...editableFiles];
    updated[activeFileIndex] = {
      ...updated[activeFileIndex],
      content: newContent,
    };
    setEditableFiles(updated);
  };

  const handleResetCode = () => {
    setEditableFiles(activeModule.files);
  };

  const handleCopyCode = () => {
    if (!currentFile) return;
    navigator.clipboard.writeText(currentFile.content);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleDownloadFile = () => {
    if (!currentFile) return;
    const blob = new Blob([currentFile.content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = currentFile.name;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleRunCode = () => {
    setIsCompiling(true);
    setTerminalLogs(`[Compiling ${currentFile.name}...]\\nAnalyzing syntax and resolving references...`);

    setTimeout(() => {
      setIsCompiling(false);
      setRunSuccess(true);
      setTerminalLogs(
        `>>> [BUILD SUCCESS] ${new Date().toLocaleTimeString()} <<<\nTarget: ${activeModule.version}\n` +
          activeModule.executionOutput.stdout +
          `\n\n[PROSES SELESAI] Kode dieksekusi dengan exit code 0.`
      );
    }, 900);
  };

  const handleCreateGist = async () => {
    try {
      const res = await GitHubService.createGist(
        editableFiles,
        `SMK M4 Lab - ${activeModule.title} (${currentFile.name})`
      );
      window.open(res.html_url, '_blank');
    } catch (err: any) {
      alert(`Gagal membuat Gist: ${err.message}`);
    }
  };

  const handlePushToGithub = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!connectedUser) {
      setShowGithubModal(true);
      return;
    }

    setIsPushing(true);
    setPushResult(null);

    try {
      let targetRepo = selectedRepoName;

      // Buat repo baru jika opsi aktif
      if (isCreatingNewRepo && newRepoName.trim()) {
        const created = await GitHubService.createRepository(
          newRepoName.trim(),
          `Proyek ${activeModule.title} - SMK Muhammadiyah 4 Palembang`
        );
        targetRepo = created.name;
        await loadUserRepositories();
      }

      if (!targetRepo) {
        throw new Error('Pilih atau buat repositori tujuan terlebih dahulu.');
      }

      // Push file aktif ke repo
      const result = await GitHubService.pushFileToRepo(
        connectedUser.login,
        targetRepo,
        currentFile.name,
        currentFile.content,
        commitMessage,
        'main'
      );

      setPushResult({
        success: true,
        url: result.html_url,
        msg: `Berhasil push ${currentFile.name} ke ${connectedUser.login}/${targetRepo}!`,
      });
    } catch (err: any) {
      setPushResult({
        success: false,
        msg: err.message || 'Terjadi kesalahan saat push ke GitHub.',
      });
    } finally {
      setIsPushing(false);
    }
  };

  const getStackIcon = (iconName: string) => {
    switch (iconName) {
      case 'Cpu':
        return Cpu;
      case 'Smartphone':
        return Smartphone;
      case 'Code':
        return Code;
      case 'Server':
        return Server;
      case 'Layers':
        return Layers;
      case 'Palette':
        return Palette;
      case 'Globe':
        return Globe;
      case 'Apple':
        return Apple;
      default:
        return FileCode2;
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Header */}
      <div className="bg-gradient-to-r from-emerald-900 via-teal-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl border border-emerald-800/40 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="max-w-3xl">
            <div className="flex items-center space-x-2.5 mb-3">
              <span className="bg-yellow-400 text-emerald-950 text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" /> Studio Praktik Kejuruan RPL
              </span>
              <span className="bg-white/10 text-emerald-200 text-xs font-semibold px-3 py-1 rounded-full border border-white/15">
                8 Framework Lengkap + GitHub Sync
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">
              Laboratorium Coding & Repository Kejuruan
            </h1>
            <p className="text-emerald-100/90 text-sm sm:text-base mt-2 leading-relaxed">
              Lingkungan praktik langsung pemrograman embedded, mobile handheld, full-stack web MVC, ASP.NET Core, UI/UX Web Design, hingga Apple iOS Xcode yang terhubung langsung ke akun GitHub siswa & guru.
            </p>
          </div>

          {/* GitHub Status Card in Header */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shrink-0">
            <div className="flex items-center space-x-3.5">
              <div className="p-3 bg-slate-900 text-white rounded-xl shadow-md border border-slate-700">
                <Github className="w-6 h-6" />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-300 uppercase tracking-wider">Status GitHub</div>
                {connectedUser ? (
                  <div className="flex items-center space-x-2 mt-0.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="font-bold text-white text-sm">@{connectedUser.login}</span>
                    <span className="text-xs text-emerald-200 font-medium">({connectedUser.public_repos} Repos)</span>
                  </div>
                ) : (
                  <div className="text-xs text-slate-300 font-medium mt-0.5">Belum terhubung</div>
                )}
              </div>
            </div>

            <div className="flex items-center space-x-2 w-full sm:w-auto">
              {connectedUser ? (
                <>
                  <button
                    onClick={() => setShowPushModal(true)}
                    className="flex-1 sm:flex-initial bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-extrabold px-3.5 py-2 rounded-xl text-xs flex items-center justify-center space-x-1.5 transition shadow-sm"
                  >
                    <FolderGit2 className="w-3.5 h-3.5" />
                    <span>Push ke GitHub</span>
                  </button>
                  <button
                    onClick={handleDisconnectGithub}
                    className="bg-white/10 hover:bg-rose-500/20 hover:text-rose-200 text-slate-300 text-xs px-2.5 py-2 rounded-xl border border-white/15 transition font-semibold"
                    title="Putuskan koneksi GitHub"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <button
                  id="btn-connect-github"
                  onClick={() => setShowGithubModal(true)}
                  className="w-full sm:w-auto bg-yellow-400 hover:bg-yellow-300 text-emerald-950 font-extrabold px-4 py-2 rounded-xl text-xs flex items-center justify-center space-x-1.5 transition shadow-sm"
                >
                  <Github className="w-4 h-4" />
                  <span>Hubungkan Akun GitHub</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 8 Tech Stacks Navigation Grid */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            Pilih Modul Teknologi & Framework Pembelajaran
          </h2>
          <span className="text-xs text-emerald-700 dark:text-emerald-400 font-bold">8 Modul Terstandarisasi</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5">
          {CODING_MODULES.map((mod) => {
            const isSelected = selectedStackId === mod.id;
            const Icon = getStackIcon(mod.iconName);
            return (
              <button
                key={mod.id}
                onClick={() => setSelectedStackId(mod.id)}
                className={`p-3 rounded-2xl border text-left transition relative flex flex-col justify-between h-28 group ${
                  isSelected
                    ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-500 dark:border-emerald-600 shadow-md ring-2 ring-emerald-500/20'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-emerald-300 dark:hover:border-slate-700 hover:bg-slate-50/50 dark:hover:bg-slate-800/40'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div
                    className={`p-2 rounded-xl transition ${
                      isSelected
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 group-hover:bg-emerald-100 group-hover:text-emerald-700 dark:group-hover:bg-slate-700'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  {isSelected && <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />}
                </div>

                <div>
                  <div
                    className={`text-xs font-bold leading-snug line-clamp-1 ${
                      isSelected
                        ? 'text-emerald-950 dark:text-emerald-200'
                        : 'text-slate-800 dark:text-slate-200 group-hover:text-emerald-700 dark:group-hover:text-emerald-400'
                    }`}
                  >
                    {mod.title.split('(')[0]}
                  </div>
                  <div className="text-[10px] text-slate-400 dark:text-slate-500 font-medium truncate mt-0.5">
                    {mod.level}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Coding Studio: Split Layout (Editor + Terminal & Info) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Code Editor & Multi-File Tabs (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          <div className="bg-slate-900 rounded-3xl border border-slate-800 shadow-2xl overflow-hidden flex flex-col">
            {/* Editor Top Bar */}
            <div className="bg-slate-950 px-4 py-3 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
              {/* File Tabs */}
              <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 sm:pb-0">
                {editableFiles.map((file, idx) => (
                  <button
                    key={file.name}
                    onClick={() => setActiveFileIndex(idx)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-mono font-medium flex items-center space-x-1.5 transition ${
                      activeFileIndex === idx
                        ? 'bg-slate-800 text-emerald-400 border border-slate-700 shadow-xs'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                    }`}
                  >
                    <FileCode2 className="w-3.5 h-3.5" />
                    <span>{file.name}</span>
                  </button>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleResetCode}
                  title="Kembalikan kode ke template awal"
                  className="p-1.5 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-lg text-xs transition flex items-center space-x-1"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Reset</span>
                </button>
                <button
                  onClick={handleCopyCode}
                  title="Salin seluruh kode ke clipboard"
                  className="p-1.5 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-lg text-xs transition flex items-center space-x-1"
                >
                  {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span className="hidden sm:inline">{copiedCode ? 'Disalin' : 'Salin'}</span>
                </button>
                <button
                  onClick={handleDownloadFile}
                  title="Unduh file kode ke komputer"
                  className="p-1.5 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-lg text-xs transition flex items-center space-x-1"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Unduh</span>
                </button>
                <button
                  onClick={handleCreateGist}
                  title="Export ke GitHub Gist publik"
                  className="p-1.5 text-slate-400 hover:text-yellow-300 hover:bg-slate-800 rounded-lg text-xs transition flex items-center space-x-1"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Gist</span>
                </button>
                <button
                  onClick={handleRunCode}
                  disabled={isCompiling}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold px-4 py-1.5 rounded-xl text-xs flex items-center space-x-1.5 transition shadow-sm disabled:opacity-50"
                >
                  <Play className={`w-3.5 h-3.5 fill-current ${isCompiling ? 'animate-spin' : ''}`} />
                  <span>{isCompiling ? 'Menjalankan...' : 'Jalankan Kode'}</span>
                </button>
              </div>
            </div>

            {/* Code Content Area with Line Numbers */}
            <div className="relative flex font-mono text-xs leading-relaxed bg-slate-900 overflow-x-auto min-h-[380px] max-h-[500px]">
              {/* Line Numbers Column */}
              <div className="select-none py-4 px-3 text-right bg-slate-950/60 text-slate-600 border-r border-slate-800/80 font-mono text-[11px] min-w-[42px]">
                {currentFile.content.split('\n').map((_, i) => (
                  <div key={i}>{i + 1}</div>
                ))}
              </div>

              {/* Code TextArea */}
              <textarea
                value={currentFile.content}
                onChange={(e) => handleCodeChange(e.target.value)}
                spellCheck={false}
                className="flex-1 p-4 bg-transparent text-slate-200 outline-none resize-none font-mono text-xs leading-relaxed selection:bg-emerald-900 selection:text-white"
                style={{ tabSize: 4 }}
              />
            </div>

            {/* Editor Footer / File Metadata */}
            <div className="bg-slate-950 px-4 py-2 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
              <span className="truncate">{currentFile.description}</span>
              <span className="font-mono text-slate-500 uppercase shrink-0 ml-2">
                {currentFile.language} • {currentFile.content.split('\n').length} baris
              </span>
            </div>
          </div>

          {/* Virtual Terminal & Execution Console */}
          <div className="bg-slate-950 rounded-3xl border border-slate-800 shadow-xl overflow-hidden">
            <div className="bg-slate-900/90 px-4 py-2.5 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Terminal className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-bold text-slate-300 font-mono">Console / Virtual Output</span>
              </div>
              <div className="flex items-center space-x-3 text-[11px] font-mono">
                <span className="flex items-center space-x-1 text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>{activeModule.executionOutput.status}</span>
                </span>
                <span className="text-slate-500">|</span>
                <span className="text-slate-400">{activeModule.version}</span>
              </div>
            </div>

            <div className="p-4 font-mono text-xs text-emerald-300/90 bg-slate-950/90 overflow-x-auto max-h-56 whitespace-pre-wrap leading-relaxed">
              {terminalLogs}
            </div>

            {/* Runtime Metrics Bar */}
            <div className="bg-slate-900/60 px-4 py-2 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-2">
              {activeModule.executionOutput.metrics.map((m, idx) => (
                <div key={idx} className="text-[11px]">
                  <span className="text-slate-500">{m.label}: </span>
                  <span className="font-bold text-slate-200">{m.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Framework Details, Curriculum, Sample Projects, and Git Workbench (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          {/* Active Framework Summary Card */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950 px-2.5 py-1 rounded-full border border-emerald-200 dark:border-emerald-800">
                  {activeModule.category}
                </span>
                <h3 className="text-base font-extrabold text-slate-900 dark:text-white mt-2">
                  {activeModule.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{activeModule.subtitle}</p>
              </div>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              {activeModule.overview}
            </p>

            <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
              <div className="text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                Konsep Inti yang Dipelajari:
              </div>
              <ul className="space-y-1.5">
                {activeModule.coreConcepts.map((concept, i) => (
                  <li key={i} className="text-xs text-slate-600 dark:text-slate-400 flex items-start space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                    <span>{concept}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-2xl border border-slate-100 dark:border-slate-800 text-xs">
              <span className="font-bold text-slate-700 dark:text-slate-300">Relevansi Kurikulum SMK:</span>
              <p className="text-slate-500 dark:text-slate-400 mt-0.5 text-[11px]">{activeModule.curriculumRef}</p>
            </div>
          </div>

          {/* GitHub Sync & Push Quick Action */}
          <div className="bg-gradient-to-br from-slate-900 to-emerald-950 text-white rounded-3xl p-5 border border-emerald-800/30 shadow-md space-y-3.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Github className="w-5 h-5 text-yellow-300" />
                <span className="font-extrabold text-sm text-white">GitHub Workbench</span>
              </div>
              <span className="text-[10px] font-bold bg-white/10 px-2 py-0.5 rounded-full border border-white/20 text-emerald-200">
                {connectedUser ? 'Tersambung' : 'Siap Konek'}
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Simpan dan push pekerjaan praktikum ke repositori GitHub portofolio pribadimu untuk sertifikasi UKK & penilaian guru.
            </p>

            {connectedUser ? (
              <div className="space-y-2 pt-1">
                <button
                  onClick={() => setShowPushModal(true)}
                  className="w-full bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-extrabold py-2.5 rounded-xl text-xs flex items-center justify-center space-x-2 transition shadow-sm"
                >
                  <GitCommit className="w-4 h-4" />
                  <span>Push Kode ({currentFile.name}) ke GitHub</span>
                </button>
                <div className="text-[11px] text-emerald-200/80 text-center">
                  Target akun: <strong className="text-white">@{connectedUser.login}</strong>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setShowGithubModal(true)}
                className="w-full bg-yellow-400 hover:bg-yellow-300 text-emerald-950 font-extrabold py-2.5 rounded-xl text-xs flex items-center justify-center space-x-2 transition shadow-sm"
              >
                <Github className="w-4 h-4" />
                <span>Sambungkan GitHub Token</span>
              </button>
            )}
          </div>

          {/* Practical Sample Projects / Jobsheets */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-extrabold text-slate-900 dark:text-white uppercase tracking-wider">
                Ide Proyek Praktik & Tugas
              </h4>
              <span className="text-[10px] font-bold text-slate-400">UKK RPL</span>
            </div>

            <div className="space-y-2.5">
              {activeModule.sampleProjects.map((proj, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-emerald-900 dark:text-emerald-300">{proj.title}</span>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                      {proj.difficulty}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">{proj.description}</p>
                  <div className="flex flex-wrap gap-1 pt-1">
                    {proj.tech.map((t, i) => (
                      <span
                        key={i}
                        className="text-[10px] font-mono bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 px-2 py-0.5 rounded-md border border-slate-200 dark:border-slate-700"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* MODAL 1: Connect to GitHub (Token / Credentials) */}
      {showGithubModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border-2 border-slate-200 dark:border-slate-800 shadow-2xl max-w-lg w-full p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
              <div className="flex items-center space-x-3">
                <div className="p-2.5 bg-slate-900 text-white rounded-2xl shadow-sm">
                  <Github className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                    Hubungkan ke Akun GitHub
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Gunakan GitHub Personal Access Token (PAT)
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowGithubModal(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-sm font-bold p-1"
              >
                ✕
              </button>
            </div>

            {githubError && (
              <div className="p-3 bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800 rounded-2xl text-xs text-rose-700 dark:text-rose-300 flex items-start space-x-2">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{githubError}</span>
              </div>
            )}

            <form onSubmit={handleConnectGithub} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  GitHub Personal Access Token (Classic atau Fine-grained)
                </label>
                <input
                  type="password"
                  value={githubTokenInput}
                  onChange={(e) => setGithubTokenInput(e.target.value)}
                  placeholder="ghp_xxxxxxxxxxxxxxxxxxxxxx"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-mono outline-none focus:ring-2 focus:ring-emerald-500"
                  required
                />
                <div className="mt-2 text-[11px] text-slate-500 dark:text-slate-400 space-y-1">
                  <p>
                    💡 <strong>Cara buat token:</strong> Buka GitHub &rarr; Settings &rarr; Developer Settings &rarr; Personal access tokens &rarr; Centang izin <code>repo</code> & <code>gist</code>.
                  </p>
                  <a
                    href="https://github.com/settings/tokens"
                    target="_blank"
                    rel="noreferrer"
                    className="text-emerald-600 dark:text-emerald-400 font-bold inline-flex items-center space-x-1 hover:underline"
                  >
                    <span>Buka Halaman Token GitHub</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              <div className="flex items-center justify-end space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowGithubModal(false)}
                  className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={isConnectingGithub || !githubTokenInput.trim()}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold px-5 py-2.5 rounded-xl text-xs flex items-center space-x-2 transition shadow-sm disabled:opacity-50"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>{isConnectingGithub ? 'Memverifikasi...' : 'Verifikasi & Simpan'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: Push Code to GitHub Repo */}
      {showPushModal && connectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border-2 border-slate-200 dark:border-slate-800 shadow-2xl max-w-lg w-full p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
              <div className="flex items-center space-x-3">
                <div className="p-2.5 bg-emerald-600 text-white rounded-2xl shadow-sm">
                  <FolderGit2 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                    Push Kode ke GitHub Repository
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Akun: @{connectedUser.login} • File: {currentFile.name}
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  setShowPushModal(false);
                  setPushResult(null);
                }}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-sm font-bold p-1"
              >
                ✕
              </button>
            </div>

            {pushResult && (
              <div
                className={`p-3.5 rounded-2xl text-xs flex items-start space-x-2.5 ${
                  pushResult.success
                    ? 'bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200'
                    : 'bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-200'
                }`}
              >
                {pushResult.success ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
                )}
                <div className="space-y-1">
                  <div>{pushResult.msg}</div>
                  {pushResult.url && (
                    <a
                      href={pushResult.url}
                      target="_blank"
                      rel="noreferrer"
                      className="font-bold text-emerald-700 dark:text-emerald-400 inline-flex items-center space-x-1 hover:underline"
                    >
                      <span>Buka Commit di GitHub</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>
            )}

            <form onSubmit={handlePushToGithub} className="space-y-4">
              {/* Repo Selection Toggle */}
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Target Repositori
                </label>
                <button
                  type="button"
                  onClick={() => setIsCreatingNewRepo(!isCreatingNewRepo)}
                  className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline"
                >
                  {isCreatingNewRepo ? '← Pilih repo yang ada' : '+ Buat repositori baru'}
                </button>
              </div>

              {isCreatingNewRepo ? (
                <div>
                  <input
                    type="text"
                    value={newRepoName}
                    onChange={(e) => setNewRepoName(e.target.value)}
                    placeholder="nama-repo-baru (contoh: rpl-netmf-iot-lab)"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-mono outline-none focus:ring-2 focus:ring-emerald-500"
                    required
                  />
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1">
                    Repositori publik baru akan otomatis dibuat di akun GitHub Anda.
                  </p>
                </div>
              ) : (
                <div>
                  {userRepos.length > 0 ? (
                    <select
                      value={selectedRepoName}
                      onChange={(e) => setSelectedRepoName(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-mono outline-none focus:ring-2 focus:ring-emerald-500"
                    >
                      {userRepos.map((repo) => (
                        <option key={repo.id} value={repo.name}>
                          {repo.full_name} ({repo.default_branch})
                        </option>
                      ))}
                    </select>
                  ) : (
                    <div className="text-xs text-slate-500 dark:text-slate-400 p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                      Tidak ada repositori yang ditemukan. Buat repo baru di atas.
                    </div>
                  )}
                </div>
              )}

              {/* Commit Message */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Pesan Commit (Git Commit Message)
                </label>
                <input
                  type="text"
                  value={commitMessage}
                  onChange={(e) => setCommitMessage(e.target.value)}
                  placeholder="feat: update jobsheet code"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs outline-none focus:ring-2 focus:ring-emerald-500"
                  required
                />
              </div>

              <div className="flex items-center justify-end space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowPushModal(false)}
                  className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  Tutup
                </button>
                <button
                  type="submit"
                  disabled={isPushing}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold px-5 py-2.5 rounded-xl text-xs flex items-center space-x-2 transition shadow-sm disabled:opacity-50"
                >
                  <GitCommit className="w-4 h-4" />
                  <span>{isPushing ? 'Sedang Push...' : 'Commit & Push'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
