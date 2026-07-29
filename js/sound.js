/*
    CanLift Ver3.0
    Addiction Sound Engine
*/

const Sound={

context:null,
initialized:false,
feverOsc:[],
feverPlaying:false,

comboStep:0,

async init(){


    if(this.initialized)return;

    this.context=new(
        window.AudioContext||
        window.webkitAudioContext
    )();

    this.initialized=true;

    console.log("CanLift Sound Ready");
    


},

play(type){

    if(!this.context)return;

    if(this.context.state==="suspended"){

        this.context.resume();

    }

    switch(type){

    case"good":
        this.good();
        break;

    case"perfect":
        this.perfect();
        break;

    case"miss":
        this.miss();
        break;

    case"start":
        this.start();
        break;

    case"heal":
        this.heal();
        break;

}

},


tone(freq,time,vol,type="triangle"){

    const osc=this.context.createOscillator();

    const gain=this.context.createGain();

    osc.type=type;

    osc.frequency.value=freq;

    gain.gain.setValueAtTime(
        vol,
        this.context.currentTime
    );

    gain.gain.exponentialRampToValueAtTime(

        0.001,

        this.context.currentTime+time

    );

    osc.connect(gain);

    gain.connect(this.context.destination);

    osc.start();

    osc.stop(
        this.context.currentTime+time
    );

},

note(freq,length,delay,vol=0.2,type="triangle"){

    setTimeout(()=>{

        this.tone(
            freq,
            length,
            vol,
            type
        );

    },delay);

},



//--------------------
// GOOD
//--------------------

good(){

    const p=450+Math.random()*50;

    this.tone(
        p,
        0.045,
        0.16,
        "triangle"
    );

    this.note(
        p*1.5,
        0.025,
        15,
        0.08,
        "sine"
    );

},



//--------------------
// PERFECT
//--------------------

perfect(){

    const notes=[
        523,
        659,
        784,
        1046
    ];

    const base=
        notes[
            this.comboStep%
            notes.length
        ];

    this.comboStep++;

    // ドン
    this.tone(
        base*0.48,
        0.07,
        0.22,
        "triangle"
    );

    // カン
    setTimeout(()=>{

        this.tone(
            base+
            Math.random()*15,
            0.08,
            0.18,
            "square"
        );

    },12);

    // キラッ
    setTimeout(()=>{

        this.tone(
            base*2,
            0.03,
            0.06,
            "sine"
        );

    },24);

    if(this.comboStep>=10){

    this.note(
        base*2.5,
        0.03,
        45,
        0.05,
        "sine"
    );

}

if(this.comboStep>=20){

    this.note(
        base*3,
        0.03,
        70,
        0.04,
        "triangle"
    );

}

if(this.comboStep>=50){

    this.note(
        base*4,
        0.05,
        90,
        0.05,
        "square"
    );

}

},



//--------------------
// MISS
//--------------------

miss(){

    this.comboStep=0;

    this.tone(
        150,
        0.08,
        0.12,
        "sawtooth"
    );

    this.note(
        100,
        0.10,
        25,
        0.08,
        "triangle"
    );

},

//--------------------
// HEAL
//--------------------

heal(){

    // 回復チャージ音
    this.tone(
        523,
        0.08,
        0.18,
        "sine"
    );


    setTimeout(()=>{

        this.tone(
            659,
            0.08,
            0.18,
            "sine"
        );

    },60);


    setTimeout(()=>{

        this.tone(
            1046,
            0.15,
            0.22,
            "triangle"
        );

    },120);


},



//--------------------
// START
//--------------------

start(){

    this.comboStep=0;

    this.tone(
        300,
        0.05,
        0.18
    );

    setTimeout(()=>{

        this.tone(
            450,
            0.05,
            0.18
        );

    },55);

    setTimeout(()=>{

        this.tone(
            700,
            0.08,
            0.18
        );

    },110);

},
//--------------------
// COMBO JINGLE
//--------------------

combo(level){

    switch(level){

        case 10:

            this.note(523,0.07,0,0.18);
            this.note(659,0.07,60,0.18);
            this.note(784,0.12,120,0.22);

            break;

        case 20:

            this.note(523,0.06,0,0.18);
            this.note(659,0.06,50,0.18);
            this.note(784,0.06,100,0.20);
            this.note(1046,0.12,150,0.22);

            break;

        case 30:

            this.note(392,0.07,0,0.20);
            this.note(523,0.07,55,0.20);
            this.note(659,0.07,110,0.20);
            this.note(1046,0.15,170,0.24);

            break;

        case 50:

            this.note(392,0.06,0,0.20);
            this.note(523,0.06,45,0.20);
            this.note(659,0.06,90,0.20);
            this.note(784,0.06,135,0.22);
            this.note(1046,0.18,180,0.28);

            break;

        case 100:

            this.note(262,0.10,0,0.25,"sawtooth");
            this.note(523,0.08,70,0.22);
            this.note(784,0.08,130,0.22);
            this.note(1046,0.08,190,0.24);
            this.note(1568,0.25,250,0.30,"square");

            break;

    }

},
startFever(){

    if(this.feverPlaying) return;

    this.feverPlaying = true;

    const notes=[
        523,
        659,
        784,
        1046
    ];

    let beat=0;

    this.feverLoop=setInterval(()=>{

        if(!this.feverPlaying){

            clearInterval(this.feverLoop);
            return;

        }

        const note=
            notes[
                beat%notes.length
            ];

        this.tone(
            note,
            0.09,
            0.10,
            "square"
        );

        setTimeout(()=>{

            this.tone(
                note*2,
                0.04,
                0.05,
                "triangle"
            );

        },60);

        beat++;

    },220);

},
stopFever(){

    this.feverPlaying=false;

},

};