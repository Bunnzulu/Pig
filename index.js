console.log("Hello World");
let NumofDice = 0
let Playernum = 0
let Turnended = false
let Turn = 0
let Players = []

class Player{
    constructor(name){
        this.name = name;
        this.points = 0;
        this.bank = 0
    }

    addScore(score){
        this.points += score;
    }

    bank_points(){
        this.bank += this.points;
        this.points = 0;
    }
}
document.getElementById("Start").onclick = function () {
    NumofDice = document.getElementById("DiceNumber").value;
    Playernum = document.getElementById("PlayerNumber").value;
    if (NumofDice <= 10 && Playernum <= 5) {
        document.getElementById("Top").hidden = true;
        document.getElementById("GameMenu").hidden = false;
        for(let i = 0; i < Playernum; i++){
            Players.push(new Player("Player " + (i + 1)))
        }
        document.getElementById("Turn").textContent = Players[Turn].name + "'s Turn"
        document.getElementById("TurnScore").textContent = `Score: ${Players[Turn].points}`
        document.getElementById("ScoreBanked").textContent = `Banked Points: ${Players[Turn].bank}`
    } else {
        alert("You can only have a maximum of 10 dice and 5 players")
    }
}

document.getElementById("DiceRoll").onclick = function() {
    let dices = []
    let imgs = []
        for(let i = 0; i < NumofDice; i++){
            dices.push(Math.floor(Math.random() * 6) + 1)
            imgs.push(`<img src="images/${dices[i]}.png" alt="Dice: ${dices[i]}">`)
        }
        document.getElementById("DiceDisplay").innerHTML = imgs
        Players[Turn].addScore(dices.reduce((a, b) => a + b, 0))
        document.getElementById("TurnScore").textContent = `Score: ${Players[Turn].points}`
        document.getElementById("DiceScore").textContent = `Dices: ${dices.join(" , ")}`
        if (dices.includes(1)){
            Players[Turn].points = 0
            document.getElementById("TurnScore").textContent = `Score: ${Players[Turn].points}`
            document.getElementById("TurnStatus").textContent = "Turn Status: Ended"
            document.getElementById("DiceRoll").disabled = true
            document.getElementById("Bank Points").disabled = true
            setTimeout(() => {
                endTurn()
            }, 2000)
        }
    } 


function endTurn(){
    Turn = (Turn + 1) % Playernum
    document.getElementById("DiceRoll").disabled = false
    document.getElementById("Bank Points").disabled = false
    Players[Turn].points = 0
    document.getElementById("Turn").textContent = Players[Turn].name + "'s Turn"
    document.getElementById("TurnScore").textContent = `Score: ${Players[Turn].points}`
    document.getElementById("ScoreBanked").textContent = `Banked Points: ${Players[Turn].bank}`
    document.getElementById("DiceDisplay").innerHTML = ""
    document.getElementById("TurnStatus").textContent = "Turn Status: Ongoing"
    document.getElementById("DiceScore").textContent = "Dices:"
}

document.getElementById("Bank Points").onclick = function() {
    Players[Turn].bank_points()
    document.getElementById("TurnScore").textContent = `Score: ${Players[Turn].points}`
    document.getElementById("ScoreBanked").textContent = `Banked Points: ${Players[Turn].bank}`
    document.getElementById("DiceDisplay").innerHTML = ""
    if (Players[Turn].bank >= 100){
        alert(Players[Turn].name + " Wins!")
        for (let i = 0; i < Playernum; i++){
            if (i == Turn){
                alert(`${Players[i].name} Score: ${Players[i].bank} (Winner)`)

            }
            else{
                alert(`${Players[i].name} Score: ${Players[i].bank}`)
            }
        }
        location.reload()

    }
    else{
        endTurn()
    }
}