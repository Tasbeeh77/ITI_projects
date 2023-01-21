//shared variables
let time = 60;
let score = 0;
let killed = 0;
let bombIsClicked = 0; //to remove bomb when it clicked and not let it continue moving
//create bird
const createBirds = (birdsArray) => {
    let interval = setInterval(() => {
        let bird = document.createElement("embed");
        bird.src = birdsArray[Math.floor(Math.random() * 3)];
        bird.classList.add("bird");
        bird.style.top = Math.floor(Math.random() * (window.innerHeight - 260)) + 'px';
        document.querySelector("body").append(bird);
        moveRight(bird, 0);
        if (time == 0) {
            clearInterval(interval);
        }
    }, 900);
}
//bird moveRight
const moveRight = (bird, left) => {
    let timerId = setInterval(() => {
        if (time > 0) {
            if (left < (window.innerWidth - 265)) {
                left += 10;
                bird.style.left = left + 'px';
            }
            else {
                setTimeout(() => {
                    if (document.querySelector("body").contains(bird)) {
                        document.querySelector("body").removeChild(bird);
                    }
                }, 100);
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
    let bomb = document.createElement("img");
    bomb.src = "../images/bomb.png";
    bomb.classList.add("bomb");
    bomb.style.left = Math.floor(Math.random() * (window.innerWidth - 110)) + 'px';
    document.querySelector("body").append(bomb);
    fallDown(bomb, 64);  //start moving down the bomb
    bomb.addEventListener("click", function () {
        bombIsClicked = 1; //stop bomb from moving down
        //pushing surrounding birds in an array to calculate their score then deleting them
        let surrounding = checkSurroundingBirds(); //1
        countScoreResult(surrounding); //2 
        surrounding.forEach((item) => {
            item.src = "../images/explosion.png";
            setTimeout(() => {
                document.querySelector("body").removeChild(item) //3
            }, 150);
        });
        //increasing score and killed birds number
        document.querySelector("h2[name=score]").innerHTML = `${score}`;
        killed += surrounding.length;
        document.querySelector("h2[name=kill]").innerHTML = `${killed}`;
    })
}
//bomb falldown
const fallDown = (bomb, top) => {
    let timerId = setInterval(() => {
        if (time > 0) {
            if (top < (window.innerHeight - 110) && bombIsClicked == 0) {
                top += 10;
                bomb.style.top = top + 'px';
            }
            else {
                setTimeout(() => {
                    document.querySelector("body").removeChild(bomb);
                }, 150);
                clearInterval(timerId);
                bombIsClicked = 0;
                setTimeout(() => {
                    createBomb();
                }, 1000);
            }
        }
        else {
            clearInterval(timerId);
            document.querySelector("body").removeChild(bomb);
        }
    }, 60);
}
//check surrounding birds
const checkSurroundingBirds = () => {
    let currentBomb = document.querySelector(".bomb");
    let surroundingBirds = new Array();
    document.querySelectorAll(".bird").forEach((item) => {
        if (((item.offsetLeft + item.offsetWidth) > (currentBomb.offsetLeft - 200) &&
            (item.offsetLeft) < (currentBomb.offsetLeft + 300))) {
            surroundingBirds.push(item);
        }
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
let countDown = (timeObject, result) => {
    let id = setInterval(() => {
        if (time > 0) {
            timeObject.innerText = `${--time}`;
        }
        else {
            clearInterval(id);
            sessionStorage.setItem("LastVisit", new Date().toLocaleString());
            sessionStorage.setItem("LastScore", score);
            document.querySelectorAll(".bird").forEach((item) => { document.querySelector("body").removeChild(item) });
            displayResult(result);
        }
    }, 1000);
}
//count score
const countScoreResult = (currentBirds) => {
    for (let i = 0; i < currentBirds.length; i++) {
        if (currentBirds[i].src.slice(29, 34) == 'white') {
            score += 5;
        }
        if (currentBirds[i].src.slice(29, 34) == 'black') {
            score += 10;
        }
        if (currentBirds[i].src.slice(29, 34) == 'blue.') {
            score -= 10;
        }
    }
}
//Last user info
const lastInfo = (LastVisit, LastScore) => {
    if (sessionStorage.getItem('LastVisit') && sessionStorage.getItem('LastScore')) {
        LastVisit.classList.remove("hidden");
        LastScore.classList.remove("hidden");
        LastVisit.innerText = `Your Last visit was : ${sessionStorage.getItem('LastVisit')}`;
        LastScore.innerText = `Your Last score was : ${sessionStorage.getItem('LastScore')}`;
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
    let Cancel = document.querySelector("button[name=cancel]");
    let result = document.querySelector("div[name=finalResult]");
    let timeObject = document.querySelector("h2[name=time]");
    const birdsArray = ['../images/white.gif', '../images/black.gif', '../images/blue.gif']
    //do
    nameObject.innerText = sessionStorage.getItem('name');
    //display Last visit and Last score on the popUp window
    lastInfo(LastVisit, LastScore);
    popUp.classList.add("openPop");
    //start Game
    startGame.onclick = () => {
        popUp.classList.remove("openPop");
        countDown(timeObject, result);
        setTimeout(() => {
            createBomb();
        }, 1000);
        createBirds(birdsArray);
    }
    //play again
    playAgain.onclick = () => {
        result.classList.add("hidden");
        location.reload();
    }
    //cancel
    Cancel.onclick = () => {
        result.classList.add("hidden");
        location.href = "../pages/index.html";
    }
})

