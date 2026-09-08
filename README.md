# RulePath

A React/Vite app for memorizing black-letter law through flowcharts and Sporcle-style blanks.

Live site: https://nosam4.github.io/patholawgical/

## What it does

- Organizes prompts by Fall 2026 class, subject, and question.
- Supports flowchart prompts with a global guess input.
- Supports Sporcle-style grid prompts with clickable blanks.
- Reveals missed answers on demand.
- Saves completed attempts and unfinished runs in this browser. Use **Resume saved
  run** after reloading. Reselecting an unfinished drill restores its run.
  **Start Fresh** keeps score history.
- Offers **Practice missed answers** after revealing a run. Previously correct
  answers stay visible as context; practice never inflates the full-drill best score.
- Tab or ↓ moves to the next unanswered grid blank; Shift+Tab or ↑ moves to the previous one.
- Includes a source-backed Professional Responsibility / MPRE curriculum covering
  Model Rules 1–8.

## Run locally

From `/Users/masonrussell/Desktop/PathoLAWgical`, run:

```bash
npm install
npm run dev
```

- Then visit the local URL printed by Vite.

## Test

```bash
npm test
```

Browser regression checks (after building):

```bash
npx playwright install chromium
npm run build
npm run test:browser
```

The deployment workflow runs the unit tests, builds the site, and runs Chromium
checks for resume, scoring, keyboard navigation, and revealed desktop/mobile
flowchart layouts before uploading the Pages artifact.

Progress stays on the current browser and origin; it does not sync between devices.
Corrected question text invalidates saved runs for that question so outdated answers
are not restored. Unsubmitted text is not saved.

Professional Responsibility source links go directly to the relevant ABA rule.
Deleted-rule drills and the conflicts overview use the ABA table of contents.
The rule links were checked on September 5, 2026; this is not a complete substantive
legal audit of the curriculum.

## Add more questions

Edit `/Users/masonrussell/Desktop/PathoLAWgical/src/courseData.js`, or keep a large
curriculum in a dedicated module such as
`/Users/masonrussell/Desktop/PathoLAWgical/src/professionalResponsibilityQuestions.js`.

Each class has:

- `id`, `title`, `term`
- `subjects`: each has `id`, `title`, and `questions`

Questions can be:

- `type: "flowchart"` with `nodes` and `arrows`
- `type: "sporcle-grid"` with `columns`, each containing `answers`

Flowchart nodes may set `quiz: false` for always-visible context, `clue` for a
visible subsection hint, and `kind` to one of `rule`, `decision`, `exception`,
`outcome`, or `note` for semantic styling.

To give a Sporcle column an optional mnemonic, add a `mnemonic` string whose
characters match the answer order (for example, `mnemonic: "USFPOS"`). The
Mnemonic button only appears on questions containing at least one mnemonic.

## Note

Use your own outlines/rules and avoid copying proprietary commercial prep material.
