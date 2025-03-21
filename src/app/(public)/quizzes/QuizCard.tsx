import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Quiz } from "@/data/quizzes";
import { BarChart3, BookOpen, Clock } from "lucide-react";
import Link from "next/link";
import React from "react";

interface QuizCardProps {
  key?: string;
  quiz: Quiz;
  inProgressQuizIds: string[];
  completedQuizIds: string[];
}

const QuizCard: React.FC<QuizCardProps> = ({
  quiz,
  inProgressQuizIds,
  completedQuizIds,
}) => {
  return (
    <>
      <Card
        key={quiz.id}
        className="overflow-hidden hover:shadow-md transition-shadow"
      >
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-lg">{quiz.title}</CardTitle>
              <CardDescription>{quiz.description}</CardDescription>
            </div>
            <Badge
              variant={
                quiz.difficulty === "Beginner"
                  ? "outline"
                  : quiz.difficulty === "Intermediate"
                  ? "secondary"
                  : "default"
              }
            >
              {quiz.difficulty}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="pb-2">
          <div className="flex flex-wrap gap-2 mb-3">
            <Badge variant="outline" className="bg-muted/50">
              {quiz.category}
            </Badge>
            <div className="flex items-center text-xs text-muted-foreground">
              <Clock className="h-3 w-3 mr-1" />
              {quiz.timeEstimate}
            </div>
            <div className="flex items-center text-xs text-muted-foreground">
              <BookOpen className="h-3 w-3 mr-1" />
              {quiz.questions.length} questions
            </div>
          </div>
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center">
              <BarChart3 className="h-4 w-4 mr-1 text-muted-foreground" />
              <span>{quiz.completions} completions</span>
            </div>
            <div className="flex items-center">
              <span className="text-amber-500 mr-1">★</span>
              <span>{quiz.popularity}</span>
            </div>
          </div>

          {/* Show progress if quiz is in progress */}
          {inProgressQuizIds.includes(quiz.id) && (
            <div className="mt-2 space-y-1">
              <div className="flex justify-between text-xs">
                <span>In progress</span>
              </div>
              <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary"
                  style={{ width: "30%" }}
                ></div>
              </div>
            </div>
          )}

          {/* Show completed badge if quiz is completed */}
          {completedQuizIds.includes(quiz.id) && (
            <div className="mt-2">
              <Badge
                variant="outline"
                className="bg-green-50 text-green-700 border-green-200 dark:bg-green-950/20 dark:text-green-400 dark:border-green-800"
              >
                Completed
              </Badge>
            </div>
          )}
        </CardContent>
        <CardFooter className="pt-2">
          <Button asChild className="w-full">
            <Link href={`/quiz/${quiz.id}`}>
              {inProgressQuizIds.includes(quiz.id)
                ? "Continue Quiz"
                : "Start Quiz"}
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </>
  );
};

export default QuizCard;
