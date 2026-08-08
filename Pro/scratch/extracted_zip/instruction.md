Without network access or audio libraries, the specification in `/app/data/HARMONY_CLINIC.md` defines the exact harmonic rules for a Nashville Number System (NNS) analysis console. You must create a Go application at `/app/main.go` and compile it into an executable binary at `/app/nns-debug`.

Your Go console application must fulfill the following operational requirements:
- **CLI Interface & Struct Architecture**: Accept input paths as positional CLI arguments (`/app/nns-debug <session.script> <song.chord>`). Your Go source at `/app/main.go` must define structured types `Chord`, `KeyContext`, and `HarmonicTrace` for static AST verification.
- **Harmonic Engine Logic**: Implement diatonic scale transposition for all major keys, support slash chord inversions (e.g. `1/3`), resolve borrowed modal chords (e.g. `bVII`), and parse secondary dominants (e.g. `V/V`).
- **Session Script Commands**: Support `KEY <root>` key changes, `EVAL <nns_symbol>` chord evaluations, `WHY <nns_symbol>` explanation queries, and `TRACE` output generation.
- **Output Artifact**: Write deterministic harmonic evaluation and explanation logs to `/app/output/harmonic_trace.txt`.


