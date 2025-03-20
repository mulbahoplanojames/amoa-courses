import {
  BookOpenIcon,
  ClockIcon,
  CheckCircleIcon,
  LockIcon,
  PlayIcon,
  FileTextIcon,
  AwardIcon,
  StarIcon,
} from "lucide-react";
import courses from "@/data/courses.json";
import Link from "next/link";
import CourseHeader from "@/components/courses/CourseHeader";

const SingleCorsePage = async ({ params }: { params: { slug: string } }) => {
  const { slug } = params;
  const course = courses.find((course) => course.slug === slug);

  if (!course) {
    return <div>Course not found</div>;
  }

  // Calculate progress
  const totalLessons = course.modules.reduce(
    (total, module) => total + module.lessons.length,
    0
  );
  const completedLessons = course.modules.reduce((total, module) => {
    return total + module.lessons.filter((lesson) => lesson.isCompleted).length;
  }, 0);
  const progressPercentage = Math.round(
    (completedLessons / totalLessons) * 100
  );

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        {/* Course Header */}
        <CourseHeader
          course={course}
          progressPercentage={progressPercentage}
          totalLessons={totalLessons}
        />
        {/* Course Content */}
        <div className="px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-3 lg:gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* What You'll Learn */}
              <div className="mb-8 overflow-hidden bg-white rounded-lg shadow">
                <div className="p-6">
                  <h2 className="text-xl font-bold text-gray-900">
                    What You&apos;ll Learn
                  </h2>
                  <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-2">
                    {course.whatYouWillLearn.map((item, index) => (
                      <div key={index} className="flex">
                        <CheckCircleIcon className="flex-shrink-0 w-6 h-6 mr-2 text-green-500" />
                        <span className="text-gray-700">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              {/* Course Content */}
              <div className="mb-8 overflow-hidden bg-white rounded-lg shadow">
                <div className="p-6">
                  <h2 className="text-xl font-bold text-gray-900">
                    Course Content
                  </h2>
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
              {/* Quizzes */}
              <div className="overflow-hidden bg-white rounded-lg shadow">
                <div className="p-6">
                  <h2 className="text-xl font-bold text-gray-900">
                    Course Quizzes
                  </h2>
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
            </div>
            {/* Sidebar */}
            <div className="mt-12 lg:mt-0">
              {/* Instructor */}
              <div className="mb-8 overflow-hidden bg-white rounded-lg shadow">
                <div className="p-6">
                  <h2 className="text-xl font-bold text-gray-900">
                    About the Instructor
                  </h2>
                  <div className="flex items-center mt-4">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center w-16 h-16 text-xl font-medium text-indigo-700 bg-indigo-100 rounded-full">
                        {course.instructor.avatar ? (
                          <img
                            src={course.instructor.avatar}
                            alt={course.instructor.name}
                            className="w-16 h-16 rounded-full"
                          />
                        ) : (
                          course.instructor.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                        )}
                      </div>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-gray-900">
                        {course.instructor.name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {course.instructor.title}
                      </p>
                    </div>
                  </div>
                  <p className="mt-4 text-sm text-gray-700">
                    {course.instructor.bio}
                  </p>
                </div>
              </div>
              {/* Prerequisites */}
              <div className="mb-8 overflow-hidden bg-white rounded-lg shadow">
                <div className="p-6">
                  <h2 className="text-xl font-bold text-gray-900">
                    Prerequisites
                  </h2>
                  <ul className="mt-4 space-y-2">
                    {course.prerequisites.map((prerequisite, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-700">
                          {prerequisite}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              {/* Related Courses */}
              <div className="overflow-hidden bg-white rounded-lg shadow">
                <div className="p-6">
                  <h2 className="text-xl font-bold text-gray-900">
                    Related Courses
                  </h2>
                  <div className="mt-6 space-y-4">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <img
                          className="object-cover w-16 h-16 rounded"
                          src="https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80"
                          alt="React for Beginners"
                        />
                      </div>
                      <div className="ml-4">
                        <h3 className="text-sm font-medium text-gray-900">
                          React for Beginners
                        </h3>
                        <p className="text-xs text-gray-500">
                          6 weeks • Intermediate
                        </p>
                        <div className="flex items-center mt-1">
                          <StarIcon className="w-3 h-3 text-yellow-400" />
                          <span className="ml-1 text-xs text-gray-500">
                            4.9 (985)
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <img
                          className="object-cover w-16 h-16 rounded"
                          src="https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80"
                          alt="Advanced JavaScript"
                        />
                      </div>
                      <div className="ml-4">
                        <h3 className="text-sm font-medium text-gray-900">
                          Advanced JavaScript
                        </h3>
                        <p className="text-xs text-gray-500">
                          5 weeks • Advanced
                        </p>
                        <div className="flex items-center mt-1">
                          <StarIcon className="w-3 h-3 text-yellow-400" />
                          <span className="ml-1 text-xs text-gray-500">
                            4.7 (742)
                          </span>
                        </div>
                      </div>
                    </div>
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

export default SingleCorsePage;
