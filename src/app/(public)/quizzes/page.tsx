"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Search,
  Filter,
  Clock,
  BarChart3,
  BookOpen,
  Code,
  Database,
  Layout,
  Server,
} from "lucide-react";
import { type Quiz, getAllQuizzes } from "@/data/quizzes";
import QuizzesHero from "@/components/quizzes/QuizzesHero";

// Define types for progress and results
// interface QuizProgress {
//   quizId: string;
//   title: string;
//   category: string;
//   currentQuestion: number;
//   totalQuestions: number;
//   answers: Record<string, string>;
//   startedAt: string;
//   lastUpdated: string;
//   completed: boolean;
//   progress: number;
// }

// interface QuizResult {
//   quizId: string;
//   title: string;
//   category: string;
//   difficulty: string;
//   score: number;
//   correctAnswers: number;
//   totalQuestions: number;
//   timeSpent: string;
//   completedAt: string;
//   answers: any[];
// }

export default function QuizzesPage() {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [filteredQuizzes, setFilteredQuizzes] = useState<Quiz[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedDifficulties, setSelectedDifficulties] = useState<string[]>(
    []
  );
  const [selectedDurations, setSelectedDurations] = useState<string[]>([]);
  const [completedQuizIds, setCompletedQuizIds] = useState<string[]>([]);
  const [inProgressQuizIds, setInProgressQuizIds] = useState<string[]>([]);

  // Categories with icons
  const categories = [
    { name: "Programming", icon: <Code className="h-4 w-4" /> },
    { name: "Web Development", icon: <Layout className="h-4 w-4" /> },
    { name: "Computer Science", icon: <BookOpen className="h-4 w-4" /> },
    { name: "Databases", icon: <Database className="h-4 w-4" /> },
    { name: "Design", icon: <Layout className="h-4 w-4" /> },
    { name: "Backend", icon: <Server className="h-4 w-4" /> },
  ];

  // Duration options
  const durations = [
    { label: "Under 15 min", value: "under-15-min" },
    { label: "15-30 min", value: "15-30-min" },
    { label: "Over 30 min", value: "over-30-min" },
  ];

  // Difficulty levels
  const difficulties = ["Beginner", "Intermediate", "Advanced"];

  // Function to get completed quiz IDs from localStorage
  const getCompletedQuizIds = (): string[] => {
    try {
      if (typeof window === "undefined") return [];

      const resultsData = localStorage.getItem("eduquiz_results");
      if (!resultsData) return [];

      const results = JSON.parse(resultsData);
      if (!Array.isArray(results)) return [];

      return results.map((r) => r.quizId);
    } catch (error) {
      console.error("Error getting completed quiz IDs:", error);
      return [];
    }
  };

  // Function to get in-progress quiz IDs from localStorage
  const getInProgressQuizIds = (): string[] => {
    try {
      if (typeof window === "undefined") return [];

      const progressData = localStorage.getItem("eduquiz_progress");
      if (!progressData) return [];

      const progress = JSON.parse(progressData);
      if (!Array.isArray(progress)) return [];

      return progress.map((p) => p.quizId);
    } catch (error) {
      console.error("Error getting in-progress quiz IDs:", error);
      return [];
    }
  };

  useEffect(() => {
    // Load quizzes from our data file
    const allQuizzes = getAllQuizzes();
    setQuizzes(allQuizzes);
    setFilteredQuizzes(allQuizzes);

    // Only run localStorage operations in browser
    if (typeof window !== "undefined") {
      try {
        // Get completed quiz IDs
        setCompletedQuizIds(getCompletedQuizIds());

        // Get in-progress quiz IDs
        setInProgressQuizIds(getInProgressQuizIds());
      } catch (error) {
        console.error("Error loading quiz progress data:", error);
      }
    }
  }, []);

  useEffect(() => {
    // Apply filters whenever filter criteria change
    applyFilters();
  }, [
    searchTerm,
    activeTab,
    selectedCategories,
    selectedDifficulties,
    selectedDurations,
    quizzes,
  ]);

  const applyFilters = () => {
    let filtered = [...quizzes];

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (quiz) =>
          quiz.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          quiz.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by tab
    if (activeTab === "popular") {
      filtered = filtered
        .sort((a, b) => b.popularity - a.popularity)
        .slice(0, 10);
    } else if (activeTab === "new") {
      filtered = filtered
        .sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
        .slice(0, 10);
    } else if (activeTab === "completed") {
      filtered = filtered.filter((quiz) => completedQuizIds.includes(quiz.id));
    }

    // Filter by categories
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((quiz) =>
        selectedCategories.includes(quiz.category)
      );
    }

    // Filter by difficulties
    if (selectedDifficulties.length > 0) {
      filtered = filtered.filter((quiz) =>
        selectedDifficulties.includes(quiz.difficulty)
      );
    }

    // Filter by durations
    if (selectedDurations.length > 0) {
      filtered = filtered.filter((quiz) => {
        const timeInMinutes = Number.parseInt(quiz.timeEstimate.split(" ")[0]);

        return selectedDurations.some((duration) => {
          if (duration === "under-15-min") return timeInMinutes < 15;
          if (duration === "15-30-min")
            return timeInMinutes >= 15 && timeInMinutes <= 30;
          if (duration === "over-30-min") return timeInMinutes > 30;
          return false;
        });
      });
    }

    setFilteredQuizzes(filtered);
  };

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const toggleDifficulty = (difficulty: string) => {
    setSelectedDifficulties((prev) =>
      prev.includes(difficulty)
        ? prev.filter((d) => d !== difficulty)
        : [...prev, difficulty]
    );
  };

  const toggleDuration = (duration: string) => {
    setSelectedDurations((prev) =>
      prev.includes(duration)
        ? prev.filter((d) => d !== duration)
        : [...prev, duration]
    );
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategories([]);
    setSelectedDifficulties([]);
    setSelectedDurations([]);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <QuizzesHero />
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Quiz Library</h1>
        <p className="text-muted-foreground">
          Explore our collection of quizzes to test and expand your knowledge
        </p>
      </header>

      <div className="flex flex-col md:flex-row gap-6 mb-8">
        <div className="md:w-1/4 space-y-6">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search quizzes..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-medium">Categories</h3>
              {selectedCategories.length > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 px-2 text-xs"
                  onClick={() => setSelectedCategories([])}
                >
                  Clear
                </Button>
              )}
            </div>
            <div className="space-y-2">
              {categories.map((category) => (
                <Button
                  key={category.name}
                  variant={
                    selectedCategories.includes(category.name)
                      ? "default"
                      : "outline"
                  }
                  className="justify-start w-full font-normal"
                  onClick={() => toggleCategory(category.name)}
                >
                  {category.icon}
                  <span className="ml-2">{category.name}</span>
                </Button>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-medium">Difficulty</h3>
              {selectedDifficulties.length > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 px-2 text-xs"
                  onClick={() => setSelectedDifficulties([])}
                >
                  Clear
                </Button>
              )}
            </div>
            <div className="space-y-2">
              {difficulties.map((level) => (
                <div key={level} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id={`difficulty-${level.toLowerCase()}`}
                    className="rounded text-primary focus:ring-primary"
                    checked={selectedDifficulties.includes(level)}
                    onChange={() => toggleDifficulty(level)}
                  />
                  <label
                    htmlFor={`difficulty-${level.toLowerCase()}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {level}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-medium">Duration</h3>
              {selectedDurations.length > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 px-2 text-xs"
                  onClick={() => setSelectedDurations([])}
                >
                  Clear
                </Button>
              )}
            </div>
            <div className="space-y-2">
              {durations.map((duration) => (
                <div
                  key={duration.value}
                  className="flex items-center space-x-2"
                >
                  <input
                    type="checkbox"
                    id={`duration-${duration.value}`}
                    className="rounded text-primary focus:ring-primary"
                    checked={selectedDurations.includes(duration.value)}
                    onChange={() => toggleDuration(duration.value)}
                  />
                  <label
                    htmlFor={`duration-${duration.value}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {duration.label}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {(selectedCategories.length > 0 ||
            selectedDifficulties.length > 0 ||
            selectedDurations.length > 0 ||
            searchTerm) && (
            <Button variant="outline" className="w-full" onClick={clearFilters}>
              Clear All Filters
            </Button>
          )}
        </div>

        <div className="md:w-3/4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full sm:w-auto"
            >
              <TabsList>
                <TabsTrigger value="all">All Quizzes</TabsTrigger>
                <TabsTrigger value="popular">Popular</TabsTrigger>
                <TabsTrigger value="new">New</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Button variant="outline" size="sm" className="h-8 px-3 text-xs">
                <Filter className="h-3.5 w-3.5 mr-1" />
                Filters
              </Button>
              <select
                className="h-8 rounded-md border border-input bg-background px-3 py-1 text-xs ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                onChange={(e) => {
                  const value = e.target.value;
                  if (value === "popularity") {
                    setFilteredQuizzes(
                      [...filteredQuizzes].sort(
                        (a, b) => b.popularity - a.popularity
                      )
                    );
                  } else if (value === "newest") {
                    setFilteredQuizzes(
                      [...filteredQuizzes].sort(
                        (a, b) =>
                          new Date(b.createdAt).getTime() -
                          new Date(a.createdAt).getTime()
                      )
                    );
                  } else if (value === "name") {
                    setFilteredQuizzes(
                      [...filteredQuizzes].sort((a, b) =>
                        a.title.localeCompare(b.title)
                      )
                    );
                  }
                }}
              >
                <option value="popularity">Sort by: Popularity</option>
                <option value="newest">Sort by: Newest</option>
                <option value="name">Sort by: Name (A-Z)</option>
              </select>
            </div>
          </div>

          {filteredQuizzes.length === 0 ? (
            <div className="text-center py-12 bg-muted/20 rounded-lg">
              <BookOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">No quizzes found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your filters or search term
              </p>
              <Button onClick={clearFilters}>Clear Filters</Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredQuizzes.map((quiz) => (
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
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
