'use client'
import { useRef } from 'react'
import { useStore } from '@/lib/store'
import { Ctr, STitle, Card, Card2, FadeUp, BtnPrimary, BtnGlass, Divider, TagGold } from '@/components/ui'
import { LEADERBOARD } from '@/lib/data'

export default function JourneyPage() {
  const skinData    = useStore(s => s.skinData)
  const compareA    = useStore(s => s.compareA)
  const compareB    = useStore(s => s.compareB)
  const setCompare  = useStore(s => s.setCompare)
  const compareResult = useStore(s => s.compareResult)
  const runCompare  = useStore(s => s.runCompare)
  const showToast   = useStore(s => s.showToast)
  const streak      = useStore(s => s.streak)

  const refA = useRef<HTMLInputElement>(null)
  const refB = useRef<HTMLInputElement>(null)

  const handleFile = (slot: 'A' | 'B', e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]
    if (!f) return
    if (!f.type.startsWith('image/')) { showToast('⚠ File harus gambar'); return }
    const reader = new FileReader()
    reader.onload = ev => setCompare(slot, ev.target?.result as string)
    reader.readAsDataURL(f)
  }

  const COMMUNITY = [
    { name: 'Maya R.',  city: 'Jakarta',   days: 21, text: 'Setelah 21 hari challenge, flek di pipi berkurang banget! Skincare lokalnya legit!', emoji: '🌸' },
    { name: 'Siti A.',  city: 'Surabaya',  days: 14, text: 'Kulit berminyakku sekarang lebih terkontrol. Niacinamide serum yang direkomendasiin FaceGlow juara!', emoji: '✨' },
    { name: 'Rina K.',  city: 'Bandung',   days: 28, text: '28 hari challenge selesai! Skor kulit naik dari 62 ke 81. Terima kasih FaceGlow! 🎉', emoji: '💪' },
  ]

  return (
    <div className="min-h-screen pb-28 relative z-10">
      <Ctr className="pt-5">
        <FadeUp>
          <STitle label="Journey" title="Progress & Komunitas 📈" className="mb-5" />
        </FadeUp>

        {/* Stats summary */}
        {skinData && (
          <FadeUp delay={60}>
            <div className="grid grid-cols-3 gap-2 mb-5">
              {[
                { n: skinData.score, l: 'Skor Kulit', c: '#d42e52', suffix: '/100' },
                { n: streak, l: 'Hari Streak', c: '#e8b84b', suffix: '' },
                { n: skinData.skinAge, l: 'Skin Age', c: '#5bb891', suffix: 'thn' },
              ].map(s => (
                <div key={s.l} className="glass p-3 text-center rounded-[16px]">
                  <p className="font-serif text-2xl" style={{ color: s.c }}>{s.n}<span className="text-sm">{s.suffix}</span></p>
                  <p className="text-[9px] text-[rgba(247,237,232,.42)] mt-0.5">{s.l}</p>
                </div>
              ))}
            </div>
          </FadeUp>
        )}

        {/* Before / After Compare */}
        <FadeUp delay={80}>
          <div className="mb-5">
            <STitle label="Before vs After" title="Lihat Kemajuan Nyata Kulitmu 📸" desc="Upload foto tiap bulan. AI analisis perubahan kulitmu secara objektif." className="mb-4" />
            <div className="grid grid-cols-2 gap-3 mb-3">
              {(['A', 'B'] as const).map(slot => {
                const src = slot === 'A' ? compareA : compareB
                const label = slot === 'A' ? 'Before' : 'After'
                return (
                  <div key={slot}>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-[rgba(247,237,232,.42)] mb-1.5">{label}</p>
                    <div
                      onClick={() => slot === 'A' ? refA.current?.click() : refB.current?.click()}
                      className={`compare-slot ${src ? 'has-img' : ''}`}
                    >
                      {src
                        ? <img src={src} alt={label} className="absolute inset-0 w-full h-full object-cover object-top" />
                        : <>
                          <span className="text-2xl">📷</span>
                          <p className="text-[11px] font-semibold">Upload {label}</p>
                        </>
                      }
                    </div>
                    <input type="file" accept="image/*" ref={slot === 'A' ? refA : refB} onChange={e => handleFile(slot, e)} className="hidden" />
                  </div>
                )
              })}
            </div>

            {compareA && compareB && !compareResult && (
              <BtnPrimary onClick={runCompare} full className="py-3 text-sm">
                🔍 Analisis Kemajuanku
              </BtnPrimary>
            )}
            {compareResult && (
              <div className="rounded-[14px] p-4 anim-scale-in" style={{ background: 'rgba(212,46,82,.08)', border: '1px solid rgba(212,46,82,.2)' }}>
                <p className="text-xs font-bold text-[#d42e52] mb-1.5">🌟 Analisis Kemajuan Kulitmu</p>
                <p className="text-xs text-[rgba(247,237,232,.6)] leading-relaxed">{compareResult}</p>
              </div>
            )}
          </div>
        </FadeUp>

        <Divider />

        {/* Leaderboard */}
        <FadeUp>
          <STitle label="Leaderboard" title="28-Day Glow Challenge 🏆" desc="Top glowers bulan ini · Data ilustrasi" className="mb-4" />
          <div className="flex flex-col gap-2 mb-6">
            {LEADERBOARD.map(row => (
              <div key={row.rank} className="lb-row">
                <span className={`font-serif text-[26px] w-8 text-center flex-shrink-0 ${
                  row.rank === 1 ? 'text-[#e8b84b]' : row.rank === 2 ? 'text-[#c8c8c8]' : row.rank === 3 ? 'text-[#cd7f32]' : 'text-[rgba(247,237,232,.22)]'
                }`}>{row.rank}</span>
                <div className="flex-1">
                  <p className="text-sm font-bold">{row.name} <span className="text-base">{row.badge}</span></p>
                  <p className="text-[10px] text-[rgba(247,237,232,.42)]">{row.city} · {row.days} hari</p>
                </div>
                <div className="text-right">
                  <span className="text-[11px] font-bold text-[#5bb891]">{row.improvement}</span>
                  <p className="text-[9px] text-[rgba(247,237,232,.42)]">skor</p>
                </div>
              </div>
            ))}
          </div>
        </FadeUp>

        <Divider />

        {/* Community */}
        <FadeUp>
          <STitle label="Komunitas" title="Glow Progress Indonesia 🌸" desc="Inspirasi nyata dari sesama · Contoh komunitas" className="mb-4" />
          <div className="flex flex-col gap-3">
            {COMMUNITY.map(c => (
              <div key={c.name} className="bg-[rgba(212,46,82,.08)] border border-[rgba(212,46,82,.16)] rounded-[16px] p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-7 h-7 rounded-full flex items-center justify-center text-sm"
                    style={{ background: 'linear-gradient(135deg,rgba(212,46,82,.3),rgba(212,46,82,.1))' }}>
                    {c.emoji}
                  </div>
                  <div>
                    <p className="text-[12px] font-bold">{c.name}</p>
                    <p className="text-[9px] text-[rgba(247,237,232,.42)]">{c.city} · 🔥 {c.days} hari challenge</p>
                  </div>
                </div>
                <p className="text-[11px] text-[rgba(247,237,232,.55)] leading-relaxed italic">&ldquo;{c.text}&rdquo;</p>
              </div>
            ))}
          </div>
        </FadeUp>
      </Ctr>
    </div>
  )
}
