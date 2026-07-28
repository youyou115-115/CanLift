/*
    CanLift Ver0.5
    game.js
*/

const Game = {

    canvas: null,
    ctx: null,

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

        if(typeof UI !== "undefined"){

            UI.init();

        }

        Input.init(this);
        Renderer.draw(this);

        

    },



    start(){

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

    if(!this.feverMode){

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

    this.hp--;

    if(this.hp <= 0){

        this.running = false;

        // 演出をリセット
    this.comboMessage = "";
    this.comboTimer = 0;


        this.message = "GAME OVER";
        this.maxHp = 3;
        this.messageScale = 1.3;
         this.messageTimer = 999;

        this.draw();


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

    CanManager.pool.push(can);

});
    CanManager.cans = [];
    Sound.startFever();

},
updateFever(){
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
    CanManager.pool.push(can);

});

CanManager.cans = [];

CanManager.targetCount = 2;

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
CanManager.fill();


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


};
