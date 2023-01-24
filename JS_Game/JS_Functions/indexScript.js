import { pascalCase, CheckName } from "./functions.js";

window.addEventListener("load",function(){
    //selectors
    let goButton =document.querySelector("button");
    let nameObject=document.querySelector("input");
    let errorMessage=document.querySelector("span");
    //events
    goButton.onclick = function(){
        if(CheckName(nameObject.value)==true)
            {
                let userName=pascalCase(nameObject.value);
                location.href = "../pages/game.html?name="+userName;
            }

        }
    });
    
    
    