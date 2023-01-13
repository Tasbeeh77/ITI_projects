    window.addEventListener("load",function(){
        //selectors
        let goButton =document.querySelector("button")
        let nameObject=document.querySelector("input")
        //events
        goButton.onclick = function(){
            localStorage.setItem("name", nameObject.value)
            location.href = "http://127.0.0.1:5500/pages/game.html"
        }

    })

