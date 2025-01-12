export class Player extends Phaser.GameObjects.Sprite {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 'bunny-idle');

    scene.add.existing(this);

    scene.physics.add.existing(this);

    // (this.body as Phaser.Physics.Arcade.Body).setCollideWorldBounds(true);

    this.anims.create({
      key: 'idle',
      frames: this.anims.generateFrameNumbers('bunny-idle', {
        start: 0,
        end: 7,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: 'down',
      frames: this.anims.generateFrameNumbers('bunny-front', {
        start: 0,
        end: 5,
      }),
      frameRate: 10,
      repeat: -1,
    });

    // // Left facing animation
    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('bunny-left', {
        start: 0,
        end: 8,
      }),
      frameRate: 10,
      repeat: -1,
    });

    // // Right facing animation
    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('bunny-right', {
        start: 0,
        end: 8,
      }),
      frameRate: 10,
      repeat: -1,
    });

    // // Up facing animation
    this.anims.create({
      key: 'up',
      frames: this.anims.generateFrameNumbers('bunny-back', {
        start: 0,
        end: 7,
      }),
      frameRate: 8,
      repeat: -1,
    });
  }

  update(...args: any[]): void {
    const cursors = this.scene.input.keyboard?.createCursorKeys();
    const speed = 160;

    const PLAYER_BODY = this.body as Phaser.Physics.Arcade.Body;

    PLAYER_BODY.setVelocity(0);

    // Horizontal Movement
    if (cursors?.left.isDown) {
      PLAYER_BODY.setVelocityX(-speed);
      this.anims.play('left', true);
    } else if (cursors?.right.isDown) {
      PLAYER_BODY.setVelocityX(speed);
      this.anims.play('right', true);
    }

    PLAYER_BODY.velocity.normalize().scale(speed);

    // Vertical Movement
    if (cursors?.up.isDown) {
      PLAYER_BODY.setVelocityY(-speed);
      this.anims.play('up', true);
    } else if (cursors?.down.isDown) {
      PLAYER_BODY.setVelocityY(80);
      this.anims.play('down', true);
    }

    // Idle
    if (
      !cursors?.up.isDown &&
      !cursors?.down.isDown &&
      !cursors?.left.isDown &&
      !cursors?.right.isDown
    ) {
      this.anims.play('idle', true);
    }
  }
}
