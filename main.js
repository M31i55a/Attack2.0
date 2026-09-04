import Game from './components/Game.js';

window.addEventListener('load', function(){
    //canvas setup
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    // Canvas is fixed at 1700x700 for desktop; CSS max-width/max-height handles scaling on smaller screens
    canvas.width = 1700;
    canvas.height = 700;
    const up = document.getElementById("up");
    const down = document.getElementById("down");

    const game = new Game(canvas.width, canvas.height);
    let lastTime = 0;

    function animate(timeStamp){
        const deltaTime = timeStamp - lastTime;
        lastTime = timeStamp;
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        game.draw(ctx);
        game.update(deltaTime);
        requestAnimationFrame(animate);
    }

    //the intro holds the game still until the player is ready
    const playNow = document.getElementById('play_now');
    let started = false;

    function startGame(){
        if(started) return;
        started = true;
        document.body.classList.add('playing');
        //start the clock now, so the time spent on the intro is not charged as one huge deltaTime
        lastTime = performance.now();
        requestAnimationFrame(animate);
    }

    playNow.addEventListener('click', startGame);

    //Enter or Space starts the game instead of reaching the in-game controls
    window.addEventListener('keydown', function(e){
        if(started) return;
        if(e.key === 'Enter' || e.key === ' '){
            e.preventDefault();
            e.stopPropagation();
            startGame();
        }
    }, true);

    //compose the first frame up front so nothing flashes when the intro fades out
    game.draw(ctx);

})