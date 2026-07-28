/*
    CanLift Ver0.4
    Can System

    難易度成長 + 上部出現版
*/


class Can {


    constructor(x,y){


        this.x=x;

        this.y=y;



        this.width=30;

        this.height=45;





        this.velocityX=0;


        this.velocityY=0;




        // 基本重力

        this.baseGravity=0.05;


        this.gravity =
            this.baseGravity;



        // 最大速度

        this.maxSpeed=4;



        // 跳ね返り

        this.bouncePower=-6.5;





        this.rotation=0;


        this.rotationSpeed=0.05;




        this.active=true;



    }








    update(){



        if(!this.active)
            return;





        this.x += this.velocityX;


        this.y += this.velocityY;






        this.velocityY +=
            this.gravity;






        if(
            this.velocityY >
            this.maxSpeed
        ){


            this.velocityY =
                this.maxSpeed;


        }







        this.rotation +=
            this.rotationSpeed;






        // 壁反射

        if(

            this.x <= 0 ||

            this.x + this.width >= 800

        ){


            this.velocityX *= -1;


        }






        // 画面下に落ちたら終了

        if(
            this.y > 450
        ){


            this.active=false;


        }



    }








    /*
        リフト成功
    */

    lift(){



        this.velocityY =
            this.bouncePower;



        this.velocityX =
            (Math.random()-0.5)*1.5;



        this.rotationSpeed =
            (Math.random()-0.5)*0.2;



        this.increaseDifficulty();



    }









    /*
        徐々に難しくする
    */

    increaseDifficulty(){



        if(
            typeof Game === "undefined"
        )
            return;




        const count =
            Game.liftCount;





        if(
            count % 10 === 0
        ){



            this.gravity += 0.005;


            this.maxSpeed += 0.2;



        }






        if(
            this.gravity > 0.14
        ){

            this.gravity=0.14;

        }




        if(
            this.maxSpeed > 7
        ){

            this.maxSpeed=7;

        }



    }









    draw(ctx){



        ctx.save();



        ctx.translate(

            this.x + this.width/2,

            this.y + this.height/2

        );



        ctx.rotate(

            this.rotation

        );




        ctx.fillStyle="#ddd";


        ctx.fillRect(

            -this.width/2,

            -this.height/2,

            this.width,

            this.height

        );



        ctx.strokeStyle="#333";


        ctx.strokeRect(

            -this.width/2,

            -this.height/2,

            this.width,

            this.height

        );



        ctx.restore();



    }



}









const CanManager = {



    can:null,




    create(){



        // 画面上から落下開始

        this.can =

            new Can(

                385,

                -80

            );


    },







    update(){



        if(this.can){

            this.can.update();

        }


    },







    draw(ctx){



        if(

            this.can &&

            this.can.active

        ){


            this.can.draw(ctx);


        }


    }



};