import { CharacterAnimation, CharacterInputs, Coordinates, Direction } from './character.model';
import Bomb from '../bombs/bomb';
import { GameTileSize } from '../shared/game.model';

export abstract class CharacterAbstract {
    private character: Phaser.Physics.Arcade.Sprite;
    private direction: Direction
    abstract animations: CharacterAnimation[];
    abstract spriteNamePrefix: string;
    abstract iddleSpriteName: string;

    constructor(
        protected physics: Phaser.Physics.Arcade.ArcadePhysics,
        protected anims: Phaser.Animations.AnimationManager,
        protected inputs: CharacterInputs,
        protected startCoordinates: Coordinates,
        protected physicsBombs: Phaser.Physics.Arcade.Group,
        protected physicsCharacters: Phaser.Physics.Arcade.Group
    ) {
    }

    /**
     * Add Character sprite and apply collisions
     */
    public load (): void {
        this.setCharacter();
        this.setCharacterAnimations();
    }

    /**
     * Actions on moving for the current character
     */
    public onMoving(): void {
        const velocity = 40
        const body = <Phaser.Physics.Arcade.Body> this.character.body

        if (this.inputs.LEFT.isDown) {
            this.direction = Direction.LEFT
            this.character.setVelocityY(0);
            this.character.setVelocityX(-(velocity));
            if (!body.onFloor()) {
                this.character.play('walk-left', true);
            }
        } else if (this.inputs.RIGHT.isDown) {
            this.direction = Direction.RIGHT
            this.character.setVelocityY(0);
            this.character.setVelocityX(velocity);
            if (!body.onFloor()) {
                this.character.play('walk-right', true);
            }
        } else if (this.inputs.UP.isDown) {
            this.direction = Direction.UP
            this.character.setVelocityX(0);
            this.character.setVelocityY(-(velocity));
            if (!body.onFloor()) {
                this.character.play('walk-up', true);
            }
        } else if (this.inputs.DOWN.isDown) {
            this.direction = Direction.DOWN
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

            const bombCoordinate: Coordinates = {
                x: this.character.x,
                y: this.character.y + 4 // margin due to character height
            };

            switch(this.direction) {
                case Direction.RIGHT:
                    bombCoordinate.x = bombCoordinate.x + 1;
                    break;
                case Direction.LEFT:
                    bombCoordinate.x = bombCoordinate.x - 1;
                    break;
                case Direction.DOWN:
                    bombCoordinate.y = bombCoordinate.y + 1;
                    break;
                case Direction.UP:
                    bombCoordinate.y = bombCoordinate.y - 1;
                    break;
            }

            bombCoordinate.x = Math.trunc(bombCoordinate.x / GameTileSize.WIDTH) * GameTileSize.WIDTH + (GameTileSize.WIDTH / 2);
            bombCoordinate.y = Math.trunc(bombCoordinate.y / GameTileSize.HEIGHT) * GameTileSize.HEIGHT + (GameTileSize.HEIGHT / 2);

            new Bomb(this.physics, bombCoordinate, this.physicsBombs)

        }
    }


    /**
     * Set Sprite and Apply collisions
     */
    private setCharacter (): void {
        this.character = this.physics.add.sprite(this.startCoordinates.x, this.startCoordinates.y, this.spriteNamePrefix, this.iddleSpriteName);
        this.character.setDepth(2);
        this.character.body.setSize(8, 12, false);
        this.character.body.setOffset(12, 18);

        this.physicsCharacters.add(this.character);

    }
    /**
     * Apply Animations for the character
     */
    private setCharacterAnimations (): void {
        this.animations.forEach(({ key, options }) => {
            this.anims.create({
                key,
                frames: this.anims.generateFrameNames(this.spriteNamePrefix, options),
                frameRate: 6
            });
        })
    }
}
