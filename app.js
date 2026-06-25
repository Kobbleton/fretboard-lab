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
  major: { label: "Major (Ionian)", intervals: [0, 2, 4, 5, 7, 9, 11] },
  minor: { label: "Minor (Aeolian)", intervals: [0, 2, 3, 5, 7, 8, 10] },
  harmonicMinor: { label: "Harmonic Minor", intervals: [0, 2, 3, 5, 7, 8, 11] },
  melodicMinor: { label: "Melodic Minor", intervals: [0, 2, 3, 5, 7, 9, 11] },
  dorian: { label: "Dorian", intervals: [0, 2, 3, 5, 7, 9, 10] },
  phrygian: { label: "Phrygian", intervals: [0, 1, 3, 5, 7, 8, 10] },
  lydian: { label: "Lydian", intervals: [0, 2, 4, 6, 7, 9, 11] },
  mixolydian: { label: "Mixolydian", intervals: [0, 2, 4, 5, 7, 9, 10] },
  locrian: { label: "Locrian", intervals: [0, 1, 3, 5, 6, 8, 10] },
  majorPentatonic: { label: "Major Pentatonic", intervals: [0, 2, 4, 7, 9] },
  minorPentatonic: { label: "Minor Pentatonic", intervals: [0, 3, 5, 7, 10] },
};

const MARKER_FRETS = new Set([3, 5, 7, 9, 12]);
const STORAGE_KEY = "open-tunings-fretboard-state-v1";

const state = {
  tuningName: PRESET_TUNINGS[0].label,
  tuningId: PRESET_TUNINGS[0].id,
  tuningNotes: [...PRESET_TUNINGS[0].notes],
  tuningOctaves: [...PRESET_TUNINGS[0].octaves],
  visibleNotes: [...NOTE_NAMES_SHARP],
  noteNaming: "sharps",
  handedness: "right",
  fretCount: 13,
  highlightMode: "all",
  selectedScaleRoot: "C",
  selectedScaleType: "major",
  customTuningLabel: "",
  message: "",
  messageType: "",
};

const controlsNode = document.getElementById("controls");
const guitarNode = document.getElementById("guitar");

function getChromaticScale(mode) {
  return mode === "sharps" ? NOTE_NAMES_SHARP : NOTE_NAMES_FLAT;
}

function parseNoteWithOctave(noteWithOctave) {
  const match = /^([A-G][b#]?)(\d+)$/.exec(noteWithOctave);
  if (!match) {
    throw new Error(`Invalid note with octave: ${noteWithOctave}`);
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
    throw new Error(`Unsupported note name: ${note}`);
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

function saveState() {
  const snapshot = {
    tuningId: state.tuningId,
    tuningName: state.tuningName,
    tuningNotes: state.tuningNotes,
    tuningOctaves: state.tuningOctaves,
    visibleNotes: state.visibleNotes,
    noteNaming: state.noteNaming,
    handedness: state.handedness,
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

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return;
    }

    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") {
      return;
    }

    if (typeof parsed.noteNaming === "string" && ["flats", "sharps"].includes(parsed.noteNaming)) {
      state.noteNaming = parsed.noteNaming;
    }

    if (typeof parsed.handedness === "string" && ["right", "left"].includes(parsed.handedness)) {
      state.handedness = parsed.handedness;
    }

    if (typeof parsed.fretCount === "number" && [12, 13, 15].includes(parsed.fretCount)) {
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
        state.tuningId = preset.id;
        state.tuningName = preset.label;
        state.tuningNotes = preset.notes.map((note) => normalizeNoteName(note, state.noteNaming));
        state.tuningOctaves = preset.octaves.map((noteWithOctave) => {
          const noteName = noteWithOctave.replace(/\d+$/, "");
          const octave = noteWithOctave.replace(/^[A-G][b#]?/, "");
          return `${normalizeNoteName(noteName, state.noteNaming)}${octave}`;
        });
      } else if (
        parsed.tuningId === "custom" &&
        Array.isArray(parsed.tuningOctaves) &&
        parsed.tuningOctaves.length === 6
      ) {
        state.tuningId = "custom";
        state.tuningName = typeof parsed.tuningName === "string" ? parsed.tuningName : "Custom tuning";
        state.tuningOctaves = parsed.tuningOctaves.map((noteWithOctave) => {
          const parsedNote = parseNoteWithOctave(noteWithOctave);
          return `${normalizeNoteName(parsedNote.note, state.noteNaming)}${parsedNote.octave}`;
        });
        state.tuningNotes = state.tuningOctaves.map((noteWithOctave) => noteWithOctave.replace(/\d+$/, ""));
      }
    }
  } catch (error) {
    return;
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

function setMessage(text, type = "") {
  state.message = text;
  state.messageType = type;
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

function applyPresetTuning(tuningId) {
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
  setMessage(`Строй "${preset.label}" активирован.`, "is-success");
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

function renderControls() {
  controlsNode.innerHTML = "";

  const tuningCard = document.createElement("section");
  tuningCard.className = "control-card control-card--wide";
  tuningCard.innerHTML = `
    <h2>Строи</h2>
    <div class="presets-row" id="preset-tunings"></div>
    <p class="small-copy">Можно выбрать готовый строй или ввести свой шестиструнный вариант.</p>
    <div class="custom-grid">
      <div class="field-row">
        <label for="custom-label">Название строя</label>
        <input id="custom-label" name="custom-label" placeholder="Например: FACGCE" value="${escapeHtml(state.customTuningLabel)}" />
      </div>
      <div class="field-row">
        <label for="custom-notes">Ноты с октавами</label>
        <input id="custom-notes" name="custom-notes" placeholder="F2 A2 C3 G3 C4 E4" value="${escapeHtml(state.tuningOctaves.join(" "))}" />
      </div>
    </div>
    <div class="toggle-row" id="custom-actions"></div>
    <p class="message ${state.messageType}" id="message-area">${escapeHtml(state.message)}</p>
  `;

  const displayCard = document.createElement("section");
  displayCard.className = "control-card control-card--half";
  displayCard.innerHTML = `
    <h2>Отображение</h2>
    <div class="display-grid">
      <div class="field-row">
        <span>Подписи нот</span>
        <div class="toggle-row" id="note-naming-row"></div>
      </div>
      <div class="field-row">
        <span>Режим отображения</span>
        <div class="toggle-row" id="highlight-mode-row"></div>
      </div>
      <div class="field-row">
        <span>Ориентация</span>
        <div class="toggle-row" id="handedness-row"></div>
      </div>
      <div class="field-row">
        <label for="fret-count">Количество ладов</label>
        <select id="fret-count" name="fret-count">
          <option value="12">12</option>
          <option value="13">13</option>
          <option value="15">15</option>
        </select>
      </div>
    </div>
  `;

  const noteCard = document.createElement("section");
  noteCard.className = "control-card control-card--wide";
  noteCard.innerHTML = `
    <h2>Подсветка нот</h2>
    <div class="chip-row" id="note-chip-row"></div>
  `;

  const scaleCard = document.createElement("section");
  scaleCard.className = "control-card control-card--half";
  scaleCard.innerHTML = `
    <h2>Гамма</h2>
    <div class="scale-grid">
      <div class="field-row">
        <label for="scale-root">Тоника</label>
        <select id="scale-root" name="scale-root"></select>
      </div>
      <div class="field-row">
        <label for="scale-type">Тип гаммы</label>
        <select id="scale-type" name="scale-type"></select>
      </div>
    </div>
    <p class="small-copy" id="scale-summary"></p>
  `;

  controlsNode.append(tuningCard, displayCard, noteCard, scaleCard);

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
      label: "Применить свой строй",
      className: "toggle-button",
      onClick: () => {
        try {
          const labelInput = tuningCard.querySelector("#custom-label");
          const noteInput = tuningCard.querySelector("#custom-notes");
          const label = labelInput.value.trim() || "Custom tuning";
          const tokens = noteInput.value.trim().split(/\s+/).filter(Boolean);

          if (tokens.length !== 6) {
            throw new Error("Нужно ввести ровно 6 нот с октавами через пробел.");
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
          setMessage(`Строй "${label}" применён.`, "is-success");
          render();
        } catch (error) {
          setMessage(error.message, "is-error");
          render();
        }
      },
    }),
    createButton({
      label: "Скрыть все",
      className: "toggle-button",
      onClick: () => {
        state.highlightMode = "custom";
        state.visibleNotes = [];
        setMessage("Все ноты скрыты, можно включать выборочно.", "is-success");
        render();
      },
    }),
    createButton({
      label: "Показать все",
      className: "toggle-button",
      onClick: () => {
        state.highlightMode = "all";
        syncVisibleNotesForMode();
        setMessage("Все ноты снова видны.", "is-success");
        render();
      },
    })
  );

  tuningCard.querySelector("#custom-label").addEventListener("input", (event) => {
    state.customTuningLabel = event.target.value;
  });

  const noteNamingRow = displayCard.querySelector("#note-naming-row");
  [
    { id: "flats", label: "\u266d Flats" },
    { id: "sharps", label: "\u266f Sharps" },
  ].forEach((mode) => {
    noteNamingRow.append(
      createButton({
        label: mode.label,
        className: "toggle-button",
        isActive: state.noteNaming === mode.id,
        onClick: () => {
          updateNoteNaming(mode.id);
          setMessage(`Подписи переключены на ${mode.id === "flats" ? "бемоли" : "диезы"}.`, "is-success");
          render();
        },
      })
    );
  });

  const highlightModeRow = displayCard.querySelector("#highlight-mode-row");
  [
    { id: "all", label: "Все" },
    { id: "custom", label: "Выбранные" },
    { id: "scale", label: "Гамма" },
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
    { id: "right", label: "Правша" },
    { id: "left", label: "Левша" },
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

  const fretSelect = displayCard.querySelector("#fret-count");
  fretSelect.value = String(state.fretCount);
  fretSelect.addEventListener("change", (event) => {
    state.fretCount = Number(event.target.value);
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
  Object.entries(SCALE_PATTERNS).forEach(([id, config]) => {
    const option = document.createElement("option");
    option.value = id;
    option.textContent = config.label;
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
  scaleCard.querySelector("#scale-summary").innerHTML = `${escapeHtml(state.selectedScaleRoot)} ${escapeHtml(
    SCALE_PATTERNS[state.selectedScaleType].label
  )}: <strong>${scaleNotes.map(escapeHtml).join(" ")}</strong>`;
}

function renderGuitar() {
  guitarNode.className = `guitar ${state.handedness === "left" ? "left-handed" : "right-handed"}`;
  guitarNode.innerHTML = "";

  const nut = document.createElement("div");
  nut.className = "nut";

  const strings = document.createElement("div");
  strings.className = "strings";

  const fretboard = document.createElement("div");
  fretboard.className = "fretboard";

  const frets = document.createElement("div");
  frets.className = "frets";

  const noteGrid = getFretboardNotes(state.tuningOctaves, state.fretCount, state.noteNaming);
  const reversedTuningNotes = [...state.tuningNotes].reverse();

  reversedTuningNotes.forEach((noteName, index) => {
    const string = document.createElement("div");
    string.className = `open-string string-${index + 1}`;

    const badge = document.createElement("div");
    badge.className = "open-note";
    badge.dataset.note = noteName;
    badge.innerHTML = formatNoteLabel(noteName);

    string.appendChild(badge);
    nut.appendChild(string);
  });

  for (let fretIndex = 1; fretIndex <= state.fretCount; fretIndex += 1) {
    const fret = document.createElement("div");
    fret.className = `fret fret-${fretIndex}`;
    fret.dataset.fret = String(fretIndex);

    if (MARKER_FRETS.has(fretIndex) && fretIndex !== 12) {
      fret.classList.add("has-marker");
    }

    if (fretIndex === 12) {
      fret.classList.add("has-double-marker");
      const doubleMarker = document.createElement("div");
      doubleMarker.className = "double-marker";
      fret.appendChild(doubleMarker);
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
}

function render() {
  syncVisibleNotesForMode();
  renderControls();
  renderGuitar();
  saveState();
}

loadState();
render();
