import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import AboutHero from "@/components/about/AboutHero";
import OurStory from "@/components/about/OurStory";
import OurMission from "@/components/about/OurMission";
import Stats from "@/components/home/Stats";
import OurTeam from "@/components/about/OurTeam";

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <AboutHero />
      <OurStory />
      <OurMission />
      <Stats />
      <OurTeam />

      {/* Values Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold mb-6">Our Values</h2>
            <p className="text-lg text-muted-foreground">
              These core principles guide everything we do at EduQuiz Pro.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: "Excellence",
                description:
                  "We strive for excellence in all our content, ensuring accuracy, relevance, and quality.",
              },
              {
                title: "Innovation",
                description:
                  "We continuously explore new ways to make learning more engaging and effective.",
              },
              {
                title: "Inclusivity",
                description:
                  "We design our platform to be accessible and welcoming to learners of all backgrounds.",
              },
              {
                title: "Integrity",
                description:
                  "We maintain the highest standards of honesty and ethical conduct in all our operations.",
              },
            ].map((value, index) => (
              <div
                key={index}
                className="flex gap-4 p-6 bg-muted/20 rounded-lg"
              >
                <div className="text-4xl font-bold text-primary/20">
                  0{index + 1}
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Join Our Learning Community
          </h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8">
            Start your learning journey today and join thousands of students who
            are advancing their skills with EduQuiz Pro.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              asChild
              size="lg"
              className="bg-white text-primary hover:bg-white/90"
            >
              <Link href="/signup">Get Started</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white/10"
            >
              <Link href="/courses">Browse Courses</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
