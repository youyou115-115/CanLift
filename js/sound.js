/*
    CanLift Ver3.0
    Addiction Sound Engine
*/

const Sound={

context:null,
initialized:false,

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



//--------------------
// GOOD
//--------------------

good(){

    const p=
        260+
        Math.random()*25;

    this.tone(
        p,
        0.045,
        0.16,
        "triangle"
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

},



//--------------------
// MISS
//--------------------

miss(){

    this.comboStep=0;

    this.tone(
        130,
        0.11,
        0.15,
        "sawtooth"
    );

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

}

};