use std::fs;
use std::path::Path;
use std::process;

fn main() {
    println!("--- Running Cargo Static Verifier & Harmonic Analysis Checker ---");

    let go_source_path = Path::new("/app/main.go");
    let trace_path = Path::new("/app/output/harmonic_trace.txt");

    // 1. Static Source Code Checks on Go file
    if !go_source_path.exists() {
        eprintln!("Error: Go source file /app/main.go does not exist");
        process::exit(1);
    }

    let source_code = fs::read_to_string(go_source_path).unwrap_or_default();

    if !source_code.contains("type KeyContext struct") {
        eprintln!("Error: Go source missing required type 'KeyContext struct'");
        process::exit(1);
    }

    if !source_code.contains("type Chord struct") {
        eprintln!("Error: Go source missing required type 'Chord struct'");
        process::exit(1);
    }

    if !source_code.contains("type HarmonicTrace struct") {
        eprintln!("Error: Go source missing required type 'HarmonicTrace struct'");
        process::exit(1);
    }

    // Anti-cheating check: check that solution doesn't hardcode output without parsing
    if source_code.contains("HARMONIC DEBUG TRACE LOG") && source_code.contains("Resolved degree in key of C") && !source_code.contains("bufio.NewScanner") {
        eprintln!("Error: Go source appears to hardcode transcript answers without file parsing!");
        process::exit(1);
    }

    println!("Static Check 1 (Go Struct Definitions & Parser Logic): PASS");

    // 2. Harmonic Trace File Verification
    if !trace_path.exists() {
        eprintln!("Error: Harmonic trace log /app/output/harmonic_trace.txt does not exist");
        process::exit(1);
    }

    let trace_content = fs::read_to_string(trace_path).unwrap_or_default();

    if trace_content.len() < 100 {
        eprintln!("Error: Harmonic trace log content is too short");
        process::exit(1);
    }

    if !trace_content.contains("HARMONIC DEBUG TRACE LOG") {
        eprintln!("Error: Trace header missing");
        process::exit(1);
    }

    // Check specific harmonic resolutions in trace log
    let required_snippets = [
        "KEY C",
        "EVAL 1/3",
        "EVAL bVII",
        "EVAL V/V",
        "WHY 1/3",
        "WHY V/V",
        "KEY G",
        "EVAL 5/7",
        "EVAL V/ii",
        "WHY V/ii",
        "1/3 -> C Major over E bass",
        "bVII -> Bb Major",
        "V/V -> D Major",
        "5/7 -> D Major over F# bass",
        "V/ii -> E Major"
    ];

    for snippet in &required_snippets {
        if !trace_content.contains(snippet) {
            eprintln!("Error: Trace log missing expected resolution snippet '{}'", snippet);
            process::exit(1);
        }
    }

    println!("Verification Check 2 (Harmonic Trace Resolution Accuracy): PASS");
    println!("VERIFICATION_SUCCESS: All Cargo static checks and harmonic trace assertions passed!");
    process::exit(0);
}
