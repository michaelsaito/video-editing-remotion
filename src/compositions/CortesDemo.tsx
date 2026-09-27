import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';

/**
 * TEMPLATE: Cortes / variacoes em lote.
 *
 * A ideia: um unico componente recebe "props" diferentes (titulo,
 * subtitulo, cor) e voce renderiza VARIAS versoes do mesmo video
 * mudando so os dados - util pra gerar criativos de anuncio em lote
 * para clientes diferentes, ou testar variações de copy.
 *
 * Renderize variacoes em lote pela CLI, por exemplo:
 *   npx remotion render CortesDemo out/v1.mp4 --props='{"titulo":"Nova coleção","subtitulo":"Só até domingo","corDestaque":"#D4AF37"}'
 *   npx remotion render CortesDemo out/v2.mp4 --props='{"titulo":"Frete grátis hoje","subtitulo":"Aproveite","corDestaque":"#7A1F3D"}'
 */

type CortesDemoProps = {
  titulo: string;
  subtitulo: string;
  corDestaque: string;
};

export const CortesDemo: React.FC<CortesDemoProps> = ({
  titulo,
  subtitulo,
  corDestaque,
}) => {
  const frame = useCurrentFrame();
  const opacidade = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: 'clamp',
  });
  const subida = interpolate(frame, [0, 20], [40, 0], {
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#0A0A0A',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          opacity: opacidade,
          transform: `translateY(${subida}px)`,
          textAlign: 'center',
          padding: '0 80px',
        }}
      >
        <h1
          style={{
            fontFamily: 'Arial, sans-serif',
            fontSize: 84,
            fontWeight: 900,
            color: 'white',
            margin: 0,
          }}
        >
          {titulo}
        </h1>
        <div
          style={{
            marginTop: 24,
            display: 'inline-block',
            padding: '14px 32px',
            borderRadius: 999,
            backgroundColor: corDestaque,
            color: 'white',
            fontFamily: 'Arial, sans-serif',
            fontSize: 36,
            fontWeight: 700,
          }}
        >
          {subtitulo}
        </div>
      </div>
    </AbsoluteFill>
  );
};
