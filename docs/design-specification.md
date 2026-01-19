# Design Specification - MoneroDrip

## 1. Direction & Rationale
**Theme:** "Dark Privacy Core". Menggabungkan estetika *hacker terminal* yang canggih dengan UX modern yang halus. Menggunakan latar belakang yang sangat gelap untuk mengurangi ketegangan mata dan memberikan kesan "inkognito".
**Vibe:** Secure, Invisible, Automated.
**References:** GhostDrip.xyz (Layout), Linear.app (Typography/Spacing), Monero.org (Color hints).

## 2. Design Tokens Strategy

### Colors
*Mode gelap absolut. Tidak ada mode terang.*
*   **Backgrounds:** Menggunakan skema "Deep Void" (`#050505` hingga `#121212`). Layering dilakukan dengan perbedaan *lightness* yang sangat tipis (1-2%), bukan drop shadow tebal.
*   **Primary Accent (Cyan):** Digunakan untuk tindakan aktif, tombol utama, dan indikator sukses. Melambangkan teknologi/masa depan.
*   **Secondary Accent (Purple):** Digunakan untuk gradien, highlight halus, dan elemen brand "Drip". Melambangkan privasi/misteri.
*   **Monero Orange:** HANYA digunakan pada logo Monero atau highlight data spesifik XMR agar tidak merusak palet cool-tone utama.

### Typography
*   **Headings:** *Inter* atau *Space Grotesk*. Berat: Bold (700) untuk headline, Medium (500) untuk subhead. Tracking sedikit diperketat (-0.02em).
*   **Body:** *Inter*. Sangat mudah dibaca di latar gelap.
*   **Monospace:** *JetBrains Mono*. Untuk alamat wallet, hash transaksi, blok kode, dan angka finansial.

### Effects
*   **Glassmorphism:** Digunakan sangat hemat pada header sticky dan modal overlay. `backdrop-filter: blur(12px)`.
*   **Glow:** Box-shadow berwarna pada state `:hover` atau `:focus` untuk elemen interaktif (Cyan glow).

## 3. Component Specifications

### 3.1. Buttons
*   **Primary:** Background Gradient (Cyan ke Purple linear), Teks Putih/Hitam (tergantung kontras). Border-radius: 8px. Hover: Brightness 110% + Subtle Glow.
*   **Secondary:** Transparent background, Border 1px (Zinc-700). Teks Zinc-300. Hover: Border Cyan, Teks White.
*   **Ghost/Text:** Teks Cyan. Underline on hover.

### 3.2. Form Inputs (Critical for Wizard)
*   **Style:** Background `bg-zinc-900`, Border 1px `border-zinc-800`.
*   **Focus State:** Border berubah menjadi Cyan (`#00F0FF`) + Ring shadow tipis.
*   **Address Input:** Menggunakan font Monospace. Validasi *real-time* (Border merah jika format XMR salah, Hijau jika valid).

### 3.3. Cards (Dashboard & Tech)
*   **Container:** `bg-zinc-900/50` (50% opacity), Border 1px `border-white/10`.
*   **Hover Effect:** Transform `translate-y-[-2px]`, Border menjadi `border-purple-500/50`.
*   **Content:** Padding 24px. Judul dengan ikon di kiri atas.

### 3.4. Monero Tech Icons
*   Jangan gunakan foto stok. Gunakan representasi abstrak vektor (SVG).
*   *Ring Signatures:* Lingkaran-lingkaran yang saling tumpang tindih.
*   *Stealth Addresses:* Kunci yang berubah menjadi hantu/bayangan.
*   *Warna:* Gunakan stroke tipis (1.5px) dengan warna gradien Cyan-Purple.

## 4. Layout & Responsive Patterns

### Landing Page Layout
*   **Hero:** Tinggi min 80vh. Teks rata kiri, Ilustrasi 3D rata kanan (Desktop). Stack vertikal (Mobile).
*   **Feature Grid:** 2 kolom (Tablet/Desktop), 1 kolom (Mobile). Gap 32px.
*   **Container:** Max-width 1200px. Padding-x 24px (Mobile), 48px (Desktop).

### Dashboard Layout
*   **Sidebar/Topnav:** Gunakan Top Navigation untuk tampilan yang lebih bersih pada layar lebar.
*   **Grid System:**
    *   *Overview:* 3 kartu setara (1fr 1fr 1fr).
    *   *Active Strategies:* Grid responsif (min-width 300px per kartu).

## 5. Interaction & Animation
*   **Micro-interactions:** Semua tombol dan link memiliki transisi `ease-out` 200ms.
*   **Page Load:** Elemen masuk dengan `fade-in-up` (opacity 0 -> 1, translate-y 20px -> 0) berurutan (staggered 100ms).
*   **Status Indicators:**
    *   *Active:* Pulsing green dot.
    *   *Paused:* Solid yellow dot.
    *   *Ended:* Grey dot.

## 6. Monero Technology Content

### Ring Signatures (Privasi Pengirim)
- Jenis digital signature yang memungkinkan anggota grup menandatangani atas nama grup tanpa mengungkapkan siapa yang sebenarnya signing
- Setiap transaksi mencampur output dengan decoy outputs dari blockchain
- Ring size minimum: 16 (1 actual + 15 decoys)

### Stealth Addresses (Privasi Penerima)
- One-time destination address yang unique untuk setiap transaksi
- Menggunakan dua keys: private view key dan private spend key
- Memungkinkan "watch-only wallets" untuk monitoring

### RingCT (Ring Confidential Transactions)
- Menyembunyikan jumlah transaksi yang ditransfer
- Menggunakan Pedersen Commitments: `C = yG + bH`
- Verifikasi: sum of inputs = sum of outputs + fees

### Bulletproofs
- Short non-interactive zero-knowledge proofs tanpa trusted setup
- Pengurangan 80%+ dalam ukuran transaksi
- Audit oleh QuarksLab dan Kudelski Security
