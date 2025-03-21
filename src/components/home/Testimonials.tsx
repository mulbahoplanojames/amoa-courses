import React from "react";
import { Card, CardContent } from "../ui/card";
import { StarIcon } from "lucide-react";
import Image from "next/image";

const testimonials = [
  {
    quote:
      "AMOA helped me prepare for technical interviews with real-world coding challenges. I landed my dream job at a top tech company!",
    author: "Michael Chen",
    role: "Software Engineer",
    company: "TechCorp",
    avatar: "/clients/testimo1.jpg",
    stars: 5,
  },
  {
    quote:
      "The interactive quizzes and immediate feedback made learning new programming languages so much easier. I've recommended it to all my colleagues.",
    author: "Sarah Johnson ",
    role: "Back End Developer",
    company: "WebSolutions",
    avatar: "/clients/testimo2.jpg",
    stars: 4,
  },
  {
    quote:
      "As a self-taught developer, AMOA filled the gaps in my knowledge and gave me the confidence to take on more complex projects.",
    author: "Emily Rodriguez",
    role: "Frontend Developer",
    company: "CreativeDigital",
    avatar: "/clients/testimo4.jpg",
    stars: 4,
  },
];

const Testimonials = () => {
  return (
    <>
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What Our Users Say
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Hundreds of learners have accelerated their careers with AMOA.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-none shadow-md">
                <CardContent className="pt-6">
                  <div className="mb-4 text-primary">
                    {Array(testimonial.stars)
                      .fill(null)
                      .map((_, index) => (
                        <StarIcon
                          key={index}
                          className="inline-block h-5 w-5 fill-current text-yellow-500"
                        />
                      ))}
                  </div>
                  <p className="mb-6 italic text-muted-foreground">
                    &quot;{testimonial.quote}&quot;
                  </p>
                  <div className="flex items-center">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
                      <Image
                        src={testimonial.avatar || "/placeholder.svg"}
                        alt={testimonial.author}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-semibold">{testimonial.author}</h4>
                      <p className="text-sm text-muted-foreground">
                        {testimonial.role}, {testimonial.company}
                      </p>
                    </div>
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

export default Testimonials;
