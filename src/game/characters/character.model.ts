export interface CharacterAnimation {
    key: string;
    options: {
        prefix: string,
        start: number,
        end: number
    }
}

export interface CharacterInputs {
    UP: Phaser.Input.Keyboard.Key,
    DOWN: Phaser.Input.Keyboard.Key,
    LEFT: Phaser.Input.Keyboard.Key,
    RIGHT: Phaser.Input.Keyboard.Key,
    TROWING_BOMB: Phaser.Input.Keyboard.Key
}

export enum Direction {
    UP = 'UP',
    DOWN = 'DOWN',
    LEFT = 'LEFT',
    RIGHT = 'RIGHT'
}

export enum Position {
    TOP_LEFT = 'TOP_LEFT',
    TOP_RIGHT = 'TOP_RIGHT',
    BOTTOM_LEFT = 'BOTTOM_LEFT',
    BOTTOM_RIGHT = 'BOTTOM_RIGHT'
}

export enum InputChoice {
    ARROWS = 'ARROWS',
    LETTERS = 'LETTERS'
}
