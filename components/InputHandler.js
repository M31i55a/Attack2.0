export class InputHandler{
    constructor(game){
        this.game = game;
        //keyboard events
        window.addEventListener('keydown', (e) => {
            if(((e.key === 'ArrowUp') || (e.key === 'ArrowDown') ) && this.game.keys.indexOf(e.key) === -1){
                this.game.keys.push(e.key);
            }
            else if(e.key === ' '){
                this.game.player.shootTop();
            }
            else if(e.key === 'd' || e.key === 'D'){
                this.game.debug = !this.game.debug;
            }
        })
        window.addEventListener('keyup', (e) => {
            if(this.game.keys.indexOf(e.key) > -1){
                this.game.keys.splice(this.game.keys.indexOf(e.key), 1)
            }
        })

        //For mobile
        const up = document.getElementById("up");
        const down = document.getElementById("down");
        const shoot = document.getElementById("shoot");

        up.addEventListener("mousedown", (e) => {
            const arrowUpEvent = new KeyboardEvent('keydown', {
                key : 'ArrowUp',
                keyCode : 38,
                code : 'ArrowUp',
                bubbles : true
            })
            window.dispatchEvent(arrowUpEvent)
        })

        up.addEventListener("mouseup", (e) => {
            const arrowUpEvent = new KeyboardEvent('keyup', {
                key : 'ArrowUp',
                keyCode : 38,
                code : 'ArrowUp',
                bubbles : true
            })
            window.dispatchEvent(arrowUpEvent)
        })

        up.addEventListener("touchstart", (e) => {
            e.preventDefault();
            const arrowUpEvent = new KeyboardEvent('keydown', {
                key : 'ArrowUp',
                keyCode : 38,
                code : 'ArrowUp',
                bubbles : true
            })
            window.dispatchEvent(arrowUpEvent)
        })

        up.addEventListener("touchend", (e) => {
            e.preventDefault();
            const arrowUpEvent = new KeyboardEvent('keyup', {
                key : 'ArrowUp',
                keyCode : 38,
                code : 'ArrowUp',
                bubbles : true
            })
            window.dispatchEvent(arrowUpEvent)
        })

        down.addEventListener("mousedown", (e) => {
            const arrowDownEvent = new KeyboardEvent('keydown', {
                key : 'ArrowDown',
                keyCode : 40,
                code : 'ArrowDown',
                bubbles : true
            })
            window.dispatchEvent(arrowDownEvent)
        })

        down.addEventListener("mouseup", (e) => {
            const arrowDownEvent = new KeyboardEvent('keyup', {
                key : 'ArrowDown',
                keyCode : 40,
                code : 'ArrowDown',
                bubbles : true
            })
            window.dispatchEvent(arrowDownEvent)
        })

        down.addEventListener("touchstart", (e) => {
            e.preventDefault();
            const arrowDownEvent = new KeyboardEvent('keydown', {
                key : 'ArrowDown',
                keyCode : 40,
                code : 'ArrowDown',
                bubbles : true
            })
            window.dispatchEvent(arrowDownEvent)
        })

        down.addEventListener("touchend", (e) => {
            e.preventDefault();
            const arrowDownEvent = new KeyboardEvent('keyup', {
                key : 'ArrowDown',
                keyCode : 40,
                code : 'ArrowDown',
                bubbles : true
            })
            window.dispatchEvent(arrowDownEvent)
        })

        // mousedown handles desktop clicks; touchstart handles mobile taps.
        // e.preventDefault() in touchstart suppresses the synthetic mousedown on mobile,
        // so shootTop() is only called once per interaction.
        shoot.addEventListener("mousedown", (e) => {
            this.game.player.shootTop();
        })

        shoot.addEventListener("touchstart", (e) => {
            e.preventDefault();
            this.game.player.shootTop();
        })
    }
}