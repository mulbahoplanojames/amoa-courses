"use client";

import React, { useState } from "react";
import {
  SearchIcon,
  FilterIcon,
  BookOpenIcon,
  UsersIcon,
  ClockIcon,
  StarIcon,
} from "lucide-react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import Image from "next/image";
const courses = [
  {
    id: 1,
    title: "JavaScript Fundamentals",
    description: "Learn the core concepts of JavaScript programming language",
    image:
      "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    category: "Programming",
    level: "Beginner",
    duration: "4 weeks",
    students: 1245,
    rating: 4.8,
    instructor: "John Doe",
    price: "Free",
  },
  {
    id: 2,
    title: "React for Beginners",
    description: "Start building modern web applications with React",
    image:
      "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    category: "Web Development",
    level: "Intermediate",
    duration: "6 weeks",
    students: 985,
    rating: 4.9,
    instructor: "Sarah Johnson",
    price: "$49.99",
  },
  {
    id: 3,
    title: "Python Data Science",
    description: "Master data analysis and visualization with Python",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    category: "Data Science",
    level: "Advanced",
    duration: "8 weeks",
    students: 2340,
    rating: 4.7,
    instructor: "Michael Chen",
    price: "$69.99",
  },
  {
    id: 4,
    title: "UI/UX Design Principles",
    description: "Learnhref create beautiful and functional user interfaces",
    image:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    category: "Design",
    level: "Intermediate",
    duration: "5 weeks",
    students: 1120,
    rating: 4.6,
    instructor: "Emma Wilson",
    price: "$59.99",
  },
  {
    id: 5,
    title: "Full-Stack Web Development",
    description: "Become a full-stack developer with MERN stack",
    image:
      "https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    category: "Web Development",
    level: "Advanced",
    duration: "10 weeks",
    students: 875,
    rating: 4.9,
    instructor: "David Brown",
    price: "$89.99",
  },
  {
    id: 6,
    title: "Mobile App Development with React Native",
    description: "Build cross-platform mobile apps with React Native",
    image:
      "https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    category: "Mobile Development",
    level: "Intermediate",
    duration: "7 weeks",
    students: 690,
    rating: 4.5,
    instructor: "Jessica Lee",
    price: "$69.99",
  },
];
const categories = [
  "All Categories",
  "Programming",
  "Web Development",
  "Data Science",
  "Design",
  "Mobile Development",
];
const levels = ["All Levels", "Beginner", "Intermediate", "Advanced"];
const CoursesPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedLevel, setSelectedLevel] = useState("All Levels");
  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "All Categories" ||
      course.category === selectedCategory;
    const matchesLevel =
      selectedLevel === "All Levels" || course.level === selectedLevel;
    return matchesSearch && matchesCategory && matchesLevel;
  });
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Explore Courses
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            Discover a wide range of courses to enhance your skills and
            knowledge
          </p>
        </div>
        {/* Search and Filter */}
        <div className="mt-8 flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SearchIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-3"
                placeholder="Search courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <div className="flex space-x-4">
            <div className="relative inline-block text-left">
              <select
                className="block w-full pl-3 pr-10 py-3 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <FilterIcon className="h-4 w-4 text-gray-400" />
              </div>
            </div>
            <div className="relative inline-block text-left">
              <select
                className="block w-full pl-3 pr-10 py-3 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
              >
                {levels.map((level) => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <FilterIcon className="h-4 w-4 text-gray-400" />
              </div>
            </div>
          </div>
        </div>
        {/* Courses Grid */}
        <div className="mt-12 grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {filteredCourses.length > 0 ? (
            filteredCourses.map((course) => (
              <Link
                key={course.id}
                href={`/courses/${course.id}`}
                className="group"
              >
                <Card className="bg-white overflow-hidden shadow-lg rounded-lg transition-all duration-300 hover:shadow-xl p-0">
                  <div className="h-48 w-full overflow-hidden relative">
                    <Image
                      src={course.image}
                      alt={course.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      fill
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-center">
                      <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
                        {course.category}
                      </span>
                      <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
                        {course.level}
                      </span>
                    </div>
                    <h3 className="mt-4 text-xl font-semibold text-gray-900 group-hover:text-indigo-600">
                      {course.title}
                    </h3>
                    <p className="mt-2 text-gray-500">{course.description}</p>
                    <div className="mt-4 flex justify-between items-center">
                      <div className="flex items-center">
                        <StarIcon className="h-5 w-5 text-yellow-400" />
                        <span className="ml-1 text-sm text-gray-600">
                          {course.rating}
                        </span>
                      </div>
                      <span className="text-indigo-600 font-medium">
                        {course.price}
                      </span>
                    </div>
                    <div className="mt-4 flex justify-between text-sm text-gray-500">
                      <div className="flex items-center">
                        <ClockIcon className="h-4 w-4 mr-1" />
                        {course.duration}
                      </div>
                      <div className="flex items-center">
                        <UsersIcon className="h-4 w-4 mr-1" />
                        {course.students} students
                      </div>
                    </div>
                  </div>
                </Card>
              </Link>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <BookOpenIcon className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-lg font-medium text-gray-900">
                No courses found
              </h3>
              <p className="mt-1 text-gray-500">
                Try adjusting your search or filter criteria
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default CoursesPage;
