import { finalTrialClosingQuestion } from "./finalTrialClosing.js";
import { finalTrialCrossQuestion, finalTrialCrossOptionalQuestion } from "./finalTrialCross.js";
import { finalTrialDirectQuestion, finalTrialDirectOptionalQuestion } from "./finalTrialDirect.js";
import { finalTrialStipulationsQuestion } from "./finalTrialStipulations.js";

export const finalTrialSubject = {
  id: "final-trial",
  title: "Final Trial",
  questions: [
    finalTrialClosingQuestion,
    finalTrialCrossQuestion,
    finalTrialDirectQuestion,
    finalTrialStipulationsQuestion,
    finalTrialCrossOptionalQuestion,
    finalTrialDirectOptionalQuestion,
  ],
};
