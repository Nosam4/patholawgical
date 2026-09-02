function answer(id, answerText, acceptedAnswers = [], indicator = null) {
  return {
    id,
    answer: answerText,
    acceptedAnswers,
    ...(indicator ? { indicator } : {}),
  };
}

const analysisOrderQuestion = {
  id: "ucc-9-analysis-order",
  type: "sporcle-grid",
  title: "UCC 9: Order of Analysis",
  prompt: "Fill the five secured-transactions issues in the order they should be analyzed.",
  columns: [
    {
      id: "analysis-order",
      title: "Analytical Roadmap",
      mnemonic: "IAPPR",
      answers: [
        answer("ucc9-analysis-identify", "Define and identify the collateral type", [
          "identify the collateral type",
          "identify collateral",
          "collateral type",
        ], "1"),
        answer("ucc9-analysis-attachment", "Attachment", [], "2"),
        answer("ucc9-analysis-perfection", "Perfection", [], "3"),
        answer("ucc9-analysis-priority", "Priority", ["priorities"], "4"),
        answer("ucc9-analysis-remedies", "Remedies", ["available remedies"], "5"),
      ],
    },
  ],
};

const collateralTypesQuestion = {
  id: "ucc-9-collateral-types",
  type: "sporcle-grid",
  title: "UCC 9: Types of Collateral",
  prompt: "Use each definition as the clue and name the collateral type.",
  columns: [
    {
      id: "intangible-collateral",
      title: "Intangible Collateral",
      answers: [
        answer("ucc9-collateral-accounts", "Accounts", [
          "account",
          "right to payment",
          "accounts right to payment",
        ], "Right to payment"),
        answer("ucc9-collateral-proceeds", "Proceeds", [
          "cash proceeds",
          "money from disposition of collateral",
        ], "From sale or disposition"),
      ],
    },
    {
      id: "tangible-collateral",
      title: "Tangible Collateral: Classified by Use",
      answers: [
        answer("ucc9-collateral-consumer-goods", "Consumer goods", [
          "consumer good",
        ], "Personal, family, or household use"),
        answer("ucc9-collateral-inventory", "Inventory", [], "Held for sale or lease"),
        answer("ucc9-collateral-equipment", "Equipment", [
          "business equipment",
        ], "Business use; not inventory or farm products"),
      ],
    },
  ],
};

const attachmentQuestion = {
  id: "ucc-9-attachment-requirements",
  type: "sporcle-grid",
  title: "UCC 9: Attachment",
  prompt: "Fill the three attachment requirements and the clause that reaches later-acquired collateral.",
  columns: [
    {
      id: "attachment-requirements",
      title: "Requirements",
      mnemonic: "AVR",
      answers: [
        answer(
          "ucc9-attachment-agreement-or-possession",
          "Authenticated security agreement or creditor possession of the collateral",
          [
            "authenticated security agreement or possession",
            "security agreement or possession",
            "agreement or possession",
          ],
          "1",
        ),
        answer("ucc9-attachment-value", "Value", [
          "for value",
          "extension of credit",
        ], "2"),
        answer("ucc9-attachment-debtor-rights", "Debtor has rights in the collateral", [
          "debtor rights in collateral",
          "debtor owns or possesses the collateral",
          "possession or ownership",
        ], "3"),
      ],
    },
    {
      id: "future-collateral",
      title: "Future Collateral",
      answers: [
        answer("ucc9-after-acquired-property", "After-acquired property clause", [
          "after acquired property clause",
          "after acquired property",
        ], "Reaches collateral acquired later"),
      ],
    },
  ],
};

const perfectionQuestion = {
  id: "ucc-9-methods-of-perfection",
  type: "sporcle-grid",
  title: "UCC 9: Perfection",
  prompt: "Fill the methods of perfection, UCC-1 filing requirements, and automatically perfected interests.",
  columns: [
    {
      id: "perfection-methods",
      title: "Methods",
      answers: [
        answer("ucc9-perfection-possession", "Possession", [
          "creditor possession",
        ], "Pawn-shop model"),
        answer("ucc9-perfection-filing", "File a financing statement (UCC-1)", [
          "filing a financing statement",
          "file financing statement",
          "UCC1",
          "UCC-1",
        ], "Public filing"),
        answer("ucc9-perfection-automatic", "Automatic perfection", [
          "automatically perfected",
        ], "No filing or possession"),
      ],
    },
    {
      id: "ucc1-requirements",
      title: "Financing Statement (UCC-1)",
      answers: [
        answer("ucc9-ucc1-debtor-signature", "Debtor must sign", [
          "debtor signature",
          "signed by debtor",
        ], "Authorization"),
        answer("ucc9-ucc1-description", "Adequately describe the collateral", [
          "adequate description of collateral",
          "describe collateral",
          "collateral description",
        ], "Description"),
        answer("ucc9-ucc1-florida-registry", "File with the Florida Registry of Secured Transactions", [
          "Florida Registry of Secured Transactions",
          "FL Registry of Secured Transactions",
          "Florida secured transactions registry",
        ], "Filing office"),
      ],
    },
    {
      id: "automatic-perfection",
      title: "Automatic Perfection",
      answers: [
        answer("ucc9-auto-cash-proceeds", "Identifiable cash proceeds for 20 days", [
          "identifiable cash proceeds",
          "cash proceeds for 20 days",
          "20 days",
        ], "Temporary"),
        answer("ucc9-auto-pmsi-consumer", "PMSI in consumer goods", [
          "purchase money security interest in consumer goods",
          "consumer goods PMSI",
        ], "Upon attachment"),
      ],
    },
  ],
};

const pmsiQuestion = {
  id: "ucc-9-pmsi-creation-and-perfection",
  type: "sporcle-grid",
  title: "UCC 9: Purchase-Money Security Interests",
  prompt: "Fill the two ways a PMSI arises and the perfection rule for each collateral category.",
  columns: [
    {
      id: "pmsi-arises",
      title: "How a PMSI Arises",
      answers: [
        answer(
          "ucc9-pmsi-seller-credit",
          "Seller provides the collateral on credit and retains a security interest",
          [
            "seller finances the collateral and retains a security interest",
            "seller credit",
            "seller financed PMSI",
          ],
          "Seller financing",
        ),
        answer(
          "ucc9-pmsi-purchase-funds",
          "Creditor advances funds used to purchase the collateral",
          [
            "creditor funds the purchase",
            "purchase money loan",
            "lender advances purchase funds",
          ],
          "Purchase-money loan",
        ),
      ],
    },
    {
      id: "pmsi-perfection",
      title: "Perfection Rules",
      answers: [
        answer("ucc9-pmsi-consumer-goods", "Automatically perfected upon attachment", [
          "automatic perfection upon attachment",
          "automatically perfected",
        ], "Consumer goods"),
        answer("ucc9-pmsi-equipment", "File within 20 days after the debtor receives the equipment", [
          "file within 20 days",
          "20 day grace period",
          "20 days after debtor receives equipment",
        ], "Equipment"),
        answer(
          "ucc9-pmsi-inventory",
          "Notify prior inventory secured parties and file before the debtor receives the inventory",
          [
            "notify other inventory security interests and file before debtor receives inventory",
            "notify and file before debtor receives inventory",
            "no grace period",
          ],
          "Inventory",
        ),
      ],
    },
  ],
};

const priorityQuestion = {
  id: "ucc-9-priority-hierarchy",
  type: "sporcle-grid",
  title: "UCC 9: Priority Hierarchy",
  prompt: "Fill the five interests in priority order, from highest to lowest.",
  columns: [
    {
      id: "priority-order",
      title: "Highest to Lowest Priority",
      answers: [
        answer("ucc9-priority-buyers", "Buyer in ordinary course of business or garage-sale buyer", [
          "buyer in ordinary course of business",
          "BIOC",
          "garage sale buyer",
        ], "1"),
        answer("ucc9-priority-pmsi", "Properly perfected PMSI", [
          "perfected PMSI",
          "purchase money security interest",
        ], "2"),
        answer("ucc9-priority-perfected", "Perfected security interests and judicial liens", [
          "perfected security interest and judicial lien",
          "perfected interests and judicial liens",
          "perfected security interests",
        ], "3"),
        answer("ucc9-priority-unperfected", "Unperfected security interests", [
          "unperfected security interest",
          "unperfected PMSI",
        ], "4"),
        answer("ucc9-priority-debtor", "Debtor", [], "5"),
      ],
    },
  ],
};

const defaultRemediesQuestion = {
  id: "ucc-9-default-remedies",
  type: "sporcle-grid",
  title: "UCC 9: Rights Upon Default",
  prompt: "Fill the secured creditor's principal remedies and the rule governing each one.",
  columns: [
    {
      id: "default-remedies",
      title: "Creditor Rights and Remedies",
      answers: [
        answer("ucc9-default-repossess", "Repossession by self-help without breach of the peace", [
          "self help repossession without breach of peace",
          "repossess unless breach of peace",
          "right to repossess",
        ], "Repossession"),
        answer("ucc9-default-sale", "Commercially reasonable public or private sale with required notice", [
          "commercially reasonable sale",
          "public or private sale with notice",
          "sale must be commercially reasonable",
        ], "Disposition"),
        answer("ucc9-default-account-debtors", "Collect directly from account debtors after notice", [
          "collect from account debtors",
          "notify account debtors to pay secured creditor",
          "direct payment from account debtor",
        ], "Accounts"),
        answer("ucc9-default-distribution", "Distribute sale proceeds fully by priority", [
          "distribute proceeds by priority",
          "first priority then second priority",
          "sale proceeds by priority",
        ], "Proceeds"),
        answer("ucc9-default-deficiency", "Deficiency judgment against the debtor", [
          "deficiency judgment",
          "deficiency judgement",
          "right to deficiency judgment",
        ], "Shortfall"),
      ],
    },
  ],
};

export const securedTransactionsQuestions = [
  analysisOrderQuestion,
  collateralTypesQuestion,
  attachmentQuestion,
  perfectionQuestion,
  pmsiQuestion,
  priorityQuestion,
  defaultRemediesQuestion,
];
