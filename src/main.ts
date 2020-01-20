import 'phaser'
import { BattleScene } from './scenes/battle.scene'

export class Bomberman extends Phaser.Game {
    constructor (config:Phaser.Types.Core.GameConfig) {
        super(config)
    }
}

window.onload = () => {
    new Bomberman({
        title: 'Bomberman',
        width: 240,
        height: 208,
        zoom: 4,
        parent: 'game',
        scene: [BattleScene],
        physics: {
            default: "arcade",
            arcade: {
                debug: false
            }
        },
        backgroundColor: '#313131',
    });
};