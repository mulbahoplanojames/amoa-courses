import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

const HomeHero = () => {
  return (
    <>
      <section className="relative bg-gradient-to-r from-primary/90 to-primary py-20 text-white overflow-hidden ">
        <div className="absolute inset-0 bg-grid-white/10  [mask-image:linear-gradient(to_bottom,transparent,black)] dark:bg-black"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-block px-3 py-1 rounded-full bg-white/20 text-sm font-medium backdrop-blur-sm">
                The Ultimate Learning Experience
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                Master New Skills with Interactive Courses & Quizzes
              </h1>
              <p className="text-lg md:text-xl text-white/80 max-w-xl">
                AMOA combines interactive learning, real-time coding challenges,
                and gamification to make learning engaging and effective.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button
                  asChild
                  size="lg"
                  className="bg-white text-primary hover:bg-white/90"
                >
                  <Link href="/quizzes">Start Learning Now</Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  className=" text-white hover:bg-primary-clr/80 bg-primary-clr"
                >
                  <Link href="#how-it-works">How It Works</Link>
                </Button>
              </div>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full bg-primary-foreground flex items-center justify-center border-2 border-primary"
                    >
                      <span className="text-xs font-medium text-primary">
                        U{i}
                      </span>
                    </div>
                  ))}
                </div>
                <span className="text-white/80">
                  Join 10,000+ learners today
                </span>
              </div>
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden shadow-2xl hidden lg:block">
              <div className="absolute inset-0 bg-gradient-to-br from-black/40 to-black/10 z-10 rounded-lg"></div>
              <Image
                src="/ab2.jpg"
                alt="EduQuiz Pro Platform"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomeHero;
