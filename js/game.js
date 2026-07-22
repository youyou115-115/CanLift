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

    message: "",
    messageTimer: 0,
    messageScale: 1,



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

        this.message = "";
        this.messageTimer = 0;
        this.messageScale = 1;

        CanManager.create();

        this.loop();

    },



    update(){

        if(!this.running) return;

        Timing.updateDifficulty(this.liftCount);

        CanManager.update();

        if(typeof Effects !== "undefined"){

            Effects.update();

        }

        if(this.messageTimer > 0){

            this.messageTimer--;

        }else{

            this.message = "";

        }

        if(CanManager.can && !CanManager.can.active){

            this.running = false;

            this.message = "GAME OVER";
            this.messageScale = 1.3;

        }

        if(typeof UI !== "undefined"){

            UI.setScore(this.score);
            UI.setHeight(this.liftCount);

        }

    },



    draw(){

        Renderer.draw(this);

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