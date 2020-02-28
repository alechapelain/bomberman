import 'phaser'
import BombermanWhite from '../characters/bomberman-white'
import BombermanBlack from '../characters/bomberman-black';
import { CharacterAbstract } from '../characters/character.abstract';
import { getCharacterCoordinates, getCharacterInputs } from '../characters/character.utils';
import { InputChoice, Position } from '../characters/character.model';

export class BattleScene extends Phaser.Scene {
    private characters: CharacterAbstract[] = [];
    private stage: Phaser.Tilemaps.StaticTilemapLayer;

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
        this.load.audio('theme', ['assets/audio/battle-theme.mp3']);
        this.load.image('tiles', 'assets/stages/stage1/stage1.png');
        this.load.tilemapTiledJSON('map', 'assets/stages/stage1/stage1.json');
        this.load.atlas('bomberman-white', 'assets/characters/bomberman-white.png','assets/characters/bomberman-white_atlas.json');
        this.load.atlas('bomb', 'assets/characters/bomberman-white.png','assets/characters/bomberman-white_atlas.json');
    }
    /**
     * When Creating the scene
     */
    public create (): void {
        const map = this.make.tilemap({ key: 'map' });
        const classicStage = map.addTilesetImage('stage1', 'tiles');
        this.stage = map.createStaticLayer('stage', classicStage);
        this.stage.setCollisionFromCollisionGroup(true);

        this.setCharacter(BombermanWhite, InputChoice.ARROWS, Position.TOP_LEFT);
        this.setCharacter(BombermanBlack, InputChoice.LETTERS, Position.BOTTOM_RIGHT);

        this.characters.forEach(character => character.load());

        this.sound.add('theme', { volume: 0.5 }).play()
    }
    /**
     * When scene updates
     * @param time
     */
    public update (time): void {
        this.characters.forEach((character) => {
            character.onMoving()
            character.onThrowingBomb()
        });
    }

    /**
     * Set Character to be loaded
     * @param className
     * @param inputChoice
     * @param startingPosition
     */
    private setCharacter(className, inputChoice, startingPosition) {
        this.characters.push(new className(
            this.physics,
            this.anims,
            this.stage,
            getCharacterInputs(this.input, inputChoice),
            getCharacterCoordinates(startingPosition)
        ));
    }
}
