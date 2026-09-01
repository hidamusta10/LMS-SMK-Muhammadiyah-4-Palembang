# Panduan Deploy ke Vercel (vercel.app)
**LMS SMK Muhammadiyah 4 Palembang**

File konfigurasi `vercel.json` telah dibuat dan disiapkan di root proyek.

---

## 🚀 Cara 1: Deploy Otomatis via GitHub (Sangat Direkomendasikan)

1. **Push / Unggah Kode ke GitHub:**
   - Ekspor atau push source code proyek ini ke repositori GitHub Anda (misal: `github.com/username/lms-smk-m4`).
2. **Buka Vercel:**
   - Kunjungi [https://vercel.com](https://vercel.com) dan login menggunakan akun GitHub Anda.
3. **Impor Proyek:**
   - Klik tombol **"Add New..."** lalu pilih **"Project"**.
   - Pilih repositori GitHub proyek LMS ini dan klik **"Import"**.
4. **Konfigurasi Project Settings di Vercel:**
   - **Framework Preset:** `Vite` (akan terdeteksi otomatis)
   - **Root Directory:** `./`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`
5. **Klik "Deploy":**
   - Tunggu proses build sekitar 30 - 60 detik.
   - Aplikasi Anda akan langsung online dengan domain gratis seperti:  
     `https://lms-smk-m4.vercel.app`

Setiap kali Anda melakukan push/update ke branch `main`, Vercel akan otomatis melakukan auto-deploy update terbaru.

---

## 💻 Cara 2: Deploy Cepat via Terminal / Vercel CLI

Jika Anda ingin deploy langsung dari laptop/komputer via terminal:

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Login ke Akun Vercel:**
   ```bash
   vercel login
   ```

3. **Jalankan Perintah Deploy (Production):**
   ```bash
   vercel --prod
   ```

4. Ikuti instruksi di terminal (tekan Enter untuk menyetujui pengaturan default Vite). Dalam hitungan detik, URL Vercel produksi akan muncul di terminal.
