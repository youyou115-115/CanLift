startButton.addEventListener("click", async () => {

    await Sound.init();

    if(Sound.context.state === "suspended"){

        await Sound.context.resume();

    }

    Game.start();

});