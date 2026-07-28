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


        ctx.clearRect(
    0,
    0,
    game.canvas.width,
    game.canvas.height
);

ctx.save();

const scale = Math.min(

    game.canvas.width / 800,

    game.canvas.height / 700

);

const offsetX =
    (game.canvas.width - 800 * scale)/2;

const offsetY =
    (game.canvas.height - 700 * scale)/2;

ctx.translate(offsetX,offsetY);

ctx.scale(scale,scale);



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

        //=========================
// FEVER GAUGE
//=========================

// 枠
if(game.gameMode==="fever"){
ctx.fillStyle="#333";

ctx.fillRect(
    20,
    110,
    220,
    20
);

// 中身
const rate =
    game.feverGauge /
    game.feverMax;

ctx.fillStyle="#ffcc00";

ctx.fillRect(
    20,
    110,
    220*rate,
    20
);

// 枠線
ctx.strokeStyle="#ffffff";
ctx.lineWidth=2;

ctx.strokeRect(
    20,
    110,
    220,
    20
);

// 文字
ctx.fillStyle="#ffffff";
ctx.font="bold 16px sans-serif";

ctx.fillText(
    "FEVER",
    20,
    102
);

if(game.feverGauge>=game.feverMax){

    ctx.fillStyle="#ffff55";

    ctx.font="bold 22px sans-serif";

    ctx.fillText(
        "READY!",
        255,
        127
    );

}
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
        
        //=========================
// FEVER CUTIN
//=========================

if(game.feverState==="cutin"){

    ctx.fillStyle=
        "rgba(0,0,0,0.75)";

    ctx.fillRect(
        0,
        0,
        800,
        700
    );

    ctx.fillStyle="#ffdd00";

    ctx.font=
        "bold 70px sans-serif";

    ctx.textAlign="center";

    ctx.fillText(

        "FEVER!!",

        400,

        330

    );

}
//=========================
// DICE
//=========================

if(game.feverState==="dice"){

    ctx.fillStyle=
        "rgba(0,0,0,0.75)";

    ctx.fillStyle="#ffffff";

    ctx.font="bold 120px sans-serif";

    ctx.textAlign="center";

    ctx.fillText(

        game.diceValue,

        400,

        380

    );
    ctx.font="bold 35px sans-serif";

ctx.fillStyle="#ffff00";

ctx.fillText(
    "RESULT!",
    400,
    250
);

    ctx.font="bold 32px sans-serif";

ctx.fillText(
    "RESULT",
    400,
    450
);

    ctx.font="bold 30px sans-serif";

    ctx.fillText(

        "ROLLING...",

        400,

        470

    );

}
//=========================
// FEVER
//=========================

if(game.feverState==="fever"){

    const alpha=

0.12+

Math.sin(

performance.now()/120

)*0.08;

ctx.fillStyle=

"rgba(255,220,0,"+

alpha+

")";

ctx.fillRect(

0,

0,

800,

700

);

    ctx.fillRect(
        0,
        0,
        800,
        700
    );

    //=========================
// FEVER文字（脈打つ）
//=========================

const feverscale =
    1 +
    Math.sin(
        performance.now()/90
    ) * 0.12;

ctx.save();

ctx.translate(
    400,
    70
);

ctx.scale(
    feverscale,
    feverscale
);

ctx.fillStyle="#ffff55";

ctx.font="bold 46px sans-serif";

ctx.textAlign="center";

ctx.fillText(
    "FEVER",
    0,
    0
);

ctx.restore();
    //=========================
// FEVERタイマー
//=========================

const sec =
    game.feverTimer / 60;

// 残り2秒で赤色
if(sec < 2){

    ctx.fillStyle="#ff4444";

}else{

    ctx.fillStyle="#ffffff";

}

ctx.font="bold 34px sans-serif";

ctx.fillText(

    sec.toFixed(1),

    400,

    120

);

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

    // 少し脈打つ
    const pulse =
        1 +
        Math.sin(
            performance.now()/120
        ) * 0.08;

    ctx.save();

    ctx.translate(400,260);

    ctx.scale(
        game.comboScale * pulse,
        game.comboScale * pulse
    );

    ctx.textAlign="center";

    ctx.font="bold 34px sans-serif";

    // 色
    let color = game.rewardColor;

    // MAX HPだけ虹色
    if(game.comboMessage==="MAX HP UP!!"){

        const hue =
            (performance.now()/10)%360;

        color =
            `hsl(${hue},100%,60%)`;

    }

    ctx.shadowBlur = 20;
    ctx.shadowColor = color;

    ctx.fillStyle = color;

    ctx.fillText(

        game.comboMessage,

        0,

        0

    );

    ctx.restore();

}

ctx.restore();

    },
     

};
