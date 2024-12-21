import Projectile from './Projectile.js';

export class Player{
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