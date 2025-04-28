import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Calendar, MapPin, Users, Award, Loader2 } from "lucide-react"
import Image from "next/image"
import { useAuth } from "@/components/auth-provider"
import { useToast } from "@/components/ui/use-toast"

interface EventCardProps {
  id: string  // Add event ID
  title: string
  date: string
  location: string
  organizer: string
  attendees: number
  points: number
  imageUrl: string
  isPast?: boolean
}

export function EventCard({
  id,
  title,
  date,
  location,
  organizer,
  attendees,
  points,
  imageUrl,
  isPast = false
}: EventCardProps) {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isJoining, setIsJoining] = useState(false);
  const [hasJoined, setHasJoined] = useState(false);
  
  // Only ecowarriors can join events
  const canJoinEvent = user && user.role === "ecowarrior";
  
  async function handleJoinEvent() {
    if (!user) {
      toast({
        title: "Not logged in",
        description: "Please log in to join this event",
        variant: "destructive"
      });
      return;
    }
    
    setIsJoining(true);
    
    try {
      const response = await fetch("/api/events/attend", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          eventId: id,
          userId: user.id,
          eventPoints: points
        }),
      });
      
      if (!response.ok) {
        throw new Error("Failed to join event");
      }
      
      setHasJoined(true);
      toast({
        title: "Success!",
        description: `You've joined ${title} and earned ${points} green points!`,
        variant: "default",
      });
      
    } catch (error) {
      console.error("Error joining event:", error);
      toast({
        title: "Error",
        description: "There was a problem joining this event. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsJoining(false);
    }
  }
  
  return (
    <Card className="overflow-hidden">
      <div className="relative h-48 w-full">
        <Image src={imageUrl || "/placeholder.svg"} alt={title} fill className="object-cover" />
      </div>
      <CardHeader className="p-4">
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="text-sm text-muted-foreground">Organized by {organizer}</p>
      </CardHeader>
      <CardContent className="p-4 pt-0 space-y-3">
        <div className="flex items-center gap-2 text-sm">
          <Calendar className="h-4 w-4 text-emerald-600" />
          <span>{date}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <MapPin className="h-4 w-4 text-emerald-600" />
          <span>{location}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Users className="h-4 w-4 text-emerald-600" />
          <span>{attendees} attendees</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Award className="h-4 w-4 text-emerald-600" />
          <span>{points} Green Points</span>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        {isPast ? (
          <Button className="w-full" variant="outline" disabled>
            Event Completed
          </Button>
        ) : hasJoined ? (
          <Button className="w-full bg-gray-500" disabled>
            Already Joined
          </Button>
        ) : isJoining ? (
          <Button className="w-full bg-emerald-600" disabled>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Joining...
          </Button>
        ) : (
          <Button 
            className="w-full bg-emerald-600 hover:bg-emerald-700"
            onClick={handleJoinEvent}
            disabled={!canJoinEvent}
          >
            Join Event
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
