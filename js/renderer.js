/*
    CanLift Ver0.5
    renderer.js
*/

const Renderer = {

    draw(game){

        const ctx = game.ctx;

        ctx.clearRect(0,0,800,700);

        // 空
        ctx.fillStyle="#87ceeb";
        ctx.fillRect(0,0,800,700);

        // 判定ライン
        Timing.draw(ctx);

        // 缶
        CanManager.draw(
            ctx,
            Timing.getLineY()
        );

        // エフェクト
        if(typeof Effects!=="undefined"){

            Effects.draw(ctx);

        }

        if(typeof UI !== "undefined"){

    UI.draw(ctx);

}

// HP表示
ctx.font = "32px sans-serif";
ctx.textAlign = "right";

for(let i = 0; i < game.maxHp; i++){

    if(i < game.hp){
        ctx.fillStyle = "#ff4444";
    }else{
        ctx.fillStyle = "#666666";
    }

    ctx.fillText(
        "❤",
        780 - (game.maxHp - 1 - i) * 35,
        40
    );

}
        // メッセージ
        if(game.message){

            ctx.save();

            ctx.translate(400,200);

            ctx.scale(
                game.messageScale,
                game.messageScale
            );

            ctx.textAlign="center";
            ctx.font="bold 36px sans-serif";

            switch(game.message){

                case "PERFECT!":
                    ctx.fillStyle="#ffe600";
                    break;

                case "GOOD!":
                    ctx.fillStyle="#ffffff";
                    break;

                case "MISS":
                    ctx.fillStyle="#ff6666";
                    break;

                default:
                    ctx.fillStyle="#ffffff";

            }

            ctx.fillText(
                game.message,
                0,
                0
            );

            ctx.restore();

        }

    }

};