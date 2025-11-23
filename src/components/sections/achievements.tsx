import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Trophy } from 'lucide-react'
import { mockAchievements, delay } from '@/lib/mock-data'

export async function Achievements() {
  // Simulate async call
  await delay(100)
  const achievements = mockAchievements
    .slice(0, 6)
    .sort((a, b) => b.year - a.year)

  if (achievements.length === 0) {
    return null
  }

  return (
    <section className="py-16 bg-muted/50">
      <div className="container">
        <h2 className="text-3xl font-bold mb-8 text-center">Achievements</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievements.map((achievement) => (
            <Card key={achievement.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{achievement.titleEn}</CardTitle>
                  <Trophy className="h-5 w-5 text-primary" />
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-2">
                  {achievement.descriptionEn}
                </p>
                <span className="text-xs font-semibold text-primary">{achievement.year}</span>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

