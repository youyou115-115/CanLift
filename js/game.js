/*
    CanLift Ver0.5
    game.js
*/

const Game = {

    canvas: null,
    ctx: null,

    running: false,

    score: 0,
    liftCount: 0,

    hp: 3,
    maxHp: 3,

    lastAddedCount:0,

    message: "",
    messageTimer: 0,
    messageScale: 1,
    lastTime: 0,
    deltaTime: 1,



    init(canvas){

        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");

        if(typeof UI !== "undefined"){

            UI.init();

        }

        Input.init(this);

        Renderer.draw(this);

    },



    start(){

        this.running = true;

        this.score = 0;
        this.liftCount = 0;

        this.hp = this.maxHp;

        this.lastAddedCount = 0;

        this.message = "";
        this.messageTimer = 0;
        this.messageScale = 1;
        this.lastTime = performance.now();

        CanManager.create();

        this.loop();

    },



    update(){

        const now = performance.now();

        this.deltaTime = (now - this.lastTime) / 12.666;

         this.lastTime = now;

        // 極端な遅延対策
         this.deltaTime = Math.min(this.deltaTime,2);

        if(!this.running) return;

        Timing.updateDifficulty(this.liftCount);

        CanManager.update(this.deltaTime);

if(
    this.liftCount >= this.lastAddedCount + 10
){

    CanManager.increaseTarget();

    this.lastAddedCount = this.liftCount;

}
        if(typeof Effects !== "undefined"){

            Effects.update();

        }

        if(this.messageTimer > 0){

            this.messageTimer--;

        }else{

            this.message = "";

        }

        if(typeof UI !== "undefined"){

            UI.setScore(this.score);
            UI.setHeight(this.liftCount);

        }

    },



    draw(){

        Renderer.draw(this);

    },

    damage(){

    this.hp--;

    if(this.hp <= 0){

        this.running = false;

        this.message = "GAME OVER";
        this.messageScale = 1.3;

    }

},



    loop(){

        if(!this.running){

            this.draw();
            return;

        }

        this.update();

        this.draw();

        requestAnimationFrame(() => this.loop());

    }

};
