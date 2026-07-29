/*
    CanLift Ver0.6
    timing.js
*/

const Timing = {

    // 判定ライン
    lineY: 550,

    getLineY(){

    if(Game.isMobile){

        return 600;

    }

    return this.lineY;

},

    // 判定幅
    perfectRange: 20,
    goodRange: 50,



    //=========================
    // 難易度
    //=========================

    updateDifficulty(liftCount){

        this.perfectRange = Math.max(
            5,
            10 - Math.floor(liftCount / 30)
        );

        this.goodRange = Math.max(
            18,
            35 - Math.floor(liftCount / 10)
        );

    },



    //=========================
    // 判定
    //=========================

    check(can){

        if(!can){
              
            return{

                result:"MISS",

                distance:999

            };

        }

        const distance = Math.abs(

    can.getSweetSpotY() -

    this.getLineY()

);

        const perfectRange =
    can.isExtra
        ? this.perfectRange + 5
        : this.perfectRange;

const goodRange =
    can.isExtra
        ? this.goodRange + 15
        : this.goodRange;



       if(distance <= perfectRange){

    return {
        result:"PERFECT",
        distance
    };

}

if(distance <= goodRange){

    return {
        result:"GOOD",
        distance
    };

}



        return{

            result:"MISS",

            distance

        };

    },



    //=========================
    // ライン描画
    //=========================

    draw(ctx){

        // 黄色ラインだけ

        ctx.beginPath();

        const y = this.getLineY();

ctx.moveTo(0,y);

ctx.lineTo(Game.screenWidth, y);

        ctx.lineWidth = 4;

        ctx.strokeStyle = "#ffd400";

        ctx.stroke();

    },



    //=========================
    // ライン取得
    //=========================

    

};