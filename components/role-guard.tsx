"use client"

import { useEffect, type ReactNode } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/components/auth-provider"
import { useToast } from "@/components/ui/use-toast"

interface RoleGuardProps {
  children: ReactNode
  allowedRoles: Array<"ecowarrior" | "organization" | "admin">
}

export function RoleGuard({ children, allowedRoles }: RoleGuardProps) {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        toast({
          title: "Access denied",
          description: "Please log in to access this page.",
          variant: "destructive",
        })
        router.push("/login")
        return
      }

      if (!allowedRoles.includes(user.role)) {
        toast({
          title: "Access denied",
          description: "You don't have permission to access this page.",
          variant: "destructive",
        })
        router.push("/dashboard")
      }
    }
  }, [user, isLoading, router, toast, allowedRoles])

  if (isLoading) {
    return <div className="p-8 flex justify-center">Loading...</div>
  }

  if (!user || !allowedRoles.includes(user.role)) {
    return null
  }

  return <>{children}</>
}
