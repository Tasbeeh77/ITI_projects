window.addEventListener("load",function(){
    //selectors
    let nameObject =document.querySelector("h2[name=name]")
    let popUp= document.querySelector(".welcome")
    let result= document.querySelector(".result")

    let startGame=document.querySelector("button[name=start]")
    //do
    nameObject.innerText= localStorage.getItem('name')
    //pop-up welcome window before starting The game
    popUp.classList.add("openPop")
    startGame.onclick=()=>
    {
        popUp.classList.remove("openPop")   
    }
    //when time end
    //result.classList.add("showResult")
    //if user clicked play again
    //result.classList.remove("showResult")
    //location.reload()
})