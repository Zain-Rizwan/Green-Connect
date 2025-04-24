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
import { Calendar, Award, Upload, Loader2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { RoleGuard } from "@/components/role-guard"

export default function CreateProjectPage() {
  const router = useRouter()
  const { user } = useAuth()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  // Form state
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [deadline, setDeadline] = useState<Date | undefined>(undefined)
  const [projectType, setProjectType] = useState("")
  const [points, setPoints] = useState("350")
  const [isOngoing, setIsOngoing] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!title || !description || (!isOngoing && !deadline) || !projectType) {
      toast({
        title: "Missing fields",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch("/api/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          deadline: isOngoing ? "Ongoing" : deadline?.toISOString(),
          type: projectType,
          points: Number.parseInt(points),
          progress: 0,
        }),
      })

      if (response.ok) {
        const data = await response.json()
        toast({
          title: "Project created",
          description: "Your project has been created successfully.",
        })
        router.push("/projects")
      } else {
        const error = await response.json()
        throw new Error(error.error || "Failed to create project")
      }
    } catch (error) {
      console.error("Error creating project:", error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to create project. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <RoleGuard allowedRoles={["organization", "admin"]}>
      <div className="container max-w-3xl py-8">
        <h1 className="text-3xl font-bold mb-6">Create New Project</h1>

        <form onSubmit={handleSubmit}>
          <Card>
            <CardHeader>
              <CardTitle>Project Details</CardTitle>
              <CardDescription>Provide information about your sustainability project</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Project Title</Label>
                <Input
                  id="title"
                  placeholder="Enter project title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe your project"
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="deadline">Project Deadline</Label>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="ongoing"
                        className="mr-2"
                        checked={isOngoing}
                        onChange={(e) => setIsOngoing(e.target.checked)}
                      />
                      <Label htmlFor="ongoing" className="text-sm">
                        Ongoing project
                      </Label>
                    </div>
                  </div>
                  {!isOngoing && (
                    <div className="flex items-center">
                      <Calendar className="mr-2 h-4 w-4 text-emerald-600" />
                      <DatePicker date={deadline} setDate={setDeadline} />
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="type">Project Type</Label>
                  <Select value={projectType} onValueChange={setProjectType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select project type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="conservation">Conservation</SelectItem>
                      <SelectItem value="renewable">Renewable Energy</SelectItem>
                      <SelectItem value="waste">Waste Management</SelectItem>
                      <SelectItem value="education">Education</SelectItem>
                      <SelectItem value="community">Community Garden</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
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
                <p className="text-xs text-muted-foreground">Points awarded to contributors upon project completion</p>
              </div>

              <div className="space-y-2">
                <Label>Project Image</Label>
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
                  "Create Project"
                )}
              </Button>
            </CardFooter>
          </Card>
        </form>
      </div>
    </RoleGuard>
  )
}
