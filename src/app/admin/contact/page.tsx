import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { format } from 'date-fns'
import { Mail, Phone, MessageSquare } from 'lucide-react'

// Mock submissions (in production, fetch from database)
const mockSubmissions: any[] = []

export default async function ContactPage() {
  const session = await getServerSession(authOptions)

  if (!session || session.user.role !== 'admin') {
    redirect('/admin/login')
  }

  const submissions = mockSubmissions

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Contact Submissions</h1>
      <div className="space-y-4">
        {submissions.map((submission) => (
          <Card key={submission.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>{submission.name}</CardTitle>
                  <div className="flex items-center space-x-4 mt-2 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Mail className="h-4 w-4" />
                      <span>{submission.email}</span>
                    </div>
                    {submission.phone && (
                      <div className="flex items-center space-x-1">
                        <Phone className="h-4 w-4" />
                        <span>{submission.phone}</span>
                      </div>
                    )}
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        submission.status === 'new'
                          ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                          : submission.status === 'read'
                          ? 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
                          : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                      }`}
                    >
                      {submission.status}
                    </span>
                  </div>
                </div>
                <span className="text-sm text-muted-foreground">
                  {format(new Date(submission.createdAt), 'PPP')}
                </span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-start space-x-2">
                <MessageSquare className="h-5 w-5 text-muted-foreground mt-0.5" />
                <p className="text-sm">{submission.message}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {submissions.length === 0 && (
        <Card>
          <CardContent className="py-8 text-center text-muted-foreground">
            No contact submissions yet.
          </CardContent>
        </Card>
      )}
    </div>
  )
}

