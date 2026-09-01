import { GitHubUser, GitHubRepo, GitHubCommit, CodeFile } from '../types';

const GITHUB_TOKEN_STORAGE_KEY = 'smk_m4_github_pat';
const GITHUB_USER_STORAGE_KEY = 'smk_m4_github_user';

export class GitHubService {
  /**
   * Mengambil token GitHub yang tersimpan di browser
   */
  static getToken(): string | null {
    return localStorage.getItem(GITHUB_TOKEN_STORAGE_KEY);
  }

  /**
   * Menyimpan token GitHub ke browser
   */
  static saveToken(token: string) {
    localStorage.setItem(GITHUB_TOKEN_STORAGE_KEY, token.trim());
  }

  /**
   * Menghapus sesi koneksi GitHub
   */
  static disconnect() {
    localStorage.removeItem(GITHUB_TOKEN_STORAGE_KEY);
    localStorage.removeItem(GITHUB_USER_STORAGE_KEY);
  }

  /**
   * Mengambil data profil yang tersimpan di cache
   */
  static getCachedUser(): GitHubUser | null {
    const raw = localStorage.getItem(GITHUB_USER_STORAGE_KEY);
    if (!raw) return null;
    try {
      return JSON.parse(raw);
    } catch {
      return null;
    }
  }

  /**
   * Validasi token dan ambil profil user dari GitHub REST API
   */
  static async fetchUserProfile(token?: string): Promise<GitHubUser> {
    const activeToken = token || this.getToken();
    if (!activeToken) {
      throw new Error('Token GitHub belum dikonfigurasi.');
    }

    const response = await fetch('https://api.github.com/user', {
      headers: {
        Authorization: `Bearer ${activeToken}`,
        Accept: 'application/vnd.github.v3+json',
      },
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Token GitHub tidak valid atau telah kedaluwarsa.');
      }
      throw new Error(`Gagal menghubungi GitHub API (Status: ${response.status})`);
    }

    const data = await response.json();
    const user: GitHubUser = {
      login: data.login,
      name: data.name || data.login,
      avatar_url: data.avatar_url,
      html_url: data.html_url,
      bio: data.bio || 'Siswa / Pendidik SMK Muhammadiyah 4 Palembang',
      public_repos: data.public_repos || 0,
      followers: data.followers || 0,
      following: data.following || 0,
    };

    localStorage.setItem(GITHUB_USER_STORAGE_KEY, JSON.stringify(user));
    if (token) this.saveToken(token);

    return user;
  }

  /**
   * Mengambil daftar repository milik user
   */
  static async fetchUserRepositories(): Promise<GitHubRepo[]> {
    const token = this.getToken();
    if (!token) throw new Error('Token GitHub belum tersedia.');

    const response = await fetch('https://api.github.com/user/repos?sort=updated&per_page=30', {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/vnd.github.v3+json',
      },
    });

    if (!response.ok) {
      throw new Error(`Gagal memuat repositori GitHub (${response.statusText})`);
    }

    const data = await response.json();
    return data.map((r: any) => ({
      id: r.id,
      name: r.name,
      full_name: r.full_name,
      description: r.description,
      html_url: r.html_url,
      stargazers_count: r.stargazers_count || 0,
      forks_count: r.forks_count || 0,
      language: r.language || 'Code',
      updated_at: r.updated_at,
      default_branch: r.default_branch || 'main',
      private: r.private || false,
    }));
  }

  /**
   * Membuat repository baru di GitHub akun siswa/guru
   */
  static async createRepository(name: string, description: string, isPrivate: boolean = false): Promise<GitHubRepo> {
    const token = this.getToken();
    if (!token) throw new Error('Silakan hubungkan akun GitHub terlebih dahulu.');

    const response = await fetch('https://api.github.com/user/repos', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/vnd.github.v3+json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name.trim().replace(/\\s+/g, '-').toLowerCase(),
        description: description || 'Proyek Praktik Kejuruan - SMK Muhammadiyah 4 Palembang',
        private: isPrivate,
        auto_init: true,
      }),
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(err.message || `Gagal membuat repositori (HTTP ${response.status})`);
    }

    const r = await response.json();
    return {
      id: r.id,
      name: r.name,
      full_name: r.full_name,
      description: r.description,
      html_url: r.html_url,
      stargazers_count: 0,
      forks_count: 0,
      language: r.language,
      updated_at: r.updated_at,
      default_branch: r.default_branch || 'main',
      private: r.private,
    };
  }

  /**
   * Push / Commit satu atau banyak file ke repository GitHub
   */
  static async pushFileToRepo(
    owner: string,
    repo: string,
    filePath: string,
    fileContent: string,
    commitMessage: string,
    branch: string = 'main'
  ): Promise<{ sha: string; html_url: string }> {
    const token = this.getToken();
    if (!token) throw new Error('Token GitHub diperlukan untuk push kode.');

    // 1. Periksa apakah file sudah ada (untuk mendapatkan SHA jika update)
    let existingSha: string | undefined;
    try {
      const checkResp = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${filePath}?ref=${branch}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/vnd.github.v3+json',
        },
      });
      if (checkResp.ok) {
        const fileData = await checkResp.json();
        existingSha = fileData.sha;
      }
    } catch {
      // File baru
    }

    // 2. Encode konten ke base64 (UTF-8 safe)
    const encodedContent = btoa(unescape(encodeURIComponent(fileContent)));

    const bodyPayload: any = {
      message: commitMessage,
      content: encodedContent,
      branch: branch,
    };

    if (existingSha) {
      bodyPayload.sha = existingSha;
    }

    const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/vnd.github.v3+json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bodyPayload),
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(err.message || `Gagal push kode ke repository (Status: ${response.status})`);
    }

    const result = await response.json();
    return {
      sha: result.commit.sha,
      html_url: result.commit.html_url,
    };
  }

  /**
   * Membuat GitHub Gist publik / rahasia dengan 1-klik
   */
  static async createGist(
    files: CodeFile[],
    description: string,
    isPublic: boolean = true
  ): Promise<{ id: string; html_url: string }> {
    const token = this.getToken();
    const headers: Record<string, string> = {
      Accept: 'application/vnd.github.v3+json',
      'Content-Type': 'application/json',
    };
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const filesMap: Record<string, { content: string }> = {};
    files.forEach((f) => {
      filesMap[f.name] = { content: f.content };
    });

    const response = await fetch('https://api.github.com/gists', {
      method: 'POST',
      headers,
      body: JSON.stringify({
        description: description || 'Kode Praktik SMK Muhammadiyah 4 Palembang',
        public: isPublic,
        files: filesMap,
      }),
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(err.message || `Gagal membuat Gist (${response.status})`);
    }

    const data = await response.json();
    return {
      id: data.id,
      html_url: data.html_url,
    };
  }
}
