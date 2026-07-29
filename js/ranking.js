/*
    CanLift Ver0.1
    ranking.js
*/

const Ranking = {

    key: "canliftRanking",

    list: [],

    init(){

    try{

        const data =
            localStorage.getItem(this.key);

        if(data){

            this.list = JSON.parse(data);

        }else{

            this.list=[];

        }

    }catch(e){

        console.log("Ranking Load Error",e);

        this.list=[];

    }

    this.updateView();

},

    save(){

        localStorage.setItem(
            this.key,
            JSON.stringify(this.list)
        );

    },

    add(score,lift,maxCombo){

        this.list.push({

            score:score,
            lift:lift,
            combo:maxCombo

        });

        this.list.sort((a,b)=>{

            return b.score-a.score;

        });

        this.list=this.list.slice(0,3);

        this.save();
        this.updateView();

    },

    updateView(){

    const list =
        document.getElementById("rankingList");

    if(!list) return;

    list.innerHTML = "";

    this.list.slice(0,3).forEach((r,i)=>{

    const li =
        document.createElement("li");

    if(i===0){

        li.classList.add("firstRank");

    }

    li.textContent =
        `${r.score} pt　${r.lift} LIFT　${r.combo} COMBO`;

    list.appendChild(li);

});

}
};
