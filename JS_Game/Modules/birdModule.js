export class Bird
{
    Bird(src,top,parent)
    {
        let newBird = document.createElement("embed")
        bird.classList.add("bird")
        this.bird=newBird
        this.bird.src=src
        this.bird.top=top+'px'
        this.bird.left=0+'px'
        parent.append(this.bird)
    }
    moveRight=()=>
    {
        this.bird.left+=15
        this.bird.style.left=this.bird.left+'px'
    }
}