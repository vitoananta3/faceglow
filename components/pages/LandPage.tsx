'use client'
import { useStore } from '@/lib/store'
import { BtnPrimary, BtnGlass, Ctr, GlassCard, RoseCard, FadeUp } from '@/components/ui'
import { LAND_REVIEWS } from '@/lib/data'

export default function LandPage() {
  const setView   = useStore(s => s.setView)
  const openLogin = useStore(s => s.openLogin)
  const user      = useStore(s => s.user)

  return (
    <div
      className="min-h-screen pb-16 relative z-10"
      style={{
        background: 'radial-gradient(ellipse at 18% 18%,rgba(212,46,82,.16) 0%,transparent 52%),radial-gradient(ellipse at 82% 78%,rgba(91,184,145,.07) 0%,transparent 48%),#080406'
      }}
    >
      {/* Navbar */}
      <nav className="sticky top-0 z-50 flex items-center justify-between px-4 py-3 border-b border-[rgba(212,46,82,.1)]"
        style={{ background: 'rgba(8,4,6,.88)', backdropFilter: 'blur(20px)' }}>
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full flex-shrink-0 anim-blob"
            style={{ background: 'linear-gradient(135deg,#d42e52,#f9a8c0)' }} />
          <span className="font-serif text-[22px] tracking-wide">
            Face<span className="text-[#d42e52]">Glow</span>
          </span>
        </div>
        <div className="flex gap-2 items-center">
          {user ? (
            <span className="text-xs text-[#d42e52] font-bold">Hi, {user.name} ✦</span>
          ) : (
            <BtnGlass onClick={() => openLogin()} className="text-[11px] py-1.5 px-3.5">Masuk</BtnGlass>
          )}
          <BtnPrimary onClick={() => setView('analyze')} className="text-[12px] py-1.5 px-3.5">Mulai Gratis ✦</BtnPrimary>
        </div>
      </nav>

      {/* Hero */}
      <Ctr>
        <div className="flex flex-col items-center text-center pt-11 pb-5">
          <div
            className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 mb-6 anim-fade-up"
            style={{ background: 'rgba(212,46,82,.1)', border: '1px solid rgba(212,46,82,.22)' }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#d42e52] flex-shrink-0 anim-rpulse" />
            <span className="text-[11px] font-bold text-[#d42e52] tracking-[.04em]">AI Skin Intelligence #1 Indonesia</span>
          </div>

          <h1 className="font-serif text-[clamp(42px,12vw,72px)] leading-[.98] font-normal mb-5 tracking-[-0.01em] anim-fade-up" style={{ animationDelay: '80ms' }}>
            Kulit Glowing<br />
            <em className="text-[#d42e52] not-italic">Bukan Keberuntungan</em>
          </h1>

          <p className="text-sm text-[rgba(247,237,232,.42)] max-w-xs leading-[1.85] mb-8 anim-fade-up" style={{ animationDelay: '160ms' }}>
            Scan wajah 30 detik. Dapatkan diagnosis kulit setara dokter spesialis, face map visual, rutinitas personal & 28-day tracker. Gratis.
          </p>

          <BtnPrimary
            onClick={() => setView('analyze')}
            full
            className="max-w-xs text-[15px] py-4 anim-glow-p anim-fade-up"
            style={{ animationDelay: '240ms' } as React.CSSProperties}
          >
            ✦ Analisis Kulitku — Gratis
          </BtnPrimary>

          <p className="text-[11px] text-[rgba(247,237,232,.22)] mt-3 flex items-center gap-1.5 anim-fade-up" style={{ animationDelay: '300ms' }}>
            <span>🔒</span> 50.000+ pengguna aktif · Foto tidak pernah disimpan
          </p>
        </div>

        {/* Stats */}
        <FadeUp delay={100}>
          <div className="grid grid-cols-4 gap-2 mb-7">
            {[
              { n: '12', l: 'Parameter',     c: '#d42e52' },
              { n: '50+', l: 'Produk Lokal', c: '#d42e52' },
              { n: 'AI', l: 'Face Map',      c: '#5bb891' },
              { n: '28', l: 'Day Challenge', c: '#e8b84b' },
            ].map(s => (
              <GlassCard key={s.l} className="py-3 px-1.5 text-center">
                <p className="font-serif text-2xl" style={{ color: s.c }}>{s.n}</p>
                <p className="text-[9px] text-[rgba(247,237,232,.42)] mt-0.5">{s.l}</p>
              </GlassCard>
            ))}
          </div>
        </FadeUp>

        {/* Features */}
        <FadeUp delay={160}>
          <div className="bg-[#1a0a0f] border border-white/[.06] rounded-[20px] p-5 mb-5">
            <p className="text-[9px] font-bold uppercase tracking-[.12em] text-[rgba(247,237,232,.42)] mb-4">Yang kamu dapatkan gratis</p>
            {[
              { ico: '🧠', t: 'AI Face Scan 12 Parameter',    d: 'Jerawat, minyak, pori, hidrasi, elastisitas & lebih — akurasi dermatologi.' },
              { ico: '🗺️', t: 'Face Map Visual Interaktif',   d: 'Peta zona wajah dengan kondisi kulit tiap area secara detail.' },
              { ico: '🔥', t: '28-Day Glow Challenge',         d: 'Streak tracker, milestone badge, before/after comparison nyata.' },
              { ico: '🧬', t: 'Skin Twin Matching',            d: 'Temukan pengguna dengan profil kulit identik & lihat rutinitas mereka.' },
            ].map((f, i) => (
              <div key={f.t}>
                {i > 0 && <div className="h-px bg-white/[.04] my-3.5" />}
                <div className="flex items-start gap-3">
                  <span className="text-xl flex-shrink-0">{f.ico}</span>
                  <div>
                    <p className="text-[13px] font-bold mb-0.5">{f.t}</p>
                    <p className="text-[11px] text-[rgba(247,237,232,.42)] leading-relaxed">{f.d}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </FadeUp>

        {/* Reviews */}
        <FadeUp delay={220}>
          <div className="flex flex-col gap-2.5 mb-8">
            {LAND_REVIEWS.map(r => (
              <RoseCard key={r.name} className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm">⭐⭐⭐⭐⭐</span>
                  <span className="text-[11px] font-bold">{r.name}</span>
                  <span className="text-[10px] text-[rgba(247,237,232,.42)]">{r.city}</span>
                </div>
                <p className="text-xs text-[rgba(247,237,232,.42)] leading-relaxed italic">{r.text}</p>
              </RoseCard>
            ))}
          </div>
        </FadeUp>

        {/* CTA bottom */}
        <FadeUp delay={280}>
          <div className="text-center pb-10">
            <BtnPrimary onClick={() => setView('analyze')} full className="text-[15px] py-4 mb-3">
              ✦ Mulai Analisis Sekarang
            </BtnPrimary>
            <p className="text-[11px] text-[rgba(247,237,232,.22)]">
              atau{' '}
              <span onClick={() => openLogin()} className="text-[#d42e52] font-bold cursor-pointer">login</span>
              {' '}jika sudah punya akun
            </p>
          </div>
        </FadeUp>
      </Ctr>
    </div>
  )
}
