const ctx = document.getElementById('canvas1').getContext('2d');

export class Dragon{
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