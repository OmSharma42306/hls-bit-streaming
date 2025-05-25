#!/bin/bash
set -e

# Downloading Input video From S3
INPUT_URL=""

echo "Downloading Video from : $INPUT_URL"
curl -o input.webm "$INPUT_URL"

echo "Running ffmpeg processing...."

echo "Processing Complete..."

tail -f /dev/null
