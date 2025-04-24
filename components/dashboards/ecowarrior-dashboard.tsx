"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Award, Calendar, Leaf, Recycle, Users } from "lucide-react"
import { EventCard } from "@/components/event-card"
import { ProjectCard } from "@/components/project-card"
import { UserRankCard } from "@/components/user-rank-card"
import { useAuth } from "@/components/auth-provider"
import { Skeleton } from "@/components/ui/skeleton"
import { useToast } from "@/components/ui/use-toast"

interface UserPointsData {
  points: number
  rank: string
  nextRank: string | null
  pointsToNextRank: number
}

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

export function EcoWarriorDashboard() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [pointsData, setPointsData] = useState<UserPointsData | null>(null)
  const [events, setEvents] = useState<Event[]>([])
  const [projects, setProjects] = useState<Project[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchDashboardData = async () => {
      setIsLoading(true)
      try {
        // Instead of fetching from API endpoints, use mock data
        // Mock user points data
        const mockPointsData = {
          points: 1250,
          rank: "Eco Hero",
          nextRank: "Climate Champion",
          pointsToNextRank: 750,
        }
        setPointsData(mockPointsData)

        // Mock upcoming events
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

        // Mock active projects
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
  }, [toast])

  if (isLoading) {
    return <DashboardSkeleton />
  }

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Welcome, {user?.name}</h2>
          <div className="flex items-center gap-2">
            <Button className="bg-emerald-600 hover:bg-emerald-700">Create Event</Button>
          </div>
        </div>

        {pointsData && (
          <UserRankCard
            name={user?.name || ""}
            points={pointsData.points}
            rank={pointsData.rank}
            nextRank={pointsData.nextRank || ""}
            pointsToNextRank={pointsData.pointsToNextRank}
          />
        )}

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Green Points</CardTitle>
              <Leaf className="h-4 w-4 text-emerald-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pointsData?.points || 0}</div>
              <p className="text-xs text-muted-foreground">+350 from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Events Joined</CardTitle>
              <Calendar className="h-4 w-4 text-emerald-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">+3 from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Projects Contributed</CardTitle>
              <Recycle className="h-4 w-4 text-emerald-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5</div>
              <p className="text-xs text-muted-foreground">+1 from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Community Rank</CardTitle>
              <Award className="h-4 w-4 text-emerald-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">#42</div>
              <p className="text-xs text-muted-foreground">Up 5 positions</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="upcoming" className="space-y-4">
          <TabsList>
            <TabsTrigger value="upcoming">Upcoming Events</TabsTrigger>
            <TabsTrigger value="active">Active Projects</TabsTrigger>
            <TabsTrigger value="community">Community</TabsTrigger>
          </TabsList>
          <TabsContent value="upcoming" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {events.length > 0 ? (
                events.map((event) => (
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
                  <p className="text-muted-foreground">No upcoming events found.</p>
                  <Button className="mt-4 bg-emerald-600 hover:bg-emerald-700">Create an Event</Button>
                </div>
              )}
            </div>
          </TabsContent>
          <TabsContent value="active" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {projects.length > 0 ? (
                projects.map((project) => (
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
                  <p className="text-muted-foreground">No active projects found.</p>
                  <Button className="mt-4 bg-emerald-600 hover:bg-emerald-700">Browse Projects</Button>
                </div>
              )}
            </div>
          </TabsContent>
          <TabsContent value="community" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Active EcoWarriors</CardTitle>
                <CardDescription>Connect with other sustainability enthusiasts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="flex items-center gap-4 p-2 rounded-lg hover:bg-muted">
                      <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
                        <Users className="h-5 w-5 text-emerald-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">EcoWarrior {i}</h4>
                        <p className="text-sm text-muted-foreground">Eco Hero • 1,{i}00 points</p>
                      </div>
                      <Button variant="outline" size="sm">
                        Connect
                      </Button>
                    </div>
                  ))}
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
