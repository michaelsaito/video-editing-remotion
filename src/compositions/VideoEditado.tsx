import React from 'react';
import { AbsoluteFill, OffthreadVideo, staticFile } from 'remotion';

/**
 * TEMPLATE: Video real com grading cinematografico + legenda.
 *
 * Como funciona o "look cinematografico" aqui (tudo via CSS, sem
 * re-renderizar o video em outro software):
 *
 * 1. `filter` no proprio <OffthreadVideo>: mais contraste, leve
 *    saturacao a mais e brilho levemente reduzido (evita o visual
 *    "estourado" de camera de celular).
 * 2. Camada de "color grade" por cima (gradiente teal nas sombras /
 *    laranja nas luzes, blend mode "overlay") - a combinacao teal &
 *    orange e o grading mais usado em cinema/trailers.
 * 3. Vinheta sutil nas bordas (escurece levemente os cantos, guia o
 *    olho pro centro/rosto).
 *
 * Ajuste os numeros abaixo em `GRADE` pra deixar mais ou menos intenso.
 */

const GRADE = {
  contraste: 1.15,
  saturacao: 1.12,
  brilho: 0.95,
  vinhetaOpacidade: 0.35,
  colorGradeOpacidade: 0.16,
};

export const VideoEditado: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: '#000' }}>
      {/* Video base, com correcao de cor via CSS filter */}
      <OffthreadVideo
        src={staticFile('clipe-original.mp4')}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          filter: `contrast(${GRADE.contraste}) saturate(${GRADE.saturacao}) brightness(${GRADE.brilho})`,
        }}
      />

      {/* Camada de color grade (teal nas sombras, laranja nas luzes) */}
      <AbsoluteFill
        style={{
          background:
            'linear-gradient(160deg, rgba(0,60,70,0.55) 0%, rgba(0,0,0,0) 45%, rgba(0,0,0,0) 55%, rgba(120,60,10,0.5) 100%)',
          mixBlendMode: 'overlay',
          opacity: GRADE.colorGradeOpacidade,
        }}
      />

      {/* Vinheta - escurece as bordas */}
      <AbsoluteFill
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(0,0,0,0) 55%, rgba(0,0,0,0.9) 100%)',
          opacity: GRADE.vinhetaOpacidade,
        }}
      />

      {/*
        A legenda entra aqui em cima, como mais uma AbsoluteFill,
        assim que tivermos o texto/roteiro do video.
        Ex: <LegendaSincronizada roteiro={roteiroReal} />
      */}
    </AbsoluteFill>
  );
};
