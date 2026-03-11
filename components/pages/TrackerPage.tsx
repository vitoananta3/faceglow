'use client'
import { useStore } from '@/lib/store'
import { Ctr, STitle, Card, Card2, ChallengeCard, FadeUp, BtnPrimary, Divider, TagRose, TagSage } from '@/components/ui'

const MORNING_TASKS = ['Cuci muka', 'Toner', 'Serum', 'Moisturizer', 'Sunscreen']
const NIGHT_TASKS   = ['Double cleanse', 'Treatment toner', 'Serum malam', 'Night cream/moisturizer']

const GOALS = [
  { i: '✨', l: 'Kulit Cerah & Glowing', weeks: [
    { w: 'Minggu 1–4', t: 'Fondasi Brightening', d: 'Vitamin C serum pagi + niacinamide + SPF ketat.' },
    { w: 'Minggu 5–8', t: 'Intensifikasi', d: 'Tambah Alpha Arbutin malam. Eksfoliasi 2x/minggu AHA.' },
    { w: 'Minggu 9–12', t: 'Maintenance', d: 'Pertahankan rutinitas. Sheet mask 2x/minggu untuk boost.' },
  ]},
  { i: '🔴', l: 'Bebas Jerawat', weeks: [
    { w: 'Minggu 1–4', t: 'Reset & Simplify', d: 'Kurangi ke 3-4 produk basic. BHA toner + niacinamide + SPF.' },
    { w: 'Minggu 5–8', t: 'Target Active', d: 'Spot treatment benzoyl peroxide. Clay mask zona T 2x/minggu.' },
    { w: 'Minggu 9–12', t: 'Fade Marks', d: 'Tambah vitamin C untuk fade acne marks.' },
  ]},
  { i: '💧', l: 'Anti Aging', weeks: [
    { w: 'Minggu 1–4', t: 'Hydration First', d: 'HA serum 2x sehari. Ceramide moisturizer. SPF wajib.' },
    { w: 'Minggu 5–8', t: 'Retinol Intro', d: 'Mulai retinol 0.025% 2x/minggu. Sandwich method.' },
    { w: 'Minggu 9–12', t: 'Peptide Boost', d: 'Tambah peptide serum pagi. Naik retinol 0.05%.' },
  ]},
  { i: '🔍', l: 'Pori Minimal', weeks: [
    { w: 'Minggu 1–4', t: 'Deep Clean', d: 'BHA 2% toner malam + clay mask 2x/minggu.' },
    { w: 'Minggu 5–8', t: 'Tighten', d: 'Niacinamide 10% daily. Retinol untuk kulit elastis.' },
    { w: 'Minggu 9–12', t: 'Maintain', d: 'BHA + niacinamide konsisten. Pori tidak bisa hilang, tapi bisa diminimalkan.' },
  ]},
]

const BADGES = [
  { days: 1,  icon: '🌱', label: 'Newbie Glower' },
  { days: 3,  icon: '🌿', label: '3-Day Starter' },
  { days: 7,  icon: '🔥', label: 'Week Warrior' },
  { days: 14, icon: '💪', label: '2-Week Champion' },
  { days: 21, icon: '🌟', label: 'Almost There' },
  { days: 28, icon: '👑', label: 'Glow Queen/King' },
]

function streakBadge(streak: number) {
  if (streak >= 28) return { icon: '👑', label: 'Glow Queen/King' }
  if (streak >= 21) return { icon: '🌟', label: 'Almost There' }
  if (streak >= 14) return { icon: '💪', label: '2-Week Champion' }
  if (streak >= 7)  return { icon: '🔥', label: 'Week Warrior' }
  if (streak >= 3)  return { icon: '🌿', label: '3-Day Starter' }
  return { icon: '🌱', label: 'Mulai Challenge!' }
}

export default function TrackerPage() {
  const streak       = useStore(s => s.streak)
  const todayDone    = useStore(s => s.todayDone)
  const completeToday = useStore(s => s.completeToday)
  const skinData     = useStore(s => s.skinData)
  const badge        = streakBadge(streak)

  return (
    <div className="min-h-screen pb-28 relative z-10">
      <Ctr className="pt-5">
        <FadeUp>
          <STitle label="28-Day Challenge" title="Rutinitas & Progress 🔥" className="mb-5" />
        </FadeUp>

        {/* Streak card */}
        <FadeUp delay={60}>
          <ChallengeCard className="mb-5">
            <div className="flex justify-between items-start mb-3">
              <div>
                <span className="block text-[10px] font-bold uppercase tracking-wider text-[#d42e52] mb-1">28-Day Glow Challenge</span>
                <div className="flex items-baseline gap-2">
                  <span className="font-serif text-[52px] text-[#e8b84b] leading-none">{streak}</span>
                  <span className="text-base font-bold text-[#e8b84b]">Hari</span>
                </div>
                <p className="text-[11px] text-[rgba(247,237,232,.42)] mt-1">
                  {streak === 0 ? 'Mulai hari ini! Konsistensi adalah kuncinya.' :
                   streak < 7  ? `${7 - streak} hari lagi untuk badge Week Warrior!` :
                   streak < 28 ? `${28 - streak} hari lagi menuju Glow Queen/King! 👑` :
                   '🎉 Challenge selesai! Kamu luar biasa!'}
                </p>
              </div>
              <div className="text-center">
                <div className={`text-4xl ${streak > 0 ? 'anim-streak' : ''}`}>{badge.icon}</div>
                <p className="text-[9px] text-[rgba(247,237,232,.42)] mt-1">{badge.label}</p>
              </div>
            </div>

            {/* Progress bar */}
            <div className="mb-4">
              <div className="flex justify-between text-[10px] text-[rgba(247,237,232,.42)] mb-1.5">
                <span>Challenge Progress</span>
                <span>{streak} / 28 Hari</span>
              </div>
              <div className="h-2 rounded-full bg-white/[.06] overflow-hidden">
                <div
                  className="bar-fill h-full"
                  style={{
                    width: `${(streak / 28) * 100}%`,
                    background: 'linear-gradient(90deg,#d42e52,#e8b84b)',
                  }}
                />
              </div>
            </div>

            {/* Complete today button */}
            {!todayDone ? (
              <BtnPrimary onClick={completeToday} full className="py-3 text-sm anim-glow-p">
                ✅ Selesai Rutinitas Hari Ini!
              </BtnPrimary>
            ) : (
              <div className="w-full py-3 rounded-full text-center text-sm font-bold text-[#5bb891]"
                style={{ background: 'rgba(91,184,145,.12)', border: '1px solid rgba(91,184,145,.24)' }}>
                ✨ Hari ini sudah selesai! Kembali besok
              </div>
            )}
          </ChallengeCard>
        </FadeUp>

        {/* Badge milestones */}
        <FadeUp delay={80}>
          <div className="mb-5">
            <p className="text-[10px] font-bold uppercase tracking-wider text-[rgba(247,237,232,.42)] mb-3">Badge Milestones</p>
            <div className="grid grid-cols-3 gap-2">
              {BADGES.map(b => {
                const earned = streak >= b.days
                return (
                  <div key={b.days}
                    className="rounded-[14px] p-3 text-center transition-all"
                    style={{
                      background: earned ? 'rgba(232,184,75,.1)' : 'rgba(255,255,255,.03)',
                      border: `1px solid ${earned ? 'rgba(232,184,75,.28)' : 'rgba(255,255,255,.05)'}`,
                      opacity: earned ? 1 : 0.45,
                    }}>
                    <div className={`text-2xl mb-1 ${earned ? 'anim-streak' : ''}`}>{b.icon}</div>
                    <p className="text-[9px] font-bold text-[#e8b84b]">{b.days} Hari</p>
                    <p className="text-[8px] text-[rgba(247,237,232,.42)]">{b.label}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </FadeUp>

        <Divider />

        {/* Daily routines */}
        <FadeUp>
          <p className="text-[10px] font-bold uppercase tracking-wider text-[rgba(247,237,232,.42)] mb-3">Rutinitas Harian</p>
          <div className="grid grid-cols-1 gap-3 mb-6">
            {[
              { label: '☀️ Pagi', tasks: MORNING_TASKS },
              { label: '🌙 Malam', tasks: NIGHT_TASKS },
            ].map(routine => (
              <Card key={routine.label} className="p-4">
                <p className="text-[10px] font-bold uppercase tracking-wider text-[rgba(247,237,232,.42)] mb-3">{routine.label}</p>
                {routine.tasks.map((task, i) => (
                  <div key={task} className="flex items-center gap-3 py-2.5 border-b border-white/[.04] last:border-0">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-[11px] font-bold"
                      style={{ background: todayDone ? 'rgba(91,184,145,.2)' : 'rgba(212,46,82,.15)', color: todayDone ? '#5bb891' : '#d42e52' }}>
                      {todayDone ? '✓' : i + 1}
                    </div>
                    <span className={`text-[12px] ${todayDone ? 'line-through text-[rgba(247,237,232,.3)]' : ''}`}>{task}</span>
                  </div>
                ))}
              </Card>
            ))}
          </div>
        </FadeUp>

        <Divider />

        {/* Goals road map */}
        <FadeUp>
          <STitle label="Glow Goals" title="Peta Jalan Kulitmu ✨" className="mb-4" />
          <div className="flex flex-col gap-3">
            {GOALS.map(goal => (
              <div key={goal.l}>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">{goal.i}</span>
                  <span className="text-sm font-bold">{goal.l}</span>
                </div>
                <div className="flex flex-col gap-2 pl-2 border-l-2 border-[rgba(212,46,82,.2)]">
                  {goal.weeks.map((wk, i) => (
                    <div key={wk.w} className="pl-4 relative">
                      <div className="absolute left-[-9px] top-1 w-3 h-3 rounded-full border-2 border-[#d42e52]"
                        style={{ background: i === 0 ? '#d42e52' : 'transparent' }} />
                      <p className="text-[9px] font-bold uppercase tracking-wider text-[#d42e52] mb-0.5">{wk.w}</p>
                      <p className="text-[11px] font-semibold mb-0.5">{wk.t}</p>
                      <p className="text-[10px] text-[rgba(247,237,232,.42)] leading-snug">{wk.d}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </FadeUp>
      </Ctr>
    </div>
  )
}
