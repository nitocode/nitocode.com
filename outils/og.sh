#!/bin/sh
# Refait les images d'aperçu (img/og.png et img/og-en.png) à partir de outils/og.html.
# Lancer depuis la racine du repo : sh outils/og.sh
set -e
CHROME="${CHROME:-/c/Program Files/Google/Chrome/Application/chrome.exe}"
python -m http.server 8766 --bind 127.0.0.1 >/dev/null 2>&1 &
SERVEUR=$!
trap 'kill $SERVEUR' EXIT
sleep 1
for L in fr en; do
  SORTIE="img/og.png"; [ "$L" = en ] && SORTIE="img/og-en.png"
  "$CHROME" --headless=new --hide-scrollbars --virtual-time-budget=6000 --window-size=1200,630 \
    --screenshot="$(pwd)/$SORTIE" "http://127.0.0.1:8766/outils/og.html?lang=$L" 2>/dev/null
  echo "$SORTIE"
done
