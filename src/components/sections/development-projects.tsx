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
        <div className="grid md:grid-cols-3 gap-6">
          {PROJECTS.map((project) => (
            <Card key={project.key}>
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Hammer className="h-5 w-5 text-primary" />
                  <CardTitle className="text-lg">
                    {t(`items.${project.key}.title`)}
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  {t(`items.${project.key}.description`)}
                </p>
                <span
                  className={`text-xs px-2 py-1 rounded-full ${statusClasses[project.status]}`}
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

