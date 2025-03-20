import { AwardIcon, BookIcon, CodeIcon, UsersIcon } from "lucide-react";

const stats = [
  {
    icon: <UsersIcon className="h-8 w-8 mx-auto text-primary" />,
    value: "10,000+",
    label: "Active Learners",
  },
  {
    icon: <BookIcon className="h-8 w-8 mx-auto text-primary" />,
    value: "500+",
    label: "Quizzes Available",
  },
  {
    icon: <CodeIcon className="h-8 w-8 mx-auto text-primary" />,
    value: "50+",
    label: "Coding Challenges",
  },
  {
    icon: <AwardIcon className="h-8 w-8 mx-auto text-primary" />,
    value: "25+",
    label: "Categories",
  },
];
const Stats = () => {
  return (
    <>
      <section className="py-12 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {stats.map((stat, index) => (
              <div key={index} className="p-6">
                {stat.icon}
                <h3 className="text-3xl font-bold mt-2">{stat.value}</h3>
                <p className="text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Stats;
