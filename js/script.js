let score=0
let inputdir={x:0,y: 0};
const foodSound = new Audio('/items/food.mp3')
const gameOver = new Audio('items/takraye.mp3')
const moveSound = new Audio('items/moveSound.mp3') 


let speed = 5;
let lastPainttime = 0;
let snakeArr=[
    {x:13,y:15}
]
food={x:6,y:7 }



function main(ctime){
    window.requestAnimationFrame(main);
    // console.log(ctime)
    if((ctime-lastPainttime)/1000<1/speed){
        return;
    }
    lastPainttime=ctime;
    gemeEngine();

}

 function isCollide(snake){
    for(let i=1;i<snakeArr.length;i++){
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y )
        return true
    }

    if(snake[0].x>=18 || snake[0].x<=0 || snake[0].y>=18 || snake[0].y<=0){
        return true
    }
  

}
function gemeEngine(){

    if(isCollide(snakeArr)){
       gameOver.play()
       moveSound.pause()
       inputdir={x:0,y:0}
       alert("gameOver")
       snakeArr=[{x:13,y:15}]
       moveSound.play()
       score=0
    }
    //after eating the food
    if(snakeArr[0].y === food.y && snakeArr[0].x ===food.x){

        foodSound.play()
        snakeArr.unshift({x:snakeArr[0].x+inputdir.x,y:snakeArr[0].y+inputdir.y})
        let a=2
        let b=16
        food={x:Math.round(a+(b-a)*Math.random()),y:Math.round(a+(b-a)*Math.random())}
    }
    //moving the snake
    for(let i =snakeArr.length-2;i>=0;i--)
    {
        snakeArr[i+1]={...snakeArr[i]}
    }
    snakeArr[0].x += inputdir.x
    snakeArr[0].y +=inputdir.y

    //Display the Snake and Food
    board.innerHTML="";
    snakeArr.forEach((e,index)=>{
        snakeElement=document.createElement('div')
        snakeElement.style.gridRowStart=e.y
        snakeElement.style.gridColumnStart=e.x
        if(index===0){

        
        snakeElement.classList.add('head')
   }
   else{
    snakeElement.classList.add('snake')

   }
        board.appendChild(snakeElement);
    });
    foodElement=document.createElement('div')
    foodElement.style.gridRowStart=food.y
    foodElement.style.gridColumnStart=food.x
    foodElement.classList.add('food')
    board.appendChild(foodElement);


}

window.requestAnimationFrame(main);


window.addEventListener('keydown',e =>{

inputdir={x:0,y:1}

switch(e.key){
    case "ArrowUp":
       
        moveSound.play()
        inputdir.x=0
        inputdir.y=-1
        break;
    case "ArrowDown":
        moveSound.play()
        inputdir.x=0
        inputdir.y=1
        break;
    case "ArrowLeft":
        moveSound.play()
        inputdir.x=-1
        inputdir.y=0
        break;
    case "ArrowRight":
        moveSound.play()
        inputdir.x=1
        inputdir.y=0
        break;

    default:
        break;
}
})