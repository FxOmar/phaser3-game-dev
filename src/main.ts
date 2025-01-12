import { Boot } from './scenes/Boot';
import { Game as MainGame } from './scenes/Game';
import { Preloader } from './scenes/Preloader';

declare global {
  interface Window {
    sizeChanged: () => void;
    game: Game;
  }
}

import { Game, type Types } from 'phaser';

const config: Types.Core.GameConfig = {
  type: Phaser.WEBGL,
  parent: 'game-container',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { x: 0, y: 0 },
      debug: true,
    },
  },
  scale: {
    mode: Phaser.Scale.ScaleModes.NONE,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: window.innerWidth,
    height: window.innerHeight,
  },
  render: {
    antialiasGL: false,
    pixelArt: true,
  },
  callbacks: {
    postBoot: () => {
      window.sizeChanged();
    },
  },
  canvasStyle: `display: block; width: 100%; height: 100%;`,
  autoFocus: true,
  audio: {
    disableWebAudio: false,
  },
  scene: [Boot, Preloader, MainGame],
};

const game = new Game(config);

window.sizeChanged = () => {
  if (game.isBooted) {
    setTimeout(() => {
      game.scale.resize(window.innerWidth, window.innerHeight);
      game.canvas.setAttribute(
        'style',
        `display: block; width: ${window.innerWidth}px; height: ${window.innerHeight}px;`
      );
    }, 100);
  }
};

window.onresize = () => window.sizeChanged();

export default game;
