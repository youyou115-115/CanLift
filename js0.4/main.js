/*
    CanLift Ver0.4
    Main

    ゲーム起動
*/


window.addEventListener(

    "load",

    ()=>{


        const canvas =
            document.getElementById(
                "gameCanvas"
            );



        if(!canvas){


            console.error(
                "Canvas not found"
            );


            return;


        }




        canvas.width=800;

        canvas.height=450;





        Game.init(canvas);





        const startButton =
            document.getElementById(
                "startButton"
            );



        if(startButton){



            startButton.addEventListener(

                "click",

                ()=>{


                    Game.start();


                }

            );


        }



    }

);