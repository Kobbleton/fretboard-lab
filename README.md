# fretboard-lab

Interactive guitar fretboard for open tunings, scales, and custom note highlighting.

## Overview

`fretboard-lab` is a lightweight static web app for exploring guitar tunings and note layouts on the fretboard.

It was built for practical everyday use:

- alternate and open tunings
- custom tuning input
- scale highlighting
- sharp/flat note naming
- right-handed and left-handed orientation
- chart and real-scale fret spacing
- dot and block inlays
- mobile layout optimized for quick reference
- multilingual UI

## Stack

- HTML
- CSS
- vanilla JavaScript

No canvas, no framework, no backend.

## Local Run

You can run the project in two simple ways:

1. Open the desktop shortcut `Open Tunings Charts`.
2. Or run the local launcher script:

```powershell
.\launch-open-tunings.ps1
```

The site opens locally at:

```text
http://127.0.0.1:4173/index.html
```

## Project Files

- `index.html` — page shell
- `styles.css` — UI, fretboard, responsive layout
- `app-i18n.js` — fretboard logic, controls, translations, rendering
- `favicon.svg` — app favicon
- `launch-open-tunings.ps1` — local server launcher

## Notes

This project is an original implementation inspired by existing fretboard tools, but written as its own HTML/CSS/JS solution for personal use and custom tunings.
