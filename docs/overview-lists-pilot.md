# Overview | Lists pilot

Added October 23, 2026; curated expansion October 24, 2026. The bank contains
**13 lists with a firm ceiling of 15**. Select **Overview | Lists** in the Class menu. The
original **Overview of Florida Law** catalog and review-depth selections remain
available with their existing question IDs and browser progress.

Each pilot drill asks for one bounded legal list. Enter one member at a time in
any order using the persistent **List answer** input. Empty numbered slots have
no element-specific clues. Answers appear in the authored source order; that
display order is not a required submission order. Duplicate answers do not add
credit. Reveal marks missing entries, and missed-answer practice preserves the
full-drill best score. Counts measure recalled entries in a run, not mastery.

## Coverage

| Subject | List |
| --- | --- |
| Criminal Procedure | Arrest-warrant contents: six course-checklist items |
| Criminal Procedure | Arrest-warrant form: seven current-rule groups |
| Criminal Procedure | Four first-appearance advice groups |
| Civil Procedure | Three parts of a claim for relief |
| Civil Procedure | Four class-representation prerequisites |
| Civil Procedure | Four initial disclosure categories |
| Civil Procedure | Four defenses subject to early waiver |
| Business Entities | Five required articles-of-incorporation groups |
| Business Entities | Two corporate-distribution solvency tests |
| UCC 3 | Negotiable-instrument requirements |
| UCC 3 | Five transfer warranties |
| UCC 9 | Three cumulative attachment requirements |
| UCC 9 | Three general financing-statement contents |

## Strict selection policy

The limit is a ceiling, not a target. All selectable drills count toward it,
including the two warrant versions. The October 24 pass adds only three lists
and leaves two places unused. There is no secondary uncapped list bank.

A new list must be a bounded checklist from the course, help recall a
foundational rule or process, add material coverage rather than duplicate a
current exercise, and preserve the rule's qualifications and alternatives.
Shortness alone does not justify a list. Broad topic summaries, isolated facts,
alternate quiz formats, and narrow procedural details do not automatically
become new drills. These are editorial selections, not a professor-approved
statement of exam necessity or frequency.

The three additions earn their places as follows:

- **First appearance advice:** a four-group checklist of what the judge tells
  the defendant. It adds a different procedural task from warrant contents.
- **Financing-statement contents:** three general statutory contents. It covers
  the public-filing document, distinct from attachment requirements, and keeps
  authorization and filing-office questions outside the contents list.
- **Distribution solvency:** two cumulative financial tests. It adds a compact
  substantive business-entities rule alongside the formation-document list.

The pass defers further warrant variants, broad perfection-method surveys,
longer holder-in-due-course condition inventories, and six partnership
profit-sharing exceptions. The general course remains available for broader
study. At 15, further additions require replacing a less useful list or an explicit
change to this limit; lists are never silently truncated. A catalog test enforces the
ceiling.

## Sources and content decisions

Lists are curated rather than extracted mechanically from the old grids. A
column can mix requirements, timing, exceptions, or general concepts, and its
number of blanks does not necessarily equal a legal list's number of members.

- The six-item warrant checklist comes from the user's course material,
  **FL.Flowers.CriminalProcedure**, under “Form.” It is explicitly labeled as a
  course checklist. The companion follows the seven numbered groups of
  [Florida Rule of Criminal Procedure 3.121(a)](https://www-media.floridabar.org/uploads/2026/10/2027_04-Oct-Criminal-Procedure-Rules-10-1-2026.pdf),
  including formalities outside the course checklist. Neither drill treats an
  unconditional bail amount as universally required.
- Civil lists follow Rules 1.110(b), 1.140(b)/(g)/(h), 1.220(a), and 1.280(a)(1)
  in the [October 1, 2026 civil-rules compilation](https://www-media.floridabar.org/uploads/2026/10/Civil-Procedure-Rules-10-01-26-1.pdf).
  The disclosures drill retains the rule effective October 23, 2026 and notes
  the [amendment effective January 1, 2027](https://flcourts-media.ccplatform.net/content/download/2496486/opinion/Opinion_SC2025-1497.pdf).
- Articles use the five statutory groups in
  [section 607.0202(1)](https://www.flsenate.gov/Laws/Statutes/2026/607.0202).
  Registered-office address, agent name, and written acceptance are one group
  with cumulative requirements, rather than interchangeable answers.
- Commercial-paper lists follow
  [section 673.1041](https://www.flsenate.gov/Laws/Statutes/2026/673.1041),
  related definitions and qualifications, and
  [section 673.4161](https://www.flsenate.gov/Laws/Statutes/2026/673.4161).
- Attachment follows the three cumulative groups in
  [section 679.2031(2)](https://www.flsenate.gov/Laws/Statutes/2026/679.2031).
  Its formality group contains alternative routes subject to collateral-specific
  requirements; they are not additional cumulative attachment elements.
- The October 24 additions follow Rule 3.130(b)(1) in the linked criminal-rules
  compilation, [section 679.5021(1)](https://www.flsenate.gov/Laws/Statutes/2026/679.5021),
  and [section 607.06401(3)](https://www.flsenate.gov/Laws/Statutes/2026/607.06401).
  Special financing statements can require more information. Both solvency
  tests apply after giving effect to the distribution, with the statutory
  articles-of-incorporation qualification for superior dissolution preferences.

Original sources were checked October 23, 2026; the three additions were checked
October 24, 2026. Canonical answers, reveal notes,
and course-source references retain qualifications and alternatives. Reviewed
short labels are accepted for recall; these do not test word-for-word recitation
of every qualification. Explanations appear only after reveal or completion.

## Implementation and preservation

`src/overviewLists.js` groups the curated curriculum modules into five
subjects. New `fl-lists-*` question and answer IDs isolate list scores and saved
runs from original drills. The class uses all pilot lists independently of the
original Overview depth setting. The controls display the current count and
15-list ceiling.

Questions retain the `sporcle-grid` answer shape and opt into the dedicated
presentation using `recallMode: "list"`. The presentation reuses the existing
matcher, normalization, progress storage, reveal, and missed-practice scoring.
Future procedural-sequence drills will require an explicit order-sensitive
mode; this pilot contains unordered sets only.
