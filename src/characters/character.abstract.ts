import { CharacterAnimation, Coordinates, CharacterInputs } from './character.model';

export abstract class CharacterAbstract {
    private character: Phaser.Physics.Arcade.Sprite;
    abstract animations: CharacterAnimation[];
    abstract spriteNamePrefix: string;
    abstract iddleSpriteName: string;

    constructor(
        protected physics: Phaser.Physics.Arcade.ArcadePhysics,
        protected anims: Phaser.Animations.AnimationManager,
        protected stage: Phaser.Tilemaps.StaticTilemapLayer,
        protected inputs: CharacterInputs,
        protected startCoordinates: Coordinates
    ) {
    }

    /**
     * Add Character sprite and apply collisions
     */
    public load (): void {
        this.setCollisions();
        this.setAnimations();
    }

    /**
     * Actions on moving for the current character
     */
    public onMoving(): void {
        const velocity = 40
        const body = <Phaser.Physics.Arcade.Body> this.character.body

        if (this.inputs.LEFT.isDown) {
            this.character.setVelocityY(0);
            this.character.setVelocityX(-(velocity));
            if (!body.onFloor()) {
                this.character.play('walk-left', true);
            }
        } else if (this.inputs.RIGHT.isDown) {
            this.character.setVelocityY(0);
            this.character.setVelocityX(velocity);
            if (!body.onFloor()) {
                this.character.play('walk-right', true);
            }
        } else if (this.inputs.UP.isDown) {
            this.character.setVelocityX(0);
            this.character.setVelocityY(-(velocity));
            if (!body.onFloor()) {
                this.character.play('walk-up', true);
            }
        } else if (this.inputs.DOWN.isDown) {
            this.character.setVelocityX(0);
            this.character.setVelocityY(velocity);
            if (!body.onFloor()) {
                this.character.play('walk-down', true);
            }
        } else {
            this.character.setVelocityX(0);
            this.character.setVelocityY(0);
        }
    }

    public onThrowingBomb():void {
        if (Phaser.Input.Keyboard.JustDown(this.inputs.TROWING_BOMB)) {
            console.log('throwing a grenade !')

        }
    }


    /**
     * Set Sprite and Apply collisions
     */
    private setCollisions (): void {
        this.character = this.physics.add.sprite(this.startCoordinates.x, this.startCoordinates.y, this.spriteNamePrefix, this.iddleSpriteName);
        this.character.body.setSize(8, 12, false);
        this.character.body.setOffset(12, 18);
        this.physics.add.collider(this.character, this.stage);
    }
    /**
     * Apply Animations for the character
     */
    private setAnimations (): void {
        this.animations.forEach(({ key, options }) => {
            this.anims.create({
                key,
                frames: this.anims.generateFrameNames(this.spriteNamePrefix, options),
                frameRate: 6
            });
        })
    }
}
