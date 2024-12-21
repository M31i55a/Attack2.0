export default class Enemy{
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