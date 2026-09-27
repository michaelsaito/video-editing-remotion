import { Config } from '@remotion/cli/config';

Config.setVideoImageFormat('jpeg');
Config.setOverwriteOutput(true);
Config.setCodec('h264');

// Este ambiente ja tem um Chromium headless pre-instalado (usado pelo
// Playwright). Apontamos o Remotion pra ele em vez de tentar baixar um
// proprio, porque o download direto do Google costuma ser bloqueado por
// regras de rede em ambientes de nuvem/CI.
const chromiumPreInstalado =
  '/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell';
if (require('fs').existsSync(chromiumPreInstalado)) {
  Config.setBrowserExecutable(chromiumPreInstalado);
}
