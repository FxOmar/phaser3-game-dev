export class Player extends Phaser.GameObjects.Sprite {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 'dude');

    scene.add.existing(this);

    scene.physics.add.existing(this);

    (this.body as Phaser.Physics.Arcade.Body).setBounce(0.2);
    (this.body as Phaser.Physics.Arcade.Body).setCollideWorldBounds(true);

    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: 'turn',
      frames: [{ key: 'dude', frame: 4 }],
      frameRate: 20,
    });

    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1,
    });
  }

  update(...args: any[]): void {
    const cursors = this.scene.input.keyboard?.createCursorKeys();

    if (cursors?.left.isDown) {
      (this.body as Phaser.Physics.Arcade.Body).setVelocityX(-160);

      this.anims.play('left', true);
    } else if (cursors?.right.isDown) {
      (this.body as Phaser.Physics.Arcade.Body).setVelocityX(160);

      this.anims.play('right', true);
    } else {
      (this.body as Phaser.Physics.Arcade.Body).setVelocityX(0);

      this.anims.play('turn');
    }

    if (
      cursors?.up.isDown &&
      (this.body as Phaser.Physics.Arcade.Body).touching.down
    ) {
      (this.body as Phaser.Physics.Arcade.Body).setVelocityY(-330);
    }
  }
}
