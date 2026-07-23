/*
    CanLift Ver0.4
    Effects System

    PERFECT演出強化版
*/
const IS_MOBILE =
    /Android|iPhone|iPad|iPod/i.test(
        navigator.userAgent
    );

const Effects = {


    particles:[],


    flashes:[],






    /*
        通常ヒット演出
    */

    create(x,y){



        const amount =
    IS_MOBILE ? 5 : 10;

for(
    let i=0;
    i<amount;
    i++
){


            this.particles.push({

                x:x+15,

                y:y+20,


                size:
                    Math.random()*5+2,


                speedX:
                    (Math.random()-0.5)*5,


                speedY:
                    (Math.random()-0.5)*5,


                life:30



            });



        }



    },








    /*
        PERFECT演出
    */

    perfect(x,y){



if(!IS_MOBILE){

    this.flashes.push({

        x:x+15,
        y:y+20,

        radius:10,

        maxRadius:90,

        alpha:1

    });

}





        const amount =
    IS_MOBILE ? 10 : 25;

for(
    let i=0;
    i<amount;
    i++
){



            this.particles.push({


                x:x+15,

                y:y+20,


                size:
                    Math.random()*8+3,


                speedX:
                    (Math.random()-0.5)*8,


                speedY:
                    (Math.random()-0.5)*8,


                life:45



            });


        }



    },









    update(){



        this.particles.forEach(

            p=>{


                p.x += p.speedX;


                p.y += p.speedY;


                p.life--;


            }


        );





        this.particles =

            this.particles.filter(

                p=>p.life>0

            );







if(!IS_MOBILE){

    this.flashes.forEach(

        f=>{

            f.radius += 5;
            f.alpha -= 0.05;

        }

    );

}






        this.flashes =

            this.flashes.filter(

                f=>f.alpha>0

            );



    },









    draw(ctx){





        // 光

  if(!IS_MOBILE){

    this.flashes.forEach(

        f=>{

            ctx.beginPath();

            ctx.arc(
                f.x,
                f.y,
                f.radius,
                0,
                Math.PI*2
            );

            ctx.fillStyle =
                "rgba(255,215,0,"+
                f.alpha+
                ")";

            ctx.fill();

        }

    );

}





        // 粒

        this.particles.forEach(

            p=>{


                ctx.fillStyle=

                    "rgba(255,255,0,"+

                    p.life/45+

                    ")";



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