//shared variables
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
const birdSize = 250
const bombSize = 100

let currentBirds = []
let countt = 0
let time = 60
let score = 0
let killed = 0
let bombIsClicked = 0 //to remove bomb when it clicked and not let it continue moving
let birdIsClicked = 0

//create bird
const createBirds = () => {
    let birdsNumbers = Math.floor(Math.random() * 10 + 1)
    let bird = document.createElement("embed")
    bird.src = birdsArray[Math.floor(Math.random() * 3)].gif
    bird.classList.add("bird")
    currentBirds.push(bird)
    bird.style.top = Math.floor(Math.random() * (window.innerHeight - birdSize)) + 'px'
    document.querySelector("body").append(bird)
    moveRight(bird, 0, countt)
    countt++

}

//bird moveRight
const moveRight = (bird, left, index) => {
    let timerId = setInterval(() => {
        if (time > 0) {
            if (left < (window.innerWidth - birdSize - 15) && birdIsClicked == 0 && bombIsClicked == 0) {
                left += 15
                bird.style.left = left + 'px'
            }
            else {
                setTimeout(() => {
                    document.querySelector("body").removeChild(bird)
                    currentBirds.splice(index - 1, 1)
                    countt--              
                }, 100);
                clearInterval(timerId)
                birdIsClicked = 0
                setTimeout(() => {
                    createBirds()
                }, 1000);
            }
        }
        else {
            clearInterval(timerId)
        }
    }, 30);
}

//create Bomb
const createBomb = () => {
    let bomb = document.createElement("img")
    bomb.src = "../images/bomb.png"
    bomb.classList.add("bomb")
    bomb.style.left = Math.floor(Math.random() * (window.innerWidth - bombSize)) + 'px'
    document.querySelector("body").append(bomb)
    fallDown(bomb, 64)
    bomb.addEventListener("click", function () {
        bombIsClicked = 1;
        bomb.src = "../images/explosion.png"
        countScoreResultBird(currentBirds[countt-1].src.slice(29, 34))
        document.querySelector("h2[name=score]").innerHTML = `${score}`
        killed += currentBirds.length
        document.querySelector("h2[name=kill]").innerHTML = `${killed}`
    })
}

//bomb falldown
const fallDown = (bomb, top) => {
    let timerId = setInterval(() => {
        if (time > 0) {
            if (top < (window.innerHeight - bombSize - 10) && bombIsClicked == 0) {
                top += 10
                bomb.style.top = top + 'px'
            }
            else {
                document.querySelector("body").removeChild(bomb)
                clearInterval(timerId)
                bombIsClicked = 0
                setTimeout(() => {
                    createBomb()
                }, 1000);
            }
        }
        else {
            clearInterval(timerId)
        }
    }, 60);
}


//display result
const displayResult = result => {
    if (score >= 50) {
        document.querySelector("div h1[name=result]").innerText = "You Won!"
        document.querySelector("div img[name=resultImg]").src = "../images/win.png"
        result.classList.remove("hidden")
    }
    else {
        document.querySelector("div h1[name=result]").innerText = "You Lose!"
        document.querySelector("div img[name=resultImg]").src = "../images/lose.png"
        result.classList.remove("hidden")
    }
}

//countDown Timer
let countDown = (timeObject, result) => {
    let id = setInterval(() => {
        if (time > 0) {
            timeObject.innerText = `${--time}`
        }
        else {
            clearInterval(id)
            sessionStorage.setItem("LastVisit", new Date().toLocaleString())
            sessionStorage.setItem("LastScore", score)
            if (document.querySelector(".bird"))
                document.querySelector("body").removeChild(document.querySelector(".bird"))
            if (document.querySelector(".bomb"))
                document.querySelector("body").removeChild(document.querySelector(".bomb"))
            displayResult(result)
        }

    }, 1000);
}

//count score
// const countScoreResultBomb = () => {
//     for (let i = 0; i < currentBirds.length; i++) {
//         if (currentBirds[i].src.slice(29, 34) == 'white') {
//             score += 5
//         }
//         if (currentBirds[i].src.slice(29, 34) == 'black') {
//             score += 10
//         }
//         if (currentBirds[i].src.slice(29, 34) == 'blue.') {
//             score -= 10
//         }
//     }
// }
const countScoreResultBird = (imag) => {
    if (imag == 'white') {
        score += 5
    }
    if (imag == 'black') {
        score += 10
    }
    if (imag == 'blue.') {
        score -= 10
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
        countDown(timeObject, result)
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
        location.href = "http://127.0.0.1:5500/pages/index.html"
    }
})

