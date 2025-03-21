"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, AlertCircle } from "lucide-react";
import { type Quiz, getQuizById } from "@/data/quizzes";

// Define types for quiz results
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
    userAnswer: string | null;
    correctAnswer: string | null;
    isCorrect: boolean;
    explanation?: string | null;
  }[];
}

export default function QuizResultsPage() {
  const router = useRouter();
  const params = useParams();
  const quizId = params?.id as string;

  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [result, setResult] = useState<QuizResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Function to get quiz result by ID directly from localStorage
  const getQuizResult = (quizId: string): QuizResult | null => {
    try {
      if (typeof window === "undefined") return null;

      const resultsData = localStorage.getItem("eduquiz_results");
      if (!resultsData) return null;

      const allResults = JSON.parse(resultsData);
      if (!Array.isArray(allResults)) return null;

      // Get the most recent result for this quiz
      const quizResults = allResults.filter((r) => r.quizId === quizId);
      return quizResults.length > 0
        ? quizResults[quizResults.length - 1]
        : null;
    } catch (error) {
      console.error("Error getting quiz result:", error);
      return null;
    }
  };

  // Function to remove quiz progress
  const removeQuizProgress = (quizId: string): void => {
    try {
      if (typeof window === "undefined") return;

      const progressData = localStorage.getItem("eduquiz_progress");
      if (!progressData) return;

      const allProgress = JSON.parse(progressData);
      if (!Array.isArray(allProgress)) return;

      const updatedProgress = allProgress.filter((p) => p.quizId !== quizId);
      localStorage.setItem("eduquiz_progress", JSON.stringify(updatedProgress));
    } catch (error) {
      console.error("Error removing quiz progress:", error);
    }
  };

  useEffect(() => {
    if (!quizId || typeof window === "undefined") return;

    try {
      // Get quiz data from our data file
      const quizData = getQuizById(quizId);
      if (!quizData) {
        setError("Quiz not found");
        setLoading(false);
        return;
      }

      setQuiz(quizData);

      // Get result data from localStorage
      const resultData = getQuizResult(quizId);
      if (!resultData) {
        setError("Quiz result not found");
        setLoading(false);
        return;
      }

      // Ensure answers array exists
      if (!resultData.answers) {
        resultData.answers = [];
      }

      setResult(resultData);

      // Remove from in-progress once viewed
      removeQuizProgress(quizId);

      setLoading(false);
    } catch (error) {
      console.error("Error loading quiz results:", error);
      setError("Failed to load quiz results");
      setLoading(false);
    }
  }, [quizId]);

  if (loading) {
    return (
      <div className="container mx-auto py-8 max-w-3xl">
        <div className="bg-white p-8 rounded-lg shadow-sm">
          <div className="space-y-4">
            <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-32 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !quiz || !result) {
    return (
      <div className="container mx-auto py-8 max-w-3xl">
        <div className="bg-white p-8 rounded-lg shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <AlertCircle className="h-5 w-5 text-red-500" />
            <h1 className="text-xl font-semibold">Results Not Available</h1>
          </div>
          <p className="text-gray-600 mb-4">
            {error || "The quiz results could not be loaded"}
          </p>
          <p>
            Sorry, we couldn&apos;t load the quiz results. This might be due to:
          </p>
          <ul className="list-disc list-inside mt-2 space-y-1 mb-6">
            <li>You haven&apos;t completed this quiz yet</li>
            <li>The quiz has been deleted</li>
            <li>There was a problem with your browser storage</li>
          </ul>
          <Button asChild>
            <Link href="/quizzes">Back to Quizzes</Link>
          </Button>
        </div>
      </div>
    );
  }

  // Ensure answers array exists and has items
  const answers = Array.isArray(result.answers) ? result.answers : [];

  return (
    <div className="container mx-auto py-8 px-4 max-w-3xl">
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-1">Quiz Results</h1>
          <p className="text-gray-500 text-sm">{quiz.title}</p>

          <div className="flex flex-col items-center justify-center my-10">
            <div className="relative w-32 h-32 flex items-center justify-center border-2 border-gray-200 rounded-full mb-4">
              <span className="text-3xl font-bold">{result.score}%</span>
            </div>
            <p className="text-center">
              You got{" "}
              <strong>
                {result.correctAnswers} out of {result.totalQuestions}
              </strong>{" "}
              questions correct.
            </p>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-4">Question Summary</h2>

          <div className="space-y-4">
            {answers.map((answer, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg ${
                  answer.isCorrect ? "bg-green-50" : "bg-red-50"
                }`}
              >
                <div className="flex gap-2 mb-2">
                  {answer.isCorrect ? (
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                  )}
                  <div>
                    <p className="font-medium">
                      Question {index + 1}: {answer.question}
                    </p>
                    <p className="text-sm mt-1">
                      <span className="font-medium">Your answer: </span>
                      <span
                        className={
                          answer.isCorrect ? "text-green-600" : "text-red-600"
                        }
                      >
                        {answer.userAnswer || "No answer provided"}
                      </span>
                    </p>
                    {!answer.isCorrect && (
                      <p className="text-sm mt-1">
                        <span className="font-medium">Correct answer: </span>
                        <span className="text-green-600">
                          {answer.correctAnswer}
                        </span>
                      </p>
                    )}
                    {answer.explanation && (
                      <div className="mt-2">
                        <p className="text-sm font-medium">Explanation:</p>
                        <p className="text-sm text-gray-600">
                          {answer.explanation}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-between mt-8">
          <Button variant="outline" asChild>
            <Link href="/quizzes">Back to Quizzes</Link>
          </Button>
          <Button onClick={() => router.push(`/quiz/${quizId}`)}>
            Retake Quiz
          </Button>
        </div>
      </div>
    </div>
  );
}
