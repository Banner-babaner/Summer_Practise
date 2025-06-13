class Unit{
    constructor(sprite, hp=100, atc=10, armor=1, player="neutral", name="Unnamed"){
        this.atc = atc;
        this.atcRange=3;
        this.defaultAtcInterval=4;
        this.atcMoment=0;

        this.sprite = new Sprite(undefined);
        Object.assign(this.sprite, sprite);
        this.sprite.connect(this);
        for(let key in this.sprite.animations){
            if(key.includes("beat")){
                if(this.sprite.animations[key].length>this.defaultAtcInterval)
                    this.defaultAtcInterval=this.sprite.animations[key].length;
            }

        }
        this.atcInterval=this.defaultAtcInterval*this.sprite.interval;
        
        unitList.push(this);
        this.hp = hp;

        this.armor = armor;
        this.player = player;
        this.name = name;
        this.hpRegen=0;
        this.watchingRadius=5;

        this.moveInterval=5;
        this.moveMoment = 0;

        this.moveable=true;

        this.died = false;
        this.invulnerable = false;

        this.priorityList = [
            "top",
            "left",
            "bottom",
            "right"
        ];
    }


    die(){
        console.log(123);
        unitList.splice(unitList.indexOf(this), 1);
        for(let y=0; y<ceilCount; y++){
            for(let x=0; x<ceilCount; x++){
                if(hitBoxMap[y][x]==this.sprite)hitBoxMap[y][x]=undefined;
                if(spriteMap[y][x]==this.sprite)spriteMap[y][x]=undefined;
            }
        }
        this.onDie();
        delete this.sprite;
        this.died = true;
    }

    onDie(){

    }

    changeHp(dHp){
        this.hp-=dHp;
        if(this.hp<1){
            this.die();
        }
    }

    onclick(){
        alert(`Name:    ${this.name}\nHp: ${this.hp}\nAtc:   ${this.atc}\nArmor:  ${this.armor}\nCommand:    ${this.player}\nPriorities:${this.priorityList}\nWatching:${this.watchingRadius}`);
    }

    onhover(){
        
    }

    put(x, y, check=true){
        this.sprite.put(x, y, check);
        let index=unitList.indexOf(this);
        if(index>-1){
            unitList.splice(index, 1);
        }
        unitList.push(this);

    }

    findEnemyNearby(){
        if(this.player=="passive") return;
        let centerX = Math.floor(this.sprite.x+this.sprite.width/2);
        let centerY = Math.floor(this.sprite.y+this.sprite.height/2);
        for(let r=0; r<=this.watchingRadius; r++){
            for(let dx=-r; dx<=r; dx++){
                for(let dy=-r; dy<=r; dy++){
                    if(dx*dx+dy*dy>r*r) continue;
                    let x = centerX+dx;
                    let y = centerY+dy;
                    if(!hitBoxMap[y])continue;
                    if(hitBoxMap[y][x]&&hitBoxMap[y][x].unitReference.player!="passive"&&(!hitBoxMap[y][x].unitReference.invulnerable)&&hitBoxMap[y][x].unitReference.player!=this.player){
                        return [x, y];
                    }
                }
            }
        }
        return undefined;
    }

    move(way){
        switch(way){
            case "top":
                this.sprite.changeAnimation("moveTop");
                if(this.moveable) this.put(this.sprite.x, this.sprite.y-1);
                break;
            case "right":
                this.sprite.changeAnimation("moveRight");
                if(this.moveable) this.put(this.sprite.x+1, this.sprite.y);
                break;
            case "down":
                this.sprite.changeAnimation("moveDown");
                if(this.moveable) this.put(this.sprite.x, this.sprite.y+1);
                break;
            case "left":
                this.sprite.changeAnimation("moveLeft");
                if(this.moveable) this.put(this.sprite.x-1, this.sprite.y);
                break;
            case "stop":
                this.sprite.changeAnimation("static");
                break;
            default:
                throw "Куда ._."
        }
    }
    beat(way){
        if(way.length){
            let coords = this.getCenter();
            // console.log(coords, way);
            let dx = way[0]-coords[0];
            let dy = way[1]-coords[1];
            if(Math.abs(dx)>Math.abs(dy)){
                if(dx>0){
                    if(this.sprite.animation!="beatRight")
                    this.sprite.changeAnimation("beatRight");
                }
                else{
                    if(this.sprite.animation!="beatLeft")
                    this.sprite.changeAnimation("beatLeft");
                }
            }
            else{
                if(dy>0){
                    if(this.sprite.animation!="beatDown")
                    this.sprite.changeAnimation("beatDown");
                }
                else{
                    if(this.sprite.animation!="beatTop")
                    this.sprite.changeAnimation("beatTop");
                }
            }
        }
        else
        switch(way){
            case "top":
                if(this.sprite.animation!="beatTop")
                this.sprite.changeAnimation("beatTop");
                break;
            case "right":
                if(this.sprite.animation!="beatRight")
                this.sprite.changeAnimation("beatRight");
                break;
            case "down":
                if(this.sprite.animation!="beatDown")
                this.sprite.changeAnimation("beatDown");
                break;
            case "left":
                if(this.sprite.animation!="beatLeft")
                this.sprite.changeAnimation("beatLeft");
                break;
            case "stop":
                if(this.sprite.animation!="static")
                this.sprite.changeAnimation("static");
                break;
            default:
                throw "Куда ._."
        }

    }
    hit(){

    }
    toPoint(x, y){
        let dx = x-this.sprite.x;
        let dy = y-this.sprite.y;
        if(Math.abs(dx)>Math.abs(dy)){
            if(dx>0){
                if(this.sprite.putable(this.sprite.x+1, this.sprite.y)){
                    this.move("right");
                }
                else if((dy>0)){
                    if(this.sprite.putable(this.sprite.x, this.sprite.y+1)){
                        this.move("down");
                    }
                    else if(this.sprite.putable(this.sprite.x, this.sprite.y-1)){
                        this.move("top");
                    }
                }
                else if(this.sprite.putable(this.sprite.x, this.sprite.y-1)){
                    this.move("top");
                }
                else if(this.sprite.putable(this.sprite.x, this.sprite.y+1)){
                    this.move("down");
                }
            }
            else if(dx<0){
                if(this.sprite.putable(this.sprite.x-1, this.sprite.y)){
                    this.move("left");
                }
                else if((dy>0)){
                    if(this.sprite.putable(this.sprite.x, this.sprite.y+1)){
                        this.move("down");
                    }
                    else if(this.sprite.putable(this.sprite.x, this.sprite.y-1)){
                        this.move("top");
                    }
                }
                else if(this.sprite.putable(this.sprite.x, this.sprite.y-1)){
                    this.move("top");
                }
                else if(this.sprite.putable(this.sprite.x, this.sprite.y+1)){
                    this.move("down");
                }
            }
        }
        else{
            if(dy>0){
                if(this.sprite.putable(this.sprite.x, this.sprite.y+1)){
                    this.move("down");
                }
                else if(dx>0){
                    if(this.sprite.putable(this.sprite.x+1, this.sprite.y)){
                        this.move("right");
                    }
                    else if(this.sprite.putable(this.sprite.x-1, this.sprite.y)){
                        this.move("left");
                    }
                }
                else if(this.sprite.putable(this.sprite.x+1, this.sprite.y)){
                    this.move("right");
                }
                else if(this.sprite.putable(this.sprite.x-1, this.sprite.y)){
                        this.move("left");
                }
            }
            else if(dy<0){
                if(this.sprite.putable(this.sprite.x, this.sprite.y-1)){
                    this.move("top");
                }
                else if(dx>0){
                    if(this.sprite.putable(this.sprite.x+1, this.sprite.y)){
                        this.move("right");
                    }
                    else if(this.sprite.putable(this.sprite.x-1, this.sprite.y)){
                        this.move("left");
                    }
                }
                else if(this.sprite.putable(this.sprite.x+1, this.sprite.y)){
                    this.move("right");
                }
                else if(this.sprite.putable(this.sprite.x-1, this.sprite.y)){
                        this.move("left");
                }
            }
        }
    }
    getCenter(){
        return [this.sprite.x+this.sprite.width/2, this.sprite.y+this.sprite.height/2];
    }

    spawn(unitType){
        let unit = new unitType();
        unit.player = this.player;
        let newPriorityList = new Array();
        this.priorityList.forEach(element=>{
            newPriorityList.push(element);
        });
        unit.priorityList = newPriorityList;
        let coords = this.getCenter();
        let done = false;
        for(let r=1; r<ceilCount; r++){
            for(let dy=-r; dy<r; dy++){
                for(let dx=-r; dx<r; dx++){
                    let putx = Math.floor(coords[0]+dx);
                    let puty = Math.floor(coords[1]+dy);
                    if(unit.sprite.putable(putx, puty)){
                        unit.put(putx, puty, false);
                        done = true;
                        break;
                    }
                }
                if(done) break;
            }
            if(done) break;
        }
    }
}

class Spawner extends Unit{
    constructor(sprite){
        super(sprite);
        this.spawnList = [];
        this.spawnInterval=100;
        this.spawnMoment=0;
        this.sprite.onUpdate = ()=>{
            this.spawnMoment++;
            if(this.spawnMoment>=this.spawnInterval){
                this.spawnList.forEach(element=>{
                        this.spawn(element);
                    }
                )
                this.spawnMoment=0;
            }
        }
    }

}