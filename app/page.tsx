import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Award, Calendar, Leaf, Recycle, Users } from "lucide-react"
import { EventCard } from "@/components/event-card"
import { ProjectCard } from "@/components/project-card"
import { UserRankCard } from "@/components/user-rank-card"

export default function Dashboard() {
  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <div className="flex items-center gap-2">
            <Button className="bg-emerald-600 hover:bg-emerald-700">Create Event</Button>
          </div>
        </div>

        <UserRankCard
          name="Jane Smith"
          points={1250}
          rank="Eco Hero"
          nextRank="Climate Champion"
          pointsToNextRank={750}
        />

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Green Points</CardTitle>
              <Leaf className="h-4 w-4 text-emerald-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,250</div>
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
              <EventCard
                title="Beach Cleanup Drive"
                date="May 15, 2025"
                location="Sunset Beach"
                organizer="Ocean Guardians"
                attendees={42}
                points={150}
                imageUrl="/placeholder.svg?height=200&width=400"
              />
              <EventCard
                title="Urban Tree Planting"
                date="May 22, 2025"
                location="Central Park"
                organizer="Green City Initiative"
                attendees={28}
                points={200}
                imageUrl="/placeholder.svg?height=200&width=400"
              />
              <EventCard
                title="Recycling Workshop"
                date="June 5, 2025"
                location="Community Center"
                organizer="Waste Warriors"
                attendees={35}
                points={100}
                imageUrl="/placeholder.svg?height=200&width=400"
              />
            </div>
          </TabsContent>
          <TabsContent value="active" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <ProjectCard
                title="Solar Panel Installation"
                organization="Renewable Energy Co."
                deadline="June 30, 2025"
                progress={65}
                contributors={18}
                points={500}
                imageUrl="/placeholder.svg?height=200&width=400"
              />
              <ProjectCard
                title="Community Garden"
                organization="Urban Farmers"
                deadline="Ongoing"
                progress={42}
                contributors={24}
                points={350}
                imageUrl="/placeholder.svg?height=200&width=400"
              />
              <ProjectCard
                title="Plastic-Free Initiative"
                organization="Zero Waste Alliance"
                deadline="July 15, 2025"
                progress={28}
                contributors={32}
                points={450}
                imageUrl="/placeholder.svg?height=200&width=400"
              />
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
