/*
    CanLift Ver0.5
    game.js
*/

const Game = {

    //=========================
// 仮想画面サイズ
//=========================
screenWidth:800,
screenHeight:700,

isMobile:false,

    canvas: null,
    ctx: null,

    screen: "title",

    running: false,

    score: 0,
    liftCount: 0,
    combo: 0,
maxCombo: 0,
lastComboVoice: 0,

    hp: 3,
    maxHp: 3,

    lastAddedCount:0,

    message: "",
    messageTimer: 0,
    messageScale: 1,
    lastTime: 0,
    deltaTime: 1,
    comboMessage: "",
comboTimer: 0,
comboScale: 1,
rewardColor:"#ffffff",
feverWatchDog:0,
diceResultTimer:0,
gameMode: "normal",
healCount:0,
healMax:3,
healUnlocked:false,
rankingSaved:false,



// 回復缶
healTimer:900,
//=========================
// FEVER
//=========================

feverGauge:0,
feverMax:15,

feverMode:false,

feverState:"normal",
// normal
// cutin
// dice
// fever

diceValue:0,

feverReward:0,

feverTimer:0,
feverFailed:false,

cutinTimer:0,

diceTimer:0,



    init(canvas){

        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        if(typeof Ranking !== "undefined"){

    Ranking.init();

}

        if(typeof UI !== "undefined"){

            UI.init();

        }

        Input.init(this);
        Renderer.draw(this);

        

    },



    start(){

        this.isMobile = window.innerWidth < 700;

if(this.isMobile){

    this.screenWidth = 800;
    this.screenHeight = 1200;

}else{

    this.screenWidth = 800;
    this.screenHeight = 700;

}

        this.meteorMode=false;

this.meteorHP=100;

this.meteorCount=0;

this.meteorReward=false;

this.rankingSaved = false;

        this.screen = "game";

    if(this.running){

        return;

    }
        console.log("Game Start");

            // 最大HPリセット
    this.maxHp = 3;

    this.hp = this.maxHp;

        this.running = true;

        this.score = 0;
        this.liftCount = 0;
        this.combo = 0;
this.maxCombo = 0;
this.lastComboVoice = 0;
this.comboMessage = "";
this.comboTimer = 0;
this.rewardColor = "#ffffff";
this.feverFailed = false;
this.diceResultTimer = 0;

        this.hp = this.maxHp;

        this.lastAddedCount = 0;

        this.message = "";
        this.messageTimer = 0;
        this.messageScale = 1;
        this.lastTime = performance.now();
        this.feverGauge = 0;

this.feverMode = false;

this.feverState = "normal";

this.diceValue = 0;

this.feverReward = 0;

this.feverTimer = 0;

this.cutinTimer = 0;

this.diceTimer = 0;

this.healCount = 0;
this.healUnlocked = false;
//this.healTimer = 900;
this.healTimer = this.isMobile ? 450 : 600;

        CanManager.create();

console.log("CAN COUNT:", CanManager.cans.length);

this.loop();

        
    },



    update(){
        

        if(this.feverMode){

    this.updateFever();

    return;

}

        const now = performance.now();

        this.deltaTime = (now - this.lastTime) / 12.666;

         this.lastTime = now;

        // 極端な遅延対策
         this.deltaTime = Math.min(this.deltaTime,2);

        if(!this.running) return;

        Timing.updateDifficulty(this.liftCount);

        CanManager.update(this.deltaTime);

        // 回復缶出現タイマー

// 金色回復缶（NORMALのみ）

// 金色回復缶
// 20 LIFT後から開始

if(!this.feverMode){

    if(
        this.liftCount >= 20
    ){

        this.healUnlocked = true;

    }


    if(this.healUnlocked){

        this.healTimer--;


        if(
            this.healTimer <= 0 &&
            this.healCount < this.healMax
        ){

            CanManager.spawnHealCan();

            this.healCount++;


            // 10〜20秒
            this.healTimer =
            600 + Math.random()*600;

        }

    }

}




if(
    this.liftCount >= this.lastAddedCount + 10
){

    CanManager.increaseTarget();

    this.lastAddedCount = this.liftCount;

}
        if(typeof Effects !== "undefined"){

            Effects.update();

        }

        if(this.messageTimer > 0){

            this.messageTimer--;

        }else{

            this.message = "";

        }
        if(this.comboTimer > 0){

    this.comboTimer--;

}else{

    this.comboMessage = "";

}

        if(typeof UI !== "undefined"){

            UI.setScore(this.score);
            UI.setHeight(this.liftCount);

        }

    },



    draw(){

        Renderer.draw(this);

    },
   
    addCombo(){

    this.combo++;

    if(this.combo > this.maxCombo){

        this.maxCombo = this.combo;

    }

    if(
    this.gameMode==="fever" &&
    !this.feverMode
){

    this.feverGauge++;

    if(this.feverGauge>=this.feverMax){

        this.startFever();

    }

}

},
resetCombo(){

    this.combo = 0;

},

    damage(){

        this.gameOverScore = this.score;
this.gameOverLift = this.liftCount;
this.gameOverCombo = this.maxCombo;

    this.hp--;

  if(this.hp <= 0){

     // 最終結果保存
    if(!this.rankingSaved){

    Ranking.add(
        this.gameOverScore,
        this.gameOverLift,
        this.gameOverCombo
    );

    this.rankingSaved=true;

}
   

        this.running = false;

        // 演出をリセット
    this.comboMessage = "";
    this.comboTimer = 0;


        this.message = "GAME OVER";
        this.maxHp = 3;
        this.messageScale = 1.3;
         this.messageTimer = 999;
 this.gameOverScore = this.score;
this.gameOverLift = this.liftCount;
this.gameOverCombo = this.maxCombo;

        this.draw();

setTimeout(()=>{

    Game.showResult();

},3000);
    


    }

},



    loop(){

        if(!this.running){

            this.draw();
            return;

        }

        this.update();

        this.draw();

        requestAnimationFrame(() => this.loop());

    },
  startFever(){

    this.feverWatchDog=0;
    this.feverGauge = 0;

this.feverFailed = false;

this.diceTimer = 90;

    this.feverMode = true;

    this.feverState = "cutin";

    this.cutinTimer = 50;

    this.feverGauge = 0;
    this.diceTimer=90;
this.diceResultTimer=0;

    // 現在の缶をpoolへ戻す
CanManager.cans.forEach(can=>{

    can.active=false;

    can.type="normal";

    CanManager.pool.push(can);

});
    CanManager.cans = [];
    Sound.startFever();

},
updateFever(){
      const now = performance.now();

    this.deltaTime =
        (now - this.lastTime) / 12.666;

    this.lastTime = now;

    this.deltaTime =
        Math.min(this.deltaTime,2);


    this.feverWatchDog++;
    if(this.feverWatchDog>900){

    console.warn(
        "FEVER WatchDog"
    );

     this.endFever();

    return;

}

    switch(this.feverState){

        case "cutin":

            this.cutinTimer--;

            if(this.cutinTimer<=0){

                this.feverState="dice";

                this.diceTimer=90;

            }

            break;

        case "dice":

        if(isNaN(this.diceTimer)){

    this.diceTimer = 90;

}

            this.diceTimer--;

            if(this.diceTimer < 0){

    this.diceTimer = 0;

}

            if(this.diceTimer > 20){

    this.diceValue =
        1 + Math.floor(Math.random()*6);

}

           if(this.diceTimer<=0){

    // 初回だけ結果待ち開始
    if(this.diceResultTimer <= 0){

        this.diceResultTimer = 90;

    }


    this.diceResultTimer--;


    // 結果表示中
    if(this.diceResultTimer > 0){

        return;

    }


    // 結果表示終了後に処理

    if(this.diceValue<=2){

        this.endFever();

    }else{

        this.feverReward = this.diceValue;

        this.feverTimer = 60*8;

        this.feverState = "fever";

        CanManager.spawnFever(
            this.diceValue
        );

    }

}
            break;

        case "fever":

    CanManager.update(this.deltaTime);

    this.feverTimer--;

    if(this.feverTimer<=0){

    if(this.feverFailed){

        this.failFever();

    }else{

        this.finishFever();

    }

}

break;
    }

},
finishFever(){
    //=========================
// SUCCESS演出
//=========================
this.feverWatchDog=0;

this.message = "SUCCESS!!";

this.messageScale = 2.2;

this.messageTimer = 90;

    switch(this.feverReward){

        case 3:
            

    this.hp = Math.min(
        this.hp + 1,
        this.maxHp
    );

    this.comboMessage = "HP +1";
this.comboTimer = 120;
this.rewardColor = "#00ff66";

    break;

        case 4:

    this.hp = Math.min(
        this.hp + 2,
        this.maxHp
    );

   this.comboMessage = "HP +2";
this.comboTimer = 120;
this.rewardColor = "#66ff00";

    break;

        case 5:

    this.hp = this.maxHp;

    this.comboMessage = "FULL RECOVERY!";
this.comboTimer = 140;
this.rewardColor = "#ffd700";

    this.comboTimer = 120;

    break;

    case 6:

    this.maxHp++;

    this.hp = this.maxHp;


    this.message = "LEGEND FEVER!!";

    this.messageScale = 3;

    this.messageTimer = 150;


    this.comboMessage = "MAX HP UP!!";

    this.comboTimer = 200;


    Effects.bigFever();


break;

    }

    this.endFever();

},
endFever(){

    // FEVER缶を全て回収
CanManager.cans.forEach(can => {

    can.active = false;
    can.type = "normal";
    CanManager.pool.push(can);

});

CanManager.cans = [];

 this.lastTime = performance.now();
    this.deltaTime = 1;

    this.feverWatchDog = 0;


    this.feverWatchDog = 0;

    this.feverMode = false;

    this.feverState = "normal";

    this.feverReward = 0;

    this.diceValue = 0;

    this.feverFailed = false;

    this.diceTimer = 0;
    this.cutinTimer = 0;
    this.feverTimer = 0;


    // 缶がない場合は復帰
    CanManager.cans = [];

CanManager.targetCount = 2;
CanManager.respawnTimer = 0;
CanManager.spawnStartCans();


    Sound.stopFever();

},
failFever(){

    this.comboMessage = "FEVER FAILED";
    this.comboTimer = 90;
    this.rewardColor = "#ff4444";

    this.endFever();


    if(this.hp<=0){

        this.running=false;

        this.message="GAME OVER";
        this.messageTimer=999;

        this.draw();

       

    }

},


returnTitle(){

    console.log("returnTitle start");


    this.running = false;
    this.screen = "title";


    document.getElementById("gameScreen").style.display="none";

    document.getElementById("titleScreen").style.display="flex";


    this.message="";
    this.comboMessage="";

   
       
},
showResult(){

    this.running=false;


    document.getElementById("gameScreen").style.display="none";

    const result =
    document.getElementById("resultScreen");


    result.style.display="flex";


    document.getElementById("resultScore").textContent =
    "SCORE : " + this.gameOverScore;


    document.getElementById("resultLift").textContent =
    "LIFT : " + this.gameOverLift;


    document.getElementById("resultCombo").textContent =
    "MAX COMBO : " + this.gameOverCombo;



    if(!this.rankingSaved){

        Ranking.add(
            this.gameOverScore,
            this.gameOverLift,
            this.gameOverCombo
        );

        this.rankingSaved=true;

    }


    Ranking.updateView();

}


};
