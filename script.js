var platforms;

function preload() {
    this.load.image('fundo', 'assets/topdownrpg_indoor1.jpg');
    this.load.image('local', 'assets/tile_01.png');
    this.load.image('obstaculo', 'assets/tile_300.png');
    this.load.image('player', 'assets/survivor1_hold.png'); //direita
    this.load.image('player_e', 'assets/survivor1_hold_esquerda.png'); //esquerda
    this.load.image('player_t','assets/survivor1_hold_f.png');//tras
    this.load.image('player_f', 'assets/survivor1_hold.png'); //frente
    this.load.image('caixa', 'assets/caixa.png');
    this.load.image('caixa0', 'assets/caixa.png');
    this.load.image('caixa1', 'assets/caixa.png');
    this.load.image('caixa2', 'assets/caixa.png');
    this.load.image('caixa3', 'assets/caixa.png');
    this.load.image('caixa4', 'assets/caixa.png');
    //this.load.spriteshet('personagem','assets/survivor1_hold.png');
    this.load.image('personagem','assets/Carinha/Idle/idle(1)');
}

function create() {

    this.add.image(1280/2,720/2, 'fundo').setScale(2.8, 1.7)

    this.data.set('level', 1);
    this.data.set('tempo', "10 min");

    var text = this.add.text(600, 40, '', { font: '24px Courier', fill: '#00ff00' });

    text.setText([
        'Level: ' + this.data.get('level'),
        'Tempo: ' + this.data.get('tempo')
    ]);

    platforms = this.physics.add.staticGroup({
      immovable: true
    });
    platforms.create(110, 200, 'obstaculo').setScale(1,6).refreshBody();
    platforms.create(700, 620, 'obstaculo').setScale(1,9).refreshBody();
    platforms.create(480, 300, 'obstaculo').setScale(1,7).refreshBody();
    platforms.create(265, 365, 'obstaculo').setScale(1,4).refreshBody();

    this.add.image(40, 40, 'local');
    this.add.image(400, 465, 'local');
    this.add.image(260, 40, 'local');
    this.add.image(630, 680, 'local');
    this.add.image(765, 465, 'local');

    var caixas = this.physics.add.group({
        defaultKey: 'caixa',
        setFrictionX: 1,
    });

    caixas.create(40, 340).setFrictionX(0.1).setScale(0.65).setCollideWorldBounds(true).setMaxVelocity(1);
    caixas.create(262, 108).setFrictionX(0.4).setScale(0.65).setCollideWorldBounds(true).setMaxVelocity(1);
    caixas.create(400, 340).setFrictionX(0.2).setScale(0.65).setCollideWorldBounds(true).setMaxVelocity(1);
    caixas.create(800, 250).setFrictionX(0.1).setScale(0.65).setCollideWorldBounds(true).setMaxVelocity(1);

    /*this.caixa1 = this.physics.add.image(1000,150, 'caixa1').setScale(0.65).setCollideWorldBounds(true).setFrictionX(200);
    this.caixa2 = this.physics.add.image(1000,250, 'caixa2').setScale(0.65).setCollideWorldBounds(true);
    this.caixa3 = this.physics.add.image(1000,350, 'caixa3').setScale(0.65).setCollideWorldBounds(true);
    this.caixa4 = this.physics.add.image(1000,450, 'caixa4').setScale(0.65).setCollideWorldBounds(true);*/

    //caixa1.setMass(2);
    
    var player = this.physics.add.sprite(100,330, 'player');
    

    this.anims.create({
      key: 'parado',
      frame: [{key:  'player', frame : 4}],
      frameRate: 20 
    });

    this.anims.create({
      key: 'esquerda',
      frames: this.anims.generateFrameNumbers('player_e', {start: 0, end: 3}),
      frameRate: 10,
      repeat: -1 
    });

    this.anims.create({
      key: 'direita',
      frames: this.anims.generateFrameNumbers('player', {start: 5, end: 8}),
      frameRate: 10,
      repeat: 1 
    });

    this.anims.create({
      key: 'frente',
      frames: this.anims.generateFrameNumbers('player_f', {start: 5, end: 8}),
      frameRate: 10,
      repeat: 1 
    });

    this.player = player;
    

  //===================================
    this.w = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W)
    this.a = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A)
    this.s = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S)
    this.d = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)

    this.player = this.physics.add.image(config.width / 2, config.height / 2, 'player').setScale(1.5, 1.5).setMass(0.1);
    this.player.setCollideWorldBounds(true);


    this.physics.add.collider(caixas, this.player);
    this.physics.add.collider(caixas, platforms);
    this.physics.add.collider(caixas, caixas);
/*
    this.physics.add.collider(this.player, this.caixa1);
    this.physics.add.collider(this.player, this.caixa2);
    this.physics.add.collider(this.player, this.caixa3);
    this.physics.add.collider(this.player, this.caixa4);

    
    this.physics.add.collider(this.caixa2, this.caixa1);
    this.physics.add.collider(this.caixa3, this.caixa2);
    this.physics.add.collider(this.caixa4, this.caixa3);
   
    

    this.physics.add.collider(platforms, this.caixa1);
    this.physics.add.collider(platforms, this.caixa2);
    this.physics.add.collider(platforms, this.caixa3);
    this.physics.add.collider(platforms, this.caixa4);*/
    this.physics.add.collider(this.player, platforms);



}

function update() {
    let cursors = this.input.keyboard.createCursorKeys();

    /*
    var player = player;
    

    if(cursors.left.isDown){
      player.setVelocityX(-160);
      player.anims.play('esquerda',true);
    } else if(cursors.right.isDown){
        player.setVelocityX(160);
        player.anims.play('esquerda',true);
    else{
        player.setVelocityX(0);
        player.anims.play('parado');
    }
    */
    
    if ((cursors.left.isDown || this.a.isDown) || (cursors.right.isDown || this.d.isDown)) this.player.setVelocityX(cursors.left.isDown || this.a.isDown ? -260 : 260);
    else this.player.setVelocityX(0);
    if ((cursors.up.isDown || this.w.isDown) || (cursors.down.isDown || this.s.isDown)) this.player.setVelocityY(cursors.up.isDown || this.w.isDown ? -260 : 260);
    else this.player.setVelocityY(0);
    
}

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 500,
    backgroundColor: '#f9f9f9',
    autoCenter: Phaser.Scale.CENTER_BOTH,
    physics: {
        default: 'arcade', // impact
        arcade: {
            gravity: {
                y: 0
            },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

const game = new Phaser.Game(config);
/*
function collide (bodyA, bodyB, axis)
{
    bodyA.gameObject.setTint(0xff0000);
}
*/