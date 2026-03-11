'use client'
import { ReactNode, useEffect, useRef, useState } from 'react'

// ── Layout ──────────────────────────────────────────────────
export function Ctr({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`max-w-[680px] mx-auto px-4 ${className}`}>{children}</div>
}

// ── Cards ───────────────────────────────────────────────────
export function Card({ children, className = '', style }: { children: ReactNode; className?: string; style?: React.CSSProperties }) {
  return <div className={`bg-[#1a0a0f] border border-white/[.06] rounded-[20px] ${className}`} style={style}>{children}</div>
}
export function Card2({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`bg-[#22101a] border border-white/[.05] rounded-[14px] ${className}`}>{children}</div>
}
export function GlassCard({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`glass ${className}`}>{children}</div>
}
export function RoseCard({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`bg-[rgba(212,46,82,.13)] border border-[rgba(212,46,82,.24)] rounded-[20px] ${className}`}>{children}</div>
}
export function ChallengeCard({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`rounded-[20px] p-[18px] border border-[rgba(212,46,82,.2)] relative overflow-hidden ${className}`}
      style={{ background: 'linear-gradient(135deg,rgba(212,46,82,.12),rgba(91,184,145,.07))' }}>
      <span className="absolute -right-2 -top-3 font-serif text-[90px] text-[rgba(212,46,82,.07)] leading-none pointer-events-none select-none">28</span>
      {children}
    </div>
  )
}

// ── Buttons ─────────────────────────────────────────────────
export function BtnPrimary({ children, onClick, disabled, className = '', full, style }: {
  children: ReactNode; onClick?: () => void; disabled?: boolean; className?: string; full?: boolean; style?: React.CSSProperties
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center justify-center gap-2 rounded-full font-bold text-sm text-white transition-all duration-200 px-6 py-3 focus-visible:outline-2 focus-visible:outline-[#d42e52] focus-visible:outline-offset-2 disabled:opacity-35 disabled:cursor-not-allowed hover:enabled:-translate-y-0.5 active:enabled:scale-[.97] ${full ? 'w-full' : ''} ${className}`}
      style={{ background: 'linear-gradient(135deg,#d42e52,#a81e3c)', boxShadow: '0 6px 24px rgba(212,46,82,.35)', ...style }}
    >{children}</button>
  )
}
export function BtnGold({ children, onClick, className = '', full }: {
  children: ReactNode; onClick?: () => void; className?: string; full?: boolean
}) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center justify-center gap-2 rounded-full font-bold text-sm text-[#0a0406] transition-all duration-200 px-6 py-3 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-[#e8b84b] focus-visible:outline-offset-2 ${full ? 'w-full' : ''} ${className}`}
      style={{ background: 'linear-gradient(135deg,#e8b84b,#c8921a)', boxShadow: '0 6px 24px rgba(232,184,75,.3)' }}
    >{children}</button>
  )
}
export function BtnGlass({ children, onClick, className = '', full }: {
  children: ReactNode; onClick?: () => void; className?: string; full?: boolean
}) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center justify-center gap-2 rounded-full font-bold text-sm text-[#f7ede8] bg-white/[.035] border border-white/[.07] backdrop-blur-sm transition-all duration-200 px-5 py-3 hover:bg-white/[.08] hover:border-[rgba(212,46,82,.24)] focus-visible:outline-2 focus-visible:outline-[#d42e52] focus-visible:outline-offset-2 ${full ? 'w-full' : ''} ${className}`}
    >{children}</button>
  )
}

// ── Tags ────────────────────────────────────────────────────
export function TagRose({ children }: { children: ReactNode }) {
  return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[rgba(212,46,82,.13)] text-[#d42e52] border border-[rgba(212,46,82,.24)] whitespace-nowrap">{children}</span>
}
export function TagGold({ children }: { children: ReactNode }) {
  return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[rgba(232,184,75,.11)] text-[#e8b84b] border border-[rgba(232,184,75,.22)] whitespace-nowrap">{children}</span>
}
export function TagSage({ children }: { children: ReactNode }) {
  return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[rgba(91,184,145,.12)] text-[#5bb891] border border-[rgba(91,184,145,.22)] whitespace-nowrap">{children}</span>
}
export function TagMuted({ children }: { children: ReactNode }) {
  return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/[.05] text-[rgba(247,237,232,.42)] border border-white/[.07] whitespace-nowrap">{children}</span>
}

// ── Section Title ────────────────────────────────────────────
export function STitle({ label, title, desc, className = '' }: { label: string; title: string; desc?: string; className?: string }) {
  return (
    <div className={className}>
      <span className="block text-[10px] font-bold uppercase tracking-[.12em] text-[#d42e52] mb-1.5">{label}</span>
      <h3 className="font-serif text-[clamp(22px,5vw,30px)] font-normal leading-[1.15]">{title}</h3>
      {desc && <p className="text-xs text-[rgba(247,237,232,.42)] mt-1.5 leading-relaxed">{desc}</p>}
    </div>
  )
}

// ── Divider ──────────────────────────────────────────────────
export function Divider({ className = '' }: { className?: string }) {
  return <div className={`h-px bg-gradient-to-r from-transparent via-[rgba(212,46,82,.18)] to-transparent my-6 ${className}`} />
}

// ── FadeUp ───────────────────────────────────────────────────
export function FadeUp({ children, delay = 0, className = '' }: {
  children: ReactNode; delay?: number; className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.06 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`transition-all duration-500 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

// ── ProgressBar ──────────────────────────────────────────────
export function ProgressBar({ value, color, delay = 0 }: { value: number; color: string; delay?: number }) {
  const [width, setWidth] = useState(0)
  useEffect(() => {
    const t = setTimeout(() => setWidth(value), 100 + delay)
    return () => clearTimeout(t)
  }, [value, delay])
  return (
    <div className="h-[5px] rounded-full bg-white/[.06] overflow-hidden">
      <div className="bar-fill" style={{ width: `${width}%`, background: color, transitionDelay: `${delay}ms` }} />
    </div>
  )
}

// ── Score Ring SVG ────────────────────────────────────────────
export function ScoreRing({ score, size = 160 }: { score: number; size?: number }) {
  const [animScore, setAnimScore] = useState(0)
  const r = size * 0.38
  const circ = 2 * Math.PI * r
  const { label, color } = scoreGradeLocal(score)

  useEffect(() => {
    const t = setTimeout(() => setAnimScore(score), 200)
    return () => clearTimeout(t)
  }, [score])

  const offset = circ - (animScore / 100) * circ

  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
          <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="rgba(255,255,255,.06)" strokeWidth={size*0.07} />
          <circle
            cx={size/2} cy={size/2} r={r} fill="none"
            stroke={color} strokeWidth={size*0.07}
            strokeLinecap="round"
            strokeDasharray={circ}
            strokeDashoffset={offset}
            style={{ transition: 'stroke-dashoffset 2s cubic-bezier(.4,0,.2,1)' }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-serif leading-none anim-count-up" style={{ fontSize: size * 0.28, color }}>{animScore}</span>
          <span className="text-[rgba(247,237,232,.42)] font-mono" style={{ fontSize: size * 0.07 }}>/ 100</span>
        </div>
      </div>
      <span className="text-xs font-bold mt-2" style={{ color }}>{label}</span>
    </div>
  )
}

function scoreGradeLocal(s: number) {
  if (s >= 88) return { label: 'Sangat Sehat ✨', color: '#5bb891' }
  if (s >= 72) return { label: 'Kulit Sehat 🌟',  color: '#5bb891' }
  if (s >= 56) return { label: 'Butuh Perhatian 💛', color: '#e8b84b' }
  if (s >= 40) return { label: 'Perlu Intensif 🧡', color: '#e09020' }
  return { label: 'Perlu Penanganan ❤️', color: '#d42e52' }
}

// ── BottomSheet modal wrapper ─────────────────────────────────
export function BottomSheet({ children, onClose, title }: {
  children: ReactNode; onClose: () => void; title?: string
}) {
  return (
    <div
      className="fixed inset-0 z-[1000] flex items-end justify-center"
      style={{ background: 'rgba(4,2,3,.8)', backdropFilter: 'blur(14px)' }}
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      <div
        className="bg-[#120709] rounded-t-[28px] w-full max-w-lg border-t border-[rgba(212,46,82,.24)] px-5 pb-10 pt-4 anim-scale-in relative"
        style={{ maxHeight: '90vh', overflowY: 'auto' }}
      >
        <div className="w-9 h-1 rounded-full bg-white/[.14] mx-auto mb-4" />
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/[.07] border border-white/[.07] text-[rgba(247,237,232,.42)] text-sm hover:bg-[rgba(212,46,82,.13)] hover:text-[#d42e52] transition-all focus-visible:outline-2 focus-visible:outline-[#d42e52]"
        >✕</button>
        {title && <h3 className="font-serif text-xl text-center mb-1">{title}</h3>}
        {children}
      </div>
    </div>
  )
}

// ── FaceMap Canvas ────────────────────────────────────────────
export function FaceMapCanvas({ skinData, onZoneClick }: {
  skinData: Record<string, number>;
  onZoneClick?: (zone: string) => void
}) {
  const ref = useRef<HTMLCanvasElement>(null)
  const [activeZone, setActiveZone] = useState<string | null>(null)

  const zones = [
    { id: 'forehead',   label: 'Dahi',       cx: 0.5,  cy: 0.22, rx: 0.22, ry: 0.1,  param: 'acne' },
    { id: 'nose',       label: 'Hidung',      cx: 0.5,  cy: 0.46, rx: 0.07, ry: 0.1,  param: 'pore' },
    { id: 'leftCheek',  label: 'Pipi Kiri',  cx: 0.28, cy: 0.5,  rx: 0.14, ry: 0.1,  param: 'redness' },
    { id: 'rightCheek', label: 'Pipi Kanan', cx: 0.72, cy: 0.5,  rx: 0.14, ry: 0.1,  param: 'redness' },
    { id: 'chin',       label: 'Dagu',        cx: 0.5,  cy: 0.72, rx: 0.13, ry: 0.09, param: 'acne' },
    { id: 'upperLip',   label: 'Bibir Atas',  cx: 0.5,  cy: 0.59, rx: 0.11, ry: 0.05, param: 'dullness' },
  ]

  const getColor = (v: number) => v <= 30 ? 'rgba(91,184,145,' : v <= 55 ? 'rgba(232,184,75,' : 'rgba(212,46,82,'

  useEffect(() => {
    const cv = ref.current
    if (!cv) return
    const W = 280, H = 340
    cv.width = W; cv.height = H
    const ctx = cv.getContext('2d')!
    ctx.clearRect(0, 0, W, H)

    // Background
    const bg = ctx.createLinearGradient(0, 0, W, H)
    bg.addColorStop(0, '#1a0a0f'); bg.addColorStop(1, '#22101a')
    ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H)

    // Face silhouette
    ctx.strokeStyle = 'rgba(212,46,82,.3)'; ctx.lineWidth = 1.5
    ctx.beginPath(); ctx.ellipse(W/2, H*.44, W*.32, H*.42, 0, 0, Math.PI*2); ctx.stroke()
    ctx.beginPath(); ctx.ellipse(W/2, H*.44, W*.29, H*.4, 0, 0, Math.PI*2)
    ctx.strokeStyle = 'rgba(212,46,82,.1)'; ctx.stroke()

    // Zones
    zones.forEach(z => {
      const v = skinData[z.param] ?? 50
      const base = getColor(v)
      const isActive = activeZone === z.id
      const cx = z.cx * W, cy = z.cy * H, rx = z.rx * W, ry = z.ry * H
      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(rx, ry))
      grad.addColorStop(0, base + (isActive ? '0.75)' : '0.55)'))
      grad.addColorStop(.7, base + '0.25)')
      grad.addColorStop(1, base + '0)')
      ctx.fillStyle = grad
      ctx.beginPath(); ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI*2); ctx.fill()

      ctx.font = 'bold 9px "DM Sans",sans-serif'
      ctx.fillStyle = 'rgba(247,237,232,.7)'; ctx.textAlign = 'center'
      ctx.fillText(z.label, cx, cy + 3)
      ctx.font = '8px "DM Sans",sans-serif'
      ctx.fillStyle = 'rgba(247,237,232,.45)'
      ctx.fillText(v + '%', cx, cy + 13)
    })
  }, [skinData, activeZone])

  const handleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const cv = ref.current
    if (!cv) return
    const rect = cv.getBoundingClientRect()
    const scaleX = 280 / rect.width, scaleY = 340 / rect.height
    const mx = (e.clientX - rect.left) * scaleX
    const my = (e.clientY - rect.top) * scaleY

    for (const z of zones) {
      const cx = z.cx * 280, cy = z.cy * 340, rx = z.rx * 280, ry = z.ry * 340
      if (((mx - cx) / rx) ** 2 + ((my - cy) / ry) ** 2 <= 1) {
        setActiveZone(z.id)
        onZoneClick?.(z.id)
        return
      }
    }
    setActiveZone(null)
  }

  return (
    <canvas
      ref={ref}
      onClick={handleClick}
      className="rounded-[16px] cursor-pointer"
      style={{ width: '100%', maxWidth: 280 }}
      title="Klik zona untuk lihat detail"
    />
  )
}
