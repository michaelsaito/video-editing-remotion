# video-editing-remotion

Projeto de edição e geração de vídeo com Remotion (React) e ffmpeg — templates, roteiros e renders automatizados para conteúdo de vídeo com IA.

## O que tem aqui

Três templates prontos em `src/compositions/`, cada um cobrindo um tipo de edição:

| Template | O que faz | Arquivo |
|---|---|---|
| **TransicoesDemo** | Corta entre cenas com transições (fade, slide, wipe) | `src/compositions/TransicoesDemo.tsx` |
| **LegendasDemo** | Legenda animada, palavra a palavra, estilo Reels/TikTok | `src/compositions/LegendasDemo.tsx` |
| **CortesDemo** | Mesmo vídeo, variações de texto/cor via props (bom pra lote de anúncios) | `src/compositions/CortesDemo.tsx` |

Além disso, `scripts/` tem dois helpers de `ffmpeg` pra cortar e juntar clipes de vídeo reais antes (ou depois) de passar pelo Remotion — útil pra pré-processar um vídeo gerado no Higgsfield, por exemplo.

## Como usar

### 1. Instalar dependências
```bash
npm install
```

### 2. Ver o preview ao vivo (Remotion Studio)
```bash
npm start
```
Abre uma janela local no navegador com o preview de cada composição, atualizando em tempo real conforme você edita o código.

### 3. Colocar seu vídeo real
Coloque o arquivo dentro de `public/` (ex: `public/meu-video.mp4`) e use `staticFile('meu-video.mp4')` + `<OffthreadVideo>` dentro do componente — os comentários nos templates mostram onde trocar.

### 4. Renderizar o vídeo final
```bash
npm run render:transicoes   # gera out/transicoes-demo.mp4
npm run render:legendas     # gera out/legendas-demo.mp4
npm run render:cortes       # gera out/cortes-demo.mp4
```

### 5. Gerar variações em lote (ex: pra ads)
```bash
npx remotion render CortesDemo out/v1.mp4 --props='{"titulo":"Nova coleção","subtitulo":"Só até domingo","corDestaque":"#D4AF37"}'
npx remotion render CortesDemo out/v2.mp4 --props='{"titulo":"Frete grátis hoje","subtitulo":"Aproveite","corDestaque":"#7A1F3D"}'
```
Cada `--props` diferente gera um vídeo diferente a partir do mesmo template — ótimo pra criativos de anúncio em lote.

### 6. Cortar/juntar clipes com ffmpeg (fora do Remotion)
```bash
./scripts/ffmpeg-cortar.sh entrada.mp4 00:00:05 00:00:12 saida.mp4
./scripts/ffmpeg-juntar.sh final.mp4 clipe1.mp4 clipe2.mp4 clipe3.mp4
```

## Próximos passos sugeridos
- Trocar os textos de exemplo do `LegendasDemo` pela transcrição real do seu vídeo (pode usar Whisper ou a legenda que sua ferramenta de edição já gera).
- Criar um novo template em `src/compositions/` para cada tipo de entrega recorrente (ex: um template fixo para a Allyma, outro para posts genéricos).
- Registrar cada novo template em `src/Root.tsx`.
