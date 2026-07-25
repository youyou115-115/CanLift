/*
    CanLift Ver0.8
    Simple Sound System
*/

const Sound = {

    initialized:false,

    sounds:{},


    async init(){

        if(this.initialized) return;

        this.initialized = true;


        this.sounds.perfect =
            new Audio("sounds/perfect.mp3");

        this.sounds.good =
            new Audio("sounds/good.mp3");

        this.sounds.miss =
            new Audio("sounds/miss.mp3");

        this.sounds.start =
            new Audio("sounds/start.mp3");


        console.log("Sound Ready");

    },


    play(name){

        const sound = this.sounds[name];

        if(!sound) return;


        sound.currentTime = 0;

        sound.play()
        .catch(e=>{
            console.log("Play Error:",e);
        });

    }

};