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

    let hit = false;
    let comboCount = 0;

// 判定ラインにある缶だけ取得
const judgeCans =
    CanManager.getJudgeCans();

judgeCans.forEach(can => {


        const judge = Timing.check(can);

        switch(judge.result){

            case "PERFECT":

            comboCount++;
      
                hit = true;

                can.lift();

                game.score += 30;
                game.liftCount++;

                game.message = "PERFECT!";
                game.messageScale = 1.5;
                game.messageTimer = 60;

                if(typeof Sound !== "undefined"){
                    Sound.play("perfect");
                }

                if(typeof Effects !== "undefined"){
                    Effects.perfect(can.x, can.y);
                }

                break;


            case "GOOD":

                hit = true;
                comboCount++;

                can.lift();

                game.score += 10;
                game.liftCount++;

                game.message = "GOOD!";
                game.messageScale = 1.2;
                game.messageTimer = 45;

                if(typeof Sound !== "undefined"){
                    Sound.play("good");
                }

                if(typeof Effects !== "undefined"){
                    Effects.create(can.x, can.y);
                }

                break;

        }

    });

    if(comboCount >= 2){

    switch(comboCount){

        case 2:
            game.score += 20;
            game.message = "DOUBLE!!";
            break;

        case 3:
            game.score += 50;
            game.message = "TRIPLE!!";
            break;

        case 4:
            game.score += 100;
            game.message = "MEGA!!";
            break;

        default:
            game.score += 200;
            game.message = "LEGEND!!";
            break;
    }

    game.messageScale = 1.8;
    game.messageTimer = 70;

    if(typeof Sound !== "undefined"){
        Sound.play("perfect");
    }

}
    if(!hit){

        game.message = "MISS";
        game.messageScale = 1.0;
        game.messageTimer = 30;

        if(typeof Sound !== "undefined"){
            Sound.play("miss");
        }

    }

}

};