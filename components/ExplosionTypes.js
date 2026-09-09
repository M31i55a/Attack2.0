import Explosion from './Explosion.js?v=3'

export class SmokeExplosion extends Explosion{
    constructor(game, x, y){
        super(game, x, y)
        this.image = document.getElementById('smokeExplosion')
    }
}

export class FireExplosion extends Explosion{
    constructor(game, x, y){
        super(game, x, y)
        this.image = document.getElementById('fireExplosion')
    }
}

export class BigExplosion extends Explosion{
    //ten frames on two rows of five, played over 1.8s. The shockwave travels from the centre
    //out to a quarter of the screen and takes 100 lives off whatever it catches on the way
    constructor(game, x, y){
        super(game, x, y)
        this.image = document.getElementById('bigExplosion')
        this.spriteWidth = 1748/5;
        this.spriteHeight = 899/2;
        this.columns = 5;
        this.maxFrame = 9;
        this.frameIndex = 0;
        //how far the damage reaches: a quarter of the screen
        this.radius = this.game.width * 0.25;
        //the drawn fireball is half that box, so the animation reads tighter than its reach
        this.width = this.radius;
        this.height = this.radius;
        this.x = x - this.width * 0.5;
        this.y = y - this.height * 0.5;
        this.centerX = x;
        this.centerY = y;
        this.duration = 1800;
        this.interval = this.duration / (this.maxFrame + 1);
        this.elapsed = 0;
        this.blastRadius = 0;
        //total lives the blast can take away, shared between everything standing in it
        this.damageLeft = 100;
    }

    update(deltaTime){
        this.elapsed += deltaTime;
        //the damage spreads from the centre to the edges over the life of the animation
        this.blastRadius = this.radius * Math.min(this.elapsed / this.duration, 1);
        this.damageEnemies();
        //the ten frames are spread evenly over the 2.5s rather than counted off a timer,
        //so the animation lasts exactly as long as the blast does
        this.frameIndex = Math.floor(this.elapsed / this.interval);
        if(this.frameIndex > this.maxFrame){
            this.markedForDeletion = true;
            return;
        }
        this.frameX = this.frameIndex % this.columns;
        this.frameY = Math.floor(this.frameIndex / this.columns);
    }

    damageEnemies(){
        this.game.enemies.forEach(enemy => {
            if(this.damageLeft <= 0 || enemy.markedForDeletion) return;
            const dx = enemy.x + enemy.width * 0.5 - this.centerX;
            const dy = enemy.y + enemy.height * 0.5 - this.centerY;
            //the wave has not reached this one yet
            if(Math.hypot(dx, dy) > this.blastRadius) return;
            const damage = Math.min(this.damageLeft, enemy.lives);
            enemy.lives -= damage;
            this.damageLeft -= damage;
            if(enemy.lives <= 0) this.game.destroyEnemy(enemy);
        })
    }

    draw(context){
        if(this.game.debug){
            context.beginPath();
            context.arc(this.centerX, this.centerY, this.blastRadius, 0, Math.PI * 2);
            context.stroke();
        }
        context.drawImage(this.image, this.frameX * this.spriteWidth, this.frameY * this.spriteHeight, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height)
    }
}
