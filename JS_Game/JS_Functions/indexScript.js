import { pascalCase , CheckName } from "../Modules/functions.js";
   
    window.addEventListener("load",function(){
        //selectors
        let goButton =document.querySelector("button")
        let nameObject=document.querySelector("input")
        let errorMessage=document.querySelector("span")
        //events
        goButton.onclick = function(){
            if(CheckName(nameObject.value)==true)
            {
                sessionStorage.setItem("name", pascalCase(nameObject.value))
                location.href = "http://127.0.0.1:5500/pages/game.html"
            }
            else
            {
                errorMessage.classList.remove("hidden")
            }
        }

    })

