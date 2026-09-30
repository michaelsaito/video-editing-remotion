import React from 'react';
import {
  AbsoluteFill,
  OffthreadVideo,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import { roteiro, Palavra } from './roteiro';

/**
 * Composicao FINAL: video real + grading cinematografico + legenda
 * sincronizada com o roteiro real (ver roteiro.ts para como o timing
 * foi calculado e as ressalvas sobre precisao).
 */

const GRADE = {
  contraste: 1.15,
  saturacao: 1.12,
  brilho: 0.95,
  vinhetaOpacidade: 0.35,
  colorGradeOpacidade: 0.16,
};

const PalavraAtual: React.FC<{ palavra: Palavra }> = ({ palavra }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const inicioFrame = palavra.inicioSegundos * fps;
  const progresso = spring({
    frame: frame - inicioFrame,
    fps,
    config: { damping: 12, stiffness: 200 },
  });

  const escala = interpolate(progresso, [0, 1], [0.6, 1]);
  const opacidade = interpolate(progresso, [0, 1], [0, 1]);

  return (
    <span
      style={{
        display: 'inline-block',
        transform: `scale(${escala})`,
        opacity: opacidade,
        marginRight: 12,
      }}
    >
      {palavra.texto}
    </span>
  );
};

export const VideoFinal: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const segundoAtual = frame / fps;

  const palavrasVisiveis = roteiro.filter(
    (p) => segundoAtual >= p.inicioSegundos && segundoAtual <= p.fimSegundos + 0.7
  );

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

      {/* Color grade teal & orange */}
      <AbsoluteFill
        style={{
          background:
            'linear-gradient(160deg, rgba(0,60,70,0.55) 0%, rgba(0,0,0,0) 45%, rgba(0,0,0,0) 55%, rgba(120,60,10,0.5) 100%)',
          mixBlendMode: 'overlay',
          opacity: GRADE.colorGradeOpacidade,
        }}
      />

      {/* Vinheta */}
      <AbsoluteFill
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(0,0,0,0) 55%, rgba(0,0,0,0.9) 100%)',
          opacity: GRADE.vinhetaOpacidade,
        }}
      />

      {/* Legenda sincronizada */}
      <AbsoluteFill
        style={{
          justifyContent: 'flex-end',
          alignItems: 'center',
          paddingBottom: 220,
        }}
      >
        <div
          style={{
            maxWidth: '88%',
            textAlign: 'center',
            fontFamily: 'Arial, sans-serif',
            fontSize: 58,
            fontWeight: 800,
            color: 'white',
            textShadow: '0 4px 14px rgba(0,0,0,0.85)',
            lineHeight: 1.25,
          }}
        >
          {palavrasVisiveis.map((p, i) => (
            <PalavraAtual key={i} palavra={p} />
          ))}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
