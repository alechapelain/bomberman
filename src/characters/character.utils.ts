import { Coordinates, Position } from './character.model';

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
