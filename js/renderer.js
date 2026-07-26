/*
    CanLift Ver0.5
    renderer.js
*/

const Renderer = {

    draw(game){

        const ctx = game.ctx;

        if(!ctx){
            return;
        }

        ctx.clearRect(0,0,800,700);

        // 背景
        ctx.fillStyle="#87ceeb";
        ctx.fillRect(0,0,800,700);


        // 判定ライン
        if(typeof Timing !== "undefined"){

            Timing.draw(ctx);

        }


        // 缶
// 缶
if(typeof CanManager !== "undefined"
    && CanManager.cans){

    CanManager.draw(
        ctx,
        Timing.getLineY()
    );

}


        // エフェクト
        if(typeof Effects !== "undefined"){

            Effects.draw(ctx);

        }


        // UI
        if(typeof UI !== "undefined"){

            UI.draw(ctx,game);

        }


        // HP
        if(game.maxHp){

            for(let i=0;i<game.maxHp;i++){

                ctx.fillStyle =
                    i < game.hp
                    ? "#ff4444"
                    : "#777777";

                ctx.fillRect(
                    680+i*30,
                    18,
                    22,
                    22
                );

            }

        }


        // メッセージ
        if(game.message){

            ctx.fillStyle="#ffffff";
            ctx.font="bold 36px sans-serif";
            ctx.textAlign="center";

            ctx.fillText(
                game.message,
                400,
                200
            );

        }

        if(game.comboMessage){

    ctx.save();

    ctx.translate(400,260);

    ctx.scale(
        game.comboScale,
        game.comboScale
    );

    ctx.textAlign="center";
    ctx.font="bold 28px sans-serif";

    ctx.fillStyle="#ffff55";

    ctx.fillText(

        game.comboMessage,

        0,

        0

    );

    ctx.restore();

}

    }

};