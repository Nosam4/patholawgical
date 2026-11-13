export const finalTrialDirectAcronymQuestion = {
  id: "final-trial-direct-acronym",
  type: "sporcle-grid",
  title: "Direct Exam Acronym",
  answerMatching: "active",
  answerLayout: "stacked",
  clueLayout: "above",
  prompt: "Recall the direct-examination acronym and its eight memory cues in order. Use Show Mnemonic for letter hints. Qualifications, assignment, materials reviewed, and compensation come before this sequence.",
  courseSources: [
    "FinalTrial/Drafts/V4_DirectExam_Emerson_DefenseExpert_FinalTrial.docx",
  ],
  columns: [
    {
      id: "final-trial-direct-acronym-word",
      title: "Acronym",
      answers: [
        {
          id: "final-trial-direct-acronym-practice",
          answer: "PRACTICE",
        },
      ],
    },
    {
      id: "final-trial-direct-acronym-cues",
      title: "Memory cues in examination order",
      mnemonic: "PRACTICE",
      answers: [
        {
          id: "final-trial-direct-acronym-pens",
          indicator: "1",
          answer: "Pens",
          explanation: "Yard layout and inmate separation.",
        },
        {
          id: "final-trial-direct-acronym-record",
          indicator: "2",
          answer: "Record",
          explanation: "Numbers and yard assault history.",
        },
        {
          id: "final-trial-direct-acronym-alert",
          indicator: "3",
          answer: "Alert",
          explanation: "Inmate complaint about loose metal.",
        },
        {
          id: "final-trial-direct-acronym-check",
          indicator: "4",
          answer: "Check",
          explanation: "Inspection, mallet testing, and the inspection log.",
        },
        {
          id: "final-trial-direct-acronym-timing-and-damage",
          indicator: "5",
          answer: "Timing and damage",
          acceptedAnswers: ["Timing & damage"],
          explanation: "Damaged mesh and how long breaching it could take.",
        },
        {
          id: "final-trial-direct-acronym-industry-standards",
          indicator: "6",
          answer: "Industry standards",
          explanation: "ACA standards, documentation, and searches.",
        },
        {
          id: "final-trial-direct-acronym-gun-capabilities",
          indicator: "7",
          answer: "Capabilities of the gun",
          acceptedAnswers: ["Capabilities of gun", "Capabilities of the block gun", "Gun capabilities"],
          explanation: "Ammunition, reloading, and the block gun's limitations.",
        },
        {
          id: "final-trial-direct-acronym-emergency-response",
          indicator: "8",
          answer: "Emergency response",
          explanation: "Retreat, blocked return to the yard, and the call for help.",
        },
      ],
    },
  ],
};
