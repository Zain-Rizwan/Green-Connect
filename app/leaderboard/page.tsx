import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Award, Building2, Calendar, Filter, Leaf, Medal, Trophy, User } from "lucide-react"
import Image from "next/image"

export default function LeaderboardPage() {
  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Leaderboard</h2>
          <div className="flex items-center gap-2">
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Time Period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Time</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="day">Today</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card className="bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-950 dark:to-yellow-950 border-amber-200 dark:border-amber-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-center">Top EcoWarrior</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <Trophy className="h-10 w-10 text-amber-500 mb-2" />
              <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-amber-200">
                <Image src="/placeholder.svg?height=96&width=96" alt="Top EcoWarrior" fill className="object-cover" />
              </div>
              <h3 className="text-xl font-bold mt-2">Sarah Johnson</h3>
              <p className="text-sm text-muted-foreground">Climate Champion</p>
              <div className="flex items-center gap-1 mt-1">
                <Leaf className="h-4 w-4 text-emerald-600" />
                <span className="font-medium">2,450 points</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-slate-50 to-gray-50 dark:from-slate-950 dark:to-gray-950 border-slate-200 dark:border-slate-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-center">Runner Up</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <Medal className="h-8 w-8 text-slate-500 mb-2" />
              <div className="relative w-20 h-20 rounded-full overflow-hidden border-4 border-slate-200">
                <Image src="/placeholder.svg?height=80&width=80" alt="Runner Up" fill className="object-cover" />
              </div>
              <h3 className="text-lg font-bold mt-2">Michael Chen</h3>
              <p className="text-sm text-muted-foreground">Eco Hero</p>
              <div className="flex items-center gap-1 mt-1">
                <Leaf className="h-4 w-4 text-emerald-600" />
                <span className="font-medium">2,120 points</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-950 dark:to-amber-950 border-orange-200 dark:border-orange-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-center">Third Place</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <Award className="h-8 w-8 text-orange-500 mb-2" />
              <div className="relative w-20 h-20 rounded-full overflow-hidden border-4 border-orange-200">
                <Image src="/placeholder.svg?height=80&width=80" alt="Third Place" fill className="object-cover" />
              </div>
              <h3 className="text-lg font-bold mt-2">Alex Rivera</h3>
              <p className="text-sm text-muted-foreground">Eco Hero</p>
              <div className="flex items-center gap-1 mt-1">
                <Leaf className="h-4 w-4 text-emerald-600" />
                <span className="font-medium">1,980 points</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="individuals" className="space-y-4">
          <TabsList>
            <TabsTrigger value="individuals">Individuals</TabsTrigger>
            <TabsTrigger value="organizations">Organizations</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
          </TabsList>
          <TabsContent value="individuals" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Top EcoWarriors</CardTitle>
                <CardDescription>Individuals making the biggest environmental impact</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "Sarah Johnson", rank: "Climate Champion", points: 2450, position: 1 },
                    { name: "Michael Chen", rank: "Eco Hero", points: 2120, position: 2 },
                    { name: "Alex Rivera", rank: "Eco Hero", points: 1980, position: 3 },
                    { name: "Emily Wilson", rank: "Eco Hero", points: 1845, position: 4 },
                    { name: "David Kim", rank: "Green Advocate", points: 1720, position: 5 },
                    { name: "Olivia Martinez", rank: "Green Advocate", points: 1690, position: 6 },
                    { name: "James Taylor", rank: "Green Advocate", points: 1580, position: 7 },
                    { name: "Sophia Lee", rank: "Green Advocate", points: 1520, position: 8 },
                    { name: "Noah Garcia", rank: "Green Advocate", points: 1480, position: 9 },
                    { name: "Ava Thompson", rank: "Green Advocate", points: 1420, position: 10 },
                  ].map((user, index) => (
                    <div key={index} className="flex items-center gap-4 p-2 rounded-lg hover:bg-muted">
                      <div className="w-8 h-8 flex items-center justify-center font-bold">{user.position}</div>
                      <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
                        <User className="h-5 w-5 text-emerald-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">{user.name}</h4>
                        <p className="text-sm text-muted-foreground">{user.rank}</p>
                      </div>
                      <div className="flex items-center gap-1">
                        <Leaf className="h-4 w-4 text-emerald-600" />
                        <span className="font-medium">{user.points} points</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="organizations" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Top Organizations</CardTitle>
                <CardDescription>Organizations leading sustainability initiatives</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "Ocean Guardians", type: "NGO", points: 12450, position: 1 },
                    { name: "Green City Initiative", type: "NGO", points: 10820, position: 2 },
                    { name: "EcoTech Solutions", type: "Business", points: 9780, position: 3 },
                    { name: "Wildlife Alliance", type: "NGO", points: 8645, position: 4 },
                    { name: "Sustainable Futures", type: "Business", points: 7920, position: 5 },
                    { name: "Waste Warriors", type: "NGO", points: 7690, position: 6 },
                    { name: "Clean Energy Partners", type: "Business", points: 6580, position: 7 },
                    { name: "Urban Farmers", type: "NGO", points: 6320, position: 8 },
                    { name: "Forest Protectors", type: "NGO", points: 5980, position: 9 },
                    { name: "Eco Innovations", type: "Business", points: 5720, position: 10 },
                  ].map((org, index) => (
                    <div key={index} className="flex items-center gap-4 p-2 rounded-lg hover:bg-muted">
                      <div className="w-8 h-8 flex items-center justify-center font-bold">{org.position}</div>
                      <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
                        <Building2 className="h-5 w-5 text-emerald-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">{org.name}</h4>
                        <p className="text-sm text-muted-foreground">{org.type}</p>
                      </div>
                      <div className="flex items-center gap-1">
                        <Leaf className="h-4 w-4 text-emerald-600" />
                        <span className="font-medium">{org.points} points</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="events" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Most Impactful Events</CardTitle>
                <CardDescription>Events that made the biggest environmental difference</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      name: "Annual Coastal Cleanup",
                      organizer: "Ocean Guardians",
                      participants: 245,
                      impact: "5.2 tons of waste collected",
                      position: 1,
                    },
                    {
                      name: "City-wide Tree Planting",
                      organizer: "Green City Initiative",
                      participants: 180,
                      impact: "1,200 trees planted",
                      position: 2,
                    },
                    {
                      name: "Renewable Energy Fair",
                      organizer: "EcoTech Solutions",
                      participants: 320,
                      impact: "150 solar panel installations",
                      position: 3,
                    },
                    {
                      name: "Wildlife Habitat Restoration",
                      organizer: "Wildlife Alliance",
                      participants: 95,
                      impact: "10 acres restored",
                      position: 4,
                    },
                    {
                      name: "Sustainable Food Festival",
                      organizer: "Sustainable Futures",
                      participants: 450,
                      impact: "2,000 people educated",
                      position: 5,
                    },
                    {
                      name: "Zero Waste Challenge",
                      organizer: "Waste Warriors",
                      participants: 280,
                      impact: "30% reduction in waste",
                      position: 6,
                    },
                    {
                      name: "Clean Energy Workshop",
                      organizer: "Clean Energy Partners",
                      participants: 120,
                      impact: "75 home energy audits",
                      position: 7,
                    },
                    {
                      name: "Community Garden Project",
                      organizer: "Urban Farmers",
                      participants: 85,
                      impact: "5 gardens established",
                      position: 8,
                    },
                    {
                      name: "Forest Conservation Day",
                      organizer: "Forest Protectors",
                      participants: 110,
                      impact: "15 acres protected",
                      position: 9,
                    },
                    {
                      name: "Green Innovation Hackathon",
                      organizer: "Eco Innovations",
                      participants: 150,
                      impact: "12 sustainable solutions",
                      position: 10,
                    },
                  ].map((event, index) => (
                    <div key={index} className="flex items-center gap-4 p-2 rounded-lg hover:bg-muted">
                      <div className="w-8 h-8 flex items-center justify-center font-bold">{event.position}</div>
                      <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
                        <Calendar className="h-5 w-5 text-emerald-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">{event.name}</h4>
                        <p className="text-sm text-muted-foreground">By {event.organizer}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium">{event.participants} participants</div>
                        <p className="text-xs text-muted-foreground">{event.impact}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Card>
          <CardHeader>
            <CardTitle>Your Ranking</CardTitle>
            <CardDescription>Your current position and progress</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4 p-4 rounded-lg bg-emerald-50 dark:bg-emerald-900/20">
              <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
                <User className="h-5 w-5 text-emerald-600" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium">Jane Smith</h4>
                <p className="text-sm text-muted-foreground">Eco Hero • 1,250 points</p>
              </div>
              <div className="text-center px-4 py-2 bg-white dark:bg-gray-800 rounded-md shadow-sm">
                <div className="text-2xl font-bold">#42</div>
                <p className="text-xs text-muted-foreground">Your Rank</p>
              </div>
              <div className="text-center">
                <div className="text-sm font-medium">+5 positions</div>
                <p className="text-xs text-muted-foreground">This month</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
