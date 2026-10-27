import { aiAndLawQuiz4PatentQuestions } from "./aiAndLawQuiz4Patents.js";
import { aiAndLawQuiz4IPQuestions } from "./aiAndLawQuiz4IP.js";

// Keep this assigned-deck review separate from the broader Weeks 8–9 bank so
// each subject retains its own saved runs and scores.
export const aiAndLawQuiz4Subject = {
  id: "quiz-4",
  title: "Quiz #4",
  questions: [...aiAndLawQuiz4PatentQuestions, ...aiAndLawQuiz4IPQuestions],
};
