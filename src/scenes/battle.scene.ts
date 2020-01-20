import 'phaser'
import Rectangle = Phaser.Geom.Rectangle;

export class BattleScene extends Phaser.Scene {
    private player: any
    private cursors: Phaser.Types.Input.Keyboard.CursorKeys

    constructor() {
        super({
            key: 'BattleScene'
        });
    }

    init(params): void {
        var canvas = this.sys.game.canvas
        var fullscreen = this.sys.game.device.fullscreen;


        document.querySelector('.btn-fullscreen').addEventListener('click', function () {
            if (document.fullscreenElement) { return; }

            canvas[fullscreen.request]();
        });
    }
    preload(): void {
        this.load.image('tiles', 'assets/background/classic.png')
        this.load.tilemapTiledJSON('map', 'assets/background/stage-classic.json')

        this.load.atlas('bomberman-white', 'assets/characters/bomberman-white.png','assets/characters/bomberman-white_atlas.json');
    }
    create(): void {
        const map = this.make.tilemap({ key: 'map' })
        const classicStage = map.addTilesetImage('stage-classic', 'tiles')
        const stage = map.createStaticLayer('stage', classicStage);
        stage.setCollisionFromCollisionGroup(true)

        this.player = this.physics.add.sprite(16, 16, 'bomberman-white', 'bomberman-white_18')
        this.player.body.setSize(8, 12, false);
        this.player.body.setOffset(12, 18);
        this.physics.add.collider(this.player, stage);
        this.cursors = this.input.keyboard.createCursorKeys();


        this.anims.create({
            key: 'walk-down',
            frames: this.anims.generateFrameNames('bomberman-white', {
                prefix: 'bomberman-white_',
                start: 20,
                end: 18,
            }),
            frameRate: 6
        });

        this.anims.create({
            key: 'walk-up',
            frames: this.anims.generateFrameNames('bomberman-white', {
                prefix: 'bomberman-white_',
                start: 2,
                end: 0,
            }),
            frameRate: 6
        });

        this.anims.create({
            key: 'walk-right',
            frames: this.anims.generateFrameNames('bomberman-white', {
                prefix: 'bomberman-white_',
                start: 11,
                end: 9,
            }),
            frameRate: 6
        });

        this.anims.create({
            key: 'walk-left',
            frames: this.anims.generateFrameNames('bomberman-white', {
                prefix: 'bomberman-white_',
                start: 29,
                end: 27,
            }),
            frameRate: 6
        });

    }
    update(time): void {
        const velocity = 40
        if (this.cursors.left.isDown) {
            this.player.setVelocityY(0);
            this.player.setVelocityX(-(velocity));
            if (!this.player.body.onFloor()) {
                this.player.play('walk-left', true);
            }
        } else if (this.cursors.right.isDown) {
            this.player.setVelocityY(0);
            this.player.setVelocityX(velocity);
            if (!this.player.body.onFloor()) {
                this.player.play('walk-right', true);
            }
        } else if (this.cursors.up.isDown) {
            this.player.setVelocityX(0);
            this.player.setVelocityY(-(velocity));
            if (!this.player.body.onFloor()) {
                this.player.play('walk-up', true);
            }
        } else if (this.cursors.down.isDown) {
            this.player.setVelocityX(0);
            this.player.setVelocityY(velocity);
            if (!this.player.body.onFloor()) {
                this.player.play('walk-down', true);
            }
        } else {
            this.player.setVelocityX(0);
            this.player.setVelocityY(0);
        }
    }
}