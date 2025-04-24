import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { UserRankCard } from "@/components/user-rank-card"
import { EventCard } from "@/components/event-card"
import { ProjectCard } from "@/components/project-card"
import { Award, Calendar, Edit, Leaf, MapPin, Recycle, User, TreePine } from "lucide-react"
import Image from "next/image"

export default function ProfilePage() {
  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">My Profile</h2>
          <Button variant="outline" size="icon">
            <Edit className="h-4 w-4" />
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-[300px_1fr]">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col items-center space-y-4">
                <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-emerald-200">
                  <Image src="/placeholder.svg?height=128&width=128" alt="Profile" fill className="object-cover" />
                </div>
                <div className="text-center">
                  <h3 className="text-2xl font-bold">Jane Smith</h3>
                  <p className="text-muted-foreground">@ecowarrior_jane</p>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-emerald-600" />
                  <span className="font-medium text-emerald-700">Eco Hero</span>
                </div>
                <div className="flex flex-wrap gap-2 justify-center">
                  <Badge variant="outline" className="bg-emerald-50 text-emerald-700 hover:bg-emerald-100">
                    Tree Planting
                  </Badge>
                  <Badge variant="outline" className="bg-emerald-50 text-emerald-700 hover:bg-emerald-100">
                    Beach Cleanup
                  </Badge>
                  <Badge variant="outline" className="bg-emerald-50 text-emerald-700 hover:bg-emerald-100">
                    Recycling
                  </Badge>
                  <Badge variant="outline" className="bg-emerald-50 text-emerald-700 hover:bg-emerald-100">
                    Renewable Energy
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <UserRankCard
              name="Jane Smith"
              points={1250}
              rank="Eco Hero"
              nextRank="Climate Champion"
              pointsToNextRank={750}
            />

            <Card>
              <CardHeader>
                <CardTitle>About Me</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  Passionate environmentalist dedicated to making a positive impact on our planet. I believe in the
                  power of community action and sustainable living. When I'm not participating in eco-events, I enjoy
                  hiking and wildlife photography.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-emerald-600" />
                    <span>Member since May 2024</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-emerald-600" />
                    <span>San Francisco, CA</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Leaf className="h-4 w-4 text-emerald-600" />
                    <span>1,250 Green Points</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-emerald-600" />
                    <span>12 Events Attended</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <Tabs defaultValue="activity" className="space-y-4">
          <TabsList>
            <TabsTrigger value="activity">Activity</TabsTrigger>
            <TabsTrigger value="badges">Badges & Achievements</TabsTrigger>
            <TabsTrigger value="impact">Environmental Impact</TabsTrigger>
          </TabsList>
          <TabsContent value="activity" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <EventCard
                title="Beach Cleanup Drive"
                date="April 15, 2025"
                location="Sunset Beach"
                organizer="Ocean Guardians"
                attendees={42}
                points={150}
                imageUrl="/placeholder.svg?height=200&width=400"
              />
              <ProjectCard
                title="Solar Panel Installation"
                organization="Renewable Energy Co."
                deadline="June 30, 2025"
                progress={65}
                contributors={18}
                points={500}
                imageUrl="/placeholder.svg?height=200&width=400"
              />
              <EventCard
                title="Urban Tree Planting"
                date="March 22, 2025"
                location="Central Park"
                organizer="Green City Initiative"
                attendees={28}
                points={200}
                imageUrl="/placeholder.svg?height=200&width=400"
              />
            </div>
          </TabsContent>
          <TabsContent value="badges" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Badges & Achievements</CardTitle>
                <CardDescription>Recognitions earned through your environmental contributions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { name: "Beach Guardian", description: "Participated in 5 beach cleanup events", icon: "🌊" },
                    { name: "Tree Planter", description: "Planted 25+ trees in urban areas", icon: "🌳" },
                    { name: "Waste Warrior", description: "Contributed to recycling initiatives", icon: "♻️" },
                    { name: "Energy Innovator", description: "Supported renewable energy projects", icon: "⚡" },
                    { name: "Community Leader", description: "Organized 3 sustainability events", icon: "👥" },
                    { name: "Water Protector", description: "Participated in water conservation", icon: "💧" },
                    { name: "Wildlife Defender", description: "Supported habitat restoration", icon: "🦋" },
                    { name: "Carbon Reducer", description: "Reduced carbon footprint significantly", icon: "🍃" },
                  ].map((badge, index) => (
                    <div
                      key={index}
                      className="flex flex-col items-center text-center p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg"
                    >
                      <div className="text-4xl mb-2">{badge.icon}</div>
                      <h4 className="font-medium text-sm">{badge.name}</h4>
                      <p className="text-xs text-muted-foreground mt-1">{badge.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="impact" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Environmental Impact</CardTitle>
                <CardDescription>Your contribution to a sustainable future</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-3">
                  <div className="flex flex-col items-center p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
                    <Recycle className="h-10 w-10 text-emerald-600 mb-2" />
                    <h3 className="text-2xl font-bold">250 kg</h3>
                    <p className="text-sm text-center text-muted-foreground">Waste Recycled</p>
                  </div>
                  <div className="flex flex-col items-center p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
                    <TreePine className="h-10 w-10 text-emerald-600 mb-2" />
                    <h3 className="text-2xl font-bold">35</h3>
                    <p className="text-sm text-center text-muted-foreground">Trees Planted</p>
                  </div>
                  <div className="flex flex-col items-center p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
                    <Leaf className="h-10 w-10 text-emerald-600 mb-2" />
                    <h3 className="text-2xl font-bold">1.2 tons</h3>
                    <p className="text-sm text-center text-muted-foreground">CO₂ Emissions Saved</p>
                  </div>
                </div>

                <div className="mt-6">
                  <h4 className="font-medium mb-2">Impact Breakdown</h4>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-emerald-600"></div>
                      <span>Participated in 12 community cleanup events</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-emerald-600"></div>
                      <span>Contributed to 5 renewable energy projects</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-emerald-600"></div>
                      <span>Helped establish 2 community gardens</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-emerald-600"></div>
                      <span>Educated 50+ people on sustainable practices</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
