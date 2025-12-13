import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SectionHeading } from "@/components/ui/section-heading"
import { Hammer } from "lucide-react"
import { getTranslations } from "next-intl/server"

const PROJECTS = [
  { key: "road", status: "completed" },
  { key: "water", status: "inProgress" },
  { key: "education", status: "planned" },
] as const

const statusClasses: Record<
  (typeof PROJECTS)[number]["status"],
  string
> = {
  completed: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  inProgress: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  planned: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200",
}

export async function DevelopmentProjects() {
  const t = await getTranslations("sections.projects")

  return (
    <section className="py-16 bg-gradient-to-br from-saffron-50 via-saffron-100/50 to-white">
      <div className="container">
        <SectionHeading title={t("title")} />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {PROJECTS.map((project) => (
            <Card key={project.key} className="h-full rounded-xl border-2 border-saffron-300 dark:border-saffron-700 transition-all duration-300 hover:shadow-xl hover:shadow-saffron-200/50 dark:hover:shadow-saffron-800/50 hover:-translate-y-1">
              <CardHeader className="p-4 sm:p-6 pb-2 sm:pb-3">
                <div className="flex items-start gap-3">
                  <Hammer className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <CardTitle className="text-base sm:text-lg leading-tight">
                    {t(`items.${project.key}.title`)}
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 pt-0">
                <p className="text-xs sm:text-sm text-muted-foreground mb-4 leading-relaxed">
                  {t(`items.${project.key}.description`)}
                </p>
                <span
                  className={`inline-block text-xs font-medium px-3 py-1 rounded-full ${statusClasses[project.status]}`}
                >
                  {t(`status.${project.status}`)}
                </span>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

