"""Terminus 3 Verification Suite for Go Nashville Number Debug Console."""
import os
import subprocess
from pathlib import Path
import pytest


def test_go_binary_and_source_exist():
    """Verify that compiled Go binary /app/nns-debug and source /app/main.go exist."""
    binary_path = Path("/app/nns-debug")
    source_path = Path("/app/main.go")
    
    assert source_path.exists(), "Go source code /app/main.go does not exist"
    assert binary_path.exists(), "Compiled Go binary /app/nns-debug does not exist"
    assert os.access(binary_path, os.X_OK), "Go binary /app/nns-debug is not executable"


def test_cargo_static_verifier():
    """Run vendored Cargo Rust static verifier on Go AST and harmonic trace log."""
    checker_bin = Path("/tests/verifier/target/release/cargo_checker")
    
    if checker_bin.exists():
        cmd = [str(checker_bin)]
    else:
        cmd = ["cargo", "run", "--manifest-path", "/tests/verifier/Cargo.toml", "--release"]

    res = subprocess.run(cmd, capture_output=True, text=True, timeout=60)
    assert res.returncode == 0, f"Cargo static verifier failed with output:\nSTDOUT:\n{res.stdout}\nSTDERR:\n{res.stderr}"
    assert "VERIFICATION_SUCCESS" in res.stdout, "Cargo static verifier did not emit VERIFICATION_SUCCESS"


def test_harmonic_trace_resolutions():
    """Verify harmonic trace log contains expected NNS slash chord and secondary dominant resolutions."""
    trace_path = Path("/app/output/harmonic_trace.txt")
    assert trace_path.exists(), "Harmonic trace file /app/output/harmonic_trace.txt missing"
    
    content = trace_path.read_text(encoding="utf-8")
    assert "1/3 -> C Major over E bass" in content, "Missing 1/3 resolution in Key of C"
    assert "bVII -> Bb Major" in content, "Missing bVII resolution in Key of C"
    assert "V/V -> D Major" in content, "Missing V/V resolution in Key of C"
    assert "5/7 -> D Major over F# bass" in content, "Missing 5/7 resolution in Key of G"
    assert "V/ii -> E Major" in content, "Missing V/ii resolution in Key of G"
