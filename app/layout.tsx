import type React from "react"
import { ThemeProvider } from "@/components/theme-provider"
import { SidebarProvider } from "@/components/sidebar-provider"
import { AppSidebar } from "@/components/app-sidebar"
import { Toaster } from "@/components/ui/toaster"
import { AuthWrapper } from "@/components/auth-wrapper"
import { ThemeToggle } from "@/components/theme-toggle"
import "./globals.css"

export const metadata = {
  title: "GreenConnect - A Sustainable Community Network",
  description:
    "Connect eco-conscious individuals, businesses, and organizations to collaborate on sustainability projects",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-background font-sans antialiased">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <AuthWrapper>
            <SidebarProvider>
              <div className="flex min-h-screen">
                <AppSidebar />
                <div className="flex-1 flex flex-col overflow-x-hidden">
                  <header className="sticky top-0 z-10 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                    <div className="flex h-14 items-center px-4 justify-end">
                      <ThemeToggle />
                    </div>
                  </header>
                  <main className="flex-1">{children}</main>
                </div>
              </div>
              <Toaster />
            </SidebarProvider>
          </AuthWrapper>
        </ThemeProvider>
      </body>
    </html>
  )
}
