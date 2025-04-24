"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { AuthProvider } from "@/components/auth-provider"
import { useToast } from "@/components/ui/use-toast"

export function AuthWrapper({ children }: { children: React.ReactNode }) {
  const [isInitialized, setIsInitialized] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    // Check if the user is authenticated on mount
    const checkAuth = async () => {
      try {
        // For development purposes, we'll skip the actual API call
        // In production, you would use this API call
        /*
        const response = await fetch("/api/auth/me")
        if (!response.ok) {
          // If not on login or register page, show a toast
          if (
            !window.location.pathname.includes("/login") &&
            !window.location.pathname.includes("/register") &&
            !window.location.pathname === "/"
          ) {
            toast({
              title: "Session expired",
              description: "Please log in again to continue.",
              variant: "destructive",
            })
            router.push("/login")
          }
        }
        */
        // For development, we'll assume the user is authenticated
        // The actual auth state will be handled by the AuthProvider
      } catch (error) {
        console.error("Auth check failed:", error)
      } finally {
        setIsInitialized(true)
      }
    }

    checkAuth()
  }, [router, toast])

  if (!isInitialized) {
    return null // Or a loading spinner
  }

  return <AuthProvider>{children}</AuthProvider>
}
