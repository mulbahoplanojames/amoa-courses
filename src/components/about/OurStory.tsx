import Image from "next/image";

const OurStory = () => {
  return (
    <>
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl">
              <Image
                src="/ab3.jpg"
                alt="EduQuiz Pro Team"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <p className="text-lg text-muted-foreground mb-6">
                AMOA Tech was founded in 2024 with a simple yet powerful idea:
                learning should be engaging, interactive, and accessible to
                everyone.
              </p>
              <p className="text-lg text-muted-foreground mb-6">
                What started as a small collection of programming quizzes has
                grown into a comprehensive platform offering courses and
                interactive challenges across multiple disciplines.
              </p>
              <p className="text-lg text-muted-foreground">
                Today, we&apos;re proud to serve over 50+ learners with in and
                around Kigali Rwanda, helping them master new skills, advance
                their careers, and discover the joy of continuous learning and
                we are planning to expand our reach.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default OurStory;
