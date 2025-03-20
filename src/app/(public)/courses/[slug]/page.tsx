import { CheckCircleIcon, StarIcon } from "lucide-react";
import courses from "@/data/courses.json";
import CourseHeader from "@/components/courses/CourseHeader";
import CourseContent from "@/components/courses/CourseContent";
import CourseQuizzes from "@/components/courses/CourseQuizzes";
import { Tabs } from "@radix-ui/react-tabs";
import { TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";

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
              <Tabs defaultValue="Course-Content" className="w-full">
                <TabsList className="w-full mb-4">
                  <TabsTrigger value="Course-Content">
                    Course Content
                  </TabsTrigger>
                  <TabsTrigger value="Course-Password">Quizzes</TabsTrigger>
                </TabsList>
                <TabsContent value="Course-Content">
                  {/* Course Content */}
                  <CourseContent course={course} totalLessons={totalLessons} />
                </TabsContent>
                <TabsContent value="Course-Password">
                  {/* Quizzes */}
                  <CourseQuizzes course={course} />
                </TabsContent>
              </Tabs>
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
                          <div className="w-16 h-16 rounded-full relative overflow-hidden">
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
                        <div className="w-16 h-16  relative overflow-hidden">
                          <Image
                            src="https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80"
                            alt="React for Beginners"
                            className="w-full h-full object-cover"
                            fill
                          />
                        </div>
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
                        <div className="w-16 h-16  relative overflow-hidden">
                          <Image
                            src="https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80"
                            alt="Advance Javascript"
                            className="w-full h-full object-cover"
                            fill
                          />
                        </div>
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
