import * as game from "./gameFunctions.js";
//page Loading
window.addEventListener("load", function () {
    //selectors
    let nameObject = document.querySelector("h2[name=name]");
    let popUp = document.querySelector(".welcome");
    let startGame = document.querySelector("button[name=start]");
    let LastScore = document.querySelector("h3[name=lastScore]");
    let LastVisit = document.querySelector("h3[name=visit]");
    let playAgain = document.querySelector("button[name=playAgain]");
    let cancel = document.querySelector("button[name=cancel]");
    let result = document.querySelector("div[name=finalResult]");
    let timeObject = document.querySelector("h2[name=time]");
    let name = document.querySelector("#name");
    const birdsSrc = ['../images/white.gif', '../images/black.gif', '../images/blue.gif']
    let userName = document.location.href.split('=')[1].split('%20').join(" "); //extract name from page url
    //do
    nameObject.innerText = `${userName}`;
    //display Last visit and Last score on the popUp window
    name.innerText = `${userName}, We hope you enjoy our game`
    game.lastInfo(LastVisit, LastScore, userName);
    popUp.classList.add("openPop");
    //start Game Button action
    startGame.onclick = () => {
        popUp.classList.remove("openPop");
        game.countDown(timeObject, result, userName);
        game.createBomb();
        game.createBirds(birdsSrc);
    }
    //play again button
    playAgain.onclick = () => {
        result.classList.add("hidden");
        location.reload();
    }
    //cancel button
    cancel.onclick = () => {
        result.classList.add("hidden");
        location.href = "../pages/index.html";
    }
})//load