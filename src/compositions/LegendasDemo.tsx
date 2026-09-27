import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

/**
 * TEMPLATE: Legendas animadas, palavra a palavra (estilo Reels/TikTok).
 *
 * Como usar com um video real:
 * 1. Gere a transcricao do seu video (ex: Whisper da OpenAI, ou a
 *    ferramenta de legenda do proprio editor que voce ja usa).
 * 2. Preencha o array `roteiro` abaixo com { texto, inicioSegundos, fimSegundos }.
 * 3. Coloque um <OffthreadVideo src={...}/> como fundo, atras deste
 *    componente de legenda (veja o comentario no final do arquivo).
 */

type Palavra = {
  texto: string;
  inicioSegundos: number;
  fimSegundos: number;
};

const roteiro: Palavra[] = [
  { texto: 'Essa', inicioSegundos: 0.0, fimSegundos: 0.4 },
  { texto: 'é', inicioSegundos: 0.4, fimSegundos: 0.55 },
  { texto: 'a', inicioSegundos: 0.55, fimSegundos: 0.65 },
  { texto: 'legenda', inicioSegundos: 0.65, fimSegundos: 1.2 },
  { texto: 'animada', inicioSegundos: 1.2, fimSegundos: 1.8 },
  { texto: 'do', inicioSegundos: 1.8, fimSegundos: 1.95 },
  { texto: 'template.', inicioSegundos: 1.95, fimSegundos: 2.6 },
  { texto: 'Troque', inicioSegundos: 3.0, fimSegundos: 3.4 },
  { texto: 'pelo', inicioSegundos: 3.4, fimSegundos: 3.6 },
  { texto: 'seu', inicioSegundos: 3.6, fimSegundos: 3.8 },
  { texto: 'roteiro.', inicioSegundos: 3.8, fimSegundos: 4.4 },
];

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
        marginRight: 14,
      }}
    >
      {palavra.texto}
    </span>
  );
};

export const LegendasDemo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const segundoAtual = frame / fps;

  const palavrasVisiveis = roteiro.filter(
    (p) => segundoAtual >= p.inicioSegundos && segundoAtual <= p.fimSegundos + 0.6
  );

  return (
    <AbsoluteFill style={{ backgroundColor: '#000' }}>
      {/*
        Para usar com video de fundo real, troque a linha acima por:
        <AbsoluteFill>
          <OffthreadVideo src={staticFile('seu-video.mp4')} />
      */}
      <AbsoluteFill
        style={{
          justifyContent: 'flex-end',
          alignItems: 'center',
          paddingBottom: 220,
        }}
      >
        <div
          style={{
            maxWidth: '85%',
            textAlign: 'center',
            fontFamily: 'Arial, sans-serif',
            fontSize: 68,
            fontWeight: 800,
            color: 'white',
            textShadow: '0 4px 12px rgba(0,0,0,0.8)',
            lineHeight: 1.2,
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
