"use client"

import { useTranslations } from 'next-intl'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Target, Eye } from 'lucide-react'

export function MissionVision() {
  const t = useTranslations('home')

  return (
    <section className="py-16 bg-gradient-to-br from-saffron-50 via-saffron-100/50 to-white">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="border-2 border-saffron-200 dark:border-saffron-800 shadow-2xl shadow-saffron-200/80 dark:shadow-saffron-800/60 ring-2 ring-saffron-200/40 dark:ring-saffron-800/40 hover:border-saffron-400 dark:hover:border-saffron-600 transition-all duration-300 hover:shadow-2xl hover:shadow-saffron-200/90 dark:hover:shadow-saffron-800/70 hover:ring-4 hover:ring-saffron-200/60 dark:hover:ring-saffron-800/60">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Target className="h-6 w-6 text-saffron-600 dark:text-saffron-400" />
                <CardTitle className="text-saffron-900 dark:text-saffron-100">{t('mission.title')}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">{t('mission.description')}</p>
            </CardContent>
          </Card>

          <Card className="border-2 border-saffron-200 dark:border-saffron-800 shadow-2xl shadow-saffron-200/80 dark:shadow-saffron-800/60 ring-2 ring-saffron-200/40 dark:ring-saffron-800/40 hover:border-saffron-400 dark:hover:border-saffron-600 transition-all duration-300 hover:shadow-2xl hover:shadow-saffron-200/90 dark:hover:shadow-saffron-800/70 hover:ring-4 hover:ring-saffron-200/60 dark:hover:ring-saffron-800/60">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Eye className="h-6 w-6 text-saffron-600 dark:text-saffron-400" />
                <CardTitle className="text-saffron-900 dark:text-saffron-100">{t('vision.title')}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">{t('vision.description')}</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

