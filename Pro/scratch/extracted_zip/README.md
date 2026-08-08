# Go Nashville Number Debug Console with Cargo Static Checks (Terminus 3 Task)

Welcome! This task evaluates an AI agent's ability to build a domain-specific harmonic analysis debugger in **Go** (`/app/nns-debug`) guided by the `HarmonyClinic` Markdown specification, validated by a vendored **Rust / Cargo** static AST checker (`Software/Languages` category).

---

## What the Task Asks the Agent to Do

Without internet access or external music libraries, the agent must implement a Go console application at `/app/main.go` and compile it to `/app/nns-debug`. The application parses scripted debug sessions and annotated chord charts, executing:
1. **Diatonic Transposition**: Maps Nashville Number System (NNS) numerals (1–7) across all major keys.
2. **Slash Chord Inversions**: Resolves bass degree inversions (e.g. `1/3` in Key C $\rightarrow$ `C/E`).
3. **Modal Interchange**: Resolves borrowed modal chords (e.g. `bVII` $\rightarrow$ `Bb` Major in Key C).
4. **Secondary Dominants**: Resolves dominant-of-dominant structures (e.g. `V/V` in Key C $\rightarrow$ `D` Major).
5. **Interactive Explanation Queries**: Responds to `WHY <symbol>` commands with detailed harmonic derivations.
6. **Trace Logging**: Outputs formatted evaluation logs to `/app/output/harmonic_trace.txt`.

---

## File Structure Overview

```
.
├── task.toml                    # Task manifest & Terminus 3 metadata
├── instruction.md               # Prompt given to benchmark models
├── README.md                    # Task documentation
├── environment/                 # Base environment setup
│   ├── Dockerfile               # Pins Python base image and installs Go, tmux, asciinema
│   └── data/
│       ├── HARMONY_CLINIC.md    # Markdown spec for NNS harmonic rules
│       ├── session.script       # Scripted debug session commands
│       └── song.chord           # Annotated chord transcription chart
├── solution/
│   └── solve.sh                 # Reference oracle script compiling /app/main.go to /app/nns-debug
└── tests/                       # Verifier container setup
    ├── Dockerfile               # Builds vendored Cargo Rust static analyzer
    ├── test.sh                  # Verifier entrypoint executing pytest
    ├── test_outputs.py          # Pytest suite running Rust static analyzer
    └── verifier/                # Rust Cargo project for static code & trace verification
        ├── Cargo.toml
        └── src/main.rs
```

---

## Why This Belongs in the Frontier Tier (< 20% Pass Rate)

1. **Multi-Language Architecture**: Go application implementation coupled with Rust Cargo AST static verification.
2. **Strict Go Struct Enforcement**: Source code at `/app/main.go` must define exact struct types (`Chord`, `KeyContext`, `HarmonicTrace`) inspected statically by the Rust checker.
3. **Anti-Cheating Checks**: The Cargo verifier inspects Go source code AST patterns to detect and reject hardcoded transcript answers.
4. **No-Network Constraint**: All Go and Rust dependencies are vendored offline (`network_mode = "no-network"`).

---

## How to Test Locally

```bash
# 1. Spin up interactive environment
stb harbor tasks start-env -p . -i

# 2. Test reference oracle solution (Expected: 100% PASS)
stb harbor run -a oracle -p .

# 3. Evaluate benchmark LLM pass rates
stb harbor run -m @openai/gpt-5.5 -p . -k 5
stb harbor run -m @anthropic/claude-opus-4-8 -p . -k 5
```
