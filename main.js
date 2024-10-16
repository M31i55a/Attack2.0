window.addEventListener('load', function(){
    //canvas setup
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = 1700;
    canvas.height = 700;
    const up = document.getElementById("up");
    const down = document.getElementById("down");

    class InputHandler{
        constructor(game){
            this.game = game;
            //keyboard events
            window.addEventListener('keydown', (e) => {
                if(((e.key === 'ArrowUp') || (e.key === 'ArrowDown') ) && this.game.keys.indexOf(e.key) === -1){
                    this.game.keys.push(e.key);
                }
                else if(e.key === ' '){
                    this.game.player.shootTop();
                }
                else if(e.key === 'd' || e.key === 'D'){
                    this.game.debug = !this.game.debug;
                }
            })
            window.addEventListener('keyup', (e) => {
                if(this.game.keys.indexOf(e.key) > -1){
                    this.game.keys.splice(this.game.keys.indexOf(e.key), 1)
                }
            })

            //For mobile
            up.addEventListener("mousedown", (e) => {
                //Create and dispatch an ArrowUp keydown event
                const arrowUpEvent = new KeyboardEvent('keydown', {
                    key : 'ArrowUp',
                    keyCode : 38,
                    code : 'ArrowUp',
                    bubbles : true
                })

                window.dispatchEvent(arrowUpEvent)
            })

            up.addEventListener("mouseup", (e) => {
                //Create and dispatch an ArrowUp keydown event
                const arrowUpEvent = new KeyboardEvent('keyup', {
                    key : 'ArrowUp',
                    keyCode : 38,
                    code : 'ArrowUp',
                    bubbles : true
                })

                window.dispatchEvent(arrowUpEvent)
            })

            down.addEventListener("mousedown", (e) => {
                //Create and dispatch an ArrowUp keydown event
                const arrowDownEvent = new KeyboardEvent('keydown', {
                    key : 'ArrowDown',
                    keyCode : 38,
                    code : 'ArrowDown',
                    bubbles : true
                })

                window.dispatchEvent(arrowDownEvent)
            })

            down.addEventListener("mouseup", (e) => {
                //Create and dispatch an ArrowUp keydown event
                const arrowUpEvent = new KeyboardEvent('keyup', {
                    key : 'ArrowDown',
                    keyCode : 38,
                    code : 'ArrowDown',
                    bubbles : true
                })

                window.dispatchEvent(arrowUpEvent)
            })
        }
    }

    class Projectile{
        constructor(game, x, y){
            this.game = game;
            this.x = x;
            this.y = y;
            this.width = 10;
            this.height = 3;
            this.speed = 4.5;
            this.markedForDeletion = false;
            this.image = document.getElementById('projectile');
        }

        update(){
            this.x += this.speed - this.game.speed;
            if(this.x > this.game.width * 0.8) this.markedForDeletion = true;
        }

        draw(context){
            context.drawImage(this.image, this.x, this.y);
        }
    }

    class Particle{
        constructor(game, x, y){
            this.game = game;
            this.x = x;
            this.y = y;
            this.image = document.getElementById('gears');
            this.frameX = Math.floor(Math.random() * 3);
            this.frameY = Math.floor(Math.random() * 3);
            this.spriteSize = 50;
            this.sizeModifier = (Math.random() * 0.5 + 0.5).toFixed(1);
            this.size = this.spriteSize * this.sizeModifier;
            this.speedX = Math.random() * 6 - 3;
            this.speedY = Math.random() * (-15);
            this.gravity = 0.5;
            this.markedForDeletion = false;
            this.angle = 0;
            this.va = Math.random() * 0.2 - 0.1;
            this.bounced = 0;
            this.bottomBounceBoundary = Math.random() * 80 + 60;
        }

        update(){
            this.angle += this.va;
            this.speedY += this.gravity; 
            this.x -=  this.speedX;
            this.y += this.speedY;

            if(this.y > this.game.height + this.size || this.x < 0 - this.size) this.markedForDeletion = true;
            if(this.y > this.game.height - this.bottomBounceBoundary && this.bounced < 2){
                this.bounced++;
                this.speedY *= -0.5;
            }
        }

        draw(context){
            context.save()
            context.translate(this.x, this.y)
            context.rotate(this.angle)
            context.drawImage(this.image, this.frameX * this.spriteSize, this.frameY * this.spriteSize, this.spriteSize, this.spriteSize, this.spriteSize * 0.5, this.spriteSize * 0.5, this.size, this.size);
            context.restore()
        }
    }

    class Player{
        constructor(game){
            this.game = game;
            this.lives = 100;
            this.dragonTrigger = 0;
            this.width = 120;
            this.height = 190; 
            this.x = 20;
            this.y = 100;
            this.frameX = 0;
            this.frameY = 0;
            this.maxFrame = 37;
            this.speedY = 0;
            this.maxSpeed = 2;
            this.projectiles = [];
            this.image = document.getElementById('player');
            this.backUpImg = document.getElementById('backUpImg');
            this.powerUp = false;
            this.touched = false;
            this.backUp = false;
            this.backUpWidth = 5834/4;
            this.backUpHeight = 3209/2;
            this.backUpCounter = 0;
            this.touchedTimer = 0;
            this.touchedLimit = 2000;
            this.backUpTimer = 0;
            this.backUpLimit = 7000;
            this.backUpFrameX = 0;
            this.backUpFrameY = 0;
            this.backUpMaxFrame = 4;
            this.powerUpTimer = 0;
            this.powerUpLimit = 10000;
        }

        update(deltaTime){
            //the player reacts according to the input(arrowUp for up or arrowDown for down)
            if(this.game.keys.includes('ArrowUp')) this.speedY = -this.maxSpeed;
            else if(this.game.keys.includes('ArrowDown')) this.speedY = this.maxSpeed;
            else this.speedY = 0;
            this.y += this.speedY;
            //vertical Boundaries
            if(this.y > this.game.height - this.height * 0.5) this.y = this.game.height - this.height * 0.5;
            else if(this.y < -this.height * 0.5) this.y = -this.height * 0.5;
            //handle projectiles
            this.projectiles.forEach(projectile => {
                projectile.update();
            })
            this.projectiles = this.projectiles.filter(projectile => !projectile.markedForDeletion)
            //sprite animation
            if(this.frameX < this.maxFrame){
                this.frameX++;
            }
            else{
                this.frameX = 0;
            }
            //power up
            if(this.powerUp){
                this.image = document.getElementById('player');
                if(this.powerUpTimer > this.powerUpLimit){
                    this.powerUpTimer = 0;
                    this.powerUp = false;
                    this.frameY = 0;
                }
                else{
                    this.powerUpTimer += deltaTime;
                    this.frameY = 1;
                    this.game.ammo += 0.1;
                }
            }
            //backup
            if(this.backUp){
                if(this.backUpTimer > this.backUpLimit){

                    if(this.backUpFrameY < 2){
                        if(this.backUpFrameX < this.backUpMaxFrame){
                            this.backUpFrameX++;
                        }
                        else{
                            this.backUpFrameX = 0;
                            this.backUpFrameY++;
                        }
                    }
                    if(this.backUpFrameY == 2){
                        this.backUpFrameY = 0;
                    }

                    this.backUpTimer = 0;
                    this.backUp = false;
                }
                else{
                    this.backUpTimer += deltaTime;
                    this.touched = false;
                }
            }
            //touched by an enemy
            if(this.touched){
                if(this.touchedTimer > this.touchedLimit){
                    this.image = document.getElementById('player');
                    this.touchedTimer = 0;
                    this.touched = false;
                }
                else{
                    this.image = document.getElementById('playerTouched');
                    this.touchedTimer += deltaTime;
                    this.frameY = 0;
                }
            }
        }

        draw(context){
            this.projectiles.forEach(projectile => {
                projectile.draw(context);
            })
            if(this.game.debug) context.strokeRect(this.x, this.y, this.width, this.height);
            context.drawImage(this.image,this.frameX * this.width, this.frameY * this.height, this.width, this.height,  this.x, this.y, this.width-25, this.height-25);
            if(this.backUp){
                context.drawImage(this.backUpImg, 0 * this.backUpWidth, 0 * this.backUpHeight, this.backUpWidth, this.backUpHeight,  this.x - 120, this.y - 100, this.width*3 - 50, this.height*2 -50)
            }
        }
        shootTop(){
            //checkout if the player still has bullets and reduce the amount if he uses it
            if(this.game.ammo > 0){
                this.projectiles.push(new Projectile(this.game, this.x +80, this.y +35));
                this.game.ammo--;
            }
            if(this.powerUp) this.shootBottom();
        }
        shootBottom(){
            if(this.game.ammo > 0){
                this.projectiles.push(new Projectile(this.game, this.x +80, this.y +175));
            }
        }
        enterPowerUp(){
            this.powerUpTimer = 0;
            this.powerUp = true;
            if(this.game.ammo < this.game.maxAmmo) this.game.ammo = this.game.maxAmmo;
        }
        callBackUp(){
            this.backUpTimer = 0;
            this.backUp = true;
            this.touched = false;
        }
    }

    class Dragon{
        constructor(game, x, y){
            this.game = game;
            this.markedForDeletion = false;
            this.x = x;
            this.y = y;
            this.width = 500/3;
            this.height = 155;
            this.frameX = 0;
            this.frameY = 0;
            this.maxFrame = 5;
            this.frameTimer = 0;
            this.switchInterval = 10;
            this.speedX = 4;
            this.lives = 40;
            this.image = new Image()
        }
    
        update(deltaTime){
            this.image.src = 'assets/dragonSprite.png';
            this.x += this.speedX;
            if(this.x > this.game.width) this.markedForDeletion = true;
            if(this.frameTimer > this.switchInterval){
                if(this.frameY < 2){
                    if(this.frameX < this.maxFrame){
                        this.frameX++;
                    }
                    else{
                        this.frameX = 0;
                        this.frameY++;
                    }
                }
                if(this.frameY == 2){
                    this.frameY = 0;
                }
                this.frameTimer = 0;
            }
            else{
                this.frameTimer += deltaTime;
            }
        }
        
        draw(){
            ctx.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.x, this.y, this.width, this.height)
    
        }
    }

    class Enemy{
        constructor(game){
            this.game = game;
            this.x = this.game.width;
            this.speedX = Math.random() * -2.3 - 0.95;
            this.markedForDeletion = false;
            this.frameX = 0;
            this.frameY = 0;
            this.maxFrame = 37;
        }

        update(){
            this.x += this.speedX;
            if(this.x + this.width < 0) this.markedForDeletion = true;

            //sprite animation
            if(this.frameX < this.maxFrame){
                this.frameX++;
            }
            else{
                this.frameX = 0;
            }
        }

        draw(context){
            context.strokeStyle = 'white'
            if(this.game.debug) context.strokeRect(this.x, this.y, this.width, this.height);
            context.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.x, this.y, this.width-20, this.height-20);
            if(this.game.debug){
                context.font = '20px Bangers';
                context.fillStyle = 'white'
                context.fillText(this.lives, this.x, this.y);
            }
        }
    }

    class Angler1 extends Enemy{
        constructor(game){
            super(game);
            this.width = 228;
            this.height = 169;
            this.y = Math.random() * (this.game.height * 0.95 - this.height);
            this.image = document.getElementById('angler1');
            this.frameY = Math.floor(Math.random() * 3);
            this.lives = 3;
            this.score = this.lives;
        }
    }

    class Angler2 extends Enemy{
        constructor(game){
            super(game);
            this.width = 213;
            this.height = 165;
            this.y = Math.random() * (this.game.height * 0.95 - this.height);
            this.image = document.getElementById('angler2');
            this.frameY = Math.floor(Math.random() * 2);
            this.lives = 5;
            this.score = this.lives;
        }
    }

    class LuckyFish extends Enemy{
        constructor(game){
            super(game);
            this.width = 99;
            this.height = 95;
            this.y = Math.random() * (this.game.height * 0.9 - this.height);
            this.image = document.getElementById('lucky');
            this.frameY = Math.floor(Math.random() * 2);
            this.lives = 5;
            this.score = 0;
            this.type = 'lucky';
        }
    }

    class HiveWhale extends Enemy{
        constructor(game){
            super(game);
            this.width = 400;
            this.height = 227;
            this.y = Math.random() * (this.game.height * 0.95 - this.height);
            this.image = document.getElementById('hivewhale');
            this.frameY = 0;
            this.lives = 20;
            this.score = this.lives;
            this.type = 'hive';
            this.speedX = Math.random() * -1.5 - 0.55;
        }
    }

    class Drone extends Enemy{
        constructor(game, x, y){
            super(game);
            this.width = 115;
            this.height = 95;
            this.x = x;
            this.y = y;
            this.image = document.getElementById('drone');
            this.frameY = Math.floor(Math.random() * 2);
            this.lives = 3;
            this.score = this.lives;
            this.type = 'drone';
            this.speedX = Math.random() * -4.3 - 1.7;
        }
    }

    class Layer{
        constructor(game, image, speedModifier){
            this.game = game;
            this.image = image;
            this.speedModifier = speedModifier;
            this.width = 2472;
            this.height = 700;
            this.x = 0;
            this.y = 0;
        }

        update(){
            if(this.x <= -this.width) this.x = 0;//infinite scrolling
            this.x -= this.game.speed * this.speedModifier;//different speed for parallax effect
        }

        draw(context){
            context.drawImage(this.image, this.x, this.y);
            context.drawImage(this.image, this.x + this.width, this.y);
        }
    }

    class Background{
        constructor(game){
            this.game = game;
            this.image1 = document.getElementById('layer1');
            this.image2 = document.getElementById('layer2');
            this.image3 = document.getElementById('layer3');
            this.image4 = document.getElementById('layer4');
            this.image5 = document.getElementById('layer5');
            this.layer1 = new Layer(this.game, this.image1, 0.17);
            this.layer2 = new Layer(this.game, this.image2, 0.4);
            this.layer3 = new Layer(this.game, this.image3, 0.7);
            this.layer4 = new Layer(this.game, this.image4, 1);
            this.layer5 = new Layer(this.game, this.image5, 1.5);
            this.layers = [this.layer1, this.layer2, this.layer3, this.layer4];
        }

        update(){
            this.layers.forEach(layer => layer.update());
        }

        draw(context){
            this.layers.forEach(layer => layer.draw(context));
        }
    }

    class Explosion{
        constructor(game, x, y){
            this.game = game;
            this.frameX = 0;
            this.spriteWidth = 200;
            this.spriteHeight = 200;
            this.width = this.spriteWidth;
            this.height = this.spriteHeight;
            this.x = x - this.width * 0.5;
            this.y = y - this.height * 0.5;
            this.fps = 23;
            this.timer = 0;
            this.interval = 1000/this.fps;
            this.maxFrame = 8;
            this.markedForDeletion = false;
        }

        update(deltaTime){
            if(this.timer > this.interval){
                this.frameX++;
                this.timer = 0;
            }
            else{
                this.timer += deltaTime;
            }
            if(this.frameX > this.maxFrame) this.markedForDeletion = true;
        }

        draw(context){
            context.drawImage(this.image, this.frameX * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height)
        }
    }

    class SmokeExplosion extends Explosion{
        constructor(game, x, y){
            super(game, x, y)
            this.image = document.getElementById('smokeExplosion')
        }
    }

    class FireExplosion extends Explosion{
        constructor(game, x, y){
            super(game, x, y)
            this.image = document.getElementById('fireExplosion')
        }
    }

    class UI{
        constructor(game){
            this.game = game;
            this.fontSize = 21;
            this.fontFamily = 'bangers';
            this.color = 'white';
            
        }
        draw(context){
            context.save();
            context.fillStyle = this.color;
            context.shadowOffsetX = 2;
            context.shadowOffsetY = 2;
            context.shadowColor = 'black';
            context.font = this.fontSize + 'px ' + this.fontFamily;
            
            //score 
            const score = new Image();
            score.src = "assets/score.png"
            context.drawImage(score, 10, 10, 37, 37);
            context.fillText(' : '+ this.game.score, 50, 40);
            
            //lives
            const lives = new Image();
            lives.src = "assets/heart.png"
            context.drawImage(lives, 120, 10, 37, 37);
            context.fillText(' : ' + this.game.player.lives, 160, 40);
            
            //display protect status
            const defense = new Image();
            defense.src = "assets/defense.png"
            context.drawImage(defense, 230, 10, 37, 37);
            context.fillText(' : ' + this.game.player.backUpCounter, 270, 40)
            
            //Timer
            const formattedTime = (this.game.gameTime * 0.001).toFixed(1);//Scientific Notation
            
            const timer = new Image();
            timer.src = "assets/timer.png"
            context.drawImage(timer, 10, 75, 37, 37);
            context.fillText(' : ' + formattedTime, 50, 100);
            
            //display coins(dragon)
            const dragon = new Image();
            dragon.src = "assets/dragon.png"
            context.drawImage(dragon, 120, 75, 37, 37);
            context.fillText(' : ' + this.game.player.dragonTrigger, 160, 100)
            
            //Game Over Messages
            if(this.game.gameOver){
                context.textAlign = 'center';
                let message1;
                let message2;
                //if the player won / lose
                if(this.game.score >= this.game.winningScore){
                    message1 = 'Congratulations !!!!';
                    message2 = 'Well done!';
                }
                else{
                    message1 = 'You lose!';
                    message2 = 'Try agin next time!';
                }
                context.font = '70px ' + this.fontFamily;
                context.fillText(message1, this.game.width * 0.5, this.game.height * 0.5 - 20);
                context.font = '25px ' + this.fontFamily;
                context.fillText(message2, this.game.width * 0.5, this.game.height * 0.5 + 20);
                // game.enemies.noLoop()
            }
            //ammo
            if(this.game.player.powerUp) context.fillStyle = '#ffffbd';
            for(let i = 0; i < this.game.ammo; i++){
                context.fillRect(20 + 5 * i, 50, 3, 20);
            }
            context.restore();
        }
    }

    class Game{
        constructor(width, height){
            this.width = width;
            this.height = height;
            this.background = new Background(this);
            this.player = new Player(this);
            this.input = new InputHandler(this);
            this.ui = new UI(this);
            this.dragons = [];
            this.keys = [];
            this.enemies = [];
            this.particles = [];
            this.explosions = [];
            this.enemyTimer = 0;
            this.enemyInterval = 1000;
            this.ammo = 20;
            this.maxAmmo = 50;
            this.ammoTimer = 0;
            this.ammoInterval = 375;
            this.gameOver = false;
            this.score = 0;
            this.winningScore = 1000;
            this.gameTime = 0;
            this.timeLimit = 100000;
            this.speed = 1;
            this.debug = false;
        }

        update(deltaTime){
            if(!this.gameOver) this.gameTime += deltaTime;
            if(this.gameTime > this.timeLimit || this.score >= this.winningScore) this.gameOver = true;
            this.background.update();  
            this.background.layer5.update();
            this.player.update(deltaTime);
            //game over if the player life is 0
            if(this.player.lives <= 0){
                this.player.lives = 0;
                this.gameOver = true;
            }
            if(this.ammoTimer > this.ammoInterval){
                if(this.ammo < this.maxAmmo) this.ammo++;
                this.ammoTimer = 0;
            }
            else{
                this.ammoTimer += deltaTime;
            }
            //appearance and disappearance of particles
            this.particles.forEach(particle => particle.update());
            this.particles = this.particles.filter(particle => !particle.markedForDeletion);
            //appearance and disappearance of explosions
            this.explosions.forEach(explosion => explosion.update(deltaTime));
            this.explosions = this.explosions.filter(explosion => !explosion.markedForDeletion);
            //dragon pops up
            this.dragons.forEach(dragon => dragon.update(deltaTime));
            this.dragons = this.dragons.filter(dragon => !dragon.markedForDeletion);

            this.enemies.forEach(enemy => {
                enemy.update();
                if(!this.gameOver){
                    //set collision to true if they collide(player and enemy) *************************************************
                    if(this.checkCollision(this.player, enemy)){
                        enemy.markedForDeletion = true;
                        if(this.player.backUpCounter == 5){
                            this.player.backUpCounter = 0;
                            this.player.backUp = true;
                        }
                        if(!this.player.backUp) this.player.lives -= enemy.lives;
                        if(this.player.backUp) this.player.touched = false;
                        this.addExplosion(enemy)
                        this.score -= enemy.score;
                        for(let i = 0; i < enemy.score; i++){
                            this.particles.push(new Particle(this, enemy.x + enemy.x * 0.5, enemy.y + enemy.y * 0.5));
                        }
                        if(enemy.type === 'lucky'){
                            this.player.backUpCounter++;
                            this.player.enterPowerUp();
                            this.player.dragonTrigger++;
                            if(this.player.dragonTrigger == 3){
                                this.player.touched = false
                                this.addDragon();
                                this.player.dragonTrigger = 0;
                            }
                        }
                        else{
                            this.player.touched = true
                            this.score--;
                            this.player.dragonTrigger--;
                            if(this.player.dragonTrigger < 0) this.player.dragonTrigger = 0;
                        } 
                        
                    }
                }
                this.dragons.forEach(dragon => {
                    if(this.checkCollision(enemy, dragon)){
                        if(enemy.type !== 'lucky'){
                            this.addExplosion(enemy);
                            enemy.markedForDeletion = true;
                            this.score += enemy.score;
                            dragon.lives -= enemy.lives;
                            if(dragon.lives <= 0){
                                this.addExplosion(dragon);
                                dragon.markedForDeletion = true;
                            }
                        }
                    }
                })
                
                //check if the score is negative
                if(this.score < 0) this.gameOver = true;
                this.player.projectiles.forEach(projectile => {
                    //reduce enemy life is he collides with the player's projectile
                    if(this.checkCollision(projectile, enemy)){
                        enemy.lives--;
                        projectile.markedForDeletion = true; 
                        if(enemy.lives <= 0){
                            for(let i = 0; i < enemy.score; i++){
                                this.particles.push(new Particle(this, enemy.x + enemy.width * 0.5, enemy.y + enemy.height * 0.5));
                            }
                            enemy.markedForDeletion = true; //delete if the life amount is less or equal to 0
                            this.addExplosion(enemy)
                            if(enemy.type === 'hive'){
                                for(let i = 0; i < 5; i++){
                                    this.enemies.push(new Drone(this, enemy.x + Math.random() * enemy.width, enemy.y + Math.random() * enemy.height * 0.5))
                                }
                            }
                            if(!this.gameOver) this.score += enemy.score;
                        }
                        
                    }
                })
            })
            this.enemies = this.enemies.filter(enemy => !enemy.markedForDeletion);
            if(this.enemyTimer > this.enemyInterval && !this.gameOver){
                this.addEnemy();
                this.enemyTimer = 0;
            }
            else{
                this.enemyTimer += deltaTime;
            }
        }

        draw(context){
            this.background.draw(context);
            this.ui.draw(context);
            this.player.draw(context);
            this.particles.forEach(particle => particle.draw(context));
            this.dragons.forEach(dragon => dragon.draw(context))
            this.enemies.forEach(enemy => enemy.draw(context))
            this.explosions.forEach(explosion => explosion.draw(context));
            this.background.layer5.draw(context);
        }

        addEnemy(){
            const randomize = Math.random();
            //setting up the appearing probabilities
            if(randomize < 0.2) this.enemies.push(new Angler1(this));
            else if(randomize < 0.4) this.enemies.push(new Angler2(this));
            else if(randomize < 0.65) this.enemies.push(new HiveWhale(this));
            else this.enemies.push(new LuckyFish(this));                                           
            this.enemies.push(new Angler1(this));
            
        }

        addExplosion(enemy){
            const randomize = Math.random();
            if(randomize < 0.5){
             this.explosions.push(new SmokeExplosion(this, enemy.x + enemy.width * 0.5, enemy.y + enemy.height * 0.5))
            } 
            else{
                this.explosions.push(new FireExplosion(this, enemy.x + enemy.width * 0.5, enemy.y + enemy.height * 0.5))
            }
        }

        addDragon(){
            this.dragons.push(new Dragon(this, this.player.x, this.player.y))
        }  

        //collision detection
        checkCollision(rect1, rect2){
            return(
                rect1.x < rect2.x + rect2.width && rect1.x + rect1.width > rect2.x
                && rect1.y < rect2.y + rect2.height && rect1.height + rect1.y > rect2.y
            )
        }
    }

    const game = new Game(canvas.width, canvas.height);
    let lastTime = 0;

    function animate(timeStamp){
        const deltaTime = timeStamp - lastTime;
        lastTime = timeStamp;
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        game.draw(ctx);
        game.update(deltaTime);
        requestAnimationFrame(animate);
    }
    animate(0);

})