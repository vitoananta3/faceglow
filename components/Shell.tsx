'use client'
import { useEffect } from 'react'
import { useStore } from '@/lib/store'
import LandPage    from './pages/LandPage'
import AnalyzePage from './pages/AnalyzePage'
import LoadingPage from './pages/LoadingPage'
import ReportPage  from './pages/ReportPage'
import JourneyPage from './pages/JourneyPage'
import TrackerPage from './pages/TrackerPage'
import ChatPage    from './pages/ChatPage'
import WalletPage  from './pages/WalletPage'
import BottomNav   from './layout/BottomNav'
import LoginModal  from './modals/LoginModal'
import ShareModal  from './modals/ShareModal'
import PayModal    from './modals/PayModal'
import Particles   from './layout/Particles'

const POST_SCAN_VIEWS = ['report', 'journey', 'tracker', 'chat', 'wallet']

export default function Shell() {
  const view        = useStore(s => s.view)
  const toast       = useStore(s => s.toast)
  const loginModal  = useStore(s => s.loginModal)
  const shareModal  = useStore(s => s.shareModal)
  const payModal    = useStore(s => s.payModal)
  const showNav     = POST_SCAN_VIEWS.includes(view)

  // Reset todayDone on new calendar day
  useEffect(() => {
    const today = new Date().toDateString()
    const s = useStore.getState()
    if (s.lastCompletedDate && s.lastCompletedDate !== today) {
      useStore.setState({ todayDone: false })
    }
  }, [])

  // Scroll to top on view change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [view])

  return (
    <div className="min-h-screen bg-[#080406] relative">
      <Particles />

      {/* Pages — all rendered but only active one shown */}
      <div style={{ display: view === 'land'    ? 'block' : 'none' }}><LandPage /></div>
      <div style={{ display: view === 'analyze' ? 'block' : 'none' }}><AnalyzePage /></div>
      <div style={{ display: view === 'loading' ? 'block' : 'none' }}><LoadingPage /></div>
      <div style={{ display: view === 'report'  ? 'block' : 'none' }}><ReportPage /></div>
      <div style={{ display: view === 'journey' ? 'block' : 'none' }}><JourneyPage /></div>
      <div style={{ display: view === 'tracker' ? 'block' : 'none' }}><TrackerPage /></div>
      <div style={{ display: view === 'chat'    ? 'block' : 'none' }}><ChatPage /></div>
      <div style={{ display: view === 'wallet'  ? 'block' : 'none' }}><WalletPage /></div>

      {showNav && <BottomNav />}
      {loginModal && <LoginModal />}
      {shareModal && <ShareModal />}
      {payModal   && <PayModal />}

      {toast && (
        <div
          key={toast}
          className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[9999] px-5 py-2 rounded-xl text-xs font-bold text-[#d42e52] bg-[#1a0a0f] border border-[#d42e52] pointer-events-none whitespace-nowrap shadow-[0_8px_40px_rgba(0,0,0,.6)] anim-fade-up"
        >
          {toast}
        </div>
      )}
    </div>
  )
}
