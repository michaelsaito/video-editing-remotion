export type Palavra = {
  texto: string;
  inicioSegundos: number;
  fimSegundos: number;
};

/**
 * Timing das palavras do video "clipe-original.mp4".
 *
 * IMPORTANTE: como nao foi possivel rodar uma transcricao automatica
 * neste ambiente (rede bloqueada pro download do modelo), esse timing
 * foi estimado assim:
 *   1. Detectei os trechos de silencio reais no audio (ffmpeg
 *      silencedetect) - isso deu os blocos de fala com inicio/fim
 *      precisos.
 *   2. Dentro de cada bloco, distribui as palavras do roteiro que
 *      voce mandou proporcionalmente ao tamanho de cada palavra.
 *
 * Ou seja: o INICIO e FIM de cada frase/bloco é real (batido com o
 * audio). O timing PALAVRA a PALAVRA dentro do bloco é estimado, pode
 * ficar levemente fora de sincronia em alguma palavra especifica.
 * Se alguma legenda aparecer adiantada/atrasada, ajuste o numero
 * daquela palavra aqui (em segundos) e rode o preview de novo.
 */
export const roteiro: Palavra[] = [
  { texto: 'Me', inicioSegundos: 0.784, fimSegundos: 0.954 },
  { texto: 'falaram', inicioSegundos: 0.954, fimSegundos: 1.408 },
  { texto: 'o', inicioSegundos: 1.408, fimSegundos: 1.522 },
  { texto: 'seguinte,', inicioSegundos: 1.522, fimSegundos: 2.089 },
  { texto: 'Você', inicioSegundos: 2.089, fimSegundos: 2.373 },
  { texto: 'pega', inicioSegundos: 2.373, fimSegundos: 2.656 },
  { texto: 'o', inicioSegundos: 2.656, fimSegundos: 2.77 },
  { texto: 'seu', inicioSegundos: 2.77, fimSegundos: 2.997 },
  { texto: 'celular', inicioSegundos: 2.997, fimSegundos: 3.451 },
  { texto: 'Bota', inicioSegundos: 3.451, fimSegundos: 3.734 },
  { texto: 'na', inicioSegundos: 3.734, fimSegundos: 3.905 },
  { texto: 'sua', inicioSegundos: 3.905, fimSegundos: 4.132 },
  { texto: 'frente', inicioSegundos: 4.132, fimSegundos: 4.529 },
  { texto: 'Coloca', inicioSegundos: 4.529, fimSegundos: 4.926 },
  { texto: 'pra', inicioSegundos: 4.926, fimSegundos: 5.153 },
  { texto: 'gravar', inicioSegundos: 5.153, fimSegundos: 5.55 },

  { texto: 'Ai', inicioSegundos: 6.214, fimSegundos: 6.384 },
  { texto: 'tu', inicioSegundos: 6.384, fimSegundos: 6.555 },
  { texto: 'começa', inicioSegundos: 6.555, fimSegundos: 6.953 },
  { texto: 'a', inicioSegundos: 6.953, fimSegundos: 7.066 },
  { texto: 'falar', inicioSegundos: 7.066, fimSegundos: 7.407 },
  { texto: 'Sem', inicioSegundos: 7.407, fimSegundos: 7.634 },
  { texto: 'roteiro', inicioSegundos: 7.634, fimSegundos: 8.089 },
  { texto: 'Sem', inicioSegundos: 8.089, fimSegundos: 8.316 },
  { texto: 'nada', inicioSegundos: 8.316, fimSegundos: 8.6 },

  { texto: 'Como', inicioSegundos: 9.122, fimSegundos: 9.31 },
  { texto: 'se', inicioSegundos: 9.31, fimSegundos: 9.424 },
  { texto: 'você', inicioSegundos: 9.424, fimSegundos: 9.612 },
  { texto: 'estivesse', inicioSegundos: 9.612, fimSegundos: 9.989 },
  { texto: 'conversando', inicioSegundos: 9.989, fimSegundos: 10.441 },
  { texto: 'com', inicioSegundos: 10.441, fimSegundos: 10.592 },
  { texto: 'seus', inicioSegundos: 10.592, fimSegundos: 10.781 },
  { texto: 'amigos', inicioSegundos: 10.781, fimSegundos: 11.045 },
  { texto: 'normalmente', inicioSegundos: 11.045, fimSegundos: 11.497 },

  // Pausa longa real (11.5s -> 15.57s) = as reticencias do seu roteiro

  { texto: 'Quem', inicioSegundos: 15.567, fimSegundos: 15.697 },
  { texto: 'disse', inicioSegundos: 15.697, fimSegundos: 15.853 },
  { texto: 'que', inicioSegundos: 15.853, fimSegundos: 15.957 },
  { texto: 'eu', inicioSegundos: 15.957, fimSegundos: 16.035 },
  { texto: 'converso', inicioSegundos: 16.035, fimSegundos: 16.27 },
  { texto: 'com', inicioSegundos: 16.27, fimSegundos: 16.374 },
  { texto: 'meus', inicioSegundos: 16.374, fimSegundos: 16.504 },
  { texto: 'amig.', inicioSegundos: 16.504, fimSegundos: 16.66 },
];
