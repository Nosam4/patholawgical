export const finalTrialCrossAcronymQuestion = {
  id: "final-trial-cross-acronym",
  type: "sporcle-grid",
  title: "Cross Exam Acronym",
  answerMatching: "active",
  answerLayout: "stacked",
  clueLayout: "above",
  prompt: "Recall the seven PROTECT memory cues in cross-examination order. Use Show Mnemonic for letter hints.",
  courseSources: [
    "FinalTrial/Drafts/V2_CrossExam_Judson_PlaintiffEyewitness_FinalTrial.docx",
  ],
  columns: [
    {
      id: "final-trial-cross-acronym-cues",
      title: "Memory cues in examination order",
      mnemonic: "PROTECT",
      answers: [
        {
          id: "final-trial-cross-acronym-precautions",
          indicator: "1",
          answer: "Precautions",
          explanation: "Searches, escorts, and separate locked pens.",
        },
        {
          id: "final-trial-cross-acronym-reported-observations",
          indicator: "2",
          answer: "Reported observations",
          explanation: "What Judson saw—and what he could not see or know.",
        },
        {
          id: "final-trial-cross-acronym-oncoming-attackers",
          indicator: "3",
          answer: "Oncoming attackers",
          explanation: "Two armed inmates approaching and pursuing Trumble.",
        },
        {
          id: "final-trial-cross-acronym-gun-theory",
          indicator: "4",
          answer: "Theory about the gun",
          acceptedAnswers: ["Theory about gun"],
          explanation: "His inference that it ‘seemed’ unloaded.",
        },
        {
          id: "final-trial-cross-acronym-gun-experience",
          indicator: "5",
          answer: "Experience with the gun",
          acceptedAnswers: ["Experience with gun", "Experience with the block gun"],
          explanation: "Being struck, then resuming the fight.",
        },
        {
          id: "final-trial-cross-acronym-chaos-and-timing",
          indicator: "6",
          answer: "Chaos and timing",
          acceptedAnswers: ["Chaos & timing"],
          explanation: "His injuries, confusion, and uncertain time estimates.",
        },
        {
          id: "final-trial-cross-acronym-trying-to-help",
          indicator: "7",
          answer: "Trying to help",
          explanation: "Officers returning and attempting to help Bedford.",
        },
      ],
    },
  ],
};
