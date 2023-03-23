const boxes=document.querySelectorAll(".box");
const gameInfo=document.querySelector(".game-info");
const newGameBtn=document.querySelector(".btn");

//initial variables
let currentPlayer;
//this is an array to store the status of all the boxes in the grid
let gameGrid;

const winningPositions=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

//let's create a function to initialize the game
function initGame(){
    currentPlayer="X";
    gameGrid=["","","","","","","","",""];
    newGameBtn.classList.remove("active");
    gameInfo.innerText=`Current Player-${currentPlayer}`;
    //UI par empty bhi karna padega boxes ko
    boxes.forEach((box,index)=>{
        box.innerText="";
        boxes[index].style.pointerEvents="all";
        //initialize boxes with css properties again
        box.classList=`box box${index+1}`;
    });
    newGameBtn.classList.remove("active");
    gameInfo.innerText = `Current Player - ${currentPlayer}`;

}

initGame();

// let's make a function to swap the turn
function swapTurn(){
    if(currentPlayer==="X"){
        currentPlayer="O";
    }
    else{
        currentPlayer="X";
    }
    //UI Update
    gameInfo.innerText=`Current Player-${currentPlayer}`;
}

function handleClick(index){
    //if box is empty
    if(gameGrid[index]===""){
        boxes[index].innerText=currentPlayer;
        gameGrid[index]=currentPlayer;
        boxes[index].getElementsByClassName.pointerEvents="none";

        // input dene ke baad ab turn swap karo
        swapTurn();
        //check if game is over or not
        checkGameOver();

    }
}

function checkGameOver(){
    let answer="";

    // how do we know that the game is over?
    //all 3 boxes in the gameGrid should be non-empty and exactly same in value(innerText)

    //to do this, we need to iterate over all the winning conditions

    winningPositions.forEach((position)=>{
        if(gameGrid[position[0]]!=="" && gameGrid[position[1]]!=="" && gameGrid[position[2]]!=="" && (gameGrid[position[0]]===gameGrid[position[1]]) && (gameGrid[position[1]]===gameGrid[position[2]])){

            //check if winner is X
            if(gameGrid[position[0]]==="X"){
                answer="X";
            }
            else{
                answer="O";
            }

            //disable pointer events
            boxes.forEach((box) => {
                box.style.pointerEvents = "none";
            })

            //now we know X/O is a winner
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");

        }

    });

    // IT MEANS WE HAVE A WINNER
    if(answer!==""){
        gameInfo.innerText=`Winner Player-${answer}`;
        newGameBtn.classList.add("active");
        return;
    }

    //IF WE COME TILL HERE THIS MEANS THAT THERE IS A TIE 
    let fillCount=0;
    gameGrid.forEach((box)=>{
        if(box!==""){
            fillCount++;
        }
    });
    //if the whole board is filled it means that there is a tie
    if(fillCount===9){
        gameInfo.innerText="Game Tied!";
        newGameBtn.classList.add("active");
    }
}

boxes.forEach((box,index)=>{
    box.addEventListener("click",()=>{
        handleClick(index);
    });
});

newGameBtn.addEventListener("click", initGame);