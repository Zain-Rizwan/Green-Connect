import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar, Heart, MapPin, MessageCircle, Search, Share2, ThumbsUp, User } from "lucide-react"
import Image from "next/image"

export default function CommunityPage() {
  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Community</h2>
          <Button className="bg-emerald-600 hover:bg-emerald-700">Create Post</Button>
        </div>

        <div className="flex items-center space-x-2">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search community posts..." className="max-w-md" />
        </div>

        <Tabs defaultValue="feed" className="space-y-4">
          <TabsList>
            <TabsTrigger value="feed">Feed</TabsTrigger>
            <TabsTrigger value="discover">Discover</TabsTrigger>
            <TabsTrigger value="connections">Connections</TabsTrigger>
          </TabsList>
          <TabsContent value="feed" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-[2fr_1fr]">
              <div className="space-y-4">
                {[
                  {
                    user: "Sarah Johnson",
                    avatar: "/placeholder.svg?height=40&width=40",
                    rank: "Climate Champion",
                    time: "2 hours ago",
                    content:
                      "Just finished leading our beach cleanup event! We collected over 200 pounds of plastic waste. So proud of our amazing volunteers! #OceanConservation #BeachCleanup",
                    image: "/placeholder.svg?height=300&width=600",
                    likes: 42,
                    comments: 8,
                    shares: 5,
                  },
                  {
                    user: "Green City Initiative",
                    avatar: "/placeholder.svg?height=40&width=40",
                    rank: "Organization",
                    time: "5 hours ago",
                    content:
                      "Our urban tree planting project is now open for volunteers! Join us this Saturday as we work to make our city greener and healthier. Sign up through the Events tab. #TreePlanting #UrbanGreening",
                    image: null,
                    likes: 28,
                    comments: 12,
                    shares: 15,
                  },
                  {
                    user: "Michael Chen",
                    avatar: "/placeholder.svg?height=40&width=40",
                    rank: "Eco Hero",
                    time: "Yesterday",
                    content:
                      "Check out my new solar panel installation! Excited to be generating my own renewable energy and reducing my carbon footprint. Happy to answer any questions if you're considering making the switch. #RenewableEnergy #SolarPower",
                    image: "/placeholder.svg?height=300&width=600",
                    likes: 56,
                    comments: 23,
                    shares: 7,
                  },
                ].map((post, index) => (
                  <Card key={index}>
                    <CardHeader className="p-4 pb-2">
                      <div className="flex items-start gap-3">
                        <Avatar>
                          <AvatarImage src={post.avatar || "/placeholder.svg"} alt={post.user} />
                          <AvatarFallback>{post.user.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center gap-2">
                            <CardTitle className="text-base">{post.user}</CardTitle>
                            <Badge variant="outline" className="bg-emerald-50 text-emerald-700 hover:bg-emerald-100">
                              {post.rank}
                            </Badge>
                          </div>
                          <CardDescription>{post.time}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-4 pt-2">
                      <p className="mb-3">{post.content}</p>
                      {post.image && (
                        <div className="relative w-full h-64 rounded-md overflow-hidden">
                          <Image
                            src={post.image || "/placeholder.svg"}
                            alt="Post image"
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}
                    </CardContent>
                    <CardFooter className="p-4 pt-0 flex justify-between">
                      <div className="flex gap-4">
                        <Button variant="ghost" size="sm" className="flex items-center gap-1">
                          <ThumbsUp className="h-4 w-4" />
                          <span>{post.likes}</span>
                        </Button>
                        <Button variant="ghost" size="sm" className="flex items-center gap-1">
                          <MessageCircle className="h-4 w-4" />
                          <span>{post.comments}</span>
                        </Button>
                        <Button variant="ghost" size="sm" className="flex items-center gap-1">
                          <Share2 className="h-4 w-4" />
                          <span>{post.shares}</span>
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </div>

              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Upcoming Events</CardTitle>
                    <CardDescription>Events in your area</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {[
                      {
                        title: "Beach Cleanup Drive",
                        date: "May 15, 2025",
                        location: "Sunset Beach",
                      },
                      {
                        title: "Urban Tree Planting",
                        date: "May 22, 2025",
                        location: "Central Park",
                      },
                      {
                        title: "Recycling Workshop",
                        date: "June 5, 2025",
                        location: "Community Center",
                      },
                    ].map((event, index) => (
                      <div key={index} className="flex items-start gap-3 p-2 rounded-lg hover:bg-muted">
                        <div className="w-10 h-10 rounded-md bg-emerald-100 flex items-center justify-center">
                          <Calendar className="h-5 w-5 text-emerald-600" />
                        </div>
                        <div>
                          <h4 className="font-medium">{event.title}</h4>
                          <p className="text-sm text-muted-foreground">{event.date}</p>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                            <MapPin className="h-3 w-3" />
                            <span>{event.location}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      View All Events
                    </Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Suggested Connections</CardTitle>
                    <CardDescription>People with similar interests</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {[
                      {
                        name: "Emily Wilson",
                        avatar: "/placeholder.svg?height=40&width=40",
                        rank: "Eco Hero",
                        interests: ["Ocean Conservation", "Renewable Energy"],
                      },
                      {
                        name: "David Kim",
                        avatar: "/placeholder.svg?height=40&width=40",
                        rank: "Green Advocate",
                        interests: ["Tree Planting", "Sustainable Living"],
                      },
                      {
                        name: "Olivia Martinez",
                        avatar: "/placeholder.svg?height=40&width=40",
                        rank: "Green Advocate",
                        interests: ["Recycling", "Zero Waste"],
                      },
                    ].map((person, index) => (
                      <div key={index} className="flex items-start gap-3 p-2 rounded-lg hover:bg-muted">
                        <Avatar>
                          <AvatarImage src={person.avatar || "/placeholder.svg"} alt={person.name} />
                          <AvatarFallback>{person.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <h4 className="font-medium">{person.name}</h4>
                          <p className="text-sm text-muted-foreground">{person.rank}</p>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {person.interests.map((interest, i) => (
                              <Badge key={i} variant="outline" className="text-xs bg-emerald-50 text-emerald-700">
                                {interest}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">
                          <User className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      View More
                    </Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Trending Topics</CardTitle>
                    <CardDescription>Popular discussions in the community</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {[
                        "BeachCleanup",
                        "RenewableEnergy",
                        "TreePlanting",
                        "ZeroWaste",
                        "SustainableLiving",
                        "ClimateAction",
                        "BiodiversityMatters",
                        "GreenTech",
                        "WaterConservation",
                        "PlasticFree",
                      ].map((topic, index) => (
                        <Badge key={index} className="bg-emerald-100 text-emerald-800 hover:bg-emerald-200">
                          #{topic}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="discover" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Discover EcoWarriors</CardTitle>
                <CardDescription>Find and connect with other sustainability enthusiasts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {[
                    {
                      name: "Emily Wilson",
                      avatar: "/placeholder.svg?height=80&width=80",
                      rank: "Eco Hero",
                      location: "Portland, OR",
                      interests: ["Ocean Conservation", "Renewable Energy", "Sustainable Living"],
                    },
                    {
                      name: "David Kim",
                      avatar: "/placeholder.svg?height=80&width=80",
                      rank: "Green Advocate",
                      location: "Chicago, IL",
                      interests: ["Tree Planting", "Sustainable Living", "Urban Farming"],
                    },
                    {
                      name: "Olivia Martinez",
                      avatar: "/placeholder.svg?height=80&width=80",
                      rank: "Green Advocate",
                      location: "Miami, FL",
                      interests: ["Recycling", "Zero Waste", "Marine Conservation"],
                    },
                    {
                      name: "James Taylor",
                      avatar: "/placeholder.svg?height=80&width=80",
                      rank: "Green Advocate",
                      location: "Denver, CO",
                      interests: ["Renewable Energy", "Sustainable Transportation", "Climate Policy"],
                    },
                    {
                      name: "Sophia Lee",
                      avatar: "/placeholder.svg?height=80&width=80",
                      rank: "Green Advocate",
                      location: "Seattle, WA",
                      interests: ["Wildlife Conservation", "Sustainable Fashion", "Veganism"],
                    },
                    {
                      name: "Noah Garcia",
                      avatar: "/placeholder.svg?height=80&width=80",
                      rank: "Green Advocate",
                      location: "Austin, TX",
                      interests: ["Green Technology", "Solar Energy", "Water Conservation"],
                    },
                  ].map((person, index) => (
                    <Card key={index} className="overflow-hidden">
                      <div className="p-4 flex flex-col items-center text-center">
                        <Avatar className="w-20 h-20 mb-3">
                          <AvatarImage src={person.avatar || "/placeholder.svg"} alt={person.name} />
                          <AvatarFallback>{person.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <h3 className="font-bold text-lg">{person.name}</h3>
                        <Badge variant="outline" className="mb-2 bg-emerald-50 text-emerald-700">
                          {person.rank}
                        </Badge>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground mb-3">
                          <MapPin className="h-3 w-3" />
                          <span>{person.location}</span>
                        </div>
                        <div className="flex flex-wrap gap-1 justify-center mb-4">
                          {person.interests.map((interest, i) => (
                            <Badge key={i} variant="secondary" className="text-xs">
                              {interest}
                            </Badge>
                          ))}
                        </div>
                        <Button className="w-full bg-emerald-600 hover:bg-emerald-700">Connect</Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="connections" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Your Connections</CardTitle>
                <CardDescription>People you've connected with</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      name: "Sarah Johnson",
                      avatar: "/placeholder.svg?height=40&width=40",
                      rank: "Climate Champion",
                      lastActive: "Active now",
                      mutualConnections: 12,
                    },
                    {
                      name: "Michael Chen",
                      avatar: "/placeholder.svg?height=40&width=40",
                      rank: "Eco Hero",
                      lastActive: "2 hours ago",
                      mutualConnections: 8,
                    },
                    {
                      name: "Ocean Guardians",
                      avatar: "/placeholder.svg?height=40&width=40",
                      rank: "Organization",
                      lastActive: "1 day ago",
                      mutualConnections: 24,
                    },
                    {
                      name: "Alex Rivera",
                      avatar: "/placeholder.svg?height=40&width=40",
                      rank: "Eco Hero",
                      lastActive: "3 days ago",
                      mutualConnections: 5,
                    },
                  ].map((connection, index) => (
                    <div key={index} className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted">
                      <Avatar>
                        <AvatarImage src={connection.avatar || "/placeholder.svg"} alt={connection.name} />
                        <AvatarFallback>{connection.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium">{connection.name}</h4>
                          <Badge variant="outline" className="bg-emerald-50 text-emerald-700">
                            {connection.rank}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <p className="text-sm text-muted-foreground">{connection.lastActive}</p>
                          <p className="text-xs text-muted-foreground">
                            {connection.mutualConnections} mutual connections
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon">
                          <MessageCircle className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Heart className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  View All Connections
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
