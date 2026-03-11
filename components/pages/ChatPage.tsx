'use client'
import { useState, useRef, useEffect } from 'react'
import { useStore } from '@/lib/store'
import { CHAT_KB, PRODUCTS } from '@/lib/data'

type Message = { role: 'user' | 'ai'; text: string; products?: typeof PRODUCTS }

const QUICK_QS = [
  'Rutinitas untuk kulit berminyak?',
  'Cara pakai retinol yang benar',
  'Skincare untuk jerawat hormonal',
  'Produk lokal rekomendasi untuk brightening',
  'Cara mengatasi pori-pori besar',
  'Sunscreen untuk kulit sensitif',
]

const WELCOME = `Halo! Aku AI Beauty Coach-mu 🌸

Tanya apa saja soal skincare, jerawat, produk lokal, atau rutinitas. Aku sudah tahu kondisi kulitmu dan siap kasih saran yang personal!`

function findAnswer(q: string): { text: string; products?: typeof PRODUCTS } {
  const lower = q.toLowerCase()
  const match = CHAT_KB.find(kb => kb.k.some(k => lower.includes(k)))
  if (match) {
    const prods = match.ps ? PRODUCTS.filter(p => match.ps.includes(p.id)) : undefined
    return { text: match.r, products: prods }
  }
  // Fallback
  const fallbacks = [
    'Pertanyaan yang bagus! Untuk kulit sehat, kunci utamanya adalah: konsistensi rutinitas pagi & malam, SPF setiap hari tanpa terkecuali, dan hidrasi yang cukup. Ada yang mau kamu tanyakan lebih spesifik?',
    'Skincare itu personal banget ya! Yang paling penting: kenali jenis kulitmu, jangan over-skincare, dan selalu patch test produk baru. Mau aku bantu analisis lebih lanjut?',
    'Kalau kulitmu butuh perhatian ekstra, ingat: less is more di awal, perkenalkan satu produk baru tiap 2 minggu, dan dokumentasikan progresnya. Kamu sudah di jalur yang benar! ✨',
  ]
  return { text: fallbacks[Math.floor(Math.random() * fallbacks.length)] }
}

function renderText(text: string) {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\n/g, '<br />')
}

export default function ChatPage() {
  const user      = useStore(s => s.user)
  const skinData  = useStore(s => s.skinData)
  const openLogin = useStore(s => s.openLogin)

  const [messages, setMessages] = useState<Message[]>([
    { role: 'ai', text: WELCOME }
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [gateVisible, setGateVisible] = useState(false)
  const bodyRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const msgCountRef = useRef(0)
  const gateTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Show gate after 2.5s for non-logged-in users
  useEffect(() => {
    if (!user) {
      gateTimerRef.current = setTimeout(() => setGateVisible(true), 2500)
    }
    return () => { if (gateTimerRef.current) clearTimeout(gateTimerRef.current) }
  }, [user])

  const scrollToBottom = () => {
    setTimeout(() => {
      if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight
    }, 50)
  }

  const sendMessage = () => {
    const q = input.trim()
    if (!q) return

    // After 2 messages, non-logged in users see login gate
    if (!user && msgCountRef.current >= 2) {
      setGateVisible(true)
      return
    }

    setMessages(prev => [...prev, { role: 'user', text: q }])
    setInput('')
    setIsTyping(true)
    msgCountRef.current++
    scrollToBottom()

    // Simulate AI thinking time
    const delay = 800 + Math.random() * 1000
    setTimeout(() => {
      const answer = findAnswer(q)
      setMessages(prev => [...prev, { role: 'ai', text: answer.text, products: answer.products }])
      setIsTyping(false)
      scrollToBottom()
    }, delay)
  }

  const handleQuickQ = (q: string) => {
    setInput(q)
    setTimeout(() => sendMessage(), 50)
  }

  const onLoginSuccess = () => {
    setGateVisible(false)
    if (gateTimerRef.current) clearTimeout(gateTimerRef.current)
    openLogin('chat')
  }

  return (
    <div className="min-h-screen flex flex-col relative z-10">
      {/* Login gate overlay */}
      {gateVisible && !user && (
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-end pointer-events-none"
          style={{ background: 'linear-gradient(to top,rgba(8,4,6,.98) 50%,rgba(8,4,6,.6) 78%,transparent)' }}>
          <div className="bg-[#120709] border border-[rgba(212,46,82,.24)] rounded-[28px] p-6 w-full max-w-sm pointer-events-auto mb-20 mx-4 anim-scale-in">
            <div className="text-3xl text-center mb-3">🌸</div>
            <h3 className="font-serif text-xl text-center mb-2">Lanjutkan Konsultasi</h3>
            <p className="text-xs text-[rgba(247,237,232,.42)] text-center leading-relaxed mb-4">
              Login gratis untuk akses AI Beauty Coach 24/7 tanpa batas!
            </p>
            <button
              onClick={onLoginSuccess}
              className="w-full py-3.5 rounded-full font-bold text-sm text-white mb-2"
              style={{ background: 'linear-gradient(135deg,#d42e52,#a81e3c)', boxShadow: '0 6px 24px rgba(212,46,82,.35)' }}
            >🔐 Login Gratis — Lanjutkan</button>
            <p className="text-[10px] text-[rgba(247,237,232,.22)] text-center">Tidak perlu kartu kredit</p>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="sticky top-0 z-20 px-4 py-3 border-b border-[rgba(212,46,82,.12)]"
        style={{ background: 'rgba(8,4,6,.95)', backdropFilter: 'blur(16px)' }}>
        <div className="flex items-center gap-2.5 max-w-[680px] mx-auto">
          <div className="w-9 h-9 rounded-full flex items-center justify-center text-lg flex-shrink-0 anim-glow-p"
            style={{ background: 'linear-gradient(135deg,#d42e52,#f9a8c0)' }}>✦</div>
          <div className="flex-1">
            <p className="font-bold text-sm">AI Beauty Coach</p>
            <p className="text-[10px] text-[#5bb891]">● Online — Siap bantu 24/7</p>
          </div>
          {user && (
            <span className="px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider bg-[rgba(91,184,145,.12)] text-[#5bb891] border border-[rgba(91,184,145,.22)]">
              Hi, {user.name} ✦
            </span>
          )}
          {skinData && (
            <span className="px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider bg-[rgba(212,46,82,.13)] text-[#d42e52] border border-[rgba(212,46,82,.24)]">
              Kulit {skinData.skinType}
            </span>
          )}
        </div>
      </div>

      {/* Chat body */}
      <div
        ref={bodyRef}
        className="flex-1 overflow-y-auto px-4 pb-[140px] max-w-[680px] mx-auto w-full"
        style={{ minHeight: 'calc(100vh - 180px)' }}
      >
        {/* Welcome */}
        <div className="text-center py-6">
          <div className="text-4xl mb-3">🌸</div>
          <p className="font-bold text-[15px] mb-1">Halo! Aku AI Beauty Coach-mu.</p>
          <p className="text-xs text-[rgba(247,237,232,.42)] leading-relaxed max-w-xs mx-auto">
            Tanya apa saja soal skincare, jerawat, produk, atau rutinitas.
            {skinData && ` Aku sudah tahu kamu punya kulit ${skinData.skinType}!`}
          </p>
        </div>

        {/* Quick questions */}
        <div className="flex flex-wrap gap-2 mb-5">
          {QUICK_QS.map(q => (
            <button
              key={q}
              onClick={() => handleQuickQ(q)}
              className="px-3 py-1.5 bg-white/[.05] border border-white/[.07] rounded-xl text-[11px] font-semibold hover:bg-white/[.1] hover:border-[rgba(212,46,82,.24)] transition-all focus-visible:outline-2 focus-visible:outline-[#d42e52]"
            >{q}</button>
          ))}
        </div>

        {/* Messages */}
        {messages.map((msg, i) => (
          <div key={i}>
            {msg.role === 'user' ? (
              <div className="bubble-u">{msg.text}</div>
            ) : (
              <div>
                <div
                  className="bubble-ai"
                  dangerouslySetInnerHTML={{ __html: renderText(msg.text) }}
                />
                {msg.products && msg.products.length > 0 && (
                  <div className="flex gap-2 overflow-x-auto pb-2 mb-3">
                    {msg.products.map(p => (
                      <div key={p.id} className="flex-shrink-0 w-36 bg-[#22101a] border border-white/[.05] rounded-[14px] p-2.5">
                        <div className="flex justify-between items-start mb-1.5">
                          <span className="text-lg">{p.e}</span>
                          <span className="text-[9px] font-bold text-[#5bb891]">✓ Rekomendasi</span>
                        </div>
                        <p className="text-[10px] font-bold leading-tight mb-0.5">{p.n}</p>
                        <p className="text-[8px] text-[rgba(247,237,232,.42)] mb-1.5">{p.br}</p>
                        <p className="text-[11px] font-bold text-[#e8b84b]">Rp {p.price.toLocaleString('id')}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}

        {/* Typing indicator */}
        {isTyping && (
          <div className="bubble-ai w-16">
            <div className="flex gap-1 items-center">
              {[0, 1, 2].map(i => (
                <div
                  key={i}
                  className="w-1.5 h-1.5 rounded-full bg-[rgba(247,237,232,.4)] anim-spin"
                  style={{ animationDelay: `${i * 200}ms`, animationDuration: '1s' }}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Input bar */}
      <div
        className="fixed left-0 right-0 z-30 px-4 flex gap-2 items-center"
        style={{
          bottom: 0,
          paddingBottom: 'max(60px, calc(56px + env(safe-area-inset-bottom)))',
          paddingTop: '10px',
          background: 'rgba(8,4,6,.97)',
          backdropFilter: 'blur(14px)',
          borderTop: '1px solid rgba(212,46,82,.12)',
        }}
      >
        <div className="flex gap-2 w-full max-w-[680px] mx-auto">
          <input
            ref={inputRef}
            type="text"
            placeholder="Tanya soal kulitmu…"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') sendMessage() }}
            className="flex-1 bg-white/[.06] border border-white/[.07] rounded-full px-4 py-2.5 text-sm text-[#f7ede8] focus:outline-none focus:border-[rgba(212,46,82,.4)] transition-colors"
          />
          <button
            onClick={sendMessage}
            disabled={!input.trim()}
            className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 disabled:opacity-35 transition-all hover:scale-105 active:scale-95 focus-visible:outline-2 focus-visible:outline-[#d42e52]"
            style={{ background: 'linear-gradient(135deg,#d42e52,#a81e3c)' }}
            aria-label="Kirim pesan"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
              <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
