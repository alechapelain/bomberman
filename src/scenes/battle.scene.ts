import 'phaser'
import BombermanWhite from '../characters/bomberman-white'
import BombermanBlack from '../characters/bomberman-black';
import { CharacterAbstract } from '../characters/character.abstract';

export class BattleScene extends Phaser.Scene {
    private characters: CharacterAbstract[];

    constructor() {
        super({
            key: 'BattleScene'
        });
    }

    /**
     * Init Scene / listen for fullscreen
     * @param params
     */
    public init (params): void {
        var canvas = this.sys.game.canvas
        var fullscreen = this.sys.game.device.fullscreen;

        document.querySelector('.btn-fullscreen').addEventListener('click', function () {
            if (document.fullscreenElement) { return; }
            canvas[fullscreen.request]();
        });
    }

    /**
     * Loading images/stage
     */
    public preload (): void {
        this.load.image('tiles', 'assets/background/classic.png')
        this.load.tilemapTiledJSON('map', 'assets/background/stage-classic.json')
        this.load.atlas('bomberman-white', 'assets/characters/bomberman-white.png','assets/characters/bomberman-white_atlas.json');
    }
    /**
     * When Creating the scene
     */
    public create (): void {
        const map = this.make.tilemap({ key: 'map' })
        const classicStage = map.addTilesetImage('stage-classic', 'tiles')
        const stage = map.createStaticLayer('stage', classicStage);
        stage.setCollisionFromCollisionGroup(true)

        this.characters = [
            new BombermanWhite(this.physics, this.anims, BattleScene.getInput1(this.input), stage),
            new BombermanBlack(this.physics, this.anims, BattleScene.getInput2(this.input), stage)
        ];

        this.characters.forEach(character => character.load());
    }
    /**
     * When scene updates
     * @param time
     */
    public update (time): void {
        this.characters.forEach(character => character.onMoving());
    }

    /**
     * Return input 1 using keyboard arrows
     * @param input
     * @private
     */
    private static getInput1(input) {
        return input.keyboard.addKeys({
            UP: Phaser.Input.Keyboard.KeyCodes.UP,
            DOWN: Phaser.Input.Keyboard.KeyCodes.DOWN,
            LEFT: Phaser.Input.Keyboard.KeyCodes.LEFT,
            RIGHT: Phaser.Input.Keyboard.KeyCodes.RIGHT,
        });
    }
    /**
     * Return input 2 using keyboard letters
     * @param input
     * @private
     */
    private static getInput2(input) {
        return input.keyboard.addKeys({
            UP: Phaser.Input.Keyboard.KeyCodes.Z,
            DOWN: Phaser.Input.Keyboard.KeyCodes.S,
            LEFT: Phaser.Input.Keyboard.KeyCodes.Q,
            RIGHT: Phaser.Input.Keyboard.KeyCodes.D
        });
    }
}
