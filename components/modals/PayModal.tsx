'use client'
import { useState } from 'react'
import { useStore } from '@/lib/store'

const PLANS = [
  { id: '1x',     label: '1x Scan',         price: 'Rp 10.000',  desc: 'Sekali pakai, akses semua fitur analisis',      pop: false },
  { id: 'month',  label: 'Glow Pro Bulanan', price: 'Rp 39.000',  desc: 'Scan unlimited + AI Coach + priority support',  pop: true  },
  { id: '3month', label: 'Glow Pro 3 Bulan', price: 'Rp 89.000',  desc: 'Hemat 24% · Semua fitur Pro selama 3 bulan',    pop: false },
]
const PAY_METHODS = [
  { id: 'gopay',    label: 'GoPay',        icon: '💚' },
  { id: 'ovo',      label: 'OVO',          icon: '💜' },
  { id: 'dana',     label: 'DANA',         icon: '💙' },
  { id: 'transfer', label: 'Bank Transfer', icon: '🏦' },
]

export default function PayModal() {
  const closePay  = useStore(s => s.closePay)
  const showToast = useStore(s => s.showToast)
  const setView   = useStore(s => s.setView)

  const [plan, setPlan] = useState('month')
  const [method, setMethod] = useState('')
  const [confirm, setConfirm] = useState(false)

  const selectedPlan = PLANS.find(p => p.id === plan)!

  const doPayment = () => {
    if (!method) { showToast('Pilih metode pembayaran dulu!'); return }
    setConfirm(true)
  }

  const confirmPay = () => {
    closePay()
    setConfirm(false)
    showToast('🎉 Pembayaran berhasil! Scan lanjut yuk!')
    setTimeout(() => setView('analyze'), 500)
  }

  if (confirm) {
    return (
      <div className="fixed inset-0 z-[1100] flex items-center justify-center px-5"
        style={{ background: 'rgba(4,2,3,.94)', backdropFilter: 'blur(16px)' }}>
        <div className="bg-[#120709] rounded-[28px] p-6 w-full max-w-sm border border-[rgba(212,46,82,.24)] text-center anim-scale-in">
          <div className="text-4xl mb-3">💳</div>
          <h3 className="font-serif text-xl mb-1.5">Konfirmasi Pembayaran</h3>
          <p className="text-xs text-[rgba(247,237,232,.42)] mb-4">Demo mode — tidak ada transaksi nyata</p>
          <div className="bg-[#22101a] rounded-[14px] p-3.5 mb-4 text-left">
            <div className="flex justify-between mb-2">
              <span className="text-xs text-[rgba(247,237,232,.42)]">Paket</span>
              <span className="text-xs font-bold">{selectedPlan.label}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-xs text-[rgba(247,237,232,.42)]">Metode</span>
              <span className="text-xs font-bold">{PAY_METHODS.find(m => m.id === method)?.label}</span>
            </div>
            <div className="flex justify-between pt-2 border-t border-white/[.06]">
              <span className="text-sm font-bold">Total</span>
              <span className="text-base font-bold text-[#d42e52]">{selectedPlan.price}</span>
            </div>
          </div>
          <button
            onClick={confirmPay}
            className="w-full py-3.5 rounded-full font-bold text-sm text-white mb-2.5 focus-visible:outline-2 focus-visible:outline-[#d42e52]"
            style={{ background: 'linear-gradient(135deg,#d42e52,#a81e3c)' }}
          >✓ Simulasi Pembayaran Berhasil</button>
          <button
            onClick={() => setConfirm(false)}
            className="w-full py-3 rounded-full font-bold text-sm text-[rgba(247,237,232,.42)] bg-white/[.04] border border-white/[.07] focus-visible:outline-2 focus-visible:outline-[#d42e52]"
          >Batal</button>
        </div>
      </div>
    )
  }

  return (
    <div
      className="fixed inset-0 z-[1100] flex items-center justify-center px-4"
      style={{ background: 'rgba(4,2,3,.9)', backdropFilter: 'blur(16px)' }}
      onClick={e => { if (e.target === e.currentTarget) closePay() }}
    >
      <div
        className="bg-[#120709] rounded-[28px] w-full max-w-md border border-[rgba(212,46,82,.24)] p-5 anim-scale-in"
        style={{ maxHeight: '90vh', overflowY: 'auto' }}
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-serif text-xl">Upgrade ke Glow Pro ✦</h3>
          <button onClick={closePay} className="w-8 h-8 flex items-center justify-center rounded-full bg-white/[.07] border border-white/[.07] text-[rgba(247,237,232,.42)] hover:text-[#d42e52] transition-all focus-visible:outline-2 focus-visible:outline-[#d42e52]">✕</button>
        </div>

        {/* Plans */}
        <div className="flex flex-col gap-2.5 mb-5">
          {PLANS.map(p => (
            <div
              key={p.id}
              onClick={() => setPlan(p.id)}
              className={`plan-card relative ${plan === p.id ? 'sel' : ''} ${p.pop ? 'pop' : ''}`}
            >
              {p.pop && (
                <span className="absolute -top-2.5 right-3 text-[9px] font-bold px-2.5 py-0.5 rounded-full text-[#08030a]"
                  style={{ background: 'linear-gradient(135deg,#e8b84b,#c8921a)' }}>
                  TERPOPULER
                </span>
              )}
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-bold">{p.label}</p>
                  <p className="text-[10px] text-[rgba(247,237,232,.42)] mt-0.5">{p.desc}</p>
                </div>
                <span className="text-base font-bold text-[#e8b84b] ml-3 flex-shrink-0">{p.price}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Payment methods */}
        <p className="text-[10px] font-bold uppercase tracking-wider text-[rgba(247,237,232,.42)] mb-2.5">Metode Pembayaran</p>
        <div className="grid grid-cols-2 gap-2 mb-5">
          {PAY_METHODS.map(m => (
            <div
              key={m.id}
              onClick={() => setMethod(m.id)}
              className={`pay-method ${method === m.id ? 'sel' : ''}`}
            >
              <span className="text-lg">{m.icon}</span>
              <span>{m.label}</span>
            </div>
          ))}
        </div>

        <button
          onClick={doPayment}
          disabled={!method}
          className="w-full py-3.5 rounded-full font-bold text-sm text-white disabled:opacity-35 disabled:cursor-not-allowed transition-all focus-visible:outline-2 focus-visible:outline-[#d42e52]"
          style={{ background: 'linear-gradient(135deg,#d42e52,#a81e3c)', boxShadow: '0 6px 24px rgba(212,46,82,.35)' }}
        >
          Bayar {selectedPlan.price} →
        </button>
        <p className="text-center text-[10px] text-[rgba(247,237,232,.22)] mt-2">🔒 Pembayaran aman & terenkripsi</p>
      </div>
    </div>
  )
}
