// Sources: OpeningStatements.docx, Direct Examination of Nehal Saeed.docx,
// and the user's previously supplied MiniTrial examination outlines.
// These drills preserve the supplied script; witness responses appear only when supplied in the source.
const theme = {
  answer: "Trakkers’ staff needed help [hold up one finger], Logan needed rescue [hold up second finger].",
  acceptedAnswers: [
    "Trakkers’ staff needed help, Logan needed rescue.",
  ],
};

const verdictTheme = {
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
      prompt: "Recite your opening statement in order, one sentence or short line per blank. Follow the seven steps and evidence sections from OpeningStatements.docx. Type the spoken words; hand gestures appear with the theme when answered or revealed. Capitalization and punctuation do not matter.",
      courseSources: ["MiniTrial/OpeningStatements.docx — Day v Mountain Trakkers."],
      columns: [
        section("mini-trial-opening-theme", "1. Say the theme", [theme]),
        section("mini-trial-opening-story", "2. Tell a short story that explains the theme", [
          "It is November 18, 2021.",
          "A blizzard has hit the mountains.",
          "Logan Day presses the SOS button on his Trakker.",
          "Mountain Trakkers receives his signal and location.",
          "Its staff is handling more alerts than usual, with too few people working.",
          "Logan spelled SOS with sticks, and waited . . . . .",
          "Nobody came.",
          "Six days pass.",
          "On November 24, Logan’s friend calls search and rescue.",
          "Until that call, the local team doesn’t know Logan is missing.",
          "They start searching immediately, but snow makes the area hard to reach.",
          "On November 30, Logan dies.",
          "Both sides agree the main cause is dehydration.",
          "Twelve days have passed since his SOS.",
        ]),
        section("mini-trial-opening-repeat-theme", "3. Repeat the theme", [theme]),
        section("mini-trial-opening-introduction", "4. Introduce Logan, the claim, the law, and the burden", [
          "Members of the jury, Logan’s friends called him Eagle.",
          "He was an experienced hiker.",
          "We represent the plaintiff in this negligence case.",
          "Mountain Trakkers agrees it owed Logan a duty of care and that he suffered harm.",
          "We must prove, more likely than not, that Trakkers failed to use reasonable care and that its failure was a substantial factor in Logan’s death.",
          "That means more than a small or distant factor; it doesn’t have to be the only cause.",
        ]),
        section("mini-trial-opening-roadmap", "5. Give the roadmap", [
          "The evidence will address the company’s (1) promised service and training, (2) the handling of Logan’s alert, and (3) the importance of reaching local rescue.",
        ]),
        section("mini-trial-opening-promised-service", "6. Follow the roadmap — Promised service and training", [
          "First, the promised service and training.",
          "The agreement describes monitoring SOS signals day and night and forwarding the signals and locations to local rescuers.",
          "The employee will explain the training to call local rescue.",
          "The CEO will explain that calling helps confirm the rescue team receives the alert.",
        ]),
        section("mini-trial-opening-handling-sos", "6. Follow the roadmap — Handling Logan’s SOS", [
          "Second, the handling of this alert.",
          "The employee will describe staffing cuts and a busy shift.",
          "The company’s report lists Logan’s location and the rescue team’s phone number.",
          "The log lists an internet alert.",
        ]),
        section("mini-trial-opening-reaching-rescue", "6. Follow the roadmap — Reaching local rescue", [
          "Third, reaching local rescue.",
          "Cameron Jones will explain that storms can disrupt the rescue office’s internet.",
          "That their satellite phones work in bad weather.",
          "Cameron recommends calling.",
        ]),
        section("mini-trial-opening-weather", "6. Preview the evidence — Weather and comparative fault", [
          "You will also hear Logan’s friend’s warning about worsening weather.",
          "Based on the forecast, his friend probably would have hiked too.",
          "Mountain Trakkers must prove Logan failed to use reasonable care and that his failure was a substantial factor in his harm.",
        ]),
        section("mini-trial-opening-verdict", "7. Repeat the theme and ask for the verdict", [
          verdictTheme,
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
      id: "mini-trial-direct-nehal-saeed",
      type: "sporcle-grid",
      title: "Direct Exam - Nehal",
      answerMatching: "active",
      answerLayout: "stacked",
      prompt: "Recall your 60 direct-examination questions in order, followed by your closing line. Type the full question in the selected blank; capitalization and punctuation do not matter. Supplied witness responses appear when answered or revealed. Exhibit cues are shown as context and do not count as blanks.",
      courseSources: ["MiniTrial/Direct Examination of Nehal Saeed.docx — Direct Examination of Mountain Trakkers CEO Nehal Saeed."],
      columns: [
        section("mini-trial-nehal-introduction", "Introduction and company", [
          {
            indicator: "Q1",
            answer: "Good afternoon, can you please state your name for the record?",
            explanation: "Witness: Good afternoon. Yes, my name is Nehal Saeed.",
          },
          {
            indicator: "Q2",
            answer: "Thank you, Mr. Saeed, and just so the jury can get to know you a little bit more, what do you do for a living?",
            explanation: "Witness: I'm the founder and CEO of a company called Mountain Trakkers.",
          },
          {
            indicator: "Q3",
            answer: "And what does that company do?",
            explanation: "Witness: We make GPS devices that help hikers and adventurers go out into nature safely and with a good support system. So, with our devices, customers can also purchase a subscription that gives them access to, among other things, our emergency alert team.",
          },
          {
            indicator: "Q4",
            answer: "And what made you want to start Mountain Trakkers?",
            explanation: "Witness: I came up with the idea after I broke my arm while hiking the Appalachian Trail during a pretty bad rainstorm. I got out alright, but I know a lot of other people who weren't so lucky. So, I guess Mountain Trakkers is just my way of giving back to the outdoor adventure community that I love so much.",
          },
          {
            indicator: "Q5",
            answer: "And what year was it that you started Mountain Trakkers?",
            explanation: "Witness: It was in 2015.",
          },
        ]),
        section("mini-trial-nehal-training", "Staff training and oversight", [
          {
            indicator: "Q6",
            answer: "So, you've testified that Mountain Trakkers is about giving back to the hiking community and being a good support system. Are staffers for the company trained before taking on their roles?",
            explanation: "Witness: Oh, of course. Absolutely.",
          },
          {
            indicator: "Q7",
            answer: "What kind of training do staffers get?",
            explanation: "Witness: We train our emergency liaisons to ensure that they know how to properly contact search and rescue and emergency medical services whenever they get an alert from a hiker who's in trouble.",
          },
          {
            indicator: "Q8",
            answer: "And do you, as CEO, ensure that training is adhered to?",
            explanation: "Witness: Yes, I do.",
          },
          {
            indicator: "Q9",
            answer: "And how do you do that?",
            explanation: "Witness: Well, one way I do that is I check our emergency department's shift logs every week to make sure that we are providing the services that our customers deserve.",
          },
        ]),
        section("mini-trial-nehal-business", "Business downturn", [
          {
            indicator: "Q10",
            answer: "I wanted to turn now to the health of your company, Mr. Saeed. You mentioned earlier that it was founded in 2015, so it's been more than a decade. How has the company been doing in the years since?",
            explanation: "Witness: In the early years, and especially during the pandemic, we were doing great. Sales of our GPS devices were doing very well, and it seemed like people just couldn't get enough of the product. But we started losing customers and subscriptions in the summer of 2021 when things started going back to normal.",
          },
          {
            indicator: "Q11",
            answer: "And how did the company respond to this downturn in business?",
            explanation: "Witness: We rolled back some of the perks we'd give to our staff, trips and stuff like that, and we also had to reduce the hours of some of our emergency liaisons.",
          },
          {
            indicator: "Q12",
            answer: "Why was it appropriate to reduce the hours of emergency liaisons?",
            explanation: "Witness: We just weren't getting enough alerts or calls to justify keeping hours the same.",
          },
        ]),
        section("mini-trial-nehal-advertisement", "Advertisement — Exhibit 2", [
          {
            indicator: "Q13",
            answer: "Now, I want to turn Mr. Saeed to this GPS device that you mentioned earlier, the one that was once selling so well as you mentioned, but isn't doing quite as well anymore. If I were to show you an advertisement of this product put out by Mountain Trakkers, would you recognize it?",
            explanation: "Witness: Yes, I would.",
          },
          {
            indicator: "Exhibit",
            answer: "Show Exhibit 2.",
            quiz: false,
          },
          {
            indicator: "Q14",
            answer: "Do you recognize this exhibit?",
            explanation: "Witness: Yes, I do.",
          },
          {
            indicator: "Q15",
            answer: "What is it?",
            explanation: "Witness: It's an advertisement for the GPS put out by Mountain Trakkers.",
          },
          {
            indicator: "Q16",
            answer: "And does this exhibit fairly and accurately represent the types of advertisements that would be put out by your company?",
            explanation: "Witness: Yes, it does.",
          },
          {
            indicator: "Q17",
            answer: "Thank you, Mr. Saeed. Do you see the bottom right-hand column that says \"Device Features\"?",
            explanation: "Witness: Yes, I do.",
          },
          {
            indicator: "Q18",
            answer: "Can you read out these features for us please?",
            explanation: "Witness: Witness reads features.",
          },
          {
            indicator: "Q19",
            answer: "Thank you, Mr. Saeed. And would you say that this is the full extent of what this device is meant to do?",
            explanation: "Witness: Yes, pretty much.",
          },
          {
            indicator: "Q20",
            answer: "And is it the case that customers who purchase a subscription with Mountain Trakkers also agree to these terms?",
            explanation: "Witness: Yes, they do.",
          },
        ]),
        section("mini-trial-nehal-contract", "Contract and limitations — Exhibit 5", [
          {
            indicator: "Q21",
            answer: "Did Mr. Logan Day have to accept the terms of one of these contracts when he purchased a subscription with your company?",
            explanation: "Witness: Yes, he did.",
          },
          {
            indicator: "Q22",
            answer: "And if I were to show you that contract, would you recognize it?",
            explanation: "Witness: Yes, I would.",
          },
          {
            indicator: "Exhibit",
            answer: "Show Exhibit 5.",
            quiz: false,
          },
          {
            indicator: "Q23",
            answer: "Do you recognize this exhibit?",
            explanation: "Witness: Yes, I do.",
          },
          {
            indicator: "Q24",
            answer: "What is it?",
            explanation: "Witness: It's the contract between Logan Day and Mountain Trakkers.",
          },
          {
            indicator: "Q25",
            answer: "And is this contract the same as or substantially the same as the one Logan Day agreed to?",
            explanation: "Witness: Yes, it is.",
          },
          {
            indicator: "Q26",
            answer: "I want to direct your attention to Section 6 and Subsection 6.1.1, what's entitled the \"Limitation of Liability\". Do you see that?",
            explanation: "Witness: Yes, I do.",
          },
          {
            indicator: "Q27",
            answer: "Can you read that initial paragraph of Section 6 and the subsection marked 6.1.1?",
            explanation: "Witness: Witness reads passage.",
          },
          {
            indicator: "Q28",
            answer: "In what you just read, Mr. Saeed, is there an explicit disclaimer of liability for factors outside of Mountain Trakkers control?",
            explanation: "Witness: Yes, there is.",
          },
          {
            indicator: "Q29",
            answer: "Is bad weather one of those factors?",
            explanation: "Witness: Yes, it is.",
          },
          {
            indicator: "Q30",
            answer: "And, in what you just read, Mr. Saeed, is the failure of satellite and telecommunication systems another one of those factors?",
            explanation: "Witness: Yes, it is.",
          },
          {
            indicator: "Q31",
            answer: "And did Mr. Logan Day accept the terms of this contract?",
            explanation: "Witness: Yes, he did.",
          },
        ]),
        section("mini-trial-nehal-sos-alert", "SOS alert — Exhibit 6", [
          {
            indicator: "Q32",
            answer: "Now, Mr. Saeed, turning back to the GPS device produced by Mountain Trakkers that Mr. Day owned, how is this device supposed to work again?",
            explanation: "Witness: Basically, a customer who's in distress sends out an SOS alert that reaches our team and we then contact EMS.",
          },
          {
            indicator: "Q33",
            answer: "And we have a printout of the SOS alert sent out by Mr. Day admitted into evidence. If I were to show you the printout of that alert, would you recognize it?",
            explanation: "Witness: Yes, I would.",
          },
          {
            indicator: "Exhibit",
            answer: "Show Exhibit 6.",
            quiz: false,
          },
          {
            indicator: "Q34",
            answer: "Do you recognize this?",
            explanation: "Witness: Yes, I do.",
          },
          {
            indicator: "Q35",
            answer: "What is this?",
            explanation: "Witness: It's a printout of the SOS alert sent out by Logan Day on November 18, 2021.",
          },
          {
            indicator: "Q36",
            answer: "And does this fairly accurately represent the details of that alert?",
            explanation: "Witness: Yes, it does.",
          },
          {
            indicator: "Q37",
            answer: "And under the heading that says \"Alert Information\", can you summarize what it says?",
            explanation: "Witness: Witness summarizes contents of box.",
          },
          {
            indicator: "Q38",
            answer: "Thank you. Did the device in this case work as it is meant to and as was advertised in Exhibit 2?",
            explanation: "Witness: Yes, it did.",
          },
        ]),
        section("mini-trial-nehal-sacha-heyman", "Sacha Heyman", [
          {
            indicator: "Q39",
            answer: "Now, I want to turn your attention to who the case was assigned to here. What name is listed there under the \"Alert Information\"?",
            explanation: "Witness: It's Sacha Heyman.",
          },
          {
            indicator: "Q40",
            answer: "What was Sacha Heyman's role in the company at the time Logan Day's alert was received?",
            explanation: "Witness: She was an emergency liaison",
          },
          {
            indicator: "Q41",
            answer: "Does she still hold that role today?",
            explanation: "Witness: No, she does not.",
          },
          {
            indicator: "Q42",
            answer: "Why not?",
            explanation: "Witness: I fired her in December 2021.",
          },
          {
            indicator: "Q43",
            answer: "Why did you fire her?",
            explanation: "Witness: She wasn't doing her job the way she was trained to. We always emphasized safety at Mountain Trakkers and actually calling EMS and search and rescue providers to make sure that they receive our emergency alerts.",
          },
          {
            indicator: "Q44",
            answer: "And based on her training which she received by Mountain Trakkers, would Sacha Heyman have been aware that pinging EMS by phone call was the company's preferred method?",
            explanation: "Witness: Yes, she absolutely would have.",
          },
          {
            indicator: "Q45",
            answer: "Did you ever receive any indication from Sacha Heyman that she was having a hard time pinging EMS through phone?",
            explanation: "Witness: No, she never mentioned that to me.",
          },
        ]),
        section("mini-trial-nehal-staff-report", "Staff report — Exhibit 8", [
          {
            indicator: "Q46",
            answer: "Now, Mr. Saeed, admitted into evidence we have a \"Trakker Liaison Staff Report\" that you requested and that shows how many alerts were reported through the internet and how many were reported by phone in the month of November 2021. If I were to show you that Staff Report, would you recognize it?",
            explanation: "Witness: Yes, I would.",
          },
          {
            indicator: "Exhibit",
            answer: "Show Exhibit 8.",
            quiz: false,
          },
          {
            indicator: "Q47",
            answer: "Do you recognize this exhibit?",
            explanation: "Witness: Yes, I do",
          },
          {
            indicator: "Q48",
            answer: "What is it?",
            explanation: "Witness: It's the \"Trakker Liaison Staff Report\" from November 2021.",
          },
          {
            indicator: "Q49",
            answer: "How do you recognize it?",
            explanation: "Witness: I requested it.",
          },
          {
            indicator: "Q50",
            answer: "Does this fairly and accurately represent what you requested?",
            explanation: "Witness: Yes, it does.",
          },
          {
            indicator: "Q51",
            answer: "Can you briefly explain to me what this report shows?",
            explanation: "Witness: Briefly explains document – shows percentages of reports each employee made by phone and by internet",
          },
          {
            indicator: "Q52",
            answer: "Now, can you, to yourself, count the number of employees listed on this report and tell me how many there are?",
            explanation: "Witness: There are eighteen employees listed here.",
          },
          {
            indicator: "Q53",
            answer: "Is Sacha Heyman one of those employees?",
            explanation: "Witness: Yes.",
          },
          {
            indicator: "Q54",
            answer: "During the month of November, the month that Logan day died, what percentage of her pings did Sacha Heyman make by phone?",
            explanation: "Witness: 71%",
          },
          {
            indicator: "Q55",
            answer: "71%. Now among the employees listed, how many were able to make more than 71% of their reports by phone?",
            explanation: "Witness: 12 employees",
          },
          {
            indicator: "Q56",
            answer: "12 employees. And how many employees did we say are listed on the report?",
            explanation: "Witness: 18 employees",
          },
          {
            indicator: "Q57",
            answer: "Was Sacha Heyman's percentage of reports sent out by phone more, less than, or equal to a majority of Mountain Trakkers' employees at the time?",
            explanation: "Witness: That 71% was less than a majority of our employees that month.",
          },
        ]),
        section("mini-trial-nehal-capabilities", "Company capabilities", [
          {
            indicator: "Q58",
            answer: "Now, turning to Mountain Trakkers' capabilities, what purpose does your company serve as far as hikers and adventurers are concerned?",
            explanation: "Witness: We contact search and rescue and EMS when we receive an alert from one of our customers.",
          },
          {
            indicator: "Q59",
            answer: "Can your company guarantee that EMS or search and rescue receive those attempts at contact?",
            explanation: "Witness: We can do our best, but we can't guarantee it.",
          },
          {
            indicator: "Q60",
            answer: "And if an emergency liaison were to successfully reach EMS or search and rescue, can your company guarantee and ensure that rescuers or emergency workers actually make it to the distressed hiker?",
            explanation: "Witness: No, we can't because there are so many factors out of our control, including bad weather. And that's sadly what happened in the case of Logan Day.",
          },
          {
            indicator: "Close",
            answer: "Thank you, Mr. Saeed. No further questions, Your Honor.",
          },
        ]),
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
