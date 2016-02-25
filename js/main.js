window.onload = function () {
    // You might want to start with a template that uses GameStates:
    //     https://github.com/photonstorm/phaser/tree/master/resources/Project%20Templates/Basic
    
    // You can copy-and-paste the code from any of the examples at http://examples.phaser.io here.
    // You will need to change the fourth parameter to "new Phaser.Game()" from
    // 'phaser-example' to 'game', which is the id of the HTML element where we
    // want the game to go.
    // The assets (and code) can be found at: https://github.com/photonstorm/phaser/tree/master/examples/assets
    // You will need to change the paths you pass to "game.load.image()" or any other
    // loading functions to reflect where you are putting the assets.
    // All loading functions will typically all be found inside "preload()".
    
    "use strict";
    
    var game = new Phaser.Game( 800, 600, Phaser.AUTO, 'game', { preload: preload, create: create, update: update } );
    

    
    function preload() {
        game.load.spritesheet('dude', 'assets/customSprite.png', 30, 61);

        game.load.audio('cheer', 'assets/cheering.wav');
        game.load.image('portal', 'assets/portal.png');
        game.load.image('tile', 'assets/tile.png');
    }

//global variables
var player;
var cursors;
var sound;
var portals;
var tiles;
var display;
    
    function create(){
        //enable physics
        game.physics.startSystem(Phaser.Physics.ARCADE);
        
        display = game.add.text(25, 25, 'Get to the portal!', {fontSize: '40px', fill: '#999'});



        tiles = game.add.group();
        tiles.enableBody = true;
        tiles.collideWorldBounds = true;

        for (var i=0; i<8; i++){
            var tile = tiles.create(i*100, game.world.height-100, 'tile');
            tile.body.immovable = true;
        }
        
        for (var i=0; i<8; i=i+3){
            var tile = tiles.create(i*100, game.world.height-500, 'tile');
            tile.body.immovable = true;

        }
//        var tile2 = tiles.create(700, 400, 'tile');
//        tile2.body.immovable = true;
        var tile3 = tiles.create(700, 360, 'tile');
        tile3.body.immovable = true;
        var tile4 = tiles.create(0, 400, 'tile');
        tile4.body.immovable = true;
        var tile5 = tiles.create(100, 400, 'tile');
        tile5.body.immovable = true;
        //movable block
        var block = tiles.create(100, 350, 'tile');
        block.scale.setTo(.5, .5);
        block.body.gravity.y = 50;
        
        //exit
        portals = game.add.group();
        portals.enableBody = true;
        var exit = portals.create(game.world.width-50, game.world.height-300, 'portal');
        exit.body.immovable = true;
        

        
        //player
        player = game.add.sprite(550, game.world.height-200, 'dude');
        game.physics.arcade.enable(player);
        player.body.gravity.y = 150;
        player.body.collideWorldBounds = true;
        //walk left 
        player.animations.add('left', [3, 2, 1, 0], 10, true);
        //walk right
        player.animations.add('right', [5, 6, 7, 8], 10, true);
        
        //sound
        sound = game.add.audio('cheer');
        
        //add controls
        cursors = game.input.keyboard.createCursorKeys();
    } 
    
    function update() {
        game.physics.arcade.collide(tiles, tiles);
        game.physics.arcade.collide(player, tiles);
        game.physics.arcade.overlap(player, portals, endGame, null, this);
        
        player.body.velocity.x = 0;
        
        if(cursors.left.isDown){
            player.body.velocity.x = -150; 
            player.animations.play('left');
        }
        else if(cursors.right.isDown){
            player.body.velocity.x = 150;
            player.animations.play('right');
        }
        else {
            player.animations.stop();
            player.frame = 4;
        }
        if (cursors.up.isDown && player.body.touching.down){
            player.body.velocity.y = -175;
        }
        if (cursors.down.isDown){
            player.body.velocity.y = 175;
        }
        
        function endGame (player, exit){
            exit.kill();
            sound.play();
            display.text = 'YOU DID IT!';
            player.kill();
        }
    }
};
