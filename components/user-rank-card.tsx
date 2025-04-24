import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Award, ChevronUp } from "lucide-react"

interface UserRankCardProps {
  name: string
  points: number
  rank: string
  nextRank: string
  pointsToNextRank: number
}

export function UserRankCard({ name, points, rank, nextRank, pointsToNextRank }: UserRankCardProps) {
  const totalPointsNeeded = points + pointsToNextRank
  const progressPercentage = (points / totalPointsNeeded) * 100

  return (
    <Card className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950 dark:to-teal-950 border-emerald-200 dark:border-emerald-800">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <h3 className="text-2xl font-bold">{name}</h3>
            <div className="flex items-center gap-2">
              <Award className="h-5 w-5 text-emerald-600" />
              <span className="font-medium text-emerald-700 dark:text-emerald-400">{rank}</span>
            </div>
          </div>

          <div className="w-full md:w-2/3 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">{points} points</span>
              <div className="flex items-center gap-1 text-sm font-medium text-emerald-700 dark:text-emerald-400">
                <ChevronUp className="h-4 w-4" />
                <span>
                  {nextRank} ({pointsToNextRank} points needed)
                </span>
              </div>
            </div>
            <Progress
              value={progressPercentage}
              className="h-2 bg-emerald-100 dark:bg-emerald-900"
              indicatorClassName="bg-emerald-600"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
