export type Course = {
  id: number;
  title: string;
  description: string;
  startDate: string;
  image: string;
  category: string;
  level: string;
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
  quizzes: Quiz[];
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
  // type: "video" | "article" | "quiz";
  type: string;
  duration: string;
  isCompleted: boolean;
};

export type Quiz = {
  id: number;
  title: string;
  questions: number;
  duration: string;
};
