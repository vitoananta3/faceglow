'use client'
import { useStore } from '@/lib/store'
import { Ctr, STitle, FadeUp, BtnGlass } from '@/components/ui'

export default function WalletPage() {
  const products    = useStore(s => s.products)
  const wishlist    = useStore(s => s.wishlist)
  const toggleWL    = useStore(s => s.toggleWishlist)
  const showToast   = useStore(s => s.showToast)
  const setView     = useStore(s => s.setView)

  const wishlisted = products.filter(p => wishlist.includes(p.id))

  return (
    <div className="min-h-screen pb-28 relative z-10">
      <Ctr className="pt-5">
        <FadeUp>
          <STitle label="Beauty Wallet" title="Wishlist & Produk Tersimpan 💖" className="mb-5" />
        </FadeUp>

        {wishlisted.length === 0 ? (
          <FadeUp delay={60}>
            <div className="text-center py-16">
              <div className="text-5xl mb-4">💝</div>
              <p className="font-bold mb-2">Wishlistmu masih kosong</p>
              <p className="text-xs text-[rgba(247,237,232,.42)] leading-relaxed mb-6 max-w-xs mx-auto">
                Simpan produk dari tab <strong className="text-[#d42e52]">Hasil</strong> dengan klik ikon 💖 pada produk yang kamu suka.
              </p>
              <BtnGlass onClick={() => setView('report')}>
                Lihat Rekomendasi Produk →
              </BtnGlass>
            </div>
          </FadeUp>
        ) : (
          <>
            <FadeUp delay={60}>
              <p className="text-xs text-[rgba(247,237,232,.42)] mb-4">{wishlisted.length} produk tersimpan</p>
            </FadeUp>
            <div className="grid grid-cols-2 gap-3">
              {wishlisted.map((p, i) => (
                <FadeUp key={p.id} delay={i * 40}>
                  <div className="prod-card">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-xl">{p.e}</span>
                      <button
                        onClick={() => { toggleWL(p.id); showToast('💔 Dihapus dari wishlist') }}
                        className="text-xl text-[#d42e52] focus-visible:outline-2 focus-visible:outline-[#d42e52]"
                        aria-label="Hapus dari wishlist"
                      >💖</button>
                    </div>
                    <p className="text-[11px] font-bold mb-0.5 leading-tight">{p.n}</p>
                    <p className="text-[9px] text-[rgba(247,237,232,.42)] mb-1.5">{p.br}</p>
                    <div className="flex items-center justify-between mb-2.5">
                      <span className="text-[10px] font-mono text-[#5bb891]">Match {p.match}%</span>
                      <span className="text-[11px] font-bold text-[#e8b84b]">Rp {p.price.toLocaleString('id')}</span>
                    </div>
                    <div className="flex gap-1.5">
                      <a
                        href={`https://shopee.co.id/search?keyword=${encodeURIComponent(p.n)}`}
                        target="_blank" rel="noopener"
                        className="flex-1 flex items-center justify-center gap-1 py-1.5 rounded-full text-[9px] font-bold text-white"
                        style={{ background: 'linear-gradient(135deg,#ee4d2d,#c83820)' }}
                      >🛒 Shopee</a>
                      <a
                        href={`https://www.tokopedia.com/search?st=product&q=${encodeURIComponent(p.n)}`}
                        target="_blank" rel="noopener"
                        className="flex-1 flex items-center justify-center gap-1 py-1.5 rounded-full text-[9px] font-bold text-white"
                        style={{ background: 'linear-gradient(135deg,#03ac0e,#028a0b)' }}
                      >🛒 Tokped</a>
                    </div>
                  </div>
                </FadeUp>
              ))}
            </div>
          </>
        )}
      </Ctr>
    </div>
  )
}
