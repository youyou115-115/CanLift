/*
    CanLift Ver0.5
    input.js
*/

const Input = {

   healCan(){

    if(Game.hp < Game.maxHp){

        Game.hp++;

        Game.comboMessage = "RECOVER!!";

    }else{

        Game.comboMessage = "FULL HP!";

    }


    Game.comboTimer = 90;

    Game.rewardColor = "#ffd700";


    if(typeof Sound !== "undefined"){

        Sound.play("heal");

    }

},

    game: null,

    init(game){

       // if(!Game.running && Game.message==="GAME OVER"){

    //Game.returnTitle();

  //  return;

//}

        this.game = game;

        const canvas = game.canvas;

    
       
// PC
canvas.addEventListener("click", (e) => {

        this.tap(e);

    });


// スマホ
canvas.addEventListener("touchstart",(e)=>{

    e.preventDefault();

    this.tap(e);

},{
    passive:false
});

canvas.oncontextmenu = (e)=>{
    e.preventDefault();
};

    },



tap(e){
      //=========================
    // タイトル画面
    //=========================

    if(Game.screen==="title"){

        const rect =
    this.game.canvas.getBoundingClientRect();

const point = e;


const x =
    point.clientX - rect.left;

const y =
    point.clientY - rect.top;


        // NORMAL
        if(
            x>=250 && x<=550 &&
            y>=300 && y<=370
        ){

            Game.gameMode="normal";
            Game.screen="game";
            Game.start();
            return;

        }

        // FEVER
        if(
            x>=250 && x<=550 &&
            y>=410 && y<=480
        ){

            Game.gameMode="fever";
            Game.screen="game";
            Game.start();
            return;

        }

    }


    const game = this.game;

    if(!game.running) return;

    let hit = false;
    let comboCount = 0;

// 判定ラインにある缶だけ取得
const judgeCans =
    CanManager.getJudgeCans();

judgeCans.forEach(can => {


        const judge = Timing.check(can);

        switch(judge.result){

            case "PERFECT":

            comboCount++;
      
                hit = true;
                game.addCombo();
                switch(game.combo){

    case 10:
        Sound.combo(10);
        break;

    case 20:
        Sound.combo(20);
        break;

    case 30:
        Sound.combo(30);
        break;

    case 50:
        Sound.combo(50);
        break;

    case 100:
        Sound.combo(100);
        break;

}

                if(game.combo >= 2){

    game.comboMessage =
        game.combo + " COMBO!";

    game.comboTimer = 40;

    game.comboScale = 1.4;

}

if(can.type==="heal"){

    this.healCan();

    // 回復缶は消滅
    can.active = false;
    can.type = "normal";
}else{

    can.lift();

}


game.score += 30;
game.liftCount++;

                game.message = "PERFECT!";
                game.messageScale = 1.5;
                game.messageTimer = 60;

                if(typeof Sound !== "undefined"){
                    Sound.play("perfect");
                }

                if(typeof Effects !== "undefined"){
                    Effects.perfect(can.x, can.y);
                }

                if(

    game.combo % 10 === 0

    &&

    game.combo != game.lastComboVoice

){

    game.lastComboVoice = game.combo;

}

                break;


            case "GOOD":

                hit = true;
                comboCount++;
                game.addCombo();
                switch(game.combo){

    case 10:
        Sound.combo(10);
        break;

    case 20:
        Sound.combo(20);
        break;

    case 30:
        Sound.combo(30);
        break;

    case 50:
        Sound.combo(50);
        break;

    case 100:
        Sound.combo(100);
        break;

}

                if(game.combo >= 2){

    game.comboMessage =
        game.combo + " COMBO!";

    game.comboTimer = 40;

    game.comboScale = 1.4;

}

  if(can.type==="heal"){

    this.healCan();

    // 回復缶は消滅
    can.active = false;
    can.type = "normal";
    
}else{

    can.lift();

}


game.score += 10;
game.liftCount++;
                game.message = "GOOD!";
                game.messageScale = 1.2;
                game.messageTimer = 45;

                if(typeof Sound !== "undefined"){
                    Sound.play("good");
                }

                if(typeof Effects !== "undefined"){
                    Effects.create(can.x, can.y);
                }

                if(

    game.combo % 10 === 0

    &&

    game.combo != game.lastComboVoice

){

    game.lastComboVoice = game.combo;

}

                break;

        }

    });

    if(comboCount >= 2){

    switch(comboCount){

        case 2:
            game.score += 20;
            game.message = "DOUBLE!!";
            break;

        case 3:
            game.score += 50;
            game.message = "TRIPLE!!";
            break;

        case 4:
            game.score += 100;
            game.message = "MEGA!!";
            break;

        default:
            game.score += 200;
            game.message = "LEGEND!!";
            break;
    }

    game.messageScale = 1.8;
    game.messageTimer = 70;

    if(typeof Sound !== "undefined"){
        Sound.play("perfect");
    }

}
    if(!hit){

        game.message = "MISS";
        game.messageScale = 1.0;
        game.messageTimer = 30;

        if(typeof Sound !== "undefined"){
            Sound.play("miss");
        }
        game.resetCombo();
    }

    if(game.combo==10){


}


}


};