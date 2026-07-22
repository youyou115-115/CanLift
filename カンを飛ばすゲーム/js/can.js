/*
    CanLift Ver0.4
    Can System

    缶の飛行・積み上げ管理
*/


class Can {


    constructor(x, y, powerX, powerY){


        this.x = x;
        this.y = y;


        this.width = 30;
        this.height = 40;


        // 初速

        this.velocityX = powerX;
        this.velocityY = powerY;


        // 物理

        this.gravity = 0.45;


        // 回転

        this.rotation = 0;

        this.rotationSpeed =
            (Math.random() - 0.5) * 0.15;



        this.landed = false;


    }





    /*
        更新
    */

    update(cans){


        if(this.landed)
            return;




        // 移動

        this.x += this.velocityX;

        this.y += this.velocityY;




        // 重力

        this.velocityY += this.gravity;




        // 回転

        this.rotation +=
            this.rotationSpeed;





        /*
            床判定
        */

        if(
            this.y + this.height >= 400
        ){


            this.land(
                400 - this.height
            );


        }





        /*
            缶の上への着地判定
        */

        cans.forEach(
            other => {


                if(
                    other === this ||
                    !other.landed
                ){

                    return;

                }



                if(
                    this.hitTop(other)
                ){


                    this.land(
                        other.y - this.height
                    );


                }


            }
        );



    }









    /*
        着地処理
    */

    land(y){


        this.y = y;


        this.velocityX = 0;

        this.velocityY = 0;


        this.landed = true;


    }








    /*
        上面判定
    */

    hitTop(other){


        const centerX =
            this.x + this.width / 2;



        return (

            centerX > other.x &&

            centerX <
            other.x + other.width &&


            this.y + this.height >=
            other.y &&


            this.y + this.height <=
            other.y + 20 &&


            this.velocityY > 0

        );


    }








    /*
        描画
    */

    draw(ctx){


        ctx.save();



        ctx.translate(

            this.x + this.width / 2,

            this.y + this.height / 2

        );



        ctx.rotate(
            this.rotation
        );



        ctx.fillStyle =
            "#dddddd";



        ctx.fillRect(

            -this.width / 2,

            -this.height / 2,

            this.width,

            this.height

        );



        ctx.strokeStyle =
            "#333333";



        ctx.strokeRect(

            -this.width / 2,

            -this.height / 2,

            this.width,

            this.height

        );



        ctx.restore();



    }



}









/*
    缶管理
*/


const CanManager = {


    cans:[],





    /*
        缶を投げる
    */

    throw(x,y){



        const can =
            new Can(

                x,

                y,

                6,

                -12

            );



        this.cans.push(
            can
        );


        return can;


    },







    /*
        更新
    */

    update(){


        this.cans.forEach(
            can => {


                can.update(
                    this.cans
                );


            }
        );


    },







    /*
        描画
    */

    draw(ctx){


        this.cans.forEach(
            can => {


                can.draw(ctx);


            }
        );


    },







    /*
        積み上げ高さ取得
    */

    getHeight(){


        if(
            this.cans.length === 0
        ){

            return 0;

        }




        let lowest = 400;



        this.cans.forEach(
            can => {


                if(
                    can.y < lowest
                ){

                    lowest = can.y;

                }


            }
        );



        return Math.floor(

            (400 - lowest) / 40

        );


    }



};