const canvas =
document.getElementById("gameCanvas");

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

    // タイトル画面を隠す
    document.getElementById("titleScreen").style.display = "none";

    // ゲーム画面を表示
    document.getElementById("gameScreen").style.display = "block";

    Game.screen = "game";

    Game.start();

});