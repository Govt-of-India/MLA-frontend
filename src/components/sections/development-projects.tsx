import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Hammer } from 'lucide-react'

export function DevelopmentProjects() {
  const projects = [
    {
      id: '1',
      title: 'Road Development',
      description: 'Construction of new roads connecting remote villages',
      status: 'Completed',
    },
    {
      id: '2',
      title: 'Water Supply',
      description: 'Installation of water supply systems in rural areas',
      status: 'In Progress',
    },
    {
      id: '3',
      title: 'Education Infrastructure',
      description: 'Building new schools and upgrading existing facilities',
      status: 'Planned',
    },
  ]

  return (
    <section className="py-16">
      <div className="container">
        <h2 className="text-3xl font-bold mb-8 text-center">Development Projects</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Card key={project.id}>
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Hammer className="h-5 w-5 text-primary" />
                  <CardTitle className="text-lg">{project.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">{project.description}</p>
                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    project.status === 'Completed'
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                      : project.status === 'In Progress'
                      ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                      : 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
                  }`}
                >
                  {project.status}
                </span>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

