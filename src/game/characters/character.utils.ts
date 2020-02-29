import { InputChoice, Position } from './character.model';
import { Coordinates } from '../shared/game.model';

/**
 * Get character Coodinates (used for starting position)
 * @param position
 */
export function getCharacterCoordinates (position: Position): Coordinates {
    switch (position) {
        case Position.TOP_LEFT:
            return { y: 16, x: 24 };
        case Position.TOP_RIGHT:
            return { y: 16, x: 216 };
        case Position.BOTTOM_LEFT:
            return { y: 176, x: 24 };
        case Position.BOTTOM_RIGHT:
            return { y: 176, x: 216 };
    }
}

/**
 * Return Character inputs
 * @param input
 * @param inputChoice
 */
export function  getCharacterInputs (input, inputChoice: InputChoice) {
    switch (inputChoice) {
        case InputChoice.ARROWS:
            return input.keyboard.addKeys({
                UP: Phaser.Input.Keyboard.KeyCodes.UP,
                DOWN: Phaser.Input.Keyboard.KeyCodes.DOWN,
                LEFT: Phaser.Input.Keyboard.KeyCodes.LEFT,
                RIGHT: Phaser.Input.Keyboard.KeyCodes.RIGHT,
                TROWING_BOMB: Phaser.Input.Keyboard.KeyCodes.ENTER
            });
        case InputChoice.LETTERS:
            return input.keyboard.addKeys({
                UP: Phaser.Input.Keyboard.KeyCodes.Z,
                DOWN: Phaser.Input.Keyboard.KeyCodes.S,
                LEFT: Phaser.Input.Keyboard.KeyCodes.Q,
                RIGHT: Phaser.Input.Keyboard.KeyCodes.D,
                TROWING_BOMB: Phaser.Input.Keyboard.KeyCodes.A
            });
    }
}
