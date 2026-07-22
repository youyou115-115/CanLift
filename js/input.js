/*
    CanLift Ver0.5
    input.js
*/

const Input = {

    game: null,

    init(game){

        this.game = game;

        const canvas = game.canvas;

        // マウス
        canvas.addEventListener("click", () => {

            this.tap();

        });

        // タッチ
        canvas.addEventListener("touchstart", (e) => {

            e.preventDefault();

            this.tap();

        }, {
            passive: false
        });

    },



    tap(){

        const game = this.game;

        if(!game.running) return;

        const can = CanManager.can;

        if(!can || !can.active) return;

        const judge = Timing.check(can);

        switch(judge.result){

            case "PERFECT":

                can.lift();

                game.score += 30;
                game.liftCount++;

                game.message = "PERFECT!";
                game.messageScale = 1.5;
                game.messageTimer = 60;

                if(typeof Effects !== "undefined"){

                    Effects.perfect(can.x, can.y);

                }

                break;



            case "GOOD":

                can.lift();

                game.score += 10;
                game.liftCount++;

                game.message = "GOOD!";
                game.messageScale = 1.2;
                game.messageTimer = 45;

                if(typeof Effects !== "undefined"){

                    Effects.create(can.x, can.y);

                }

                break;



            default:

                game.message = "MISS";
                game.messageScale = 1.0;
                game.messageTimer = 30;

                break;

        }

    }

};