'use client'
import { useStore } from '@/lib/store'
import { Ctr } from '@/components/ui'

export default function LoadingPage() {
  const uploadPreview = useStore(s => s.uploadPreview)
  const loadText      = useStore(s => s.loadText)
  const loadPct       = useStore(s => s.loadPct)
  const loadStep      = useStore(s => s.loadStep)

  return (
    <div className="min-h-screen flex items-center justify-center relative z-10">
      <Ctr>
        <div className="flex flex-col items-center text-center pt-10 pb-16">
          {/* Photo preview with scan overlay */}
          <div className="relative mb-8">
            <div className="w-[160px] h-[200px] rounded-[20px] overflow-hidden relative bg-[#22101a] border border-[rgba(212,46,82,.2)]">
              {uploadPreview ? (
                <img src={uploadPreview} alt="Foto yang dianalisis" className="w-full h-full object-cover object-top" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-5xl">📸</div>
              )}
              {/* Scan overlay */}
              <div className="absolute inset-0 bg-[rgba(212,46,82,.04)]" />
              <div className="scan-line" style={{ top: '50%' }} />
              {/* Corner marks */}
              {[['top-2 left-2 border-l-2 border-t-2', 'top-2 right-2 border-r-2 border-t-2'], ['bottom-2 left-2 border-l-2 border-b-2', 'bottom-2 right-2 border-r-2 border-b-2']].flat().map((cls, i) => (
                <div key={i} className={`absolute w-4 h-4 border-[#d42e52] ${cls}`} style={{ borderRadius: '2px' }} />
              ))}
            </div>

            {/* Pulse rings */}
            <div className="absolute inset-0 rounded-[20px] border border-[rgba(212,46,82,.3)] anim-rpulse pointer-events-none" />
          </div>

          <h2 className="font-serif text-[28px] mb-2">Menganalisis Kulitmu</h2>
          <p className="text-xs text-[rgba(247,237,232,.42)] mb-8">AI sedang membaca 12 parameter kulitmu…</p>

          {/* Progress */}
          <div className="w-full max-w-xs mb-4">
            <div className="flex justify-between text-[10px] text-[rgba(247,237,232,.42)] mb-2">
              <span>{loadText}</span>
              <span className="font-mono font-bold text-[#d42e52]">{loadPct}%</span>
            </div>
            <div className="h-1.5 rounded-full bg-white/[.06] overflow-hidden">
              <div
                className="bar-fill h-full"
                style={{
                  width: `${loadPct}%`,
                  background: 'linear-gradient(90deg,#d42e52,#ff6b8a)',
                }}
              />
            </div>
          </div>

          {/* Steps */}
          <div className="flex flex-col gap-2.5 w-full max-w-xs">
            {[
              { s: 2, label: '🧠 Landmark wajah terdeteksi', sub: '68 titik referensi' },
              { s: 4, label: '🗺️ Face map dibuat', sub: '6 zona kulit dipetakan' },
              { s: 6, label: '🧬 Profil kulit dicocokan', sub: 'Database kulit SEA' },
            ].map(step => (
              <div
                key={step.s}
                className="flex items-center gap-3 px-3 py-2.5 rounded-[14px] transition-all duration-500 text-left"
                style={{
                  background: loadStep >= step.s ? 'rgba(212,46,82,.1)' : 'rgba(255,255,255,.03)',
                  border: `1px solid ${loadStep >= step.s ? 'rgba(212,46,82,.24)' : 'rgba(255,255,255,.06)'}`,
                  opacity: loadStep >= step.s ? 1 : 0.3,
                }}
              >
                <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: loadStep >= step.s ? '#d42e52' : 'rgba(255,255,255,.1)' }}>
                  {loadStep >= step.s
                    ? <span className="text-white text-[10px]">✓</span>
                    : <span className="text-[rgba(247,237,232,.3)] text-[8px]">○</span>
                  }
                </div>
                <div>
                  <p className="text-[12px] font-semibold">{step.label}</p>
                  <p className="text-[10px] text-[rgba(247,237,232,.42)]">{step.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Ctr>
    </div>
  )
}
