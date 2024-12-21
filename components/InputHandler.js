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
        up.addEventListener("mousedown", (e) => {
            //Create and dispatch an ArrowUp keydown event
            const arrowUpEvent = new KeyboardEvent('keydown', {
                key : 'ArrowUp',
                keyCode : 38,
                code : 'ArrowUp',
                bubbles : true
            })

            window.dispatchEvent(arrowUpEvent)
        })

        up.addEventListener("mouseup", (e) => {
            //Create and dispatch an ArrowUp keydown event
            const arrowUpEvent = new KeyboardEvent('keyup', {
                key : 'ArrowUp',
                keyCode : 38,
                code : 'ArrowUp',
                bubbles : true
            })

            window.dispatchEvent(arrowUpEvent)
        })

        down.addEventListener("mousedown", (e) => {
            //Create and dispatch an ArrowUp keydown event
            const arrowDownEvent = new KeyboardEvent('keydown', {
                key : 'ArrowDown',
                keyCode : 38,
                code : 'ArrowDown',
                bubbles : true
            })

            window.dispatchEvent(arrowDownEvent)
        })

        down.addEventListener("mouseup", (e) => {
            //Create and dispatch an ArrowUp keydown event
            const arrowUpEvent = new KeyboardEvent('keyup', {
                key : 'ArrowDown',
                keyCode : 38,
                code : 'ArrowDown',
                bubbles : true
            })

            window.dispatchEvent(arrowUpEvent)
        })
    }
}