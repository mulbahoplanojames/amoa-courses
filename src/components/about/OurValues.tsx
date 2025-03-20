const values = [
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
];

const OurValues = () => {
  return (
    <>
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold mb-6">Our Values</h2>
            <p className="text-lg text-muted-foreground">
              These core principles guide everything we do at EduQuiz Pro.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
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
    </>
  );
};

export default OurValues;
