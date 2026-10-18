// Original recall drills scoped to the user's Geis course handouts.
// References use PDF page numbers. Statutory defaults yield to a valid agreement.
const partnershipFile = "FL.Geis.Partnerships.pdf";
const corporationsFile = "FL.Geis.Corporations.pdf";
const statuteUrl = (section) => `https://www.flsenate.gov/Laws/Statutes/2026/${section}`;

function column(id, title, rows) {
  return {
    id,
    title,
    answers: rows.map(([key, indicator, answer, ...extras]) => ({
      id: `fl-be-${id}-${key}`,
      indicator,
      answer,
      acceptedAnswers: extras.filter((value) => typeof value === "string"),
      ...(extras.find((value) => typeof value === "object") || {}),
    })),
  };
}

function drill(id, title, file, pages, sections, prompt, columns, clarification) {
  return {
    id: `fl-be-${id}`,
    type: "sporcle-grid",
    clueLayout: "above",
    answerLayout: "stacked",
    answerMatching: "active",
    title: `Florida Business Entities: ${title}`,
    prompt,
    sourceUrl: statuteUrl(sections.split(/[;,]/)[0].trim()),
    sourceLabel: `2026 Florida Statutes — ${sections}`,
    courseSources: [
      `${file} — PDF pp. ${pages}.`,
      `Current-statute reference: Florida Statutes §§ ${sections}.`,
      ...(clarification ? [`Current-law clarification: ${clarification}`] : []),
    ],
    columns,
  };
}

export const floridaBusinessEntitiesUnincorporatedQuestions = [
  drill("gp-formation", "General Partnership Formation", partnershipFile, "1–4", "620.8202; 620.8101; 620.8201; 620.8308",
    "Recall the elements of an accidental partnership and distinguish actual formation from purported-partner liability.", [
      column("gp-formation-elements", "Formation", [
        ["people", "Minimum number of persons carrying on the venture", "Two", "2", "two or more"],
        ["ownership", "The persons must carry on the business in this ownership capacity", "Co-owners", "coowners", "co owners"],
        ["purpose", "The business must be carried on for this financial objective", "Profit", "for profit"],
        ["intent", "Must the persons specifically intend the legal label 'partnership'?", "No"],
      ]),
      column("gp-formation-boundaries", "Boundaries", [
        ["agreement", "Besides writing, the agreement may be oral or this inferred form", "Implied", "implied agreement"],
        ["returns", "Sharing these gross receipts alone does not establish a partnership", "Gross returns", "gross revenues", "gross revenue"],
        ["entity", "Is a partnership a legal entity distinct from its partners?", "Yes"],
        ["purported", "Purported-partner liability requires a representation made or consented to plus transactional what?", "Reliance", "reliance on the representation", { explanation: "Section 620.8308 concerns a transaction entered in reliance on the representation. Being falsely named without consent does not automatically create liability or an actual partnership." }],
      ]),
    ], "No formation filing is required for an ordinary general partnership. Other law, including the statute of frauds, can require a writing for a particular agreement. Passive co-ownership alone is insufficient."),

  drill("gp-profit-presumption", "Profit-Sharing Exceptions", partnershipFile, "2–3", "620.8202",
    "Receiving business profits normally creates a presumption of partnership. Identify the statutory payment categories that avoid that presumption.", [
      column("gp-profit-payments", "Payments Without the Presumption", [
        ["debt", "Profits used to repay an existing obligation, by installments or otherwise", "Debt", "debt repayment"],
        ["services", "Profits paid for employee or independent-contractor work", "Compensation for services", "services", "wages", "employee compensation", "independent contractor compensation"],
        ["rent", "Profits paid for the use of leased premises", "Rent"],
        ["retirement", "Annuity or retirement payments to a deceased or retired partner's beneficiary", "Retirement benefit", "annuity", "retirement benefits"],
        ["loan", "Profit-based interest or another charge for borrowed funds", "Loan interest", "interest on a loan", "interest", "loan charge"],
        ["sale", "Installment payments for a business's goodwill or other assets", "Sale of goodwill or other property", "sale of goodwill", "goodwill sale", "sale of property"],
      ]),
    ], "An exception removes the profit-sharing presumption; the full facts may still independently establish co-ownership of a business for profit."),

  drill("gp-management-economics", "Partnership Management and Economics", partnershipFile, "5–7", "620.8401; 620.8103",
    "Apply the statutory defaults when the partnership agreement does not supply a different valid rule.", [
      column("gp-management-votes", "Decision Rules", [
        ["rights", "Default management rights of each partner, despite unequal contributions", "Equal", "equal rights"],
        ["ordinary", "Vote resolving a difference about ordinary-course business", "Majority of partners", "majority", "partner majority"],
        ["extraordinary", "Consent required for an act outside the ordinary course", "All partners", "unanimous consent", "unanimity"],
        ["admission", "Consent required to admit a new partner", "All partners", "unanimous consent", "unanimity"],
      ]),
      column("gp-management-money", "Financial Defaults", [
        ["profits", "Default division of profits among partners", "Equal shares", "equally", "equal"],
        ["losses", "If only profit shares are specified, losses follow these shares", "Profit shares", "shares of profits", "profit percentages"],
        ["salary", "Is a partner ordinarily entitled to pay merely for working in the business?", "No", { explanation: "Reasonable compensation for winding-up services is the statutory exception. Partners may agree on compensation." }],
        ["advance", "A reimbursable advance beyond promised capital is treated as this interest-bearing obligation", "Loan", "loan to the partnership"],
      ]),
    ], "Amending the partnership agreement also requires all partners by default. Equal economic sharing is not an allocation based on capital contributions."),

  drill("gp-duties", "Partners' Duties", partnershipFile, "4–5, 7", "620.8404; 620.8103; 620.8403",
    "Identify the default duties and the limits on changing them by agreement.", [
      column("gp-duties-substance", "Conduct", [
        ["loyalty", "Duty governing appropriation of opportunities and adverse dealing", "Loyalty", "duty of loyalty"],
        ["account", "A partner must do this for benefits obtained from partnership property", "Account to the partnership", "account", "accounting"],
        ["care", "Duty prohibiting gross negligence, recklessness, intentional misconduct, and knowing illegality", "Care", "duty of care"],
        ["faith", "Obligation accompanying performance of duties and exercise of rights", "Good faith and fair dealing", "good faith fair dealing"],
      ]),
      column("gp-duties-agreement", "Agreement Limits", [
        ["eliminate", "May a GP agreement eliminate the duty of loyalty altogether?", "No"],
        ["disclosure", "Ratification of a loyalty-conflicted transaction requires this disclosure of material facts", "Full disclosure", "full disclosure of material facts"],
        ["reduce", "An agreement may reduce the duty of care, but not in this impermissible way", "Unreasonably", "unreasonably reduce it", "unreasonable reduction"],
        ["records", "Partners may inspect and copy partnership books and these", "Records", "partnership records"],
      ]),
    ], "The agreement can identify nonviolating categories of loyalty conduct if not manifestly unreasonable. It cannot eliminate good faith and fair dealing or unreasonably restrict statutory information rights."),

  drill("gp-authority-liability", "Partnership Authority and Liability", partnershipFile, "10–12", "620.8301; 620.8305; 620.8306; 620.8307",
    "Distinguish a partner's power to bind the firm from the creditor's right to collect from an individual partner.", [
      column("gp-authority-binding", "Binding the Partnership", [
        ["agent", "Every partner has this representative status for partnership business", "Agent", "agency"],
        ["ordinary", "Apparent statutory authority generally concerns business in this course", "Ordinary course", "ordinary course of business"],
        ["notice", "If authority is absent, third-party knowledge or notification of that absence defeats apparent what?", "Authority", "apparent authority"],
        ["tort", "The firm is liable for a partner's actionable conduct in the ordinary course or with this", "Authority", "partnership authority", "authorization"],
      ]),
      column("gp-authority-collection", "Personal Exposure", [
        ["general", "Ordinary GP liability for partnership obligations is joint and this", "Several", "joint and several", "jointly and severally"],
        ["new", "Is a new partner personally liable solely as a partner for obligations predating admission?", "No"],
        ["judgment", "Collection from a liable partner's assets also requires a judgment against whom?", "The partner", "partner", "individual partner"],
        ["exhaustion", "Absent a statutory exception, the creditor must first exhaust whose assets?", "Partnership assets", "the partnership", "partnership"],
      ]),
    ], "For acts outside apparent ordinary-course authority, § 620.8301(2) requires authorization by all other partners or the terms of a written partnership agreement. Exhaustion exceptions include bankruptcy, agreement, and court permission."),

  drill("gp-property-transfer", "Partnership Property and Transfers", partnershipFile, "6, 11–12", "620.8204; 620.8203; 620.8501; 620.8502; 620.8503; 620.8504",
    "Keep ownership of partnership assets separate from transfer of an individual partner's economic interest.", [
      column("gp-property-ownership", "Asset Ownership", [
        ["entity", "Who owns property acquired by the partnership?", "Partnership", "the partnership"],
        ["funds", "Property bought with partnership assets is presumed to be whose property?", "Partnership property", "partnership", "the partnership's"],
        ["separate", "Personal title, no partnership indication, and no partnership funds presumptively mean this property", "Separate property", "personal property", "partner's separate property"],
        ["coowner", "Is a partner personally a co-owner of specific partnership property?", "No"],
      ]),
      column("gp-property-economic", "Economic Transfer", [
        ["economic", "Transferable interest includes profits, losses, and the right to receive these", "Distributions", "partnership distributions"],
        ["management", "Does an economic transferee automatically receive management rights?", "No"],
        ["dissolve", "Does the transfer alone cause dissociation or dissolution?", "No"],
        ["charging", "Judgment creditor's statutory lien remedy against the transferable interest", "Charging order"],
      ]),
    ], "An economic transfer does not admit its recipient as a partner. A transfer violating an agreement restriction is ineffective as to a person with notice. A later unanimous expulsion may follow transfer of substantially all of a partner's interest under § 620.8601(4)(b)."),

  drill("gp-dissociation", "Partner Dissociation and Buyout", partnershipFile, "7–10", "620.8602; 620.8603; 620.8701; 620.8702; 620.8703; 620.8704",
    "Apply dissociation rules when the partnership continues rather than dissolving and winding up.", [
      column("gp-dissociation-effects", "Departure", [
        ["power", "Can a partner withdraw even when withdrawal breaches the agreement?", "Yes"],
        ["damages", "A wrongful departure exposes the partner to this monetary remedy", "Damages", "damages caused by dissociation"],
        ["management", "The dissociated partner normally loses this participation right", "Management", "management rights"],
        ["buyout", "The continuing partnership must ordinarily purchase the departing partner's what?", "Interest", "partnership interest"],
      ]),
      column("gp-dissociation-timing", "Buyout and Outsiders", [
        ["valuation", "Buyout compares liquidation and going-concern values and uses the one that is what?", "Greater", "higher", "the greater value"],
        ["demand", "Absent agreement, estimated buyout payment is due this many days after written demand", "120 days", "120", "one hundred twenty days"],
        ["old", "Does dissociation alone discharge liability for earlier obligations?", "No"],
        ["tail", "Maximum post-dissociation transaction window for lingering liability if all outsider conditions are met", "One year", "1 year", "one year after dissociation"],
        ["notice", "Filed dissociation statement gives statutory notice after this many days", "90 days", "90", "ninety days"],
      ]),
    ], "Predeparture matters can retain loyalty and care duties; the noncompetition duty ends on dissociation. The one-year tail requires the counterparty's reasonable belief and lack of notice. Wrongful term-partnership departure can defer buyout payment under § 620.8701(8)."),

  drill("gp-dissolution", "Partnership Dissolution and Winding Up", partnershipFile, "13–16", "620.8801; 620.8802; 620.8803; 620.8805; 620.8807",
    "Recall the default events that begin winding up and the order for settling an ordinary general partnership.", [
      column("gp-dissolution-triggers", "Dissolution", [
        ["atwill", "An at-will partnership ordinarily dissolves on a qualifying partner's express will to do what?", "Withdraw", "withdraw as a partner", "withdrawal"],
        ["term", "A fixed-term partnership ordinarily dissolves when its term does what?", "Expires", "expiration", "ends"],
        ["vote", "After a qualifying dissociation in a term partnership, what fraction of remaining partners may elect winding up within 90 days?", "At least half", "half", "one half", "50 percent", "50%"],
        ["process", "Dissolution is followed by this process of settling the business", "Winding up", "wind up"],
      ]),
      column("gp-dissolution-settlement", "Settlement", [
        ["first", "First payment category, including partners with valid loan claims", "Creditors", "partnership creditors"],
        ["losses", "Liquidation gains and losses are credited or charged to partners' what?", "Accounts", "partnership accounts", "capital accounts"],
        ["deficit", "An ordinary personally liable GP with a net account deficit must make this", "Contribution", "additional contribution"],
        ["notice", "Statement of dissolution gives statutory notice of limited authority after this period", "90 days", "90", "ninety days"],
      ]),
    ], "Dissolution does not instantly terminate the entity: it continues to wind up. Bankruptcy or death does not invariably dissolve an at-will partnership. Contribution rules preserve the limited-liability exceptions in § 620.8306."),

  drill("special-partnerships", "LLP, LP, and LLLP", partnershipFile, "16–18, 21", "620.9001; 620.8306; 620.1201; 620.1303; 620.1404",
    "Match each partnership form to its filing and the liability protection supplied by entity status.", [
      column("special-partnerships-filings", "Formation and Status", [
        ["llp", "Filing by which a general partnership elects LLP status", "Statement of qualification"],
        ["lp", "Formation filing for a limited partnership", "Certificate of limited partnership"],
        ["gp", "An LP must have at least one limited partner and one of these partners", "General partner", "GP"],
        ["lllp", "LP form extending the statutory liability shield to general partners", "Limited liability limited partnership", "LLLP"],
      ]),
      column("special-partnerships-shields", "Status-Based Liability", [
        ["llpdebts", "LLP protection covers both tort obligations and this other major category", "Contract", "contracts", "contract obligations"],
        ["own", "Does LLP status erase liability independently based on a partner's own misconduct?", "No"],
        ["control", "Does a limited partner lose the statutory shield merely by participating in control?", "No"],
        ["ordinarygp", "Outside an LLLP or other exception, LP general partners are jointly and severally what?", "Liable", "personally liable"],
      ]),
    ], "An LP certificate must state whether the entity is an LLLP; the current statute does not require the course handout's duration statement. The status shield does not immunize a person's own torts, guarantees, or other independent obligations."),

  drill("lp-operation", "Limited Partnership Operation", partnershipFile, "17–20", "620.1503; 620.1302; 620.1305; 620.1504; 620.1508; 620.1702; 620.2002",
    "Apply the current limited-partnership defaults, keeping economic rights separate from agency and fiduciary status.", [
      column("lp-operation-members", "Limited Partners", [
        ["agency", "Is a limited partner an agent solely because of limited-partner status?", "No"],
        ["fiduciary", "Does limited-partner status alone create a fiduciary duty?", "No"],
        ["faith", "Limited partners must still exercise rights consistently with this obligation", "Good faith and fair dealing", "good faith fair dealing"],
        ["transfer", "An economic transferee receives the transferor's right to these payments", "Distributions", "distribution payments"],
      ]),
      column("lp-operation-money", "Money and Enforcement", [
        ["allocation", "Default profit/loss allocation tracks the recorded value of received what?", "Contributions", "capital contributions"],
        ["distribution", "Does a limited partner automatically have a right to an interim distribution?", "No"],
        ["solvency", "A distribution is barred if debts cannot be paid as they become what?", "Due", "due in the ordinary course"],
        ["derivative", "Action enforcing the LP's claim after GP failure to act or demand futility", "Derivative action", "derivative suit", "derivative lawsuit"],
      ]),
    ], "Valid agreement provisions can vary these defaults within § 620.1110. A limited partner given management powers has fiduciary duties for that role under § 620.1305, while control alone does not create GP liability. The derivative complaint must plead demand efforts or futility with particularity."),

  drill("llc-formation-agreement", "LLC Formation and Operating Agreement", corporationsFile, "42–43", "605.0201; 605.0102; 605.0105; 605.0401; 605.0407",
    "Recall Florida LLC formation documents, flexible membership, and the default management choice.", [
      column("llc-formation-documents", "Documents", [
        ["filing", "Document signed and delivered to form the LLC", "Articles of organization"],
        ["agent", "The articles identify this Florida service-of-process representative", "Registered agent"],
        ["agreement", "Agreement governing members' relations and the company's internal affairs", "Operating agreement"],
        ["oral", "Must every operating agreement be written?", "No", { explanation: "The statutory definition permits oral, implied, recorded, or combined agreements of all members. Specific obligations can have their own writing requirements." }],
      ]),
      column("llc-formation-members", "Members and Management", [
        ["single", "May an LLC initially have only one member?", "Yes"],
        ["default", "Default management form if neither articles nor agreement selects managers", "Member-managed", "member managed", "member managed LLC"],
        ["admission", "Default consent for admitting a postformation member outside other statutory routes", "All members", "unanimous consent", "unanimity"],
        ["economic", "May a member lack an economic interest and any contribution obligation?", "Yes"],
      ]),
    ], "Operating agreements can vary many defaults but not all statutory limits. One or more authorized representatives may file the articles; an authorized representative need not be a member."),

  drill("llc-voting", "LLC Voting", corporationsFile, "44–45", "605.04073; 605.0407",
    "Use Florida's statutory voting defaults. Distinguish member voting by profit interest from manager voting by headcount.", [
      column("llc-voting-members", "Member Voting", [
        ["weight", "A member's default voting weight is proportionate to this economic interest", "Profit interest", "interest in profits", "percentage of profits", "profit percentage"],
        ["ordinary", "General member-managed approval threshold for ordinary acts", "Majority-in-interest", "majority in interest", "majority in interest of members"],
        ["outside", "General member-managed threshold for extraordinary acts, absent a specific exception", "Majority-in-interest", "majority in interest", "majority in interest of members"],
        ["amend", "Default member consent for amending articles or the operating agreement", "All members", "unanimous consent", "unanimity"],
      ]),
      column("llc-voting-managers", "Manager-Managed Company", [
        ["rights", "Each manager's default management rights are what relative to other managers?", "Equal", "equal rights"],
        ["meeting", "Ordinary decision threshold for multiple managers acting at a meeting", "Majority of managers", "manager majority", "majority"],
        ["nomeeting", "Manager action without a meeting requires this consent in a record", "Unanimous", "unanimous consent", "all managers"],
        ["extraordinary", "Outside-course acts generally require a majority-in-interest of whom?", "Members", "the members"],
      ]),
    ], "The course summary omits the unanimous-record requirement for manager action without a meeting. Admissions and dissolution have separate defaults; ordinary/extraordinary labels alone do not override those specific provisions."),

  drill("llc-agency-shield", "LLC Agency and Liability Shield", corporationsFile, "45–46", "605.04074; 605.0301; 605.0302; 605.0304",
    "Identify who has statutory agency and what the LLC status shield actually protects.", [
      column("llc-agency-agents", "Agency", [
        ["member", "Statutory agent in a member-managed LLC", "Each member", "member", "members"],
        ["manager", "Statutory agent in a manager-managed LLC", "Each manager", "manager", "managers"],
        ["passive", "Is a manager-managed LLC member an agent solely because of membership?", "No"],
        ["statement", "Optional filed document granting or restricting a person's authority", "Statement of authority"],
      ]),
      column("llc-agency-liability", "Status Shield", [
        ["entity", "LLC debts are ordinarily obligations of which person?", "The LLC", "LLC", "limited liability company", "company"],
        ["status", "Does membership or manager status alone impose personal liability for company debts?", "No"],
        ["formalities", "Failure to observe these governance procedures alone does not impose personal liability", "Formalities", "company formalities", "corporate formalities"],
      ]),
    ], "Ordinary-course statutory agency does not bind the LLC when authority is absent and the counterparty knows or has notice. The shield addresses status-based liability; § 605.0304(2)'s formalities rule does not establish blanket immunity for fraud or independent personal obligations."),

  drill("llc-contributions-distributions", "LLC Contributions and Distributions", corporationsFile, "44", "605.0403; 605.0404; 605.0405; 605.0105",
    "Apply the financial defaults to an ongoing LLC before dissolution and winding up.", [
      column("llc-money-contributions", "Contributions", [
        ["record", "An enforceable contribution promise must be in this signed form", "Writing", "signed writing", "written promise"],
        ["allocation", "Default profits and losses track agreed values of received what?", "Contributions", "capital contributions"],
        ["shares", "Default distribution shares likewise follow the agreed value of received what?", "Contributions", "capital contributions"],
        ["decision", "An interim distribution right arises when the company decides to make a what?", "Distribution", "interim distribution"],
      ]),
      column("llc-money-limits", "Distribution Limits", [
        ["departure", "Does dissociation alone entitle a former member to a distribution?", "No"],
        ["form", "A person cannot demand a distribution in a form other than this", "Money", "cash"],
        ["debts", "Cash-flow test: company must remain able to pay debts as they become what?", "Due", "due in the ordinary course"],
        ["balance", "Default balance-sheet test adds superior winding-up preferences to total what?", "Liabilities", "total liabilities"],
      ]),
    ], "Use the agreed value shown in company records, counting contributions received. The operating agreement may alter the balance-sheet test as § 605.0105(4)(a)2 permits; the debt-payment restriction remains."),

  drill("llc-duties", "LLC Fiduciary Duties and Agreement Limits", corporationsFile, "46", "605.04091; 605.0105; 605.04092",
    "Recall duties of member-managers and managers, then qualify how an operating agreement may change them.", [
      column("llc-duties-default", "Default Standards", [
        ["membermanaged", "In a member-managed LLC, these owners owe statutory loyalty and care duties", "Members", "each member", "all members"],
        ["managermanaged", "In a manager-managed LLC, these fiduciaries owe statutory loyalty and care duties", "Managers", "each manager"],
        ["loyalty", "Duty implicated by diverting company opportunities or competing before dissolution", "Loyalty", "duty of loyalty"],
        ["care", "Default duty prohibiting gross negligence and reckless conduct", "Care", "duty of care"],
      ]),
      column("llc-duties-limits", "Operating Agreement", [
        ["reasonableness", "Loyalty aspects may be altered or eliminated only if not manifestly what?", "Unreasonable", "manifestly unreasonable"],
        ["faith", "Obligation that cannot be eliminated: good faith and what?", "Fair dealing", "good faith and fair dealing"],
        ["knowing", "Even care modification cannot authorize a knowing violation of this", "Law", "the law"],
        ["intentional", "Care modification also cannot authorize willful or this misconduct", "Intentional", "intentional misconduct"],
      ]),
    ], "The handout's loyalty-elimination statement is subject to § 605.0105(3)–(4). An agreement cannot exonerate bad faith, willful or intentional misconduct, or knowing illegality. Conflict transactions can use the protections in § 605.04092."),

  drill("llc-transfers-actions", "LLC Transfers and Member Actions", corporationsFile, "43, 46–47", "605.0502; 605.0501; 605.0801; 605.0802; 605.0805",
    "Distinguish economic transfers from membership and a member's own claim from the company's claim.", [
      column("llc-transfer-economic", "Transferable Interest", [
        ["distribution", "An LLC transferable interest is the right to receive these", "Distributions"],
        ["management", "Does an economic transfer alone give the recipient management rights?", "No"],
        ["dissociation", "Does transfer alone cause the transferor's dissociation?", "No"],
        ["property", "The transferable interest is this kind of property", "Personal property", "personal"],
      ]),
      column("llc-transfer-actions", "Claims", [
        ["direct", "Action enforcing a member's own right and distinct injury", "Direct action", "direct suit", "individual action"],
        ["derivative", "Action enforcing an LLC's right on its behalf", "Derivative action", "derivative suit"],
        ["futile", "Demand may be excused when it would be this pointless act", "Futile", "futility", "demand futility"],
        ["recovery", "Ordinary beneficiary of a derivative recovery", "LLC", "the LLC", "company", "limited liability company"],
      ]),
    ], "Section 605.0502 is supplemental economic-transfer coverage; the course explains separate admission to membership. LLC derivative demand may also be excused for irreparable injury; otherwise action follows failure to act within a reasonable time, not exceeding 90 days. Demand and standing follow §§ 605.0802–605.0803."),

  drill("llc-dissociation", "LLC Member Dissociation", corporationsFile, "44, 47", "605.0601; 605.0603; 605.0404",
    "Apply the default consequences of a member's withdrawal, including the distinction between power and right.", [
      column("llc-departure-power", "Withdrawing", [
        ["power", "May a person withdraw by express will even if the withdrawal is wrongful?", "Yes"],
        ["wrongful", "Default character of express-will withdrawal before winding up is complete", "Wrongful", "wrongful dissociation"],
        ["damages", "Wrongful dissociation can require payment of these resulting losses", "Damages", "damages caused by dissociation"],
      ]),
      column("llc-departure-effects", "Consequences", [
        ["management", "Dissociation terminates the former member's participation in this", "Management", "management and conduct", "management rights"],
        ["transferee", "The dissociated person's remaining economic interest is held solely in this capacity", "Transferee", "a transferee"],
        ["old", "Does dissociation itself discharge obligations incurred while a member?", "No"],
        ["buyout", "Does dissociation itself create a statutory right to an immediate buyout distribution?", "No"],
      ]),
    ], "A valid operating agreement can change wrongful-dissociation defaults. In a member-managed LLC, statutory member duties end for matters arising and events occurring after dissociation; earlier obligations survive."),

  drill("llc-dissolution", "LLC Dissolution and Winding Up", corporationsFile, "47", "605.0701; 605.0702; 605.0709; 605.0710",
    "Recall dissolution triggers and distinguish a dissolution event from completing liquidation.", [
      column("llc-ending-events", "Triggers", [
        ["agreement", "Document that may specify an event causing dissolution", "Operating agreement"],
        ["consent", "Default member consent needed for voluntary dissolution", "All members", "unanimous consent", "unanimity"],
        ["vacancy", "No-member period triggering dissolution absent the statutory replacement-member cure", "90 consecutive days", "90 days", "90", "ninety days"],
        ["court", "Dissolution ordered by a circuit court is this kind", "Judicial dissolution", "judicial"],
      ]),
      column("llc-ending-process", "Winding Up", [
        ["process", "Required process after dissolution to settle company affairs", "Winding up", "wind up"],
        ["first", "Company assets first discharge obligations to this group, including qualifying member claimants", "Creditors", "company creditors"],
        ["continue", "Does the dissolved company continue existing for winding up?", "Yes"],
        ["impracticable", "Judicial ground: carrying on consistently with the governing documents is not reasonably what?", "Practicable", "reasonably practicable"],
      ]),
    ], "The no-member trigger is supplemental statutory detail. Judicial grounds also include specified illegality, fraud, waste, and injurious deadlock, with the statute's conditions and potential alternative remedies. Dissolution does not itself extinguish creditor claims."),
];

export const floridaBusinessEntitiesUnincorporatedLevels = {
  "fl-be-gp-formation": "core",
  "fl-be-gp-profit-presumption": "standard",
  "fl-be-gp-management-economics": "core",
  "fl-be-gp-duties": "core",
  "fl-be-gp-authority-liability": "core",
  "fl-be-gp-property-transfer": "standard",
  "fl-be-gp-dissociation": "standard",
  "fl-be-gp-dissolution": "standard",
  "fl-be-special-partnerships": "core",
  "fl-be-lp-operation": "comprehensive",
  "fl-be-llc-formation-agreement": "core",
  "fl-be-llc-voting": "core",
  "fl-be-llc-agency-shield": "core",
  "fl-be-llc-contributions-distributions": "standard",
  "fl-be-llc-duties": "standard",
  "fl-be-llc-transfers-actions": "comprehensive",
  "fl-be-llc-dissociation": "standard",
  "fl-be-llc-dissolution": "standard",
};
