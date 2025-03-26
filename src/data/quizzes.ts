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
  time?: number;
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
  //! /*--------------------------------------- quiz One --------------------------------------------- */
  //! /*--------------------------------------- quiz One --------------------------------------------- */
  {
    id: "1",
    title: "HTML Basics Quiz",
    description: "Test your knowledge of HTML fundamentals.",
    category: "Web Development",
    difficulty: "Beginner",
    timeEstimate: "15 min",
    time: 15,
    questions: [
      {
        id: "1-1",
        type: "multiple-choice",
        question: "What does HTML stand for?",
        options: [
          "Hyper Text Markup Language",
          "High Text Markup Language",
          "Hyperlink and Text Markup Language",
          "Hyper Textual Markup Language",
        ],
        correctAnswer: "0",
        explanation:
          "HTML stands for Hyper Text Markup Language, which is the standard language for creating web pages.",
      },
      {
        id: "1-2",
        type: "multiple-choice",
        question:
          "Which HTML element is used to define the title of a document?",
        options: ["<head>", "<meta>", "<title>", "<header>"],
        correctAnswer: "2",
        explanation:
          "The <title> element is used to define the title of the document, which appears in the browser tab.",
      },
      {
        id: "1-3",
        type: "multiple-choice",
        question: "Which of the following is a block-level element?",
        options: ["<span>", "<div>", "<img>", "<a>"],
        correctAnswer: "3",
        explanation:
          "<div> is a block-level element, while <span> is an inline element.",
      },
      {
        id: "1-4",
        type: "multiple-choice",
        question:
          "What attribute is used to specify the URL of an image in HTML?",
        options: ["src", "href", "link", "url"],
        correctAnswer: "0",
        explanation:
          "The 'src' attribute is used to specify the URL of an image in the <img> tag.",
      },
      {
        id: "1-5",
        type: "multiple-choice",
        question: "Which HTML tag is used to create a hyperlink?",
        options: ["<link>", "<a>", "<href>", "<url>"],
        correctAnswer: "1",
        explanation: "The <a> tag is used to create hyperlinks in HTML.",
      },
      {
        id: "1-6",
        type: "multiple-choice",
        question:
          "What is the correct HTML element for inserting a line break?",
        options: ["<break>", "<lb>", "<linebreak>", "<br>"],
        correctAnswer: "3",
        explanation: "The <br> tag is used to insert a line break in HTML.",
      },
      {
        id: "1-7",
        type: "multiple-choice",
        question:
          "Which of the following elements is used to define an unordered list?",
        options: ["<ol>", "<ul>", "<list>", "<li>"],
        correctAnswer: "1",
        explanation:
          "The <ul> tag is used to define an unordered list in HTML.",
      },
      {
        id: "1-8",
        type: "multiple-choice",
        question: "What is the purpose of the <meta> tag in HTML?",
        options: [
          "To define metadata about an HTML document",
          "To create a link to another document",
          "To insert images",
          "To create a header",
        ],
        correctAnswer: "0",
        explanation:
          "The <meta> tag is used to define metadata about an HTML document, such as character set, description, and keywords.",
      },
      {
        id: "1-9",
        type: "multiple-choice",
        question: "Which HTML element is used to define a table?",
        options: ["<tab>", "<tbody>", "<table>", "<tr>"],
        correctAnswer: "2",
        explanation: "The <table> tag is used to define a table in HTML.",
      },
      {
        id: "1-10",
        type: "multiple-choice",
        question: "What does the <head> element contain?",
        options: [
          "The main content of the document",
          "Metadata and links to scripts and styles",
          "The footer of the document",
          "The body content of the document",
        ],
        correctAnswer: "1",
        explanation:
          "The <head> element contains metadata, links to stylesheets, and scripts, but not the main content of the document.",
      },
      {
        id: "1-11",
        type: "multiple-choice",
        question: "Which tag is used to create a dropdown list in HTML?",
        options: ["<select>", "<dropdown>", "<list>", "<option>"],
        correctAnswer: "0",
        explanation:
          "The <select> tag is used to create a dropdown list in HTML.",
      },

      {
        id: "1-12",
        type: "multiple-choice",
        question: "What is the correct HTML for creating a checkbox?",
        options: [
          "<input type='checkbox'>",
          "<checkbox>",
          "<input type='check'>",
          "<check>",
        ],
        correctAnswer: "0",
        explanation:
          "The correct way to create a checkbox in HTML is by using <input type='checkbox'>.",
      },
      {
        id: "1-13",
        type: "multiple-choice",
        question:
          "Which HTML element is used to define an internal style sheet?",
        options: ["<css>", "<script>", "<styles>", "<style>"],
        correctAnswer: "3",
        explanation:
          "The <style> element is used to define an internal style sheet in HTML.",
      },
      {
        id: "1-14",
        type: "multiple-choice",
        question: "What is the purpose of the <footer> tag in HTML?",
        options: [
          "To create a navigation menu",
          "To insert a line break",
          "To define the footer of a document or section",
          "To define the header of a document",
        ],
        correctAnswer: "2",
        explanation:
          "The <footer> tag is used to define the footer of a document or section, typically containing information about the author, copyright, or links.",
      },
      {
        id: "1-15",
        type: "multiple-choice",
        question:
          "Which of the following is the correct way to comment in HTML?",
        options: [
          "// This is a comment",
          "<!-- This is a comment -->",
          "# This is a comment",
          "/* This is a comment */",
        ],
        correctAnswer: "1",
        explanation:
          "In HTML, comments are written using <!-- comment --> syntax.",
      },
    ],

    createdAt: "2023-02-01T00:00:00.000Z",
    updatedAt: "2023-02-01T00:00:00.000Z",
    popularity: 75,
    completions: 1200,
  },
  //! /*--------------------------------------- quiz two--------------------------------------------- */
  //! /*--------------------------------------- quiz two--------------------------------------------- */
  {
    id: "2",
    title: "CSS Mastery Quiz",
    description:
      "Test your knowledge of CSS fundamentals and advanced techniques.",
    category: "Web Development",
    difficulty: "Intermediate",
    timeEstimate: "15 min",
    time: 15,
    questions: [
      {
        id: "2-1",
        type: "multiple-choice",
        question: "What does CSS stand for?",
        options: [
          "Cascading Style Sheets",
          "Creative Style System",
          "Computer Style Sheets",
          "Colorful Style Sheets",
        ],
        correctAnswer: "0",
        explanation:
          "CSS stands for Cascading Style Sheets, which is used to style HTML documents.",
      },
      {
        id: "2-2",
        type: "multiple-choice",
        question: "Which property is used to change the background color?",
        options: ["bgcolor", "background-color", "color", "background"],
        correctAnswer: "1",
        explanation:
          "The 'background-color' property is used to change the background color of an element.",
      },
      {
        id: "2-3",
        type: "multiple-choice",
        question: "How do you select an element with the id 'header'?",
        options: [".header", "header", "*header", "#header"],
        correctAnswer: "3",
        explanation:
          "You can select an element with the id 'header' using the '#' symbol followed by the id name.",
      },
      {
        id: "2-4",
        type: "multiple-choice",
        question: "Which CSS property controls the text size?",
        options: ["font-size", "text-size", "font-style", "text-style"],
        correctAnswer: "0",
        explanation:
          "The 'font-size' property is used to control the size of the text.",
      },
      {
        id: "2-5",
        type: "multiple-choice",
        question:
          "What is the correct CSS syntax to change the font of an element?",
        options: [
          "font-family: Arial;",
          "font: Arial;",
          "font-family: 'Arial';",
          "font: 'Arial';",
        ],
        correctAnswer: "2",
        explanation:
          "The correct syntax to change the font of an element is 'font-family: 'Arial';'.",
      },
      {
        id: "2-6",
        type: "multiple-choice",
        question:
          "Which property is used to add space between the element's border and its content?",
        options: ["margin", "padding", "border-spacing", "spacing"],
        correctAnswer: "1",
        explanation:
          "The 'padding' property is used to add space between the element's border and its content.",
      },
      {
        id: "2-7",
        type: "multiple-choice",
        question: "How do you make a list that lists its items with squares?",
        options: [
          "list-type: square;",
          "list-style: square;",
          "list-style-type: square-list;",
          "list-style-type: square;",
        ],
        correctAnswer: "3",
        explanation:
          "You can make a list that lists its items with squares by using 'list-style-type: square;'.",
      },
      {
        id: "2-8",
        type: "multiple-choice",
        question: "Which CSS property is used to change the text color?",
        options: ["color", "text-color", "font-color", "background-color"],
        correctAnswer: "0",
        explanation:
          "The 'color' property is used to change the text color of an element.",
      },
      {
        id: "2-9",
        type: "multiple-choice",
        question: "What is the default value of the position property?",
        options: ["relative", "absolute", "static", "fixed"],
        correctAnswer: "2",
        explanation: "The default value of the position property is 'static'.",
      },
      {
        id: "2-10",
        type: "multiple-choice",
        question: "How do you apply a style to all <p> elements in CSS?",
        options: ["p: { }", "p { }", "all p { }", "p.all { }"],
        correctAnswer: "1",
        explanation:
          "To apply a style to all <p> elements, you use 'p { }' in your CSS.",
      },
    ],
    createdAt: "2023-02-01T00:00:00.000Z",
    updatedAt: "2023-02-01T00:00:00.000Z",
    popularity: 80,
    completions: 800,
  },
  //! /*--------------------------------------- quiz three--------------------------------------------- */
  //! /*--------------------------------------- quiz three--------------------------------------------- */
  {
    id: "3",
    title: "JavaScript Essentials Quiz",
    description:
      "Test your knowledge of JavaScript fundamentals and essential concepts.",
    category: "Web Development",
    difficulty: "Intermediate",
    timeEstimate: "20 min",
    time: 20,
    questions: [
      {
        id: "3-1",
        type: "multiple-choice",
        question:
          "What is the correct syntax to declare a variable in JavaScript?",
        options: [
          "let myVariable;",
          "variable myVariable;",
          "v myVariable;",
          "myVariable = var;",
        ],
        correctAnswer: "0",
        explanation:
          "The correct syntax to declare a variable in JavaScript is 'var myVariable;'.",
      },
      {
        id: "3-2",
        type: "multiple-choice",
        question: "Which of the following is a JavaScript data type?",
        options: ["String", "Boolean", "Number", "All of the above"],
        correctAnswer: "3",
        explanation:
          "JavaScript supports multiple data types including String, Boolean, and Number.",
      },
      {
        id: "3-3",
        type: "multiple-choice",
        question:
          "What is the output of the following code: console.log(typeof null);?",
        options: ["null", "object", "undefined", "number"],
        correctAnswer: "1",
        explanation:
          "In JavaScript, the typeof operator returns 'object' for null, which is a known quirk.",
      },
      {
        id: "3-4",
        type: "multiple-choice",
        question:
          "Which method is used to convert a JSON string into a JavaScript object?",
        options: [
          "JSON.parse()",
          "JSON.stringify()",
          "JSON.convert()",
          "JSON.object()",
        ],
        correctAnswer: "0",
        explanation:
          "The JSON.parse() method is used to convert a JSON string into a JavaScript object.",
      },
      {
        id: "3-5",
        type: "multiple-choice",
        question:
          "What will be the output of the following code: console.log(0.1 + 0.2 === 0.3);?",
        options: ["true", "false", "undefined", "NaN"],
        correctAnswer: "1",
        explanation:
          "Due to floating-point precision issues, 0.1 + 0.2 does not equal 0.3 in JavaScript, so the output is false.",
      },
      {
        id: "3-6",
        type: "multiple-choice",
        question:
          "Which of the following is a way to create a function in JavaScript?",
        options: [
          "create myFunction() {}",
          "function: myFunction() {}",
          "function myFunction() {}",
          "myFunction() = function {}",
        ],
        correctAnswer: "2",
        explanation:
          "The correct way to create a function in JavaScript is using the 'function myFunction() {}' syntax.",
      },
      {
        id: "3-7",
        type: "multiple-choice",
        question: "What does 'this' refer to in JavaScript?",
        options: [
          "The global object",
          "The current function",
          "None of the above",
          "The current object",
        ],
        correctAnswer: "3",
        explanation:
          "'this' refers to the current object in the context of which the function is called.",
      },
      {
        id: "3-8",
        type: "multiple-choice",
        question: "Which operator is used to assign a value to a variable?",
        options: ["=", "==", "===", ":="],
        correctAnswer: "0",

        explanation:
          "The '=' operator is used to assign a value to a variable in JavaScript.",
      },

      {
        id: "3-9",
        type: "multiple-choice",
        question:
          "What will be the output of the following code: console.log(1 + '1');?",
        options: ["2", "11", "NaN", "undefined"],
        correctAnswer: "1",
        explanation:
          "In JavaScript, when you add a number and a string, the number is converted to a string, resulting in '11'.",
      },
      {
        id: "3-10",
        type: "multiple-choice",
        question:
          "Which of the following is a way to create an array in JavaScript?",
        options: [
          "let myArray = {}",
          "let myArray = ()",
          "let myArray = new Arrays()",
          "let myArray = []",
        ],
        correctAnswer: "3",
        explanation:
          "You can create an array in JavaScript using 'var myArray = []'.",
      },
      {
        id: "3-11",
        type: "multiple-choice",
        question: "What is the purpose of the 'let' keyword in JavaScript?",
        options: [
          "To declare a constant variable",
          "To declare a global variable",
          "To declare a variable with block scope",
          "To declare a variable with function scope",
        ],
        correctAnswer: "2",
        explanation:
          "'let' is used to declare a variable that is limited to the scope of a block statement.",
      },
      {
        id: "3-12",
        type: "multiple-choice",
        question:
          "What will be the output of the following code: console.log(typeof NaN);?",

        options: ["number", "NaN", "undefined", "object"],
        correctAnswer: "0",
        explanation:
          "In JavaScript, NaN is considered a number, so typeof NaN returns 'number'.",
      },
      {
        id: "3-13",
        type: "multiple-choice",
        question:
          "Which method is used to remove the last element from an array?",
        options: ["shift()", "slice()", "pop()", "splice()"],
        correctAnswer: "2",
        explanation:
          "The pop() method is used to remove the last element from an array.",
      },
      {
        id: "3-14",
        type: "multiple-choice",
        question: "What is the result of the expression '5' + 3?",
        options: ["8", "53", "Error", "NaN"],
        correctAnswer: "1",
        explanation:
          "When adding a string and a number, JavaScript converts the number to a string, resulting in '53'.",
      },
      {
        id: "3-15",
        type: "multiple-choice",
        question:
          "Which of the following is a correct way to define an object in JavaScript?",
        options: [
          "var obj = {}",
          "var obj = []",
          "var obj = ()",
          "var obj = new Object()",
        ],
        correctAnswer: "0",
        explanation:
          "You can define an object in JavaScript using 'var obj = {}' or 'var obj = new Object()'.",
      },
    ],
    createdAt: "2023-02-01T00:00:00.000Z",
    updatedAt: "2023-02-01T00:00:00.000Z",
    popularity: 85,
    completions: 1500,
  },
  //! /*--------------------------------------- quiz four--------------------------------------------- */
  //! /*--------------------------------------- quiz four--------------------------------------------- */
  {
    id: "4",
    title: "React.js Fundamentals Quiz",
    description:
      "Test your knowledge of React.js fundamentals and core concepts.",
    category: "Web Development",
    difficulty: "Intermediate",
    timeEstimate: "20 min",
    time: 20,
    questions: [
      {
        id: "4-1",
        type: "multiple-choice",
        question: "What is React?",
        options: [
          "A programming language",
          "A database management system",
          "A JavaScript library for building user interfaces",

          "A framework for server-side development",
        ],
        correctAnswer: "2",
        explanation:
          "React is a JavaScript library for building user interfaces, primarily for single-page applications.",
      },
      {
        id: "4-2",
        type: "multiple-choice",
        question:
          "What is the purpose of the 'render' method in a React component?",
        options: [
          "To return the JSX that defines the UI",
          "To handle events",
          "To update the component's state",
          "To fetch data from an API",
        ],
        correctAnswer: "0",
        explanation:
          "The 'render' method is used to return the JSX that defines the UI of the component.",
      },
      {
        id: "4-3",
        type: "multiple-choice",
        question:
          "Which of the following is used to manage state in a functional component?",
        options: ["this.state", "setState", "useState", "state"],
        correctAnswer: "2",
        explanation:
          "The 'useState' hook is used to manage state in functional components.",
      },
      {
        id: "4-4",
        type: "multiple-choice",
        question: "What is JSX?",
        options: [
          "A syntax extension for JavaScript",
          "A type of CSS",
          "A database query language",
          "A JavaScript framework",
        ],
        correctAnswer: "0",
        explanation:
          "JSX is a syntax extension for JavaScript that allows you to write HTML-like code within JavaScript.",
      },
      {
        id: "4-5",
        type: "multiple-choice",
        question:
          "How do you pass data from a parent component to a child component in React?",
        options: ["Using state", "Using props", "Using context", "Using hooks"],
        correctAnswer: "1",
        explanation:
          "Data is passed from a parent component to a child component using props.",
      },
      {
        id: "4-6",
        type: "multiple-choice",
        question: "What is the purpose of the 'key' prop in React?",
        options: [
          "To manage state",
          "To uniquely identify elements in a list",
          "To handle events",
          "To style components",
        ],
        correctAnswer: "1",
        explanation:
          "The 'key' prop is used to uniquely identify elements in a list, helping React optimize rendering.",
      },
      {
        id: "4-7",
        type: "multiple-choice",
        question:
          "Which lifecycle method is called after a component is mounted?",
        options: [
          "componentDidUpdate",
          "componentWillMount",
          "componentDidMount",
          "componentWillUpdate",
        ],
        correctAnswer: "2",
        explanation:
          "The 'componentDidMount' lifecycle method is called after a component is mounted.",
      },
      {
        id: "4-8",
        type: "multiple-choice",
        question: "What is the purpose of the 'useEffect' hook?",
        options: [
          "To perform side effects in functional components",
          "To manage state",
          "To handle events",
          "To render components",
        ],
        correctAnswer: "0",
        explanation:
          "The 'useEffect' hook is used to perform side effects in functional components, such as data fetching or subscriptions.",
      },
      {
        id: "4-9",
        type: "multiple-choice",
        question: "What does the 'setState' method do?",
        options: [
          "Renders the component",
          "Updates the component's state",
          "Creates a new component",
          "Fetches data from an API",
        ],
        correctAnswer: "1",
        explanation:
          "'setState' is used to update the component's state and trigger a re-render.",
      },
      {
        id: "4-10",
        type: "multiple-choice",
        question:
          "Which of the following is a valid way to create a functional component in React?",
        options: [
          "const MyComponent = () => { return <div>Hello</div>, }",
          "function MyComponent() { return <div>Hello</div>; }",
          "const MyComponent = function() { return <div>Hello</div>; }",
          "All of the above",
        ],
        correctAnswer: "3",
        explanation:
          "All of the provided options are valid ways to create a functional component in React.",
      },
      {
        id: "4-11",
        type: "multiple-choice",
        question: "What is the purpose of the 'useContext' hook?",
        options: [
          "To manage local component state",
          "To access context values in functional components",
          "To perform side effects",
          "To create a new context",
        ],
        correctAnswer: "1",
        explanation:
          "The 'useContext' hook is used to access context values in functional components.",
      },
      {
        id: "4-12",
        type: "multiple-choice",
        question: "Which of the following is true about controlled components?",
        options: [
          "Their state is managed by the DOM",
          "Their state is managed by React",
          "They cannot be used with forms",
          "They are always functional components",
        ],
        correctAnswer: "1",
        explanation:
          "Controlled components are those whose state is managed by React, typically through props.",
      },
      {
        id: "4-13",
        type: "multiple-choice",
        question: "What is the purpose of the 'Fragment' component in React?",
        options: [
          "To create a new context",
          "To group multiple elements without adding extra nodes to the DOM",
          "To manage state",
          "To handle events",
        ],
        correctAnswer: "1",
        explanation:
          "The 'Fragment' component is used to group multiple elements without adding extra nodes to the DOM.",
      },
      {
        id: "4-14",
        type: "multiple-choice",
        question: "Which of the following is a way to handle events in React?",
        options: [
          "Using event listeners directly on DOM elements",
          "Using the 'onClick' prop",
          "Using jQuery",

          "Using the 'addEventListener' method",
        ],
        correctAnswer: "1",
        explanation:
          "In React, events are handled using props like 'onClick' directly on the JSX elements.",
      },
      {
        id: "4-15",
        type: "multiple-choice",
        question: "What is the purpose of the 'useReducer' hook?",
        options: [
          "To manage complex state logic in functional components",
          "To perform side effects",
          "To manage local component state",
          "To create a new context",
        ],
        correctAnswer: "0",
        explanation:
          "The 'useReducer' hook is used to manage complex state logic in functional components, similar to Redux.",
      },
    ],
    createdAt: "2023-02-01T00:00:00.000Z",
    updatedAt: "2023-02-01T00:00:00.000Z",
    popularity: 90,
    completions: 1200,
  },
  //! /*--------------------------------------- quiz five--------------------------------------------- */
  {
    id: "5",
    title: "Python Basics Quiz",
    description:
      "Test your knowledge of React.js fundamentals and core concepts.",
    category: "Programming",
    difficulty: "Beginner",
    timeEstimate: "20 min",
    time: 20,
    questions: [
      {
        id: "4-1",
        type: "multiple-choice",
        question: "What is React?",
        options: [
          "A programming language",
          "A database management system",
          "A JavaScript library for building user interfaces",

          "A framework for server-side development",
        ],
        correctAnswer: "2",
        explanation:
          "React is a JavaScript library for building user interfaces, primarily for single-page applications.",
      },
      {
        id: "4-2",
        type: "multiple-choice",
        question:
          "What is the purpose of the 'render' method in a React component?",
        options: [
          "To return the JSX that defines the UI",
          "To handle events",
          "To update the component's state",
          "To fetch data from an API",
        ],
        correctAnswer: "0",
        explanation:
          "The 'render' method is used to return the JSX that defines the UI of the component.",
      },
      {
        id: "4-3",
        type: "multiple-choice",
        question:
          "Which of the following is used to manage state in a functional component?",
        options: ["this.state", "setState", "useState", "state"],
        correctAnswer: "2",
        explanation:
          "The 'useState' hook is used to manage state in functional components.",
      },
      {
        id: "4-4",
        type: "multiple-choice",
        question: "What is JSX?",
        options: [
          "A syntax extension for JavaScript",
          "A type of CSS",
          "A database query language",
          "A JavaScript framework",
        ],
        correctAnswer: "0",
        explanation:
          "JSX is a syntax extension for JavaScript that allows you to write HTML-like code within JavaScript.",
      },
      {
        id: "4-5",
        type: "multiple-choice",
        question:
          "How do you pass data from a parent component to a child component in React?",
        options: ["Using state", "Using props", "Using context", "Using hooks"],
        correctAnswer: "1",
        explanation:
          "Data is passed from a parent component to a child component using props.",
      },
      {
        id: "4-6",
        type: "multiple-choice",
        question: "What is the purpose of the 'key' prop in React?",
        options: [
          "To manage state",
          "To uniquely identify elements in a list",
          "To handle events",
          "To style components",
        ],
        correctAnswer: "1",
        explanation:
          "The 'key' prop is used to uniquely identify elements in a list, helping React optimize rendering.",
      },
      {
        id: "4-7",
        type: "multiple-choice",
        question:
          "Which lifecycle method is called after a component is mounted?",
        options: [
          "componentDidUpdate",
          "componentWillMount",
          "componentDidMount",
          "componentWillUpdate",
        ],
        correctAnswer: "2",
        explanation:
          "The 'componentDidMount' lifecycle method is called after a component is mounted.",
      },
      {
        id: "4-8",
        type: "multiple-choice",
        question: "What is the purpose of the 'useEffect' hook?",
        options: [
          "To perform side effects in functional components",
          "To manage state",
          "To handle events",
          "To render components",
        ],
        correctAnswer: "0",
        explanation:
          "The 'useEffect' hook is used to perform side effects in functional components, such as data fetching or subscriptions.",
      },
      {
        id: "4-9",
        type: "multiple-choice",
        question: "What does the 'setState' method do?",
        options: [
          "Renders the component",
          "Updates the component's state",
          "Creates a new component",
          "Fetches data from an API",
        ],
        correctAnswer: "1",
        explanation:
          "'setState' is used to update the component's state and trigger a re-render.",
      },
      {
        id: "4-10",
        type: "multiple-choice",
        question:
          "Which of the following is a valid way to create a functional component in React?",
        options: [
          "const MyComponent = () => { return <div>Hello</div>, }",
          "function MyComponent() { return <div>Hello</div>; }",
          "const MyComponent = function() { return <div>Hello</div>; }",
          "All of the above",
        ],
        correctAnswer: "3",
        explanation:
          "All of the provided options are valid ways to create a functional component in React.",
      },
      {
        id: "4-11",
        type: "multiple-choice",
        question: "What is the purpose of the 'useContext' hook?",
        options: [
          "To manage local component state",
          "To access context values in functional components",
          "To perform side effects",
          "To create a new context",
        ],
        correctAnswer: "1",
        explanation:
          "The 'useContext' hook is used to access context values in functional components.",
      },
      {
        id: "4-12",
        type: "multiple-choice",
        question: "Which of the following is true about controlled components?",
        options: [
          "Their state is managed by the DOM",
          "Their state is managed by React",
          "They cannot be used with forms",
          "They are always functional components",
        ],
        correctAnswer: "1",
        explanation:
          "Controlled components are those whose state is managed by React, typically through props.",
      },
      {
        id: "4-13",
        type: "multiple-choice",
        question: "What is the purpose of the 'Fragment' component in React?",
        options: [
          "To create a new context",
          "To group multiple elements without adding extra nodes to the DOM",
          "To manage state",
          "To handle events",
        ],
        correctAnswer: "1",
        explanation:
          "The 'Fragment' component is used to group multiple elements without adding extra nodes to the DOM.",
      },
      {
        id: "4-14",
        type: "multiple-choice",
        question: "Which of the following is a way to handle events in React?",
        options: [
          "Using event listeners directly on DOM elements",
          "Using the 'onClick' prop",
          "Using jQuery",

          "Using the 'addEventListener' method",
        ],
        correctAnswer: "1",
        explanation:
          "In React, events are handled using props like 'onClick' directly on the JSX elements.",
      },
      {
        id: "4-15",
        type: "multiple-choice",
        question: "What is the purpose of the 'useReducer' hook?",
        options: [
          "To manage complex state logic in functional components",
          "To perform side effects",
          "To manage local component state",
          "To create a new context",
        ],
        correctAnswer: "0",
        explanation:
          "The 'useReducer' hook is used to manage complex state logic in functional components, similar to Redux.",
      },
    ],
    createdAt: "2023-02-01T00:00:00.000Z",
    updatedAt: "2023-02-01T00:00:00.000Z",
    popularity: 90,
    completions: 1200,
  },
  //! /*--------------------------------------- quiz six--------------------------------------------- */
  {
    id: "6",
    title: "Python Intermediate Quiz",
    description:
      "Test your knowledge of React.js fundamentals and core concepts.",
    category: "Programming",
    difficulty: "Intermediate",
    timeEstimate: "20 min",
    time: 20,
    questions: [
      {
        id: "4-1",
        type: "multiple-choice",
        question: "What is React?",
        options: [
          "A programming language",
          "A database management system",
          "A JavaScript library for building user interfaces",

          "A framework for server-side development",
        ],
        correctAnswer: "2",
        explanation:
          "React is a JavaScript library for building user interfaces, primarily for single-page applications.",
      },
      {
        id: "4-2",
        type: "multiple-choice",
        question:
          "What is the purpose of the 'render' method in a React component?",
        options: [
          "To return the JSX that defines the UI",
          "To handle events",
          "To update the component's state",
          "To fetch data from an API",
        ],
        correctAnswer: "0",
        explanation:
          "The 'render' method is used to return the JSX that defines the UI of the component.",
      },
      {
        id: "4-3",
        type: "multiple-choice",
        question:
          "Which of the following is used to manage state in a functional component?",
        options: ["this.state", "setState", "useState", "state"],
        correctAnswer: "2",
        explanation:
          "The 'useState' hook is used to manage state in functional components.",
      },
      {
        id: "4-4",
        type: "multiple-choice",
        question: "What is JSX?",
        options: [
          "A syntax extension for JavaScript",
          "A type of CSS",
          "A database query language",
          "A JavaScript framework",
        ],
        correctAnswer: "0",
        explanation:
          "JSX is a syntax extension for JavaScript that allows you to write HTML-like code within JavaScript.",
      },
      {
        id: "4-5",
        type: "multiple-choice",
        question:
          "How do you pass data from a parent component to a child component in React?",
        options: ["Using state", "Using props", "Using context", "Using hooks"],
        correctAnswer: "1",
        explanation:
          "Data is passed from a parent component to a child component using props.",
      },
      {
        id: "4-6",
        type: "multiple-choice",
        question: "What is the purpose of the 'key' prop in React?",
        options: [
          "To manage state",
          "To uniquely identify elements in a list",
          "To handle events",
          "To style components",
        ],
        correctAnswer: "1",
        explanation:
          "The 'key' prop is used to uniquely identify elements in a list, helping React optimize rendering.",
      },
      {
        id: "4-7",
        type: "multiple-choice",
        question:
          "Which lifecycle method is called after a component is mounted?",
        options: [
          "componentDidUpdate",
          "componentWillMount",
          "componentDidMount",
          "componentWillUpdate",
        ],
        correctAnswer: "2",
        explanation:
          "The 'componentDidMount' lifecycle method is called after a component is mounted.",
      },
      {
        id: "4-8",
        type: "multiple-choice",
        question: "What is the purpose of the 'useEffect' hook?",
        options: [
          "To perform side effects in functional components",
          "To manage state",
          "To handle events",
          "To render components",
        ],
        correctAnswer: "0",
        explanation:
          "The 'useEffect' hook is used to perform side effects in functional components, such as data fetching or subscriptions.",
      },
      {
        id: "4-9",
        type: "multiple-choice",
        question: "What does the 'setState' method do?",
        options: [
          "Renders the component",
          "Updates the component's state",
          "Creates a new component",
          "Fetches data from an API",
        ],
        correctAnswer: "1",
        explanation:
          "'setState' is used to update the component's state and trigger a re-render.",
      },
      {
        id: "4-10",
        type: "multiple-choice",
        question:
          "Which of the following is a valid way to create a functional component in React?",
        options: [
          "const MyComponent = () => { return <div>Hello</div>, }",
          "function MyComponent() { return <div>Hello</div>; }",
          "const MyComponent = function() { return <div>Hello</div>; }",
          "All of the above",
        ],
        correctAnswer: "3",
        explanation:
          "All of the provided options are valid ways to create a functional component in React.",
      },
      {
        id: "4-11",
        type: "multiple-choice",
        question: "What is the purpose of the 'useContext' hook?",
        options: [
          "To manage local component state",
          "To access context values in functional components",
          "To perform side effects",
          "To create a new context",
        ],
        correctAnswer: "1",
        explanation:
          "The 'useContext' hook is used to access context values in functional components.",
      },
      {
        id: "4-12",
        type: "multiple-choice",
        question: "Which of the following is true about controlled components?",
        options: [
          "Their state is managed by the DOM",
          "Their state is managed by React",
          "They cannot be used with forms",
          "They are always functional components",
        ],
        correctAnswer: "1",
        explanation:
          "Controlled components are those whose state is managed by React, typically through props.",
      },
      {
        id: "4-13",
        type: "multiple-choice",
        question: "What is the purpose of the 'Fragment' component in React?",
        options: [
          "To create a new context",
          "To group multiple elements without adding extra nodes to the DOM",
          "To manage state",
          "To handle events",
        ],
        correctAnswer: "1",
        explanation:
          "The 'Fragment' component is used to group multiple elements without adding extra nodes to the DOM.",
      },
      {
        id: "4-14",
        type: "multiple-choice",
        question: "Which of the following is a way to handle events in React?",
        options: [
          "Using event listeners directly on DOM elements",
          "Using the 'onClick' prop",
          "Using jQuery",

          "Using the 'addEventListener' method",
        ],
        correctAnswer: "1",
        explanation:
          "In React, events are handled using props like 'onClick' directly on the JSX elements.",
      },
      {
        id: "4-15",
        type: "multiple-choice",
        question: "What is the purpose of the 'useReducer' hook?",
        options: [
          "To manage complex state logic in functional components",
          "To perform side effects",
          "To manage local component state",
          "To create a new context",
        ],
        correctAnswer: "0",
        explanation:
          "The 'useReducer' hook is used to manage complex state logic in functional components, similar to Redux.",
      },
    ],
    createdAt: "2023-02-01T00:00:00.000Z",
    updatedAt: "2023-02-01T00:00:00.000Z",
    popularity: 90,
    completions: 1200,
  },
  //! /*--------------------------------------- quiz seven--------------------------------------------- */
  //! /*--------------------------------------- quiz eight--------------------------------------------- */
  //! /*--------------------------------------- quiz nine--------------------------------------------- */
  //! /*--------------------------------------- quiz ten--------------------------------------------- */
  //! /*--------------------------------------- quiz eleven--------------------------------------------- */
  //! /*--------------------------------------- quiz twelve--------------------------------------------- */
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
