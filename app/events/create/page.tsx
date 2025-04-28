"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/components/auth-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DatePicker } from "@/components/ui/date-picker"
import { Calendar, MapPin, Award, Upload, Loader2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { RoleGuard } from "@/components/role-guard"

export default function CreateEventPage() {
  const router = useRouter()
  const { user } = useAuth()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  // Form state
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [location, setLocation] = useState("")
  const [eventType, setEventType] = useState("")
  const [points, setPoints] = useState("100")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!title || !description || !date || !location || !eventType) {
      toast({
        title: "Missing fields",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      if (!user) {
        throw new Error("You must be logged in to create an event")
      }
      
      const response = await fetch("/api/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          date: date?.toISOString(),
          location,
          type: eventType,
          points: Number.parseInt(points),
          user: {
            id: user.id,
            name: user.name,
          },
        }),
      })

      if (response.ok) {
        const data = await response.json()
        toast({
          title: "Event created",
          description: "Your event has been created successfully.",
        })
        router.push("/events")
      } else {
        const error = await response.json()
        throw new Error(error.error || "Failed to create event")
      }
    } catch (error) {
      console.error("Error creating event:", error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to create event. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <RoleGuard allowedRoles={["ecowarrior", "organization", "admin"]}>
      <div className="container max-w-3xl py-8">
        <h1 className="text-3xl font-bold mb-6">Create New Event</h1>

        <form onSubmit={handleSubmit}>
          <Card>
            <CardHeader>
              <CardTitle>Event Details</CardTitle>
              <CardDescription>Provide information about your sustainability event</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Event Title</Label>
                <Input
                  id="title"
                  placeholder="Enter event title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe your event"
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date">Event Date</Label>
                  <div className="flex items-center">
                    <Calendar className="mr-2 h-4 w-4 text-emerald-600" />
                    <DatePicker date={date} setDate={setDate} />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <div className="flex">
                    <div className="flex items-center px-3 border rounded-l-md bg-muted">
                      <MapPin className="h-4 w-4 text-emerald-600" />
                    </div>
                    <Input
                      id="location"
                      placeholder="Event location"
                      className="rounded-l-none"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="type">Event Type</Label>
                  <Select value={eventType} onValueChange={setEventType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select event type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cleanup">Beach/Park Cleanup</SelectItem>
                      <SelectItem value="planting">Tree Planting</SelectItem>
                      <SelectItem value="workshop">Educational Workshop</SelectItem>
                      <SelectItem value="conservation">Conservation Activity</SelectItem>
                      <SelectItem value="recycling">Recycling Drive</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="points">Green Points</Label>
                  <div className="flex">
                    <div className="flex items-center px-3 border rounded-l-md bg-muted">
                      <Award className="h-4 w-4 text-emerald-600" />
                    </div>
                    <Input
                      id="points"
                      type="number"
                      min="0"
                      className="rounded-l-none"
                      value={points}
                      onChange={(e) => setPoints(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Event Image</Label>
                <div className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center">
                  <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground mb-1">Drag and drop an image, or click to browse</p>
                  <p className="text-xs text-muted-foreground">PNG, JPG or WEBP, max 5MB</p>
                  <Button variant="outline" size="sm" className="mt-4">
                    Upload Image
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => router.back()}>
                Cancel
              </Button>
              <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating...
                  </>
                ) : (
                  "Create Event"
                )}
              </Button>
            </CardFooter>
          </Card>
        </form>
      </div>
    </RoleGuard>
  )
}
