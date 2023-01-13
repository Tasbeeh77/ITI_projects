//Array of birds
const birdsArray = [
    {
        name: 'white',
        gif: '../images/white.gif'
    },
    {
        name: 'black',
        gif: '../images/black.gif'
    },
    {
        name: 'blue',
        gif: '../images/blue.gif'
    }
]
let currentBirds = []
let i = 0
const birdSize = 250
let time = 60
let score = 0
let killed = 0
let isClicked = 0;

//create bird
const createBirds = () => {
    
    let timerId;
    let bird = document.createElement("embed")
    let index = Math.floor(Math.random() * 3)
    bird.src = birdsArray[index].gif
    bird.classList.add("bird")
    currentBirds.push(birdsArray[index].name)
    console.log(currentBirds)
    bird.style.top = Math.floor(Math.random() * (window.innerHeight - birdSize)) + 'px'
    document.querySelector("body").append(bird)
    moveRight(bird, 0, i)
    i++
}

//create Bomb
const createBomb = () => {
    let bomb = document.createElement("img")
    bomb.src = "../images/bomb.png"
    bomb.classList.add("bomb")
    bomb.style.left = Math.floor(Math.random() * (window.innerWidth - bomb.width)) + 'px'
    document.querySelector("body").append(bomb)
    fallDown(bomb, 64)
    bomb.addEventListener("click", function () {
        bomb.src = "../images/explosion.png"
        countScoreResult()
        document.querySelector("h2[name=score]").innerHTML = `${score}`
        killed += currentBirds.length
        document.querySelector("h2[name=kill]").innerHTML = `${killed}`
        console.log("deleted");
        currentBirds = []
        isClicked = 1;
    })
}

//bird moveRight
const moveRight = (bird, left, index) => {
    let timerId = setInterval(() => {
        if (time > 0) {
            if (left < (window.innerWidth - birdSize - 15) && isClicked == 0) {
                left += 15
                bird.style.left = left + 'px'
            }
            else {
                setTimeout(() => {
                    document.querySelector("body").removeChild(bird)
                    currentBirds.splice(index - 1, 1)
                    i--
                }, 50);
                clearInterval(timerId)
                setTimeout(() => {
                    isClicked = 0
                    createBirds()
                }, 1000);
            }
        }
        else {
            clearInterval(timerId)
        }
    }, 30);
}

//bomb falldown
const fallDown = (bomb, top) => {
    let timerId = setInterval(() => {
        if (time > 0) {
            if (top < (window.innerHeight - bomb.height - 10) && isClicked == 0) {
                top += 10
                bomb.style.top = top + 'px'
            }
            else {
                setTimeout(() => {
                    document.querySelector("body").removeChild(bomb)
                }, 50);
                clearInterval(timerId)
                setTimeout(() => {
                    isClicked = 0
                    createBomb()
                }, 1000);
            }
        }
        else {
            clearInterval(timerId)
        }
    }, 60);
}

//countDown Timer
let countDown = (timeObject,result) => {
    let id = setInterval(() => {
        if (time > 0) {
            timeObject.innerText = `${--time}`
        }
        else {
            clearInterval(id)
            sessionStorage.setItem("LastVisit", new Date().toLocaleString())
            sessionStorage.setItem("LastScore", score)
            document.querySelector("body").removeChild(document.querySelector(".bird"))
            document.querySelector("body").removeChild(document.querySelector(".bomb"))
            if(score>50)
            {
                document.querySelector("div h1[name=result]").innerText="You Won!"
                document.querySelector("div img[name=resultImg]").src="../images/win.png"
                result.classList.remove("hidden")
            }
            else
            {
                document.querySelector("div h1[name=result]").innerText="You Lose!"
                document.querySelector("div img[name=resultImg]").src="../images/lose.png"
                result.classList.remove("hidden")  
            }
        }

    }, 1000);
}

//count score
const countScoreResult = () => {
    for (let i = 0; i < currentBirds.length; i++) {
        if (currentBirds[i] == 'white') {
            score += 5
        }
        if (currentBirds[i] == 'black') {
            score += 10
        }
        if (currentBirds[i] == 'blue') {
            score -= 10
        }
    }
}
//Last user info
const lastInfo = (LastVisit, LastScore) => {
    if (sessionStorage.getItem('LastVisit') && sessionStorage.getItem('LastScore')) {
        LastVisit.classList.remove("hidden")
        LastScore.classList.remove("hidden")
        LastVisit.innerText = `Your Last visit was : ${sessionStorage.getItem('LastVisit')}`
        LastScore.innerText = `Your Last score was : ${sessionStorage.getItem('LastScore')}`
    }
    else {
        LastVisit.classList.add("hidden")
        LastScore.classList.add("hidden")
    }
}

//page Loading
window.addEventListener("load", function () {
    //selectors
    let nameObject = document.querySelector("h2[name=name]")
    let popUp = document.querySelector(".welcome")
    let startGame = document.querySelector("button[name=start]")
    let LastScore = document.querySelector("h3[name=lastScore]")
    let LastVisit = document.querySelector("h3[name=visit]")
    let playAgain = document.querySelector("button[name=playAgain]")
    let Cancel = document.querySelector("button[name=cancel]")
    let result = document.querySelector("div[name=finalResult]")
    let timeObject = document.querySelector("h2[name=time]")

    //do
    nameObject.innerText = sessionStorage.getItem('name')

    //display Last visit and Last score on the popUp window
    lastInfo(LastVisit, LastScore)
    popUp.classList.add("openPop")

    //start Game
    startGame.onclick = () => {
        popUp.classList.remove("openPop")
        countDown(timeObject,result)
        setTimeout(() => {
            createBomb()
        }, 1000);
        createBirds()
    }

    //play again
    playAgain.onclick = () => {
        result.classList.add("hidden")
        location.reload()
    }

    //cancel
    Cancel.onclick = () => {
        result.classList.add("hidden")
    }
})