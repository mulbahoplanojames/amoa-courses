import React from "react";
import { Card, CardContent } from "../ui/card";
import { CheckCircle, Globe, Lightbulb } from "lucide-react";

const missions = [
  {
    icon: <Lightbulb className="h-10 w-10 text-primary" />,
    title: "Inspire Curiosity",
    description:
      "We create content that sparks curiosity and encourages a lifelong love of learning.",
  },
  {
    icon: <CheckCircle className="h-10 w-10 text-primary" />,
    title: "Build Practical Skills",
    description:
      "Our courses and quizzes focus on real-world applications and practical skills that matter.",
  },
  {
    icon: <Globe className="h-10 w-10 text-primary" />,
    title: "Global Access",
    description:
      "We're committed to making education accessible to learners in Africa and around the world.",
  },
];

const OurMission = () => {
  return (
    <>
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
            <p className="text-lg text-muted-foreground">
              We believe that education is the most powerful tool for changing
              lives and shaping the future. Our mission is to make high-quality
              learning experiences accessible to everyone, everywhere.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {missions.map((item, index) => (
              <Card key={index} className="border-none shadow-md">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="p-3 rounded-full bg-primary/10 mb-4">
                      {item.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default OurMission;
