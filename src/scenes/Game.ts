import { Scene } from 'phaser';
import { Player } from '../sprites/Player';

export class Game extends Scene {
  camera: Phaser.Cameras.Scene2D.Camera;
  background: Phaser.GameObjects.Image;
  msg_text: Phaser.GameObjects.Text;
  Player: Player;
  stars: Phaser.Physics.Arcade.Group;

  constructor() {
    super('Game');
  }

  create() {
    const map = this.make.tilemap({ key: 'map' });

    const tileset = map.addTilesetImage('tuxmon-sample-32px-extruded', 'tiles');

    map.createLayer('Below Player', tileset as Phaser.Tilemaps.Tileset, 0, 0);
    const worldLayer = map.createLayer(
      'World',
      tileset as Phaser.Tilemaps.Tileset,
      0,
      0
    );
    const aboveLayer = map.createLayer(
      'Above Player',
      tileset as Phaser.Tilemaps.Tileset,
      0,
      0
    );

    worldLayer?.setCollisionByProperty({ collides: true });

    aboveLayer?.setDepth(10);

    const spawnPoint = map.findObject(
      'Objects',
      (obj) => obj.name === 'Spawn Point'
    );

    if (
      spawnPoint &&
      typeof spawnPoint.x === 'number' &&
      typeof spawnPoint.y === 'number'
    ) {
      this.Player = new Player(this, spawnPoint.x, spawnPoint.y);
    }

    this.Player.setScale(1.5);

    this.Player.setDisplayOrigin(8, 10);

    this.physics.add.collider(
      this.Player,
      worldLayer as Phaser.Tilemaps.TilemapLayer
    );

    const camera = this.cameras.main;

    camera.startFollow(this.Player);
    camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
  }

  update(time: number, delta: number): void {
    this.Player.update(time, delta);
  }
}
