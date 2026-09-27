import React from 'react';
import { AbsoluteFill, useVideoConfig } from 'remotion';
import { TransitionSeries, linearTiming } from '@remotion/transitions';
import { fade } from '@remotion/transitions/fade';
import { slide } from '@remotion/transitions/slide';
import { wipe } from '@remotion/transitions/wipe';

/**
 * TEMPLATE: Transicoes entre clipes/cenas.
 *
 * Troque cada <Slide> por um <OffthreadVideo src={...} /> com o seu
 * clipe real (pode ser um video gerado no Higgsfield, por exemplo).
 * O TransitionSeries cuida de cortar e encaixar a transicao entre
 * uma cena e a proxima automaticamente.
 */

const Slide: React.FC<{ cor: string; texto: string }> = ({ cor, texto }) => (
  <AbsoluteFill
    style={{
      backgroundColor: cor,
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <h1
      style={{
        color: 'white',
        fontFamily: 'Arial, sans-serif',
        fontSize: 64,
        fontWeight: 700,
        textAlign: 'center',
        padding: '0 60px',
      }}
    >
      {texto}
    </h1>
  </AbsoluteFill>
);

export const TransicoesDemo: React.FC = () => {
  const { fps } = useVideoConfig();

  return (
    <TransitionSeries>
      <TransitionSeries.Sequence durationInFrames={fps * 3}>
        <Slide cor="#111111" texto="Cena 1" />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: fps / 2 })}
      />

      <TransitionSeries.Sequence durationInFrames={fps * 3}>
        <Slide cor="#7A1F3D" texto="Cena 2" />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={slide({ direction: 'from-right' })}
        timing={linearTiming({ durationInFrames: fps / 2 })}
      />

      <TransitionSeries.Sequence durationInFrames={fps * 3}>
        <Slide cor="#1F3D7A" texto="Cena 3" />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={wipe({ direction: 'from-bottom' })}
        timing={linearTiming({ durationInFrames: fps / 2 })}
      />
    </TransitionSeries>
  );
};
