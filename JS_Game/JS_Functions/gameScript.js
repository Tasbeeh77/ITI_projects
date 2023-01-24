import { setUsersData } from "./functions.js";
//shared variables
let time = 60;
let score = 0;
let killed = 0;
let bombIsClicked = 0; //to remove bomb when it's clicked and not let it continue moving

//create bird
const createBirds = (birdsSrc) => {
    const birdHeight = 250;
    let interval = setInterval(() => {
        let bird = document.createElement("embed");
        bird.src = birdsSrc[Math.floor(Math.random() * 3)];
        bird.classList.add("bird");
        bird.style.top = Math.floor(Math.random() * (window.innerHeight - birdHeight - 10)) + 'px';
        document.querySelector("body").append(bird);
        moveRight(bird, 0);
        if (time == 0) { clearInterval(interval); }
    }, 900);
}
//bird moveRight
const moveRight = (bird, left) => {
    const birdWidth = 250;
    let timerId = setInterval(() => {
        if (time > 0) {
            if (left < (window.innerWidth - birdWidth - 15)) {
                left += 10;
                bird.style.left = left + 'px';
            }
            else {
                if (document.querySelector("body").contains(bird)) { document.querySelector("body").removeChild(bird); }
                clearInterval(timerId);
            }
        }
        else {
            clearInterval(timerId);
        }
    }, 30);
}
//create Bomb
const createBomb = () => {
    const bombWidth = 120;
    let bomb = document.createElement("img");
    bomb.src = "../images/bomb.png";
    bomb.classList.add("bomb");
    bomb.style.left = Math.floor(Math.random() * (window.innerWidth - bombWidth - 10)) + 'px';
    document.querySelector("body").append(bomb);
    fallDown(bomb, 64);
    bomb.addEventListener("click", function () {
        bombIsClicked = 1;
        bomb.src = "../images/explosion.png";
        //pushing surrounding birds in an array to calculate their score then deleting them
        let surrounding = checkSurroundingBirds(); //1
        countScoreResult(surrounding); //2 
        surrounding.forEach((bird) => {
            if (document.querySelector("body").contains(bird)) {
                bird.classList.add("fadeOut");
                setTimeout(() => { document.querySelector("body").removeChild(bird) }, 350); //3
            }
        });
        //increasing score and killed birds number
        document.querySelector("h2[name=score]").innerText = `${score}`;
        killed += surrounding.length;
        document.querySelector("h2[name=kill]").innerText = `${killed}`;
    })
}
//bomb falldown
const fallDown = (bomb, top) => {
    const bombHeight = 120;
    let timerId = setInterval(() => {
        if (time > 0) {
            if (top < (window.innerHeight - bombHeight - 10) && bombIsClicked == 0) {
                top += 10;
                bomb.style.top = top + 'px';
            }
            else {
                document.querySelector("body").removeChild(bomb);
                clearInterval(timerId);
                bombIsClicked = 0;
                createBomb();
            }
        }
        else {
            clearInterval(timerId);
            document.querySelector("body").removeChild(bomb);
        }
    }, 90);
}
//check surrounding birds
const checkSurroundingBirds = () => {
    let currentBomb = document.querySelector(".bomb");
    let surroundingBirds = new Array();
    document.querySelectorAll(".bird").forEach((bird) => {

        if (((bird.offsetLeft + bird.offsetWidth) > (currentBomb.offsetLeft - 200) &&
            (bird.offsetLeft) < (currentBomb.offsetLeft + 200)) &&
            ((bird.offsetTop + bird.offsetHeight) > (currentBomb.offsetTop - 200) &&
                (bird.offsetTop) < (currentBomb.offsetTop + 200))) { surroundingBirds.push(bird); }
    })
    return surroundingBirds;
}
//count score
const countScoreResult = (currentBirds) => {
    for (let i = 0; i < currentBirds.length; i++) {
        let birdColor = currentBirds[i].src.split('/').pop();
        if (birdColor == 'white.gif') {
            score += 5;
        }
        if (birdColor == 'black.gif') {
            score += 10;
        }
        if (birdColor == 'blue.gif') {
            score -= 10;
        }
    }
}
//countDown Timer
const countDown = (timeObject, result, userName) => {
    let id = setInterval(() => {
        if (time > 0) {
            timeObject.innerText = `0:${--time}`;
        }
        else {
            setUsersData(userName, score, new Date().toLocaleString()); //storing user data to localStorage
            document.querySelectorAll(".bird").forEach((bird) => { document.querySelector("body").removeChild(bird) });
            clearInterval(id);
            displayResult(result);
        }
    }, 1000);
//display result
const displayResult = result => {
        if (score > 50) {
            document.querySelector("div h1[name=result]").innerText = "You Won!";
            document.querySelector("div img[name=resultImg]").src = "../images/win.png";
            result.classList.remove("hidden");
        }
        else {
            document.querySelector("div h1[name=result]").innerText = "You Lose!";
            document.querySelector("div img[name=resultImg]").src = "../images/lose.png";
            result.classList.remove("hidden");
        }
    }
}
//Last user info
const lastInfo = (LastVisit, LastScore, userName) => {
    if (localStorage.getItem(userName)) {
        LastVisit.classList.remove("hidden");
        LastScore.classList.remove("hidden");
        LastVisit.innerText = `Your Last visit was : ${JSON.parse(localStorage.getItem(userName)).lastVisit}`;
        LastScore.innerText = `Your Last score was : ${JSON.parse(localStorage.getItem(userName)).lastScore}`;
    }
    else {
        LastVisit.classList.add("hidden");
        LastScore.classList.add("hidden");
    }
}
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
    let userName = document.location.href.split('=')[1];
    //do
    nameObject.innerText = `${userName}`;
    //display Last visit and Last score on the popUp window
    name.innerText = `${userName}, We hope you enjoy our game`
    lastInfo(LastVisit, LastScore, userName);
    popUp.classList.add("openPop");
    //start Game Button action
    startGame.onclick = () => {
        popUp.classList.remove("openPop");
        countDown(timeObject, result, userName);
        createBomb();
        createBirds(birdsSrc);
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

