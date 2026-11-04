export const course = {
  title: "JavaScript foundations",
  subtitle: "Your first steps into programming",
  units: [
    {
      id: 1,
      title: "Getting started",
      description: "Meet the world of code",
      color: "violet",
      lessons: [
        {
          id: "what-is-code",
          title: "What is programming?",
          type: "Lesson",
          xp: 10,
          questions: [
            { prompt: "What is a program?", options: ["A set of instructions a computer follows", "A computer screen", "A type of keyboard"], answer: 0, explanation: "A program is a sequence of instructions that tells a computer what to do." },
            { prompt: "Which one is a programming language?", options: ["HTML", "JavaScript", "Wi-Fi"], answer: 1, explanation: "JavaScript is a programming language used to create interactive experiences." },
            { prompt: "What does a programmer do?", options: ["Only repairs screens", "Writes and tests instructions", "Manufactures keyboards"], answer: 1, explanation: "Programmers design, write, test and improve instructions that solve problems." }
          ]
        },
        {
          id: "first-variables",
          title: "Your first variables",
          type: "Practice",
          xp: 15,
          questions: [
            { prompt: "Which keyword declares a changeable variable in JavaScript?", options: ["let", "style", "print"], answer: 0, explanation: "Use let when the variable's value may change." },
            { prompt: "What is the value of score?", code: "let score = 12;", options: ["'score'", "12", "undefined"], answer: 1, explanation: "The variable score stores the number 12." },
            { prompt: "Which is a valid variable name?", options: ["2name", "user-name", "userName"], answer: 2, explanation: "A variable name cannot start with a digit or contain a hyphen." }
          ]
        },
        {
          id: "make-decisions",
          title: "Make decisions",
          type: "Practice",
          xp: 15,
          questions: [
            { prompt: "Which statement runs code only when a condition is true?", options: ["if", "repeat", "import"], answer: 0, explanation: "An if statement checks a condition before running its block." },
            { prompt: "What is printed?", code: "if (5 > 3) {\n  console.log('Yes');\n}", options: ["No", "Yes", "Nothing"], answer: 1, explanation: "5 is greater than 3, so the condition is true." },
            { prompt: "Which operator checks strict equality?", options: ["=", "===", "=>"], answer: 1, explanation: "=== compares both value and type without coercion." }
          ]
        }
      ]
    },
    {
      id: 2,
      title: "Logic lab",
      description: "Think like a programmer",
      color: "cyan",
      lessons: [
        { id: "loops", title: "Repeat with loops", type: "Coming soon", xp: 20, questions: [] },
        { id: "functions", title: "Meet functions", type: "Coming soon", xp: 20, questions: [] }
      ]
    }
  ]
};