import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, MapPin, Users, Award } from "lucide-react"
import Image from "next/image"

interface EventCardProps {
  title: string
  date: string
  location: string
  organizer: string
  attendees: number
  points: number
  imageUrl: string
}

export function EventCard({ title, date, location, organizer, attendees, points, imageUrl }: EventCardProps) {
  return (
    <Card className="overflow-hidden">
      <div className="relative h-48 w-full">
        <Image src={imageUrl || "/placeholder.svg"} alt={title} fill className="object-cover" />
      </div>
      <CardHeader className="p-4">
        <CardTitle className="text-xl">{title}</CardTitle>
        <div className="text-sm text-muted-foreground">Organized by {organizer}</div>
      </CardHeader>
      <CardContent className="p-4 pt-0 space-y-2">
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
          <span>{attendees} attending</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Award className="h-4 w-4 text-emerald-600" />
          <span>{points} Green Points</span>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button className="w-full bg-emerald-600 hover:bg-emerald-700">Join Event</Button>
      </CardFooter>
    </Card>
  )
}
