import { setUsersData } from "./CommonFunctions.js";
//shared variables
let time = 60;
let score = 0;
let killed = 0;
let bombIsClicked = 0; //to remove bomb when it's clicked and not let it continue moving
//create bird
export const createBirds = (birdsSrc) => {
    const birdHeight = 210;
    let interval = setInterval(() => {
        let bird = document.createElement("embed");
        bird.src = birdsSrc[Math.floor(Math.random() * 3)];
        bird.classList.add("bird");
        bird.style.top = Math.floor(Math.random() * (window.innerHeight - birdHeight - 10)) + 'px';
        document.querySelector("body").append(bird);
        moveRight(bird, 0);
        bird.addEventListener("click", function () {
            bird.classList.add("fadeOut");
            countScoreResult(new Array(bird));
            scoreKilled(bird);
        });
        if (time == 0) { clearInterval(interval); }
    }, 800);
}
//bird moveRight
const moveRight = (bird, left) => {
    const birdWidth = 210;
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
export const createBomb = () => {
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
        let surrounding = checkSurroundingBirds();
        countScoreResult(surrounding);
        surrounding.forEach((bird) => {
            bird.classList.add("fadeOut");
            scoreKilled(bird);
        });
    })
}
//bomb falldown
const fallDown = (bomb, top) => {
    const bombHeight = 120;
    let timerId = setInterval(() => {
        if (time > 0) {
            if (top < (window.innerHeight - bombHeight - 10) && bombIsClicked == 0) {
                top += 9;
                bomb.style.top = top + 'px';
            }
            else {
                document.querySelector("body").removeChild(bomb);
                clearInterval(timerId);
                bombIsClicked = 0;
                setTimeout(() => { createBomb(); }, 3000);
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
//display score and killed birds number 
const scoreKilled = (bird) => {
    if (document.querySelector("body").contains(bird)) {
        setTimeout(() => { document.querySelector("body").removeChild(bird) }, 350);
    }
    document.querySelector("h2[name=score]").innerText = `${score}`;
    document.querySelector("h2[name=kill]").innerText = `${++killed}`;
}
//countDown Timer
export const countDown = (timeObject, result, userName) => {
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
}
//Last user info
export const lastInfo = (LastVisit, LastScore, userName) => {
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
//display result
const displayResult = result => {
    if (score > 50) {
        document.querySelector("div h1[name=result]").innerText = "You Won!";
        document.querySelector("div h1[name=score]").innerText = `Your final score is : ${score}`;
        document.querySelector("div img[name=resultImg]").src = "../images/win.png";
        result.classList.remove("hidden");
    }
    else {
        document.querySelector("div h1[name=score]").innerText = `Your final score is : ${score}`;
        result.classList.remove("hidden");
    }
}


