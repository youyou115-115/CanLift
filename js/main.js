/*
    CanLift Ver0.5
    main.js
*/

window.addEventListener("load", () => {

    const canvas = document.getElementById("gameCanvas");

    Game.init(canvas);

    const startButton = document.getElementById("startButton");

    if(startButton){

        startButton.addEventListener("click", () => {

            Sound.init();
            Game.start();

        });

    }

});