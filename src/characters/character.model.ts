export interface CharacterAnimation {
    key: string;
    options: {
        prefix: string,
        start: number,
        end: number
    }
}

export interface Coordinates {
    y: number;
    x: number;
}

export enum Position {
    TOP_LEFT = 'TOP_LEFT',
    TOP_RIGHT = 'TOP_RIGHT',
    BOTTOM_LEFT = 'BOTTOM_LEFT',
    BOTTOM_RIGHT = 'BOTTOM_RIGHT'
}
