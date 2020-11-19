

let canvas = document.querySelector("#canvas"); 
let ctx = canvas.getContext('2d'); 

let character = new Image();
character.src="images/character.png";
let gravel = new Image();
gravel.src="images/gravel.png";
let bush = new Image();
bush.src="images/bush.png";
let river = new Image();
river.src="images/river.png";
let coin = new Image();
coin.src="images/coin.png";
let treasure = new Image();
treasure.src="images/treasure.png";

maze = 
[
    [2,2,5,1,3,1,4,2,2,2,2,2,2,2,6],
    [2,1,1,1,2,1,1,1,1,1,1,1,1,2,6],
    [2,2,2,1,2,2,2,2,2,2,2,2,2,2,6],
    [1,1,2,1,2,1,2,1,1,1,1,6,1,5,1],
    [1,1,2,1,2,1,2,2,2,2,2,2,1,1,1],
    [1,1,2,1,5,1,1,1,1,1,1,2,2,2,2],
    [2,2,2,1,2,2,2,2,2,2,1,1,1,1,2],
    [2,1,2,1,1,1,2,1,1,2,2,2,2,1,2],
    [2,1,2,2,2,2,2,1,1,2,1,1,2,1,2],
    [2,1,1,2,1,1,1,1,1,2,1,2,2,1,2],
    [2,1,1,2,2,1,2,2,2,2,1,2,1,1,2],
    [2,1,1,1,2,1,2,1,1,1,1,2,1,1,2],
    [2,2,2,6,2,1,2,1,5,2,2,2,1,2,2],
    [5,1,1,6,1,1,2,1,1,1,1,1,1,2,1],
    [2,2,2,6,2,2,2,2,2,2,2,2,2,2,1],
]

let tileSize = 30;
let playerPosition = {x:0, y:0};
let wall = 1;
let road = 2;
let player = 3;
let goal = 4;
let point = 5;
let death = 6;


function drawMaze(){

    for(let y = 0; y < maze.length; y++){

        for(let x = 0; x < maze[y].length; x++){
            //road
            if(maze[y][x] === road){
                ctx.drawImage(gravel, x*tileSize, y*tileSize, tileSize, tileSize);
            }
            //wall
            else if(maze[y][x] === wall){
                ctx.drawImage(bush, x*tileSize, y*tileSize, tileSize, tileSize);
            }
            //Player
            else if(maze[y][x] === player){
                playerPosition.x = x;
                playerPosition.y = y;
                ctx.drawImage(gravel, x*tileSize, y*tileSize, tileSize, tileSize);
                ctx.drawImage(character, x*tileSize, y*tileSize, tileSize, tileSize);
            }
            //Goal
            else if(maze[y][x] === goal){
                ctx.drawImage(gravel, x*tileSize, y*tileSize, tileSize, tileSize);
                ctx.drawImage(treasure, x*tileSize, y*tileSize, tileSize, tileSize);
            }
            //Point
            else if(maze[y][x] === point){
                ctx.drawImage(gravel, x*tileSize, y*tileSize, tileSize, tileSize);
                ctx.drawImage(coin, x*tileSize, y*tileSize, tileSize, tileSize);
            }
            //Death
            else if(maze[y][x] === death){
                ctx.drawImage(river, x*tileSize, y*tileSize, tileSize, tileSize);
            }
        }
    }
}

function walk(){

    let gameSound1 = new Audio('gamesounds/walk.mp3');
    gameSound1.play();

}

function newScore(){

    let gameSound2 = new Audio('gamesounds/powerup.mp3');
    gameSound2.play();

}

function congrats(){
        let gameSound3 = new Audio('gamesounds/Celebration.mp3');
        gameSound3.play();

        alert("Congratulation you finished the game");

}

function gameOver(){

    let gameSound4 = new Audio('gamesounds/boiling.mp3');
    gameSound4.play();
    alert("gameover you fell into a red pit");
    window.location.reload();

}



window.addEventListener("keydown", (e)=>{

switch(e.keyCode){

    case 37: // left

    if(maze[playerPosition.y][playerPosition.x -1] === road){
       maze[playerPosition.y ][playerPosition.x -1] = player //players nye position
       maze[playerPosition.y ][playerPosition.x] = road//players nye position
       drawMaze();
       walk();
    }else if (maze[playerPosition.y][playerPosition.x -1] === point){
        maze[playerPosition.y][playerPosition.x -1] = player //players nye position
        maze[playerPosition.y ][playerPosition.x] = road//players nye position
        drawMaze();
        newScore();
     }
     else if (maze[playerPosition.y][playerPosition.x -1] === goal){
        maze[playerPosition.y][playerPosition.x -1] = player //players nye position
        maze[playerPosition.y ][playerPosition.x] = goal//players nye position
        drawMaze();
        congrats();
     }
     else if (maze[playerPosition.y][playerPosition.x -1] === death){
        maze[playerPosition.y][playerPosition.x -1] = player //players nye position
        maze[playerPosition.y ][playerPosition.x] = road//players nye position
        drawMaze();
        gameOver();
     }
    break; 



    case 38: // up

    if(maze[playerPosition.y -1][playerPosition.x] === road){
       maze[playerPosition.y -1 ][playerPosition.x] = player //players nye position
       maze[playerPosition.y ][playerPosition.x] = road//players nye position
       drawMaze();
       walk();
    }else if (maze[playerPosition.y-1][playerPosition.x] === point){
        maze[playerPosition.y-1 ][playerPosition.x] = player //players nye position
        maze[playerPosition.y ][playerPosition.x] = road//players nye position
        drawMaze();
        newScore();
     }else if (maze[playerPosition.y-1][playerPosition.x] === goal){
        maze[playerPosition.y-1 ][playerPosition.x] = player //players nye position
        maze[playerPosition.y ][playerPosition.x] = goal//players nye position
        drawMaze();
        congrats();
     }else if (maze[playerPosition.y-1][playerPosition.x] === death){
        maze[playerPosition.y-1 ][playerPosition.x] = player //players nye position
        maze[playerPosition.y ][playerPosition.x] = road//players nye position
        drawMaze();
        gameOver();
     }
    break; 




    case 39: // right

    if(maze[playerPosition.y][playerPosition.x +1] === road){
       maze[playerPosition.y ][playerPosition.x +1] = player //players nye position
       maze[playerPosition.y ][playerPosition.x] = road//players nye position
       drawMaze();
       walk();
    }else if (maze[playerPosition.y][playerPosition.x +1] === point){
        maze[playerPosition.y][playerPosition.x +1] = player //players nye position
        maze[playerPosition.y ][playerPosition.x] = road//players nye position
        drawMaze();
        newScore();
     }else if (maze[playerPosition.y][playerPosition.x +1] === goal){
        maze[playerPosition.y][playerPosition.x +1] = player //players nye position
        maze[playerPosition.y ][playerPosition.x] = goal//players nye position
        drawMaze();
        congrats();
     }else if (maze[playerPosition.y][playerPosition.x +1] === death){
        maze[playerPosition.y][playerPosition.x +1] = player //players nye position
        maze[playerPosition.y ][playerPosition.x] = road//players nye position
        drawMaze();
        gameOver();
     }
    break; 




    case 40: // down
    if(maze[playerPosition.y+1][playerPosition.x] === road){
       maze[playerPosition.y+1 ][playerPosition.x] = player //players nye position
       maze[playerPosition.y ][playerPosition.x] = road//players nye position
       drawMaze();
       walk();
    }else if (maze[playerPosition.y+1][playerPosition.x] === point){
        maze[playerPosition.y+1 ][playerPosition.x] = player //players nye position
        maze[playerPosition.y ][playerPosition.x] = road//players nye position
        drawMaze();
        newScore();
     }else if (maze[playerPosition.y+1][playerPosition.x] === goal){
        maze[playerPosition.y+1 ][playerPosition.x] = player //players nye position
        maze[playerPosition.y ][playerPosition.x] = goal//players nye position
        drawMaze();
        congrats();
     }else if (maze[playerPosition.y+1][playerPosition.x] === death){
        maze[playerPosition.y+1 ][playerPosition.x] = player //players nye position
        maze[playerPosition.y ][playerPosition.x] = road//players nye position
        drawMaze();
        gameOver();
     }
    break; 

}
})

window.addEventListener("load", drawMaze);













