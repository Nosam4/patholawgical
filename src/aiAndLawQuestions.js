function answer(id, answerText, acceptedAnswers = [], indicator = null) {
  return {
    id,
    answer: answerText,
    acceptedAnswers,
    ...(indicator ? { indicator } : {}),
  };
}

const week3Readings = [
  "Week 3 PowerPoint: How AI Systems Actually Work: A Technical Primer for Lawyers",
  "ABA, Artificial Intelligence, Chapter 1: Artificial Intelligence: A Primer for Legal Practitioners",
  "Sarker, Machine Learning: Algorithms, Real-World Applications and Research Directions",
  "Shane, You Look Like a Thing and I Love You, Chapter 3",
  "Schorr, Introduction to Agentic AI for Lawyers",
  "Stanford HAI, 2026 AI Index Report, Chapter 2 (selected figures)",
];

const week4Readings = [
  "Week 4 PowerPoint: Finishing the Machine-Learning Landscape, and Putting on the GC Hat",
  "ABA, Artificial Intelligence, Chapter 2: Governing AI in a Changing World",
  "Thomson Reuters, The 2030 legal department: 5 ways AI will transform how in-house teams work",
  "NIST, Artificial Intelligence Risk Management Framework 1.0 (optional)",
];

export const aiAndLawWeek3Questions = [
  {
    id: "ai-week3-three-flavors",
    type: "sporcle-grid",
    title: "Three Flavors of AI and Their Legal Risks",
    prompt: "Name each AI output category and the primary legal risk emphasized in class.",
    courseSources: week3Readings,
    columns: [
      {
        id: "ai-output-types",
        title: "AI Output",
        mnemonic: "PGA",
        answers: [
          answer("ai-week3-predictive", "Predictive AI", ["predictive"], "Outputs a score or category"),
          answer("ai-week3-generative", "Generative AI", ["generative"], "Outputs content"),
          answer("ai-week3-agentic", "Agentic AI", ["agentic"], "Takes action across steps"),
        ],
      },
      {
        id: "ai-legal-risks",
        title: "Primary Legal Risk",
        answers: [
          answer(
            "ai-week3-predictive-risk",
            "Explainability and historical bias",
            ["explainability bias", "historical bias", "bias and explainability"],
            "Predictive AI",
          ),
          answer(
            "ai-week3-generative-risk",
            "Hallucination, authentication, and copyright",
            ["hallucination authentication copyright", "hallucinations authentication copyright"],
            "Generative AI",
          ),
          answer(
            "ai-week3-agentic-risk",
            "Delegation, supervision, and compounding error",
            ["delegation supervision compounding error", "supervision and compounding error"],
            "Agentic AI",
          ),
        ],
      },
    ],
  },
  {
    id: "ai-week3-ml-taxonomy",
    type: "sporcle-grid",
    title: "Machine Learning Taxonomy",
    prompt: "Use the learning setup as the clue and name the machine-learning paradigm or missing piece.",
    courseSources: week3Readings,
    columns: [
      {
        id: "ml-paradigms",
        title: "Four Fundamental Types",
        mnemonic: "SUSR",
        answers: [
          answer("ai-week3-supervised", "Supervised learning", ["supervised"], "Labeled examples"),
          answer("ai-week3-unsupervised", "Unsupervised learning", ["unsupervised"], "Unlabeled data"),
          answer(
            "ai-week3-semi-supervised",
            "Semi-supervised learning",
            ["semi supervised", "semisupervised"],
            "A little labeled data plus much unlabeled data",
          ),
          answer(
            "ai-week3-reinforcement",
            "Reinforcement learning",
            ["reinforcement"],
            "Trial, error, and reward",
          ),
        ],
      },
      {
        id: "ml-missing-piece",
        title: "The LLM Missing Piece",
        answers: [
          answer(
            "ai-week3-self-supervised",
            "Self-supervised learning",
            ["self supervised", "selfsupervised"],
            "The model manufactures labels from raw text",
          ),
        ],
      },
      {
        id: "ml-examples",
        title: "Common Tasks and Subtypes",
        answers: [
          answer("ai-week3-classification", "Classification", ["categorical prediction"], "Predict a category"),
          answer("ai-week3-regression", "Regression", ["continuous prediction"], "Predict a number"),
          answer("ai-week3-clustering", "Clustering", ["cluster analysis"], "Group unlabeled data"),
          answer("ai-week3-policy", "Policy", ["learned policy", "control policy"], "Strategy that maximizes cumulative reward"),
        ],
      },
    ],
  },
  {
    id: "ai-week3-predictive-models",
    type: "sporcle-grid",
    title: "Predictive AI: Building and Evaluating a Model",
    prompt: "Fill the model-development step, parameter type, failure mode, or evaluation measure described by each clue.",
    courseSources: week3Readings,
    columns: [
      {
        id: "predictive-workflow",
        title: "Workflow",
        answers: [
          answer("ai-week3-data-prep", "Data preparation", ["data prep"], "Clean data and create the feature set"),
          answer("ai-week3-model-selection", "Model selection", [], "Choose the algorithm and architecture"),
          answer("ai-week3-training", "Training", [], "Adjust parameters to reduce prediction error"),
          answer("ai-week3-evaluation", "Evaluation and validation", ["evaluation", "validation"], "Test performance on unseen data"),
          answer("ai-week3-monitoring", "Monitoring", [], "Watch for data drift after deployment"),
        ],
      },
      {
        id: "predictive-terms",
        title: "Model Terms",
        answers: [
          answer("ai-week3-learnable-parameters", "Learnable parameters", ["parameters"], "Weights and biases adjusted from training data"),
          answer("ai-week3-hyperparameters", "Hyperparameters", ["hyper parameters"], "Set by a human before training"),
          answer("ai-week3-underfitting", "Underfitting", [], "Too simple; poor on training and new data"),
          answer("ai-week3-overfitting", "Overfitting", [], "Fits training noise and performs poorly on new data"),
        ],
      },
      {
        id: "predictive-errors",
        title: "Evaluation Measures",
        answers: [
          answer("ai-week3-mae", "Mean absolute error", ["mae"], "Average error size regardless of direction"),
          answer("ai-week3-msd", "Mean signed difference", ["msd"], "Reveals systematic over- or under-prediction"),
          answer("ai-week3-false-positive", "False positive", ["false positives"], "Incorrectly classified as high risk"),
          answer("ai-week3-false-negative", "False negative", ["false negatives"], "Incorrectly classified as low risk"),
        ],
      },
    ],
  },
  {
    id: "ai-week3-llm-training",
    type: "sporcle-grid",
    title: "Inside a Large Language Model",
    prompt: "Name the representation, training stage, or reliability tool described by each clue.",
    courseSources: week3Readings,
    columns: [
      {
        id: "llm-representations",
        title: "Before Training",
        answers: [
          answer("ai-week3-tokens", "Tokens", ["tokenization", "token"], "Sub-word chunks converted to IDs"),
          answer("ai-week3-embeddings", "Embeddings", ["vectors", "token vectors"], "High-dimensional coordinates for token meaning"),
          answer("ai-week3-attention", "Attention", [], "Lets context shift how nearby tokens are represented"),
        ],
      },
      {
        id: "llm-stages",
        title: "Training Stages",
        answers: [
          answer("ai-week3-pretraining", "Pretraining", [], "Predict the next token across a large corpus"),
          answer("ai-week3-supervised-fine-tuning", "Supervised fine-tuning", ["fine tuning", "supervised finetuning"], "Curated instruction and response examples"),
          answer("ai-week3-rlhf", "RLHF", ["reinforcement learning from human feedback"], "Human raters rank answers and the model is tuned to their preferences"),
        ],
      },
      {
        id: "llm-reliability",
        title: "Reliability",
        answers: [
          answer("ai-week3-rag", "Retrieval-augmented generation", ["rag", "retrieval augmented generation"], "Retrieve source passages before answering"),
          answer("ai-week3-no-fact-checker", "No fact-checking module", ["no fact checking"], "Nothing in the basic objective verifies that a citation exists"),
          answer("ai-week3-fluency-not-accuracy", "Fluency is not evidence of accuracy", ["fluency is not accuracy", "fluency not accuracy"], "A polished answer can still be fabricated"),
          answer("ai-week3-data-gaps", "Gaps and conflicts in training data", ["training data gaps", "gaps and conflicts"], "Thin, stale, or contradictory source material"),
        ],
      },
    ],
  },
  {
    id: "ai-week3-agentic-ai",
    type: "sporcle-grid",
    title: "Agentic AI and Legal Supervision",
    prompt: "Fill the definition, evaluation metric, or governance checkpoint that belongs with agentic AI.",
    courseSources: week3Readings,
    columns: [
      {
        id: "agentic-definition",
        title: "What Makes It Agentic",
        answers: [
          answer("ai-week3-multi-step", "Multi-step planning and execution", ["plans and executes multiple steps", "multiple step tasks"], "Works toward a goal beyond one prompt"),
          answer("ai-week3-partial-supervision", "Partial supervision", ["limited supervision"], "Operates with only some human oversight"),
          answer("ai-week3-not-chatbot", "More than a prompted chatbot", ["not just a chatbot", "not a pumped up chatbot"], "Responding to one prompt alone is not enough"),
        ],
      },
      {
        id: "agentic-metrics",
        title: "How to Evaluate a Run",
        answers: [
          answer("ai-week3-task-completion", "Task completion rate", ["task completion"], "Did the agent achieve the verified end state?"),
          answer("ai-week3-tool-call", "Tool-call accuracy", ["tool call accuracy"], "Did it use the right tools correctly?"),
          answer("ai-week3-trajectory", "Trajectory efficiency", ["trajectory"], "How many steps compared with the minimum?"),
          answer("ai-week3-groundedness", "Groundedness", [], "Are claims backed by retrieved or observed material?"),
          answer("ai-week3-cost-latency", "Cost and latency", ["cost latency"], "Tokens and time spent"),
        ],
      },
      {
        id: "agentic-guardrails",
        title: "Legal Checkpoints",
        answers: [
          answer("ai-week3-schorrs-law", "Review before showing output to a client or court", ["schorrs law", "schorr law", "review ai output before client or court"], "Schorr's Law"),
          answer("ai-week3-agent-audit", "Logging, monitoring, least-privilege access, and auditability", ["audit trail duties", "logging monitoring least privilege auditability"], "Governance duties"),
        ],
      },
    ],
  },
];

export const aiAndLawWeek4Questions = [
  {
    id: "ai-week4-gc-desk",
    type: "sporcle-grid",
    title: "Claire Martinez's Desk: Eight AI Governance Issues",
    prompt: "Name the legal, business, policy, or governance issue represented by each concrete concern.",
    courseSources: week4Readings,
    columns: [
      {
        id: "gc-issues",
        title: "Issues to Spot",
        mnemonic: "CFDBTNIU",
        answers: [
          answer("ai-week4-personal-data", "Control over individual personal data", ["personal data control", "control over personal data"], "Who controls and uses the data?"),
          answer("ai-week4-falsity-deception", "Preventing falsity and deception", ["falsity and deception", "preventing deception"], "Impersonation, fake news, and AI disclosures"),
          answer("ai-week4-discrimination", "Preventing discrimination", ["discrimination"], "Could the system treat people unlawfully differently?"),
          answer("ai-week4-bias", "Mitigating bias", ["bias mitigation", "mitigate bias"], "Could the training history reproduce biased outcomes?"),
          answer("ai-week4-trustworthy-systems", "Training trustworthy and reliable systems", ["trustworthy and reliable systems", "reliable systems"], "How will the company build and test reliability?"),
          answer("ai-week4-national-security", "Protecting national security", ["national security"], "Could deployment create security or strategic risks?"),
          answer("ai-week4-intellectual-property", "Intellectual property", ["ip", "intellectual property issues"], "Patent, copyright, trademark, and trade-secret concerns"),
          answer("ai-week4-unsettled-law", "Navigating unsettled law", ["unsettled law", "changing law"], "What should counsel do when rules are still developing?"),
        ],
      },
    ],
  },
  {
    id: "ai-week4-legal-department-archetypes",
    type: "sporcle-grid",
    title: "Thomson Reuters: Five Legal Department Archetypes",
    prompt: "Use the transformation goal as the clue and name the legal-department archetype from the assigned reading.",
    courseSources: week4Readings,
    columns: [
      {
        id: "legal-department-archetypes",
        title: "GCO 2030 Archetypes",
        answers: [
          answer("ai-week4-scaled-enablement", "Scaled Enablement", ["scaled enablement"], "Automate high-volume, repetitive work"),
          answer("ai-week4-advisory-plus", "Advisory Plus", ["advisory plus"], "Use AI to improve analysis, research, and strategic advice"),
          answer("ai-week4-empowering-peer", "Empowering Peer", ["empowering peer"], "Embed legal tools and guardrails in other functions' workflows"),
          answer("ai-week4-seamless-integrator", "Seamless Integrator", ["seamless integrator"], "Coordinate internal and external legal work with shared standards"),
          answer("ai-week4-global-leverage", "Global Leverage", ["global leverage"], "Use AI to reduce language and time-zone barriers"),
        ],
      },
    ],
  },
  {
    id: "ai-week4-nist-risk-functions",
    type: "sporcle-grid",
    title: "NIST AI Risk Management Framework",
    prompt: "Fill the NIST AI RMF function that matches each general-counsel task.",
    courseSources: week4Readings,
    columns: [
      {
        id: "nist-functions",
        title: "Four Functions",
        mnemonic: "GMMM",
        answers: [
          answer("ai-week4-govern", "Govern", ["govern function"], "Build a risk-management culture, policies, roles, and accountability"),
          answer("ai-week4-map", "Map", ["map function"], "Understand the use case, affected people, and possible harms"),
          answer("ai-week4-measure", "Measure", ["measure function"], "Analyze, benchmark, and track identified risks"),
          answer("ai-week4-manage", "Manage", ["manage function"], "Prioritize responses, recover, and communicate"),
        ],
      },
    ],
  },
  {
    id: "ai-week4-responsible-ai-compass",
    type: "sporcle-grid",
    title: "The Responsible AI Compass",
    prompt: "Use each practice as the clue and name the Responsible AI principle it serves.",
    courseSources: week4Readings,
    columns: [
      {
        id: "rai-principles",
        title: "Five Principles",
        mnemonic: "HASTE",
        answers: [
          answer("ai-week4-human-centeredness", "Human-centeredness", ["human centeredness", "human centered"], "Rights, fairness, privacy, agency, and dignity"),
          answer("ai-week4-accountability", "Accountability", [], "Humans remain responsible for impact and final approval"),
          answer("ai-week4-safety-security", "Safety and security", ["safety", "security", "safety and security"], "Robustness, resilience, accuracy, and protection from breaches"),
          answer("ai-week4-transparency", "Transparency and explainability", ["transparency", "explainability", "transparency explainability"], "Supervisors and affected people can understand the system's effects"),
          answer("ai-week4-ethics-fairness", "Ethics and fairness", ["ethics", "fairness", "ethics fairness"], "Go beyond bare legal minimums where they lag"),
        ],
      },
    ],
  },
  {
    id: "ai-week4-governance-pillars",
    type: "sporcle-grid",
    title: "Operationalizing Responsible AI: Five Pillars",
    prompt: "Name the governance pillar that turns a Responsible AI principle into an enterprise process.",
    courseSources: week4Readings,
    columns: [
      {
        id: "governance-pillars",
        title: "Five Pillars",
        answers: [
          answer("ai-week4-mapping", "Mapping technologies, data, and use cases", ["mapping technologies data and use cases", "mapping"], "Know what, where, and why the company uses AI"),
          answer("ai-week4-prioritization", "Prioritization and focus", ["prioritization", "risk prioritization"], "Sort risk, impact, and implementation steps"),
          answer("ai-week4-principles-process", "Principles and process", ["principles process"], "Tailor the framework to the use case"),
          answer("ai-week4-piloting", "Piloting and testing", ["piloting", "testing", "pilot programs"], "Create room for feedback before scaling"),
          answer("ai-week4-oversight", "Oversight boards", ["oversight board", "review board"], "Bring legal, privacy, security, and business voices together"),
        ],
      },
    ],
  },
  {
    id: "ai-week4-ecosystem-and-control",
    type: "sporcle-grid",
    title: "The AI Ecosystem and GC Controls",
    prompt: "Fill the ecosystem term or control that belongs in Claire's Responsible AI program.",
    courseSources: week4Readings,
    columns: [
      {
        id: "ecosystem-terms",
        title: "The Ecosystem",
        answers: [
          answer("ai-week4-ai-ecosystem", "AI ecosystem", ["artificial intelligence ecosystem"], "Technical and nontechnical system around the model"),
          answer("ai-week4-responsible-use", "Responsible use", ["responsible use of ai", "responsible use"], "Human processes governing when and how AI is used"),
          answer("ai-week4-trustworthy-technology", "Trustworthy technology", ["trustworthy ai technology", "trustworthy technology"], "Technical quality such as accuracy, robustness, and security"),
        ],
      },
      {
        id: "claire-controls",
        title: "Claire's Controls",
        answers: [
          answer("ai-week4-data-flow-mapping", "Data-flow mapping", ["map data flows", "data mapping"], "Product, HR, and Engineering surface sensitive data and inferred proxies"),
          answer("ai-week4-high-risk-review", "High-risk internal classification", ["classify as high risk", "high risk classification"], "Triggers additional review before an EMEA rollout"),
          answer("ai-week4-human-in-loop", "Human in the loop", ["human oversight", "human in the loop"], "Keeps a person in edge cases and deployment approval"),
          answer("ai-week4-escalation-path", "Documented escalation path", ["escalation path", "documented escalation"], "Prevents a future high-risk tool from launching without checkpoints"),
          answer("ai-week4-cross-functional-board", "Cross-functional oversight board", ["cross functional board", "oversight board"], "Legal, compliance, HR, DEI, and outside experts review deployment"),
        ],
      },
    ],
  },
];
