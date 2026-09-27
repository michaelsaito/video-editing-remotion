#!/usr/bin/env bash
# Junta varios clipes de video em um so (mesmo codec/resolucao).
#
# Uso:
#   ./scripts/ffmpeg-juntar.sh saida.mp4 clipe1.mp4 clipe2.mp4 clipe3.mp4

set -euo pipefail

SAIDA="$1"
shift

LISTA=$(mktemp)
for arquivo in "$@"; do
  echo "file '$(realpath "$arquivo")'" >> "$LISTA"
done

ffmpeg -y -f concat -safe 0 -i "$LISTA" -c copy "$SAIDA"
rm "$LISTA"

echo "Video final salvo em: $SAIDA"
