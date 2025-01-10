import { Scene } from 'phaser';
import { Player } from '../sprites/Player';

export class Game extends Scene {
  camera: Phaser.Cameras.Scene2D.Camera;
  background: Phaser.GameObjects.Image;
  msg_text: Phaser.GameObjects.Text;
  platforms: Phaser.Physics.Arcade.StaticGroup;
  Player: Player;
  stars: Phaser.Physics.Arcade.Group;

  constructor() {
    super('Game');
  }

  create() {
    this.add.image(400, 300, 'sky');

    this.platforms = this.physics.add.staticGroup();

    this.platforms.create(400, 568, 'ground').setScale(2).refreshBody();

    this.platforms.create(600, 400, 'ground');
    this.platforms.create(50, 250, 'ground');
    this.platforms.create(750, 220, 'ground');

    this.Player = new Player(this, 100, 450);

    this.physics.add.collider(this.Player, this.platforms);

    this.stars = this.physics.add.group({
      key: 'star',
      repeat: 11,
      setXY: { x: 12, y: 0, stepX: 70 },
    });

    this.stars.children.iterate(
      (child: Phaser.GameObjects.GameObject): boolean | null => {
        const star = child as Phaser.Physics.Arcade.Image;
        star.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
        return null;
      }
    );

    this.physics.add.collider(this.stars, this.platforms);
    this.physics.add.overlap(
      this.Player,
      this.stars,
      this.collectStar,
      undefined,
      this
    );
  }

  update(time: number, delta: number): void {
    this.Player.update(time, delta);
  }

  collectStar(player: any, star: any): void {
    star.disableBody(true, true);
  }
}
