#!/bin/bash
set -e

echo "Downloading Video from : $INPUT_URL"
curl -o input.mp4 "$INPUT_URL"

# Creating a Output Dirctory to store processed ffmpeg stuff.
echo "Creating Output Dircetory.."
mkdir outputs

echo "Running ffmpeg processing...."

ffmpeg -loglevel verbose -i input.mp4 \
  -codec:v libx264 \
  -codec:a aac \
  -hls_time 10 \
  -hls_playlist_type vod \
  -hls_segment_filename "outputs/segment%03d.ts" \
  -start_number 0 \
  outputs/index.m3u8

echo "Processing Complete..."

# run a node.js file to upload the segment files to final S3Bucket.
echo "Running a Upload_TO_S3_Service..."
echo "Running a Upload_TO_S3_Service..."
echo "Running a Upload_TO_S3_Service..."
echo "Running a Upload_TO_S3_Service..."
echo "Running a Upload_TO_S3_Service..."

node dist/index.js

# tail -f /dev/null , some time testing Purpose.
