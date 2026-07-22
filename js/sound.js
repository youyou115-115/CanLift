/*
    CanLift Ver0.7
    Sound System
*/

const Sound = {

    audio:{},

    init(){

        this.audio.perfect = new Audio("sounds/perfect.mp3");
        this.audio.good = new Audio("sounds/good.mp3");
        this.audio.miss = new Audio("sounds/miss.mp3");
        this.audio.start = new Audio("sounds/start.mp3");

        for(const key in this.audio){

            this.audio[key].volume = 0.5;

            this.audio[key].preload = "auto";

        }

    },

    play(name){

        const sound = this.audio[name];

        if(!sound) return;

        sound.currentTime = 0;

        sound.play().catch(()=>{});

    }

};