export class UI{
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