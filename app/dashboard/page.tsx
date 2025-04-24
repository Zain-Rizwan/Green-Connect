"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@/components/auth-provider"
import { EcoWarriorDashboard } from "@/components/dashboards/ecowarrior-dashboard"
import { OrganizationDashboard } from "@/components/dashboards/organization-dashboard"
import { AdminDashboard } from "@/components/dashboards/admin-dashboard"
import { Skeleton } from "@/components/ui/skeleton"

export default function DashboardPage() {
  const { user, isLoading } = useAuth()
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient || isLoading) {
    return <DashboardSkeleton />
  }

  if (!user) {
    return null // Will be redirected by auth wrapper
  }

  // Render dashboard based on user role
  switch (user.role) {
    case "ecowarrior":
      return <EcoWarriorDashboard />
    case "organization":
      return <OrganizationDashboard />
    case "admin":
      return <AdminDashboard />
    default:
      return <EcoWarriorDashboard />
  }
}

function DashboardSkeleton() {
  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between">
          <Skeleton className="h-10 w-48" />
          <Skeleton className="h-10 w-32" />
        </div>

        <Skeleton className="h-32 w-full" />

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {Array(4)
            .fill(0)
            .map((_, i) => (
              <Skeleton key={i} className="h-32 w-full" />
            ))}
        </div>

        <div className="space-y-4">
          <Skeleton className="h-10 w-full max-w-md" />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {Array(3)
              .fill(0)
              .map((_, i) => (
                <Skeleton key={i} className="h-64 w-full" />
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}
