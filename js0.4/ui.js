/*
    CanLift Ver0.4
    Game System

    PERFECT演出連携版
*/


const Game = {


    canvas:null,

    ctx:null,


    running:false,


    score:0,

    liftCount:0,


    lineY:350,


    message:"",

    messageTimer:0,


    messageScale:1,








    init(canvas){


        this.canvas=canvas;


        this.ctx =
            canvas.getContext("2d");



        if(typeof UI !== "undefined"){

            UI.init();

        }



        this.setupInput();


        this.draw();


    },









    setupInput(){



        this.canvas.addEventListener(

            "click",

            ()=>{

                this.tap();

            }

        );





        this.canvas.addEventListener(

            "touchstart",

            (e)=>{


                e.preventDefault();


                this.tap();


            },

            {
                passive:false
            }

        );



    },









    start(){



        this.running=true;


        this.score=0;


        this.liftCount=0;


        this.message="";


        CanManager.create();


        this.loop();


    },









    getHitRange(){



        if(this.liftCount < 5)
            return 55;



        if(this.liftCount < 10)
            return 45;



        if(this.liftCount < 20)
            return 35;



        if(this.liftCount < 40)
            return 25;



        return 18;



    },









    tap(){



        if(!this.running)
            return;





        const can =
            CanManager.can;



        if(
            !can ||
            !can.active
        )
            return;







        const centerY =
            can.y + can.height/2;



        const distance =
            Math.abs(

                centerY-this.lineY

            );







        if(
            distance <= this.getHitRange()
        ){



            can.lift();



            this.liftCount++;





            if(distance < 10){



                this.score += 30;


                this.message =
                    "PERFECT!";


                this.messageScale=1.5;




                if(
                    typeof Effects !== "undefined"
                ){


                    Effects.perfect(

                        can.x,

                        can.y

                    );


                }



                this.messageTimer=60;



            }
            else{


                this.score += 10;


                this.message =
                    "GOOD!";


                this.messageScale=1.2;



                if(
                    typeof Effects !== "undefined"
                ){


                    Effects.create(

                        can.x,

                        can.y

                    );


                }



                this.messageTimer=45;



            }





        }
        else{


            this.message =
                "MISS";


            this.messageScale=1;


            this.messageTimer=45;



        }



    },









    update(){



        if(!this.running)
            return;




        CanManager.update();




        if(typeof Effects !== "undefined"){


            Effects.update();


        }







        if(
            this.messageTimer>0
        ){


            this.messageTimer--;


        }
        else{


            this.message="";


        }







        if(

            CanManager.can &&

            !CanManager.can.active

        ){



            this.running=false;


            this.message=
                "GAME OVER";


        }








        if(typeof UI !== "undefined"){


            UI.setScore(

                this.score

            );


            UI.setHeight(

                this.liftCount

            );


        }



    },









    draw(){



        const ctx=this.ctx;




        ctx.clearRect(

            0,

            0,

            800,

            450

        );







        ctx.fillStyle=
            "#87ceeb";


        ctx.fillRect(

            0,

            0,

            800,

            450

        );









        // PERFECTゾーン

        ctx.fillStyle=
            "rgba(255,215,0,0.25)";


        ctx.fillRect(

            0,

            this.lineY-10,

            800,

            20

        );







        // ライン

        ctx.strokeStyle=
            "#ffcc00";


        ctx.lineWidth=5;


        ctx.beginPath();


        ctx.moveTo(

            0,

            this.lineY

        );


        ctx.lineTo(

            800,

            this.lineY

        );


        ctx.stroke();








        // 缶

        CanManager.draw(ctx);






        // メッセージ

        if(this.message){



            ctx.save();



            ctx.translate(

                400,

                200

            );



            ctx.scale(

                this.messageScale,

                this.messageScale

            );



            ctx.fillStyle =
                this.message==="PERFECT!" ?
                "#ffff00" :
                "#ffffff";



            ctx.font =
                "bold 36px sans-serif";



            ctx.textAlign =
                "center";



            ctx.fillText(

                this.message,

                0,

                0

            );



            ctx.restore();



        }







        if(typeof Effects !== "undefined"){


            Effects.draw(ctx);


        }



    },









    loop(){



        if(!this.running)
            return;




        this.update();


        this.draw();



        requestAnimationFrame(

            ()=>this.loop()

        );



    }



};