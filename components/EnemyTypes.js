import Enemy from './Enemy.js';

export class Angler1 extends Enemy{
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

export class Angler2 extends Enemy{
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

export class LuckyFish extends Enemy{
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

export class HiveWhale extends Enemy{
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

export class Drone extends Enemy{
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