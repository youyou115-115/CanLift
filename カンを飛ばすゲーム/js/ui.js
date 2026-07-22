/*
    CanLift Ver0.4
    UI System

    画面表示管理
*/


const UI = {



    elements:{},




    /*
        初期化
    */

    init(){


        this.elements.score =
            document.getElementById(
                "score"
            );


        this.elements.height =
            document.getElementById(
                "height"
            );


        this.elements.canCount =
            document.getElementById(
                "canCount"
            );



        console.log(
            "UI Ready"
        );


    },






    /*
        スコア更新
    */

    setScore(value){


        if(
            this.elements.score
        ){

            this.elements.score.textContent =
            Math.floor(value);

        }


    },







    /*
        高さ更新
    */

    setHeight(value){


        if(
            this.elements.height
        ){

            this.elements.height.textContent =
            Math.floor(value);

        }


    },








    /*
        缶数更新
    */

    setCanCount(value){


        if(
            this.elements.canCount
        ){

            this.elements.canCount.textContent =
            value;

        }


    }







};