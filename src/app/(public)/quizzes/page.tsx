"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, BookOpen, Code, Database, Layout, Server } from "lucide-react";
import { type Quiz, getAllQuizzes } from "@/data/quizzes";
import QuizzesHero from "@/components/quizzes/QuizzesHero";
import SelectedCategories from "./SelectedCategories";
import QuizDuration from "./QuizDuration";
import QuizDifficulty from "./QuizDifficulty";
import QuizSort from "./QuizSort";
import QuizCard from "./QuizCard";

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

      const resultsData = localStorage.getItem("amoaquiz_results");
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

      const progressData = localStorage.getItem("amoaquiz_progress");
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
    <div className="">
      <QuizzesHero />

      <div className="flex flex-col md:flex-row gap-6 mb-8 container mx-auto px-4 py-8">
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
          {/* Categories */}
          <SelectedCategories
            categories={categories}
            selectedCategories={selectedCategories}
            toggleCategory={toggleCategory}
            setSelectedCategories={setSelectedCategories}
          />
          <div className="grid grid-cols-2 gap-3">
            <QuizDifficulty
              selectedDifficulties={selectedDifficulties}
              setSelectedDifficulties={setSelectedDifficulties}
              difficulties={difficulties}
              toggleDifficulty={toggleDifficulty}
            />
            <QuizDuration
              selectedDurations={selectedDurations}
              setSelectedDurations={setSelectedDurations}
              durations={durations}
              toggleDuration={toggleDuration}
            />
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

            <QuizSort
              filteredQuizzes={filteredQuizzes}
              setFilteredQuizzes={setFilteredQuizzes}
            />
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
                <QuizCard
                  key={quiz.id}
                  quiz={quiz}
                  inProgressQuizIds={inProgressQuizIds}
                  completedQuizIds={completedQuizIds}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
