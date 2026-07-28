/*
    CanLift Ver0.4
    Effects System

    演出・パーティクル管理
*/


const Effects = {


    particles: [],




    /*
        パーティクル生成
    */

    create(x, y, amount = 10){


        for(
            let i = 0;
            i < amount;
            i++
        ){


            this.particles.push({

                x:x,

                y:y,


                size:
                Math.random()*5+2,


                velocityX:
                (Math.random()-0.5)*4,


                velocityY:
                (Math.random()-0.5)*4,


                life:30

            });


        }


    },







    /*
        更新
    */

    update(){


        this.particles.forEach(
            p=>{


                p.x += p.velocityX;

                p.y += p.velocityY;


                p.life--;


            }
        );



        //消滅処理

        this.particles =
        this.particles.filter(
            p=>p.life>0
        );



    },








    /*
        描画
    */

    draw(ctx){


        this.particles.forEach(
            p=>{


                ctx.fillStyle =
                "#ffcc00";


                ctx.fillRect(

                    p.x,
                    p.y,

                    p.size,
                    p.size

                );


            }
        );



    }






};