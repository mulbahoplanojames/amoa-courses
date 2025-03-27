import courses from "@/data/courses.json";
import { quizzes } from "@/data/quizzes";

export default async function sitemap() {
  const courseUrls = courses.map((course) => ({
    url: `https://amoa-courses.vercel.app/courses/${course.slug}`,
    lastModified: new Date(),
  }));

  const quizUrls = quizzes.map((quiz) => ({
    url: `https://amoa-courses.vercel.app/quiz/${quiz.id}`,
    lastModified: new Date(),
  }));

  return [
    {
      url: "https://amoa-courses.vercel.app/",
      lastModified: new Date(),
    },
    {
      url: "https://amoa-courses.vercel.app/courses",
      lastModified: new Date(),
    },
    {
      url: "https://amoa-courses.vercel.app/about",
      lastModified: new Date(),
    },
    {
      url: "https://amoa-courses.vercel.app/quizzes",
      lastModified: new Date(),
    },
    {
      url: "https://amoa-courses.vercel.app/courses/survey",
      lastModified: new Date(),
    },
    ...courseUrls,
    ...quizUrls,
  ];
}
