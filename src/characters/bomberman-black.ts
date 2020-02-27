import 'phaser'
import { CharacterAbstract } from './character.abstract';
import { CharacterAnimation } from './character.model';

export default class BombermanBlack extends CharacterAbstract {
    spriteNamePrefix = 'bomberman-white';
    iddleSpriteName = 'bomberman-white_18';
    animations: CharacterAnimation[] = [
        {
            key: 'walk-down',
            options: {
                prefix: 'bomberman-white_',
                start: 20,
                end: 18
            }
        },
        {
            key: 'walk-up',
            options: {
                prefix: 'bomberman-white_',
                start: 2,
                end: 0
            }
        },
        {
            key: 'walk-right',
            options: {
                prefix: 'bomberman-white_',
                start: 11,
                end: 9
            }
        },
        {
            key: 'walk-left',
            options: {
                prefix: 'bomberman-white_',
                start: 29,
                end: 27
            }
        }
    ];
}
