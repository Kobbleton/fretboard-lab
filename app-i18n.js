const NOTE_NAMES_FLAT = ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"];
const NOTE_NAMES_SHARP = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

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
  { id: "drop-d", label: "Drop D", notes: ["D", "A", "D", "G", "B", "E"], octaves: ["D2", "A2", "D3", "G3", "B3", "E4"] },
  { id: "open-g", label: "Open G", notes: ["D", "G", "D", "G", "B", "D"], octaves: ["D2", "G2", "D3", "G3", "B3", "D4"] },
  { id: "dadgad", label: "DADGAD", notes: ["D", "A", "D", "G", "A", "D"], octaves: ["D2", "A2", "D3", "G3", "A3", "D4"] },
  { id: "drop-c", label: "Drop C", notes: ["C", "G", "C", "F", "A", "D"], octaves: ["C2", "G2", "C3", "F3", "A3", "D4"] },
  { id: "open-c", label: "Open C", notes: ["C", "G", "C", "G", "C", "E"], octaves: ["C2", "G2", "C3", "G3", "C4", "E4"] },
  { id: "facgce", label: "FACGCE", notes: ["F", "A", "C", "G", "C", "E"], octaves: ["F2", "A2", "C3", "G3", "C4", "E4"] },
  { id: "double-drop-d", label: "Double Drop D", notes: ["D", "A", "D", "G", "B", "D"], octaves: ["D2", "A2", "D3", "G3", "B3", "D4"] },
];

const SCALE_PATTERNS = {
  major: {
    intervals: [0, 2, 4, 5, 7, 9, 11],
    labels: { en: "Major (Ionian)", uk: "Мажор (Іонійський)", es: "Mayor (Jónico)", ru: "Мажор (Ионийский)" },
  },
  minor: {
    intervals: [0, 2, 3, 5, 7, 8, 10],
    labels: { en: "Minor (Aeolian)", uk: "Мінор (Еолійський)", es: "Menor (Eólico)", ru: "Минор (Эолийский)" },
  },
  harmonicMinor: {
    intervals: [0, 2, 3, 5, 7, 8, 11],
    labels: { en: "Harmonic Minor", uk: "Гармонічний мінор", es: "Menor armónica", ru: "Гармонический минор" },
  },
  melodicMinor: {
    intervals: [0, 2, 3, 5, 7, 9, 11],
    labels: { en: "Melodic Minor", uk: "Мелодичний мінор", es: "Menor melódica", ru: "Мелодический минор" },
  },
  dorian: {
    intervals: [0, 2, 3, 5, 7, 9, 10],
    labels: { en: "Dorian", uk: "Дорійський", es: "Dórico", ru: "Дорийский" },
  },
  phrygian: {
    intervals: [0, 1, 3, 5, 7, 8, 10],
    labels: { en: "Phrygian", uk: "Фригійський", es: "Frigio", ru: "Фригийский" },
  },
  lydian: {
    intervals: [0, 2, 4, 6, 7, 9, 11],
    labels: { en: "Lydian", uk: "Лідійський", es: "Lidio", ru: "Лидийский" },
  },
  mixolydian: {
    intervals: [0, 2, 4, 5, 7, 9, 10],
    labels: { en: "Mixolydian", uk: "Міксолідійський", es: "Mixolidio", ru: "Миксолидийский" },
  },
  locrian: {
    intervals: [0, 1, 3, 5, 6, 8, 10],
    labels: { en: "Locrian", uk: "Локрійський", es: "Locrio", ru: "Локрийский" },
  },
  majorPentatonic: {
    intervals: [0, 2, 4, 7, 9],
    labels: { en: "Major Pentatonic", uk: "Мажорна пентатоніка", es: "Pentatónica mayor", ru: "Мажорная пентатоника" },
  },
  minorPentatonic: {
    intervals: [0, 3, 5, 7, 10],
    labels: { en: "Minor Pentatonic", uk: "Мінорна пентатоніка", es: "Pentatónica menor", ru: "Минорная пентатоника" },
  },
};

const LANGUAGES = [
  { id: "en", label: "English" },
  { id: "uk", label: "Українська" },
  { id: "es", label: "Español" },
  { id: "ru", label: "Русский", square: true },
];

const I18N = {
  en: {
    documentTitle: "Open Tunings Fretboard",
    heroTitle: "Fretboard for your tunings",
    fretboardAria: "Interactive guitar fretboard",
    sectionTunings: "Tunings",
    tuningsHelp: "Pick a preset tuning or enter your own six-string setup.",
    customLabel: "Tuning name",
    customLabelPlaceholder: "For example: FACGCE",
    customNotes: "Notes with octaves",
    customNotesPlaceholder: "F2 A2 C3 G3 C4 E4",
    applyCustom: "Apply custom tuning",
    hideAll: "Hide all",
    showAll: "Show all",
    sectionDisplay: "Display",
    noteNamingLabel: "Note labels",
    highlightModeLabel: "Highlight mode",
    handednessLabel: "Orientation",
    inlayStyleLabel: "Inlays",
    fretLayoutLabel: "Fret spacing",
    scaleLengthLabel: "Scale length",
    fretCountLabel: "Frets",
    namingFlats: "♭ Flats",
    namingSharps: "♯ Sharps",
    highlightAll: "All",
    highlightCustom: "Selected",
    highlightScale: "Scale",
    handednessRight: "Right-handed",
    handednessLeft: "Left-handed",
    inlayDots: "Dots",
    inlayBlocks: "Blocks",
    fretLayoutChart: "Chart",
    fretLayoutReal: "Real scale",
    scaleLengthStandard: '25.5" Standard',
    scaleLengthGibson: '24.75" Short',
    scaleLengthBaritone: '27" Baritone',
    sectionNotes: "Note highlight",
    sectionScale: "Scale",
    scaleRootLabel: "Root",
    scaleTypeLabel: "Scale type",
    customTuningDefault: "Custom tuning",
    msgPresetApplied: ({ preset }) => `Tuning "${preset}" is active.`,
    msgCustomApplied: ({ label }) => `Tuning "${label}" is applied.`,
    msgAllHidden: "All notes are hidden. Turn on only the ones you want.",
    msgAllShown: "All notes are visible again.",
    msgSharps: "Note labels switched to sharps.",
    msgFlats: "Note labels switched to flats.",
    errorNeedSixNotes: "Enter exactly 6 notes with octaves, separated by spaces.",
    errorInvalidNoteWithOctave: ({ value }) => `Invalid note with octave: ${value}`,
    errorUnsupportedNote: ({ value }) => `Unsupported note name: ${value}`,
    scaleSummary: ({ root, label, notes }) => `${root} ${label}: ${notes}`,
  },
  uk: {
    documentTitle: "Гриф для відкритих строїв",
    heroTitle: "Гриф для твоїх строїв",
    fretboardAria: "Інтерактивний гітарний гриф",
    sectionTunings: "Строї",
    tuningsHelp: "Обери готовий стрій або введи свій шестиструнний варіант.",
    customLabel: "Назва строю",
    customLabelPlaceholder: "Наприклад: FACGCE",
    customNotes: "Ноти з октавами",
    customNotesPlaceholder: "F2 A2 C3 G3 C4 E4",
    applyCustom: "Застосувати свій стрій",
    hideAll: "Сховати все",
    showAll: "Показати все",
    sectionDisplay: "Відображення",
    noteNamingLabel: "Підписи нот",
    highlightModeLabel: "Режим підсвітки",
    handednessLabel: "Орієнтація",
    inlayStyleLabel: "Інлеї",
    fretLayoutLabel: "Відстань ладів",
    scaleLengthLabel: "Мензура",
    fretCountLabel: "Лади",
    namingFlats: "♭ Бемолі",
    namingSharps: "♯ Дієзи",
    highlightAll: "Усі",
    highlightCustom: "Вибрані",
    highlightScale: "Гама",
    handednessRight: "Правша",
    handednessLeft: "Лівша",
    inlayDots: "Точки",
    inlayBlocks: "Блоки",
    fretLayoutChart: "Сітка",
    fretLayoutReal: "Реальна мензура",
    scaleLengthStandard: '25.5" Стандарт',
    scaleLengthGibson: '24.75" Коротка',
    scaleLengthBaritone: '27" Баритон',
    sectionNotes: "Підсвітка нот",
    sectionScale: "Гама",
    scaleRootLabel: "Тоніка",
    scaleTypeLabel: "Тип гами",
    customTuningDefault: "Свій стрій",
    msgPresetApplied: ({ preset }) => `Стрій "${preset}" активовано.`,
    msgCustomApplied: ({ label }) => `Стрій "${label}" застосовано.`,
    msgAllHidden: "Усі ноти приховано. Увімкни лише потрібні.",
    msgAllShown: "Усі ноти знову видимі.",
    msgSharps: "Підписи нот перемкнено на дієзи.",
    msgFlats: "Підписи нот перемкнено на бемолі.",
    errorNeedSixNotes: "Введи рівно 6 нот з октавами через пробіл.",
    errorInvalidNoteWithOctave: ({ value }) => `Неправильна нота з октавою: ${value}`,
    errorUnsupportedNote: ({ value }) => `Непідтримувана назва ноти: ${value}`,
    scaleSummary: ({ root, label, notes }) => `${root} ${label}: ${notes}`,
  },
  es: {
    documentTitle: "Diapasón para afinaciones abiertas",
    heroTitle: "Diapasón para tus afinaciones",
    fretboardAria: "Diapasón de guitarra interactivo",
    sectionTunings: "Afinaciones",
    tuningsHelp: "Elige una afinación predefinida o escribe tu propia versión de seis cuerdas.",
    customLabel: "Nombre de afinación",
    customLabelPlaceholder: "Por ejemplo: FACGCE",
    customNotes: "Notas con octavas",
    customNotesPlaceholder: "F2 A2 C3 G3 C4 E4",
    applyCustom: "Aplicar afinación",
    hideAll: "Ocultar todo",
    showAll: "Mostrar todo",
    sectionDisplay: "Visualización",
    noteNamingLabel: "Etiquetas de notas",
    highlightModeLabel: "Modo de resaltado",
    handednessLabel: "Orientación",
    inlayStyleLabel: "Inlays",
    fretLayoutLabel: "Espaciado",
    scaleLengthLabel: "Escala",
    fretCountLabel: "Trastes",
    namingFlats: "♭ Bemoles",
    namingSharps: "♯ Sostenidos",
    highlightAll: "Todas",
    highlightCustom: "Elegidas",
    highlightScale: "Escala",
    handednessRight: "Diestro",
    handednessLeft: "Zurdo",
    inlayDots: "Puntos",
    inlayBlocks: "Bloques",
    fretLayoutChart: "Cuadrícula",
    fretLayoutReal: "Escala real",
    scaleLengthStandard: '25.5" Estándar',
    scaleLengthGibson: '24.75" Corta',
    scaleLengthBaritone: '27" Barítono',
    sectionNotes: "Resaltado de notas",
    sectionScale: "Escala",
    scaleRootLabel: "Tónica",
    scaleTypeLabel: "Tipo de escala",
    customTuningDefault: "Afinación personalizada",
    msgPresetApplied: ({ preset }) => `La afinación "${preset}" está activa.`,
    msgCustomApplied: ({ label }) => `La afinación "${label}" se aplicó.`,
    msgAllHidden: "Todas las notas están ocultas. Activa solo las que necesites.",
    msgAllShown: "Todas las notas vuelven a verse.",
    msgSharps: "Las etiquetas de notas cambiaron a sostenidos.",
    msgFlats: "Las etiquetas de notas cambiaron a bemoles.",
    errorNeedSixNotes: "Introduce exactamente 6 notas con octavas, separadas por espacios.",
    errorInvalidNoteWithOctave: ({ value }) => `Nota con octava no válida: ${value}`,
    errorUnsupportedNote: ({ value }) => `Nombre de nota no compatible: ${value}`,
    scaleSummary: ({ root, label, notes }) => `${root} ${label}: ${notes}`,
  },
  ru: {
    documentTitle: "Гриф для открытых строев",
    heroTitle: "Гриф для своих строёв",
    fretboardAria: "Интерактивный гитарный гриф",
    sectionTunings: "Строи",
    tuningsHelp: "Выбери готовый строй или введи свой шестиструнный вариант.",
    customLabel: "Название строя",
    customLabelPlaceholder: "Например: FACGCE",
    customNotes: "Ноты с октавами",
    customNotesPlaceholder: "F2 A2 C3 G3 C4 E4",
    applyCustom: "Применить свой строй",
    hideAll: "Скрыть всё",
    showAll: "Показать всё",
    sectionDisplay: "Отображение",
    noteNamingLabel: "Подписи нот",
    highlightModeLabel: "Режим подсветки",
    handednessLabel: "Ориентация",
    inlayStyleLabel: "Инлеи",
    fretLayoutLabel: "Расстояние ладов",
    scaleLengthLabel: "Мензура",
    fretCountLabel: "Лады",
    namingFlats: "♭ Бемоли",
    namingSharps: "♯ Диезы",
    highlightAll: "Все",
    highlightCustom: "Выбранные",
    highlightScale: "Гамма",
    handednessRight: "Правша",
    handednessLeft: "Левша",
    inlayDots: "Точки",
    inlayBlocks: "Блоки",
    fretLayoutChart: "Сетка",
    fretLayoutReal: "Реальная мензура",
    scaleLengthStandard: '25.5" Стандарт',
    scaleLengthGibson: '24.75" Короткая',
    scaleLengthBaritone: '27" Баритон',
    sectionNotes: "Подсветка нот",
    sectionScale: "Гамма",
    scaleRootLabel: "Тоника",
    scaleTypeLabel: "Тип гаммы",
    customTuningDefault: "Свой строй",
    msgPresetApplied: ({ preset }) => `Строй "${preset}" активирован.`,
    msgCustomApplied: ({ label }) => `Строй "${label}" применён.`,
    msgAllHidden: "Все ноты скрыты. Включи только нужные.",
    msgAllShown: "Все ноты снова видны.",
    msgSharps: "Подписи нот переключены на диезы.",
    msgFlats: "Подписи нот переключены на бемоли.",
    errorNeedSixNotes: "Нужно ввести ровно 6 нот с октавами через пробел.",
    errorInvalidNoteWithOctave: ({ value }) => `Некорректная нота с октавой: ${value}`,
    errorUnsupportedNote: ({ value }) => `Неподдерживаемое название ноты: ${value}`,
    scaleSummary: ({ root, label, notes }) => `${root} ${label}: ${notes}`,
  },
};

const SINGLE_MARKER_FRETS = new Set([3, 5, 7, 9, 15, 17, 19, 21]);
const DOUBLE_MARKER_FRETS = new Set([12, 24]);
const BLOCK_MARKER_FRETS = new Set([3, 5, 7, 9, 12, 15, 17, 19, 21, 24]);
const STORAGE_KEY = "open-tunings-fretboard-state-v2";
const LEGACY_STORAGE_KEY = "open-tunings-fretboard-state-v1";
const MOBILE_MEDIA_QUERY = "(max-width: 720px)";
const MOBILE_MAX_FRET_COUNT = 13;
const MOBILE_FRET_COUNTS = [12, 13];
const DESKTOP_FRET_COUNTS = [12, 13, 15, 21, 22, 24];

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
  handedness: "right",
  inlayStyle: "dots",
  fretLayout: "chart",
  scaleLength: 25.5,
  fretCount: 13,
  highlightMode: "all",
  selectedScaleRoot: "C",
  selectedScaleType: "major",
  customTuningLabel: "",
  messageKey: "",
  messageType: "",
  messageParams: {},
};

const heroNode = document.querySelector(".hero");
const controlsNode = document.getElementById("controls");
const guitarNode = document.getElementById("guitar");
const fretboardPageNode = document.getElementById("fretboard-page") || document.querySelector(".fretboard-page");

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
  return scale.labels[state.language] || scale.labels.en;
}

function parseNoteWithOctave(noteWithOctave) {
  const match = /^([A-G][b#]?)(\d+)$/.exec(noteWithOctave);
  if (!match) {
    throw new Error(t("errorInvalidNoteWithOctave", { value: noteWithOctave }));
  }

  return {
    note: match[1],
    octave: Number(match[2]),
  };
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

function formatNoteLabel(note) {
  return note
    .replace("#", '<span class="note-accidental note-accidental-sharp">&#9839;</span>')
    .replace("b", '<span class="note-accidental note-accidental-flat">&#9837;</span>');
}

function escapeHtml(text) {
  return String(text)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function setMessage(key = "", type = "", params = {}) {
  state.messageKey = key;
  state.messageType = type;
  state.messageParams = params;
}

function getMessageText() {
  if (!state.messageKey) {
    return "";
  }
  return t(state.messageKey, state.messageParams);
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
    handedness: state.handedness,
    inlayStyle: state.inlayStyle,
    fretLayout: state.fretLayout,
    scaleLength: state.scaleLength,
    fretCount: state.fretCount,
    highlightMode: state.highlightMode,
    selectedScaleRoot: state.selectedScaleRoot,
    selectedScaleType: state.selectedScaleType,
    customTuningLabel: state.customTuningLabel,
  };

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(snapshot));
  } catch (error) {
    return;
  }
}

function getStoredSnapshot() {
  try {
    const primary = localStorage.getItem(STORAGE_KEY);
    if (primary) {
      return JSON.parse(primary);
    }

    const legacy = localStorage.getItem(LEGACY_STORAGE_KEY);
    return legacy ? JSON.parse(legacy) : null;
  } catch (error) {
    return null;
  }
}

function loadState() {
  const parsed = getStoredSnapshot();
  if (!parsed || typeof parsed !== "object") {
    return;
  }

  if (typeof parsed.language === "string" && LANGUAGES.some((language) => language.id === parsed.language)) {
    state.language = parsed.language;
  }

  if (typeof parsed.noteNaming === "string" && ["flats", "sharps"].includes(parsed.noteNaming)) {
    state.noteNaming = parsed.noteNaming;
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

  if (typeof parsed.scaleLength === "number" && [24.75, 25.5, 27].includes(parsed.scaleLength)) {
    state.scaleLength = parsed.scaleLength;
  }

  if (typeof parsed.fretCount === "number" && DESKTOP_FRET_COUNTS.includes(parsed.fretCount)) {
    state.fretCount = parsed.fretCount;
  }

  if (typeof parsed.highlightMode === "string" && ["all", "custom", "scale"].includes(parsed.highlightMode)) {
    state.highlightMode = parsed.highlightMode;
  }

  if (typeof parsed.selectedScaleType === "string" && SCALE_PATTERNS[parsed.selectedScaleType]) {
    state.selectedScaleType = parsed.selectedScaleType;
  }

  if (typeof parsed.selectedScaleRoot === "string") {
    state.selectedScaleRoot = normalizeNoteName(parsed.selectedScaleRoot, state.noteNaming);
  }

  if (typeof parsed.customTuningLabel === "string") {
    state.customTuningLabel = parsed.customTuningLabel;
  }

  if (Array.isArray(parsed.visibleNotes)) {
    state.visibleNotes = parsed.visibleNotes.map((note) => normalizeNoteName(note, state.noteNaming));
  }

  if (typeof parsed.tuningId === "string") {
    const preset = PRESET_TUNINGS.find((item) => item.id === parsed.tuningId);
    if (preset) {
      applyPresetTuning(preset.id, false);
      return;
    }

    if (parsed.tuningId === "custom" && Array.isArray(parsed.tuningOctaves) && parsed.tuningOctaves.length === 6) {
      state.tuningId = "custom";
      state.tuningName = typeof parsed.tuningName === "string" ? parsed.tuningName : t("customTuningDefault");
      state.tuningOctaves = parsed.tuningOctaves.map((noteWithOctave) => {
        const parsedNote = parseNoteWithOctave(noteWithOctave);
        return `${normalizeNoteName(parsedNote.note, state.noteNaming)}${parsedNote.octave}`;
      });
      state.tuningNotes = state.tuningOctaves.map((noteWithOctave) => noteWithOctave.replace(/\d+$/, ""));
    }
  }
}

function isNoteVisible(noteName) {
  return state.highlightMode === "all" ? true : state.visibleNotes.includes(noteName);
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
        displayHtml: formatNoteLabel(noteName),
        stringIndex,
        fretIndex: fret,
        isVisible: isNoteVisible(noteName),
      });
    }

    return notes;
  });
}

function getScaleNotes(root, scaleType, mode) {
  const pattern = SCALE_PATTERNS[scaleType];
  if (!pattern) {
    return [];
  }

  const rootSemitone = NOTE_TO_SEMITONE[normalizeNoteName(root, mode)];
  return pattern.intervals.map((interval) => getChromaticScale(mode)[(rootSemitone + interval) % 12]);
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

function isMobileViewport() {
  return window.matchMedia(MOBILE_MEDIA_QUERY).matches;
}

function getRenderableFretCount() {
  return isMobileViewport() ? Math.min(state.fretCount, MOBILE_MAX_FRET_COUNT) : state.fretCount;
}

function getAvailableFretCounts() {
  return isMobileViewport() ? MOBILE_FRET_COUNTS : DESKTOP_FRET_COUNTS;
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

  if (isMobileViewport()) {
    const noteSize = Math.max(21, Math.floor(lastFretWidth * 1.12));
    const noteFontSize = Math.min(17, Math.max(10.5, noteSize * 0.42));
    guitarNode.style.setProperty("--note-size", `${noteSize}px`);
    guitarNode.style.setProperty("--note-font-size", `${noteFontSize}px`);
    return;
  }

  if (state.fretLayout === "real" && renderedFretCount >= 21) {
    const noteSize = Math.max(16, Math.floor(lastFretWidth));
    const noteFontSize = Math.min(16, Math.max(10.5, noteSize * 0.42));
    guitarNode.style.setProperty("--note-size", `${noteSize}px`);
    guitarNode.style.setProperty("--note-font-size", `${noteFontSize}px`);
  }
}

function syncVisibleNotesForMode() {
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
  syncVisibleNotesForMode();
}

function applyPresetTuning(tuningId, withMessage = true) {
  const preset = PRESET_TUNINGS.find((item) => item.id === tuningId);
  if (!preset) {
    return;
  }

  state.tuningId = preset.id;
  state.tuningName = preset.label;
  state.tuningNotes = preset.notes.map((note) => normalizeNoteName(note, state.noteNaming));
  state.tuningOctaves = preset.octaves.map((noteWithOctave) => {
    const noteName = noteWithOctave.replace(/\d+$/, "");
    const octave = noteWithOctave.replace(/^[A-G][b#]?/, "");
    return `${normalizeNoteName(noteName, state.noteNaming)}${octave}`;
  });

  if (withMessage) {
    setMessage("msgPresetApplied", "is-success", { preset: preset.label });
  }
}

function createButton({ label, className = "", isActive = false, isDimmed = false, onClick }) {
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

  button.addEventListener("click", onClick);
  return button;
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
      <span class="language-flag language-flag--${state.language}${state.language === "ru" ? " language-flag--square" : ""}"></span>
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
    flag.className = `language-flag language-flag--${language.id}${language.square ? " language-flag--square" : ""}`;

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
      <p class="eyebrow">Open Tunings Charts</p>
      <div class="desktop-language-slot"></div>
    </div>
    <h1 id="hero-title">${escapeHtml(t("heroTitle"))}</h1>
  `;

  heroNode.querySelector(".desktop-language-slot")?.appendChild(buildLanguageSwitcher("language-switcher--desktop"));
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
    if (event.key === "Escape" && state.languageMenuOpen) {
      state.languageMenuOpen = false;
      render();
    }
  });
}

function renderControls() {
  controlsNode.innerHTML = "";
  const availableFretCounts = getAvailableFretCounts();
  const renderedFretCount = getRenderableFretCount();

  const mobileTitle = document.createElement("section");
  mobileTitle.className = "mobile-hero-title";
  mobileTitle.innerHTML = `<h1>${escapeHtml(t("heroTitle"))}</h1>`;

  const tuningCard = document.createElement("section");
  tuningCard.className = "control-card control-card--wide";
  tuningCard.innerHTML = `
    <h2>${escapeHtml(t("sectionTunings"))}</h2>
    <div class="presets-row" id="preset-tunings"></div>
    <p class="small-copy">${escapeHtml(t("tuningsHelp"))}</p>
    <div class="custom-grid">
      <div class="field-row">
        <label for="custom-label">${escapeHtml(t("customLabel"))}</label>
        <input id="custom-label" name="custom-label" placeholder="${escapeHtml(t("customLabelPlaceholder"))}" value="${escapeHtml(state.customTuningLabel)}" />
      </div>
      <div class="field-row">
        <label for="custom-notes">${escapeHtml(t("customNotes"))}</label>
        <input id="custom-notes" name="custom-notes" placeholder="${escapeHtml(t("customNotesPlaceholder"))}" value="${escapeHtml(state.tuningOctaves.join(" "))}" />
      </div>
    </div>
    <div class="toggle-row" id="custom-actions"></div>
    <p class="message ${state.messageType}" id="message-area">${escapeHtml(getMessageText())}</p>
  `;

  const displayCard = document.createElement("section");
  displayCard.className = "control-card control-card--half";
  displayCard.innerHTML = `
    <h2>${escapeHtml(t("sectionDisplay"))}</h2>
    <div class="display-grid">
      <div class="field-row">
        <span>${escapeHtml(t("noteNamingLabel"))}</span>
        <div class="toggle-row" id="note-naming-row"></div>
      </div>
      <div class="field-row">
        <span>${escapeHtml(t("handednessLabel"))}</span>
        <div class="toggle-row" id="handedness-row"></div>
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
    </div>
  `;

  const modeCard = document.createElement("section");
  modeCard.className = "control-card control-card--half";
  modeCard.innerHTML = `
    <h2>${escapeHtml(t("highlightModeLabel"))}</h2>
    <div class="display-grid">
      <div class="field-row">
        <span>${escapeHtml(t("highlightModeLabel"))}</span>
        <div class="toggle-row" id="highlight-mode-row"></div>
      </div>
      <div class="field-row">
        <span>${escapeHtml(t("inlayStyleLabel"))}</span>
        <div class="toggle-row" id="inlay-style-row"></div>
      </div>
      <div class="field-row">
        <label for="fret-count">${escapeHtml(t("fretCountLabel"))}</label>
        <select id="fret-count" name="fret-count"></select>
      </div>
    </div>
  `;

  const noteCard = document.createElement("section");
  noteCard.className = "control-card control-card--wide";
  noteCard.innerHTML = `
    <h2>${escapeHtml(t("sectionNotes"))}</h2>
    <div class="chip-row" id="note-chip-row"></div>
  `;

  const scaleCard = document.createElement("section");
  scaleCard.className = "control-card control-card--half";
  scaleCard.innerHTML = `
    <h2>${escapeHtml(t("sectionScale"))}</h2>
    <div class="scale-grid">
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

  const mobileLanguage = document.createElement("section");
  mobileLanguage.className = "mobile-language-footer";
  mobileLanguage.appendChild(buildLanguageSwitcher("language-switcher--mobile"));

  controlsNode.append(mobileTitle, noteCard, scaleCard, tuningCard, modeCard, displayCard, mobileLanguage);

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

  const customActions = tuningCard.querySelector("#custom-actions");
  customActions.append(
    createButton({
      label: t("applyCustom"),
      className: "toggle-button",
      onClick: () => {
        try {
          const labelInput = tuningCard.querySelector("#custom-label");
          const noteInput = tuningCard.querySelector("#custom-notes");
          const label = labelInput.value.trim() || t("customTuningDefault");
          const tokens = noteInput.value.trim().split(/\s+/).filter(Boolean);

          if (tokens.length !== 6) {
            throw new Error(t("errorNeedSixNotes"));
          }

          const normalized = tokens.map((token) => {
            const parsed = parseNoteWithOctave(token);
            return `${normalizeNoteName(parsed.note, state.noteNaming)}${parsed.octave}`;
          });

          state.tuningId = "custom";
          state.customTuningLabel = label;
          state.tuningName = label;
          state.tuningOctaves = normalized;
          state.tuningNotes = normalized.map((noteWithOctave) => noteWithOctave.replace(/\d+$/, ""));
          setMessage("msgCustomApplied", "is-success", { label });
          render();
        } catch (error) {
          controlsNode.querySelector("#message-area");
          setMessage("", "");
          state.messageKey = "";
          state.messageType = "is-error";
          state.messageParams = {};
          tuningCard.querySelector("#message-area").textContent = error.message;
          tuningCard.querySelector("#message-area").className = "message is-error";
        }
      },
    }),
    createButton({
      label: t("hideAll"),
      className: "toggle-button",
      onClick: () => {
        state.highlightMode = "custom";
        state.visibleNotes = [];
        setMessage("msgAllHidden", "is-success");
        render();
      },
    }),
    createButton({
      label: t("showAll"),
      className: "toggle-button",
      onClick: () => {
        state.highlightMode = "all";
        syncVisibleNotesForMode();
        setMessage("msgAllShown", "is-success");
        render();
      },
    })
  );

  tuningCard.querySelector("#custom-label").addEventListener("input", (event) => {
    state.customTuningLabel = event.target.value;
  });

  const noteNamingRow = displayCard.querySelector("#note-naming-row");
  [
    { id: "flats", label: t("namingFlats") },
    { id: "sharps", label: t("namingSharps") },
  ].forEach((mode) => {
    noteNamingRow.append(
      createButton({
        label: mode.label,
        className: "toggle-button",
        isActive: state.noteNaming === mode.id,
        onClick: () => {
          updateNoteNaming(mode.id);
          setMessage(mode.id === "flats" ? "msgFlats" : "msgSharps", "is-success");
          render();
        },
      })
    );
  });

  const highlightModeRow = modeCard.querySelector("#highlight-mode-row");
  [
    { id: "all", label: t("highlightAll") },
    { id: "custom", label: t("highlightCustom") },
    { id: "scale", label: t("highlightScale") },
  ].forEach((mode) => {
    highlightModeRow.append(
      createButton({
        label: mode.label,
        className: "toggle-button",
        isActive: state.highlightMode === mode.id,
        onClick: () => {
          state.highlightMode = mode.id;
          syncVisibleNotesForMode();
          render();
        },
      })
    );
  });

  const handednessRow = displayCard.querySelector("#handedness-row");
  [
    { id: "right", label: t("handednessRight") },
    { id: "left", label: t("handednessLeft") },
  ].forEach((mode) => {
    handednessRow.append(
      createButton({
        label: mode.label,
        className: "toggle-button",
        isActive: state.handedness === mode.id,
        onClick: () => {
          state.handedness = mode.id;
          render();
        },
      })
    );
  });

  const inlayStyleRow = modeCard.querySelector("#inlay-style-row");
  [
    { id: "dots", label: t("inlayDots") },
    { id: "blocks", label: t("inlayBlocks") },
  ].forEach((mode) => {
    inlayStyleRow.append(
      createButton({
        label: mode.label,
        className: "toggle-button",
        isActive: state.inlayStyle === mode.id,
        onClick: () => {
          state.inlayStyle = mode.id;
          render();
        },
      })
    );
  });

  const fretLayoutRow = displayCard.querySelector("#fret-layout-row");
  [
    { id: "chart", label: t("fretLayoutChart") },
    { id: "real", label: t("fretLayoutReal") },
  ].forEach((mode) => {
    fretLayoutRow.append(
      createButton({
        label: mode.label,
        className: "toggle-button",
        isActive: state.fretLayout === mode.id,
        onClick: () => {
          state.fretLayout = mode.id;
          render();
        },
      })
    );
  });

  const fretSelect = modeCard.querySelector("#fret-count");
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
    render();
  });

  const scaleLengthSelect = displayCard.querySelector("#scale-length");
  scaleLengthSelect.value = String(state.scaleLength);
  scaleLengthSelect.addEventListener("change", (event) => {
    state.scaleLength = Number(event.target.value);
    render();
  });

  const noteChipRow = noteCard.querySelector("#note-chip-row");
  getChromaticScale(state.noteNaming).forEach((note) => {
    noteChipRow.append(
      createButton({
        label: note,
        className: "chip",
        isActive: state.visibleNotes.includes(note),
        isDimmed:
          state.highlightMode !== "all" &&
          state.highlightMode !== "custom" &&
          !state.visibleNotes.includes(note),
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

  const scaleNotes = getScaleNotes(state.selectedScaleRoot, state.selectedScaleType, state.noteNaming);
  scaleCard.querySelector("#scale-summary").innerHTML = escapeHtml(
    t("scaleSummary", {
      root: state.selectedScaleRoot,
      label: getScaleLabel(state.selectedScaleType),
      notes: scaleNotes.join(" "),
    })
  );
}

function renderGuitar() {
  const renderedFretCount = getRenderableFretCount();
  guitarNode.className = `guitar ${state.handedness === "left" ? "left-handed" : "right-handed"}`;
  guitarNode.dataset.fretCount = String(renderedFretCount);
  guitarNode.dataset.inlayStyle = state.inlayStyle;
  guitarNode.dataset.fretLayout = state.fretLayout;
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

  const noteGrid = getFretboardNotes(state.tuningOctaves, renderedFretCount, state.noteNaming);
  const reversedTuningNotes = [...state.tuningNotes].reverse();

  reversedTuningNotes.forEach((noteName, index) => {
    const string = document.createElement("div");
    string.className = `open-string string-${index + 1}`;

    const badge = document.createElement("div");
    badge.className = `open-note${isNoteVisible(noteName) ? " is-open-active" : ""}`;
    badge.dataset.note = noteName;
    badge.innerHTML = formatNoteLabel(noteName);

    string.appendChild(badge);
    nut.appendChild(string);
  });

  for (let fretIndex = 1; fretIndex <= renderedFretCount; fretIndex += 1) {
    const fret = document.createElement("div");
    fret.className = `fret fret-${fretIndex}`;
    fret.dataset.fret = String(fretIndex);
    fret.style.removeProperty("flex");
    fret.style.removeProperty("width");

    if (state.fretLayout === "real") {
      const metric = fretMetrics[fretIndex - 1];
      fret.style.flex = `0 0 ${metric.percent}%`;
      fret.style.width = `${metric.percent}%`;
      fret.style.setProperty("--fret-ratio", String(metric.ratio));
    } else {
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
      const noteNode = document.createElement("div");
      noteNode.className = `note${note.isVisible ? "" : " is-hidden-note"}`;
      noteNode.dataset.note = note.noteName;
      noteNode.dataset.noteWithOctave = note.noteWithOctave;
      noteNode.innerHTML = note.displayHtml;
      fret.appendChild(noteNode);
    }

    frets.appendChild(fret);
  }

  for (let index = 1; index <= 6; index += 1) {
    const stringLine = document.createElement("div");
    stringLine.className = `string-line string-${index}`;
    strings.appendChild(stringLine);
  }

  fretboard.append(frets, strings);
  guitarNode.append(nut, fretboard);
  applyResponsiveNoteSizing(frets, renderedFretCount);
}

function render() {
  syncVisibleNotesForMode();
  renderHero();
  renderControls();
  renderGuitar();
  saveState();
}

loadState();
setupGlobalListeners();
window.addEventListener("resize", render);
render();
