let grid;
let resolution = 5;
let fps = 15;
let mode = -1;
function make2DArray(cols, rows) {
    let arr = new Array(cols);
    for (let i = 0; i < arr.length; i++) {
        arr[i] = new Array(rows);
    }
    return arr;
}

function setup() {
    createCanvas(1700, 3000); // Create a canvas with width and height of 400
    frameRate(fps);
    cols = width / resolution;//300
    rows = height / resolution;//160s

    grid = make2DArray(cols, rows);
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            // grid[i][j] = Math.floor(Math.random() * 2 +0.000005);
            grid[i][j] = 0;
        }
    }
    // for(let p = 0;p<280;p+=20){
    //     Glider(p,20);
    // }
    // Glider(100,100);
    // Glider(120,100);
    // Glider(120,100);
    // frigate(100,20);
}
async function draw() {
    background(0); 
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            let x = i * resolution;
            let y = j * resolution;
            if (grid[i][j] == 1) {
                fill(255);
                stroke(255);
                rect(x, y, resolution, resolution); // Corrected rect function call
            }
        }
    }

    // Generate next generation
    let next = make2DArray(cols, rows);

    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            let sum = countNeighbors(grid, i, j);
            let state = grid[i][j];

            if(state == 1 && sum <2){
                next[i][j] = 0;
            }
            else if(state == 1 && sum == 2 || sum == 3){
                next[i][j] = 1;
            }
            else if(state == 1 && sum >3){
                next[i][j] = 0;
            }
            else if(state == 0 && sum == 3){
                state[i][j] = 1;
            }
            else{
                next[i][j] = state;
            }
        }
    }

    // Update grid to the next generation
    grid = next;
//    sleep(20000);
}

function countNeighbors(grid, x, y) {
    let sum = 0;
    for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {
            let col = (x + i + cols) % cols;
            let row = (y + j + rows) % rows;
            sum += grid[col][row];
        }
    }
    sum -= grid[x][y];
    return sum;
}

function Glider(posx,posy) {
    let i = [0, 1, 1, 2, 2];
    let j = [2, 0, 2, 1, 2];
    for (let o = 0; o < 5; o++) {
        let x = posx + i[o];
        let y = posy + j[o];
        x *= resolution;
        y *= resolution;
        grid[y / resolution][x / resolution] = 1;
    }
}
function frigate(posx,posy){
    let i = [0,0,1,2,2,3,3,3,3];
    let j = [0,3,4,0,4,1,2,3,4];
    for (let o = 0; o < i.length; o++) {
        let x = posx + i[o];
        let y = posy + j[o];
        x *= resolution;
        y *= resolution;
        grid[y / resolution][x / resolution] = 1;
    }
}
function GliderShooter(posx,posy){
    let i = [1,2,2,3,3,3,3,3,3,4,4,4,4,4,4,5,5,5,5,5,5,6,6,6,6,6,6,6,6,7,7,7,8,8,9,9];
    let j = [25,23,25,13,14,21,22,35,36,12,16,21,22,35,36,1,2,11,17,21,22,1,2,11,15,17,18,23,25,11,17,25,12,16,13,14];
    for (let o = 0; o < i.length; o++) {
        // console.log(i[o],j[o]);
        let x = posx + i[o];
        let y = posy + j[o];
        // Adjust coordinates by resolution
        x *= resolution;
        y *= resolution;
        // Ensure coordinates are within grid bounds
        // if (x >= 0 && x < width && y >= 0 && y < height) {
            // console.log("adw");
        grid[y / resolution][x / resolution] = 1;
        // }
    }
}

function Pulsar(posx,posy){
    let i = [0,0,0,0,0,0,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,5,5,7,7,7,7,7,7,8,8,8,8,9,9,9,9,10,10,10,10,12,12,12,12,12,12];
    let j = [2,3,4,8,9,10,0,5,7,12,0,5,7,12,0,5,7,12,2,3,4,8,9,10,2,3,4,8,9,10,0,5,7,12,0,5,7,12,0,5,7,12,2,3,4,8,9,10];
    for (let o = 0; o < i.length; o++) {
        // console.log(i[o],j[o]);
        let x = posx + i[o];
        let y = posy + j[o];
        // Adjust coordinates by resolution
        x *= resolution;
        y *= resolution;
        // Ensure coordinates are within grid bounds
        // if (x >= 0 && x < width && y >= 0 && y < height) {
            // console.log("adw");
        grid[y / resolution][x / resolution] = 1;
        // }
    }
}
function reset(){
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            grid[i][j] = 0;
        }
    }
}
function mode1(){
    mode = 1;
}
function mode2(){
    mode = 2;
}
function mode3(){
    mode = 3;
}
function mode4(){
    mode = 4;
}
function mode5(){
    mode = -1;
}
function mousePressed() {
    let colIndex = floor(mouseY / resolution);
    let rowIndex = floor(mouseX / resolution);

        console.log(mode);
        switch (mode) {
            case 1:
                console.log("Mode 1 selected");
                frigate(colIndex, rowIndex);
                break;
        
            case 2:
                console.log("Mode 2 selected");
                Glider(colIndex, rowIndex);
                break;
            case 3:
                console.log("Mode 3 selected");
                GliderShooter(colIndex, rowIndex);
                break;
            case 4:
                console.log("Mode 4 selected");
                Pulsar(colIndex, rowIndex);
                break;
            default:
                break;
    }
}