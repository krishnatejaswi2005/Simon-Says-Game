let game=[];
let user=[];
let colours=["red","green","yellow","blue"];
let started=false;
let level=0;
let highScore=0;

let h3=document.querySelector("h3");
document.addEventListener("keypress",function(){
    if(started==false){
        started=true;
        levelUp();
    }
});
function checkAns(idx){
    if(user[idx]===game[idx]){
        if(user.length==game.length){
            console.log(game);
            setTimeout(levelUp,1000);
        }
    }
    else{
        document.querySelector("html").style.backgroundColor="#e1401f";
        if(highScore<level){
            highScore=level;}
        h3.innerHTML=`Game Over, your score was <b>${level}</b> <br/>High Score: <b>${highScore}</b><br/>Press Any Key to Restart`;
        for(let btn of btns){
            btn.disabled=true;
        }
        document.addEventListener("keypress",reset);
    }
}
function reset(){
    document.removeEventListener("keypress", reset);
    game=[];
    user=[];
    level=0;
    started=false;
    document.querySelector("html").style.backgroundColor="";
    levelUp();
}
function gameFlash(btn){
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    },200);
}
function userFlash(btn){
    btn.classList.add("userflash");
    setTimeout(function(){
        btn.classList.remove("userflash");
    },200);
}
function levelUp(){
    user=[];
    level++;
    for( let btn of btns){
        btn.disabled=false;
    }
    h3.innerHTML=`Level ${level}`;
    let randNum=Math.floor(Math.random()*4);
    randColour=colours[randNum];
    let randBtn=document.querySelector(`.${randColour}`);
    game.push(randColour);
    gameFlash(randBtn);
}
function btnPress(){
    let btn=this;
    userFlash(btn);
    userColour=btn.getAttribute("id");
    user.push(userColour);
    checkAns(user.length-1);
}
let btns=document.querySelectorAll(".btn");
for( btn of btns){
    btn.disabled=true;
    btn.addEventListener("click",btnPress);
}