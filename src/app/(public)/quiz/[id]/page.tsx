"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { AlertCircle } from "lucide-react";
import Link from "next/link";
import { type Quiz, getQuizById } from "@/data/quizzes";
import { Timer } from "@/components/timer";
import { CodeEditor } from "@/components/code-editor";

// Define types for progress
interface QuizProgress {
  quizId: string;
  title: string;
  category: string;
  currentQuestion: number;
  totalQuestions: number;
  answers: Record<string, string>;
  startedAt: string;
  lastUpdated: string;
  completed: boolean;
  progress: number;
}

interface QuizResult {
  quizId: string;
  title: string;
  category: string;
  difficulty: string;
  score: number;
  correctAnswers: number;
  totalQuestions: number;
  timeSpent: number;
  completedAt: string;
  answers: {
    questionId: string;
    question: string;
    userAnswer: string;
    correctAnswer: string | null;
    isCorrect: boolean;
    explanation: string | null;
  }[];
}

export default function QuizPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const quizId = params?.id;

  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [codeAnswer, setCodeAnswer] = useState<string>("");
  const [progress, setProgress] = useState<QuizProgress | null>(null);
  const [timeRemaining, setTimeRemaining] = useState<number>(0);

  // Function to get quiz progress directly from localStorage
  const getQuizProgress = (quizId: string): QuizProgress | null => {
    try {
      if (typeof window === "undefined") return null;

      const progressData = localStorage.getItem("eduquiz_progress");
      if (!progressData) return null;

      const allProgress = JSON.parse(progressData);
      if (!Array.isArray(allProgress)) return null;

      return allProgress.find((p) => p.quizId === quizId) || null;
    } catch (error) {
      console.error("Error getting quiz progress:", error);
      return null;
    }
  };

  // Function to save quiz progress directly to localStorage
  const saveQuizProgress = (quizId: string, progress: QuizProgress): void => {
    try {
      if (typeof window === "undefined") return;

      // Get existing progress data
      const progressData = localStorage.getItem("eduquiz_progress");
      let allProgress: QuizProgress[] = [];

      if (progressData) {
        try {
          allProgress = JSON.parse(progressData);
          if (!Array.isArray(allProgress)) {
            allProgress = [];
          }
        } catch (e) {
          console.error("Error parsing progress data:", e);
          allProgress = [];
        }
      }

      // Update or add progress for this quiz
      const existingIndex = allProgress.findIndex((p) => p.quizId === quizId);
      if (existingIndex >= 0) {
        allProgress[existingIndex] = progress;
      } else {
        allProgress.push(progress);
      }

      // Save back to localStorage
      localStorage.setItem("eduquiz_progress", JSON.stringify(allProgress));
    } catch (error) {
      console.error("Error saving quiz progress:", error);
    }
  };

  // Function to save quiz results directly to localStorage

  const saveQuizResult = (result: QuizResult): void => {
    try {
      if (typeof window === "undefined") return;

      // Get existing results
      const resultsData = localStorage.getItem("eduquiz_results");
      let allResults: QuizResult[] = [];

      if (resultsData) {
        try {
          allResults = JSON.parse(resultsData);
          if (!Array.isArray(allResults)) {
            allResults = [];
          }
        } catch (e) {
          console.error("Error parsing results data:", e);
          allResults = [];
        }
      }

      // Add new result
      allResults.push(result);

      // Save back to localStorage
      localStorage.setItem("eduquiz_results", JSON.stringify(allResults));
    } catch (error) {
      console.error("Error saving quiz results:", error);
    }
  };

  useEffect(() => {
    if (!quizId || typeof window === "undefined") return;

    try {
      // Get quiz data from our data file instead of localStorage
      const quizData = getQuizById(quizId);
      if (!quizData) {
        setError("Quiz not found");
        setLoading(false);
        return;
      }

      setQuiz(quizData);

      // Get existing progress or create new progress
      let quizProgress = getQuizProgress(quizId);

      if (!quizProgress) {
        // Create new progress
        quizProgress = {
          quizId,
          title: quizData.title,
          category: quizData.category,
          currentQuestion: 0,
          totalQuestions: quizData.questions.length,
          answers: {},
          startedAt: new Date().toISOString(),
          lastUpdated: new Date().toISOString(),
          completed: false,
          progress: 0,
        };

        // Save initial progress
        saveQuizProgress(quizId, quizProgress);
      } else {
        // Ensure answers object exists
        if (!quizProgress.answers) {
          quizProgress.answers = {};
        }

        // Resume from last question
        if (
          quizProgress.currentQuestion > 0 &&
          quizProgress.currentQuestion < quizData.questions.length
        ) {
          setCurrentQuestionIndex(quizProgress.currentQuestion);

          // Load the current answer if it exists
          const currentQuestion =
            quizData.questions[quizProgress.currentQuestion];
          if (currentQuestion) {
            if (currentQuestion.type === "multiple-choice") {
              setSelectedAnswer(
                quizProgress.answers[currentQuestion.id] || null
              );
            } else if (currentQuestion.type === "code") {
              setCodeAnswer(
                quizProgress.answers[currentQuestion.id] ||
                  currentQuestion.starterCode ||
                  ""
              );
            }
          }
        }

        // Update last updated time
        quizProgress.lastUpdated = new Date().toISOString();
        saveQuizProgress(quizId, quizProgress);
      }

      setProgress(quizProgress);

      // Calculate time remaining (30 minutes per quiz by default)
      const totalTimeInMinutes = 30;
      const startTime = new Date(quizProgress.startedAt).getTime();
      const elapsedTime = (Date.now() - startTime) / 1000 / 60; // in minutes
      const remainingTime = Math.max(0, totalTimeInMinutes - elapsedTime);
      setTimeRemaining(Math.floor(remainingTime * 60)); // convert to seconds

      setLoading(false);
    } catch (error) {
      console.error("Error loading quiz:", error);
      setError("Failed to load quiz data");
      setLoading(false);
    }
  }, [quizId]);

  const handleNextQuestion = () => {
    if (!quiz || !progress) return;

    try {
      // Save answer for current question
      const currentQuestion = quiz.questions[currentQuestionIndex];
      if (!currentQuestion) return;

      // Ensure answers object exists
      const updatedAnswers = { ...(progress.answers || {}) };

      if (currentQuestion.type === "multiple-choice") {
        if (selectedAnswer !== null) {
          updatedAnswers[currentQuestion.id] = selectedAnswer;
        }
      } else if (currentQuestion.type === "code") {
        updatedAnswers[currentQuestion.id] = codeAnswer;
      }

      // Calculate progress percentage
      const progressPercentage = Math.round(
        ((currentQuestionIndex + 1) / quiz.questions.length) * 100
      );

      // Update progress
      const updatedProgress = {
        ...progress,
        currentQuestion: currentQuestionIndex + 1,
        answers: updatedAnswers,
        progress: progressPercentage,
        lastUpdated: new Date().toISOString(),
        completed: currentQuestionIndex === quiz.questions.length - 1,
      };

      // Save progress
      saveQuizProgress(quizId, updatedProgress);
      setProgress(updatedProgress);

      // Move to next question or finish quiz
      if (currentQuestionIndex < quiz.questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedAnswer(null);

        // Pre-load code answer if it exists
        const nextQuestion = quiz.questions[currentQuestionIndex + 1];
        if (nextQuestion && nextQuestion.type === "code") {
          if (updatedAnswers[nextQuestion.id]) {
            setCodeAnswer(updatedAnswers[nextQuestion.id]);
          } else {
            setCodeAnswer(nextQuestion.starterCode || "");
          }
        }
      } else {
        // Quiz completed - calculate results
        const correctAnswers = quiz.questions
          .filter((q) => q.type === "multiple-choice" && q.correctAnswer)
          .map((q) => ({ id: q.id, answer: q.correctAnswer as string }));

        let correctCount = 0;
        correctAnswers.forEach(({ id, answer }) => {
          if (updatedAnswers[id] === answer) {
            correctCount++;
          }
        });

        // Calculate time taken
        const startTime = new Date(progress.startedAt).getTime();
        const endTime = Date.now();
        const timeTaken = Math.floor((endTime - startTime) / 1000); // in seconds

        // Create result object
        const quizResult = {
          quizId,
          title: quiz.title,
          category: quiz.category,
          difficulty: quiz.difficulty,
          score:
            correctAnswers.length > 0
              ? Math.round((correctCount / correctAnswers.length) * 100)
              : 0,
          correctAnswers: correctCount,
          totalQuestions: correctAnswers.length,
          timeSpent: timeTaken,
          completedAt: new Date().toISOString(),
          answers: Object.entries(updatedAnswers).map(
            ([questionId, userAnswer]) => {
              const question = quiz.questions.find((q) => q.id === questionId);
              return {
                questionId,
                question: question?.question || "",
                userAnswer,
                correctAnswer: question?.correctAnswer || null,
                isCorrect: question?.correctAnswer === userAnswer,
                explanation: question?.explanation || null,
              };
            }
          ),
        };

        // Save result
        saveQuizResult(quizResult);

        // Navigate to results
        router.push(`/quiz/${quizId}/results`);
      }
    } catch (error) {
      console.error("Error handling next question:", error);
      setError("An error occurred while saving your progress");
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0 && quiz) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);

      // Load previous answer if it exists
      if (progress && quiz) {
        const prevQuestion = quiz.questions[currentQuestionIndex - 1];
        if (prevQuestion) {
          if (prevQuestion.type === "multiple-choice") {
            setSelectedAnswer(progress.answers?.[prevQuestion.id] || null);
          } else if (prevQuestion.type === "code") {
            setCodeAnswer(
              progress.answers?.[prevQuestion.id] ||
                prevQuestion.starterCode ||
                ""
            );
          }
        }
      }
    }
  };

  const handleTimeUp = () => {
    if (quiz && progress) {
      // Save current progress
      const updatedProgress = {
        ...progress,
        lastUpdated: new Date().toISOString(),
        completed: true,
      };
      saveQuizProgress(quizId, updatedProgress);

      // Navigate to results
      router.push(`/quiz/${quizId}/results`);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto py-8">
        <Card className="w-full max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl">Loading Quiz...</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="h-8 bg-muted rounded animate-pulse"></div>
              <div className="h-32 bg-muted rounded animate-pulse"></div>
              <div className="h-8 bg-muted rounded animate-pulse"></div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error || !quiz) {
    return (
      <div className="container mx-auto py-8">
        <Card className="w-full max-w-4xl mx-auto">
          <CardHeader>
            <div className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-red-500" />
              <CardTitle className="text-2xl">Quiz Error</CardTitle>
            </div>
            <CardDescription>
              {error || "The requested quiz could not be loaded"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>Sorry, we couldn&apos;t load the quiz. This might be due to:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>The quiz ID is invalid</li>
              <li>The quiz has been deleted</li>
              <li>There was a problem with your browser storage</li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button asChild>
              <Link href="/quizzes">Back to Quizzes</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  const currentQuestion = quiz.questions[currentQuestionIndex];
  if (!currentQuestion) {
    return (
      <div className="container mx-auto py-8">
        <Card className="w-full max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl">Question Not Found</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Sorry, the requested question could not be found.</p>
          </CardContent>
          <CardFooter>
            <Button onClick={() => router.push("/quizzes")}>
              Back to Quizzes
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-2xl">{quiz.title}</CardTitle>
              <CardDescription>
                {quiz.category} • {quiz.difficulty} • Question{" "}
                {currentQuestionIndex + 1} of {quiz.questions.length}
              </CardDescription>
            </div>
            <Timer
              initialTime={timeRemaining}
              onTimeUpdate={(time) => setTimeRemaining(time)}
              onTimeEnd={handleTimeUp}
            />
          </div>
          <Progress value={progress?.progress || 0} className="mt-2" />
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="text-xl font-medium">
              {currentQuestion.question}
            </div>

            {currentQuestion.type === "multiple-choice" && (
              <RadioGroup
                value={selectedAnswer || ""}
                onValueChange={setSelectedAnswer}
              >
                <div className="space-y-3">
                  {currentQuestion.options?.map((option, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <RadioGroupItem
                        value={index.toString()}
                        id={`option-${index}`}
                      />
                      <Label htmlFor={`option-${index}`} className="text-base">
                        {option}
                      </Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            )}

            {currentQuestion.type === "code" && (
              <CodeEditor
                value={codeAnswer || currentQuestion.starterCode || ""}
                onChange={setCodeAnswer}
                language="javascript"
                height="300px"
                testCases={currentQuestion.testCases || []}
              />
            )}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            variant="outline"
            onClick={handlePreviousQuestion}
            disabled={currentQuestionIndex === 0}
          >
            Previous
          </Button>
          <Button onClick={handleNextQuestion}>
            {currentQuestionIndex < quiz.questions.length - 1
              ? "Next"
              : "Finish Quiz"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
