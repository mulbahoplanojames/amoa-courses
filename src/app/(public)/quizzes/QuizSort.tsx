"use client";

import { Quiz } from "@/data/quizzes";

interface QuizSortProps {
  filteredQuizzes: Quiz[];
  setFilteredQuizzes: React.Dispatch<React.SetStateAction<Quiz[]>>;
}

const QuizSort: React.FC<QuizSortProps> = ({
  filteredQuizzes,
  setFilteredQuizzes,
}) => {
  return (
    <>
      <div className="flex items-center gap-2 w-full sm:w-auto">
        <select
          className="h-8 rounded-md border border-input bg-background px-3 py-1 text-xs ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          onChange={(e) => {
            const value = e.target.value;
            if (value === "popularity") {
              setFilteredQuizzes(
                [...filteredQuizzes].sort((a, b) => b.popularity - a.popularity)
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
    </>
  );
};

export default QuizSort;
