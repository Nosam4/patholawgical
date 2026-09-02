# RulePath

A React/Vite app for memorizing black-letter law through flowcharts and Sporcle-style blanks.

Live site: https://nosam4.github.io/patholawgical/

## What it does

- Organizes prompts by Fall 2026 class, subject, and question.
- Supports flowchart prompts with a global guess input.
- Supports Sporcle-style grid prompts with clickable blanks.
- Reveals missed answers on demand.

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

## Add more questions

Edit `/Users/masonrussell/Desktop/PathoLAWgical/src/courseData.js`.

Each class has:

- `id`, `title`, `term`
- `subjects`: each has `id`, `title`, and `questions`

Questions can be:

- `type: "flowchart"` with `nodes` and `arrows`
- `type: "sporcle-grid"` with `columns`, each containing `answers`

To give a Sporcle column an optional mnemonic, add a `mnemonic` string whose
characters match the answer order (for example, `mnemonic: "USFPOS"`). The
Mnemonic button only appears on questions containing at least one mnemonic.

## Note

Use your own outlines/rules and avoid copying proprietary commercial prep material.
