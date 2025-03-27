import { MetadataRoute } from "next";

export default function robot(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["api/courses", "api/quiz", "api/survey", "/admin"],
    },
    sitemap: "https://amoa-courses.vercel.app/sitemap.xml",
  };
}
