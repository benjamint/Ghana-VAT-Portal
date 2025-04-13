import { ChakraProvider } from '@chakra-ui/react'
import { Toaster } from 'react-hot-toast'
import FontStyles from '@/components/FontStyles'
import './globals.css'

export const metadata = {
  title: 'Ghana VAT Portal',
  description: 'Ghana Revenue Authority VAT Management System',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <FontStyles />
      </head>
      <body className="font-sf-pro">
        <ChakraProvider>
          <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            {children}
          </div>
          <Toaster position="top-right" />
        </ChakraProvider>
      </body>
    </html>
  )
} 