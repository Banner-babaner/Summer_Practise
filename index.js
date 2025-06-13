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
let gameSpeed = 50;
let gameAct = 0;
const defaultGameInterval = 100;
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


const playerColors = {
    "top" : "Cyan",
    "bottom" : "blue",
    "right" : "lightgreen",
    "left" : "yellow",
    "neutral" : "gray",
    "passive" : "brown"
}
const playerBuildings = {
    "top" : 8,
    "bottom" : 8,
    "right" : 8,
    "left" : 8,
}
const baseCoords = {
    "top" : [31, 3],
    "bottom" : [31, 60],
    "right" : [60, 31],
    "left" : [3, 31],
    "topLeft": [7, 7],
    "topRight": [55, 7],
    "bottomLeft": [7, 55],
    "bottomRight": [55, 55]
}

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

    link = new SwordsManCyan();
    link.player = player;
    link.put(2, 2);
    link.hp = 9999;
    link.atc = 10;
    link.onclick = ()=>{link.spawn(SwordsManCyan)}
    link.invulnerable = true;


    


    let ashlandGround = new ImageMap(ashlandGroundImg, 8, 16);
    // idMap = new Ground(ashlandGround.getAll());

    let ashlandDirt = new Ground(
        ashlandGround.getRow(0, 1).concat(ashlandGround.getRow(1, 6)).concat(ashlandGround.getRow(2, 5))
    )
    let ashlandField = new Ground(
        ashlandGround.getRow(2, 0, 5)
    );
    ashlandField.forPlants=false;
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
    requestAnimationFrame(update);
    gameAct+=gameSpeed;
    if(1){
        gameAct=0;
        updateFog(player);
        drawSprites();
        gameMouseEvents();
        gameKeysEvents();
        let toMove = new Array();
        for(let i=0; i<(unitList.length); i++){
            if(unitList[i]!=link){
                toMove.push(unitList[i]);
            }
        }
        for(let i=0; i<(toMove.length); i++){
                if(toMove[i].died){
                    // toMove[i].onDie();
                    delete toMove[i];
                    continue;
                }
                let enCoords = toMove[i].findEnemyNearby();
                if(enCoords){
                    let x = toMove[i].getCenter()[0];
                    let y = toMove[i].getCenter()[1];
                    if(((x-enCoords[0])*(x-enCoords[0])+(y-enCoords[1])*(y-enCoords[1]))>(toMove[i].atcRange*toMove[i].atcRange)){
                        toMove[i].moveMoment++;
                        if(toMove[i].moveMoment==toMove[i].moveInterval){
                            toMove[i].toPoint(enCoords[0], enCoords[1]);
                            toMove[i].moveMoment=0;
                        }
                    }
                    
                    else{
                        toMove[i].moveMoment=0;
                        if(toMove[i].atcMoment==0){
                            let enCenter = hitBoxMap[enCoords[1]][enCoords[0]].unitReference.getCenter();
                            toMove[i].beat([enCenter[0], enCenter[1]]);
                        }
                        toMove[i].atcMoment++;
                        if(toMove[i].atcMoment>toMove[i].atcInterval){
                            hitBoxMap[enCoords[1]][enCoords[0]].unitReference.changeHp(toMove[i].atc);
                            toMove[i].atcMoment=0;
                        }
                    }
                }
                else{
                    if(randint(1, 10)<4){
                        let x = randint(-1, 2);
                        let y = x?0:randint(-1, 2);
                        toMove[i].toPoint(x, y);
                        continue;
                    }
                    if(toMove[i].priorityList[0]&&toMove[i].moveable){
                        // console.log(toMove[i].priorityList[0]);
                        toMove[i].toPoint(baseCoords[toMove[i].priorityList[0]][0], baseCoords[toMove[i].priorityList[0]][1]);
                        let x = toMove[i].getCenter()[0];
                        let y = toMove[i].getCenter()[1];
                        if(((baseCoords[toMove[i].priorityList[0]][0]-x)*(baseCoords[toMove[i].priorityList[0]][0]-x)+(baseCoords[toMove[i].priorityList[0]][1]-y)*(baseCoords[toMove[i].priorityList[0]][1]-y))<9){
                            toMove[i].priorityList.splice(0, 1);
                        } 
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
                let needDraw=false;
                for(let h=0; h<sprite.height; h++){
                    for(let w=0; w<sprite.width; w++){
                        if((!switchFog.checked)||battleFogMap[y+h][x+w]){
                            needDraw=true;
                            break;
                        }
                        if(needDraw) break;
                    }
                }
                if(needDraw) draw(sctx, sprite.img, x, y, sprite.width, sprite.height);
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
    for(let y=0; y<ceilCount; y++){
        [new LightDeadTree(), new DarkDeadTree(), new LightDeadAxedTree(), new DarkDeadAxedTree()][randint(0, 4)].put(0, y);
        [new LightDeadTree(), new DarkDeadTree(), new LightDeadAxedTree(), new DarkDeadAxedTree()][randint(0, 4)].put(ceilCount-1, y);
    }
    for(let x=1; x<ceilCount; x++){
        [new LightDeadTree(), new DarkDeadTree(), new LightDeadAxedTree(), new DarkDeadAxedTree()][randint(0, 4)].put(x, 0);
        [new LightDeadTree(), new DarkDeadTree(), new LightDeadAxedTree(), new DarkDeadAxedTree()][randint(0, 4)].put(x, ceilCount-1);
    }
    let rStart = 12;
    let rEnd = 26;
    rStart*=rStart;
    rEnd*=rEnd;
    for(let y=1; y<=28; y++){
        for(let x=1; x<=28; x++){
            
            let nowR = (32-x-0.5)*(32-x-0.5)+(32-y-0.5)*(32-y-0.5);
            if(fromto(rStart, nowR, rEnd)&&groundMap[y][x].forPlants){
                [new LightDeadTree(), new DarkDeadTree(), new LightDeadAxedTree(), new DarkDeadAxedTree()][randint(0, 4)].put(x, y);
                [new LightDeadTree(), new DarkDeadTree(), new LightDeadAxedTree(), new DarkDeadAxedTree()][randint(0, 4)].put(63-x, y);
                [new LightDeadTree(), new DarkDeadTree(), new LightDeadAxedTree(), new DarkDeadAxedTree()][randint(0, 4)].put(x, 63-y);
                [new LightDeadTree(), new DarkDeadTree(), new LightDeadAxedTree(), new DarkDeadAxedTree()][randint(0, 4)].put(63-x, 63-y);
            }
        }
    }

    //Верхний игрок - люди
    let topKeepCyan = new KeepCyan();
    topKeepCyan.player = "top";
    topKeepCyan.onDie = ()=>{playerBuildings["top"]--};
    topKeepCyan.put(30, 3);

    let topLeftTopTower = new TowerCyan();
    topLeftTopTower.player = "top";
    topLeftTopTower.onDie = ()=>{playerBuildings["top"]--};
    topLeftTopTower.put(23, 1);

    let topRightTopTower = new TowerCyan();
    topRightTopTower.player = "top";
    topRightTopTower.onDie = ()=>{playerBuildings["top"]--};
    topRightTopTower.put(39, 1);

    let topLeftBottomTower = new TowerCyan();
    topLeftBottomTower.player = "top";
    topLeftBottomTower.onDie = ()=>{playerBuildings["top"]--};
    topLeftBottomTower.put(26, 7);

    let topRightBottomTower = new TowerCyan();
    topRightBottomTower.player = "top";
    topRightBottomTower.onDie = ()=>{playerBuildings["top"]--};
    topRightBottomTower.put(36, 7);

    let topLeftBarrack = new BarracksCyan();
    topLeftBarrack.player = "top";
    topLeftBarrack.onDie = ()=>{playerBuildings["top"]--};
    topLeftBarrack.put(27, 3);
    topLeftBarrack.priorityList = ["topLeft", "left", "bottomLeft", "bottom", "bottomRight", "right"];

    let topRightBarrack = new BarracksCyan();
    topRightBarrack.player = "top";
    topRightBarrack.onDie = ()=>{playerBuildings["top"]--};
    topRightBarrack.put(35, 3);
    topRightBarrack.priorityList = ["topRight", "right", "bottomRight", "bottom", "bottomLeft", "left"];

    let topBottomBarrack = new BarracksCyan();
    topBottomBarrack.player = "top";
    topBottomBarrack.onDie = ()=>{playerBuildings["top"]--};
    topBottomBarrack.put(31, 8);
    topBottomBarrack.priorityList = ["bottom", "left", "right"];


    //Левый игрок - орки
    let leftOrcKeep = new OrcKeep();
    leftOrcKeep.player = "left";
    leftOrcKeep.onDie = ()=>{playerBuildings["left"]--};
    leftOrcKeep.put(3, 30);

    let leftTopOrcBarracks = new OrcBarracks();
    leftTopOrcBarracks.player = "left";
    leftTopOrcBarracks.onDie = ()=>{playerBuildings["left"]--};
    leftTopOrcBarracks.put(3, 27);
    leftTopOrcBarracks.priorityList = ["topLeft", "top", "topRight", "right", "bottomRight", "bottom"];

    let leftRightOrcBarracks = new OrcBarracks();
    leftRightOrcBarracks.player = "left";
    leftRightOrcBarracks.onDie = ()=>{playerBuildings["left"]--};
    leftRightOrcBarracks.put(8, 31);
    leftRightOrcBarracks.priorityList = ["right", "top", "bottom"];

    let leftBottomOrcBarracks = new OrcBarracks();
    leftBottomOrcBarracks.player = "left";
    leftBottomOrcBarracks.onDie = ()=>{playerBuildings["left"]--};
    leftBottomOrcBarracks.put(3, 35);
    leftBottomOrcBarracks.priorityList = ["bottomLeft", "bottom", "bottomRight", "right", "topRight", "top"];

    let leftTopLeftOrcTower = new OrcTower();
    leftTopLeftOrcTower.player = "left";
    leftTopLeftOrcTower.onDie = ()=>{playerBuildings["left"]--};
    leftTopLeftOrcTower.put(1, 23);

    let leftTopRightOrcTower = new OrcTower();
    leftTopRightOrcTower.player = "left";
    leftTopRightOrcTower.onDie = ()=>{playerBuildings["left"]--};
    leftTopRightOrcTower.put(7, 26);

    let leftBottomLeftOrcTower = new OrcTower();
    leftBottomLeftOrcTower.player = "left";
    leftBottomLeftOrcTower.onDie = ()=>{playerBuildings["left"]--};
    leftBottomLeftOrcTower.put(1, 39);

    let leftBottomRightOrcTower = new OrcTower();
    leftBottomRightOrcTower.player = "left";
    leftBottomRightOrcTower.onDie = ()=>{playerBuildings["left"]--};
    leftBottomRightOrcTower.put(7, 36);

    

    //Правый - нежить
    let rightMausoleum = new Mausoleum();
    rightMausoleum.player = "right";
    rightMausoleum.onDie = ()=>{playerBuildings["right"]--};
    rightMausoleum.put(57, 30);

    let rightTopSpawnMausoleum = new SpawnMausoleum();
    rightTopSpawnMausoleum.player = "right";
    rightTopSpawnMausoleum.onDie = ()=>{playerBuildings["right"]--};
    rightTopSpawnMausoleum.put(59, 27);
    rightTopSpawnMausoleum.priorityList = ["topRight", "top", "topLeft", "left", "bottomLeft", "bottom"];

    let rightBottomSpawnMausoleum = new SpawnMausoleum();
    rightBottomSpawnMausoleum.player = "right";
    rightBottomSpawnMausoleum.onDie = ()=>{playerBuildings["right"]--};
    rightBottomSpawnMausoleum.put(59, 35);
    rightBottomSpawnMausoleum.priorityList = ["bottomRight", "bottom", "bottomLeft", "left", "topLeft", "top"];

    let rightLeftSpawnMausoleum = new SpawnMausoleum();
    rightLeftSpawnMausoleum.player = "right";
    rightLeftSpawnMausoleum.onDie = ()=>{playerBuildings["right"]--};
    rightLeftSpawnMausoleum.put(54, 31);
    rightLeftSpawnMausoleum.priorityList = ["left", "bottom", "top"];

    let rightBottomLeftTombstone = new Tombstone();
    rightBottomLeftTombstone.player = "right";
    rightBottomLeftTombstone.onDie = ()=>{playerBuildings["right"]--};
    rightBottomLeftTombstone.put(55, 36);

    let rightBottomRightTombstone = new Tombstone();
    rightBottomRightTombstone.player = "right";
    rightBottomRightTombstone.onDie = ()=>{playerBuildings["right"]--};
    rightBottomRightTombstone.put(61, 39);

    let rightTopRightTombstone = new Tombstone();
    rightTopRightTombstone.player = "right";
    rightTopRightTombstone.onDie = ()=>{playerBuildings["right"]--};
    rightTopRightTombstone.put(61, 23);

    let rightTopLeftTombstone = new Tombstone();
    rightTopLeftTombstone.player = "right";
    rightTopLeftTombstone.onDie = ()=>{playerBuildings["right"]--};
    rightTopLeftTombstone.put(55, 26);

    //Нижний - демон
    let downPurplePortal = new PurplePortal();
    downPurplePortal.player = "bottom";
    downPurplePortal.onDie = ()=>{playerBuildings["bottom"]--};
    downPurplePortal.put(30, 57);

    let downTopPortal = new OrangePortal();
    downTopPortal.player = "bottom";
    downTopPortal.onDie = ()=>{playerBuildings["bottom"]--};
    downTopPortal.priorityList = ["top", "right", "left"];
    downTopPortal.put(31, 54);

    let downLeftPortal = new OrangePortal();
    downLeftPortal.player = "bottom";
    downLeftPortal.onDie = ()=>{playerBuildings["bottom"]--};
    downLeftPortal.priorityList = ["bottomLeft", "left", "topLeft", "top", "topRight", "right"];
    downLeftPortal.put(27, 59);

    let downRightPortal = new OrangePortal();
    downRightPortal.player = "bottom";
    downRightPortal.onDie = ()=>{playerBuildings["bottom"]--};
    downRightPortal.priorityList = ["bottomRight", "right", "topRight", "top", "topLeft", "left"];
    downRightPortal.put(35, 59);

    let downTopRightPortal = new GreenPortal();
    downTopRightPortal.player = "bottom";
    downTopRightPortal.onDie = ()=>{playerBuildings["bottom"]--};
    downTopRightPortal.put(36, 55);

    let downTopLeftPortal = new GreenPortal();
    downTopLeftPortal.player = "bottom";
    downTopLeftPortal.onDie = ()=>{playerBuildings["bottom"]--};
    downTopLeftPortal.put(26, 55);

    let downBottomLeftPortal = new GreenPortal();
    downBottomLeftPortal.player = "bottom";
    downBottomLeftPortal.onDie = ()=>{playerBuildings["bottom"]--};
    downBottomLeftPortal.put(23, 61);

    let downBottomRightPortal = new GreenPortal();
    downBottomRightPortal.player = "bottom";
    downBottomRightPortal.onDie = ()=>{playerBuildings["bottom"]--};
    downBottomRightPortal.put(39, 61);


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
        sctx.font = "100px sans-serif";
        sctx.strokeText(`${hitBoxMap[mouseY][mouseX].unitReference.hp}`, center[0]*ceilResolution, center[1]*ceilResolution);
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