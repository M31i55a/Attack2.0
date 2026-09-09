export default class BigBomb{
    //earned with five luckies in a row without taking a hit: it leaves the middle of the player
    //as a single spark and only goes off once it reaches the middle of the screen
    constructor(game, x, y){
        this.game = game;
        this.image = document.getElementById('bigExplosion');
        //the spark is the first frame of the explosion sheet, shrunk right down
        this.spriteWidth = 1748/5;
        this.spriteHeight = 899/2;
        this.width = 70;
        this.height = 70;
        this.x = x - this.width * 0.5;
        this.y = y - this.height * 0.5;
        this.speed = 9;
        this.angle = 0;
        this.markedForDeletion = false;
    }

    update(){
        this.x += this.speed - this.game.speed;
        this.angle += 0.15;
        //middle of the screen reached: hand it over to the blast
        if(this.x + this.width * 0.5 >= this.game.width * 0.5){
            this.markedForDeletion = true;
            this.game.addBigExplosion();
        }
    }

    draw(context){
        if(this.game.debug) context.strokeRect(this.x, this.y, this.width, this.height);
        context.save();
        //spinning it keeps the single frame alive while it travels
        context.translate(this.x + this.width * 0.5, this.y + this.height * 0.5);
        context.rotate(this.angle);
        context.drawImage(this.image, 0, 0, this.spriteWidth, this.spriteHeight, -this.width * 0.5, -this.height * 0.5, this.width, this.height);
        context.restore();
    }
}
