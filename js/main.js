const canvas = document.getElementById("gameCanvas");

Game.init(canvas);


const startButton =
document.getElementById("startButton");


startButton.addEventListener("click", async()=>{

    await Sound.init();

    Sound.play("start");

    Game.start();

});