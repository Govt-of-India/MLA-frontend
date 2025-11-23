"use client"

import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import { Award, MapPin, Calendar } from 'lucide-react'

export function MLAProfile() {
  return (
    <section className="py-16">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardContent className="p-8">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="relative aspect-square w-full max-w-sm mx-auto">
                  <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/40 rounded-lg flex items-center justify-center">
                    <span className="text-4xl font-bold text-primary">MLA</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <h2 className="text-3xl font-bold">MLA Name</h2>
                  <div className="space-y-2 text-muted-foreground">
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-5 w-5" />
                      <span>Constituency Name</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Award className="h-5 w-5" />
                      <span>Years in Public Service</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-5 w-5" />
                      <span>Elected Since: 2020</span>
                    </div>
                  </div>
                  <p className="text-muted-foreground">
                    A dedicated public servant committed to the development and welfare of the
                    constituency. Working tirelessly to address the needs of the people and bring
                    about positive change.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

