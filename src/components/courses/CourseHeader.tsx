import { Course } from "@/types/course-type";
import {
  AwardIcon,
  BookOpenIcon,
  ClockIcon,
  FileTextIcon,
  StarIcon,
  UsersIcon,
} from "lucide-react";
import Image from "next/image";
import React from "react";

const CourseHeader = ({
  course,
  progressPercentage,
  totalLessons,
}: {
  course: Course;
  progressPercentage: number;
  totalLessons: number;
}) => {
  return (
    <>
      <div className="bg-gradient-to-r from-primary/90 to-primary md:py-10 py-2 text-white">
        <div className="px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="lg:flex lg:items-center lg:justify-between">
            <div className="lg:flex-1">
              <h1 className="text-3xl font-extrabold sm:text-4xl">
                {course.title}
              </h1>
              <p className="mt-3 text-lg">{course.description}</p>
              <div className="flex flex-wrap items-center mt-4 text-sm">
                <div className="flex items-center mb-2 mr-6">
                  <BookOpenIcon className="w-5 h-5 mr-1" />
                  {course.level}
                </div>
                <div className="flex items-center mb-2 mr-6">
                  <ClockIcon className="w-5 h-5 mr-1" />
                  {course.duration} ({course.totalHours} hours)
                </div>
                <div className="flex items-center mb-2 mr-6">
                  <UsersIcon className="w-5 h-5 mr-1" />
                  {course.students.toLocaleString()} students
                </div>
                <div className="flex items-center mb-2">
                  <StarIcon className="w-5 h-5 mr-1 text-yellow-300" />
                  <span>{course.rating}</span>
                  <span className="ml-1 text-indigo-200">
                    ({course.reviewCount} reviews)
                  </span>
                </div>
              </div>
              <div className="flex items-center mt-6">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center w-12 h-12 text-lg font-medium text-indigo-700 bg-indigo-100 rounded-full">
                    {course.instructor.avatar ? (
                      <div className="w-12 h-12 rounded-full relative overflow-hidden">
                        <Image
                          src={course.instructor.avatar}
                          alt={course.instructor.name}
                          className="w-full h-full object-cover"
                          fill
                        />
                      </div>
                    ) : (
                      course.instructor.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                    )}
                  </div>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium">Instructor</p>
                  <p className="text-lg">{course.instructor.name}</p>
                </div>
              </div>
            </div>
            {/* course info card  */}
            <div className="mt-8 lg:mt-0 lg:ml-8">
              <div className="w-full overflow-hidden bg-white rounded-lg shadow-lg lg:w-80">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-bold text-gray-900">
                      {course.price}
                    </span>
                    {progressPercentage > 0 && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                        {progressPercentage}% complete
                      </span>
                    )}
                  </div>
                  {progressPercentage > 0 ? (
                    <button className="flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                      Continue Learning
                    </button>
                  ) : (
                    <button className="flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-primary-clr border border-transparent rounded-md shadow-sm hover:bg-primary-clr/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                      Enroll Now
                    </button>
                  )}
                  <div className="mt-4">
                    <h3 className="text-sm font-medium text-gray-900">
                      This course includes:
                    </h3>
                    <ul className="mt-2 space-y-2 text-sm text-gray-700">
                      <li className="flex items-center">
                        <ClockIcon className="w-4 h-4 mr-2 text-indigo-500" />
                        {course.totalHours} hours of content
                      </li>
                      <li className="flex items-center">
                        <FileTextIcon className="w-4 h-4 mr-2 text-indigo-500" />
                        {totalLessons} lessons
                      </li>
                      <li className="flex items-center">
                        <AwardIcon className="w-4 h-4 mr-2 text-indigo-500" />
                        {course.quizzes.length} quizzes
                      </li>
                      <li className="flex items-center">
                        <BookOpenIcon className="w-4 h-4 mr-2 text-indigo-500" />
                        Lifetime access
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseHeader;
