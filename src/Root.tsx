import React from 'react';
import { Composition } from 'remotion';
import { TransicoesDemo } from './compositions/TransicoesDemo';
import { LegendasDemo } from './compositions/LegendasDemo';
import { CortesDemo } from './compositions/CortesDemo';

// FPS e dimensoes padrao para conteudo vertical (Reels / TikTok / Shorts).
// Troque para 1920x1080 se for fazer video horizontal (YouTube, ads 16:9).
const FPS = 30;
const WIDTH = 1080;
const HEIGHT = 1920;

export const Root: React.FC = () => {
  return (
    <>
      {/* 1) Template de TRANSICOES entre clipes (fade, slide, wipe) */}
      <Composition
        id="TransicoesDemo"
        component={TransicoesDemo}
        durationInFrames={FPS * 9}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />

      {/* 2) Template de LEGENDAS animadas (palavra a palavra, estilo Reels) */}
      <Composition
        id="LegendasDemo"
        component={LegendasDemo}
        durationInFrames={FPS * 8}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />

      {/* 3) Template de CORTES / VARIACOES - mesmo roteiro, textos diferentes */}
      <Composition
        id="CortesDemo"
        component={CortesDemo}
        durationInFrames={FPS * 6}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
        defaultProps={{
          titulo: 'Nova coleção chegou',
          subtitulo: 'Confira agora',
          corDestaque: '#D4AF37',
        }}
      />
    </>
  );
};
