import 'phaser'
import { Coordinates } from '../characters/character.model';

export default class Bomb {
    private bomb: Phaser.Physics.Arcade.Sprite;

    constructor(
        private physics: Phaser.Physics.Arcade.ArcadePhysics,
        private startCoordinates: Coordinates,
        private physicsBombs: Phaser.Physics.Arcade.Group
    ) {
        this.setBomb()
    }

    // ----------------------------------------------------------------------------------------

    private setBomb (): void {
        this.bomb = this.physics.add.sprite(this.startCoordinates.x, this.startCoordinates.y, 'stage1', 'stage1_19');
        this.physicsBombs.add(this.bomb);

        this.bomb.setDepth(1);
        this.bomb.body.setSize(16, 16, true);
        this.bomb.setImmovable()
    }
}
