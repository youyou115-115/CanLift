/*
    CanLift Ver0.4
    Foot System

    プレイヤー管理
*/


const Foot = {


    x:400,

    y:330,


    width:40,

    height:70,



    /*
        初期化
    */

    init(){


        console.log(
            "Foot Ready"
        );


    },





    /*
        缶発射位置
    */

    getThrowPosition(){


        return {

            x:
            this.x + this.width/2 - 15,


            y:
            this.y - 10

        };


    },







    /*
        更新
    */

    update(){


        //Ver0.4では固定


    },








    /*
        描画
    */

    draw(ctx){



        // 足元

        ctx.fillStyle =
        "#222";



        ctx.fillRect(

            this.x,

            this.y,

            this.width,

            this.height

        );




        // 手（缶を持つ位置）

        ctx.fillStyle =
        "#444";


        ctx.fillRect(

            this.x + 30,

            this.y + 20,

            20,

            15

        );



    }



};