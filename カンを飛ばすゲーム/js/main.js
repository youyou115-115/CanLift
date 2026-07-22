/*
    CanLift Ver0.4
    Main Controller

    起動管理
*/


window.addEventListener(
    "load",
    () => {


        console.log(
            "CanLift Ver0.4 Loaded"
        );


        const canvas =
            document.getElementById(
                "gameCanvas"
            );


        const startButton =
            document.getElementById(
                "startButton"
            );


        if(!canvas){

            console.error(
                "Canvas not found"
            );

            return;

        }



        /*
            Game初期化
        */

        if(
            typeof Game !== "undefined"
        ){

            Game.init(canvas);

        }
        else{

            console.warn(
                "Game module waiting..."
            );

        }



        /*
            START BUTTON
        */

        startButton.addEventListener(
            "click",
            ()=>{


                if(
                    typeof Game !== "undefined"
                ){

                    Game.start();

                }
                else{

                    console.warn(
                        "Game.js not loaded"
                    );

                }


            }
        );



        /*
            UI初期状態
        */

        updateBasicUI();



    }
);



function updateBasicUI(){

    const score =
        document.getElementById(
            "score"
        );


    const height =
        document.getElementById(
            "height"
        );


    const cans =
        document.getElementById(
            "canCount"
        );



    if(score)
        score.textContent="0";


    if(height)
        height.textContent="0";


    if(cans)
        cans.textContent="0";


}