import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

const CTA = () => {
  return (
    <>
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Accelerate Your Learning?
          </h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8">
            Join hundreds of learners who are advancing their skills and careers
            with AMOA Tech. Start learning today!
          </p>
          <div className="flex flex-wrap justify-center gap-4">
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
              className="bg-primary-clr text-white hover:bg-primary-clr/80"
            >
              <Link href="/admin">Create Your Own Quizzes</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default CTA;
