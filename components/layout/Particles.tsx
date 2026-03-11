'use client'
import { useEffect, useRef } from 'react'

export default function Particles() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return
    const el = ref.current
    const petals = ['🌸', '✿', '🌺', '·', '˙', '✦']
    for (let i = 0; i < 16; i++) {
      const div = document.createElement('div')
      div.className = 'petal'
      div.textContent = petals[Math.floor(Math.random() * petals.length)]
      div.style.cssText = `
        left: ${Math.random() * 100}%;
        font-size: ${7 + Math.random() * 7}px;
        animation-duration: ${10 + Math.random() * 14}s;
        animation-delay: ${-Math.random() * 14}s;
      `
      el.appendChild(div)
    }
  }, [])

  return <div ref={ref} className="fixed inset-0 pointer-events-none z-0 overflow-hidden" />
}
