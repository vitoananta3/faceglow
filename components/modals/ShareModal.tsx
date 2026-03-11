'use client'
import { useEffect, useRef, useState } from 'react'
import { useStore } from '@/lib/store'

export default function ShareModal() {
  const closeShare  = useStore(s => s.closeShare)
  const skinData    = useStore(s => s.skinData)
  const zodiac      = useStore(s => s.zodiac)
  const userName    = useStore(s => s.userName)
  const uploadPreview = useStore(s => s.uploadPreview)
  const streak      = useStore(s => s.streak)
  const showToast   = useStore(s => s.showToast)

  const cv1 = useRef<HTMLCanvasElement>(null)
  const cv2 = useRef<HTMLCanvasElement>(null)
  const [sel, setSel] = useState(1)
  const imgRef = useRef<HTMLImageElement | null>(null)

  const score = skinData?.score ?? 72
  const skinType = skinData?.skinType ?? 'Normal'

  const drawCard1 = (img: HTMLImageElement | null) => {
    const cv = cv1.current
    if (!cv) return
    const ctx = cv.getContext('2d')!
    const W = 320, H = 420
    cv.width = W; cv.height = H

    const bg = ctx.createLinearGradient(0, 0, W, H)
    bg.addColorStop(0, '#fff8f4'); bg.addColorStop(1, '#ffe8e0')
    ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H)

    ctx.save(); ctx.globalAlpha = .12; ctx.fillStyle = '#f4a0b0'
    ctx.beginPath(); ctx.arc(W - 35, 45, 80, 0, Math.PI * 2); ctx.fill(); ctx.restore()

    ctx.strokeStyle = 'rgba(212,46,82,.3)'; ctx.lineWidth = 1.5
    rrx(ctx, 6, 6, W - 12, H - 12, 20); ctx.stroke()

    ctx.font = 'bold 11px "DM Sans",sans-serif'; ctx.fillStyle = '#c02548'
    ctx.textAlign = 'center'; ctx.fillText('✦ FaceGlow AI', W / 2, 27)

    const pr = 46, py = 90
    ctx.strokeStyle = 'rgba(212,46,82,.35)'; ctx.lineWidth = 3
    ctx.beginPath(); ctx.arc(W / 2, py, pr + 8, 0, Math.PI * 2); ctx.stroke()
    drawAvatar(ctx, img, W / 2, py, pr)

    ctx.save(); ctx.translate(W / 2, py); ctx.rotate(-Math.PI / 2)
    ctx.strokeStyle = 'rgba(212,46,82,.15)'; ctx.lineWidth = 5
    ctx.beginPath(); ctx.arc(0, 0, pr + 5, 0, Math.PI * 2); ctx.stroke()
    ctx.strokeStyle = '#f4829a'; ctx.lineCap = 'round'
    ctx.beginPath(); ctx.arc(0, 0, pr + 5, 0, (score / 100) * Math.PI * 2); ctx.stroke()
    ctx.restore()

    const nm = userName
    if (nm) {
      ctx.font = 'bold 13px Georgia,serif'; ctx.fillStyle = '#2a1a1a'
      ctx.textAlign = 'center'; ctx.fillText(nm, W / 2, py + pr + 22)
    }
    const sy = nm ? py + pr + 46 : py + pr + 30
    ctx.font = 'bold 52px Georgia,serif'; ctx.fillStyle = '#c02548'
    ctx.textAlign = 'center'; ctx.fillText(score.toString(), W / 2, sy)
    ctx.font = '10px "DM Sans",sans-serif'; ctx.fillStyle = 'rgba(140,90,110,.7)'
    ctx.fillText('/ 100  SKOR KULIT', W / 2, sy + 17)

    if (zodiac) {
      ctx.font = 'bold 10px "DM Sans",sans-serif'; ctx.fillStyle = '#c02548'
      ctx.fillText(`Kulit ${skinType} · ${zodiac.e} ${zodiac.s}`, W / 2, sy + 36)
    }

    ctx.strokeStyle = 'rgba(212,120,145,.28)'; ctx.lineWidth = 1
    ctx.beginPath(); ctx.moveTo(28, sy + 48); ctx.lineTo(W - 28, sy + 48); ctx.stroke()

    const bars = [
      { l: 'Jerawat', v: skinData?.acne ?? 50, c: '#f4829a' },
      { l: 'Minyak', v: skinData?.oil ?? 55, c: '#f9c5a0' },
      { l: 'Hidrasi', v: skinData?.hydration ?? 60, c: '#8ed4b8' },
    ]
    bars.forEach((b, i) => {
      const y = sy + 66 + i * 27
      ctx.font = '10px "DM Sans",sans-serif'; ctx.fillStyle = 'rgba(90,60,70,.6)'; ctx.textAlign = 'left'; ctx.fillText(b.l, 28, y)
      ctx.font = 'bold 10px "DM Sans",sans-serif'; ctx.fillStyle = b.c; ctx.textAlign = 'right'; ctx.fillText(b.v + '%', W - 28, y)
      ctx.fillStyle = 'rgba(212,140,160,.15)'; ctx.fillRect(28, y + 4, W - 56, 5)
      ctx.fillStyle = b.c; ctx.fillRect(28, y + 4, (W - 56) * b.v / 100, 5)
    })

    ctx.font = 'bold 9px "DM Sans",sans-serif'; ctx.fillStyle = '#c02548'; ctx.textAlign = 'center'
    ctx.fillText('faceglow.ai', W / 2, H - 11)
  }

  const drawCard2 = (img: HTMLImageElement | null) => {
    const cv = cv2.current
    if (!cv) return
    const ctx = cv.getContext('2d')!
    const W = 320, H = 420
    cv.width = W; cv.height = H

    const bg = ctx.createLinearGradient(0, 0, W, H)
    bg.addColorStop(0, '#180a0e'); bg.addColorStop(1, '#281218')
    ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H)

    ctx.save(); ctx.globalAlpha = .07; ctx.fillStyle = '#f9c5a0'
    ctx.beginPath(); ctx.arc(W - 28, 42, 86, 0, Math.PI * 2); ctx.fill(); ctx.restore()

    ctx.strokeStyle = 'rgba(249,197,160,.15)'; ctx.lineWidth = 1.5
    rrx(ctx, 6, 6, W - 12, H - 12, 20); ctx.stroke()

    ctx.font = 'bold 11px "DM Sans",sans-serif'; ctx.fillStyle = '#f4829a'
    ctx.textAlign = 'center'; ctx.fillText('✦ FaceGlow AI', W / 2, 27)

    const pr = 46, py = 90
    drawAvatar(ctx, img, W / 2, py, pr)

    ctx.save(); ctx.translate(W / 2, py); ctx.rotate(-Math.PI / 2)
    const rg = ctx.createLinearGradient(-50, -50, 50, 50)
    rg.addColorStop(0, '#f9c5a0'); rg.addColorStop(1, '#f4829a')
    ctx.strokeStyle = rg; ctx.lineWidth = 5; ctx.lineCap = 'round'
    ctx.beginPath(); ctx.arc(0, 0, pr + 5, 0, (score / 100) * Math.PI * 2); ctx.stroke()
    ctx.restore()

    const nm = userName
    if (nm) {
      ctx.font = 'bold 13px Georgia,serif'; ctx.fillStyle = '#f4829a'
      ctx.textAlign = 'center'; ctx.fillText(nm, W / 2, py + pr + 22)
    }
    const sy = nm ? py + pr + 46 : py + pr + 30
    ctx.font = 'bold 52px Georgia,serif'; ctx.fillStyle = '#f9c5a0'
    ctx.textAlign = 'center'; ctx.fillText(score.toString(), W / 2, sy)
    ctx.font = '10px "DM Sans",sans-serif'; ctx.fillStyle = 'rgba(249,197,160,.45)'
    ctx.fillText('/ 100  SKOR KULIT', W / 2, sy + 17)

    if (zodiac) {
      ctx.font = 'bold 10px "DM Sans",sans-serif'; ctx.fillStyle = '#f4829a'
      ctx.fillText(`Kulit ${skinType} · ${zodiac.e} ${zodiac.s}`, W / 2, sy + 36)
    }

    ctx.strokeStyle = 'rgba(249,197,160,.12)'; ctx.lineWidth = 1
    ctx.beginPath(); ctx.moveTo(28, sy + 48); ctx.lineTo(W - 28, sy + 48); ctx.stroke()

    const bars2 = [
      { l: 'Jerawat', v: skinData?.acne ?? 50, c: '#f4829a' },
      { l: 'Minyak', v: skinData?.oil ?? 55, c: '#f9c5a0' },
      { l: 'Hidrasi', v: skinData?.hydration ?? 60, c: '#6cc49a' },
    ]
    bars2.forEach((b, i) => {
      const y = sy + 66 + i * 27
      ctx.font = '10px "DM Sans",sans-serif'; ctx.fillStyle = 'rgba(249,197,160,.45)'; ctx.textAlign = 'left'; ctx.fillText(b.l, 28, y)
      ctx.font = 'bold 10px "DM Sans",sans-serif'; ctx.fillStyle = b.c; ctx.textAlign = 'right'; ctx.fillText(b.v + '%', W - 28, y)
      ctx.fillStyle = 'rgba(255,255,255,.05)'; ctx.fillRect(28, y + 4, W - 56, 5)
      ctx.fillStyle = b.c; ctx.fillRect(28, y + 4, (W - 56) * b.v / 100, 5)
    })

    ctx.font = 'bold 9px "DM Sans",sans-serif'; ctx.fillStyle = '#f4829a'; ctx.textAlign = 'center'
    ctx.fillText('faceglow.ai', W / 2, H - 11)
  }

  useEffect(() => {
    if (uploadPreview) {
      const img = new Image()
      img.onload = () => { imgRef.current = img; drawCard1(img); drawCard2(img) }
      img.onerror = () => { drawCard1(null); drawCard2(null) }
      img.src = uploadPreview
    } else {
      drawCard1(null); drawCard2(null)
    }
  }, [])

  const getCanvas = () => sel === 1 ? cv1.current : cv2.current

  const shareWA = () => {
    const txt = `🌸 *Hasil Analisis Kulit FaceGlow AI*\n\nSkorku *${score}/100* · ${skinType} ${zodiac ? `· ${zodiac.e} ${zodiac.s}` : ''}\n\n🔥 Hari ke-${streak}/28 dalam 28-Day Glow Challenge!\n\nCek kulitmu di: https://faceglow.ai\n\n#FaceGlowAI #28DayGlowChallenge #SkincareIndonesia`
    const cv = getCanvas()
    if (!cv) return
    cv.toBlob(blob => {
      if (!blob) return
      const f = new File([blob], 'faceglow.png', { type: 'image/png' })
      if (navigator.canShare?.({ files: [f] })) {
        navigator.share({ files: [f], text: txt }).catch(() => window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(txt)}`, '_blank'))
      } else {
        window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(txt)}`, '_blank')
      }
    }, 'image/png')
  }

  const dlCard = () => {
    const cv = getCanvas()
    if (!cv) return
    const a = document.createElement('a')
    a.download = 'FaceGlow_SkinScore.png'; a.href = cv.toDataURL('image/png'); a.click()
    showToast('⬇ Kartu didownload! Bagikan ke TikTok/IG 🌸')
  }

  const copyLink = () => {
    const t = `Skor kulitku ${score}/100 🌸 ${zodiac ? `${zodiac.e} ${zodiac.s} · ` : ''}Kulit ${skinType}. Coba analisis gratis di: https://faceglow.ai`
    navigator.clipboard?.writeText(t).then(() => showToast('🔗 Link berhasil disalin!'))
  }

  return (
    <div
      className="fixed inset-0 z-[1000] flex items-end justify-center"
      style={{ background: 'rgba(4,2,3,.78)', backdropFilter: 'blur(12px)' }}
      onClick={e => { if (e.target === e.currentTarget) closeShare() }}
    >
      <div
        className="bg-[#120709] rounded-t-[28px] w-full max-w-lg border-t border-[rgba(212,46,82,.24)] px-4 pb-10 pt-4 anim-scale-in"
        style={{ maxHeight: '90vh', overflowY: 'auto' }}
      >
        <div className="w-9 h-1 rounded-full bg-white/[.14] mx-auto mb-4" />
        <button onClick={closeShare} className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/[.07] border border-white/[.07] text-[rgba(247,237,232,.42)] hover:text-[#d42e52] transition-all focus-visible:outline-2 focus-visible:outline-[#d42e52]">✕</button>

        <h3 className="font-serif text-xl text-center mb-1">Share Hasil Kulitmu 🌸</h3>
        <p className="text-xs text-center text-[rgba(247,237,232,.42)] mb-4">Pilih kartu & bagikan ke sosmed</p>

        {/* Card selector */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          {[1, 2].map(n => (
            <div
              key={n}
              onClick={() => setSel(n)}
              className={`border-2 rounded-[20px] overflow-hidden cursor-pointer transition-all ${sel === n ? 'border-[#d42e52] shadow-[0_0_16px_rgba(212,46,82,.3)]' : 'border-white/10'}`}
            >
              <canvas ref={n === 1 ? cv1 : cv2} className="w-full block" />
            </div>
          ))}
        </div>

        {/* Share actions */}
        <div className="flex flex-col gap-2">
          <button
            onClick={shareWA}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-full font-bold text-sm text-white focus-visible:outline-2 focus-visible:outline-[#25D366]"
            style={{ background: 'linear-gradient(135deg,#25D366,#128C7E)' }}
          >💬 Share ke WhatsApp / Sosmed</button>
          <button
            onClick={dlCard}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-full font-bold text-sm text-white focus-visible:outline-2 focus-visible:outline-[#d42e52]"
            style={{ background: 'linear-gradient(135deg,#d42e52,#a81e3c)' }}
          >⬇ Download Kartu</button>
          <button
            onClick={copyLink}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-full font-bold text-sm text-[#f7ede8] bg-white/[.04] border border-white/[.07] hover:bg-white/[.08] transition-all focus-visible:outline-2 focus-visible:outline-[#d42e52]"
          >🔗 Copy Link</button>
        </div>
      </div>
    </div>
  )
}

// ── Canvas helpers ──────────────────────────────────────
function rrx(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath()
  ctx.moveTo(x + r, y); ctx.lineTo(x + w - r, y)
  ctx.quadraticCurveTo(x + w, y, x + w, y + r)
  ctx.lineTo(x + w, y + h - r)
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h)
  ctx.lineTo(x + r, y + h)
  ctx.quadraticCurveTo(x, y + h, x, y + h - r)
  ctx.lineTo(x, y + r)
  ctx.quadraticCurveTo(x, y, x + r, y)
  ctx.closePath()
}

function drawAvatar(ctx: CanvasRenderingContext2D, img: HTMLImageElement | null, cx: number, cy: number, r: number) {
  ctx.save(); ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.clip()
  if (img && img.naturalWidth > 0) {
    const s = Math.min(img.naturalWidth, img.naturalHeight)
    ctx.drawImage(img, (img.naturalWidth - s) / 2, 0, s, s, cx - r, cy - r, r * 2, r * 2)
  } else {
    const g = ctx.createRadialGradient(cx, cy - r * .2, r * .1, cx, cy, r)
    g.addColorStop(0, 'rgba(212,46,82,.5)'); g.addColorStop(1, 'rgba(212,46,82,.1)')
    ctx.fillStyle = g; ctx.fillRect(cx - r, cy - r, r * 2, r * 2)
    ctx.font = `bold ${r * .9}px Georgia,serif`; ctx.fillStyle = 'rgba(255,255,255,.6)'
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('✦', cx, cy)
  }
  ctx.restore()
}
