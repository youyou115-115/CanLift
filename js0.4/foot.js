/*
    CanLift Ver0.4
    Foot System

    演出用キックアニメーション
*/


const Foot = {


    x:360,

    y:370,


    width:80,

    height:25,


    kicking:false,


    timer:0,


    duration:8,






    init(){


        console.log(
            "Foot Animation Ready"
        );


    },








    /*
        キック演出開始
    */

    kick(){


        this.kicking=true;


        this.timer =
            this.duration;


    },









    /*
        更新
    */

    update(){



        if(this.kicking){


            this.timer--;



            if(
                this.timer <= 0
            ){

                this.kicking=false;


            }


        }



    },









    /*
        描画
    */

    draw(ctx){



        let offset = 0;



        if(this.kicking){


            offset=-25;


        }





        ctx.save();




        ctx.translate(

            this.x,

            this.y + offset

        );




        // 足本体

        ctx.fillStyle =
            this.kicking ?
            "#ff9900" :
            "#222";



        ctx.fillRect(

            0,

            0,

            this.width,

            this.height

        );






        // つま先

        ctx.fillStyle =
            "#555";



        ctx.fillRect(

            this.width-20,

            -5,

            25,

            15

        );





        ctx.restore();



    }



};