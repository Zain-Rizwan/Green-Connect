import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { EventCard } from "@/components/event-card"
import { Calendar, Filter, Plus, Search } from "lucide-react"

export default function EventsPage() {
  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Events</h2>
          <Button className="bg-emerald-600 hover:bg-emerald-700">
            <Plus className="mr-2 h-4 w-4" /> Create Event
          </Button>
        </div>

        <Card>
          <CardContent className="p-4">
            <div className="grid gap-4 md:grid-cols-[1fr_200px_200px_auto]">
              <div className="flex w-full items-center space-x-2">
                <Search className="h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search events..." className="flex-1" />
              </div>
              <Select defaultValue="all">
                <SelectTrigger>
                  <SelectValue placeholder="Event Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="cleanup">Cleanup</SelectItem>
                  <SelectItem value="planting">Tree Planting</SelectItem>
                  <SelectItem value="workshop">Workshop</SelectItem>
                  <SelectItem value="conservation">Conservation</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="upcoming">
                <SelectTrigger>
                  <SelectValue placeholder="Date" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="upcoming">Upcoming</SelectItem>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="week">This Week</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                  <SelectItem value="past">Past Events</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="upcoming" className="space-y-4">
          <TabsList>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="registered">Registered</TabsTrigger>
            <TabsTrigger value="past">Past Events</TabsTrigger>
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
              <EventCard
                title="River Conservation Day"
                date="June 12, 2025"
                location="Riverside Park"
                organizer="Water Protectors"
                attendees={22}
                points={180}
                imageUrl="/placeholder.svg?height=200&width=400"
              />
              <EventCard
                title="Sustainable Living Fair"
                date="June 19, 2025"
                location="City Square"
                organizer="EcoLife Community"
                attendees={120}
                points={120}
                imageUrl="/placeholder.svg?height=200&width=400"
              />
              <EventCard
                title="Wildlife Habitat Restoration"
                date="June 26, 2025"
                location="Nature Reserve"
                organizer="Wildlife Alliance"
                attendees={18}
                points={250}
                imageUrl="/placeholder.svg?height=200&width=400"
              />
            </div>
          </TabsContent>
          <TabsContent value="registered" className="space-y-4">
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
          <TabsContent value="past" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <EventCard
                title="Earth Day Celebration"
                date="April 22, 2025"
                location="City Park"
                organizer="Earth Alliance"
                attendees={85}
                points={200}
                imageUrl="/placeholder.svg?height=200&width=400"
              />
              <EventCard
                title="Coastal Cleanup"
                date="April 10, 2025"
                location="North Beach"
                organizer="Ocean Guardians"
                attendees={38}
                points={150}
                imageUrl="/placeholder.svg?height=200&width=400"
              />
              <EventCard
                title="Sustainable Gardening Workshop"
                date="March 28, 2025"
                location="Botanical Gardens"
                organizer="Urban Farmers"
                attendees={42}
                points={120}
                imageUrl="/placeholder.svg?height=200&width=400"
              />
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold">Upcoming Events Calendar</h3>
          <Button variant="outline" size="sm">
            <Calendar className="mr-2 h-4 w-4" /> View Calendar
          </Button>
        </div>

        <Card>
          <CardContent className="p-6">
            <div className="h-[400px] flex items-center justify-center border rounded-md bg-muted/20">
              <div className="text-center">
                <Calendar className="mx-auto h-10 w-10 text-muted-foreground" />
                <h3 className="mt-2 text-lg font-medium">Events Calendar</h3>
                <p className="text-sm text-muted-foreground">Calendar view will be displayed here</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
