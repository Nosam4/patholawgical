// Short recall cues adapted from the professor's Writing Option 1 rubric.
// Rubric points are context, not the app's one-point-per-blank score.
const rubric = "Feedback & Rubric Writing Option 1(1).docx · Grading Rubric";
const assignment = "20260921_SalesWritingOption1_Answer.docx · Marla / Mars motor-home problem";
const row = (key, indicator, answer, ...acceptedAnswers) => ({ key, indicator, answer, acceptedAnswers });
const column = (key, title, ...answers) => ({ key, title, answers });

function drill(key, title, prompt, columns, notes = []) {
  const id = `sales-analysis-${key}`;
  return {
    id, title, prompt, type: "sporcle-grid", clueLayout: "above",
    courseSources: [rubric, assignment, ...notes],
    columns: columns.map(({ key: columnKey, title: columnTitle, answers }) => ({
      id: `${id}-${columnKey}`, title: columnTitle,
      answers: answers.map(({ key: rowKey, ...answer }) => ({ id: `${id}-${rowKey}`, ...answer })),
    })),
  };
}

export const salesAnalysisPatternsSubject = {
  id: "sales-analysis-patterns",
  title: "Analysis Patterns",
  questions: [
    drill("roadmap", "1. Start Here: The Seven Rubric Steps",
      "Memorize the order first. Type a short heading in each box; abbreviations such as PPT, BLT, and ERT work. Reveal, check, then try again from memory. This sequence is for Writing Option 1; use only relevant issues on other problems.", [
        column("scope", "First: Does the UCC Apply?",
          row("hybrid", "1 · Identify the mixed transaction · 9 rubric points", "Hybrid transaction", "hybrid", "hybrid analysis"),
          row("purpose", "2 · Examine the transaction as a whole · 10 points", "Predominant purpose test", "predominant purpose", "PPT"),
          row("gravamen", "3 · Examine the source of the complaint · 9 points", "Gravamen test", "gravamen", "gravamen of the action", "gravamen of the action test"),
          row("amendments", "4 · Apply the newer hybrid approach · 8 points", "2022 amendments test", "2022 amendments", "2022 amendment test", "amended 2-102")),
        column("classification", "Then: Which Article and What Consequence?",
          row("bright-line", "5 · Classify the purported lease under § 1-203 · 8 points", "Bright-line test", "BLT", "bright line", "lease vs sale", "sale vs lease", "1-203"),
          row("realities", "6 · Analyze return and remaining value · 8 points", "Economic realities test", "ERT", "economic realities"),
          row("bankruptcy", "7 · Answer Question Two under both classifications · 6 points", "Bankruptcy consequences", "bankruptcy", "title and bankruptcy", "ownership and bankruptcy")),
      ], ["Seven rubric sections total 58 points. Filled boxes measure recall, not the quality or likely grade of an essay.",
        "Complete the alternative analyses even if an earlier conclusion seems decisive. Argue both sides when the facts support both."]),

    drill("hybrid-purpose", "2. Hybrid and Predominant Purpose",
      "Recall the short phrase for each rubric item. After recalling it, explain the relevant fact aloud using ‘because.’ The numbers are the professor's available points.", [
        column("hybrid", "Hybrid Transaction · 9 Points",
          row("components", "5 points · Explain why the transaction may be mixed", "Identify goods and services", "goods and services", "identify the good and the service"),
          row("common-law", "1 point · Name the alternative law when services control under the traditional tests", "Common law", "common law applies"),
          row("custom", "3 points · Explain why customization might not create a hybrid", "Specially manufactured goods", "specially manufactured good", "custom-made goods", "custom made good")),
        column("purpose", "Predominant Purpose · 10 Points",
          row("test", "3 points · Name the test and ask what dominates the whole transaction", "Goods or services predominate", "goods or services", "predominant purpose test", "predominant purpose", "PPT"),
          row("goods", "3 points · Explain the argument based on a usable, mobile home", "Goods argument", "goods predominate", "goods contract", "analyze goods"),
          row("services", "3 points · Explain the argument based on design expertise and the higher price", "Services argument", "services predominate", "service contract", "analyze services"),
          row("conclusion", "1 point · Weigh the competing arguments and select the governing law", "Reasoned conclusion", "conclusion", "conclude")),
      ], ["Hybrid: explain movability (2 points) and identify the design services (3 points). Section 2-105 includes specially manufactured goods, so custom design may simply be part of producing the good.",
        "Traditional predominant purpose: Article 2 governs the whole transaction if goods predominate; common law governs if services predominate. Traditional gravamen: common law governs a claim arising from services.",
        "Goods argument: travel and living require the finished motor home. Services argument: special doors, ramp, fence, and revised specifications explain the premium price."]),

    drill("gravamen-amendments", "3. Gravamen and the 2022 Amendments",
      "Memorize both sides of each test. An uncertain defect calls for identifying missing facts and explaining alternative results.", [
        column("gravamen", "Gravamen · 9 Points",
          row("source", "3 points · Name the test and identify what caused the particular complaint", "Source of the problem", "source of complaint", "source of the complaint", "gravamen test", "gravamen of the action test"),
          row("missing", "2 points · Identify what you need to determine the cause", "Missing facts", "other facts needed", "additional facts", "defective materials or faulty installation", "materials installation or design"),
          row("pipes", "2 points · Explain the goods-side characterization of the plumbing failure", "Defective goods", "defective pipes", "goods argument", "goods"),
          row("design", "2 points · Explain the services-side characterization of the custom features", "Faulty design services", "design services", "services argument", "services", "faulty design")),
        column("amendments", "2022 Amendments · 8 Points",
          row("branches", "3 points · Name the amended test and explain its structure", "Both predominance branches", "both branches", "goods predominate or do not predominate", "2022 amendments test", "2022 amendments"),
          row("whole", "2 points · Apply the branch in which goods predominate: Article 2 reaches…", "The whole transaction", "whole transaction", "entire transaction", "the transaction"),
          row("part", "2 points · Apply the branch in which goods do not predominate: Article 2 reaches…", "The goods aspects", "goods aspects", "goods portion", "goods part"),
          row("conclusion", "1 point · Choose a result supported by the facts", "Reasoned conclusion", "conclusion", "conclude")),
      ], ["The rubric mentions fence and doggie-door problems; the problem itself reports door and ramp failures. Discuss the stated defects and do not invent a fence failure.",
        "Ask whether defective components, faulty installation, or unsuitable design caused each failure. The problem suggests installation trouble but does not conclusively establish the cause.",
        "2022 amended § 2-102: when goods predominate, other law may still appropriately apply to nongoods aspects. Otherwise, only Article 2 provisions primarily concerning goods aspects apply. This is the assigned amended approach, not a claim about adoption in every state.",
        "Amended statutory text: https://nebraskalegislature.gov/laws/ucc.php?code=2-102"]),

    drill("lease-sale", "4. Bright Line and Economic Realities",
      "Learn the two inquiries separately. First analyze § 1-203; then give the professor's alternative economic-realities analysis. Value remaining does not by itself establish likely return.", [
        column("bright-line", "Lease vs. Sale · 8 Points",
          row("termination", "4 points · Does paying the cancellation fee actually end the payment obligation?", "Genuine right to terminate", "right to terminate", "nonterminability", "cancellation clause", "termination clause", "noncancelable obligation"),
          row("option", "3 points · Is the option price merely discounted, or legally nominal?", "Nominal purchase option", "nominal consideration", "nominality", "purchase option", "option to buy"),
          row("bright-conclusion", "1 point · Apply nonterminability plus the relevant option condition", "Bright-line conclusion", "conclusion", "conclude")),
        column("realities", "Economic Realities · 8 Points",
          row("test", "2 points · Name the test and state its two questions", "Likely return and meaningful value", "return and value", "reasonable likelihood of return and meaningful value", "economic realities test", "ERT"),
          row("return", "3 points · Explain how the purchase option affects whether Mars gets the home back", "Likelihood of return", "likely return", "reasonable likelihood of return", "return"),
          row("value", "2 points · Explain both the projected $75,000 value and remaining useful life", "Meaningful remaining value", "meaningful value", "residual value", "remaining value"),
          row("realities-conclusion", "1 point · Classify as a true lease or disguised sale and identify the article", "Economic-realities conclusion", "conclusion", "conclude")),
      ], ["Cancellation: a $10,000 fee does not necessarily release Marla; remaining payments are still owed if Mars cannot re-lease the home. Discuss the practical effect, not just the clause's label.",
        "Option: $40,000 is approximately 53% of $75,000, not less than half as the rubric says. The $35,000 discount encourages purchase, but a discount alone does not prove nominality; consider the reasonably predictable cost of declining the option.",
        "Return: the favorable option encourages retention, while the substantial payment and anticipated financing difficulties support possible return. Remaining value: $75,000 and more than ten years of useful life.",
        "Under the rubric's economic-realities formulation, likely return plus meaningful value supports Article 2A; otherwise Article 2. A security interest established by the bright-line rule is not undone by the alternative analysis.",
        "UCC § 1-203(b), (d), (e): https://www.law.cornell.edu/ucc/1/1-203"]),

    drill("bankruptcy", "5. Bankruptcy: Explain Both Results",
      "Recall who owns the home under each classification. Then explain what that ownership means for the trustee and Mars, even if you already chose a classification.", [
        column("consequences", "Question Two · 6 Points",
          row("sale", "3 points · Sale: buyer has title; the trustee can administer the home for creditors, subject to secured rights", "Buyer owns; estate includes the home", "buyer owns", "buyer has title", "home enters the bankruptcy estate", "property of the estate"),
          row("lease", "3 points · True lease: Mars retains title; address return or value under the assignment and Mars's claim for unpaid amounts", "Lessor owns; may claim unpaid amounts", "lessor owns", "lessor retains title", "Mars owns", "lessor owns and can file as creditor")),
      ], ["Sale: Article 9 perfection concerns secured-creditor priority; it does not mean the debtor's property is excluded from the estate.",
        "True lease: the assignment describes return of the home or its value and a possible creditor claim. Do not say bankruptcy has no authority: the debtor's leasehold rights may enter the estate and unexpired leases are subject to bankruptcy procedures.",
        "11 U.S.C. §§ 541 and 365: https://www.law.cornell.edu/uscode/text/11/541 ; https://www.law.cornell.edu/uscode/text/11/365"]),

    drill("fact-to-test", "6. Optional: Turn a Fact into Analysis",
      "Use this after the rubric order feels familiar. Recall the five moves, then say one sentence: ‘Because [fact], [inference], which supports or weakens [test element].’", [
        column("sequence", "Repeat for Each Contested Issue",
          row("fact", "1 · Select a concrete detail from the problem", "Specific fact", "fact", "relevant fact"),
          row("why", "2 · Explain what that detail suggests", "Why it matters", "why", "explain why", "inference", "significance"),
          row("test", "3 · Identify the legal element it supports or weakens", "Connect to the test", "test", "legal test", "connection to the test", "link to the rule"),
          row("counter", "4 · Address a supported alternative interpretation", "Competing inference", "counterargument", "other side", "competing argument"),
          row("conclusion", "5 · Weigh the arguments and choose an outcome", "Reasoned conclusion", "conclusion", "conclude")),
      ], ["Supplemental practice pattern from the supplied analysis feedback; these five moves are not additional rubric points.",
        "Example: buying for $40,000 when the home is expected to be worth $75,000 provides a $35,000 incentive to buy, weakening the likelihood of return. But anticipated financing difficulties support the competing inference that Marla may return it."]),
  ],
};
