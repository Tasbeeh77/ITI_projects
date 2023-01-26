import { pascalCase, CheckName } from "./CommonFunctions.js";

window.addEventListener("load",function(){
    //selectors
    let goButton =document.querySelector("button");
    let nameObject=document.querySelector("input");
    //events
    goButton.onclick = function(){
        if(CheckName(nameObject.value)==true)
            {
                let userName=pascalCase(nameObject.value);
                location.href = "../pages/game.html?name="+userName;
            }
        }
    });
    
    
    