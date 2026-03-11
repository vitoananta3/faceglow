'use client'
import { useRef, useState } from 'react'
import { useStore } from '@/lib/store'
import { Ctr, BtnPrimary, BtnGlass, Card } from '@/components/ui'

const CONCERNS = [
  { v: '',          l: 'Pilih concern…'    },
  { v: 'acne',      l: '🔴 Jerawat'       },
  { v: 'oily',      l: '💧 Kulit Berminyak'},
  { v: 'dry',       l: '🌵 Kulit Kering'  },
  { v: 'dark',      l: '🌑 Flek Gelap'    },
  { v: 'sensitive', l: '🌡️ Kulit Sensitif' },
  { v: 'aging',     l: '⏳ Anti Aging'    },
]

export default function AnalyzePage() {
  const setView       = useStore(s => s.setView)
  const user          = useStore(s => s.user)
  const scanCount     = useStore(s => s.scanCount)
  const uploadPreview = useStore(s => s.uploadPreview)
  const uploadFile    = useStore(s => s.uploadFile)
  const setUpload     = useStore(s => s.setUpload)
  const clearUpload   = useStore(s => s.clearUpload)
  const userName      = useStore(s => s.userName)
  const setUserName   = useStore(s => s.setUserName)
  const birthDay      = useStore(s => s.birthDay)
  const birthMonth    = useStore(s => s.birthMonth)
  const birthYear     = useStore(s => s.birthYear)
  const setBirth      = useStore(s => s.setBirth)
  const skinConcern   = useStore(s => s.skinConcern)
  const setSkinConcern= useStore(s => s.setSkinConcern)
  const runAnalysis   = useStore(s => s.runAnalysis)
  const showToast     = useStore(s => s.showToast)
  const openLogin     = useStore(s => s.openLogin)
  const resetForNew   = useStore(s => s.resetForNewScan)

  const fileRef = useRef<HTMLInputElement>(null)
  const [yearError, setYearError] = useState('')

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]
    if (!f) return
    if (!f.type.startsWith('image/')) { showToast('⚠ File harus berupa gambar (JPG/PNG)'); return }
    const reader = new FileReader()
    reader.onload = ev => { setUpload(f, ev.target?.result as string) }
    reader.onerror = () => showToast('⚠ Gagal membaca file. Coba lagi.')
    reader.readAsDataURL(f)
  }

  const validateYear = (v: string) => {
    if (v.length >= 4) {
      const n = parseInt(v)
      if (isNaN(n) || n < 1960 || n > 2008) {
        setYearError('Tahun lahir harus antara 1960–2008')
      } else {
        setYearError('')
      }
    } else {
      setYearError('')
    }
  }

  const startScan = () => {
    if (!uploadFile) { showToast('Upload foto terlebih dahulu!'); return }
    if (yearError)   { showToast('Periksa tahun lahir kamu!'); return }

    // First scan always free; subsequent need login or payment
    if (scanCount === 0) {
      beginAnalysis()
    } else if (user) {
      beginAnalysis()
    } else {
      openLogin('scan_login')
    }
  }

  const beginAnalysis = () => {
    runAnalysis()
    setView('loading')
    runLoadingSequence()
  }

  const runLoadingSequence = () => {
    const steps = [
      'Mendeteksi landmark wajah…',
      'Menganalisis tekstur & pori…',
      'Membuat face map visual…',
      'Mengukur kadar minyak & hidrasi…',
      'Mencocokkan profil kulit SEA…',
      'Menyusun rekomendasi produk lokal…',
      'Membuat 28-day challenge plan…',
      'Selesai! ✨',
    ]
    let i = 0
    useStore.setState({ loadStep: 0, loadText: steps[0], loadPct: 0 })
    const iv = setInterval(() => {
      i++
      const pct = Math.round((i / steps.length) * 100)
      useStore.setState({
        loadStep: i,
        loadText: steps[Math.min(i, steps.length - 1)],
        loadPct: pct,
      })
      if (i >= steps.length) {
        clearInterval(iv)
        setTimeout(() => setView('report'), 600)
      }
    }, 560)
  }

  const badgeConfig = () => {
    if (scanCount === 0) return { icon: '🎁', title: 'Scan Pertama 100% Gratis!', desc: 'Tidak perlu kartu kredit. Daftar akun gratis untuk scan berikutnya.' }
    if (user)            return { icon: '💎', title: 'Scan Pro', desc: 'Unlimited scan untuk Glow Pro member.' }
    return { icon: '🔐', title: `Scan ke-${scanCount + 1} — Login Dulu`, desc: 'Login gratis untuk lanjutkan analisis kulitmu!' }
  }
  const badge = badgeConfig()

  return (
    <div className="min-h-screen pb-20 relative z-10">
      <Ctr className="pt-5">
        {/* Back */}
        <button
          onClick={() => { resetForNew(); setView('land') }}
          className="flex items-center gap-1.5 text-[rgba(247,237,232,.42)] text-[13px] font-semibold mb-5 focus-visible:outline-2 focus-visible:outline-[#d42e52]"
        >← Kembali</button>

        {/* Badge */}
        <div className="rounded-[20px] p-3.5 mb-5 flex items-center gap-3 anim-fade-up"
          style={{ background: 'linear-gradient(135deg,rgba(232,184,75,.14),rgba(212,46,82,.1))', border: '1px solid rgba(232,184,75,.22)' }}>
          <span className="text-3xl flex-shrink-0">{badge.icon}</span>
          <div>
            <p className="text-[13px] font-bold mb-0.5">{badge.title}</p>
            <p className="text-[11px] text-[rgba(247,237,232,.42)] leading-snug">{badge.desc}</p>
          </div>
        </div>

        {/* Upload zone */}
        <div className="mb-5">
          <label
            htmlFor="fileInput"
            className={`upload-zone block ${uploadPreview ? 'has' : ''}`}
            role="button"
            tabIndex={0}
            aria-label="Upload foto wajah untuk analisis"
            onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); fileRef.current?.click() } }}
          >
            {uploadPreview ? (
              <div className="relative max-w-[180px] mx-auto">
                <img src={uploadPreview} alt="Preview foto wajah" className="rounded-[14px] w-full aspect-[3/4] object-cover object-top" />
                <div className="absolute inset-0 rounded-[14px] overflow-hidden pointer-events-none">
                  <div className="scan-line" />
                </div>
                <div className="absolute top-2 right-2">
                  <span className="bg-[#5bb891] text-white text-[9px] font-bold px-2 py-0.5 rounded-full">✓ Foto Dipilih</span>
                </div>
              </div>
            ) : (
              <div>
                <span className="text-4xl">📸</span>
                <p className="text-[14px] font-bold mt-2.5 mb-1">Upload Foto Wajahmu</p>
                <p className="text-[11px] text-[rgba(247,237,232,.42)] leading-relaxed">
                  Foto selfie front-facing, cahaya alami<br />
                  JPG/PNG · Tidak disimpan di server
                </p>
              </div>
            )}
          </label>
          <input
            id="fileInput"
            ref={fileRef}
            type="file"
            accept="image/*"
            onChange={handleFile}
          />
          {uploadPreview && (
            <button
              onClick={() => { clearUpload(); if (fileRef.current) fileRef.current.value = '' }}
              className="w-full mt-2 text-[11px] text-[rgba(247,237,232,.42)] font-semibold py-1 focus-visible:outline-2 focus-visible:outline-[#d42e52]"
            >✕ Ganti foto</button>
          )}
        </div>

        {/* Form */}
        <Card className="p-4 mb-5 anim-fade-up" style={{ animationDelay: '80ms' } as React.CSSProperties}>
          <p className="text-[9px] font-bold uppercase tracking-[.1em] text-[rgba(247,237,232,.42)] mb-3">Personalisasi hasil analisis (opsional)</p>

          {/* Name */}
          <div className="mb-3">
            <label className="text-[11px] font-semibold text-[rgba(247,237,232,.42)] mb-1 block" htmlFor="uName">Nama / Nickname</label>
            <input
              id="uName"
              type="text"
              placeholder="Mis: Sarah, Bestie…"
              value={userName}
              onChange={e => setUserName(e.target.value)}
              className="w-full bg-white/[.045] border border-white/10 rounded-[14px] px-3.5 py-2.5 text-sm text-[#f7ede8] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d42e52] focus:border-[#d42e52] transition-colors"
            />
          </div>

          {/* Birthday */}
          <div className="mb-3">
            <label className="text-[11px] font-semibold text-[rgba(247,237,232,.42)] mb-1 block">Tanggal Lahir</label>
            <div className="grid grid-cols-3 gap-2">
              <select
                value={birthDay}
                onChange={e => setBirth(e.target.value, birthMonth, birthYear)}
                className="bg-[#1a0a0f] border border-white/10 rounded-[14px] px-3 py-2.5 text-sm text-[#f7ede8] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d42e52] focus:border-[#d42e52]"
              >
                <option value="">Tgl</option>
                {Array.from({length:31},(_,i)=><option key={i+1} value={i+1}>{i+1}</option>)}
              </select>
              <select
                value={birthMonth}
                onChange={e => setBirth(birthDay, e.target.value, birthYear)}
                className="bg-[#1a0a0f] border border-white/10 rounded-[14px] px-3 py-2.5 text-sm text-[#f7ede8] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d42e52] focus:border-[#d42e52]"
              >
                <option value="">Bln</option>
                {['Jan','Feb','Mar','Apr','Mei','Jun','Jul','Agu','Sep','Okt','Nov','Des'].map((m,i)=>(
                  <option key={m} value={i+1}>{m}</option>
                ))}
              </select>
              <div>
                <input
                  type="number"
                  placeholder="Tahun"
                  value={birthYear}
                  min={1960} max={2008}
                  onChange={e => { setBirth(birthDay, birthMonth, e.target.value); validateYear(e.target.value) }}
                  className={`w-full bg-[#1a0a0f] border rounded-[14px] px-3 py-2.5 text-sm text-[#f7ede8] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d42e52] transition-colors ${yearError ? 'border-[#e05a5a]' : 'border-white/10 focus:border-[#d42e52]'}`}
                />
                {yearError && <p className="text-[10px] text-[#e05a5a] mt-1 anim-fade-up">{yearError}</p>}
              </div>
            </div>
          </div>

          {/* Concern */}
          <div>
            <label className="text-[11px] font-semibold text-[rgba(247,237,232,.42)] mb-1 block" htmlFor="concern">Main Skin Concern</label>
            <select
              id="concern"
              value={skinConcern}
              onChange={e => setSkinConcern(e.target.value)}
              className="w-full bg-[#1a0a0f] border border-white/10 rounded-[14px] px-3.5 py-2.5 text-sm text-[#f7ede8] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d42e52] focus:border-[#d42e52]"
            >
              {CONCERNS.map(c => <option key={c.v} value={c.v}>{c.l}</option>)}
            </select>
          </div>
        </Card>

        {/* Scan btn */}
        <BtnPrimary
          onClick={startScan}
          disabled={!uploadFile || !!yearError}
          full
          className="text-[15px] py-4 anim-fade-up"
        >
          ✦ {uploadFile ? 'Analisis Kulitku Sekarang' : 'Upload Foto Dulu'}
        </BtnPrimary>

        {/* Privacy note */}
        <p className="text-center text-[10px] text-[rgba(247,237,232,.22)] mt-3">
          🔒 Foto diproses di browser — tidak dikirim ke server
        </p>
      </Ctr>
    </div>
  )
}
