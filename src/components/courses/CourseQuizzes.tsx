import { Course } from "@/types/course-type";
import { AwardIcon, ClockIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

const CourseQuizzes = ({ course }: { course: Course }) => {
  return (
    <>
      <div className="overflow-hidden bg-white rounded-lg shadow">
        <div className="p-6">
          <h2 className="text-xl font-bold text-gray-900">Course Quizzes</h2>
          <p className="mt-1 text-sm text-gray-500">
            Test your knowledge with these quizzes
          </p>
          <div className="mt-6 space-y-4">
            {course.quizzes.map((quiz) => (
              <div
                key={quiz.id}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
              >
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    {quiz.title}
                  </h3>
                  <div className="flex items-center mt-1 text-sm text-gray-500">
                    <AwardIcon className="w-4 h-4 mr-1" />
                    <span>{quiz.questions} questions</span>
                    <span className="mx-2">•</span>
                    <ClockIcon className="w-4 h-4 mr-1" />
                    <span>{quiz.duration}</span>
                  </div>
                </div>
                <Link
                  href={`/quizzes/${quiz.id}`}
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700"
                >
                  Take Quiz
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseQuizzes;
