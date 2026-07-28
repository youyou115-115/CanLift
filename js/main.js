const canvas =
document.getElementById("gameCanvas");

function resizeCanvas(){

    const baseWidth = 800;
    const baseHeight = 700;

    if(window.innerWidth < 900){

        // スマホ
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

    }else{

        // PC
        canvas.width = baseWidth;
        canvas.height = baseHeight;

    }

}

resizeCanvas();

window.addEventListener(
    "resize",
    resizeCanvas
);

Game.init(canvas);


// モードボタン
const normalButton =
document.getElementById("normalButton");

const feverButton =
document.getElementById("feverButton");

const startButton =
document.getElementById("startButton");


// 初期値
Game.gameMode = "normal";


// NORMAL
normalButton.addEventListener("click",()=>{

    Game.gameMode = "normal";

    normalButton.classList.add("selected");
    feverButton.classList.remove("selected");

});


// FEVER
feverButton.addEventListener("click",()=>{

    Game.gameMode = "fever";

    feverButton.classList.add("selected");
    normalButton.classList.remove("selected");

});


// START
startButton.addEventListener("click", async()=>{

    await Sound.init();

    Sound.play("start");

    document.getElementById("titleScreen").style.display = "none";

    // blockではなくflexに変更
    document.getElementById("gameScreen").style.display = "flex";

    Game.screen = "game";

    Game.start();

});