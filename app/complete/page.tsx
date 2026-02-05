'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { AuthService, User } from '@/lib/auth'
import CourseCompletion from '@/app/components/CourseCompletion'

export default function CompletePage() {
  const [user, setUser] = useState<User | null>(null)
  const [progress, setProgress] = useState(0)
  const router = useRouter()

  useEffect(() => {
    const currentUser = AuthService.getUser()
    if (!currentUser) {
      router.push('/')
      return
    }

    setUser(currentUser)
    const currentProgress = AuthService.getCourseProgress()
    setProgress(currentProgress)

    // If not complete, redirect to dashboard
    if (currentProgress < 100) {
      router.push('/dashboard')
    }
  }, [router])

  if (!user || progress < 100) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  return <CourseCompletion user={user} />
}
