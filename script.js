
let gameStart = false;
let isMouseDown = false;
let playerPosition = 0;
currentColor = "black"
// # of columns * size = 400px
let numberOfColumns = 50;
let columnSize = "8px"
//return # of pixels based on board size
let rainbowIndex = 1;
const boardSizeDict = {
    7: 8, 6: 10, 5: 20, 4: 40, 3: 80, 2: 100, 1: 400
}

const rainbow = {
    1: "red", 2: "orange", 3: "yellow", 4: "green", 5: "blue", 6: "indigo",
    7: "violet"
}

let rainbowMode = false;

function sixteenColumns(height){
    let newString = "";
    for(let i = 1; i <= numberOfColumns; i++){
        newString = height + newString;
    }
    return newString;
}

const rainbowButton = document.querySelector("#rainbowMode");
const rainbowClick = function(){
    rainbowMode = !rainbowMode;
    if(rainbowMode === false){
        currentColor = "black";
        rainbowButton.innerText = "Dark Mode";
        rainbowButton.setAttribute("style", "background-color: #303531;")
    }
    else{
        rainbowButton.innerText = "Rainbow Mode";
        rainbowButton.setAttribute("style", "background-color: #6bd38a;")
    }
}

const changeRainbow = function(){
    if(rainbowMode === true){
        currentColor = rainbow[rainbowIndex]
        if(rainbowIndex < 7){
            rainbowIndex++;
        }
        else{
            rainbowIndex = 1;
}}}

rainbowButton.addEventListener("click", rainbowClick);

const FlexContainer = document.querySelector("#FlexContainer");
const colorGrid = document.querySelector("#colorGrid");
const container = document.createElement('div');

const createGridContainer = function(){
    container.setAttribute(
        "style", `display: grid; grid-template-columns: repeat(${numberOfColumns}, ${columnSize}); grid-template-rows: repeat(${numberOfColumns}, ${columnSize}); width: fit-content;`,
        )
    container.setAttribute("class", "gridContainer")
    FlexContainer.insertBefore(container, colorGrid);
    }
// creating 16 * 16 child elements


function createChildren(container){
    for(let i = 1; i <= (numberOfColumns * numberOfColumns); i++){
        let gridChild = document.createElement("div");
        gridChild.setAttribute("class", `box b${i}`);
        //create an attribute value so that we don't have to use innerText.
        gridChild.setAttribute("value", `${i}`);
        gridChild.setAttribute("draggable", "false");
        gridChild.setAttribute("style", "background-color: white;")
        container.appendChild(gridChild);
    }
}
const theClick = function (e){
    if(isMouseDown === true){
        playerPosition = parseInt(e.currentTarget.getAttribute("value"), 10);
        e.currentTarget.setAttribute(`style`, `background-color: ${currentColor};`);
    }
}

const theFirstClick = function (e){
        playerPosition = parseInt(e.currentTarget.getAttribute("value"), 10);
        e.currentTarget.setAttribute(`style`, `background-color: ${currentColor};`);}


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

const whenMouseDown = function (){
    isMouseDown = true;
    return isMouseDown;
}

const whenMouseUp = function(){
    isMouseDown = false;
    return isMouseDown;
}

const slider = document.querySelector("#myRange");
const sliderText = document.querySelector("#sizeText");

const changeBoardSize = function(){
    let sliderValue = parseInt(slider.value);
    let children = document.querySelectorAll(".box");
    columnSize = `${boardSizeDict[sliderValue]}px`;
    numberOfColumns = 400/boardSizeDict[sliderValue];
}

const resetBoardColor = function (){
    let children = document.querySelectorAll(".box");
    for(let child of children){
        child.setAttribute("style", "background-color: white;")
    }
}

const showBoardSize = function (){
    sliderText.textContent = `Board-Size: ${numberOfColumns}X${numberOfColumns}`;
}

slider.addEventListener("input", () => container.remove())
slider.addEventListener("input", changeBoardSize);
slider.addEventListener("input", showBoardSize);
slider.addEventListener("input", createGridContainer)
slider.addEventListener("input", createChildren(container));
slider.addEventListener("input", addClickEvents);
slider.addEventListener("input", resetBoardColor);


//add click event listeners to all .box
function addClickEvents(){
    children = document.querySelectorAll(".box");
    for(let child of children){
        child.addEventListener("mousedown", whenMouseDown);
        child.addEventListener("mouseover", theClick);
        child.addEventListener("mouseover", changeRainbow);
        child.addEventListener("mousedown", theFirstClick);
        child.addEventListener("mouseup", whenMouseUp);
    }
    window.addEventListener("keydown", playerMoveDown);
    window.addEventListener("keydown", playerMoveLeft);
    window.addEventListener("keydown", playerMoveRight);
    window.addEventListener("keydown", playerMoveUp);
    window.addEventListener("mousedown", whenMouseDown);
    window.addEventListener("mouseup", whenMouseUp);
}

changeBoardSize();
showBoardSize();
createGridContainer();
createChildren(container);
addClickEvents();


/*
Click to select a starting point
    mouseover squares and lighten color before selecting
    once left mouse clicked, change a boolean value to no longer except clicks on squares
    user can now use arrows, or WASD, to move the position and fill in other squares. 
*/