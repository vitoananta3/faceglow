'use client'
import { useState } from 'react'
import { useStore } from '@/lib/store'
import {
  Ctr, Card, Card2, GlassCard, ScoreRing, STitle, Divider, FadeUp,
  BtnPrimary, BtnGlass, BtnGold, TagRose, TagGold, TagSage, FaceMapCanvas, ProgressBar
} from '@/components/ui'
import { PARAMS, UNDERTONE_D, MORNING_ROUTINE, NIGHT_ROUTINE, ROUTINE_T, barColor, barLabel, skinAgeMsg } from '@/lib/data'

const CATS = ['Semua', 'Sunscreen', 'Serum', 'Moisturizer', 'Toner', 'Cleanser', 'Treatment']

export default function ReportPage() {
  const skinData  = useStore(s => s.skinData)
  const zodiac    = useStore(s => s.zodiac)
  const products  = useStore(s => s.products)
  const wishlist  = useStore(s => s.wishlist)
  const toggleWL  = useStore(s => s.toggleWishlist)
  const user      = useStore(s => s.user)
  const userName  = useStore(s => s.userName)
  const openShare = useStore(s => s.openShare)
  const setView   = useStore(s => s.setView)
  const resetForNew = useStore(s => s.resetForNewScan)
  const showToast = useStore(s => s.showToast)

  const [catFilter, setCatFilter] = useState('Semua')
  const [activeZone, setActiveZone] = useState<string | null>(null)
  const [showMoreActions, setShowMoreActions] = useState(false)

  if (!skinData) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <p className="text-2xl mb-4">🌸</p>
        <p className="text-sm text-[rgba(247,237,232,.42)] mb-4">Belum ada hasil analisis</p>
        <BtnPrimary onClick={() => setView('analyze')}>Mulai Analisis</BtnPrimary>
      </div>
    </div>
  )

  const ut = UNDERTONE_D[skinData.undertone] || UNDERTONE_D.Neutral
  const filteredProds = catFilter === 'Semua'
    ? products.slice(0, 12)
    : products.filter(p => p.pcat === catFilter.toLowerCase()).slice(0, 8)

  const ZONE_INFO: Record<string, { name: string; icon: string; tips: string[] }> = {
    forehead:   { name: 'Dahi', icon: '🔴', tips: ['Jerawat hormonal sering muncul di sini. Kurangi dairy & gula.', 'Sedikit komedo. BHA toner malam 2x/minggu cukup.', 'Dahi bersih! Pertahankan double cleanse malam.'] },
    nose:       { name: 'Zona T (Hidung)', icon: '🔍', tips: ['Pori besar di zona T. BHA + clay mask 2x/minggu.', 'Pori normal. Niacinamide untuk kencangkan lebih lanjut.', 'Zona T sehat! Tetap jaga dengan clay mask 1x/minggu.'] },
    leftCheek:  { name: 'Pipi Kiri', icon: '❤️', tips: ['Kemerahan di pipi. Cek trigger: suhu, produk, makanan.', 'Kemerahan ringan. Centella asiatica untuk meredakan.', 'Pipi sehat & merata. Vitamin C untuk maintain kecerahan.'] },
    rightCheek: { name: 'Pipi Kanan', icon: '❤️', tips: ['Kemerahan di pipi. Cek trigger: suhu, produk, makanan.', 'Kemerahan ringan. Centella asiatica untuk meredakan.', 'Pipi sehat & merata. Vitamin C untuk maintain kecerahan.'] },
    chin:       { name: 'Dagu', icon: '🌑', tips: ['Dagu berjerawat — sering berkaitan hormon. Konsul dokter jika sering.', 'Sedikit acne di dagu. Spot treatment BHA malam.', 'Dagu bersih! Tetap jaga dengan rutinitas konsisten.'] },
    upperLip:   { name: 'Area Bibir', icon: '🌫️', tips: ['Area bibir atas terlihat kusam. Brightening serum & lip care.', 'Sedikit kusam. Exfoliasi lembut + vitamin C.', 'Area bibir bercahaya! Tetap jaga dengan SPF.'] },
  }

  const zoneParams: Record<string, string> = {
    forehead: 'acne', nose: 'pore', leftCheek: 'redness', rightCheek: 'redness', chin: 'acne', upperLip: 'dullness'
  }
  const getZoneTip = (zoneId: string) => {
    const info = ZONE_INFO[zoneId]
    if (!info) return null
    const param = zoneParams[zoneId]
    const v = skinData[param as keyof typeof skinData] as number
    const tipIdx = v >= 60 ? 0 : v >= 35 ? 1 : 2
    return { ...info, tip: info.tips[tipIdx], value: v }
  }

  return (
    <div className="min-h-screen pb-28 relative z-10">
      <Ctr className="pt-5">
        {/* Header */}
        <FadeUp>
          <div className="flex items-center justify-between mb-5">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[.12em] text-[#d42e52] mb-0.5">Hasil Analisis AI</p>
              <h2 className="font-serif text-2xl">
                {userName ? `Hai, ${userName}! 🌸` : 'Hasil Kulitmu 🌸'}
              </h2>
            </div>
            <button
              onClick={() => { resetForNew(); setView('analyze') }}
              className="text-[11px] font-bold text-[rgba(247,237,232,.42)] border border-white/[.07] rounded-full px-3 py-1.5 hover:border-[rgba(212,46,82,.3)] transition-colors focus-visible:outline-2 focus-visible:outline-[#d42e52]"
            >🔄 Scan Ulang</button>
          </div>
        </FadeUp>

        {/* Score + photo */}
        <FadeUp delay={60}>
          <div className="flex items-center justify-around mb-5 gap-4">
            <ScoreRing score={skinData.score} size={150} />
            <div className="flex flex-col gap-2 flex-1">
              <div className="bg-[rgba(212,46,82,.1)] border border-[rgba(212,46,82,.22)] rounded-[14px] p-3">
                <p className="text-[9px] font-bold uppercase tracking-wider text-[#d42e52] mb-0.5">Jenis Kulit</p>
                <p className="text-sm font-bold">Kulit {skinData.skinType}</p>
              </div>
              <div className="bg-[rgba(232,184,75,.09)] border border-[rgba(232,184,75,.2)] rounded-[14px] p-3">
                <p className="text-[9px] font-bold uppercase tracking-wider text-[#e8b84b] mb-0.5">Undertone</p>
                <p className="text-sm font-bold">{skinData.undertone}</p>
              </div>
              {zodiac && (
                <div className="bg-white/[.04] border border-white/[.06] rounded-[14px] p-3">
                  <p className="text-[9px] font-bold uppercase tracking-wider text-[rgba(247,237,232,.42)] mb-0.5">Zodiak</p>
                  <p className="text-sm font-bold">{zodiac.e} {zodiac.s}</p>
                </div>
              )}
            </div>
          </div>
        </FadeUp>

        {/* Skin age */}
        <FadeUp delay={100}>
          <div className="bg-[rgba(91,184,145,.08)] border border-[rgba(91,184,145,.2)] rounded-[16px] p-3.5 mb-4">
            <p className="text-[10px] font-bold uppercase tracking-wider text-[#5bb891] mb-1">Skin Age</p>
            <p className="text-2xl font-bold text-[#5bb891] mb-1">{skinData.skinAge} <span className="text-base font-normal text-[rgba(247,237,232,.42)]">vs usia asli {skinData.realAge}</span></p>
            <p className="text-[11px] text-[rgba(247,237,232,.42)] leading-snug">{skinAgeMsg(skinData.realAge, skinData.skinAge)}</p>
          </div>
        </FadeUp>

        {/* Zodiac insight */}
        {zodiac && (
          <FadeUp delay={120}>
            <div className="bg-[rgba(232,184,75,.09)] border border-[rgba(232,184,75,.18)] rounded-[16px] p-3.5 mb-4">
              <p className="text-[10px] font-bold uppercase tracking-wider text-[#e8b84b] mb-1">✨ Zodiak Insight</p>
              <p className="text-xs text-[rgba(247,237,232,.6)] leading-relaxed">{zodiac.t}</p>
            </div>
          </FadeUp>
        )}

        {/* CTAs */}
        <FadeUp delay={140}>
          <div className="flex gap-2 mb-5">
            <BtnPrimary onClick={openShare} className="flex-1 py-3 text-sm">
              📤 Share Hasil
            </BtnPrimary>
            <BtnGlass onClick={() => setView('tracker')} className="flex-1 py-3 text-sm">
              🔥 28-Day Challenge
            </BtnGlass>
          </div>
          <div className="mb-6">
            <button
              onClick={() => setShowMoreActions(!showMoreActions)}
              className="w-full text-[11px] font-bold text-[rgba(247,237,232,.42)] py-1.5 focus-visible:outline-2 focus-visible:outline-[#d42e52]"
            >
              Opsi lainnya {showMoreActions ? '▴' : '▾'}
            </button>
            {showMoreActions && (
              <div className="flex gap-2 mt-2 anim-fade-up">
                <BtnGlass onClick={() => setView('chat')} className="flex-1 text-xs py-2">💬 Tanya AI Coach</BtnGlass>
                <BtnGlass onClick={() => setView('journey')} className="flex-1 text-xs py-2">📈 Lihat Journey</BtnGlass>
              </div>
            )}
          </div>
        </FadeUp>

        <Divider />

        {/* 12 Parameter */}
        <FadeUp>
          <STitle label="Analisis Detail" title="12 Parameter Kulit" className="mb-4" />
          <div className="grid grid-cols-1 gap-2.5 mb-6">
            {PARAMS.map((p, i) => {
              const v = skinData[p.k as keyof typeof skinData] as number
              const color = barColor(v, p.inv)
              return (
                <div key={p.k} className="flex items-center gap-3">
                  <span className="text-sm w-6 flex-shrink-0">{p.ico}</span>
                  <div className="flex-1">
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className="font-semibold">{p.l}</span>
                      <span className="font-mono font-bold" style={{ color }}>{v}% — {barLabel(v, p.inv)}</span>
                    </div>
                    <ProgressBar value={v} color={color} delay={i * 60} />
                  </div>
                </div>
              )
            })}
          </div>
        </FadeUp>

        <Divider />

        {/* Face Map */}
        <FadeUp>
          <STitle label="Face Map" title="Peta Kondisi Wajahmu 🗺️" className="mb-2" />
          <p className="text-xs text-[rgba(247,237,232,.42)] mb-4">👆 Tap zona wajah untuk lihat detail kondisi</p>
          <div className="flex flex-col items-center mb-4">
            <FaceMapCanvas skinData={skinData as unknown as Record<string,number>} onZoneClick={setActiveZone} />
          </div>
          {/* Map legend */}
          <div className="flex gap-3 justify-center mb-4 text-[10px]">
            {[
              { c: 'rgba(212,46,82,.6)', l: 'Perlu Perhatian' },
              { c: 'rgba(232,184,75,.6)', l: 'Sedang' },
              { c: 'rgba(91,184,145,.6)', l: 'Kondisi Baik' },
            ].map(lg => (
              <div key={lg.l} className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: lg.c }} />
                <span className="text-[rgba(247,237,232,.42)]">{lg.l}</span>
              </div>
            ))}
          </div>
          {/* Active zone detail */}
          {activeZone && (() => {
            const detail = getZoneTip(activeZone)
            if (!detail) return null
            const color = barColor(detail.value, false)
            return (
              <div className="rounded-[16px] p-3.5 mb-4 anim-scale-in" style={{ background: 'rgba(212,46,82,.08)', border: '1px solid rgba(212,46,82,.2)' }}>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">{detail.icon}</span>
                  <span className="font-bold text-sm">{detail.name}</span>
                  <span className="ml-auto text-xs font-mono font-bold" style={{ color }}>{detail.value}%</span>
                </div>
                <p className="text-xs text-[rgba(247,237,232,.6)] leading-relaxed">{detail.tip}</p>
              </div>
            )
          })()}
          {/* Zone summary */}
          <div className="flex flex-col gap-2 mb-6">
            {['forehead', 'nose', 'leftCheek'].map(zid => {
              const d = getZoneTip(zid)
              if (!d) return null
              return (
                <div key={zid} className="flex gap-3 py-3 border-b border-white/[.04] last:border-0">
                  <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ background: `${barColor(d.value, false)}22`, border: `2px solid ${barColor(d.value, false)}` }}>
                    <span className="text-xs">{d.icon}</span>
                  </div>
                  <div>
                    <p className="text-[12px] font-bold mb-0.5">{d.name}</p>
                    <p className="text-[11px] text-[rgba(247,237,232,.42)] leading-relaxed">{d.tip}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </FadeUp>

        <Divider />

        {/* Undertone makeup */}
        <FadeUp>
          <STitle label="Undertone Guide" title={`Makeup untuk ${skinData.undertone} Undertone 💄`} className="mb-4" />
          <p className="text-xs text-[rgba(247,237,232,.42)] mb-3 leading-relaxed">{ut.desc}</p>
          <div className="grid grid-cols-2 gap-2 mb-6">
            {Object.entries(ut.mk).map(([k, v]) => (
              <Card2 key={k} className="p-3">
                <p className="text-[9px] font-bold uppercase tracking-wider text-[rgba(247,237,232,.42)] mb-1">{k}</p>
                <p className="text-[11px] font-semibold text-[#e8b84b]">{v}</p>
              </Card2>
            ))}
          </div>
        </FadeUp>

        <Divider />

        {/* Routines */}
        <FadeUp>
          <STitle label="Rutinitas Kulit" title={`Rutinitas untuk Kulit ${skinData.skinType} ☀️🌙`} className="mb-4" />
          <div className="bg-[rgba(232,184,75,.09)] border border-[rgba(232,184,75,.2)] rounded-[16px] p-3.5 mb-3">
            <p className="text-xs text-[rgba(247,237,232,.6)] leading-relaxed whitespace-pre-line">
              {ROUTINE_T[skinData.skinType] || ROUTINE_T.Normal}
            </p>
          </div>
          <div className="grid grid-cols-1 gap-3 mb-6">
            {[
              { label: '☀️ Pagi', steps: MORNING_ROUTINE[skinData.skinType] || MORNING_ROUTINE.Normal },
              { label: '🌙 Malam', steps: (Object.entries(MORNING_ROUTINE)[0] && (NIGHT_ROUTINE[skinData.skinType] || NIGHT_ROUTINE.Normal)) },
            ].map(r => r.steps && (
              <Card key={r.label} className="p-4">
                <p className="text-[10px] font-bold uppercase tracking-wider text-[rgba(247,237,232,.42)] mb-3">{r.label}</p>
                {(r.steps as string[]).map((step, i) => (
                  <div key={step} className="flex items-center gap-2.5 py-2 border-b border-white/[.04] last:border-0">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 text-[10px] font-bold"
                      style={{ background: 'rgba(212,46,82,.15)', color: '#d42e52' }}>{i + 1}</div>
                    <span className="text-[12px]">{step}</span>
                  </div>
                ))}
              </Card>
            ))}
          </div>
        </FadeUp>

        <Divider />

        {/* Products */}
        <FadeUp>
          <STitle label="Rekomendasi AI" title="Produk Lokal Terpilih 🌸" className="mb-3" />
          <div className="flex gap-2 overflow-x-auto pb-2 mb-4 scrollbar-hide">
            {CATS.map(cat => (
              <button
                key={cat}
                onClick={() => setCatFilter(cat)}
                className={`flex-shrink-0 px-3 py-1.5 rounded-full text-[11px] font-bold transition-all focus-visible:outline-2 focus-visible:outline-[#d42e52] ${
                  catFilter === cat
                    ? 'bg-[rgba(212,46,82,.2)] text-[#d42e52] border border-[rgba(212,46,82,.35)]'
                    : 'bg-white/[.05] text-[rgba(247,237,232,.42)] border border-white/[.07]'
                }`}
              >{cat}</button>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-3 mb-6">
            {filteredProds.map((p, i) => {
              const inWL = wishlist.includes(p.id)
              return (
                <div key={p.id} className="prod-card">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xl">{p.e}</span>
                    <button
                      onClick={() => { toggleWL(p.id); showToast(inWL ? '💔 Dihapus dari wishlist' : '💖 Ditambah ke wishlist!') }}
                      className={`text-lg transition-all focus-visible:outline-2 focus-visible:outline-[#d42e52] ${inWL ? 'text-[#d42e52]' : 'text-[rgba(247,237,232,.22)]'}`}
                      aria-label={inWL ? 'Hapus dari wishlist' : 'Tambah ke wishlist'}
                    >{inWL ? '💖' : '🤍'}</button>
                  </div>
                  <p className="text-[11px] font-bold mb-0.5 leading-tight line-clamp-2">{p.n}</p>
                  <p className="text-[9px] text-[rgba(247,237,232,.42)] mb-1.5">{p.br}</p>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono text-[#5bb891]">Match {p.match}%</span>
                    <span className="text-[11px] font-bold text-[#e8b84b]">Rp {p.price.toLocaleString('id')}</span>
                  </div>
                  <div className="flex gap-1 flex-wrap">
                    {p.ingr.slice(0, 2).map(ing => (
                      <span key={ing} className="text-[8px] px-1.5 py-0.5 rounded-full font-bold bg-[rgba(232,184,75,.09)] text-[#e8b84b] border border-[rgba(232,184,75,.16)]">{ing}</span>
                    ))}
                  </div>
                  <div className="flex gap-1.5 mt-2.5">
                    <a href={`https://shopee.co.id/search?keyword=${encodeURIComponent(p.n)}`} target="_blank" rel="noopener"
                      className="flex-1 flex items-center justify-center gap-1 py-1.5 rounded-full text-[9px] font-bold text-white"
                      style={{ background: 'linear-gradient(135deg,#ee4d2d,#c83820)' }}>
                      🛒 Shopee
                    </a>
                    <a href={`https://www.tokopedia.com/search?st=product&q=${encodeURIComponent(p.n)}`} target="_blank" rel="noopener"
                      className="flex-1 flex items-center justify-center gap-1 py-1.5 rounded-full text-[9px] font-bold text-white"
                      style={{ background: 'linear-gradient(135deg,#03ac0e,#028a0b)' }}>
                      🛒 Tokped
                    </a>
                  </div>
                </div>
              )
            })}
          </div>
        </FadeUp>
      </Ctr>
    </div>
  )
}
