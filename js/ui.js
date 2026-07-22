/*
    CanLift Ver0.5
    ui.js
*/

const UI = {

    score: 0,
    lift: 0,

    init(){

        this.score = 0;
        this.lift = 0;

    },



    setScore(score){

        this.score = score;

    },



    setHeight(lift){

        this.lift = lift;

    },



    draw(ctx){

        // スコア
        ctx.fillStyle = "#ffffff";
        ctx.font = "bold 28px sans-serif";
        ctx.textAlign = "left";

        ctx.fillText(
            "SCORE : " + this.score,
            20,
            40
        );

        // リフティング回数
        ctx.fillText(
            "LIFT : " + this.lift,
            20,
            80
        );

    }

};