#!/bin/sh
# Re-renders the share preview images (public/img/og.png and og-en.png) from tools/og.html.
# Run from the repo root: sh tools/og.sh
set -e
CHROME="${CHROME:-/c/Program Files/Google/Chrome/Application/chrome.exe}"
python -m http.server 8766 --bind 127.0.0.1 >/dev/null 2>&1 &
SERVER=$!
trap 'kill $SERVER' EXIT
sleep 1
for L in fr en; do
  OUT="public/img/og.png"; [ "$L" = en ] && OUT="public/img/og-en.png"
  "$CHROME" --headless=new --hide-scrollbars --virtual-time-budget=6000 --window-size=1200,630 \
    --screenshot="$(pwd)/$OUT" "http://127.0.0.1:8766/tools/og.html?lang=$L" 2>/dev/null
  echo "$OUT"
done
