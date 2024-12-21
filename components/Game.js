import {Background} from './Background.js';
import {Player} from './Player.js';
import {InputHandler} from './InputHandler.js';
import {UI} from './UserInterface.js';
import {Dragon} from './Dragon.js';
import {Particle} from './Particle.js';
import {SmokeExplosion, FireExplosion} from './ExplosionTypes.js';
import {Angler1, Angler2, HiveWhale, LuckyFish, Drone} from './EnemyTypes.js';

export default class Game{
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