import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, MapPin, Search, Users } from "lucide-react"
import Image from "next/image"

export default function OrganizationsPage() {
  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Organizations</h2>
          <Button variant="outline">Register Organization</Button>
        </div>

        <div className="flex items-center space-x-2">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search organizations..." className="max-w-md" />
        </div>

        <Tabs defaultValue="all" className="space-y-4">
          <TabsList>
            <TabsTrigger value="all">All Organizations</TabsTrigger>
            <TabsTrigger value="businesses">Businesses</TabsTrigger>
            <TabsTrigger value="ngos">NGOs</TabsTrigger>
            <TabsTrigger value="following">Following</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  name: "Ocean Guardians",
                  type: "NGO",
                  location: "San Francisco, CA",
                  followers: 1250,
                  focus: ["Ocean Conservation", "Beach Cleanup", "Marine Life"],
                  image: "/placeholder.svg?height=80&width=80",
                },
                {
                  name: "Green City Initiative",
                  type: "NGO",
                  location: "Portland, OR",
                  followers: 980,
                  focus: ["Urban Greening", "Tree Planting", "Sustainable Cities"],
                  image: "/placeholder.svg?height=80&width=80",
                },
                {
                  name: "EcoTech Solutions",
                  type: "Business",
                  location: "Austin, TX",
                  followers: 750,
                  focus: ["Renewable Energy", "Green Technology", "Sustainable Products"],
                  image: "/placeholder.svg?height=80&width=80",
                },
                {
                  name: "Waste Warriors",
                  type: "NGO",
                  location: "Seattle, WA",
                  followers: 620,
                  focus: ["Recycling", "Zero Waste", "Plastic Reduction"],
                  image: "/placeholder.svg?height=80&width=80",
                },
                {
                  name: "Sustainable Futures",
                  type: "Business",
                  location: "Denver, CO",
                  followers: 890,
                  focus: ["Sustainable Agriculture", "Organic Farming", "Food Systems"],
                  image: "/placeholder.svg?height=80&width=80",
                },
                {
                  name: "Wildlife Alliance",
                  type: "NGO",
                  location: "Boise, ID",
                  followers: 1100,
                  focus: ["Wildlife Conservation", "Habitat Restoration", "Biodiversity"],
                  image: "/placeholder.svg?height=80&width=80",
                },
              ].map((org, index) => (
                <Card key={index}>
                  <CardHeader className="flex flex-row items-start gap-4 space-y-0">
                    <div className="relative w-16 h-16 rounded-md overflow-hidden">
                      <Image src={org.image || "/placeholder.svg"} alt={org.name} fill className="object-cover" />
                    </div>
                    <div className="space-y-1">
                      <CardTitle>{org.name}</CardTitle>
                      <CardDescription>
                        <Badge variant="outline" className="mr-1">
                          {org.type}
                        </Badge>
                      </CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="h-4 w-4 text-emerald-600" />
                        <span>{org.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Users className="h-4 w-4 text-emerald-600" />
                        <span>{org.followers} followers</span>
                      </div>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {org.focus.map((tag, i) => (
                          <Badge
                            key={i}
                            variant="secondary"
                            className="bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline">Follow</Button>
                    <Button variant="ghost" size="icon">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="businesses" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  name: "EcoTech Solutions",
                  type: "Business",
                  location: "Austin, TX",
                  followers: 750,
                  focus: ["Renewable Energy", "Green Technology", "Sustainable Products"],
                  image: "/placeholder.svg?height=80&width=80",
                },
                {
                  name: "Sustainable Futures",
                  type: "Business",
                  location: "Denver, CO",
                  followers: 890,
                  focus: ["Sustainable Agriculture", "Organic Farming", "Food Systems"],
                  image: "/placeholder.svg?height=80&width=80",
                },
              ].map((org, index) => (
                <Card key={index}>
                  <CardHeader className="flex flex-row items-start gap-4 space-y-0">
                    <div className="relative w-16 h-16 rounded-md overflow-hidden">
                      <Image src={org.image || "/placeholder.svg"} alt={org.name} fill className="object-cover" />
                    </div>
                    <div className="space-y-1">
                      <CardTitle>{org.name}</CardTitle>
                      <CardDescription>
                        <Badge variant="outline" className="mr-1">
                          {org.type}
                        </Badge>
                      </CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="h-4 w-4 text-emerald-600" />
                        <span>{org.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Users className="h-4 w-4 text-emerald-600" />
                        <span>{org.followers} followers</span>
                      </div>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {org.focus.map((tag, i) => (
                          <Badge
                            key={i}
                            variant="secondary"
                            className="bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline">Follow</Button>
                    <Button variant="ghost" size="icon">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="ngos" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  name: "Ocean Guardians",
                  type: "NGO",
                  location: "San Francisco, CA",
                  followers: 1250,
                  focus: ["Ocean Conservation", "Beach Cleanup", "Marine Life"],
                  image: "/placeholder.svg?height=80&width=80",
                },
                {
                  name: "Green City Initiative",
                  type: "NGO",
                  location: "Portland, OR",
                  followers: 980,
                  focus: ["Urban Greening", "Tree Planting", "Sustainable Cities"],
                  image: "/placeholder.svg?height=80&width=80",
                },
                {
                  name: "Waste Warriors",
                  type: "NGO",
                  location: "Seattle, WA",
                  followers: 620,
                  focus: ["Recycling", "Zero Waste", "Plastic Reduction"],
                  image: "/placeholder.svg?height=80&width=80",
                },
                {
                  name: "Wildlife Alliance",
                  type: "NGO",
                  location: "Boise, ID",
                  followers: 1100,
                  focus: ["Wildlife Conservation", "Habitat Restoration", "Biodiversity"],
                  image: "/placeholder.svg?height=80&width=80",
                },
              ].map((org, index) => (
                <Card key={index}>
                  <CardHeader className="flex flex-row items-start gap-4 space-y-0">
                    <div className="relative w-16 h-16 rounded-md overflow-hidden">
                      <Image src={org.image || "/placeholder.svg"} alt={org.name} fill className="object-cover" />
                    </div>
                    <div className="space-y-1">
                      <CardTitle>{org.name}</CardTitle>
                      <CardDescription>
                        <Badge variant="outline" className="mr-1">
                          {org.type}
                        </Badge>
                      </CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="h-4 w-4 text-emerald-600" />
                        <span>{org.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Users className="h-4 w-4 text-emerald-600" />
                        <span>{org.followers} followers</span>
                      </div>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {org.focus.map((tag, i) => (
                          <Badge
                            key={i}
                            variant="secondary"
                            className="bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline">Follow</Button>
                    <Button variant="ghost" size="icon">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="following" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  name: "Ocean Guardians",
                  type: "NGO",
                  location: "San Francisco, CA",
                  followers: 1250,
                  focus: ["Ocean Conservation", "Beach Cleanup", "Marine Life"],
                  image: "/placeholder.svg?height=80&width=80",
                },
                {
                  name: "Waste Warriors",
                  type: "NGO",
                  location: "Seattle, WA",
                  followers: 620,
                  focus: ["Recycling", "Zero Waste", "Plastic Reduction"],
                  image: "/placeholder.svg?height=80&width=80",
                },
              ].map((org, index) => (
                <Card key={index}>
                  <CardHeader className="flex flex-row items-start gap-4 space-y-0">
                    <div className="relative w-16 h-16 rounded-md overflow-hidden">
                      <Image src={org.image || "/placeholder.svg"} alt={org.name} fill className="object-cover" />
                    </div>
                    <div className="space-y-1">
                      <CardTitle>{org.name}</CardTitle>
                      <CardDescription>
                        <Badge variant="outline" className="mr-1">
                          {org.type}
                        </Badge>
                      </CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="h-4 w-4 text-emerald-600" />
                        <span>{org.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Users className="h-4 w-4 text-emerald-600" />
                        <span>{org.followers} followers</span>
                      </div>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {org.focus.map((tag, i) => (
                          <Badge
                            key={i}
                            variant="secondary"
                            className="bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline">Unfollow</Button>
                    <Button variant="ghost" size="icon">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <Card>
          <CardHeader>
            <CardTitle>Featured Organization</CardTitle>
            <CardDescription>Learn about our partner of the month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-6">
              <div className="relative w-full md:w-1/3 h-48 rounded-lg overflow-hidden">
                <Image
                  src="/placeholder.svg?height=200&width=400"
                  alt="Featured Organization"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="md:w-2/3 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="relative w-12 h-12 rounded-md overflow-hidden">
                    <Image
                      src="/placeholder.svg?height=48&width=48"
                      alt="Ocean Guardians"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Ocean Guardians</h3>
                    <p className="text-sm text-muted-foreground">San Francisco, CA</p>
                  </div>
                </div>
                <p>
                  Ocean Guardians is dedicated to protecting marine ecosystems through community-driven beach cleanups,
                  educational programs, and advocacy for sustainable ocean policies. Since 2018, they have removed over
                  50 tons of plastic waste from coastal areas and engaged thousands of volunteers in conservation
                  efforts.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="bg-emerald-50 text-emerald-700 hover:bg-emerald-100">
                    Ocean Conservation
                  </Badge>
                  <Badge variant="secondary" className="bg-emerald-50 text-emerald-700 hover:bg-emerald-100">
                    Beach Cleanup
                  </Badge>
                  <Badge variant="secondary" className="bg-emerald-50 text-emerald-700 hover:bg-emerald-100">
                    Marine Life
                  </Badge>
                </div>
                <div className="flex gap-2">
                  <Button className="bg-emerald-600 hover:bg-emerald-700">View Projects</Button>
                  <Button variant="outline">Follow</Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
