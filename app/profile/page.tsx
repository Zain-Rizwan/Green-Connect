"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { UserRankCard } from "@/components/user-rank-card"
import { EventCard } from "@/components/event-card"
import { ProjectCard } from "@/components/project-card"
import { Award, Calendar, Edit, Leaf, MapPin, Recycle, User, TreePine, Loader2 } from "lucide-react"
import Image from "next/image"
import { useAuth } from "@/components/auth-provider"
import { useToast } from "@/components/ui/use-toast"

export default function ProfilePage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  // Define an interface for event objects
  interface ProfileEvent {
    id: string;
    title: string;
    description: string;
    date: string | Date;
    location: string;
    organizer: string;
    attendees: number;
    points: number;
  }

  // Define an interface for profile data
  interface ProfileData {
    score: number;
    eventsAttended: number;
    eventsOrganized: number;
    totalAttendees: number;
    recentEvents: ProfileEvent[];
  }

  // Use the interface in your state
  const [profileData, setProfileData] = useState<ProfileData>({
    score: 0,
    eventsAttended: 0,
    eventsOrganized: 0,
    totalAttendees: 0,
    recentEvents: []
  });

  useEffect(() => {
    const fetchProfileData = async () => {
      if (!user) return;
      
      try {
        setIsLoading(true);
        
        // Fetch user profile data based on role
        const response = await fetch(`/api/profile?userId=${user.id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch profile data");
        }
        
        const data = await response.json();
        setProfileData(data);
      } catch (error) {
        console.error("Error fetching profile data:", error);
        toast({
          title: "Error",
          description: "Failed to load profile data. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    if (user) {
      fetchProfileData();
    }
  }, [user, toast]);

  // Get rank based on points
  const getRank = (points: number) => {
    if (points >= 2000) return "Climate Champion";
    if (points >= 1000) return "Eco Hero";
    if (points >= 500) return "Green Guardian";
    if (points >= 200) return "Environmental Ally";
    return "Eco Rookie";
  };

  // Add explicit number type to the points parameter
  const getNextRankInfo = (points: number) => {
    if (points >= 2000) return { nextRank: "Master Champion", pointsToNextRank: 1000 };
    if (points >= 1000) return { nextRank: "Climate Champion", pointsToNextRank: 2000 - points };
    if (points >= 500) return { nextRank: "Eco Hero", pointsToNextRank: 1000 - points };
    if (points >= 200) return { nextRank: "Green Guardian", pointsToNextRank: 500 - points };
    return { nextRank: "Environmental Ally", pointsToNextRank: 200 - points };
  };

  const rank = getRank(profileData.score);
  const { nextRank, pointsToNextRank } = getNextRankInfo(profileData.score);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-emerald-600" />
      </div>
    );
  }

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
                  <h3 className="text-2xl font-bold">{user?.name || "Ahmad Moazam"}</h3>
                  <p className="text-muted-foreground">{user?.email || "ahmadmoazam6@gmail.com"}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-emerald-600" />
                  <span className="font-medium text-emerald-700">{rank}</span>
                </div>
                <div className="flex flex-wrap gap-2 justify-center">
                  <Badge variant="outline" className="bg-emerald-50 text-emerald-700 hover:bg-emerald-100">
                    {user?.role || "ecowarrior"}
                  </Badge>
                  <Badge variant="outline" className="bg-emerald-50 text-emerald-700 hover:bg-emerald-100">
                    Tree Planting
                  </Badge>
                  <Badge variant="outline" className="bg-emerald-50 text-emerald-700 hover:bg-emerald-100">
                    Recycling
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <UserRankCard
              name={user?.name || "Ahmad Moazam"}
              points={profileData.score}
              rank={rank}
              nextRank={nextRank}
              pointsToNextRank={pointsToNextRank}
            />

            <Card>
              <CardHeader>
                <CardTitle>About Me</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  Passionate environmentalist dedicated to making a positive impact on our planet. I believe in the
                  power of community action and sustainable living.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-emerald-600" />
                    <span>Islamabad, Pakistan</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Leaf className="h-4 w-4 text-emerald-600" />
                    <span>{profileData.score} Green Points</span>
                  </div>
                  
                  {user?.role === "ecowarrior" ? (
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-emerald-600" />
                      <span>{profileData.eventsAttended} Events Attended</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-emerald-600" />
                      <span>{profileData.eventsOrganized} Events Organized</span>
                    </div>
                  )}
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
            {profileData.recentEvents.length > 0 ? (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {profileData.recentEvents.map((event) => (
                  <EventCard
                    key={event.id}
                    id={event.id}
                    title={event.title}
                    date={new Date(event.date).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                    location={event.location}
                    organizer={event.organizer}
                    attendees={event.attendees}
                    points={event.points}
                    imageUrl="/placeholder.svg?height=200&width=400"
                    isPast={new Date(event.date) < new Date()}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Calendar className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-medium">No activity yet</h3>
                <p className="text-sm text-muted-foreground mt-2">
                  {user?.role === "ecowarrior" 
                    ? "You haven't attended any events yet. Browse upcoming events and join one!"
                    : "You haven't organized any events yet. Create your first event!"}
                </p>
              </div>
            )}
          </TabsContent>
          
          {/* Rest of the tabs remain mostly unchanged */}
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
                  
                  {user?.role === "ecowarrior" ? (
                    <>
                      <div className="flex flex-col items-center p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
                        <TreePine className="h-10 w-10 text-emerald-600 mb-2" />
                        <h3 className="text-2xl font-bold">{Math.floor(profileData.eventsAttended * 3)}</h3>
                        <p className="text-sm text-center text-muted-foreground">Trees Planted</p>
                      </div>
                      <div className="flex flex-col items-center p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
                        <Leaf className="h-10 w-10 text-emerald-600 mb-2" />
                        <h3 className="text-2xl font-bold">{(profileData.score / 1000).toFixed(1)} tons</h3>
                        <p className="text-sm text-center text-muted-foreground">CO₂ Emissions Saved</p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex flex-col items-center p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
                        <Calendar className="h-10 w-10 text-emerald-600 mb-2" />
                        <h3 className="text-2xl font-bold">{profileData.eventsOrganized}</h3>
                        <p className="text-sm text-center text-muted-foreground">Events Organized</p>
                      </div>
                      <div className="flex flex-col items-center p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
                        <User className="h-10 w-10 text-emerald-600 mb-2" />
                        <h3 className="text-2xl font-bold">{profileData.totalAttendees}</h3>
                        <p className="text-sm text-center text-muted-foreground">Total Participants</p>
                      </div>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
