#!/usr/bin/env bash
# Regenerate lightweight JPEGs under each .../Web/ folder after you change masters.
# Requires ffmpeg on PATH.
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
H="$ROOT/Pictures/Horizontal"
HW="$H/Web"
IV="$ROOT/Pictures/InvertedVertical"
IVW="$IV/Web"
RW="$ROOT/Pictures/Resources/Web"

mkdir -p "$HW" "$IVW" "$RW"

echo "Horizontal banner → Web (max 1920px wide, q 5)…"
for f in "$H"/*.jpg; do
  [[ -f "$f" ]] || continue
  base=$(basename "$f")
  ffmpeg -y -hide_banner -loglevel error -i "$f" -vf "scale=min(1920\\,iw):-1" -q:v 5 "$HW/$base"
done

echo "Inverted vertical gallery → Web (max 960px wide, q 4)…"
for f in "$IV"/*.jpg; do
  [[ -f "$f" ]] || continue
  base=$(basename "$f")
  ffmpeg -y -hide_banner -loglevel error -i "$f" -vf "scale=min(960\\,iw):-1" -q:v 4 "$IVW/$base"
done

echo "Resources page previews → Web (max 1200px wide, q 5)…"
for base in latam_vertical.jpg latam_vertical_inverted.jpg latam_horizontal.jpg latam_horizontal_inverted.jpg; do
  f="$ROOT/Pictures/Resources/$base"
  [[ -f "$f" ]] || continue
  ffmpeg -y -hide_banner -loglevel error -i "$f" -vf "scale=min(1200\\,iw):-1" -q:v 5 "$RW/$base"
done

echo "Done."
du -sh "$HW" "$IVW" "$RW"
