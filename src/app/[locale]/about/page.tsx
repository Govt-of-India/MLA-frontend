import { MLAProfile } from '@/components/sections/mla-profile'
import { MissionVision } from '@/components/sections/mission-vision'

export default function AboutPage() {
  return (
    <div className="container py-16">
      <h1 className="text-4xl font-bold mb-8 text-center">About</h1>
      <MLAProfile />
      <div className="mt-16">
        <MissionVision />
      </div>
    </div>
  )
}

