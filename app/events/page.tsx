"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { EventCard } from "@/components/event-card"
import { Calendar, Filter, Plus, Search, Loader2 } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/components/ui/use-toast"
import { useAuth } from "@/components/auth-provider"

// Add a proper interface for Event type
interface Event {
  id: string
  title: string
  description: string
  date: string
  location: string
  organizer: string
  attendees: number
  points: number
  imageUrl: string
  type: string
  isPast?: boolean
  rawDate?: Date
}

export default function EventsPage() {
  const { toast } = useToast()
  const { user } = useAuth() // Get the current user
  const [events, setEvents] = useState<Event[]>([])
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([])
  const [registeredEvents, setRegisteredEvents] = useState<Event[]>([])
  const [pastEvents, setPastEvents] = useState<Event[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [eventType, setEventType] = useState("all")
  const [datePeriod, setDatePeriod] = useState("upcoming")
  const [searchQuery, setSearchQuery] = useState("")
  
  // Check if the user can create events (admin or organization only)
  const canCreateEvents = user && (user.role === "admin" || user.role === "organization")

  // Fetch events on component mount
  useEffect(() => {
    const fetchEvents = async () => {
      setIsLoading(true)
      try {
        const response = await fetch(`/api/events?type=${eventType}&period=${datePeriod}`)
        
        if (!response.ok) {
          throw new Error("Failed to fetch events")
        }
        
        const data = await response.json()
        
        // Get current date for comparison
        const now = new Date();
        
        // Format dates for display and determine if event is past
        const formattedEvents = data.events.map((event: any) => {
          const eventDate = new Date(event.date);
          const isPast = eventDate < now;
          
          return {
            ...event,
            date: eventDate.toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            }),
            rawDate: eventDate, // Keep the raw date for sorting
            isPast: isPast    // This correctly sets isPast based on date comparison
          }
        })
        
        // Set all events
        setEvents(formattedEvents)
        
        // Filter events based on current state
        filterEvents(formattedEvents, eventType, datePeriod, searchQuery)
        
        // Get upcoming events - use the calculated isPast property
        const upcoming = formattedEvents.filter((event: Event) => !event.isPast);
        setFilteredEvents(upcoming);
        
        // Get registered events (in a real app, this would come from user data)
        // For now, just take the first two upcoming events as an example
        setRegisteredEvents(upcoming.slice(0, 2))
        
        // Get past events - use the calculated isPast property
        const past = formattedEvents.filter((event: Event) => event.isPast);
        setPastEvents(past)
        
      } catch (error) {
        console.error("Error fetching events:", error)
        toast({
          title: "Error",
          description: "Failed to load events. Please try again.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchEvents()
  }, [eventType, datePeriod, toast])

  // Filter events when search, type, or period changes
  const filterEvents = (allEvents: Event[], type: string, period: string, query: string) => {
    let filtered = [...allEvents]
    
    // Filter by search query
    if (query) {
      filtered = filtered.filter(event => 
        event.title.toLowerCase().includes(query.toLowerCase()) ||
        event.location.toLowerCase().includes(query.toLowerCase()) ||
        event.organizer.toLowerCase().includes(query.toLowerCase())
      )
    }
    
    // Only show upcoming events in the main filtered list
    if (period === 'upcoming') {
      filtered = filtered.filter(event => !event.isPast);
    }
    
    setFilteredEvents(filtered)
  }

  // Handle search input change
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value
    setSearchQuery(query)
    filterEvents(events, eventType, datePeriod, query)
  }

  // Handle event type change
  const handleEventTypeChange = (value: string) => {
    setEventType(value)
  }

  // Handle date period change
  const handleDatePeriodChange = (value: string) => {
    setDatePeriod(value)
  }

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Events</h2>
          
          {/* Only show create button for admins and organizations */}
          {canCreateEvents && (
            <Link href="/events/create">
              <Button className="bg-emerald-600 hover:bg-emerald-700">
                <Plus className="mr-2 h-4 w-4" /> Create Event
              </Button>
            </Link>
          )}
        </div>

        {/* Existing filtering UI */}
        
        <Tabs defaultValue="upcoming" className="space-y-4">
          <TabsList>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="registered">Registered</TabsTrigger>
            <TabsTrigger value="past">Past Events</TabsTrigger>
          </TabsList>
          <TabsContent value="upcoming" className="space-y-4">
            {isLoading ? (
              <div className="flex justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-emerald-600" />
              </div>
            ) : filteredEvents.length > 0 ? (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredEvents.map((event) => (
                  <EventCard
                    key={event.id}
                    id={event.id}  // Add this line
                    title={event.title}
                    date={event.date}
                    location={event.location}
                    organizer={event.organizer}
                    attendees={event.attendees}
                    points={event.points}
                    imageUrl={event.imageUrl}
                    isPast={false}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Calendar className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-medium">No events found</h3>
                <p className="text-sm text-muted-foreground mt-2">
                  There are no events matching your criteria. 
                  {canCreateEvents 
                    ? " Try changing the filters or create a new event."
                    : " Try changing the filters to find events."}
                </p>
                
                {/* Only show create button for admins and organizations */}
                {canCreateEvents && (
                  <Link href="/events/create">
                    <Button className="mt-4 bg-emerald-600 hover:bg-emerald-700">
                      <Plus className="mr-2 h-4 w-4" /> Create Event
                    </Button>
                  </Link>
                )}
              </div>
            )}
          </TabsContent>
          <TabsContent value="registered" className="space-y-4">
            {isLoading ? (
              <div className="flex justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-emerald-600" />
              </div>
            ) : registeredEvents.length > 0 ? (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {registeredEvents.map((event) => (
                  <EventCard
                    key={event.id}
                    id={event.id}  // Add this missing property
                    title={event.title}
                    date={event.date}
                    location={event.location}
                    organizer={event.organizer}
                    attendees={event.attendees}
                    points={event.points}
                    imageUrl={event.imageUrl}
                    isPast={event.isPast}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Calendar className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-medium">No registered events</h3>
                <p className="text-sm text-muted-foreground mt-2">
                  You haven't registered for any events yet. Browse upcoming events and join one!
                </p>
              </div>
            )}
          </TabsContent>
          <TabsContent value="past" className="space-y-4">
            {isLoading ? (
              <div className="flex justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-emerald-600" />
              </div>
            ) : pastEvents.length > 0 ? (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {pastEvents.map((event) => (
                  <EventCard
                    key={event.id}
                    id={event.id}  // Add this missing property
                    title={event.title}
                    date={event.date}
                    location={event.location}
                    organizer={event.organizer}
                    attendees={event.attendees}
                    points={event.points}
                    imageUrl={event.imageUrl}
                    isPast={event.isPast}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Calendar className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-medium">No past events</h3>
                <p className="text-sm text-muted-foreground mt-2">
                  There are no past events to display.
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Rest of your code */}
      </div>
    </div>
  )
}
