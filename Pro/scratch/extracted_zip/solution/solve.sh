#!/bin/bash
set -euo pipefail

mkdir -p /app/output

cat << 'GOEOF' > /app/main.go
package main

import (
	"bufio"
	"fmt"
	"os"
	"path/filepath"
	"strconv"
	"strings"
)

type KeyContext struct {
	RootNote string
	Mode     string
}

type Chord struct {
	Symbol     string
	RootPitch  string
	BassPitch  string
	Quality    string
	Function   string
	IsSlash    bool
	IsBorrowed bool
	IsSecDom   bool
}

type HarmonicTrace struct {
	Command   string
	Result    string
	Rationale string
}

var PitchClasses = []string{"C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"}
var PitchClassesFlats = []string{"C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"}

func PitchIndex(pitch string) int {
	for i, p := range PitchClasses {
		if p == pitch {
			return i
		}
	}
	for i, p := range PitchClassesFlats {
		if p == pitch {
			return i
		}
	}
	return 0
}

var MajorScaleOffsets = []int{0, 2, 4, 5, 7, 9, 11}

func TransposePitch(root string, semitones int) string {
	idx := (PitchIndex(root) + semitones) % 12
	if idx < 0 {
		idx += 12
	}
	return PitchClasses[idx]
}

func TransposePitchWithFlats(root string, semitones int) string {
	idx := (PitchIndex(root) + semitones) % 12
	if idx < 0 {
		idx += 12
	}
	return PitchClassesFlats[idx]
}

func degreeToOffset(degStr string) int {
	degStr = strings.TrimPrefix(degStr, "b")
	degStr = strings.TrimPrefix(degStr, "#")
	degStr = strings.TrimSuffix(degStr, "m")
	degStr = strings.TrimSuffix(degStr, "dim")
	lower := strings.ToLower(degStr)

	switch lower {
	case "1", "i":
		return 0
	case "2", "ii":
		return 2
	case "3", "iii":
		return 4
	case "4", "iv":
		return 5
	case "5", "v":
		return 7
	case "6", "vi":
		return 9
	case "7", "vii":
		return 11
	default:
		val, err := strconv.Atoi(lower)
		if err == nil && val >= 1 && val <= 7 {
			return MajorScaleOffsets[val-1]
		}
		return 0
	}
}

func ResolveNNS(symbol string, keyCtx KeyContext) Chord {
	c := Chord{
		Symbol:   symbol,
		Function: "Diatonic Scale Degree",
	}

	if strings.HasPrefix(symbol, "V/") {
		c.IsSecDom = true
		c.Function = "Secondary Dominant"
		targetDegreeStr := strings.TrimPrefix(symbol, "V/")
		targetOffset := degreeToOffset(targetDegreeStr)
		targetPitch := TransposePitch(keyCtx.RootNote, targetOffset)
		rootPitch := TransposePitch(targetPitch, 7)
		c.RootPitch = rootPitch
		c.BassPitch = rootPitch
		c.Quality = "Major"
		return c
	}

	parts := strings.Split(symbol, "/")
	mainSymbol := parts[0]
	slashDegree := ""
	if len(parts) > 1 {
		c.IsSlash = true
		slashDegree = parts[1]
	}

	var rootPitch string
	var quality string

	if mainSymbol == "bVII" {
		c.IsBorrowed = true
		c.Function = "Borrowed Modal Interchange (Mixolydian)"
		rootPitch = TransposePitchWithFlats(keyCtx.RootNote, 10)
		quality = "Major"
	} else if mainSymbol == "bIII" {
		c.IsBorrowed = true
		c.Function = "Borrowed Modal Interchange (Dorian)"
		rootPitch = TransposePitchWithFlats(keyCtx.RootNote, 3)
		quality = "Major"
	} else if mainSymbol == "iv" {
		c.IsBorrowed = true
		c.Function = "Borrowed Modal Interchange (Minor 4th)"
		rootPitch = TransposePitch(keyCtx.RootNote, 5)
		quality = "Minor"
	} else {
		degOffset := degreeToOffset(mainSymbol)
		rootPitch = TransposePitch(keyCtx.RootNote, degOffset)
		if strings.HasSuffix(mainSymbol, "m") {
			quality = "Minor"
		} else if strings.HasSuffix(mainSymbol, "dim") {
			quality = "Diminished"
		} else if mainSymbol == "2" || mainSymbol == "3" || mainSymbol == "6" {
			quality = "Minor"
		} else {
			quality = "Major"
		}
	}

	c.RootPitch = rootPitch
	c.Quality = quality

	if c.IsSlash {
		bassOffset := degreeToOffset(slashDegree)
		c.BassPitch = TransposePitch(keyCtx.RootNote, bassOffset)
	} else {
		c.BassPitch = rootPitch
	}

	return c
}

func main() {
	if len(os.Args) < 3 {
		fmt.Println("Usage: nns-debug <session.script> <song.chord>")
		os.Exit(1)
	}

	scriptPath := os.Args[1]

	file, err := os.Open(scriptPath)
	if err != nil {
		fmt.Printf("Error opening script: %v\n", err)
		os.Exit(1)
	}
	defer file.Close()

	keyCtx := KeyContext{RootNote: "C", Mode: "Major"}
	var traces []HarmonicTrace

	scanner := bufio.NewScanner(file)
	for scanner.Scan() {
		line := strings.TrimSpace(scanner.Text())
		if line == "" || strings.HasPrefix(line, "#") {
			continue
		}

		parts := strings.Fields(line)
		cmd := parts[0]

		switch cmd {
		case "KEY":
			if len(parts) > 1 {
				keyCtx.RootNote = parts[1]
				t := HarmonicTrace{
					Command:   line,
					Result:    fmt.Sprintf("Key set to %s Major", keyCtx.RootNote),
					Rationale: fmt.Sprintf("Established tonic center at pitch %s", keyCtx.RootNote),
				}
				traces = append(traces, t)
			}
		case "EVAL":
			if len(parts) > 1 {
				symbol := parts[1]
				chord := ResolveNNS(symbol, keyCtx)
				resStr := fmt.Sprintf("%s -> %s %s", symbol, chord.RootPitch, chord.Quality)
				if chord.IsSlash {
					resStr += fmt.Sprintf(" over %s bass", chord.BassPitch)
				}
				ratStr := fmt.Sprintf("Resolved degree in key of %s. Function: %s", keyCtx.RootNote, chord.Function)
				t := HarmonicTrace{
					Command:   line,
					Result:    resStr,
					Rationale: ratStr,
				}
				traces = append(traces, t)
			}
		case "WHY":
			if len(parts) > 1 {
				symbol := parts[1]
				chord := ResolveNNS(symbol, keyCtx)
				resStr := fmt.Sprintf("Explanation for %s in Key of %s:", symbol, keyCtx.RootNote)
				ratStr := fmt.Sprintf("Root Pitch: %s | Quality: %s | Bass: %s | Harmonic Context: %s", chord.RootPitch, chord.Quality, chord.BassPitch, chord.Function)
				t := HarmonicTrace{
					Command:   line,
					Result:    resStr,
					Rationale: ratStr,
				}
				traces = append(traces, t)
			}
		case "TRACE":
			outDir := "/app/output"
			os.MkdirAll(outDir, 0755)
			outPath := filepath.Join(outDir, "harmonic_trace.txt")

			outFile, err := os.Create(outPath)
			if err != nil {
				fmt.Printf("Error creating trace output: %v\n", err)
				os.Exit(1)
			}
			defer outFile.Close()

			writer := bufio.NewWriter(outFile)
			writer.WriteString("================ HARMONIC DEBUG TRACE LOG ================\n")
			for i, tr := range traces {
				writer.WriteString(fmt.Sprintf("[%03d] CMD: %s\n", i+1, tr.Command))
				writer.WriteString(fmt.Sprintf("      OUT: %s\n", tr.Result))
				writer.WriteString(fmt.Sprintf("      WHY: %s\n\n", tr.Rationale))
			}
			writer.Flush()
			fmt.Println("Harmonic trace log written successfully to /app/output/harmonic_trace.txt")
		}
	}
}
GOEOF

go build -o /app/nns-debug /app/main.go
chmod +x /app/nns-debug
/app/nns-debug /app/data/session.script /app/data/song.chord
echo "Oracle solution executed successfully!"
