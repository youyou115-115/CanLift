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
        this.vy = 1.2;

        // 重力
        this.gravity = 0.06;
        this.maxFallSpeed = 6;

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

    update() {

        if (!this.active) return;

        // 重力
        this.vy += this.gravity;

        if (this.vy > this.maxFallSpeed) {

            this.vy = this.maxFallSpeed;

        }

        // 移動
        this.x += this.vx;
        this.y += this.vy;

        // 回転
        this.rotation += this.rotationSpeed;
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

        // 画面外
        if (this.y > 750) {

            this.active = false;

        }

    }
        //=========================
    // リフティング
    //=========================

    lift() {

        // 上方向へ跳ねる
        this.vy = -7.8;

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
        // 影
        //=========================

        ctx.beginPath();

        ctx.ellipse(
            this.x + this.width / 2,
            420,
            22,
            6,
            0,
            0,
            Math.PI * 2
        );

        ctx.fillStyle = "rgba(0,0,0,0.18)";
        ctx.fill();

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
        let dotSize = 4;

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
// CanManager
//=========================

const CanManager = {

    can: null,



    create() {

        // ゲーム開始時は少し上から落下
        this.can = new Can(
            383,
            -120
        );

    },



    update() {

        if (!this.can) return;

        this.can.update();

    },



    draw(ctx) {

        if (!this.can) return;

        this.can.draw(
            ctx,
            Timing.getLineY()
        );

    },



    getSweetSpotY() {

        if (!this.can) return null;

        return this.can.getSweetSpotY();

    },



    lift() {

        if (!this.can) return;

        this.can.lift();

    },



    reset() {

        this.can = null;

    }

};