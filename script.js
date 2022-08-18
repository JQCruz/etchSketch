/*
Create 16 x 16 square divs using only javascript.
createElement.
Append child

For loop, create a container div that holds 16 divs in a row

container = create container div
for(i<16, add 1 to i)
    
make it so that the size of the child elments scale to fit grid

*/
let gameStart = false;
let playerPosition = 0;
currentColor = "black"
// # of columns * size = 400px
let numberOfColumns = 50;
let columnSize = "8px"

function sixteenColumns(height){
    let newString = "";
    for(let i = 1; i <= numberOfColumns; i++){
        newString = height + newString;
    }
    return newString;
}


const daddyFlexContainer = document.querySelector("#daddyFlexContainer");
const container = document.createElement('div');
container.setAttribute(
    "style", `display: grid; background-color: blue; grid-template-columns: repeat(${numberOfColumns}, ${columnSize}); grid-template-rows: repeat(${numberOfColumns}, ${columnSize}); width: fit-content; margin: 0 auto;`,
    )
container.setAttribute("class", "gridContainer")
daddyFlexContainer.appendChild(container);
// creating 16 * 16 child elements


function createChildren(container){
    for(let i = 1; i <= (numberOfColumns * numberOfColumns); i++){
        let gridChild = document.createElement("div");
        gridChild.setAttribute("class", `box b${i}`);
        gridChild.setAttribute("style", "background-color: grey; text-align: center; padding: 10px 0px;");
        //create an attribute value so that we don't have to use innerText.
        gridChild.setAttribute("value", `${i}`);
        container.appendChild(gridChild);
    }
}
//change gamestart to true
//select a starting position for the player

const theClick = function (e){
    playerPosition = parseInt(e.currentTarget.getAttribute("value"), 10);
    const smallBoxes = document.querySelectorAll(".box");
    for(let box of smallBoxes){
        box.setAttribute("style", "background-color: grey;")
    }
    if(playerPosition == 69){
        const gridContainer = document.querySelector(".gridContainer");
        alert("The lord will save your soul");
        gridContainer.style.backgroundImage = "url('./images/1.jpg')";
        currentColor = "transparent"
    }

    e.currentTarget.setAttribute(`style`, `background-color: ${currentColor};`);
    gameStart = true;
}

//change box class to remove hover 
const changeBoxClass = function (){
    const boxes = document.querySelectorAll(".box");
    for(let box of boxes){
        box.setAttribute("class", `boxClicked b${parseInt(box.getAttribute("value"), 10)}`);
    }
}

const checkGameStart = function(){
    if(gameStart === true){
        children = document.querySelectorAll(".box");
        for(let child of children){
            child.removeEventListener("click", theClick);
        }
    }
}

const playerMoveUp = function (e){
    if(playerPosition > numberOfColumns && gameStart === true && (e.code == "KeyW" || e.code == "ArrowUp" )){
        playerPosition = playerPosition - numberOfColumns;
        let currentSquare = document.querySelector(`.b${playerPosition}`);
        currentSquare.setAttribute("style", `background-color: ${currentColor}; color: ${currentColor};`);
    }
}

const playerMoveDown = function (e){
    if(playerPosition < ((numberOfColumns*numberOfColumns)-(numberOfColumns-1)) && gameStart === true && (e.code == "KeyS" || e.code == "ArrowDown" )){
        playerPosition = playerPosition + numberOfColumns;
        let currentSquare = document.querySelector(`.b${playerPosition}`);
        currentSquare.setAttribute("style", `background-color: ${currentColor}; color: ${currentColor};`);   
     }
}

const playerMoveLeft = function (e){
    if((playerPosition-1) % numberOfColumns != 0 && gameStart === true && (e.code == "KeyA" || e.code == "ArrowLeft" )){
        playerPosition = playerPosition - 1;
        let currentSquare = document.querySelector(`.b${playerPosition}`);
        currentSquare.setAttribute("style", `background-color: ${currentColor}; color: ${currentColor};`);   
     }
}

const playerMoveRight = function (e){
    if(playerPosition % numberOfColumns != 0 && gameStart === true && (e.code == "KeyD" || e.code == "ArrowRight" )){
        playerPosition = playerPosition + 1;
        let currentSquare = document.querySelector(`.b${playerPosition}`);
        currentSquare.setAttribute("style", `background-color: ${currentColor}; color: ${currentColor};`);
        }
}


//add click event listeners to all .box
function addClickEvents(){
    children = document.querySelectorAll(".box");
    for(let child of children){
        child.addEventListener("click", theClick);
        child.addEventListener("click", checkGameStart);
        child.addEventListener("click", changeBoxClass);
    }
    window.addEventListener("keydown", playerMoveDown);
    window.addEventListener("keydown", playerMoveLeft);
    window.addEventListener("keydown", playerMoveRight);
    window.addEventListener("keydown", playerMoveUp);
}

createChildren(container);
addClickEvents();


/*
Click to select a starting point
    mouseover squares and lighten color before selecting
    once left mouse clicked, change a boolean value to no longer except clicks on squares
    user can now use arrows, or WASD, to move the position and fill in other squares. 
*/