// November 16 speaker-assignment decks: Mason Russell / Speaker B only.
const sourceDirectory = "AI&TheLaw/FinalPresentation/GoNoGo_Project/Speaker_Assignments_20261116/PowerPoints";

function topic(slide, answer, title, ...acceptedAnswers) {
  return { slide, answer, title, acceptedAnswers };
}

function topicDrill(version, title, slides, file, topics) {
  const id = `ai-presentation-mason-${version}-topics`;
  return {
    id,
    type: "sporcle-grid",
    title,
    answerMatching: "active",
    answerLayout: "stacked",
    clueLayout: "above",
    prompt: `Recall the general topic of each Mason / Speaker B slide in order. Use the slide numbers as clues (${slides}).`,
    courseSources: [
      `${sourceDirectory}/${file} · slides ${slides} and speaker notes`,
      "November 16, 2026 assignments: Speaker B (Mason Russell). Class slides 5–8 correspond to rehearsal slides 19–24, 25–30, 31–33, and 34–36. Shared question-support slides 37–48 are outside the prepared remarks.",
    ],
    columns: [{
      id: `${id}-sequence`,
      title: "Slide topics in presentation order",
      answers: topics.map(({ slide, answer, title: slideTitle, acceptedAnswers }) => ({
        id: `${id}-slide-${slide}`,
        indicator: `Slide ${slide}`,
        answer,
        acceptedAnswers: [slideTitle, ...acceptedAnswers],
        explanation: `Deck title: “${slideTitle}”`,
      })),
    }],
  };
}

export const aiAndLawPresentationSubject = {
  id: "final-presentation-mason",
  title: "Final Presentation: Mason / Speaker B",
  questions: [
    topicDrill("rehearsal", "Rehearsal Slide Topics (19–36)", "19–36",
      "WorkSage_Product_Focused_Rehearsal_48_Slides.pptx", [
        topic(19, "Pulse and the TAG invention", "Pulse and the TAG invention",
          "TAG invention", "TAG overview", "Pulse and TAG", "TAG"),
        topic(20, "Patent eligibility", "TAG faces an eligibility problem",
          "Eligibility", "TAG eligibility", "Section 101", "Alice and Mayo", "Alice/Mayo"),
        topic(21, "Patent novelty", "TAG may still be novel",
          "Novelty", "Anticipation", "Section 102"),
        topic(22, "Patent nonobviousness", "TAG’s combination may be obvious",
          "Nonobviousness", "Obviousness", "Section 103", "KSR"),
        topic(23, "Disclosure and filing deadlines", "TAG’s disclosure clock is running",
          "Disclosure deadlines", "Disclosure clock", "Filing deadlines", "Patent deadlines", "Disclosure timing"),
        topic(24, "TAG patent filing decision", "TAG’s filing decision",
          "Filing decision", "Patent filing decision", "TAG filing decision"),
        topic(25, "Copilot and shared source risks", "Copilot and shared source risks",
          "Source risks", "Copilot source risks", "Copilot source rights", "Training sources", "Input rights"),
        topic(26, "Four fair use factors", "Copilot’s four fair use factors",
          "Fair use factors", "Four factors", "Fair use", "Section 107"),
        topic(27, "Fair use cases", "Copilot must fit the actual cases",
          "Copyright cases", "Training cases", "Bartz Kadrey ROSS", "Bartz, Kadrey, and ROSS", "Case comparisons"),
        topic(28, "Copyright damages", "Copilot’s conditional damages scale",
          "Damages", "Statutory damages", "Copilot damages", "Copyright exposure"),
        topic(29, "Copilot clearance", "Copilot needs separate clearance",
          "Copyright clearance", "Copilot rights clearance", "License or replacement", "Licensing and replacement"),
        topic(30, "Human authorship", "Human authorship across the platform",
          "Authorship", "Human authorship of code and outputs", "Code and output ownership"),
        topic(31, "TalentGraph protection", "TalentGraph’s protection has limits",
          "TalentGraph", "Compilation protection", "TalentGraph compilation", "Compilation copyright"),
        topic(32, "Counsel competence", "The Board needs competent advice",
          "Competence", "Competent advice", "Attorney competence", "Lawyer competence", "Rule 1.1", "Marsh"),
        topic(33, "Internal hiring controls", "Internal hiring must follow the controls",
          "Internal hiring", "Employee AI use", "Internal AI use", "Tilson", "Hiring controls"),
        topic(34, "Release owners and deadlines", "The release decision has owners",
          "Owners and deadlines", "Owners deadlines and budgets", "Release conditions and owners", "Release owners", "Implementation plan"),
        topic(35, "Module-specific launch decisions", "A separate decision for each module",
          "Module launch decisions", "Separate module decisions", "Launch matrix", "Release matrix", "Module decisions"),
        topic(36, "Board recommendation", "Board recommendation",
          "Final recommendation", "Conditional Go", "Recommendation", "Closing recommendation"),
      ]),
    topicDrill("class", "Class Slide Topics (5–8)", "5–8",
      "WorkSage_Product_Focused_Class_8_Slides.pptx", [
        topic(5, "Pulse and the TAG patent", "Pulse and the TAG patent",
          "TAG patent", "Pulse patent", "Patents", "Patent analysis"),
        topic(6, "Copilot training and content rights", "Copilot training and content rights",
          "Copilot rights", "Copyright", "Copilot copyright", "Training and content rights"),
        topic(7, "Shared assets and human responsibility", "Shared assets and human responsibility",
          "Shared assets", "Human responsibility", "TalentGraph competence and internal hiring"),
        topic(8, "Three modules, separate launch decisions", "Three modules, separate launch decisions",
          "Module launch decisions", "Separate launch decisions", "Launch decisions", "Final recommendation", "Conditional Go"),
      ]),
  ],
};
