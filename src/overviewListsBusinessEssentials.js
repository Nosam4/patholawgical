// A compact list of the two cumulative distribution tests, rather than a
// separate drill for every rule governing corporate dividends.
// Verified against the 2026 statute on October 24, 2026.
export const overviewListsBusinessEssentialsQuestions = [
  {
    id: "fl-lists-corporate-distribution-solvency",
    subjectId: "florida-business-entities",
    type: "sporcle-grid",
    recallMode: "list",
    answerMatching: "column",
    answerLayout: "stacked",
    title: "Corporate Distributions: Two Solvency Tests",
    prompt: "Recall the two cumulative solvency tests applied after giving effect to a corporate distribution under section 607.06401(3).",
    sourceUrl: "https://www.leg.state.fl.us/Statutes/index.cfm?App_mode=Display_Statute&URL=0600-0699/0607/Sections/0607.06401.html",
    sourceLabel: "2026 Florida Statutes § 607.06401(3)(a)–(b)",
    courseSources: [
      "01 Blank Corporations FL Presentation.pdf — PDF pp. 21, 30.",
      "01 Blank Corporations FL Outline.pdf — PDF pp. 4–6.",
      "FL.Geis.Corporations.pdf — PDF pp. 19–20, 28.",
      "Speechify/FL.Geis.Corporations.Speechify.txt — Distributions, lines 395–409.",
      "Official reference: 2026 Florida Statutes § 607.06401(3), with measurement and scope provisions in subsections (6), (8), and (9). Verified October 24, 2026.",
    ],
    listExplanation: "Both tests must remain satisfied after giving effect to the distribution; failure of either prohibits it. The articles-of-incorporation qualification concerns the additional amount for superior preferential dissolution rights, rather than permission to ignore debts or total liabilities. This list covers subsection (3)'s solvency limits; the section's measurement and indebtedness rules still apply. Section 607.06401 does not apply to distributions in liquidation under sections 607.1401–607.14401.",
    columns: [
      {
        id: "fl-lists-corporate-distribution-solvency-items",
        title: "Solvency Tests",
        answers: [
          {
            id: "fl-lists-corporate-distribution-debt-payment",
            answer: "Ability to pay debts as they become due in the usual course of corporate activities and affairs",
            acceptedAnswers: [
              "equity insolvency test",
              "equitable insolvency test",
              "equity solvency test",
              "cash flow test",
              "ability to pay debts as they become due",
              "ability to pay debts",
              "debt payment test",
            ],
            explanation: "The corporation must remain able to pay its debts when due after the distribution's effect is taken into account.",
          },
          {
            id: "fl-lists-corporate-distribution-balance-sheet",
            answer: "Total assets cover total liabilities plus superior preferential dissolution rights, unless the articles permit otherwise as to those preferential rights",
            acceptedAnswers: [
              "balance sheet test",
              "balance sheet insolvency test",
              "balance sheet solvency test",
              "assets cover liabilities and superior dissolution preferences",
              "assets at least liabilities plus preferential dissolution rights",
              "assets cover liabilities plus liquidation preferences",
            ],
            explanation: "Assets must be at least total liabilities plus the amount needed, if dissolved and wound up at the time of the distribution, to satisfy shareholders with dissolution preferences superior to those receiving it. The articles may permit otherwise concerning that preferential-rights amount.",
          },
        ],
      },
    ],
  },
];
