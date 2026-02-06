import type { Metadata } from 'next'
import './globals.css'
import ErrorBoundary from './components/ErrorBoundary'

export const metadata: Metadata = {
  title: 'Service Physics Academy - Problem Solving 101',
  description: 'Learn problem-solving methodologies and continuous improvement techniques',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <ErrorBoundary>
          {children}
        </ErrorBoundary>
      </body>
    </html>
  )
}
