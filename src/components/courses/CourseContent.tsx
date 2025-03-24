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

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const CourseContent = ({
  course,
  totalLessons,
}: {
  course: Course;
  totalLessons: number;
}) => {
  return (
    <>
      <div className="mb-8 overflow-hidden dark:transition-shadow bg-white  rounded-lg shadow">
        <div className="p-6">
          <h2 className="text-xl font-bold text-gray-900">Course Content</h2>
          <div className="flex items-center mt-2 text-sm text-gray-500">
            <span>{course.modules.length} modules</span>
            <span className="mx-2">•</span>
            <span>{totalLessons} lessons</span>
            <span className="mx-2">•</span>
            <span>{course.totalHours} total hours</span>
          </div>
          <div className="mt-6 space-y-4 ">
            {course.modules.map((module) => (
              <Accordion
                key={module.id}
                type="single"
                collapsible
                className="overflow-hidden border border-gray-200 rounded-lg w-full"
              >
                <AccordionItem
                  value={module.id.toString()}
                  className="px-4 py-3 cursor-pointer bg-gray-50"
                >
                  <AccordionTrigger className="flex items-center justify-between w-full cursor-pointer">
                    <div className="">
                      <h3 className="text-lg font-medium text-gray-900">
                        {module.title}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {module.description}
                      </p>
                    </div>
                    <div className="flex items-center  ">
                      <span className="mr-4 text-sm text-gray-500">
                        {module.duration}
                      </span>
                    </div>
                  </AccordionTrigger>
                </AccordionItem>
                <AccordionItem
                  className="px-4 py-3 space-y-2 border-t border-gray-200"
                  value={module.id.toString()}
                >
                  {module.lessons.map((lesson) => (
                    <AccordionContent
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
                    </AccordionContent>
                  ))}
                </AccordionItem>
              </Accordion>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseContent;
