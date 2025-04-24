import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Calendar, Users, Award } from "lucide-react"
import Image from "next/image"

interface ProjectCardProps {
  title: string
  organization: string
  deadline: string
  progress: number
  contributors: number
  points: number
  imageUrl: string
}

export function ProjectCard({
  title,
  organization,
  deadline,
  progress,
  contributors,
  points,
  imageUrl,
}: ProjectCardProps) {
  return (
    <Card className="overflow-hidden">
      <div className="relative h-48 w-full">
        <Image src={imageUrl || "/placeholder.svg"} alt={title} fill className="object-cover" />
      </div>
      <CardHeader className="p-4">
        <CardTitle className="text-xl">{title}</CardTitle>
        <div className="text-sm text-muted-foreground">By {organization}</div>
      </CardHeader>
      <CardContent className="p-4 pt-0 space-y-3">
        <div className="flex items-center gap-2 text-sm">
          <Calendar className="h-4 w-4 text-emerald-600" />
          <span>Deadline: {deadline}</span>
        </div>
        <div className="space-y-1">
          <div className="flex items-center justify-between text-sm">
            <span>Progress</span>
            <span>{progress}%</span>
          </div>
          <Progress value={progress} className="h-2 bg-emerald-100" indicatorClassName="bg-emerald-600" />
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Users className="h-4 w-4 text-emerald-600" />
          <span>{contributors} contributors</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Award className="h-4 w-4 text-emerald-600" />
          <span>{points} Green Points</span>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button className="w-full bg-emerald-600 hover:bg-emerald-700">Contribute</Button>
      </CardFooter>
    </Card>
  )
}
