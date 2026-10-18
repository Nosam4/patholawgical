import {
  floridaBusinessEntitiesUnincorporatedQuestions,
  floridaBusinessEntitiesUnincorporatedLevels,
} from "./floridaBusinessEntitiesUnincorporated.js";

// Original short-answer prompts. Course PDF pages refer to the PDF page counter,
// which differs from the printed pages assigned in the daily schedule.
const statute = (section) => `https://www.flsenate.gov/Laws/Statutes/2026/${section}`;

function column(id, title, rows) {
  return {
    id,
    title,
    answers: rows.map(([key, indicator, answer, ...extras]) => ({
      id: `fl-be-${id}-${key}`,
      indicator,
      answer,
      acceptedAnswers: extras.filter((value) => typeof value === "string"),
      ...(extras.find((value) => value && typeof value === "object") || {}),
    })),
  };
}

function drill(id, title, pages, prompt, columns, section, references, clarification) {
  const [slides, outline, geis] = pages;
  return {
    id: `fl-be-${id}`,
    type: "sporcle-grid",
    clueLayout: "above",
    answerLayout: "stacked",
    answerMatching: "active",
    title: `Corporations: ${title}`,
    prompt,
    sourceUrl: section.startsWith("https:") ? section : statute(section),
    sourceLabel: section.startsWith("https:") ? "Federal securities law — Rule 10b-5 and related authorities" : `Florida Statutes § ${section} and related provisions`,
    courseSources: [
      ...(slides ? [`01 Blank Corporations FL Presentation.pdf — PDF pp. ${slides}.`] : []),
      ...(outline ? [`01 Blank Corporations FL Outline.pdf — PDF pp. ${outline}.`] : []),
      ...(geis ? [`FL.Geis.Corporations.pdf — PDF pp. ${geis}.`] : []),
      section.startsWith("https:")
        ? `Official reference: ${references}. Checked October 16, 2026.`
        : `Official reference: Florida Statutes ${references}. Verified against the 2026 compilation.`,
      ...(clarification ? [`Source clarification: ${clarification}`] : []),
    ],
    columns,
  };
}

const corporations = [
  drill("corporate-identity", "Identity and Management", ["2, 17, 26", "1, 4, 6", "1, 16, 26"],
    "Identify the corporation's legal structure and the usual division of responsibility.", [
      column("identity", "The Corporate Structure", [
        ["separate", "A corporation has an existence distinct from its owners. What is it?", "Separate legal entity", "separate entity", "legal entity"],
        ["owners", "People who own the corporation through its shares", "Shareholders", "stockholders"],
        ["shield", "Owners generally avoid personal responsibility for corporate debts solely because they own stock. Name the protection.", "Limited liability"],
        ["continuity", "Default duration when the articles do not limit corporate existence", "Perpetual", "perpetual existence", "perpetuity"],
      ]),
      column("management", "Who Does What?", [
        ["board", "Body that directs corporate affairs under the usual statutory structure", "Board of directors", "board", "directors"],
        ["officers", "People appointed to carry out the corporation's daily operations", "Officers", "corporate officers"],
        ["elect", "Owners ordinarily exercise indirect control by electing these people", "Directors", "board of directors", "board"],
      ]),
    ], "607.0801", "§§ 607.0302, 607.0622, 607.0732, 607.0801, 607.08401",
    "A valid shareholder agreement under § 607.0732 can alter the usual board-management structure. Limited liability does not excuse an owner's own tort, guarantee, or conduct supporting veil piercing."),

  drill("formation", "Articles and Incorporation", ["3, 7–10", "1–2", "1–6"],
    "Recall the filing that creates the corporation and its required contents.", [
      column("formation", "Creating the Entity", [
        ["document", "Formation document delivered to the Department of State", "Articles of incorporation", "articles", "corporate charter"],
        ["actor", "Person who signs and delivers the formation document", "Incorporator"],
        ["number", "Minimum number of incorporators", "One", "1"],
        ["start", "Absent a specified effective date, corporate existence begins upon this event", "Filing", "filing the articles", "articles filed"],
      ]),
      column("articles", "Required Article Contents", [
        ["name", "The articles must identify the corporation by its corporate ____", "Name", "corporate name"],
        ["shares", "The articles state the number of shares the corporation is ____ to issue", "Authorized", "authorized shares"],
        ["agent", "The initial registered office and this service-of-process representative must be identified", "Registered agent"],
        ["office", "The articles must give the street address of the initial ____ office", "Principal", "principal office"],
      ]),
    ], "607.0202", "§§ 607.0201–607.0203, 607.0501",
    "Also include each incorporator's name and address, a different mailing address if applicable, and the registered agent's written acceptance. Initial directors are optional article contents; a delayed effective date can alter the filing default."),

  drill("governing-documents", "Articles, Bylaws, and Organization", ["8–9, 31", "2, 6–7", "5–6"],
    "Distinguish the public charter from internal operating rules.", [
      column("documents", "Governing Documents", [
        ["bylaws", "Internal rules for managing corporate business and affairs", "Bylaws", "by laws"],
        ["priority", "If bylaws conflict with the articles, which document controls?", "Articles of incorporation", "articles", "charter"],
        ["law", "Bylaws must also remain consistent with this superior source", "Law", "applicable law", "statutes"],
        ["filing", "Must the bylaws ordinarily be filed with the Department of State?", "No"],
      ]),
      column("organization", "Organizing the Corporation", [
        ["meeting", "Post-filing meeting to adopt bylaws, appoint officers, and complete organization", "Organizational meeting", "organization meeting"],
        ["elect", "If no initial directors are named, incorporators first elect this body", "Board of directors", "board", "directors"],
      ]),
    ], "607.0206", "§§ 607.0205–607.0206, 607.1020",
    "Shareholders may amend bylaws; directors generally may too unless the articles or a protected shareholder-adopted provision reserves or limits that power."),

  drill("preincorporation", "Promoters and Defective Formation", ["10, 16", "2, 4", "4–6"],
    "Separate a promoter's contract liability from the later corporation's adoption of the agreement.", [
      column("promoters", "Before Incorporation", [
        ["role", "Organizer who arranges financing or contracts before the corporation exists", "Promoter"],
        ["adoption", "A later corporation accepts a preincorporation contract through this act", "Adoption", "adopts the contract"],
        ["release", "Agreement substituting the corporation for the promoter and releasing the promoter", "Novation"],
        ["automatic", "Does corporate adoption alone automatically release the promoter?", "No"],
      ]),
      column("defects", "Formation Problems", [
        ["knowledge", "Statutory personal liability applies when one acts for a corporation ____ there was no incorporation", "Knowing", "with knowledge", "knowledge"],
        ["liability", "That liability under § 607.0204 is joint and ____", "Several", "joint and several"],
        ["estoppel", "Doctrine that can prevent a contracting outsider who treated a business as incorporated from denying its status", "Corporation by estoppel", "estoppel"],
      ]),
    ], "607.0204", "§§ 607.0203–607.0204, 607.1904",
    "The slides also teach de jure and de facto corporations. For statutory liability, test knowledge of nonincorporation rather than treating every filing mistake as automatic personal liability. Estoppel depends on the dealings; it does not create a corporation for all purposes."),

  drill("powers", "Corporate Powers and Ultra Vires", ["5–6", "1–2", "2–4"],
    "Recall the general rule and the limited proceedings that can challenge corporate power.", [
      column("powers", "Power to Act", [
        ["term", "Traditional label for an act outside corporate powers", "Ultra vires"],
        ["defense", "Can an ordinary contracting party generally avoid enforcement solely because the corporation lacked power?", "No"],
        ["owner", "An owner can seek to enjoin an unauthorized act in a suit against the corporation. Identify that owner.", "Shareholder", "stockholder"],
        ["internal", "The corporation can sue an incumbent or former director, officer, employee, or ____ over unauthorized conduct", "Agent"],
        ["state", "State agency that can seek dissolution or an injunction for unauthorized corporate business", "Department of Legal Affairs", "Attorney General", "AG", "Florida Attorney General"],
      ]),
    ], "607.0304", "§§ 607.0302, 607.0304",
    "The slide's 'No Ultra Vires Doctrine' means an ordinary transaction is generally not invalidated on that ground. Section 607.0304 preserves the listed shareholder, corporate, and Attorney General proceedings."),

  drill("annual-report", "Annual Reports", ["4", "1", "6"],
    "Supply the annual-report window and the actual consequences of failing to file.", [
      column("reports", "Reporting and Compliance", [
        ["recipient", "State department receiving the corporate annual report", "Department of State", "Florida Department of State"],
        ["opens", "Annual filing window opens on this date", "January 1", "Jan 1", "1/1"],
        ["due", "Annual filing window closes on this date", "May 1", "5/1"],
        ["first", "The first annual report is due in the calendar year ____ the formation year", "Following", "after", "next year"],
        ["suit", "Until filing and paying required fees, the corporation cannot prosecute or ____ an action", "Maintain", "maintain an action"],
        ["dissolve", "Failure to file can also lead to administrative ____", "Dissolution", "administrative dissolution"],
      ]),
    ], "607.1622", "§§ 607.1622, 607.1420–607.1422",
    "The slides say failure bars bringing or defending actions. Section 607.1622(6) bars prosecuting or maintaining an action until the report, fees, and penalties are supplied; it does not impose that defense bar."),

  drill("veil-piercing", "Limited Liability and Veil Piercing", ["11", "3", "24–26"],
    "Identify what is needed to disregard a corporation's separate existence under Florida law.", [
      column("veil", "Disregarding the Entity", [
        ["remedy", "Remedy that imposes an entity's obligation on an owner by disregarding its separateness", "Piercing the corporate veil", "veil piercing", "pierce the corporate veil"],
        ["control", "Control must be so complete that the corporation lacks an independent ____", "Existence", "independent existence"],
        ["misuse", "Beyond domination, the corporation must have been used for a fraudulent or ____ purpose", "Improper", "improper purpose", "illegal"],
        ["cause", "The improper use must have caused the claimant's ____", "Injury", "harm", "loss"],
        ["capital", "Is inadequate capitalization alone automatically enough to pierce the veil?", "No"],
        ["parent", "Is a parent automatically liable merely because it owns all subsidiary shares?", "No"],
      ]),
    ], "607.0622", "§ 607.0622(2); Dania Jai-Alai Palace, Inc. v. Sykes, 450 So. 2d 1114 (Fla. 1984); Segal v. Forastero, Inc. (Fla. 3d DCA June 2, 2021)",
    "Commingling, thin capitalization, and disregarded formalities can be evidence, but domination alone does not replace improper use and resulting injury. See Segal: https://flcourts-media.flcourts.gov/content/download/745970/opinion/210089_DC13_06022021_102345_i.pdf"),

  drill("financing", "Subscriptions and Share Issuance", ["12, 14", "3", "7–11"],
    "Recall Florida's subscription and consideration rules.", [
      column("subscriptions", "Stock Subscriptions", [
        ["contract", "Contract promising to buy a stated number of shares at a stated price", "Subscription agreement", "subscription", "stock subscription"],
        ["form", "To enforce it against a subscriber, the agreement must be written and ____ by that subscriber", "Signed", "signed by subscriber"],
        ["period", "Default irrevocability period for a preincorporation subscription", "6 months", "6", "six months"],
        ["consent", "All ____ can agree to revoke it during that period", "Subscribers", "the subscribers"],
      ]),
      column("consideration", "Issuing Shares", [
        ["board", "Body ordinarily deciding whether share consideration is adequate", "Board of directors", "board", "directors"],
        ["future", "Promises to perform future services qualify when evidenced by a ____ contract", "Written", "written contract"],
        ["paid", "Once the authorized consideration is received, shares are fully paid and ____", "Nonassessable", "non assessable"],
      ]),
    ], "607.0620", "§§ 607.0620–607.0622",
    "A subscription may specify a longer or shorter irrevocability period. Florida permits cash, property, promissory notes, performed services, and properly documented future services; a promise may count as received under § 607.0621(4)."),

  drill("share-rights", "Classes, Preferences, and Preemptive Rights", ["12–15, 19", "3–4", "7–11, 18–19"],
    "Distinguish economic preferences from voting rights and protection against dilution.", [
      column("stock", "Share Rights", [
        ["authorized", "Document fixing authorized share classes and their rights", "Articles of incorporation", "articles", "charter"],
        ["voting", "The authorized classes together must provide ____ voting rights", "Unlimited", "unlimited voting rights"],
        ["assets", "The classes together must carry a right to net assets on ____", "Dissolution", "liquidation"],
        ["preferred", "Stock with a distribution preference over common shares", "Preferred stock", "preferred shares", "preferred"],
      ]),
      column("dilution", "Protecting an Ownership Position", [
        ["right", "Right to buy a proportional part of a new issue to preserve ownership percentage", "Preemptive right", "preemptive rights", "pre emptive rights"],
        ["optin", "For a newly formed Florida corporation, preemptive rights must be supplied in this document", "Articles of incorporation", "articles", "charter"],
        ["cumulative", "Optional director-election method allowing concentration of shares × open seats on one candidate", "Cumulative voting", "cumulative"],
      ]),
    ], "607.0601", "§§ 607.0601–607.0602, 607.0630, 607.0728",
    "The slide's 'at least one class with limited rights' is misleading: § 607.0601(2) requires classes collectively providing unlimited voting and net-asset rights. Preferred stock need not be nonvoting. Cumulative voting also requires authorization in the articles. Preemptive rights have statutory exceptions, including preserved rights of certain pre-1976 corporations under § 607.0630(4)."),

  drill("shareholder-meetings", "Shareholder Meeting Numbers", ["18", "4", "16–18"],
    "Use the statutory defaults. A different authorized provision or statutory exception may change a default.", [
      column("sh-meetings", "Notice and Eligibility", [
        ["minimum", "Minimum ordinary notice before an annual or special meeting", "10 days", "10", "ten days"],
        ["maximum", "Maximum ordinary notice before that meeting", "60 days", "60", "sixty days"],
        ["record", "Maximum lead time for the shareholder record date", "70 days", "70", "seventy days"],
        ["proxy", "Default duration of a revocable proxy appointment stating no term", "11 months", "11", "eleven months"],
      ]),
      column("sh-participation", "Participation", [
        ["quorum", "Default quorum is what fraction of votes entitled to be cast by the voting group?", "Majority", "more than half", "a majority"],
        ["proxy", "Name the appointment allowing someone else to vote the shares", "Proxy", "proxy appointment"],
        ["remote", "The board may authorize participation through remote ____", "Communication", "communications", "remote communication"],
      ]),
    ], "607.0705", "§§ 607.0705, 607.0707, 607.0709, 607.0722, 607.0725",
    "A proxy may state its own term; § 607.0722 also recognizes electronic appointments and special rules for irrevocable proxies coupled with an interest. Quorum is measured by voting power, not headcount."),

  drill("shareholder-voting", "Quorum, Approval, and Director Elections", ["18–20", "4", "17–19"],
    "Assume a quorum, ordinary statutory defaults, and no greater voting requirement unless the clue says otherwise.", [
      column("sh-votes", "Different Voting Tests", [
        ["ordinary", "For ordinary action, votes favoring the action must ____ votes opposing it", "Exceed", "outnumber", "be greater than"],
        ["abstain", "Does an abstention count as a vote against under that ordinary test?", "No"],
        ["election", "Default method for electing directors: the candidates with the most votes win", "Plurality", "plurality voting"],
        ["cumulative", "Cumulative voting is available only when authorized in the ____", "Articles of incorporation", "articles", "charter"],
        ["example", "100 voting shares and 3 seats: total votes available under cumulative voting", "300", "300 votes", "three hundred"],
        ["merger", "Default merger approval requires a ____ of all votes entitled to be cast by each voting group", "Majority", "a majority", "more than half"],
      ]),
    ], "607.0725", "§§ 607.0725, 607.0728, 607.1003, 607.1103",
    "The slide's single majority-of-outstanding rule for all fundamental changes is overbroad. The action-specific statute controls; an ordinary article amendment generally uses a majority-share quorum and favor-over-against approval, while mergers generally require a majority of votes entitled."),

  drill("distributions", "Dividends and Solvency", ["21, 30", "4–6", "19–20, 28"],
    "Recall the board's distribution decision and both solvency limits.", [
      column("distributions", "Paying Shareholders", [
        ["declare", "Body ordinarily authorizing dividends", "Board of directors", "board", "directors"],
        ["equity", "The corporation must remain able to pay debts as they become ____", "Due", "due in the usual course of business"],
        ["assets", "Assets must at least cover liabilities plus superior dissolution ____ (unless the articles permit otherwise)", "Preferences", "preferential rights", "liquidation preferences"],
        ["both", "Must a distribution satisfy both the debt-payment and balance-sheet limits?", "Yes"],
        ["liability", "A director's liability for an unlawful distribution additionally requires violation of the statutory standard of ____", "Conduct", "standard of conduct"],
      ]),
    ], "607.06401", "§§ 607.06401, 607.0830, 607.0834",
    "A director is not automatically liable merely for voting for a distribution later found improper. Section 607.0834 ties liability to a violation of the applicable conduct standard and limits recovery to the unlawful excess."),

  drill("inspection", "Shareholder Inspection", ["22–23", "5", "20–21"],
    "Separate basic corporate records from records requiring a purpose-based showing.", [
      column("inspection", "Inspection Requirements", [
        ["notice", "Advance written notice for ordinary inspection under § 607.1602", "5 business days", "five business days", "5 business", "five business"],
        ["basic", "Articles and bylaws belong to the basic-record category: is a proper-purpose showing ordinarily required?", "No"],
        ["faith", "Inspection of qualifying additional records must be demanded in good ____", "Faith", "good faith"],
        ["purpose", "The additional-record demand must have a ____ purpose", "Proper", "proper purpose"],
        ["detail", "Purpose and records must be described with reasonable ____", "Particularity", "specificity"],
        ["connection", "Requested additional records must be directly ____ to that purpose", "Connected", "connected to the purpose", "related"],
      ]),
    ], "607.1602", "§§ 607.1601–607.1604",
    "The slides' basic-record 'absolute right' remains subject to statutory conditions, including notice, business hours, and scope. Additional-record inspection can include board excerpts, accounting records, and the shareholder record, and can carry reasonable disclosure, use, and confidentiality restrictions under § 607.1602(4)."),

  drill("shareholder-litigation", "Direct and Derivative Actions", ["24–25", "5", "22–24"],
    "Identify who suffered the legally relevant injury and who receives the recovery.", [
      column("claims", "Whose Claim?", [
        ["direct", "An owner sues for infringement of her individual voting right. Type of action?", "Direct action", "direct", "direct suit"],
        ["derivative", "An owner sues on behalf of the corporation for a director's diversion of corporate money. Type of action?", "Derivative action", "derivative", "derivative suit"],
        ["recovery", "Ordinary recipient of recovery on a derivative claim", "Corporation", "the corporation", "company"],
        ["time", "Ordinary standing requires ownership when the challenged act or ____ occurred", "Omission"],
        ["successor", "A qualifying successor can obtain those shares by operation of ____", "Law", "operation of law"],
        ["commence", "Must the plaintiff also be a shareholder when the derivative action begins?", "Yes"],
      ]),
    ], "607.0741", "§§ 607.0741–607.0746, 607.0750",
    "A direct plaintiff must establish an actual or threatened injury that is not solely the result of corporate injury, subject to § 607.0750. Section 607.0741 permits qualifying successor status through transfer OR operation of law from a shareholder at the time of the conduct. The derivative recovery ordinarily belongs to the corporation; court-awarded expenses are separate."),

  drill("derivative-procedure", "Derivative Demand and Dismissal", ["24–25", "5", "23–24"],
    "Apply Florida's particularized pleading rules instead of treating every derivative suit as requiring an unexcused demand.", [
      column("derivative", "Demand and Court Control", [
        ["verified", "The derivative complaint must be ____ as well as particularized", "Verified", "verification"],
        ["demand", "The complaint identifies any request that the board take the desired action: a ____", "Demand", "board demand"],
        ["wait", "Period referenced by § 607.0742 for the board's response after demand", "90 days", "90", "ninety days"],
        ["excuse", "If no demand was made, the complaint must particularly allege the ____", "Reasons", "reason", "reasons for not making demand", "demand excuse"],
        ["goodfaith", "Dismissal on the corporation's motion requires a determination made in good ____ after reasonable inquiry", "Faith", "good faith"],
        ["settlement", "Whose approval is required to discontinue or settle the proceeding?", "Court", "the court", "court approval"],
      ]),
    ], "607.0742", "§§ 607.0742–607.0745",
    "Section 607.0742 allows particularized reasons for not making demand; it also addresses refusal/rejection/inaction and injury from waiting. The slides omit that qualification. Dismissal requires the statutory independent decision-making process, reasonable inquiry, and a best-interests determination, not simply a board veto."),

  drill("board-structure", "Directors and Officers", ["26–27", "6", "26–28, 32–34"],
    "Recall the ordinary structure of a Florida business corporation.", [
      column("board-structure", "Board Composition", [
        ["minimum", "Minimum number of directors of a chapter 607 business corporation", "One", "1", "one director"],
        ["fixed", "Director number is specified or fixed according to the articles or ____", "Bylaws", "by laws"],
        ["elect", "Who ordinarily elects the directors?", "Shareholders", "stockholders", "owners"],
        ["compensation", "Unless the articles or bylaws provide otherwise, who fixes director compensation?", "Board of directors", "board", "directors"],
        ["officers", "Who typically manages daily business under authority delegated by the board?", "Officers", "corporate officers"],
        ["nonprofit", "Minimum directors for a chapter 617 nonprofit corporation", "Three", "3", "three directors"],
      ]),
    ], "607.0803", "§§ 607.0801, 607.0803, 607.08101, 607.08401; § 617.0803",
    "The slide's 'any number' does not authorize zero directors under the ordinary chapter 607 structure. A qualifying § 607.0732 shareholder agreement may eliminate the board or restrict its powers."),

  drill("board-action", "Director Meetings and Votes", ["28–29", "6", "26–28"],
    "Use statutory defaults unless the articles or bylaws validly provide otherwise.", [
      column("board-meetings", "Meeting Procedure", [
        ["regular", "Must ordinary regular board meetings have advance notice?", "No"],
        ["special", "Default minimum notice for a special board meeting", "2 days", "2", "two days"],
        ["remote", "Remote participation ordinarily requires all participating directors to hear each other ____", "Simultaneously", "at the same time"],
        ["outside", "Must a Florida corporation hold its board meetings in Florida?", "No"],
      ]),
      column("board-votes", "Quorum and Action", [
        ["quorum", "Default quorum: what fraction of the fixed board, counting vacancies?", "Majority", "a majority", "more than half"],
        ["floor", "Lowest permitted board-quorum fraction", "One third", "1/3", "one-third"],
        ["approval", "With a quorum present, ordinary action requires a majority of directors ____", "Present", "present at the meeting"],
        ["consent", "Default action without a meeting requires written consent from ____ directors", "All", "every", "all directors", "unanimous"],
      ]),
    ], "607.0824", "§§ 607.0820–607.0824",
    "Written consents must describe the action, be signed, and be delivered to the corporation. Board quorum and shareholder quorum use different denominators. A higher authorized voting requirement can change the ordinary approval rule."),

  drill("director-duties", "Care, Loyalty, and Business Judgment", ["30", "6", "29–31"],
    "Distinguish the director's conduct duties from protection against hindsight review of a sound decision process.", [
      column("duties", "Fiduciary Standards", [
        ["care", "Duty to become appropriately informed and attend to decisions and oversight", "Duty of care", "care"],
        ["loyalty", "Duty implicated when a director puts personal interests ahead of corporate interests", "Duty of loyalty", "loyalty"],
        ["faith", "Directors must act in good ____", "Faith", "good faith"],
        ["interests", "A director must reasonably believe the action serves the corporation's best ____", "Interests", "interest"],
        ["judgment", "Doctrine protecting qualifying informed, good-faith decisions from hindsight second-guessing", "Business judgment rule", "business judgment", "BJR"],
        ["reliance", "Can a director rely on an expert report when the director knows facts making reliance unwarranted?", "No"],
      ]),
    ], "607.0830", "§§ 607.0830–607.0832",
    "A poor business result alone does not establish liability. The care standard for becoming informed and oversight is the care an ordinarily prudent person in a like position reasonably believes appropriate; monetary liability has additional requirements under § 607.0831."),

  drill("director-conflicts", "Conflicts and Corporate Opportunities", ["30", "6", "30–31"],
    "Recall the conflict analysis without treating approval as blanket immunity.", [
      column("conflicts", "Conflicting Interests", [
        ["self", "Director dealing with the corporation for a personal financial benefit: common label", "Self-dealing", "self dealing"],
        ["disclosure", "Approval analysis requires disclosure of all material ____ about the conflict and transaction", "Facts", "material facts"],
        ["fair", "A conflicting-interest transaction can survive review if it is ____ to the corporation", "Fair", "fair to the corporation"],
        ["burden", "Statutorily compliant disinterested approval can shift the burden of proving ____", "Unfairness", "lack of fairness", "not fair"],
        ["opportunity", "Doctrine implicated by taking a business prospect that belongs to the corporation", "Corporate opportunity", "corporate opportunity doctrine", "usurpation of corporate opportunity"],
        ["offer", "Ordinary course approach: first disclose and offer the opportunity to the ____", "Corporation", "company", "board"],
      ]),
    ], "607.0832", "§§ 607.0831–607.0832; corporate-opportunity doctrine (Geis PDF p. 31)",
    "Section 607.0832 distinguishes the validity of a transaction from the burden of proving fairness. Approval must satisfy its qualified-director or disinterested-shareholder vote and disclosure conditions. For a corporate opportunity, consider the corporation's interest or expectancy and line of business; do not assume every outside venture is forbidden."),

  drill("indemnification", "Indemnification and Expense Advances", ["30", "6", "31–32"],
    "Distinguish paying a qualifying final obligation from advancing defense expenses before entitlement is settled.", [
      column("indemnity", "Indemnification", [
        ["success", "Under the statutory default, a director wholly successful in defending a covered proceeding has ____ indemnification for reasonable expenses", "Mandatory", "required"],
        ["faith", "Permissive indemnification ordinarily requires good ____", "Faith", "good faith"],
        ["criminal", "In a criminal proceeding, the director must have no reasonable cause to believe the conduct was ____", "Unlawful", "illegal"],
      ]),
      column("advances", "Advancement and Insurance", [
        ["undertaking", "Before an expense advance, the director supplies a signed written ____ to repay if required", "Undertaking", "repayment undertaking", "promise"],
        ["secured", "Must that general repayment obligation be secured?", "No"],
        ["insurance", "Corporation may purchase this protection even for some liabilities it could not indemnify", "Insurance", "liability insurance", "D&O insurance", "directors and officers insurance"],
      ]),
    ], "607.0852", "§§ 607.0851–607.0853, 607.0857–607.0859",
    "Indemnification is not automatic merely because a director acted in good faith: the applicable proceeding, statutory restrictions, authorization, and any final adjudication matter. Section 607.0858 permits prospective articles limitations on rights. Advancement is distinct and uses the required repayment undertaking."),

  drill("fundamental-changes", "Amendments, Mergers, and Appraisal", ["20, 31", "4, 7", "5, 34–37"],
    "Identify the action and its specific approval or dissent procedure.", [
      column("changes", "Major Changes", [
        ["amend", "Changing the charter ordinarily requires a board proposal followed by a vote of the ____", "Shareholders", "stockholders"],
        ["minor", "Can specified minor or historical article amendments be made by the board alone?", "Yes"],
        ["merger", "Combination in which one surviving entity succeeds to the disappearing entity's property and obligations", "Merger"],
        ["ordinary", "Does every disposition of assets in the usual and regular course require shareholder approval?", "No"],
        ["appraisal", "Statutory remedy allowing an eligible dissenting shareholder to demand payment of fair value", "Appraisal rights", "appraisal", "appraisal remedy"],
        ["vote", "To preserve appraisal, the shareholder generally must avoid voting ____ the action", "For", "in favor of", "in favour of"],
      ]),
    ], "607.1003", "§§ 607.1002–607.1003, 607.1103, 607.1106, 607.1201–607.1202, 607.1302, 607.1321",
    "Apply each action's voting provision. Appraisal is available only for qualifying actions/shareholders and requires timely notice of intent and other perfection steps; dissent alone is insufficient. Market and other statutory exceptions may apply."),

  drill("dissolution", "Dissolution and Winding Up", ["32", "7", "38–39"],
    "Separate the grounds for dissolution from the work needed to close the business.", [
      column("ending-corp", "Closing the Corporation", [
        ["voluntary", "Ordinary voluntary dissolution after shares have been issued uses a board proposal and approval by these owners", "Shareholders", "stockholders"],
        ["admin", "Dissolution by the Department for a qualifying filing or compliance failure", "Administrative dissolution", "administrative"],
        ["court", "Dissolution ordered by a court on statutory grounds", "Judicial dissolution", "judicial", "court ordered dissolution"],
        ["wind", "After dissolution, the corporation continues for this closing process", "Winding up", "wind up"],
        ["creditors", "Claims of these people must be discharged or provided for before distributing remaining assets to owners", "Creditors", "corporate creditors"],
        ["new", "Does dissolution authorize starting unrelated new business?", "No"],
      ]),
    ], "607.1405", "§§ 607.1402, 607.1405, 607.1420–607.1422, 607.1430",
    "Judicial dissolution has specific grounds. Director deadlock includes inability of shareholders to break it and threatened/suffered irreparable injury or inability to conduct business advantageously because of the deadlock. Shareholder deadlock with failed successor elections is a separate ground. Section 607.1430 excludes qualifying public/large corporations from these shareholder grounds and recognizes timely implemented deadlock-sale agreements."),

  drill("federal-securities", "Federal Securities Claims", [null, null, "12–15"],
    "Keep a private securities-fraud claim separate from the statutory short-swing-profit remedy. These are federal supplements from the assigned Geis chapters.", [
      column("securities-fraud", "Private Rule 10b-5 Claim", [
        ["rule", "Federal antifraud rule concerning deceptive conduct in connection with buying or selling securities", "Rule 10b-5", "10b5", "10b-5", "rule 10b5"],
        ["material", "A misrepresentation or actionable omission must concern a ____ fact", "Material", "material fact"],
        ["state", "Name for the required culpable state of mind", "Scienter"],
        ["reliance", "Connection between the deception and the investor's decision to transact", "Reliance", "transaction causation"],
        ["loss", "The fraud must cause economic loss: loss ____", "Causation", "loss causation"],
      ]),
      column("short-swing", "Section 16(b)", [
        ["period", "Matched covered purchases and sales must occur within a period of less than how many months?", "6 months", "6", "six months"],
        ["owner", "Covered beneficial owner's ownership must be more than this percentage", "10 percent", "10%", "10", "ten percent"],
        ["roles", "Besides covered beneficial owners, the statute covers officers and these board members", "Directors", "director"],
        ["recipient", "Short-swing profits are recoverable by this issuer", "Corporation", "issuer", "the corporation", "company"],
        ["intent", "Must the issuer prove fraudulent intent to recover covered short-swing profits?", "No"],
      ]),
    ], "https://www.law.cornell.edu/cfr/text/17/240.10b-5",
    "17 C.F.R. § 240.10b-5; Halliburton Co. v. Erica P. John Fund, Inc., 573 U.S. 258, 267 (2014), https://www.govinfo.gov/content/pkg/USREPORTS-573/pdf/USREPORTS-573-258.pdf; 15 U.S.C. § 78p(a)–(b), https://www.law.cornell.edu/uscode/text/15/78p",
    "The private fraud claim also requires a purchase/sale connection and economic loss; a mere price decline is insufficient. Section 16(b) concerns covered registered equity securities and has exemptions. A more-than-10% beneficial owner must have that status at both purchase and sale. Do not use the handout's simplified issuer-registration thresholds as a complete current test."),

  drill("special-corporations", "Foreign and Special Corporation Forms", ["2, 27", "1, 6", "39–42"],
    "Distinguish tax elections and special purposes from the ordinary corporation's formation and liability rules.", [
      column("special-corps", "Special Forms", [
        ["foreign", "Corporation formed under another jurisdiction's law", "Foreign corporation", "foreign"],
        ["authority", "Ordinary authorization needed for a foreign corporation to transact business in Florida", "Certificate of authority"],
        ["defend", "May a foreign corporation defend an action despite lacking a required Florida certificate?", "Yes"],
        ["tax", "Federal election that generally passes corporate income and losses through to shareholders", "S corporation", "S corporation election", "S corp", "subchapter S"],
        ["malpractice", "Does a professional entity shield a professional from her own malpractice liability?", "No"],
        ["benefit", "Corporation form required to pursue general public benefit under chapter 607 part III", "Benefit corporation", "benefit corp"],
        ["nonprofit", "May a nonprofit pay reasonable compensation for services despite the general ban on profit distributions?", "Yes"],
      ]),
    ], "607.1502", "§§ 607.1501–607.1502, 607.602–607.606, 617.0505, 621.07; IRS S corporations, https://www.irs.gov/businesses/small-businesses-self-employed/s-corporations",
    "Foreign qualification has statutory exclusions such as holding internal meetings and interstate commerce. An S election is federal tax treatment, with eligibility requirements and some entity-level exceptions. A professional remains liable for her own misconduct and that of persons under her direct supervision/control. Nonprofit compensation and distributions must fit chapter 617's conditions."),
];

export const floridaBusinessEntitiesQuestions = [
  ...corporations,
  ...floridaBusinessEntitiesUnincorporatedQuestions,
];

export const floridaBusinessEntitiesLevels = Object.freeze({
  "fl-be-corporate-identity": "core",
  "fl-be-formation": "core",
  "fl-be-governing-documents": "core",
  "fl-be-preincorporation": "core",
  "fl-be-powers": "standard",
  "fl-be-annual-report": "standard",
  "fl-be-veil-piercing": "standard",
  "fl-be-financing": "core",
  "fl-be-share-rights": "core",
  "fl-be-shareholder-meetings": "standard",
  "fl-be-shareholder-voting": "core",
  "fl-be-distributions": "core",
  "fl-be-inspection": "standard",
  "fl-be-shareholder-litigation": "core",
  "fl-be-derivative-procedure": "comprehensive",
  "fl-be-board-structure": "core",
  "fl-be-board-action": "standard",
  "fl-be-director-duties": "core",
  "fl-be-director-conflicts": "standard",
  "fl-be-indemnification": "comprehensive",
  "fl-be-fundamental-changes": "standard",
  "fl-be-dissolution": "standard",
  "fl-be-federal-securities": "comprehensive",
  "fl-be-special-corporations": "comprehensive",
  ...floridaBusinessEntitiesUnincorporatedLevels,
});
