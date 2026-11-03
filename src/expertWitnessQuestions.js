// Sources: the three Mason expert-witness examination scripts listed in courseSources.
// Preserve counsel wording; witness answers and citations are revealed explanations.
// Signposts, court requests, stage directions, and conditional arguments remain visible context.
export const expertWitnessesSubject = {
  "id": "expert-witnesses",
  "title": "Expert Witnesses",
  "questions": [
    {
      "id": "expert-witnesses-direct",
      "type": "sporcle-grid",
      "title": "Direct",
      "answerMatching": "active",
      "answerLayout": "stacked",
      "prompt": "Dr. Morgan Kahn: recall the 22 direct-examination questions and closing line in order. Type the full question or closing line in the selected blank; capitalization and punctuation do not matter. Supplied witness responses and source citations appear when answered or revealed. Signposts, court requests, and stage directions are shown as context and do not count as blanks.",
      "courseSources": [
        "ExpertWitnesses/Mason_DirectExamination_DrMorganKahn_Simplified.docx"
      ],
      "columns": [
        {
          "id": "expert-direct-kahn-background",
          "title": "Background",
          "answers": [
            {
              "id": "expert-direct-kahn-q01",
              "indicator": "Q1",
              "answer": "Good afternoon. Please introduce yourself.",
              "explanation": "A. My name is Dr. Morgan P. Kahn.\nSource: (p. 133)"
            },
            {
              "id": "expert-direct-kahn-q02",
              "indicator": "Q2",
              "answer": "How are you involved in this case?",
              "explanation": "A. I examined Kelly Baker’s body at the scene and performed his autopsy.\nSource: (p. 134, ll. 3–14, 39–45)"
            },
            {
              "id": "expert-direct-kahn-background-signpost",
              "indicator": "Signpost",
              "answer": "First, a little about your background.",
              "quiz": false
            },
            {
              "id": "expert-direct-kahn-q03",
              "indicator": "Q3",
              "answer": "What do you do for a living?",
              "explanation": "A. I am a forensic pathologist and the lab director at the Darrow County Coroner’s Office.\nSource: (p. 133, ll. 1–3)"
            },
            {
              "id": "expert-direct-kahn-q04",
              "indicator": "Q4",
              "answer": "What is a forensic pathologist?",
              "explanation": "A. A doctor who examines bodies to find out how people died.\nSource: (p. 133, ll. 15–24)"
            },
            {
              "id": "expert-direct-kahn-q05",
              "indicator": "Q5",
              "answer": "What education and training do you have?",
              "explanation": "A. An MD and PhD from Case Western Reserve, a pathology residency at Duke, and a year of forensic pathology training in Chapel Hill.\nSource: (p. 133, ll. 3–9)"
            },
            {
              "id": "expert-direct-kahn-q06",
              "indicator": "Q6",
              "answer": "Are you board certified?",
              "explanation": "A. Yes, in forensic pathology.\nSource: (p. 133, ll. 11–13)"
            },
            {
              "id": "expert-direct-kahn-q07",
              "indicator": "Q7",
              "answer": "How much experience do you have with gunshot deaths?",
              "explanation": "A. I have performed about 3,000 autopsies. About a quarter involved gunshot wounds.\nSource: (p. 133, ll. 32–37)"
            },
            {
              "id": "expert-direct-kahn-case-work-signpost",
              "indicator": "Signpost",
              "answer": "Now, your work in this case.",
              "quiz": false
            },
            {
              "id": "expert-direct-kahn-q08",
              "indicator": "Q8",
              "answer": "What did you review?",
              "explanation": "A. All the case materials, including the medical findings, lab results, scene evidence, diagrams, and witness accounts.\nSource: (p. 4)"
            },
            {
              "id": "expert-direct-kahn-q09",
              "indicator": "Q9",
              "answer": "What did you do during the autopsy?",
              "explanation": "A. I examined the body and organs, followed the bullet paths, and recovered two bullets.\nSource: (p. 134, ll. 39–45; p. 135, ll. 4–21)"
            },
            {
              "id": "expert-direct-kahn-q10",
              "indicator": "Q10",
              "answer": "Do doctors in your field normally use that information?",
              "explanation": "A. Yes.\nSource: (p. 133, ll. 23–25)"
            },
            {
              "id": "expert-direct-kahn-q11",
              "indicator": "Q11",
              "answer": "Did you use standard methods in this case?",
              "explanation": "A. Yes. I compared my medical findings with the scene and lab evidence.\nSource: (p. 134, ll. 39–45; p. 135, ll. 40–45)"
            },
            {
              "id": "expert-direct-kahn-q12",
              "indicator": "Q12",
              "answer": "Do you hold your opinions to a reasonable degree of medical certainty?",
              "explanation": "A. Yes.\nSource: (p. 135, ll. 43–45)"
            },
            {
              "id": "expert-direct-kahn-tender",
              "indicator": "Court",
              "answer": "Your Honor, may we approach? The State tenders Dr. Kahn as an expert in forensic pathology.",
              "quiz": false
            },
            {
              "id": "expert-direct-kahn-tender-ruling",
              "indicator": "Stage direction",
              "answer": "[Wait for the ruling.]",
              "quiz": false
            }
          ]
        },
        {
          "id": "expert-direct-kahn-opinions",
          "title": "Opinions",
          "answers": [
            {
              "id": "expert-direct-kahn-q13",
              "indicator": "Q13",
              "answer": "What are your opinions in this case?",
              "explanation": "A. Kelly died from gunshot wounds to his neck and chest. In my opinion, he was sitting at the table facing the TV. The powder findings fit a distance of at least four feet from the gun.\nSource: (p. 134, ll. 44–45; p. 135, ll. 1, 29–45)"
            },
            {
              "id": "expert-direct-kahn-q14",
              "indicator": "Q14",
              "answer": "What are those opinions based on?",
              "explanation": "A. The wounds, the scene evidence, and the powder findings.\nSource: (p. 135, ll. 29–45)"
            },
            {
              "id": "expert-direct-kahn-wounds-signpost",
              "indicator": "Signpost",
              "answer": "Let’s start with the wounds.",
              "quiz": false
            },
            {
              "id": "expert-direct-kahn-q15",
              "indicator": "Q15",
              "answer": "Which way did the bullets travel?",
              "explanation": "A. All four paths went downward and to the left. The first three also went backward. Those paths fit a seated person, but could also fit someone crouching and turning left.\nSource: (p. 135, ll. 4–27; p. 136, ll. 3–10)"
            },
            {
              "id": "expert-direct-kahn-kitchen-signpost",
              "indicator": "Signpost / exhibit cue",
              "answer": "Now, the kitchen. [Show Exhibit 6 to counsel. Ask to approach the witness.]",
              "quiz": false
            },
            {
              "id": "expert-direct-kahn-q16",
              "indicator": "Q16",
              "answer": "What does Exhibit 6 show?",
              "explanation": "A. The kitchen at Ashgate Farm.\nSource: (p. 19)"
            },
            {
              "id": "expert-direct-kahn-q17",
              "indicator": "Q17",
              "answer": "Does it fairly show the kitchen and where you found the body?",
              "explanation": "A. Yes. It is not drawn to scale.\nSource: (p. 19; p. 134, ll. 3–11)"
            },
            {
              "id": "expert-direct-kahn-q18",
              "indicator": "Q18",
              "answer": "Will it help you explain what you found?",
              "explanation": "A. Yes.\nSource: (p. 19)"
            },
            {
              "id": "expert-direct-kahn-offer-exhibit",
              "indicator": "Court",
              "answer": "Your Honor, the State offers Exhibit 6. May we display it and have Dr. Kahn step down to explain it?",
              "quiz": false
            },
            {
              "id": "expert-direct-kahn-display-permission",
              "indicator": "Stage direction",
              "answer": "[If already admitted, ask to display it. Wait for permission.]",
              "quiz": false
            },
            {
              "id": "expert-direct-kahn-q19",
              "indicator": "Q19",
              "answer": "Please show us the table, chair, TV, and where you found Kelly.",
              "explanation": "A. [Point to each location.]\nSource: (p. 19; p. 134, ll. 3–11)"
            },
            {
              "id": "expert-direct-kahn-q20",
              "indicator": "Q20",
              "answer": "Why do you think Kelly was sitting?",
              "explanation": "A. The bullet paths fit a seated person. I also considered the gun, casings, and body location. Under the crouching-and-turning account I considered, I would expect table spatter and probably some saliva in the blood. Neither was found, which made that account less convincing to me.\nSource: (p. 135, ll. 40–45; p. 136, ll. 9–16)"
            },
            {
              "id": "expert-direct-kahn-distance-signpost",
              "indicator": "Signpost",
              "answer": "Thank you. Please return to the stand. Finally, the shooting distance.",
              "quiz": false
            },
            {
              "id": "expert-direct-kahn-q21",
              "indicator": "Q21",
              "answer": "What did the skin samples show?",
              "explanation": "A. No powder debris was found in skin from any of the four entrance wounds.\nSource: (p. 105)"
            },
            {
              "id": "expert-direct-kahn-q22",
              "indicator": "Q22",
              "answer": "What does that suggest about the distance?",
              "explanation": "A. The findings fit a distance of at least four feet between Kelly’s body and the gun.\nSource: (p. 135, ll. 29–37)"
            },
            {
              "id": "expert-direct-kahn-closing",
              "indicator": "Close",
              "answer": "No further questions, Your Honor."
            }
          ]
        }
      ]
    },
    {
      "id": "expert-witnesses-cross",
      "type": "sporcle-grid",
      "title": "Cross",
      "answerMatching": "active",
      "answerLayout": "stacked",
      "prompt": "Dr. Leslie Torres: recall the 20 cross-examination questions and closing line in order. Type the full question or closing line in the selected blank; capitalization and punctuation do not matter. Source citations appear when answered or revealed. Signposts are shown as context and do not count as blanks.",
      "courseSources": [
        "ExpertWitnesses/Mason_CrossExamination_DrLeslieTorres_Simplified.docx"
      ],
      "columns": [
        {
          "id": "expert-cross-torres-distance",
          "title": "Distance",
          "answers": [
            {
              "id": "expert-cross-torres-distance-signpost",
              "indicator": "Signpost",
              "answer": "Let’s start with the distance.",
              "quiz": false
            },
            {
              "id": "expert-cross-torres-q01",
              "indicator": "Q1",
              "answer": "You say Kelly was moving toward Sarah?",
              "explanation": "Source: (p. 150)"
            },
            {
              "id": "expert-cross-torres-q02",
              "indicator": "Q2",
              "answer": "No powder residue was found on his body?",
              "explanation": "Source: (p. 149)"
            },
            {
              "id": "expert-cross-torres-q03",
              "indicator": "Q3",
              "answer": "Or on his clothes?",
              "explanation": "Source: (p. 149)"
            },
            {
              "id": "expert-cross-torres-q04",
              "indicator": "Q4",
              "answer": "His body was at least four feet from the gun?",
              "explanation": "Source: (p. 149)"
            }
          ]
        },
        {
          "id": "expert-cross-torres-sarahs-cuts",
          "title": "Sarah’s cuts",
          "answers": [
            {
              "id": "expert-cross-torres-sarahs-cuts-signpost",
              "indicator": "Signpost",
              "answer": "Now, the cuts on Sarah’s arm.",
              "quiz": false
            },
            {
              "id": "expert-cross-torres-q05",
              "indicator": "Q5",
              "answer": "Her cuts were shallow?",
              "explanation": "Source: (p. 150)"
            },
            {
              "id": "expert-cross-torres-q06",
              "indicator": "Q6",
              "answer": "The cuts don’t tell you who made them?",
              "explanation": "Source: (p. 150)"
            },
            {
              "id": "expert-cross-torres-q07",
              "indicator": "Q7",
              "answer": "They don’t show that Kelly made them?",
              "explanation": "Source: (p. 150)"
            }
          ]
        },
        {
          "id": "expert-cross-torres-knife",
          "title": "The knife",
          "answers": [
            {
              "id": "expert-cross-torres-knife-signpost",
              "indicator": "Signpost",
              "answer": "Let’s talk about his grip on the knife.",
              "quiz": false
            },
            {
              "id": "expert-cross-torres-q08",
              "indicator": "Q8",
              "answer": "You say his grip may have loosened before he died?",
              "explanation": "Source: (p. 150)"
            },
            {
              "id": "expert-cross-torres-q09",
              "indicator": "Q9",
              "answer": "That could let blood reach his palm?",
              "explanation": "Source: (p. 150)"
            },
            {
              "id": "expert-cross-torres-q10",
              "indicator": "Q10",
              "answer": "How tightly he held the knife could affect that?",
              "explanation": "Source: (p. 150)"
            },
            {
              "id": "expert-cross-torres-q11",
              "indicator": "Q11",
              "answer": "Your report does not say how tight his grip was?",
              "explanation": "Source: (p. 150)"
            },
            {
              "id": "expert-cross-torres-q12",
              "indicator": "Q12",
              "answer": "You call that a possible explanation?",
              "explanation": "Source: (p. 150)"
            }
          ]
        },
        {
          "id": "expert-cross-torres-position",
          "title": "His position",
          "answers": [
            {
              "id": "expert-cross-torres-position-signpost",
              "indicator": "Signpost",
              "answer": "Finally, his position when he was shot.",
              "quiz": false
            },
            {
              "id": "expert-cross-torres-q13",
              "indicator": "Q13",
              "answer": "You say his wounds could fit a crouched position?",
              "explanation": "Source: (p. 150)"
            },
            {
              "id": "expert-cross-torres-q14",
              "indicator": "Q14",
              "answer": "Your account also has him turning left?",
              "explanation": "Source: (p. 150)"
            },
            {
              "id": "expert-cross-torres-q15",
              "indicator": "Q15",
              "answer": "One account puts the graze last?",
              "explanation": "Source: (p. 150)"
            },
            {
              "id": "expert-cross-torres-q16",
              "indicator": "Q16",
              "answer": "Another puts the graze first?",
              "explanation": "Source: (p. 150)"
            },
            {
              "id": "expert-cross-torres-q17",
              "indicator": "Q17",
              "answer": "You don’t know the actual shot order?",
              "explanation": "Source: (p. 149)"
            },
            {
              "id": "expert-cross-torres-q18",
              "indicator": "Q18",
              "answer": "Your report cannot say which order happened?",
              "explanation": "Source: (pp. 149–150)"
            },
            {
              "id": "expert-cross-torres-q19",
              "indicator": "Q19",
              "answer": "You cannot give his exact location in relation to the gun?",
              "explanation": "Source: (p. 149)"
            },
            {
              "id": "expert-cross-torres-q20",
              "indicator": "Q20",
              "answer": "Your report does not rule out that he was sitting?",
              "explanation": "Source: (p. 151)"
            },
            {
              "id": "expert-cross-torres-closing",
              "indicator": "Close",
              "answer": "No further questions, Your Honor."
            }
          ]
        }
      ]
    },
    {
      "id": "expert-witnesses-voir-dire",
      "type": "sporcle-grid",
      "title": "Voir Dire",
      "answerMatching": "active",
      "answerLayout": "stacked",
      "prompt": "Dr. Leslie Torres: recall the seven voir dire questions in order. Ask Q7 only if Torres identifies a method. Type the full question in the selected blank; capitalization and punctuation do not matter. Source citations appear when answered or revealed. The setup, permission requests, conditional instruction, and argument are shown as context and do not count as blanks. Use only argument grounds supported by the answers.",
      "courseSources": [
        "ExpertWitnesses/Mason_VoirDire_DrLeslieTorres_Brief.docx"
      ],
      "columns": [
        {
          "id": "expert-voir-dire-torres-setup",
          "title": "Setup",
          "answers": [
            {
              "id": "expert-voir-dire-torres-timing",
              "indicator": "When to use",
              "answer": "[At tender, or before the opinion if there is no tender. Use for opinions about Sarah’s shooting skill or shooting from the hip.]",
              "quiz": false
            },
            {
              "id": "expert-voir-dire-torres-objection",
              "indicator": "Court",
              "answer": "Your Honor, the State objects to the qualifications, facts, and methods behind these shooting opinions under Rule 702. May I ask a few questions outside the jury’s presence?",
              "quiz": false
            },
            {
              "id": "expert-voir-dire-torres-permission",
              "indicator": "Stage direction",
              "answer": "[Wait for permission.]",
              "quiz": false
            }
          ]
        },
        {
          "id": "expert-voir-dire-torres-questions",
          "title": "Questions",
          "answers": [
            {
              "id": "expert-voir-dire-torres-q01",
              "indicator": "Q1",
              "answer": "You call shooting from the hip “very inaccurate”?",
              "explanation": "Source: (p. 149)"
            },
            {
              "id": "expert-voir-dire-torres-q02",
              "indicator": "Q2",
              "answer": "You assume Sarah knew how to shoot properly?",
              "explanation": "Source: (p. 149)"
            },
            {
              "id": "expert-voir-dire-torres-q03",
              "indicator": "Q3",
              "answer": "Because her father was an arms dealer?",
              "explanation": "Source: (p. 149)"
            },
            {
              "id": "expert-voir-dire-torres-q04",
              "indicator": "Q4",
              "answer": "What do you know about Sarah’s own gun training?",
              "explanation": "Source: (p. 149)"
            },
            {
              "id": "expert-voir-dire-torres-q05",
              "indicator": "Q5",
              "answer": "What training or experience backs your opinion about shooting from the hip?",
              "explanation": "Source: (pp. 149, 153–154)"
            },
            {
              "id": "expert-voir-dire-torres-q06",
              "indicator": "Q6",
              "answer": "How did you judge accuracy from that position?",
              "explanation": "Source: (p. 149)"
            },
            {
              "id": "expert-voir-dire-torres-q7-condition",
              "indicator": "Conditional Q7",
              "answer": "[Ask Q7 only if Torres identifies a method.]",
              "quiz": false
            },
            {
              "id": "expert-voir-dire-torres-q07",
              "indicator": "Q7",
              "answer": "How did you use that method in this case?",
              "explanation": "Source: (p. 149)"
            }
          ]
        },
        {
          "id": "expert-voir-dire-torres-argument-section",
          "title": "Argument",
          "answers": [
            {
              "id": "expert-voir-dire-torres-supported-grounds",
              "indicator": "Condition",
              "answer": "[Use only the grounds supported by the answers.]",
              "quiz": false
            },
            {
              "id": "expert-voir-dire-torres-argument",
              "indicator": "Court",
              "answer": "Your Honor, the State asks the Court to keep out these opinions under Rule 702. The answers do not show the needed expertise in shooting accuracy. The father’s job does not establish Sarah’s own skill under subsection (b). No reliable method or application has been shown under subsections (c) and (d).",
              "quiz": false
            },
            {
              "id": "expert-voir-dire-torres-ruling",
              "indicator": "Stage direction",
              "answer": "[Wait for the ruling. Direct resumes. Full cross comes after direct ends.]",
              "quiz": false
            }
          ]
        }
      ]
    }
  ]
};
