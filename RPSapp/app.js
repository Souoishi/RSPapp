// 1: create function that returns random number n
// 2: create an array  that includes 5 types of fortune 
// 3: set up alart that brings in array[n]



// UI CONTROLLER、DOMSTRINGS関係は必ず一番最初に！、じゃないとundefinedの状態になる。
//UI CONTROLLER
var UIController = (function (){
    var DOMids = {
        //upper_wrapper
		yourIcon: document.querySelector('#your_icon'),
        pcsIcon: document.querySelector('#pcs_icon'),

        //score_bord
        yourScore: document.querySelector('#your_score'),
        tie: document.querySelector('#tie'),
        pcsScore: document.querySelector('#pcs_score'),

        //round number
        rounds: document.querySelector('#rounds'),

        //play_btns
        play_btn: document.querySelector('#play_btn'),
        reset_btn: document.querySelector('#reset_btn'),

        //under_wrapper
        rock: document.querySelector('#rock'),
        scissors: document.querySelector('#scissors'),
        paper: document.querySelector('#paper')		

    };

    var DOMclass = {
        //upper_wrapper
		rock: 'fa-hand-rock',
        scissors: 'fa-hand-scissors',
        paper: 'fa-hand-paper',
    };

    return {
        getDOMids: function () {
            return DOMids
        },

        getDOMclasses: function () {
            return DOMclass
        },

    }


})()


var Rondom = (function (Uti) {
    
    var DOMID = Uti.getDOMids()
    var DOMCLASS = Uti.getDOMclasses()


    return {
// adding comment for each fucntion
        pcsChoice: function (Classes) {
            const num = Math.floor(Math.random()*3)
            const arr = [Classes.rock, Classes.scissors, Classes.paper]
    
            return arr[num]
        },
        returnChoice: function (choice) {
            DOMID.yourIcon.className = '';
            DOMID.yourIcon.classList.add("far",choice)
            console.log(choice)
        },
        returnPc: function (pchoice) {
            DOMID.pcsIcon.className = '';
            DOMID.pcsIcon.classList.add("far",pchoice)
            console.log(pchoice + ':pc' )
        },

        winnerChecker:function (hand,pchand) {

            if (hand === pchand) {
                winner = 'tie'
            } else if (pchand === DOMCLASS.rock && hand === DOMCLASS.scissors ||
                       pchand === DOMCLASS.paper && hand === DOMCLASS.rock || 
                       pchand === DOMCLASS.scissors && hand === DOMCLASS.paper){
                winner = 'pc'
            } else {
                winner = 'player'
            }
            return winner
        }

    }

})(UIController)


// * use const & let AHAI

// data manupulations
var DataBase = (function (UI){
    
    
    var data = {
        //upper_wrapper
        rounds: 1,
        yourScore: 0,
        pcsScore: 0,
        tie: 0,

    };
    
    
    return {
        // the point is, need to disclosure THE DATABASE OBJECT = return to be GLOBAL VARIABLE
        // super important, if you need to keep the record of the data, you need to set all functions HERE and expose from here
        init: function() {
            data.rounds = 1
            data.yourScore = 0
            data.pcsScore = 0
            data.tie = 0

			return data
        },
        addingScore: function (win) {
            data.rounds += 1
            if (win === 'player') {
                data.yourScore += 1
            }else if (win === 'pc'){
                data.pcsScore += 1
            }else {
                data.tie += 1
            
            }
            return data
        }
    }


})(UIController)



var controller = (function (UICntl,DB,Ron) {
    var winner, obj;
    var DOMID = UICntl.getDOMids ()
    var DOMCLASS = UICntl.getDOMclasses()

    var updateDB = function (win) {
        //var data = DB.getdata()
        obj = DB.addingScore(win)
        if (win === 'player') {
            DOMID.yourScore.textContent = obj.yourScore
            console.log(DOMID.yourScore.textContent)
        } else if (winner === 'pc'){
            DOMID.pcsScore.textContent = obj.pcsScore
            console.log(DOMID.pcsScore.textContent)
        } else {
            DOMID.tie.textContent = obj.tie
            console.log(DOMID.tie.textContent)
        } 
        DOMID.rounds.textContent = `Round ${obj.rounds}`
    }

    var initData = function (object) {
        DOMID.yourScore.textContent = object.yourScore
        DOMID.pcsScore.textContent = object.pcsScore
        DOMID.tie.textContent = object.tie
        DOMID.rounds.textContent = `Round ${object.rounds}`
    }

    

    var setupEvents = function () {
        
        var hand, pchand;
        // 1: grab user's choice
        // 2: implement rolldice function
        DOMID.rock.onclick = function () {
            hand = DOMCLASS.rock
            pchand = Ron.pcsChoice(DOMCLASS)
            
        }
        DOMID.scissors.onclick = function () {
            hand = DOMCLASS.scissors
            pchand = Ron.pcsChoice(DOMCLASS)
            
        }
        DOMID.paper.onclick = function () {
            hand = DOMCLASS.paper
            pchand = Ron.pcsChoice(DOMCLASS)
            
        }

        
       
        
        
        
        // 3: get the click from play_btn
        // 4: return the result to proper icon of RPS
        // 5: replace user's icon with an icon with the user's choice
        DOMID.play_btn.onclick = function () {
            Ron.returnChoice(hand)
            Ron.returnPc(pchand)
            winner = Ron.winnerChecker(hand,pchand)
            //data = DB.getdata()
            updateDB(winner)

        }
        
        DOMID.reset_btn.onclick = function () {
            obj = DB.init()
            initData(obj)
            DOMID.yourIcon.className = '';
            DOMID.pcsIcon.className = '';
            DOMID.pcsIcon.classList.add('fas', 'fa-user');
            DOMID.yourIcon.classList.add('fas', 'fa-user');

        }

        // 5: replace pc's icon with the icon 


    }

    return {
        start: setupEvents()
    }

})(UIController,DataBase,Rondom)
