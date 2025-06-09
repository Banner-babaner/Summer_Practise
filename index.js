const main = document.getElementById("main");

const ground = document.getElementById("ground");
const gctx = ground.getContext("2d");


const sprites = document.getElementById("sprites");
const sctx = sprites.getContext("2d");


const ceilResolution = 50;
const ceilCount = 64;

const groundInf = document.getElementById("groundInf");
const coordsInf = document.getElementById("coordsInf");
const spriteInf = document.getElementById("spriteInf");
const switchFog = document.getElementById("switchFog");

const spidometr = document.getElementById("spidometr");
let gameSpeed = 1;
let gameAct = 0;
const defaultGameInterval = 10;
let gameInterval = defaultGameInterval;

const fieldResolution = ceilResolution*ceilCount;

const gamescreen = document.createElement("canvas");
gamescreen.height = fieldResolution;
gamescreen.width = fieldResolution;

ground.height = fieldResolution;
ground.width = fieldResolution;
gctx.imageSmoothingEnabled = false;

sprites.height = fieldResolution;
sprites.width = fieldResolution;
sctx.imageSmoothingEnabled = false;

let clicked = false;

sprites.onclick = canvasClick;
sprites.onmousemove = getMouseCeil;


const groundMap = new Array();
for(let y=0; y<ceilCount; y++){
    let row = new Array(ceilCount);
    groundMap.push(row);
}

const spriteMap = new Array();
for(let y=0; y<ceilCount; y++){
    let row = new Array(ceilCount);
    spriteMap.push(row);
}


const hitBoxMap = new Array();
for(let y=0; y<ceilCount; y++){
    let row = new Array(ceilCount);
    hitBoxMap.push(row);
}

let id=0;
// let idMap;
let unitList = new Array();
let mouseX = -10;
let mouseY = -10;
let keys = [];

const player = ["top", "right", "bottom", "left"][randint(0, 4)];
document.getElementById("playerName").innerHTML = `Player: ${player}`;

var link;
var asd;

window.onload = async ()=>{
    await loadSpriteImages();
    await createSprites();
    spidometr.addEventListener('input', function () {
        changeGameSpeed(this.value);
    }, false);
    sctx.lineWidth = 5;
    papersheet();
    const ashlandGroundImg = await loadImg("images\\ground\\3x_RMMV\\tf_A5_ashlands_3.png");
    const greenSlimeImg = await loadImg("images\\sprites\\MiniWorldSprites\\Characters\\Monsters\\Slimes\\KingSlimeGreen.png");

    link = new SwordsManRed();
    link.player = player;
    link.put(10, 10);
    link.hp = 9999;
    // link.invulnerable = true;

    let greenSlimeStatic = new ImageMap(greenSlimeImg, 6, 4);
    let greenSlimeSprite = new Sprite(greenSlimeStatic.getRow(0), 5, 5, 5);

    greenSlimeSprite.name = "GreenTeaSlime";
    let greenSlimeUnit = new BlueKingSlime();
    let greenSlimeUnit2 = new GreenKingSlime();
    let greenSlimeUnit3 = new GreenKingSlime();
    let greenSlimeUnit4 = new GreenKingSlime();
    let greenSlimeUnit5 = new GreenKingSlime();
    let greenSlimeUnit6 = new BlueKingSlime();
    let h1 = new SwordsManRed();
    let h2 = new SwordsManRed();
    let h3 = new SwordsManRed();
    let h4 = new SwordsManRed();
    greenSlimeUnit6.sprite.name = "BlueTeaSlime";
    greenSlimeUnit2.name = "GTS2";
    greenSlimeUnit3.name = "topPlayer";
    greenSlimeUnit4.name = "rightPlayer";
    greenSlimeUnit5.name = "bottomPlayer";
    greenSlimeUnit6.name = "leftPlayer";


    asd = greenSlimeUnit;
    




    greenSlimeUnit.put(32, 32);
    greenSlimeUnit2.put(39, 30);
    greenSlimeUnit3.put(Math.floor(ceilCount/2-greenSlimeUnit3.sprite.width/2), 4);
    greenSlimeUnit4.put(ceilCount-greenSlimeUnit4.sprite.width-4, Math.floor(ceilCount/2-greenSlimeUnit3.sprite.height/2));
    greenSlimeUnit5.put(Math.floor(ceilCount/2-greenSlimeUnit3.sprite.width/2), ceilCount-greenSlimeUnit5.sprite.height-4);
    greenSlimeUnit6.put(4, Math.floor(ceilCount/2-greenSlimeUnit3.sprite.height/2));
    h1.put(35, 2);
    h2.put(60, 30);
    h3.put(35, 60)
    h4.put(3, 40);
    greenSlimeUnit3.player = "top";
    greenSlimeUnit4.player = "right";
    greenSlimeUnit5.player = "bottom";
    greenSlimeUnit6.player = "left";
    h1.player = "top";
    h2.player = "right";
    h3.player = "bottom";
    h4.player = "left";

    let ashlandGround = new ImageMap(ashlandGroundImg, 8, 16);
    // idMap = new Ground(ashlandGround.getAll());

    let ashlandDirt = new Ground(
        ashlandGround.getRow(0, 1).concat(ashlandGround.getRow(1, 6)).concat(ashlandGround.getRow(2, 5))
    )
    let ashlandField = new Ground(
        ashlandGround.getRow(2, 0, 5)
    );
    let ashlandGrass = new Ground(
        ashlandGround.getRow(1, 0, 6)
    );


    for(let y=0; y<ceilCount; y++){
        for(let x=0; x<ceilCount; x++){
            let tile;
            if((((x-ceilCount/2+0.5)*(x-ceilCount/2+0.5)-(y-ceilCount/2+0.5)*(y-ceilCount/2+0.5)*5)<400)!=(((y-ceilCount/2+0.5)*(y-ceilCount/2+0.5)-(x-ceilCount/2+0.5)*(x-ceilCount/2+0.5)*5)<400)){
                tile = ashlandField.getTile();
            }
            else{
                tile = ashlandDirt.getTile();
            }
            groundMap[y][x] = tile;
        }
    }

    
    await start();
    
    drawGround(groundMap);
    // papersheet();
}


















function papersheet(){
    for(let i=0; i<ceilCount; i++){
        gctx.beginPath();
        gctx.moveTo(i*ceilResolution, 0);
        gctx.lineTo(i*ceilResolution, fieldResolution);
        gctx.stroke();
    }
    for(let i=0; i<ceilCount; i++){
        gctx.beginPath();
        gctx.moveTo(0, i*ceilResolution);
        gctx.lineTo(fieldResolution, i*ceilResolution);
        gctx.stroke();
    }
}



function update(){
    drawSprites();
    requestAnimationFrame(update);
    gameMouseEvents();
    gameKeysEvents();
    updateFog(player);
    gameAct++;
    if(gameAct>=gameInterval){
        gameAct=0;
        let toMove = new Array();
        for(let i=0; i<(unitList.length); i++){
            if(unitList[i]!=link){
                toMove.push(unitList[i]);
            }
        }
        for(let i=0; i<(toMove.length); i++){
                if(toMove[i].died){
                    toMove[i].onDie();
                    delete toMove[i];
                    continue;
                }
                let enCoords = toMove[i].findEnemyNearby();
                if(enCoords){
                    let x = toMove[i].getCenter()[0];
                    let y = toMove[i].getCenter()[1];
                    if(((x-enCoords[0])*(x-enCoords[0])+(y-enCoords[1])*(y-enCoords[1]))>(toMove[i].atcRange*toMove[i].atcRange))
                    toMove[i].toPoint(enCoords[0], enCoords[1]);
                    else{
                        hitBoxMap[enCoords[1]][enCoords[0]].unitReference.changeHp(toMove[i].atc);
                    }
                }
        }
    }
}

function randint(a, b){
    return a+Math.floor(Math.random()*(b-a));
}

function drawGround(groundMap){
    gctx.clearRect(0, 0, fieldResolution, fieldResolution);
    for(let y=0; y<ceilCount; y++){
        for(let x=0; x<ceilCount; x++){
            let tile = groundMap[y][x];
            draw(gctx, tile.img, x, y);
        }
    }
}

function drawSprites(){
    sctx.clearRect(0, 0, fieldResolution, fieldResolution);
    for(let y=0; y<ceilCount; y++){
        for(let x=0; x<ceilCount; x++){

            let sprite = spriteMap[y][x];
            if(sprite){
                sprite = sprite.update();
                draw(sctx, sprite.img, x, y, sprite.width, sprite.height);
            }
        }
    }
}

function draw(canvasContext, img, xCeil=0, yCeil=0, width=1, height=1){
    canvasContext.drawImage(img.img, img.xStart, img.yStart, img.width, img.height, xCeil*ceilResolution, yCeil*ceilResolution, width*ceilResolution, height*ceilResolution);
}

function loadImg(src){
    return new Promise((resolve, reject)=>{
        try{
            const image = new Image();
            image.onload = ()=>{resolve(image)};
            image.src=src;
        }
        catch(err){
            return reject(err);
        }
    })
}

function fromto(from, n, to){
    return (n>=from)&&(n<=to);
}

function getMouseCeil(event){
    mouseX = Math.floor(event.offsetX/ground.clientWidth*ceilCount);
    if(mouseX<0)mouseX=0;
    mouseY = Math.floor(event.offsetY/ground.clientHeight*ceilCount);
    return [mouseX, mouseY];
}

function canvasClick(event){
    let x = getMouseCeil(event)[0];
    let y = getMouseCeil(event)[1];
    if(hitBoxMap[y][x]&&((battleFogMap[y][x]=="clear")||(!switchFog.checked))) hitBoxMap[y][x].onclick();
    return [x, y];
}

function screen(){
    gamescreen.getContext("2d").drawImage(ground, 0, 0);
    gamescreen.getContext("2d").drawImage(sprites, 0, 0);
    gamescreen.getContext("2d").drawImage(battleFog, 0, 0);
    let link = document.createElement("a");
    link.download = "screenshot.png";
    try{
        link.href = gamescreen.toDataURL();
        link.click();
    }
    catch{
        alert("Это блятб не сервер");
    }
    
}

async function start() {
    for(let y=0; y<ceilCount-1; y+=2){
        [new LightDeadTree(), new DarkDeadTree][randint(0, 2)].put(0, y);
        [new LightDeadTree(), new DarkDeadTree][randint(0, 2)].put(ceilCount-2, y);
    }
    for(let x=2; x<ceilCount-1; x+=2){
        [new LightDeadTree(), new DarkDeadTree][randint(0, 2)].put(x, 0);
        [new LightDeadTree(), new DarkDeadTree][randint(0, 2)].put(x, ceilCount-2);
    }
    window.onkeydown=(event)=>{
        if(!keys.includes(event.code)) keys.push(event.code);
    }
    window.onkeyup = (event)=>{
        if(keys.includes(event.code)) keys.splice(keys.indexOf(event.code), 1);
    }
    update();
}

function changeGameSpeed(newSpeed){
    gameSpeed=newSpeed;
    unitList.forEach(unit => {
        unit.sprite.changeSpeed(newSpeed);
    });
    gameInterval=Math.floor(defaultGameInterval/newSpeed);
}

function gameMouseEvents(){
    if(mouseX<0) return;
    if(mouseY<0)mouseY=0;
    if(hitBoxMap[mouseY][mouseX]&&((battleFogMap[mouseY][mouseX]=="clear")||(!switchFog.checked))){
        let center =  hitBoxMap[mouseY][mouseX].unitReference.getCenter();
        hitBoxMap[mouseY][mouseX].onhover();
        sctx.beginPath();
        sctx.arc(center[0]*ceilResolution, center[1]*ceilResolution, hitBoxMap[mouseY][mouseX].unitReference.atcRange*ceilResolution, 0, 2*Math.PI);
        sctx.strokeStyle = 'rgba(255, 0, 0, 0.5)';
        sctx.stroke();
        sctx.beginPath();
        sctx.arc(center[0]*ceilResolution, center[1]*ceilResolution, hitBoxMap[mouseY][mouseX].unitReference.watchingRadius*ceilResolution, 0, 2*Math.PI);
        sctx.strokeStyle = 'rgba(127, 127, 255, 0.5)';
        sctx.stroke();
    }
    coordsInf.innerHTML = `${[mouseX, mouseY]}`;
    groundInf.innerHTML = `${groundMap[mouseY][mouseX].type}`;
    if(hitBoxMap[mouseY][mouseX]!=undefined){
        spriteInf.innerHTML = `${hitBoxMap[mouseY][mouseX].name}`;
    }
    else{
        spriteInf.innerHTML = "None";
    }
}
function gameKeysEvents(){
    keys.forEach(element => {
        switch(element){
            case "KeyA":
                link.move("left");
                break;
            case "KeyW":
                link.move("top");
                break;
            case "KeyS":
                link.move("down");
                break;
            case "KeyD":
                link.move("right");
                break;
            }
    });
}