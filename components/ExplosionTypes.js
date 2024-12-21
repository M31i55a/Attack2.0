import Explosion from './Explosion.js'

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