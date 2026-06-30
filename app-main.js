const NOTE_NAMES_FLAT = ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"];
const NOTE_NAMES_SHARP = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
const INTERVAL_LABELS = ["1", "b2", "2", "b3", "3", "4", "b5", "5", "b6", "6", "b7", "7"];
const STORAGE_KEY = "open-tunings-fretboard-state-v3";
const PREVIOUS_STORAGE_KEY = "open-tunings-fretboard-state-v2";
const LEGACY_STORAGE_KEY = "open-tunings-fretboard-state-v1";
const MOBILE_MEDIA_QUERY = "(max-width: 720px)";
const MOBILE_MAX_FRET_COUNT = 13;
const MOBILE_FRET_COUNTS = [12, 13];
const DESKTOP_FRET_COUNTS = [12, 13, 15, 21, 22, 24];
const SCALE_LENGTHS = [24.75, 25.5, 27];
const CAPO_OPTIONS = Array.from({ length: 13 }, (_, index) => index);
const CHORD_WINDOW_SPAN = 5;
const CHORD_MAX_PLAYABLE_SPAN = 2;
const CHORD_COMMON_LIMIT = 6;
const CHORD_EXTENDED_LIMIT = 12;
const CHORD_ALL_LIMIT = 48;
const CHORD_REQUIRED_INTERVAL_OVERRIDES = {
  dominant7: [0, 4, 10],
  major7: [0, 4, 11],
  minor7: [0, 3, 10],
};
const CHORD_FAMILY_SCORE = {
  open: 28,
  "barre-e": 12,
  "barre-a": 12,
  "caged-like": 10,
  shell: 8,
  "upper-triad": 6,
  other: 0,
};

const NOTE_TO_SEMITONE = {
  C: 0,
  "B#": 0,
  "C#": 1,
  Db: 1,
  D: 2,
  "D#": 3,
  Eb: 3,
  E: 4,
  Fb: 4,
  F: 5,
  "E#": 5,
  "F#": 6,
  Gb: 6,
  G: 7,
  "G#": 8,
  Ab: 8,
  A: 9,
  "A#": 10,
  Bb: 10,
  B: 11,
  Cb: 11,
};

const PRESET_TUNINGS = [
  { id: "standard", label: "Standard", notes: ["E", "A", "D", "G", "B", "E"], octaves: ["E2", "A2", "D3", "G3", "B3", "E4"] },
  { id: "half-step-down", label: "Half Step Down", notes: ["Eb", "Ab", "Db", "Gb", "Bb", "Eb"], octaves: ["Eb2", "Ab2", "Db3", "Gb3", "Bb3", "Eb4"] },
  { id: "drop-d", label: "Drop D", notes: ["D", "A", "D", "G", "B", "E"], octaves: ["D2", "A2", "D3", "G3", "B3", "E4"] },
  { id: "d-standard", label: "D Standard", notes: ["D", "G", "C", "F", "A", "D"], octaves: ["D2", "G2", "C3", "F3", "A3", "D4"] },
  { id: "c-standard", label: "C Standard", notes: ["C", "F", "Bb", "Eb", "G", "C"], octaves: ["C2", "F2", "Bb2", "Eb3", "G3", "C4"] },
  { id: "b-standard", label: "B Standard", notes: ["B", "E", "A", "D", "F#", "B"], octaves: ["B1", "E2", "A2", "D3", "F#3", "B3"] },
  { id: "open-g", label: "Open G", notes: ["D", "G", "D", "G", "B", "D"], octaves: ["D2", "G2", "D3", "G3", "B3", "D4"] },
  { id: "open-d", label: "Open D", notes: ["D", "A", "D", "F#", "A", "D"], octaves: ["D2", "A2", "D3", "F#3", "A3", "D4"] },
  { id: "open-e", label: "Open E", notes: ["E", "B", "E", "G#", "B", "E"], octaves: ["E2", "B2", "E3", "G#3", "B3", "E4"] },
  { id: "open-a", label: "Open A", notes: ["E", "A", "E", "A", "C#", "E"], octaves: ["E2", "A2", "E3", "A3", "C#4", "E4"] },
  { id: "dadgad", label: "DADGAD", notes: ["D", "A", "D", "G", "A", "D"], octaves: ["D2", "A2", "D3", "G3", "A3", "D4"] },
  { id: "drop-c", label: "Drop C", notes: ["C", "G", "C", "F", "A", "D"], octaves: ["C2", "G2", "C3", "F3", "A3", "D4"] },
  { id: "open-c", label: "Open C", notes: ["C", "G", "C", "G", "C", "E"], octaves: ["C2", "G2", "C3", "G3", "C4", "E4"] },
  { id: "facgce", label: "FACGCE", notes: ["F", "A", "C", "G", "C", "E"], octaves: ["F2", "A2", "C3", "G3", "C4", "E4"] },
  { id: "double-drop-d", label: "Double Drop D", notes: ["D", "A", "D", "G", "B", "D"], octaves: ["D2", "A2", "D3", "G3", "B3", "D4"] },
  { id: "new-standard", label: "New Standard", notes: ["C", "G", "D", "A", "E", "G"], octaves: ["C2", "G2", "D3", "A3", "E4", "G4"] },
  { id: "nashville", label: "Nashville", notes: ["E", "A", "D", "G", "B", "E"], octaves: ["E3", "A3", "D4", "G4", "B3", "E4"] },
];

const SCALE_PATTERNS = {
  major: { intervals: [0, 2, 4, 5, 7, 9, 11], labels: { en: "Major (Ionian)" } },
  minor: { intervals: [0, 2, 3, 5, 7, 8, 10], labels: { en: "Minor (Aeolian)" } },
  harmonicMinor: { intervals: [0, 2, 3, 5, 7, 8, 11], labels: { en: "Harmonic Minor" } },
  melodicMinor: { intervals: [0, 2, 3, 5, 7, 9, 11], labels: { en: "Melodic Minor" } },
  dorian: { intervals: [0, 2, 3, 5, 7, 9, 10], labels: { en: "Dorian" } },
  phrygian: { intervals: [0, 1, 3, 5, 7, 8, 10], labels: { en: "Phrygian" } },
  lydian: { intervals: [0, 2, 4, 6, 7, 9, 11], labels: { en: "Lydian" } },
  mixolydian: { intervals: [0, 2, 4, 5, 7, 9, 10], labels: { en: "Mixolydian" } },
  locrian: { intervals: [0, 1, 3, 5, 6, 8, 10], labels: { en: "Locrian" } },
  majorPentatonic: { intervals: [0, 2, 4, 7, 9], labels: { en: "Major Pentatonic" } },
  minorPentatonic: { intervals: [0, 3, 5, 7, 10], labels: { en: "Minor Pentatonic" } },
};

const CHORD_PATTERNS = {
  major: { intervals: [0, 4, 7], labels: { en: "Major" } },
  minor: { intervals: [0, 3, 7], labels: { en: "Minor" } },
  dominant7: { intervals: [0, 4, 7, 10], labels: { en: "Dominant 7" } },
  major7: { intervals: [0, 4, 7, 11], labels: { en: "Major 7" } },
  minor7: { intervals: [0, 3, 7, 10], labels: { en: "Minor 7" } },
  sus2: { intervals: [0, 2, 7], labels: { en: "Sus 2" } },
  sus4: { intervals: [0, 5, 7], labels: { en: "Sus 4" } },
  diminished: { intervals: [0, 3, 6], labels: { en: "Diminished" } },
  augmented: { intervals: [0, 4, 8], labels: { en: "Augmented" } },
};

const LANGUAGES = [
  { id: "en", label: "English" },
  { id: "uk", label: "\u0423\u043a\u0440\u0430\u0457\u043d\u0441\u044c\u043a\u0430" },
  { id: "es", label: "Espa\u00f1ol" },
];

const I18N = {
  en: {
    documentTitle: "freternity",
    heroTitle: "Tunings, chords, scales. One neck.",
    fretboardAria: "Interactive guitar fretboard",
    homeButton: "freternity",
    sectionTunings: "Tunings",
    sectionTuningsHelp: "Switch presets, save your own setups, or type a fresh six-string tuning.",
    presetsLabel: "Presets",
    customTuningSection: "Custom tuning",
    tuningsHelp: "Pick a preset tuning, save your own versions, or enter a six-string setup manually.",
    customLabel: "Tuning name",
    customLabelPlaceholder: "For example: FACGCE",
    customNotes: "Notes with octaves",
    customNotesPlaceholder: "F2 A2 C3 G3 C4 E4",
    applyCustom: "Apply tuning",
    saveCustom: "Save tuning",
    savedTuningsLabel: "Saved tunings",
    noSavedTunings: "No saved tunings yet.",
    deleteSaved: "Delete",
    hideAll: "Hide all",
    showAll: "Show all",
    sectionDisplay: "Display",
    sectionSettings: "Settings",
    sectionMode: "Highlight mode",
    sectionNotes: "Note highlight",
    sectionScale: "Scale",
    sectionChordHelp: "Pick a chord root and shape so you can isolate its tones across the neck.",
    sectionScaleHelp: "Choose a scale root and pattern to reveal the matching notes instantly.",
    sectionModeHelp: "Decide which note set the fretboard should show right now.",
    sectionNotesHelp: "Build a custom note filter by hand when you want a specific note collection.",
    sectionDisplayHelp: "Change labels, colors, layout, capo, and export settings.",
    sectionSettingsHelp: "Adjust fretboard look, layout, capo, and note presentation in one place.",
    sectionHelp: "Help",
    sectionHelpHelp: "Quick notes on what the app does and how to use it fast.",
    sectionFocusHelp: "Limit the visible area to a hand position or a custom fret range.",
    mobileRotateLabels: "Rotate labels",
    mobileRotateLabelsActive: "Reset label rotation",
    noteNamingLabel: "Note labels",
    noteDisplayLabel: "Display mode",
    displayNotes: "Notes",
    displayIntervals: "Intervals",
    noteColorLabel: "Color mode",
    colorChromatic: "Chromatic",
    colorDegree: "Scale degree",
    highlightModeLabel: "Highlight mode",
    handednessLabel: "Orientation",
    inlayStyleLabel: "Inlays",
    fretLayoutLabel: "Fret spacing",
    scaleLengthLabel: "Scale length",
    fretCountLabel: "Frets",
    fretRangeLabel: "Fret focus",
    fretRangeStartLabel: "From fret",
    fretRangeEndLabel: "To fret",
    fretFocusOff: "Off",
    fretFocusPosition: "Position",
    fretFocusCustom: "Custom",
    fretFocusReset: "Reset",
    fretFocusPositionLabel: "Position",
    fretFocusSummaryOff: "Full neck is visible.",
    fretFocusSummaryPosition: ({ start, end }) => `Position focus shows frets ${start}-${end}.`,
    fretFocusSummaryCustom: ({ start, end }) => `Custom focus shows frets ${start}-${end}.`,
    capoLabel: "Capo",
    capoOff: "Capo Off",
    exportPng: "Export PNG",
    openSettings: "Settings",
    closeSettings: "Close settings",
    openHelp: "?",
    closeHelp: "Close help",
    helpIntro: "This is a simple fretboard tool for alternate tunings, scales, chords, capo, and quick neck reference.",
    helpStep1Title: "1. Start with tuning",
    helpStep1Body: "Pick a preset or enter your own six-string tuning to rebuild the neck.",
    helpStep2Title: "2. Choose what to show",
    helpStep2Body: "Use All, Selected, Scale, or Chord to decide which notes stay visible.",
    helpStep3Title: "3. Refine the view",
    helpStep3Body: "Open Settings for labels, inlays, fret count, capo, spacing, and left/right orientation.",
    helpStep4Title: "4. Save or share",
    helpStep4Body: "Export PNG for an image, and keep state in the URL for a reusable setup.",
    sectionChord: "Chord",
    chordRootLabel: "Root",
    chordTypeLabel: "Chord type",
    chordViewLabel: "View",
    chordViewTones: "Tones",
    chordViewShapes: "Shapes",
    chordSetLabel: "Voicings",
    chordSetCommon: "Common",
    chordSetExtended: "Extended",
    chordSetAll: "All playable",
    chordShapePrev: "Prev",
    chordShapeNext: "Next",
    chordShapeNone: "No playable shapes were found in the current range.",
    chordShapeCounter: ({ current, total }) => `Shape ${current} of ${total}`,
    chordShapeDifficulty: ({ level }) => level,
    chordShapeNotationLabel: "Voicing",
    capoBadge: ({ capo }) => `Capo ${capo}`,
    namingFlats: "\u266d Flats",
    namingSharps: "\u266f Sharps",
    highlightAll: "All",
    highlightCustom: "Selected",
    highlightScale: "Scale",
    highlightChord: "Chord",
    handednessRight: "Right-handed",
    handednessLeft: "Left-handed",
    inlayDots: "Dots",
    inlayBlocks: "Blocks",
    fretLayoutChart: "Chart",
    fretLayoutReal: "Real scale",
    scaleLengthStandard: '25.5" Standard',
    scaleLengthGibson: '24.75" Short',
    scaleLengthBaritone: '27" Baritone',
    scaleRootLabel: "Root",
    scaleTypeLabel: "Scale type",
    customTuningDefault: "Custom tuning",
    chordSummary: ({ root, label, notes }) => `${root} ${label}: ${notes}`,
    msgPresetApplied: ({ preset }) => `Tuning "${preset}" is active.`,
    msgCustomApplied: ({ label }) => `Tuning "${label}" is applied.`,
    msgTuningSaved: ({ label }) => `Saved tuning "${label}" is ready to reuse.`,
    msgSavedDeleted: ({ label }) => `Saved tuning "${label}" was removed.`,
    msgAllHidden: "All notes are hidden. Turn on only the ones you want.",
    msgAllShown: "All notes are visible again.",
    msgSharps: "Note labels switched to sharps.",
    msgFlats: "Note labels switched to flats.",
    msgPngExported: "PNG export started.",
    msgPngFailed: "PNG export could not be created in this browser.",
    errorNeedSixNotes: "Enter exactly 6 notes with octaves, separated by spaces.",
    errorInvalidNoteWithOctave: ({ value }) => `Invalid note with octave: ${value}`,
    errorUnsupportedNote: ({ value }) => `Unsupported note name: ${value}`,
    scaleSummary: ({ root, label, notes }) => `${root} ${label}: ${notes}`,
  },
};

I18N.uk = {
  ...I18N.en,
  documentTitle: "\u0413\u0440\u0438\u0444 \u0434\u043b\u044f \u0432\u0456\u0434\u043a\u0440\u0438\u0442\u0438\u0445 \u0441\u0442\u0440\u043e\u0457\u0432",
  heroTitle: "\u0413\u0440\u0438\u0444 \u0434\u043b\u044f \u0442\u0432\u043e\u0457\u0445 \u0441\u0442\u0440\u043e\u0457\u0432",
  sectionTunings: "\u0421\u0442\u0440\u043e\u0457",
  tuningsHelp: "\u041e\u0431\u0435\u0440\u0438 \u0433\u043e\u0442\u043e\u0432\u0438\u0439 \u0441\u0442\u0440\u0456\u0439, \u0437\u0431\u0435\u0440\u0456\u0433\u0430\u0439 \u0441\u0432\u043e\u0457 \u0432\u0430\u0440\u0456\u0430\u043d\u0442\u0438 \u0430\u0431\u043e \u0432\u0432\u0435\u0434\u0438 \u0432\u043b\u0430\u0441\u043d\u0438\u0439 \u0448\u0435\u0441\u0442\u0438\u0441\u0442\u0440\u0443\u043d\u043d\u0438\u0439 \u0441\u0442\u0440\u0456\u0439.",
  customLabel: "\u041d\u0430\u0437\u0432\u0430 \u0441\u0442\u0440\u043e\u044e",
  customNotes: "\u041d\u043e\u0442\u0438 \u0437 \u043e\u043a\u0442\u0430\u0432\u0430\u043c\u0438",
  applyCustom: "\u0417\u0430\u0441\u0442\u043e\u0441\u0443\u0432\u0430\u0442\u0438",
  saveCustom: "\u0417\u0431\u0435\u0440\u0435\u0433\u0442\u0438",
  savedTuningsLabel: "\u0417\u0431\u0435\u0440\u0435\u0436\u0435\u043d\u0456 \u0441\u0442\u0440\u043e\u0457",
  noSavedTunings: "\u041f\u043e\u043a\u0438 \u043d\u0435\u043c\u0430\u0454 \u0437\u0431\u0435\u0440\u0435\u0436\u0435\u043d\u0438\u0445 \u0441\u0442\u0440\u043e\u0457\u0432.",
  deleteSaved: "\u0412\u0438\u0434\u0430\u043b\u0438\u0442\u0438",
  hideAll: "\u0421\u0445\u043e\u0432\u0430\u0442\u0438 \u0432\u0441\u0435",
  showAll: "\u041f\u043e\u043a\u0430\u0437\u0430\u0442\u0438 \u0432\u0441\u0435",
  sectionDisplay: "\u0412\u0456\u0434\u043e\u0431\u0440\u0430\u0436\u0435\u043d\u043d\u044f",
  sectionSettings: "\u041d\u0430\u043b\u0430\u0448\u0442\u0443\u0432\u0430\u043d\u043d\u044f",
  sectionMode: "\u0420\u0435\u0436\u0438\u043c \u043f\u0456\u0434\u0441\u0432\u0456\u0442\u043a\u0438",
  sectionNotes: "\u041f\u0456\u0434\u0441\u0432\u0456\u0442\u043a\u0430 \u043d\u043e\u0442",
  sectionScale: "\u0413\u0430\u043c\u0430",
  sectionSettingsHelp: "\u0417\u0431\u0435\u0440\u0456 \u0432 \u043e\u0434\u043d\u043e\u043c\u0443 \u0432\u0456\u043a\u043d\u0456 \u0432\u0438\u0433\u043b\u044f\u0434 \u0433\u0440\u0438\u0444\u0430, \u043b\u0430\u0434\u0438, \u043a\u0430\u043f\u043e \u0442\u0430 \u043f\u043e\u043a\u0430\u0437 \u043d\u043e\u0442.",
  sectionHelp: "\u0414\u043e\u0432\u0456\u0434\u043a\u0430",
  sectionHelpHelp: "\u041a\u043e\u0440\u043e\u0442\u043a\u043e: \u0449\u043e \u0446\u0435 \u0456 \u044f\u043a \u0446\u0438\u043c \u043a\u043e\u0440\u0438\u0441\u0443\u0432\u0430\u0442\u0438\u0441\u044f.",
  noteNamingLabel: "\u041f\u0456\u0434\u043f\u0438\u0441\u0438 \u043d\u043e\u0442",
  noteDisplayLabel: "\u0420\u0435\u0436\u0438\u043c \u043d\u043e\u0442",
  displayNotes: "\u041d\u043e\u0442\u0438",
  displayIntervals: "\u0406\u043d\u0442\u0435\u0440\u0432\u0430\u043b\u0438",
  handednessLabel: "\u041e\u0440\u0456\u0454\u043d\u0442\u0430\u0446\u0456\u044f",
  inlayStyleLabel: "\u0406\u043d\u043b\u0435\u0457",
  fretLayoutLabel: "\u0412\u0456\u0434\u0441\u0442\u0430\u043d\u044c \u043b\u0430\u0434\u0456\u0432",
  scaleLengthLabel: "\u041c\u0435\u043d\u0437\u0443\u0440\u0430",
  fretCountLabel: "\u041b\u0430\u0434\u0438",
  capoLabel: "Capo",
  capoOff: "\u041a\u0430\u043f\u043e \u0432\u0438\u043c\u043a.",
  exportPng: "Export PNG",
  openSettings: "\u041d\u0430\u043b\u0430\u0448\u0442\u0443\u0432\u0430\u043d\u043d\u044f",
  closeSettings: "\u0417\u0430\u043a\u0440\u0438\u0442\u0438 \u043d\u0430\u043b\u0430\u0448\u0442\u0443\u0432\u0430\u043d\u043d\u044f",
  openHelp: "?",
  closeHelp: "\u0417\u0430\u043a\u0440\u0438\u0442\u0438 \u0434\u043e\u0432\u0456\u0434\u043a\u0443",
  helpIntro: "\u0426\u0435 \u043f\u0440\u043e\u0441\u0442\u0438\u0439 \u0456\u043d\u0441\u0442\u0440\u0443\u043c\u0435\u043d\u0442 \u0434\u043b\u044f \u0441\u0442\u0440\u043e\u0457\u0432, \u0433\u0430\u043c, \u0430\u043a\u043e\u0440\u0434\u0456\u0432, \u043a\u0430\u043f\u043e \u0442\u0430 \u0448\u0432\u0438\u0434\u043a\u043e\u0457 \u043e\u0440\u0456\u0454\u043d\u0442\u0430\u0446\u0456\u0457 \u043d\u0430 \u0433\u0440\u0438\u0444\u0456.",
  helpStep1Title: "1. \u041f\u043e\u0447\u043d\u0438 \u0437\u0456 \u0441\u0442\u0440\u043e\u044e",
  helpStep1Body: "\u041e\u0431\u0435\u0440\u0438 \u043f\u0440\u0435\u0441\u0435\u0442 \u0430\u0431\u043e \u0432\u0432\u0435\u0434\u0438 \u0441\u0432\u0456\u0439 \u0448\u0435\u0441\u0442\u0438\u0441\u0442\u0440\u0443\u043d\u043d\u0438\u0439 \u0441\u0442\u0440\u0456\u0439, \u0456 \u0433\u0440\u0438\u0444 \u043f\u0435\u0440\u0435\u0431\u0443\u0434\u0443\u0454\u0442\u044c\u0441\u044f.",
  helpStep2Title: "2. \u0412\u0438\u0431\u0435\u0440\u0438, \u0449\u043e \u043f\u043e\u043a\u0430\u0437\u0443\u0432\u0430\u0442\u0438",
  helpStep2Body: "\u0420\u0435\u0436\u0438\u043c\u0438 All, Selected, Scale \u0456 Chord \u0432\u0438\u0440\u0456\u0448\u0443\u044e\u0442\u044c, \u044f\u043a\u0456 \u043d\u043e\u0442\u0438 \u0437\u0430\u043b\u0438\u0448\u0430\u044e\u0442\u044c\u0441\u044f \u0432\u0438\u0434\u0438\u043c\u0438\u043c\u0438.",
  helpStep3Title: "3. \u0414\u043e\u043a\u0440\u0443\u0442\u0438 \u0432\u0438\u0433\u043b\u044f\u0434",
  helpStep3Body: "\u0412\u0456\u0434\u043a\u0440\u0438\u0439 Settings \u0434\u043b\u044f \u043f\u0456\u0434\u043f\u0438\u0441\u0456\u0432, \u0456\u043d\u043b\u0435\u0457\u0432, \u043b\u0430\u0434\u0456\u0432, capo, \u0432\u0456\u0434\u0441\u0442\u0430\u043d\u0435\u0439 \u0456 \u043e\u0440\u0456\u0454\u043d\u0442\u0430\u0446\u0456\u0457.",
  helpStep4Title: "4. \u0417\u0431\u0435\u0440\u0435\u0436\u0438 \u0430\u0431\u043e \u043f\u043e\u0434\u0456\u043b\u0438\u0441\u044f",
  helpStep4Body: "Export PNG \u0434\u0430\u0454 \u0433\u043e\u0442\u043e\u0432\u0443 \u043a\u0430\u0440\u0442\u0438\u043d\u043a\u0443, \u0430 \u0441\u0442\u0430\u043d \u0432 URL \u0434\u043e\u0437\u0432\u043e\u043b\u044f\u0454 \u043f\u043e\u0432\u0435\u0440\u043d\u0443\u0442\u0438\u0441\u044f \u0434\u043e \u0442\u043e\u0457 \u0436 \u0441\u0445\u0435\u043c\u0438.",
  namingFlats: "\u266d \u0411\u0435\u043c\u043e\u043b\u0456",
  namingSharps: "\u266f \u0414\u0456\u0454\u0437\u0438",
  highlightAll: "\u0423\u0441\u0456",
  highlightCustom: "\u0412\u0438\u0431\u0440\u0430\u043d\u0456",
  highlightScale: "\u0413\u0430\u043c\u0430",
  handednessRight: "\u041f\u0440\u0430\u0432\u0448\u0430",
  handednessLeft: "\u041b\u0456\u0432\u0448\u0430",
  inlayDots: "\u0422\u043e\u0447\u043a\u0438",
  inlayBlocks: "\u0411\u043b\u043e\u043a\u0438",
  fretLayoutChart: "\u0421\u0456\u0442\u043a\u0430",
  fretLayoutReal: "\u0420\u0435\u0430\u043b\u044c\u043d\u0430 \u043c\u0435\u043d\u0437\u0443\u0440\u0430",
  scaleLengthStandard: '25.5" \u0421\u0442\u0430\u043d\u0434\u0430\u0440\u0442',
  scaleLengthGibson: '24.75" \u041a\u043e\u0440\u043e\u0442\u043a\u0430',
  scaleLengthBaritone: '27" \u0411\u0430\u0440\u0438\u0442\u043e\u043d',
  scaleRootLabel: "\u0422\u043e\u043d\u0456\u043a\u0430",
  scaleTypeLabel: "\u0422\u0438\u043f \u0433\u0430\u043c\u0438",
  customTuningDefault: "\u0421\u0432\u0456\u0439 \u0441\u0442\u0440\u0456\u0439",
};

I18N.es = {
  ...I18N.en,
  documentTitle: "Diapas\u00f3n para afinaciones abiertas",
  heroTitle: "Diapas\u00f3n para tus afinaciones",
  sectionTunings: "Afinaciones",
  tuningsHelp: "Elige una afinaci\u00f3n predefinida, guarda tus propias variantes o escribe una afinaci\u00f3n manual de seis cuerdas.",
  customLabel: "Nombre de afinaci\u00f3n",
  customNotes: "Notas con octavas",
  applyCustom: "Aplicar",
  saveCustom: "Guardar",
  savedTuningsLabel: "Afinaciones guardadas",
  noSavedTunings: "Todav\u00eda no hay afinaciones guardadas.",
  deleteSaved: "Eliminar",
  hideAll: "Ocultar todo",
  showAll: "Mostrar todo",
  sectionDisplay: "Visualizaci\u00f3n",
  sectionSettings: "Ajustes",
  sectionMode: "Modo de resaltado",
  sectionNotes: "Resaltado de notas",
  sectionScale: "Escala",
  sectionSettingsHelp: "Reune en una sola ventana el aspecto del diapas\u00f3n, los trastes, el capo y la visualizaci\u00f3n de notas.",
  sectionHelp: "Ayuda",
  sectionHelpHelp: "Una gu\u00eda breve sobre qu\u00e9 es esto y c\u00f3mo usarlo r\u00e1pido.",
  noteNamingLabel: "Etiquetas de notas",
  noteDisplayLabel: "Modo de vista",
  displayNotes: "Notas",
  displayIntervals: "Intervalos",
  handednessLabel: "Orientaci\u00f3n",
  inlayStyleLabel: "Inlays",
  fretLayoutLabel: "Espaciado",
  scaleLengthLabel: "Escala",
  fretCountLabel: "Trastes",
  capoLabel: "Capo",
  capoOff: "Sin capo",
  exportPng: "Exportar PNG",
  openSettings: "Ajustes",
  closeSettings: "Cerrar ajustes",
  openHelp: "?",
  closeHelp: "Cerrar ayuda",
  helpIntro: "Esta es una herramienta simple del diapas\u00f3n para afinaciones alternativas, escalas, acordes, capo y referencia r\u00e1pida del m\u00e1stil.",
  helpStep1Title: "1. Empieza por la afinaci\u00f3n",
  helpStep1Body: "Elige un preset o escribe tu propia afinaci\u00f3n de seis cuerdas para reconstruir el m\u00e1stil.",
  helpStep2Title: "2. Elige qu\u00e9 mostrar",
  helpStep2Body: "Usa All, Selected, Scale o Chord para decidir qu\u00e9 notas quedan visibles.",
  helpStep3Title: "3. Ajusta la vista",
  helpStep3Body: "Abre Ajustes para etiquetas, inlays, trastes, capo, espaciado y orientaci\u00f3n.",
  helpStep4Title: "4. Guarda o comparte",
  helpStep4Body: "Exportar PNG crea una imagen, y el estado en la URL te deja volver al mismo setup.",
  namingFlats: "\u266d Bemoles",
  namingSharps: "\u266f Sostenidos",
  highlightAll: "Todas",
  highlightCustom: "Elegidas",
  highlightScale: "Escala",
  handednessRight: "Diestro",
  handednessLeft: "Zurdo",
  inlayDots: "Puntos",
  inlayBlocks: "Bloques",
  fretLayoutChart: "Cuadr\u00edcula",
  fretLayoutReal: "Escala real",
  scaleLengthStandard: '25.5" Est\u00e1ndar',
  scaleLengthGibson: '24.75" Corta',
  scaleLengthBaritone: '27" Bar\u00edtono',
  scaleRootLabel: "T\u00f3nica",
  scaleTypeLabel: "Tipo de escala",
  customTuningDefault: "Afinaci\u00f3n personalizada",
};

const SINGLE_MARKER_FRETS = new Set([3, 5, 7, 9, 15, 17, 19, 21]);
const DOUBLE_MARKER_FRETS = new Set([12, 24]);
const BLOCK_MARKER_FRETS = new Set([3, 5, 7, 9, 12, 15, 17, 19, 21, 24]);
const defaultTuning = PRESET_TUNINGS[0];

const state = {
  language: "en",
  languageMenuOpen: false,
  tuningName: defaultTuning.label,
  tuningId: defaultTuning.id,
  tuningNotes: [...defaultTuning.notes],
  tuningOctaves: [...defaultTuning.octaves],
  visibleNotes: [...NOTE_NAMES_SHARP],
  noteNaming: "sharps",
  noteDisplayMode: "notes",
  noteColorMode: "chromatic",
  chordViewMode: "tones",
  chordResultMode: "common",
  handedness: "right",
  inlayStyle: "dots",
  fretLayout: "chart",
  scaleLength: 25.5,
  fretCount: 13,
  capo: 0,
  activeModal: "",
  highlightMode: "all",
  selectedScaleRoot: "C",
  selectedScaleType: "major",
  selectedChordRoot: "C",
  selectedChordType: "major",
  selectedChordShapeIndex: 0,
  fretFocusMode: "off",
  fretFocusPosition: 1,
  fretRangeStart: 1,
  fretRangeEnd: 13,
  mobileLabelRotation: "upright",
  mobileExpandedCards: [],
  savedTunings: [],
  tuningDraftLabel: defaultTuning.label,
  tuningDraftNotesText: defaultTuning.octaves.join(" "),
  messageKey: "",
  messageType: "",
  messageParams: {},
  inlineMessageText: "",
  inlineMessageType: "",
};

const heroNode = document.querySelector(".hero");
const controlsNode = document.getElementById("controls");
const guitarNode = document.getElementById("guitar");
const mobileRotateButtonNode = document.getElementById("mobile-rotate-button");
const fretboardPageNode = document.getElementById("fretboard-page") || document.querySelector(".fretboard-page");
const chordShapeCache = new Map();

function t(key, params = {}) {
  const table = I18N[state.language] || I18N.en;
  const value = table[key];
  if (typeof value === "function") {
    return value(params);
  }
  return value ?? I18N.en[key] ?? key;
}

function getChromaticScale(mode) {
  return mode === "sharps" ? NOTE_NAMES_SHARP : NOTE_NAMES_FLAT;
}

function getScaleLabel(scaleType) {
  const scale = SCALE_PATTERNS[scaleType];
  if (!scale) {
    return scaleType;
  }
  return scale.labels[state.language] || scale.labels.en || scaleType;
}

function parseNoteWithOctave(noteWithOctave) {
  const match = /^([A-G][b#]?)(\d+)$/.exec(noteWithOctave);
  if (!match) {
    throw new Error(t("errorInvalidNoteWithOctave", { value: noteWithOctave }));
  }
  return { note: match[1], octave: Number(match[2]) };
}

function toMidiNumber(noteWithOctave) {
  const parsed = parseNoteWithOctave(noteWithOctave);
  return parsed.octave * 12 + NOTE_TO_SEMITONE[parsed.note];
}

function fromMidiNumber(midiNumber, mode) {
  const semitone = ((midiNumber % 12) + 12) % 12;
  const octave = Math.floor(midiNumber / 12);
  return `${getChromaticScale(mode)[semitone]}${octave}`;
}

function normalizeNoteName(note, mode) {
  const semitone = NOTE_TO_SEMITONE[note];
  if (typeof semitone !== "number") {
    throw new Error(t("errorUnsupportedNote", { value: note }));
  }
  return getChromaticScale(mode)[semitone];
}

function formatLabelWithAccidentals(label) {
  return label
    .replaceAll("#", '<span class="note-accidental note-accidental-sharp">&#9839;</span>')
    .replaceAll("b", '<span class="note-accidental note-accidental-flat">&#9837;</span>');
}

function escapeHtml(text) {
  return String(text)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function slugifyLabel(label) {
  return label.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "tuning";
}

function createSavedTuningId(label) {
  return `${slugifyLabel(label)}-${Date.now().toString(36)}`;
}

function getPresetById(tuningId) {
  return PRESET_TUNINGS.find((item) => item.id === tuningId) || null;
}

function getSavedTuningById(savedId) {
  return state.savedTunings.find((item) => item.id === savedId) || null;
}

function getSavedTuningLabelMatch(label) {
  const normalized = label.trim().toLowerCase();
  return state.savedTunings.find((item) => item.label.trim().toLowerCase() === normalized) || null;
}

function setMessage(key = "", type = "", params = {}) {
  state.messageKey = key;
  state.messageType = type;
  state.messageParams = params;
  if (key) {
    scheduleToastDismiss();
  }
}

function getMessageText() {
  if (!state.messageKey) {
    return "";
  }
  return t(state.messageKey, state.messageParams);
}

let toastDismissTimer = null;

function scheduleToastDismiss() {
  if (toastDismissTimer) {
    window.clearTimeout(toastDismissTimer);
  }
  toastDismissTimer = window.setTimeout(() => {
    state.messageKey = "";
    state.messageType = "";
    state.messageParams = {};
    render();
  }, 2200);
}

function setInlineMessage(text = "", type = "") {
  state.inlineMessageText = text;
  state.inlineMessageType = type;
}

function syncDraftFromCurrentTuning() {
  state.tuningDraftLabel = state.tuningName || t("customTuningDefault");
  state.tuningDraftNotesText = state.tuningOctaves.join(" ");
}

function resetAppView() {
  const preservedLanguage = state.language;
  const preservedSavedTunings = [...state.savedTunings];
  state.language = preservedLanguage;
  state.languageMenuOpen = false;
  state.tuningName = defaultTuning.label;
  state.tuningId = defaultTuning.id;
  state.tuningNotes = [...defaultTuning.notes];
  state.tuningOctaves = [...defaultTuning.octaves];
  state.visibleNotes = [...NOTE_NAMES_SHARP];
  state.noteNaming = "sharps";
  state.noteDisplayMode = "notes";
  state.noteColorMode = "chromatic";
  state.chordViewMode = "tones";
  state.chordResultMode = "common";
  state.handedness = "right";
  state.inlayStyle = "dots";
  state.fretLayout = "chart";
  state.scaleLength = 25.5;
  state.fretCount = 13;
  state.capo = 0;
  state.highlightMode = "all";
  state.selectedScaleRoot = "C";
  state.selectedScaleType = "major";
  state.selectedChordRoot = "C";
  state.selectedChordType = "major";
  state.selectedChordShapeIndex = 0;
  state.fretFocusMode = "off";
  state.fretFocusPosition = 1;
  state.fretRangeStart = 1;
  state.fretRangeEnd = 13;
  state.mobileLabelRotation = "upright";
  state.savedTunings = preservedSavedTunings;
  state.messageKey = "";
  state.messageType = "";
  state.messageParams = {};
  state.inlineMessageText = "";
  state.inlineMessageType = "";
  syncDraftFromCurrentTuning();
}

function normalizeTuningTokens(tokens, mode) {
  if (tokens.length !== 6) {
    throw new Error(t("errorNeedSixNotes"));
  }
  return tokens.map((token) => {
    const parsed = parseNoteWithOctave(token);
    return `${normalizeNoteName(parsed.note, mode)}${parsed.octave}`;
  });
}

function buildTuningFromInput(labelValue, notesValue) {
  const label = labelValue.trim() || t("customTuningDefault");
  const tokens = notesValue.trim().split(/\s+/).filter(Boolean);
  const normalized = normalizeTuningTokens(tokens, state.noteNaming);
  return {
    id: "custom",
    label,
    notes: normalized.map((noteWithOctave) => noteWithOctave.replace(/\d+$/, "")),
    octaves: normalized,
  };
}

function applyTuningObject(tuning, options = {}) {
  const { tuningId = tuning.id || "custom", withMessage = false, messageKey = "", messageParams = {}, syncDraft = true } = options;
  state.tuningId = tuningId;
  state.tuningName = tuning.label;
  state.tuningNotes = tuning.notes.map((note) => normalizeNoteName(note, state.noteNaming));
  state.tuningOctaves = tuning.octaves.map((noteWithOctave) => {
    const noteName = noteWithOctave.replace(/\d+$/, "");
    const octave = noteWithOctave.replace(/^[A-G][b#]?/, "");
    return `${normalizeNoteName(noteName, state.noteNaming)}${octave}`;
  });
  if (syncDraft) {
    syncDraftFromCurrentTuning();
  }
  if (withMessage && messageKey) {
    setMessage(messageKey, "is-success", messageParams);
  }
}

function applyPresetTuning(tuningId, withMessage = true) {
  const preset = getPresetById(tuningId);
  if (!preset) {
    return;
  }
  applyTuningObject(preset, {
    tuningId: preset.id,
    withMessage,
    messageKey: "msgPresetApplied",
    messageParams: { preset: preset.label },
  });
}

function applySavedTuning(savedId, withMessage = false) {
  const saved = getSavedTuningById(savedId);
  if (!saved) {
    return;
  }
  applyTuningObject(saved, {
    tuningId: `saved:${saved.id}`,
    withMessage,
    messageKey: "msgPresetApplied",
    messageParams: { preset: saved.label },
  });
}

function saveState() {
  const snapshot = {
    language: state.language,
    tuningId: state.tuningId,
    tuningName: state.tuningName,
    tuningNotes: state.tuningNotes,
    tuningOctaves: state.tuningOctaves,
    visibleNotes: state.visibleNotes,
      noteNaming: state.noteNaming,
      noteDisplayMode: state.noteDisplayMode,
      noteColorMode: state.noteColorMode,
      chordViewMode: state.chordViewMode,
      chordResultMode: state.chordResultMode,
    handedness: state.handedness,
    inlayStyle: state.inlayStyle,
    fretLayout: state.fretLayout,
    scaleLength: state.scaleLength,
    fretCount: state.fretCount,
    capo: state.capo,
    highlightMode: state.highlightMode,
    selectedScaleRoot: state.selectedScaleRoot,
    selectedScaleType: state.selectedScaleType,
    selectedChordRoot: state.selectedChordRoot,
    selectedChordType: state.selectedChordType,
    selectedChordShapeIndex: state.selectedChordShapeIndex,
    fretFocusMode: state.fretFocusMode,
    fretFocusPosition: state.fretFocusPosition,
    fretRangeStart: state.fretRangeStart,
    fretRangeEnd: state.fretRangeEnd,
    mobileLabelRotation: state.mobileLabelRotation,
    mobileExpandedCards: state.mobileExpandedCards,
    savedTunings: state.savedTunings,
    tuningDraftLabel: state.tuningDraftLabel,
    tuningDraftNotesText: state.tuningDraftNotesText,
  };

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(snapshot));
  } catch (error) {
    return;
  }
}

function getStoredSnapshot() {
  try {
    const current = localStorage.getItem(STORAGE_KEY);
    if (current) {
      return JSON.parse(current);
    }
    const previous = localStorage.getItem(PREVIOUS_STORAGE_KEY);
    if (previous) {
      return JSON.parse(previous);
    }
    const legacy = localStorage.getItem(LEGACY_STORAGE_KEY);
    return legacy ? JSON.parse(legacy) : null;
  } catch (error) {
    return null;
  }
}

function applySnapshot(parsed) {
  if (!parsed || typeof parsed !== "object") {
    return;
  }

  if (typeof parsed.language === "string" && LANGUAGES.some((language) => language.id === parsed.language)) {
    state.language = parsed.language;
  }
  if (typeof parsed.noteNaming === "string" && ["flats", "sharps"].includes(parsed.noteNaming)) {
    state.noteNaming = parsed.noteNaming;
  }
  if (typeof parsed.noteDisplayMode === "string" && ["notes", "intervals"].includes(parsed.noteDisplayMode)) {
    state.noteDisplayMode = parsed.noteDisplayMode;
  }
  if (typeof parsed.noteColorMode === "string" && ["chromatic", "degree"].includes(parsed.noteColorMode)) {
    state.noteColorMode = parsed.noteColorMode;
  }
  if (typeof parsed.chordViewMode === "string" && ["tones", "shapes"].includes(parsed.chordViewMode)) {
    state.chordViewMode = parsed.chordViewMode;
  }
  if (typeof parsed.chordResultMode === "string" && ["common", "extended", "all"].includes(parsed.chordResultMode)) {
    state.chordResultMode = parsed.chordResultMode;
  }
  if (typeof parsed.handedness === "string" && ["right", "left"].includes(parsed.handedness)) {
    state.handedness = parsed.handedness;
  }
  if (typeof parsed.inlayStyle === "string" && ["dots", "blocks"].includes(parsed.inlayStyle)) {
    state.inlayStyle = parsed.inlayStyle;
  }
  if (typeof parsed.fretLayout === "string" && ["chart", "real"].includes(parsed.fretLayout)) {
    state.fretLayout = parsed.fretLayout;
  }
  if (typeof parsed.scaleLength === "number" && SCALE_LENGTHS.includes(parsed.scaleLength)) {
    state.scaleLength = parsed.scaleLength;
  }
  if (typeof parsed.fretCount === "number" && DESKTOP_FRET_COUNTS.includes(parsed.fretCount)) {
    state.fretCount = parsed.fretCount;
  }
  if (typeof parsed.capo === "number" && parsed.capo >= 0 && parsed.capo <= 12) {
    state.capo = parsed.capo;
  }
  if (typeof parsed.highlightMode === "string" && ["all", "custom", "scale", "chord"].includes(parsed.highlightMode)) {
    state.highlightMode = parsed.highlightMode;
  }
  if (typeof parsed.selectedScaleType === "string" && SCALE_PATTERNS[parsed.selectedScaleType]) {
    state.selectedScaleType = parsed.selectedScaleType;
  }
  if (typeof parsed.selectedScaleRoot === "string") {
    state.selectedScaleRoot = normalizeNoteName(parsed.selectedScaleRoot, state.noteNaming);
  }
  if (typeof parsed.selectedChordType === "string" && CHORD_PATTERNS[parsed.selectedChordType]) {
    state.selectedChordType = parsed.selectedChordType;
  }
  if (typeof parsed.selectedChordRoot === "string") {
    state.selectedChordRoot = normalizeNoteName(parsed.selectedChordRoot, state.noteNaming);
  }
  if (typeof parsed.selectedChordShapeIndex === "number" && parsed.selectedChordShapeIndex >= 0) {
    state.selectedChordShapeIndex = parsed.selectedChordShapeIndex;
  }
  if (typeof parsed.fretFocusMode === "string" && ["off", "position", "custom"].includes(parsed.fretFocusMode)) {
    state.fretFocusMode = parsed.fretFocusMode;
  }
  if (typeof parsed.fretFocusPosition === "number" && parsed.fretFocusPosition >= 1) {
    state.fretFocusPosition = parsed.fretFocusPosition;
  }
  if (typeof parsed.fretRangeStart === "number" && parsed.fretRangeStart >= 1) {
    state.fretRangeStart = parsed.fretRangeStart;
  }
  if (typeof parsed.fretRangeEnd === "number" && parsed.fretRangeEnd >= 1) {
    state.fretRangeEnd = parsed.fretRangeEnd;
  }
  if (typeof parsed.mobileLabelRotation === "string" && ["upright", "clockwise"].includes(parsed.mobileLabelRotation)) {
    state.mobileLabelRotation = parsed.mobileLabelRotation;
  }
  if (Array.isArray(parsed.mobileExpandedCards)) {
    state.mobileExpandedCards = parsed.mobileExpandedCards.filter((value) =>
      ["chord", "scale", "tuning", "notes", "mode", "focus", "display"].includes(value)
    );
  }
  if (Array.isArray(parsed.visibleNotes)) {
    state.visibleNotes = parsed.visibleNotes.map((note) => normalizeNoteName(note, state.noteNaming));
  }
  if (Array.isArray(parsed.savedTunings)) {
    state.savedTunings = parsed.savedTunings
      .filter((item) => item && typeof item.label === "string" && Array.isArray(item.octaves) && item.octaves.length === 6)
      .map((item) => {
        const octaves = item.octaves.map((noteWithOctave) => {
          const parsedNote = parseNoteWithOctave(noteWithOctave);
          return `${normalizeNoteName(parsedNote.note, state.noteNaming)}${parsedNote.octave}`;
        });
        return {
          id: typeof item.id === "string" ? item.id : createSavedTuningId(item.label),
          label: item.label,
          notes: octaves.map((noteWithOctave) => noteWithOctave.replace(/\d+$/, "")),
          octaves,
        };
      });
  }
  if (typeof parsed.tuningDraftLabel === "string") {
    state.tuningDraftLabel = parsed.tuningDraftLabel;
  }
  if (typeof parsed.tuningDraftNotesText === "string") {
    state.tuningDraftNotesText = parsed.tuningDraftNotesText;
  }

  if (typeof parsed.tuningId === "string") {
    const preset = getPresetById(parsed.tuningId);
    if (preset) {
      applyTuningObject(preset, { tuningId: preset.id, syncDraft: false });
      return;
    }
    if (parsed.tuningId.startsWith("saved:")) {
      const saved = getSavedTuningById(parsed.tuningId.slice(6));
      if (saved) {
        applyTuningObject(saved, { tuningId: `saved:${saved.id}`, syncDraft: false });
        return;
      }
    }
    if (Array.isArray(parsed.tuningOctaves) && parsed.tuningOctaves.length === 6) {
      const octaves = parsed.tuningOctaves.map((noteWithOctave) => {
        const parsedNote = parseNoteWithOctave(noteWithOctave);
        return `${normalizeNoteName(parsedNote.note, state.noteNaming)}${parsedNote.octave}`;
      });
      applyTuningObject(
        {
          id: parsed.tuningId,
          label: typeof parsed.tuningName === "string" ? parsed.tuningName : t("customTuningDefault"),
          notes: octaves.map((noteWithOctave) => noteWithOctave.replace(/\d+$/, "")),
          octaves,
        },
        { tuningId: parsed.tuningId, syncDraft: false }
      );
    }
  }
}

function loadState() {
  applySnapshot(getStoredSnapshot());
}

function getEffectiveTuningOctaves() {
  if (!state.capo) {
    return [...state.tuningOctaves];
  }
  return state.tuningOctaves.map((noteWithOctave) => fromMidiNumber(toMidiNumber(noteWithOctave) + state.capo, state.noteNaming));
}

function getEffectiveTuningNotes() {
  return getEffectiveTuningOctaves().map((noteWithOctave) => noteWithOctave.replace(/\d+$/, ""));
}

function getOpenNoteWithCapo(noteWithOctave) {
  if (!state.capo) {
    return noteWithOctave;
  }
  return fromMidiNumber(toMidiNumber(noteWithOctave) + state.capo, state.noteNaming);
}

function getScaleNotes(root, scaleType, mode) {
  const pattern = SCALE_PATTERNS[scaleType];
  if (!pattern) {
    return [];
  }
  const rootSemitone = NOTE_TO_SEMITONE[normalizeNoteName(root, mode)];
  return pattern.intervals.map((interval) => getChromaticScale(mode)[(rootSemitone + interval) % 12]);
}

function getChordIntervals(chordType) {
  return CHORD_PATTERNS[chordType]?.intervals || [];
}

function getChordLabel(chordType) {
  const chord = CHORD_PATTERNS[chordType];
  if (!chord) {
    return chordType;
  }
  return chord.labels[state.language] || chord.labels.en || chordType;
}

function getChordNotes(root, chordType, mode) {
  const pattern = CHORD_PATTERNS[chordType];
  if (!pattern) {
    return [];
  }
  const rootSemitone = NOTE_TO_SEMITONE[normalizeNoteName(root, mode)];
  return pattern.intervals.map((interval) => getChromaticScale(mode)[(rootSemitone + interval) % 12]);
}

function getChordRequiredIntervals(chordType) {
  return CHORD_REQUIRED_INTERVAL_OVERRIDES[chordType] || getChordIntervals(chordType);
}

function getChordIntervalValue(noteName, root, mode) {
  const noteSemitone = NOTE_TO_SEMITONE[normalizeNoteName(noteName, mode)];
  const rootSemitone = NOTE_TO_SEMITONE[normalizeNoteName(root, mode)];
  return (noteSemitone - rootSemitone + 12) % 12;
}

function isChordShapeMode() {
  return state.highlightMode === "chord" && state.chordViewMode === "shapes";
}

function getActiveRootNote() {
  return state.highlightMode === "chord" ? state.selectedChordRoot : state.selectedScaleRoot;
}

function getCurrentNoteSet() {
  if (state.highlightMode === "chord") {
    return getChordNotes(state.selectedChordRoot, state.selectedChordType, state.noteNaming);
  }
  if (state.highlightMode === "scale") {
    return getScaleNotes(state.selectedScaleRoot, state.selectedScaleType, state.noteNaming);
  }
  if (state.highlightMode === "all") {
    return getChromaticScale(state.noteNaming);
  }
  return state.visibleNotes.map((note) => normalizeNoteName(note, state.noteNaming));
}

function buildChordShapeCacheKey(root, chordType, fretCount) {
  return [
    state.tuningOctaves.join("|"),
    state.noteNaming,
    root,
    chordType,
    state.chordResultMode,
    String(state.capo),
    String(fretCount),
    state.fretFocusMode,
    String(state.fretRangeStart),
    String(state.fretRangeEnd),
  ].join("::");
}

function getChordSearchWindows(fretCount) {
  if (state.fretFocusMode === "position" || state.fretFocusMode === "custom") {
    return [{ start: state.fretRangeStart, end: state.fretRangeEnd }];
  }

  const firstWindowStart = Math.max(1, state.capo || 1);
  const windows = [];
  for (let start = firstWindowStart; start <= fretCount; start += 1) {
    windows.push({ start, end: Math.min(start + CHORD_WINDOW_SPAN - 1, fretCount) });
  }
  return windows;
}

function getStringChordCandidates(openNoteWithOctave, stringIndex, chordNoteSet, root, mode, window) {
  const candidates = [
    {
      stringIndex,
      state: "mute",
      relativeFret: null,
      physicalFret: null,
      noteName: null,
      interval: null,
    },
  ];

  const openNoteName = getOpenNoteWithCapo(openNoteWithOctave).replace(/\d+$/, "");
  if (chordNoteSet.has(openNoteName)) {
    candidates.push({
      stringIndex,
      state: "open",
      relativeFret: 0,
      physicalFret: state.capo || 0,
      noteName: openNoteName,
      interval: getChordIntervalValue(openNoteName, root, mode),
    });
  }

  const openMidi = toMidiNumber(openNoteWithOctave);
  const startPhysicalFret = Math.max(state.capo ? state.capo + 1 : 1, window.start);
  for (let physicalFret = startPhysicalFret; physicalFret <= window.end; physicalFret += 1) {
    const noteName = fromMidiNumber(openMidi + physicalFret, mode).replace(/\d+$/, "");
    if (!chordNoteSet.has(noteName)) {
      continue;
    }
    candidates.push({
      stringIndex,
      state: "fretted",
      relativeFret: physicalFret - state.capo,
      physicalFret,
      noteName,
      interval: getChordIntervalValue(noteName, root, mode),
    });
  }

  return candidates;
}

function getMutedInnerStringCount(strings) {
  const soundingIndexes = strings.filter((item) => item.state !== "mute").map((item) => item.stringIndex);
  if (!soundingIndexes.length) {
    return 0;
  }
  const minIndex = Math.min(...soundingIndexes);
  const maxIndex = Math.max(...soundingIndexes);
  let mutedInside = 0;
  for (let index = minIndex; index <= maxIndex; index += 1) {
    if (strings[index].state === "mute") {
      mutedInside += 1;
    }
  }
  return mutedInside;
}

function getShapeBarreFret(strings) {
  const groups = new Map();
  strings
    .filter((item) => item.state === "fretted" && item.physicalFret !== null)
    .forEach((item) => {
      if (!groups.has(item.physicalFret)) {
        groups.set(item.physicalFret, []);
      }
      groups.get(item.physicalFret).push(item.stringIndex);
    });

  let barreFret = null;
  groups.forEach((stringIndexes, fret) => {
    const sorted = [...stringIndexes].sort((a, b) => a - b);
    let longestRun = 1;
    let currentRun = 1;
    for (let index = 1; index < sorted.length; index += 1) {
      if (sorted[index] === sorted[index - 1] + 1) {
        currentRun += 1;
        longestRun = Math.max(longestRun, currentRun);
      } else {
        currentRun = 1;
      }
    }
    if (longestRun >= 2 && (barreFret === null || fret < barreFret)) {
      barreFret = fret;
    }
  });
  return barreFret;
}

function hasUnplayableBarreConflict(strings, barreFret) {
  if (barreFret === null) {
    return false;
  }

  return strings.some((item) => item.state === "fretted" && item.physicalFret !== null && item.physicalFret < barreFret);
}

function getShapeJumpScore(strings) {
  const relativeFrets = strings.filter((item) => item.state !== "mute").map((item) => item.relativeFret || 0);
  if (relativeFrets.length < 2) {
    return 0;
  }
  let totalJump = 0;
  for (let index = 1; index < relativeFrets.length; index += 1) {
    totalJump += Math.abs(relativeFrets[index] - relativeFrets[index - 1]);
  }
  return totalJump;
}

function getShapeLowestSoundingString(strings) {
  return strings.find((item) => item.state !== "mute") || null;
}

function getShapeHasRootInBass(strings) {
  return getShapeLowestSoundingString(strings)?.interval === 0;
}

function getUniquePitchClassCount(strings) {
  return new Set(strings.filter((item) => item.state !== "mute").map((item) => item.noteName)).size;
}

function getRedundantDoublings(strings, requiredIntervals) {
  const soundingCount = strings.filter((item) => item.state !== "mute").length;
  const intervalSetCount = new Set(strings.filter((item) => item.state !== "mute").map((item) => item.interval)).size;
  return Math.max(0, soundingCount - Math.max(requiredIntervals.length, intervalSetCount));
}

function getOpenRedundantDoublings(strings) {
  const openSounding = strings.filter((item) => item.state === "open");
  if (openSounding.length <= 1) {
    return 0;
  }
  const uniqueOpenNotes = new Set(openSounding.map((item) => item.noteName)).size;
  return Math.max(0, openSounding.length - uniqueOpenNotes);
}

function getVoicingClass(shape) {
  if (shape.soundingCount <= 3) {
    return "triad";
  }
  if (shape.soundingCount === 4 && shape.uniquePitchClassCount <= 4) {
    return "shell";
  }
  return "full";
}

function getShapeFamilyTag(shape) {
  const lowestString = getShapeLowestSoundingString(shape.strings);
  if (shape.openCount >= 2 && shape.anchorFret <= 5) {
    return "open";
  }
  if (shape.hasBarre && lowestString?.stringIndex === 0) {
    return "barre-e";
  }
  if (shape.hasBarre && lowestString?.stringIndex === 1) {
    return "barre-a";
  }
  if (shape.voicingClass === "shell") {
    return "shell";
  }
  if (shape.voicingClass === "triad" && shape.anchorFret >= 5) {
    return "upper-triad";
  }
  if (shape.anchorFret <= 7) {
    return "caged-like";
  }
  return "other";
}

function getShapeGeometryKey(shape) {
  const soundingStrings = shape.strings.filter((item) => item.state !== "mute");
  const relativeFrets = soundingStrings.map((item) => item.relativeFret ?? 0).join("-");
  const stringIndexes = soundingStrings.map((item) => item.stringIndex).join("-");
  const intervals = [...shape.intervals].sort((a, b) => a - b).join("-");
  const bassInterval = soundingStrings[0]?.interval ?? "x";
  return `${stringIndexes}::${relativeFrets}::${intervals}::${bassInterval}`;
}

function getPlayabilityTier(shape) {
  if (shape.fretSpan <= 2 && shape.jumpScore <= 6 && shape.mutedCount <= 1 && shape.innerMutedCount === 0) {
    return "high";
  }
  if (shape.fretSpan <= 2 && shape.jumpScore <= 9 && shape.mutedCount <= 2) {
    return "medium";
  }
  return "low";
}

function decorateChordShape(shape, requiredIntervals) {
  shape.hasRootInBass = getShapeHasRootInBass(shape.strings);
  shape.uniquePitchClassCount = getUniquePitchClassCount(shape.strings);
  shape.redundantDoublings = getRedundantDoublings(shape.strings, requiredIntervals);
  shape.openRedundantDoublings = getOpenRedundantDoublings(shape.strings);
  shape.voicingClass = getVoicingClass(shape);
  shape.familyTag = getShapeFamilyTag(shape);
  shape.playabilityTier = getPlayabilityTier(shape);
  shape.geometryKey = getShapeGeometryKey(shape);
  return shape;
}

function scoreChordShape(shape, fretCenter) {
  let score = 100;
  if (shape.lowestInterval === 0) {
    score += 22;
  }
  score += shape.requiredCoverage * 6;
  score += shape.openCount * 7;
  score += shape.soundingCount * 5;
  score += Math.max(0, shape.soundingCount - 3) * 7;
  score += shape.hasRootInBass ? 26 : -8;
  score += CHORD_FAMILY_SCORE[shape.familyTag] || 0;
  score += shape.playabilityTier === "high" ? 12 : shape.playabilityTier === "medium" ? 5 : 0;
  score += shape.voicingClass === "full" ? 6 : shape.voicingClass === "shell" ? 3 : 0;
  score += shape.uniquePitchClassCount >= 4 ? 5 : shape.uniquePitchClassCount === 3 ? 2 : 0;
  score -= shape.mutedCount * 4;
  score -= shape.innerMutedCount * 7;
  score -= shape.jumpScore * 2.4;
  score -= shape.redundantDoublings * 5;
  score -= shape.openRedundantDoublings * 8;
  score -= Math.max(0, shape.fretSpan - 3) * 8;
  score -= shape.fingerEstimate * 3;
  score -= shape.hasBarre ? 6 : 0;
  score -= Math.max(0, shape.maxRelativeFret - 12) * 0.5;
  if (shape.soundingCount < 4) {
    score -= 18;
  }
  if (shape.mutedCount >= 3) {
    score -= 12;
  }
  if (shape.familyTag === "other") {
    score -= 10;
  }
  if (typeof fretCenter === "number" && shape.anchorFret > 0) {
    score -= Math.abs(shape.anchorFret - fretCenter) * 0.45;
  } else {
    score -= shape.anchorFret * 4.6;
    if (shape.anchorFret > 0 && shape.anchorFret <= 5) {
      score += 14;
    }
    if (shape.anchorFret > 0 && shape.anchorFret <= 3) {
      score += 8;
    }
  }
  return score;
}

function buildChordShape(strings, root, chordType, mode, fretCenter) {
  const soundingStrings = strings.filter((item) => item.state !== "mute");
  if (soundingStrings.length < 3) {
    return null;
  }

  const intervalSet = new Set(soundingStrings.map((item) => item.interval));
  const requiredIntervals = getChordRequiredIntervals(chordType);
  const requiredCoverage = requiredIntervals.filter((interval) => intervalSet.has(interval)).length;
  if (requiredCoverage !== requiredIntervals.length) {
    return null;
  }

  const physicalFrets = soundingStrings
    .filter((item) => item.relativeFret > 0 && item.physicalFret !== null)
    .map((item) => item.physicalFret);
  const minPhysicalFret = physicalFrets.length ? Math.min(...physicalFrets) : 0;
  const maxPhysicalFret = physicalFrets.length ? Math.max(...physicalFrets) : 0;
  const fretSpan = physicalFrets.length ? maxPhysicalFret - minPhysicalFret : 0;
  if (fretSpan > CHORD_MAX_PLAYABLE_SPAN) {
    return null;
  }

  const barreFret = getShapeBarreFret(strings);
  if (hasUnplayableBarreConflict(strings, barreFret)) {
    return null;
  }
  const uniqueFretted = new Set(physicalFrets);
  const fingerEstimate = uniqueFretted.size;
  if (fingerEstimate > 4 && barreFret === null) {
    return null;
  }

  const notation = strings
    .map((item) => {
      if (item.state === "mute") {
        return "x";
      }
      return String(item.relativeFret);
    })
    .join(" ");

  const openCount = strings.filter((item) => item.state === "open").length;
  const mutedCount = strings.filter((item) => item.state === "mute").length;
  const innerMutedCount = getMutedInnerStringCount(strings);
  if (mutedCount > 3 || innerMutedCount > 1) {
    return null;
  }
  const jumpScore = getShapeJumpScore(strings);
  if (jumpScore > 12) {
    return null;
  }
  const lowestInterval = soundingStrings[0]?.interval ?? null;
  const anchorFret = minPhysicalFret || state.capo || 0;
  const hasBarre = barreFret !== null;
  const difficulty = hasBarre ? "Barre" : fretSpan >= 4 || fingerEstimate >= 4 ? "Stretch" : openCount >= 1 && fretSpan <= 3 ? "Easy" : "Medium";

  const shape = {
    id: `${notation}:${strings.map((item) => item.state[0]).join("")}`,
    strings,
    notation,
    notes: soundingStrings.map((item) => item.noteName),
    intervals: [...intervalSet].sort((a, b) => a - b),
    soundingCount: soundingStrings.length,
    mutedCount,
    innerMutedCount,
    jumpScore,
    openCount,
    fretSpan,
    fingerEstimate,
    lowestInterval,
    anchorFret,
    maxRelativeFret: Math.max(...soundingStrings.map((item) => item.relativeFret || 0)),
    requiredCoverage,
    hasBarre,
    barreFret,
    difficulty,
    hasRootInBass: false,
    uniquePitchClassCount: 0,
    redundantDoublings: 0,
    openRedundantDoublings: 0,
    voicingClass: "full",
    familyTag: "other",
    playabilityTier: "low",
    geometryKey: "",
    score: 0,
  };
  decorateChordShape(shape, requiredIntervals);
  shape.score = scoreChordShape(shape, fretCenter);
  return shape;
}

function dedupeChordShapes(shapes) {
  const byGeometry = new Map();
  shapes.forEach((shape) => {
    const existing = byGeometry.get(shape.geometryKey);
    if (!existing || shape.score > existing.score) {
      byGeometry.set(shape.geometryKey, shape);
    }
  });

  const byVoicing = new Map();
  [...byGeometry.values()].forEach((shape) => {
    const key = `${shape.familyTag}::${shape.intervals.join("-")}::${shape.hasRootInBass ? "bass-root" : "no-bass-root"}::${shape.anchorFret}`;
    const existing = byVoicing.get(key);
    if (
      !existing ||
      shape.score > existing.score ||
      (shape.score === existing.score && shape.redundantDoublings < existing.redundantDoublings)
    ) {
      byVoicing.set(key, shape);
    }
  });

  return [...byVoicing.values()];
}

function getChordResultLimit(mode) {
  if (mode === "common") {
    return CHORD_COMMON_LIMIT;
  }
  if (mode === "extended") {
    return CHORD_EXTENDED_LIMIT;
  }
  return CHORD_ALL_LIMIT;
}

function selectDiverseChordShapes(shapes, mode) {
  if (mode === "all") {
    return shapes.slice(0, CHORD_ALL_LIMIT);
  }

  const limit = getChordResultLimit(mode);
  const familyLimit = mode === "common" ? 2 : 3;
  const upperLimit = mode === "common" ? 2 : 3;
  const selected = [];
  const familyCounts = new Map();
  let upperCount = 0;

  for (const shape of shapes) {
    if (selected.length >= limit) {
      break;
    }
    const familyCount = familyCounts.get(shape.familyTag) || 0;
    const isUpper = shape.anchorFret >= 7;
    if (familyCount >= familyLimit) {
      continue;
    }
    if (isUpper && upperCount >= upperLimit) {
      continue;
    }
    selected.push(shape);
    familyCounts.set(shape.familyTag, familyCount + 1);
    if (isUpper) {
      upperCount += 1;
    }
  }

  if (selected.length < limit) {
    for (const shape of shapes) {
      if (selected.length >= limit) {
        break;
      }
      if (selected.some((item) => item.id === shape.id)) {
        continue;
      }
      selected.push(shape);
    }
  }

  return selected;
}

function generateChordShapes(root, chordType, mode, fretCount) {
  const cacheKey = buildChordShapeCacheKey(root, chordType, fretCount);
  if (chordShapeCache.has(cacheKey)) {
    return chordShapeCache.get(cacheKey);
  }

  const chordNoteSet = new Set(getChordNotes(root, chordType, mode));
  const windows = getChordSearchWindows(fretCount);
  const dedupedShapes = new Map();
  const activeRangeCenter =
    state.fretFocusMode === "off" ? null : state.fretRangeStart + (state.fretRangeEnd - state.fretRangeStart) / 2;

  windows.forEach((window) => {
    const candidatesByString = state.tuningOctaves.map((openNote, stringIndex) =>
      getStringChordCandidates(openNote, stringIndex, chordNoteSet, root, mode, window)
    );

    const recurse = (stringIndex, currentStrings, currentFretted) => {
      if (stringIndex === candidatesByString.length) {
        const shape = buildChordShape(currentStrings, root, chordType, mode, activeRangeCenter);
        if (!shape) {
          return;
        }
        const existing = dedupedShapes.get(shape.notation);
        if (!existing || shape.score > existing.score) {
          dedupedShapes.set(shape.notation, shape);
        }
        return;
      }

      const remainingStrings = candidatesByString.length - stringIndex - 1;
      const soundingCount = currentStrings.filter((item) => item.state !== "mute").length;
      if (soundingCount + remainingStrings + 1 < 3) {
        return;
      }

      candidatesByString[stringIndex].forEach((candidate) => {
        const nextFretted = candidate.state === "fretted" ? [...currentFretted, candidate.physicalFret] : currentFretted;
        if (nextFretted.length) {
          const minFret = Math.min(...nextFretted);
          const maxFret = Math.max(...nextFretted);
          if (maxFret - minFret > CHORD_WINDOW_SPAN) {
            return;
          }
        }
        recurse(stringIndex + 1, [...currentStrings, candidate], nextFretted);
      });
    };

    recurse(0, [], []);
  });

  const shapes = dedupeChordShapes([...dedupedShapes.values()]).sort((a, b) => b.score - a.score);
  const limitedShapes = selectDiverseChordShapes(shapes, state.chordResultMode);
  chordShapeCache.set(cacheKey, limitedShapes);
  return limitedShapes;
}

function getChordShapes(root = state.selectedChordRoot, chordType = state.selectedChordType, mode = state.noteNaming, fretCount = getRenderableFretCount()) {
  return generateChordShapes(root, chordType, mode, fretCount);
}

function getSelectedChordShape() {
  const shapes = getChordShapes();
  if (!shapes.length) {
    state.selectedChordShapeIndex = 0;
    return null;
  }
  state.selectedChordShapeIndex = Math.min(state.selectedChordShapeIndex, shapes.length - 1);
  return shapes[state.selectedChordShapeIndex];
}

function getMaxRenderableFretCount() {
  return getRenderableFretCount();
}

function applyFocusPositionRange() {
  const maxFret = getMaxRenderableFretCount();
  const start = Math.min(Math.max(1, state.fretFocusPosition), maxFret);
  state.fretFocusPosition = start;
  state.fretRangeStart = start;
  state.fretRangeEnd = Math.min(start + 3, maxFret);
}

function resetFretFocus() {
  state.fretFocusMode = "off";
  state.fretFocusPosition = 1;
  state.fretRangeStart = 1;
  state.fretRangeEnd = getMaxRenderableFretCount();
}

function clampFretRange() {
  const maxFret = getRenderableFretCount();
  if (state.fretFocusMode === "off") {
    state.fretRangeStart = 1;
    state.fretRangeEnd = maxFret;
    return;
  }
  if (state.fretFocusMode === "position") {
    applyFocusPositionRange();
    return;
  }
  state.fretRangeStart = Math.min(Math.max(1, state.fretRangeStart), maxFret);
  state.fretRangeEnd = Math.min(Math.max(1, state.fretRangeEnd), maxFret);
  if (state.fretRangeStart > state.fretRangeEnd) {
    state.fretRangeEnd = state.fretRangeStart;
  }
}

function isFretInRange(fretIndex) {
  if (state.fretFocusMode === "off") {
    return true;
  }
  return fretIndex >= state.fretRangeStart && fretIndex <= state.fretRangeEnd;
}

function syncVisibleNotesForMode() {
  clampFretRange();
  if (state.highlightMode === "chord") {
    state.visibleNotes = getChordNotes(state.selectedChordRoot, state.selectedChordType, state.noteNaming);
    return;
  }
  if (state.highlightMode === "all") {
    state.visibleNotes = [...getChromaticScale(state.noteNaming)];
    return;
  }
  if (state.highlightMode === "scale") {
    state.visibleNotes = getScaleNotes(state.selectedScaleRoot, state.selectedScaleType, state.noteNaming);
    return;
  }
  state.visibleNotes = state.visibleNotes.map((note) => normalizeNoteName(note, state.noteNaming));
}

function updateNoteNaming(mode) {
  state.noteNaming = mode;
  state.tuningNotes = state.tuningNotes.map((note) => normalizeNoteName(note, mode));
  state.tuningOctaves = state.tuningOctaves.map((noteWithOctave) => {
    const noteName = noteWithOctave.replace(/\d+$/, "");
    const octave = noteWithOctave.replace(/^[A-G][b#]?/, "");
    return `${normalizeNoteName(noteName, mode)}${octave}`;
  });
  state.selectedScaleRoot = normalizeNoteName(state.selectedScaleRoot, mode);
  state.selectedChordRoot = normalizeNoteName(state.selectedChordRoot, mode);
  state.savedTunings = state.savedTunings.map((tuning) => ({
    ...tuning,
    notes: tuning.notes.map((note) => normalizeNoteName(note, mode)),
    octaves: tuning.octaves.map((noteWithOctave) => {
      const noteName = noteWithOctave.replace(/\d+$/, "");
      const octave = noteWithOctave.replace(/^[A-G][b#]?/, "");
      return `${normalizeNoteName(noteName, mode)}${octave}`;
    }),
  }));
  const tokens = state.tuningDraftNotesText.trim().split(/\s+/).filter(Boolean);
  if (tokens.length === 6) {
    try {
      state.tuningDraftNotesText = normalizeTuningTokens(tokens, mode).join(" ");
    } catch (error) {
      /* keep incomplete draft as-is */
    }
  }
  syncVisibleNotesForMode();
}

function isMobileViewport() {
  return window.matchMedia(MOBILE_MEDIA_QUERY).matches;
}

function getRenderableFretCount() {
  return isMobileViewport() ? Math.min(state.fretCount, MOBILE_MAX_FRET_COUNT) : state.fretCount;
}

function getAvailableFretCounts() {
  return isMobileViewport() ? MOBILE_FRET_COUNTS : DESKTOP_FRET_COUNTS;
}

function getFretSegmentPercentages(fretCount, scaleLength = 25.5) {
  const positions = [];
  for (let fret = 1; fret <= fretCount; fret += 1) {
    positions.push(scaleLength - scaleLength / 2 ** (fret / 12));
  }
  const totalSpan = positions[positions.length - 1] || 1;
  let previous = 0;
  return positions.map((position, index) => {
    const segment = position - previous;
    previous = position;
    return {
      fret: index + 1,
      percent: (segment / totalSpan) * 100,
      ratio: segment / (positions[0] || segment || 1),
    };
  });
}

function getIntervalLabel(noteName, root, mode) {
  const noteSemitone = NOTE_TO_SEMITONE[normalizeNoteName(noteName, mode)];
  const rootSemitone = NOTE_TO_SEMITONE[normalizeNoteName(root, mode)];
  return INTERVAL_LABELS[(noteSemitone - rootSemitone + 12) % 12];
}

function getNoteHue(noteName, rootNote = getActiveRootNote()) {
  if (state.noteColorMode !== "degree") {
    return null;
  }
  const noteSemitone = NOTE_TO_SEMITONE[normalizeNoteName(noteName, state.noteNaming)];
  const rootSemitone = NOTE_TO_SEMITONE[normalizeNoteName(rootNote, state.noteNaming)];
  return ((noteSemitone - rootSemitone + 12) % 12) * 30;
}

function shouldHighlightRoot(noteName) {
  const normalized = normalizeNoteName(noteName, state.noteNaming);
  const root = normalizeNoteName(getActiveRootNote(), state.noteNaming);
  return (state.noteDisplayMode === "intervals" || state.highlightMode === "scale" || state.highlightMode === "chord") && normalized === root;
}

function isNoteVisible(noteName) {
  if (state.highlightMode === "chord") {
    return getCurrentNoteSet().includes(noteName);
  }
  return state.highlightMode === "all" ? true : state.visibleNotes.includes(noteName);
}

function getDisplayHtml(noteName) {
  if (state.noteDisplayMode === "intervals") {
    return formatLabelWithAccidentals(getIntervalLabel(noteName, getActiveRootNote(), state.noteNaming));
  }
  return formatLabelWithAccidentals(noteName);
}

function getChordShapeStringMap(shape) {
  return new Map((shape?.strings || []).map((item) => [item.stringIndex, item]));
}

function getFretboardNotes(tuningOctaves, fretCount, mode) {
  return tuningOctaves.map((openNote, stringIndex) => {
    const notes = [];
    const openMidi = toMidiNumber(openNote);
    for (let fret = 1; fret <= fretCount; fret += 1) {
      const noteWithOctave = fromMidiNumber(openMidi + fret, mode);
      const noteName = noteWithOctave.replace(/\d+$/, "");
      notes.push({
        noteWithOctave,
        noteName,
        displayHtml: getDisplayHtml(noteName),
        stringIndex,
        fretIndex: fret,
        isVisible: isNoteVisible(noteName) && isFretInRange(fret),
        isRoot: shouldHighlightRoot(noteName),
        hue: getNoteHue(noteName),
      });
    }
    return notes;
  });
}

function createButton({ label, className = "", isActive = false, isDimmed = false, isDisabled = false, onClick }) {
  const button = document.createElement("button");
  button.type = "button";
  button.textContent = label;
  button.className = className;
  if (isActive) {
    button.classList.add("is-active");
  }
  if (isDimmed) {
    button.classList.add("is-dimmed");
  }
  if (isDisabled) {
    button.disabled = true;
  }
  button.addEventListener("click", onClick);
  return button;
}

function openModal(modalId) {
  state.activeModal = modalId;
  state.languageMenuOpen = false;
  render();
}

function openSettingsModal() {
  openModal("settings");
}

function openHelpModal() {
  openModal("help");
}

function closeSettingsModal() {
  if (!state.activeModal) {
    return;
  }
  state.activeModal = "";
  render();
}

function buildLanguageSwitcher(extraClass = "") {
  const switcher = document.createElement("div");
  switcher.className = `language-switcher${state.languageMenuOpen ? " is-open" : ""}${extraClass ? ` ${extraClass}` : ""}`;

  const trigger = document.createElement("button");
  trigger.type = "button";
  trigger.className = "language-trigger";
  trigger.setAttribute("aria-haspopup", "menu");
  trigger.setAttribute("aria-expanded", state.languageMenuOpen ? "true" : "false");
  trigger.setAttribute("aria-label", "Select language");
  trigger.innerHTML = `
    <span class="language-trigger-copy">
      <span class="language-flag language-flag--${state.language}"></span>
      <span class="language-label">${escapeHtml(LANGUAGES.find((language) => language.id === state.language)?.label || "English")}</span>
    </span>
    <span class="language-caret" aria-hidden="true"></span>
  `;

  const menu = document.createElement("div");
  menu.className = "language-menu";
  menu.setAttribute("role", "menu");
  menu.setAttribute("aria-label", "Languages");

  trigger.addEventListener("click", (event) => {
    event.stopPropagation();
    state.languageMenuOpen = !state.languageMenuOpen;
    render();
  });

  LANGUAGES.forEach((language) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `language-option${language.id === state.language ? " is-active" : ""}`;
    button.setAttribute("role", "menuitemradio");
    button.setAttribute("aria-checked", String(language.id === state.language));
    button.addEventListener("click", () => {
      state.language = language.id;
      state.languageMenuOpen = false;
      render();
    });

    const flag = document.createElement("span");
    flag.className = `language-flag language-flag--${language.id}`;

    const label = document.createElement("span");
    label.className = "language-label";
    label.textContent = language.label;

    const status = document.createElement("span");
    status.className = "language-option-status";
    status.setAttribute("aria-hidden", "true");
    status.textContent = language.id === state.language ? "\u2022" : "";

    button.append(flag, label, status);
    menu.appendChild(button);
  });

  switcher.append(trigger, menu);
  return switcher;
}

function renderHero() {
  if (!heroNode) {
    return;
  }
  document.documentElement.lang = state.language;
  document.title = t("documentTitle");
  if (fretboardPageNode) {
    fretboardPageNode.setAttribute("aria-label", t("fretboardAria"));
  }
  heroNode.innerHTML = `
    <div class="hero-topbar">
      <button type="button" class="eyebrow-button" id="home-button">${escapeHtml(t("homeButton"))}</button>
      <div class="hero-actions">
        <div class="desktop-help-slot"></div>
        <div class="desktop-export-slot"></div>
        <div class="desktop-settings-slot"></div>
        <div class="desktop-language-slot"></div>
      </div>
    </div>
    <h1 id="hero-title">${escapeHtml(t("heroTitle"))}</h1>
    <div class="status-toast-wrap"></div>
  `;
  heroNode.querySelector("#home-button")?.addEventListener("click", () => {
    resetAppView();
    render();
  });
  heroNode.querySelector(".desktop-help-slot")?.appendChild(
    createButton({
      label: t("openHelp"),
      className: "toggle-button toggle-button--quiet settings-launch-button settings-launch-button--icon",
      onClick: openHelpModal,
    })
  );
  heroNode.querySelector(".desktop-export-slot")?.appendChild(
    createButton({
      label: t("exportPng"),
      className: "toggle-button toggle-button--quiet settings-launch-button",
      onClick: () => {
        exportFretboardPng();
      },
    })
  );
  heroNode.querySelector(".desktop-settings-slot")?.appendChild(
    createButton({
      label: t("openSettings"),
      className: "toggle-button toggle-button--quiet settings-launch-button",
      onClick: openSettingsModal,
    })
  );
  heroNode.querySelector(".desktop-language-slot")?.appendChild(buildLanguageSwitcher("language-switcher--desktop"));
  renderToast(heroNode.querySelector(".status-toast-wrap"));
}

function renderMobileRotateButton() {
  if (!mobileRotateButtonNode) {
    return;
  }
  const isClockwise = state.mobileLabelRotation === "clockwise";
  mobileRotateButtonNode.classList.toggle("is-active", isClockwise);
  mobileRotateButtonNode.setAttribute("aria-pressed", String(isClockwise));
  mobileRotateButtonNode.setAttribute("aria-label", isClockwise ? t("mobileRotateLabelsActive") : t("mobileRotateLabels"));
  mobileRotateButtonNode.setAttribute("title", isClockwise ? t("mobileRotateLabelsActive") : t("mobileRotateLabels"));
  mobileRotateButtonNode.innerHTML = `
    <svg class="mobile-rotate-button__icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M17.65 6.35A7.95 7.95 0 0 0 12 4V1L7 6l5 5V7a5 5 0 0 1 4.24 2.35 5 5 0 0 1-.73 6.29l1.42 1.41a7 7 0 0 0 .72-9.7Z"></path>
      <path d="M12 17a5 5 0 0 1-4.24-2.35 5 5 0 0 1 .73-6.29L7.07 6.95a7 7 0 0 0-.72 9.7A7.95 7.95 0 0 0 12 20v3l5-5-5-5v4Z"></path>
    </svg>
  `;
}

function updateMobileRotateButtonPosition() {
  if (!mobileRotateButtonNode) {
    return;
  }
  if (!isMobileViewport()) {
    mobileRotateButtonNode.style.removeProperty("top");
    mobileRotateButtonNode.style.removeProperty("left");
    return;
  }

  const guitarWrapNode = mobileRotateButtonNode.parentElement;
  const nutNode = guitarNode.querySelector(".nut");
  const fretboardNode = guitarNode.querySelector(".fretboard");
  if (!guitarWrapNode || !nutNode || !fretboardNode) {
    return;
  }

  const wrapRect = guitarWrapNode.getBoundingClientRect();
  const nutRect = nutNode.getBoundingClientRect();
  const fretboardRect = fretboardNode.getBoundingClientRect();
  const buttonWidth = mobileRotateButtonNode.offsetWidth || 36;
  const topOffset = Math.max(0, Math.round(Math.min(nutRect.top, fretboardRect.top) - wrapRect.top));
  const leftOffset = Math.max(6, Math.round(nutRect.left - wrapRect.left - buttonWidth - 10));

  mobileRotateButtonNode.style.top = `${topOffset}px`;
  mobileRotateButtonNode.style.left = `${leftOffset}px`;
}

function renderToast(targetNode) {
  if (!targetNode) {
    return;
  }
  targetNode.innerHTML = "";
  if (!state.messageKey) {
    return;
  }
  const toast = document.createElement("div");
  toast.className = `status-toast ${state.messageType || "is-success"}`;
  toast.textContent = getMessageText();
  targetNode.appendChild(toast);
}

function setupGlobalListeners() {
  document.addEventListener("click", (event) => {
    if (!state.languageMenuOpen) {
      return;
    }
    if (!(event.target instanceof Element) || !event.target.closest(".language-switcher")) {
      state.languageMenuOpen = false;
      render();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") {
      return;
    }
    if (state.activeModal) {
      closeSettingsModal();
      return;
    }
    if (state.languageMenuOpen) {
      state.languageMenuOpen = false;
      render();
    }
  });

  mobileRotateButtonNode?.addEventListener("click", () => {
    state.mobileLabelRotation = state.mobileLabelRotation === "clockwise" ? "upright" : "clockwise";
    render();
  });
}

function buildSavedTuningsMarkup() {
  if (!state.savedTunings.length) {
    return `<p class="saved-tunings-empty">${escapeHtml(t("noSavedTunings"))}</p>`;
  }
  return state.savedTunings
    .map((tuning) => {
      const isActive = state.tuningId === `saved:${tuning.id}`;
      return `
        <div class="saved-tuning-row${isActive ? " is-active" : ""}">
          <button type="button" class="saved-tuning-apply${isActive ? " is-active" : ""}" data-saved-apply="${escapeHtml(tuning.id)}">
            <span class="saved-tuning-label">${escapeHtml(tuning.label)}</span>
            <span class="saved-tuning-notes">${escapeHtml(tuning.octaves.join(" "))}</span>
          </button>
          <button type="button" class="saved-tuning-delete" data-saved-delete="${escapeHtml(tuning.id)}">${escapeHtml(t("deleteSaved"))}</button>
        </div>
      `;
    })
    .join("");
}

function buildCardHeader(title, copy) {
  return `
    <div class="control-card-header">
      <h2>${escapeHtml(title)}</h2>
      <p class="control-card-copy">${escapeHtml(copy)}</p>
    </div>
  `;
}

function buildSectionLabel(text) {
  return `<div class="control-section-label">${escapeHtml(text)}</div>`;
}

function isMobileCardExpanded(cardId) {
  return !isMobileViewport() || state.mobileExpandedCards.includes(cardId);
}

function toggleMobileCard(cardId) {
  if (!isMobileViewport()) {
    return;
  }
  if (state.mobileExpandedCards.includes(cardId)) {
    state.mobileExpandedCards = state.mobileExpandedCards.filter((id) => id !== cardId);
  } else {
    state.mobileExpandedCards = [...state.mobileExpandedCards, cardId];
  }
  render();
}

function enhanceMobileCard(cardNode, cardId) {
  if (!cardNode) {
    return;
  }

  cardNode.dataset.mobileCard = cardId;
  const header = cardNode.querySelector(".control-card-header");
  if (!header) {
    return;
  }

  const body = document.createElement("div");
  body.className = "control-card-body";
  const expanded = isMobileCardExpanded(cardId);
  body.hidden = !expanded;

  while (header.nextSibling) {
    body.appendChild(header.nextSibling);
  }

  const toggle = document.createElement("button");
  toggle.type = "button";
  toggle.className = "control-card-toggle control-card-header";
  toggle.setAttribute("aria-expanded", String(expanded));
  toggle.setAttribute("data-card-toggle", cardId);
  toggle.innerHTML = `
    <span class="control-card-toggle-copy">
      ${header.innerHTML}
    </span>
    <span class="control-card-toggle-indicator" aria-hidden="true"></span>
  `;
  toggle.addEventListener("click", () => toggleMobileCard(cardId));

  header.replaceWith(toggle);
  cardNode.appendChild(body);
}

function getFretFocusSummary() {
  if (state.fretFocusMode === "position") {
    return t("fretFocusSummaryPosition", { start: state.fretRangeStart, end: state.fretRangeEnd });
  }
  if (state.fretFocusMode === "custom") {
    return t("fretFocusSummaryCustom", { start: state.fretRangeStart, end: state.fretRangeEnd });
  }
  return t("fretFocusSummaryOff");
}

function renderSettingsModal() {
  const wasOpen = document.body.classList.contains("settings-modal-open");
  document.body.classList.toggle("settings-modal-open", Boolean(state.activeModal));
  document.body.querySelector(".settings-modal")?.remove();

  if (!state.activeModal) {
    return null;
  }

  const isHelpModal = state.activeModal === "help";
  const modal = document.createElement("div");
  modal.className = "settings-modal";
  modal.innerHTML = `
    <div class="settings-modal__backdrop" data-settings-close="true"></div>
    <div class="settings-modal__dialog" role="dialog" aria-modal="true" aria-labelledby="settings-modal-title">
      <div class="settings-modal__header">
        <div class="settings-modal__header-copy">
          <h2 id="settings-modal-title">${escapeHtml(t(isHelpModal ? "sectionHelp" : "sectionSettings"))}</h2>
          <p>${escapeHtml(t(isHelpModal ? "sectionHelpHelp" : "sectionSettingsHelp"))}</p>
        </div>
        <button type="button" class="settings-modal__close" aria-label="${escapeHtml(
          t(isHelpModal ? "closeHelp" : "closeSettings")
        )}">&times;</button>
      </div>
      <div class="card-stack settings-modal__content${isHelpModal ? " settings-modal__content--help" : ""}">
        ${
          isHelpModal
            ? `
        <p class="settings-help-intro">${escapeHtml(t("helpIntro"))}</p>
        <div class="settings-help-list">
          <article class="settings-help-item">
            <h3>${escapeHtml(t("helpStep1Title"))}</h3>
            <p>${escapeHtml(t("helpStep1Body"))}</p>
          </article>
          <article class="settings-help-item">
            <h3>${escapeHtml(t("helpStep2Title"))}</h3>
            <p>${escapeHtml(t("helpStep2Body"))}</p>
          </article>
          <article class="settings-help-item">
            <h3>${escapeHtml(t("helpStep3Title"))}</h3>
            <p>${escapeHtml(t("helpStep3Body"))}</p>
          </article>
          <article class="settings-help-item">
            <h3>${escapeHtml(t("helpStep4Title"))}</h3>
            <p>${escapeHtml(t("helpStep4Body"))}</p>
          </article>
        </div>
        `
            : `
        <div class="display-grid display-grid--compact control-group control-group--primary">
          <div class="field-row">
            <span>${escapeHtml(t("noteNamingLabel"))}</span>
            <div class="toggle-row" id="note-naming-row"></div>
          </div>
          <div class="field-row">
            <span>${escapeHtml(t("noteDisplayLabel"))}</span>
            <div class="toggle-row" id="note-display-row"></div>
          </div>
          <div class="field-row">
            <span>${escapeHtml(t("noteColorLabel"))}</span>
            <div class="toggle-row" id="note-color-row"></div>
          </div>
          <div class="field-row">
            <span>${escapeHtml(t("handednessLabel"))}</span>
            <div class="toggle-row toggle-row--quiet" id="handedness-row"></div>
          </div>
        </div>
        <div class="display-grid display-grid--compact control-group control-group--secondary">
          <div class="field-row">
            <span>${escapeHtml(t("inlayStyleLabel"))}</span>
            <div class="toggle-row toggle-row--quiet" id="inlay-style-row"></div>
          </div>
          <div class="field-row">
            <label for="fret-count">${escapeHtml(t("fretCountLabel"))}</label>
            <select id="fret-count" name="fret-count"></select>
          </div>
          <div class="field-row">
            <span>${escapeHtml(t("fretLayoutLabel"))}</span>
            <div class="toggle-row" id="fret-layout-row"></div>
          </div>
          <div class="field-row">
            <label for="scale-length">${escapeHtml(t("scaleLengthLabel"))}</label>
            <select id="scale-length" name="scale-length">
              <option value="25.5">${escapeHtml(t("scaleLengthStandard"))}</option>
              <option value="24.75">${escapeHtml(t("scaleLengthGibson"))}</option>
              <option value="27">${escapeHtml(t("scaleLengthBaritone"))}</option>
            </select>
          </div>
          <div class="field-row">
            <label for="capo">${escapeHtml(t("capoLabel"))}</label>
            <select id="capo" name="capo"></select>
            <div class="toggle-row toggle-row--quiet" id="capo-actions-row"></div>
          </div>
        </div>
        `
        }
      </div>
    </div>
  `;

  modal.querySelector("[data-settings-close='true']")?.addEventListener("click", closeSettingsModal);
  modal.querySelector(".settings-modal__close")?.addEventListener("click", closeSettingsModal);
  document.body.appendChild(modal);
  if (!wasOpen) {
    requestAnimationFrame(() => modal.querySelector(".settings-modal__close")?.focus());
  }
  return modal;
}

function renderControls() {
  controlsNode.innerHTML = "";
  const availableFretCounts = getAvailableFretCounts();
  const renderedFretCount = getRenderableFretCount();
  const settingsModal = renderSettingsModal();
  const settingsPanel = state.activeModal === "settings" ? settingsModal?.querySelector(".settings-modal__content") || null : null;

  const mobileTitle = document.createElement("section");
  mobileTitle.className = "mobile-hero-title";
  mobileTitle.innerHTML = `
    <div class="mobile-hero-title-topbar">
      <button type="button" class="eyebrow-button" id="mobile-home-button">${escapeHtml(t("homeButton"))}</button>
      <div class="mobile-top-actions">
        <div class="mobile-help-slot"></div>
        <div class="mobile-export-slot"></div>
        <div class="mobile-settings-slot"></div>
      </div>
    </div>
    <h1>${escapeHtml(t("heroTitle"))}</h1>
  `;

  const noteCard = document.createElement("section");
  noteCard.className = "control-card control-card--wide control-card--note";
  noteCard.innerHTML = `
    ${buildCardHeader(t("sectionNotes"), t("sectionNotesHelp"))}
    <div class="control-group control-group--primary">
      <div class="chip-row chip-row--notes" id="note-chip-row"></div>
    </div>
  `;

  const scaleCard = document.createElement("section");
  scaleCard.className = "control-card control-card--half control-card--scale";
  scaleCard.innerHTML = `
    ${buildCardHeader(t("sectionScale"), t("sectionScaleHelp"))}
    <div class="scale-grid control-group control-group--primary">
      <div class="field-row">
        <label for="scale-root">${escapeHtml(t("scaleRootLabel"))}</label>
        <select id="scale-root" name="scale-root"></select>
      </div>
      <div class="field-row">
        <label for="scale-type">${escapeHtml(t("scaleTypeLabel"))}</label>
        <select id="scale-type" name="scale-type"></select>
      </div>
    </div>
    <p class="small-copy" id="scale-summary"></p>
  `;

  const chordCard = document.createElement("section");
  chordCard.className = "control-card control-card--half control-card--chord";
  chordCard.innerHTML = `
    ${buildCardHeader(t("sectionChord"), t("sectionChordHelp"))}
    <div class="chord-workflow-grid">
      <div class="scale-grid control-group control-group--primary chord-picker-stack">
        <div class="field-row chord-root-field">
          <label for="chord-root">${escapeHtml(t("chordRootLabel"))}</label>
          <select id="chord-root" name="chord-root"></select>
        </div>
        <div class="field-row chord-type-field">
          <label for="chord-type">${escapeHtml(t("chordTypeLabel"))}</label>
          <select id="chord-type" name="chord-type"></select>
        </div>
        <div class="field-row field-row--full chord-view-field">
          <span>${escapeHtml(t("chordViewLabel"))}</span>
          <div class="toggle-row" id="chord-view-row"></div>
        </div>
      </div>
      <div class="chord-result-column">
        <div class="control-group control-group--toolbar chord-shape-group">
          <div class="chord-shape-toolbar" id="chord-shape-toolbar"></div>
        </div>
        <p class="small-copy chord-summary-card" id="chord-summary"></p>
        <div class="control-group control-group--secondary chord-voicing-group">
          <div class="field-row field-row--full" id="chord-set-field">
            <span>${escapeHtml(t("chordSetLabel"))}</span>
            <div class="toggle-row toggle-row--quiet" id="chord-set-row"></div>
          </div>
        </div>
      </div>
    </div>
  `;

  const modeCard = document.createElement("section");
  modeCard.className = "control-card control-card--half control-card--mode";
  modeCard.innerHTML = `
    ${buildCardHeader(t("sectionMode"), t("sectionModeHelp"))}
    <div class="card-stack">
      <div class="field-row field-row--full control-group control-group--primary">
        <div class="toggle-row" id="highlight-mode-row"></div>
      </div>
      <div class="field-row field-row--full field-row--actions control-group control-group--utility">
        <div class="toggle-row" id="mode-actions-row"></div>
      </div>
    </div>
  `;

  const focusCard = document.createElement("section");
  focusCard.className = "control-card control-card--half control-card--focus";
  focusCard.innerHTML = `
    ${buildCardHeader(t("fretRangeLabel"), t("sectionFocusHelp"))}
    <div class="card-stack">
      <div class="field-row field-row--full control-group control-group--primary">
        <div class="toggle-row" id="focus-mode-row"></div>
      </div>
      <p class="small-copy small-copy--tight" id="focus-summary">${escapeHtml(getFretFocusSummary())}</p>
      <div class="display-grid display-grid--compact control-group control-group--secondary">
        <div class="field-row">
          <label for="fret-focus-position">${escapeHtml(t("fretFocusPositionLabel"))}</label>
          <select id="fret-focus-position" name="fret-focus-position"></select>
        </div>
        <div class="field-row">
          <label for="fret-range-start">${escapeHtml(t("fretRangeStartLabel"))}</label>
          <select id="fret-range-start" name="fret-range-start"></select>
        </div>
        <div class="field-row">
          <label for="fret-range-end">${escapeHtml(t("fretRangeEndLabel"))}</label>
          <select id="fret-range-end" name="fret-range-end"></select>
        </div>
      </div>
      <div class="field-row field-row--full field-row--actions control-group control-group--utility">
        <div class="toggle-row" id="focus-actions-row"></div>
      </div>
    </div>
  `;

  const tuningCard = document.createElement("section");
  tuningCard.className = "control-card control-card--wide control-card--tuning";
  tuningCard.innerHTML = `
    ${buildCardHeader(t("sectionTunings"), t("sectionTuningsHelp"))}
    <div class="control-group control-group--primary">
      ${buildSectionLabel(t("presetsLabel"))}
      <div class="presets-row" id="preset-tunings"></div>
    </div>
    <div class="control-group control-group--secondary saved-tunings-section">
      <div class="saved-tunings-header">${escapeHtml(t("savedTuningsLabel"))}</div>
      <div class="saved-tunings-list" id="saved-tunings-list">${buildSavedTuningsMarkup()}</div>
    </div>
    <div class="control-group control-group--secondary">
      ${buildSectionLabel(t("customTuningSection"))}
      <div class="custom-grid">
        <div class="field-row">
          <label for="custom-label">${escapeHtml(t("customLabel"))}</label>
          <input id="custom-label" name="custom-label" placeholder="${escapeHtml(t("customLabelPlaceholder"))}" value="${escapeHtml(state.tuningDraftLabel)}" />
        </div>
        <div class="field-row">
          <label for="custom-notes">${escapeHtml(t("customNotes"))}</label>
          <input id="custom-notes" name="custom-notes" placeholder="${escapeHtml(t("customNotesPlaceholder"))}" value="${escapeHtml(state.tuningDraftNotesText)}" />
        </div>
      </div>
      <div class="toggle-row toggle-row--quiet" id="custom-actions"></div>
    </div>
    <p class="message ${state.inlineMessageType}" id="message-area">${escapeHtml(state.inlineMessageText)}</p>
  `;

  const mobileLanguage = document.createElement("section");
  mobileLanguage.className = "mobile-language-footer";
  mobileLanguage.appendChild(buildLanguageSwitcher("language-switcher--mobile"));

  const leftColumn = document.createElement("div");
  leftColumn.className = "controls-column controls-column--left";
  leftColumn.append(chordCard, scaleCard, tuningCard, noteCard);

  const rightColumn = document.createElement("div");
  rightColumn.className = "controls-column controls-column--right";
  rightColumn.append(modeCard, focusCard);

  enhanceMobileCard(chordCard, "chord");
  enhanceMobileCard(scaleCard, "scale");
  enhanceMobileCard(tuningCard, "tuning");
  enhanceMobileCard(noteCard, "notes");
  enhanceMobileCard(modeCard, "mode");
  enhanceMobileCard(focusCard, "focus");

  controlsNode.append(mobileTitle, leftColumn, rightColumn, mobileLanguage);

  mobileTitle.querySelector("#mobile-home-button")?.addEventListener("click", () => {
    resetAppView();
    render();
  });
  mobileTitle.querySelector(".mobile-help-slot")?.appendChild(
    createButton({
      label: t("openHelp"),
      className: "toggle-button toggle-button--quiet settings-launch-button settings-launch-button--mobile settings-launch-button--icon",
      onClick: openHelpModal,
    })
  );
  mobileTitle.querySelector(".mobile-export-slot")?.appendChild(
    createButton({
      label: t("exportPng"),
      className: "toggle-button toggle-button--quiet settings-launch-button settings-launch-button--mobile",
      onClick: () => {
        exportFretboardPng();
      },
    })
  );
  mobileTitle.querySelector(".mobile-settings-slot")?.appendChild(
    createButton({
      label: t("openSettings"),
      className: "toggle-button toggle-button--quiet settings-launch-button settings-launch-button--mobile",
      onClick: openSettingsModal,
    })
  );

  const presetRow = tuningCard.querySelector("#preset-tunings");
  PRESET_TUNINGS.forEach((preset) => {
    presetRow.append(
      createButton({
        label: preset.label,
        className: "preset-button",
        isActive: preset.id === state.tuningId,
        onClick: () => {
          applyPresetTuning(preset.id);
          render();
        },
      })
    );
  });

  tuningCard.querySelectorAll("[data-saved-apply]").forEach((button) => {
    button.addEventListener("click", () => {
      applySavedTuning(button.getAttribute("data-saved-apply"));
      render();
    });
  });

  tuningCard.querySelectorAll("[data-saved-delete]").forEach((button) => {
    button.addEventListener("click", () => {
      const savedId = button.getAttribute("data-saved-delete");
      const saved = getSavedTuningById(savedId);
      if (!saved) {
        return;
      }
      state.savedTunings = state.savedTunings.filter((item) => item.id !== savedId);
      if (state.tuningId === `saved:${savedId}`) {
        applyPresetTuning(defaultTuning.id, false);
      }
      setInlineMessage("", "");
      setMessage("msgSavedDeleted", "is-success", { label: saved.label });
      render();
    });
  });

  const labelInput = tuningCard.querySelector("#custom-label");
  const noteInput = tuningCard.querySelector("#custom-notes");
  const setDraftFromInputs = () => {
    state.tuningDraftLabel = labelInput.value;
    state.tuningDraftNotesText = noteInput.value;
  };

  labelInput.addEventListener("input", setDraftFromInputs);
  noteInput.addEventListener("input", setDraftFromInputs);

  const customActions = tuningCard.querySelector("#custom-actions");
  customActions.append(
    createButton({
      label: t("applyCustom"),
      className: "toggle-button toggle-button--primary",
      onClick: () => {
        try {
          setDraftFromInputs();
          const tuning = buildTuningFromInput(state.tuningDraftLabel, state.tuningDraftNotesText);
          applyTuningObject(tuning, {
            tuningId: "custom",
            withMessage: true,
            messageKey: "msgCustomApplied",
            messageParams: { label: tuning.label },
          });
          setInlineMessage("", "");
          render();
        } catch (error) {
          setInlineMessage(error.message, "is-error");
          render();
        }
      },
    }),
    createButton({
      label: t("saveCustom"),
      className: "toggle-button toggle-button--quiet",
      onClick: () => {
        try {
          setDraftFromInputs();
          const tuning = buildTuningFromInput(state.tuningDraftLabel, state.tuningDraftNotesText);
          const existing = getSavedTuningLabelMatch(tuning.label);
          const savedTuning = {
            id: existing?.id || createSavedTuningId(tuning.label),
            label: tuning.label,
            notes: [...tuning.notes],
            octaves: [...tuning.octaves],
          };
          state.savedTunings = existing
            ? state.savedTunings.map((item) => (item.id === existing.id ? savedTuning : item))
            : [...state.savedTunings, savedTuning];
          applyTuningObject(savedTuning, { tuningId: `saved:${savedTuning.id}` });
          setInlineMessage("", "");
          setMessage("msgTuningSaved", "is-success", { label: savedTuning.label });
          render();
        } catch (error) {
          setInlineMessage(error.message, "is-error");
          render();
        }
      },
    })
  );

  if (settingsPanel) {
    const noteNamingRow = settingsPanel.querySelector("#note-naming-row");
    [
      { id: "flats", label: t("namingFlats") },
      { id: "sharps", label: t("namingSharps") },
    ].forEach((mode) => {
      noteNamingRow.append(
        createButton({
          label: mode.label,
          className: "toggle-button toggle-button--primary",
          isActive: state.noteNaming === mode.id,
          onClick: () => {
            updateNoteNaming(mode.id);
            setMessage(mode.id === "flats" ? "msgFlats" : "msgSharps", "is-success");
            render();
          },
        })
      );
    });

    const noteDisplayRow = settingsPanel.querySelector("#note-display-row");
    [
      { id: "notes", label: t("displayNotes") },
      { id: "intervals", label: t("displayIntervals") },
    ].forEach((mode) => {
      noteDisplayRow.append(
        createButton({
          label: mode.label,
          className: "toggle-button toggle-button--primary",
          isActive: state.noteDisplayMode === mode.id,
          onClick: () => {
            state.noteDisplayMode = mode.id;
            render();
          },
        })
      );
    });

    const noteColorRow = settingsPanel.querySelector("#note-color-row");
    [
      { id: "chromatic", label: t("colorChromatic") },
      { id: "degree", label: t("colorDegree") },
    ].forEach((mode) => {
      noteColorRow.append(
        createButton({
          label: mode.label,
          className: "toggle-button toggle-button--primary",
          isActive: state.noteColorMode === mode.id,
          onClick: () => {
            state.noteColorMode = mode.id;
            render();
          },
        })
      );
    });
  }

  const highlightModeRow = modeCard.querySelector("#highlight-mode-row");
  [
    { id: "all", label: t("highlightAll") },
    { id: "custom", label: t("highlightCustom") },
    { id: "scale", label: t("highlightScale") },
    { id: "chord", label: t("highlightChord") },
  ].forEach((mode) => {
    highlightModeRow.append(
      createButton({
        label: mode.label,
        className: "toggle-button toggle-button--primary",
        isActive: state.highlightMode === mode.id,
        onClick: () => {
          state.highlightMode = mode.id;
          syncVisibleNotesForMode();
          render();
        },
      })
    );
  });

  modeCard.querySelector("#mode-actions-row").append(
    createButton({
      label: t("hideAll"),
      className: "toggle-button toggle-button--quiet",
      onClick: () => {
        state.highlightMode = "custom";
        state.visibleNotes = [];
        setMessage("msgAllHidden", "is-success");
        render();
      },
    }),
    createButton({
      label: t("showAll"),
      className: "toggle-button toggle-button--quiet",
      onClick: () => {
        state.highlightMode = "all";
        syncVisibleNotesForMode();
        setMessage("msgAllShown", "is-success");
        render();
      },
    })
  );

  if (settingsPanel) {
    const handednessRow = settingsPanel.querySelector("#handedness-row");
    [
      { id: "right", label: t("handednessRight") },
      { id: "left", label: t("handednessLeft") },
    ].forEach((mode) => {
      handednessRow.append(
        createButton({
          label: mode.label,
          className: "toggle-button toggle-button--quiet",
          isActive: state.handedness === mode.id,
          onClick: () => {
            state.handedness = mode.id;
            render();
          },
        })
      );
    });

    const inlayStyleRow = settingsPanel.querySelector("#inlay-style-row");
    [
      { id: "dots", label: t("inlayDots") },
      { id: "blocks", label: t("inlayBlocks") },
    ].forEach((mode) => {
      inlayStyleRow.append(
        createButton({
          label: mode.label,
          className: "toggle-button toggle-button--quiet",
          isActive: state.inlayStyle === mode.id,
          onClick: () => {
            state.inlayStyle = mode.id;
            render();
          },
        })
      );
    });

    const fretLayoutRow = settingsPanel.querySelector("#fret-layout-row");
    [
      { id: "chart", label: t("fretLayoutChart") },
      { id: "real", label: t("fretLayoutReal") },
    ].forEach((mode) => {
      fretLayoutRow.append(
        createButton({
          label: mode.label,
          className: "toggle-button toggle-button--primary",
          isActive: state.fretLayout === mode.id,
          onClick: () => {
            state.fretLayout = mode.id;
            render();
          },
        })
      );
    });
  }

  if (settingsPanel) {
    const fretSelect = settingsPanel.querySelector("#fret-count");
    availableFretCounts.forEach((count) => {
      const option = document.createElement("option");
      option.value = String(count);
      option.textContent = String(count);
      option.selected = count === renderedFretCount;
      fretSelect.append(option);
    });
    fretSelect.value = String(renderedFretCount);
    fretSelect.addEventListener("change", (event) => {
      state.fretCount = Number(event.target.value);
      clampFretRange();
      render();
    });
  }

  const focusModeRow = focusCard.querySelector("#focus-mode-row");
  [
    { id: "off", label: t("fretFocusOff") },
    { id: "position", label: t("fretFocusPosition") },
    { id: "custom", label: t("fretFocusCustom") },
  ].forEach((mode) => {
    focusModeRow.append(
      createButton({
        label: mode.label,
        className: "toggle-button toggle-button--primary",
        isActive: state.fretFocusMode === mode.id,
        onClick: () => {
          state.fretFocusMode = mode.id;
          clampFretRange();
          render();
        },
      })
    );
  });

  const focusPositionSelect = focusCard.querySelector("#fret-focus-position");
  const fretRangeStartSelect = focusCard.querySelector("#fret-range-start");
  const fretRangeEndSelect = focusCard.querySelector("#fret-range-end");
  Array.from({ length: renderedFretCount }, (_, index) => index + 1).forEach((fret) => {
    const positionOption = document.createElement("option");
    positionOption.value = String(fret);
    positionOption.textContent = `${fret}`;
    positionOption.selected = fret === state.fretFocusPosition;
    focusPositionSelect.append(positionOption);

    const startOption = document.createElement("option");
    startOption.value = String(fret);
    startOption.textContent = String(fret);
    startOption.selected = fret === state.fretRangeStart;
    fretRangeStartSelect.append(startOption);

    const endOption = document.createElement("option");
    endOption.value = String(fret);
    endOption.textContent = String(fret);
    endOption.selected = fret === state.fretRangeEnd;
    fretRangeEndSelect.append(endOption);
  });
  focusPositionSelect.value = String(state.fretFocusPosition);
  fretRangeStartSelect.value = String(state.fretRangeStart);
  fretRangeEndSelect.value = String(state.fretRangeEnd);
  focusPositionSelect.disabled = state.fretFocusMode !== "position";
  fretRangeStartSelect.disabled = state.fretFocusMode !== "custom";
  fretRangeEndSelect.disabled = state.fretFocusMode !== "custom";
  focusPositionSelect.addEventListener("change", (event) => {
    state.fretFocusMode = "position";
    state.fretFocusPosition = Number(event.target.value);
    clampFretRange();
    render();
  });
  fretRangeStartSelect.addEventListener("change", (event) => {
    state.fretFocusMode = "custom";
    state.fretRangeStart = Number(event.target.value);
    clampFretRange();
    render();
  });
  fretRangeEndSelect.addEventListener("change", (event) => {
    state.fretFocusMode = "custom";
    state.fretRangeEnd = Number(event.target.value);
    clampFretRange();
    render();
  });
  focusCard.querySelector("#focus-actions-row").append(
    createButton({
      label: t("fretFocusReset"),
      className: "toggle-button toggle-button--quiet",
      isDimmed: state.fretFocusMode === "off",
      onClick: () => {
        resetFretFocus();
        render();
      },
    })
  );

  if (settingsPanel) {
    const scaleLengthSelect = settingsPanel.querySelector("#scale-length");
    scaleLengthSelect.value = String(state.scaleLength);
    scaleLengthSelect.addEventListener("change", (event) => {
      state.scaleLength = Number(event.target.value);
      render();
    });

    const capoSelect = settingsPanel.querySelector("#capo");
    CAPO_OPTIONS.forEach((capo) => {
      const option = document.createElement("option");
      option.value = String(capo);
      option.textContent = String(capo);
      option.selected = capo === state.capo;
      capoSelect.append(option);
    });
    capoSelect.value = String(state.capo);
    capoSelect.addEventListener("change", (event) => {
      state.capo = Number(event.target.value);
      render();
    });

    settingsPanel.querySelector("#capo-actions-row").append(
      createButton({
        label: t("capoOff"),
        className: "toggle-button toggle-button--quiet",
        isDimmed: state.capo === 0,
        onClick: () => {
          state.capo = 0;
          render();
        },
      })
    );
  }

  const noteChipRow = noteCard.querySelector("#note-chip-row");
  getChromaticScale(state.noteNaming).forEach((note) => {
    noteChipRow.append(
      createButton({
        label: note,
        className: "chip",
        isActive: state.visibleNotes.includes(note),
        isDimmed: state.highlightMode !== "all" && state.highlightMode !== "custom" && !state.visibleNotes.includes(note),
        onClick: () => {
          state.highlightMode = "custom";
          if (state.visibleNotes.includes(note)) {
            state.visibleNotes = state.visibleNotes.filter((item) => item !== note);
          } else {
            state.visibleNotes = [...state.visibleNotes, note];
          }
          render();
        },
      })
    );
  });

  const scaleRoot = scaleCard.querySelector("#scale-root");
  getChromaticScale(state.noteNaming).forEach((note) => {
    const option = document.createElement("option");
    option.value = note;
    option.textContent = note;
    option.selected = state.selectedScaleRoot === note;
    scaleRoot.append(option);
  });
  scaleRoot.addEventListener("change", (event) => {
    state.selectedScaleRoot = event.target.value;
    if (state.highlightMode === "scale") {
      syncVisibleNotesForMode();
    }
    render();
  });

  const scaleType = scaleCard.querySelector("#scale-type");
  Object.keys(SCALE_PATTERNS).forEach((id) => {
    const option = document.createElement("option");
    option.value = id;
    option.textContent = getScaleLabel(id);
    option.selected = state.selectedScaleType === id;
    scaleType.append(option);
  });
  scaleType.addEventListener("change", (event) => {
    state.selectedScaleType = event.target.value;
    if (state.highlightMode === "scale") {
      syncVisibleNotesForMode();
    }
    render();
  });

  scaleCard.querySelector("#scale-summary").innerHTML = escapeHtml(
    t("scaleSummary", {
      root: state.selectedScaleRoot,
      label: getScaleLabel(state.selectedScaleType),
      notes: getScaleNotes(state.selectedScaleRoot, state.selectedScaleType, state.noteNaming).join(" "),
    })
  );

  const chordRoot = chordCard.querySelector("#chord-root");
  const chordViewRow = chordCard.querySelector("#chord-view-row");
  const chordSetRow = chordCard.querySelector("#chord-set-row");
  [
    { id: "tones", label: t("chordViewTones") },
    { id: "shapes", label: t("chordViewShapes") },
  ].forEach((mode) => {
    chordViewRow.append(
      createButton({
        label: mode.label,
        className: "toggle-button toggle-button--primary",
        isActive: state.chordViewMode === mode.id,
        onClick: () => {
          state.chordViewMode = mode.id;
          state.highlightMode = "chord";
          state.selectedChordShapeIndex = 0;
          syncVisibleNotesForMode();
          render();
        },
      })
    );
  });
  [
    { id: "common", label: t("chordSetCommon") },
    { id: "extended", label: t("chordSetExtended") },
    { id: "all", label: t("chordSetAll") },
  ].forEach((mode) => {
    chordSetRow.append(
      createButton({
        label: mode.label,
        className: "toggle-button toggle-button--quiet",
        isActive: state.chordResultMode === mode.id,
        isDisabled: state.chordViewMode !== "shapes",
        onClick: () => {
          state.chordResultMode = mode.id;
          state.highlightMode = "chord";
          state.selectedChordShapeIndex = 0;
          render();
        },
      })
    );
  });

  getChromaticScale(state.noteNaming).forEach((note) => {
    const option = document.createElement("option");
    option.value = note;
    option.textContent = note;
    option.selected = state.selectedChordRoot === note;
    chordRoot.append(option);
  });
  chordRoot.addEventListener("change", (event) => {
    state.selectedChordRoot = event.target.value;
    state.highlightMode = "chord";
    state.selectedChordShapeIndex = 0;
    syncVisibleNotesForMode();
    render();
  });

  const chordType = chordCard.querySelector("#chord-type");
  Object.keys(CHORD_PATTERNS).forEach((id) => {
    const option = document.createElement("option");
    option.value = id;
    option.textContent = getChordLabel(id);
    option.selected = state.selectedChordType === id;
    chordType.append(option);
  });
  chordType.addEventListener("change", (event) => {
    state.selectedChordType = event.target.value;
    state.highlightMode = "chord";
    state.selectedChordShapeIndex = 0;
    syncVisibleNotesForMode();
    render();
  });

  const chordShapes = getChordShapes(state.selectedChordRoot, state.selectedChordType, state.noteNaming, renderedFretCount);
  const selectedChordShape = chordShapes.length ? getSelectedChordShape() : null;
  const activeShapeIndex = chordShapes.length ? Math.min(state.selectedChordShapeIndex, chordShapes.length - 1) : 0;
  const chordToolbar = chordCard.querySelector("#chord-shape-toolbar");
  if (state.chordViewMode === "shapes") {
    chordToolbar.classList.add("is-active");
    chordToolbar.append(
      createButton({
        label: t("chordShapePrev"),
        className: "toggle-button toggle-button--compact toggle-button--quiet",
        isDisabled: !chordShapes.length,
        isDimmed: state.selectedChordShapeIndex === 0,
        onClick: () => {
          if (!chordShapes.length) {
            return;
          }
          state.selectedChordShapeIndex = Math.max(0, state.selectedChordShapeIndex - 1);
          render();
        },
      })
    );

    const shapeMeta = document.createElement("div");
    shapeMeta.className = "chord-shape-meta";
    if (selectedChordShape) {
      const currentIndex = activeShapeIndex + 1;
      shapeMeta.innerHTML = `
        <span class="chord-shape-counter">${escapeHtml(t("chordShapeCounter", { current: currentIndex, total: chordShapes.length }))}</span>
        <span class="chord-shape-notation">${escapeHtml(selectedChordShape.notation)}</span>
        <span class="chord-shape-difficulty">${escapeHtml(t("chordShapeDifficulty", { level: selectedChordShape.difficulty }))}</span>
      `;
    } else {
      shapeMeta.innerHTML = `<span class="chord-shape-empty">${escapeHtml(t("chordShapeNone"))}</span>`;
    }
    chordToolbar.append(shapeMeta);

    chordToolbar.append(
      createButton({
        label: t("chordShapeNext"),
        className: "toggle-button toggle-button--compact toggle-button--primary",
        isDisabled: !chordShapes.length,
        isDimmed: !chordShapes.length || activeShapeIndex >= chordShapes.length - 1,
        onClick: () => {
          if (!chordShapes.length) {
            return;
          }
          state.selectedChordShapeIndex = Math.min(chordShapes.length - 1, state.selectedChordShapeIndex + 1);
          render();
        },
      })
    );
  }

  chordCard.querySelector("#chord-summary").innerHTML =
    state.chordViewMode === "shapes"
      ? escapeHtml(selectedChordShape ? `${state.selectedChordRoot} ${getChordLabel(state.selectedChordType)}: ${selectedChordShape.notes.join(" ")}` : t("chordShapeNone"))
      : escapeHtml(
          t("chordSummary", {
            root: state.selectedChordRoot,
            label: getChordLabel(state.selectedChordType),
            notes: getChordNotes(state.selectedChordRoot, state.selectedChordType, state.noteNaming).join(" "),
          })
        );
}

function applyResponsiveNoteSizing(fretsNode, renderedFretCount) {
  guitarNode.style.removeProperty("--note-size");
  guitarNode.style.removeProperty("--note-font-size");
  const fretNodes = fretsNode.querySelectorAll(".fret");
  const lastFret = fretNodes[fretNodes.length - 1];
  if (!lastFret) {
    return;
  }
  const lastFretRect = lastFret.getBoundingClientRect();
  const lastFretWidth = isMobileViewport() ? Math.min(lastFretRect.width, lastFretRect.height) : lastFretRect.width;
  if (!lastFretWidth) {
    return;
  }

  let noteSize;
  let noteFontSize;
  if (isMobileViewport()) {
    noteSize = Math.max(20, Math.floor(lastFretWidth * 0.98));
    noteFontSize = Math.min(17, Math.max(10.5, noteSize * 0.42));
  } else if (state.fretLayout === "real" && renderedFretCount >= 21) {
    noteSize = Math.max(16, Math.floor(lastFretWidth));
    noteFontSize = Math.min(16, Math.max(10.5, noteSize * 0.42));
  } else {
    noteSize = 50;
    noteFontSize = 16;
  }

  guitarNode.style.setProperty("--note-size", `${noteSize}px`);
  guitarNode.style.setProperty("--note-font-size", `${noteFontSize}px`);
}

function renderGuitar() {
  const renderedFretCount = getRenderableFretCount();
  clampFretRange();
  const noteGrid = getFretboardNotes(state.tuningOctaves, renderedFretCount, state.noteNaming);
  const reversedOpenNotes = [...state.tuningOctaves]
    .reverse()
    .map((noteWithOctave) => getOpenNoteWithCapo(noteWithOctave).replace(/\d+$/, ""));
  const selectedChordShape = isChordShapeMode() ? getSelectedChordShape() : null;
  const selectedShapeMap = getChordShapeStringMap(selectedChordShape);

  guitarNode.className = `guitar ${state.handedness === "left" ? "left-handed" : "right-handed"}`;
  guitarNode.dataset.fretCount = String(renderedFretCount);
  guitarNode.dataset.inlayStyle = state.inlayStyle;
  guitarNode.dataset.fretLayout = state.fretLayout;
  guitarNode.dataset.capo = String(state.capo);
  guitarNode.dataset.mobileLabelRotation = state.mobileLabelRotation;
  guitarNode.style.width = state.fretLayout === "real" ? `${(state.scaleLength / 25.5) * 100}%` : "100%";
  guitarNode.innerHTML = "";

  const nut = document.createElement("div");
  nut.className = "nut";

  const strings = document.createElement("div");
  strings.className = "strings";

  const fretboard = document.createElement("div");
  fretboard.className = "fretboard";

  const frets = document.createElement("div");
  frets.className = "frets";
  const fretMetrics = getFretSegmentPercentages(renderedFretCount, state.scaleLength);

  if (state.capo > 0) {
    const capoBadge = document.createElement("div");
    capoBadge.className = "capo-badge";
    capoBadge.textContent = t("capoBadge", { capo: state.capo });
    nut.appendChild(capoBadge);
  }

  reversedOpenNotes.forEach((noteName, index) => {
    const string = document.createElement("div");
    string.className = `open-string string-${index + 1}`;
    const shapeString = selectedShapeMap.get(5 - index);
    if (shapeString?.state === "mute") {
      const muteMarker = document.createElement("div");
      muteMarker.className = "string-mute-marker";
      muteMarker.textContent = "X";
      string.appendChild(muteMarker);
    }
    if (state.capo === 0) {
      const isVisible = isChordShapeMode() ? shapeString?.state === "open" : isNoteVisible(noteName);
      const isRoot = shouldHighlightRoot(noteName);
      const hue = getNoteHue(noteName);

      const badge = document.createElement("div");
      badge.className = `open-note${isVisible ? " is-open-active" : ""}${isChordShapeMode() && isVisible ? " is-chord-shape-note" : ""}${isRoot && isVisible ? " is-open-root-note" : ""}`;
      badge.dataset.note = noteName;
      badge.innerHTML = getDisplayHtml(noteName);
      if (typeof hue === "number") {
        badge.style.setProperty("--hue", String(hue));
      }

      string.appendChild(badge);
    }
    nut.appendChild(string);
  });

  for (let fretIndex = 1; fretIndex <= renderedFretCount; fretIndex += 1) {
    const fret = document.createElement("div");
    fret.className = `fret fret-${fretIndex}`;
    fret.dataset.fret = String(fretIndex);
    if (state.capo > 0 && fretIndex <= state.capo) {
      fret.classList.add("is-capo-muted");
    }
    if (!isFretInRange(fretIndex)) {
      fret.classList.add("is-out-of-range");
    }

    if (state.fretLayout === "real") {
      const metric = fretMetrics[fretIndex - 1];
      fret.style.flex = `0 0 ${metric.percent}%`;
      fret.style.width = `${metric.percent}%`;
      fret.style.setProperty("--fret-ratio", String(metric.ratio));
    } else {
      fret.style.flex = "1";
      fret.style.width = "";
      fret.style.setProperty("--fret-ratio", "1");
    }

    if (state.inlayStyle === "blocks") {
      if (BLOCK_MARKER_FRETS.has(fretIndex)) {
        fret.classList.add("has-block-marker");
      }
    } else {
      if (SINGLE_MARKER_FRETS.has(fretIndex)) {
        fret.classList.add("has-marker");
      }
      if (DOUBLE_MARKER_FRETS.has(fretIndex)) {
        fret.classList.add("has-double-marker");
        const doubleMarker = document.createElement("div");
        doubleMarker.className = "double-marker";
        fret.appendChild(doubleMarker);
      }
    }

    for (let stringIndex = 5; stringIndex >= 0; stringIndex -= 1) {
      const note = noteGrid[stringIndex][fretIndex - 1];
      const isBlockedByCapo = state.capo > 0 && fretIndex < state.capo;
      const shapeNote = selectedShapeMap.get(stringIndex);
      const isShapeNote =
        !!shapeNote &&
        shapeNote.state !== "mute" &&
        shapeNote.physicalFret === fretIndex &&
        (shapeNote.state === "fretted" || (shapeNote.state === "open" && state.capo > 0));
      const isVisible = isChordShapeMode() ? isShapeNote : note.isVisible && !isBlockedByCapo;
      const noteNode = document.createElement("div");
      noteNode.className = `note${isVisible ? "" : " is-hidden-note"}${note.isRoot && isVisible ? " is-root-note" : ""}${isShapeNote ? " is-chord-shape-note" : ""}`;
      noteNode.dataset.note = note.noteName;
      noteNode.dataset.noteWithOctave = note.noteWithOctave;
      noteNode.innerHTML = note.displayHtml;
      if (typeof note.hue === "number") {
        noteNode.style.setProperty("--hue", String(note.hue));
      }
      fret.appendChild(noteNode);
    }

    frets.appendChild(fret);
  }

  for (let index = 1; index <= 6; index += 1) {
    const stringLine = document.createElement("div");
    stringLine.className = `string-line string-${index}`;
    strings.appendChild(stringLine);
  }

  if (state.capo > 0 && state.capo <= renderedFretCount) {
    const capoClamp = document.createElement("div");
    capoClamp.className = `capo-clamp capo-clamp--${state.handedness === "left" ? "left" : "right"}`;
    const metricSlice = fretMetrics.slice(0, state.capo);
    const cumulativeBefore = metricSlice.slice(0, -1).reduce((sum, metric) => sum + metric.percent, 0);
    const currentWidth = metricSlice[metricSlice.length - 1]?.percent ?? (100 / renderedFretCount);
    const centerPercent =
      state.fretLayout === "real"
        ? cumulativeBefore + currentWidth * 0.5
        : ((state.capo - 0.5) / renderedFretCount) * 100;
    if (state.handedness === "left") {
      capoClamp.style.right = `${centerPercent}%`;
    } else {
      capoClamp.style.left = `${centerPercent}%`;
    }
    fretboard.appendChild(capoClamp);
  }

  fretboard.append(frets, strings);
  guitarNode.append(nut, fretboard);
  applyResponsiveNoteSizing(frets, renderedFretCount);
}

function buildUrlState() {
  const params = new URLSearchParams();
  params.set("lang", state.language);
  params.set("capo", String(state.capo));
  params.set("display", state.noteDisplayMode);
  params.set("color", state.noteColorMode);
  params.set("chordView", state.chordViewMode);
  params.set("chordSet", state.chordResultMode);
  params.set("root", state.selectedScaleRoot);
  params.set("scale", state.selectedScaleType);
  params.set("chordRoot", state.selectedChordRoot);
  params.set("chordType", state.selectedChordType);
  params.set("shape", String(state.selectedChordShapeIndex));
  params.set("focus", state.fretFocusMode);
  params.set("position", String(state.fretFocusPosition));
  params.set("highlight", state.highlightMode);
  params.set("naming", state.noteNaming);
  params.set("hand", state.handedness);
  params.set("inlays", state.inlayStyle);
  params.set("layout", state.fretLayout);
  params.set("scaleLen", String(state.scaleLength));
  params.set("frets", String(state.fretCount));
  params.set("rangeStart", String(state.fretRangeStart));
  params.set("rangeEnd", String(state.fretRangeEnd));
  params.set("mobileRotate", state.mobileLabelRotation);
  if (state.highlightMode === "custom") {
    params.set("visible", state.visibleNotes.join(","));
  }

  if (getPresetById(state.tuningId)) {
    params.set("t", state.tuningId);
  } else {
    params.set("t", state.tuningId.startsWith("saved:") ? "saved" : "custom");
    params.set("tl", state.tuningName);
    params.set("tn", state.tuningOctaves.join(","));
  }

  return params;
}

function syncUrlState() {
  const params = buildUrlState();
  window.history.replaceState({}, "", `${window.location.pathname}?${params.toString()}`);
}

function loadStateFromUrl() {
  const params = new URLSearchParams(window.location.search);
  if (!Array.from(params.keys()).length) {
    return;
  }

  const snapshot = {};
  if (params.has("lang")) snapshot.language = params.get("lang");
  if (params.has("capo")) snapshot.capo = Number(params.get("capo"));
  if (params.has("display")) snapshot.noteDisplayMode = params.get("display");
  if (params.has("color")) snapshot.noteColorMode = params.get("color");
  if (params.has("chordView")) snapshot.chordViewMode = params.get("chordView");
  if (params.has("chordSet")) snapshot.chordResultMode = params.get("chordSet");
  if (params.has("root")) snapshot.selectedScaleRoot = params.get("root");
  if (params.has("scale")) snapshot.selectedScaleType = params.get("scale");
  if (params.has("chordRoot")) snapshot.selectedChordRoot = params.get("chordRoot");
  if (params.has("chordType")) snapshot.selectedChordType = params.get("chordType");
  if (params.has("shape")) snapshot.selectedChordShapeIndex = Number(params.get("shape"));
  if (params.has("focus")) snapshot.fretFocusMode = params.get("focus");
  if (params.has("position")) snapshot.fretFocusPosition = Number(params.get("position"));
  if (params.has("highlight")) snapshot.highlightMode = params.get("highlight");
  if (params.has("naming")) snapshot.noteNaming = params.get("naming");
  if (params.has("hand")) snapshot.handedness = params.get("hand");
  if (params.has("inlays")) snapshot.inlayStyle = params.get("inlays");
  if (params.has("layout")) snapshot.fretLayout = params.get("layout");
  if (params.has("scaleLen")) snapshot.scaleLength = Number(params.get("scaleLen"));
  if (params.has("frets")) snapshot.fretCount = Number(params.get("frets"));
  if (params.has("rangeStart")) snapshot.fretRangeStart = Number(params.get("rangeStart"));
  if (params.has("rangeEnd")) snapshot.fretRangeEnd = Number(params.get("rangeEnd"));
  if (params.has("mobileRotate")) snapshot.mobileLabelRotation = params.get("mobileRotate");
  if (params.has("visible")) {
    snapshot.visibleNotes = params.get("visible").split(",").map((value) => value.trim()).filter(Boolean);
  } else if (params.get("highlight") === "custom") {
    snapshot.visibleNotes = [];
  }

  const tuningId = params.get("t");
  const tuningLabel = params.get("tl");
  const tuningNotes = params.get("tn");
  if (tuningId) {
    if (getPresetById(tuningId)) {
      snapshot.tuningId = tuningId;
    } else if (tuningNotes) {
      snapshot.tuningId = tuningId === "saved" ? "saved:url" : "custom";
      snapshot.tuningName = tuningLabel || t("customTuningDefault");
      snapshot.tuningOctaves = tuningNotes.split(",").map((value) => value.trim()).filter(Boolean);
    }
  }

  applySnapshot(snapshot);
}

function getStylesheetText() {
  const chunks = [];
  for (const sheet of Array.from(document.styleSheets)) {
    try {
      const rules = Array.from(sheet.cssRules || []);
      chunks.push(rules.map((rule) => rule.cssText).join("\n"));
    } catch (error) {
      continue;
    }
  }
  return chunks.join("\n");
}

async function exportFretboardPng() {
  try {
    const rect = guitarNode.getBoundingClientRect();
    const exportWidth = Math.ceil(rect.width);
    const exportHeight = Math.ceil(rect.height + 72);
    const clone = guitarNode.cloneNode(true);
    clone.classList.add("is-export-clone");
    clone.style.width = `${rect.width}px`;
    clone.style.margin = "0";

    const svgString = `
      <svg xmlns="http://www.w3.org/2000/svg" width="${exportWidth}" height="${exportHeight}" viewBox="0 0 ${exportWidth} ${exportHeight}">
        <foreignObject x="0" y="0" width="100%" height="100%">
          <div xmlns="http://www.w3.org/1999/xhtml" style="width:${exportWidth}px;height:${exportHeight}px;padding:0 0 72px;margin:0;background:transparent;box-sizing:border-box;">
            <style>${getStylesheetText()}</style>
            ${clone.outerHTML}
          </div>
        </foreignObject>
      </svg>
    `;

    const image = new Image();
    const dataUrl = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgString)}`;

    await new Promise((resolve, reject) => {
      image.onload = resolve;
      image.onerror = reject;
      image.src = dataUrl;
    });

    const canvas = document.createElement("canvas");
    canvas.width = exportWidth * 2;
    canvas.height = exportHeight * 2;
    const context = canvas.getContext("2d");
    if (!context) {
      throw new Error("Canvas context not available");
    }
    context.scale(2, 2);
    context.drawImage(image, 0, 0, exportWidth, exportHeight);

    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = "fretboard-lab.png";
    link.click();

    setMessage("msgPngExported", "is-success");
    render();
  } catch (error) {
    setMessage("msgPngFailed", "is-error");
    render();
  }
}

function render() {
  syncVisibleNotesForMode();
  renderHero();
  renderControls();
  renderMobileRotateButton();
  renderGuitar();
  updateMobileRotateButtonPosition();
  syncUrlState();
  saveState();
}

loadState();
loadStateFromUrl();
setupGlobalListeners();
window.addEventListener("resize", render);
if (!state.tuningDraftLabel || !state.tuningDraftNotesText) {
  syncDraftFromCurrentTuning();
}
render();
