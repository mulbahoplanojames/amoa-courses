import Image from "next/image";
import React from "react";
import { Card, CardContent } from "../ui/card";

const team = [
  {
    name: "Oplano James Mulbah",
    role: "Founder & CEO",
    bio: "A Software Engineer with a passion for making education accessible to all.",
    image: "/team/oplano.jpeg",
  },
  {
    name: "Abdallah Aleer",
    role: "Founder & CTO",
    bio: "Software Engineer with focused on creating intuitive learning platforms.",
    image: "/team/abdo.jpeg",
  },
  {
    name: "Solomon Okeke",
    role: "Head of Content",
    bio: "Curriculum expert dedicated to creating engaging learning materials.",
    image: "/team/solo.jpg",
  },
];
const OurTeam = () => {
  return (
    <>
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold mb-6">Meet Our Team</h2>
            <p className="text-lg text-muted-foreground">
              Our diverse team of educators, developers, and designers is
              passionate about creating exceptional learning experiences.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card
                key={index}
                className="border-none shadow-md overflow-hidden p-0"
              >
                <div className="aspect-square relative">
                  <Image
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardContent className="px-6 pt-2 pb-5">
                  <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                  <p className="text-primary font-medium mb-3">{member.role}</p>
                  <p className="text-muted-foreground">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default OurTeam;
