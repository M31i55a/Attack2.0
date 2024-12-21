export default class Layer{
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