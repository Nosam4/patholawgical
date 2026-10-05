// Source: the user's MiniTrial opening statement and examination outlines.
// These drills preserve the supplied script; they do not supply witness answers.
const theme = {
  answer: "Trakkers’ staff needed help [hold up one finger], but Logan needed rescue [hold up second finger].",
  acceptedAnswers: [
    "Trakkers’ staff needed help, but Logan needed rescue.",
  ],
};

const closing = {
  indicator: "Close",
  answer: "Thank you. No further questions, your honor.",
};

function section(id, title, lines, { start = 1, prefix = "" } = {}) {
  return {
    id,
    title,
    answers: lines.map((line, index) => ({
      id: `${id}-${index + 1}`,
      indicator: `${prefix}${start + index}`,
      ...(typeof line === "string" ? { answer: line } : line),
    })),
  };
}

export const miniTrialSubject = {
  id: "mini-trial",
  title: "MiniTrial",
  questions: [
    {
      id: "mini-trial-opening-statement",
      type: "sporcle-grid",
      title: "Opening Statement",
      answerMatching: "active",
      prompt: "Recite your opening statement in order, one sentence or short line per blank. Follow the seven steps; step 6 is divided into the three parts of your roadmap. Type the spoken words; hand gestures appear with the theme when answered or revealed. Capitalization and punctuation do not matter.",
      courseSources: ["MiniTrial opening statement supplied in chat on October 5, 2026."],
      columns: [
        section("mini-trial-opening-theme", "1. Say the theme", [theme]),
        section("mini-trial-opening-story", "2. Tell a short story that explains the theme", [
          "It is November 18, 2021.",
          "Logan Day is in the mountains.",
          "He presses the SOS button on his Trakker.",
          "Mountain Trakkers receives his signal and his location.",
          "Its staff is handling more alerts than usual, with too few people working.",
          "The employee’s log lists an internet alert.",
          "Six days pass before the local rescue team learns Logan is missing.",
        ]),
        section("mini-trial-opening-repeat-theme", "3. Repeat the theme", [theme]),
        section("mini-trial-opening-introduction", "4. Introduce Logan, the claim, the law, and the burden", [
          "Members of the jury, Logan’s friends called him Eagle.",
          "He loved hiking.",
          "His friend Gabi will tell you that Logan had hiked the Appalachian, Continental Divide, and Pacific Crest trails, each more than once.",
          "We represent the plaintiff in this negligence case against Mountain Trakkers, the company that provided Logan’s emergency service.",
          "Mountain Trakkers agrees that it owed Logan a duty of care and that he suffered harm.",
          "We must prove, more likely than not, that the company failed to use reasonable care and that its failure was a substantial factor in Logan’s death.",
          "Its failure must have played more than a small or distant part in his death.",
          "It does not have to be the only cause.",
        ]),
        section("mini-trial-opening-roadmap", "5. Give the roadmap", [
          "We will follow three parts of the story: what happened before Logan’s SOS, how Mountain Trakkers handled it, and what happened in the days that followed.",
        ]),
        section("mini-trial-opening-before-sos", "6. Follow the roadmap — Before Logan’s SOS", [
          "First, what happened before Logan’s SOS.",
          "Mountain Trakkers offers help at the push of a button.",
          "Its agreement describes a service that monitors SOS signals day and night and sends the signals and locations to local rescuers.",
          "The agreement also contains limits on liability, including negligence.",
          "The company relies on those limits.",
          "It must prove that Logan agreed to those limits and that they apply to his claim.",
          "The employee who handled Logan’s alert will explain the training: find the hiker’s location, find the local rescue team, and call.",
          "The CEO will explain that calling helps make sure the rescue team receives the alert.",
          "In the summer of 2021, the company cuts staff hours.",
          "The CEO will explain that the company was losing customers.",
          "The employee will describe workers who leave and are not replaced.",
          "Fewer people have to handle the work.",
          "More alerts come in while an employee is on the phone.",
          "During busy shifts, the employee starts sending alerts over the internet.",
          "On November 16, Logan leaves Gabi’s home in Chama to return to the trail.",
          "Snow is in the forecast.",
          "Gabi will tell you about warning Logan that the weather could get worse.",
          "Gabi is worried, but based on that forecast, Gabi probably would have gone too.",
          "Logan takes his Trakker.",
          "The company claims Logan should not have headed out.",
          "It must prove that he failed to use reasonable care and that his failure was a substantial factor in his harm.",
          "You will hear about his experience, the forecast, and Gabi’s warning.",
          "The next day, a blizzard hits.",
        ]),
        section("mini-trial-opening-handling-sos", "6. Follow the roadmap — Handling Logan’s SOS", [
          "Second, how Mountain Trakkers handles Logan’s SOS.",
          "On November 18, Logan sends his signal.",
          "The employee will describe a short-staffed shift during a week with more emergency alerts than usual.",
          "The company’s report shows Logan’s location and lists the local rescue team’s phone number.",
          "The employee’s log lists an internet alert.",
          "You will hear from Cameron Jones, a member of the rescue team.",
          "Cameron will explain that storms sometimes knock out the office’s internet.",
          "As far as Cameron knows, its satellite phones work even in bad weather.",
          "Cameron recommends calling.",
        ]),
        section("mini-trial-opening-days-follow", "6. Follow the roadmap — The days that follow", [
          "Third, what happens in the days that follow.",
          "On November 24, Gabi has not heard from Logan and calls search and rescue.",
          "Cameron will tell you that, until this call, the team had no notice that Logan was missing.",
          "Six days have passed since Mountain Trakkers received his SOS.",
          "The team gets to work right away.",
          "It brings in a plane to help search ninety-seven miles of trail.",
          "Cameron will describe the snow that still makes it hard to reach the area.",
          "On November 30, Logan Day dies.",
          "Both sides agree that the main cause is dehydration.",
          "That is twelve days after Mountain Trakkers received his SOS.",
          "The company fires the employee the following month.",
          "You will hear that the employee is upset about the firing.",
          "You will also see the company’s own records of how Logan’s alert was handled.",
        ]),
        section("mini-trial-opening-verdict", "7. Repeat the theme and ask for the verdict", [
          theme,
          "At the end of this trial, we will ask you to find that Mountain Trakkers failed to use reasonable care and that its failure was a substantial factor in Logan’s death.",
          "We will ask you to return a verdict for the plaintiff.",
        ]),
      ],
    },
    {
      id: "mini-trial-direct-gabi-delgado",
      type: "sporcle-grid",
      title: "Direct Examination — Gabi Delgado",
      answerMatching: "active",
      prompt: "Recall your 15 direct-examination questions in order, followed by your closing line. Type the full question in the selected blank; capitalization and punctuation do not matter. Reveal missed answers to review your original wording.",
      courseSources: ["MiniTrial Gabi Delgado direct-examination outline supplied in chat on October 5, 2026."],
      columns: [
        section("mini-trial-direct-introduction", "Introduction (comparative fault - experience)", [
          "Please introduce yourself to the jury",
          "What is your hiking experience?",
          "How did you first meet Logan Day?",
          "What was his hiking name?",
          "How experienced was he at hiking?",
        ], { prefix: "Q" }),
        section("mini-trial-direct-departure", "Departure (comparative fault - weather)", [
          "When did you last see Logan?",
          "What did you fear could happen to Logan?",
          "What would you have done in those conditions?",
          "How did Logan respond to your concerns?",
        ], { start: 6, prefix: "Q" }),
        section("mini-trial-direct-expected-call", "Expected Call (causation - reliance)", [
          "When did you and Logan plan on talking again?",
          "How were you going to talk?",
          "When did you expect to hear from Logan?",
          "When did Logan call you?",
          "What did you do when he did not call you?",
          "When did you contact search and rescue?",
          closing,
        ], { start: 10, prefix: "Q" }),
      ],
    },
    {
      id: "mini-trial-cross-cameron-jones",
      type: "sporcle-grid",
      title: "Cross-examination — Cameron Jones",
      answerMatching: "active",
      prompt: "Recall your 18 cross-examination questions in order, followed by your closing line. Type the full question in the selected blank; capitalization and punctuation do not matter. Reveal missed answers to review your original wording.",
      courseSources: ["MiniTrial Cameron Jones cross-examination outline supplied in chat on October 5, 2026."],
      columns: [
        section("mini-trial-cross-report", "Didn’t receive report (causation - failure)", [
          "You’re a member of Rio Arriba County Search and Rescue?",
          "You were working the office phone on November 24, 2021?",
          "That day, Ms. Delgado called to report Logan missing?",
          "Before the call, your team had no notice of a missing hiker?",
          "Your team keeps a log of every emergency report?",
          "That includes reports from GPS companies?",
        ], { prefix: "Q" }),
        section("mini-trial-cross-telephone", "Telephone Contact (causation - failure)", [
          "Your office receives emergency alerts over the internet?",
          "Storms have sometimes knocked out your internet?",
          "During those outages, you cannot receive internet alerts?",
          "Your office has a satellite phone?",
          "Satellite phones always work, despite the storm?",
          "You recommend calling?",
          "The internet didn’t go out on November 18, 2021?",
        ], { start: 7, prefix: "Q" }),
        section("mini-trial-cross-finding-logan", "Finding Logan (comparative negligence - experience)", [
          "Your team searched for eight days before finding a lead?",
          "You followed the lead to the Lagunitas campground?",
          "The campground is less than half a mile off the trail?",
          "You found Logan’s body in the campground bathroom?",
          "You found his Trakker GPS there too?",
          closing,
        ], { start: 14, prefix: "Q" }),
      ],
    },
  ],
};
