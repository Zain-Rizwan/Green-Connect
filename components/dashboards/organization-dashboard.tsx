"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart3, Calendar, LineChart, Plus, Recycle, Users } from "lucide-react"
import { EventCard } from "@/components/event-card"
import { ProjectCard } from "@/components/project-card"
import { useAuth } from "@/components/auth-provider"
import { Skeleton } from "@/components/ui/skeleton"
import { useToast } from "@/components/ui/use-toast"
import { Progress } from "@/components/ui/progress"

interface Event {
  _id: string
  title: string
  date: string
  location: string
  creatorName: string
  attendees: string[]
  points: number
  image?: string
}

interface Project {
  _id: string
  title: string
  organization: string
  organizationName: string
  deadline: string
  progress: number
  contributors: string[]
  points: number
  image?: string
}

interface OrgStats {
  totalEvents: number
  totalProjects: number
  totalParticipants: number
  totalImpact: number
}

export function OrganizationDashboard() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [events, setEvents] = useState<Event[]>([])
  const [projects, setProjects] = useState<Project[]>([])
  const [stats, setStats] = useState<OrgStats>({
    totalEvents: 0,
    totalProjects: 0,
    totalParticipants: 0,
    totalImpact: 0,
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchDashboardData = async () => {
      setIsLoading(true)
      try {
        // Mock organization events
        const mockEvents = [
          {
            _id: "1",
            title: "Beach Cleanup Drive",
            date: "2025-05-15",
            location: "Sunset Beach",
            creatorName: "Ocean Guardians",
            attendees: ["user1", "user2", "user3", "user4", "user5"],
            points: 150,
            image: "/placeholder.svg?height=200&width=400",
          },
          {
            _id: "2",
            title: "Urban Tree Planting",
            date: "2025-05-22",
            location: "Central Park",
            creatorName: "Green City Initiative",
            attendees: ["user1", "user2", "user3"],
            points: 200,
            image: "/placeholder.svg?height=200&width=400",
          },
          {
            _id: "3",
            title: "Recycling Workshop",
            date: "2025-06-05",
            location: "Community Center",
            creatorName: "Waste Warriors",
            attendees: ["user1", "user2", "user3", "user4"],
            points: 100,
            image: "/placeholder.svg?height=200&width=400",
          },
        ]
        setEvents(mockEvents)

        // Mock organization projects
        const mockProjects = [
          {
            _id: "1",
            title: "Solar Panel Installation",
            organization: "org1",
            organizationName: "Renewable Energy Co.",
            deadline: "2025-06-30",
            progress: 65,
            contributors: ["user1", "user2", "user3"],
            points: 500,
            image: "/placeholder.svg?height=200&width=400",
          },
          {
            _id: "2",
            title: "Community Garden",
            organization: "org2",
            organizationName: "Urban Farmers",
            deadline: "Ongoing",
            progress: 42,
            contributors: ["user1", "user2", "user3", "user4"],
            points: 350,
            image: "/placeholder.svg?height=200&width=400",
          },
          {
            _id: "3",
            title: "Plastic-Free Initiative",
            organization: "org3",
            organizationName: "Zero Waste Alliance",
            deadline: "2025-07-15",
            progress: 28,
            contributors: ["user1", "user2", "user3", "user4", "user5"],
            points: 450,
            image: "/placeholder.svg?height=200&width=400",
          },
        ]
        setProjects(mockProjects)

        // For demo purposes, set some stats
        setStats({
          totalEvents: 12,
          totalProjects: 5,
          totalParticipants: 248,
          totalImpact: 3750,
        })
      } catch (error) {
        console.error("Error setting up mock dashboard data:", error)
        toast({
          title: "Error",
          description: "Failed to load dashboard data. Please try again.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchDashboardData()
  }, [user, toast])

  if (isLoading) {
    return <DashboardSkeleton />
  }

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Organization Dashboard</h2>
          <div className="flex items-center gap-2">
            <Button className="bg-emerald-600 hover:bg-emerald-700">
              <Plus className="mr-2 h-4 w-4" /> Create Project
            </Button>
            <Button variant="outline">
              <Plus className="mr-2 h-4 w-4" /> Create Event
            </Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Events</CardTitle>
              <Calendar className="h-4 w-4 text-emerald-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalEvents}</div>
              <p className="text-xs text-muted-foreground">+3 from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
              <Recycle className="h-4 w-4 text-emerald-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalProjects}</div>
              <p className="text-xs text-muted-foreground">+1 from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Participants</CardTitle>
              <Users className="h-4 w-4 text-emerald-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalParticipants}</div>
              <p className="text-xs text-muted-foreground">+42 from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Environmental Impact</CardTitle>
              <BarChart3 className="h-4 w-4 text-emerald-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalImpact} points</div>
              <p className="text-xs text-muted-foreground">+15% from last month</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Impact Overview</CardTitle>
            <CardDescription>Your organization's environmental contribution</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Carbon Footprint Reduction</span>
                  <span className="font-medium">68%</span>
                </div>
                <Progress value={68} className="h-2 bg-emerald-100" indicatorClassName="bg-emerald-600" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Waste Management</span>
                  <span className="font-medium">42%</span>
                </div>
                <Progress value={42} className="h-2 bg-emerald-100" indicatorClassName="bg-emerald-600" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Renewable Energy Adoption</span>
                  <span className="font-medium">75%</span>
                </div>
                <Progress value={75} className="h-2 bg-emerald-100" indicatorClassName="bg-emerald-600" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Community Engagement</span>
                  <span className="font-medium">89%</span>
                </div>
                <Progress value={89} className="h-2 bg-emerald-100" indicatorClassName="bg-emerald-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="events" className="space-y-4">
          <TabsList>
            <TabsTrigger value="events">Your Events</TabsTrigger>
            <TabsTrigger value="projects">Your Projects</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>
          <TabsContent value="events" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Recent Events</h3>
              <Button variant="outline" size="sm">
                View All
              </Button>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {events.length > 0 ? (
                events.slice(0, 3).map((event) => (
                  <EventCard
                    key={event._id}
                    title={event.title}
                    date={new Date(event.date).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                    location={event.location}
                    organizer={event.creatorName}
                    attendees={event.attendees?.length || 0}
                    points={event.points}
                    imageUrl={event.image || "/placeholder.svg?height=200&width=400"}
                  />
                ))
              ) : (
                <div className="col-span-3 text-center py-10">
                  <p className="text-muted-foreground">No events created yet.</p>
                  <Button className="mt-4 bg-emerald-600 hover:bg-emerald-700">
                    <Plus className="mr-2 h-4 w-4" /> Create Your First Event
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>
          <TabsContent value="projects" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Active Projects</h3>
              <Button variant="outline" size="sm">
                View All
              </Button>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {projects.length > 0 ? (
                projects.slice(0, 3).map((project) => (
                  <ProjectCard
                    key={project._id}
                    title={project.title}
                    organization={project.organizationName}
                    deadline={
                      project.deadline === "Ongoing"
                        ? "Ongoing"
                        : new Date(project.deadline).toLocaleDateString("en-US", {
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                          })
                    }
                    progress={project.progress}
                    contributors={project.contributors?.length || 0}
                    points={project.points}
                    imageUrl={project.image || "/placeholder.svg?height=200&width=400"}
                  />
                ))
              ) : (
                <div className="col-span-3 text-center py-10">
                  <p className="text-muted-foreground">No projects created yet.</p>
                  <Button className="mt-4 bg-emerald-600 hover:bg-emerald-700">
                    <Plus className="mr-2 h-4 w-4" /> Create Your First Project
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>
          <TabsContent value="analytics" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Engagement Analytics</CardTitle>
                <CardDescription>Participation trends and impact metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center border rounded-md bg-muted/20">
                  <div className="text-center">
                    <LineChart className="mx-auto h-10 w-10 text-muted-foreground" />
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

        <Skeleton className="h-64 w-full" />

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
