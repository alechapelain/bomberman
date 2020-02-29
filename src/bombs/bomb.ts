import 'phaser'
import { Coordinates } from '../characters/character.model';
import { BombConfiguration } from './bomb.model';

export default class Bomb {

    constructor(
        private physics: Phaser.Physics.Arcade.ArcadePhysics,
        private anims: Phaser.Animations.AnimationManager,
        private physicsBombs: Phaser.Physics.Arcade.Group
    ) {
        this.setBombAnimations();
    }

    /**
     * Throw a bomb (creating and destroying after some time
     * @param startCoordinates
     */
    public throw (startCoordinates: Coordinates): void {
        const bomb = this.createBomb(startCoordinates);
        setTimeout(() => bomb.destroy(), BombConfiguration.BOMB_TIMEOUT)
    }

    // ----------------------------------------------------------------------------------------

    /**
     * Create a bomb
     * @param startCoordinates
     */
    private createBomb (startCoordinates): Phaser.Physics.Arcade.Sprite {
        const bomb = this.physics.add.sprite(startCoordinates.x, startCoordinates.y, 'stage1', 'stage1_19');
        this.physicsBombs.add(bomb);

        bomb.setDepth(1);
        bomb.body.setSize(16, 16, true);
        bomb.setImmovable();
        bomb.play('bomb-twitching', true);

        return bomb
    }

    /**
     * Set the bomb animations
     */
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
