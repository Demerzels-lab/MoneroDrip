# Content Structure Plan - MoneroDrip

## 1. Material Inventory & Purpose
**Core Goal:** Menyediakan platform otomatisasi DCA (Dollar Cost Averaging) ke Monero (XMR) yang menghormati privasi mutlak (tanpa KYC, tanpa pelacakan).
**Visual Style:** "Privacy Cyberpunk" - Gelap, teknis, aksen neon (Purple/Cyan), minimalis.
**Audience:** Crypto-natives, privacy advocates, investor jangka panjang.

## 2. Website Structure
**Type:** Hybrid (Landing Page Static + React/Next.js App untuk Dashboard)
**Reasoning:** Landing page memerlukan SEO dan edukasi yang kuat tentang teknologi Monero, sedangkan Dashboard memerlukan state management yang kompleks untuk interaksi wallet.

## 3. Page/Section Breakdown

### Page 1: Landing Page (`/`)
**Purpose:** Konversi user untuk memulai DCA dan edukasi tentang privasi Monero.

| Section | Component Pattern | Content Focus | Visual Asset (Content) |
| --- | --- | --- | --- |
| **Hero** | Hero Center Split | Tagline: "Privacy-First Monero DCA". CTA: "Launch App". | Ilustrasi abstrak aliran data aman / Monero coin 3D |
| **How It Works** | 3-Step Process | 1. Approve Token (USDT/C) 2. Set Interval & Recipient 3. Auto-Execute & Privacy | Ikonografis: Wallet, Timer, Shield |
| **Monero Tech** | Feature Grid (2x2) | Penjelasan teknis: Ring Signatures, Stealth Addresses, RingCT, Bulletproofs. | Ikon teknis abstrak untuk kriptografi |
| **Why Monero** | Comparison/Benefit | Masalah: Surveillance, Frozen Funds. Solusi: Financial Sovereignty. | - |
| **Roadmap 2026** | Timeline Vertical | Q1: Multi-chain support Q2: Hardware wallet integration Q3: Fiat on-ramp privacy Q4: DAO Governance | - |
| **FAQ** | Accordion List | Keamanan smart contract, fee struktur, audit logs. | - |
| **Footer** | Simple Footer | Links: Docs, GitHub, Donate (XMR Address). | Logo MoneroDrip |

### Page 2: Create Strategy (`/app/create`)
**Purpose:** Wizard langkah demi langkah untuk membuat posisi DCA baru.

| Section | Component Pattern | Content Focus | Visual Asset |
| --- | --- | --- | --- |
| **Wallet Conn** | Modal/Card | "Connect Wallet" (Metamask/Rabby). | Provider Logos |
| **Asset Select** | Token Selector | Pilih Input Token (USDC, USDT, DAI). | Token Icons |
| **Configuration** | Form Input Group | Input Amount, Frequency (Daily/Weekly/Monthly). | - |
| **Destination** | Input Validated | Input XMR Address (Standard/Subaddress). | Validasi Checkmark |
| **Summary** | Cost Breakdown | Estimasi Gas, Platform Fee, Total DCA per bulan. | - |

### Page 3: Dashboard (`/app/dashboard`)
**Purpose:** Memantau strategi aktif dan riwayat transaksi.

| Section | Component Pattern | Content Focus | Visual Asset |
| --- | --- | --- | --- |
| **Stats Overview**| Stat Cards Row | Total Volume, Total XMR Bought, Avg Price. | Sparkline Charts |
| **Active Strats** | Card Grid | Kartu strategi aktif dengan status "Next Run". Tombol: Pause/Cancel. | Progress Bar |
| **History** | Data Table | Log eksekusi: Tx Hash, Date, Amount, Rate. | Link External (Explorer) |

### Page 4: Documentation (`/docs`)
**Purpose:** Dokumentasi teknis dan panduan pengguna.

| Section | Component Pattern | Content Focus |
| --- | --- | --- |
| **Sidebar** | Sticky Nav Tree | Navigasi: Getting Started, Security, Contracts. |
| **Content Area**| Article Layout | Teks, Code Blocks (Solidity/JS), Warning Callouts. |
| **Search** | Cmd+K Modal | Pencarian cepat konten dokumentasi. |

## 4. Content Analysis
**Information Density:** Medium-High (Terutama di bagian Monero Tech dan Docs).
**Content Balance:**
- Teks Teknis: 40% (Penjelasan kriptografi)
- UI/Formulir: 40% (Interaksi pengguna)
- Visual/Dekoratif: 20% (Membangun atmosfer privasi)
