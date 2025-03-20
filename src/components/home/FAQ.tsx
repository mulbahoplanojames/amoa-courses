import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

const faq = [
  {
    question: "Is AMOA free to use?",
    answer:
      "AMOA offers both free and premium content. You can access a wide range of quizzes for free, while premium quizzes and features require a subscription.",
  },
  {
    question: "How often is new content added?",
    answer:
      "We add new courses, quizzes and coding challenges weekly, covering the latest technologies and industry best practices.",
  },
  {
    question: "Can I create my own quizzes?",
    answer:
      "Yes! Premium users can create custom quizzes and share them with their team or the AMOA community.",
  },
  {
    question: "Are the certificates recognized by employers?",
    answer:
      "Our certificates demonstrate your proficiency in specific skills and are recognized by many employers in the tech industry.",
  },
  {
    question: "How does the coding environment work?",
    answer:
      "Our built-in code editor which is coming soon and written in Typescript supports multiple programming languages and includes test cases to validate your solutions in real-time.",
  },
];

const FAQ = () => {
  return (
    <>
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Find answers to common questions about AMOA.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              {faq.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left font-medium">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>
    </>
  );
};

export default FAQ;
