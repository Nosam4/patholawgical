import { finalTrialClosingQuestion } from "./finalTrialClosing.js";
import { finalTrialCrossQuestion, finalTrialCrossOptionalQuestion } from "./finalTrialCross.js";
import { finalTrialDirectQuestion, finalTrialDirectOptionalQuestion } from "./finalTrialDirect.js";
import { finalTrialDirectAcronymQuestion } from "./finalTrialDirectAcronym.js";
import { finalTrialStipulationsQuestion } from "./finalTrialStipulations.js";

export const finalTrialSubject = {
  id: "final-trial",
  title: "Final Trial",
  questions: [
    finalTrialClosingQuestion,
    finalTrialCrossQuestion,
    finalTrialDirectQuestion,
    finalTrialDirectAcronymQuestion,
    finalTrialStipulationsQuestion,
    finalTrialCrossOptionalQuestion,
    finalTrialDirectOptionalQuestion,
  ],
};
