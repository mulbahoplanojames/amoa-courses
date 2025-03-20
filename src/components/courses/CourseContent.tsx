import { Course } from "@/types/course-type";
import {
  AwardIcon,
  BookOpenIcon,
  CheckCircleIcon,
  FileTextIcon,
  LockIcon,
  PlayIcon,
} from "lucide-react";
import React from "react";

const CourseContent = ({
  course,
  totalLessons,
}: {
  course: Course;
  totalLessons: number;
}) => {
  return (
    <>
      <div className="mb-8 overflow-hidden bg-white rounded-lg shadow">
        <div className="p-6">
          <h2 className="text-xl font-bold text-gray-900">Course Content</h2>
          <div className="flex items-center mt-2 text-sm text-gray-500">
            <span>{course.modules.length} modules</span>
            <span className="mx-2">•</span>
            <span>{totalLessons} lessons</span>
            <span className="mx-2">•</span>
            <span>{course.totalHours} total hours</span>
          </div>
          <div className="mt-6 space-y-4">
            {course.modules.map((module) => (
              <div
                key={module.id}
                className="overflow-hidden border border-gray-200 rounded-lg"
              >
                <div className="flex items-center justify-between px-4 py-3 cursor-pointer bg-gray-50">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">
                      {module.title}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {module.description}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <span className="mr-4 text-sm text-gray-500">
                      {module.duration}
                    </span>
                    <svg
                      className="w-5 h-5 text-gray-500"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
                <div className="px-4 py-3 space-y-2 border-t border-gray-200">
                  {module.lessons.map((lesson) => (
                    <div
                      key={lesson.id}
                      className="flex items-center justify-between py-2"
                    >
                      <div className="flex items-center">
                        {lesson.isCompleted ? (
                          <CheckCircleIcon className="w-5 h-5 mr-3 text-green-500" />
                        ) : (
                          <div className="w-5 h-5 mr-3 border-2 border-gray-300 rounded-full"></div>
                        )}
                        <div>
                          <div className="flex items-center">
                            {lesson.type === "video" && (
                              <PlayIcon className="w-4 h-4 mr-1 text-indigo-500" />
                            )}
                            {lesson.type === "text" && (
                              <FileTextIcon className="w-4 h-4 mr-1 text-indigo-500" />
                            )}
                            {lesson.type === "interactive" && (
                              <BookOpenIcon className="w-4 h-4 mr-1 text-indigo-500" />
                            )}
                            {lesson.type === "project" && (
                              <AwardIcon className="w-4 h-4 mr-1 text-indigo-500" />
                            )}
                            <span className="text-sm font-medium text-gray-900">
                              {lesson.title}
                            </span>
                          </div>
                          <span className="text-xs text-gray-500">
                            {lesson.type}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <span className="mr-3 text-xs text-gray-500">
                          {lesson.duration}
                        </span>
                        {lesson.isCompleted ? (
                          <button className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                            Replay
                          </button>
                        ) : module.id === 1 ||
                          module.lessons.some((l) => l.isCompleted) ? (
                          <button className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                            Start
                          </button>
                        ) : (
                          <LockIcon className="w-4 h-4 text-gray-400" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseContent;
