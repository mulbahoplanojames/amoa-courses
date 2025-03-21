// Define types
export interface TestCase {
  input: unknown;
  expected: unknown;
}

export interface Question {
  id: string;
  type: "multiple-choice" | "code";
  question: string;
  options?: string[];
  correctAnswer?: string;
  explanation?: string;
  starterCode?: string;
  testCases?: TestCase[];
  solution?: string;
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  timeEstimate: string;
  questions: Question[];
  createdAt: string;
  updatedAt: string;
  popularity: number;
  completions: number;
}

// Quiz data
export const quizzes: Quiz[] = [
  //! quiz one
  {
    id: "1",
    title: "JavaScript Basics Quiz",
    description: "Test your knowledge of JavaScript basics",
    category: "Programming",
    difficulty: "Beginner",
    timeEstimate: "1 min",
    questions: [
      {
        id: "1-1",
        type: "multiple-choice",
        question: "Which of the following is not a JavaScript data type?",
        options: ["String", "Boolean", "Float", "Number"],
        correctAnswer: "2",
        explanation:
          "Float is not a JavaScript data type. JavaScript has Number type that includes both integers and floating point numbers.",
      },
      {
        id: "1-2",
        type: "multiple-choice",
        question: "JavaScript is a statically typed language.",
        options: ["True", "False"],
        correctAnswer: "1",
        explanation:
          "JavaScript is a dynamically typed language, meaning that variable types are determined at runtime and can change throughout the program.",
      },
      {
        id: "1-3",
        type: "multiple-choice",
        question:
          "Which method is used to add an element at the end of an array?",
        options: ["push()", "pop()", "shift()", "unshift()"],
        correctAnswer: "0",
        explanation:
          "The push() method adds one or more elements to the end of an array and returns the new length of the array.",
      },
      {
        id: "1-4",
        type: "multiple-choice",
        question: "What does the === operator do in JavaScript?",
        options: [
          "Assigns a value",
          "Compares values for equality without type conversion",
          "Compares values for equality with type conversion",
          "Checks if a value exists",
        ],
        correctAnswer: "1",
        explanation:
          "The strict equality operator (===) checks whether its two operands are equal, returning a Boolean result. Unlike the equality operator, it doesn't perform type conversion.",
      },
      {
        id: "1-5",
        type: "multiple-choice",
        question: "What does the '===' operator do in JavaScript?",
        options: [
          "Assignment",
          "Comparison (with type coercion)",
          "Strict comparison (no type coercion)",
          "None of the above",
        ],
        correctAnswer: "2",
        explanation:
          "The '===' operator performs strict equality comparison without type conversion, checking both value and type equality.",
      },
    ],
    createdAt: "2023-01-01T00:00:00.000Z",
    updatedAt: "2023-01-01T00:00:00.000Z",
    popularity: 95,
    completions: 1250,
  },
  //! quiz Two
  {
    id: "2",
    title: "React Hooks",
    description: "Master React hooks for functional components",
    category: "Web Development",
    difficulty: "Intermediate",
    timeEstimate: "20 min",
    questions: [
      {
        id: "2-1",
        type: "multiple-choice",
        question: "Which hook is used for side effects in React?",
        options: ["useState", "useEffect", "useContext", "useReducer"],
        correctAnswer: "1",
        explanation:
          "useEffect is used for performing side effects in function components.",
      },
      {
        id: "2-2",
        type: "multiple-choice",
        question: "What does the useState hook return?",
        options: [
          "Current state only",
          "A function to update the state only",
          "Current state and a function to update it",
          "The initial state",
        ],
        correctAnswer: "2",
        explanation:
          "useState returns a pair: the current state value and a function that lets you update it.",
      },
      {
        id: "2-3",
        type: "multiple-choice",
        question: "When does useEffect run?",
        options: [
          "Only on component mount",
          "After every render",
          "Only when state changes",
          "Only when props change",
        ],
        correctAnswer: "1",
        explanation:
          "By default, useEffect runs after every completed render, but you can customize this behavior with the dependencies array.",
      },
    ],
    createdAt: "2023-02-01T00:00:00.000Z",
    updatedAt: "2023-02-01T00:00:00.000Z",
    popularity: 88,
    completions: 950,
  },
  //! quiz three
  {
    id: "3",
    title: "CSS Flexbox",
    description: "Test your knowledge of CSS Flexbox layout",
    category: "Web Development",
    difficulty: "Beginner",
    timeEstimate: "15 min",
    questions: [
      {
        id: "3-1",
        type: "multiple-choice",
        question:
          "Which property is used to define the main axis of a flex container?",
        options: [
          "flex-direction",
          "justify-content",
          "align-items",
          "flex-wrap",
        ],
        correctAnswer: "0",
        explanation:
          "flex-direction establishes the main axis, defining the direction flex items are placed in the flex container.",
      },
      {
        id: "3-2",
        type: "multiple-choice",
        question:
          "Which value of justify-content aligns flex items at the center of the container?",
        options: ["flex-start", "flex-end", "center", "space-between"],
        correctAnswer: "2",
        explanation:
          "The center value of justify-content aligns flex items at the center of the main axis.",
      },
    ],
    createdAt: "2023-03-01T00:00:00.000Z",
    updatedAt: "2023-03-01T00:00:00.000Z",
    popularity: 82,
    completions: 820,
  },
];

// Helper functions to work with quizzes
export function getQuizById(id: string): Quiz | undefined {
  return quizzes.find((quiz) => quiz.id === id);
}

export function getAllQuizzes(): Quiz[] {
  return quizzes;
}

export function getQuizzesByCategory(category: string): Quiz[] {
  return quizzes.filter((quiz) => quiz.category === category);
}

export function getQuizzesByDifficulty(
  difficulty: "Beginner" | "Intermediate" | "Advanced"
): Quiz[] {
  return quizzes.filter((quiz) => quiz.difficulty === difficulty);
}
