const canvas =
document.getElementById("gameCanvas");

function resizeCanvas(){

    const mobile =
        window.innerWidth < 700;

    const baseWidth = 800;

    const baseHeight =
        mobile
        ? 1200
        : 700;

    const scale = Math.min(

        window.innerWidth/baseWidth,

        window.innerHeight/baseHeight

    );

    canvas.style.width =
        (baseWidth*scale)+"px";

    canvas.style.height =
        (baseHeight*scale)+"px";

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

    if(window.innerWidth<700){

    canvas.width=800;
    canvas.height=1200;

}else{

    canvas.width=800;
    canvas.height=700;

}

    Game.screen = "game";
    Game.start();

});