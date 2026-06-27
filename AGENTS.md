# AGENTS.md

Project instructions for Codex agents working on `fretboard-lab`.

## Purpose

`fretboard-lab` is a lightweight static guitar fretboard app for alternate tunings, scales, chords, note highlighting, capo, fret focus, real-scale fret spacing, custom tunings, and mobile reference use.

This project is intentionally simple:

- vanilla HTML/CSS/JavaScript
- no framework
- no canvas for the fretboard
- no backend
- no external music theory package in the current version

The app should stay easy to understand, easy to customize, and pleasant to use as a personal guitar workflow tool.

## How To Work In This Repo

Before changing code:

- Read `README.md`.
- Read this `AGENTS.md`.
- For process context, read `docs/agentic-workflow.md` when starting a larger feature, polish pass, QA pass, or milestone.
- Check `git status --short` and preserve any existing user changes.

Use Russian when talking to the project owner unless they ask otherwise. Keep explanations practical and concise.

## Local Run And Checks

Primary local launcher:

```powershell
.\launch-open-tunings.ps1
```

Default local URL:

```text
http://127.0.0.1:4173/index.html
```

Minimum code check after JavaScript edits:

```powershell
node --check app-main.js
```

When UI behavior changes, verify in the browser. Prefer checking the exact user scenario instead of only inspecting code.

## Core Files

- `index.html` - app shell and asset references.
- `styles.css` - visual design, fretboard layout, controls, responsive behavior.
- `app-main.js` - main app state, rendering, note engine, scales, chords, URL state, local storage, export.
- `app.js` - boot/compatibility layer if used.
- `favicon.svg`, `desktop-icon.png`, `desktop-icon.ico` - app identity assets.
- `launch-open-tunings.ps1` - local server launcher.
- `README.md` - user-facing overview and roadmap.

## Architecture Notes

The fretboard is DOM-based, not canvas-based.

Important concepts:

- `state` is the main UI and music state.
- `render()` rebuilds controls and fretboard from state.
- `getFretboardNotes()` computes note positions.
- Scale/chord/highlight modes are state-driven.
- URL query params preserve shareable app state.
- Custom tunings and saved tunings use browser storage.
- Chord shapes are generated programmatically, then filtered, deduped, scored, and selected by result mode.

Preserve this model unless there is a strong reason to change it.

## Product Principles

The app is a working tool, not a marketing page.

Prioritize:

- clear fretboard readability
- fast interaction
- predictable controls
- useful defaults
- mobile reference usability
- musical usefulness over exhaustive theory output

Avoid:

- decorative UI that reduces clarity
- large framework rewrites
- hidden behavior that cannot be seen in the current UI
- feature creep that makes the simple static app hard to maintain

## UI Principles

Keep the existing visual language: dark teal interface, warm fretboard, compact cards, rounded but controlled controls, strong contrast.

When editing UI:

- Keep desktop layout stable unless the task is explicitly desktop layout work.
- Keep mobile behavior separate when possible.
- Do not let controls shift layout on hover or state changes.
- Keep cards logically grouped by workflow.
- Use short labels.
- Do not add explanatory text inside the app unless it directly improves repeated use.
- Check that dropdowns, toggles, notes, and chord controls remain readable on mobile.

## Music Logic Principles

For note, scale, tuning, chord, and fretboard logic:

- Prefer simple explicit chromatic logic over adding dependencies.
- Keep sharps/flats display separate from pitch position.
- Keep hidden notes in the DOM when that supports stable layout.
- Root notes should remain visually distinct.
- Open strings should participate in scale/chord highlighting.
- Capo should hide blocked frets and show playable capo-position notes.
- Chord mode should favor playable, useful shapes over exhaustive combinations.

Chord shape priorities:

- `Common` should show a short practical list.
- `Extended` should show a broader but still curated list.
- `All playable` is for exploration and can be larger.
- Open shapes and bass-root voicings should generally rank high.
- Avoid impossible or anatomically unreasonable shapes.

## Git Workflow

Use focused branches for feature work. Default branch prefix:

```text
codex/
```

Good branch examples:

- `codex/ui-polish-mobile`
- `codex/chord-mode-refinement`
- `codex/tuning-comparison`

Keep commits meaningful and scoped. Do not rewrite history unless the project owner explicitly asks.

Before committing:

- Check `git status --short`.
- Run the relevant checks.
- Mention what was verified and what remains unverified.

## QA Checklist

For most frontend changes, verify at least:

- App loads at `http://127.0.0.1:4173/index.html`.
- No JavaScript syntax error via `node --check app-main.js`.
- Fretboard still renders.
- Desktop layout still fits.
- Mobile layout still works if responsive CSS changed.
- URL state still updates if app state changed.

For music logic changes, also check:

- Standard tuning.
- FACGCE tuning.
- Scale mode.
- Chord mode, both `Tones` and `Shapes`.
- Common/Extended/All playable chord shape modes.
- Capo interaction if fret positions are touched.
- Fret focus interaction if chord/scale filtering is touched.

## Suggested New Chat Pattern

For a new Codex chat, start with a focused task and branch goal:

```text
We are in fretboard-lab. Read AGENTS.md and docs/agentic-workflow.md.
Create/switch to branch codex/<task-name>.
Work only on <specific area>.
Verify with <specific checks>.
```

Keep separate chats for separate workstreams when possible:

- UI polish
- chord logic
- mobile QA
- new music features
- release/docs

This keeps context cleaner and makes review easier.
