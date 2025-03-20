export type Course = {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  duration: string;
  totalHours: number;
  students: number;
  rating: number;
  reviewCount: number;
  instructor: {
    name: string;
    title: string;
    bio: string;
    avatar: string | null;
  };
  price: string;
  modules: Module[];
};

type Module = {
  id: number;
  title: string;
  description: string;
  duration: string;
  lessons: Lesson[];
};

type Lesson = {
  id: number;
  title: string;
  type: "video" | "article" | "quiz";
  duration: string;
  isCompleted: boolean;
};
