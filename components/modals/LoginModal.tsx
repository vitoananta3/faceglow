'use client'
import { useState } from 'react'
import { useStore } from '@/lib/store'

export default function LoginModal() {
  const closeLogin    = useStore(s => s.closeLogin)
  const setUser       = useStore(s => s.setUser)
  const loginRedirect = useStore(s => s.loginRedirect)
  const setView       = useStore(s => s.setView)
  const showToast     = useStore(s => s.showToast)

  const [tab, setTab] = useState<'login' | 'register'>('login')
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [pw, setPw] = useState('')

  const onSuccess = (userName: string, userEmail: string, provider: string) => {
    setUser({ name: userName, email: userEmail, provider })
    closeLogin()
    showToast(`🌸 Selamat datang, ${userName}!`)
    if (loginRedirect === 'chat')       setTimeout(() => setView('chat'), 400)
    if (loginRedirect === 'scan_login') setTimeout(() => setView('analyze'), 400)
  }

  const doSocial = (provider: 'google' | 'tiktok') => {
    const n = provider === 'google' ? 'Bestie' : 'TikToker'
    onSuccess(n, `demo@${provider}.com`, provider)
  }

  const doEmailLogin = () => {
    if (!email) { showToast('Masukkan email kamu!'); return }
    const n = email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1)
    onSuccess(n, email, 'email')
  }

  const doRegister = () => {
    if (!email) { showToast('Masukkan email kamu!'); return }
    onSuccess(name || 'Bestie', email, 'email')
  }

  return (
    <div
      className="fixed inset-0 z-[1200] flex items-end justify-center"
      style={{ background: 'rgba(4,2,3,.8)', backdropFilter: 'blur(14px)' }}
      onClick={e => { if (e.target === e.currentTarget) closeLogin() }}
    >
      <div
        className="bg-[#120709] rounded-t-[28px] w-full max-w-lg border-t border-[rgba(212,46,82,.24)] px-5 anim-scale-in relative"
        style={{ paddingBottom: 'max(36px, calc(20px + env(safe-area-inset-bottom)))', paddingTop: '20px' }}
      >
        {/* Handle */}
        <div className="w-9 h-1 rounded-full bg-white/[.14] mx-auto mb-5" />

        {/* Close */}
        <button
          onClick={closeLogin}
          className="absolute top-5 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/[.07] border border-white/[.07] text-[rgba(247,237,232,.42)] hover:text-[#d42e52] hover:bg-[rgba(212,46,82,.13)] transition-all focus-visible:outline-2 focus-visible:outline-[#d42e52]"
        >✕</button>

        {tab === 'login' ? (
          <div>
            <div className="text-center mb-5">
              <div className="text-3xl mb-2.5">🔐</div>
              <h3 className="font-serif text-2xl mb-1.5">Selamat Datang Kembali</h3>
              <p className="text-xs text-[rgba(247,237,232,.42)] leading-relaxed">Masuk untuk akses scan unlimited, AI Coach & history kulitmu.</p>
            </div>

            {/* Social login */}
            <div className="flex flex-col gap-2 mb-4">
              <button
                onClick={() => doSocial('google')}
                className="w-full flex items-center justify-center gap-2.5 py-3 rounded-full font-bold text-sm border border-white/[.1] bg-white/[.04] hover:bg-white/[.08] transition-all focus-visible:outline-2 focus-visible:outline-[#d42e52]"
              >
                <span className="text-lg">🇬</span> Lanjutkan dengan Google
              </button>
              <button
                onClick={() => doSocial('tiktok')}
                className="w-full flex items-center justify-center gap-2.5 py-3 rounded-full font-bold text-sm border border-white/[.1] bg-white/[.04] hover:bg-white/[.08] transition-all focus-visible:outline-2 focus-visible:outline-[#d42e52]"
              >
                <span className="text-lg">🎵</span> Lanjutkan dengan TikTok
              </button>
            </div>

            <div className="flex items-center gap-3 mb-4">
              <div className="flex-1 h-px bg-white/[.07]" />
              <span className="text-[10px] text-[rgba(247,237,232,.22)] font-bold uppercase tracking-wider">atau email</span>
              <div className="flex-1 h-px bg-white/[.07]" />
            </div>

            <div className="flex flex-col gap-2.5 mb-4">
              <input
                type="email"
                placeholder="Email kamu"
                value={email}
                onChange={e => setEmail(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter') doEmailLogin() }}
                className="w-full bg-white/[.045] border border-white/10 rounded-[14px] px-3.5 py-2.5 text-sm text-[#f7ede8] focus:outline-none focus:border-[#d42e52] focus-visible:ring-2 focus-visible:ring-[#d42e52] transition-colors"
              />
              <input
                type="password"
                placeholder="Password"
                value={pw}
                onChange={e => setPw(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter') doEmailLogin() }}
                className="w-full bg-white/[.045] border border-white/10 rounded-[14px] px-3.5 py-2.5 text-sm text-[#f7ede8] focus:outline-none focus:border-[#d42e52] focus-visible:ring-2 focus-visible:ring-[#d42e52] transition-colors"
              />
            </div>

            <button
              onClick={doEmailLogin}
              className="w-full py-3.5 rounded-full font-bold text-sm text-white mb-3 focus-visible:outline-2 focus-visible:outline-[#d42e52]"
              style={{ background: 'linear-gradient(135deg,#d42e52,#a81e3c)', boxShadow: '0 6px 24px rgba(212,46,82,.35)' }}
            >Masuk</button>

            <p className="text-center text-xs text-[rgba(247,237,232,.42)]">
              Belum punya akun?{' '}
              <span onClick={() => setTab('register')} className="text-[#d42e52] font-bold cursor-pointer">Daftar gratis</span>
            </p>
          </div>
        ) : (
          <div>
            <div className="text-center mb-5">
              <div className="text-3xl mb-2.5">🌸</div>
              <h3 className="font-serif text-2xl mb-1.5">Buat Akun Gratis</h3>
              <p className="text-xs text-[rgba(247,237,232,.42)] leading-relaxed">Scan unlimited + AI Coach + history kulit — semua gratis!</p>
            </div>

            <div className="flex flex-col gap-2.5 mb-4">
              <input
                type="text"
                placeholder="Nama / Nickname"
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full bg-white/[.045] border border-white/10 rounded-[14px] px-3.5 py-2.5 text-sm text-[#f7ede8] focus:outline-none focus:border-[#d42e52] focus-visible:ring-2 focus-visible:ring-[#d42e52] transition-colors"
              />
              <input
                type="email"
                placeholder="Email kamu"
                value={email}
                onChange={e => setEmail(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter') doRegister() }}
                className="w-full bg-white/[.045] border border-white/10 rounded-[14px] px-3.5 py-2.5 text-sm text-[#f7ede8] focus:outline-none focus:border-[#d42e52] focus-visible:ring-2 focus-visible:ring-[#d42e52] transition-colors"
              />
            </div>

            <button
              onClick={doRegister}
              className="w-full py-3.5 rounded-full font-bold text-sm text-white mb-3 focus-visible:outline-2 focus-visible:outline-[#d42e52]"
              style={{ background: 'linear-gradient(135deg,#d42e52,#a81e3c)', boxShadow: '0 6px 24px rgba(212,46,82,.35)' }}
            >Daftar & Mulai Analisis 🌸</button>

            <p className="text-[10px] text-center text-[rgba(247,237,232,.22)] mb-3">Tidak perlu kartu kredit</p>

            <p className="text-center text-xs text-[rgba(247,237,232,.42)]">
              Sudah punya akun?{' '}
              <span onClick={() => setTab('login')} className="text-[#d42e52] font-bold cursor-pointer">Masuk</span>
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
