'use client'
import { useEffect, useState } from 'react'
import { useStore, View } from '@/lib/store'

const ITEMS: { view: View; icon: string; label: string }[] = [
  { view: 'report',  icon: '📊', label: 'Hasil'     },
  { view: 'journey', icon: '📈', label: 'Journey'   },
  { view: 'tracker', icon: '🔥', label: 'Challenge' },
  { view: 'chat',    icon: '💬', label: 'Coach'     },
  { view: 'wallet',  icon: '💖', label: 'Wishlist'  },
]

export default function BottomNav() {
  const view    = useStore(s => s.view)
  const setView = useStore(s => s.setView)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 60)
    return () => clearTimeout(t)
  }, [])

  return (
    <nav
      className={`fixed bottom-0 left-0 right-0 z-[800] bg-[rgba(8,4,6,.96)] backdrop-blur-2xl border-t border-[rgba(212,46,82,.12)] transition-all duration-300 ${visible ? 'opacity-100 translate-y-0 anim-nav-up' : 'opacity-0 translate-y-full'}`}
      style={{ paddingBottom: 'max(6px, env(safe-area-inset-bottom))' }}
    >
      <div className="flex justify-around items-center py-1 max-w-lg mx-auto">
        {ITEMS.map(item => {
          const active = view === item.view
          return (
            <button
              key={item.view}
              onClick={() => setView(item.view)}
              aria-label={item.label}
              aria-current={active ? 'page' : undefined}
              className={`flex flex-col items-center gap-0.5 px-3 py-2 rounded-xl transition-all duration-200 focus-visible:outline-2 focus-visible:outline-[#d42e52] focus-visible:outline-offset-2 ${
                active ? 'text-[#d42e52]' : 'text-[rgba(247,237,232,.22)]'
              }`}
            >
              <span className={`text-[18px] transition-all duration-200 ${active ? 'drop-shadow-[0_0_6px_#d42e52] -translate-y-px' : ''}`}>
                {item.icon}
              </span>
              <span className="text-[10px] font-bold tracking-wide">{item.label}</span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
