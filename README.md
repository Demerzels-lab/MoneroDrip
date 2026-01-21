<p align="center">
  <img src="https://img.shields.io/badge/Monero-XMR-F26822?style=for-the-badge&logo=monero&logoColor=white" alt="Monero"/>
  <img src="https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React"/>
  <img src="https://img.shields.io/badge/TypeScript-5.6-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript"/>
  <img src="https://img.shields.io/badge/Vite-5.4-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite"/>
  <img src="https://img.shields.io/badge/Tailwind-3.4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind"/>
</p>

<h1 align="center">💧 MoneroDrip</h1>

<p align="center">
  <strong>Privacy-First Automated DCA into Monero (XMR)</strong>
</p>

<p align="center">
  <em>No accounts. No cookies. No analytics. Just private, automated investing.</em>
</p>

---

## 🚀 Quick Start (Local Development)

### Prerequisites

- **Node.js** >= 18.0.0
- **pnpm** >= 8.0.0 (recommended) or npm

### 1. Clone & Install

```bash
# Clone the repository
git clone https://github.com/Demerzels-lab/MoneroDrip.git
cd MoneroDrip

# Install dependencies
pnpm install
# or
npm install
```

### 2. Environment Setup

```bash
# Copy environment template
cp .env.example .env
```

Edit `.env` with your Supabase credentials:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

### 3. Run Development Server

```bash
pnpm dev
# or
npm run dev
```

Open http://localhost:5173 in your browser.

---

## 🔑 API Keys Required

| Service | Required | How to Get |
|---------|----------|------------|
| **Supabase** | ✅ Yes | Create project at [supabase.com](https://supabase.com) → Settings → API |

### Supabase Setup

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Navigate to **Settings** → **API**
3. Copy:
   - **Project URL** → `VITE_SUPABASE_URL`
   - **anon public** key → `VITE_SUPABASE_ANON_KEY`

4. Run the SQL migrations in `supabase/tables/`:

```sql
-- Run these in Supabase SQL Editor (in order):
-- 1. supabase/tables/dca_strategies.sql
-- 2. supabase/tables/dca_executions.sql
-- 3. supabase/tables/supported_assets.sql
```

---

## 📁 Project Structure

```
MoneroDrip/
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── ui/            # Base components (Button, Card, Input)
│   │   └── ...
│   ├── pages/             # Route pages
│   │   ├── Landing.tsx    # Home page
│   │   ├── Create.tsx     # Strategy wizard
│   │   ├── Dashboard.tsx  # User dashboard
│   │   ├── Docs.tsx       # Documentation
│   │   └── ...
│   ├── lib/               # Utilities
│   │   └── supabase.ts    # Supabase client
│   ├── App.tsx            # Main app with routing
│   └── main.tsx           # Entry point
├── supabase/
│   ├── types.ts           # Generated TypeScript types
│   └── tables/            # SQL migrations
├── public/                # Static assets
├── docs/                  # Design documentation
├── .env.example           # Environment template
├── package.json
├── tailwind.config.js
├── vite.config.ts
└── tsconfig.json
```

---

## 🛠 Available Scripts

```bash
# Development
pnpm dev          # Start dev server at localhost:5173

# Build
pnpm build        # Build for production
pnpm preview      # Preview production build

# Linting
pnpm lint         # Run ESLint
```

---

## ✨ Features

- **🔐 Privacy by Design** - No accounts, no cookies, no tracking
- **💼 Multi-Wallet** - MetaMask & Phantom support
- **📊 DCA Configuration** - Flexible intervals and amounts
- **📈 Dashboard** - Monitor strategies and execution history
- **📚 Documentation** - Comprehensive docs with search
- **🌙 Dark Theme** - Modern dark UI with cyan/purple accents

---

## 🔧 Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | React 18 + TypeScript |
| Build Tool | Vite 5.4 |
| Styling | Tailwind CSS 3.4 |
| Routing | React Router v6 |
| Backend | Supabase (PostgreSQL) |
| Icons | Lucide React |

---

## 📄 License

MIT License - see [LICENSE](LICENSE)

---

<p align="center">
  <strong>Built with 💜 for the Monero Community</strong>
</p>
