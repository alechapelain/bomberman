import 'phaser'
import { Coordinates } from '../characters/character.model';

export default class Bomb {
    private bomb: Phaser.Physics.Arcade.Sprite;

    constructor(
        private physics: Phaser.Physics.Arcade.ArcadePhysics,
        private anims: Phaser.Animations.AnimationManager,
        private startCoordinates: Coordinates,
        private physicsBombs: Phaser.Physics.Arcade.Group
    ) {
        this.setBomb();
        this.setBombAnimations();

        this.bomb.play('bomb-twitching', true);
    }

    // ----------------------------------------------------------------------------------------

    private setBomb (): void {
        this.bomb = this.physics.add.sprite(this.startCoordinates.x, this.startCoordinates.y, 'stage1', 'stage1_19');
        this.physicsBombs.add(this.bomb);

        this.bomb.setDepth(1);
        this.bomb.body.setSize(16, 16, true);
        this.bomb.setImmovable()
    }

    private setBombAnimations (): void {
        this.anims.create({
            key: 'bomb-twitching',
            frames: this.anims.generateFrameNames('stage1', {
                prefix: 'stage1_',
                start: 19,
                end: 16
            }),
            repeat: -1,
            frameRate: 6
        });
    }
}
