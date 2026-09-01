import { CodingModule } from '../types';

export const CODING_MODULES: CodingModule[] = [
  {
    id: 'dotnet_micro',
    title: '.NET Micro Framework (NETMF)',
    subtitle: 'Embedded C# & IoT Microcontroller Programming',
    category: 'Embedded & Mobile',
    iconName: 'Cpu',
    color: 'from-amber-600 to-orange-700',
    version: 'v4.4 (TinyCLR / SPOT)',
    level: 'Lanjutan',
    curriculumRef: 'RPL & TKJ: Sistem Tertanam & Internet of Things (IoT)',
    description: 'Pemrograman sistem tertanam (embedded) dan mikrokontroler menggunakan bahasa C# dan .NET Micro Framework (NETMF) untuk otomasi lab & sensor IoT SMK.',
    overview: 'NETMF adalah implementasi runtime CLR ringan dari Microsoft untuk mikrokontroler hemat daya dengan RAM terbatas (mulai dari 64 KB). Digunakan untuk membaca sensor GPIO, komunikasi I2C/SPI, dan transmisi data telemetri ke server sekolah.',
    coreConcepts: [
      'Microsoft.SPOT.Hardware & GPIO Pin Control',
      'InterruptPort untuk Deteksi Tombol / Sensor Real-time',
      'Komunikasi Bus Serial I2C & SPI',
      'Thread & Timer Scheduling Hemat Energi',
      'Socket Networking & Telemetri IoT'
    ],
    executionOutput: {
      status: 'Compiled',
      stdout: `[NETMF 4.4 CLR Bootloader - STM32F4 / FEZ Panda II]
Initializing Hardware Abstraction Layer (HAL)... OK
Clock Speed: 168 MHz | Free RAM: 112 KB / 128 KB
Configuring GPIO Pins:
 -> OutputPort Pin.GPIO_Pin13 (Status LED) : INITIALIZED HIGH
 -> OutputPort Pin.GPIO_Pin12 (Relay AC Lab): READY
 -> InterruptPort Pin.GPIO_Pin0 (Push Sensor) : INTERRUPT_RISING_EDGE
Connecting to I2C Bus (Address: 0x48 - LM75 Temp Sensor)...
[SENSOR LOOP] Reading Ambient Temperature: 28.4 °C | Humidity: 62%
[ALERT] Normal Operating Threshold. Status LED: BLINK_OK (500ms)
[TELEMETRY] Packet sent to http://iot.smkm4plg.sch.id/api/telemetry (Status 200 OK)
System running stably at 3.3V.`,
      metrics: [
        { label: 'Runtime Target', value: 'NETMF CLR 4.4' },
        { label: 'Memory Footprint', value: '42.8 KB RAM' },
        { label: 'Sampling Rate', value: '1000 ms' },
        { label: 'Hardware Bus', value: 'I2C / GPIO' }
      ]
    },
    sampleProjects: [
      {
        title: 'Sistem Smart Classroom & Lampu Otomatis',
        description: 'Membaca sensor gerak PIR dan mengaktifkan saklar relay lampu kelas saat jam KBM.',
        tech: ['C#', 'NETMF', 'GPIO', 'Relay'],
        difficulty: 'Menengah'
      },
      {
        title: 'Pemantau Suhu Ruang Server SMK',
        description: 'Logging sensor suhu I2C dan kirim peringatan HTTP bila suhu server melebihi 32°C.',
        tech: ['C#', 'I2C', 'NETMF Socket', 'HTTP Client'],
        difficulty: 'Lanjutan'
      }
    ],
    files: [
      {
        name: 'Program.cs',
        language: 'csharp',
        isEntry: true,
        description: 'Entry point program NETMF: Inisialisasi pin I/O dan loop pembacaan sensor.',
        content: `using System;
using System.Threading;
using Microsoft.SPOT;
using Microsoft.SPOT.Hardware;

namespace SMKM4Palembang.NetMicroFrameworkLab
{
    public class Program
    {
        // Definisi Pin Hardware
        private static OutputPort _ledStatus;
        private static OutputPort _relayLab;
        private static InterruptPort _buttonEmergency;

        public static void Main()
        {
            Debug.Print(">>> SMK Muhammadiyah 4 Palembang - NETMF IoT Controller <<<");

            // 1. Inisialisasi Output Port (LED Indikator Pin 13)
            _ledStatus = new OutputPort(Cpu.Pin.GPIO_Pin13, false);
            
            // 2. Inisialisasi Relay Kontrol Beban (Pin 12)
            _relayLab = new OutputPort(Cpu.Pin.GPIO_Pin12, false);

            // 3. Inisialisasi Interrupt Port untuk Push Button (Pin 0)
            _buttonEmergency = new InterruptPort(
                Cpu.Pin.GPIO_Pin0,
                true, // Glitch filter aktif untuk debounce tombol
                Port.ResistorMode.PullUp,
                Port.InterruptMode.InterruptEdgeLow
            );

            // Pasang Event Handler ketika tombol ditekan
            _buttonEmergency.OnInterrupt += ButtonEmergency_OnInterrupt;

            Debug.Print("[INFO] Perangkat Siap. Memulai thread telemetri IoT...");

            // 4. Background Telemetry Thread
            Thread telemetryThread = new Thread(TelemetryLoop);
            telemetryThread.Start();

            // 5. Main Thread: Heartbeat LED Blink
            while (true)
            {
                _ledStatus.Write(true);
                Thread.Sleep(500);
                _ledStatus.Write(false);
                Thread.Sleep(500);
            }
        }

        private static void ButtonEmergency_OnInterrupt(uint data1, uint data2, DateTime time)
        {
            Debug.Print("[ALERT INTERRUPT] Tombol darurat ditekan pada: " + time.ToString());
            // Matikan relay beban lab demi keamanan
            _relayLab.Write(false);
        }

        private static void TelemetryLoop()
        {
            // Simulasi pembacaan data ADC Sensor Analog
            int sensorValue = 0;
            while (true)
            {
                sensorValue = ReadAnalogSensor();
                float temperatureCelsius = (sensorValue * 3.3f / 1024f) * 100f;

                Debug.Print("[TELEMETRY] Suhu Lab Komputer: " + temperatureCelsius.ToString("F1") + " °C");

                if (temperatureCelsius > 30.0f)
                {
                    // Nyalakan pendingin melalui relay
                    _relayLab.Write(true);
                    Debug.Print("[ACTION] Suhu tinggi! Menyalakan exhaust fan relay.");
                }

                // Siklus kirim setiap 5 detik
                Thread.Sleep(5000);
            }
        }

        private static int ReadAnalogSensor()
        {
            // Nilai simulasi ADC (10-bit: 0 - 1023)
            return 88; // Setara ~28.3 °C
        }
    }
}`
      },
      {
        name: 'HardwarePins.cs',
        language: 'csharp',
        description: 'Konfigurasi pemetaan pin mikrokontroler STM32 / FEZ Panda.',
        content: `using Microsoft.SPOT.Hardware;

namespace SMKM4Palembang.NetMicroFrameworkLab
{
    public static class HardwarePins
    {
        public static readonly Cpu.Pin LedGreen = Cpu.Pin.GPIO_Pin13;
        public static readonly Cpu.Pin LedRed = Cpu.Pin.GPIO_Pin14;
        public static readonly Cpu.Pin RelayCh1 = Cpu.Pin.GPIO_Pin12;
        public static readonly Cpu.Pin SensorI2CSDA = Cpu.Pin.GPIO_Pin4;
        public static readonly Cpu.Pin SensorI2CSCL = Cpu.Pin.GPIO_Pin5;
    }
}`
      }
    ]
  },
  {
    id: 'dotnet_compact',
    title: '.NET Compact Framework (.NET CF)',
    subtitle: 'Mobile Handheld, PDA & Windows CE Enterprise Solutions',
    category: 'Embedded & Mobile',
    iconName: 'Smartphone',
    color: 'from-blue-700 to-indigo-800',
    version: 'v3.5 SP1 (Windows Mobile 6.5 / CE 6.0)',
    level: 'Menengah',
    curriculumRef: 'RPL: Aplikasi Mobile Enterprise & Kasir Industri',
    description: 'Pengembangan aplikasi perangkat genggam mobile berbasis Windows Mobile, PDA scanner gudang, dan sistem kasir POS mobile menggunakan C# .NET Compact Framework.',
    overview: '.NET Compact Framework (.NET CF) dioptimalkan untuk perangkat cerdas mobile (Pocket PC, barcode scanner industri Zebra/Honeywell) dengan dukungan database lokal SQL Server Compact Edition (SQL CE).',
    coreConcepts: [
      'System.Windows.Forms Compact UI Controls',
      'System.Data.SqlServerCe (SQL CE Local DB)',
      'Hardware Barcode Scanner API Integration',
      'Sinkronisasi Offline-to-Online (Replication)',
      'Konsumsi Memori Rendah untuk Handheld Device'
    ],
    executionOutput: {
      status: 'Compiled',
      stdout: `[Pocket PC / Windows CE Handheld Emulator]
Loading .NET Compact Framework 3.5 Runtime...
Connecting to local database: \\Storage Card\\SMK_TEFA_INVENTORY.sdf ... Connected.
Checking SQL Server CE 3.5 Cache Tables:
 -> Table [tbl_Produk] : 142 items loaded into DataSet
 -> Table [tbl_Transaksi] : Ready for offline store & forward
Hardware Scanner Engine: SYMBOL_LASER_SE955 initialized on COM1 (9600 bps)
Form [FrmKasirMobile] rendered at 240x320 pixels (QVGA Portrait).
[SCAN EVENT] Barcode: 899123456701 - Buku Modul Ajar C# (Rp 45.000)
Subtotal: Rp 45.000 | Cetak Struk Bluetooth ESC/POS: READY.`,
      metrics: [
        { label: 'Target OS', value: 'WinCE 6.0 / WinMo' },
        { label: 'Database', value: 'SQL Server CE 3.5' },
        { label: 'Screen Res', value: '240 x 320 (QVGA)' },
        { label: 'Scanner Port', value: 'COM1 Serial Scanner' }
      ]
    },
    sampleProjects: [
      {
        title: 'Aplikasi Kasir Mobile Koperasi TEFA',
        description: 'Point of Sale mobile untuk kasir kantin & koperasi sekolah dengan scan barcode dan cetak struk Bluetooth.',
        tech: ['C#', '.NET CF 3.5', 'SQL CE', 'Bluetooth SPP'],
        difficulty: 'Menengah'
      },
      {
        title: 'Sistem Inventaris Aset Lab & Bengkel',
        description: 'Pencatatan aset barang lab komputer dan mesin bengkel dengan barcode scanner handheld.',
        tech: ['C#', '.NET CF', 'DataSet', 'XML Sync'],
        difficulty: 'Menengah'
      }
    ],
    files: [
      {
        name: 'FrmKasirMobile.cs',
        language: 'csharp',
        isEntry: true,
        description: 'Form antarmuka Windows Forms Compact untuk kasir mobile dan scanning barcode.',
        content: `using System;
using System.Data;
using System.Drawing;
using System.Windows.Forms;
using System.Data.SqlServerCe;

namespace SMKM4Palembang.NetCompactFrameworkLab
{
    public class FrmKasirMobile : Form
    {
        private Label lblHeader;
        private TextBox txtBarcode;
        private Button btnScan;
        private ListBox lstKeranjang;
        private Label lblTotal;
        private Button btnBayar;
        private Button btnSync;

        private decimal totalBelanja = 0;
        private SqlCeConnection dbConn;

        public FrmKasirMobile()
        {
            InitializeComponent();
            InitDatabase();
        }

        private void InitializeComponent()
        {
            this.Text = "TEFA Mobile POS - SMK M4";
            this.Size = new Size(240, 320); // Resolusi QVGA standar Pocket PC

            lblHeader = new Label();
            lblHeader.Text = "KASIR MOBILE TEFA RPL";
            lblHeader.Font = new Font("Tahoma", 9, FontStyle.Bold);
            lblHeader.Location = new Point(10, 8);
            lblHeader.Size = new Size(220, 20);

            txtBarcode = new TextBox();
            txtBarcode.Location = new Point(10, 32);
            txtBarcode.Size = new Size(150, 22);
            txtBarcode.KeyPress += new KeyPressEventHandler(txtBarcode_KeyPress);

            btnScan = new Button();
            btnScan.Text = "Cari";
            btnScan.Location = new Point(165, 31);
            btnScan.Size = new Size(65, 24);
            btnScan.Click += new EventHandler(btnScan_Click);

            lstKeranjang = new ListBox();
            lstKeranjang.Location = new Point(10, 60);
            lstKeranjang.Size = new Size(220, 160);

            lblTotal = new Label();
            lblTotal.Text = "Total: Rp 0";
            lblTotal.Font = new Font("Tahoma", 10, FontStyle.Bold);
            lblTotal.ForeColor = Color.DarkGreen;
            lblTotal.Location = new Point(10, 230);
            lblTotal.Size = new Size(220, 20);

            btnBayar = new Button();
            btnBayar.Text = "SIMPAN & CETAK";
            btnBayar.BackColor = Color.SeaGreen;
            btnBayar.ForeColor = Color.White;
            btnBayar.Location = new Point(10, 255);
            btnBayar.Size = new Size(130, 28);
            btnBayar.Click += new EventHandler(btnBayar_Click);

            btnSync = new Button();
            btnSync.Text = "Sync Cloud";
            btnSync.Location = new Point(145, 255);
            btnSync.Size = new Size(85, 28);
            btnSync.Click += new EventHandler(btnSync_Click);

            this.Controls.Add(lblHeader);
            this.Controls.Add(txtBarcode);
            this.Controls.Add(btnScan);
            this.Controls.Add(lstKeranjang);
            this.Controls.Add(lblTotal);
            this.Controls.Add(btnBayar);
            this.Controls.Add(btnSync);
        }

        private void InitDatabase()
        {
            try
            {
                // Koneksi ke file database lokal SQL Server Compact
                string connStr = @"Data Source=\Storage Card\TEFA_POS.sdf;Persist Security Info=False;";
                dbConn = new SqlCeConnection(connStr);
                // Siap query offline
            }
            catch (Exception ex)
            {
                MessageBox.Show("DB Offline Cache Ready: " + ex.Message);
            }
        }

        private void txtBarcode_KeyPress(object sender, KeyPressEventArgs e)
        {
            if (e.KeyChar == (char)Keys.Enter)
            {
                ProcessBarcode(txtBarcode.Text.Trim());
                txtBarcode.Text = "";
                e.Handled = true;
            }
        }

        private void btnScan_Click(object sender, EventArgs e)
        {
            ProcessBarcode(txtBarcode.Text.Trim());
        }

        private void ProcessBarcode(string code)
        {
            if (string.IsNullOrEmpty(code)) return;

            // Simulasi lookup produk dari SQL CE
            string namaProduk = "Produk #" + code;
            decimal harga = 15000;

            if (code == "899001") { namaProduk = "Buku Tulis Muhammadiyah"; harga = 6500; }
            else if (code == "899002") { namaProduk = "Jas Lab RPL TEFA"; harga = 120000; }
            else if (code == "899003") { namaProduk = "Kabel LAN UTP Cat6 (1M)"; harga = 8000; }

            lstKeranjang.Items.Add(namaProduk + " - Rp " + harga.ToString("N0"));
            totalBelanja += harga;
            lblTotal.Text = "Total: Rp " + totalBelanja.ToString("N0");
        }

        private void btnBayar_Click(object sender, EventArgs e)
        {
            if (lstKeranjang.Items.Count == 0)
            {
                MessageBox.Show("Keranjang masih kosong!");
                return;
            }
            MessageBox.Show("Transaksi tersimpan di SQLite/SQL CE lokal.\\nTotal: Rp " + totalBelanja.ToString("N0"), "Sukses Kasir");
            lstKeranjang.Items.Clear();
            totalBelanja = 0;
            lblTotal.Text = "Total: Rp 0";
        }

        private void btnSync_Click(object sender, EventArgs e)
        {
            MessageBox.Show("Sinkronisasi 3 transaksi offline ke server pusat SMK berhasil!", "Sync OK");
        }
    }
}`
      }
    ]
  },
  {
    id: 'web_programming',
    title: 'Web Programming (Frontend & Modern JS)',
    subtitle: 'HTML5, Modern CSS3, ECMAScript 6+, Async & REST API Client',
    category: 'Web & Backend',
    iconName: 'Code',
    color: 'from-emerald-600 to-teal-800',
    version: 'HTML5 / ES2024 / CSS3 Grid',
    level: 'Pemula',
    curriculumRef: 'RPL: Pemrograman Web & Perangkat Bergerak (PWPB)',
    description: 'Kuasai fondasi esensial web development modern: struktur semantik HTML5, CSS Flexbox & CSS Grid, DOM manipulation, asynchronous JavaScript, Fetch API, dan integrasi REST API.',
    overview: 'Materi inti siswa jurusan Rekayasa Perangkat Lunak untuk membangun antarmuka web interaktif, responsif pada semua perangkat (mobile, tablet, desktop), dan berkomunikasi dengan backend server.',
    coreConcepts: [
      'HTML5 Semantic Tags (<header>, <main>, <article>, <section>)',
      'CSS Flexbox & CSS Grid Modern Layouting',
      'JavaScript ES6+ (Arrow functions, Destructuring, Promises, Async/Await)',
      'DOM Event Handling & Form Validation',
      'Fetch API & JSON Serialization'
    ],
    executionOutput: {
      status: 'Success',
      stdout: `[Chrome V8 JavaScript Engine - Web Client Simulator]
DOM Content Loaded: index.html (24ms)
Loaded Styles: styles.css (Flexbox + CSS Grid active)
Executing app.js:
 -> Attaching Event Listeners to [btn-tambah-siswa], [form-pendaftaran]
 -> Fetching API: GET https://api.smkm4palembang.sch.id/v1/siswa
 -> Response 200 OK: 4 data siswa diterima.
Rendering Card Bento Grid:
 [1] Bagas Pratama - XII RPL 1 (Nilai Rata-rata: 92.5) -> Rendered.
 [2] Siti Aisyah - XII RPL 1 (Nilai Rata-rata: 94.0) -> Rendered.
 [3] Rizky Ramadhan - XI RPL (Nilai Rata-rata: 88.0) -> Rendered.
Interactive Filter by Kelas: ACTIVE.
Input Validation: Pass (0 errors).`,
      metrics: [
        { label: 'DOM Performance', value: '60 FPS Smooth' },
        { label: 'Bundle Size', value: '3.4 KB (Zero dependencies)' },
        { label: 'Browser Support', value: 'All Modern Browsers' },
        { label: 'Async Protocol', value: 'Fetch / JSON REST' }
      ]
    },
    sampleProjects: [
      {
        title: 'Portal Pendaftaran Siswa Baru (PPDB Online)',
        description: 'Form pendaftaran interaktif dengan validasi real-time, preview foto upload, dan ringkasan formulir.',
        tech: ['HTML5', 'CSS3', 'JavaScript ES6', 'LocalStorage'],
        difficulty: 'Pemula'
      },
      {
        title: 'Katalog Produk Teaching Factory (TEFA)',
        description: 'Katalog belanja produk karya siswa RPL & Multimedia dengan filtering kategori, sorting harga, dan modal detail.',
        tech: ['HTML5 Grid', 'Fetch API', 'JSON Store'],
        difficulty: 'Menengah'
      }
    ],
    files: [
      {
        name: 'index.html',
        language: 'html',
        isEntry: true,
        description: 'Struktur semantik HTML5 halaman katalog siswa berprestasi.',
        content: `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Portal Prestasi Siswa RPL - SMK Muhammadiyah 4 Palembang</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <header class="site-header">
    <div class="container header-wrap">
      <div class="logo-area">
        <span class="badge">SMK PK</span>
        <h1>Lab Rekayasa Perangkat Lunak</h1>
      </div>
      <nav class="nav-links">
        <a href="#siswa" class="active">Data Siswa</a>
        <a href="#proyek">Proyek TEFA</a>
        <a href="#kontak">Hubungi Lab</a>
      </nav>
    </div>
  </header>

  <main class="container main-content">
    <section class="hero-card">
      <h2>Siswa Berprestasi & Karya Unggulan</h2>
      <p>Data capaian portofolio kejuruan berbasis Kurikulum Merdeka SMK Muhammadiyah 4 Palembang.</p>
      
      <div class="search-bar">
        <input type="text" id="searchInput" placeholder="Cari nama siswa atau keahlian...">
        <button id="btnSearch" class="btn btn-primary">Cari Siswa</button>
      </div>
    </section>

    <section class="grid-container" id="studentGrid">
      <!-- Dynamic Student Cards Rendered via JavaScript -->
    </section>
  </main>

  <footer class="site-footer">
    <p>&copy; 2026 SMK Muhammadiyah 4 Palembang. Jurusan Rekayasa Perangkat Lunak.</p>
  </footer>

  <script src="app.js"></script>
</body>
</html>`
      },
      {
        name: 'styles.css',
        language: 'css',
        description: 'Style CSS modern dengan layout CSS Grid, variables, dan efek interaktif.',
        content: `:root {
  --primary-color: #065f46;
  --secondary-color: #facc15;
  --bg-color: #f8fafc;
  --card-bg: #ffffff;
  --text-main: #0f172a;
  --text-muted: #64748b;
  --radius-lg: 16px;
  --radius-sm: 8px;
  --shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.06);
  --shadow-hover: 0 10px 24px rgba(6, 95, 70, 0.15);
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
}

body {
  background-color: var(--bg-color);
  color: var(--text-main);
  line-height: 1.6;
}

.container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 20px;
}

.site-header {
  background: var(--primary-color);
  color: white;
  padding: 16px 0;
  box-shadow: var(--shadow-sm);
}

.header-wrap {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo-area h1 {
  font-size: 1.25rem;
  font-weight: 800;
}

.badge {
  background: var(--secondary-color);
  color: #022c22;
  font-size: 0.7rem;
  font-weight: 800;
  padding: 2px 8px;
  border-radius: 99px;
  text-transform: uppercase;
}

.nav-links a {
  color: rgba(255, 255, 255, 0.85);
  text-decoration: none;
  margin-left: 20px;
  font-size: 0.875rem;
  font-weight: 600;
  transition: color 0.2s;
}

.nav-links a:hover, .nav-links a.active {
  color: var(--secondary-color);
}

.hero-card {
  background: white;
  border-radius: var(--radius-lg);
  padding: 32px;
  margin: 28px 0;
  border: 1px solid #e2e8f0;
  box-shadow: var(--shadow-sm);
}

.hero-card h2 {
  color: var(--primary-color);
  margin-bottom: 8px;
}

.search-bar {
  display: flex;
  gap: 12px;
  margin-top: 20px;
}

.search-bar input {
  flex: 1;
  padding: 12px 16px;
  border: 2px solid #e2e8f0;
  border-radius: var(--radius-sm);
  font-size: 0.95rem;
  outline: none;
  transition: border-color 0.2s;
}

.search-bar input:focus {
  border-color: var(--primary-color);
}

.btn {
  padding: 12px 24px;
  border: none;
  border-radius: var(--radius-sm);
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-primary {
  background: var(--primary-color);
  color: white;
}

.btn-primary:hover {
  background: #044e3a;
}

.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-bottom: 40px;
}

.student-card {
  background: var(--card-bg);
  border-radius: var(--radius-lg);
  padding: 24px;
  border: 2px solid #e2e8f0;
  box-shadow: var(--shadow-sm);
  transition: transform 0.2s, box-shadow 0.2s, border-color 0.2s;
}

.student-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-hover);
  border-color: var(--primary-color);
}

.student-name {
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--primary-color);
}

.student-class {
  font-size: 0.85rem;
  color: var(--text-muted);
  margin-bottom: 12px;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 12px;
}

.tag {
  background: #f0fdf4;
  color: #166534;
  font-size: 0.75rem;
  font-weight: 600;
  padding: 4px 10px;
  border-radius: 99px;
  border: 1px solid #bbf7d0;
}`
      },
      {
        name: 'app.js',
        language: 'javascript',
        description: 'Logika JavaScript ES6: State, Fetch async/await, dan render DOM dinamis.',
        content: `// Data Dummy Siswa RPL Berprestasi
const studentsData = [
  {
    id: 1,
    name: "Bagas Pratama",
    nisn: "0065412891",
    kelas: "XII RPL 1",
    skills: ["Fullstack Web", "CodeIgniter 4", "MySQL", "Git"],
    proyek: "Sistem Manajemen Inventaris TEFA",
    nilaiRata: 92.5
  },
  {
    id: 2,
    name: "Siti Aisyah",
    nisn: "0065412892",
    kelas: "XII RPL 1",
    skills: ["UI/UX Design", "Figma", "Tailwind CSS", "React"],
    proyek: "Redesign Portal Publik SMK Muhammadiyah 4",
    nilaiRata: 94.0
  },
  {
    id: 3,
    name: "Ahmad Rizky",
    nisn: "0065412893",
    kelas: "XI RPL",
    skills: [".NET Framework", "C# WinForms", "IoT ESP32"],
    proyek: "Monitoring Suhu Lab Komputer IoT",
    nilaiRata: 89.2
  },
  {
    id: 4,
    name: "Nabila Putri",
    nisn: "0065412894",
    kelas: "XII RPL 2",
    skills: ["iOS Development", "SwiftUI", "REST API"],
    proyek: "Aplikasi Presensi GPS Siswa PKL",
    nilaiRata: 91.8
  }
];

// Inisialisasi Render Saat Dokumen Siap
document.addEventListener("DOMContentLoaded", () => {
  const studentGrid = document.getElementById("studentGrid");
  const searchInput = document.getElementById("searchInput");
  const btnSearch = document.getElementById("btnSearch");

  // Fungsi Render Kartu Siswa ke DOM
  function renderStudents(list) {
    studentGrid.innerHTML = "";
    
    if (list.length === 0) {
      studentGrid.innerHTML = \`
        <div style="grid-column: 1/-1; text-align: center; padding: 40px; color: #64748b;">
          <h3>Tidak ada siswa yang cocok dengan pencarian.</h3>
        </div>\`;
      return;
    }

    list.forEach(student => {
      const card = document.createElement("div");
      card.className = "student-card";
      card.innerHTML = \`
        <div class="student-name">\${student.name}</div>
        <div class="student-class">NISN: \${student.nisn} • \${student.kelas}</div>
        <p style="font-size: 0.85rem; color: #334155; margin-bottom: 8px;">
          <strong>Proyek:</strong> \${student.proyek}
        </p>
        <div style="font-size: 0.8rem; font-weight: 700; color: #065f46;">
          ⭐ Capaian Kompetensi: \${student.nilaiRata} / 100
        </div>
        <div class="tags">
          \${student.skills.map(skill => \`<span class="tag">\${skill}</span>\`).join("")}
        </div>
      \`;
      studentGrid.appendChild(card);
    });
  }

  // Event Pencarian Real-time
  function handleFilter() {
    const query = searchInput.value.toLowerCase().trim();
    const filtered = studentsData.filter(item => 
      item.name.toLowerCase().includes(query) ||
      item.kelas.toLowerCase().includes(query) ||
      item.proyek.toLowerCase().includes(query) ||
      item.skills.some(s => s.toLowerCase().includes(query))
    );
    renderStudents(filtered);
  }

  searchInput.addEventListener("input", handleFilter);
  btnSearch.addEventListener("click", handleFilter);

  // Render Pertama Kali
  renderStudents(studentsData);
  console.log("Web Programming Lab initialized successfully.");
});`
      }
    ]
  },
  {
    id: 'codeigniter',
    title: 'CodeIgniter 4 (PHP Framework MVC)',
    subtitle: 'Full-Stack Web MVC Architecture, Routing, ORM & RESTful API',
    category: 'Web & Backend',
    iconName: 'Server',
    color: 'from-rose-600 to-red-800',
    version: 'CodeIgniter v4.4.x (PHP 8.2+)',
    level: 'Menengah',
    curriculumRef: 'RPL: Pemrograman Berorientasi Objek & Framework Web',
    description: 'Pelajari arsitektur Model-View-Controller (MVC), routing URL rapi, query builder database MySQL, form validation, CSRF protection, dan pembuatan REST API dengan CodeIgniter 4.',
    overview: 'CodeIgniter adalah framework PHP ringan dan cepat yang menjadi standar kurikulum SMK kejuruan RPL di Indonesia untuk Uji Kompetensi Keahlian (UKK) dan sertifikasi BNSP.',
    coreConcepts: [
      'Arsitektur Model-View-Controller (MVC)',
      'Config/Routes.php (HTTP Verbs: GET, POST, PUT, DELETE)',
      'App/Controllers & App/Models dengan Query Builder',
      'Database Migration, Seeders & Forge',
      'CodeIgniter RESTful API & JWT Token Handling'
    ],
    executionOutput: {
      status: 'Compiled',
      stdout: `[PHP 8.2 Built-in Server - CodeIgniter 4 Environment: development]
Spark CLI v4.4.6 active.
Routes registered:
 -> GET    /siswa                 App\\Controllers\\SiswaController::index
 -> GET    /siswa/tambah          App\\Controllers\\SiswaController::tambah
 -> POST   /siswa/simpan          App\\Controllers\\SiswaController::simpan
 -> GET    /api/v1/siswa          App\\Controllers\\Api\\SiswaApiController::listAll
Database Connection: MySQL 8.0 [db_smkm4_lms] ... Connected via PDO.
Executing Query: SELECT * FROM tbl_siswa WHERE status_aktif = 1 ORDER BY nama ASC;
Query executed in 0.0032s (14 records fetched).
Rendering View: app/Views/siswa/index.php with template layout: app/Views/layouts/main.php
Response Status: 200 OK | Memory Usage: 3.12 MB | Execution Time: 0.041s.`,
      metrics: [
        { label: 'PHP Version', value: 'PHP 8.2 / 8.3' },
        { label: 'Architecture', value: 'Pure MVC' },
        { label: 'DB Engine', value: 'MySQL / MariaDB' },
        { label: 'Security', value: 'CSRF & XSS Filter ON' }
      ]
    },
    sampleProjects: [
      {
        title: 'Sistem Informasi Akademik & E-Rapor Siswa',
        description: 'Aplikasi manajemen nilai rapor, cetak leger PDF, dan pengelolaan kelas berbasis CodeIgniter 4.',
        tech: ['PHP 8', 'CodeIgniter 4', 'MySQL', 'Bootstrap 5', 'DomPDF'],
        difficulty: 'Menengah'
      },
      {
        title: 'RESTful API Marketplace TEFA SMK',
        description: 'Backend REST API dengan autentikasi JWT token untuk aplikasi mobile katalog produk TEFA.',
        tech: ['CI4 RESTful', 'JSON Web Token (JWT)', 'CORS'],
        difficulty: 'Lanjutan'
      }
    ],
    files: [
      {
        name: 'app/Controllers/SiswaController.php',
        language: 'php',
        isEntry: true,
        description: 'Controller CodeIgniter 4 untuk menangani request, validasi, dan data siswa.',
        content: `<?php

namespace App\\Controllers;

use App\\Models\\SiswaModel;
use CodeIgniter\\Controller;

class SiswaController extends Controller
{
    protected $siswaModel;

    public function __construct()
    {
        // Inisialisasi Model Siswa
        $this->siswaModel = new SiswaModel();
    }

    /**
     * Menampilkan daftar seluruh siswa RPL
     */
    public function index()
    {
        $data = [
            'title'      => 'Manajemen Siswa RPL - SMK Muhammadiyah 4 Palembang',
            'daftarSiswa' => $this->siswaModel->getSiswaAktif(),
            'totalSiswa' => $this->siswaModel->countAllResults()
        ];

        // Render template view dengan data
        return view('siswa/index', $data);
    }

    /**
     * Menyimpan data siswa baru dengan validasi
     */
    public function simpan()
    {
        // Validasi input request
        $rules = [
            'nisn'  => 'required|min_length[10]|max_length[10]|is_unique[tbl_siswa.nisn]',
            'nama'  => 'required|min_length[3]|max_length[100]',
            'kelas' => 'required',
            'email' => 'required|valid_email'
        ];

        if (!$this->validate($rules)) {
            return redirect()->back()->withInput()->with('errors', $this->validator->getErrors());
        }

        // Simpan ke database menggunakan Model
        $this->siswaModel->save([
            'nisn'         => $this->request->getPost('nisn'),
            'nama'         => $this->request->getPost('nama'),
            'kelas'        => $this->request->getPost('kelas'),
            'jurusan'      => 'Rekayasa Perangkat Lunak (RPL)',
            'email'        => $this->request->getPost('email'),
            'status_aktif' => 1
        ]);

        session()->setFlashdata('pesan', 'Data siswa berhasil ditambahkan!');
        return redirect()->to('/siswa');
    }
}`
      },
      {
        name: 'app/Models/SiswaModel.php',
        language: 'php',
        description: 'Model CodeIgniter 4 dengan Query Builder dan validasi entitas.',
        content: `<?php

namespace App\\Models;

use CodeIgniter\\Model;

class SiswaModel extends Model
{
    protected $table            = 'tbl_siswa';
    protected $primaryKey       = 'id';
    protected $useAutoIncrement = true;
    protected $returnType       = 'array';
    protected $allowedFields    = ['nisn', 'nama', 'kelas', 'jurusan', 'email', 'status_aktif'];
    
    // Dates timestamps otomatis
    protected $useTimestamps = true;
    protected $createdField  = 'created_at';
    protected $updatedField  = 'updated_at';

    /**
     * Query custom untuk mengambil data siswa aktif beserta kelas
     */
    public function getSiswaAktif($kelas = null)
    {
        $builder = $this->where('status_aktif', 1);
        if ($kelas) {
            $builder->where('kelas', $kelas);
        }
        return $builder->orderBy('nama', 'ASC')->findAll();
    }
}`
      },
      {
        name: 'app/Config/Routes.php',
        language: 'php',
        description: 'Konfigurasi URL routing dan endpoint API CodeIgniter 4.',
        content: `<?php

use CodeIgniter\\Router\\RouteCollection;

/**
 * @var RouteCollection $routes
 */

// Route Web Views
$routes->get('/', 'SiswaController::index');
$routes->get('/siswa', 'SiswaController::index');
$routes->get('/siswa/tambah', 'SiswaController::tambah');
$routes->post('/siswa/simpan', 'SiswaController::simpan');
$routes->get('/siswa/edit/(:num)', 'SiswaController::edit/$1');
$routes->post('/siswa/update/(:num)', 'SiswaController::update/$1');
$routes->delete('/siswa/hapus/(:num)', 'SiswaController::hapus/$1');

// REST API Group untuk Mobile App
$routes->group('api/v1', ['namespace' => 'App\\Controllers\\Api'], static function ($routes) {
    $routes->get('siswa', 'SiswaApiController::index');
    $routes->post('siswa', 'SiswaApiController::create');
    $routes->get('siswa/(:num)', 'SiswaApiController::show/$1');
});`
      },
      {
        name: 'app/Views/siswa/index.php',
        language: 'php',
        description: 'View Blade/PHP template untuk menampilkan tabel data siswa.',
        content: `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title><?= esc($title) ?></title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css">
</head>
<body class="bg-light p-4">
  <div class="container bg-white p-4 rounded-4 shadow-sm">
    <div class="d-flex justify-content-between align-items-center mb-4 pb-2 border-bottom">
      <div>
        <h2 class="text-success fw-bold">Daftar Siswa Jurusan RPL</h2>
        <p class="text-muted mb-0">Total Siswa Aktif: <?= esc($totalSiswa) ?> Siswa</p>
      </div>
      <a href="<?= base_url('/siswa/tambah') ?>" class="btn btn-success fw-bold">+ Tambah Siswa Baru</a>
    </div>

    <?php if (session()->getFlashdata('pesan')): ?>
      <div class="alert alert-success alert-dismissible fade show" role="alert">
        <?= session()->getFlashdata('pesan') ?>
      </div>
    <?php endif; ?>

    <table class="table table-hover align-middle">
      <thead class="table-dark">
        <tr>
          <th>No</th>
          <th>NISN</th>
          <th>Nama Lengkap</th>
          <th>Kelas</th>
          <th>Jurusan</th>
          <th>Aksi</th>
        </tr>
      </thead>
      <tbody>
        <?php $no = 1; foreach ($daftarSiswa as $siswa): ?>
          <tr>
            <td><?= $no++ ?></td>
            <td><code><?= esc($siswa['nisn']) ?></code></td>
            <td class="fw-bold"><?= esc($siswa['nama']) ?></td>
            <td><span class="badge bg-primary"><?= esc($siswa['kelas']) ?></span></td>
            <td><?= esc($siswa['jurusan']) ?></td>
            <td>
              <a href="<?= base_url('/siswa/edit/' . $siswa['id']) ?>" class="btn btn-sm btn-outline-warning">Edit</a>
            </td>
          </tr>
        <?php endforeach; ?>
      </tbody>
    </table>
  </div>
</body>
</html>`
      }
    ]
  },
  {
    id: 'dotnet_framework',
    title: '.NET Framework & Modern .NET Core',
    subtitle: 'Enterprise C#, ASP.NET Core Web API, WinForms & Entity Framework',
    category: 'Web & Backend',
    iconName: 'Layers',
    color: 'from-purple-700 to-indigo-900',
    version: '.NET 8.0 LTS / C# 12',
    level: 'Industri',
    curriculumRef: 'RPL: Pemrograman Berorientasi Objek & Enterprise Backend',
    description: 'Arsitektur backend berskala industri menggunakan bahasa C# dan platform .NET 8 LTS: ASP.NET Core Web API, Dependency Injection, Entity Framework Core ORM, LINQ, dan DTO Pattern.',
    overview: '.NET Framework dan modern .NET adalah teknologi teratas yang digunakan oleh perusahaan perbankan, instansi pemerintah, dan startup multinasional untuk sistem backend berkinerja tinggi.',
    coreConcepts: [
      'ASP.NET Core Minimal API & Controllers',
      'Entity Framework Core (Code-First Migrations)',
      'Language Integrated Query (LINQ) & Asynchronous C#',
      'Dependency Injection & Repository Pattern',
      'Swagger / OpenAPI Documentations'
    ],
    executionOutput: {
      status: 'Success',
      stdout: `[Microsoft .NET Kestrel Web Server]
Hosting environment: Development | .NET Runtime: 8.0.2 (x64)
Listening on: http://localhost:5000 | https://localhost:5001
[INFO] Entity Framework Core 8.0 initializing SqlServerDbContext...
[INFO] Database migration checked: '20260901_InitialCreate' applied.
[INFO] Swagger UI generated at: https://localhost:5001/swagger/index.html
Incoming Request: GET /api/akademik/transkrip/0065412891
Executing LINQ Expression: _context.Siswa.Include(s => s.NilaiMapel).Where(s => s.Nisn == nisn)
Executed DbCommand (12ms) [Parameters=[@nisn='0065412891'], CommandType='Text']
Response Code: 200 OK (Content-Type: application/json; charset=utf-8)
Serialization Output: 8 subjects calculated (GPA / IPK: 3.84).`,
      metrics: [
        { label: 'Framework Version', value: '.NET 8.0 LTS' },
        { label: 'Language', value: 'C# 12 (Strict Nullable)' },
        { label: 'Throughput', value: '115,000 req/sec' },
        { label: 'ORM', value: 'EF Core 8' }
      ]
    },
    sampleProjects: [
      {
        title: 'Enterprise ERP Keuangan & SPP Sekolah',
        description: 'Sistem pencatatan tagihan SPP, integrasi payment gateway, dan laporan neraca keuangan.',
        tech: ['C#', 'ASP.NET Core', 'EF Core', 'PostgreSQL', 'JWT'],
        difficulty: 'Industri'
      },
      {
        title: 'Desktop Windows CBT Secure Browser',
        description: 'Aplikasi WinForms/WPF untuk ujian komputer aman (mencegah membuka tab lain dan alt+tab).',
        tech: ['C#', 'WPF', 'Win32 Hook API', 'WebSockets'],
        difficulty: 'Lanjutan'
      }
    ],
    files: [
      {
        name: 'Program.cs',
        language: 'csharp',
        isEntry: true,
        description: 'Inisialisasi aplikasi ASP.NET Core Web API, Service Container, dan Middleware Pipeline.',
        content: `using Microsoft.EntityFrameworkCore;
using SMKM4Palembang.EnterpriseBackend.Data;
using SMKM4Palembang.EnterpriseBackend.Services;

var builder = WebApplication.CreateBuilder(args);

// 1. Daftarkan Service ke Dependency Injection (DI) Container
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// 2. Konfigurasi Entity Framework Core (In-Memory atau SQL Server)
builder.Services.AddDbContext<SchoolDbContext>(options =>
    options.UseInMemoryDatabase("SMKM4_LMS_Database"));

// 3. Daftarkan Business Logic Service
builder.Services.AddScoped<IAcademicService, AcademicService>();

// 4. Konfigurasi CORS agar frontend dapat memanggil API
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod();
    });
});

var app = builder.Build();

// 5. Middleware Pipeline
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "SMK Muhammadiyah 4 LMS API v1");
    });
}

app.UseHttpsRedirection();
app.UseCors("AllowAll");
app.UseAuthorization();
app.MapControllers();

// Seed data awal jika database masih kosong
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<SchoolDbContext>();
    db.Database.EnsureCreated();
}

Console.WriteLine(">>> ASP.NET Core Web API Berhasil Dijalankan di Port 5000 <<<");
app.Run();`
      },
      {
        name: 'Controllers/AcademicController.cs',
        language: 'csharp',
        description: 'REST Controller C# dengan route, logging, dan status HTTP terstandar.',
        content: `using Microsoft.AspNetCore.Mvc;
using SMKM4Palembang.EnterpriseBackend.Models;
using SMKM4Palembang.EnterpriseBackend.Services;

namespace SMKM4Palembang.EnterpriseBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AcademicController : ControllerBase
    {
        private readonly IAcademicService _academicService;
        private readonly ILogger<AcademicController> _logger;

        public AcademicController(IAcademicService academicService, ILogger<AcademicController> logger)
        {
            _academicService = academicService;
            _logger = logger;
        }

        /// <summary>
        /// Mengambil seluruh transkrip nilai siswa berdasarkan NISN
        /// </summary>
        [HttpGet("transkrip/{nisn}")]
        [ProducesResponseType(typeof(StudentTranscriptDto), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetTranscript(string nisn)
        {
            _logger.LogInformation("Mengambil data transkrip untuk NISN: {Nisn}", nisn);

            var transcript = await _academicService.GetTranscriptByNisnAsync(nisn);
            if (transcript == null)
            {
                return NotFound(new { message = $"Siswa dengan NISN {nisn} tidak ditemukan." });
            }

            return Ok(transcript);
        }

        /// <summary>
        /// Input nilai asesmen baru dari guru
        /// </summary>
        [HttpPost("nilai")]
        public async Task<IActionResult> SubmitGrade([FromBody] SubmitGradeRequest request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await _academicService.SaveGradeAsync(request);
            return CreatedAtAction(nameof(GetTranscript), new { nisn = request.Nisn }, result);
        }
    }
}`
      },
      {
        name: 'Models/GradeModels.cs',
        language: 'csharp',
        description: 'Data Transfer Objects (DTO) dan Entity Model LINQ.',
        content: `namespace SMKM4Palembang.EnterpriseBackend.Models
{
    public record StudentTranscriptDto(
        string Nisn,
        string FullName,
        string ClassName,
        string Major,
        double Gpa,
        List<SubjectGradeDto> Grades
    );

    public record SubjectGradeDto(
        string SubjectCode,
        string SubjectName,
        int Score,
        string Predicate,
        bool IsPassed
    );

    public record SubmitGradeRequest(
        string Nisn,
        string SubjectCode,
        int Score,
        string Notes
    );
}`
      }
    ]
  },
  {
    id: 'web_design',
    title: 'Website & UI/UX Web Design',
    subtitle: 'Design Systems, Figma to Code, Typography, Color Palettes & Accessibility',
    category: 'Design & Frontend',
    iconName: 'Palette',
    color: 'from-pink-600 to-rose-800',
    version: 'Design System 2026 / WCAG 2.2 AA',
    level: 'Menengah',
    curriculumRef: 'RPL & DKV / Multimedia: Desain Grafis & UI/UX Interaktif',
    description: 'Rancang antarmuka website profesional dengan kaidah UI/UX modern: hierarki visual, mathematical font scaling, skema warna berkarakter (tanpa AI slop), contrast checking, dan mobile-first layouting.',
    overview: 'Kemampuan menerjemahkan wireframe dan desain Figma menjadi kode CSS/Tailwind yang presisi (pixel-perfect) dengan animasi micro-interactions yang halus.',
    coreConcepts: [
      'Design Tokens: Spacing 8pt Grid, Colors, Typography Scale',
      'Figma to HTML/Tailwind CSS Translation',
      'Aksesibilitas & Kontras Warna (WCAG AA Compliance)',
      'Micro-interactions & Keyframe CSS Transitions',
      'Desain Bento Grid Modern & Clean Hierarchy'
    ],
    executionOutput: {
      status: 'Success',
      stdout: `[Design System Linter & Accessibility Audit]
Evaluating Design Tokens:
 -> Color Palette: Emerald Deep (#065F46) + Amber Accent (#FACC15) + Slate Canvas (#F8FAFC)
 -> Typography Pairing: Plus Jakarta Sans (Headings 800) + Inter / System (Body 400)
 -> Line-Height & Readability: 1.6em | Max-width constraint: 72ch
Accessibility Contrast Score:
 -> Headings on Dark Canvas: 11.4:1 (AAA PASS)
 -> Button Text (#022C22 on #FACC15): 14.8:1 (AAA PASS)
Responsive Breakpoints:
 [Mobile 360px: OK] [Tablet 768px: OK] [Desktop 1280px: Bento Grid OK]
0 Visual Clashes detected. Design is production ready!`,
      metrics: [
        { label: 'WCAG Contrast', value: '14.8:1 (AAA)' },
        { label: 'Design Grid', value: '8px Harmonic' },
        { label: 'Type Scale', value: '1.25 Major Third' },
        { label: 'Performance', value: 'Zero CLS' }
      ]
    },
    sampleProjects: [
      {
        title: 'Design System Komponen UI Sekolah',
        description: 'Kumpulan button, badge, modal, bento tiles, dan typography tokens siap pakai.',
        tech: ['CSS Variables', 'Tailwind', 'Figma Tokens'],
        difficulty: 'Menengah'
      },
      {
        title: 'Landing Page Showcase Prestasi Sekolah',
        description: 'Landing page interaktif dengan layout Bento Grid, dark mode switcher, dan filter prestasi.',
        tech: ['UI/UX', 'CSS Glassmorphism subtle', 'Responsive'],
        difficulty: 'Menengah'
      }
    ],
    files: [
      {
        name: 'design-tokens.css',
        language: 'css',
        isEntry: true,
        description: 'Variabel CSS Design Tokens untuk palet warna, tipografi, dan radius sudut.',
        content: `/* ==========================================================================
   SMK MUHAMMADIYAH 4 PALEMBANG - DESIGN SYSTEM TOKENS (2026)
   ========================================================================== */

:root {
  /* Brand Color Palette */
  --brand-emerald-950: #022c22;
  --brand-emerald-900: #064e3b;
  --brand-emerald-800: #065f46;
  --brand-emerald-700: #047857;
  --brand-emerald-600: #059669;
  --brand-emerald-100: #d1fae5;
  --brand-emerald-50:  #ecfdf5;

  --brand-gold-500:    #eab308;
  --brand-gold-400:    #facc15;
  --brand-gold-300:    #fde047;

  /* Neutrals & Surfaces */
  --surface-canvas:    #f8fafc;
  --surface-card:      #ffffff;
  --surface-border:    #e2e8f0;
  --text-primary:      #0f172a;
  --text-secondary:    #475569;
  --text-muted:        #94a3b8;

  /* Typography Scale (Major Third 1.25) */
  --font-display: 'Plus Jakarta Sans', system-ui, sans-serif;
  --font-body:    'Inter', system-ui, sans-serif;

  --text-xs:   0.75rem;   /* 12px */
  --text-sm:   0.875rem;  /* 14px */
  --text-base: 1.00rem;   /* 16px */
  --text-lg:   1.25rem;   /* 20px */
  --text-xl:   1.563rem;  /* 25px */
  --text-2xl:  1.953rem;  /* 31px */

  /* Corner Radius Hierarchy (Inner = Outer - Padding) */
  --radius-outer: 24px;
  --radius-inner: 16px;
  --radius-pill:  9999px;

  /* Elevations */
  --shadow-bento: 0 4px 20px -2px rgba(0, 0, 0, 0.05);
  --shadow-hover: 0 12px 30px -4px rgba(6, 95, 70, 0.15);
}

/* Bento Tile Component Pattern */
.bento-card {
  background: var(--surface-card);
  border: 2px solid var(--surface-border);
  border-radius: var(--radius-outer);
  padding: 24px;
  box-shadow: var(--shadow-bento);
  transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1),
              border-color 0.2s ease,
              box-shadow 0.2s ease;
}

.bento-card:hover {
  transform: translateY(-3px);
  border-color: var(--brand-emerald-700);
  box-shadow: var(--shadow-hover);
}

.badge-gold {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  background: var(--brand-gold-400);
  color: var(--brand-emerald-950);
  font-size: var(--text-xs);
  font-weight: 800;
  padding: 4px 12px;
  border-radius: var(--radius-pill);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}`
      }
    ]
  },
  {
    id: 'website_building',
    title: 'Website Building & CMS Architecture',
    subtitle: 'Modular Dynamic Web, Jamstack, Headless CMS & Cloud Deployment',
    category: 'Design & Frontend',
    iconName: 'Globe',
    color: 'from-cyan-600 to-blue-800',
    version: 'Jamstack 2026 / Next.js / Vite',
    level: 'Menengah',
    curriculumRef: 'RPL & TKJ: Pembangunan Web Terintegrasi & Hosting Cloud',
    description: 'Bangun situs web dinamis lengkap dari nol: arsitektur modular komponen, integrasi konten dinamis, optimasi performa Google Lighthouse, SEO meta tags, dan pipeline deployment hosting cloud.',
    overview: 'Siswa mempraktikkan proses pembuatan portal sekolah, blog berita kejuruan, dan e-commerce landing page dengan standar modern dan performa skor 100 di Google PageSpeed.',
    coreConcepts: [
      'Component-Driven Development (Reusable Web Components)',
      'Dynamic Content Rendering & Headless CMS Pattern',
      'SEO & Open Graph Meta Tags untuk Media Sosial',
      'Core Web Vitals Optimization (LCP, FID, CLS)',
      'Static Site Generation & CDN Edge Caching'
    ],
    executionOutput: {
      status: 'Success',
      stdout: `[Website Builder & Static Build Pipeline]
Building production bundle: dist/
  -> index.html (2.1 KB gzip)
  -> assets/site.min.css (4.8 KB)
  -> assets/main.min.js (12.3 KB)
Running Lighthouse Core Web Vitals Audit:
  [PERFORMANCE]    : 100 / 100 (LCP: 0.8s, CLS: 0.000)
  [ACCESSIBILITY]  : 100 / 100 (Aria-labels & Semantic structure)
  [BEST PRACTICES] : 100 / 100 (HTTPS, modern image formats WebP)
  [SEO]            : 100 / 100 (Canonical URL, Title, Schema.org)
Generated Sitemap: /sitemap.xml (18 pages indexed).
Deployment ready for GitHub Pages / Cloud Run / Vercel.`,
      metrics: [
        { label: 'Lighthouse Score', value: '100 / 100' },
        { label: 'First Contentful Paint', value: '0.6s' },
        { label: 'SEO Score', value: '100% Complete' },
        { label: 'Bundle Footprint', value: '19.2 KB total' }
      ]
    },
    sampleProjects: [
      {
        title: 'Portal Berita & Majalah Daring SMK',
        description: 'Website publik berita sekolah dengan kategori artikel, komentar moderasi, dan pencarian cepat.',
        tech: ['HTML5', 'Dynamic JS', 'Markdown CMS', 'SEO'],
        difficulty: 'Menengah'
      },
      {
        title: 'Katalog Portofolio Kelulusan BMW (Bekerja, Melanjutkan, Wirausaha)',
        description: 'Website profil lulusan SMK untuk perekrutan industri mitra BKK.',
        tech: ['Static Site', 'Bento Grid', 'Filtering'],
        difficulty: 'Menengah'
      }
    ],
    files: [
      {
        name: 'site-builder.js',
        language: 'javascript',
        isEntry: true,
        description: 'Engine modular untuk merender komponen website secara dinamis.',
        content: `/**
 * SMK Muhammadiyah 4 Palembang - Dynamic Website Page Builder Engine
 */

class WebsiteBuilder {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.sections = [];
  }

  addHeroSection({ title, subtitle, ctaText, ctaLink, badge }) {
    this.sections.push({
      type: 'hero',
      render: () => \`
        <header class="hero-section" style="background: linear-gradient(135deg, #065f46 0%, #022c22 100%); color: white; padding: 60px 24px; border-radius: 24px; text-align: center;">
          <span style="background: #facc15; color: #022c22; font-size: 11px; font-weight: 800; padding: 4px 12px; border-radius: 99px; text-transform: uppercase;">
            \${badge}
          </span>
          <h1 style="font-size: 2.25rem; font-weight: 900; margin: 16px 0 8px 0; tracking: -0.02em;">\${title}</h1>
          <p style="font-size: 1.1rem; opacity: 0.9; max-width: 600px; margin: 0 auto 24px auto;">\${subtitle}</p>
          <a href="\${ctaLink}" style="display: inline-block; background: #facc15; color: #022c22; font-weight: 800; padding: 12px 28px; border-radius: 12px; text-decoration: none; box-shadow: 0 4px 12px rgba(0,0,0,0.15);">
            \${ctaText} &rarr;
          </a>
        </header>
      \`
    });
    return this;
  }

  addFeatureGrid(features) {
    this.sections.push({
      type: 'features',
      render: () => \`
        <section class="features-section" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px; margin-top: 32px;">
          \${features.map(f => \`
            <div style="background: white; border: 2px solid #e2e8f0; border-radius: 20px; padding: 24px; box-shadow: 0 2px 8px rgba(0,0,0,0.04);">
              <div style="font-size: 24px; margin-bottom: 8px;">\${f.icon}</div>
              <h3 style="color: #065f46; font-weight: 800; font-size: 1.15rem; margin-bottom: 6px;">\${f.title}</h3>
              <p style="color: #64748b; font-size: 0.9rem; line-height: 1.5;">\${f.desc}</p>
            </div>
          \`).join('')}
        </section>
      \`
    });
    return this;
  }

  build() {
    if (!this.container) return;
    this.container.innerHTML = this.sections.map(s => s.render()).join('');
    console.log("Website built successfully with", this.sections.length, "sections.");
  }
}

// Export for global browser or module use
if (typeof module !== 'undefined') module.exports = WebsiteBuilder;`
      }
    ]
  },
  {
    id: 'xcode',
    title: 'Xcode & iOS App Development (Swift & SwiftUI)',
    subtitle: 'Native Apple iOS, iPadOS, SwiftUI Declarative UI & App Store Architecture',
    category: 'Apple Native',
    iconName: 'Apple',
    color: 'from-sky-600 to-blue-700',
    version: 'Xcode 16 / Swift 6.0 / iOS 18',
    level: 'Lanjutan',
    curriculumRef: 'RPL: Pemrograman Perangkat Bergerak Native iOS',
    description: 'Pemrograman aplikasi mobile native iOS menggunakan bahasa Swift dan framework SwiftUI modern: State management, Observable model, NavigationStack, Async/Await networking, dan integrasi Xcode build pipeline.',
    overview: 'Siswa SMK mempelajari standar pengembangan native iOS yang digunakan oleh jutaan developer global untuk menghasilkan aplikasi iPhone dan iPad berkinerja tinggi, responsif, dan elegan.',
    coreConcepts: [
      'SwiftUI Declarative Syntax (VStack, HStack, List, NavigationStack)',
      '@Observable, @State, @Binding State Management',
      'Async/Await Networking dengan URLSession',
      'SF Symbols & Dynamic Type Accessibility',
      'Xcode Project Structure (Targets, Assets.xcassets, Info.plist)'
    ],
    executionOutput: {
      status: 'Compiled',
      stdout: `[Apple LLVM Swift Compiler - Xcode Build System]
Target: iPhone 16 Pro Simulator (iOS 18.2 SDK - arm64)
CompileSwiftSources:
 -> Compiling SMKM4RaporApp.swift ... OK
 -> Compiling StudentRaporView.swift ... OK
 -> Compiling RaporDataStore.swift (Swift 6 Concurrency Checked) ... OK
Linking Native Binary: SMKM4RaporApp.app (Zero warnings)
Launching Simulator: iOS 18 Simulator (UDID: 59A1E028-...)
Rendering SwiftUI Canvas:
 -> NavigationStack initialized with title "E-Rapor SMK Muhammadiyah 4"
 -> List rendered with 4 Subject Cards with custom ProgressView
 -> SF Symbols loaded: "book.fill", "graduationcap.fill", "star.circle.fill"
Simulator Running at 120 FPS ProMotion. Memory Footprint: 21.4 MB.`,
      metrics: [
        { label: 'Swift Version', value: 'Swift 6.0 / 5.9' },
        { label: 'UI Framework', value: 'SwiftUI (Declarative)' },
        { label: 'Target OS', value: 'iOS 17+ / iOS 18' },
        { label: 'Simulator FPS', value: '120 FPS ProMotion' }
      ]
    },
    sampleProjects: [
      {
        title: 'Aplikasi E-Rapor & Kehadiran Siswa iOS',
        description: 'Aplikasi iOS native untuk siswa dan orang tua memantau rekap absensi, nilai asesmen, dan pengumuman sekolah.',
        tech: ['Swift 6', 'SwiftUI', 'Observation', 'URLSession'],
        difficulty: 'Lanjutan'
      },
      {
        title: 'Presensi GPS Siswa PKL Industri',
        description: 'Aplikasi mobile iOS dengan deteksi radius geofencing lokasi magang DUDI dan unggah foto selfie.',
        tech: ['SwiftUI', 'CoreLocation', 'MapKit'],
        difficulty: 'Industri'
      }
    ],
    files: [
      {
        name: 'StudentRaporView.swift',
        language: 'swift',
        isEntry: true,
        description: 'Tampilan antarmuka deklaratif SwiftUI untuk menampilkan data nilai siswa.',
        content: `import SwiftUI

// 1. Model Data Nilai Siswa
struct MapelGrade: Identifiable {
    let id = UUID()
    let code: String
    let name: String
    let teacher: String
    let score: Double
    let kktp: Double = 75.0
    
    var isPassed: Bool {
        score >= kktp
    }
}

// 2. Main SwiftUI View
struct StudentRaporView: View {
    // State data nilai siswa
    @State private var studentName: String = "Bagas Pratama"
    @State private var className: String = "XII RPL 1"
    @State private var nisn: String = "0065412891"
    
    @State private var grades: [MapelGrade] = [
        MapelGrade(code: "RPL01", name: "Pemrograman Web & Mobile", teacher: "Ustadz Rudi H., S.Kom", score: 94.0),
        MapelGrade(code: "RPL02", name: "Basis Data & SQL", teacher: "Ustadzah Nina, M.Kom", score: 91.5),
        MapelGrade(code: "RPL03", name: "Teaching Factory (TEFA)", teacher: "Ustadz Hidayat, S.T", score: 96.0),
        MapelGrade(code: "ISM01", name: "Al-Islam & Kemuhammadiyahan", teacher: "Ustadz Ahmad, S.Pd.I", score: 92.0),
        MapelGrade(code: "RPL04", name: "Pemrograman Berorientasi Objek", teacher: "Ustadz Rudi H., S.Kom", score: 88.5)
    ]

    var averageScore: Double {
        let total = grades.reduce(0.0) { $0 + $1.score }
        return grades.isEmpty ? 0.0 : total / Double(grades.count)
    }

    var body: some View {
        NavigationStack {
            List {
                // Header Card Bento Siswa
                Section {
                    VStack(alignment: .leading, spacing: 8) {
                        HStack {
                            Image(systemName: "graduationcap.circle.fill")
                                .font(.system(size: 40))
                                .foregroundColor(Color(red: 0.02, green: 0.37, blue: 0.27)) // SMK Emerald
                            
                            VStack(alignment: .leading, spacing: 2) {
                                Text(studentName)
                                    .font(.title2)
                                    .fontWeight(.bold)
                                Text("\\(className) • NISN: \\(nisn)")
                                    .font(.subheadline)
                                    .foregroundColor(.secondary)
                            }
                        }
                        
                        Divider().padding(.vertical, 4)
                        
                        HStack {
                            VStack(alignment: .leading) {
                                Text("RATA-RATA RAPOR")
                                    .font(.caption2)
                                    .fontWeight(.bold)
                                    .foregroundColor(.secondary)
                                Text(String(format: "%.1f", averageScore))
                                    .font(.title)
                                    .fontWeight(.black)
                                    .foregroundColor(Color(red: 0.02, green: 0.37, blue: 0.27))
                            }
                            
                            Spacer()
                            
                            Text("PREDIKAT A (SANGAT BAIK)")
                                .font(.caption)
                                .fontWeight(.heavy)
                                .padding(.horizontal, 10)
                                .padding(.vertical, 6)
                                .background(Color.yellow.opacity(0.25))
                                .foregroundColor(.brown)
                                .clipShape(Capsule())
                        }
                    }
                    .padding(.vertical, 6)
                }
                
                // Daftar Mata Pelajaran
                Section("Daftar Capaian Kompetensi Mapel") {
                    ForEach(grades) { item in
                        HStack(spacing: 12) {
                            Circle()
                                .fill(item.isPassed ? Color.green : Color.red)
                                .frame(width: 10, height: 10)
                            
                            VStack(alignment: .leading, spacing: 2) {
                                Text(item.name)
                                    .font(.headline)
                                Text(item.teacher)
                                    .font(.caption)
                                    .foregroundColor(.secondary)
                            }
                            
                            Spacer()
                            
                            VStack(alignment: .trailing, spacing: 2) {
                                Text(String(format: "%.1f", item.score))
                                    .font(.headline)
                                    .fontWeight(.bold)
                                    .foregroundColor(item.isPassed ? .primary : .red)
                                
                                Text(item.isPassed ? "Tuntas KKTP" : "Perlu Remedial")
                                    .font(.system(size: 10, weight: .bold))
                                    .foregroundColor(item.isPassed ? .green : .red)
                            }
                        }
                        .padding(.vertical, 4)
                    }
                }
            }
            .navigationTitle("E-Rapor SMK M4")
        }
    }
}

#Preview {
    StudentRaporView()
}`
      },
      {
        name: 'SMKM4App.swift',
        language: 'swift',
        description: 'App Lifecycle entry point aplikasi iOS SwiftUI.',
        content: `import SwiftUI

@main
struct SMKM4App: App {
    var body: some Scene {
        WindowGroup {
            StudentRaporView()
        }
    }
}`
      }
    ]
  }
];
