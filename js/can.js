/*
    CanLift Ver0.6
    can.js
*/

class Can {

    static image = null;

constructor(x, y) {

    // サイズ
    this.width = 34;
    this.height = 52;

    this.maxFallSpeed = 100;
    this.sweetSpotOffset = this.height / 2;

    if(!Can.image){

    Can.createImage();

}

    this.reset(x, y, false);

}


    //=========================
    // 更新
    //=========================

update(dt) {

    if (!this.active) return;

    // 重力
    this.vy += this.gravity * dt;

    if (this.vy > this.maxFallSpeed) {

        this.vy = this.maxFallSpeed;

    }

    // 移動
    this.x += this.vx * dt;
    this.y += this.vy * dt;

    // 回転
    this.rotation += this.rotationSpeed * dt;
    this.rotationSpeed *= 0.995;

    // 左右の壁
    if (this.x < 0) {

        this.x = 0;
        this.vx *= -0.8;

    }

    if(this.x + this.width > Game.screenWidth) {

        this.x =
    Game.screenWidth - this.width;
        this.vx *= -0.8;

    }

    // 地面
    const ground = Game.screenHeight + 50;

if(this.y > ground){

    this.active = false;

}
}
        //=========================
    // リフティング
    //=========================

    lift() {

        // 上方向へ跳ねる
        this.vy = -9.5;

        // 少し左右にブレる
        this.vx += (Math.random() - 0.5) * 1.6;

        // 少し回転
        this.rotationSpeed +=
            (Math.random() - 0.5) * 0.12;

        // 左右速度の上限
        if (this.vx > 3) this.vx = 3;
        if (this.vx < -3) this.vx = -3;

    }

    //=========================
// Sweet Spot
//=========================

getSweetSpotY() {

    return this.y + this.sweetSpotOffset;

}


    //=========================
    // 描画
    //=========================

    draw(ctx, lineY) {


    if (!this.active) return;

        if (!this.active) return;

        const sweetYWorld = this.getSweetSpotY();
        const distance = Math.abs(
            sweetYWorld - lineY
        );
        
        //=========================
        // 缶
        //=========================

        ctx.save();

        ctx.translate(
            this.x + this.width / 2,
            this.y + this.height / 2
        );

        ctx.rotate(this.rotation);

        // 本体
if(this.type==="heal"){

    ctx.fillStyle="gold";

    ctx.fillRect(
        -this.width/2,
        -this.height/2,
        this.width,
        this.height
    );


    // 光の枠
    ctx.strokeStyle="#fff5aa";
    ctx.lineWidth=3;

    ctx.strokeRect(
        -this.width/2,
        -this.height/2,
        this.width,
        this.height
    );


}else{

    ctx.drawImage(
        Can.image,
        -this.width/2,
        -this.height/2,
        this.width,
        this.height
    );

}


            //=========================
        // Smart Dot
        //=========================

        const localSweetY =
            this.sweetSpotOffset - this.height / 2;

        // 点のサイズ
// 点のサイズ
let dotSize = 4;

// 追加缶なら少し大きくする
if(this.isExtra){

    dotSize += 3;

}

// 色
let color = "#33bbff";

        if (distance < 80) {

            dotSize = 6;
            color = "#ffff00";

        }

        if (distance < Timing.goodRange) {

            dotSize = 9;
            color = "#ff9900";

        }

        if (distance < Timing.perfectRange) {

            dotSize = 13;
            color = "#00ff66";

        }

        // 点
        ctx.beginPath();

        ctx.arc(
            0,
            localSweetY,
            dotSize,
            0,
            Math.PI * 2
        );

        ctx.fillStyle = color;
        ctx.fill();

        // PERFECT時の発光
        if (distance < Timing.perfectRange) {

            ctx.beginPath();

            ctx.arc(
                0,
                localSweetY,
                dotSize + 6,
                0,
                Math.PI * 2
            );

            ctx.strokeStyle = "rgba(0,255,120,0.45)";
            ctx.lineWidth = 2;
            ctx.stroke();

        }

        ctx.restore();

    }
       //=========================
    // リセット
    //=========================

 reset(x,y,isExtra,type="normal"){

    this.x=x;
    this.y=y;

    this.active=true;

    this.isExtra=isExtra;

    this.type=type;

     this.rotation = 0;

    if(isExtra){

        this.vx = (Math.random()-0.5)*3;
        this.vy = 2-Math.random()*3;
        this.gravity = 0.08 + Math.random()*0.06;

        this.rotationSpeed =
            (Math.random()-0.5)*0.08;

    }else{

        this.vx = 0;
        this.vy = 6;
        this.gravity = 0.2;

        this.rotationSpeed =
            (Math.random()-0.5)*0.03;

    }

}
static createImage(){

    const canvas =
        document.createElement("canvas");

    canvas.width = 34;
    canvas.height = 52;

    const ctx =
        canvas.getContext("2d");

    // 本体
    ctx.fillStyle = "#dddddd";

    ctx.fillRect(
        0,
        0,
        34,
        52
    );

    // 枠
    ctx.strokeStyle = "#666";
    ctx.lineWidth = 2;

    ctx.strokeRect(
        0,
        0,
        34,
        52
    );

    // 上下ライン
    ctx.beginPath();

    ctx.moveTo(2,5);
    ctx.lineTo(32,5);

    ctx.moveTo(2,47);
    ctx.lineTo(32,47);

    ctx.stroke();

    Can.image = canvas;

}
}


//=========================
// CanManager Ver0.7
//=========================

const CanManager = {

    // 現在存在する缶
    cans: [],
    pool: [],

    // 目標本数
    targetCount: 1,

    // 最大缶数
    maxCount: 5,
    respawnTimer: 0,



    //=========================
    // ゲーム開始
    //=========================

create(){

    this.cans = [];
    this.pool = [];

    this.targetCount = 1;
    this.respawnTimer = 0;

        // プール作成
    for(let i = 0; i < this.maxCount; i++){

        this.pool.push(new Can(0, 0));

    }

    // 最初の缶
    const can = this.pool.pop();

if(!can) return;

const startY =
    Game.isMobile
    ? -20
    : -120;

can.reset(
    383,
    startY,
    false
);

can.vy = 3;
can.gravity = 0.12;

    this.cans.push(can);

},



    //=========================
    // 缶を1本生成
    //=========================

    spawnCan(){

    const x =
        120 +
        Math.random() * 560;

    // スマホは画面のすぐ上から出す
    const startY =
        Game.isMobile
        ? -20
        : -100;

    const y =
        startY -
        Math.random() * 50;

    const can = this.pool.pop();

    if(!can) return;

    can.reset(x, y, true);

    this.cans.push(can);

},

    //=========================
    // 足りない缶を補充
    //=========================

    fill(){

        while(

            this.cans.length
            <
            this.targetCount

        ){

            this.spawnCan();

        }

    },



    //=========================
    // 缶を増やす
    //=========================

    increaseTarget(){

        if(

            this.targetCount
            <
            this.maxCount

        ){

            this.targetCount++;

        }

        this.fill();

    },
    //=========================
    // 更新
    //=========================

update(dt){

    for(let i = this.cans.length - 1; i >= 0; i--){

        const can = this.cans[i];

        can.update(dt);

        if(!can.active){

            const removed =
this.cans.splice(i,1)[0];

this.pool.push(removed);

            if(removed.type==="heal"){
                removed.type = "normal";

    // 金缶は落としてもペナルティなし

}else if(Game.feverMode){

    Game.feverFailed=true;

}else{

    Game.damage();

}
            Game.resetCombo();

            if(!Game.running){
                continue;
            }

            if(!Game.feverMode){

    this.respawnTimer = 48;

};

        }

    }

    // ←ここが重要！ forの外
    if(this.respawnTimer > 0){

        this.respawnTimer--;

        if(this.respawnTimer <= 0){

            this.fill();

        }

    }

},



    //=========================
    // 描画
    //=========================

    draw(ctx){

        this.cans.forEach(can=>{

            can.draw(
                ctx,
                Timing.getLineY()
            );

        });

    },






    //=========================
    // 判定できる缶一覧
    //=========================

   getJudgeCans(){

    return this.cans.filter(can=>{

        if(!can.active)
            return false;


        const distance =
            Math.abs(
                can.getSweetSpotY()
                -
                Timing.getLineY()
            );


        // 判定受付範囲
        return distance < 80;

    });

},
    spawnFever(count){
        const feverStartY =
    Game.isMobile
    ? -20
    : -100;

    

    for(let i=0;i<count;i++){

        let can=this.pool.pop();

if(!can){

    can = new Can(0,0);

}
      let x;
      let y;

    if(count >= 5){
        

        const spacing = 100;
        const startX =
            400 - ((count - 1) * spacing) / 2;

        x =
            startX +
            i * spacing +
            (Math.random() - 0.5) * 20;

        y =
    feverStartY -
    i * 80;

    }else{

        x = 120 + Math.random() * 560;
       y =
    feverStartY -
    i * 70;

    }


can.reset(
    x,
    y,
    true
);

// FEVER缶は全体的にゆっくり
can.vx *= 0.5;
can.vy *= 0.55;
can.gravity *= 0.7;


        this.cans.push(can);

    }

},
spawnHealCan(){

    const startY =
    Game.isMobile
    ? -20
    : -100;

    console.log("HEAL CAN SPAWN");

    let can=this.pool.pop();


    if(!can){

        can=new Can(0,0);

    }


    const x =
    120 + Math.random()*560;


    can.reset(
    x,
    startY,
    true,
    "heal"
);


    this.cans.push(can);

},
spawnStartCans(){

     // 現在の缶を完全回収
    this.cans.forEach(can=>{
        can.active=false;
        this.pool.push(can);
    });

    this.cans = [];

    const startY1 =
    Game.isMobile
    ? -20
    : -120;

const startY2 =
    Game.isMobile
    ? -100
    : -220;

    // 1本目
    let can = this.pool.pop() || new Can(0,0);
    can.reset(
    300,
    startY1,
    false
);
    can.vy = 3;
    can.gravity = 0.12;
    this.cans.push(can);

    // 2本目
    can = this.pool.pop() || new Can(0,0);
    can.reset(
    500,
    startY2 - 120,
    false
);
    can.vy = 1.5;
    can.gravity = 0.12;
    this.cans.push(can);

}


    };

