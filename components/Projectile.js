export default class Projectile{
    //a charged shot comes from the second lucky picked up while still powered up:
    //half again as big and as fast, and it takes two lives off an enemy instead of one
    constructor(game, x, y, charged = false){
        this.game = game;
        this.x = x;
        this.y = y;
        this.charged = charged;
        this.scale = charged ? 2 : 1;
        this.width = 10 * this.scale;
        this.height = 3 * this.scale;
        this.speed = 4.5 * this.scale;
        this.damage = charged ? 2 : 1;
        this.markedForDeletion = false;
        this.image = document.getElementById('projectile');
    }

    update(){
        this.x += this.speed - this.game.speed;
        if(this.x > this.game.width * 0.8) this.markedForDeletion = true;
    }

    draw(context){
        if(this.game.debug) context.strokeRect(this.x, this.y, this.width, this.height);
        context.drawImage(this.image, this.x, this.y, this.image.width * this.scale, this.image.height * this.scale);
    }
}