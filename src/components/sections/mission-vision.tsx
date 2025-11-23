"use client"

import { useTranslations } from 'next-intl'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Target, Eye } from 'lucide-react'

export function MissionVision() {
  const t = useTranslations('home')

  return (
    <section className="py-16 bg-muted/50">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Target className="h-6 w-6 text-primary" />
                <CardTitle>{t('mission.title')}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{t('mission.description')}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Eye className="h-6 w-6 text-primary" />
                <CardTitle>{t('vision.title')}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{t('vision.description')}</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

