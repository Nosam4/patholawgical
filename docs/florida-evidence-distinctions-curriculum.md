# Florida Evidence Distinctions curriculum

Overview of Florida Law → **Florida Evidence Distinctions** adds 33 original
recall drills with 189 blanks from **FL.Rose.EvidDist.pdf** (19 PDF pages).
The existing Evidence class and its federal-rule drills retain their own scope
and progress. The source PDF is not redistributed, and its commercial prose,
hypotheticals, exam-frequency predictions, and fill-in-the-blank formatting are
not transcribed.

## Coverage and sources

Every drill identifies the relevant PDF page counter in **Course material**.
Its source link opens the principal Florida statute; related statutes, federal
comparisons, and source clarifications appear in the same panel. The curriculum
covers all seven handout chapters:

| Course pages | Recall coverage |
| --- | --- |
| 1–4 | Judicial gatekeeping and comment, judicial notice, exclusion of witnesses, civil presumptions |
| 4–6 | Character proof, accused/victim distinctions, other acts, Williams notice, organizational routine practice |
| 6–9 | Witness competence, children and interpreters, truthfulness impeachment, convictions, inconsistent statements |
| 9–11 | Opinions, tangible evidence, theft photographs, originals/duplicates, certified business records |
| 11–13 | Marital, lawyer, psychotherapy and other privileges; medical confidentiality; journalists; public-policy exclusions; rape shield |
| 14–16 | Admissions and coconspirators, former testimony, dying declarations and the deceased/ill-declarant response provision |
| 16–19 | Spontaneous statements, state of mind, treatment statements, recorded recollection, public records, treatises and market publications, child/adult statements, corpus delicti, confrontation and special testimony procedures |

This is selected retrieval practice of the principal doctrines. It does not
attempt a separate drill for every documentary prerequisite, statutory exception,
constitutional exception, or case-law application. Some related topics are grouped
into a single short drill. The special statutory former-testimony provision is
identified and qualified, rather than taught as an automatic substitute for live
civil or criminal testimony.

## Review depths

The selections are cumulative and keep each drill intact.

| Review depth | Drills | Blanks |
| --- | ---: | ---: |
| Core | 15 | 87 |
| Standard | 28 | 162 |
| Comprehensive | 33 | 189 |

Core concentrates on admissibility foundations, character, impeachment,
opinions, major hearsay distinctions, marital communications, and confrontation.
Standard adds notice and presumptions, exhibits, additional privileges and policy
rules, unavailable declarants, publications, and victim statements. Comprehensive
adds the narrowly framed routine-practice comparison, journalist privilege,
qualified former-testimony discussion, corpus-delicti exception, and vulnerable
witness arrangements. These are coverage choices, not predictions of exam weight.

## Source corrections and qualifications

The Florida statutory compilation and current federal rules were checked on
November 9, 2026. The current federal rules page reports that the Evidence Rules
were last amended in 2024.
[Current Federal Rules of Evidence](https://www.uscourts.gov/forms-rules/current-rules-practice-procedure/federal-rules-evidence)

- **Prior inconsistent statements:** FRE 613(b) now ordinarily requires an
  opportunity to explain or deny before extrinsic evidence is admitted, unless
  the court orders otherwise. The handout's earlier “at some point” distinction
  no longer states the federal default. Florida's separate disclosure rule still
  concerns the witness upon the adverse party's motion.
  [FRE 613](https://www.uscourts.gov/sites/default/files/document/federal-rules-of-evidence.pdf),
  [§ 90.614](https://www.flsenate.gov/Laws/Statutes/2026/90.614)
- **Recorded recollection:** Florida's statutory language says “made”; the
  federal text also expressly mentions adoption. The drill teaches the witness's
  accuracy foundation. *Polite* describes the exceptions as substantively the
  same and requires the witness to vouch for accuracy; a signature or surrounding
  corroboration cannot replace that foundation. The handout's shorthand should
  not become a categorical rule excluding any record transcribed by another
  person.
  [Polite v. State, 116 So. 3d 270 (Fla. 2013), pp. 8–10, 17–19](https://library.law.fsu.edu/Digital-Collections/flsupct/dockets/sc10-1812/op-sc10-1812.pdf)
- **Medical confidentiality:** Florida has no general common-law physician-patient
  evidentiary privilege. Statutory confidentiality and its specified disclosure
  routes differ from the psychotherapist privilege. Placing health at issue is
  not a general license for unrestricted disclosure.
  [§ 456.057](https://www.flsenate.gov/Laws/Statutes/2026/456.057),
  [§ 90.503](https://www.flsenate.gov/Laws/Statutes/2026/90.503),
  [Guerrier v. State (Fla. 5th DCA 2002)](https://flcourts-media.flcourts.gov/content/download/473241/opinion/Opinion_01-617.pdf)
- **Vulnerable-adult statements:** Current § 90.803(24) requires unavailability
  and corroboration; the child exception allows testimony as an alternative.
  The handout incorrectly extends that alternative to elderly/disabled adults.
  [§ 90.803(23)–(24)](https://www.flsenate.gov/Laws/Statutes/2026/90.803)
- **Other-offense evidence:** Florida's defined child-molestation and sexual-offense
  provisions have broader statutory scope than a sexual-battery-only description.
  Ordinary other-act evidence still cannot be offered solely for propensity.
  [§ 90.404](https://www.flsenate.gov/Laws/Statutes/2026/90.404)
- **Duplicates:** The exception for specified payment documents has transfer and
  document-type qualifications. It does not prohibit every duplicate of every
  writing referring to money; other methods of proving contents may apply.
  [§ 90.953](https://www.flsenate.gov/Laws/Statutes/2026/90.953)
- **Corpus delicti:** Sexual-abuse cases do not receive an automatic exemption.
  The statute requires a memorialized statement, a hearing, inability to prove
  each element, and a corroborated trustworthiness determination under the stated
  proof standard.
  [§ 92.565](https://www.flsenate.gov/Laws/Statutes/2026/92.565)
- **Additional limits:** The public-records testing carveout is not permission to
  admit an entire police report. A judge can find expert literature authoritative
  and relevant without the handout's formal-judicial-notice restriction.
  Journalist disclosure requires the actual statutory three-part showing.
  [§ 90.803(8)](https://www.flsenate.gov/Laws/Statutes/2026/90.803),
  [§ 90.706](https://www.flsenate.gov/Laws/Statutes/2026/90.706),
  [§ 90.5015](https://www.flsenate.gov/Laws/Statutes/2026/90.5015)

The notes also qualify federal default presumptions, the ordinary duplicate rule,
crash-report confidentiality, government-agent admissions, the procedural limits
on § 90.803(22), and statutory versus constitutional analysis for remote testimony.
No rote target teaches the handout's blanket federal government-admissions ban,
its suggestion that every sex-case confession alone suffices, or its federal
interpreter-use shorthand as an absolute prohibition.

## Implementation and validation

`src/floridaEvidenceDistinctionsQuestions.js` exports the question bank and an
explicit map of minimum review levels. IDs use the `fl-evid-dist-` prefix and
semantic row names. All drills use selected-blank matching and stacked answer
layouts. Accepted aliases preserve the legal distinction in the clue; the tests
reject materially different federal answers, age thresholds, business-day
substitutions, and alternative medical-statement foundations.

`src/floridaEvidenceDistinctionsQuestions.test.js` checks the coverage map,
unique IDs, all canonical/alias scores, source references, and the substantive
corrections above. The root integration adds catalog and browser checks for
subject selection, all review depths, progress, revealing answers, and desktop/
mobile layouts.
