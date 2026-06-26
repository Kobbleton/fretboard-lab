# Agentic Workflow

This file is the practical workflow guide for developing `fretboard-lab` with Codex across multiple chats and branches.

## What AGENTS.md Is For

`AGENTS.md` is project memory for coding agents. When a new Codex chat starts inside this repository, the agent can read it to recover the local rules, architecture, commands, product taste, and QA expectations without needing the whole original conversation.

It is not a replacement for the current chat history, but it is the stable baseline for future work.

## Recommended Setup For New Work

Use one chat per focused workstream.

Good examples:

- one chat for mobile UI polish
- one chat for chord mode logic
- one chat for tuning comparison
- one chat for docs/release cleanup
- one chat for bugfix QA

Avoid mixing unrelated feature work in the same branch. It makes regression checks and commits harder to reason about.

## New Chat Prompt Template

Use this when starting a new feature chat:

```text
We are working on fretboard-lab.
Please read AGENTS.md, README.md, and docs/agentic-workflow.md.
Create a new branch named codex/<task-name>.
Goal: <one clear feature or bugfix>.
Do not change unrelated behavior.
After changes, run node --check app-main.js and verify the exact UI flow in the browser.
```

For UI polish:

```text
We are working on fretboard-lab UI polish.
Read AGENTS.md and docs/agentic-workflow.md.
Create branch codex/ui-polish-<area>.
Focus only on <desktop/mobile/cards/fretboard/etc>.
Preserve existing visual language and do browser QA.
```

For music logic:

```text
We are working on fretboard-lab music logic.
Read AGENTS.md and docs/agentic-workflow.md.
Create branch codex/music-<feature>.
Focus on <scales/chords/tunings/capo/fret focus>.
Verify Standard tuning and FACGCE at minimum.
```

## Milestone Workflow

For larger milestones:

1. Create a milestone branch.
2. Write or update a short plan in the chat before implementation.
3. Keep each commit scoped to one logical step.
4. Verify the app in browser before closing the milestone.
5. Update `README.md` roadmap if the milestone changes user-facing functionality.

Branch example:

```text
codex/milestone-v1-3-practice-tools
```

## Feature Workflow

Use this loop:

1. Inspect the current code and UI.
2. Make the smallest useful change.
3. Run `node --check app-main.js` after JavaScript edits.
4. Verify the exact behavior in browser.
5. Commit when the feature reaches a stable checkpoint.

For frontend work, always check both:

- how it looks
- how it behaves after state changes

## Bugfix Workflow

For bugfix chats, ask Codex to reproduce or inspect the issue first.

Bugfix prompt:

```text
Bug: <what happens>.
Expected: <what should happen>.
Please reproduce in the browser if possible, fix narrowly, and verify the same scenario after the fix.
```

## Useful Verification Scenarios

Core smoke test:

- Load `http://127.0.0.1:4173/index.html`.
- Switch tuning to `FACGCE`.
- Switch note labels between sharps and flats.
- Switch between `All`, `Selected`, `Scale`, and `Chord`.
- Switch chord view between `Tones` and `Shapes`.
- Test `Common`, `Extended`, and `All playable`.
- Toggle fret layout between `Chart` and `Real scale`.
- Change frets between `12`, `13`, `21`, `24`.
- Set capo to `3`, then turn it off.
- Test mobile viewport if responsive code changed.

Music logic smoke test:

- Standard tuning, `C major`, chord shapes.
- Standard tuning, `A minor`, chord shapes.
- FACGCE, `C minor`, chord shapes.
- FACGCE, `C major`, chord shapes.
- Scale mode with root note highlight visible.

## Documentation Rule

Update docs when a change affects:

- user-facing features
- local run instructions
- milestone status
- new workflow conventions
- major architecture decisions

Do not document every tiny implementation detail. Keep docs useful for the next chat and the next human pass.
