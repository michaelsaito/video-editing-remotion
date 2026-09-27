#!/usr/bin/env bash
# Corta um trecho de um video usando ffmpeg (sem re-renderizar, rapido).
#
# Uso:
#   ./scripts/ffmpeg-cortar.sh entrada.mp4 00:00:05 00:00:12 saida.mp4
#
# Parametros:
#   $1 = arquivo de entrada
#   $2 = tempo de inicio (HH:MM:SS)
#   $3 = tempo de fim (HH:MM:SS)
#   $4 = arquivo de saida

set -euo pipefail

ENTRADA="$1"
INICIO="$2"
FIM="$3"
SAIDA="$4"

ffmpeg -y -i "$ENTRADA" -ss "$INICIO" -to "$FIM" -c copy "$SAIDA"

echo "Corte salvo em: $SAIDA"
