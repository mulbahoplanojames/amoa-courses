import {
  BarChart3Icon,
  BrainIcon,
  ClockIcon,
  CodeIcon,
  GraduationCapIcon,
  TrophyIcon,
} from "lucide-react";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

const features = [
  {
    icon: <BrainIcon className="h-10 w-10 text-primary" />,
    title: "Adaptive Learning",
    description:
      "Our platform adapts to your skill level, providing personalized learning paths that evolve as you progress.",
  },
  {
    icon: <CodeIcon className="h-10 w-10 text-primary" />,
    title: "Interactive Coding",
    description:
      "Practice coding in real-time with our built-in editor that supports multiple programming languages.",
  },
  {
    icon: <ClockIcon className="h-10 w-10 text-primary" />,
    title: "Timed Challenges",
    description:
      "Test your knowledge under pressure with timed quizzes that simulate real-world scenarios.",
  },
  {
    icon: <TrophyIcon className="h-10 w-10 text-primary" />,
    title: "Gamification",
    description:
      "Earn badges, climb leaderboards, and track your progress to stay motivated throughout your learning journey.",
  },
  {
    icon: <BarChart3Icon className="h-10 w-10 text-primary" />,
    title: "Detailed Analytics",
    description:
      "Get insights into your performance with comprehensive analytics that highlight strengths and areas for improvement.",
  },
  {
    icon: <GraduationCapIcon className="h-10 w-10 text-primary" />,
    title: "Certification",
    description:
      "Earn certificates upon completing courses to showcase your skills to employers and peers.",
  },
];

const Features = () => {
  return (
    <>
      <section className="py-20" id="features">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Powerful Features for Effective Learning
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our platform combines interactive quizzes, real-time coding, and
              gamification to create an engaging learning experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="border-none shadow-md hover:shadow-lg transition-shadow"
              >
                <CardHeader>
                  <div className="p-3 rounded-full bg-primary-clr/20  w-fit">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl mt-4">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Features;
