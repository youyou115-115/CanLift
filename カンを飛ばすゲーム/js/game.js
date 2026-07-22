/*
    CanLift Ver0.4
    Game Engine

    タップ・クリック操作統合版
*/


const Game = {


    canvas:null,

    ctx:null,


    width:800,

    height:450,


    running:false,


    score:0,







    /*
        初期化
    */

    init(canvas){


        this.canvas = canvas;


        this.ctx =
            canvas.getContext("2d");




        if(typeof Foot !== "undefined"){

            Foot.init();

        }



        if(typeof UI !== "undefined"){

            UI.init();

        }




        this.setupInput();



        console.log(
            "CanLift Ver0.4 Ready"
        );



        this.draw();


    },









    /*
        入力設定
    */

    setupInput(){



        // PCクリック

        this.canvas.addEventListener(

            "click",

            ()=>{

                this.throwCan();

            }

        );





        // スマホタップ

        this.canvas.addEventListener(

            "touchstart",

            (event)=>{


                event.preventDefault();


                this.throwCan();



            },


            {
                passive:false
            }

        );



    },








    /*
        缶発射
    */

    throwCan(){



        if(
            typeof CanManager === "undefined"
        ){

            return;

        }




        let position = {


            x:400,

            y:300


        };




        if(
            typeof Foot !== "undefined"
        ){


            position =
            Foot.getThrowPosition();



        }




        CanManager.throw(

            position.x,

            position.y

        );





        if(
            typeof Effects !== "undefined"
        ){


            Effects.create(

                position.x,

                position.y

            );


        }



    },









    /*
        スタート
    */

    start(){


        if(this.running)
            return;




        this.running=true;


        this.score=0;



        this.loop();



    },








    /*
        更新
    */

    update(){



        if(typeof Foot !== "undefined"){


            Foot.update();


        }




        if(typeof CanManager !== "undefined"){


            CanManager.update();


        }




        if(typeof Effects !== "undefined"){


            Effects.update();


        }






        this.score += 0.01;







        if(typeof UI !== "undefined"){



            UI.setScore(

                this.score

            );




            UI.setCanCount(

                CanManager.cans.length

            );





            UI.setHeight(

                CanManager.getHeight()

            );



        }



    },









    /*
        描画
    */

    draw(){


        const ctx =
            this.ctx;




        ctx.clearRect(

            0,

            0,

            this.width,

            this.height

        );






        //背景

        ctx.fillStyle =
            "#87ceeb";


        ctx.fillRect(

            0,

            0,

            this.width,

            this.height

        );








        //地面

        ctx.fillStyle =
            "#555";


        ctx.fillRect(

            0,

            400,

            this.width,

            50

        );








        //缶

        if(
            typeof CanManager !== "undefined"
        ){


            CanManager.draw(ctx);


        }






        //プレイヤー

        if(
            typeof Foot !== "undefined"
        ){


            Foot.draw(ctx);


        }






        //演出

        if(
            typeof Effects !== "undefined"
        ){


            Effects.draw(ctx);


        }



    },









    /*
        ゲームループ
    */

    loop(){



        if(!this.running){

            return;

        }



        this.update();


        this.draw();



        requestAnimationFrame(

            ()=>this.loop()

        );


    }




};