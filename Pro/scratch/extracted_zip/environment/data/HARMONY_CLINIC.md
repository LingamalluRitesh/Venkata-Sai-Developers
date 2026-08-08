# HarmonyClinic Specification: Nashville Number System (NNS) Debug Console

## 1. Overview
The Nashville Number System (NNS) replaces standard chord letter names with scale degree numerals (1 through 7). This specification defines the exact harmonic transposition rules, modal borrowings, secondary dominants, and slash-chord inversions for the NNS Debug Console (`nns-debug`).

## 2. Diatonic Major Scale Mappings
In any Major Key $K$, pitch classes map to chromatic semitone offsets relative to the tonic:
- **1** (Tonic): +0 semitones (Major)
- **2m** or **2**: +2 semitones (Minor by default unless indicated as Major)
- **3m** or **3**: +4 semitones (Minor by default unless indicated as Major)
- **4** (Subdominant): +5 semitones (Major)
- **5** (Dominant): +7 semitones (Major)
- **6m** or **6**: +9 semitones (Minor by default unless indicated as Major)
- **7dim** or **7**: +11 semitones (Diminished)

## 3. Advanced Harmonic Rules

### 3.1 Slash Chords (Bass Inversions)
A slash notation `N/B` specifies scale degree `N` played over bass degree `B`:
- Example: In Key `C`, `1/3` represents `C` major over `E` bass (`C/E`).
- Example: In Key `G`, `5/7` represents `D` major over `F#` bass (`D/F#`).

### 3.2 Borrowed Chords (Parallel Minor Modal Interchange)
- `bVII`: +10 semitones relative to tonic (Major quality). In Key `C` -> `Bb` Major.
- `bIII`: +3 semitones relative to tonic (Major quality). In Key `C` -> `Eb` Major.
- `iv`: +5 semitones relative to tonic (Minor quality). In Key `C` -> `Fm` Minor.

### 3.3 Secondary Dominants
A notation `V/X` represents the Major dominant (5th degree) of target scale degree `X`:
- `V/V`: Dominant of V. In Key `C`, target V is `G`. The 5th of `G` is `D` Major (+2 semitones from C).
- `V/ii`: Dominant of ii. In Key `C`, target ii is `Dm`. The 5th of `Dm` is `A` Major (+9 semitones from C).

## 4. Scripted Debugger Commands
- `KEY <root>`: Updates the active key context (e.g., `KEY C`, `KEY G`, `KEY F`).
- `EVAL <nns>`: Computes pitch name, quality, and bass pitch for `<nns>`.
- `WHY <nns>`: Emits detailed breakdown explaining scale degree derivation, root note, and harmonic function.
- `TRACE`: Flushes trace log to `/app/output/harmonic_trace.txt`.
