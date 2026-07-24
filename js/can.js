/*
    CanLift Ver0.6
    can.js
*/

class Can {

    constructor(x, y) {

        this.x = x;
        this.y = y;

        // サイズ
        this.width = 34;
        this.height = 52;

        // 速度
        this.vx = 0;
        this.vy = 6;

        // 重力
        this.gravity = 0.2;
        this.maxFallSpeed = 100;

        // 回転
        this.rotation = 0;
        this.rotationSpeed = 0;

        // 状態
        this.active = true;

        // Sweet Spot（缶の中心）
        this.sweetSpotOffset = this.height / 2;

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

    if (this.x + this.width > 800) {

        this.x = 800 - this.width;
        this.vx *= -0.8;

    }

    // 地面
    if (this.y > 750) {

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
        ctx.fillStyle = "#dddddd";

        ctx.fillRect(
            -this.width / 2,
            -this.height / 2,
            this.width,
            this.height
        );

        ctx.strokeStyle = "#666";
        ctx.lineWidth = 2;

        ctx.strokeRect(
            -this.width / 2,
            -this.height / 2,
            this.width,
            this.height
        );

        // 上下ライン
        ctx.beginPath();

        ctx.moveTo(-15, -22);
        ctx.lineTo(15, -22);

        ctx.moveTo(-15, 22);
        ctx.lineTo(15, 22);

        ctx.stroke();

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

}


//=========================
// CanManager Ver0.7
//=========================

const CanManager = {

    // 現在存在する缶
    cans: [],

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

    this.targetCount = 1;
    this.respawnTimer = 0;

    const can = new Can(383, -120);
    can.isExtra = false;

    this.cans.push(can);

},



    //=========================
    // 缶を1本生成
    //=========================

    spawnCan(){

        const x =
            120 +
            Math.random() * 560;

        const y =
            -100 -
            Math.random() * 100;

        const can =
            new Can(x,y);

        // 追加缶
        can.isExtra = true;

        // 横速度
        can.vx =
            (Math.random()-0.5) * 3;

        // 初速
        can.vy =
            2 -
            Math.random()*3;

        // 重力
        can.gravity =
            0.08 +
            Math.random()*0.06;

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

            this.cans.splice(i,1);

            Game.damage();

            if(!Game.running){
                continue;
            }

            this.respawnTimer = 48;

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

            const judge =
                Timing.check(can);

            return(
                judge.result !==
                "MISS"
            );

        });

    },



    //=========================
    // リセット
    //=========================

    reset(){

        this.cans = [];

        this.targetCount = 1;

    }

};