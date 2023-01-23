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
    let id = setInterval(() => {
        let bomb = document.createElement("img");
        bomb.src = "../images/bomb.png";
        bomb.classList.add("bomb");
        bomb.style.left = Math.floor(Math.random() * (window.innerWidth - bombWidth - 10)) + 'px';
        document.querySelector("body").append(bomb);
        fallDown(bomb, 64);
        bomb.addEventListener("click", function () {
            bombIsClicked = 1;
            //pushing surrounding birds in an array to calculate their score then deleting them
            let surrounding = checkSurroundingBirds(); //1
            countScoreResult(surrounding); //2 
            surrounding.forEach((bird) => {
                if (document.querySelector("body").contains(bird)) {
                    bird.src = "../images/explosion.png";
                    setTimeout(() => { document.querySelector("body").removeChild(bird) }, 150); //3
                }
            });
            //increasing score and killed birds number
            document.querySelector("h2[name=score]").innerText = `${score}`;
            killed += surrounding.length;
            document.querySelector("h2[name=kill]").innerText = `${killed}`;
        })
        if (time == 0) { clearInterval(id); }
    }, 3000);
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

        if (((bird.offsetLeft + bird.offsetWidth) > (currentBomb.offsetLeft - 250) &&
            (bird.offsetLeft) < (currentBomb.offsetLeft + 250)) &&
            ((bird.offsetTop + bird.offsetHeight) > (currentBomb.offsetTop - 250) &&
                (bird.offsetTop) < (currentBomb.offsetTop + 250))) { surroundingBirds.push(bird); }
    })
    return surroundingBirds;
}
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
//countDown Timer
const countDown = (timeObject, result) => {
    let id = setInterval(() => {
        if (time > 0) {
            timeObject.innerText = `${--time}`;
        }
        else {
            localStorage.setItem("LastVisit", new Date().toLocaleString());
            localStorage.setItem("LastScore", score);
            document.querySelectorAll(".bird").forEach((bird) => { document.querySelector("body").removeChild(bird) });
            clearInterval(id);
            displayResult(result);
        }
    }, 1000);
}
//count score
const countScoreResult = (currentBirds) => {
    for (let i = 0; i < currentBirds.length; i++) {
        let birdColor = currentBirds[i].src.slice(29, 34);
        if (birdColor == 'white') {
            score += 5;
        }
        if (birdColor == 'black') {
            score += 10;
        }
        if (birdColor == 'blue.') {
            score -= 10;
        }
    }
}
//Last user info
const lastInfo = (LastVisit, LastScore) => {
    if (localStorage.getItem('LastVisit') && localStorage.getItem('LastScore')) {
        LastVisit.classList.remove("hidden");
        LastScore.classList.remove("hidden");
        LastVisit.innerText = `Your Last visit was : ${localStorage.getItem('LastVisit')}`;
        LastScore.innerText = `Your Last score was : ${localStorage.getItem('LastScore')}`;
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
    const birdsSrc = ['../images/white.gif', '../images/black.gif', '../images/blue.gif']
    //do
    nameObject.innerText = localStorage.getItem('name');
    //display Last visit and Last score on the popUp window
    lastInfo(LastVisit, LastScore);
    popUp.classList.add("openPop");
    //start Game Button action
    startGame.onclick = () => {
        popUp.classList.remove("openPop");
        countDown(timeObject, result);
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
})

