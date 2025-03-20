import React from "react";

const howItWorks = [
  {
    step: "01",
    title: "Choose a Topic",
    description:
      "Browse our extensive library of courses across various categories and difficulty levels.",
  },
  {
    step: "02",
    title: "Learn from Courses",
    description:
      "Learn from our professional courses, solve coding challenges, and test your knowledge in real-time.",
  },
  {
    step: "03",
    title: "Build Projects",
    description:
      "Build real wordl projects and test your knowledge in real-time.",
  },
  {
    step: "04",
    title: "Choose a Quiz Topic",
    description:
      "Browse our extensive library of quizzes across various categories and difficulty levels.",
  },
  {
    step: "05",
    title: "Take the Quiz",
    description:
      "Answer questions, solve coding challenges, and test your knowledge in real-time.",
  },
  {
    step: "06",
    title: "Review Results",
    description:
      "Get immediate feedback with detailed explanations for each question.",
  },

  {
    step: "07",
    title: "Track Progress",
    description:
      "Monitor your improvement over time and identify areas for further study.",
  },
  {
    step: "08",
    title: "Track Progress",
    description:
      "Monitor your improvement over time and identify areas for further study.",
  },
];

const HowItWorks = () => {
  return (
    <>
      <section className="py-20 bg-muted/30" id="how-it-works">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              How AMOA Works
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our simple 4-step process makes learning new skills easy and
              engaging.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorks?.map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-background rounded-lg p-6 shadow-md relative z-10 h-full">
                  <div className="text-4xl font-bold text-primary/20 mb-4">
                    {step.step}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
                {index < 7 && (
                  <div className="hidden lg:block absolute top-1/2 right-0 w-1/2 h-0.5 bg-primary/20 z-0 transform translate-x-1/2"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default HowItWorks;
