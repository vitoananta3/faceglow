'use client'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { PARAMS, PRODUCTS, ZODIACS, getZodiac, rand } from './data'

export type View = 'land' | 'analyze' | 'loading' | 'report' | 'journey' | 'tracker' | 'chat' | 'wallet'

export type SkinData = {
  acne: number; oil: number; pore: number; hydration: number
  elasticity: number; dark: number; redness: number; wrinkle: number
  dullness: number; sensitivity: number; texture: number; brightness: number
  score: number; skinType: string; undertone: string
  skinAge: number; realAge: number
}

export type User = { name: string; email: string; provider: string }
export type Zodiac = { s: string; e: string; t: string }
export type Product = typeof PRODUCTS[0] & { match: number }

function generateSkin(concern: string): SkinData {
  const raw: Record<string, number> = {}
  PARAMS.forEach(p => { raw[p.k] = rand(p.min, p.max) })

  if (concern === 'acne')      { raw.acne = rand(55, 85); raw.oil = rand(50, 80) }
  if (concern === 'oily')      { raw.oil = rand(60, 90); raw.pore = rand(50, 80) }
  if (concern === 'dry')       { raw.hydration = rand(20, 45); raw.elasticity = rand(25, 50) }
  if (concern === 'dark')      { raw.dark = rand(50, 75); raw.brightness = rand(22, 45) }
  if (concern === 'sensitive') { raw.sensitivity = rand(50, 72); raw.redness = rand(40, 70) }
  if (concern === 'aging')     { raw.wrinkle = rand(35, 60); raw.elasticity = rand(30, 50) }

  const bad  = ['acne', 'oil', 'pore', 'dark', 'redness', 'wrinkle', 'dullness', 'sensitivity', 'texture']
  const good = ['hydration', 'elasticity', 'brightness']
  const badAvg  = bad.reduce((s, k) => s + raw[k], 0) / bad.length
  const goodAvg = good.reduce((s, k) => s + raw[k], 0) / good.length
  const score = Math.max(10, Math.min(98, Math.round(100 - badAvg * 0.58 + goodAvg * 0.16)))

  const types = ['Berminyak', 'Kering', 'Kombinasi', 'Sensitif', 'Normal']
  const tones = ['Warm', 'Cool', 'Neutral']

  return {
    acne: raw.acne, oil: raw.oil, pore: raw.pore, hydration: raw.hydration,
    elasticity: raw.elasticity, dark: raw.dark, redness: raw.redness, wrinkle: raw.wrinkle,
    dullness: raw.dullness, sensitivity: raw.sensitivity, texture: raw.texture, brightness: raw.brightness,
    score, skinType: types[rand(0, types.length - 1)], undertone: tones[rand(0, tones.length - 1)],
    skinAge: 0, realAge: 0,
  }
}

type Store = {
  // ── View ──
  view: View
  setView: (v: View) => void
  prevView: View | null

  // ── Auth ──
  user: User | null
  setUser: (u: User | null) => void
  loginModal: boolean
  loginRedirect: string | null
  openLogin: (redirect?: string) => void
  closeLogin: () => void

  // ── Upload & form ──
  uploadPreview: string | null
  uploadFile: File | null
  setUpload: (file: File, preview: string) => void
  clearUpload: () => void
  userName: string; setUserName: (v: string) => void
  birthDay: string; birthMonth: string; birthYear: string
  setBirth: (d: string, m: string, y: string) => void
  skinConcern: string; setSkinConcern: (v: string) => void

  // ── Results ──
  skinData: SkinData | null
  zodiac: Zodiac | null
  products: Product[]
  scanCount: number
  runAnalysis: () => void

  // ── Loading state ──
  loadStep: number
  loadText: string
  loadPct: number
  setLoad: (step: number, text: string, pct: number) => void

  // ── Wishlist ──
  wishlist: string[]
  toggleWishlist: (id: string) => void

  // ── Streak ──
  streak: number
  todayDone: boolean
  completeToday: () => void
  lastCompletedDate: string | null

  // ── Compare ──
  compareA: string | null
  compareB: string | null
  setCompare: (slot: 'A' | 'B', src: string) => void
  compareResult: string | null
  runCompare: () => void

  // ── Modals ──
  shareModal: boolean; openShare: () => void; closeShare: () => void
  payModal: boolean; openPay: () => void; closePay: () => void

  // ── Toast ──
  toast: string | null
  showToast: (msg: string, ms?: number) => void

  // ── Reset ──
  resetForNewScan: () => void
}

export const useStore = create<Store>()(
  persist(
    (set, get) => ({
      // ── View ──
      view: 'land',
      prevView: null,
      setView: (v) => set(s => ({ view: v, prevView: s.view })),

      // ── Auth ──
      user: null,
      setUser: (u) => set({ user: u }),
      loginModal: false,
      loginRedirect: null,
      openLogin: (redirect) => set({ loginModal: true, loginRedirect: redirect ?? null }),
      closeLogin: () => set({ loginModal: false, loginRedirect: null }),

      // ── Upload & form ──
      uploadPreview: null,
      uploadFile: null,
      setUpload: (file, preview) => set({ uploadFile: file, uploadPreview: preview }),
      clearUpload: () => set({ uploadFile: null, uploadPreview: null }),
      userName: '', setUserName: (v) => set({ userName: v }),
      birthDay: '', birthMonth: '', birthYear: '',
      setBirth: (d, m, y) => set({ birthDay: d, birthMonth: m, birthYear: y }),
      skinConcern: '', setSkinConcern: (v) => set({ skinConcern: v }),

      // ── Results ──
      skinData: null,
      zodiac: null,
      products: [],
      scanCount: 0,
      runAnalysis: () => {
        const s = get()
        const skin = generateSkin(s.skinConcern)
        const realAge = s.birthYear ? new Date().getFullYear() - parseInt(s.birthYear) : rand(19, 32)
        skin.realAge = realAge
        skin.skinAge = realAge + rand(-5, 8)

        const zodiac = (s.birthDay && s.birthMonth)
          ? getZodiac(s.birthDay, s.birthMonth)
          : ZODIACS[rand(0, ZODIACS.length - 1)]

        const products: Product[] = PRODUCTS.map(p => ({
          ...p,
          match: rand(68, 98),
        })).sort((a, b) => b.match - a.match)

        set({
          skinData: skin,
          zodiac,
          products,
          scanCount: s.scanCount + 1,
        })
      },

      // ── Loading ──
      loadStep: 0, loadText: '', loadPct: 0,
      setLoad: (step, text, pct) => set({ loadStep: step, loadText: text, loadPct: pct }),

      // ── Wishlist ──
      wishlist: [],
      toggleWishlist: (id) => set(s => ({
        wishlist: s.wishlist.includes(id)
          ? s.wishlist.filter(x => x !== id)
          : [...s.wishlist, id],
      })),

      // ── Streak ──
      streak: 0,
      todayDone: false,
      lastCompletedDate: null,
      completeToday: () => {
        const s = get()
        const today = new Date().toDateString()
        if (s.lastCompletedDate === today) {
          s.showToast('✅ Sudah selesai hari ini! Kembali besok 🌸')
          return
        }
        const newStreak = s.streak <= 0 ? 1 : Math.min(28, s.streak + 1)
        let msg = `🔥 Hari ${newStreak} selesai! Terus semangat!`
        if (newStreak === 1)  msg = '🌱 Hari pertama selesai! Perjalanan glowing-mu dimulai!'
        if (newStreak === 7)  msg = '🎯 7 hari streak! Kamu luar biasa!'
        if (newStreak === 14) msg = '💪 2 minggu streak! Kulit pasti sudah berasa bedanya!'
        if (newStreak === 21) msg = '🌟 21 hari! Almost there — keep going!'
        if (newStreak === 28) msg = '🎉 28 HARI CHALLENGE SELESAI! GLOWING QUEEN/KING! 🌸'
        set({ streak: newStreak, todayDone: true, lastCompletedDate: today })
        s.showToast(msg)
      },

      // ── Compare ──
      compareA: null, compareB: null,
      setCompare: (slot, src) => set(slot === 'A' ? { compareA: src } : { compareB: src }),
      compareResult: null,
      runCompare: () => {
        const pct = rand(8, 22)
        const msgs = [
          'Kulitmu terlihat lebih cerah! Hiperpigmentasi berkurang signifikan.',
          'Warna kulit lebih merata. Kulit terlihat lebih sehat & bercahaya.',
          'Tekstur kulit membaik. Pori-pori terlihat lebih kecil.',
          'Kemerahan berkurang. Skin barrier membaik dengan baik.',
        ]
        set({ compareResult: `AI mendeteksi perbaikan +${pct}% dalam kondisi kulit. ${msgs[rand(0, msgs.length - 1)]}` })
      },

      // ── Modals ──
      shareModal: false, openShare: () => set({ shareModal: true }), closeShare: () => set({ shareModal: false }),
      payModal: false, openPay: () => set({ payModal: true }), closePay: () => set({ payModal: false }),

      // ── Toast ──
      toast: null,
      showToast: (msg, ms = 3200) => {
        set({ toast: msg })
        setTimeout(() => set({ toast: null }), ms)
      },

      // ── Reset ──
      resetForNewScan: () => set({
        uploadPreview: null,
        uploadFile: null,
        userName: '', birthDay: '', birthMonth: '', birthYear: '',
        skinConcern: '',
        loadStep: 0, loadText: '', loadPct: 0,
      }),
    }),
    {
      name: 'faceglow-v4',
      partialize: (s) => ({
        user: s.user,
        streak: s.streak,
        todayDone: s.todayDone,
        lastCompletedDate: s.lastCompletedDate,
        scanCount: s.scanCount,
        wishlist: s.wishlist,
        skinData: s.skinData,
        zodiac: s.zodiac,
        products: s.products,
        compareA: s.compareA,
        compareB: s.compareB,
        compareResult: s.compareResult,
      }),
    }
  )
)
