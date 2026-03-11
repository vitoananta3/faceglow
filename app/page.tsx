import dynamic from 'next/dynamic'

const Shell = dynamic(() => import('@/components/Shell'), { ssr: false })

export default function Page() {
  return <Shell />
}
