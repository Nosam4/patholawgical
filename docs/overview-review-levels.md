# Overview review levels

The MVP organizes the existing Overview of Florida Law bank into three nested selections. Core is the starting selection. Standard includes Core, and Comprehensive includes every existing drill. The labels describe coverage, not question difficulty or predicted exam importance. These selections are editorial judgments from the current drill contents; they are not a professor-approved exam checklist.

Filtering operates on whole drills. It preserves question and answer IDs, prompts, qualifications, source links, ordering, and existing saved progress. Filtering does not rewrite legal content. A drill can contain both foundational and detailed material; the selector does not split it into individual blanks. Completing Core therefore means completing the selected drills, not mastering the whole course.

## Current coverage

Each cell gives **drills / answer blanks**, including overlap among drills. Counts do not measure unique concepts or promise a completion time.

| Subject | Core | Standard | Comprehensive |
| --- | ---: | ---: | ---: |
| UCC 3 | 7 / 51 | 10 / 68 | 10 / 68 |
| UCC 9: Secured Transactions | 7 / 37 | 7 / 37 | 7 / 37 |
| Florida Civil Procedure | 11 / 96 | 21 / 177 | 26 / 213 |
| Florida Civil Procedure: Timelines | 2 / 31 | 7 / 86 | 34 / 283 |
| Florida Criminal Procedure | 18 / 134 | 26 / 189 | 33 / 237 |
| **Total** | **45 / 349** | **71 / 557** | **110 / 838** |

Core reduces the current blank count by about 58%. Most of that reduction comes from deferring detailed procedure and repeated timeline formats, rather than cutting qualifications out of existing rules.

## Selection rationale

### UCC 3

Core covers negotiability, the permitted terms that qualify the negotiability rule, the five-issue roadmap, instruments and parties, issuance and negotiation, holder-in-due-course status, and the personal/real-defense distinction. Defenses remain with the holder-in-due-course drill so the protection has context.

Standard adds the liability sequence, indorser liability, and transfer warranties. Those are meaningful topics deferred from the shorter path, even though the Core roadmap mentions liability. Comprehensive adds no further UCC 3 drills because the current subject bank ends there.

### UCC 9: Secured Transactions

All seven existing drills remain in Core: analysis order, collateral types, attachment, perfection, PMSIs, priority, and default remedies. This is already a compact 37-blank sequence. Removing a link would make later drills harder to interpret; for example, the priority hierarchy refers to PMSIs. Standard and Comprehensive therefore show the same UCC 9 selection. Levels need not have different counts within every subject.

### Florida Civil Procedure

Core selects a path through the civil action: courts and jurisdiction; commencement and service waiver; formal service; venue; pleadings; answers and amendments; pre-answer motions and waiver; discovery scope and protection; defaults and dismissals; summary judgment and settlement; and jury trial and directed verdict. Related qualifications stay inside each intact drill.

Standard adds counterclaims and crossclaims, capacity and required parties, initial disclosures, depositions, discovery devices and disputes, Florida party/nonparty document discovery, case management, post-trial motions, appeals and execution, and remedies. These include substantial material absent from Core; the shorter selection should not be treated as full procedural coverage.

Comprehensive adds intervention/interpleader/impleader, class actions, small claims and public records, and the two explicitly federal document-discovery comparisons. These are deferred to keep the first two selections focused, not because their exam relevance has been established as low. Federal comparison drills retain their existing jurisdiction labels.

### Florida Civil Procedure: Timelines

Core retains the existing professor-handout **Numbers to Know** drill and **Counting Time and Special Clocks**. The latter supplies the counting context for deadline recall. The professor attribution belongs to the existing Numbers to Know source, not to the overall level selection.

Standard adds the topical service/venue, pleadings/parties, discovery, resolution, and trial/post-trial/appeal drills. Some repeat Core numbers, and some contain exceptions or specialized entries. Keeping those drills whole preserves their trigger events and qualifications.

Comprehensive adds the 84-blank mixed review; all 22 reverse-recall drills grouped by duration; the case-management timeline drill, which is predominantly complex-case procedure; small-claims/nursing-home presuit timelines; mail and records; and court disposition targets. The mail-and-records drill is kept whole at this level because it combines a general mail rule with specialized records procedures. The shorter levels intentionally omit that additional detail.

### Florida Criminal Procedure

Core covers courts and appearance processes, counsel, first appearance, probable cause, the adversary hearing and charging deadline, formal charges, pleas, dismissal, speedy trial, insanity and competency, alibi, jury selection, verdicts, acquittal, and new-trial motions.

Standard adds the pretrial-release framework, speedy-trial extensions, discovery and trial depositions, jury waivers and alternates, witnesses and jury views, instructions and deliberation materials, presentence investigation, and arrest of judgment.

Comprehensive adds warrant foundations, charging sufficiency, suppression and venue, joinder and severance, reciprocal discovery, sentence correction and postconviction relief, judicial disqualification, and contempt. These include selected Flowers supplements beyond the slide notes; they do not exhaust every topic in that handout. See [sources and rule clarifications](florida-criminal-procedure-curriculum.md).

## Maintenance

`src/overviewReview.js` contains an explicit minimum-level entry for every current Overview drill ID. New IDs fall back to Comprehensive at runtime so they remain accessible without silently expanding Core. The catalog-coverage test fails until each new drill receives an explicit classification. Filtering another course returns its original subjects unchanged.

The review selector does not introduce time-limited sessions, adaptive selection, difficulty settings, or progress migrations. New curriculum drills receive separate persistent IDs.
