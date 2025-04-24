import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ProjectCard } from "@/components/project-card"
import { Filter, Plus, Search } from "lucide-react"

export default function ProjectsPage() {
  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Projects</h2>
          <Button className="bg-emerald-600 hover:bg-emerald-700">
            <Plus className="mr-2 h-4 w-4" /> Create Project
          </Button>
        </div>

        <Card>
          <CardContent className="p-4">
            <div className="grid gap-4 md:grid-cols-[1fr_200px_200px_auto]">
              <div className="flex w-full items-center space-x-2">
                <Search className="h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search projects..." className="flex-1" />
              </div>
              <Select defaultValue="all">
                <SelectTrigger>
                  <SelectValue placeholder="Project Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="conservation">Conservation</SelectItem>
                  <SelectItem value="renewable">Renewable Energy</SelectItem>
                  <SelectItem value="waste">Waste Management</SelectItem>
                  <SelectItem value="education">Education</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="active">
                <SelectTrigger>
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="upcoming">Upcoming</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="all">All Projects</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="active" className="space-y-4">
          <TabsList>
            <TabsTrigger value="active">Active Projects</TabsTrigger>
            <TabsTrigger value="contributing">Contributing</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>
          <TabsContent value="active" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <ProjectCard
                title="Solar Panel Installation"
                organization="Renewable Energy Co."
                deadline="June 30, 2025"
                progress={65}
                contributors={18}
                points={500}
                imageUrl="/placeholder.svg?height=200&width=400"
              />
              <ProjectCard
                title="Community Garden"
                organization="Urban Farmers"
                deadline="Ongoing"
                progress={42}
                contributors={24}
                points={350}
                imageUrl="/placeholder.svg?height=200&width=400"
              />
              <ProjectCard
                title="Plastic-Free Initiative"
                organization="Zero Waste Alliance"
                deadline="July 15, 2025"
                progress={28}
                contributors={32}
                points={450}
                imageUrl="/placeholder.svg?height=200&width=400"
              />
              <ProjectCard
                title="Watershed Protection"
                organization="Water Guardians"
                deadline="August 10, 2025"
                progress={15}
                contributors={12}
                points={400}
                imageUrl="/placeholder.svg?height=200&width=400"
              />
              <ProjectCard
                title="Urban Wildlife Corridor"
                organization="Wildlife Alliance"
                deadline="September 5, 2025"
                progress={22}
                contributors={19}
                points={550}
                imageUrl="/placeholder.svg?height=200&width=400"
              />
              <ProjectCard
                title="Green Schools Program"
                organization="Education for Earth"
                deadline="Ongoing"
                progress={70}
                contributors={45}
                points={300}
                imageUrl="/placeholder.svg?height=200&width=400"
              />
            </div>
          </TabsContent>
          <TabsContent value="contributing" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <ProjectCard
                title="Solar Panel Installation"
                organization="Renewable Energy Co."
                deadline="June 30, 2025"
                progress={65}
                contributors={18}
                points={500}
                imageUrl="/placeholder.svg?height=200&width=400"
              />
              <ProjectCard
                title="Plastic-Free Initiative"
                organization="Zero Waste Alliance"
                deadline="July 15, 2025"
                progress={28}
                contributors={32}
                points={450}
                imageUrl="/placeholder.svg?height=200&width=400"
              />
            </div>
          </TabsContent>
          <TabsContent value="completed" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <ProjectCard
                title="Beach Restoration"
                organization="Ocean Guardians"
                deadline="Completed"
                progress={100}
                contributors={52}
                points={600}
                imageUrl="/placeholder.svg?height=200&width=400"
              />
              <ProjectCard
                title="Urban Composting"
                organization="Waste Warriors"
                deadline="Completed"
                progress={100}
                contributors={28}
                points={350}
                imageUrl="/placeholder.svg?height=200&width=400"
              />
              <ProjectCard
                title="Sustainable Transportation"
                organization="Green City Initiative"
                deadline="Completed"
                progress={100}
                contributors={35}
                points={400}
                imageUrl="/placeholder.svg?height=200&width=400"
              />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
