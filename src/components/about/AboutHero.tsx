import { Button } from "../ui/button";
import Link from "next/link";

const AboutHero = () => {
  return (
    <>
      <section className="bg-gradient-to-r from-primary/90 to-primary py-20 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              About AMOA Tech
            </h1>
            <p className="text-xl text-white/80 mb-8">
              We&apos;re on a mission to transform education through interactive
              learning experiences that engage, challenge, and inspire.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-white text-primary hover:bg-white/90"
            >
              <Link href="/courses">Explore Our Courses</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutHero;
