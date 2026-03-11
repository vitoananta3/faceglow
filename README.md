# FaceGlow AI — Next.js 14

Beauty companion app untuk pasar Indonesia. Dibangun ulang dari HTML ke Next.js dengan TypeScript, Tailwind CSS, dan Zustand.

## Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Zustand** (state management dengan persistence)

## Setup

```bash
# Install dependencies
npm install

# Development
npm run dev

# Build
npm run build && npm start
```

Buka http://localhost:3000

## Struktur

```
faceglow/
├── app/
│   ├── layout.tsx          # Root layout + fonts
│   ├── globals.css         # Animations, keyframes, utilities
│   └── page.tsx            # Entry (loads Shell client-side)
├── components/
│   ├── Shell.tsx           # Master router + toast
│   ├── layout/
│   │   ├── BottomNav.tsx   # Post-scan navigation
│   │   └── Particles.tsx   # Floating petals
│   ├── ui/
│   │   └── index.tsx       # Semua shared UI primitives
│   ├── pages/
│   │   ├── LandPage.tsx    # Landing dengan hero, features, reviews
│   │   ├── AnalyzePage.tsx # Upload foto + form personalisasi
│   │   ├── LoadingPage.tsx # Animated loading dengan steps
│   │   ├── ReportPage.tsx  # Hasil: score, face map, produk, rutinitas
│   │   ├── JourneyPage.tsx # Before/after, leaderboard, komunitas
│   │   ├── TrackerPage.tsx # 28-day challenge, streak, goals
│   │   ├── ChatPage.tsx    # AI Beauty Coach dengan KB
│   │   └── WalletPage.tsx  # Wishlist produk tersimpan
│   └── modals/
│       ├── LoginModal.tsx  # Login/register + social auth
│       ├── ShareModal.tsx  # Share cards dengan canvas
│       └── PayModal.tsx    # Payment modal
└── lib/
    ├── data.ts             # Semua data constants + helpers
    └── store.ts            # Zustand store (persisted)
```

## UX Fixes yang Sudah Diimplementasikan

### User Journey
- ✅ **Landing → Analyze → Loading → Report** flow yang clean
- ✅ Bottom nav hanya muncul setelah scan selesai
- ✅ "Analisis kulit" CTA **tidak** muncul di dalam tab — hanya di Landing
- ✅ Wallet kosong mengarah ke tab Hasil, bukan trigger scan baru

### Accessibility
- ✅ Upload zone menggunakan `<label>` proper dengan keyboard support
- ✅ Semua interactive elements punya `focus-visible` ring
- ✅ Font size minimum 10px di semua label/tag
- ✅ `aria-label` & `aria-current` di nav items

### Form Validation
- ✅ Tahun lahir validasi real-time (1960–2008)
- ✅ File type validation dengan error toast
- ✅ Scan button disabled sampai foto diupload

### Chat UX
- ✅ Login gate muncul setelah 2.5s preview (bukan langsung)
- ✅ Gate hilang setelah login
- ✅ Setelah 2 pesan, non-logged user diminta login
- ✅ Chat bubbles dibuat dengan `createElement` + `textContent` (XSS-safe)

### Streak/Challenge
- ✅ Streak mulai dari 1 (bukan 0) saat hari pertama
- ✅ `todayDone` reset otomatis setiap hari baru
- ✅ Challenge tracker hanya ada di tab Challenge — tidak duplikat di Report

### Share Card
- ✅ `img.onload` diset sebelum `img.src` (avatar tidak blank)
- ✅ Canvas re-render ketika modal dibuka

### Performance
- ✅ Zustand dengan `persist` — data bertahan antar session
- ✅ State management terpusat, tidak ada prop drilling
- ✅ Pages semua di-render tapi hanya yang aktif yang visible (no remount)
