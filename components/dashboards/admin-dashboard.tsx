"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  BarChart3,
  Users,
  Building2,
  Calendar,
  Award,
  Settings,
  Search,
  Filter,
  UserCog,
  ShieldCheck,
} from "lucide-react"
import { useAuth } from "@/components/auth-provider"
import { Skeleton } from "@/components/ui/skeleton"
import { useToast } from "@/components/ui/use-toast"

interface AdminStats {
  totalUsers: number
  totalOrganizations: number
  totalEvents: number
  totalPoints: number
}

interface User {
  _id: string
  name: string
  email: string
  role: string
  status: string
  createdAt: string
}

export function AdminDashboard() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [stats, setStats] = useState<AdminStats>({
    totalUsers: 0,
    totalOrganizations: 0,
    totalEvents: 0,
    totalPoints: 0,
  })
  const [users, setUsers] = useState<User[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchAdminData = async () => {
      setIsLoading(true)
      try {
        // For demo purposes, set some stats
        setStats({
          totalUsers: 1284,
          totalOrganizations: 86,
          totalEvents: 124,
          totalPoints: 48256,
        })

        // Mock user data for demo
        setUsers([
          {
            _id: "1",
            name: "Jane Smith",
            email: "jane@example.com",
            role: "ecowarrior",
            status: "active",
            createdAt: "2024-05-12",
          },
          {
            _id: "2",
            name: "Ocean Guardians",
            email: "contact@oceanguardians.org",
            role: "organization",
            status: "active",
            createdAt: "2024-04-03",
          },
          {
            _id: "3",
            name: "Michael Chen",
            email: "michael@example.com",
            role: "ecowarrior",
            status: "active",
            createdAt: "2024-05-08",
          },
          {
            _id: "4",
            name: "Admin User",
            email: "admin@greenconnect.com",
            role: "admin",
            status: "active",
            createdAt: "2024-01-15",
          },
          {
            _id: "5",
            name: "Green City Initiative",
            email: "info@greencity.org",
            role: "organization",
            status: "inactive",
            createdAt: "2024-03-22",
          },
        ])
      } catch (error) {
        console.error("Error setting up mock admin data:", error)
        toast({
          title: "Error",
          description: "Failed to load admin dashboard data. Please try again.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchAdminData()
  }, [toast])

  if (isLoading) {
    return <DashboardSkeleton />
  }

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Admin Dashboard</h2>
          <Button variant="outline">
            <Settings className="mr-2 h-4 w-4" />
            System Settings
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalUsers}</div>
              <p className="text-xs text-muted-foreground">+42 from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Organizations</CardTitle>
              <Building2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalOrganizations}</div>
              <p className="text-xs text-muted-foreground">+6 from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Events</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalEvents}</div>
              <p className="text-xs text-muted-foreground">+18 from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Green Points Awarded</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalPoints}</div>
              <p className="text-xs text-muted-foreground">+12% from last month</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="users" className="space-y-4">
          <TabsList>
            <TabsTrigger value="users">User Management</TabsTrigger>
            <TabsTrigger value="organizations">Organizations</TabsTrigger>
            <TabsTrigger value="events">Events & Projects</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="system">System Logs</TabsTrigger>
          </TabsList>

          <TabsContent value="users" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
                <CardDescription>Manage user accounts and permissions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2 mb-4">
                  <div className="flex w-full max-w-sm items-center space-x-2">
                    <Search className="h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search users..." />
                  </div>
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter by role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Roles</SelectItem>
                      <SelectItem value="ecowarrior">EcoWarrior</SelectItem>
                      <SelectItem value="organization">Organization</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>

                <div className="rounded-md border">
                  <div className="grid grid-cols-6 p-3 text-sm font-medium">
                    <div>Name</div>
                    <div>Email</div>
                    <div>Role</div>
                    <div>Status</div>
                    <div>Joined</div>
                    <div className="text-right">Actions</div>
                  </div>
                  {users.map((user) => (
                    <div key={user._id} className="grid grid-cols-6 items-center p-3 text-sm border-t">
                      <div>{user.name}</div>
                      <div className="text-muted-foreground">{user.email}</div>
                      <div>
                        <div
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                            user.role === "admin"
                              ? "bg-purple-100 text-purple-800"
                              : user.role === "organization"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-green-100 text-green-800"
                          }`}
                        >
                          {user.role === "ecowarrior"
                            ? "EcoWarrior"
                            : user.role === "organization"
                              ? "Organization"
                              : "Admin"}
                        </div>
                      </div>
                      <div>
                        <div
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                            user.status === "active" ? "bg-emerald-100 text-emerald-800" : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {user.status}
                        </div>
                      </div>
                      <div className="text-muted-foreground">
                        {new Date(user.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </div>
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon">
                          <UserCog className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <ShieldCheck className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Platform Analytics</CardTitle>
                <CardDescription>Overview of platform usage and engagement</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px] flex items-center justify-center border rounded-md bg-muted/20">
                  <div className="text-center">
                    <BarChart3 className="mx-auto h-10 w-10 text-muted-foreground" />
                    <h3 className="mt-2 text-lg font-medium">Analytics Dashboard</h3>
                    <p className="text-sm text-muted-foreground">Detailed analytics will be displayed here</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

function DashboardSkeleton() {
  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between">
          <Skeleton className="h-10 w-48" />
          <Skeleton className="h-10 w-32" />
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {Array(4)
            .fill(0)
            .map((_, i) => (
              <Skeleton key={i} className="h-32 w-full" />
            ))}
        </div>

        <div className="space-y-4">
          <Skeleton className="h-10 w-full max-w-md" />
          <Skeleton className="h-[400px] w-full" />
        </div>
      </div>
    </div>
  )
}
